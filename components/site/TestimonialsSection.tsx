import { TESTIMONIALS } from "@/lib/content/site-content";

import { SectionHeading } from "./SectionHeading";

export function TestimonialsSection() {
  return (
    <section className="anchor-target section-shell py-16 sm:py-20" id="proof">
      <SectionHeading
        eyebrow="Proof"
        title="What business owners and teams say"
        description="Early client feedback focused on clarity, practical outcomes, and real workflow improvements."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <figure key={testimonial.quote} className="surface-card flex h-full flex-col p-6">
            <blockquote className="text-base leading-7">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-6 text-sm text-[color:var(--muted)]">
              <span className="font-semibold text-[color:var(--foreground)]">
                {testimonial.name}
              </span>{" "}
              · {testimonial.businessType}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
