/**
 * Pre-load environment files into process.env so the app can read them at
 * runtime. Astro exposes .env* files only to import.meta.env at build/dev time;
 * the database client (src/lib/db.ts) reads DATABASE_URL from process.env, so
 * we shim that explicitly.
 *
 * This file is referenced by the dev/start scripts:
 *
 *   npm run dev      -> loads .env.local/.env, then runs `astro dev`
 *   npm run start    -> same, for `npm start`
 *   npm run start:prod -> loads env, then runs the built server entry
 *
 * It intentionally stops at .env.local (and .env) — it must never load
 * production secrets for a build machine. Vars already present in process.env
 * are left untouched so a host (wrangler / platform) can override them.
 */

import { readFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

for (const file of ['.env.local', '.env']) {
  try {
    await access(resolve(ROOT, file));
  } catch {
    // File absent - nothing to load.
    continue;
  }

  const text = await readFile(resolve(ROOT, file), 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key] !== undefined) continue; // host value wins
    const value = rawValue.replace(/^["']|["']$/g, '');
    process.env[key] = value;
  }
}