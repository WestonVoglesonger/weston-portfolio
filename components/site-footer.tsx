import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto max-w-5xl px-6 text-sm text-muted-foreground">
        <div className="flex items-center justify-between">
          <p>© {new Date().getFullYear()} Weston Voglesonger</p>
          <div className="flex gap-4">
            <Link className="hover:underline" href="/resume">
              Résumé
            </Link>
            <Link className="hover:underline" href="/writings">
              Writings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


