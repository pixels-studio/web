import { readFileSync } from 'fs';
import { parse } from 'yaml';
import type { ZodSchema } from 'zod';

export function loadYaml<T>(path: string, schema: ZodSchema<T>): T {
	const raw = readFileSync(path, 'utf-8');
	const data = parse(raw);
	return schema.parse(data);
}
