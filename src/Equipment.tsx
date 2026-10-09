import { resolveLocationGallery } from "./locationCarouselImages";
import { ServiceHeroCarousel } from "./ServiceHeroCarousel";
import { equipmentGalleryCaption as buildEquipmentGalleryCaption } from "./equipmentGalleryCaption";
import site from "../site.json" with { type: "json" };

type EquipmentCard = {
  name: string;
  path: string;
  image: string;
  smallImage?: string;
  imageAlt?: string;
  category: string;
  text: string;
  detail: string;
  tags: string[];
  secondaryName?: string;
  secondaryPath?: string;
};

export const equipment: EquipmentCard[] = [
  {
    name: "Mobile Kitchens",
    path: "/24ft-mobile/",
    image: "/images/catalog/mobile-kitchen-trailers-960.webp",
    smallImage: "/images/catalog/mobile-kitchen-trailers-480.webp",
    category: "Food service",
    text: "Rent a commercial mobile kitchen and keep meal production moving through renovations, emergencies and remote projects.",
    detail:
      "Rent the kitchen capacity your team needs without waiting for a permanent build. Share your meal volume, menu and equipment requirements so our team can help match cooking space, preparation areas and utility needs.",
    tags: ["Meal production", "Commercial kitchens", "24/7 support"],
  },
  {
    name: "Dishwashing",
    path: "/22ft-dishwashing-trailer-rental/",
    image: "/images/service-heroes/38ft-high-temp-dish/01-960.webp",
    smallImage: "/images/service-heroes/38ft-high-temp-dish/01-480.webp",
    imageAlt: "Commercial dishwashing machine inside a mobile dishwashing trailer",
    category: "Food sanitation",
    text: "Rent a dishwashing trailer and keep high-volume food service sanitary, organized and moving.",
    detail:
      "Rent dedicated warewashing capacity that supports your operation from the first service to final cleanup. Share your volume and schedule so we can discuss wash capacity, utilities, wastewater and placement.",
    tags: ["Warewashing", "Sanitation", "Food service"],
  },
  {
    name: "Refrigeration",
    path: "/refrigeration-trailer-20ft-rental-3/",
    image: "/images/catalog/refrigeration-trailers-960.webp",
    smallImage: "/images/catalog/refrigeration-trailers-480.webp",
    category: "Cold storage",
    text: "Rent temperature-controlled cold storage for ingredients, prepared food and critical supplies.",
    detail:
      "Rent refrigeration sized around what you store and how often supplies move. Tell us the required temperature range and delivery schedule so we can review unit size, power and site access.",
    tags: ["Cold storage", "Food safety", "Temperature control"],
  },
];

const cardTitles: Record<string, string> = {
  "Mobile Kitchens": "24 ft Mobile Kitchen Trailer", "Dishwashing": "Dishwashing Trailer",
  "Refrigeration": "20 ft Refrigerated Trailer",
};
function cardGallery(name: string) {
  return resolveLocationGallery(cardTitles[name] || name);
}
export function equipmentGalleryForPath(path: string) {
  const item = equipment.find((entry) => entry.path === path);
  return cardGallery(item?.name || "Unknown equipment");
}
function equipmentGalleryCaption(path: string) {
  const gallery = equipmentGalleryForPath(path);
  const group = gallery.groups[0];
  return buildEquipmentGalleryCaption({
    equipmentName: group?.headline ?? "Commercial equipment",
    modelId: gallery.modelId,
    family: gallery.family,
  });
}
for (const item of equipment) {
  const photo = cardGallery(item.name).images[0];
  item.image = photo?.src || "";
  item.smallImage = photo?.thumbnail;
  item.imageAlt = photo?.alt || `Commercial ${item.name.toLowerCase()} equipment from Temporary Kitchen Rental`;
}

export function EquipmentImage({
  image,
  smallImage,
  alt,
  priority = false,
}: {
  image: string;
  smallImage?: string;
  alt: string;
  priority?: boolean;
}) {
  const source = image.startsWith("/") ? image : `/images/${image}.webp`;
  const sourceSet = smallImage
    ? `${smallImage} 480w, ${source} 960w`
    : image.startsWith("/")
      ? undefined
      : `/images/${image}-480.webp 480w, ${source} 850w`;
  return (
    <img
      src={source}
      srcSet={sourceSet}
      sizes="(max-width: 600px) calc(100vw - 36px), (max-width: 1023px) calc(50vw - 36px), 620px"
      alt={alt}
      width="850"
      height="650"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}

const homepagePhotos = [
  [
    "Mobile kitchen trailers",
    "/images/kitchen-wide.webp",
    "Exterior of a white mobile kitchen trailer with service windows",
  ],
  [
    "Dishwashing trailers",
    "/media/cc7bd709e3c4c4a3698b1f00.webp",
    "Stainless steel sinks and washing equipment inside a portable dishwashing facility",
  ],
  [
    "Refrigeration trailers",
    "/images/catalog/refrigeration-trailers-960.webp",
    "Refrigerated trailer interior with insulated walls and cooling equipment",
  ],
];
const homepageEquipment: EquipmentCard[] = equipment.map((item, index) => ({
  ...item,
  name: homepagePhotos[index][0],
  image: item.image,
  smallImage: item.smallImage,
  imageAlt: item.imageAlt,
}));

export function Cards({
  editorial = false,
  homepage = false,
}: {
  editorial?: boolean;
  homepage?: boolean;
}) {
  return (
    <div
      id={homepage ? "home-rental-grid" : undefined}
      className={`equipment-grid${editorial ? " equipment-editorial" : ""}${homepage ? " home-equipment" : ""}`}
    >
      {(homepage ? homepageEquipment : equipment).map((e, i) => (
        <article
          className="equipment-card"
          key={e.path}
          data-card
          data-rental-group={
            homepage
              ? "kitchen"
              : undefined
          }
        >
          <a
            href={e.path}
            className="image-box"
            tabIndex={-1}
            aria-hidden={homepage ? undefined : true}
          >
            {e.image ? (
              <EquipmentImage
                image={e.image}
                smallImage={e.smallImage}
                alt={e.imageAlt || `${e.name} equipment from Temporary Kitchen Rental`}
              />
            ) : (
              <div
                className="verified-image-pending"
                role="img"
                aria-label={e.imageAlt}
              >
                <span>Verified equipment photo pending</span>
              </div>
            )}
            <span className="category-label">{e.category}</span>
            <span className="image-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
          <div className="card-copy">
            {(editorial || homepage) && (
              <span className="service-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
            <h3>
              <a href={e.path}>{e.name}</a>
            </h3>
            <p>{e.text}</p>
            {e.secondaryName && e.secondaryPath && (
              <a className="related-card-service" href={e.secondaryPath}>
                {e.secondaryName} <span aria-hidden="true">↗</span>
              </a>
            )}
            <ul className="equipment-tags" aria-label="Facility uses">
              {e.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="card-actions">
              <a
                href={e.path}
                aria-label={homepage ? `View rental: ${e.name}` : undefined}
              >
                {homepage ? "View rental" : "Explore facilities"}{" "}
                <span aria-hidden="true">↗</span>
              </a>
              <button
                type="button"
                className="quick-view"
                data-open-dialog={`equipment-${i}`}
                hidden
                aria-label={`Quick view: ${e.name}`}
                aria-haspopup="dialog"
              >
                Quick view <span aria-hidden="true">+</span>
              </button>
            </div>
          </div>
          <dialog
            id={`equipment-${i}`}
            className="equipment-dialog"
            aria-labelledby={`equipment-title-${i}`}
          >
            <button
              className="dialog-close"
              data-close-dialog
              type="button"
              aria-label="Close quick view"
              autoFocus
            >
              Close <span aria-hidden="true">×</span>
            </button>
            <div className="dialog-grid">
              {equipmentGalleryForPath(e.path).images.length ? <ServiceHeroCarousel images={equipmentGalleryForPath(e.path).images} label={e.name} lightboxLabel={equipmentGalleryForPath(e.path).groups[0]?.headline || e.name} caption={equipmentGalleryCaption(e.path)} deferLoading /> : null}
              <div className="dialog-copy">
                <span className="eyebrow">{e.category}</span>
                <h2 id={`equipment-title-${i}`}>{e.name}</h2>
                <p>{e.detail}</p>
                <ul className="dialog-benefits" aria-label="Rental benefits">
                  {e.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                {e.secondaryName && e.secondaryPath && (
                  <a className="text-link" href={e.secondaryPath}>
                    {e.secondaryName} →
                  </a>
                )}
                <p className="small">
                  Ask about short-term rental availability or longer-term lease
                  arrangements. Final availability and configuration are
                  confirmed with your project proposal.
                </p>
                <a
                  className="button dialog-call-now"
                  href={`tel:${site.phoneE164}`}
                  aria-label={`Call now, rental specialist available 24/7 at ${site.phoneDisplay}`}
                >
                  <span className="dialog-call-label">
                    <strong>Call Now</strong>
                    <small>Rental specialist · 24/7</small>
                  </span>
                  <span className="dialog-call-number">
                    {site.phoneDisplay}
                  </span>{" "}
                  <span aria-hidden="true">↗</span>
                </a>
                <a className="text-link" href={e.path}>
                  View equipment details →
                </a>
              </div>
            </div>
          </dialog>
        </article>
      ))}
    </div>
  );
}
