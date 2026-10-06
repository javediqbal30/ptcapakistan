import type { APIRoute } from 'astro';
import { SITE } from '@data/site';

/**
 * robots.txt as a route (rather than a static file) so the sitemap URL always
 * matches the configured site origin.
 *
 * Note: AI/search crawlers are explicitly allowed. Generative engines need to
 * fetch the HTML to cite the academy, and the whole site is public marketing
 * content - there is nothing private to hide.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

const body = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /thank-you/

${AI_CRAWLERS.map((agent) => `User-agent: ${agent}\nAllow: /`).join('\n\n')}

Sitemap: ${SITE.url}/sitemap-index.xml
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });