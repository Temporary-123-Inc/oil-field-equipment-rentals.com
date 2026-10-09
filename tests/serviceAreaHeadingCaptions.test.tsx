import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { load } from "cheerio";
import { CityDetail, cityHeadline } from "../src/CityDetail";
import { CityDirectoryPage } from "../src/CityDirectoryPage";
import { RegionDetail, regionPages } from "../src/regionGuides";
import { StateDetail } from "../src/StateDetail";
import { Site } from "../src/Site";
import { stateGuides } from "../src/stateGuides";
import { reviewedCityPages } from "../src/cityDirectory";
import { targetRouteByPath, targetRoutes } from "../src/temporaryKitchenRentalTarget";
import {
  matchesLocationRentalHeadline,
  regionLocationLabel,
  regionRentalHeadline,
  stateMapRentalHeadline,
} from "../src/rentalHeadlines";

function inspectPage(markup: string) {
  const $ = load(markup);
  expect($("h1")).toHaveLength(1);
  const text = $("body").text().replace(/\s+/g, " ");
  expect(text).not.toMatch(
    /\b(?:equipment|commercial kitchen|mobile kitchen|temporary facilities|temporary facility|facility|shower trailer|restroom trailer|dishwashing trailer|sleeper trailer)\s+(?:rental|rentals|for rent)\s+in\s+[A-Z]/i,
  );
  for (const caption of $("[data-carousel-caption]").toArray()) {
    const text = $(caption).text();
    expect(text).toContain("Temporary Kitchen Rental");
    expect(text).toContain("+1 (888) 563-6507");
    expect(text).toContain("Call Temporary Kitchen Rental now for 24/7 live-agent support");
    expect(text).toMatch(/Rental or Lease\./);
    expect(text).not.toMatch(/TemporaryKitchenRental|800-443-5212|delivery available 24\/7/i);
  }
  expect($("[data-carousel-caption]").length).toBe($("[data-service-carousel]").length);
  return $;
}

describe("Mobile Kitchen service-area H1 and caption rules", () => {
  it("uses a complete, topic-specific H1 on the service-area hub", () => {
    const $ = inspectPage(renderToStaticMarkup(<Site path="/service-areas/" />));
    expect($("h1").text()).toBe(
      "Nationwide Commercial Mobile Kitchen Trailer Rental Locations",
    );
    expect($("[data-h1-intro]").text()).toMatch(/service areas by state/i);
  });

  it("keeps calculator-backed state and city rental pages place-first", () => {
    const stateRoute = targetRouteByPath["/alabama/"];
    expect(stateRoute.title).toBe(
      "Alabama Commercial Food Service Mobile Kitchen Trailer Rental",
    );
    const state = inspectPage(
      renderToStaticMarkup(<Site path={stateRoute.path} />),
    );
    expect(state("h1").text()).toBe(stateRoute.title);
    expect(state("[data-h1-intro]").text()).toMatch(/^Alabama:/);

    const cityRoute = targetRoutes.find((route) => route.location?.city);
    expect(cityRoute).toBeDefined();
    const city = inspectPage(
      renderToStaticMarkup(<Site path={cityRoute!.path} />),
    );
    expect(city("h1").text()).toBe(cityRoute!.title);
    expect(cityRoute!.title).toMatch(/^.+, .+ Commercial Food Service Mobile Kitchen Trailer Rental$/);
    expect(city("[data-h1-intro]").text()).toMatch(/^.+, .+:/);
  });

  it("keeps state landing H1s topic-specific and their photo captions target-branded", () => {
    for (const state of Object.keys(stateGuides)) {
      const expected = stateMapRentalHeadline(state);
      const $ = inspectPage(renderToStaticMarkup(<StateDetail name={state} />));
      expect($("h1").text()).toBe(expected);
      expect($("[data-h1-intro]").text()).toMatch(new RegExp(`^${state}:`));
      expect(matchesLocationRentalHeadline(expected, state)).toBe(true);
    }
  });

  it("keeps every regional guide H1 and its captions matched to an inventory topic", () => {
    for (const guide of regionPages) {
      const expected = regionRentalHeadline(guide.region, guide.state, guide.index);
      const $ = inspectPage(renderToStaticMarkup(<RegionDetail guide={guide} />));
      expect($("h1").text()).toBe(expected);
      expect($("[data-h1-intro]").text()).toMatch(
        new RegExp(`^${regionLocationLabel(guide.region, guide.state)}:`),
      );
      expect(
        matchesLocationRentalHeadline(
          expected,
          regionLocationLabel(guide.region, guide.state),
        ),
      ).toBe(true);
      expect($("[data-carousel-caption]").length).toBeGreaterThan(0);
    }
  }, 30000);

  it("keeps reviewed city pages on one matching service topic", () => {
    for (const city of reviewedCityPages) {
      const expected = cityHeadline(city);
      const $ = inspectPage(renderToStaticMarkup(<CityDetail city={city} />));
      expect($("h1").text()).toBe(expected);
      expect($("[data-h1-intro]").text()).toMatch(
        new RegExp(`^${city.name}, ${city.state}:`),
      );
      expect(
        matchesLocationRentalHeadline(expected, `${city.name}, ${city.state}`),
      ).toBe(true);
      expect($("[data-carousel-caption]").length).toBeGreaterThan(0);
    }
  });

  it("gives every city directory a broad but accurate facility-rental H1 and captions", () => {
    for (const guide of regionPages) {
      const $ = inspectPage(
        renderToStaticMarkup(<CityDirectoryPage guide={guide} />),
      );
      expect($("h1").text()).toBe(
        `${regionLocationLabel(guide.region, guide.state)} Commercial Temporary Facility Rental Locations`,
      );
      expect($("[data-carousel-caption]").length).toBeGreaterThan(0);
    }
  }, 30000);
});
