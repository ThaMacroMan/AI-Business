import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import { extname, join } from "node:path";
import Image from "next/image";

import {
  PortfolioProjectGallery,
  type PortfolioProject,
  type PortfolioProjectTool,
} from "@/components/site/PortfolioProjectGallery";
import { SectionHeading } from "@/components/site/SectionHeading";
import { AI_TOOL_ITEMS, SITE_CONFIG } from "@/lib/content/site-content";

export const metadata: Metadata = {
  title: "About + Portfolio",
  description:
    "About Joshua Kuski and practical AI implementation snapshots for business outcomes.",
};

const PORTFOLIO_ROOT = join(process.cwd(), "public", "portfolio");
const ALLOWED_IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"]);
const ALLOWED_DOCUMENT_EXTENSIONS = new Set([".pdf"]);

const PROJECT_NAME_OVERRIDES: Record<string, string> = {
  aiedge: "AI Edge",
  btc: "BTC",
  farmhub: "Farm Hub",
  flcondos: "FL Condos",
  mimir: "Mimir",
  openclaw: "OpenClaw",
  PKL: "PKL",
  salesbuddy: "SalesBuddy",
};

const DEFAULT_PROJECT_TOOLS: PortfolioProjectTool[] = [
  { name: "ChatGPT", role: "Drafting, brainstorming, and refining execution plans." },
  { name: "Perplexity", role: "Fast research and source-backed discovery." },
  { name: "Codex", role: "Code generation and implementation acceleration." },
];

const PROJECT_DETAILS: Record<
  string,
  {
    about: string;
    tools: PortfolioProjectTool[];
  }
> = {
  openclaw: {
    about:
      "OpenClaw focuses on practical AI execution for business workflows. This project includes implementation screenshots and a deliverable report that document how the solution is designed and applied.",
    tools: [
      { name: "OpenClaw", role: "Autonomous workflow execution and task orchestration." },
      { name: "ChatGPT", role: "Prompt strategy, copy drafting, and workflow support." },
      { name: "Codex", role: "Technical implementation and code-level iteration." },
    ],
  },
};

function formatProjectName(name: string): string {
  if (PROJECT_NAME_OVERRIDES[name]) {
    return PROJECT_NAME_OVERRIDES[name];
  }

  return name
    .replace(/[-_]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join(" ");
}

function toPublicUrl(...segments: string[]): string {
  return `/${segments.map((segment) => encodeURIComponent(segment)).join("/")}`;
}

async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const projectEntries = await readdir(PORTFOLIO_ROOT, { withFileTypes: true });
    const projectDirectories = projectEntries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

    const projects = await Promise.all(
      projectDirectories.map(async (projectDirName) => {
        const projectPath = join(PORTFOLIO_ROOT, projectDirName);
        const files = await readdir(projectPath, { withFileTypes: true });

        const mediaItems = files
          .filter((file) => file.isFile())
          .map((file) => {
            const extension = extname(file.name).toLowerCase();
            if (ALLOWED_IMAGE_EXTENSIONS.has(extension)) {
              return {
                fileName: file.name,
                kind: "image" as const,
              };
            }

            if (ALLOWED_DOCUMENT_EXTENSIONS.has(extension)) {
              return {
                fileName: file.name,
                kind: "pdf" as const,
              };
            }

            return null;
          })
          .filter((item): item is { fileName: string; kind: "image" | "pdf" } => Boolean(item))
          .sort((a, b) => {
            if (a.kind !== b.kind) {
              return a.kind === "image" ? -1 : 1;
            }

            return a.fileName.localeCompare(b.fileName, undefined, {
              sensitivity: "base",
              numeric: true,
            });
          })
          .map((item, index) => ({
            id: `${projectDirName}-${index}`,
            src: toPublicUrl("portfolio", projectDirName, item.fileName),
            kind: item.kind,
            label: item.fileName,
          }));

        if (mediaItems.length === 0) {
          return null;
        }

        const coverImage = mediaItems.find((item) => item.kind === "image")?.src ?? "/file.svg";
        const details = PROJECT_DETAILS[projectDirName.toLowerCase()];
        const fallbackTitle = formatProjectName(projectDirName);

        return {
          id: projectDirName.toLowerCase(),
          title: fallbackTitle,
          coverImage,
          mediaItems,
          about:
            details?.about ??
            `${fallbackTitle} is a practical AI project focused on improving workflows, delivery speed, and business outcomes.`,
          tools:
            details?.tools ??
            DEFAULT_PROJECT_TOOLS.map((tool) => ({
              ...tool,
            })),
        };
      }),
    );

    return projects.filter((project): project is PortfolioProject => Boolean(project));
  } catch {
    return [];
  }
}

export default async function PortfolioPage() {
  const portfolioProjects = await getPortfolioProjects();

  return (
    <main id="main-content" className="section-shell py-14 sm:py-20">
      <SectionHeading
        eyebrow="About + Portfolio"
        as="h1"
        title="About Me and Past AI Work"
        description="Who I am, how I use AI day-to-day, and examples of practical implementation work."
      />

      <section className="surface-card mt-10 p-7 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:items-start">
          <div className="relative mx-auto w-full max-w-[240px] overflow-hidden rounded-xl border border-white/12">
            <div className="relative aspect-square w-full">
              <Image
                src="/Me.jpg"
                alt="Joshua Kuski"
                fill
                sizes="(max-width: 1024px) 240px, 240px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-semibold text-balance">Joshua Kuski</h2>
            <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
              My name is Joshua Kuski. I am an engineer who became deeply interested in AI in
              2022 when ChatGPT was released.
            </p>
            <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
              Today, I work full-time with AI: using it in real workflows, teaching others how to
              apply it effectively, and building with it to extend what is possible.
            </p>
            <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
              I regularly use tools such as:
            </p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {AI_TOOL_ITEMS.map((tool) => (
                <li key={tool.id}>
                  <a
                    href={tool.href}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex rounded-full border border-white/16 bg-black/20 px-3 py-1 text-sm font-semibold transition-colors hover:border-white/30 hover:bg-black/35"
                  >
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
              I use these tools to run research, learn quickly, write production code, and
              automate meaningful work in the background.
            </p>
            <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
              I can help you or your business get up to speed with AI so you can build a
              competitive advantage, reduce costs, and improve productivity.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-14">
        <SectionHeading
          eyebrow="Portfolio"
          as="h2"
          title="Past AI Work"
          description="Each card is a project. Click one to open a larger gallery and scroll through all images."
        />
      </div>

      {portfolioProjects.length > 0 ? (
        <PortfolioProjectGallery projects={portfolioProjects} />
      ) : (
        <p className="mt-8 text-base leading-7 text-[color:var(--muted)]">
          No portfolio images found yet in `public/portfolio`.
        </p>
      )}

      <section className="surface-card mt-12 p-7 sm:p-8">
        <h2 className="font-display text-3xl font-semibold text-balance">Ready to map your use case?</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted)]">
          Book a strategy call to identify high-value implementation opportunities in your business.
        </p>
        <a
          href={SITE_CONFIG.primaryCtaHref}
          className="cta-primary focus-ring mt-6 inline-flex"
          target="_blank"
          rel="noreferrer"
        >
          {SITE_CONFIG.primaryCtaLabel}
        </a>
      </section>
    </main>
  );
}
