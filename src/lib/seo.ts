import { SITE } from '@data/site';

/**
 * Resolve any path to an absolute URL against the canonical origin.
 * Used for canonical tags, Open Graph URLs and schema `@id`s.
 */
export function absoluteUrl(path = '/'): string {
  return new URL(path, SITE.url).toString();
}

export interface SeoProps {
  /** Full <title>. Keep under ~60 characters for the SERP. */
  title: string;
  /** Meta description. Keep between 120-155 characters. */
  description: string;
  /** Path used for the canonical URL, e.g. "/courses/". */
  canonical: string;
  /** Social share image path. Falls back to the site default. */
  ogImage?: string;
  /** Open Graph object type. */
  type?: 'website' | 'article' | 'business.business';
  /** Exclude the page from search engines. */
  noindex?: boolean;
  /** Render the title without the brand suffix (used on the home page). */
  bareTitle?: boolean;
}

// 1200x630 PNG, generated from public/og-default.svg via `npm run assets`.
const DEFAULT_OG = '/og-default.png';

/** Build the final document title, appending the brand where appropriate. */
export function formatTitle({ title, bareTitle }: Pick<SeoProps, 'title' | 'bareTitle'>): string {
  return bareTitle ? title : `${title} | ${SITE.shortName}`;
}

/**
 * Collect everything BaseLayout needs to render the <head>. Keeping this in a
 * function means pages express intent (title + description + path) and never
 * repeat boilerplate like canonical or OG defaults.
 */
export function resolveSeo(props: SeoProps) {
  return {
    title: formatTitle(props),
    description: props.description,
    canonical: absoluteUrl(props.canonical),
    ogImage: absoluteUrl(props.ogImage ?? DEFAULT_OG),
    type: props.type ?? 'website',
    noindex: Boolean(props.noindex),
  };
}
