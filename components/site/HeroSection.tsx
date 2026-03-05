import Link from "next/link";

import { SITE_CONFIG } from "@/lib/content/site-content";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

const HERO_STATS = [
  { value: "3+", label: "Years AI Focus" },
  { value: "7", label: "Tools in Stack" },
  { value: "10+", label: "Projects Built" },
  { value: "CA-Wide", label: "Service Area" },
];

export function HeroSection() {
  return (
    <section
      className="anchor-target relative flex flex-col overflow-hidden pt-18 pb-0 sm:pt-24 lg:pt-26"
      id="top"
    >
      {/* Main hero grid */}
      <div className="section-shell grid flex-1 gap-12 pb-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:pb-20">
        <div className="max-w-2xl">
          <p className="eyebrow">AI for Real Business Work</p>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
            {SITE_CONFIG.headline}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
            {SITE_CONFIG.subheadline}
          </p>
          <div className="mt-10 hidden flex-wrap items-center gap-3 sm:flex">
            <a
              href={SITE_CONFIG.primaryCtaHref}
              className="cta-primary focus-ring w-full sm:w-auto"
              target="_blank"
              rel="noreferrer"
            >
              {SITE_CONFIG.primaryCtaLabel}
            </a>
            <Link
              href={SITE_CONFIG.secondaryCtaHref}
              className="cta-secondary focus-ring w-full sm:w-auto"
            >
              {SITE_CONFIG.secondaryCtaLabel}
            </Link>
          </div>
          <p className="mt-6 text-sm text-[color:var(--muted)]">
            {SITE_CONFIG.location} · {SITE_CONFIG.serviceArea}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[760px]">
          <BeforeAfterSlider
            beforeSrc="/pre.png"
            afterSrc="/post.png"
            beforeAlt="Overwhelmed office worker buried in paperwork before AI help"
            afterAlt="Calm office worker with automated AI workflow after implementation"
          />

          <div className="mt-4 grid grid-cols-2 gap-3 sm:hidden">
            <a
              href={SITE_CONFIG.primaryCtaHref}
              className="cta-primary focus-ring inline-flex w-full justify-center whitespace-nowrap px-3 text-xs"
              target="_blank"
              rel="noreferrer"
            >
              {SITE_CONFIG.primaryCtaLabel}
            </a>
            <Link
              href={SITE_CONFIG.secondaryCtaHref}
              className="cta-secondary focus-ring inline-flex w-full justify-center whitespace-nowrap px-3 text-xs"
            >
              {SITE_CONFIG.secondaryCtaLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* Discover more indicator — desktop only */}
      <div className="hidden flex-col items-center lg:flex">
        <Link
          href="/#services"
          className="hero-discover focus-ring"
          aria-label="Scroll to services"
        >
          <span className="hero-discover-gem" aria-hidden="true" />
          <span className="hero-discover-stem" aria-hidden="true" />
          <span className="hero-discover-label">Discover More</span>
        </Link>
      </div>

      {/* Stats bar — desktop only */}
      <dl className="hero-stats-bar section-shell mt-8 hidden lg:grid">
        {HERO_STATS.map((stat) => (
          <div key={stat.label} className="hero-stat-item">
            <dd className="hero-stat-value">{stat.value}</dd>
            <dt className="hero-stat-label">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
