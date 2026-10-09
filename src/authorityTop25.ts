export type EvidenceKind = "Observed" | "Imported" | "Manual" | "Unknown";

export type AuthorityUrlRecord = {
  rank: number;
  exactPath: string;
  topicIntent: string;
  section: string;
  referringDomains: number;
  totalBacklinks: number;
  urlRating: number | null;
  metricsEvidence: EvidenceKind;
  metricsSource: string;
  productionHttp: string;
  previewBehavior: string;
  exactSlugStatus: "Preserved" | "Missing";
  restorationStatus: "Preserved" | "Not restored";
  replacementUrl: string;
  canonicalStatus: string;
  sitemapStatus: string;
  contentRestorationStatus: string;
  newTitle: string;
  testingStatus: string;
  internalLinkStatus: string;
  googleVerificationStatus: "Not connected";
  googleIndexStatus: "Unknown";
  searchConsoleSubmission: "Not recorded";
};

const importedRows = [
  [
    1,
    "/",
    "Homepage / nationwide temporary facility rental",
    541,
    695,
    4.5,
    "Homepage",
  ],
  [
    2,
    "/houston-texas-mobile-kitchen-rental/",
    "Houston mobile kitchen rental",
    8,
    12,
    0,
    "Location",
  ],
  [
    3,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-california/",
    "California portable restroom trailer rental",
    6,
    18,
    4.4,
    "Location",
  ],
  [
    4,
    "/temporary-workforce-housing-facilities/",
    "Temporary workforce housing facilities",
    4,
    23073,
    5,
    "Equipment/Service",
  ],
  [
    5,
    "/equipment-rental/sleeper-trailers/",
    "Sleeper trailer rental",
    2,
    344,
    null,
    "Equipment/Service",
  ],
  [
    6,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-alabama/",
    "Alabama portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    7,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-alaska/",
    "Alaska portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    8,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-alberta-ca/",
    "Alberta Canada portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    9,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-arizona/",
    "Arizona portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    10,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-arkansas/",
    "Arkansas portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    11,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-colorado/",
    "Colorado portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    12,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-connecticut/",
    "Connecticut portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    13,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-delaware/",
    "Delaware portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    14,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-district-of-columbia/",
    "District of Columbia portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    15,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-florida/",
    "Florida portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    16,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-georgia/",
    "Georgia portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    17,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-hawaii/",
    "Hawaii portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    18,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-idaho/",
    "Idaho portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    19,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-illinois/",
    "Illinois portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    20,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-indiana/",
    "Indiana portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    21,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-iowa/",
    "Iowa portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    22,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-kansas/",
    "Kansas portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    23,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-kentucky/",
    "Kentucky portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    24,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-louisiana/",
    "Louisiana portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
  [
    25,
    "/equipment-rental/restroom-trailers/portable-restroom-trailers-in-maine/",
    "Maine portable restroom trailer rental",
    2,
    13,
    4.4,
    "Location",
  ],
] as const;

function replacementFor(rank: number) {
  if (rank === 1) return "/";
  if (rank === 2)
    return "/equipment-rental/mobile-kitchen-trailers/";
  if (rank === 4) return "/man-camps-for-rent/";
  if (rank === 5)
    return "/equipment-rental/mobile-sleep-trailers/";
  return "/equipment-rental/restroom-trailers/";
}

export const authorityTop25: AuthorityUrlRecord[] = importedRows.map(
  ([
    rank,
    exactPath,
    topicIntent,
    referringDomains,
    totalBacklinks,
    urlRating,
    section,
  ]) => {
    const preserved = rank === 1;
    return {
      rank,
      exactPath,
      topicIntent,
      section,
      referringDomains,
      totalBacklinks,
      urlRating,
      metricsEvidence: "Imported",
      metricsSource: "Ahrefs export supplied for Phase 1; imported 2026-09-15",
      productionHttp: preserved ? "200" : "404",
      previewBehavior: preserved
        ? "200 at matching path"
        : "308 to 200 at replacement",
      exactSlugStatus: preserved ? "Preserved" : "Missing",
      restorationStatus: preserved ? "Preserved" : "Not restored",
      replacementUrl: replacementFor(rank),
      canonicalStatus: preserved
        ? "Production self-canonical observed; preview has no canonical and is noindex"
        : "Exact production URL has no canonical; preview replacement has no canonical and is noindex",
      sitemapStatus:
        "Production exact-URL membership unknown; preview replacement excluded",
      contentRestorationStatus: preserved
        ? "Current page exists; historical-content comparison not recorded"
        : "Not restored at exact URL; historical-content comparison not recorded",
      newTitle: "Not recorded or approved",
      testingStatus: preserved
        ? "HTTP/path audited; canonical, sitemap, and content acceptance incomplete"
        : "HTTP/redirect audited; exact restoration acceptance incomplete",
      internalLinkStatus: "Unknown; no link crawl imported",
      googleVerificationStatus: "Not connected",
      googleIndexStatus: "Unknown",
      searchConsoleSubmission: "Not recorded",
    };
  },
);
