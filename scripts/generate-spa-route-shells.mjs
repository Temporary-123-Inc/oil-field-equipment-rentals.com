import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const shell = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'public/sitemap.xml'), 'utf8');
const source = fs.readFileSync(path.join(root, 'src/main.jsx'), 'utf8');
const routes = [...sitemap.matchAll(/<loc>https:\/\/oil-field-equipment-rentals\.com(.*?)<\/loc>/g)].map(([, route]) => route || '/');
const aliasBlock = source.slice(source.indexOf('const referenceRouteAliases'), source.indexOf('const referenceDetailForPath'));
const inventoryBlock = source.slice(source.indexOf('const inventoryRouteMap'), source.indexOf('const serviceH1'));
const aliases = [...aliasBlock.matchAll(/['"](\/[^'"]+)['"]\s*:/g), ...inventoryBlock.matchAll(/\[\s*['"](\/[^'"]+)['"]/g)].map(([, route]) => route);
const allRoutes = [...new Set([...routes, ...aliases])];

for (const route of allRoutes) {
  if (route === '/') continue;
  const directory = path.join(dist, route.slice(1));
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.html'), shell);
}

console.log('Wrote ' + (allRoutes.length - 1) + ' direct route shells to dist/');
