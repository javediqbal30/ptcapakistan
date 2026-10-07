// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// Canonical production origin. Every canonical tag, sitemap entry and
// schema URL is derived from this single value - never hard-code it elsewhere.
const SITE = 'https://ptcapakistan.pk';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',

  // Content-first output: pages ship as static HTML so both traditional
  // crawlers and generative engines (GPTBot, PerplexityBot, etc.) read them
  // without executing JavaScript.
  //
  // The Cloudflare adapter is what makes the lead API possible: every page
  // still builds as static HTML served from Cloudflare's asset layer, while
  // only `src/pages/api/*` opt out of prerendering (see
  // `export const prerender = false` in those routes) and run in a Worker,
  // where they can write to Neon Postgres.
  output: 'static',
  adapter: cloudflare({
    // Pages are static, so no image-resizing service is needed at runtime.
    imageService: 'compile',
  }),

  build: {
    // Inline small stylesheets to cut a render-blocking request on mobile.
    inlineStylesheets: 'auto',
  },

  // Astro's built-in CSRF guard (origin check on form POSTs) only trusts the
  // Host header when the host is listed here. Without it every hostname falls
  // back to "localhost" and all lead submissions would be rejected with 403.
  security: {
    checkOrigin: true,
    allowedDomains: [
      { hostname: 'ptcapakistan.pk' },
      { hostname: 'www.ptcapakistan.pk' },
      { hostname: '*.workers.dev' },
      { hostname: 'localhost' },
      { hostname: '127.0.0.1' },
    ],
  },

  integrations: [
    sitemap({
      // Keep low-value utility routes out of the sitemap.
      filter: (page) => !page.includes('/thank-you/') && !page.includes('/404'),
      changefreq: 'weekly',
      lastmod: new Date(),
    }),
  ],

  image: {
    // Serve modern formats for hero/course imagery. Astro 5 configures formats
    // per <Image>/<Picture> usage, so only the breakpoints live here.
    breakpoints: [640, 960, 1280],
  },
});
