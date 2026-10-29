/**
 * Navigation model. Kept separate from content so the chrome stays predictable
 * while course pages evolve. Course slugs here must match the content
 * collection entry slugs in `src/content/courses`.
 *
 * Calculators mega-menu: all 25 Pakistan calculators grouped into 4 categories.
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
  { label: 'Home',        href: '/'                  },
  { label: 'About',       href: '/about/'             },
  { label: 'Courses',     href: '/courses/'           },
  { label: 'Corporate',   href: '/corporate-training/'},
  { label: 'Calculators', href: '/calculators/'       },
  { label: 'Mentors',     href: '/mentors/'           },
  { label: 'Blog',        href: '/blog/'              },
  { label: 'Contact',     href: '/contact/'           },
];

export interface CalcCategory {
  label: string;
  icon: string;
  links: { label: string; slug: string }[];
}

/** Grouped calculator links powering the "Calculators" mega-menu. */
export const CALC_MENU: CalcCategory[] = [
  {
    label: 'Taxation',
    icon: 'book',
    links: [
      { label: 'Income Tax Calculator',      slug: 'income-tax'          },
      { label: 'Withholding Tax (Sec 149)',   slug: 'withholding-tax'     },
      { label: 'Sales Tax / GST 17%',        slug: 'sales-tax'           },
      { label: 'Advance Tax (Sec 147)',       slug: 'advance-tax'         },
      { label: 'Super Tax (Sec 4C)',          slug: 'super-tax'           },
      { label: 'Corporate Tax',              slug: 'corporate-tax'       },
      { label: 'Capital Gains Tax',          slug: 'capital-gains-tax'   },
      { label: 'SRB / PRA Services Tax',     slug: 'provincial-sales-tax'},
      { label: 'Tax Penalty & Surcharge',    slug: 'tax-penalty'         },
      { label: 'Zakat Calculator',           slug: 'zakat'               },
    ],
  },
  {
    label: 'HR & Payroll',
    icon: 'users',
    links: [
      { label: 'Net Take-Home Salary',       slug: 'net-salary'          },
      { label: 'EOBI Contribution',          slug: 'eobi'                },
      { label: 'ESSI / Social Security',     slug: 'essi'                },
      { label: 'Gratuity Calculator',        slug: 'gratuity'            },
      { label: 'Provident Fund',             slug: 'provident-fund'      },
      { label: 'Leave Encashment',           slug: 'leave-encashment'    },
      { label: 'Overtime Calculator',        slug: 'overtime'            },
      { label: 'Minimum Wage Checker',       slug: 'minimum-wage'        },
      { label: 'Employee Cost Calculator',   slug: 'employee-cost'       },
    ],
  },
  {
    label: 'Corporate & Legal',
    icon: 'briefcase',
    links: [
      { label: 'SECP Registration Fee',      slug: 'secp-fee'            },
      { label: 'Trademark Fee (IPO)',        slug: 'trademark-fee'       },
      { label: 'Loan EMI Calculator',        slug: 'loan-emi'            },
      { label: 'Profit Margin Calculator',   slug: 'profit-margin'       },
      { label: 'Interest Calculator',        slug: 'interest'            },
      { label: 'Inflation Adjustment',       slug: 'inflation'           },
    ],
  },
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
  { label: 'Corporate Training', href: '/corporate-training/' },
  { label: 'Our Mentors', href: '/mentors/' },
  { label: 'Admissions', href: '/admissions/' },
  { label: 'Student LMS Portal', href: 'https://ptca.zenslearn.org/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact Us', href: '/contact/' },
];
