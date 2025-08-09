import { ImageResponse } from 'next/og';
import { getProjectBySlug } from '@/lib/projects';

export const runtime = 'nodejs';

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const project = await getProjectBySlug(slug);
  const title = project?.frontmatter.title ?? 'Project';
  const summary = project?.frontmatter.summary ?? 'Case study';
  const accent = project?.frontmatter.accent ?? '#0ea5e9';
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#0b0b0b',
          color: '#e5e5e5',
          padding: 64,
        }}
      >
        <div style={{ width: 80, height: 6, background: accent, borderRadius: 999 }} />
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 24 }}>{title}</div>
        <div style={{ fontSize: 28, opacity: 0.8, marginTop: 8 }}>{summary}</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}


