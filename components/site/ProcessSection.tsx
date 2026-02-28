import { PROCESS_STEPS } from "@/lib/content/site-content";

import { SectionHeading } from "./SectionHeading";

export function ProcessSection() {
  return (
    <section className="anchor-target section-shell py-16 sm:py-20" id="process">
      <SectionHeading
        eyebrow="Process"
        title="Simple delivery model, measurable progress"
        description="A structured process keeps the work practical and aligned to your priorities from day one."
      />

      <ol className="mt-10 grid gap-5 md:grid-cols-2">
        {PROCESS_STEPS.map((step, index) => (
          <li key={step.id} className="surface-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Step {index + 1}
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-balance">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
