export const dynamic = 'force-static';

export async function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: https://westonv.dev/sitemap.xml`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}


