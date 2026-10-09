import { expect, test } from "@playwright/test";

const homeTitle =
  "Temporary Commercial Mobile Kitchen Facility Rentals Nationwide";

for (const viewport of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
]) {
  test(`portfolio-balanced homepage is usable on ${viewport.name}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(homeTitle);
    await expect(page.locator("[data-h1-intro]")).toContainText(
      "temporary commercial mobile kitchen trailer and modular facility rentals nationwide",
    );
    await expect(page.locator("[data-h1-intro]")).toContainText("hospitals");
    await expect(page.locator("[data-h1-intro]")).toContainText(
      "other commercial operations",
    );
    await expect(page.locator("[data-h1-intro]")).toContainText(
      "maintain food service",
    );
    await expect(page.locator("[data-h1-intro]")).toContainText(
      "mobile shower trailers",
    );
    await expect(page.locator("[data-h1-intro]")).toContainText(
      "man-camp/workforce housing units",
    );
    await expect(
      page.getByRole("link", { name: /View Rental Equipment/ }),
    ).toHaveAttribute("href", "/equipment-rental/");
    await expect(
      page.getByRole("link", { name: /^Request a Quote/ }),
    ).toHaveAttribute("href", "/contact-us/");
    await expect(
      page.getByRole("link", { name: /View all kitchen models/ }),
    ).toHaveAttribute("href", "/equipment-rental/mobile-kitchen-trailers/");

    const primaryFamily = page.locator('[data-portfolio-share="80"]');
    const supportingFamilies = page.locator('[data-portfolio-share="20"]');
    await expect(primaryFamily).toContainText("Commercial mobile kitchens");
    await expect(supportingFamilies.locator(".mk-family-card")).toHaveCount(5);
    await expect(supportingFamilies).toContainText(
      "Mobile shower trailer rentals",
    );
    await expect(supportingFamilies).toContainText(
      "Shower/restroom trailer rentals",
    );
    await expect(supportingFamilies).toContainText(
      "Workforce housing unit rentals",
    );
    await expect(supportingFamilies).toContainText(
      "Refrigeration/freezer trailer rentals",
    );
    await expect(supportingFamilies).toContainText(
      "Dishwashing facility rentals",
    );

    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      "Temporary commercial mobile kitchen trailer and modular facility rentals nationwide for hospitals, schools, military, government, industrial and commercial operations.",
    );

    const geometry = await page
      .locator(".mk-portfolio-grid")
      .evaluate((grid, viewportName) => {
        const primary = grid.querySelector<HTMLElement>(
          '[data-portfolio-share="80"]',
        );
        const supporting = grid.querySelector<HTMLElement>(
          '[data-portfolio-share="20"]',
        );
        const supportCards = [
          ...grid.querySelectorAll<HTMLElement>(
            '[data-portfolio-share="20"] .mk-family-card',
          ),
        ];
        if (!primary || !supporting || !supportCards.length) return null;
        const primaryBox = primary.getBoundingClientRect();
        const supportingBox = supporting.getBoundingClientRect();
        const denominator =
          viewportName === "desktop"
            ? primaryBox.width + supportingBox.width
            : primaryBox.height + supportingBox.height;
        return {
          primaryShare:
            (viewportName === "desktop"
              ? primaryBox.width
              : primaryBox.height) / denominator,
          primaryArea: primaryBox.width * primaryBox.height,
          largestSupportArea: Math.max(
            ...supportCards.map((card) => {
              const box = card.getBoundingClientRect();
              return box.width * box.height;
            }),
          ),
        };
      }, viewport.name);
    expect(geometry).not.toBeNull();
    expect(geometry!.primaryShare).toBeGreaterThanOrEqual(0.75);
    expect(geometry!.primaryShare).toBeLessThanOrEqual(0.85);
    expect(geometry!.primaryArea).toBeGreaterThan(geometry!.largestSupportArea);

    const hero = page.locator(".mk-hero-image");
    await expect(hero).toBeVisible();
    await expect
      .poll(() =>
        hero.evaluate((image: HTMLImageElement) => image.naturalWidth),
      )
      .toBeGreaterThan(0);

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
    ).toBe(true);

    const duplicateIds = await page.evaluate(() => {
      const counts = new Map<string, number>();
      document.querySelectorAll<HTMLElement>("[id]").forEach((element) => {
        counts.set(element.id, (counts.get(element.id) || 0) + 1);
      });
      return [...counts].filter(([, count]) => count > 1);
    });
    expect(duplicateIds).toEqual([]);
  });
}

test("state map supports keyboard operation and restores focus", async ({
  page,
}) => {
  await page.goto("/");
  const texas = page.locator('.coverage-map-stage [data-state="Texas"]');
  await texas.focus();
  await expect(texas).toBeFocused();
  await texas.press("Enter");

  const dialog = page.locator("#state-services-dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("[data-state-headline]")).toContainText("Texas");
  await expect(dialog.locator("[data-state-page]")).toHaveAttribute(
    "href",
    "/texas/",
  );
  await expect(dialog.locator("[data-state-regions] a")).toHaveCount(7);

  await dialog.locator("[data-close-state]").click();
  await expect(dialog).not.toBeVisible();
  await expect(texas).toBeFocused();
});

test("contact form clearly fails closed while inquiries are disabled", async ({
  page,
}) => {
  await page.goto("/contact-us/");
  await expect(page.locator("[data-quote-island]")).toHaveCount(2);
  const main = page.locator("#main");
  const inlineIsland = main.locator("[data-quote-island]");
  await expect(
    main.getByText("Online submission is being prepared"),
  ).toBeVisible();
  await expect(
    main.getByRole("button", { name: /Send project inquiry/ }),
  ).toBeDisabled();
  await expect(inlineIsland).toHaveAttribute("data-hydrated", "true");

  await inlineIsland.locator("form").evaluate((form: HTMLFormElement) => {
    form.requestSubmit();
  });
  await expect(inlineIsland.getByRole("alert")).toContainText(
    "Check the highlighted fields before sending.",
  );

  await page
    .getByRole("link", {
      name: "Contact Temporary Kitchen Rental rental support now",
    })
    .click();
  const drawer = page.getByRole("dialog", { name: "Request availability" });
  await expect(drawer).toBeVisible();
  const drawerIsland = drawer.locator("[data-quote-island]");
  await expect(drawerIsland).toHaveAttribute("data-hydrated", "true");
  await drawerIsland.locator("form").evaluate((form: HTMLFormElement) => {
    form.requestSubmit();
  });
  await expect(drawerIsland.getByRole("alert")).toContainText(
    "Check the highlighted fields before sending.",
  );

  const api = await page.request.post("/api/contact.json", {
    data: { name: "Release check" },
  });
  expect(api.status()).toBe(503);
});

test("authored state, region, directory, industry, and reviewed city pages exist", async ({
  page,
}) => {
  const paths = [
    "/texas/",
    "/service-areas/texas/north-texas/",
    "/service-areas/texas/north-texas/cities/",
    "/government/",
    "/gsa-schedule/",
    "/service-areas/washington/puget-sound/seattle/",
  ];

  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  }
});

test("unknown routes return a single-heading 404", async ({ page }) => {
  const response = await page.goto("/release-check-this-route-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
});

test("legacy asset redirect preserves tracking query parameters", async ({
  request,
}) => {
  const response = await request.get(
    "/wp-content/uploads/2023/04/2-Food-Service-Design.png?utm_source=release-check",
    { maxRedirects: 0 },
  );
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe(
    "/food-services-2/?utm_source=release-check",
  );
});

test("baseline response security headers are present", async ({ request }) => {
  const response = await request.get("/");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["referrer-policy"]).toBe(
    "strict-origin-when-cross-origin",
  );
  expect(response.headers()["permissions-policy"]).toContain("camera=()");
  expect(response.headers()["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
});
