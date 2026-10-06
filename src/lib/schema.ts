import { SITE, KNOWS_ABOUT } from '@data/site';
import { absoluteUrl } from './seo';

/**
 * Structured-data builders. Each function returns a plain schema.org object;
 * pages compose them into a single @graph and render once in BaseLayout.
 * Keeping builders pure (no side effects) makes them trivially testable.
 */

type JsonLd = Record<string, unknown>;

const ORG_ID = absoluteUrl('/#organization');
const WEBSITE_ID = absoluteUrl('/#website');

/** EducationalOrganization + LocalBusiness: the academy as a local entity. */
export function organizationSchema(): JsonLd {
  const node: JsonLd = {
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': ORG_ID,
    name: SITE.legalName,
    alternateName: [SITE.shortName, 'PTCA Pakistan'],
    url: absoluteUrl('/'),
    description: SITE.description,
    slogan: SITE.slogan,
    email: SITE.email,
    telephone: SITE.phone.e164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.singleLine.split(', Karachi')[0],
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: [
      { '@type': 'City', name: 'Karachi' },
      { '@type': 'Country', name: 'Pakistan' },
    ],
    knowsAbout: [...KNOWS_ABOUT],
    logo: absoluteUrl('/logo.png'),
    image: absoluteUrl('/og-default.png'),
  };

  // Only emit optional properties when real values exist - never fabricate.
  if (SITE.geo) {
    node.geo = { '@type': 'GeoCoordinates', ...SITE.geo };
  }
  if (SITE.openingHours?.length) {
    node.openingHours = SITE.openingHours;
  }
  const socials = Object.values(SITE.social).filter(Boolean);
  if (socials.length) {
    node.sameAs = socials;
  }

  return node;
}

export function websiteSchema(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absoluteUrl('/'),
    name: SITE.shortName,
    description: SITE.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-PK',
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): JsonLd {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Map our internal learning modes to schema.org courseMode values. */
const COURSE_MODE: Record<string, string> = {
  Physical: 'onsite',
  Online: 'online',
  Hybrid: 'blended',
};

export interface CourseSchemaInput {
  title: string;
  summary: string;
  path: string;
  durationISO: string;
  modes: string[];
  certificateName?: string;
  outcomes: string[];
}

export function courseSchema(course: CourseSchemaInput): JsonLd {
  return {
    '@type': 'Course',
    name: course.title,
    description: course.summary,
    url: absoluteUrl(course.path),
    provider: { '@id': ORG_ID },
    inLanguage: 'en',
    ...(course.certificateName
      ? { educationalCredentialAwarded: course.certificateName }
      : {}),
    teaches: course.outcomes,
    hasCourseInstance: course.modes.map((mode) => ({
      '@type': 'CourseInstance',
      courseMode: COURSE_MODE[mode] ?? 'blended',
      courseWorkload: course.durationISO,
      ...(mode === 'Physical' ? { location: { '@id': ORG_ID } } : {}),
    })),
  };
}

export interface PersonSchemaInput {
  name: string;
  title: string;
  expertise: string[];
  qualifications: string[];
  memberships: string[];
  linkedin?: string;
  path: string;
}

export function personSchema(person: PersonSchemaInput): JsonLd {
  return {
    '@type': 'Person',
    name: person.name,
    jobTitle: person.title,
    url: absoluteUrl(person.path),
    knowsAbout: person.expertise,
    ...(person.qualifications.length
      ? { hasCredential: person.qualifications }
      : {}),
    ...(person.memberships.length
      ? { memberOf: person.memberships.map((m) => ({ '@type': 'Organization', name: m })) }
      : {}),
    ...(person.linkedin ? { sameAs: [person.linkedin] } : {}),
    worksFor: { '@id': ORG_ID },
  };
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  path: string;
  publishedAt: Date;
  updatedAt?: Date;
  authorName?: string;
  ogImage?: string;
}

export function articleSchema(article: ArticleSchemaInput): JsonLd {
  return {
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: absoluteUrl(article.path),
    datePublished: article.publishedAt.toISOString(),
    dateModified: (article.updatedAt ?? article.publishedAt).toISOString(),
    ...(article.authorName
      ? { author: { '@type': 'Person', name: article.authorName } }
      : {}),
    publisher: { '@id': ORG_ID },
    image: absoluteUrl(article.ogImage ?? '/og-default.png'),
  };
}

/** Compose nodes into a single renderable @graph script. */
export function graph(...nodes: JsonLd[]): JsonLd {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
