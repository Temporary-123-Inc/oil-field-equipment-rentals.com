import { equipmentGalleryCaption } from "./equipmentGalleryCaption";

const olympicPeninsulaHeadline =
  "Olympic Peninsula, Washington Remote Operations Man Camp Temporary Facilities Rental";

/** Review sample: one accurate Temporary Kitchen Rental caption per verified group. */
export function olympicPeninsulaGalleryCaption(
  headline: string,
  modelId: string | null,
): string | undefined {
  if (headline !== olympicPeninsulaHeadline) return undefined;

  if (modelId === "new-office-sleeper-shower-restroom")
    return equipmentGalleryCaption({
      equipmentName: "Office, Sleeper and Shower & Restroom Trailer",
      modelId,
      family: "office-sleeper-hygiene-trailer",
      location: "Olympic Peninsula, Washington",
      commercialUse: "Commercial Base Camp",
    });

  if (modelId === "new-38ft-all-electric-kitchen")
    return equipmentGalleryCaption({
      equipmentName: "38 ft All Electric Kitchen",
      modelId,
      family: "mobile-kitchen",
      location: "Olympic Peninsula, Washington",
      commercialUse: "Commercial Base Camp",
    });

  if (modelId === "model-21")
    return equipmentGalleryCaption({
      equipmentName: "20 ft Five Stall Shower Trailer",
      modelId,
      family: "shower-trailer",
      location: "Olympic Peninsula, Washington",
      commercialUse: "Industrial Base Camp",
      additionalDetail:
        "External handwashing sinks are part of the pictured setup. These photos show the 20 ft five-stall trailer, separate from the 22 ft shower model.",
    });

  return undefined;
}
