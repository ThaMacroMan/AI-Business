import Link from "next/link";

import { PORTFOLIO_ITEMS } from "@/lib/content/site-content";

import { SectionHeading } from "./SectionHeading";

export function PortfolioPreviewSection() {
  return (
    <section className="section-shell py-16 sm:py-20">
      <SectionHeading
        eyebrow="Portfolio"
        title="Recent implementation snapshots"
        description="Short examples of practical AI work focused on speed-to-value and team adoption."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {PORTFOLIO_ITEMS.map((item) => (
          <article key={item.slug} className="surface-card p-6">
            <h3 className="font-display text-xl font-semibold leading-tight text-balance">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{item.result}</p>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/portfolio" className="cta-secondary focus-ring inline-flex">
          View Full Portfolio Page
        </Link>
      </div>
    </section>
  );
}
