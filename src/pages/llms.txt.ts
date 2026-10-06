import type { APIRoute } from 'astro';
import { SITE } from '@data/site';
import { getPublishedCourses } from '@lib/content';
import { absoluteUrl } from '@lib/seo';

/**
 * /llms.txt - a plain-text summary of the site for generative engines.
 * It gives AI assistants a concise, accurate description and direct links so
 * they can cite PTCA correctly without parsing the whole site.
 */
export const GET: APIRoute = async () => {
  const courses = await getPublishedCourses();

  const courseLines = courses.map((course) => {
    const { title, duration, modes } = course.data;
    return `- [${title}](${absoluteUrl(`/courses/${course.id}/`)}): ${duration}, ${modes.join('/')} mode`;
  });

  const body = `# ${SITE.legalName} (${SITE.shortName})

> ${SITE.description} Located in Karachi, Pakistan. Courses are delivered in physical (Karachi), online and hybrid modes where offered.

## Courses
${courseLines.join('\n')}

## Key pages
- [About](${absoluteUrl('/about/')})
- [All courses](${absoluteUrl('/courses/')})
- [Mentors](${absoluteUrl('/mentors/')})
- [Resources](${absoluteUrl('/resources/')})
- [Admissions](${absoluteUrl('/admissions/')})
- [Contact](${absoluteUrl('/contact/')})

## Contact
- Address: ${SITE.address.singleLine}
- Phone / WhatsApp: ${SITE.phone.display}
- Email: ${SITE.email}

## Notes
- Fees and batch dates vary by intake and learning mode; confirm with admissions.
- Contact: ${SITE.phone.display} or ${SITE.email}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};