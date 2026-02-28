import { render, screen } from "@testing-library/react";

import { SITE_CONFIG } from "@/lib/content/site-content";

import { HeroSection } from "./HeroSection";

describe("HeroSection", () => {
  test("renders headline and conversion CTA", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("heading", { name: SITE_CONFIG.headline, level: 1 })
    ).toBeInTheDocument();

    const ctas = screen.getAllByRole("link", { name: SITE_CONFIG.primaryCtaLabel });
    expect(ctas.length).toBeGreaterThan(0);
    ctas.forEach((cta) => {
      expect(cta).toHaveAttribute("href", SITE_CONFIG.primaryCtaHref);
    });
  });
});
