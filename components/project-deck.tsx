"use client";

import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const projectStageRef = useRef<HTMLDivElement>(null);
  const activeProject = projects[activeIndex];

  const selectProject = useCallback((nextIndex: number) => {
    const normalizedIndex = (nextIndex + projects.length) % projects.length;
    setDirection(nextIndex > activeIndex ? "forward" : "backward");
    setActiveIndex(normalizedIndex);
    setShowDetails(false);
  }, [activeIndex, projects.length]);

  useEffect(() => {
    if (!showDetails) return;

    function closeDetails(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setShowDetails(false);
    }

    window.addEventListener("keydown", closeDetails);
    return () => window.removeEventListener("keydown", closeDetails);
  }, [showDetails]);

  useEffect(() => {
    const stage = projectStageRef.current;
    if (!stage) return;

    function startSwipe(event: PointerEvent) {
      if (event.pointerType === "touch") pointerStartX.current = event.clientX;
    }

    function finishSwipe(event: PointerEvent) {
      if (event.pointerType !== "touch" || pointerStartX.current === null) return;

      const distance = event.clientX - pointerStartX.current;
      pointerStartX.current = null;
      if (Math.abs(distance) < 48) return;
      selectProject(activeIndex + (distance < 0 ? 1 : -1));
    }

    function cancelSwipe() {
      pointerStartX.current = null;
    }

    stage.addEventListener("pointerdown", startSwipe);
    stage.addEventListener("pointerup", finishSwipe);
    stage.addEventListener("pointercancel", cancelSwipe);
    return () => {
      stage.removeEventListener("pointerdown", startSwipe);
      stage.removeEventListener("pointerup", finishSwipe);
      stage.removeEventListener("pointercancel", cancelSwipe);
    };
  }, [activeIndex, selectProject]);

  if (!activeProject) return null;

  function handleTabKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) {
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") nextIndex = currentIndex + 1;
    else if (event.key === "ArrowLeft") nextIndex = currentIndex - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = projects.length - 1;

    if (nextIndex === undefined) return;

    event.preventDefault();
    const normalizedIndex = (nextIndex + projects.length) % projects.length;
    selectProject(nextIndex);
    window.requestAnimationFrame(() => {
      document.getElementById(`project-tab-${projects[normalizedIndex].slug}`)?.focus();
    });
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
        ref={projectStageRef}
        className="project-stage"
        role="group"
        aria-label="Project flashcard. Swipe left or right on touch screens to browse projects."
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
              tabIndex={isActive ? 0 : -1}
              className={isActive ? "is-active" : undefined}
              onClick={() => selectProject(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
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
