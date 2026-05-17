import { projects, imagesFor } from '$lib/media';

export const prerender = true;

const SITE = 'https://pixels.studio';

export function GET() {
  const urls: string[] = [`${SITE}/`];
  for (const project of projects) {
    const images = imagesFor(project);
    for (let i = 0; i < images.length; i++) {
      urls.push(`${SITE}/image/${project.slug}/${i}`);
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) =>
      `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n  </url>`
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
