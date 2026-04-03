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

const toolkit = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    problem: z.string(),
    problemHeading: z.string(),
    category: z.enum(['content', 'decision-making', 'productivity']),
    type: z.enum(['built', 'curated']),
    status: z.enum(['live', 'coming-soon']),
    githubUrl: z.string(),
    screenshot: z.string().optional(),
    videoUrl: z.string().optional(),
    gradient: z.object({
      from: z.string(),
      via: z.string().optional(),
      to: z.string(),
    }),
    icon: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    creator: z.string().optional(),
    description_es: z.string().optional(),
    problem_es: z.string().optional(),
    problemHeading_es: z.string().optional(),
    tagline_es: z.string().optional(),
  }),
});

export const collections = { portfolio, toolkit };
