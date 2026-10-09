import { alignedPageIntro } from "./alignedIntroductions";
import { ApprovedEquipmentPhotoOptions } from "./ApprovedEquipmentPhotoOptions";
import { IndustryDetail, industryGuideByPath } from "./IndustryDetail";
import { rentalCategoryHeadline, rentalHubHeadline } from "./rentalHeadlines";
import { StateDetail, statePageByPath } from "./StateDetail";
import { CityDetail } from "./CityDetail";
import { cityPageByPath, reviewedCityPages } from "./cityDirectory";
import { statePath } from "./statePaths";
import { CoverageMap } from "./CoverageMap";
import { LocationImageCarousel } from "./LocationImageCarousel";
import { ServiceHeroCarousel } from "./ServiceHeroCarousel";
import { imagesForServicePath, servicePhotoCaption } from "./serviceHeroImages";
import { MapLocationDirectory } from "./MapLocationDirectory";
import { CityDirectoryPage } from "./CityDirectoryPage";
import site from "../site.json" with { type: "json" };
import { QuoteForm } from "./QuoteForm";
import { Home } from "./Home";
import { Cards } from "./Equipment";
import {
  EquipmentCatalog,
  EquipmentBrief,
  catalog as equipmentCatalogData,
} from "./EquipmentCatalog";
import {
  inventoryNavigationCategories,
  serviceCategories,
} from "./serviceMenu";
import { StateGuideCards } from "./StateGuideCards";
import consolidatedLocations from "../content/location-consolidation.json" with { type: "json" };
import { ServiceDetail, modelDetails } from "./ServiceDetail";
import { RegionDetail, regionPageByPath, regionSlug } from "./regionGuides";
import { RentalCalculator } from "./RentalCalculator";
import { SeoDashboard } from "./SeoDashboard";
import {
  targetCoreAliases,
  targetRouteByPath,
  type TargetRoute,
} from "./temporaryKitchenRentalTarget";
import { legacyProductPageCopy } from "./temporaryKitchenRentalLegacyCopy";
import { equipmentGalleryCaption } from "./equipmentGalleryCaption";
import { catalogPhotoCoverage } from "./catalogImageCoverage";
import { commercialPageHeadline } from "./commercialHeadlines";
import {
  cityDescription,
  cityServiceAreaFor,
  stateServiceAreaFor,
} from "./regionalSiteData";
export type SourcePage = {
  id: number;
  modified?: string;
  path: string;
  title: string;
  html: string;
  description: string;
  images: { src: string; alt: string }[];
};
const nav = [
  ["Support & Emergency", "/services/"],
  ["Service Areas", "/locations/"],
  ["Rental Calculator", "/rental-calculator/"],
  ["About Us", "/about-us/"],
  ["Contact Us", "/contact-us/"],
];
const locationPrefix = "/equipment-rental/mobile-kitchen-trailers/";
export const isLocationPagePath = (path: string) =>
  path.startsWith(locationPrefix) && path !== locationPrefix;
function Button({
  children = "Plan your project",
  href = "/contact-us/",
  secondary = false,
}: {
  children?: React.ReactNode;
  href?: string;
  secondary?: boolean;
}) {
  return (
    <a className={"button" + (secondary ? " secondary" : "")} href={href}>
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
export function Header({ path }: { path: string }) {
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <div className="header-sticky header-refresh mobile-kitchen-home-header">
        <header className="header wrap">
          <a className="brand" href="/" aria-label="Temporary Kitchen Rental home">
            <img
              src="/temporary-kitchen-rental-logo.svg"
              width="760"
              height="180"
              alt="Temporary Kitchen Rental"
            />
          </a>
          <nav aria-label="Main navigation">
            <a href="/" aria-current={path === "/" ? "page" : undefined}>
              Home
            </a>
            <details className="services-nav">
              <summary
                className="services-trigger"
                role="button"
                aria-controls="services-panel"
                aria-current={
                  path.startsWith("/equipment-rental/") ? "page" : undefined
                }
              >
                Inventory <span aria-hidden="true">⌄</span>
              </summary>
              <div
                id="services-panel"
                className="services-panel"
                role="group"
                aria-label="Equipment rental inventory menu"
              >
                <div className="services-panel-heading">
                  <div>
                    <span>Commercial kitchen rentals</span>
                    <strong>
                      Mobile kitchens and temporary facility equipment
                    </strong>
                  </div>
                  <a href="/equipment-rental/">View All Equipment ↗</a>
                </div>
                <div className="services-panel-body">
                  <div className="service-category-list">
                    {inventoryNavigationCategories.map((category, index) => (
                      <details
                        className="service-category"
                        name="service-category"
                        open={index === 0}
                        key={category.name}
                      >
                        <summary
                          className="service-category-link"
                          role="button"
                        >
                          {category.name} <span aria-hidden="true">›</span>
                        </summary>
                        <section
                          className="service-submenu"
                          aria-label={`${category.name} models`}
                        >
                          <div className="service-submenu-heading">
                            <div>
                              <span>Available configurations</span>
                              <strong>{category.name}</strong>
                            </div>
                            <a href={category.href}>Category Overview ↗</a>
                          </div>
                          <p>{category.description}</p>
                          <div className="service-submenu-links">
                            {category.links.map((link) => (
                              <a href={link.href} key={link.href}>
                                {link.name} <span aria-hidden="true">↗</span>
                              </a>
                            ))}
                          </div>
                        </section>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </details>
            {nav.map(([n, p]) => (
              <a
                href={p}
                key={p}
                aria-current={path === p ? "page" : undefined}
              >
                {n}
              </a>
            ))}
          </nav>
          <a className="header-contact" href={"tel:" + site.phoneE164}>
            <svg
              className="header-phone-icon"
              viewBox="0 0 24 24"
              width="23"
              height="23"
              aria-hidden="true"
            >
              <path
                d="M21 16.5v3a1.5 1.5 0 0 1-1.7 1.5A18.4 18.4 0 0 1 3 4.7 1.5 1.5 0 0 1 4.5 3h3a1.5 1.5 0 0 1 1.5 1.3c.1.9.4 1.8.7 2.6a1.5 1.5 0 0 1-.3 1.6L8.1 9.8a15 15 0 0 0 6.1 6.1l1.3-1.3a1.5 1.5 0 0 1 1.6-.3c.8.3 1.7.6 2.6.7a1.5 1.5 0 0 1 1.3 1.5Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Call our team, 24/7</span>
            <strong>{site.phoneDisplay}</strong>
          </a>
          <details className="mobile-nav">
            <summary>
              Menu <span aria-hidden="true">☰</span>
            </summary>
            <nav aria-label="Mobile navigation">
              <a href="/" aria-current={path === "/" ? "page" : undefined}>
                Home
              </a>
              <details className="mobile-services">
                <summary>
                  Inventory <span aria-hidden="true">+</span>
                </summary>
                <div>
                  <a href="/equipment-rental/">View All Equipment</a>
                  {inventoryNavigationCategories.map((category) => (
                    <details
                      className="mobile-service-category"
                      key={category.name}
                    >
                      <summary>
                        {category.name} <span aria-hidden="true">+</span>
                      </summary>
                      <div>
                        <a href={category.href}>View Category</a>
                        {category.links.map((link) => (
                          <a href={link.href} key={link.href}>
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </details>
              {nav.map(([n, p]) => (
                <a
                  href={p}
                  key={p}
                  aria-current={path === p ? "page" : undefined}
                >
                  {n}
                </a>
              ))}
            </nav>
          </details>
        </header>
        <div className="scroll-progress" aria-hidden="true" />
      </div>
      <a
        className="mobile-call mobile-call-refresh"
        href={"tel:" + site.phoneE164}
      >
        <span>Call our team, 24/7</span>
        <strong>{site.phoneDisplay}</strong>
        <svg
          className="mobile-phone-icon"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          aria-hidden="true"
        >
          <path
            d="M21 16.5v3a1.5 1.5 0 0 1-1.7 1.5A18.4 18.4 0 0 1 3 4.7 1.5 1.5 0 0 1 4.5 3h3a1.5 1.5 0 0 1 1.5 1.3c.1.9.4 1.8.7 2.6a1.5 1.5 0 0 1-.3 1.6L8.1 9.8a15 15 0 0 0 6.1 6.1l1.3-1.3a1.5 1.5 0 0 1 1.6-.3c.8.3 1.7.6 2.6.7a1.5 1.5 0 0 1 1.3 1.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
      <aside
        className="emergency-dispatch"
        data-emergency-dispatch
        aria-label="Emergency rental support"
      >
        <button
          className="emergency-dispatch-trigger"
          type="button"
          data-emergency-open
          aria-expanded="false"
          aria-controls="emergency-dispatch-panel"
        >
          <span className="emergency-dispatch-signal" aria-hidden="true">
            <i />
          </span>
          <span>
            <small>24/7 rental help</small>
            <strong>Call us</strong>
          </span>
        </button>
        <section
          id="emergency-dispatch-panel"
          className="emergency-dispatch-panel"
          data-emergency-panel
          aria-hidden="true"
          aria-labelledby="emergency-dispatch-title"
          aria-modal="false"
          role="dialog"
        >
          <button
            className="emergency-dispatch-close"
            type="button"
            data-emergency-close
            aria-label="Minimize emergency dispatch"
          >
            ×
          </button>
          <span className="emergency-dispatch-kicker">
            Urgent rental support
          </span>
          <h2 id="emergency-dispatch-title">Need equipment urgently?</h2>
          <p>
            Call our 24/7 rental line or send your site details so our team can
            check equipment and delivery availability.
          </p>
          <div className="emergency-dispatch-actions">
            <a
              className="emergency-dispatch-call"
              href={"tel:" + site.phoneE164}
            >
              Call {site.phoneDisplay} <span aria-hidden="true">↗</span>
            </a>
            <a
              className="emergency-dispatch-request"
              href="/contact-us/?priority=urgent"
              data-emergency-request
            >
              Check urgent availability
            </a>
          </div>
          <small>
            Final availability and arrival timing require team confirmation.
          </small>
        </section>
      </aside>
      <a
        className="contact-rail contact-rail-refresh"
        href="/contact-us/"
        aria-label="Contact Temporary Kitchen Rental rental support now"
        aria-controls="contact-drawer"
        aria-expanded="false"
        aria-current={path === "/contact-us/" ? "page" : undefined}
      >
        <span className="contact-rail-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M5 5h14v11H9l-4 3V5Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="contact-rail-copy">
          <small>Need equipment?</small>
          <strong>Talk to us</strong>
        </span>
      </a>
    </>
  );
}

function ContactDrawer() {
  return (
    <dialog
      id="contact-drawer"
      className="contact-drawer"
      aria-labelledby="contact-drawer-title"
    >
      <div className="contact-drawer-shell">
        <div className="contact-drawer-call">
          <span>Temporary Kitchen Rental project desk</span>
          <button
            type="button"
            data-close-contact
            aria-label="Close contact form"
          >
            ×
          </button>
        </div>
        <header className="contact-drawer-header">
          <span className="contact-drawer-kicker">Project coordination</span>
          <h2 id="contact-drawer-title">Request availability</h2>
          <p>
            Share the equipment, location, and timing your operation needs. We
            will review the request without promising inventory or arrival time.
          </p>
          <div
            className="contact-drawer-actions"
            aria-label="Project desk options"
          >
            <button type="button" data-focus-availability>
              Request availability
            </button>
            <a href={"tel:" + site.phoneE164}>
              Call now <span>{site.phoneDisplay}</span>
            </a>
          </div>
        </header>
        <div className="contact-drawer-scroll">
          <div
            id="quote-island"
            data-quote-island
            aria-label="Availability request form"
          >
            <QuoteForm />
          </div>
        </div>
      </div>
    </dialog>
  );
}

export function Footer({ showClosing = true }: { showClosing?: boolean }) {
  return (
    <>
      {showClosing && (
        <section className="closing">
          <div className="wrap closing-grid">
            <div>
              <span className="eyebrow">LET’S GET YOUR PROJECT MOVING</span>
              <h2>
                One call.
                <br />A clearer plan.
              </h2>
            </div>
            <div>
              <p>
                Tell us where, when, and what your team needs. Our specialists
                will help you take the next step.
              </p>
              <a className="phone-link" href={"tel:" + site.phoneE164}>
                {site.phoneDisplay} ↗
              </a>
              <span className="small">Call our team, 24 hours a day.</span>
            </div>
          </div>
        </section>
      )}
      <footer className="wrap footer">
        <div>
          <a className="wordmark" href="/">Temporary Kitchen Rental</a>
          <p>Commercial kitchen rentals for the work ahead.</p>
          <small>© {new Date().getFullYear()} Temporary Kitchen Rental</small>
        </div>
        <div>
          <strong>Explore</strong>
          <a href="/equipment-rental/">Services</a>
          <a href="/services/">Project Solutions</a>
          <a href="/industries/">Industries Served</a>
          <a href="/locations/">Locations</a>
          <a href="/rental-calculator/">Rental Calculator</a>
          <a href="/government/">Government Services</a>
          <a href="/gsa-schedule/">Government purchasing information</a>
          <strong>Additional rentals</strong>
          <a href="/equipment-rental/breakroom-trailer/">Breakroom trailers</a>
          <a href="/equipment-rental/bunkhouse-trailers/">Bunkhouse trailers</a>
          <a href="/equipment-rental/fencing-barricades-trash-receptacles/">Fencing and site supplies</a>
          <a href="/equipment-rental/generator-trailers/">Generator trailers</a>
          <a href="/equipment-rental/modular-buildings/">Modular facilities</a>
          <a href="/blog/">Resources</a>
        </div>
        <div>
          <strong>Get in touch</strong>
          <a href="/contact-us/">Contact Us</a>
          <a href="/planning/">Project Planning</a>
          <a href="/privacy/">Privacy</a>
        </div>
        <a className="back-top" href="#top">
          Back to top ↑
        </a>
      </footer>
    </>
  );
}

function TargetLegacyPage({ route }: { route: TargetRoute }) {
  const label = route.location?.city
    ? `${route.location.city}, ${route.location.state}`
    : route.location?.state;
  const restroomReferencePath: Record<string, string> = {
    "/12ft-restroom/": "/services/restroom-trailers/12ft/",
    "/14ft-restroom/": "/services/restroom-trailers/14ft/",
    "/20ft-restroom/": "/services/restroom-trailers/20ft/",
    "/30ft-restroom/": "/services/restroom-trailers/30ft/",
  };
  const restroomSourcePath = restroomReferencePath[route.path];
  const restroomImages = restroomSourcePath
    ? imagesForServicePath(restroomSourcePath)
    : undefined;
  const combinationReferencePath: Record<string, string> = {
    "/12ft-restroom-shower-all-in-one-trailer/":
      "/services/shower-restroom-combination-trailers/13ft-3-stall/",
    "/14ft-restroom-shower-combo-trailer/":
      "/services/shower-restroom-combination-trailers/13ft-3-stall/",
    "/14ft-restroom-shower-combo-trailer-2/":
      "/services/shower-restroom-combination-trailers/13ft-3-stall/",
    "/20ft-restroom-shower-combo-trailer-rental/":
      "/services/shower-restroom-combination-trailers/22ft-6-stall/",
  };
  const combinationSourcePath = combinationReferencePath[route.path];
  const combinationImages = combinationSourcePath
    ? imagesForServicePath(combinationSourcePath)
    : undefined;
  const refrigeratedContainer =
    route.path === "/refrigeration-container-40ft-rental-5/"
      ? equipmentCatalogData.items.find(
          (item) => item.id === "refrigerated-containers",
        )
      : undefined;
  const refrigeratedPhoto = refrigeratedContainer
    ? catalogPhotoCoverage(refrigeratedContainer)
    : undefined;
  const productCopy = legacyProductPageCopy[route.path];
  const legacyFallback = {
    intro: `This page covers ${route.title.toLowerCase()}. Confirm the available model's exact configuration, transport dimensions, and site requirements from its current equipment documentation before planning delivery.`,
    sectionTitle: `Review ${route.title.toLowerCase()} for your project`,
    summary: `Use the verified equipment sheet for ${route.title.toLowerCase()} to confirm the details the page title alone does not establish, including the actual layout and applicable site connections.`,
    checks: [],
    related: [],
  };
  const pageCopy = productCopy ?? legacyFallback;
  const regionalLocationDescription = route.location?.city
    ? cityDescription(
        cityServiceAreaFor(route.location.city, route.location.state),
        route.location.city,
        route.location.state,
      )
    : stateServiceAreaFor(route.location?.state || "")?.description;
  const reviewedStateCities = route.cities?.length
    ? reviewedCityPages.filter((city) => city.state === route.location?.state)
    : [];
  return (
    <section className="wrap section target-legacy-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <a href="/locations/">{route.location ? "Locations" : "Inventory"}</a>
      </nav>
      <div className="target-legacy-hero-grid">
        <div className="target-legacy-summary">
          <span className="eyebrow">
            {route.location ? "COMMERCIAL KITCHEN SERVICE AREA" : route.family}
          </span>
          <h1>{route.title}</h1>
          <p data-h1-intro>
            {regionalLocationDescription ||
              (label
                ? `${label}: plan a commercial mobile kitchen trailer rental. Share meal volume, operating schedule, project dates, site access, and utilities so the rental team can review a suitable configuration and delivery plan.`
                : pageCopy.intro)}
          </p>
          <div className="service-category-actions">
            <Button>Request rental availability</Button>
            <a className="model-call" href={`tel:${site.phoneE164}`}>
              {site.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="target-location-carousel">
          {route.location ? (
            <LocationImageCarousel
              headline={`${label} Commercial Mobile Kitchen Trailer Rental`}
            />
          ) : restroomImages?.length && restroomSourcePath ? (
            <ServiceHeroCarousel
              images={restroomImages}
              label={route.title}
              lightboxLabel={route.title}
              caption={equipmentGalleryCaption({
                equipmentName: route.title,
                modelId: restroomImages[0]?.model ?? null,
                family: restroomImages[0]?.family ?? "restroom-trailer",
                additionalDetail: servicePhotoCaption(restroomSourcePath),
              })}
            />
          ) : combinationImages?.length && combinationSourcePath ? (
            <ServiceHeroCarousel
              images={combinationImages}
              label={route.title}
              lightboxLabel={route.title}
              caption={equipmentGalleryCaption({
                equipmentName: route.title,
                modelId: combinationImages[0]?.model ?? null,
                family:
                  combinationImages[0]?.family ?? "restroom-shower-combination",
                additionalDetail: combinationSourcePath.includes("13ft-3-stall")
                  ? "These reference photos show a separate 13 ft, 3-stall shower and restroom combination trailer. They are supplied as a close-size service reference only; they do not establish the dimensions, stall count, floor plan or availability of the model named on this page. Confirm the exact configuration with your quote."
                  : "These reference photos show a separate 22 ft, 6-stall shower and restroom combination trailer. They are supplied as a close-size service reference only; they do not establish the dimensions, stall count, floor plan or availability of the model named on this page. Confirm the exact configuration with your quote.",
              })}
            />
          ) : refrigeratedPhoto?.images.length ? (
            <ServiceHeroCarousel
              images={refrigeratedPhoto.images}
              label={route.title}
              lightboxLabel={route.title}
              caption={refrigeratedPhoto.caption}
            />
          ) : (
            <LocationImageCarousel
              headline={route.title}
              captionForGroup={(group) =>
                equipmentGalleryCaption({
                  equipmentName: group.headline,
                  modelId: group.modelId,
                  family: group.family,
                })
              }
            />
          )}
        </div>
      </div>
      {route.cities?.length ? (
        <div className="target-city-directory">
          <h2>{route.location?.state}: Current Rental Location Guides</h2>
          <p>
            The location inventory includes{" "}
            {route.cities.length.toLocaleString()} named places. Open the
            current state guide for regional planning and the city guides that
            have completed editorial review.
          </p>
          <a href={statePath(route.location!.state)}>
            View the {route.location?.state} state rental guide
          </a>
          {reviewedStateCities.length ? (
            <ul>
              {reviewedStateCities.map((city) => (
                <li key={city.path}>
                  <a href={city.path}>{city.name} rental guide</a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
      <aside className="kitchen-project-guide">
        <span className="eyebrow">
          {label
            ? `KITCHEN RENTAL PLANNING · ${label.toUpperCase()}`
            : `${route.title.toUpperCase()} · MODEL PLANNING`}
        </span>
        <h2>
          {label
            ? `${label}: Kitchen Trailer Rental Planning`
            : pageCopy.sectionTitle}
        </h2>
        <p>
          {label
            ? `For the ${label} project, confirm the kitchen configuration, service schedule, meal volume, delivery access, and available site utilities before the rental team recommends a plan.`
            : pageCopy.summary}
        </p>
        {pageCopy.checks.length ? (
          <ul>
            {pageCopy.checks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>
        ) : null}
      </aside>
      {pageCopy.related.length ? (
        <nav
          className="target-city-directory target-related-models"
          aria-label="Related equipment models"
        >
          <h2>Compare related equipment listings</h2>
          <ul>
            {pageCopy.related.map(({ label: relatedLabel, href }) => (
              <li key={href}>
                <a href={href}>{relatedLabel}</a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </section>
  );
}

export function Site({
  path,
  page,
  catalog = [],
  serviceCatalog = [],
}: {
  path: string;
  page?: SourcePage;
  catalog?: { path: string; title: string }[];
  serviceCatalog?: { path: string; title: string }[];
}) {
  const requestedPath = path;
  const targetRoute = targetRouteByPath[requestedPath];
  path = targetRoute?.sourcePath || targetCoreAliases[requestedPath] || path;
  if (path === "/seo-dashboard/") return <SeoDashboard />;
  const contact = ["/contact/", "/contact-us/"].includes(path);
  const equipmentBrief = equipmentCatalogData.items.find(
    (item) => item.path === path,
  );
  const serviceCategory = serviceCategories.find((item) => item.href === path);
  const directoryParent = path.endsWith("/cities/") ? path.slice(0, -7) : "";
  const sourceHeadline = page
    ? commercialPageHeadline(requestedPath, page.title)
    : "";
  return (
    <div id="top">
      <Header path={requestedPath} />
      <ContactDrawer />
      <script src="/location-product-tabs.js" defer />
      <main id="main" tabIndex={-1}>
        {requestedPath === "/testinmonials/" ? (
          <section className="wrap section narrow">
            <span className="eyebrow">CUSTOMER EXPERIENCES</span>
            <h1>Temporary Kitchen Rental Customer Testimonials</h1>
            <p data-h1-intro>
              This preserved page is ready for owner-approved customer stories.
              Testimonials will only be published with verified attribution and
              permission.
            </p>
            <Button>Discuss your project</Button>
          </section>
        ) : targetRoute && !targetRoute.sourcePath ? (
          <TargetLegacyPage route={targetRoute} />
        ) : path === "/" ? (
          <Home />
        ) : path === "/rental-calculator/" ? (
          <RentalCalculator />
        ) : path === "/modular-kitchen-facilities/" ? (
          <section className="wrap section narrow">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/equipment-rental/">Services</a>
              <span>/</span>
              <span>Modular kitchen facilities</span>
            </nav>
            <span className="eyebrow">BUILDING-BASED FOOD SERVICE</span>
            <h1>Modular Kitchen Facility Rental</h1>
            <p data-h1-intro>
              Plan a temporary kitchen within a modular building footprint for
              commercial or institutional food service. Define the menu,
              expected meal volume, receiving and preparation flow, cooking
              line, dishwashing needs, storage, staffing and serving route
              before confirming a layout.
            </p>
            <h2>Plan the facility around the operation</h2>
            <p>
              Share site dimensions, delivery and installation access, the
              schedule for kitchen service, and the available electrical, fuel,
              potable-water, drainage and ventilation arrangements. The actual
              configuration, included equipment, setup responsibilities and
              availability must be reviewed for the project; this page does not
              promise a specific building size or utility package.
            </p>
            <p>
              A modular kitchen facility is building-based. If a towable unit
              better fits the site, compare our{" "}
              <a href="/equipment-rental/mobile-kitchen-trailers/">
                mobile kitchen trailer rental options
              </a>
              .
            </p>
            <p>
              Call Temporary Kitchen Rental at{" "}
              <a href={"tel:" + site.phoneE164}>{site.phoneDisplay}</a> to
              discuss the project requirements and next steps.
            </p>
          </section>
        ) : contact ? (
          <section className="wrap section contact-grid">
            <div>
              <span className="eyebrow">LET’S TALK ABOUT YOUR PROJECT</span>
              <h1>
                Start your mobile
                <br />
                kitchen rental.
              </h1>
              <p data-h1-intro>
                Start your facility rental request with the equipment you need,
                project address, rental dates and expected users. Share
                available utilities and delivery restrictions so the team can
                review the correct configuration and availability.
              </p>
              <a className="phone-link" href={"tel:" + site.phoneE164}>
                {site.phoneDisplay} ↗
              </a>
              <p>Specialist support available 24/7.</p>
            </div>
            <div>
              <div className="contact-call">
                <span className="eyebrow">SPEAK WITH A SPECIALIST</span>
                <h2>
                  Let’s work through
                  <br />
                  the details.
                </h2>
                <p>
                  For equipment availability, delivery arrangements and a
                  project quote, call our team.
                </p>
                <Button href={"tel:" + site.phoneE164}>
                  Call {site.phoneDisplay}
                </Button>
                <p className="small">
                  Have your project location and preferred dates ready.
                </p>
              </div>
              <div className="contact-project-brief">
                <h2>Prepare your project brief</h2>
                <div data-quote-island aria-label="Availability request form">
                  <QuoteForm />
                </div>
              </div>
            </div>
          </section>
        ) : industryGuideByPath[path] ? (
          <IndustryDetail path={path} />
        ) : statePageByPath[path] ? (
          <StateDetail name={statePageByPath[path]} />
        ) : cityPageByPath[path] ? (
          <CityDetail city={cityPageByPath[path]!} />
        ) : regionPageByPath[directoryParent] ? (
          <CityDirectoryPage guide={regionPageByPath[directoryParent]!} />
        ) : regionPageByPath[path] ? (
          <RegionDetail guide={regionPageByPath[path]!} />
        ) : path === "/service-areas/" ? (
          <>
            <section className="location-hero">
              <div className="wrap section location-hero-grid">
                <div className="location-hero-copy">
                  <nav className="breadcrumb" aria-label="Breadcrumb">
                    <a href="/">Home</a>
                    <span>/</span>
                    <span aria-current="page">Service Areas</span>
                  </nav>
                  <span className="eyebrow">NATIONWIDE SERVICE AREAS</span>
                  <h1>
                    Nationwide Commercial Mobile Kitchen Trailer Rental
                    Locations
                  </h1>
                  <p data-h1-intro>
                    Find Temporary Kitchen Rental service areas by state, then review
                    local rental planning, equipment options and site-access
                    considerations for your project.
                  </p>
                  <div className="location-stats" aria-label="Coverage summary">
                    <div>
                      <strong>50</strong>
                      <span>states served</span>
                    </div>
                    <div>
                      <strong>24/7</strong>
                      <span>project support</span>
                    </div>
                  </div>
                </div>
                <div
                  id="service-area-map"
                  className="location-hero-map"
                  aria-label="Explore service locations"
                >
                  <CoverageMap showDirectory={false} />
                </div>
              </div>
            </section>
            <section className="wrap section">
              <MapLocationDirectory />
            </section>
            <section
              className="wrap section state-planning"
              aria-labelledby="state-planning-title"
            >
              <div className="section-heading">
                <div>
                  <span className="eyebrow">PLAN FOR YOUR LOCATION</span>
                  <h2 id="state-planning-title">
                    A useful starting point
                    <br />
                    for each state.
                  </h2>
                </div>
                <p>
                  Choose your state for practical questions to bring to your
                  rental conversation. Availability and delivery arrangements
                  depend on your exact site and dates.
                </p>
              </div>
              <div className="state-planning-grid">
                <StateGuideCards />
              </div>
            </section>
            <section className="wrap section location-directory">
              <div className="location-directory-heading">
                <div>
                  <span className="eyebrow">FIND A SERVICE AREA</span>
                  <h2>Plan a rental for your location.</h2>
                </div>
                <p>
                  Explore kitchen configurations with your project location in
                  mind. Confirm the state, delivery address and transport
                  arrangements with our team before booking.
                </p>
              </div>
              <form
                className="location-planner"
                action="/equipment-rental/mobile-kitchen-trailers/"
                method="get"
              >
                <label className="search-label" htmlFor="project-location">
                  Project city and state
                </label>
                <div className="location-planner-controls">
                  <input
                    id="project-location"
                    name="location"
                    list="known-project-locations"
                    placeholder="Enter your project location"
                    maxLength={120}
                    required
                  />
                  <button className="button" type="submit">
                    Explore mobile kitchens <span aria-hidden="true">↗</span>
                  </button>
                </div>
                <datalist id="known-project-locations">
                  {consolidatedLocations.routes.map((row) => (
                    <option key={row.path} value={row.location} />
                  ))}
                </datalist>
              </form>
            </section>
          </>
        ) : path in modelDetails ? (
          <ServiceDetail
            path={path as keyof typeof modelDetails}
            catalogItem={equipmentBrief}
          />
        ) : serviceCategory ? (
          <section className="service-option-page">
            <div className="wrap section">
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <a href="/">Home</a>
                <span>/</span>
                <a href="/equipment-rental/">Services</a>
              </nav>
              <span className="eyebrow">TEMPORARY FACILITY RENTALS</span>
              <div className="service-category-heading">
                <div>
                  <h1>{rentalCategoryHeadline(serviceCategory.name)}</h1>
                  {path === consolidatedLocations.destination && (
                    <p
                      className="selected-project-location"
                      data-location-context
                      hidden
                    >
                      Your project location: <strong data-project-location />.
                      Include the state and full delivery address in your
                      inquiry so we can confirm the correct destination.
                    </p>
                  )}
                  <p data-h1-intro>
                    {alignedPageIntro(
                      path,
                      rentalCategoryHeadline(serviceCategory.name),
                      serviceCategory.description,
                    )}
                  </p>
                </div>
                <div className="service-category-actions">
                  <Button>Check availability</Button>
                  <a className="model-call" href={"tel:" + site.phoneE164}>
                    {site.phoneDisplay}
                  </a>
                </div>
              </div>
              <ApprovedEquipmentPhotoOptions category={serviceCategory.name} />
              <div className="service-category-cards">
                {serviceCategory.links.map((link, index) => (
                  <a href={link.href} key={link.href}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{link.name}</strong>
                    <p>
                      {modelDetails[link.href as keyof typeof modelDetails]
                        ?.intro ?? link.description}
                    </p>
                    <b aria-hidden="true">↗</b>
                  </a>
                ))}
              </div>
              {path === consolidatedLocations.destination && (
                <section
                  className="kitchen-project-guide"
                  aria-labelledby="kitchen-project-heading"
                >
                  <span className="eyebrow">PREPARE YOUR PROJECT BRIEF</span>
                  <h2 id="kitchen-project-heading">
                    Match the kitchen to the operation.
                  </h2>
                  <div className="kitchen-planning-grid">
                    <article>
                      <h3>Cooking and service</h3>
                      <p>
                        Describe the menu, meals per service and busiest
                        operating period. Identify which functions need
                        temporary space: preparation, cooking, refrigeration,
                        dishwashing or the full kitchen.
                      </p>
                    </article>
                    <article>
                      <h3>Site and connections</h3>
                      <p>
                        Bring site dimensions, delivery access and the available
                        power, potable-water and wastewater arrangements.
                        Equipment choice and placement should be reviewed
                        against those details.
                      </p>
                    </article>
                    <article>
                      <h3>Dates and continuity</h3>
                      <p>
                        Separate delivery and setup time from the date food
                        service must begin. For a renovation, explain how staff
                        and supplies will move between the temporary kitchen and
                        the serving area.
                      </p>
                    </article>
                  </div>
                  <p>
                    Availability, transport feasibility, setup responsibilities
                    and servicing are confirmed for the actual project. A
                    location selection is a starting point for that discussion.
                  </p>
                  <Button>Discuss your kitchen project</Button>
                </section>
              )}
            </div>
          </section>
        ) : equipmentBrief ? (
          <EquipmentBrief item={equipmentBrief} />
        ) : ["/services/", "/equipment-rental/", "/industries/"].includes(
            path,
          ) ? (
          <section className="wrap section">
            <span className="eyebrow">EQUIPMENT & PROJECT SOLUTIONS</span>
            <h1>{rentalHubHeadline(path)}</h1>
            <p className="directory-intro" data-h1-intro>
              {alignedPageIntro(path, rentalHubHeadline(path) || "")}
            </p>
            {path === "/industries/" ? (
              <div className="industry-briefs">
                {[
                  [
                    "Construction & workforce",
                    "Plan around the busiest shift",
                    "Share crew numbers, shift changes and whether workers stay on site. Meal production, washing and sleeping requirements should follow the actual working day.",
                    "/man-camps-for-rent/",
                  ],
                  [
                    "Food service & hospitality",
                    "Keep preparation and service connected",
                    "Identify the functions affected by the renovation: cooking, cold storage, dishwashing or the full kitchen. Map the route between temporary preparation and the existing serving area.",
                    "/food-services-2/",
                  ],
                  [
                    "Government & public services",
                    "Prepare the project requirements",
                    "Bring the operating brief, site access procedures and procurement requirements. Review available supplier documents and confirm which details apply to the proposed rental.",
                    "/government/",
                  ],
                  [
                    "Emergency & disaster response",
                    "Establish the immediate priorities",
                    "Provide the location, team size, access conditions and utilities known to be available. Separate the facilities needed first from those that can follow as the site develops.",
                    "/disaster-relief-man-camp-workforce-rentals/",
                  ],
                ].map(([name, title, text, href], index) => (
                  <article key={href}>
                    <span className="eyebrow">
                      {String(index + 1).padStart(2, "0")} / {name}
                    </span>
                    <h2>{title}</h2>
                    <p>{text}</p>
                    <a className="text-link" href={href}>
                      Explore {name.toLowerCase()}{" "}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </article>
                ))}
              </div>
            ) : (
              <Cards />
            )}
            {path === "/equipment-rental/" ? (
              <EquipmentCatalog />
            ) : (
              page && (
                <article
                  className="source-content"
                  dangerouslySetInnerHTML={{ __html: page.html }}
                />
              )
            )}
            {path === "/services/" && serviceCatalog.length > 0 && (
              <section
                className="service-library"
                aria-labelledby="service-library-heading"
              >
                <div className="service-library-heading">
                  <span className="eyebrow">SERVICE RESOURCE LIBRARY</span>
                  <h2 id="service-library-heading">
                    More ways to support
                    <br />
                    your operation.
                  </h2>
                  <p>
                    Browse specialized temporary facility, workforce, government
                    and emergency support pages from Temporary Kitchen Rental.
                  </p>
                </div>
                <details>
                  <summary>
                    Browse {serviceCatalog.length} additional services and
                    resources <span aria-hidden="true">+</span>
                  </summary>
                  <div className="service-library-links">
                    {serviceCatalog.map((item) => (
                      <a href={item.path} key={item.path}>
                        {item.title} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                </details>
              </section>
            )}
          </section>
        ) : path === "/planning/" ? (
          <section className="wrap section narrow">
            <span className="eyebrow">PROJECT PLANNING</span>
            <h1>
              Bring the essentials.
              <br />
              We’ll take it from there.
            </h1>
            <p data-h1-intro>
              Prepare your commercial kitchen project brief with meal volume,
              site address, available utilities, delivery access and rental
              dates. Review the details below before contacting the rental team.
            </p>
            {[
              [
                "Your operation",
                "What will the facilities support? Include occupancy, meal volume, operating hours and any special equipment needs.",
              ],
              [
                "Your location",
                "Share the site address, delivery access and known water, power and wastewater arrangements.",
              ],
              [
                "Your schedule",
                "Include your start date, expected rental duration and any installation or removal restrictions.",
              ],
            ].map(([t, d]) => (
              <details className="planning-detail" key={t} open>
                <summary>{t}</summary>
                <p>{d}</p>
              </details>
            ))}
            <Button />
          </section>
        ) : path === "/about-us/" ? (
          <div className="secondary-page about-refresh">
            <section className="about-hero" aria-labelledby="about-title">
              <div className="wrap section about-hero-grid">
                <div className="secondary-intro-copy">
                  <span className="eyebrow">ABOUT TEMPORARY KITCHEN RENTAL</span>
                  <h1 id="about-title">
                    Commercial kitchens built around the work.
                  </h1>
                  <p data-h1-intro>
                    Temporary Kitchen Rental helps project teams keep food service
                    operating through renovations, outages, emergencies and
                    planned maintenance. Kitchen capacity, site access,
                    utilities and rental timing are reviewed together.
                  </p>
                  <Button href="/contact-us/">Plan your project</Button>
                  <div className="about-intro-topics" aria-label="Our approach">
                    <span>Kitchen operations</span>
                    <span>Logistics</span>
                    <span>Site planning</span>
                  </div>
                </div>
                <aside className="about-summary" aria-label="Company approach">
                  <img
                    className="about-summary-photo"
                    src="/images/service-heroes/40ft-mobile-kitchen/01-960.webp"
                    srcSet="/images/service-heroes/40ft-mobile-kitchen/01-480.webp 480w, /images/service-heroes/40ft-mobile-kitchen/01-960.webp 960w"
                    sizes="(max-width: 760px) calc(100vw - 40px), 480px"
                    width="850"
                    height="650"
                    alt="Commercial cooking equipment and preparation space inside a Temporary Kitchen Rental trailer"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="about-summary-copy">
                    <span>What we coordinate</span>
                    <strong>Facilities, logistics and site requirements</strong>
                    <p>
                      Start with the project location, schedule, occupancy and
                      utilities. Our team helps identify the equipment and
                      support services needed for a workable deployment plan.
                    </p>
                  </div>
                </aside>
              </div>
            </section>
            <section className="wrap section about-capabilities">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">TEMPORARY FACILITY SERVICES</span>
                  <h2>
                    One source for
                    <br />
                    temporary kitchen operations.
                  </h2>
                </div>
                <p>
                  Match a kitchen, dishwashing and refrigeration plan to your
                  renovation, outage, emergency response or seasonal project.
                </p>
              </div>
              <div className="about-service-grid">
                {[
                  [
                    "Mobile kitchen and food service",
                    "Mobile kitchen trailer rentals, refrigeration trailers and temporary dining structures for planned or urgent food service operations.",
                    "/equipment-rental/mobile-kitchen-trailers/",
                  ],
                  [
                    "Dishwashing and warewashing",
                    "Dedicated dishwashing trailers support high-volume sanitation when an existing kitchen is offline or capacity needs to expand.",
                    "/portable-dishwashing-trailer-rental/",
                  ],
                  [
                    "Refrigeration and cold storage",
                    "Refrigeration trailers and containers help protect ingredients, prepared food and other temperature-sensitive supplies.",
                    "/refrigeration-trailer-20ft-rental-3/",
                  ],
                  [
                    "Project coordination",
                    "Our team reviews delivery access, utilities, meal volume, equipment needs and timing before confirming a rental plan.",
                    "/planning/",
                  ],
                ].map(([title, description, href], index) => (
                  <article key={title}>
                    <span className="secondary-card-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <a href={href}>Explore services ↗</a>
                  </article>
                ))}
              </div>
            </section>
            <section className="about-commitment">
              <div className="wrap section about-commitment-grid">
                <div>
                  <span className="eyebrow">A PRACTICAL PROJECT PROCESS</span>
                  <h2>
                    Plan the site before
                    <br />
                    equipment arrives.
                  </h2>
                </div>
                <div>
                  <p>
                    A reliable temporary facility starts with clear information.
                    We review access, available power, water and wastewater,
                    expected occupancy, operating hours and rental dates before
                    arrangements are finalized.
                  </p>
                  <p>
                    Government purchasing eligibility depends on current
                    documentation. Contact our team at{" "}
                    <a href={"tel:" + site.phoneE164}>{site.phoneDisplay}</a> to
                    discuss commercial, government or emergency project needs.
                  </p>
                </div>
              </div>
            </section>
          </div>
        ) : path === "/blog/" ? (
          <div className="secondary-page articles-refresh">
            <section className="blog-hero" aria-labelledby="articles-title">
              <div className="wrap section blog-intro-grid">
                <div className="secondary-intro-copy">
                  <span className="eyebrow">ARTICLES & PLANNING GUIDES</span>
                  <h1 id="articles-title">
                    Commercial kitchen planning guides.
                  </h1>
                  <p data-h1-intro>
                    Use these planning guides to prepare a commercial kitchen
                    rental brief. Each guide covers a specific subject: kitchen
                    workflow, temporary hygiene access or workforce
                    accommodation, with the capacity, utility and delivery
                    questions to resolve before booking.
                  </p>
                  <a className="secondary-inline-link" href="#planning-guides">
                    Browse planning guides <span aria-hidden="true">↓</span>
                  </a>
                </div>
                <nav
                  className="article-topics"
                  aria-label="Planning guide topics"
                >
                  <span>In this collection</span>
                  {[
                    ["01", "Mobile kitchens", "#kitchen-guide"],
                    ["02", "Hygiene facilities", "#hygiene-guide"],
                    ["03", "Remote workforce support", "#workforce-guide"],
                  ].map(([number, label, href]) => (
                    <a key={href} href={href}>
                      <small>{number}</small>
                      <strong>{label}</strong>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </nav>
              </div>
            </section>
            <section className="wrap section blog-content" id="planning-guides">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">PLANNING GUIDES</span>
                  <h2>
                    Start with the questions
                    <br />
                    that shape the site.
                  </h2>
                </div>
                <p>
                  These guides help project teams prepare useful details before
                  discussing availability, delivery and installation.
                </p>
              </div>
              <div className="blog-grid">
                <article id="kitchen-guide">
                  <img
                    className="article-guide-photo"
                    src="/images/service-heroes/40ft-mobile-kitchen/01-960.webp"
                    srcSet="/images/service-heroes/40ft-mobile-kitchen/01-480.webp 480w, /images/service-heroes/40ft-mobile-kitchen/01-960.webp 960w"
                    sizes="(max-width: 760px) calc(100vw - 40px), 380px"
                    width="850"
                    height="650"
                    alt="Cooking line inside a mobile kitchen trailer"
                    loading="lazy"
                    decoding="async"
                  />
                  <span>Mobile kitchens</span>
                  <h3>How to plan a mobile kitchen trailer rental</h3>
                  <p>
                    Estimate meal volume, service periods, menu requirements and
                    staffing. Then confirm power, potable water, wastewater,
                    ventilation clearance and delivery access at the site.
                  </p>
                  <a href="/equipment-rental/mobile-kitchen-trailers/">
                    Explore mobile kitchen trailers ↗
                  </a>
                </article>
                <article id="hygiene-guide">
                  <img
                    className="article-guide-photo"
                    src="/images/catalog-supplied/restroom-trailers/01-960.webp"
                    srcSet="/images/catalog-supplied/restroom-trailers/01-480.webp 480w, /images/catalog-supplied/restroom-trailers/01-960.webp 960w"
                    width="850"
                    height="650"
                    alt="Toilet and wall-mounted sink inside a commercial mobile restroom trailer"
                    loading="lazy"
                    decoding="async"
                  />
                  <span>Hygiene facilities</span>
                  <h3>Choosing restroom and shower trailers for a job site</h3>
                  <p>
                    Start with occupancy, shift schedules and accessibility
                    needs. Servicing frequency, water connections, wastewater
                    storage and placement affect the right restroom or shower
                    configuration.
                  </p>
                  <a href="/equipment-rental/restroom-trailers/">
                    Compare restroom trailers ↗
                  </a>
                </article>
                <article id="workforce-guide">
                  <img
                    className="article-guide-photo"
                    src="/images/catalog/mobile-sleep-trailers-960.webp"
                    srcSet="/images/catalog/mobile-sleep-trailers-480.webp 480w, /images/catalog/mobile-sleep-trailers-960.webp 960w"
                    sizes="(max-width: 760px) calc(100vw - 40px), 380px"
                    width="850"
                    height="650"
                    alt="White sleeper trailer with separate entrances and access steps"
                    loading="lazy"
                    decoding="async"
                  />
                  <span>Remote workforce support</span>
                  <h3>What a temporary base camp needs to operate well</h3>
                  <p>
                    Sleeping, dining, hygiene, office and recreation facilities
                    should follow crew size, shift patterns and site conditions.
                    A coordinated layout also improves access and daily
                    servicing.
                  </p>
                  <a href="/man-camps-for-rent/">
                    Explore base camp services ↗
                  </a>
                </article>
              </div>
            </section>
            <section className="blog-checklist">
              <div className="wrap section blog-checklist-grid">
                <div>
                  <span className="eyebrow">BEFORE YOU REQUEST A QUOTE</span>
                  <h2>Prepare a stronger project brief.</h2>
                </div>
                <ol>
                  <li>
                    <strong>Confirm the location</strong>
                    <span>
                      Share the delivery address and site access limits.
                    </span>
                  </li>
                  <li>
                    <strong>Define capacity</strong>
                    <span>
                      Include crew size, meal counts or expected users.
                    </span>
                  </li>
                  <li>
                    <strong>List available utilities</strong>
                    <span>Note power, water and wastewater connections.</span>
                  </li>
                  <li>
                    <strong>Set the schedule</strong>
                    <span>Provide delivery, operating and removal dates.</span>
                  </li>
                </ol>
              </div>
            </section>
          </div>
        ) : page ? (
          <section className="wrap section source-layout">
            <div>
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <a href="/">Home</a>
                <span>/</span>
                <a
                  href={
                    isLocationPagePath(path) ? "/service-areas/" : "/services/"
                  }
                >
                  {isLocationPagePath(path) ? "Service Areas" : "Services"}
                </a>
              </nav>
              <h1 className="page-title">{sourceHeadline}</h1>
              {alignedPageIntro(path, sourceHeadline) && (
                <p className="source-lead" data-h1-intro>
                  {alignedPageIntro(path, sourceHeadline)}
                </p>
              )}
              {path === "/gsa-schedule/" && (
                <aside
                  className="procurement-documents"
                  aria-label="Supplier documents"
                >
                  <h2>Supplier documents</h2>
                  <p>
                    Review the published documents and contact our team to
                    confirm current details for your procurement requirements.
                  </p>
                  <ul>
                    <li>
                      <a href="https://temporarykitchens123.com/wp-content/uploads/2023/02/EntityInformation.pdf">
                        Entity information (PDF)
                      </a>
                    </li>
                    <li>
                      <a href="https://temporarykitchens123.com/wp-content/uploads/2023/02/V9-tk123-CAPABILITY-STATEMENT-1.pdf">
                        Capability statement (PDF)
                      </a>
                    </li>
                  </ul>
                </aside>
              )}
              <article
                className="source-content"
                dangerouslySetInnerHTML={{ __html: page.html }}
              />
            </div>
            <aside className="source-aside">
              <span className="eyebrow">YOUR NEXT STEP</span>
              <h2>
                Let’s talk
                <br />
                kitchen operations.
              </h2>
              <p>Tell us your location, dates and equipment needs.</p>
              <Button href={"tel:" + site.phoneE164}>
                Call {site.phoneDisplay}
              </Button>
              <a href="/contact-us/">Contact our team ↗</a>
            </aside>
          </section>
        ) : path === "/privacy/" ? (
          <section className="wrap section narrow">
            <h1>Privacy</h1>
            <p data-h1-intro>
              Review the information on this page about using the Portable Food
              Bank website and contacting the business. For questions about
              information you provide during a rental inquiry, contact the team
              using the published telephone number.
            </p>
            <p>
              This version does not load advertising or analytics scripts. To
              discuss a project or ask about your information, please call our
              team.
            </p>
            <p>
              For questions about your information, contact Temporary Kitchen Rental
              at {site.phoneDisplay}.
            </p>
          </section>
        ) : (
          <section className="wrap section narrow">
            <span className="eyebrow">PAGE NOT FOUND</span>
            <h1>
              Let’s get you
              <br />
              back on track.
            </h1>
            <p>
              We couldn’t find this page. Explore our equipment or contact the
              team for help.
            </p>
            <Button href="/equipment-rental/">Explore equipment</Button>
          </section>
        )}
      </main>
      <Footer
        showClosing={
          !regionPageByPath[path] &&
          !regionPageByPath[directoryParent] &&
          !cityPageByPath[path] &&
          !statePageByPath[path] &&
          !industryGuideByPath[path]
        }
      />
    </div>
  );
}
