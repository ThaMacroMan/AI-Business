# Business Website Design

## Overview
The system is a content-driven Next.js App Router site. Typed content constants drive all key sections so copy and placeholder values can be swapped quickly without structural changes.

## Architecture
- `app/layout.tsx`: global metadata, fonts, header/footer, analytics, skip link.
- `app/page.tsx`: one-page funnel assembly and JSON-LD injection.
- `app/portfolio/page.tsx`: project snapshot page.
- `app/privacy/page.tsx`, `app/terms/page.tsx`: legal pages.
- `lib/content/site-content.ts`: public content interfaces and typed data.
- `components/site/*`: reusable section components.

## Data Model Interfaces
- `SiteConfig`: brand info and CTA routes.
- `ServiceItem`: service packaging shape.
- `PortfolioItem`: concise case snapshot schema.
- `TestimonialItem`: quote trust block schema.
- `ContactConfig`: contact and integrations.

## Integration Decisions
- Calendly: external link CTA for reliability and speed.
- Form submission: Formspree endpoint from `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.
- Analytics: `@vercel/analytics/next` in root layout.

## Accessibility Strategy
- Skip link + semantic sectioning.
- Label every form input.
- Focus-visible states on all interactive elements.
- `aria-live="polite"` for async form status.
- `prefers-reduced-motion` fallback.

## Testing Strategy
- Unit tests: content model integrity.
- Component tests: hero CTA and form validation behavior.
- E2E smoke: homepage conversion path, portfolio rendering, legal page links.

## Risks
- Placeholder integration values can create misleading success expectations.
- Mitigation: explicit placeholder success message instructing endpoint setup.
