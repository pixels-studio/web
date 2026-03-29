// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Inter Variable',
      cssVariable: '--font-inter',
      featureSettings: "'ss07' 1, 'cv06' 1, 'cv12' 1, 'cv13' 1",
      options: {
        variants: [
          {
            weight: '100 900',
            src: ['./src/assets/fonts/InterVariable.woff2'],
          },
        ],
      },
    },
    {
      provider: fontProviders.google(),
      name: 'Fragment Mono',
      cssVariable: '--font-fragment-mono',
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
});