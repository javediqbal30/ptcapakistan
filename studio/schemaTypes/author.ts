import { defineType, defineField } from 'sanity';

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', type: 'string' }),
    defineField({
      name: 'photo',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
    }),
  ],
});
