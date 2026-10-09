import { resolveLocationGallery } from "./locationCarouselImages";
import { useId } from "react";
import { ServiceHeroCarousel } from "./ServiceHeroCarousel";
import { serviceAreaGalleryCaption } from "./serviceAreaGalleryCopy";
import { equipmentGalleryCaption } from "./equipmentGalleryCaption";
import { panhandleGalleryCopy } from "./panhandleGalleryCopy";
import { olympicPeninsulaGalleryCaption } from "./olympicPeninsulaGalleryCopy";
import { photoCoverage } from "./equipmentPhotoPolicy";

type GalleryGroup = {
  headline: string;
  family: string;
  modelId: string | null;
};

export function LocationImageCarousel({
  headline,
  inert = false,
  captionForGroup,
}: {
  headline: string;
  inert?: boolean;
  captionForGroup?: (group: GalleryGroup) => string | undefined;
}) {
  const gallery = resolveLocationGallery(headline);
  const productId = "product-" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  if (!gallery.images.length) return null;
  const coverage = photoCoverage(gallery.images);
  return (
    <div
      className="location-image-gallery"
      data-location-gallery
      data-gallery-title={headline}
      data-equipment-family={gallery.family}
      data-equipment-model={gallery.modelId || ""}
      data-photography-status={gallery.images.length ? "verified" : "missing"}
      data-photo-coverage={coverage.kind}
      data-gallery-presentation={
        gallery.context ? "separate-options" : "single-model"
      }
    >
      {gallery.images.length ? (
        <>
          {gallery.groups.length > 1 && (
            <div
              className="location-product-tabs"
              data-product-tabs
              role="tablist"
              aria-label="Choose equipment type"
              hidden
            >
              {gallery.groups.map((group, index) => (
                <button
                  type="button"
                  key={group.modelId}
                  id={productId + "-tab-" + index}
                  role="tab"
                  data-product-tab={index}
                  aria-selected={index === 0}
                  aria-controls={productId + "-panel-" + index}
                  tabIndex={index === 0 ? 0 : -1}
                >
                  <span>{group.headline}</span>
                  <small>
                    {group.images.length}{" "}
                    {group.images.length === 1 ? "photo" : "photos"}
                  </small>
                </button>
              ))}
            </div>
          )}
          <div
            className={
              gallery.context
                ? "location-gallery-options"
                : "location-gallery-single"
            }
          >
            {gallery.groups.map((group, index) => (
              <section
                key={group.modelId}
                id={productId + "-panel-" + index}
                data-gallery-group
                data-group-title={group.headline}
                data-group-family={group.family}
                data-group-model={group.modelId}
                className="location-gallery-option"
              >
                {gallery.context && (
                  <h3 className="location-gallery-option-title">
                    {group.headline}
                  </h3>
                )}
                <ServiceHeroCarousel
                  images={group.images}
                  deferLoading={inert || index > 0}
                  label={group.headline + " photography"}
                  lightboxLabel={group.headline}
                  caption={
                    captionForGroup?.(group) ??
                    panhandleGalleryCopy(headline, group.modelId)?.caption ??
                    olympicPeninsulaGalleryCaption(headline, group.modelId) ??
                    serviceAreaGalleryCaption(
                      headline,
                      group.headline,
                      group.modelId,
                      group.family,
                    ) ??
                    equipmentGalleryCaption({
                      equipmentName: group.headline,
                      modelId: group.modelId,
                      family: group.family,
                    })
                  }
                />
              </section>
            ))}
          </div>
          {gallery.groups.length > 1 && (
            <script src="/location-product-tabs.js" defer />
          )}
        </>
      ) : null}
    </div>
  );
}
