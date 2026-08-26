"use client";

import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { useRef, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/data/portfolio";

type ProjectDeckProps = {
  projects: Project[];
};

export function ProjectDeck({ projects }: ProjectDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const pointerStartX = useRef<number | null>(null);
  const activeProject = projects[activeIndex];

  if (!activeProject) return null;

  function selectProject(nextIndex: number) {
    const normalizedIndex = (nextIndex + projects.length) % projects.length;
    setDirection(nextIndex > activeIndex ? "forward" : "backward");
    setActiveIndex(normalizedIndex);
    setShowDetails(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectProject(activeIndex + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectProject(activeIndex - 1);
    }

    if (event.key === "Escape" && showDetails) {
      event.preventDefault();
      setShowDetails(false);
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") pointerStartX.current = event.clientX;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch" || pointerStartX.current === null) return;

    const distance = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(distance) < 48) return;
    selectProject(activeIndex + (distance < 0 ? 1 : -1));
  }

  const progressStyle = {
    "--project-progress": (activeIndex + 1) / projects.length,
  } as CSSProperties;

  return (
    <div className="project-deck">
      <div className="project-deck-toolbar">
        <p className="project-deck-count" aria-live="polite">
          <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
          <span>/ {String(projects.length).padStart(2, "0")}</span>
          <i>{activeProject.title}</i>
        </p>

        <div className="project-progress" style={progressStyle} aria-hidden="true" />

        <div className="project-deck-controls" aria-label="Project navigation">
          <button type="button" onClick={() => selectProject(activeIndex - 1)} aria-label="Previous project">
            <span aria-hidden="true">&larr;</span>
          </button>
          <button type="button" onClick={() => selectProject(activeIndex + 1)} aria-label="Next project">
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>

      <div
        className="project-stage"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        aria-label="Project flashcard. Use the left and right arrow keys to browse projects."
      >
        <ProjectCard
          key={activeProject.slug}
          project={activeProject}
          index={activeIndex}
          total={projects.length}
          showDetails={showDetails}
          direction={direction}
          tabId={`project-tab-${activeProject.slug}`}
          onToggleDetails={() => setShowDetails((current) => !current)}
        />
      </div>

      <div className="project-deck-tabs" role="tablist" aria-label="Choose a project">
        {projects.map((project, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              id={`project-tab-${project.slug}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={isActive ? `project-card-${project.slug}` : undefined}
              className={isActive ? "is-active" : undefined}
              onClick={() => selectProject(index)}
              key={project.slug}
              title={project.title}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i>{project.title}</i>
            </button>
          );
        })}
      </div>
    </div>
  );
}
