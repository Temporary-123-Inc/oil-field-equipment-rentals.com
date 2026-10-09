import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { load } from "cheerio";
import { describe, expect, it } from "vitest";
import { Home } from "../src/Home";

describe("homepage rental-family balance", () => {
  const wordCount = (value: string) =>
    value
      .replace(/[^A-Za-z0-9'+&/-]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

  it("leads with one mobile-kitchen H1 and names every verified supporting family", () => {
    const $ = load(renderToStaticMarkup(createElement(Home)));
    expect($("h1")).toHaveLength(1);
    expect($("h1").text().trim()).toBe(
      "Temporary Commercial Mobile Kitchen Facility Rentals Nationwide",
    );

    const intro = $("[data-h1-intro]").text();
    for (const phrase of [
      "temporary commercial mobile kitchen trailer and modular facility rentals nationwide",
      "hospitals",
      "other commercial operations",
      "maintain food service",
      "renovations, planned maintenance, emergency response, or added-capacity projects",
      "mobile shower trailers",
      "shower/restroom trailer combinations",
      "man-camp/workforce housing units",
      "refrigeration/freezer trailers",
      "temporary dishwashing facilities",
    ]) {
      expect(intro).toContain(phrase);
    }
  });

  it("keeps the opening introduction approximately 80/20 kitchen-to-support", () => {
    const $ = load(renderToStaticMarkup(createElement(Home)));
    const primaryWords = wordCount($("[data-intro-primary]").text());
    const supportingWords = wordCount($("[data-intro-support]").text());
    const primaryPercent =
      (primaryWords / (primaryWords + supportingWords)) * 100;

    expect(primaryPercent).toBeGreaterThanOrEqual(75);
    expect(primaryPercent).toBeLessThanOrEqual(85);
  });

  it("gives the primary family 80 percent and five supporting families 20 percent", () => {
    const $ = load(renderToStaticMarkup(createElement(Home)));
    const primary = $('[data-portfolio-share="80"]');
    const supporting = $('[data-portfolio-share="20"]');

    expect(primary).toHaveLength(1);
    expect(primary.text()).toContain("Commercial mobile kitchens");
    expect(primary.attr("href")).toBe(
      "/equipment-rental/mobile-kitchen-trailers/",
    );
    expect(primary.find("img").attr("alt")).toMatch(/mobile kitchen rental/i);
    expect(supporting.find(".mk-family-card")).toHaveLength(5);
    expect(supporting.text()).toContain("Mobile shower trailer rentals");
    expect(supporting.text()).toContain("Shower/restroom trailer rentals");
    expect(supporting.text()).toContain("Workforce housing unit rentals");
    expect(supporting.text()).toContain(
      "Refrigeration/freezer trailer rentals",
    );
    expect(supporting.text()).toContain("Dishwashing facility rentals");
  });

  it("keeps dedicated family-specific copy within the 75 to 85 percent primary band", () => {
    const $ = load(renderToStaticMarkup(createElement(Home)));
    const primarySelectors = [
      ".mk-family-primary",
      ".mk-trust-bar",
      ".mk-models",
      ".mk-industries",
      ".mk-process",
      ".mk-coverage > .mk-section-heading",
      ".mk-faq",
    ];
    const supportingSelectors = [".mk-supporting-families", ".mk-support"];
    const primaryWords = wordCount(
      primarySelectors.map((selector) => $(selector).text()).join(" "),
    );
    const supportingWords = wordCount(
      supportingSelectors.map((selector) => $(selector).text()).join(" "),
    );
    const primaryPercent =
      (primaryWords / (primaryWords + supportingWords)) * 100;

    expect(primaryWords).toBe(430);
    expect(supportingWords).toBe(95);
    expect(primaryPercent).toBeGreaterThanOrEqual(75);
    expect(primaryPercent).toBeLessThanOrEqual(85);
  });

  it("uses the approved customer-facing CTA labels", () => {
    const $ = load(renderToStaticMarkup(createElement(Home)));
    expect($('.mk-hero-actions a[href="/equipment-rental/"]').text()).toContain(
      "View Rental Equipment",
    );
    expect($('.mk-hero-actions a[href="/contact-us/"]').text()).toContain(
      "Request a Quote",
    );
  });
});
