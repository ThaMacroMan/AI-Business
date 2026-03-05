"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

export type PortfolioCategory =
  | "All"
  | "AI Agents"
  | "Automation"
  | "Custom Tools"
  | "Client Work";

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  "All",
  "AI Agents",
  "Automation",
  "Custom Tools",
  "Client Work",
];

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
  category: PortfolioCategory;
  tools: PortfolioProjectTool[];
  mediaItems: PortfolioProjectMedia[];
  beta?: boolean;
};

type PortfolioProjectGalleryProps = {
  projects: PortfolioProject[];
};

export function PortfolioProjectGallery({
  projects,
}: PortfolioProjectGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>("All");
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(
    null,
  );
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [mainImageIsPortrait, setMainImageIsPortrait] = useState<
    boolean | null
  >(null);

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [projects, activeFilter],
  );

  const activeProject = useMemo(
    () =>
      activeProjectIndex === null ? null : filteredProjects[activeProjectIndex],
    [activeProjectIndex, filteredProjects],
  );

  const closeModal = useCallback(() => {
    setActiveProjectIndex(null);
    setActiveMediaIndex(0);
  }, []);

  const showPrevious = useCallback(() => {
    if (!activeProject) return;
    setActiveMediaIndex((current) =>
      current === 0 ? activeProject.mediaItems.length - 1 : current - 1,
    );
  }, [activeProject]);

  const showNext = useCallback(() => {
    if (!activeProject) return;
    setActiveMediaIndex((current) =>
      current === activeProject.mediaItems.length - 1 ? 0 : current + 1,
    );
  }, [activeProject]);

  const activeMediaItem = activeProject
    ? activeProject.mediaItems[activeMediaIndex]
    : null;

  // Reset portrait detection when switching media
  useEffect(() => {
    setMainImageIsPortrait(null);
  }, [activeMediaIndex, activeProject?.id]);

  // Reset active project when filter changes
  const handleFilterChange = useCallback((category: PortfolioCategory) => {
    setActiveFilter(category);
    setActiveProjectIndex(null);
    setActiveMediaIndex(0);
  }, []);

  useEffect(() => {
    if (!activeProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProject, closeModal, showNext, showPrevious]);

  // Only show categories that have at least one project (plus "All")
  const availableCategories = useMemo(
    () =>
      PORTFOLIO_CATEGORIES.filter(
        (cat) => cat === "All" || projects.some((p) => p.category === cat),
      ),
    [projects],
  );

  return (
    <>
      {/* Filter bar */}
      <div
        className="mt-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by category"
      >
        {availableCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleFilterChange(cat)}
            className={`focus-ring rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              activeFilter === cat
                ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
                : "border-white/14 bg-transparent text-[color:var(--muted)] hover:border-white/28 hover:text-[color:var(--foreground)]"
            }`}
            aria-pressed={activeFilter === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project grid */}
      {filteredProjects.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
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

              <div className="mt-3 flex items-start justify-between gap-2">
                <h3 className="font-display text-xl font-semibold leading-tight text-balance">
                  {project.title}
                </h3>
                <div className="mt-0.5 flex shrink-0 gap-1.5">
                  {project.beta ? (
                    <span className="rounded-full border border-[color:var(--accent)] bg-[color:var(--accent)]/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--accent)]">
                      Beta
                    </span>
                  ) : null}
                  <span className="rounded-full border border-white/14 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--muted)]">
                    {project.category}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-base text-[color:var(--muted)]">
          No projects in this category yet.
        </p>
      )}

      {/* Lightbox modal */}
      {activeProject ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} image gallery`}
        >
          <div className="mx-auto flex max-h-[90vh] w-full max-w-6xl flex-col overflow-y-auto rounded-2xl border border-white/12 bg-[color:var(--surface-strong)]">
            <header className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
              <div>
                <p className="eyebrow">Project Gallery</p>
                <div className="mt-1 flex items-center gap-2">
                  <h3 className="font-display text-2xl font-semibold leading-tight text-balance">
                    {activeProject.title}
                  </h3>
                  {activeProject.beta ? (
                    <span className="rounded-full border border-[color:var(--accent)] bg-[color:var(--accent)]/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--accent)]">
                      Beta
                    </span>
                  ) : null}
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="cta-secondary focus-ring"
              >
                Close
              </button>
            </header>

            <div className="flex flex-col gap-6 overflow-y-auto p-4 sm:p-6">
              {/* Main image — tall for phone/portrait, natural for desktop/landscape */}
              <div
                className={`relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/35 ${
                  mainImageIsPortrait === false
                    ? "mx-auto aspect-[16/9] max-w-4xl"
                    : "min-h-[55vh]"
                }`}
              >
                {activeMediaItem?.kind === "image" ? (
                  <Image
                    src={activeMediaItem.src}
                    alt={`${activeProject.title} screenshot ${activeMediaIndex + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    className="object-contain"
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      setMainImageIsPortrait(
                        img.naturalHeight > img.naturalWidth,
                      );
                    }}
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

              {/* Thumbnail strip — other images right under main */}
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
                {activeProject.mediaItems.map((mediaItem, mediaIndex) => (
                  <button
                    key={mediaItem.id}
                    type="button"
                    className={`focus-ring overflow-hidden rounded-lg border ${
                      mediaIndex === activeMediaIndex
                        ? "border-[color:var(--accent)] ring-2 ring-[color:var(--accent)]/40"
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
                          sizes="120px"
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

              {/* Text content below */}
              <div className="rounded-lg border border-white/10 bg-black/20 p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--muted)]">
                  About this project
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--foreground)]">
                  {activeProject.about}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
