import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = JSON.parse(fs.readFileSync(path.join(root, 'src/data/site-39.json'), 'utf8'));
const referenceDetails = JSON.parse(fs.readFileSync(path.join(root, 'src/data/reference-service-details.json'), 'utf8'));
const origin = 'https://oil-field-equipment-rentals.com';
const dateParts = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Singapore', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).filter(({ type }) => type !== 'literal').map(({ type, value }) => [type, value]));
const lastmod = dateParts.year + '-' + dateParts.month + '-' + dateParts.day;
const slugify = (value) => value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const serviceSlugs = [
  'mobile-kitchen-trailers',
  'dishwashing-trailers',
  'refrigeration-trailers',
  'shower-trailers',
  'restroom-trailers',
  'shower-restroom-combinations',
  'sleeper-trailers',
  'laundry-trailers',
  'handwashing-trailers',
];
const coreRoutes = [
  '/',
  '/services/',
  '/mancamp/',
  '/service-areas/',
  '/rental-calculator/',
  '/about-us/',
  '/blog/',
  '/contact-us/',
  '/privacy/',
];
const stateRoutes = (site.location_data?.state_pages || []).map(({ state }) => `/service-areas/${slugify(state)}/`);
const cityRoutes = (site.service_area_data || []).map(({ state, representative_city }) => `/service-areas/${slugify(state)}/${slugify(representative_city)}/`);
const categoryRoutes = serviceSlugs.map((slug) => `/services/${slug}/`);
const detailRoutes = Object.keys(referenceDetails);
const routes = [...new Set([...coreRoutes, ...categoryRoutes, ...detailRoutes, ...stateRoutes, ...cityRoutes])].sort((a, b) => a.localeCompare(b));
const xmlEscape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const body = routes.map((route) => `  <url><loc>${xmlEscape(`${origin}${route}`)}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
fs.writeFileSync(path.join(root, 'public/sitemap.xml'), sitemap);
console.log(`Wrote ${routes.length} canonical routes to public/sitemap.xml`);
