import { FAQ_ITEMS } from "@/lib/content/site-content";

import { SectionHeading } from "./SectionHeading";

export function FAQSection() {
  return (
    <section className="anchor-target section-shell py-16 sm:py-20" id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions business owners usually ask first"
        description="If your question is not listed, include it in your contact request and it will be addressed directly."
      />

      <div className="mt-10 grid gap-4">
        {FAQ_ITEMS.map((item) => (
          <details
            key={item.question}
            className="surface-card group p-5 open:border-[color:var(--accent)]"
          >
            <summary className="focus-ring cursor-pointer list-none pr-6 text-base font-semibold leading-7">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
