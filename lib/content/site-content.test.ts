import {
  FAQ_ITEMS,
  PORTFOLIO_ITEMS,
  SERVICES,
  SITE_CONFIG,
  TESTIMONIALS,
} from "./site-content";

describe("site-content", () => {
  test("includes three services with non-empty deliverables", () => {
    expect(SERVICES).toHaveLength(3);

    for (const service of SERVICES) {
      expect(service.title.trim().length).toBeGreaterThan(0);
      expect(service.deliverables.length).toBeGreaterThanOrEqual(3);
    }
  });

  test("includes three portfolio snapshots with required fields", () => {
    expect(PORTFOLIO_ITEMS).toHaveLength(3);

    const slugs = PORTFOLIO_ITEMS.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(PORTFOLIO_ITEMS.length);

    for (const item of PORTFOLIO_ITEMS) {
      expect(item.problem.trim().length).toBeGreaterThan(0);
      expect(item.solution.trim().length).toBeGreaterThan(0);
      expect(item.result.trim().length).toBeGreaterThan(0);
    }
  });

  test("contains baseline conversion and trust content", () => {
    expect(SITE_CONFIG.primaryCtaLabel).toBe("Book a Strategy Call");
    expect(TESTIMONIALS.length).toBeGreaterThanOrEqual(3);
    expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(3);
  });
});
