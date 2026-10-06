import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

/**
 * Neon Postgres client.
 *
 * Uses Neon's HTTP driver (not a TCP connection pool), which is what the
 * serverless driver is built for: no idle connections to keep warm, and the
 * same code works in dev, in the standalone Node server and in a serverless
 * host later on.
 *
 * The connection string is read from `process.env.DATABASE_URL` rather than
 * `import.meta.env` on purpose - Astro inlines `import.meta.env` at build
 * time, and a build machine should not need the production database URL.
 */

/** Trimmed so a copy-pasted value with a newline still works. */
function readDatabaseUrl(): string | undefined {
  const raw = process.env.DATABASE_URL;
  if (!raw) return undefined;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function isDatabaseConfigured(): boolean {
  return readDatabaseUrl() !== undefined;
}

/**
 * Returns the Neon query function, or `null` when no connection string is set.
 * Callers decide what "no database" means for them (the lead API degrades to a
 * 503 with a WhatsApp fallback rather than throwing a 500).
 */
export function sql(): NeonQueryFunction<false, false> | null {
  const url = readDatabaseUrl();
  if (!url) return null;
  return neon(url);
}
