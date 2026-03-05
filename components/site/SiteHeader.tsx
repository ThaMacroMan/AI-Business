import Image from "next/image";
import Link from "next/link";

import { SITE_CONFIG } from "@/lib/content/site-content";

const NAV_ITEMS = [
  { href: "/#services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[color:var(--surface-strong)]/90 backdrop-blur-sm">
      <div className="section-shell flex min-h-16 items-center justify-between gap-3 py-1.5 md:gap-8">
        <Link href="/" className="focus-ring shrink-0">
          <Image
            src="/logosvg.png"
            alt={SITE_CONFIG.brandName}
            width={240}
            height={56}
            className="h-16 w-auto object-contain object-left"
            priority
          />
        </Link>

        {/* Mobile nav — inline with logo, no CTA */}
        <nav
          aria-label="Mobile primary"
          className="flex items-center gap-2 lg:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={`mobile-${item.href}`}
              href={item.href}
              className="focus-ring shrink-0 rounded-full border border-white/14 px-3 py-1.5 text-sm font-medium text-[color:var(--muted)] transition-colors hover:text-[color:var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
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

        <a
          href={SITE_CONFIG.primaryCtaHref}
          className="cta-primary focus-ring hidden text-sm lg:inline-flex"
          target="_blank"
          rel="noreferrer"
        >
          {SITE_CONFIG.primaryCtaLabel}
        </a>
      </div>
    </header>
  );
}
