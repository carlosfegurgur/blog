import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
	  z.object({
		title: z.string(),
		description: z.string(),
		lastUpdated: z.coerce.date(),
		heroImage: image().optional(),
		tags: z.array(z.string()).optional(),
    repoUrl: z.string().url(),
    liveUrl: z.string().url(),
		draft: z.boolean().default(false),
    bookSlug: z.string().optional(),
	  }),
});

export const collections = { blog, projects };