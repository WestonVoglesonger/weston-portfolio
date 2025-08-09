"use client";

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { type ProjectMeta } from '@/lib/projects';

function toRgb(accent?: string): string {
  if (!accent) return 'rgb(var(--accent))';
  return accent;
}

export function ProjectCard({ project }: { project: ProjectMeta }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState<string>('');
  const [shinePos, setShinePos] = React.useState<string>('50% 0%');
  const motionAllowed = React.useRef(true);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    motionAllowed.current = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  function onMove(e: React.MouseEvent) {
    if (!motionAllowed.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rX = (0.5 - y) * 6;
    const rY = (x - 0.5) * 6;
    setTransform(`perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg)`);
    setShinePos(`${x * 100}% ${y * 100}%`);
  }

  function onLeave() {
    setTransform('');
  }

  const accent = toRgb(project.accent);

  return (
    <article
      className="group relative rounded-2xl transition-transform will-change-transform"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform }}
    >
      {/* Gradient border */}
      <div
        className="absolute inset-0 -z-10 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${accent}, rgba(255,255,255,0))`,
          opacity: 0.35,
          filter: 'blur(12px)',
          transform: 'translateZ(0)',
        }}
      />

      <Link href={`/projects/${project.slug}`} className="block rounded-2xl border bg-card shadow-soft card-hover overflow-hidden">
        {project.cover ? (
          <div className="relative aspect-[16/9]">
            <Image
              src={project.cover}
              alt={`${project.title} cover`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />
            {/* Shine */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{
                background: `radial-gradient(200px 200px at ${shinePos}, rgba(255,255,255,.25), transparent 60%)`,
                mixBlendMode: 'overlay',
              }}
            />
          </div>
        ) : (
          <div
            className="relative aspect-[16/9]"
            style={{
              background: `linear-gradient(135deg, ${accent}, rgba(0,0,0,.2))`,
            }}
          />
        )}
        <div className="space-y-2 p-4">
          <div className="flex items-start gap-3">
            <div className="h-2.5 w-2.5 shrink-0 translate-y-2 rounded-full" style={{ background: accent }} />
            <div className="min-w-0">
              <h3 className="text-lg font-semibold leading-tight">{project.title}</h3>
              <p className="line-clamp-2 text-sm text-muted-foreground">{project.summary}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground"
                style={{ background: 'rgba(0,0,0,.03)' }}
              >
                {t}
              </span>
            ))}
            <span className="ml-auto text-xs text-muted-foreground">{project.year}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}


