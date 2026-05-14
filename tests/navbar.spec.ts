import { test, expect } from "@playwright/test";

test.describe("Navbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the Providus CRM logo", async ({ page }) => {
    const logo = page.getByRole("img", { name: "Providus CRM" });
    await expect(logo).toBeVisible();
  });

  test("renders all navigation links", async ({ page }) => {
    const nav = page.getByRole("navigation");
    await expect(nav).toBeVisible();

    const links = [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Industry", href: "/industry" },
      { label: "Platform Expertise", href: "/platform-expertise" },
      { label: "Blog", href: "/blog" },
    ];

    for (const { label, href } of links) {
      const link = nav.getByRole("link", { name: label });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", href);
    }
  });

  test("renders Let's Connect CTA button", async ({ page }) => {
    const cta = page.getByRole("button", { name: /let's connect/i });
    await expect(cta).toBeVisible();
  });

  test("navbar is sticky (stays at top on scroll)", async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 600));
    const header = page.locator("header");
    await expect(header).toBeVisible();
    const box = await header.boundingBox();
    expect(box?.y).toBe(0);
  });

  test("mobile menu toggle shows and hides nav links", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    // Nav links hidden on mobile by default
    const nav = page.getByRole("navigation");
    await expect(nav).not.toBeVisible();

    // Open menu
    const toggle = page.getByRole("button", { name: /toggle menu/i });
    await toggle.click();

    // Nav links now visible
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Services" })).toBeVisible();

    // Close menu
    await toggle.click();
    await expect(page.getByRole("link", { name: "Home" })).not.toBeVisible();
  });
});
