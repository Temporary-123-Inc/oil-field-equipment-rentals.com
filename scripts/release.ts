import site from "../site.json" with { type: "json" };
import { readFileSync } from "node:fs";
import { publicOrigin } from "./seo-policy";
export function releaseErrors() {
  const errors: string[] = [];
  const scopedIndexing = site.indexingScope !== "full";
  if (!scopedIndexing) {
    const approval = site.indexingApproval;
    if (
      approval?.scope !== "all-public-static-routes" ||
      approval?.approvedBy !== "site owner via Codex conversation" ||
      approval?.approvedAt !== "2026-10-03"
    )
      errors.push("A dated owner approval is required for full-site indexing");
    if (!site.domainRoutingReady)
      errors.push("Canonical-domain routing must be verified before full indexing");
  }
  if (
    scopedIndexing &&
    (site.indexingBatchSize !== 25 ||
      !Number.isInteger(site.activeIndexingBatch) ||
      site.activeIndexingBatch < 1)
  )
    errors.push("Scoped indexing must use a valid 25-page active batch");
  if (site.origin !== publicOrigin)
    errors.push(
      "Canonical origin must match the owner-approved production domain",
    );
  try {
    const url = new URL(site.origin);
    if (
      url.protocol !== "https:" ||
      url.pathname !== "/" ||
      url.search ||
      url.hash ||
      url.username ||
      url.password ||
      url.hostname.endsWith(".invalid") ||
      url.hostname.includes("localhost")
    )
      errors.push("origin must be a real HTTPS origin");
  } catch {
    errors.push("production origin missing");
  }
  if (!/^\+[1-9]\d{7,14}$/.test(site.phoneE164) || !site.phoneDisplay)
    errors.push("approved phone missing");
  try {
    const evidence = JSON.parse(
      readFileSync(
        new URL("../security/security-evidence.json", import.meta.url),
        "utf8",
      ),
    );
    if (
      site.inquiriesEnabled &&
      evidence.controls.some(
        (c: { status: string }) =>
          !["pass", "not_applicable"].includes(c.status),
      )
    )
      errors.push("security evidence contains unresolved release controls");
  } catch {
    errors.push("complete security evidence is required");
  }
  return errors;
}
if (process.argv[1]?.endsWith("release.ts")) {
  const errors = releaseErrors();
  if (errors.length) {
    console.error(
      "Release blocked:\n" + errors.map((e) => `- ${e}`).join("\n"),
    );
    process.exitCode = 1;
  } else
    console.log(
      "Indexing configuration checks passed for the approved release scope.",
    );
}
