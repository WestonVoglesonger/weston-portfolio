//
import { getAllProjectsMeta, getAllTags } from '@/lib/projects';
import { ProjectCardGrid } from '@/components/project-card-grid';
import { TagsFilter } from '@/components/tags-filter';

export const dynamic = 'force-static';

async function ProjectsList({ tags }: { tags: string[] }) {
  const all = await getAllProjectsMeta();
  const active = tags.length ? all.filter((p) => p.tags.some((t) => tags.includes(t))) : all;
  return <ProjectCardGrid projects={active} />;
}

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ t?: string }> }) {
  const tags = await getAllTags();
  const { t } = await searchParams;
  const active = (t?.split(',').filter(Boolean) ?? []).filter((tg) => tags.includes(tg));
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <TagsFilter allTags={tags} active={active} />
      {/* Server Component render */}
      <ProjectsList tags={active} />
    </div>
  );
}


