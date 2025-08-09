import type { Metadata } from 'next';

export const site = {
  name: 'Weston Voglesonger',
  title: 'Builder/Engineer — Portfolio',
  description:
    'World-class builder/leader. Case studies in AI, frontend, and product engineering. Fast, elegant, accessible.',
  url: 'https://westonv.dev',
  ogImage: '/og/default.png',
  twitter: '@westonv',
  author: 'Weston Voglesonger',
};

export function baseMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const canonical = site.url;
  const metadata: Metadata = {
    title: {
      default: `${site.name} — ${site.title}`,
      template: `%s — ${site.name}`,
    },
    description: site.description,
    metadataBase: new URL(site.url),
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: site.url,
      title: `${site.name} — ${site.title}`,
      description: site.description,
      siteName: site.name,
      images: [{ url: site.ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      site: site.twitter,
      creator: site.twitter,
    },
  };

  return { ...metadata, ...overrides };
}


