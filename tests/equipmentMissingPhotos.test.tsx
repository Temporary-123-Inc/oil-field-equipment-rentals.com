import { existsSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { load } from "cheerio";
import { describe, expect, it } from "vitest";
import { Site } from "../src/Site";
import { catalog, EquipmentBrief, EquipmentCatalog } from "../src/EquipmentCatalog";
import { Cards } from "../src/Equipment";
import { catalogPhotoCoverage } from "../src/catalogImageCoverage";
import { imagesForServicePath } from "../src/serviceHeroImages";
import serviceDetails from "../content/service-details.json" with { type: "json" };

const supplied = [
  ["restroom-trailers", 3, "restroom"],
  ["dining-structure-rental", 3, "dining"],
  ["stair-rentals", 2, "wood"],
  ["generator-trailers", 1, "generator"],
] as const;

describe("owner-approved inventory image coverage", () => {
  it.each(supplied)("uses the supplied %s product images", (id, count, altWord) => {
    const item = catalog.items.find((entry) => entry.id === id)!;
    const result = catalogPhotoCoverage(item);
    expect(result.status).toBe("reviewed-supplied");
    expect(result.images).toHaveLength(count);
    expect(result.caption).toMatch(/confirm/i);
    for (const image of result.images) {
      expect(image.alt).toMatch(new RegExp(altWord, "i"));
      expect(image.src).toContain("/images/location-verified/");
      expect(existsSync(`public${image.src}`)).toBe(true);
      expect(existsSync(`public${image.thumbnail}`)).toBe(true);
    }
  });

  it.each(["temporary-shower-trailers", "shower-trailer"])(
    "keeps a clear size/configuration disclosure for %s",
    (id) => {
      const item = catalog.items.find((entry) => entry.id === id)!;
      const result = catalogPhotoCoverage(item);
      expect(result.images.length).toBeGreaterThan(0);
      expect(result.caption).toMatch(/20 ft five-stall/i);
      expect(result.caption).toMatch(/does not depict.*22 ft ten-stall/i);
      expect(result.caption).toMatch(/Rental or Lease for/i);
      expect(result.caption).toContain("+1 (888) 563-6507");
    },
  );

  it("renders owner-supplied restroom-only references on each retained size page", () => {
    for (const length of ["12ft", "14ft", "20ft", "30ft"]) {
      const path = `/services/restroom-trailers/${length}/`;
      const $ = load(renderToStaticMarkup(createElement(Site, { path })));
      const gallery = $("main .service-hero-carousel");
      expect(gallery, path).toHaveLength(1);
      expect(gallery.find("[data-carousel-slide]")).toHaveLength(3);
      expect(gallery.text()).toMatch(
        new RegExp(`do not establish the separate ${length.replace("ft", " ft")} model`, "i"),
      );
      expect($("main").text()).not.toMatch(
        /verified photography coming soon|photo review in progress|exact equipment photography is pending/i,
      );
    }
  });

  it("renders an approved representative image for all eight public inventory families", () => {
    const $ = load(renderToStaticMarkup(createElement(EquipmentCatalog)));
    const groups = $(".catalog-group");
    expect(groups).toHaveLength(8);
    expect($(".catalog-category-card img")).toHaveLength(8);
    expect($("[data-catalog-photo-pending], [data-verified-photo-pending]")).toHaveLength(0);
    groups.each((_, group) => {
      const image = $(group).find(".catalog-category-card img");
      expect(image).toHaveLength(1);
      expect(existsSync(`public${image.attr("src")}`)).toBe(true);
    });
    expect($.text()).not.toMatch(/verified photography coming soon|photo pending/i);
  });

  it("renders all homepage inventory cards without the photo-pending fallback", () => {
    const $ = load(renderToStaticMarkup(createElement(Cards, { homepage: true })));
    expect($("#home-rental-grid > .equipment-card > .image-box img")).toHaveLength(3);
    expect($(".verified-image-pending")).toHaveLength(0);
  });

  it("renders an unbranded, accurately disclosed illustration for refrigerated containers", () => {
    const item = catalog.items.find((entry) => entry.id === "refrigerated-containers")!;
    const result = catalogPhotoCoverage(item);
    const $ = load(renderToStaticMarkup(createElement(EquipmentBrief, { item })));
    const image = $(".service-hero-carousel [data-carousel-slide] img");
    expect(image).toHaveLength(1);
    expect(image.attr("src")).toBe("/images/catalog/refrigerated-containers-960.webp");
    expect(image.attr("alt")).toMatch(/illustrated refrigerated shipping container/i);
    expect(result.images[0].fullSrc).toBe("/media/4e54342585946d7f0e0254a2.png");
    expect($("[data-carousel-caption]").text()).toMatch(/labelled 8 ft x 40 ft.*category reference/i);
    expect($.text()).not.toMatch(/TemporaryKitchenRental|temporary-kitchen-rental/i);
    expect($.text()).toContain("+1 (888) 563-6507");
  });

  it("has a visible matching or explicitly disclosed image for every inventory detail route", () => {
    const missing = Object.keys(serviceDetails).filter((path) => {
      if (path === "/equipment-rental/refrigerated-containers/") {
        const item = catalog.items.find((entry) => entry.path === path);
        return !item || catalogPhotoCoverage(item).images.length === 0;
      }
      return !imagesForServicePath(path)?.length;
    });
    expect(missing).toEqual([]);
  });

  it("uses complete Mobile Kitchen captions on represented inventory family galleries", () => {
    const galleryItems = catalog.items.filter(
      (item) => catalogPhotoCoverage(item).status === "verified-reference",
    );
    expect(galleryItems.length).toBeGreaterThan(0);
    for (const item of galleryItems) {
      const result = catalogPhotoCoverage(item);
      expect(result.caption, item.id).toMatch(/Rental or Lease(?:\.| for )/);
      expect(result.caption, item.id).toContain("Discuss weekly rental, monthly rental, or yearly rental and lease options");
      expect(result.caption, item.id).toContain("+1 (888) 563-6507");
      expect(result.caption, item.id).not.toMatch(/Reviewed equipment reference images|TemporaryKitchenRental|800-443-5212/i);
    }
  });
});
