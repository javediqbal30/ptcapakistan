/**
 * Preload script: loads .env.local and .env into process.env.
 *
 * It is used with the `-r` (require/preload) flag:
 *
 *   node -r ./scripts/preload-env.mjs astro dev
 *   node -r ./scripts/preload-env.mjs astro build
 *
 * The preload runs in the SAME Node process as Astro, so DATABASE_URL is
 * available when Astro starts the server (src/lib/db.ts reads process.env).
 *
 * It stops at .env.local/.env (never production secrets for a build machine),
 * and never overrides values already present (wrangler / platform env wins).
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

for (const file of ['.env.local', '.env']) {
  try {
    readFileSync(resolve(ROOT, file), 'utf8');
  } catch {
    // File absent - nothing to load.
    continue;
  }

  const text = readFileSync(resolve(ROOT, file), 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key] !== undefined) continue; // host value wins
    process.env[key] = rawValue.replace(/^["']|["']$/g, '');
  }
}