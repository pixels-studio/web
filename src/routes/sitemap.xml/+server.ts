import { projects, imagesFor, mediaNameFor } from '$lib/media';

export const prerender = true;

const SITE = 'https://pixels.studio';

type SitemapEntry = {
  loc: string;
  changefreq: string;
  priority: string;
};

export function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const entries: SitemapEntry[] = [
    { loc: `${SITE}/`, changefreq: 'weekly', priority: '1.0' }
  ];
  for (const project of projects) {
    for (const image of imagesFor(project)) {
      entries.push({
        loc: `${SITE}/m/${project.slug}/${mediaNameFor(project.slug, image.src)}`,
        changefreq: 'yearly',
        priority: '0.5'
      });
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
