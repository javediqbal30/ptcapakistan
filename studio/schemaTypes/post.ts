import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Sanity data model for the PTCA blog.
 *
 * Deliberate editorial decisions for the SEO expert:
 * - `body` is Portable Text with real headings (drives the right-side TOC),
 *   an image block, and a table block whose rows/columns the editor adds by
 *   hand — so the table's shape is their choice.
 * - Links use the built-in `link` annotation. Internal links render as
 *   site paths; external links get target=_blank automatically.
 */
export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
      description: 'Short teaser shown on the blog listing card and used as the meta description.',
      validation: (r) => r.required().max(180),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', validation: (r) => r.required() }],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'publishedAt', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'updatedAt', type: 'datetime' }),
    defineField({
      name: 'seoTitle',
      type: 'string',
      title: 'SEO Title',
      description: 'Browser/Google title for this article. Keep under ~60 characters. Leave empty to use the post title.',
      validation: (r) => r.max(60),
    }),
    defineField({
      name: 'seoDescription',
      type: 'text',
      rows: 3,
      title: 'SEO Description',
      description: 'Google meta description. Keep 120–155 characters. Leave empty to use the excerpt.',
      validation: (r) => r.max(160),
    }),
    defineField({ name: 'draft', type: 'boolean', initialValue: false }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'category', type: 'reference', to: [{ type: 'category' }], validation: (r) => r.required() }),

    defineField({
      name: 'body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          // Heading 2/3 become TOC entries on the blog post page.
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullets', value: 'bullet' },
            { title: 'Numbers', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'URL',
                    validation: (r: any) => r.required(),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab (use for external links)',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        }),

        // Inline image: the editor uploads an image where it belongs in the article.
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', validation: (r: any) => r.required() },
            { name: 'caption', type: 'string' },
          ],
        }),

        // Table block: editor adds rows and chooses cell counts per row.
        defineArrayMember({
          name: 'tableBlock',
          title: 'Table',
          type: 'object',
          fields: [
            { name: 'caption', type: 'string', title: 'Caption (optional)' },
            {
              name: 'rows',
              title: 'Rows (first row is the header; add as many cells per row as you need)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'row',
                  fields: [
                    {
                      name: 'cells',
                      type: 'array',
                      of: [{ type: 'string' }],
                      title: 'Cells',
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { rows: 'rows' },
            prepare({ rows }: any) {
              return { title: `Table (${rows?.length ?? 0} rows)` };
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: { title: 'title', category: 'category.name', media: 'mainImage' },
    prepare({ title, category, media }: any) {
      return { title, subtitle: category, media };
    },
  },
});
