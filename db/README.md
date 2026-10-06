# Neon database setup

Contact and enrolment submissions are stored in a Neon (Postgres) database.

## 1. Get the connection string

Neon console → your project → **Connection Details** → **Pooled connection**.
It looks like:

```
postgresql://USER:PASSWORD@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require
```

Copy it into a new file called `.env.local` in the project root:

```
DATABASE_URL="postgresql://..."
```

`.env.local` is gitignored, so the secret never leaves your machine.

## 2. Create the schema

```
npm run db:migrate
```

This applies `db/schema.sql`. It is safe to re-run: `IF NOT EXISTS` guards
make a second run a no-op.

You can also run the SQL directly from the Neon console SQL editor.

## 3. Verify

```
npm run build
npm run start:prod
```

Then submit the form at `http://localhost:4321/contact/` and check the row in
the Neon console → **Tables** → **leads**.

## What gets stored

| Column | Notes |
| --- | --- |
| `source` | `contact` or `enroll` |
| `status` | starts as `new` (workflow column for admissions) |
| `name`, `phone` | required, validated on server too |
| `email`, `city`, `course`, `mode` | the filterable columns |
| `payload` | **the whole form as JSONB**, so adding a form field never needs a migration |
| `user_agent`, `referer`, `ip` | attribution / spam investigation |
| `created_at`, `updated_at` | `updated_at` maintained by trigger |

Query the newest leads with the `leads_recent` view.

## Endpoints

| Route | Used by |
| --- | --- |
| `POST /api/contact/` | `/contact/` enquiry form |
| `POST /api/enroll/` | `/enroll/` 3-step form |

Both accept `FormData` (so a no-JS browser still works), validate server-side,
and answer `200` on success or `422` with a plain-text reason on failure.

## Graceful degradation

If `DATABASE_URL` is missing or the insert fails, the API answers `503` and the
form shows a message pointing the lead to WhatsApp instead of silently losing
the enquiry. Nothing is deleted or hidden - check the server logs for the
`[leads] insert failed` line.

## Deployment note

Because the API routes run on the server (`prerender = false`), the site must be
served through the Node adapter:

```
npm run build
npm run start:prod   # runs dist/server/entry.mjs
```

Static hosting (Netlify/Vercel static, GitHub Pages) cannot run these routes -
host the `dist` output on a Node host, or set `PUBLIC_CONTACT_ENDPOINT` /
`PUBLIC_ENROLL_ENDPOINT` to an external form service.

## Rate limiting / spam

The forms ship with a hidden honeypot field checked on the server. There is no
per-IP rate limit yet; add one (e.g. a Redis bucket or a Cloudflare rule) before
launch if spam becomes a problem.
