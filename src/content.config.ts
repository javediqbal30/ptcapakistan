import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections define the shape of every course, mentor and article.
 * Frontmatter is validated at build time, so a typo in a course file fails the
 * build instead of shipping broken UI or invalid schema.org data.
 */

const modes = z.enum(['Physical', 'Online', 'Hybrid']);
const category = z.enum([
  'Taxation',
  'Corporate',
  'Human Resources',
  'Intellectual Property',
  'Technology & ERP',
  'E-Commerce',
]);

const faq = z.object({
  q: z.string(),
  a: z.string(),
});

const module = z.object({
  title: z.string(),
  points: z.array(z.string()).default([]),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    /** Compact label used on cards, menus and the enrolment dropdown. */
    shortTitle: z.string(),
    category,
    /** Controls ordering on listing pages. Lower comes first. */
    order: z.number().default(99),
    summary: z.string(),
    duration: z.string(),
    /** ISO 8601 duration for schema.org, e.g. PT40H or P3M. */
    durationISO: z.string(),
    sessionsPerWeek: z.number().optional(),
    modes: z.array(modes).min(1),
    eligibility: z.array(z.string()).default([]),
    outcomes: z.array(z.string()).default([]),
    modules: z.array(module).default([]),
    authoritiesCovered: z.array(z.string()).default([]),
    careerPaths: z.array(z.string()).default([]),
    certificateName: z.string().optional(),
    /** Related mentor entries (only confirmed faculty). */
    mentors: z.array(reference('mentors')).default([]),
    faqs: z.array(faq).default([]),
    /** Custom social card. Falls back to the site default when omitted. */
    ogImage: z.string().optional(),
    /**
     * SEO title override. The brand suffix is appended by BaseLayout, so this
     * value must NOT already contain "PTCA" (avoids "X | PTCA | PTCA").
     */
    seoTitle: z.string().optional(),
    /** SEO description override; falls back to `summary`. */
    seoDescription: z.string().optional(),
    /** Last reviewed date - a genuine freshness signal for SEO/GEO. */
    updated: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

const mentors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/mentors' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    yearsExperience: z.number(),
    qualifications: z.array(z.string()).default([]),
    memberships: z.array(z.string()).default([]),
    expertise: z.array(z.string()).default([]),
    courses: z.array(reference('courses')).default([]),
    linkedin: z.string().url().optional(),
    photo: z.string().optional(),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'Income Tax',
      'Sales Tax',
      'Tax Litigation',
      'Corporate & SECP',
      'Human Resources',
      'Careers',
    ]),
    author: reference('mentors').optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    /** Primary course this article funnels into. */
    relatedCourse: reference('courses').optional(),
    faqs: z.array(faq).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { courses, mentors, posts };
