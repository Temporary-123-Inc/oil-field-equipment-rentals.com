import { equipmentGalleryCaption } from "./equipmentGalleryCaption";

export function panhandleGalleryCopy(headline: string, modelId: string | null) {
  if (!/panhandle/i.test(headline) || !/oklahoma/i.test(headline)) return undefined;
  if (modelId === "model-08")
    return {
      caption: equipmentGalleryCaption({
        equipmentName: "30 ft Laundry Trailer",
        modelId: null,
        family: "laundry-trailer",
        location: "Oklahoma Panhandle",
        commercialUse: "Commercial Project and Base Camp",
      }),
      altPrefix: "30 ft laundry trailer rental option — ",
    };
  if (modelId === "model-06")
    return {
      caption: equipmentGalleryCaption({
        equipmentName: "20 ft Laundry Container",
        modelId: null,
        family: "laundry-container",
        location: "Oklahoma Panhandle",
        commercialUse: "Commercial Facility and Base Camp",
        additionalDetail: "These interior photos show the 20 ft container, not a trailer.",
      }),
      altPrefix: "20 ft laundry container rental option — ",
    };
  return undefined;
}
