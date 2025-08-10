import { cn } from '@/lib/cn';
import type { PropsWithChildren } from 'react';

export function Prose({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        'prose prose-zinc max-w-prose leading-relaxed',
        'prose-headings:scroll-mt-24 prose-headings:font-semibold',
        'prose-a:text-blue-600 hover:prose-a:underline',
        'prose-img:rounded-lg',
        'dark:prose-invert',
        className,
      )}
    >
      {children}
    </div>
  );
}
