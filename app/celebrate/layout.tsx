import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weston Voglesonger · Graduation Party, May 2026',
  description: 'You are cordially invited.',
  openGraph: {
    title: 'Weston Voglesonger · Graduation Party, May 2026',
    description: 'You are cordially invited.',
  },
  robots: { index: false, follow: false },
};

export default function CelebrateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
