import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProjectCardGrid } from '@/components/project-card-grid';
import { getAllProjectsMeta } from '@/lib/projects';

export default async function HomePage() {
  const projects = (await getAllProjectsMeta()).slice(0, 4);
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-2xl border bg-card p-10 shadow-soft bg-grid">
        <div className="relative z-10 space-y-6 fade-in-up">
          <h1 className="text-5xl font-semibold tracking-tight">
            Building products that ship and scale.
          </h1>
          <p className="max-w-[60ch] text-lg text-muted-foreground">
            I lead and build AI and frontend products end-to-end. Fast, elegant, and accessible by default.
          </p>
          <div className="flex gap-3">
            <Button asChild size="lg">
              <Link href="/projects">View work</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Email me</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium">Featured projects</h2>
          <Link className="text-sm text-muted-foreground hover:underline" href="/projects">
            See all
          </Link>
        </div>
        <ProjectCardGrid projects={projects} />
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-soft">
        <h3 className="font-medium">Now</h3>
        <p className="text-muted-foreground">Focusing on product velocity and AI systems ergonomics.</p>
        <div className="mt-4 flex gap-4 text-sm">
          <Link className="hover:underline" href="/resume">
            Résumé
          </Link>
          <Link className="hover:underline" href="/writings">
            Writings
          </Link>
        </div>
      </section>
    </div>
  );
}
