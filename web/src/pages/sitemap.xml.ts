import type {APIRoute} from 'astro';

export const prerender = true;

export const GET: APIRoute = ({site}) => {
  const home = new URL('/', site || 'https://kamil-kolodziejczyk.formic.studio');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${home.href}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

  return new Response(xml, {
    headers: {'Content-Type': 'application/xml; charset=utf-8'},
  });
};
