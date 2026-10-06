-- ===========================================================================
-- PTCA leads schema (Neon / PostgreSQL 15+)
--
-- Run once against your Neon branch:
--   psql "$DATABASE_URL" -f db/schema.sql
-- or via the bundled script (uses .env.local):
--   npm run db:migrate
--
-- The design is deliberately "one table for everything": the columns
-- admissions will filter and sort on are typed, while the rest of the form
-- travels untouched inside `payload`, so adding a form field never needs a
-- migration.
-- ===========================================================================

CREATE TABLE IF NOT EXISTS leads (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  -- Which form produced it: 'contact' | 'enroll'
  source      TEXT        NOT NULL,
  status      TEXT        NOT NULL DEFAULT 'new',

  -- Denormalised for filtering/sorting. These mirror the form inputs and are
  -- kept in sync with `payload` at insert time.
  name        TEXT        NOT NULL,
  phone       TEXT        NOT NULL,
  email       TEXT,
  city        TEXT,
  course      TEXT,
  mode        TEXT,

  -- The full submission (everything except the honeypot), so nothing is lost
  -- when a form gains fields later.
  payload     JSONB       NOT NULL DEFAULT '{}'::jsonb,

  -- Attribution / abuse investigation.
  user_agent  TEXT,
  referer     TEXT,
  ip          TEXT,

  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Single-column indexes cover the queries admissions will actually run:
-- newest first, by status, by source, by course.
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx      ON leads (status);
CREATE INDEX IF NOT EXISTS leads_source_idx      ON leads (source);
CREATE INDEX IF NOT EXISTS leads_course_idx      ON leads (course);

-- Postgres cannot index a nullable column's "IS NOT NULL" cheaply in older
-- plans; a partial index keeps the empty-email rows out of the email lookups.
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email) WHERE email IS NOT NULL;

-- Keep updated_at honest without an application-side UPDATE trigger.
CREATE OR REPLACE FUNCTION touch_leads_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS leads_touch ON leads;
CREATE TRIGGER leads_touch
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION touch_leads_updated_at();

-- Convenience view for the dashboard: newest leads first with the payload's
-- question-specific extras flattened alongside the indexed columns.
CREATE OR REPLACE VIEW leads_recent AS
  SELECT id, source, status, name, phone, email, city, course, mode,
         created_at, updated_at
  FROM   leads
  ORDER  BY created_at DESC;
