import Image from "next/image";

import { SERVICES } from "@/lib/content/site-content";

import { SectionHeading } from "./SectionHeading";

export function ServicesSection() {
  return (
    <section className="anchor-target section-shell py-16 sm:py-20" id="services">
      <SectionHeading
        eyebrow="Services"
        title="How we make AI useful for you"
        description="Every business uses different tools and workflows, so we create custom solutions that fit your business."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {[...SERVICES].reverse().map((service) => (
          <article key={service.id} className="surface-card flex h-full flex-col p-6">
            <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h3 className="font-display text-2xl font-semibold leading-tight text-balance">
                {service.title}
              </h3>
              {service.imageSrc ? (
                <div className="flex shrink-0 items-center gap-2 sm:pt-1">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt ?? `${service.title} icon`}
                    width={40}
                    height={40}
                    className="h-9 w-9 object-contain"
                  />
                  {service.secondaryImageSrc ? (
                    <Image
                      src={service.secondaryImageSrc}
                      alt={service.secondaryImageAlt ?? `${service.title} secondary icon`}
                      width={40}
                      height={40}
                      className="h-9 w-9 object-contain"
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
            <p className="mt-4 text-base leading-7">{service.outcome}</p>
            <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
              {service.summary}
            </p>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-[color:var(--muted)]">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <a href="#contact" className="cta-secondary focus-ring inline-flex w-full items-center justify-center text-sm sm:w-fit">
                {service.ctaLabel}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
