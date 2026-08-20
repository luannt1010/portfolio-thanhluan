import type { CSSProperties } from "react";
import type { Project } from "@/data/portfolio";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const style = { "--project-accent": project.accent } as CSSProperties;

  return (
    <article className="project-card" style={style}>
      <div className="project-visual">
        {project.image ? (
          // A regular img keeps the data file flexible for either local or remote images.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt={`${project.title} project preview`} />
        ) : (
          <div className="project-art" aria-hidden="true">
            <span className="project-number">0{index + 1}</span>
            <div className="project-orbit"><i /></div>
            <p>{project.category}</p>
          </div>
        )}
      </div>

      <div className="project-content">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>{project.period}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-lede">{project.shortDescription}</p>
        <details className="project-details">
          <summary>View project details</summary>
          <p className="project-description">{project.description}</p>
          {project.highlights?.length ? (
            <ul className="project-highlights" aria-label={`${project.title} highlights`}>
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          ) : null}
        </details>
        <ul className="tag-list" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="project-links">
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noreferrer">
              Live demo <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
