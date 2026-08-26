import type { CSSProperties, KeyboardEvent, MouseEvent } from "react";
import type { Project } from "@/data/portfolio";

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
  showDetails: boolean;
  direction: "forward" | "backward";
  tabId: string;
  onToggleDetails: () => void;
};

export function ProjectCard({
  project,
  index,
  total,
  showDetails,
  direction,
  tabId,
  onToggleDetails,
}: ProjectCardProps) {
  const style = { "--project-accent": project.accent } as CSSProperties;

  function isInteractiveTarget(target: EventTarget | null) {
    return target instanceof Element && Boolean(target.closest("a, button"));
  }

  function handleCardClick(event: MouseEvent<HTMLElement>) {
    if (isInteractiveTarget(event.target) || window.getSelection()?.toString()) return;
    onToggleDetails();
  }

  function handleCardKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.target !== event.currentTarget || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    onToggleDetails();
  }

  return (
    <article
      className="project-card"
      id={`project-card-${project.slug}`}
      role="tabpanel"
      aria-labelledby={tabId}
      aria-describedby={`project-card-instruction-${project.slug}`}
      data-direction={direction}
      data-face={showDetails ? "back" : "front"}
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      style={style}
    >
      <span className="project-card-instruction" id={`project-card-instruction-${project.slug}`}>
        Click anywhere on this card, or press Enter or Space, to {showDetails ? "return to the summary" : "view project details"}.
      </span>
      <div className="project-visual">
        {project.image ? (
          // A regular img keeps the data file flexible for either local or remote images.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt={`${project.title} project preview`} />
        ) : (
          <div className="project-art" aria-hidden="true">
            <span className="project-number">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <div className="project-orbit"><i /></div>
            <p>{project.category}</p>
          </div>
        )}
        <span className="project-visual-hint" aria-hidden="true">
          {showDetails ? "Click for summary" : "Click to flip"}
        </span>
      </div>

      <div className="project-content">
        <div className="project-meta">
          <span>Project {String(index + 1).padStart(2, "0")} · {project.category}</span>
          <span>{project.period}</span>
        </div>

        {!showDetails ? (
          <div className="project-card-copy" key="front">
            <p className="project-face-label">Featured build</p>
            <h3>{project.title}</h3>
            <p className="project-lede">{project.shortDescription}</p>
            <ul className="tag-list project-tech-preview" aria-label={`${project.title} technologies`}>
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="project-card-copy project-card-back" key="back">
            <p className="project-face-label">Behind the build</p>
            <h3>{project.title}</h3>
            <div className="project-back-scroll">
              <p className="project-description">{project.description}</p>
              {project.highlights?.length ? (
                <ul className="project-highlights" aria-label={`${project.title} highlights`}>
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        )}

        <div className="project-card-actions">
          <button className="project-flip-button" type="button" onClick={onToggleDetails}>
            {showDetails ? "Back to summary" : "View details"}
            <span aria-hidden="true">↻</span>
          </button>
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
      </div>
    </article>
  );
}
