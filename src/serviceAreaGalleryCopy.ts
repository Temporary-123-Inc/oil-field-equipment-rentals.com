import { commercialUseCases, locationRentalIntents } from "./rentalHeadlines";
import { equipmentGalleryCaption } from "./equipmentGalleryCaption";

/** Visible sales copy for an approved equipment reference on a location page. */
export function serviceAreaGalleryCaption(
  pageHeadline: string,
  equipmentHeadline: string,
  modelId: string | null,
  equipmentFamily?: string,
): string | undefined {
  if (!modelId) return undefined;
  const useCase = commercialUseCases.find((value) =>
    pageHeadline.includes(` ${value} `),
  );
  const specificHeadline = pageHeadline.match(
    /^(.*?)\s+(Commercial Mobile Kitchen Trailer|Commercial Dishwashing Trailer|Refrigerated Trailer|Commercial Restroom Trailer|Commercial Shower Trailer|Shower and Restroom Combination Trailer|Commercial Laundry Trailer|Commercial Containerized Sleeper Facility)\s+(Rental|For Rent|Leasing)$/i,
  );
  const isDirectory =
    /Commercial Temporary Facility Rental Locations in /.test(pageHeadline) ||
    / Commercial Temporary Facility Rental Locations$/.test(pageHeadline) ||
    pageHeadline.endsWith(" Facility Rental Locations");
  if (!useCase && !isDirectory && !specificHeadline) return undefined;
  const location = isDirectory
    ? pageHeadline.endsWith(" Commercial Temporary Facility Rental Locations")
      ? pageHeadline.slice(0, -" Commercial Temporary Facility Rental Locations".length)
      : pageHeadline.endsWith(" Facility Rental Locations")
      ? pageHeadline.slice(0, -" Facility Rental Locations".length)
      : pageHeadline.slice("Commercial Temporary Facility Rental Locations in ".length)
    : useCase
      ? pageHeadline.slice(0, pageHeadline.indexOf(` ${useCase} `))
      : specificHeadline![1];
  if (!location || !equipmentHeadline) return undefined;
  const equipment = (equipmentHeadline === pageHeadline
    ? pageHeadline
        .slice(location.length)
        .trim()
        .replace(new RegExp(`^${useCase ? `${useCase}\\s+` : ""}`, "i"), "")
    : equipmentHeadline
  )
    .replace(
      new RegExp(`\\s+(?:${[...locationRentalIntents].sort((a, b) => b.length - a.length).join("|")})$`, "i"),
      "",
    )
    .trim();
  if (!equipment) return undefined;
  const equipmentTypes: Record<string, string> = {
    "mobile-kitchen": "Trailer",
    dishwashing: "Trailer",
    "dishwashing-modular": "Modular Building",
    "refrigerated-trailer": "Trailer",
    "refrigerated-container": "Container",
    "refrigeration-unspecified": "Facility",
    "laundry-trailer": "Trailer",
    "laundry-container": "Container",
    "laundry-unspecified": "Facility",
    "shower-trailer": "Trailer",
    "shower-container": "Container",
    "restroom-trailer": "Trailer",
    "shower-restroom-combination": "Trailer",
    "ada-combination": "Trailer",
    "sleeper-trailer": "Trailer",
    "sleeper-container": "Container",
    "contractor-accommodation": "Facility",
    "vip-accommodation": "Facility",
    "office-sleeper-hygiene-trailer": "Trailer",
    "handwashing-trailer": "Trailer",
    "water-tank": "Trailer",
  };
  const typedEquipment = /\b(?:trailer|container|facility|building|unit)\b/i.test(equipment)
    ? equipment
    : `${equipment} ${equipmentTypes[equipmentFamily || ""] || "Facility"}`;
  return equipmentGalleryCaption({
    equipmentName: typedEquipment,
    modelId,
    family: equipmentFamily || "unspecified",
    location,
    commercialUse: useCase
      ? useCase.replace(/^Commercial\s+/i, "")
      : "Commercial Project and Base Camp",
  });
}
