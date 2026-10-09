import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { load } from "cheerio";
import { describe, expect, it } from "vitest";
import { Site } from "../src/Site";
import { serviceCategories, serviceOptions } from "../src/serviceMenu";
import serviceDetails from "../content/service-details.json" with { type: "json" };

const renderPage = (path: string) =>
  load(renderToStaticMarkup(createElement(Site, { path })));

describe("restored kitchen category pages", () => {
  it("renders the preserved mobile-kitchen category with model links and approved imagery", () => {
    const path = "/equipment-rental/mobile-kitchen-trailers/";
    const category = serviceCategories.find((item) => item.name === "Mobile Kitchens");
    const $ = renderPage(path);

    expect(category?.href).toBe(path);
    expect($("main h1")).toHaveLength(1);
    expect($("main h1").text()).toBe("Kitchen Trailer Rental");
    expect($("main").text()).not.toMatch(/PAGE NOT FOUND/i);
    expect($('[data-gallery-title="24 ft Mobile Kitchen Trailer"]')).toHaveLength(1);
    expect($('[data-photography-status="verified"] img').length).toBeGreaterThan(0);
    expect($('a[href="/services/mobile-kitchen-trailers/38ft/"]').length).toBeGreaterThan(0);
    expect(serviceOptions.some((option) => option.href === "/services/mobile-kitchen-trailers/38ft/")).toBe(true);
    expect(serviceDetails["/services/mobile-kitchen-trailers/38ft/"]).toBeDefined();
  });

  it("renders the preserved modular-facility slug with dedicated content and no misleading trailer image", () => {
    const $ = renderPage("/modular-kitchen-facilities/");
    const mainText = $("main").text();

    expect($("main h1")).toHaveLength(1);
    expect($("main h1").text()).toBe("Modular Kitchen Facility Rental");
    expect(mainText).toContain("building-based");
    expect(mainText).toContain("modular kitchen");
    expect(mainText).toContain("mobile kitchen trailer rental options");
    expect(mainText).not.toMatch(/PAGE NOT FOUND|TemporaryKitchenRental|verified photo missing/i);
    expect($("main [data-location-gallery]")).toHaveLength(0);
    expect($('main a[href="/equipment-rental/mobile-kitchen-trailers/"]').length).toBeGreaterThan(0);
  });
});
