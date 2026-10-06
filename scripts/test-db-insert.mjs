/**
 * End-to-end test: verifies that with the preload env loader, the dev server
 * path (src/lib/db.ts reading process.env.DATABASE_URL) can connect to Neon
 * and store a lead. This mirrors exactly what happens when a user submits the
 * contact form via the dev/prod server.
 */

import { insertLead, normaliseLead, LeadValidationError } from './.leads-bundle.mjs';

const form = new FormData();
form.set('name', 'Ali Khan');
form.set('phone', '03001234567');
form.set('email', 'ali@example.com');
form.set('city', 'Lahore');
form.set('course', 'test');
form.set('mode', 'online');
form.set('message', 'Hi there test message 123');
form.set('consent', 'yes');
form.set('website', '');

let ok = true;

try {
  console.error('1. DATABASE_URL set:', !!process.env.DATABASE_URL);
  if (!process.env.DATABASE_URL) {
    console.error('FAIL: DATABASE_URL not loaded into process.env');
    process.exit(1);
  }

  const normalized = normaliseLead('contact', form, {
    userAgent: 'test',
    referer: 'http://localhost:4321/contact/',
    ip: '127.0.0.1',
  });
  console.error('2. normaliseLead OK, name:', normalized.record.name);

  const result = await insertLead(normalized.record);
  console.error('3. insertLead:', JSON.stringify(result));
  if (!result.ok) {
    console.error('FAIL: insert failed:', result.reason, result.error);
    process.exit(1);
  }

  console.error('SUCCESS: lead stored in Neon with id', result.id);
  process.exit(0);
} catch (err) {
  console.error('ERROR:', err?.message || err);
  process.exit(1);
}