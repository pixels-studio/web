import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		cover: image(),
		type: z.enum(['image', 'video']),
		project: z.string(),
		status: z.enum(['draft', 'published']),
		date: z.string(),
		tags: z.array(z.string())
	})
});

export const collections = { work };
