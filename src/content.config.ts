import { defineCollection, z } from 'astro:content';

const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pillar: z.enum(['business', 'marketing', 'ai']),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    externalUrl: z.string().optional(),
    thumbnail: z.string().optional(),
  }),
});

export const collections = { portfolio };
