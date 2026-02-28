import { render, screen } from "@testing-library/react";

import { SITE_CONFIG } from "@/lib/content/site-content";

import { HeroSection } from "./HeroSection";

describe("HeroSection", () => {
  test("renders headline and conversion CTA", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("heading", { name: SITE_CONFIG.headline, level: 1 })
    ).toBeInTheDocument();

    const cta = screen.getByRole("link", { name: SITE_CONFIG.primaryCtaLabel });
    expect(cta).toHaveAttribute("href", SITE_CONFIG.primaryCtaHref);
  });
});
