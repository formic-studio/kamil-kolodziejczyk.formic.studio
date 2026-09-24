import type {APIRoute} from 'astro';

const isProduction = (import.meta.env.PUBLIC_SANITY_DATASET || 'staging') === 'production';

export const prerender = true;

export const GET: APIRoute = ({site}) => {
  const origin = site?.origin || 'https://kamil-kolodziejczyk.formic.studio';
  const body = isProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n';

  return new Response(body, {
    headers: {'Content-Type': 'text/plain; charset=utf-8'},
  });
};
