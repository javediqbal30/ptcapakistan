import type { APIRoute } from 'astro';
import {
  normaliseLead,
  insertLead,
  LeadValidationError,
  type LeadSource,
  type NormalisedLead,
} from './leads';

/**
 * Shared plumbing for the lead endpoints.
 *
 * The forms POST `multipart/form-data` (or urlencoded) rather than JSON, so a
 * no-JS browser still submits a real form and still lands on /thank-you/. The
 * response is plain text with a 2xx status either way - clients treat any
 * 2xx as success and redirect themselves.
 */

/** Client IP: honours the platform proxy, falls back to the raw socket. */
function clientIp(request: Request): string | null {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? null;
  return request.headers.get('x-real-ip');
}

const text = (
  body: string,
  status = 200,
  type = 'text/plain; charset=utf-8',
): Response => new Response(body, { status, headers: { 'Content-Type': type } });

export function createLeadHandler(source: LeadSource): APIRoute {
  // The browser's normal form POST wants an HTML page back; the JS-enhanced
  // path sends `Accept: application/json` and redirects itself. Returning a
  // 303 only for the former means both paths land on /thank-you/.
  const wantsRedirect = (request: Request): boolean => {
    const accept = request.headers.get('accept') ?? '';
    return accept.includes('text/html') && !accept.includes('application/json');
  };

  const ok = (request: Request): Response =>
    wantsRedirect(request)
      ? new Response(null, { status: 303, headers: { Location: '/thank-you/' } })
      : text('Thank you.');

  return async ({ request }) => {
    if (request.method !== 'POST') {
      return text('Method not allowed', 405);
    }

    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return text('Could not read the submission', 400);
    }

    let record: NormalisedLead['record'];
    try {
      ({ record } = normaliseLead(source, form, {
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer'),
        ip: clientIp(request),
      }));
    } catch (error) {
      // Honeypot tripped: answer like a success so the bot gets no signal.
      if (error instanceof LeadValidationError && error.field === 'website') {
        return ok(request);
      }
      if (error instanceof LeadValidationError) {
        return text(error.message, 422);
      }
      return text('Unexpected error', 500);
    }

    const result = await insertLead(record);

    if (result.ok) return ok(request);

    // Database unreachable or unset. Log it for the operator, but do not lose
    // the lead: the caller surfaces WhatsApp as the fallback route to admissions.
    console.error(
      `[leads] insert failed (${result.reason}) source=${source}`,
      result.error ?? '',
    );

    return text(
      result.reason === 'not-configured'
        ? 'Database not configured. Please reach us on WhatsApp.'
        : 'Could not save your submission. Please try again or contact us on WhatsApp.',
      503,
    );
  };
}

