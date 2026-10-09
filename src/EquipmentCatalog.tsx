import { catalogPhotoCoverage } from "./catalogImageCoverage";
import { catalogPhotoAdditions } from "./equipmentCatalogPhotoAdditions";
import { ServiceHeroCarousel } from "./ServiceHeroCarousel";
import { alignedPageIntro } from "./alignedIntroductions";
import { resolveLocationGallery } from "./locationCarouselImages";
import { serviceCategories, type ServiceCategory } from "./serviceMenu";
import catalog from "../content/equipment-catalog.json" with { type: "json" };
import site from "../site.json" with { type: "json" };
import { rentalProductHeadline } from "./rentalHeadlines";
import type { ServiceHeroImage } from "./serviceHeroImages";
export type CatalogItem = (typeof catalog.items)[number];

const firstApprovedImage = (title: string) =>
  resolveLocationGallery(title).images[0];

// Every category representative is either an exact approved-image registry entry
// or is intentionally left without a substitute image. This avoids a family or
// model mismatch in the public inventory.
const inventoryCategoryImages: Readonly<Record<string, ServiceHeroImage | undefined>> = {
  "Mobile Kitchens": firstApprovedImage("24 ft Mobile Kitchen Trailer"),
  Dishwashing: firstApprovedImage("Dishwashing Trailer"),
  Refrigeration: firstApprovedImage("20 ft Refrigerated Trailer"),
  "Restroom Trailers": catalogPhotoAdditions("restroom-trailers")[0],
  "Shower Trailers": firstApprovedImage("20 ft Shower Trailer"),
  "Restroom & Shower Combination": firstApprovedImage(
    "Shower-Restroom Combination Trailer, 3 Stalls + 1 ADA",
  ),
  Laundry: firstApprovedImage("30 ft Laundry Trailer"),
  "Containerized Sleeper Units": firstApprovedImage("Containerized Sleeper Unit"),
};

const familyAnchor = (name: string) =>
  `family-${name.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`;

function InventoryCategoryImage({ category }: { category: ServiceCategory }) {
  const image = inventoryCategoryImages[category.name];
  if (!image) return null;
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes="(max-width: 700px) calc(100vw - 40px), 480px"
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading="lazy"
      decoding="async"
    />
  );
}

export function EquipmentCatalog() {
  return (
    <section
      className="catalog-section"
      id="all-equipment"
      aria-labelledby="catalog-heading"
    >
      <div className="catalog-heading">
        <div>
          <span className="eyebrow">TEMPORARY KITCHEN RENTAL INVENTORY</span>
          <h2 id="catalog-heading">
            Equipment for food service
            <br />
            and site support.
          </h2>
        </div>
        <p>
          Start with mobile kitchens, dishwashing and refrigeration. Supporting
          restroom, shower, laundry and sleeper equipment remains available for
          projects that need a complete temporary facility plan.
        </p>
      </div>
      <nav className="catalog-groups" aria-label="Browse available equipment families">
        {serviceCategories.map((category) => (
          <a href={`#${familyAnchor(category.name)}`} key={category.name}>
            {category.name}
            <span>{category.links.length}</span>
          </a>
        ))}
      </nav>
      {serviceCategories.map((category) => (
        <section
          className="catalog-group"
          id={familyAnchor(category.name)}
          key={category.name}
          aria-labelledby={`${familyAnchor(category.name)}-heading`}
        >
          <div className="catalog-group-heading">
            <h3 id={`${familyAnchor(category.name)}-heading`}>{category.name}</h3>
            <p>{category.description}</p>
          </div>
          <div className="catalog-grid">
            <article className="catalog-card catalog-category-card">
              <a className="catalog-media" href={category.href} aria-label={`Explore ${category.name}`}>
                <InventoryCategoryImage category={category} />
                <span>Explore {category.name} ↗</span>
              </a>
              <div className="catalog-card-copy">
                <h4><a href={category.href}>{category.name}</a></h4>
                <p>{category.description}</p>
                <a className="catalog-detail-link" href={category.href}>View category <span aria-hidden="true">↗</span></a>
              </div>
            </article>
            <article className="catalog-card catalog-family-products">
              <div className="catalog-card-copy">
                <h4>Available {category.name.toLowerCase()} models</h4>
                <p>Choose a model to review its equipment-specific rental page.</p>
                <ul>
                  {category.links.map((item) => (
                    <li key={item.href}>
                      <a href={item.href}>
                        {item.name} <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>
      ))}
      <aside className="catalog-help">
        <div>
          <h3>Several facilities. One conversation.</h3>
          <p>
            Share your site, dates and requirements. We can help you work
            through the combination of equipment you need.
          </p>
        </div>
        <a className="button" href={`tel:${site.phoneE164}`}>
          Call {site.phoneDisplay}
          <span aria-hidden="true">↗</span>
        </a>
      </aside>
    </section>
  );
}

export function EquipmentBrief({ item }: { item: CatalogItem }) {
  const photo = catalogPhotoCoverage(item);
  const related = catalog.items
    .filter(
      (candidate) => candidate.group === item.group && candidate.id !== item.id,
    )
    .slice(0, 3);
  return (
    <section className="wrap section equipment-brief">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <a href="/equipment-rental/#all-equipment">Equipment rental</a>
      </nav>
      <div className="brief-intro">
        <div>
          <span className="eyebrow">TEMPORARY KITCHEN RENTAL EQUIPMENT</span>
          <h1>{rentalProductHeadline(item.name)}</h1>
          <p data-h1-intro>{alignedPageIntro(item.path, item.name, item.summary)}</p>
          <a className="button" href={`tel:${site.phoneE164}`}>
            Call {site.phoneDisplay}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="brief-image" data-catalog-gallery={item.id}>
          {photo.images.length ? <ServiceHeroCarousel images={photo.images} label={item.name} lightboxLabel={item.name} caption={photo.caption} /> : null}
        </div>
      </div>
      <div className="brief-planning">
        <div>
          <h2>
            Plan the details
            <br />
            before delivery.
          </h2>
          <p>
            Availability, equipment configuration and delivery arrangements are
            confirmed in your project proposal.
          </p>
        </div>
        <dl>
          <div>
            <dt>Your operation</dt>
            <dd>
              Explain how the equipment will be used and how many people it will
              support.
            </dd>
          </div>
          <div>
            <dt>Your site</dt>
            <dd>
              Share the location, available space, access restrictions and
              utility connections.
            </dd>
          </div>
          <div>
            <dt>Your schedule</dt>
            <dd>
              Include your preferred delivery date, expected rental duration and
              removal requirements.
            </dd>
          </div>
        </dl>
      </div>
      {related.length > 0 && (
        <section className="brief-related" aria-labelledby="related-equipment">
          <span className="eyebrow">RELATED EQUIPMENT</span>
          <h2 id="related-equipment">Continue planning your site.</h2>
          <div>
            {related.map((candidate) => (
              <a href={candidate.path} key={candidate.id}>
                {candidate.name}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
      )}
      <a className="text-link" href="/equipment-rental/#all-equipment">
        ← Browse all equipment
      </a>
    </section>
  );
}

export { catalog };
