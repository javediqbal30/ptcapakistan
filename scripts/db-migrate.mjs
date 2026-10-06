/**
 * Applies db/schema.sql to the configured Neon database.
 *
 *   npm run db:migrate
 *
 * Why a script rather than `psql -f`:
 *   - Neon branches get recreated often, and a one-command rebuild beats
 *     remembering a connection string.
 *   - A plain node script works on any OS without a postgres client binary.
 *
 * The connection string is read from .env.local, then .env, then the shell.
 */

import { readFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { neon } from '@neondatabase/serverless';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Minimal .env reader - the project has no dotenv dependency to keep. */
async function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    try {
      await access(resolve(ROOT, file));
    } catch {
      continue;
    }
    const text = await readFile(resolve(ROOT, file), 'utf8');
    for (const line of text.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (process.env[key] !== undefined) continue;
      const value = rawValue.replace(/^["']|["']$/g, '');
      process.env[key] = value;
    }
  }
}

/**
 * Splits a SQL script into statements.
 *
 * A naive split on ';' would shatter the trigger function, whose body lives
 * between $$ ... $$ and legitimately contains semicolons, so dollar-quoted
 * strings and single/double quotes are skipped over as scanning proceeds.
 */
function splitStatements(sql) {
  const statements = [];
  let current = '';
  let i = 0;

  while (i < sql.length) {
    const char = sql[i];

    // Dollar quoting: capture the tag so the matching close can be found.
    if (char === '$') {
      const tag = sql.slice(i).match(/^\$[A-Za-z_][A-Za-z0-9_]*\$|^\$\$/)?.[0];
      if (tag) {
        const end = sql.indexOf(tag, i + tag.length);
        const stop = end === -1 ? sql.length : end + tag.length;
        current += sql.slice(i, stop);
        i = stop;
        continue;
      }
    }

    if (char === "'" || char === '"') {
      const end = sql.indexOf(char, i + 1);
      const stop = end === -1 ? sql.length : end + 1;
      current += sql.slice(i, stop);
      i = stop;
      continue;
    }

    // Line and block comments are stripped so they never leak into a statement.
    if (char === '-' && sql[i + 1] === '-') {
      const end = sql.indexOf('\n', i);
      i = end === -1 ? sql.length : end + 1;
      continue;
    }
    if (char === '/' && sql[i + 1] === '*') {
      const end = sql.indexOf('*/', i + 2);
      i = end === -1 ? sql.length : end + 2;
      continue;
    }

    if (char === ';') {
      if (current.trim()) statements.push(current.trim());
      current = '';
      i += 1;
      continue;
    }

    current += char;
    i += 1;
  }

  if (current.trim()) statements.push(current.trim());
  return statements;
}

async function main() {
  await loadEnv();

  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    console.error(
      'DATABASE_URL is not set.\n' +
        'Add it to .env.local (get it from the Neon console -> Pooled connection).',
    );
    process.exit(1);
  }

  const schemaPath = resolve(ROOT, 'db', 'schema.sql');
  const schema = await readFile(schemaPath, 'utf8');
  const statements = splitStatements(schema);

  const query = neon(url);

  // `sql.query(text)` is the only call form that actually executes DDL on this
// driver. The alternatives are traps:
  //   - `sql.unsafe(str)` resolves with `{ sql: str }` and never runs the
  //     statement, so a migration reports success while nothing is created;
  //   - the tagged template `sql`${str}`` sends the statement as bind
  //     parameter `$1`, which Postgres rejects for DDL.
  // `query()` without params uses the simple query protocol, which is what
  // multi-statement DDL needs.
  console.log(`Applying ${statements.length} statements from db/schema.sql ...`);

  for (const [index, statement] of statements.entries()) {
    try {
      await query.query(statement);
      console.log(`  [${index + 1}/${statements.length}] ok`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`  [${index + 1}/${statements.length}] FAILED: ${message}`);
      process.exit(1);
    }
  }

  // Verify the migration really landed rather than trusting the call above.
  const [check] = await query`
    SELECT count(*)::int AS n
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'leads'
  `;
  if (!check || check.n !== 1) {
    console.error('Migration finished but `leads` does not exist - aborting.');
    process.exit(1);
  }

  console.log(`Schema applied and verified (${statements.length} statements, \`leads\` present).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
