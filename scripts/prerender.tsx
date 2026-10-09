import introOverrides from "../content/aligned-page-introductions.json" with { type: "json" };
import replacedLeads from "../content/aligned-source-original-leads.json" with { type: "json" };
import { industryGuideByPath, industryGuides } from "../src/IndustryDetail";
import { statePageByPath } from "../src/StateDetail";
import { pageSchema } from "./structured-data";
import imageDimensions from "../content/image-dimensions.json";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { renderToString } from "react-dom/server";
import { Site, isLocationPagePath, type SourcePage } from "../src/Site";
import { readdir } from "node:fs/promises";
import { gunzipSync } from "node:zlib";
import { pageInfo } from "../src/content";
import site from "../site.json" with { type: "json" };
import { releaseErrors } from "./release";
import {
  authorityReleaseRoutes,
  canonicalFor,
  productionBuild,
  routeInIndexingScope,
  routesForIndexingBatch,
  sitemapXml,
  type IndexingScope,
} from "./seo-policy";
import { renderSourceContent } from "./source-content";
import { preserveMedia } from "./preserve-media";
import { load } from "cheerio";
import { catalog } from "../src/EquipmentCatalog";
import modelDetails from "../content/service-details.json" with { type: "json" };
import { serviceCategories, serviceOptions } from "../src/serviceMenu";
import { regionPages, regionPageByPath } from "../src/regionGuides";
import { cityPageByPath, reviewedCityPages } from "../src/cityDirectory";
import { cityHeadline } from "../src/CityDetail";
import { alignedLocationIntro } from "../src/alignedIntroductions";

type VercelRedirect = {
  source: string;
  destination: string;
  has?: unknown;
  missing?: unknown;
};
import {
  regionLocationLabel,
  regionRentalHeadline,
  rentalCategoryHeadline,
  rentalHubHeadline,
  rentalProductHeadline,
  stateRentalHeadline,
} from "../src/rentalHeadlines";
import { stateGuides } from "../src/stateGuides";
import vercel from "../vercel.json" with { type: "json" };
import { readableFragmentText } from "./prerender-text";
import {
  targetCoreAliases,
  targetRouteByPath,
  targetRoutes,
} from "../src/temporaryKitchenRentalTarget";
import { authorityTop25 } from "../src/authorityTop25";
import { commercialPageHeadline } from "../src/commercialHeadlines";
// Vercel preview builds must never inherit production indexing settings.
const domainReady =
  site.domainRoutingReady || process.env.PUBLIC_DOMAIN_READY === "true";
const release =
  productionBuild(site.mode, process.env.VERCEL_ENV) && domainReady;
const indexingScope = site.indexingScope as IndexingScope;
if (release && indexingScope === "full") {
  const errors = releaseErrors();
  if (errors.length) throw new Error(errors.join("; "));
}
const source = await readFile("dist/index.html", "utf8");
const fontAsset = (await readdir("dist/assets")).find((name) =>
  /^manrope-latin-wght-normal-.*\.woff2$/.test(name),
);
const pages: SourcePage[] = [];
const index = JSON.parse(
  await readFile("content/route-index.json", "utf8"),
) as { path: string; file: string; title: string }[];
let media: Record<string, { local?: string }> = {};
try {
  media = JSON.parse(await readFile("content/media-map.json", "utf8"));
} catch {}
for (const entry of index) {
  const page = JSON.parse(
    gunzipSync(await readFile("content/pages/" + entry.file)).toString(),
  ) as SourcePage;
  page.path = entry.path;
  if (page.path === "/gsa-schedule/") page.title = "GSA Schedule";
  page.title = commercialPageHeadline(page.path, page.title).replace(
    /\btemporary\s*123\b/gi,
    site.brand,
  );
  page.description = page.description.replace(
    /\btemporary\s*123\b/gi,
    site.brand,
  );
  pages.push(page);
}
const coreRoutes = [
  "/",
  "/services/",
  "/industries/",
  "/gsa-schedule/",
  "/service-areas/",
  "/locations/",
  "/seo-dashboard/",
  "/rental-calculator/",
  "/planning/",
  "/about-us/",
  "/about-us-2/",
  "/blog/",
  "/contact-us/",
  "/contact/",
  "/testinmonials/",
  "/privacy/",
  "/equipment-rental/",
];
const redirectDestinations = new Map(
  (vercel.redirects as VercelRedirect[])
    .filter((rule) => !("has" in rule) && !("missing" in rule))
    .map((rule) => [rule.source, rule.destination]),
);
const redirectedRoutes = new Set(redirectDestinations.keys());
const preservedTargetRoutes = targetRoutes.map((item) => item.path);
const prerenderTargetRoutes = targetRoutes
  .filter((item) => !item.location?.city)
  .map((item) => item.path);
// EquipmentCatalog links every approved inventory family. Emit every unique
// detail route so cards and related-equipment links always have a destination.
const preservedCatalogDetailRoutes = catalog.items.map((item) => item.path);
// The preserved modular-kitchen source slug is intentionally noindex pending
// owner review, but it must still render a complete target-branded page.
const preservedEditorialRoutes = ["/modular-kitchen-facilities/"];
const sourceServiceRoutes = pages
  .filter(
    (page) =>
      !redirectedRoutes.has(page.path) &&
      !isLocationPagePath(page.path) &&
      !coreRoutes.includes(page.path) &&
      !catalog.items.some((item) => item.path === page.path),
  )
  .map((page) => page.path);
const foreignAuthorityPaths = new Set(
  authorityTop25.flatMap((row) => (row.exactPath === "/" ? [] : [row.exactPath])),
);
const allRoutes = [
  ...new Set([
    ...coreRoutes,
    ...industryGuides.map((item) => item.path),
    ...serviceCategories.map((item) => item.href),
    ...serviceOptions.map((item) => item.href),
    ...preservedCatalogDetailRoutes,
    ...preservedEditorialRoutes,
    ...sourceServiceRoutes,
    ...prerenderTargetRoutes,
    ...regionPages.map((item) => item.path),
    ...regionPages.map((item) => `${item.path}cities/`),
    ...reviewedCityPages.map((item) => item.path),
  ]),
].filter(
  (path) => !redirectedRoutes.has(path) && !foreignAuthorityPaths.has(path),
);
const preservedRoutes = [
  ...new Set([...allRoutes, ...preservedTargetRoutes]),
].filter((path) => !redirectedRoutes.has(path));
const preservedRouteSet = new Set(preservedRoutes);
const pageByPath = new Map(pages.map((page) => [page.path, page]));
const catalogItemByPath = new Map(
  catalog.items.map((item) => [item.path, item]),
);
const serviceOptionByPath = new Map(
  serviceOptions.map((item) => [item.href, item]),
);
const serviceCategoryByPath = new Map(
  serviceCategories.map((item) => [item.href, item]),
);
// Index the eligible public site while excluding utilities, duplicate aliases,
// empty placeholders, legacy TemporaryKitchenRental claims, and unverified procurement
// or testimonial material until those page claims are independently reviewed.
const editorialNoindex = new Set([
  "/seo-dashboard/",
  // These legacy aliases render their canonical pages' content; keep them
  // reachable but avoid publishing duplicate URLs as separate search results.
  "/about-us-2/",
  "/contact/",
  "/remote-basecamp-temporary-housing-rent-mobile-trailers-modular-buildings-restroom-shower-laundry-dining-temporary-building-rentals/",
  "/testinmonials/",
  "/video/",
]);
// Publish parents before their regions and include the priority service destinations.
const orderedIndexingRoutes = [
  ...new Set([
    ...authorityReleaseRoutes,
    ...allRoutes.filter(
      (path) =>
        !path.startsWith("/service-areas/") &&
        routeInIndexingScope(path, indexingScope),
    ),
    ...Object.entries(stateGuides).flatMap(([name]) => [
      Object.entries(statePageByPath).find(([, state]) => state === name)![0],
      ...regionPages
        .filter((region) => region.state === name)
        .flatMap((region) => [
          region.path,
          ...reviewedCityPages
            .filter((city) => city.regionPath === region.path)
            .map((city) => city.path),
        ]),
    ]),
    ...allRoutes,
  ]),
];
const scopedIndexingRoutes = orderedIndexingRoutes.filter(
  (path) =>
    allRoutes.includes(path) &&
    !editorialNoindex.has(path) &&
    routeInIndexingScope(path, indexingScope),
);
const indexableRoutes = routesForIndexingBatch(
  scopedIndexingRoutes,
  site.activeIndexingBatch,
  site.indexingBatchSize,
);
const compact = (value: string, maximum: number) => {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= maximum) return clean;
  const shortened = clean.slice(0, maximum + 1).replace(/\s+\S*$/, "");
  return shortened || clean.slice(0, maximum);
};
const sourceDescription = (page: SourcePage) => {
  const inherited = page.description.replace(/\s+/g, " ").trim();
  const unusable =
    inherited.length < 50 ||
    /^(previous|next)(\s+(previous|next))?/i.test(inherited) ||
    /complete list of states and cities|forminator_form|other related services|contact us today/i.test(
      inherited,
    ) ||
    (inherited.length >= 155 && !/[.!?]$/.test(inherited));
  if (!unusable) return inherited;
  const subject = compact(page.title.split("|")[0], 65);
  return `Explore ${subject} from Temporary Kitchen Rental. Call ${site.phoneDisplay} to discuss site requirements, equipment availability and delivery.`;
};
const unresolvedSourceLinks = new Set<string>();
const dimensions: Record<string, { width: number; height: number }> = {};
for (const entry of Object.values(media)) {
  if (!entry.local?.endsWith(".png")) continue;
  try {
    const bytes = await readFile("public" + entry.local);
    if (
      bytes
        .subarray(0, 8)
        .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
    )
      dimensions[entry.local] = {
        width: bytes.readUInt32BE(16),
        height: bytes.readUInt32BE(20),
      };
  } catch {}
}
const renderContent = (page: SourcePage) =>
  renderSourceContent(page.html, {
    origin: site.origin,
    routes: preservedRouteSet,
    redirects: redirectDestinations,
    media,
    unresolved: unresolvedSourceLinks,
    dimensions,
    removeLeadParagraph: Boolean(
      introOverrides[page.path as keyof typeof introOverrides],
    ),
    replacedLead: replacedLeads[page.path as keyof typeof replacedLeads],
  });
const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
const locationCatalog = pages
  .filter(
    (page) => !redirectedRoutes.has(page.path) && isLocationPagePath(page.path),
  )
  .map((page) => ({ path: page.path, title: page.title }));
const serviceCatalog = sourceServiceRoutes
  .filter((path) => path !== "/video/")
  .map((path) => ({
  path,
  title: pageByPath.get(path)!.title,
  }));
for (const path of [...allRoutes, "/404/"]) {
  const targetRoute = targetRouteByPath[path];
  const effectivePath =
    targetRoute?.sourcePath || targetCoreAliases[path] || path;
  const page = pageByPath.get(effectivePath);
  const catalogItem = catalogItemByPath.get(effectivePath);
  const serviceOption = serviceOptionByPath.get(effectivePath);
  const serviceCategory = serviceCategoryByPath.get(effectivePath);
  const detail = modelDetails[effectivePath as keyof typeof modelDetails];
  const region = regionPageByPath[path];
  const city = cityPageByPath[path];
  const directoryRegion = path.endsWith("/cities/")
    ? regionPageByPath[path.slice(0, -7)]
    : undefined;
  const stateName = statePageByPath[path];
  const industry = industryGuideByPath[path];
  const hubHeadline = rentalHubHeadline(path);
  // Several authored routes intentionally replace their archived WordPress
  // body. Avoid parsing and normalizing that unused HTML on every prerender;
  // recovered-source processing remains enabled for generic pages and the two
  // hubs that visibly include their recovered body.
  const pageUsesRecoveredSource =
    Boolean(page) &&
    (["/services/", "/industries/"].includes(path) ||
      !(
        path === "/testinmonials/" ||
        (targetRoute && !targetRoute.sourcePath) ||
        [
          "/",
          "/rental-calculator/",
          "/modular-kitchen-facilities/",
          "/contact/",
          "/contact-us/",
          "/equipment-rental/",
          "/planning/",
          "/about-us/",
          "/blog/",
          "/government-and-non-government/",
          "/gsa-schedule/",
        ].includes(effectivePath) ||
        Boolean(
          industry ||
          stateName ||
          city ||
          directoryRegion ||
          region ||
          serviceCategory ||
          catalogItem ||
          detail,
        ) ||
        effectivePath === "/service-areas/"
      ));
  const preparedPage = page
    ? { ...page, html: pageUsesRecoveredSource ? renderContent(page) : "" }
    : undefined;
  const info = targetRoute
    ? {
        title: `${targetRoute.title} | ${site.brand}`,
        description: targetRoute.location
          ? `Plan a commercial mobile kitchen rental for ${targetRoute.location.city ? `${targetRoute.location.city}, ` : ""}${targetRoute.location.state}. Confirm equipment, utilities, dates, site access and delivery with Temporary Kitchen Rental.`
          : `Explore ${targetRoute.title} from Temporary Kitchen Rental. Confirm the exact configuration, utilities, delivery requirements and availability for your project.`,
      }
    : path === "/locations/"
      ? {
          title: `Mobile Kitchen Rental Locations | ${site.brand}`,
          description:
            "Browse Temporary Kitchen Rental service areas across the United States and Canada and preserve existing state and city rental URLs.",
        }
      : industry
        ? {
            title: `${industry.title}: Commercial Kitchen Rentals | ${site.brand}`,
            description: industry.description,
          }
        : detail
          ? {
              title: `${rentalProductHeadline(detail.name)} | ${site.brand}`,
              description: detail.intro.split(". ")[0] + ".",
            }
          : city
            ? {
                title: `${cityHeadline(city)} | ${site.brand}`,
                description: compact(
                  alignedLocationIntro(
                    cityHeadline(city),
                    `${city.name}, ${city.state}`,
                  ).split(/(?<!\bSt)\. /)[0] + ".",
                  155,
                ),
              }
            : directoryRegion
              ? {
                  title: `${regionLocationLabel(directoryRegion.region, directoryRegion.state)} Mobile Kitchen Rental Locations | ${site.brand}`,
                  description: `Browse ${regionLocationLabel(directoryRegion.region, directoryRegion.state)} cities and communities for Temporary Facilities Rental planning. Find reviewed city guides and regional services.`,
                }
              : region
                ? {
                    title: `${regionRentalHeadline(region.region, region.state, region.index)} | ${site.brand}`,
                    description: compact(
                      alignedLocationIntro(
                        regionRentalHeadline(
                          region.region,
                          region.state,
                          region.index,
                        ),
                        regionLocationLabel(region.region, region.state),
                      ).split(/(?<!\bSt)\. /)[0] + ".",
                      155,
                    ),
                  }
                : stateName
                  ? {
                      title: `${stateRentalHeadline(stateName)} | ${site.brand}`,
                      description: compact(
                        alignedLocationIntro(
                          stateRentalHeadline(stateName),
                          stateName,
                        ).split(/(?<!\bSt)\. /)[0] + ".",
                        155,
                      ),
                    }
                  : hubHeadline
                    ? {
                        title: `${hubHeadline} | ${site.brand}`,
                        description: pageInfo(path).description,
                      }
                    : path === "/modular-kitchen-facilities/"
                      ? {
                          title: `Modular Kitchen Facility Rental | ${site.brand}`,
                          description:
                            "Plan a building-based modular kitchen for commercial or institutional food service. Review workflow, site access, utilities, installation responsibilities and configuration with Temporary Kitchen Rental.",
                        }
                      : serviceCategory
                        ? {
                            title: `${rentalCategoryHeadline(serviceCategory.name)} | ${site.brand}`,
                            description: serviceCategory.description,
                          }
                        : coreRoutes.includes(path)
                          ? pageInfo(path)
                          : page
                            ? {
                                title: page.title + ` | ${site.brand}`,
                                description: sourceDescription(page),
                              }
                            : path === "/contact-us/"
                              ? {
                                  title: `Contact ${site.brand} | Talk to a Specialist`,
                                  description: `Call ${site.brand} at ${site.phoneDisplay} for mobile kitchens, support equipment and project planning.`,
                                }
                              : path === "/equipment-rental/"
                                ? {
                                    title: `Mobile Kitchen Rental Inventory | ${site.brand}`,
                                    description:
                                      "Explore Temporary Kitchen Rental commercial kitchens, dishwashing and refrigeration trailers, plus applicable project support equipment.",
                                  }
                                : catalogItem
                                  ? {
                                      title: `${rentalProductHeadline(catalogItem.name)} | ${site.brand}`,
                                      description: catalogItem.summary,
                                    }
                                  : serviceOption
                                    ? {
                                        title: `${rentalProductHeadline(serviceOption.name)} | ${site.brand}`,
                                        description: serviceOption.description,
                                      }
                                    : pageInfo(path);
  const indexableCanonical =
    canonicalFor(path, indexableRoutes.includes(path), release) || "";
  const canonical =
    indexableCanonical ||
    (path === "/service-areas/oklahoma/panhandle/"
      ? new URL(path, site.origin).href
      : "");
  if (!info.description.trim()) {
    info.description = `Explore ${page?.title || "Temporary Kitchen Rental rentals"}. Call Temporary Kitchen Rental at ${site.phoneDisplay} to discuss your site, rental dates and equipment requirements.`;
  }
  const head =
    (fontAsset
      ? `<link rel="preload" href="/assets/${fontAsset}" as="font" type="font/woff2" crossorigin>`
      : "") +
    `<meta name="description" content="${esc(info.description)}"><meta property="og:title" content="${esc(info.title)}"><meta property="og:description" content="${esc(info.description)}"><meta property="og:type" content="website">` +
    `<meta property="og:site_name" content="${esc(site.brand)}"><meta property="og:locale" content="en_US"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(info.title)}"><meta name="twitter:description" content="${esc(info.description)}">` +
    (canonical
      ? `<link rel="canonical" href="${esc(canonical)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:image" content="${esc(region ? new URL(region.image, site.origin).href : site.origin.replace(/\/$/, "") + "/social-card.png")}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(region?.imageAlt || site.brand + " temporary facility planning")}">`
      : "");
  const rawHtml = source
    .replace(/<title>.*?<\/title>/, `<title>${esc(info.title)}</title>`)
    .replace(
      /<meta name="robots" content="[^"]*"\s*\/?\s*>/,
      `<meta name="robots" content="${indexableCanonical ? "index,follow" : path === "/404/" ? "noindex,nofollow" : "noindex,follow"}"/>`,
    )
    .replace("<!--page-head-->", head)
    .replace(
      "<!--app-html-->",
      renderToString(
        <Site
          path={path}
          page={preparedPage}
          catalog={locationCatalog}
          serviceCatalog={serviceCatalog}
        />,
      ),
    );
  // Editorial punctuation preference applies to rendered copy, never URLs,
  // script contents or the archived source records.
  const $ = load(rawHtml);
  const cleanCopy = (value: string) =>
    value
      .replace(/\btemporary\s*123\b/gi, site.brand)
      .replace(/\s*—\s*/g, ", ")
      .replace(/\*/g, "")
      .replace(
        /(?:\+?1[\s.-]*)?\(?800\)?[\s.-]*443[\s.-]*5212/g,
        site.phoneDisplay,
      );
  $("body, title")
    .find("*")
    .addBack()
    .contents()
    .each((_, node) => {
      if (
        node.type === "text" &&
        node.parent?.type !== "script" &&
        node.parent?.type !== "style"
      )
        node.data = cleanCopy(node.data);
    });
  $("[alt], [title], [aria-label]").each((_, element) => {
    for (const name of ["alt", "title", "aria-label"]) {
      const value = $(element).attr(name);
      if (value) $(element).attr(name, cleanCopy(value));
    }
  });
  // Internal-link labels are navigation elements, so retain a consistent,
  // professional sentence-case opening across both authored and recovered copy.
  $("a[href^='/']").each((_, anchor) => {
    const firstText = $(anchor)
      .contents()
      .toArray()
      .find(
        (node) =>
          node.type === "text" &&
          "data" in node &&
          typeof node.data === "string" &&
          node.data.trim().length > 0,
      );
    if (firstText && "data" in firstText && typeof firstText.data === "string")
      firstText.data = firstText.data.replace(
        /^(\s*)([a-z])/,
        (_match: string, space: string, letter: string) =>
          `${space}${letter.toUpperCase()}`,
      );
  });
  $(
    "meta[name='description'], meta[property='og:title'], meta[property='og:description']",
  ).each((_, element) => {
    $(element).attr("content", cleanCopy($(element).attr("content") || ""));
  });
  // Match schema to final, visible HTML rather than constructing a parallel breadcrumb tree.
  if (path !== "/404/") {
    const h1 = $("h1").first();
    const h1Text = readableFragmentText(h1.html() || h1.text());
    if (path !== "/" && !$("nav.breadcrumb").length) {
      const nav = $(
        '<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span aria-current="page"></span></nav>',
      );
      nav.find('[aria-current="page"]').text(h1Text);
      h1.before(nav);
    }
    const breadcrumb = $("nav.breadcrumb").first();
    if (breadcrumb.length && !breadcrumb.find('[aria-current="page"]').length) {
      breadcrumb.append("<span>/</span>");
      breadcrumb.append(
        $('<span aria-current="page"></span>').text(
          region?.region || stateName || h1Text,
        ),
      );
    }
    $("main img").each((_, image) => {
      const img = $(image);
      const src = img.attr("src") || "";
      const size = imageDimensions[src as keyof typeof imageDimensions];
      if (size)
        img.attr({ width: String(size.width), height: String(size.height) });
      const alt = img.attr("alt") || "";
      if (
        /^(?:\d+|collage[ -]*\d*|Final.*|Dishwashing\d+|.*\.(png|jpg|webp))$/i.test(
          alt,
        )
      )
        img.attr(
          "alt",
          `${h1.text().trim()}: Temporary Kitchen Rental equipment reference`,
        );
    });
    const crumbs = breadcrumb
      .find('a[href], [aria-current="page"]')
      .toArray()
      .map((el) => ({
        name: $(el).text().trim(),
        item: new URL($(el).attr("href") || path, site.origin).href,
      }));
    // Inert state templates and closed dialogs are not the visible page hero.
    const hero = $("main img")
      .filter((_, image) => $(image).parents("template, dialog").length === 0)
      .first();
    const schema = pageSchema({
      path,
      title: h1.text().trim(),
      description: cleanCopy(info.description),
      serviceType:
        path === "/service-areas/oklahoma/panhandle/"
          ? "Laundry trailer and laundry container rental"
          : undefined,
      crumbs,
      service: Boolean(
        industry ||
        city ||
        region ||
        stateName ||
        serviceCategory ||
        serviceOption ||
        catalogItem ||
        detail,
      ),
      area: city
        ? { name: city.name, state: city.state }
        : region
          ? { name: region.region, state: region.state }
          : stateName
            ? { name: stateName }
            : undefined,
      image: hero.length
        ? {
            src: hero.attr("src")!,
            alt: hero.attr("alt") || "",
            width: Number(hero.attr("width")) || undefined,
            height: Number(hero.attr("height")) || undefined,
          }
        : undefined,
    });
    $("head").append(
      $('<script type="application/ld+json"></script>').text(
        JSON.stringify(schema).replace(/</g, "\\u003c"),
      ),
    );
  }
  const html = $.html();
  const file = path === "/404/" ? "dist/404.html" : `dist${path}index.html`;
  await mkdir(file.substring(0, file.lastIndexOf("/")), { recursive: true });
  await writeFile(file, html);
}
await writeFile(
  "dist/robots.txt",
  release
    ? `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${site.origin.replace(/\/$/, "")}/sitemap.xml\n`
    : "User-agent: *\nAllow: /\nDisallow: /api/\n# Revision HTML carries noindex while the primary domain remains elsewhere.\n",
);
const restoredAssets = await preserveMedia(media);
const registry = preservedRoutes.map((path) => ({
  path,
  indexable: release && indexableRoutes.includes(path),
  modified:
    coreRoutes.includes(path) || modelDetails[path as keyof typeof modelDetails]
      ? undefined
      : pageByPath.get(path)?.modified,
}));
await writeFile("dist/sitemap.xml", sitemapXml(registry, release));
// Review artifact only. Never serve the future sitemap while domain routing is pending.
await writeFile(
  "audit/draft-sitemap.xml",
  sitemapXml(
    registry.map((row) => ({
      ...row,
      indexable: indexableRoutes.includes(row.path),
    })),
    true,
  ),
);
await writeFile(
  "audit/build-registry.json",
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      mode: release ? "production" : "preview",
      indexingScope,
      indexingBatchSize: site.indexingBatchSize,
      activeIndexingBatch: site.activeIndexingBatch,
      eligibleIndexingRoutes: scopedIndexingRoutes.length,
      activeIndexingRoutes: release ? indexableRoutes.length : 0,
      domainRoutingReady: domainReady,
      pages: registry,
      unresolvedSourceLinks: [...unresolvedSourceLinks].sort(),
      restoredAssets,
    },
    null,
    2,
  ) + "\n",
);
const rolloutStart = new Date(`${site.indexingStartDate}T00:00:00Z`);
const rolloutBatches = Array.from(
  { length: Math.ceil(scopedIndexingRoutes.length / site.indexingBatchSize) },
  (_, index) => {
    const date = new Date(rolloutStart);
    date.setUTCDate(date.getUTCDate() + index);
    return {
      batch: index + 1,
      plannedDate: date.toISOString().slice(0, 10),
      active: index + 1 <= site.activeIndexingBatch,
      routes: scopedIndexingRoutes.slice(
        index * site.indexingBatchSize,
        (index + 1) * site.indexingBatchSize,
      ),
    };
  },
);
await writeFile(
  "audit/indexing-rollout.json",
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      origin: site.origin,
      indexingScope,
      batchSize: site.indexingBatchSize,
      activeBatch: site.activeIndexingBatch,
      totalRoutes: scopedIndexingRoutes.length,
      totalBatches: rolloutBatches.length,
      batches: rolloutBatches,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Static HTML generated for ${allRoutes.length} pages + 404 (${release ? "production" : "draft/noindex"}).`,
);
