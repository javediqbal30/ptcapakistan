import { createClient } from '@sanity/client';

/**
 * Sanity read client. Used at build time (and in dev on every request) to
 * fetch blog posts for /blog/ pages.
 *
 * public posts only need the public dataset; the read token is only required
 * when the dataset is private — we read it from the environment and stay
 * undefined when absent so a public dataset still works.
 */
export const sanity = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? process.env.PUBLIC_SANITY_PROJECT_ID ?? 'iqvmrid9',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? process.env.PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
  token: process.env.SANITY_READ_TOKEN || import.meta.env.SANITY_READ_TOKEN || undefined,
});

export interface BlogPostSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  category?: string;
  authorName?: string;
  imageUrl?: string;
  imageAlt?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogPost extends BlogPostSummary {
  body?: unknown[];
}

const summaryFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  seoTitle,
  seoDescription,
  "category": category->name,
  "authorName": author->name,
  "imageUrl": mainImage.asset->url,
  "imageAlt": mainImage.alt
`;

export async function getPosts(): Promise<BlogPostSummary[]> {
  return sanity.fetch(
    `*[_type == "post" && draft != true] | order(publishedAt desc) { ${summaryFields} }`,
  );
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  return sanity.fetch(
    `*[_type == "post" && slug.current == $slug && draft != true][0] {
      ${summaryFields},
      body[]{
        ...,
        _type == "image" => { "url": asset->url, alt, caption }
      }
    }`,
    { slug },
  );
}
