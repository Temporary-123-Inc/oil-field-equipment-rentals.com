import fs from "node:fs";
import path from "node:path";
import { load } from "cheerio";

const homepageFile = path.resolve(
  process.env.V163_HOMEPAGE_HTML || "dist/index.html",
);
const outputFile = path.resolve(
  process.env.V163_HOMEPAGE_OUTPUT ||
    "work/qa/mobile-kitchen-v163-20260930/generated/homepage-hierarchy.json",
);

const primaryCopySelectors = [
  ".mk-family-primary",
  ".mk-trust-bar",
  ".mk-models",
  ".mk-industries",
  ".mk-process",
  ".mk-coverage > .mk-section-heading",
  ".mk-faq",
];
const supportingCopySelectors = [".mk-supporting-families", ".mk-support"];
const supportingFamilyNames = [
  "Mobile shower trailer rentals",
  "Shower/restroom trailer rentals",
  "Workforce housing unit rentals",
  "Refrigeration/freezer trailer rentals",
  "Dishwashing facility rentals",
];

function wordCount(value) {
  return (
    value
      .replace(/[^A-Za-z0-9'+&/-]+/g, " ")
      .trim()
      .match(/\S+/g) || []
  ).length;
}

function textFor($, selectors) {
  return selectors.map((selector) => $(selector).text()).join(" ");
}

const $ = load(fs.readFileSync(homepageFile, "utf8"));
const h1s = $("main h1")
  .map((_, element) => $(element).text().replace(/\s+/g, " ").trim())
  .get();
const intro = $("[data-h1-intro]").text().replace(/\s+/g, " ").trim();
const primaryWords = wordCount(textFor($, primaryCopySelectors));
const supportingWords = wordCount(textFor($, supportingCopySelectors));
const denominator = primaryWords + supportingWords;
const primaryPercent = Number(((primaryWords / denominator) * 100).toFixed(2));
const primaryMarker = Number(
  $("[data-portfolio-share]").first().attr("data-portfolio-share"),
);
const supportMarker = Number(
  $("[data-portfolio-share]").eq(1).attr("data-portfolio-share"),
);
const missingSupportingFamilies = supportingFamilyNames.filter(
  (family) => !$(".mk-supporting-families").text().includes(family),
);

const result = {
  generatedAt: new Date().toISOString(),
  source: path.relative(process.cwd(), homepageFile).split(path.sep).join("/"),
  definition:
    "Dedicated family-specific homepage copy. Mixed introductory copy, generic calculator controls, dynamic map content, global navigation, and the footer are excluded to avoid assigning shared text to either family cohort.",
  primaryCopySelectors,
  supportingCopySelectors,
  primaryWords,
  supportingWords,
  denominator,
  primaryPercent,
  supportingPercent: Number((100 - primaryPercent).toFixed(2)),
  h1: h1s[0] || "",
  h1Count: h1s.length,
  primaryMarker,
  supportMarker,
  supportingFamilyCount: $(".mk-supporting-families .mk-family-card").length,
  missingSupportingFamilies,
  passing:
    h1s.length === 1 &&
    /commercial mobile kitchen facility rentals/i.test(h1s[0] || "") &&
    /temporary commercial mobile kitchen trailer and modular facility rentals nationwide/i.test(
      intro,
    ) &&
    /hospitals/i.test(intro) &&
    /other commercial operations/i.test(intro) &&
    /maintain food service/i.test(intro) &&
    primaryPercent >= 75 &&
    primaryPercent <= 85 &&
    primaryMarker === 80 &&
    supportMarker === 20 &&
    missingSupportingFamilies.length === 0,
};

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
if (!result.passing) process.exitCode = 1;
