import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { load } from "cheerio";
import { Site } from "../src/Site";
import {
  imagesForServicePath,
  orderedServiceHeroImages,
  servicePhotoCaption,
  serviceHeroImages,
  type ServiceHeroImage,
} from "../src/serviceHeroImages";
import { serviceOptions } from "../src/serviceMenu";
import { resolveLocationGallery } from "../src/locationCarouselImages";

const image = (
  id: string,
  view: ServiceHeroImage["view"],
  sortOrder: number,
): ServiceHeroImage => ({
  id,
  view,
  src: `/test/${id}.webp`,
  srcSet: `/test/${id}-480.webp 480w, /test/${id}.webp 960w`,
  sizes: "100vw",
  width: 960,
  height: 640,
  alt: `${view} view of the exact test trailer`,
  sortOrder,
  sourceUrl: `https://drive.google.com/file/d/${id}/view`,
});

describe("service hero image ordering", () => {
  it("keeps interior details ahead of exterior views", () => {
    expect(
      orderedServiceHeroImages([
        image("detail", "detail", 3),
        image("outside", "exterior", 2),
        image("inside", "interior", 1),
      ]).map(({ id }) => id),
    ).toEqual(["inside", "detail", "outside"]);
  });

  it("puts every interior and interior detail before exterior views", () => {
    Object.values(serviceHeroImages).forEach((images) => {
      const ordered = orderedServiceHeroImages(images);
      if (ordered.some(({ view }) => view === "interior")) {
        expect(ordered[0].view).toBe("interior");
      }
      const firstExterior = ordered.findIndex(
        ({ view }) => view === "exterior",
      );
      if (firstExterior < 0) return;
      expect(
        ordered
          .slice(firstExterior + 1)
          .some(({ view }) => view === "interior" || view === "detail"),
      ).toBe(false);
    });
  });

  it("excludes inventory rows flagged as duplicates or ambiguous backgrounds", () => {
    const sourceUrls = Object.values(serviceHeroImages)
      .flat()
      .map(({ sourceUrl }) => sourceUrl);
    [
      "1OOpQfZagqwIQw_Z53N7E-8ZBj1KpM6MO",
      "1bhqDy0kXvQztwpT6fNnEz4Qe4BEdXIuD",
      "1nfL9Kylpa1xaGNBE_3OvKVx40HMRGw_l",
      "1a5B7sxon2jh773an_bR2bpfCJLsq-zTu",
      "1D_vOb7GHVVuLMJXH5_NXXxcRLNCM9XLa",
      "1iekNo18xWjysKX_3vsqTCFqBqg6kjRWW",
    ].forEach((fileId) => {
      expect(sourceUrls.some((url) => url.includes(fileId))).toBe(false);
    });
  });

  it("uses setting-specific alt text only for visually verified commercial settings", () => {
    const refrigeratedFleet = serviceHeroImages[
      "/20ft-refrigeration-trailers/"
    ].find(({ reviewId }) => reviewId === "19.04");
    const warehouseViews = serviceHeroImages[
      "/services/shower-restroom-combination-trailers/22ft-6-stall/"
    ].filter(({ sourceUrl }) =>
      ["1tscOQ", "1tWbp0"].some((id) => sourceUrl.includes(id)),
    );

    expect(refrigeratedFleet?.alt).toContain("commercial building");
    expect(warehouseViews).toHaveLength(2);
    warehouseViews.forEach(({ alt }) =>
      expect(alt).toContain("commercial warehouse"),
    );
  });

  it("keeps each sleeper variant matched to its page identity", () => {
    const shared =
      serviceHeroImages["/services/mobile-sleeper-trailers/20ft-shared/"];
    const contractor =
      serviceHeroImages["/services/mobile-sleeper-trailers/20ft-contractor/"];
    const vip =
      serviceHeroImages["/services/mobile-sleeper-trailers/20ft-vip/"];
    const containerized =
      serviceHeroImages[
        "/remote-containerized-military-berthing-solution-for-rent/"
      ];

    expect(shared.length).toBeGreaterThan(1);
    shared.forEach(({ alt }) =>
      expect(alt.toLowerCase()).toMatch(/sleeper|bunk-bed/),
    );
    contractor.forEach(({ alt }) =>
      expect(alt.toLowerCase()).toContain("contractor"),
    );
    expect(vip).toHaveLength(1);
    expect(vip[0].alt.toLowerCase()).toMatch(/vip|private/);
    expect(vip[0].alt.toLowerCase()).not.toMatch(/shared|contractor|bunk/);
    containerized.forEach(({ alt }) =>
      expect(alt.toLowerCase()).toMatch(/containerized|berthing|modular/),
    );
  });

  it("uses matched photos or explicitly disclosed family references for model routes", () => {
    const routes = [...new Set(serviceOptions.map(({ href }) => href))];
    expect(routes).toHaveLength(31);
    const shower = imagesForServicePath("/services/shower-trailers/22ft-10-stall/");
    expect(shower).toHaveLength(1);
    expect(shower?.[0].family).toBe("shower-trailer");
    expect(shower?.[0].alt).toMatch(/shower-only/i);
    expect(servicePhotoCaption("/services/shower-trailers/22ft-10-stall/")).toMatch(
      /20 ft five-stall.*not a photograph.*22 ft ten-stall/i,
    );
    const showerPage = load(
      renderToStaticMarkup(createElement(Site, { path: "/services/shower-trailers/22ft-10-stall/" })),
    );
    expect(showerPage("main h1")).toHaveLength(1);
    expect(showerPage("main .service-hero-carousel [data-carousel-slide] img")).toHaveLength(1);
    expect(showerPage("main [data-carousel-caption]").text()).toMatch(
      /20 ft five-stall.*not a photograph.*22 ft ten-stall/i,
    );
    expect(showerPage("main").text()).not.toMatch(/TemporaryKitchenRental|temporary-kitchen-rental/i);

    const combination = imagesForServicePath(
      "/services/shower-restroom-combination-trailers/30ft-8-stall/",
    );
    expect(combination).toHaveLength(1);
    expect(combination?.[0].model).toBe("model-11");
    expect(combination?.[0].alt).toMatch(/30 ft eight-stall.*commercial trailers/i);
    expect(combination?.[0].alt).not.toMatch(/TemporaryKitchenRental|temporary-kitchen-rental/i);
    const combinationPage = load(
      renderToStaticMarkup(
        createElement(Site, {
          path: "/services/shower-restroom-combination-trailers/30ft-8-stall/",
        }),
      ),
    );
    expect(combinationPage("main h1")).toHaveLength(1);
    expect(combinationPage("main .service-hero-carousel [data-carousel-slide] img")).toHaveLength(1);
    expect(combinationPage("main .service-hero-carousel img").attr("alt")).toMatch(
      /30 ft eight-stall.*commercial trailers/i,
    );

    // The refrigerated-container category uses its separately checked catalog
    // illustration through EquipmentBrief rather than a service-detail model map.
    expect(imagesForServicePath("/equipment-rental/refrigerated-containers/")).toBeUndefined();
    [
      "/services/mobile-kitchen-trailers/24ft/",
      "/services/mobile-kitchen-trailers/26ft-bulk/",
      "/services/mobile-kitchen-trailers/28ft/",
      "/equipment-rental-refrigeration-12ft-refrigerated-trailer/",
      "/services/dishwashing-trailers/38ft-conveyor/",
      "/services/laundry-trailers/24ft/",
      "/services/restroom-trailers/12ft/",
      "/services/restroom-trailers/14ft/",
      "/services/restroom-trailers/20ft/",
    ].forEach((path) => {
      const count = imagesForServicePath(path)?.length ?? 0;
      expect(count, `expected approved gallery for ${path}`).toBeGreaterThan(0);
    });
  });

  it("uses the approved containerized-sleeper photos for that inventory family", () => {
    const gallery = resolveLocationGallery("Containerized Sleeper Unit");
    expect(gallery.family).toBe("sleeper-container");
    expect(gallery.modelId).toBe("model-24");
    expect(gallery.images).toHaveLength(2);
    expect(gallery.images.every((photo) => photo.alt.includes("containerized"))).toBe(true);
    expect(resolveLocationGallery("40 ft Refrigerated Container").images).toHaveLength(0);
  });

  it("renders approved references on legacy URLs and avoids cross-model substitutions", () => {
    const render = (path: string) =>
      load(renderToStaticMarkup(createElement(Site, { path })));
    const restroom = render("/12ft-restroom/");
    expect(restroom("main .service-hero-carousel [data-carousel-slide]")).toHaveLength(3);
    expect(restroom("main .service-hero-carousel").text()).toContain(
      "do not establish the separate 12 ft model's stall count",
    );

    const kitchen = render("/26ft-mobile/");
    expect(kitchen("main [data-carousel-slide]")).toHaveLength(11);
    expect(kitchen("main .service-hero-unverified")).toHaveLength(0);

    const inventory = render("/equipment-rental/");
    const sleeper = inventory("#family-containerized-sleeper-units .catalog-category-card img");
    expect(sleeper).toHaveLength(1);
    expect(sleeper.attr("alt")).toMatch(/containerized sleeping unit/i);
  });

  it("labels non-exact reference galleries with their material difference", () => {
    expect(servicePhotoCaption("/services/restroom-trailers/12ft/")).toContain(
      "do not establish the separate 12 ft model's stall count",
    );
    expect(
      servicePhotoCaption("/services/handwashing-trailers/hands-free/"),
    ).toContain("do not establish hands-free controls");
  });
});
