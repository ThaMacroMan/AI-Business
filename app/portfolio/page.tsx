import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import { extname, join } from "node:path";
import Image from "next/image";

import {
  PortfolioProjectGallery,
  type PortfolioCategory,
  type PortfolioProject,
  type PortfolioProjectTool,
} from "@/components/site/PortfolioProjectGallery";
import { SectionHeading } from "@/components/site/SectionHeading";
import { AI_TOOL_ITEMS, SITE_CONFIG } from "@/lib/content/site-content";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "About + Portfolio",
  description:
    "About Joshua Kuski and practical AI implementation snapshots for business outcomes.",
};

const PORTFOLIO_ROOT = join(process.cwd(), "public", "portfolio");
const ALLOWED_IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".gif",
]);
const ALLOWED_DOCUMENT_EXTENSIONS = new Set([".pdf"]);

const EXCLUDED_PROJECTS = new Set(["mimir"]);

const PROJECT_NAME_OVERRIDES: Record<string, string> = {
  aiedge: "AI Edge",
  btc: "Hardware Automation",
  farmhub: "Farm App",
  flcondos: "FL Condos",
  openclaw: "OpenClaw",
  PKL: "PKL",
  salesbuddy: "Sales Buddy",
};

const DEFAULT_PROJECT_TOOLS: PortfolioProjectTool[] = [
  {
    name: "ChatGPT",
    role: "Drafting, brainstorming, and refining execution plans.",
  },
  { name: "Perplexity", role: "Fast research and source-backed discovery." },
  { name: "Codex", role: "Code generation and implementation acceleration." },
];

const PROJECT_CATEGORIES: Record<string, PortfolioCategory> = {
  openclaw: "AI Agents",
  farmhub: "Automation",
  salesbuddy: "Automation",
  aiedge: "Custom Tools",
  btc: "Custom Tools",
  pkl: "Custom Tools",
  flcondos: "Client Work",
};

const PROJECT_DETAILS: Record<
  string,
  {
    about: string;
    tools?: PortfolioProjectTool[];
    beta?: boolean;
  }
> = {
  aiedge: {
    about: "A learning platform with built-in AI Agent learning partner.",
    beta: true,
  },
  btc: {
    about:
      "A tool for automating hydro bitcoin miners for keeping them in the proper operating temperature in all weather conditions.",
  },
  farmhub: {
    about:
      "A mobile app for tracking farmers inventory with Maps/GPS integration.",
  },
  flcondos: {
    about:
      "A platform for managing a condominium with messaging, roles, and notifications.",
  },
  openclaw: {
    about:
      "An AI Agent that can control its own computer and act on your behalf to do work and automate tasks. Examples: drafting follow-up emails after calls, updating CRM records from meeting notes, scheduling and rescheduling based on availability, and pulling reports into shared drives.",
    tools: [
      {
        name: "OpenClaw",
        role: "Autonomous workflow execution and task orchestration.",
      },
      {
        name: "ChatGPT",
        role: "Prompt strategy, copy drafting, and workflow support.",
      },
      {
        name: "Codex",
        role: "Technical implementation and code-level iteration.",
      },
    ],
  },
  pkl: {
    about:
      "A mobile app for pickleball facility management: booking, tournaments, employee management, and more.",
  },
  salesbuddy: {
    about:
      "A tool that connects Fireflies meeting transcripts with Zoho CRM—creating notes and tasks, assigning them to the right users, and saving them to the appropriate records.",
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
    const projectEntries = await readdir(PORTFOLIO_ROOT, {
      withFileTypes: true,
    });
    const projectDirectories = projectEntries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((name) => !EXCLUDED_PROJECTS.has(name.toLowerCase()))
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
          .filter((item): item is { fileName: string; kind: "image" | "pdf" } =>
            Boolean(item),
          )
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

        const coverImage =
          mediaItems.find((item) => item.kind === "image")?.src ?? "/file.svg";
        const projectKey = projectDirName.toLowerCase();
        const details = PROJECT_DETAILS[projectKey];
        const fallbackTitle = formatProjectName(projectDirName);

        return {
          id: projectKey,
          title: fallbackTitle,
          coverImage,
          category: PROJECT_CATEGORIES[projectKey] ?? "Custom Tools",
          mediaItems,
          about:
            details?.about ??
            `${fallbackTitle} is a practical AI project focused on improving workflows, delivery speed, and business outcomes.`,
          tools:
            details?.tools ??
            DEFAULT_PROJECT_TOOLS.map((tool) => ({
              ...tool,
            })),
          beta: details?.beta ?? false,
        };
      }),
    );

    return projects.filter(Boolean) as PortfolioProject[];
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
          <div className="w-full lg:max-w-[240px]">
            <div className="relative overflow-hidden rounded-xl border border-white/12">
              <div className="relative aspect-square w-full">
                <Image
                  src="/Me.jpg"
                  alt="Joshua Kuski"
                  fill
                  sizes="(max-width: 1024px) 100vw, 240px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/12 bg-black/20 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                TL;DR
              </h3>
              <dl className="mt-3 space-y-3">
                <div className="border-b border-white/10 pb-3">
                  <dt className="text-xs uppercase tracking-[0.12em] text-[color:var(--muted)]">
                    Experience:
                  </dt>
                  <dd className="mt-1 text-sm font-semibold leading-snug">
                    3+ years building and using AI.
                    <span className="block font-normal text-[color:var(--muted)]">
                      Industrial Systems Engineer
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-[color:var(--muted)]">
                    Builds:
                  </dt>
                  <dd className="mt-1 text-sm font-semibold leading-snug">
                    Custom Tools, AI Workflows,
                    <span className="block">AI Agents</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-display text-3xl font-semibold text-balance">
                Joshua Kuski
              </h2>
              <a
                href="https://www.linkedin.com/in/joshuakuski/"
                target="_blank"
                rel="noreferrer"
                className="focus-ring flex shrink-0 rounded-lg p-2 text-[color:var(--muted)] transition-colors hover:bg-black/20 hover:text-[color:var(--accent)]"
                aria-label="Joshua Kuski on LinkedIn"
              >
                <LinkedInIcon className="h-6 w-6" />
              </a>
            </div>
            <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
              My name is Joshua Kuski. I am an engineer who became deeply
              interested in AI in 2022 when ChatGPT was released.
            </p>
            <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
              Today, I work full-time with AI: using it in real workflows,
              teaching others how to apply it effectively, and building with it
              to extend what is possible.
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
              I use these tools to run research, learn quickly, write production
              code, and automate meaningful work in the background.
            </p>
            <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
              I can help you or your business get up to speed with AI so you can
              build a competitive advantage, reduce costs, and improve
              productivity.
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
        <h2 className="font-display text-3xl font-semibold text-balance">
          Ready to map your use case?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted)]">
          Book a strategy call to identify high-value implementation
          opportunities in your business.
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
