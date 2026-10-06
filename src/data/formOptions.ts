/**
 * Choice sets for the enrolment and contact forms. Centralised so validation
 * and rendering can never drift apart, and so admissions can extend a list in
 * one place.
 */

export const LEARNING_MODES = ['Physical', 'Online', 'Hybrid'] as const;

export const BATCH_TIMINGS = [
  'Morning',
  'Afternoon',
  'Evening',
  'Weekend',
] as const;

export const EDUCATION_LEVELS = [
  'Matric',
  'Intermediate',
  'Bachelor',
  'Master',
  'CA / ACCA / ACMA',
  'LL.B',
  'Other',
] as const;

export const PROFESSIONS = [
  'Student',
  'Graduate',
  'Accountant',
  'Lawyer / Advocate',
  'Business Owner',
  'Working Professional',
  'Other',
] as const;

export const EXPERIENCE_BANDS = ['0 years', '1-2 years', '3-5 years', '5+ years'] as const;

/** Cities offered in the form; "Other" reveals a free-text input. */
export const CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Hyderabad',
  'Quetta',
  'Other',
] as const;

export const HEARD_ABOUT = [
  'Google Search',
  'Facebook',
  'Instagram',
  'LinkedIn',
  'YouTube',
  'Friend / Colleague',
  'WhatsApp',
  'Walk-in',
  'Other',
] as const;
