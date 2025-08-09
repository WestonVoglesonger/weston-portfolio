import Link from 'next/link';

export default function ExperiencePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">Professional Experience</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Building innovative technology solutions from full-stack web applications to AI systems and hardware projects.
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
                <h3 className="text-xl font-semibold">Software Engineer</h3>
                <p className="text-muted-foreground">Method Inc.</p>
              </div>
              <div className="text-sm text-muted-foreground">Jun 2025 – Present</div>
            </div>
            <div className="space-y-2 text-sm">
              <p>• Worked with an 8‑person team delivering an internal knowledge‑management platform (React, Next.js, Firebase)</p>
              <p>• Cut project spin‑up time 30% and improved information discovery 45% through reusable component libraries and CI/CD</p>
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
              <p>• Founded and lead a 100+ member organization fostering entrepreneurship and tech innovation</p>
              <p>• Raised $5k+ for events & hardware and launched the Edge Carolina website, boosting community engagement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Highlight */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Key Projects</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Tech-Dash */}
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-2">Tech‑Dash</h3>
            <p className="text-sm text-muted-foreground mb-3">Internal knowledge‑management SaaS for Method Inc.</p>
            <div className="space-y-1 text-sm">
              <p>• React / Next.js / Firebase stack with SSR and Firestore</p>
              <p>• Reusable design system accelerated future tools by 30%</p>
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

          {/* Multifact */}
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-2">Multifact</h3>
            <p className="text-sm text-muted-foreground mb-3">Auto‑generates multi‑page websites from JSON/LLM prompts</p>
            <div className="space-y-1 text-sm">
              <p>• React & TypeScript front‑end</p>
              <p>• Python micro‑services; delivers ready‑to‑host bundles</p>
            </div>
          </div>

          {/* Pill Identification */}
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-2">Pill Identification App</h3>
            <p className="text-sm text-muted-foreground mb-3">On‑device pill classifier (WIP)</p>
            <div className="space-y-1 text-sm">
              <p>• Rust + ONNX Runtime and React Native</p>
              <p>• 12 MB quantized U‑Net, all inference local to iOS</p>
            </div>
          </div>

          {/* EEG BCI */}
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-2">Motor‑Imagery EEG BCI</h3>
            <p className="text-sm text-muted-foreground mb-3">14‑channel dry‑electrode EEG headset</p>
            <div className="space-y-1 text-sm">
              <p>• Real‑time motor‑signal classifier</p>
              <p>• PyTorch‑Lite model with &lt;100ms latency, custom PCB</p>
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
            <h3 className="font-semibold mb-3">Backend & AI</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="rounded-full border px-3 py-1 bg-muted/30">Python</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">FastAPI</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">PyTorch</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">Rust</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">ONNX Runtime</span>
            </div>
          </div>
          
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="font-semibold mb-3">Infrastructure</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="rounded-full border px-3 py-1 bg-muted/30">Firebase</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">Firestore</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">SQLite</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">Axum</span>
              <span className="rounded-full border px-3 py-1 bg-muted/30">KiCad</span>
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


