import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      lang: z.enum(['de', 'en']),
      urlSlug: z.string(),
      category: z.enum(['devops', 'ml', 'data', 'web', 'research']),
      stack: z.array(z.string()).default([]),
      github: z.string().url().optional(),
      demo: z.string().url().optional(),
      featured: z.boolean().default(false),
      status: z.enum(['wip', 'done']).default('done'),
      date: z.coerce.date(),
      // Path under /public rather than an imported asset: the covers are frames of
      // animated media, which the image pipeline would re-encode and flatten.
      cover: z.string().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
