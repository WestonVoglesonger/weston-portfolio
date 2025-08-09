import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="space-y-10">
      {/* Minimal hero */}
      <section className="relative overflow-hidden rounded-2xl border bg-card p-10 shadow-soft bg-grid">
        <div className="relative z-10 space-y-5">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Hi there 👋 I&apos;m Weston Voglesonger
          </h1>
          <p className="max-w-[68ch] text-lg text-muted-foreground">
            Attempting to build cool shit... Engineer & builder obsessed with making ambitious ideas usable.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border bg-[rgba(0,0,0,.03)] px-3 py-1">Full‑stack development</span>
            <span className="rounded-full border bg-[rgba(0,0,0,.03)] px-3 py-1">AI/ML engineering</span>
            <span className="rounded-full border bg-[rgba(0,0,0,.03)] px-3 py-1">Hardware projects</span>
            <span className="rounded-full border bg-[rgba(0,0,0,.03)] px-3 py-1">Entrepreneurship</span>
          </div>
          <div className="flex gap-3 pt-2">
            <Button asChild size="lg"><Link href="/projects">View work</Link></Button>
            <Button asChild variant="outline" size="lg"><Link href="/contact">Contact</Link></Button>
            <Link className="self-center text-sm text-muted-foreground hover:underline" href="/resume">Résumé</Link>
          </div>
        </div>
      </section>

      {/* Tiny stats */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <div className="text-sm text-muted-foreground">Edge Carolina</div>
          <div className="text-xl font-medium">100+ members</div>
          <div className="text-xs text-muted-foreground">Founded & lead organization</div>
        </div>
        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <div className="text-sm text-muted-foreground">NEXUS (Method)</div>
          <div className="text-xl font-medium">MVP in 2 weeks</div>
          <div className="text-xs text-muted-foreground">Led 6 engineers</div>
        </div>
        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <div className="text-sm text-muted-foreground">GitHub Activity</div>
          <div className="text-xl font-medium">30+ repos</div>
          <div className="text-xs text-muted-foreground">Active open source</div>
        </div>
      </section>

      {/* Now / Next */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-soft">
          <h3 className="mb-2 font-medium">Current Focus</h3>
          <p className="text-sm text-muted-foreground">
            Building AI-powered applications, leading Edge Carolina, and exploring hardware projects like EEG BCIs and pill identification systems.
          </p>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-soft">
          <h3 className="mb-2 font-medium">What&apos;s Next</h3>
          <p className="text-sm text-muted-foreground">
            Scaling multi-agent systems, expanding Edge Carolina&apos;s impact, and pushing the boundaries of on-device AI inference.
          </p>
        </div>
      </section>

      {/* Specialties */}
      <section className="rounded-2xl border bg-card p-6 shadow-soft">
        <h3 className="mb-3 font-medium">Technical Specialties</h3>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <span className="rounded-full border px-3 py-1">React / Next.js / TypeScript</span>
          <span className="rounded-full border px-3 py-1">Python / FastAPI / PyTorch</span>
          <span className="rounded-full border px-3 py-1">Rust / ONNX Runtime</span>
          <span className="rounded-full border px-3 py-1">Firebase / Firestore</span>
          <span className="rounded-full border px-3 py-1">Multi-agent systems</span>
          <span className="rounded-full border px-3 py-1">Hardware / PCB design</span>
          <span className="rounded-full border px-3 py-1">EEG / BCI development</span>
        </div>
      </section>
    </div>
  );
}


