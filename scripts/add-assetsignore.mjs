import { writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Wrangler refuses to deploy if `dist/_worker.js/` would be uploaded as a
 * public asset (it contains server-side code that should never leak). This
 * tiny script writes the required `dist/.assetsignore` file right after
 * `astro build` so the deploy step succeeds.
 *
 * Run automatically via `npm run build` (see package.json).
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');

if (!existsSync(distDir)) {
  console.error('[add-assetsignore] dist/ not found. Run "astro build" first.');
  process.exit(1);
}

const target = resolve(distDir, '.assetsignore');
writeFileSync(target, '_worker.js\n', 'utf-8');
console.log('[add-assetsignore] wrote', target);