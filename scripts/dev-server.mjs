import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import { open } from 'node:fs/promises';

/** Root of the project (this script lives in scripts/). */
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LOG = resolve(ROOT, 'scripts', 'dev-server.log');

const logFd = await open(LOG, 'w');
function log(...args) {
  const line = args.join(' ') + '\n';
  logFd.write(Buffer.from(line));
}

/**
 * Load environment files into process.env.
 *
 * The same .env* reader the migration script uses: it stops at .env.local/.env,
 * leaves host-provided values alone, and is safe to run on a build machine.
 */
async function loadEnv() {
  log('[wrapper] loading env');
  for (const file of ['.env.local', '.env']) {
    try {
      await access(resolve(ROOT, file));
      log('[wrapper] found', file);
    } catch {
      log('[wrapper] skipping', file);
      continue;
    }
    const text = await readFile(resolve(ROOT, file), 'utf8');
    for (const line of text.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (process.env[key] !== undefined) continue; // host value wins
      process.env[key] = rawValue.replace(/^["']|["']$/g, '');
    }
  }
  log('[wrapper] env loaded. DATABASE_URL set =', !!process.env.DATABASE_URL);
}

(async () => {
  log('[wrapper] CWD =', process.cwd());
  log('[wrapper] ROOT =', ROOT);
  try {
    await loadEnv();
    log('[wrapper] spawning astro');
    const astro = spawn(
      'node',
      [resolve(ROOT, 'node_modules/astro/astro.js'), 'dev'],
      { env: process.env },
    );
    log('[wrapper] astro spawned, pid =', astro.pid);
    astro.stdout.on('data', (data) => {
      log('[astro]', data.toString());
    });
    astro.stderr.on('data', (data) => {
      log('[astro]', data.toString());
    });
    astro.on('exit', (code) => {
      log('[wrapper] astro exited', code);
      process.exit(code ?? 0);
    });
    astro.on('error', (err) => {
      log('[wrapper] astro failed to start:', err);
      process.exit(1);
    });
  } catch (err) {
    log('[wrapper] failed:', err);
    process.exit(1);
  }
})();