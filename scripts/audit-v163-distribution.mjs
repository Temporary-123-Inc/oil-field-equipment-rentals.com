import fs from "node:fs";
import path from "node:path";
import { load } from "cheerio";

const distRoot = path.resolve(process.env.V163_AUDIT_DIST || "dist");
const outputRoot = path.resolve(
  process.env.V163_AUDIT_OUTPUT ||
    "work/qa/mobile-kitchen-v163-20260930/generated",
);

const navigationAndUtilityRoutes = new Set([
  "/",
  "/404.html",
  "/about-us/",
  "/about-us-2/",
  "/blog/",
  "/contact-us/",
  "/contact/",
  "/equipment-rental/",
  "/gsa-schedule/",
  "/industries/",
  "/locations/",
  "/planning/",
  "/privacy/",
  "/rental-calculator/",
  "/seo-dashboard/",
  "/service-areas/",
  "/services/",
  "/testinmonials/",
]);

const operationalAndPrivateRoutes = new Set([
  "/camp-management-and-design/",
  "/facility-management-and-base-operations-support/",
  "/government-and-non-government/",
  "/mobile-staffing/",
  "/planning-tool/",
  "/video/",
]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory()
      ? walk(target)
      : entry.name.endsWith(".html")
        ? [target]
        : [];
  });
}

function routeFor(file) {
  const relative = path.relative(distRoot, file).split(path.sep).join("/");
  if (relative === "index.html") return "/";
  if (relative === "404.html") return "/404.html";
  return `/${relative.replace(/index\.html$/, "")}`;
}

function familyFor(headline) {
  if (/\b(?:mobile|modular|emergency|commercial) kitchen(?:s|\b)|\bkitchen (?:trailer|facility|rentals?|modular)/i.test(headline) &&
      !/dishwash|warewash/i.test(headline)) {
    return "primary-mobile-kitchen";
  }
  if (/dishwash|warewash/i.test(headline)) return "support-dishwashing";
  if (/refrigerat|freezer|cold storage/i.test(headline))
    return "support-refrigeration";
  if (/shower.*restroom|restroom.*shower|combination trailer/i.test(headline))
    return "support-shower-restroom";
  if (/\bshower/i.test(headline)) return "support-shower";
  if (/restroom/i.test(headline)) return "support-restroom";
  if (/sleeper|bunk|workforce housing|man camp|base ?camp/i.test(headline))
    return "support-workforce-housing";
  if (/laundry/i.test(headline)) return "support-laundry";
  if (/handwash|sink trailer/i.test(headline)) return "support-handwashing";
  return "support-other-preserved";
}

function routeType(route) {
  if (route === "/") return "homepage";
  if (route === "/404.html") return "error";
  if (route.endsWith("/cities/")) return "navigation-index";
  if (navigationAndUtilityRoutes.has(route)) return "navigation-utility";
  if (operationalAndPrivateRoutes.has(route)) return "operational-private";
  if (/^\/service-areas\/[^/]+\/$/.test(route)) return "state-commercial";
  if (/^\/service-areas\/[^/]+\/[^/]+\/$/.test(route))
    return "region-commercial";
  if (/^\/service-areas\/[^/]+\/[^/]+\/[^/]+\/$/.test(route))
    return "city-commercial";
  if (route.startsWith("/industries/")) return "industry-commercial";
  return "equipment-commercial";
}

function csvValue(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const rows = walk(distRoot)
  .sort()
  .map((file) => {
    const route = routeFor(file);
    const $ = load(fs.readFileSync(file, "utf8"));
    const h1s = $("main h1, body > main h1")
      .map((_, element) => $(element).text().replace(/\s+/g, " ").trim())
      .get();
    const type = routeType(route);
    const commercial = type.endsWith("-commercial");
    const headline = h1s[0] || "";
    const family = commercial ? familyFor(headline) : "excluded";
    const hasRentalIntent = /\b(?:rentals?|rent|leasing|lease)\b/i.test(headline);
    const hasFacility = /kitchen|dishwash|refrigerat|freezer|shower|restroom|sleeper|bunk|laundry|handwash|facility|trailer|container|building|housing|camp|dining|structure|fencing|barricade|receptacle|ramp|stair|tent/i.test(
      headline,
    );
    const h1Valid = !commercial || (h1s.length === 1 && hasRentalIntent && hasFacility);
    return {
      route,
      routeType: type,
      denominator: commercial,
      family,
      h1Count: h1s.length,
      h1: headline,
      h1Valid,
    };
  });

const commercialRows = rows.filter((row) => row.denominator);
const primaryRows = commercialRows.filter(
  (row) => row.family === "primary-mobile-kitchen",
);
const supportingRows = commercialRows.filter(
  (row) => row.family !== "primary-mobile-kitchen",
);
const primaryPercent = commercialRows.length
  ? Number(((primaryRows.length / commercialRows.length) * 100).toFixed(2))
  : 0;
const summary = {
  generatedAt: new Date().toISOString(),
  definition:
    "Commercial equipment/detail, industry, state, region, and reviewed-city pages are counted. Homepage, utility pages, navigation hubs, regional city directories, operational/private pages, and the 404 are excluded.",
  totalGeneratedPages: rows.length,
  denominator: commercialRows.length,
  primaryMobileKitchen: primaryRows.length,
  supportingAllFamilies: supportingRows.length,
  primaryPercent,
  supportingPercent: Number((100 - primaryPercent).toFixed(2)),
  passingDistribution: primaryPercent >= 75 && primaryPercent <= 85,
  validCommercialH1s: commercialRows.filter((row) => row.h1Valid).length,
  invalidCommercialH1s: commercialRows.filter((row) => !row.h1Valid).length,
  byRouteType: Object.fromEntries(
    [...new Set(commercialRows.map((row) => row.routeType))].map((type) => {
      const group = commercialRows.filter((row) => row.routeType === type);
      const primary = group.filter(
        (row) => row.family === "primary-mobile-kitchen",
      ).length;
      return [type, { total: group.length, primary, supporting: group.length - primary }];
    }),
  ),
  byFamily: Object.fromEntries(
    [...new Set(commercialRows.map((row) => row.family))].map((family) => [
      family,
      commercialRows.filter((row) => row.family === family).length,
    ]),
  ),
  invalidH1Examples: commercialRows
    .filter((row) => !row.h1Valid)
    .slice(0, 30)
    .map(({ route, h1 }) => ({ route, h1 })),
};

fs.mkdirSync(outputRoot, { recursive: true });
fs.writeFileSync(
  path.join(outputRoot, "commercial-distribution.json"),
  `${JSON.stringify(summary, null, 2)}\n`,
);
const columns = [
  "route",
  "routeType",
  "denominator",
  "family",
  "h1Count",
  "h1",
  "h1Valid",
];
fs.writeFileSync(
  path.join(outputRoot, "commercial-page-plan.csv"),
  `${columns.join(",")}\n${rows
    .map((row) => columns.map((column) => csvValue(row[column])).join(","))
    .join("\n")}\n`,
);

console.log(JSON.stringify(summary, null, 2));
if (!summary.passingDistribution || summary.invalidCommercialH1s)
  process.exitCode = 1;
