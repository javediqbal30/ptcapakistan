import { sql, isDatabaseConfigured } from './db';

/**
 * Lead storage for the contact and enrolment forms.
 *
 * One table holds both lead types. The columns admissions will filter and sort
 * on (status, course, city, mode) are real columns; everything else is kept
 * verbatim in `payload` so extending a form never needs a migration.
 */

export type LeadSource = 'contact' | 'enroll';

export interface LeadRecord {
  source: LeadSource;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  course: string | null;
  mode: string | null;
  status: string;
  payload: Record<string, unknown>;
  userAgent: string | null;
  referer: string | null;
  ip: string | null;
}

/** Storage limits for the "one line of user text" columns. */
const MAX = {
  name: 120,
  phone: 32,
  email: 254,
  city: 80,
  course: 120,
  mode: 40,
} as const;

/** Collapses whitespace so "  A  B \n C " stores as "A B C". */
const clean = (value: unknown, max: number): string | null => {
  if (typeof value !== 'string') return null;
  const trimmed = value.replace(/\s+/g, ' ').trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, max);
};

/**
 * The same rules the browser runs in ContactForm/EnrollForm, re-run on the
 * server. Client-side validation is a convenience, never a guarantee.
 */
const PATTERNS = {
  name: /^[A-Za-z][A-Za-z\s.'-]{2,}$/,
  phone: /^(03\d{9}|\+923\d{9})$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
} as const;

export class LeadValidationError extends Error {
  readonly field: string;
  constructor(field: string, message: string) {
    super(message);
    this.name = 'LeadValidationError';
    this.field = field;
  }
}

/** Request metadata captured at the edge of the API route. */
export interface LeadMeta {
  userAgent?: string | null;
  referer?: string | null;
  ip?: string | null;
}

export interface NormalisedLead {
  record: LeadRecord;
}

/**
 * Validates and normalises a raw form submission.
 *
 * @param source  Which form produced it - decides the required fields.
 * @param form    The parsed `FormData`.
 * @param meta    Request metadata for attribution.
 */
export function normaliseLead(source: LeadSource, form: FormData, meta: LeadMeta): NormalisedLead {
  // Honeypot: a filled "website" field means a bot. The caller answers with a
  // fake success so the bot learns nothing from the response.
  if (clean(form.get('website'), 200)) {
    throw new LeadValidationError('website', 'Honeypot tripped');
  }

  const payload: Record<string, unknown> = {};
  form.forEach((value, key) => {
    if (key === 'website') return;
    payload[key] = typeof value === 'string' ? value.slice(0, 4000) : value;
  });

  const name = clean(form.get('name'), MAX.name);
  if (!name || !PATTERNS.name.test(name)) {
    throw new LeadValidationError('name', 'Please enter your full name.');
  }

  const phoneRaw = clean(form.get('phone'), MAX.phone);
  const phone = phoneRaw?.replace(/[\s-]/g, '') ?? null;
  if (!phone || !PATTERNS.phone.test(phone)) {
    throw new LeadValidationError('phone', 'Enter a valid mobile number, e.g. 0300 1234567.');
  }

  const emailRaw = clean(form.get('email'), MAX.email);
  if (emailRaw && !PATTERNS.email.test(emailRaw)) {
    throw new LeadValidationError('email', 'Enter a valid email address.');
  }

  if (form.get('consent') !== 'yes') {
    throw new LeadValidationError('consent', 'Please accept the privacy policy.');
  }

  if (source === 'contact') {
    const message = clean(form.get('message'), 4000);
    if (!message || message.length < 5) {
      throw new LeadValidationError('message', 'Please write a short message.');
    }
  } else {
    // Enrolment: email is mandatory, and the 3-step form's required selects are
    // re-checked here because the server cannot trust the browser's stepper.
    // The names below mirror EnrollForm exactly - `timing` and `source` are
    // optional there, so they stay optional here.
    if (!emailRaw) {
      throw new LeadValidationError('email', 'Enter a valid email address.');
    }
    for (const field of ['education', 'profession', 'city', 'course', 'mode'] as const) {
      if (!clean(form.get(field), MAX.course)) {
        throw new LeadValidationError(field, `Please complete ${field}.`);
      }
    }
  }

  const record: LeadRecord = {
    source,
    name,
    phone,
    email: emailRaw,
    city: clean(form.get('city'), MAX.city) ?? clean(form.get('city_other'), MAX.city),
    course: clean(form.get('course'), MAX.course),
    mode: clean(form.get('mode'), MAX.mode),
    status: 'new',
    payload,
    userAgent: clean(meta.userAgent, 512),
    referer: clean(meta.referer, 512),
    ip: clean(meta.ip, 64),
  };

  return { record };
}

export type InsertResult =
  | { ok: true; id: string }
  | { ok: false; reason: 'not-configured' | 'insert-failed'; error?: string };

/**
 * Writes one lead. Returns a discriminated result instead of throwing so the
 * API route can choose between a retryable error and a graceful fallback.
 */
export async function insertLead(record: LeadRecord): Promise<InsertResult> {
  if (!isDatabaseConfigured()) return { ok: false, reason: 'not-configured' };

  const query = sql();
  if (!query) return { ok: false, reason: 'not-configured' };

  try {
    const rows = await query.query(
      `INSERT INTO leads
         (source, name, phone, email, city, course, mode, status,
          payload, user_agent, referer, ip)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10, $11, $12)
       RETURNING id`,
      [
        record.source,
        record.name,
        record.phone,
        record.email,
        record.city,
        record.course,
        record.mode,
        record.status,
        JSON.stringify(record.payload),
        record.userAgent,
        record.referer,
        record.ip,
      ],
    );

    const id = (rows as { id: unknown }[] | undefined)?.[0]?.id;
    return id === undefined || id === null
      ? { ok: false, reason: 'insert-failed' }
      : { ok: true, id: String(id) };
  } catch (error) {
    return {
      ok: false,
      reason: 'insert-failed',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
