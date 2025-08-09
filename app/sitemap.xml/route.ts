import { readProjectSlugs } from '@/lib/projects';

export const dynamic = 'force-static';

export async function GET() {
  const base = 'https://westonv.dev';
  const staticRoutes = ['/', '/projects', '/about', '/experience', '/contact'];
  const projectSlugs = await readProjectSlugs();
  const urls = [
    ...staticRoutes.map((p) => `${base}${p}`),
    ...projectSlugs.map((s) => `${base}/projects/${s}`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `<url><loc>${u}</loc></url>`).join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}


