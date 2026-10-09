import { expect, test } from "@playwright/test";

test("inventory and retained product URLs use only matching approved galleries", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  const inventoryResponse = await page.goto("/equipment-rental/");
  expect(inventoryResponse?.status()).toBe(200);
  await expect(page.locator("main h1")).toHaveCount(1);
  const sleeperTile = page.locator(
    "#family-containerized-sleeper-units .catalog-category-card img",
  );
  await expect(sleeperTile).toHaveAttribute(
    "alt",
    /containerized sleeping unit/i,
  );
  await expect(sleeperTile).toHaveAttribute("src", /7b5d1b57a82ab1148a23-960/);

  for (const [route, expectedCount, family] of [
    ["/12ft-restroom/", 3, "restroom-trailer"],
    ["/14ft-restroom/", 3, "restroom-trailer"],
    ["/20ft-restroom/", 3, "restroom-trailer"],
    ["/30ft-restroom/", 3, "restroom-trailer"],
    ["/20ft-shower/", 6, "shower-trailer"],
    ["/30ft-laundry/", 1, "laundry-trailer"],
    ["/containerized-laundry-unit-rental/", 3, "laundry-container"],
    ["/containerized-sleeper-rental-2/", 2, "sleeper-container"],
  ] as const) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("main h1"), route).toHaveCount(1);
    const gallery = page.locator("main [data-service-carousel], main [data-location-gallery]").first();
    await expect(gallery, route).toBeVisible();
    await expect(gallery.locator("[data-carousel-slide]"), route).toHaveCount(expectedCount);
    if (route === "/containerized-sleeper-rental-2/") {
      await expect(gallery).toHaveAttribute("data-equipment-family", family);
    }
  }

  for (const route of [
    "/12ft-restroom-shower-all-in-one-trailer/",
    "/12ft-shower/",
    "/14ft-restroom-shower-combo-trailer-2/",
    "/14ft-restroom-shower-combo-trailer/",
    "/14ft-shower/",
    "/20ft-restroom-shower-combo-trailer-rental/",
    "/24ft-laundry/",
    "/30ft-shower/",
    "/26ft-mobile/",
    "/refrigeration-container-40ft-rental-5/",
  ]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("main h1"), route).toHaveCount(1);
    await expect(page.locator("main [data-carousel-slide]"), route).toHaveCount(0);
  }

  await page.goto("/12ft-restroom/");
  await expect(page.locator("main .service-hero-carousel")).toContainText(
    "do not establish the separate 12 ft model's stall count",
  );
});
