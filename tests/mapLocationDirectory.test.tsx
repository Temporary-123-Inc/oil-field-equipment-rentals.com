import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MapLocationDirectory } from "../src/MapLocationDirectory";
import { stateGuides } from "../src/stateGuides";
import { regionPath } from "../src/regionGuides";

describe("map location directory", () => {
  it("renders every state as a link with its own expandable region list", () => {
    const html = renderToStaticMarkup(createElement(MapLocationDirectory));

    expect(html).toMatch(
      /<a class="map-location-state" href="\/alabama\/">Mobile Kitchen Trailer Rental in Alabama<\/a><details><summary>Regions and cities in Alabama<\/summary>/,
    );
    expect(html.match(/class="map-location-state"/g)).toHaveLength(50);
    expect(html.match(/Mobile Kitchen Trailer Rental in [A-Z][a-z]+/g)).toHaveLength(50);
    expect(html.match(/<details>/g)).toHaveLength(50);
    expect(html).not.toContain("listed locations");

    for (const [state, guide] of Object.entries(stateGuides)) {
      expect(html).toContain(`Mobile Kitchen Trailer Rental in ${state}</a>`);
      for (const region of guide.regions) {
        expect(html).toContain(`href="${regionPath(state, region)}"`);
      }
    }
  });
});
