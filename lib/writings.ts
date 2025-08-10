import 'server-only';

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';
import { compileMdx } from './mdx';

export const WRITINGS_DIR = path.join(process.cwd(), 'content', 'writings');

export const WritingCategories = ['essays', 'operating-notes', 'manifestos', 'memos'] as const;
export type WritingCategory = typeof WritingCategories[number];

export const WritingFrontmatterSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  date: z.union([z.string(), z.date()]).transform(val => typeof val === 'string' ? val : val.toISOString()),
  category: z.enum(WritingCategories),
  tags: z.array(z.string()).default([]),
  summary: z.string().default(''),
  slug: z.string(),
});

export type WritingFrontmatter = z.infer<typeof WritingFrontmatterSchema>;
export type WritingMeta = WritingFrontmatter & { year: number };

export async function readAllWritingEntries(): Promise<Array<{ category: WritingCategory; slug: string; fullPath: string }>> {
  const entries: Array<{ category: WritingCategory; slug: string; fullPath: string }> = [];
  for (const category of WritingCategories) {
    const categoryDir = path.join(WRITINGS_DIR, category);
    const files = await fs.readdir(categoryDir).catch(() => [] as string[]);
    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;
      const slug = file.replace(/\.mdx$/, '');
      entries.push({ category, slug, fullPath: path.join(categoryDir, file) });
    }
  }
  return entries;
}

export async function readWritingFileBySlug(slug: string): Promise<{ raw: string; fmPath: string } | null> {
  const entries = await readAllWritingEntries();
  const match = entries.find((e) => e.slug === slug);
  if (!match) return null;
  try {
    const raw = await fs.readFile(match.fullPath, 'utf8');
    return { raw, fmPath: match.fullPath };
  } catch {
    return null;
  }
}

function extractSummaryFromBody(body: string): string {
  // Heuristic: find the first substantial line/block that looks like prose.
  const blocks = body
    .replace(/\r\n/g, '\n')
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  let candidate = '';
  for (const block of blocks) {
    const normalized = block.replace(/\s+/g, ' ').trim();
    const isHeadingLike = normalized.startsWith('#') ||
      /^[>*\-\d]+[.)\-]/.test(normalized) ||
      normalized.toLowerCase().startsWith('written by') ||
      /^introduction:?$/i.test(normalized) ||
      normalized.length < 40;

    // Prefer the first block that looks like a paragraph with punctuation
    if (!isHeadingLike && /[.!?]/.test(normalized)) {
      candidate = normalized;
      break;
    }
  }

  if (!candidate) {
    // Fallback: first non-empty line with some length
    const first = body.split('\n').map((l) => l.trim()).find((l) => l.length > 0) ?? '';
    candidate = first;
  }

  // Return first 1–2 sentences
  const sentences = candidate.split(/(?<=[.!?])\s+/).filter(Boolean);
  return sentences.slice(0, 2).join(' ').trim();
}

export async function getAllWritingsMeta(): Promise<WritingMeta[]> {
  try {
    const entries = await readAllWritingEntries();
    const metas = await Promise.all(
      entries.map(async ({ fullPath }) => {
        try {
          const raw = await fs.readFile(fullPath, 'utf8');
          const parsed = matter(raw);
          const validated = WritingFrontmatterSchema.safeParse(parsed.data);
          if (!validated.success) {
            console.error('❌ Validation failed for', fullPath, validated.error);
            return null;
          }
          const front = validated.data;
          const summary = front.summary && front.summary.trim().length > 0
            ? front.summary.trim()
            : extractSummaryFromBody(parsed.content);
          const year = Number(front.date?.slice(0, 4) ?? '0');
          return { ...front, summary, year } satisfies WritingMeta;
        } catch (error) {
          console.error('❌ Error processing file', fullPath, error);
          return null;
        }
      })
    );
    const result = metas.filter(Boolean).sort((a, b) => (a!.date < b!.date ? 1 : -1)) as WritingMeta[];
    return result;
  } catch (error) {
    console.error('❌ Error in getAllWritingsMeta:', error);
    return [];
  }
}

export async function getWritingBySlug(slug: string) {
  const file = await readWritingFileBySlug(slug);
  if (!file) return null;
  const { raw } = file;
  const parsed = matter(raw);
  const validated = WritingFrontmatterSchema.safeParse(parsed.data);
  if (!validated.success) return null;
  const withSummary: string = validated.data.summary && validated.data.summary.trim().length > 0
    ? validated.data.summary
    : extractSummaryFromBody(parsed.content);
  const { content, frontmatter } = await compileMdx<WritingFrontmatter>(raw);
  const fm = { ...(frontmatter as WritingFrontmatter), summary: withSummary } as WritingFrontmatter;
  const year = Number(fm.date?.slice(0, 4) ?? '0');
  return { content, frontmatter: { ...fm, year } as WritingMeta } as const;
}

export async function getWritingBySlugStrict(slug: string) {
  const writing = await getWritingBySlug(slug);
  if (!writing) throw new Error(`Writing not found: ${slug}`);
  return writing;
}

export async function getAllWritingSlugs(): Promise<string[]> {
  const entries = await readAllWritingEntries();
  return entries.map((e) => e.slug);
}

export async function getAllWritingTags(): Promise<string[]> {
  const metas = await getAllWritingsMeta();
  const tags = new Set<string>();
  metas.forEach((m) => m.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
