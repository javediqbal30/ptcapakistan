/**
 * Navigation model. Kept separate from content so the chrome stays predictable
 * while course pages evolve. Course slugs here must match the content
 * collection entry slugs in `src/content/courses`.
 */

export interface NavLink {
  label: string;
  href: string;
  /** Optional short helper line for the mega-menu. */
  description?: string;
}

export interface CourseCategory {
  label: string;
  /** Course slugs belonging to this category, in display order. */
  slugs: string[];
}

export const PRIMARY_NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Courses', href: '/courses/' },
  { label: 'Mentors', href: '/mentors/' },
  { label: 'Resources', href: '/resources/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
];

/** Grouped course links powering the "Courses" mega-menu. */
export const COURSE_MENU: CourseCategory[] = [
  {
    label: 'Taxation',
    slugs: [
      'advanced-taxation-litigation-course',
      'sales-tax-course-pakistan',
      'foundation-tax-corporate-course',
    ],
  },
  {
    label: 'Corporate',
    slugs: [
      'company-secretary-course-pakistan',
      'intellectual-property-course-pakistan',
    ],
  },
  {
    label: 'Human Resources',
    slugs: ['chrp-hr-course-karachi'],
  },
];

export const FOOTER_QUICK_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About PTCA', href: '/about/' },
  { label: 'Our Courses', href: '/courses/' },
  { label: 'Our Mentors', href: '/mentors/' },
  { label: 'Admissions', href: '/admissions/' },
  { label: 'Resources', href: '/resources/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact Us', href: '/contact/' },
];
