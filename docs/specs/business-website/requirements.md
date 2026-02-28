# Business Website Requirements

## Objective
Launch a high-converting website for Josh's AI implementation business in Regina, branded as Prarie AI.

## User Stories
- As a Regina small business owner, I want to quickly understand what services are offered, so that I can decide if this fits my needs.
- As a potential client, I want to book a strategy call in one click, so that I can move forward without friction.
- As a cautious buyer, I want proof and a clear process, so that I trust the implementation approach.

## Functional Requirements (EARS)
1. WHEN a visitor lands on the homepage THEN the system SHALL present clear value proposition, services, process, proof, FAQ, and contact sections.
2. WHEN a visitor clicks the primary CTA THEN the system SHALL route to the configured Calendly URL.
3. WHEN a visitor accesses `/portfolio` THEN the system SHALL render three project snapshots with problem, solution, and result.
4. WHEN a visitor submits the contact form with invalid input THEN the system SHALL show inline errors and focus the first invalid field.
5. WHEN a visitor submits valid contact data THEN the system SHALL send data to Formspree or return a placeholder success state.
6. WHEN a visitor opens `/privacy` or `/terms` THEN the system SHALL show legal content accessible from the footer.
7. WHEN the site is built for production THEN linting, tests, and build SHALL pass.

## Non-Functional Requirements
- Accessibility baseline: WCAG 2.2 AA for core pages.
- Performance: avoid unnecessary client components; keep most UI server-rendered.
- Responsive: mobile-first layout that scales cleanly to desktop.
- SEO: metadata, sitemap, robots, and LocalBusiness JSON-LD.

## Constraints
- Next.js App Router with TypeScript.
- One-page funnel plus portfolio page.
- No public pricing shown.
