import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for Prarie AI website and service inquiries.",
};

export default function TermsPage() {
  return (
    <main id="main-content" className="section-shell py-14 sm:py-20">
      <article className="surface-card max-w-3xl space-y-7 p-7 sm:p-10">
        <header>
          <p className="eyebrow">Legal</p>
          <h1 className="section-title mt-3">Terms of Use</h1>
          <p className="mt-4 text-sm text-[color:var(--muted)]">Effective Date: February 28, 2026</p>
        </header>

        <section className="space-y-3 text-sm leading-7 text-[color:var(--muted)]">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--foreground)]">
            Website Use
          </h2>
          <p>
            Content is provided for general business information. It does not create a client relationship until a formal agreement is in place.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-7 text-[color:var(--muted)]">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--foreground)]">
            Service Scope
          </h2>
          <p>
            Service deliverables, timelines, and fees are defined in individual client agreements.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-7 text-[color:var(--muted)]">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--foreground)]">
            Limitation of Liability
          </h2>
          <p>
            Prarie AI is not liable for indirect or consequential losses resulting from website use.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-7 text-[color:var(--muted)]">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--foreground)]">
            Contact
          </h2>
          <p>
            Questions about these terms can be sent to <a href="mailto:hello@prairiebusinessai.ca">hello@prairiebusinessai.ca</a>.
          </p>
        </section>
      </article>
    </main>
  );
}
