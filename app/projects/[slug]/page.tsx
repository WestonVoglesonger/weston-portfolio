import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectBySlug, getProjectBySlugStrict, readProjectSlugs } from '@/lib/projects';
import { ImageGallery, type GalleryImage } from '@/components/image-gallery';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await readProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const { frontmatter } = project;
  return {
    title: frontmatter.title,
    description: frontmatter.summary,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.summary,
      images: frontmatter.cover ? [{ url: frontmatter.cover }] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlugStrict(slug);
  const { content, frontmatter } = project;
  const { title, summary, role, date, cover, stack = [], tags = [], links = {} } = frontmatter;

  // Define gallery images for NEXUS project
  const nexusGalleryImages: GalleryImage[] = slug === 'nexus-knowledge-hub' ? [
    {
      src: '/assets/projects/nexus/Nexus Login Page.png',
      alt: 'NEXUS login screen with Google authentication',
      caption: 'Clean login interface with one-click Google authentication'
    },
    {
      src: '/assets/projects/nexus/Onboarding Page Part 1.png',
      alt: 'Onboarding step 1: team and role setup',
      caption: 'Onboarding flow: Team and role configuration'
    },
    {
      src: '/assets/projects/nexus/Onboarding Page Part 2.png',
      alt: 'Onboarding step 2: project preferences',
      caption: 'Onboarding flow: Project preferences and interests'
    },
    {
      src: '/assets/projects/nexus/Onboarding Page Part 3.png',
      alt: 'Onboarding step 3: content type interests',
      caption: 'Onboarding flow: Content type selection and finalization'
    },
    {
      src: '/assets/projects/nexus/Nexus Search Page.png',
      alt: 'NEXUS search interface with card-based results',
      caption: 'Main search interface with faceted filtering and card/list view toggle'
    },
    {
      src: '/assets/projects/nexus/Chat Page.png',
      alt: 'NEXUS chat interface for natural language queries',
      caption: 'Conversational search interface for natural language queries'
    },
    {
      src: '/assets/projects/nexus/Nexus Bookmarks Page.png',
      alt: 'NEXUS bookmarks page showing saved items',
      caption: 'Personal bookmarks with maintained filtering and search capabilities'
    },
    {
      src: '/assets/projects/nexus/Nexus Upload Page Step 1.png',
      alt: 'Drive file picker interface',
      caption: 'Upload flow: Google Drive file selection'
    },
    {
      src: '/assets/projects/nexus/Nexus Upload Page Step 2.png',
      alt: 'File preview and selection',
      caption: 'Upload flow: File preview and confirmation'
    },
    {
      src: '/assets/projects/nexus/Nexus Upload Page Step 3.png',
      alt: 'Metadata tagging interface',
      caption: 'Upload flow: Required metadata tagging and validation'
    },
    {
      src: '/assets/projects/nexus/Nexus Upload Page Step 4.png',
      alt: 'Upload confirmation screen',
      caption: 'Upload flow: Final confirmation and visibility settings'
    },
    {
      src: '/assets/projects/nexus/Nexus Admin Page.png',
      alt: 'Administrative dashboard',
      caption: 'Admin dashboard for organizational entity management'
    },
    {
      src: '/assets/projects/nexus/Nexus Admin Create Entity Page.png',
      alt: 'Entity creation interface',
      caption: 'Admin interface for creating new organizational entities'
    }
  ] : [];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="not-prose space-y-4">
        {cover ? (
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl border bg-card">
            <Image src={cover} alt={`${title} cover`} fill className="object-cover" style={{ objectPosition: 'center -50px' }} priority={false} />
          </div>
        ) : null}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">{title}</h1>
          <p className="max-w-[70ch] text-muted-foreground">{summary}</p>
          <div className="text-sm text-muted-foreground">
            <span>{role}</span> · <span>{date}</span>
          </div>
        </div>
      </div>

      {/* Body grid */}
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-8">
          <article className="prose prose-lg dark:prose-invert">
            {content}
          </article>
        </div>

        <aside className="md:col-span-4 md:sticky md:top-20 h-fit space-y-4">
          {stack && stack.length ? (
            <div className="rounded-2xl border bg-card p-5 shadow-soft">
              <div className="mb-2 text-sm text-muted-foreground">Stack</div>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                {stack.map((s) => (
                  <span key={s} className="rounded-full border px-3 py-1">{s}</span>
                ))}
              </div>
            </div>
          ) : null}

          {tags && tags.length ? (
            <div className="rounded-2xl border bg-card p-5 shadow-soft">
              <div className="mb-2 text-sm text-muted-foreground">Tags</div>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                {tags.map((t) => (
                  <span key={t} className="rounded-full border px-3 py-1">{t}</span>
                ))}
              </div>
            </div>
          ) : null}

          {links && Object.keys(links as Record<string, string>).length ? (
            <div className="rounded-2xl border bg-card p-5 shadow-soft">
              <div className="mb-2 text-sm text-muted-foreground">Links</div>
              <div className="flex flex-wrap gap-3 text-sm">
                {links.demo ? (
                  <Link className="underline" href={links.demo} target="_blank">Demo</Link>
                ) : null}
                {links.repo ? (
                  <Link className="underline" href={links.repo} target="_blank">Repo</Link>
                ) : null}
                {links.deck ? (
                  <Link className="underline" href={links.deck} target="_blank">Deck</Link>
                ) : null}
              </div>
            </div>
          ) : null}

          {nexusGalleryImages.length > 0 ? (
            <div className="rounded-2xl border bg-card p-5 shadow-soft">
              <div className="mb-2 text-sm text-muted-foreground">Screenshots</div>
              <ImageGallery images={nexusGalleryImages} />
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}


