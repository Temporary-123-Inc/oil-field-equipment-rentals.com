import regionalSite from "./data/site-05emergency-kitchen-portable.json" with {
  type: "json",
};

export type StateServiceArea =
  (typeof regionalSite.location_data.state_pages)[number];
export type RegionalServiceArea = (typeof regionalSite.service_area_data)[number];

const stateRecords = regionalSite.location_data.state_pages as StateServiceArea[];
const regionalRecords = regionalSite.service_area_data as RegionalServiceArea[];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const stateByName = new Map(stateRecords.map((record) => [record.state, record]));
const regionByLabel = new Map(
  regionalRecords.map((record) => [record.regional_guide_location, record]),
);
const cityBySlug = new Map(
  regionalRecords.map((record) => [record.city_slug, record]),
);

export const stateServiceAreaFor = (state: string) => stateByName.get(state);

export const regionalServiceAreaFor = (state: string, region: string) =>
  regionByLabel.get(`${region}, ${state}`);

export const cityServiceAreaFor = (
  city: string,
  state: string,
  region = "",
) =>
  cityBySlug.get(slugify(`${city}-${state}`)) ||
  (region ? regionalServiceAreaFor(state, region) : undefined);

export const regionDescription = (
  record: RegionalServiceArea | undefined,
  region: string,
  state: string,
) => {
  if (!record) return "";
  const regionalLabel = `${region}, ${state}`;
  const cityLabel = `${record.representative_city}, ${record.state}`;
  return record.page_layout_data.description.replaceAll(cityLabel, regionalLabel);
};

export const cityDescription = (
  record: RegionalServiceArea | undefined,
  city: string,
  state: string,
) => {
  if (!record) return "";
  const sourceLabel = `${record.representative_city}, ${record.state}`;
  return record.page_layout_data.description.replaceAll(
    sourceLabel,
    `${city}, ${state}`,
  );
};

export const regionalPathForLabel = (label: string) => {
  const separator = label.lastIndexOf(", ");
  if (separator < 0) return "/service-areas/";
  const region = label.slice(0, separator);
  const state = label.slice(separator + 2);
  return `/service-areas/${slugify(state)}/${slugify(region)}/`;
};

export const formatDollars = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const regionalSiteSource = regionalSite;
