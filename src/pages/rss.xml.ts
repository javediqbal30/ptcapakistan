import type { APIRoute } from 'astro';
import { SITE } from '@data/site';
import { getPublishedPosts, postPath } from '@lib/content';
import { absoluteUrl } from '@lib/seo';

/**
 * /rss.xml - RSS 2.0 feed of the published articles. Feeds help search and
 * generative engines discover new content quickly.
 */
const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();

  const items = posts
    .map((post) => {
      const url = absoluteUrl(postPath(post));
      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.data.description)}</description>
      <category>${escapeXml(post.data.category)}</category>
      <pubDate>${post.data.publishedAt.toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.legalName)} - Articles</title>
    <link>${SITE.url}/resources/</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>en-pk</language>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
