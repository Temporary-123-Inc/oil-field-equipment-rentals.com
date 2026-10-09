import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { load } from "cheerio";
import { describe, expect, it } from "vitest";
import media from "../content/media-map.json" with { type: "json" };
import routeIndex from "../content/route-index.json" with { type: "json" };
import { renderSourceContent } from "../scripts/source-content";

const militaryRoutes = [
  "/26ft-military-bulk-kitchen/",
  "/2800-military-series/",
  "/4000-military-series/",
  "/40ft-military-bulk-kitchen/",
  "/4500-military-series/",
  "/government/military-kitchen/",
] as const;

const expectedMilitaryAlt = [
  "United States Air Force seal",
  "United States Army seal",
  "United States Coast Guard seal",
  "United States Department of Veterans Affairs seal",
  "United States Marine Corps seal",
  "United States Department of the Navy seal",
];

const expectedMilitaryLocal = [
  "/media/ea84f33b3717d1b8918f930c.png",
  "/media/73b5f4165b762f9b5864ad12.png",
  "/media/2092584ed5842c755cee4670.png",
  "/media/eded316f3d11e80e55e9b459.png",
  "/media/191f3fd3c38ca7ba0af28c54.png",
  "/media/c6578f14258acbe4780c3793.png",
] as const;

const recoveredMedia: Record<string, { local?: string }> = Object.fromEntries(
  Object.entries(media).map(([src, record]) => [
    src,
    "local" in record ? { local: record.local } : {},
  ]),
);

const sourceHtml = (path: string) => {
  const record = routeIndex.find((entry) => entry.path === path);
  if (!record) throw new Error(`Missing source route: ${path}`);
  return JSON.parse(
    gunzipSync(
      readFileSync(new URL(`../content/pages/${record.file}`, import.meta.url)),
    ).toString(),
  ).html as string;
};

const renderRoute = (path: string) =>
  load(
    renderSourceContent(sourceHtml(path), {
      origin: "https://temporary-kitchen-rental.com",
      routes: new Set<string>(),
      redirects: new Map<string, string>(),
      media: recoveredMedia,
      unresolved: new Set<string>(),
    }),
  );

const renderMilitarySeals = (path: string) => {
  const html = sourceHtml(path);
  const archivedSources = expectedMilitaryLocal.map((local) => {
    const source = Object.entries(recoveredMedia).find(
      ([, record]) => record.local === local,
    )?.[0];
    if (!source || !html.includes(source)) {
      throw new Error(`${path} is missing archived seal source ${local}`);
    }
    return source;
  });
  const fragment = archivedSources
    .map((source) => `<a href="${source}"><img src="${source}"></a>`)
    .join("");
  return load(
    renderSourceContent(fragment, {
      origin: "https://temporary-kitchen-rental.com",
      routes: new Set<string>(),
      redirects: new Map<string, string>(),
      media: recoveredMedia,
      unresolved: new Set<string>(),
    }),
  );
};

describe("legacy visible image alternatives", () => {
  it("identifies all 36 linked military seals without a generic link label", () => {
    for (const path of militaryRoutes) {
      const $ = renderMilitarySeals(path);
      const seals = $("a img")
        .toArray()
        .filter((image) =>
          expectedMilitaryAlt.includes($(image).attr("alt") || ""),
        );

      expect(
        seals.map((image) => $(image).attr("alt")),
        path,
      ).toEqual(expectedMilitaryAlt);
      expect($("a[aria-label='View image']"), path).toHaveLength(0);
    }
  });

  it("describes both recovered restroom-trailer figures by their visible scene", () => {
    const $ = renderRoute("/restroom-trailer-rental/");

    expect(
      $("figure img")
        .toArray()
        .map((image) => $(image).attr("alt")),
    ).toEqual([
      "Large shower and restroom trailer with open private stalls and an ADA access ramp",
      "Large shower and restroom trailer at dusk with illuminated open private stalls",
    ]);
  });
});
