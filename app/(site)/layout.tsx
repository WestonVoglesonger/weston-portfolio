import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/app/globals.css';
import PlausibleProvider from 'next-plausible';
import { baseMetadata } from '@/lib/seo';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = baseMetadata();

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} min-h-dvh bg-background text-foreground antialiased`}>
        <PlausibleProvider domain="westonv.dev" trackLocalhost>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex min-h-dvh flex-col">
              <SiteHeader />
              <main className="container mx-auto max-w-5xl flex-1 px-6 py-10">{children}</main>
              <SiteFooter />
            </div>
          </ThemeProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}


