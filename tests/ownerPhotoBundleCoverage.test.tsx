import { createHash } from "node:crypto";
import fs from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { load } from "cheerio";
import { describe, expect, it } from "vitest";
import ownerImport from "../content/equipment-photo-import-20260923.json" with { type: "json" };
import manifest from "../content/verified-equipment-images.json" with { type: "json" };
import { LocationImageCarousel } from "../src/LocationImageCarousel";
import { modelDetails } from "../src/ServiceDetail";
import { Site } from "../src/Site";
import { imagesForServicePath } from "../src/serviceHeroImages";
import { resolveLocationGallery } from "../src/locationCarouselImages";

describe("owner-approved September inventory photo handoff", () => {
  it("preserves every imported source byte and responsive derivative", () => {
    expect(ownerImport.models).toHaveLength(10);
    expect(ownerImport.images).toHaveLength(49);
    for (const imported of ownerImport.images) {
      const original = fs.readFileSync(`public${imported.original}`);
      expect(original.byteLength, imported.original).toBe(imported.bytes);
      expect(createHash("sha256").update(original).digest("hex")).toBe(
        imported.sha256,
      );
      const rendered = manifest.images.find((row) => row.id === imported.id);
      expect(rendered, imported.id).toBeDefined();
      expect(rendered?.reviewedVisually, imported.id).toBe(true);
      expect(rendered?.status, imported.id).toBe("approved");
      expect(fs.existsSync(`public${rendered!.src}`), imported.id).toBe(true);
      expect(fs.existsSync(`public${rendered!.thumbnail}`), imported.id).toBe(true);
    }
  });

  it.each([
    ["26 ft Bulk Mobile Kitchen", "owner-26ft-bulk-mobile-kitchen", 11],
    ["12 ft Refrigerated Trailer", "owner-12ft-refrigerated-trailer", 4],
    ["24 ft Mobile Laundry Trailer", "owner-24ft-mobile-laundry-trailer", 3],
    ["20 ft Refrigerated Container", "owner-20ft-refrigerated-container", 3],
    [
      "Shower-Restroom Combination Trailer, 3 Stalls + 1 ADA",
      "owner-3-stall-1-ada-combination",
      8,
    ],
    [
      "Shower-Restroom Combination Trailer, 8 Stalls + 1 ADA",
      "owner-8-stall-1-ada-combination",
      11,
    ],
  ])("selects only the exact owner-labeled model gallery: %s", (title, model, count) => {
    const gallery = resolveLocationGallery(title);
    expect(gallery.modelId).toBe(model);
    expect(gallery.images).toHaveLength(count);
    expect(new Set(gallery.images.map((image) => image.model))).toEqual(
      new Set([model]),
    );
    expect(new Set(gallery.images.map((image) => image.sha256)).size).toBe(count);
  });

  it("places the exact images on the preserved 26 ft, 12 ft, and 24 ft product routes", () => {
    const expected = [
      ["/services/mobile-kitchen-trailers/26ft-bulk/", "owner-26ft-bulk-mobile-kitchen", 11],
      ["/equipment-rental-refrigeration-12ft-refrigerated-trailer/", "owner-12ft-refrigerated-trailer", 4],
      ["/services/laundry-trailers/24ft/", "owner-24ft-mobile-laundry-trailer", 3],
      ["/services/shower-restroom-combination-trailers/3-stall-1-ada/", "owner-3-stall-1-ada-combination", 8],
      ["/services/shower-restroom-combination-trailers/8-stall-1-ada/", "owner-8-stall-1-ada-combination", 11],
    ] as const;
    for (const [path, model, count] of expected) {
      const images = imagesForServicePath(path);
      expect(images, path).toHaveLength(count);
      expect(new Set(images?.map((image) => image.model))).toEqual(new Set([model]));
    }
    expect(
      imagesForServicePath("/services/restroom-trailers/12ft/")?.map(
        (image) => image.model,
      ),
    ).toEqual(Array(3).fill("owner-restroom-only-reference"));
  });

  it("keeps cross-size gaps unpictured and removes user-facing missing-photo placeholders", () => {
    expect(resolveLocationGallery("40 ft Refrigerated Container").images).toHaveLength(0);
    expect(resolveLocationGallery("22 ft Shower Trailer, 10 Stalls").images).toHaveLength(0);
    expect(resolveLocationGallery("3-stall 1-ADA Combination Trailer").modelId).toBe(
      "owner-3-stall-1-ada-combination",
    );
    const noMatch = load(
      renderToStaticMarkup(
        createElement(LocationImageCarousel, { headline: "22 ft Shower Trailer, 10 Stalls" }),
      ),
    );
    expect(noMatch(".location-image-carousel")).toHaveLength(0);
    expect(noMatch.text()).toBe("");

    for (const path of Object.keys(modelDetails)) {
      const $ = load(renderToStaticMarkup(createElement(Site, { path })));
      expect($("h1"), path).toHaveLength(1);
      expect($(".service-hero-unverified"), path).toHaveLength(0);
      expect($("[data-catalog-photo-pending], [data-verified-photo-pending]"), path).toHaveLength(0);
      expect($("main").text(), path).not.toMatch(
        /verified photography coming soon|exact equipment photography is pending|photo review in progress/i,
      );
    }
  }, 30000);
});
