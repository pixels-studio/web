import { projects, imagesFor } from '$lib/media';

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
    const images = imagesFor(project);
    for (let i = 0; i < images.length; i++) {
      entries.push({
        loc: `${SITE}/image/${project.slug}/${i}`,
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
