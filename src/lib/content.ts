import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

/**
 * Thin, typed wrappers around the content API. Pages ask for "published
 * courses sorted by order" instead of re-implementing draft filtering and
 * sorting each time.
 */

export type Course = CollectionEntry<'courses'>;
export type Mentor = CollectionEntry<'mentors'>;
export type Post = CollectionEntry<'posts'>;

export async function getPublishedCourses(): Promise<Course[]> {
  const courses = await getCollection('courses', ({ data }) => !data.draft);
  return courses.sort((a, b) => a.data.order - b.data.order);
}

export async function getPublishedMentors(): Promise<Mentor[]> {
  const mentors = await getCollection('mentors', ({ data }) => !data.draft);
  return mentors.sort((a, b) => a.data.order - b.data.order);
}

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );
}

/** Canonical public path for a course entry. */
export function coursePath(course: Pick<Course, 'id'>): string {
  return `/courses/${course.id}/`;
}

export function mentorPath(mentor: Pick<Mentor, 'id'>): string {
  return `/mentors/${mentor.id}/`;
}

export function postPath(post: Pick<Post, 'id'>): string {
  return `/resources/${post.id}/`;
}

/** Resolve a course's related mentor entries, skipping any that are drafts. */
export async function resolveMentors(course: Course): Promise<Mentor[]> {
  const entries = await Promise.all(
    course.data.mentors.map((ref) => getEntry(ref))
  );
  return entries.filter((m): m is Mentor => Boolean(m) && !m!.data.draft);
}

import type { ImageMetadata } from 'astro';

/**
 * Mentor portraits.
 *
 * Images live in `src/assets` so Astro's image pipeline can process them:
 * originals are resized, re-encoded to AVIF/WebP and served with correct
 * dimensions, which keeps the photos sharp on retina screens without shipping
 * the multi-hundred-kilobyte originals to every visitor.
 */
import rukhsanaRustamKhan from '@assets/mentors/rukhsana-rustam-khan.jpg';
import zohaibAkhtar from '@assets/mentors/zohaib-akhtar.jpg';
import maazAli from '@assets/mentors/maaz-ali.webp';

const photos: Record<string, ImageMetadata> = {
  'rukhsana-rustam-khan': rukhsanaRustamKhan,
  'zohaib-akhtar': zohaibAkhtar,
  'maaz-ali': maazAli,
};

/** Returns the optimised portrait for a mentor slug, if one has been supplied. */
export function mentorPhoto(slug: string): ImageMetadata | undefined {
  return photos[slug];
}
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

/** Human-friendly date for article meta (e.g. "10 April 2026"). */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
