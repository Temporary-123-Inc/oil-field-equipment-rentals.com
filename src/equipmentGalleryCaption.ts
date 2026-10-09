import site from "../site.json" with { type: "json" };
import { captionDetailBatchA } from "./serviceAreaCaptionBatchA";
import { captionDetailBatchB } from "./serviceAreaCaptionBatchB";
import { captionDetailBatchC } from "./serviceAreaCaptionBatchC";

const familyDetails: Record<string, { benefit: string; detail: string }> = {
  "mobile-kitchen": {
    benefit: "commercial and institutional meal service",
    detail: "Plan meal volume, cooking workflow, site utilities and serving access around the project.",
  },
  "kitchen-modular": {
    benefit: "commercial food preparation in a modular building",
    detail: "Plan the installation footprint, food-service workflow and building utilities.",
  },
  dishwashing: {
    benefit: "commercial warewashing for a temporary food-service operation",
    detail: "Plan wash capacity around dish flow, hot water, drainage and utility connections.",
  },
  "dishwashing-modular": {
    benefit: "commercial warewashing in a modular facility",
    detail: "Plan wash capacity, loading flow and building utility connections.",
  },
  "refrigerated-trailer": {
    benefit: "temporary cold storage for commercial operations",
    detail: "Plan inventory volume, loading access, power and the delivery footprint.",
  },
  "refrigerated-container": {
    benefit: "container-based cold storage for commercial operations",
    detail: "Plan inventory volume, container handling, placement and power access.",
  },
  "refrigeration-unspecified": {
    benefit: "temporary cold storage for commercial operations",
    detail: "Confirm the correct trailer or container form, temperature range and site connections.",
  },
  "laundry-trailer": {
    benefit: "on-site washing and drying for workwear and crew laundry",
    detail: "Plan temporary laundry around crew size, water, drainage and service access.",
  },
  "laundry-container": {
    benefit: "container-based washing and drying for a commercial crew",
    detail: "Plan the set-down area, utility connections and container handling route.",
  },
  "laundry-unspecified": {
    benefit: "on-site washing and drying for a commercial crew",
    detail: "Confirm whether the required option is a trailer or container before planning placement.",
  },
  "shower-trailer": {
    benefit: "temporary shower access for a commercial crew",
    detail: "Plan privacy, peak use, hot water and wastewater servicing for the site.",
  },
  "shower-container": {
    benefit: "container-based shower access for a commercial crew",
    detail: "Plan privacy, hot water, wastewater and container placement for the site.",
  },
  "restroom-trailer": {
    benefit: "temporary restroom access at a commercial or institutional site",
    detail: "Plan user access, servicing frequency, water and wastewater connections.",
  },
  "shower-restroom-combination": {
    benefit: "temporary showers and restrooms for a commercial crew",
    detail: "Plan privacy, stall access, hot water and wastewater servicing together.",
  },
  "ada-combination": {
    benefit: "accessible shower and restroom service at a commercial site",
    detail: "Confirm the accessible room, route, ramp and actual unit configuration before booking.",
  },
  "sleeper-trailer": {
    benefit: "temporary crew accommodation at a commercial project",
    detail: "Plan occupancy, privacy, ventilation and access around the actual sleeping layout.",
  },
  "sleeper-container": {
    benefit: "container-based crew accommodation for a commercial project",
    detail: "Plan occupancy, container handling, set-down space and site utility needs.",
  },
  "contractor-accommodation": {
    benefit: "temporary contractor accommodation for a commercial project",
    detail: "Confirm the sleeping layout, occupancy and placement requirements for the selected unit.",
  },
  "vip-accommodation": {
    benefit: "temporary accommodation for commercial project personnel",
    detail: "Confirm room layout, occupancy and placement requirements for the selected unit.",
  },
  "office-sleeper-hygiene-trailer": {
    benefit: "combined office, sleeping and hygiene support for a commercial crew",
    detail: "Confirm the room separation, occupancy and site connections for the actual configuration.",
  },
  "handwashing-trailer": {
    benefit: "commercial handwashing access for crews and visitors",
    detail: "Plan sink placement, refill access and servicing around site traffic.",
  },
  "water-tank": {
    benefit: "temporary water storage for a commercial site or base camp",
    detail: "Plan tank placement and refill access around daily site demand.",
  },
  unspecified: {
    benefit: "commercial and institutional operations",
    detail: "Confirm the photographed equipment form, configuration and site connections before planning delivery.",
  },
};

export function equipmentGalleryCaption({
  equipmentName,
  modelId,
  family,
  location,
  commercialUse,
  additionalDetail,
}: {
  equipmentName: string;
  modelId: string | null;
  family: string;
  location?: string;
  commercialUse?: string;
  additionalDetail?: string;
}): string {
  const equipment = equipmentName
    .replace(/\s+(?:Rental|For Rent|Leasing|Short-Term Rental|Long-Term Rental)$/i, "")
    .replace(/^Commercial\s+/i, "")
    .trim();
  const product = modelId
    ? captionDetailBatchA(modelId) ??
      captionDetailBatchB(modelId) ??
      captionDetailBatchC(modelId)
    : undefined;
  const details = product ?? familyDetails[family] ?? familyDetails.unspecified;
  const equipmentPhrase = location
    ? `${location} ${commercialUse || "Commercial Project and Base Camp"} ${equipment} Rental or Lease.`
    : `${equipment} Rental or Lease for ${commercialUse || details.benefit}.`;
  const rentalTerms = `Discuss weekly rental, monthly rental, or yearly rental and lease options${location ? ` for ${product?.benefit || details.benefit}` : ""}.`;
  const photoDetail = additionalDetail?.trim();
  return `${equipmentPhrase} ${rentalTerms} ${details.detail}${photoDetail ? ` ${photoDetail}` : ""} Call Temporary Kitchen Rental now for 24/7 live-agent support: ${site.phoneDisplay}.`;
}
