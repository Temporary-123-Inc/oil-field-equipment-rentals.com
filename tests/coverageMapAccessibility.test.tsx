import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { load } from "cheerio";
import { describe, expect, it } from "vitest";
import { Site } from "../src/Site";
import { StateGuideCards } from "../src/StateGuideCards";

describe("coverage map accessibility", () => {
  for (const path of ["/locations/", "/service-areas/"]) {
    it(`uses unique element IDs on ${path}`, () => {
      const $ = load(renderToStaticMarkup(createElement(Site, { path })));
      const ids = $("[id]")
        .map((_, element) => $(element).attr("id"))
        .get();
      expect(new Set(ids).size).toBe(ids.length);
    });

    it(`uses the state-page description in the ${path} modal`, () => {
      const $ = load(renderToStaticMarkup(createElement(Site, { path })));
      const guideMarkup = load(
        renderToStaticMarkup(createElement(StateGuideCards)),
      );
      expect(
        guideMarkup("[data-state-guide]").first().attr("data-state-description"),
      ).toBeTruthy();
      expect($("#state-services-intro[data-state-description]")).toHaveLength(1);
      expect($("[data-state-description-toggle]")).toHaveLength(1);
    });
  }

  it("renders uniquely addressable quote islands on the contact page", () => {
    const $ = load(
      renderToStaticMarkup(createElement(Site, { path: "/contact-us/" })),
    );
    const ids = $("[id]")
      .map((_, element) => $(element).attr("id"))
      .get();

    expect(new Set(ids).size).toBe(ids.length);
    expect($("[data-quote-island]")).toHaveLength(2);
  });
});
