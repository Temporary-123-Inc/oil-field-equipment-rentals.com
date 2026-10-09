import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { load } from "cheerio";
import { describe, expect, it } from "vitest";
import { Site } from "../src/Site";

describe("floating contact widgets", () => {
  it("uses the revised copy while preserving the two contact actions", () => {
    const page = load(
      renderToStaticMarkup(createElement(Site, { path: "/" })),
    );

    const dispatch = page("[data-emergency-dispatch]");
    expect(dispatch.find("[data-emergency-open] small").text()).toBe(
      "24/7 rental help",
    );
    expect(dispatch.find("[data-emergency-open] strong").text()).toBe(
      "Call us",
    );
    expect(dispatch.find(".emergency-dispatch-call").attr("href")).toBe(
      "tel:+18883855513",
    );

    const contactRail = page(".contact-rail");
    expect(contactRail.find("small").text()).toBe("Need equipment?");
    expect(contactRail.find("strong").text()).toBe("Talk to us");
    expect(contactRail.attr("href")).toBe("/contact-us/");
  });
});
