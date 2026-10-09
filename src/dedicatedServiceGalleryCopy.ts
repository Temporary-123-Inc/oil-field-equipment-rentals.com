import { equipmentGalleryCaption } from "./equipmentGalleryCaption";
import { detectEquipmentFamily } from "./locationCarouselImages";

/** Target-branded fallback for dedicated galleries without image-specific notes. */
export function dedicatedServiceGalleryCaption(
  equipmentName: string,
  modelId: string | null,
): string | undefined {
  if (!modelId) return undefined;
  return equipmentGalleryCaption({
    equipmentName,
    modelId,
    family: detectEquipmentFamily(equipmentName),
  });
}
