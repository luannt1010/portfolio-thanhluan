import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/data/portfolio";

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
};

export function ProjectCard({
  project,
  index,
  total,
}: ProjectCardProps) {
  const style = { "--project-accent": project.accent } as CSSProperties;

  return (
    <article
      className="project-card"
      id={`project-card-${project.slug}`}
      aria-labelledby={`project-title-${project.slug}`}
      style={style}
    >
      <div className="project-visual">
        {project.image ? (
          // A regular img keeps the data file flexible for either local or remote images.
          // eslint-disable-next-line @next/next/no-img-element
          <img loading="lazy" src={project.image} alt={`${project.title} project preview`} />
        ) : (
          <div className="project-art" aria-hidden="true">
            <span className="project-number">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <div className="project-orbit"><i /></div>
            <p>{project.category}</p>
          </div>
        )}
      </div>

      <div className="project-content">
        <div className="project-meta">
          <span>Project {String(index + 1).padStart(2, "0")} · {project.category}</span>
          <span>{project.period}</span>
        </div>

        <div className="project-card-copy">
          <h3 id={`project-title-${project.slug}`}>{project.title}</h3>
          <p className="project-lede">{project.shortDescription}</p>
          <p className="project-description">{project.description}</p>
          {project.highlights?.length ? (
            <ul className="project-highlights" aria-label={`${project.title} highlights`}>
              {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          ) : null}
          <ul className="tag-list project-tech-preview" aria-label={`${project.title} technologies`}>
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </div>

        <div className="project-card-actions">
          <div className="project-links">
            {project.caseStudySlug ? (
              <Link href={`/projects/${project.caseStudySlug}`}>
                Full case study <span aria-hidden="true">→</span>
              </Link>
            ) : null}
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
      </div>
    </article>
  );
}
