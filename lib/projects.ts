import 'server-only';

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';
import { compileMdx } from './mdx';

export const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects');

export const ProjectFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  role: z.string(),
  tags: z.array(z.string()).default([]),
  summary: z.string(),
  stack: z.array(z.string()).default([]),
  links: z
    .object({
      demo: z.string().url().optional(),
      repo: z.string().url().optional(),
      deck: z.string().url().optional(),
    })
    .default({}),
  impact: z.array(z.string()).default([]),
  cover: z.string().optional(),
  accent: z.string().optional(),
});

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;

export type ProjectMeta = ProjectFrontmatter & {
  year: number;
};

export async function readProjectSlugs(): Promise<string[]> {
  const files = await fs.readdir(PROJECTS_DIR).catch(() => []);
  return files
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => name.replace(/\.mdx$/, ''));
}

export async function readProjectFile(slug: string): Promise<string | null> {
  const fullPath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  try {
    return await fs.readFile(fullPath, 'utf8');
  } catch {
    return null;
  }
}

export async function getAllProjectsMeta(): Promise<ProjectMeta[]> {
  const slugs = await readProjectSlugs();
  const metas = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await readProjectFile(slug);
      if (!raw) return null;
      const parsed = matter(raw);
      const validated = ProjectFrontmatterSchema.safeParse(parsed.data);
      if (!validated.success) return null;
      const front = validated.data;
      const year = Number(front.date?.slice(0, 4) ?? '0');
      return { ...front, year } satisfies ProjectMeta;
    }),
  );
  return metas.filter(Boolean).sort((a, b) => (a!.date < b!.date ? 1 : -1)) as ProjectMeta[];
}

export async function getProjectBySlug(slug: string) {
  const raw = await readProjectFile(slug);
  if (!raw) return null;
  const parsed = matter(raw);
  const validated = ProjectFrontmatterSchema.safeParse(parsed.data);
  if (!validated.success) return null;
  const { content, frontmatter } = await compileMdx<ProjectFrontmatter>(raw);
  const fm = frontmatter as ProjectFrontmatter;
  const year = Number(fm.date?.slice(0, 4) ?? '0');
  return { content, frontmatter: { ...fm, year } as ProjectMeta } as const;
}

export async function getProjectBySlugStrict(slug: string) {
  const project = await getProjectBySlug(slug);
  if (!project) throw new Error(`Project not found: ${slug}`);
  return project;
}

export async function getAllTags(): Promise<string[]> {
  const metas = await getAllProjectsMeta();
  const tags = new Set<string>();
  metas.forEach((m) => m.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}


