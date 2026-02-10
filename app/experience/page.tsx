import Link from 'next/link';

export default function ExperiencePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">Professional Experience</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Building technology from real-time systems and BCI research to full-stack web applications and AI systems.
        </p>
      </div>

      {/* Professional Experience */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Work Experience</h2>

        <div className="space-y-6">
          {/* Method Inc */}
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">Technical Manager & Engineering Lead</h3>
                <p className="text-muted-foreground">Method Inc.</p>
              </div>
              <div className="text-sm text-muted-foreground">Jun – Aug 2025</div>
            </div>
            <div className="space-y-2 text-sm">
              <p>• Led 13-person intern team across 3 workstreams to ship NEXUS, a faceted knowledge-management MVP with Google SSO, multi-facet search, and structured curation</p>
              <p>• Bootstrapped ~40k lines of foundational code, navigated a Chrome-extension → web-app pivot, and delivered through two 5-day sprints on Firebase + Next.js 15</p>
            </div>
          </div>

          {/* Edge Carolina */}
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">CEO & Founder</h3>
                <p className="text-muted-foreground">Edge Carolina</p>
              </div>
              <div className="text-sm text-muted-foreground">Feb 2024 – Present</div>
            </div>
            <div className="space-y-2 text-sm">
              <p>• Founded and lead a 150+ member 501(c)(3) organization fostering entrepreneurship and tech innovation at UNC Chapel Hill</p>
              <p>• Raised $5k+ for events & hardware and launched the <Link href="https://www.edgecarolina.com" target="_blank" className="underline">Edge Carolina website</Link>, boosting community engagement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Highlight */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Key Projects</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* CORTEX */}
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-2">CORTEX — BCI Benchmarking Ecosystem</h3>
            <p className="text-sm text-muted-foreground mb-3">Production-grade benchmarking framework for BCI signal processing kernels</p>
            <div className="space-y-1 text-sm">
              <p>• C engine + Python CLI measuring latency, jitter, throughput, memory under real-time deadlines</p>
              <p>• 260+ commits, 100k+ LOC. Discovered the &ldquo;Idle Paradox&rdquo; (DVFS effects on idle systems)</p>
            </div>
          </div>

          {/* NEXUS Knowledge Hub */}
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-2">NEXUS — Knowledge Hub</h3>
            <p className="text-sm text-muted-foreground mb-3">Faceted knowledge-management platform for Method Inc.</p>
            <div className="space-y-1 text-sm">
              <p>• Next.js 15 static export with Firebase Auth & Firestore</p>
              <p>• MVP shipped in two 5-day sprints leading 13 interns across 3 teams</p>
            </div>
          </div>

          {/* DueNorth */}
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-2">DueNorth — Course Tracker</h3>
            <p className="text-sm text-muted-foreground mb-3">Course & assignment tracker with optional Canvas LMS import</p>
            <div className="space-y-1 text-sm">
              <p>• Next.js + NextAuth + Prisma/SQLite with Zod validation</p>
              <p>• Secure token-based email verification and rate-limited endpoints</p>
            </div>
          </div>

          {/* MindDuel */}
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-2">MindDuel — Real-Time Trivia</h3>
            <p className="text-sm text-muted-foreground mb-3">Competitive 1v1 trivia game with ELO matchmaking</p>
            <div className="space-y-1 text-sm">
              <p>• 200k+ questions, real-time WebSocket gameplay via Supabase Realtime</p>
              <p>• Next.js + Supabase with server-side buzzer validation</p>
            </div>
          </div>

          {/* ARDA */}
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-2">ARDA — Python to RTL Pipeline</h3>
            <p className="text-sm text-muted-foreground mb-3">AI-powered pipeline converting Python algorithms into SystemVerilog RTL</p>
            <div className="space-y-1 text-sm">
              <p>• Multi-stage AI agents: Spec → Quant → MicroArch → RTL → Verification → Synth</p>
              <p>• Production-quality SystemVerilog output for FPGA implementation</p>
            </div>
          </div>

          {/* Agentic Narrative Compiler */}
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-2">Agentic Narrative Compiler</h3>
            <p className="text-sm text-muted-foreground mb-3">Self‑healing LLM code‑editing framework</p>
            <div className="space-y-1 text-sm">
              <p>• Reflection loop cut iteration time 40%</p>
              <p>• Lifted test coverage to 98% over 10k LOC</p>
            </div>
          </div>

          {/* Generative Agents */}
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-2">A World of Generative Agents</h3>
            <p className="text-sm text-muted-foreground mb-3">Large‑scale simulation platform</p>
            <div className="space-y-1 text-sm">
              <p>• Orchestrated 300+ CLM agents with optimized protocols</p>
              <p>• Reduced latency 40%, increased behavioral fidelity 25%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Technical Stack</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="font-semibold mb-3">Frontend</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="rounded-full border px-3 py-1 bg-muted/30">React</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">Next.js</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">TypeScript</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">Angular</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">React Native</span>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="font-semibold mb-3">Backend & Systems</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="rounded-full border px-3 py-1 bg-muted/30">C</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">Python</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">FastAPI</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">PyTorch</span>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="font-semibold mb-3">Infrastructure</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="rounded-full border px-3 py-1 bg-muted/30">Firebase</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">Supabase</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">Prisma</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">SQLite</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="rounded-2xl border bg-card p-8 shadow-soft text-center">
        <h3 className="text-xl font-semibold mb-2">Let&apos;s Work Together</h3>
        <p className="text-muted-foreground mb-4">
          Interested in collaborating or learning more about my work?
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get in Touch
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center px-4 py-2 rounded-md border hover:bg-muted transition-colors"
          >
            View Projects
          </Link>
        </div>
      </section>
    </div>
  );
}
