/**
 * Calculator registry — single source of truth for all 25 PTCA calculators.
 * SEO fields are strictly validated:
 *   title   → ≤ 55 chars (displayed in browser tab & SERP)
 *   description → 120-155 chars (meta description)
 *   canonical → absolute path, always trailing-slash
 */

export type CalcCategory = 'taxation' | 'hr-payroll' | 'corporate' | 'finance';

export interface Calculator {
  /** URL slug — also used as the page route /calculators/[slug]/ */
  slug: string;
  /** SEO <title> — keep ≤ 55 chars (brand suffix added by BaseLayout) */
  title: string;
  /** Meta description — 120–155 chars */
  description: string;
  /** Canonical path */
  canonical: string;
  /** Short card label */
  label: string;
  /** One-line card description */
  summary: string;
  category: CalcCategory;
  /** Icon name from Icon.astro */
  icon: string;
  /** Popular calculators shown first in hub */
  featured?: boolean;
  /** Keywords for JSON-LD and internal search */
  keywords: string[];
}

export const CALCULATORS: Calculator[] = [
  // ─── TAXATION ────────────────────────────────────────────────────────────
  {
    slug: 'income-tax',
    title: 'Pakistan Income Tax Calculator 2022–2027',
    description:
      'Calculate your Pakistan income tax for salaried individuals using FBR official slabs from Tax Year 2022-23 to 2026-27. Get annual and monthly tax instantly.',
    canonical: '/calculators/income-tax/',
    label: 'Income Tax Calculator',
    summary: 'FBR salaried tax — 5 tax years (2022–2027)',
    category: 'taxation',
    icon: 'book',
    featured: true,
    keywords: ['income tax', 'FBR', 'salary tax', 'tax calculator Pakistan', '2026-27 slabs'],
  },
  {
    slug: 'withholding-tax',
    title: 'Withholding Tax Calculator Pakistan — Sec 149',
    description:
      'Calculate monthly withholding tax on salary under Section 149 of Income Tax Ordinance 2001. Helps employers deduct the correct amount each month.',
    canonical: '/calculators/withholding-tax/',
    label: 'Withholding Tax',
    summary: 'Section 149 — monthly employer deduction',
    category: 'taxation',
    icon: 'briefcase',
    featured: true,
    keywords: ['withholding tax', 'section 149', 'employer tax deduction', 'WHT Pakistan'],
  },
  {
    slug: 'sales-tax',
    title: 'Sales Tax / GST Calculator Pakistan 17%',
    description:
      'Add or remove 17% Pakistan sales tax (GST) from any amount instantly. Also supports FED and custom tax rates for business invoicing and pricing.',
    canonical: '/calculators/sales-tax/',
    label: 'Sales Tax / GST',
    summary: '17% GST — add or extract tax from amount',
    category: 'taxation',
    icon: 'shield',
    featured: true,
    keywords: ['sales tax Pakistan', 'GST calculator', '17% tax', 'FBR sales tax'],
  },
  {
    slug: 'advance-tax',
    title: 'Advance Tax Calculator Pakistan — Section 147',
    description:
      'Estimate quarterly advance tax under Section 147 of Pakistan Income Tax Ordinance for business owners, freelancers and AOP. Avoid penalties on late payment.',
    canonical: '/calculators/advance-tax/',
    label: 'Advance Tax',
    summary: 'Section 147 — quarterly business advance tax',
    category: 'taxation',
    icon: 'calendar',
    keywords: ['advance tax Pakistan', 'section 147', 'quarterly tax', 'business tax'],
  },
  {
    slug: 'super-tax',
    title: 'Super Tax Calculator Pakistan — Section 4C',
    description:
      'Calculate Super Tax under Section 4C of Pakistan Income Tax Ordinance. Applies to individuals and companies earning above Rs. 150M to Rs. 500M annually.',
    canonical: '/calculators/super-tax/',
    label: 'Super Tax',
    summary: 'Section 4C — 8%/10% on high income',
    category: 'taxation',
    icon: 'star',
    keywords: ['super tax Pakistan', 'section 4C', 'super tax 2024', 'income tax surcharge'],
  },
  {
    slug: 'corporate-tax',
    title: 'Corporate Tax Calculator Pakistan 2026-27',
    description:
      'Calculate corporate income tax in Pakistan for companies, AOP and SMEs. Includes 29% standard rate, banking sector rates and small company concessions.',
    canonical: '/calculators/corporate-tax/',
    label: 'Corporate Tax',
    summary: '29% corporate income tax on profits',
    category: 'taxation',
    icon: 'briefcase',
    keywords: ['corporate tax Pakistan', 'company tax rate', 'AOP tax', 'business income tax'],
  },
  {
    slug: 'capital-gains-tax',
    title: 'Capital Gains Tax Calculator Pakistan',
    description:
      'Calculate Capital Gains Tax (CGT) on shares, property and other assets in Pakistan. Covers filer and non-filer rates, holding period reductions.',
    canonical: '/calculators/capital-gains-tax/',
    label: 'Capital Gains Tax',
    summary: 'CGT on property, shares & assets',
    category: 'taxation',
    icon: 'globe',
    keywords: ['capital gains tax Pakistan', 'CGT', 'property tax', 'share CGT Pakistan'],
  },
  {
    slug: 'provincial-sales-tax',
    title: 'SRB / PRA Services Tax Calculator Pakistan',
    description:
      'Calculate provincial services tax for Sindh (SRB 13%), Punjab (PRA 16%), KPK and Balochistan. Essential for service providers and consultants in Pakistan.',
    canonical: '/calculators/provincial-sales-tax/',
    label: 'SRB / PRA Tax',
    summary: 'Sindh 13% & Punjab 16% services tax',
    category: 'taxation',
    icon: 'globe',
    keywords: ['SRB tax', 'PRA tax', 'Sindh services tax', 'Punjab services tax', 'provincial tax'],
  },
  {
    slug: 'tax-penalty',
    title: 'Tax Penalty & Surcharge Calculator Pakistan',
    description:
      'Calculate late filing penalties and default surcharge on unpaid taxes in Pakistan. Covers Section 182 penalties and KIBOR+3% surcharge for delayed payments.',
    canonical: '/calculators/tax-penalty/',
    label: 'Tax Penalty & Surcharge',
    summary: 'Late filing penalty + default surcharge',
    category: 'taxation',
    icon: 'clock',
    keywords: ['tax penalty Pakistan', 'surcharge FBR', 'late filing penalty', 'section 182'],
  },
  {
    slug: 'zakat',
    title: 'Zakat Calculator Pakistan 2026 — 2.5%',
    description:
      'Calculate your annual Zakat obligation in Pakistan at 2.5% of zakatable assets (cash, gold, silver, business inventory) above the current Nisab threshold.',
    canonical: '/calculators/zakat/',
    label: 'Zakat Calculator',
    summary: '2.5% on zakatable wealth above Nisab',
    category: 'taxation',
    icon: 'star',
    keywords: ['zakat calculator Pakistan', 'nisab 2026', 'zakat on savings', 'zakat gold silver'],
  },

  // ─── HR & PAYROLL ─────────────────────────────────────────────────────────
  {
    slug: 'net-salary',
    title: 'Net Take-Home Salary Calculator Pakistan',
    description:
      'Calculate your exact net take-home salary in Pakistan after income tax (FBR 2026-27), EOBI and ESSI deductions. Supports all salary ranges instantly.',
    canonical: '/calculators/net-salary/',
    label: 'Net Salary Calculator',
    summary: 'Gross → Net after tax, EOBI & ESSI',
    category: 'hr-payroll',
    icon: 'users',
    featured: true,
    keywords: ['net salary Pakistan', 'take home pay', 'salary after tax', 'payroll calculator'],
  },
  {
    slug: 'eobi',
    title: 'EOBI Contribution Calculator Pakistan 2026',
    description:
      'Calculate monthly EOBI (Employees Old-Age Benefits) contributions for employer (5%) and employee (1%) based on Pakistan minimum wage. Mandatory for 5+ employee firms.',
    canonical: '/calculators/eobi/',
    label: 'EOBI Calculator',
    summary: 'Employer 5% + Employee 1% of minimum wage',
    category: 'hr-payroll',
    icon: 'users',
    keywords: ['EOBI calculator', 'old age benefits Pakistan', 'EOBI contribution', 'HR payroll'],
  },
  {
    slug: 'essi',
    title: 'ESSI / Social Security Calculator Pakistan',
    description:
      'Calculate Employees Social Security Institution (ESSI) contributions for PESSI (Punjab), SESSI (Sindh), KPESI and BESSI. Employer-only contribution at 6–7%.',
    canonical: '/calculators/essi/',
    label: 'ESSI / Social Security',
    summary: 'PESSI / SESSI — employer contribution 6%',
    category: 'hr-payroll',
    icon: 'shield',
    keywords: ['ESSI Pakistan', 'PESSI', 'SESSI', 'social security Pakistan', 'employer contribution'],
  },
  {
    slug: 'gratuity',
    title: 'Gratuity Calculator Pakistan — Labor Law',
    description:
      'Calculate end-of-service gratuity in Pakistan using the standard labor law formula: (last gross salary ÷ 26) × 30 × completed years. Covers all provinces.',
    canonical: '/calculators/gratuity/',
    label: 'Gratuity Calculator',
    summary: '(Last salary ÷ 26) × 30 × years of service',
    category: 'hr-payroll',
    icon: 'graduation',
    featured: true,
    keywords: ['gratuity calculator Pakistan', 'end of service', 'labor law gratuity', 'terminal benefit'],
  },
  {
    slug: 'provident-fund',
    title: 'Provident Fund Calculator Pakistan',
    description:
      'Calculate monthly provident fund contributions (8.33%–10% of basic salary) for both employer and employee. See total accumulation over your service period.',
    canonical: '/calculators/provident-fund/',
    label: 'Provident Fund',
    summary: '8.33–10% basic salary — both sides',
    category: 'hr-payroll',
    icon: 'briefcase',
    keywords: ['provident fund Pakistan', 'PF calculator', 'retirement fund', 'EPF Pakistan'],
  },
  {
    slug: 'leave-encashment',
    title: 'Leave Encashment Calculator Pakistan',
    description:
      'Calculate leave encashment payment in Pakistan using basic salary ÷ 26 working days × number of unused leave days. Based on Factories Act and standing orders.',
    canonical: '/calculators/leave-encashment/',
    label: 'Leave Encashment',
    summary: 'Basic salary ÷ 26 × unused leave days',
    category: 'hr-payroll',
    icon: 'calendar',
    keywords: ['leave encashment Pakistan', 'annual leave payment', 'HR calculator', 'unused leave'],
  },
  {
    slug: 'overtime',
    title: 'Overtime Pay Calculator Pakistan — Factories Act',
    description:
      'Calculate overtime wages in Pakistan under the Factories Act: 2× the hourly rate for hours worked beyond 8 per day or 48 per week. For all industries.',
    canonical: '/calculators/overtime/',
    label: 'Overtime Calculator',
    summary: 'Factories Act — 2× hourly rate for OT',
    category: 'hr-payroll',
    icon: 'clock',
    keywords: ['overtime calculator Pakistan', 'OT pay', 'Factories Act overtime', 'double pay'],
  },
  {
    slug: 'minimum-wage',
    title: 'Minimum Wage Checker Pakistan 2024-25',
    description:
      'Check the current minimum wage in all four provinces of Pakistan: Punjab (Rs. 37,000), Sindh (Rs. 37,000), KPK and Balochistan. Updated for 2024-25.',
    canonical: '/calculators/minimum-wage/',
    label: 'Minimum Wage Checker',
    summary: 'Province-wise minimum wage 2024-25',
    category: 'hr-payroll',
    icon: 'users',
    keywords: ['minimum wage Pakistan', 'minimum salary 2025', 'province minimum wage', 'labor law'],
  },
  {
    slug: 'employee-cost',
    title: 'Total Employee Cost Calculator Pakistan',
    description:
      'Calculate the true annual and monthly cost of an employee in Pakistan including gross salary, income tax, EOBI, ESSI and other statutory contributions.',
    canonical: '/calculators/employee-cost/',
    label: 'Employee Cost Calculator',
    summary: 'Total employer cost including all contributions',
    category: 'hr-payroll',
    icon: 'briefcase',
    keywords: ['employee cost Pakistan', 'total cost of employment', 'CTC calculator', 'payroll cost'],
  },

  // ─── CORPORATE & LEGAL ───────────────────────────────────────────────────
  {
    slug: 'secp-fee',
    title: 'SECP Company Registration Fee Calculator',
    description:
      'Calculate SECP company incorporation fees in Pakistan based on authorized share capital. Covers private limited, SMC-private and public company registration costs.',
    canonical: '/calculators/secp-fee/',
    label: 'SECP Registration Fee',
    summary: 'Company incorporation fee by share capital',
    category: 'corporate',
    icon: 'briefcase',
    keywords: ['SECP fee', 'company registration Pakistan', 'incorporation fee', 'private limited company'],
  },
  {
    slug: 'trademark-fee',
    title: 'Trademark Fee Calculator Pakistan — IPO',
    description:
      'Calculate IPO Pakistan trademark registration fees per class: search (Rs. 1,000), filing (Rs. 3,000) and registration (Rs. 9,000). Multi-class bulk calculation supported.',
    canonical: '/calculators/trademark-fee/',
    label: 'Trademark Fee',
    summary: 'IPO Pakistan — per class fee calculator',
    category: 'corporate',
    icon: 'shield',
    keywords: ['trademark Pakistan', 'IPO Pakistan fee', 'trademark registration cost', 'brand protection'],
  },
  {
    slug: 'loan-emi',
    title: 'Loan EMI Calculator Pakistan — Monthly',
    description:
      'Calculate your monthly loan installment (EMI) for any loan amount, interest rate and tenure. See total interest payable and full repayment schedule for Pakistan banks.',
    canonical: '/calculators/loan-emi/',
    label: 'Loan EMI Calculator',
    summary: 'Monthly installment on any loan amount',
    category: 'corporate',
    icon: 'globe',
    featured: true,
    keywords: ['loan EMI Pakistan', 'monthly installment', 'bank loan calculator', 'home loan EMI'],
  },
  {
    slug: 'profit-margin',
    title: 'Business Profit Margin Calculator Pakistan',
    description:
      'Calculate gross profit margin, net profit margin and markup percentage for your Pakistan business. Essential for pricing, financial planning and investor presentations.',
    canonical: '/calculators/profit-margin/',
    label: 'Profit Margin',
    summary: 'Gross & net margin from revenue and cost',
    category: 'corporate',
    icon: 'star',
    keywords: ['profit margin calculator', 'gross profit Pakistan', 'markup calculator', 'business profit'],
  },

  // ─── GENERAL FINANCE ─────────────────────────────────────────────────────
  {
    slug: 'interest',
    title: 'Simple & Compound Interest Calculator PK',
    description:
      'Compare simple and compound interest on savings or investments in Pakistan. Calculate growth over any period with monthly, quarterly or annual compounding options.',
    canonical: '/calculators/interest/',
    label: 'Interest Calculator',
    summary: 'Simple vs compound interest comparison',
    category: 'finance',
    icon: 'globe',
    keywords: ['interest calculator Pakistan', 'compound interest', 'savings calculator', 'investment return'],
  },
  {
    slug: 'inflation',
    title: 'Pakistan Inflation Adjustment Calculator',
    description:
      'Adjust any Pakistani Rupee amount for inflation over the years. See the real value of money using SBP CPI data from 2000 to 2026. Useful for salary comparisons.',
    canonical: '/calculators/inflation/',
    label: 'Inflation Calculator',
    summary: 'Real PKR value adjusted for inflation',
    category: 'finance',
    icon: 'clock',
    keywords: ['inflation calculator Pakistan', 'PKR value', 'CPI Pakistan', 'real value money'],
  },
];

/** All unique categories */
export const CALC_CATEGORIES: { key: CalcCategory; label: string; icon: string }[] = [
  { key: 'taxation',   label: 'Taxation',       icon: 'book'       },
  { key: 'hr-payroll', label: 'HR & Payroll',    icon: 'users'      },
  { key: 'corporate',  label: 'Corporate & Legal', icon: 'briefcase' },
  { key: 'finance',    label: 'General Finance', icon: 'globe'      },
];

/** Get a single calculator by slug */
export function getCalculator(slug: string): Calculator | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}

/** Get all calculators in a category */
export function getByCategory(cat: CalcCategory): Calculator[] {
  return CALCULATORS.filter((c) => c.category === cat);
}

/** Featured calculators for homepage teaser */
export const FEATURED_CALCS = CALCULATORS.filter((c) => c.featured);
