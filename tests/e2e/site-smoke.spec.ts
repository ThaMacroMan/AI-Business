import { expect, test } from "@playwright/test";

test.describe("site smoke", () => {
  test("homepage conversion path and key pages", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: "Practical AI for Regina Businesses",
        level: 1,
      })
    ).toBeVisible();

    const primaryCta = page.getByRole("link", { name: "Book a Strategy Call" }).first();
    await expect(primaryCta).toHaveAttribute("href", /calendly/);

    await page.getByRole("button", { name: "Send Project Details" }).click();
    await expect(page.getByText("Please add your name.")).toBeVisible();

    await page.getByRole("textbox", { name: /^Name$/ }).fill("Test User");
    await page
      .getByRole("textbox", { name: "Business Name" })
      .fill("Regina Shop");
    await page.getByRole("textbox", { name: "Email" }).fill("owner@example.com");
    await page.getByRole("combobox", { name: "Primary Goal" }).selectOption("automations");
    await page
      .getByRole("textbox", { name: "Project Details" })
      .fill("Need help automating lead follow-up and reporting.");

    await page.getByRole("button", { name: "Send Project Details" }).click();
    await expect(
      page.getByText(/ready to send|has been sent/i)
    ).toBeVisible();

    await page.goto("/portfolio");
    await expect(page.getByRole("heading", { name: "Implementation snapshots" })).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Lead Intake Automation for a Local Service Business",
      })
    ).toBeVisible();

    await page.goto("/");
    await page.getByRole("link", { name: "Privacy Policy" }).click();
    await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible();
  });
});
