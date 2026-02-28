import Link from "next/link";

import { SITE_CONFIG } from "@/lib/content/site-content";

const NAV_ITEMS = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[color:var(--surface-strong)]/90 backdrop-blur-sm">
      <div className="section-shell flex min-h-20 flex-wrap items-center justify-between gap-3 py-3 md:gap-8">
        <Link
          href="/"
          className="focus-ring text-base font-semibold tracking-wide sm:text-lg"
        >
          {SITE_CONFIG.brandName}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring text-sm font-medium text-[color:var(--muted)] transition-colors hover:text-[color:var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a href={SITE_CONFIG.primaryCtaHref} className="cta-primary focus-ring text-sm">
          {SITE_CONFIG.primaryCtaLabel}
        </a>
      </div>

      <nav aria-label="Mobile primary" className="section-shell pb-3 md:hidden">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={`mobile-${item.href}`}
              href={item.href}
              className="focus-ring shrink-0 rounded-full border border-white/14 px-3 py-1.5 text-sm font-medium text-[color:var(--muted)] transition-colors hover:text-[color:var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
