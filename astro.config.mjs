// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/data/site.ts';

// Static output only. No adapter, no server rendering, no build-time API calls.
// The dist/ folder can be dropped on Netlify, Vercel, or a plain cPanel public_html.
export default defineConfig({
  site: SITE.url,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // Emits /menu/index.html so plain Apache or cPanel hosting resolves /menu
    // without any rewrite rules.
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
