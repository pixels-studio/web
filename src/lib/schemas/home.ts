import { z } from 'zod';
import { linkSchema, imageSchema } from './shared';

export const leadSchema = z.object({
	heading: z.string(),
	paragraphs: z.array(z.string()),
	features: z.array(z.object({ title: z.string(), description: z.string() })),
	cta: linkSchema,
});

export const projectSchema = z.object({
	label: z.string(),
	heading: z.string(),
	description: z.string(),
	link: linkSchema.optional(),
	image: imageSchema.optional(),
	images: z.array(imageSchema).optional(),
});

export const playgroundSchema = z.object({
	label: z.string(),
	heading: z.string(),
	description: z.string(),
	items: z.array(z.object({ src: z.string(), alt: z.string() })),
});

export const aboutSchema = z.object({
	label: z.string(),
	heading: z.string(),
	paragraphs: z.array(z.string()),
	image: imageSchema,
});

export const contactSchema = z.object({
	heading: z.string(),
	testimonials: z.array(
		z.object({
			quote: z.string(),
			name: z.string(),
			role: z.string(),
			variant: z.enum(['light', 'dark']),
			span: z.string(),
		})
	),
	status: z.string(),
	email: z.string(),
});
