import type { APIRoute } from 'astro';
import { SITE } from '@data/site';
import { CALCULATORS } from '@data/calculators';
import { getPublishedCourses, getPublishedMentors, getPublishedPosts } from '@lib/content';
import { getPosts } from '@lib/sanity';

interface SitemapEntry {
  url: string;
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly';
  lastmod?: string;
}

/**
 * Direct XML Sitemap containing all website URLs.
 * Displays all pages, courses, calculators, mentors, and articles in a single <urlset>.
 */
export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];

  const entries: SitemapEntry[] = [
    // Main core pages
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/courses/', priority: 0.9, changefreq: 'weekly' },
    { url: '/calculators/', priority: 0.9, changefreq: 'weekly' },
    { url: '/admissions/', priority: 0.9, changefreq: 'weekly' },
    { url: '/enroll/', priority: 0.9, changefreq: 'weekly' },
    { url: '/corporate-training/', priority: 0.8, changefreq: 'weekly' },
    { url: '/about/', priority: 0.7, changefreq: 'weekly' },
    { url: '/contact/', priority: 0.7, changefreq: 'weekly' },
    { url: '/mentors/', priority: 0.7, changefreq: 'weekly' },
    { url: '/blog/', priority: 0.8, changefreq: 'daily' },
    { url: '/resources/', priority: 0.7, changefreq: 'weekly' },
    { url: '/privacy-policy/', priority: 0.5, changefreq: 'monthly' },
    { url: '/refund-policy/', priority: 0.5, changefreq: 'monthly' },
    { url: '/terms/', priority: 0.5, changefreq: 'monthly' },
  ];

  // 1. All 25 Pakistan Calculators
  for (const calc of CALCULATORS) {
    entries.push({
      url: `/calculators/${calc.slug}/`,
      priority: calc.featured ? 0.9 : 0.8,
      changefreq: 'weekly',
    });
  }

  // 2. All Published Courses
  try {
    const courses = await getPublishedCourses();
    for (const c of courses) {
      entries.push({
        url: `/courses/${c.id}/`,
        priority: 0.9,
        changefreq: 'weekly',
      });
    }
  } catch (err) {
    console.error('[sitemap] Error fetching courses:', err);
  }

  // 3. All Mentors
  try {
    const mentors = await getPublishedMentors();
    for (const m of mentors) {
      entries.push({
        url: `/mentors/${m.id}/`,
        priority: 0.7,
        changefreq: 'monthly',
      });
    }
  } catch (err) {
    console.error('[sitemap] Error fetching mentors:', err);
  }

  // 4. Content collection resources/articles
  try {
    const posts = await getPublishedPosts();
    for (const p of posts) {
      entries.push({
        url: `/resources/${p.id}/`,
        priority: 0.7,
        changefreq: 'weekly',
        lastmod: p.data.updatedAt?.toISOString().split('T')[0] || p.data.publishedAt.toISOString().split('T')[0],
      });
    }
  } catch (err) {
    console.error('[sitemap] Error fetching resources:', err);
  }

  // 5. Sanity Blog Posts
  try {
    const blogPosts = await getPosts();
    for (const bp of blogPosts) {
      entries.push({
        url: `/blog/${bp.slug}/`,
        priority: 0.8,
        changefreq: 'weekly',
        lastmod: bp.publishedAt ? new Date(bp.publishedAt).toISOString().split('T')[0] : today,
      });
    }
  } catch (err) {
    console.error('[sitemap] Error fetching blog posts:', err);
  }

  // Deduplicate by URL
  const seen = new Set<string>();
  const uniqueEntries = entries.filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${uniqueEntries
  .map(
    (e) => `  <url>
    <loc>${SITE.url}${e.url}</loc>
    <lastmod>${e.lastmod || today}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
