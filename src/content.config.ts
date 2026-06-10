import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: ({ image }) =>
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
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
