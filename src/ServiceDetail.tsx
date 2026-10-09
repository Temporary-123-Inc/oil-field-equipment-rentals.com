import { alignedPageIntro } from "./alignedIntroductions";
import details from "../content/service-details.json" with { type: "json" };
import { serviceCategories } from "./serviceMenu";
import site from "../site.json" with { type: "json" };
import { rentalProductHeadline } from "./rentalHeadlines";
import { ServiceHeroCarousel } from "./ServiceHeroCarousel";
import { imagesForServicePath, servicePhotoCaption } from "./serviceHeroImages";
import { temporaryKitchenRentalServiceEditorial } from "./temporaryKitchenRentalServiceEditorial";
import { equipmentGalleryCaption } from "./equipmentGalleryCaption";
import { detectEquipmentFamily } from "./locationCarouselImages";
import { catalogPhotoCoverage } from "./catalogImageCoverage";
import type { CatalogItem } from "./EquipmentCatalog";
export const modelDetails = details;
export function ServiceDetail({
  path,
  catalogItem,
}: {
  path: keyof typeof details;
  catalogItem?: CatalogItem;
}) {
  const item = details[path];
  const editorial = temporaryKitchenRentalServiceEditorial[path];
  const catalogPhoto = catalogItem ? catalogPhotoCoverage(catalogItem) : null;
  const verifiedImages =
    catalogPhoto?.images.length
      ? catalogPhoto.images
      : imagesForServicePath(path);
  const modelId = verifiedImages?.[0].model ?? null;
  const galleryCaption = equipmentGalleryCaption({
    equipmentName: item.name,
    modelId,
    family: verifiedImages?.[0]?.family ?? detectEquipmentFamily(item.name),
    additionalDetail: servicePhotoCaption(path),
  });
  const caption = catalogPhoto?.caption ?? galleryCaption;
  const relatedCategoryName: Record<string, string> = {
    Restroom: "Restroom Trailers",
    Shower: "Shower Trailers",
    "Shower and Restroom Combination Trailers":
      "Restroom & Shower Combination",
    Sleeper: "Containerized Sleeper Units",
  };
  const related =
    serviceCategories
      .find((c) => c.name === (relatedCategoryName[item.category] ?? item.category))
      ?.links.filter((l) => l.href !== path) ?? [];
  return (
    <article className="model-page">
      <section className="model-hero-section">
        <div className="wrap section">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="/equipment-rental/">Services</a>
            <span>/</span>
            <a href={item.categoryHref}>{item.category}</a>
          </nav>
          <div className="model-hero">
            <div>
              <span className="eyebrow">EXPLORE THE CONFIGURATION</span>
              <h1>{rentalProductHeadline(item.name)}</h1>
              <p className="model-intro" data-h1-intro>
                {alignedPageIntro(path, item.name, item.intro)}
              </p>
              <div className="model-actions">
                <a className="button" href={"tel:" + site.phoneE164}>
                  Call Now, {item.category} Specialist 24/7{" "}
                  <span aria-hidden="true">↗</span>
                </a>
                <a className="model-call" href={"tel:" + site.phoneE164}>
                  {site.phoneDisplay}
                </a>
              </div>
            </div>
            {verifiedImages?.length ? (
              <ServiceHeroCarousel
                images={verifiedImages}
                label={item.name}
                lightboxLabel={item.name}
                caption={caption}
              />
            ) : null}
          </div>
        </div>
      </section>
      <section className="model-body">
        <div className="wrap section model-information">
          <div>
            <span className="eyebrow">EQUIPMENT & LAYOUT</span>
            <h2>What the {item.name} listing specifies</h2>
            <ul className="model-features">
              {item.equipment.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="model-highlight">{item.highlight}</p>
            <h2>Where {item.name} fits</h2>
            <p>{editorial?.use ?? item.use}</p>
          </div>
          <aside className="model-planning">
            <span className="eyebrow">PLAN BEFORE DELIVERY</span>
            <h2>Plan for {item.name}</h2>
            <ol>
              {(editorial?.planning ?? item.planning).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
            <div className="model-confirm">
              <h3>Confirm this configuration</h3>
              <p>
                {editorial?.confirm ?? item.unknown} Availability, final
                equipment and service arrangements are confirmed in your
                proposal.
              </p>
            </div>
            <a href={"tel:" + site.phoneE164} className="button">
              Emergency support 24/7 <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </div>
      </section>
      <section className="wrap section model-related">
        <span className="eyebrow">COMPARE THE OPTIONS</span>
        <h2>More {item.category.toLowerCase()}</h2>
        <div className="service-category-cards">
          {related.map((l) => (
            <a key={l.href} href={l.href}>
              <strong>{l.name}</strong>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}
