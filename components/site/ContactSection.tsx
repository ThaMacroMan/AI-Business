import Image from "next/image";

import { AI_TOOL_ITEMS, CONTACT_CONFIG, SITE_CONFIG } from "@/lib/content/site-content";

import { ClickToCallButton } from "./ClickToCallButton";
import { ContactForm } from "./ContactForm";
import { SectionHeading } from "./SectionHeading";

const CONTACT_QUESTION_EXAMPLES = [
  "I'm not sure where to start.",
  "What tools exist or should I use?",
  "We're using AI but it's not working well.",
  "What can we automate first for quick wins?",
  "How do we get the team using AI consistently?",
];

export function ContactSection() {
  return (
    <section className="anchor-target section-shell py-16 sm:py-20" id="contact">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Book a call or send an inquiry"
            description="Common questions we can solve together:"
          />

          <ul className="mt-4 space-y-2 text-sm leading-6 text-[color:var(--muted)] sm:text-base">
            {CONTACT_QUESTION_EXAMPLES.map((question) => (
              <li key={question} className="flex gap-2">
                <span aria-hidden="true">-</span>
                <span>{question}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SITE_CONFIG.primaryCtaHref}
              target="_blank"
              rel="noreferrer"
              className="cta-primary focus-ring w-full sm:w-auto"
            >
              {SITE_CONFIG.primaryCtaLabel}
            </a>
            <ClickToCallButton phoneNumber={CONTACT_CONFIG.contactPhone} />
          </div>

          <div className="mt-7 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
            {AI_TOOL_ITEMS.map((tool) => (
              <a
                key={tool.id}
                href={tool.href}
                target="_blank"
                rel="noreferrer"
                className="group focus-ring relative inline-flex h-24 w-full items-center justify-center rounded-lg border border-transparent px-2 text-center transition-colors hover:border-white/18 hover:bg-black/20"
                aria-label={`Open ${tool.name}`}
              >
                {tool.logoSrc ? (
                  <>
                    <Image
                      src={tool.logoSrc}
                      alt={tool.logoAlt ?? `${tool.name} logo`}
                      width={56}
                      height={56}
                      className="h-14 w-14 object-contain transition-transform duration-200 sm:group-hover:-translate-y-1"
                    />
                    <span className="pointer-events-none absolute bottom-1 text-[11px] font-semibold tracking-wide text-[color:var(--muted)] opacity-100 transition-all duration-200 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100">
                      {tool.name}
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-semibold text-[color:var(--foreground)]">{tool.name}</span>
                )}
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
