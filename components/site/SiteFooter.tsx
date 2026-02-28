import Link from "next/link";

import { SITE_CONFIG } from "@/lib/content/site-content";

const LINKEDIN_URL =
  process.env.LINKEDIN_URL ?? process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 py-8">
      <div className="section-shell flex flex-col gap-5 text-sm text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {SITE_CONFIG.brandName}. Built for practical AI implementation.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/portfolio" className="focus-ring">
            Portfolio
          </Link>
          {LINKEDIN_URL ? (
            <a
              href={LINKEDIN_URL}
              className="focus-ring"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          ) : null}
          <Link href="/privacy" className="focus-ring">
            Privacy Policy
          </Link>
          <Link href="/terms" className="focus-ring">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
