import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { load } from "cheerio";
import { describe, expect, it } from "vitest";
import { EquipmentCatalog, catalog } from "../src/EquipmentCatalog";
import { Site } from "../src/Site";
import { serviceOptions } from "../src/serviceMenu";
import serviceDetails from "../content/service-details.json" with { type: "json" };

const productRoutes = [
  "/equipment-rental/refrigerated-containers/",
  "/services/shower-trailers/22ft-10-stall/",
  "/services/shower-restroom-combination-trailers/30ft-8-stall/",
];
const temporaryKitchenRentalSitemap = readFileSync(
  "public/sitemap-review.xml",
  "utf8",
);

describe("preserved TemporaryKitchenRental inventory slugs", () => {
  it.each(productRoutes)("renders a complete page structure for %s", (path) => {
    expect(temporaryKitchenRentalSitemap).toContain(
      `https://temporary-kitchen-rental.com${path}`,
    );
    const $ = load(renderToStaticMarkup(createElement(Site, { path })));
    expect($("main h1")).toHaveLength(1);
    expect($("main h1").text().trim()).not.toBe("");
    expect($("main").text()).not.toMatch(/PAGE NOT FOUND/i);
    expect($("main .service-hero-carousel")).toHaveLength(1);
  });

  it("links model details from their matching equipment family", () => {
    for (const path of productRoutes.slice(1)) {
      expect(serviceDetails[path as keyof typeof serviceDetails]).toBeDefined();
      expect(serviceOptions.some((option) => option.href === path)).toBe(true);
      expect(
        serviceOptions.filter((option) => option.href === path),
      ).toHaveLength(1);
    }

    const refrigeratedContainers = catalog.items.find(
      (item) => item.id === "refrigerated-containers",
    );
    expect(refrigeratedContainers?.path).toBe(productRoutes[0]);

    const $ = load(renderToStaticMarkup(createElement(EquipmentCatalog)));
    expect($(`a[href="${productRoutes[0]}"]`).length).toBeGreaterThan(0);
  });
});
