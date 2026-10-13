/**
 * FBR (Federal Board of Revenue) Pakistan — Salaried Individual Income Tax Slabs
 * Last 5 Tax Years: 2022-23 through 2026-27
 *
 * Source: Finance Acts 2022, 2023, 2024, 2025, 2026
 * Section 149 of Income Tax Ordinance 2001 (withholding on salary)
 * Applies when salary income > 75% of total taxable income.
 */

export interface TaxSlab {
  min: number;
  max: number;
  base: number;
  rate: number;
  /** Human-readable rate label e.g. "15%" */
  label: string;
}

export interface TaxYear {
  year: string;
  label: string;
  financeAct: string;
  slabs: TaxSlab[];
}

export const TAX_YEARS: TaxYear[] = [
  {
    year: '2026-27',
    label: 'Tax Year 2026-27 (Current)',
    financeAct: 'Finance Act 2026',
    slabs: [
      { min: 0,         max: 600_000,   base: 0,         rate: 0.00,  label: '0%'  },
      { min: 600_001,   max: 1_200_000, base: 0,         rate: 0.01,  label: '1%'  },
      { min: 1_200_001, max: 2_200_000, base: 6_000,     rate: 0.11,  label: '11%' },
      { min: 2_200_001, max: 3_200_000, base: 116_000,   rate: 0.20,  label: '20%' },
      { min: 3_200_001, max: 4_100_000, base: 316_000,   rate: 0.25,  label: '25%' },
      { min: 4_100_001, max: 5_600_000, base: 541_000,   rate: 0.29,  label: '29%' },
      { min: 5_600_001, max: 7_000_000, base: 976_000,   rate: 0.32,  label: '32%' },
      { min: 7_000_001, max: Infinity,  base: 1_424_000, rate: 0.35,  label: '35%' },
    ],
  },
  {
    year: '2025-26',
    label: 'Tax Year 2025-26',
    financeAct: 'Finance Act 2025',
    slabs: [
      { min: 0,         max: 600_000,   base: 0,       rate: 0.00, label: '0%'  },
      { min: 600_001,   max: 1_200_000, base: 0,       rate: 0.01, label: '1%'  },
      { min: 1_200_001, max: 2_200_000, base: 6_000,   rate: 0.11, label: '11%' },
      { min: 2_200_001, max: 3_200_000, base: 116_000, rate: 0.23, label: '23%' },
      { min: 3_200_001, max: 4_100_000, base: 346_000, rate: 0.30, label: '30%' },
      { min: 4_100_001, max: Infinity,  base: 616_000, rate: 0.35, label: '35%' },
    ],
  },
  {
    year: '2024-25',
    label: 'Tax Year 2024-25',
    financeAct: 'Finance Act 2024',
    slabs: [
      { min: 0,         max: 600_000,   base: 0,       rate: 0.00, label: '0%'  },
      { min: 600_001,   max: 1_200_000, base: 0,       rate: 0.05, label: '5%'  },
      { min: 1_200_001, max: 2_200_000, base: 30_000,  rate: 0.15, label: '15%' },
      { min: 2_200_001, max: 3_200_000, base: 180_000, rate: 0.25, label: '25%' },
      { min: 3_200_001, max: 4_100_000, base: 430_000, rate: 0.30, label: '30%' },
      { min: 4_100_001, max: Infinity,  base: 700_000, rate: 0.35, label: '35%' },
    ],
  },
  {
    year: '2023-24',
    label: 'Tax Year 2023-24',
    financeAct: 'Finance Act 2023',
    slabs: [
      { min: 0,         max: 600_000,   base: 0,         rate: 0.000, label: '0%'    },
      { min: 600_001,   max: 1_200_000, base: 0,         rate: 0.025, label: '2.5%'  },
      { min: 1_200_001, max: 2_400_000, base: 15_000,    rate: 0.125, label: '12.5%' },
      { min: 2_400_001, max: 3_600_000, base: 165_000,   rate: 0.225, label: '22.5%' },
      { min: 3_600_001, max: 6_000_000, base: 435_000,   rate: 0.275, label: '27.5%' },
      { min: 6_000_001, max: Infinity,  base: 1_095_000, rate: 0.350, label: '35%'   },
    ],
  },
  {
    year: '2022-23',
    label: 'Tax Year 2022-23',
    financeAct: 'Finance Act 2022',
    slabs: [
      { min: 0,         max: 600_000,   base: 0,         rate: 0.000, label: '0%'    },
      { min: 600_001,   max: 1_200_000, base: 0,         rate: 0.025, label: '2.5%'  },
      { min: 1_200_001, max: 2_400_000, base: 15_000,    rate: 0.125, label: '12.5%' },
      { min: 2_400_001, max: 3_600_000, base: 165_000,   rate: 0.200, label: '20%'   },
      { min: 3_600_001, max: 6_000_000, base: 405_000,   rate: 0.250, label: '25%'   },
      { min: 6_000_001, max: Infinity,  base: 1_005_000, rate: 0.325, label: '32.5%' },
    ],
  },
];

/** Default / latest tax year key */
export const CURRENT_TAX_YEAR = '2026-27';

/** Calculate annual income tax for salaried individual */
export function calcSalariedTax(annualIncome: number, yearKey: string): number {
  const ty = TAX_YEARS.find((t) => t.year === yearKey);
  if (!ty) return 0;
  const slab = ty.slabs.find((s) => annualIncome >= s.min && annualIncome <= s.max);
  if (!slab) return 0;
  return slab.base + (annualIncome - slab.min) * slab.rate;
}
