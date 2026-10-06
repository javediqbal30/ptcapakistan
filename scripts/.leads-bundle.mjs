// src/lib/db.ts
import { neon } from "@neondatabase/serverless";
function readDatabaseUrl() {
  const raw = process.env.DATABASE_URL;
  if (!raw) return void 0;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : void 0;
}
function isDatabaseConfigured() {
  return readDatabaseUrl() !== void 0;
}
function sql() {
  const url = readDatabaseUrl();
  if (!url) return null;
  return neon(url);
}

// src/lib/leads.ts
var MAX = {
  name: 120,
  phone: 32,
  email: 254,
  city: 80,
  course: 120,
  mode: 40
};
var clean = (value, max) => {
  if (typeof value !== "string") return null;
  const trimmed = value.replace(/\s+/g, " ").trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, max);
};
var PATTERNS = {
  name: /^[A-Za-z][A-Za-z\s.'-]{2,}$/,
  phone: /^(03\d{9}|\+923\d{9})$/,
  email: /^[^\s@]+@[^s@]+\.[^\s@]{2,}$/
};
var LeadValidationError = class extends Error {
  field;
  constructor(field, message) {
    super(message);
    this.name = "LeadValidationError";
    this.field = field;
  }
};
function normaliseLead(source, form, meta) {
  if (clean(form.get("website"), 200)) {
    throw new LeadValidationError("website", "Honeypot tripped");
  }
  const payload = {};
  form.forEach((value, key) => {
    if (key === "website") return;
    payload[key] = typeof value === "string" ? value.slice(0, 4e3) : value;
  });
  const name = clean(form.get("name"), MAX.name);
  if (!name || !PATTERNS.name.test(name)) {
    throw new LeadValidationError("name", "Please enter your full name.");
  }
  const phoneRaw = clean(form.get("phone"), MAX.phone);
  const phone = phoneRaw?.replace(/[\s-]/g, "") ?? null;
  if (!phone || !PATTERNS.phone.test(phone)) {
    throw new LeadValidationError("phone", "Enter a valid mobile number, e.g. 0300 1234567.");
  }
  const emailRaw = clean(form.get("email"), MAX.email);
  if (emailRaw && !PATTERNS.email.test(emailRaw)) {
    throw new LeadValidationError("email", "Enter a valid email address.");
  }
  if (form.get("consent") !== "yes") {
    throw new LeadValidationError("consent", "Please accept the privacy policy.");
  }
  if (source === "contact") {
    const message = clean(form.get("message"), 4e3);
    if (!message || message.length < 5) {
      throw new LeadValidationError("message", "Please write a short message.");
    }
  } else {
    if (!emailRaw) {
      throw new LeadValidationError("email", "Enter a valid email address.");
    }
    for (const field of ["education", "profession", "city", "course", "mode"]) {
      if (!clean(form.get(field), MAX.course)) {
        throw new LeadValidationError(field, `Please complete ${field}.`);
      }
    }
  }
  const record = {
    source,
    name,
    phone,
    email: emailRaw,
    city: clean(form.get("city"), MAX.city) ?? clean(form.get("city_other"), MAX.city),
    course: clean(form.get("course"), MAX.course),
    mode: clean(form.get("mode"), MAX.mode),
    status: "new",
    payload,
    userAgent: clean(meta.userAgent, 512),
    referer: clean(meta.referer, 512),
    ip: clean(meta.ip, 64)
  };
  return { record };
}
async function insertLead(record) {
  if (!isDatabaseConfigured()) return { ok: false, reason: "not-configured" };
  const query = sql();
  if (!query) return { ok: false, reason: "not-configured" };
  try {
    const rows = await query.query(
      `INSERT INTO leads
         (source, name, phone, email, city, course, mode, status,
          payload, user_agent, referer, ip)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10, $11, $12)
       RETURNING id`,
      [
        record.source,
        record.name,
        record.phone,
        record.email,
        record.city,
        record.course,
        record.mode,
        record.status,
        JSON.stringify(record.payload),
        record.userAgent,
        record.referer,
        record.ip
      ]
    );
    const id = rows?.[0]?.id;
    return id === void 0 || id === null ? { ok: false, reason: "insert-failed" } : { ok: true, id: String(id) };
  } catch (error) {
    return {
      ok: false,
      reason: "insert-failed",
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
export {
  LeadValidationError,
  insertLead,
  normaliseLead
};
