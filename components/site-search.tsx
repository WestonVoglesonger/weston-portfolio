"use client";

import * as React from 'react';
import { Command } from 'cmdk';
import Link from 'next/link';

export function CommandK() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <button
        aria-label="Open Command Menu"
        className="inline-flex h-8 items-center rounded-md border px-3 text-sm hover:bg-accent"
        onClick={() => setOpen(true)}
      >
        ⌘K
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setOpen(false)}>
          <Command
            onKeyDown={(e) => {
              if (e.key === 'Escape') setOpen(false);
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-xl border bg-background shadow-2xl"
          >
            <Command.Input placeholder="Search…" className="w-full border-b p-3 outline-none" />
            <Command.List className="max-h-80 overflow-auto p-2">
              <Command.Empty className="p-3 text-sm text-muted-foreground">No results.</Command.Empty>
              <Command.Group heading="Navigate">
                <Command.Item asChild>
                  <Link href="/projects">Projects</Link>
                </Command.Item>
                <Command.Item asChild>
                  <Link href="/about">About</Link>
                </Command.Item>
                <Command.Item asChild>
                  <Link href="/experience">Experience</Link>
                </Command.Item>
                <Command.Item asChild>
                  <Link href="/contact">Contact</Link>
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </div>
      ) : null}
    </>
  );
}


