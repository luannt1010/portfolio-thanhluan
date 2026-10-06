import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/data/portfolio";

export function ProjectDeck({ projects }: { projects: Project[] }) {
  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} total={projects.length} />
      ))}
    </div>
  );
}
