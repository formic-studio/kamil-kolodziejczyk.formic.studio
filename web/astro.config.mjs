// @ts-check
import sanity from '@sanity/astro';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
	site: env.PUBLIC_SITE_URL || 'https://kamil-kolodziejczyk.formic.studio',
	build: {
		// This is a single-page site and its compressed stylesheet is small.
		// Inlining it removes a render-blocking request from the critical path.
		inlineStylesheets: 'always',
	},
	integrations: [
		sanity({
			projectId: env.PUBLIC_SANITY_PROJECT_ID || 'qus38rw8',
			dataset: env.PUBLIC_SANITY_DATASET || 'staging',
			apiVersion: env.PUBLIC_SANITY_API_VERSION || '2025-08-15',
			useCdn: false,
		}),
	],
});
