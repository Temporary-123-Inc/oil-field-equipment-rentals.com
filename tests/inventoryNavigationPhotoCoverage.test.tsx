import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { load } from "cheerio";
import { describe, expect, it } from "vitest";
import { EquipmentCatalog } from "../src/EquipmentCatalog";
import { Site } from "../src/Site";
import {
  inventoryNavigationCategories,
  inventoryNavigationPhotoHolds,
  serviceCategories,
} from "../src/serviceMenu";

const expectedPhotoHolds = [
  "/12ft-shower/",
  "/14ft-shower/",
  "/30ft-shower/",
];

describe("inventory navigation image coverage", () => {
  it("temporarily hides only the three unpictured shower-only destinations", () => {
    expect([...inventoryNavigationPhotoHolds].sort()).toEqual(
      [...expectedPhotoHolds].sort(),
    );

    const header = load(
      renderToStaticMarkup(createElement(Site, { path: "/" })),
    );
    for (const path of expectedPhotoHolds) {
      expect(header(`header a[href="${path}"]`), path).toHaveLength(0);
      const page = load(
        renderToStaticMarkup(createElement(Site, { path })),
      );
      expect(page("main .service-hero-carousel"), path).toHaveLength(0);
    }
  });

  it("restores shower-combination and refrigerated routes with clearly disclosed reference imagery", () => {
    const header = load(
      renderToStaticMarkup(createElement(Site, { path: "/" })),
    );
    const references = [
      {
        path: "/12ft-restroom-shower-all-in-one-trailer/",
        shownSize: "13 ft, 3-stall",
        differentModel: "dimensions, stall count, floor plan",
      },
      {
        path: "/14ft-restroom-shower-combo-trailer/",
        shownSize: "13 ft, 3-stall",
        differentModel: "dimensions, stall count, floor plan",
      },
      {
        path: "/14ft-restroom-shower-combo-trailer-2/",
        shownSize: "13 ft, 3-stall",
        differentModel: "dimensions, stall count, floor plan",
      },
      {
        path: "/20ft-restroom-shower-combo-trailer-rental/",
        shownSize: "22 ft, 6-stall",
        differentModel: "dimensions, stall count, floor plan",
      },
    ];

    for (const reference of references) {
      expect(
        header(`header a[href="${reference.path}"]`).length,
        reference.path,
      ).toBeGreaterThan(0);
      const page = load(
        renderToStaticMarkup(createElement(Site, { path: reference.path })),
      );
      expect(page("main .service-hero-carousel"), reference.path).toHaveLength(1);
      const caption = page("main .service-hero-carousel").text();
      expect(caption).toContain(reference.shownSize);
      expect(caption).toContain(reference.differentModel);
      expect(caption).toContain("do not establish");
      expect(caption).not.toMatch(/temporary-kitchen-rental/i);
    }

    const refrigeratedPath = "/refrigeration-container-40ft-rental-5/";
    expect(header(`header a[href="${refrigeratedPath}"]`).length).toBeGreaterThan(0);
    const refrigeratedPage = load(
      renderToStaticMarkup(createElement(Site, { path: refrigeratedPath })),
    );
    expect(refrigeratedPage("main .service-hero-carousel")).toHaveLength(1);
    expect(refrigeratedPage("main .service-hero-carousel").text()).toContain(
      "category reference, not confirmation",
    );
  });

  it("keeps every remaining header inventory destination backed by a rendered gallery", () => {
    expect(inventoryNavigationCategories).toHaveLength(serviceCategories.length);
    for (const category of inventoryNavigationCategories) {
      expect(category.links.length, category.name).toBeGreaterThan(0);
      if (category.href.includes("#")) {
        const directory = load(
          renderToStaticMarkup(createElement(EquipmentCatalog)),
        );
        const sectionId = category.href.split("#")[1];
        expect(directory(`#${sectionId} .catalog-category-card img`)).toHaveLength(1);
      } else {
        const categoryPage = load(
          renderToStaticMarkup(createElement(Site, { path: category.href })),
        );
        expect(
          categoryPage("main .service-hero-carousel"),
          category.href,
        ).toHaveLength(1);
      }

      for (const link of category.links) {
        const page = load(
          renderToStaticMarkup(createElement(Site, { path: link.href })),
        );
        expect(
          page("main .service-hero-carousel"),
          `${category.name}: ${link.href}`,
        ).toHaveLength(1);
      }
    }
  });

  it("retains all original inventory links on the full inventory page", () => {
    const directory = load(
      renderToStaticMarkup(createElement(EquipmentCatalog)),
    );
    for (const category of serviceCategories) {
      for (const link of category.links) {
        expect(directory(`a[href="${link.href}"]`).length, link.href).toBeGreaterThan(0);
      }
    }
  });
});
