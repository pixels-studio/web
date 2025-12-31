import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import contentCollections from '@content-collections/vite';
import { resolve } from 'path';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [tailwindcss(), contentCollections(), enhancedImages(), sveltekit(), devtoolsJson()],
	resolve: {
		alias: {
			'content-collections': resolve('./.content-collections/generated')
		}
	},
	server: {
		fs: {
			allow: ['.content-collections']
		}
	}
});
