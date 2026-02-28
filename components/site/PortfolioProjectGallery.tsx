"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

export type PortfolioProjectTool = {
  name: string;
  role: string;
};

export type PortfolioProjectMedia = {
  id: string;
  src: string;
  kind: "image" | "pdf";
  label: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  coverImage: string;
  about: string;
  tools: PortfolioProjectTool[];
  mediaItems: PortfolioProjectMedia[];
};

type PortfolioProjectGalleryProps = {
  projects: PortfolioProject[];
};

export function PortfolioProjectGallery({ projects }: PortfolioProjectGalleryProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const activeProject = useMemo(
    () => (activeProjectIndex === null ? null : projects[activeProjectIndex]),
    [activeProjectIndex, projects],
  );

  const closeModal = useCallback(() => {
    setActiveProjectIndex(null);
    setActiveMediaIndex(0);
  }, []);

  const showPrevious = useCallback(() => {
    if (!activeProject) {
      return;
    }

    setActiveMediaIndex((current) =>
      current === 0 ? activeProject.mediaItems.length - 1 : current - 1,
    );
  }, [activeProject]);

  const showNext = useCallback(() => {
    if (!activeProject) {
      return;
    }

    setActiveMediaIndex((current) =>
      current === activeProject.mediaItems.length - 1 ? 0 : current + 1,
    );
  }, [activeProject]);

  const activeMediaItem = activeProject ? activeProject.mediaItems[activeMediaIndex] : null;

  useEffect(() => {
    if (!activeProject) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProject, closeModal, showNext, showPrevious]);

  return (
    <>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className="surface-card focus-ring group flex h-full flex-col p-4 text-left"
            onClick={() => {
              setActiveProjectIndex(index);
              setActiveMediaIndex(0);
            }}
          >
            <div className="relative overflow-hidden rounded-lg border border-white/10">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={project.coverImage}
                  alt={`${project.title} project preview`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </div>

            <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-balance">
              {project.title}
            </h3>
          </button>
        ))}
      </div>

      {activeProject ? (
        <div
          className="fixed inset-0 z-50 bg-black/80 p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} image gallery`}
        >
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/12 bg-[color:var(--surface-strong)]">
            <header className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
              <div>
                <p className="eyebrow">Project Gallery</p>
                <h3 className="font-display text-2xl font-semibold leading-tight text-balance">
                  {activeProject.title}
                </h3>
              </div>
              <button type="button" onClick={closeModal} className="cta-secondary focus-ring">
                Close
              </button>
            </header>

            <div className="grid min-h-0 flex-1 gap-4 overflow-y-auto p-4 sm:p-6 lg:grid-cols-[1fr_260px]">
              <div className="relative min-h-[320px] overflow-hidden rounded-xl border border-white/10 bg-black/35">
                {activeMediaItem?.kind === "image" ? (
                  <Image
                    src={activeMediaItem.src}
                    alt={`${activeProject.title} screenshot ${activeMediaIndex + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    className="object-contain"
                  />
                ) : activeMediaItem?.kind === "pdf" ? (
                  <>
                    <iframe
                      title={`${activeProject.title} document`}
                      src={`${activeMediaItem.src}#view=FitH`}
                      className="hidden h-full w-full border-0 sm:block"
                    />
                    <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center sm:hidden">
                      <p className="text-sm text-[color:var(--muted)]">
                        PDF preview is available in full view.
                      </p>
                      <a
                        href={activeMediaItem.src}
                        target="_blank"
                        rel="noreferrer"
                        className="cta-secondary focus-ring inline-flex"
                      >
                        Open PDF
                      </a>
                    </div>
                  </>
                ) : null}
              </div>

              <div className="min-h-0 overflow-y-auto pr-1">
                <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--muted)]">
                    About this project
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--foreground)]">
                    {activeProject.about}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--muted)]">
                    Main tools and usage
                  </p>
                  <ul className="mt-2 space-y-2">
                    {activeProject.tools.map((tool) => (
                      <li key={`${activeProject.id}-${tool.name}`} className="text-sm leading-6">
                        <span className="font-semibold text-[color:var(--foreground)]">{tool.name}:</span>{" "}
                        <span className="text-[color:var(--muted)]">{tool.role}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 lg:grid-cols-1">
                  {activeProject.mediaItems.map((mediaItem, mediaIndex) => (
                    <button
                      key={mediaItem.id}
                      type="button"
                      className={`focus-ring overflow-hidden rounded-lg border ${
                        mediaIndex === activeMediaIndex
                          ? "border-[color:var(--accent)]"
                          : "border-white/12"
                      }`}
                      onClick={() => setActiveMediaIndex(mediaIndex)}
                      aria-label={`View item ${mediaIndex + 1}`}
                    >
                      {mediaItem.kind === "image" ? (
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={mediaItem.src}
                            alt={`${activeProject.title} thumbnail ${mediaIndex + 1}`}
                            fill
                            sizes="220px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-[4/3] w-full items-center justify-center bg-black/35 px-2">
                          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--foreground)]">
                            PDF
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <footer className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
              <button type="button" onClick={showPrevious} className="cta-secondary focus-ring">
                Previous
              </button>
              <p className="text-sm text-[color:var(--muted)]">
                {activeMediaIndex + 1} / {activeProject.mediaItems.length}
              </p>
              <button type="button" onClick={showNext} className="cta-secondary focus-ring">
                Next
              </button>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}
