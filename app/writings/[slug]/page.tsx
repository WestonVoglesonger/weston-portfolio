import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Prose } from '@/components/Prose';
import { getAllWritingSlugs, getWritingBySlugStrict, type WritingMeta } from '@/lib/writings';
import { site } from '@/lib/seo';

export async function generateStaticParams() {
  const slugs = await getAllWritingSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { frontmatter } = await getWritingBySlugStrict(slug);
    const meta: WritingMeta = frontmatter;
    const title = meta.title;
    const description = meta.summary;
    const url = `${site.url}/writings/${meta.slug}`;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: 'article',
        url,
        title,
        description,
        siteName: site.name,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        site: site.twitter,
        creator: site.twitter,
      },
    } satisfies Metadata;
  } catch {
    return { title: 'Writing — Not found' };
  }
}

export default async function WritingPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getWritingBySlugStrict(slug).catch(() => null);
  if (!data) return notFound();
  const { content, frontmatter } = data;

  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{frontmatter.title}</h1>
        {frontmatter.subtitle ? (
          <p className="mt-1 text-muted-foreground">{frontmatter.subtitle}</p>
        ) : null}
        <div className="mt-2 text-sm text-muted-foreground">
          <time dateTime={frontmatter.date}>{new Date(frontmatter.date).toLocaleDateString()}</time>
          {frontmatter.tags?.length ? (
            <span> • {frontmatter.tags.join(', ')}</span>
          ) : null}
        </div>
      </header>
      <Prose>
        {content}
      </Prose>
    </article>
  );
}
