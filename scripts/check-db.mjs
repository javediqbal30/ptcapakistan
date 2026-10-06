/**
 * End-to-end check (no Astro server needed): verifies that the preload env
 * loader puts DATABASE_URL into process.env — exactly what src/lib/db.ts reads
 * when the dev/prod server handles a request. Then it opens a real Neon
 * connection and does a read-only query to prove the full path works.
 *
 * Run with: node -r ./scripts/preload-env.mjs scripts/check-db.mjs
 */

import { neon } from '@neondatabase/serverless';

function readDatabaseUrl() {
  const raw = process.env.DATABASE_URL;
  if (!raw) return undefined;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

console.error(
  '1. DATABASE_URL in process.env:',
  !!process.env.DATABASE_URL ? 'SET (len ' + process.env.DATABASE_URL.length + ')' : 'MISSING',
);

const url = readDatabaseUrl();
console.error('2. isDatabaseConfigured ->', !!url);
if (!url) {
  console.error('FAIL: DATABASE_URL not loaded into process.env');
  process.exit(1);
}

const query = neon(url);
console.error('3. Neon query client created');

try {
  const rows = await query`SELECT 1 + 1 AS sum`;
  console.error('4. Neon read-only query result:', rows[0]);
  console.error('SUCCESS: Neon connection works via process.env.DATABASE_URL (preload loader)');
  process.exit(0);
} catch (err) {
  console.error('FAIL: Neon query failed:', err?.message || err);
  process.exit(1);
}