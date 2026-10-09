import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { load } from "cheerio";
import { describe, expect, it } from "vitest";
import { Site } from "../src/Site";
import { targetRoutes } from "../src/temporaryKitchenRentalTarget";
import { legacyProductPageCopy } from "../src/temporaryKitchenRentalLegacyCopy";
import { ServiceDetail, modelDetails } from "../src/ServiceDetail";
import { temporaryKitchenRentalServiceEditorial } from "../src/temporaryKitchenRentalServiceEditorial";
import { IndustryDetail, industryGuides } from "../src/IndustryDetail";

const legacyProductRoutes = targetRoutes.filter(
  (route) => !route.location && !route.sourcePath,
);
const kitchenOnlyCopy = /meal volume|meals per service|cooking and preparation|temporary food-service operations/i;
// Internal regression screen only; not a Google similarity or indexing threshold.
const maxInternalCopySimilarity = 0.55;

function tokenSet(text: string) {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2 && !/^\d+$/.test(word)),
  );
}

function copySimilarity(left: string, right: string) {
  const a = tokenSet(left);
  const b = tokenSet(right);
  const union = new Set([...a, ...b]);
  return union.size
    ? [...a].filter((word) => b.has(word)).length / union.size
    : 1;
}

describe("Temporary Kitchen Rental legacy product-page copy alignment", () => {
  it("keeps the preserved product routes and their single H1s intact", () => {
    expect(legacyProductRoutes).toHaveLength(17);
    expect(Object.keys(legacyProductPageCopy)).toHaveLength(17);
    for (const route of legacyProductRoutes) {
      const page = load(
        renderToStaticMarkup(createElement(Site, { path: route.path })),
      );

      expect(page("h1"), route.path).toHaveLength(1);
      expect(page("h1").text().trim(), route.path).toBe(route.title);
    }
  });

  it("keeps photographed legacy routes on a side-by-side hero with specific, complete captions", () => {
    for (const route of legacyProductRoutes) {
      const page = load(
        renderToStaticMarkup(createElement(Site, { path: route.path })),
      );
      const hero = page(".target-legacy-hero-grid");
      expect(hero, route.path).toHaveLength(1);
      const gallery = hero.find("[data-service-carousel]");
      if (!gallery.length) continue;

      const caption = gallery.find("[data-carousel-caption]").text();
      expect(caption.length, route.path).toBeGreaterThan(100);
      expect(caption, route.path).toMatch(/Rental or Lease(?:\.| for )/);
      expect(caption, route.path).toContain("Discuss weekly rental, monthly rental, or yearly rental and lease options");
      expect(caption, route.path).toContain("Call Temporary Kitchen Rental now for 24/7 live-agent support: +1 (888) 563-6507");
      expect(caption, route.path).not.toMatch(/Reviewed equipment reference images|TemporaryKitchenRental|800-443-5212/i);
    }
  });

  it("does not leak kitchen-only planning language into other legacy product pages", () => {
    const nonKitchenRoutes = legacyProductRoutes.filter(
      ({ family }) => family !== "Mobile kitchens",
    );

    expect(nonKitchenRoutes.length).toBeGreaterThan(0);
    for (const route of nonKitchenRoutes) {
      const page = load(
        renderToStaticMarkup(createElement(Site, { path: route.path })),
      );

      expect(page("main").text(), route.path).not.toMatch(kitchenOnlyCopy);
    }
  });

  it("gives the 12 ft restroom page restroom-specific lead and planning guidance", () => {
    const page = load(
      renderToStaticMarkup(createElement(Site, { path: "/12ft-restroom/" })),
    );

    expect(page("h1").text()).toBe("12 ft Restroom Trailer Rental");
    expect(page("[data-h1-intro]").text()).toMatch(/12 ft restroom trailer/i);
    expect(page(".kitchen-project-guide h2").text()).toBe(
      "Check the 12 ft restroom model against your site",
    );
    expect(page(".kitchen-project-guide p").text()).toMatch(
      /12 ft model.*photographs/i,
    );
    expect(page(".target-related-models a").attr("href")).toBe(
      "/14ft-restroom/",
    );
  });

  it("gives each legacy model its own lead and planning content beyond the H1", () => {
    const intros: string[] = [];
    const guides: string[] = [];

    for (const route of legacyProductRoutes) {
      const page = load(
        renderToStaticMarkup(createElement(Site, { path: route.path })),
      );
      const intro = page("[data-h1-intro]").text().replace(/\s+/g, " ").trim();
      const guide = page(".kitchen-project-guide").text().replace(/\s+/g, " ").trim();

      expect(intro.length, `${route.path} lead length`).toBeGreaterThan(100);
      expect(guide.length, `${route.path} planning content length`).toBeGreaterThan(200);
      expect(guide).not.toMatch(/What the rental team needs to know|PREPARE YOUR PROJECT BRIEF/i);
      expect(legacyProductPageCopy[route.path].related.length, route.path).toBeGreaterThan(0);
      intros.push(intro);
      guides.push(guide);
    }

    expect(new Set(intros).size).toBe(legacyProductRoutes.length);
    expect(new Set(guides).size).toBe(legacyProductRoutes.length);

    const editorial = legacyProductRoutes.map((route) => ({
      path: route.path,
      text: [
        legacyProductPageCopy[route.path].intro,
        legacyProductPageCopy[route.path].sectionTitle,
        legacyProductPageCopy[route.path].summary,
        ...legacyProductPageCopy[route.path].checks,
      ].join(" "),
    }));
    for (let i = 0; i < editorial.length; i += 1) {
      for (let j = i + 1; j < editorial.length; j += 1) {
        expect(
          copySimilarity(editorial[i].text, editorial[j].text),
          `${editorial[i].path} vs ${editorial[j].path} internal copy similarity`,
        ).toBeLessThan(maxInternalCopySimilarity);
      }
    }
  });

  it("keeps kitchen-specific planning copy on a kitchen route", () => {
    const page = load(
      renderToStaticMarkup(createElement(Site, { path: "/24ft-mobile/" })),
    );

    expect(page("h1").text()).toBe("24ft Mobile Kitchen Trailer Rental");
    expect(page("main").text()).toMatch(/meals per service|meal volume/i);
  });

  it("covers every registered model page with model-specific planning copy", () => {
    const modelPaths = Object.keys(modelDetails);
    expect(modelPaths).toHaveLength(33);
    expect(Object.keys(temporaryKitchenRentalServiceEditorial)).toHaveLength(modelPaths.length);

    const planningSections: Array<{ path: string; text: string }> = [];
    for (const path of modelPaths as (keyof typeof modelDetails)[]) {
      const page = load(
        renderToStaticMarkup(createElement(ServiceDetail, { path })),
      );
      const model = modelDetails[path];
      const editorial = temporaryKitchenRentalServiceEditorial[path];

      expect(editorial, path).toBeDefined();
      expect(page("h1"), path).toHaveLength(1);
      expect(page(".model-information h2").first().text()).toContain(model.name);
      expect(page(".model-information h2").eq(1).text()).toContain(model.name);
      expect(page(".model-planning h2").text()).toContain(model.name);
      expect(page(".model-related").text()).not.toMatch(/TemporaryKitchenRental/i);
      const caption = page("[data-carousel-caption]").text();
      if (caption) {
        expect(caption, path).toContain(model.name.replace(/\s+(?:Rental|For Rent|Leasing)$/i, ""));
        expect(caption, path).toMatch(/Rental or Lease(?:\.| for )/);
        expect(caption, path).toContain("+1 (888) 563-6507");
        expect(caption, path).not.toMatch(/Reviewed equipment reference images|TemporaryKitchenRental|800-443-5212/i);
      }
      planningSections.push({
        path,
        text: `${editorial.use} ${editorial.planning.join(" ")} ${editorial.confirm}`,
      });
    }

    expect(new Set(planningSections.map(({ text }) => text)).size).toBe(
      modelPaths.length,
    );
    for (let i = 0; i < planningSections.length; i += 1) {
      for (let j = i + 1; j < planningSections.length; j += 1) {
        expect(
          copySimilarity(planningSections[i].text, planningSections[j].text),
          `${planningSections[i].path} vs ${planningSections[j].path} internal copy similarity`,
        ).toBeLessThan(maxInternalCopySimilarity);
      }
    }
  });

  it("uses the Mobile Kitchen caption standard on industry hero galleries", () => {
    for (const guide of industryGuides) {
      const page = load(
        renderToStaticMarkup(createElement(IndustryDetail, { path: guide.path })),
      );
      const captions = page("[data-carousel-caption]");
      expect(captions.length, guide.path).toBeGreaterThan(0);
      for (const element of captions.toArray()) {
        const caption = page(element).text();
        expect(caption, guide.path).toMatch(/Rental or Lease(?:\.| for )/);
        expect(caption, guide.path).toContain("+1 (888) 563-6507");
        expect(caption, guide.path).not.toMatch(/Reviewed equipment reference images|TemporaryKitchenRental|800-443-5212/i);
      }
    }
  });

  it("keeps the known 12 ft restroom source conflict explicit instead of borrowing 14 ft claims", () => {
    const page = load(
      renderToStaticMarkup(
        createElement(ServiceDetail, { path: "/services/restroom-trailers/12ft/" }),
      ),
    );

    expect(page(".model-information").text()).toMatch(/12 ft\/14 ft description conflict/i);
    expect(page(".model-information").text()).not.toMatch(/flush toilets|handwashing sinks/);
  });
});
