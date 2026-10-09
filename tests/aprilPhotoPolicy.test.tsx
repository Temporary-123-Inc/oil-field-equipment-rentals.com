import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { load } from "cheerio";
import {
  photoCoverage,
  equipmentPhotoPolicy,
} from "../src/equipmentPhotoPolicy";
import { resolveLocationGallery } from "../src/locationCarouselImages";
import { LocationImageCarousel } from "../src/LocationImageCarousel";
import { ApprovedEquipmentPhotoOptions } from "../src/ApprovedEquipmentPhotoOptions";
import { imagesForServicePath } from "../src/serviceHeroImages";

describe("April approval scope and minimum usable photo", () => {
  it("accepts one interior, one exterior or mixed views, but not only a diagram", () => {
    expect(equipmentPhotoPolicy.requireBothViews).toBe(false);
    expect(photoCoverage([{ view: "interior" }])).toMatchObject({
      usable: true,
      kind: "interior-only",
    });
    expect(photoCoverage([{ view: "exterior" }])).toMatchObject({
      usable: true,
      kind: "exterior-only",
    });
    expect(
      photoCoverage([{ view: "interior" }, { view: "exterior" }]).usable,
    ).toBe(true);
    expect(photoCoverage([{ view: "plan" }]).usable).toBe(false);
    expect(photoCoverage([]).usable).toBe(false);
  });
  it("renders the owner-supplied 20ft refrigerated-container gallery", () => {
    const $ = load(
      renderToStaticMarkup(
        createElement(LocationImageCarousel, {
          headline: "20 ft Refrigerated Container",
        }),
      ),
    );
    expect($("[data-carousel-slide]")).toHaveLength(3);
    expect($("[data-verified-photo-pending]")).toHaveLength(0);
    expect($("[data-carousel-next]")).toHaveLength(1);
    expect($("[data-carousel-zoom]")).toHaveLength(3);
    expect($("[data-photo-coverage]").attr("data-photo-coverage")).toBe(
      "interior-only",
    );
  });
  it("uses all five trailer files with both interiors first and no repeated bytes", () => {
    const images = resolveLocationGallery("20ft Refrigerated Trailer").images;
    expect(images.map((i) => i.reviewId)).toEqual([
      "19.02",
      "19.05",
      "19.01",
      "19.03",
      "19.04",
    ]);
    expect(images.map((i) => i.view)).toEqual([
      "interior",
      "interior",
      "exterior",
      "exterior",
      "exterior",
    ]);
    expect(new Set(images.map((i) => i.sha256)).size).toBe(5);
    expect(imagesForServicePath("/20ft-refrigeration-trailers/")).toEqual(
      images,
    );
  });
  it("uses the owner-supplied 20ft container set without borrowing a trailer view", () => {
    const trailer = resolveLocationGallery("20ft Refrigerated Trailer").images;
    const container = resolveLocationGallery(
      "20ft Refrigerated Container",
    ).images;
    expect(container).toHaveLength(3);
    expect(container.every((image) => image.family === "refrigerated-container")).toBe(true);
    expect(container.every((image) => image.model === "owner-20ft-refrigerated-container")).toBe(true);
    expect(container.some((image) => image.fullSrc === trailer[0].fullSrc)).toBe(false);
    expect(
      resolveLocationGallery("40ft Refrigerated Container").images.some(
        (i) => i.sha256 === container[0].sha256,
      ),
    ).toBe(false);
    expect(
      resolveLocationGallery("12ft Refrigerated Container").images,
    ).toHaveLength(0);
    expect(resolveLocationGallery("12ft Refrigerated Trailer").images).toHaveLength(4);
  });
  it("uses two owner-designated sleeper interiors without borrowing a different room or exterior", () => {
    const images = resolveLocationGallery("Two-Stall Sleeper Trailer").images;
    expect(images.map((i) => i.reviewId)).toEqual(["24.01", "24.08"]);
    expect(images.every((i) => i.view === "interior")).toBe(true);
    expect(
      resolveLocationGallery("20ft Two-Stall Sleeper Trailer").images,
    ).toHaveLength(0);
    expect(
      resolveLocationGallery("4-Room Sleeper Trailer").images.map(
        (i) => i.reviewId,
      ),
    ).toEqual(["23.09"]);
  });
  it("retains explicit ADA-model, modular and dimension safeguards", () => {
    for (const title of [
      "38 ft All Electric Kitchen Modular Building",
      "22ft 10-Stall Shower Trailer",
    ])
      expect(resolveLocationGallery(title).images, title).toHaveLength(0);
  });
  it("places the 20ft container reference only on the existing refrigeration hub", () => {
    const html = renderToStaticMarkup(
      createElement(ApprovedEquipmentPhotoOptions, {
        category: "Refrigeration",
      }),
    );
    const $ = load(html);
    expect($("h1")).toHaveLength(0);
    expect($("h2").text()).toBe("20 ft Refrigerated Container");
    expect($("[data-carousel-slide]")).toHaveLength(3);
    expect(
      renderToStaticMarkup(
        createElement(ApprovedEquipmentPhotoOptions, { category: "Unknown" }),
      ),
    ).toBe("");
  });
});
