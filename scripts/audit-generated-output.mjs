import fs from "node:fs";
import path from "node:path";
import { load } from "cheerio";

const root = path.resolve(process.env.GENERATED_AUDIT_DIST || "dist");
const registry = JSON.parse(fs.readFileSync("audit/build-registry.json", "utf8"));
const site = JSON.parse(fs.readFileSync("site.json", "utf8"));

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
  const relative = path.relative(root, file).split(path.sep).join("/");
  if (relative === "index.html") return "/";
  if (relative === "404.html") return "/404.html";
  return `/${relative.replace(/index\.html$/, "")}`;
}

const files = walk(root).sort();
const failures = [];
const totals = {
  htmlFiles: files.length,
  links: 0,
  images: 0,
  structuredDataPayloads: 0,
  forms: 0,
};

for (const file of files) {
  const route = routeFor(file);
  const $ = load(fs.readFileSync(file, "utf8"));
  const h1Count = $("h1").length;
  if (h1Count !== 1)
    failures.push(`${route}: expected one h1, found ${h1Count}`);

  const robots = $('meta[name="robots"]').attr("content")?.toLowerCase() || "";
  const registryPath = route === "/404.html" ? "/404/" : route;
  const indexable =
    registry.mode === "production" &&
    registry.pages.find((page) => page.path === registryPath)?.indexable === true;
  const expectedRobots =
    route === "/404.html"
      ? "noindex,nofollow"
      : indexable
        ? "index,follow"
        : "noindex,follow";
  if (robots !== expectedRobots) {
    failures.push(`${route}: expected ${expectedRobots} robots policy, found ${robots || "none"}`);
  }

  const ids = new Map();
  $("[id]").each((_, element) => {
    const id = $(element).attr("id");
    if (id) ids.set(id, (ids.get(id) || 0) + 1);
  });
  for (const [id, count] of ids) {
    if (count > 1) failures.push(`${route}: duplicate id ${id} (${count})`);
  }

  $("img").each((_, element) => {
    if ($(element).attr("alt") === undefined) {
      failures.push(`${route}: image is missing an alt attribute`);
    }
  });

  $('script[type="application/ld+json"]').each((_, element) => {
    try {
      JSON.parse($(element).text());
    } catch (error) {
      failures.push(`${route}: invalid JSON-LD (${error.message})`);
    }
  });

  const canonical = $('link[rel="canonical"]').attr("href");
  const expectedCanonical = indexable ? new URL(registryPath, site.origin).href : undefined;
  if (canonical !== expectedCanonical) {
    failures.push(`${route}: expected canonical ${expectedCanonical || "none"}, found ${canonical || "none"}`);
  }

  totals.links += $("a[href]").length;
  totals.images += $("img").length;
  totals.structuredDataPayloads += $(
    'script[type="application/ld+json"]',
  ).length;
  totals.forms += $("form").length;
}

const result = {
  ...totals,
  failures,
};

console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
