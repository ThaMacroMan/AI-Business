import Link from "next/link";

import { SITE_CONFIG } from "@/lib/content/site-content";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

export function HeroSection() {
  return (
    <section className="anchor-target relative overflow-hidden pt-18 pb-16 sm:pt-24" id="top">
      <div className="section-shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="eyebrow">AI for Real Business Work</p>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
            {SITE_CONFIG.headline}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
            {SITE_CONFIG.subheadline}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={SITE_CONFIG.primaryCtaHref}
              className="cta-primary focus-ring w-full sm:w-auto"
              target="_blank"
              rel="noreferrer"
            >
              {SITE_CONFIG.primaryCtaLabel}
            </a>
            <Link href={SITE_CONFIG.secondaryCtaHref} className="cta-secondary focus-ring w-full sm:w-auto">
              {SITE_CONFIG.secondaryCtaLabel}
            </Link>
          </div>
          <p className="mt-6 text-sm text-[color:var(--muted)]">
            {SITE_CONFIG.location} · {SITE_CONFIG.serviceArea}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[640px]">
          <BeforeAfterSlider
            beforeSrc="/pre.png"
            afterSrc="/post.png"
            beforeAlt="Overwhelmed office worker buried in paperwork before AI help"
            afterAlt="Calm office worker with automated AI workflow after implementation"
          />
        </div>
      </div>
    </section>
  );
}
