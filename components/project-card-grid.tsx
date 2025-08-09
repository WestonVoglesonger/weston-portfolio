import { type ProjectMeta } from '@/lib/projects';
import { ProjectCard } from './project-card';

export function ProjectCardGrid({ projects }: { projects: ProjectMeta[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  );
}


