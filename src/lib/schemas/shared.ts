import { z } from 'zod';

export const linkSchema = z.object({ label: z.string(), href: z.string() });
export const imageSchema = z.object({ alt: z.string() });
