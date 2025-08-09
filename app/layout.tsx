import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Weston Voglesonger',
  description: 'Engineer & builder obsessed with making ambitious ideas usable.',
  icons: {
    icon: '/portfolio-logo.png?v=2',
    apple: '/portfolio-logo.png?v=2',
  },
  metadataBase: new URL('https://weston-voglesonger.vercel.app'), // Replace with your actual domain
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
              <div className="container mx-auto max-w-5xl px-6 py-8">
                {children}
              </div>
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
