"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const next = (resolvedTheme === 'dark' ? 'light' : 'dark') as 'light' | 'dark';
  return (
    <button
      aria-label="Toggle theme"
      className="inline-flex h-8 items-center rounded-md border px-3 text-sm hover:bg-accent"
      onClick={() => setTheme(next)}
    >
      {next === 'dark' ? 'Dark' : 'Light'}
    </button>
  );
}


