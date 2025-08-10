import Link from 'next/link';
import { format } from 'date-fns';
import type { WritingMeta } from '@/lib/writings';
import { cn } from '@/lib/cn';

export function WritingCard({ writing, className }: { writing: WritingMeta; className?: string }) {
  const dateLabel = writing.date ? format(new Date(writing.date), 'LLL d, yyyy') : '';
  return (
    <article
      className={cn(
        'group rounded-xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md',
        className,
      )}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold">
          <Link href={`/writings/${writing.slug}`} className="hover:underline">
            {writing.title}
          </Link>
        </h3>
        <time className="shrink-0 text-sm text-muted-foreground" dateTime={writing.date}>
          {dateLabel}
        </time>
      </div>
      {writing.subtitle ? (
        <p className="mt-1 text-sm text-muted-foreground">{writing.subtitle}</p>
      ) : null}
      <p className="mt-3 text-sm leading-6 text-foreground/80">{writing.summary}</p>
      {writing.tags?.length ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {writing.tags.map((t) => (
            <li key={t} className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
              {t}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-4">
        <Link
          href={`/writings/${writing.slug}`}
          className="inline-flex items-center text-sm font-medium text-foreground hover:underline"
          aria-label={`Read ${writing.title}`}
        >
          Read →
        </Link>
      </div>
    </article>
  );
}
