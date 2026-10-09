import type { ServiceHeroImage } from "./serviceHeroImages";
import manifest from "../content/verified-equipment-images.json" with { type: "json" };

const sizes =
  "(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 48vw, 680px";

function ownerSuppliedSet(modelId: string): ServiceHeroImage[] {
  return manifest.images
    .filter((image) => image.model === modelId && image.status === "approved")
    .map((image, index) => ({
      id: `verified-${image.id.replaceAll(".", "-")}`,
      src: image.src,
      srcSet: image.srcSet || image.src,
      sizes,
      width: image.width,
      height: image.height,
      alt: image.alt,
      view: image.view as ServiceHeroImage["view"],
      sortOrder: index + 1,
      sourceUrl: image.original,
      fullSrc: image.original,
      thumbnail: image.thumbnail,
      family: image.family,
      model: image.model,
      sha256: image.sha256,
    }));
}

const additions: Readonly<Record<string, readonly ServiceHeroImage[]>> = {
  "restroom-trailers": ownerSuppliedSet("owner-restroom-only-reference"),
  "dining-structure-rental": ownerSuppliedSet("owner-dining-hall-reference"),
  "stair-rentals": ownerSuppliedSet("owner-trailer-entry-stairs"),
  "generator-trailers": ownerSuppliedSet("owner-generator-trailer-reference"),
};

const captions: Readonly<Record<string, string>> = {
  "restroom-trailers":
    "Owner-supplied restroom-only interior references. They do not establish model length, stall count or an accessible layout; confirm the available rental or lease configuration with your quote.",
  "dining-structure-rental":
    "Owner-supplied illustrative dining-hall references. Confirm the structure, seating plan, utilities, furnishings and available rental or lease system with your quote.",
  "stair-rentals":
    "Owner-supplied illustrative temporary-trailer stair references. Confirm rise, landing, handrails and the available access system with your quote.",
  "generator-trailers":
    "Owner-supplied illustrative enclosed generator-trailer reference. Confirm output, electrical connections, fuel and servicing for the available rental or lease unit.",
};

export function catalogPhotoAdditions(id: string): readonly ServiceHeroImage[] {
  return additions[id] ?? [];
}

export function catalogPhotoAdditionCaption(id: string): string {
  return captions[id] ?? "";
}
