import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { load } from "cheerio";
import { StateDetail } from "../src/StateDetail";
import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import serviceDetails from "../content/service-details.json" with { type: "json" };
import locationPhotos from "../src/locationPhotos.json" with { type: "json" };
import type { LocationPhoto } from "../src/locationPhotos";
import { regionPages, relatedRegionPages } from "../src/regionGuides";
import { serviceCategories } from "../src/serviceMenu";
import { stateGuides } from "../src/stateGuides";
import { targetRouteByPath } from "../src/temporaryKitchenRentalTarget";

const words = (value: string) =>
  value.trim().split(/\s+/).filter(Boolean).length;
const normalized = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const seasonalCopy = (seasonal: { summary: string[]; basis: string }) =>
  [...seasonal.summary, seasonal.basis].join(" ");

const hasPublishedProductRoute = (href: string) =>
  href in targetRouteByPath || href in serviceDetails;

describe("state and regional planning content", () => {
  it("covers all 50 states and 246 distinct travel regions", () => {
    expect(Object.keys(stateGuides)).toHaveLength(50);
    expect(regionPages).toHaveLength(246);
    expect(new Set(regionPages.map((guide) => guide.path)).size).toBe(246);
    for (const state of Object.keys(stateGuides)) {
      const guides = regionPages.filter((guide) => guide.state === state);
      const cityPairs = guides.map((guide) =>
        [...guide.cities].sort().join("|"),
      );
      const cities = guides.flatMap((guide) => guide.cities);
      expect(new Set(cityPairs).size, `${state} city pairs`).toBe(
        guides.length,
      );
      expect(new Set(cities).size, `${state} repeated cities`).toBe(
        cities.length,
      );
    }
  });

  it("keeps each state brief direct, qualified and locally useful", () => {
    for (const [state, guide] of Object.entries(stateGuides)) {
      const copy = [
        guide.intro,
        guide.serviceSummary,
        guide.fact,
        seasonalCopy(guide.seasonal),
      ].join(" ");
      const $ = load(
        renderToStaticMarkup(createElement(StateDetail, { name: state })),
      );
      // The editorial reading-length limit must not count image navigation UI,
      // repeated view labels or the required photography-pending message.
      $("[data-location-gallery], [data-service-carousel]").remove();
      const visibleCopy = ($("body").html() || "").replace(/<[^>]*>/g, " ");
      expect(words(visibleCopy), state).toBeGreaterThanOrEqual(250);
      expect(words(visibleCopy), state).toBeLessThanOrEqual(500);
      expect(guide.seasonal.code, state).toBeGreaterThanOrEqual(1);
      expect(guide.seasonal.code, state).toBeLessThanOrEqual(5);
      expect(guide.seasonal.basis, state).toContain(
        "not an official government risk rating",
      );

      expect(copy, state).toMatch(/base camp|man camp/i);
      expect(copy, state).toMatch(/mobile commercial kitchens/i);
      expect(copy, state).toMatch(/shower and restroom combination/i);
      expect(copy, state).toMatch(/22 ft shower trailers with 10 stalls/i);
      expect(copy, state).toMatch(/sleeper and bunkbed/i);
      expect(copy, state).not.toMatch(/[—*]/);
    }
  });

  it("keeps every regional brief within the requested reading length", () => {
    for (const guide of regionPages) {
      const copy = [
        guide.intro,
        guide.detail,
        guide.fact,
        guide.commercialSummary,
        ...guide.serviceLinks.flatMap((link) => [link.label, link.context]),
        ...guide.cityLinks.flatMap((link) => [link.label, link.context]),
        seasonalCopy(guide.seasonal),
      ].join(" ");
      expect(words(copy), guide.path).toBeGreaterThanOrEqual(250);
      expect(words(copy), guide.path).toBeLessThanOrEqual(500);
      expect(guide.cities.length, guide.path).toBeGreaterThanOrEqual(4);
      expect(guide.cities.length, guide.path).toBeLessThanOrEqual(8);
      expect(new Set(guide.cities).size, guide.path).toBe(guide.cities.length);
      for (const city of guide.cities) {
        expect(city, guide.path).not.toBe(guide.state);
        expect(copy, guide.path).toContain(city);
      }
      expect(guide.seasonal.basis, guide.path).toContain(
        "not an official government risk rating",
      );

      expect(copy, guide.path).toMatch(/base camp|man camp/i);
      expect(copy, guide.path).toMatch(/rental|rentals/i);
      expect(copy, guide.path).toMatch(/for rent/i);
      expect(copy, guide.path).toMatch(/lease|leasing/i);
      expect(copy, guide.path).toMatch(/temporary facilit(y|ies)/i);
      expect(copy, guide.path).not.toMatch(/[—*]/);
    }
    const primaryCopy = regionPages.map((guide) =>
      normalized(
        [
          guide.intro,
          guide.detail,
          guide.fact,
          guide.commercialSummary,
          ...guide.serviceLinks.flatMap((link) => [link.label, link.context]),
          ...guide.cityLinks.flatMap((link) => [link.label, link.context]),
          seasonalCopy(guide.seasonal),
        ].join(" "),
      ),
    );
    expect(new Set(primaryCopy).size).toBe(regionPages.length);
  });

  it("creates a verified contextual linking network for every region", () => {
    const validServicePaths = new Set(
      serviceCategories.flatMap((category) => [
        category.href,
        ...category.links.map((link) => link.href),
      ]),
    );
    const regionPaths = new Set(regionPages.map((guide) => guide.path));
    for (const guide of regionPages) {
      expect(guide.cityLinks, guide.path).toHaveLength(guide.cities.length);
      expect(guide.serviceLinks, guide.path).toHaveLength(4);
      expect(
        new Set(guide.cityLinks.map((link) => link.label)).size,
        guide.path,
      ).toBe(guide.cityLinks.length);
      for (const [index, link] of guide.cityLinks.entries()) {
        const url = new URL(link.href, "https://temporary-kitchen-rental.test");
        if (url.pathname.startsWith(guide.path)) {
          expect(url.pathname.endsWith("/"), link.href).toBe(true);
          expect(url.search, link.href).toBe("");
        } else {
          expect(validServicePaths.has(url.pathname), link.href).toBe(true);
          expect(url.searchParams.get("location"), link.href).toBe(
            `${guide.cities[index]}, ${guide.state}`,
          );
        }
        expect(link.label, guide.path).toContain(guide.cities[index]);
      }
      for (const link of guide.serviceLinks) {
        expect(validServicePaths.has(link.href), link.href).toBe(true);
      }
      const related = relatedRegionPages(guide);
      expect(related, guide.path).toHaveLength(3);
      expect(new Set(related.map((page) => page.path)).size, guide.path).toBe(
        3,
      );
      expect(
        related.some((page) => page.path === guide.path),
        guide.path,
      ).toBe(false);
      for (const page of related) {
        expect(regionPaths.has(page.path), page.path).toBe(true);
      }
      const contextualLinkCount =
        guide.cityLinks.length + guide.serviceLinks.length + related.length + 1;
      expect(contextualLinkCount, guide.path).toBeGreaterThanOrEqual(12);
      expect(contextualLinkCount, guide.path).toBeLessThanOrEqual(16);
    }
  });
});

describe("location media and shower inventory", () => {
  it("retains licensed location imagery with provenance in the source archive", () => {
    const entries: [string, LocationPhoto][] = [
      ...Object.entries(locationPhotos.states),
      ...Object.entries(locationPhotos.regions),
    ] as [string, LocationPhoto][];
    expect(Object.keys(locationPhotos.states)).toHaveLength(50);
    expect(Object.keys(locationPhotos.regions)).toHaveLength(246);
    expect(new Set(entries.map(([, photo]) => photo.sourceUrl)).size).toBe(296);
    for (const [name, photo] of entries) {
      expect(
        existsSync(`public${photo.image}`),
        `${name}: ${photo.image}`,
      ).toBe(true);
      expect(photo.imageAlt.length, name).toBeGreaterThan(24);
      expect(photo.sourceUrl, name).toMatch(
        /^https:\/\/commons\.wikimedia\.org\//,
      );
      expect(photo.license, name).toBeTruthy();
      expect(photo.width, name).toBeGreaterThanOrEqual(photo.height);
      expect(photo.title, name).not.toMatch(
        /\b(map|flag|logo|seal|diagram|drawing|plan|sign|marker|plaque|fish|grayling|bird|specimen|portrait|statue|monument|memorial|sculpture|cemetery)\b/i,
      );
    }
    for (const guide of regionPages) {
      const photo = locationPhotos.regions[
        guide.path as keyof typeof locationPhotos.regions
      ] as LocationPhoto;
      const title = normalized(photo.title);
      const placeTerms = [guide.region, ...guide.cities];
      if (guide.path === "/service-areas/alaska/arctic/") {
        placeTerms.push("Barrow");
      }
      expect(
        placeTerms.some((place) => title.includes(normalized(place))),
        `${guide.path}: ${photo.title}`,
      ).toBe(true);
    }
  });

  it("publishes the verified Temporary Kitchen Rental shower inventory", () => {
    const shower = serviceCategories.find(
      (category) => category.name === "Shower Trailers",
    );
    expect(shower?.links).toEqual([
      { name: "12 ft Shower Trailer", href: "/12ft-shower/" },
      { name: "14 ft Shower Trailer", href: "/14ft-shower/" },
      { name: "20 ft Shower Trailer", href: "/20ft-shower/" },
      { name: "30 ft Shower Trailer", href: "/30ft-shower/" },
      {
        name: "22 ft Shower Trailer, 10 Stalls",
        href: "/services/shower-trailers/22ft-10-stall/",
      },
    ]);
    for (const { href } of shower?.links ?? []) {
      expect(hasPublishedProductRoute(href), href).toBe(true);
    }
    const tenStallShower =
      serviceDetails["/services/shower-trailers/22ft-10-stall/"];
    expect([tenStallShower.name, tenStallShower.intro].join(" ")).toMatch(
      /10[- ]stall/i,
    );
  });

  it("keeps restroom models separate from shower-restroom combinations", () => {
    const restroom = serviceCategories.find(
      (category) => category.name === "Restroom Trailers",
    );
    expect(restroom?.links.map(({ name, href }) => ({ name, href }))).toEqual([
      {
        name: "12 ft Restroom Trailer",
        href: "/12ft-restroom/",
      },
      {
        name: "14 ft Restroom Trailer",
        href: "/14ft-restroom/",
      },
      {
        name: "20 ft Restroom Trailer",
        href: "/20ft-restroom/",
      },
      {
        name: "30 ft Restroom Trailer",
        href: "/30ft-restroom/",
      },
    ]);
    expect(
      restroom?.links.every((link) => !link.href.includes("combination")),
    ).toBe(true);
  });

  it("publishes the current shower-restroom combination inventory", () => {
    const combination = serviceCategories.find(
      (category) => category.name === "Restroom & Shower Combination",
    );
    const expected = [
      {
        name: "12 ft All-in-One Restroom and Shower Trailer",
        href: "/12ft-restroom-shower-all-in-one-trailer/",
      },
      {
        name: "14 ft Restroom and Shower Combination Trailer",
        href: "/14ft-restroom-shower-combo-trailer/",
      },
      {
        name: "14 ft Restroom and Shower Combination Facility",
        href: "/14ft-restroom-shower-combo-trailer-2/",
      },
      {
        name: "20 ft Restroom and Shower Combination Trailer",
        href: "/20ft-restroom-shower-combo-trailer-rental/",
      },
      {
        name: "30 ft Shower and Restroom Combination Trailer, 8 Stalls",
        href: "/services/shower-restroom-combination-trailers/30ft-8-stall/",
      },
    ];
    expect(combination?.links).toEqual(expected);
    for (const item of expected) {
      expect(hasPublishedProductRoute(item.href), item.href).toBe(true);
    }
    const eightStallCombination =
      serviceDetails[
        "/services/shower-restroom-combination-trailers/30ft-8-stall/"
      ];
    expect(
      [eightStallCombination.name, eightStallCombination.intro].join(" "),
    ).toMatch(/8[- ]stall/i);
  });
});
