/**
 * Programme catalog for the corporate / B2B side of PTCA.
 *
 * Kept in `src/data` (not the `courses` content collection) because these are
 * on-request sessions for an organization — not self-enrolment batches that
 * students pick from a courses list. Admissions edits the copy here in one
 * place; the /corporate-training/ page, the homepage teaser and the
 * CorporateInquiryForm all read from this single source.
 */

export type ProgramIcon =
  | 'book'
  | 'briefcase'
  | 'shield'
  | 'users'
  | 'graduation';

export interface CorporateProgram {
  /** Stable id — used to pre-select the program in the inquiry form. */
  id: string;
  /** Display title, also used as the option label in the form. */
  title: string;
  /** Icon rendered in the card. Drawn from Icon.astro. */
  icon: ProgramIcon;
  /** Programme-specific photo shown as the card's visual anchor. */
  image: {
    src: string;
    alt: string;
    /** Human-readable subject so alt text reads naturally across devices. */
    caption: string;
  };
  /** One-line audience description. */
  audience: string;
  /** Bullet list of session topics. */
  topics: string[];
  /** CTA label — usually "Request a X Session". */
  cta: string;
  /** Pre-filled WhatsApp message when the user prefers instant chat. */
  whatsappMessage: string;
}

export const CORPORATE_PROGRAMS: CorporateProgram[] = [
  {
    id: 'taxation-tax-compliance',
    title: 'Taxation & Tax Compliance',
    icon: 'book',
    image: {
      src: '/Taxation_&_Tax_Compliance.webp',
      alt:
        'PTCA faculty leading a practical taxation and tax compliance workshop for an organization.',
      caption: 'Tax compliance training room',
    },
    audience:
      'Professional sessions for employees, finance teams and business owners.',
    topics: [
      'Income Tax & Sales Tax Compliance',
      'FBR Filings & Withholding Tax',
      'Tax Returns & Documentation',
      'Tax Audits and Regulatory Awareness',
    ],
    cta: 'Request a Tax Session',
    whatsappMessage:
      'Hi PTCA, we would like to arrange a corporate Taxation & Tax Compliance session for our organization. Please share the next available dates and pricing.',
  },
  {
    id: 'corporate-law-compliance',
    title: 'Corporate Law & Compliance',
    icon: 'briefcase',
    image: {
      src: '/Corporate_Law_&_Compliance.webp',
      alt:
        'Senior management and compliance teams in a corporate governance and secretarial practices session.',
      caption: 'Corporate law and governance meeting',
    },
    audience:
      'Practical sessions for management, administration and compliance teams.',
    topics: [
      'Company Incorporation & SECP Filings',
      'Corporate Governance',
      'Secretarial Practices',
      'Business Documentation & Compliance',
    ],
    cta: 'Request a Corporate Session',
    whatsappMessage:
      'Hi PTCA, we would like to arrange a Corporate Law & Compliance session for our organization. Please share the next available dates and pricing.',
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property (IP)',
    icon: 'shield',
    image: {
      src: '/Intellectual_Property_(IP).webp',
      alt:
        'Professional seminar on intellectual property, trademark and copyright protection for businesses.',
      caption: 'Intellectual property awareness seminar',
    },
    audience:
      'Awareness sessions to help organizations understand and protect intellectual property.',
    topics: [
      'Trademark Registration & Brand Protection',
      'Copyright Awareness',
      'Intellectual Property Rights',
      'IP Protection for Businesses',
    ],
    cta: 'Request an IP Session',
    whatsappMessage:
      'Hi PTCA, we would like to arrange an Intellectual Property awareness session for our organization. Please share the next available dates and pricing.',
  },
  {
    id: 'human-resources',
    title: 'Human Resources (HR)',
    icon: 'users',
    image: {
      src: '/Human_Resources_(HR).webp',
      alt:
        'HR workshop with managers and employees covering policies, recruitment and performance management.',
      caption: 'Human resources workshop',
    },
    audience: 'Workshops for HR teams, managers and employees.',
    topics: [
      'HR Policies & Employee Documentation',
      'Recruitment & Selection',
      'Performance Management',
      'Labour Law Awareness & Workplace Practices',
    ],
    cta: 'Request an HR Session',
    whatsappMessage:
      'Hi PTCA, we would like to arrange an HR workshop for our organization. Please share the next available dates and pricing.',
  },
  {
    id: 'teacher-training',
    title: 'Teacher Training & Professional Development',
    icon: 'graduation',
    image: {
      src: '/Teacher_Training_&_Professional_Development.webp',
      alt:
        'Teachers and educators taking part in a PTCA professional development workshop in a classroom.',
      caption: 'Teacher training classroom',
    },
    audience:
      'Professional development programs for school teachers, academic coordinators and educational institutions.',
    topics: [
      'Effective Teaching Methods & Classroom Management',
      'Student Engagement & Communication Skills',
      'Lesson Planning & Assessment Techniques',
      'Professional Ethics & Teacher Development',
      'Digital Tools for Teaching and Learning',
    ],
    cta: 'Request a Teacher Training Session',
    whatsappMessage:
      'Hi PTCA, we would like to arrange a Teacher Training & Professional Development session for our institution. Please share the next available dates and pricing.',
  },
];

export const CORPORATE_TRAINING_FORMATS = [
  'On-site session',
  'Online webinar',
  'Customized workshop',
  'Hybrid (on-site + online)',
] as const;

export type CorporateTrainingFormat =
  (typeof CORPORATE_TRAINING_FORMATS)[number];
