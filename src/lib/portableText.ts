import { toHTML } from '@portabletext/to-html';

/**
 * Renders Sanity Portable Text to HTML and extracts a table of contents
 * from Heading 2/3 blocks. Heading ids are derived from their text, so the
 * TOC anchors always match the rendered markup.
 */

export interface TocEntry {
  id: string;
  text: string;
  depth: 2 | 3;
}

export function headingId(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Concatenate the plain text of a Portable Text block's spans. */
function blockText(block: any): string {
  return (block?.children ?? [])
    .map((child: any) => child?.text ?? '')
    .join('')
    .trim();
}

export function extractToc(body: unknown): TocEntry[] {
  if (!Array.isArray(body)) return [];
  const toc: TocEntry[] = [];
  for (const block of body as any[]) {
    if (block?._type !== 'block') continue;
    if (block.style === 'h2' || block.style === 'h3') {
      const text = blockText(block);
      if (!text) continue;
      toc.push({ id: headingId(text), text, depth: block.style === 'h2' ? 2 : 3 });
    }
  }
  return toc;
}

const escape = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function renderTable(value: any): string {
  const rows: { cells?: string[] }[] = value?.rows ?? [];
  if (!rows.length) return '';
  const caption = value?.caption ? `<caption>${escape(value.caption)}</caption>` : '';
  const [head, ...rest] = rows;
  const toCells = (row: { cells?: string[] }, tag: string) =>
    (row.cells ?? []).map((cell) => `<${tag}>${escape(cell)}</${tag}>`).join('');
  const headHtml = `<thead><tr>${toCells(head, 'th')}</tr></thead>`;
  const bodyHtml = `<tbody>${rest
    .map((row) => `<tr>${toCells(row, 'td')}</tr>`)
    .join('')}</tbody>`;
  return `<table>${caption}${headHtml}${bodyHtml}</table>`;
}

export function renderBody(body: unknown): string {
  if (!Array.isArray(body)) return '';
  return toHTML(body as any, {
    components: {
      block: {
        h2: ({ value, children }) => `<h2 id="${escape(headingId(blockText(value)))}">${children}</h2>`,
        h3: ({ value, children }) => `<h3 id="${escape(headingId(blockText(value)))}">${children}</h3>`,
        h4: ({ children }) => `<h4>${children}</h4>`,
        blockquote: ({ children }) => `<blockquote>${children}</blockquote>`,
        normal: ({ children }) => `<p>${children}</p>`,
      },
      marks: {
        link: ({ children, value }) => {
          const href = value?.href ?? '#';
          const external = value?.blank || /^https?:\/\//i.test(href);
          const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
          return `<a href="${escape(href)}"${attrs}>${children}</a>`;
        },
      },
      types: {
        image: ({ value }) => {
          const src = value?.url;
          if (!src) return '';
          const alt = value?.alt ?? '';
          const img = `<img src="${escape(src)}?w=1200&auto=format" alt="${escape(alt)}" loading="lazy" decoding="async" />`;
          return value?.caption
            ? `<figure>${img}<figcaption>${escape(value.caption)}</figcaption></figure>`
            : `<figure>${img}</figure>`;
        },
        tableBlock: ({ value }) => renderTable(value),
      },
    },
  });
}
