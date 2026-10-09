import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = "dist";
const inspectedExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".svg",
  ".txt",
  ".xml",
]);
const formerIdentity = new RegExp(
  [
    ["mobile", "kitchen", "123"].join("\\s*"),
    ["mobilekitchen", "123"].join(""),
    ["temporary", "123"].join("\\s*"),
    ["temporary", "123"].join(""),
    ["temp", "123"].join(""),
    ["temporary", "124"].join("[-\\s]*"),
  ].join("|"),
  "gi",
);
const failures = [];

async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await scan(path);
      continue;
    }
    if (!inspectedExtensions.has(extname(entry.name))) continue;
    const text = await readFile(path, "utf8");
    const match = formerIdentity.exec(text);
    formerIdentity.lastIndex = 0;
    if (!match) continue;
    const start = Math.max(0, match.index - 80);
    const end = Math.min(text.length, match.index + match[0].length + 80);
    failures.push(
      `${relative(root, path)}: ${text.slice(start, end).replace(/\s+/g, " ")}`,
    );
  }
}

await scan(root);

if (failures.length) {
  throw new Error(
    `Former customer identity remains in public output:\n${failures.join("\n")}`,
  );
}

console.log("Public brand residue check passed: no former identity found in dist.");
