import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Prarie AI lead capture and communications.",
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="section-shell py-14 sm:py-20">
      <article className="surface-card max-w-3xl space-y-7 p-7 sm:p-10">
        <header>
          <p className="eyebrow">Legal</p>
          <h1 className="section-title mt-3">Privacy Policy</h1>
          <p className="mt-4 text-sm text-[color:var(--muted)]">Effective Date: February 28, 2026</p>
        </header>

        <section className="space-y-3 text-sm leading-7 text-[color:var(--muted)]">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--foreground)]">
            Information Collected
          </h2>
          <p>
            Contact form submissions may include your name, business name, email, phone number, and project details.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-7 text-[color:var(--muted)]">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--foreground)]">
            How Information Is Used
          </h2>
          <p>
            Information is used to respond to inquiries, schedule strategy calls, and provide requested services.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-7 text-[color:var(--muted)]">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--foreground)]">
            Third-Party Services
          </h2>
          <p>
            This website may use Formspree for form handling, Calendly for booking, and Vercel Analytics for site insights.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-7 text-[color:var(--muted)]">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--foreground)]">Contact</h2>
          <p>
            For privacy requests, email: <a href="mailto:hello@prairiebusinessai.ca">hello@prairiebusinessai.ca</a>
          </p>
        </section>
      </article>
    </main>
  );
}
