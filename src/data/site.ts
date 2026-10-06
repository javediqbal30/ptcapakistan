/**
 * Global site configuration - the single source of truth for NAP (Name,
 * Address, Phone), social profiles and navigation. Any component that needs
 * brand or contact data reads it from here, which keeps the entity consistent
 * across the UI and structured data (a hard requirement for local SEO + GEO).
 *
 * Values marked TODO / CONFIRM must be replaced with PTCA-verified data before
 * launch. Do not fabricate coordinates, opening hours or profiles.
 */

export const SITE = {
  /** Canonical origin. Must match `site` in astro.config.mjs. */
  url: 'https://ptcapakistan.pk',

  /** Legal / full brand name used in schema and footer. */
  legalName: 'Prime Tax & Corporate Academy',
  /** Short brand mark used in the header. */
  shortName: 'PTCA',
  /** Descriptor kept for entity clarity (never mix with a second brand name). */
  descriptor: "Pakistan's practical tax & corporate academy",
  slogan: 'Learn. Practice. Progress.',
  tagline: 'Develop Practical Tax & Corporate Skills for Your Career',

  description:
    'Practical, career-focused training in taxation, tax litigation, sales tax, ' +
    'human resources and corporate compliance. Online, physical and hybrid ' +
    'courses delivered from Karachi, Pakistan.',

  /** Primary contact channels. */
  phone: {
    display: '+92 310 5070070',
    /** E.164, no spaces - used for tel: links and schema. */
    e164: '+923105070070',
    /** Digits only - used for wa.me links. */
    whatsapp: '923105070070',
  },
  email: 'info@ptcapakistan.pk',

  /** Postal address, one field per schema.org PostalAddress property. */
  address: {
    line1: 'Office No. 301, Plot 1/6-C',
    line2: 'PECHS Block 6, Shahrah-e-Faisal',
    locality: 'Karachi',
    region: 'Sindh',
    postalCode: '75500',
    country: 'PK',
    /** Pre-formatted single line for footers and schema streetAddress. */
    singleLine:
      'Office No. 301, Plot 1/6-C, PECHS Block 6, Shahrah-e-Faisal, Karachi 75500, Pakistan',
  },

  /**
   * Approx coordinates are intentionally omitted (TODO: CONFIRM with PTCA).
   * When supplied, add `geo: { latitude: '', longitude: '' }` and it will flow
   * into LocalBusiness schema automatically.
   */
  geo: null as null | { latitude: string; longitude: string },

  /** Opening hours - TODO: CONFIRM. Rendered only when present. */
  openingHours: null as null | string[],

  /** Social profiles - TODO: CONFIRM. Only real URLs belong here. */
  social: {
    facebook: '',
    linkedin: '',
    instagram: '',
    youtube: '',
  },

  /** Google Maps deep link for "Get directions". */
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=PTCA+PECHS+Block+6+Shahrah-e-Faisal+Karachi',
} as const;

/** Subjects the academy is authoritative on - powers schema `knowsAbout`. */
export const KNOWS_ABOUT = [
  'Income Tax in Pakistan',
  'Tax Litigation',
  'Sales Tax and FBR Compliance',
  'FBR IRIS',
  'Withholding Tax',
  'Company Secretarial Practice',
  'SECP Compliance',
  'Corporate Governance',
  'Human Resource Management',
  'Intellectual Property',
] as const;

/** Stable WhatsApp link builder with an optional pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.phone.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Convenience helpers used in several components. */
export const telHref = `tel:${SITE.phone.e164}`;
export const mailHref = `mailto:${SITE.email}`;
