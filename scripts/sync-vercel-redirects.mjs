import { readFile, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const vercelUrl = new URL("vercel.json", root);
const consolidationUrl = new URL("content/location-consolidation.json", root);

const [vercel, consolidation] = await Promise.all([
  readFile(vercelUrl, "utf8").then(JSON.parse),
  readFile(consolidationUrl, "utf8").then(JSON.parse),
]);

const assetRedirects = [
  {
    source: "/wp-content/uploads/2023/04/2-Food-Service-Design.png",
    destination: "/food-services-2/",
    permanent: true,
  },
];
const managedSources = new Set([
  ...assetRedirects.map(({ source }) => source),
  ...consolidation.routes.map(({ path }) => path),
]);
const retainedRedirects = vercel.redirects.filter(
  (rule) => "has" in rule || !managedSources.has(rule.source),
);
const locationRedirects = consolidation.routes.map(({ path, destination }) => ({
  source: path,
  destination,
  permanent: true,
}));

vercel.redirects = [
  ...retainedRedirects,
  ...assetRedirects,
  ...locationRedirects,
];

await writeFile(vercelUrl, `${JSON.stringify(vercel, null, 2)}\n`);
console.log(`Synced ${vercel.redirects.length} Vercel redirects.`);
