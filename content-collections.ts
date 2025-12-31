import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';

const work = defineCollection({
	name: 'work',
	directory: 'content/work',
	include: '**/*.md',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		cover: z.string(),
		type: z.enum(['image', 'video']),
		project: z.string(),
		status: z.enum(['draft', 'published']),
		date: z.string(),
		tags: z.array(z.string()),
		content: z.string()
	})
});

export default defineConfig({
	collections: [work]
});
