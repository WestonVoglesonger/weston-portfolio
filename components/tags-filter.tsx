"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function TagsFilter({ allTags, active }: { allTags: string[]; active: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function toggle(tag: string) {
    const set = new Set(active);
    if (set.has(tag)) {
      set.delete(tag);
    } else {
      set.add(tag);
    }
    const next = Array.from(set).sort();
    const query = new URLSearchParams(params.toString());
    if (next.length) query.set('t', next.join(','));
    else query.delete('t');
    const url = query.toString() ? `${pathname}?${query.toString()}` : pathname;
    router.replace(url);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {allTags.map((t) => (
        <button
          key={t}
          onClick={() => toggle(t)}
          className={`rounded-full border px-3 py-1 text-sm ${active.includes(t) ? 'bg-foreground text-background' : 'hover:bg-accent'}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}


