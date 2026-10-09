import {
  alignedLocationIntro,
  locationRentalPlanningAnswer,
} from "./alignedIntroductions";
import { equipmentSet } from "./equipmentPhotos";
import { statePath } from "./statePaths";
import site from "../site.json" with { type: "json" };
import { stateGuides } from "./stateGuides";
import { regionCities } from "./regionCities";
import { citiesForRegion, hasCityGuide } from "./cityDirectory";
import {
  buildRegionSeasonalDemand,
  type SeasonalDemand,
} from "./seasonalDemand";
import { regionLocationLabel, regionRentalHeadline } from "./rentalHeadlines";
import { LocationImageCarousel } from "./LocationImageCarousel";
import { RegionalDataModules } from "./RegionalDataModules";
import {
  regionDescription,
  regionalServiceAreaFor,
  type RegionalServiceArea,
} from "./regionalSiteData";

export const regionSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const regionPath = (state: string, region: string) =>
  `/service-areas/${regionSlug(state)}/${regionSlug(region)}/`;

type ContextualLink = {
  href: string;
  label: string;
  context: string;
};

const priorityServices = [
  {
    href: "/equipment-rental/mobile-kitchen-trailers/",
    labels: [
      "Commercial Mobile Kitchen Trailer Rental",
      "Commercial Kitchen Facility Rental",
      "Mobile Kitchen Trailer Lease",
    ],
  },
  {
    href: "/12ft-restroom-shower-all-in-one-trailer/",
    labels: [
      "Shower and Restroom Combination Trailer Rental",
      "Temporary Shower and Restroom Facility Rental",
      "Combination Hygiene Trailer Lease",
    ],
  },
  {
    href: "/services/shower-trailers/22ft-10-stall/",
    labels: [
      "22 ft 10-Stall Shower Trailer Rental",
      "10-Stall Shower Trailer Rental",
      "22 ft Temporary Shower Facility Rental",
    ],
  },
  {
    href: "/containerized-sleeper-rental-2/",
    labels: [
      "Containerized Sleeper Unit Rental",
      "Temporary Crew Accommodation Unit Lease",
      "Containerized Workforce Sleeper Rental",
    ],
  },
] as const;

const cityContexts = [
  "support construction and renovation crews.",
  "fit planned facility interruptions.",
  "support emergency base camp planning.",
  "serve remote and phased projects.",
  "follow local access and utility needs.",
  "support seasonal site operations.",
  "serve industrial and public projects.",
  "adapt to changing crew schedules.",
] as const;

const commercialIntentTemplates = [
  "Compare temporary facilities for rent, short-term rentals and longer equipment leasing plans.",
  "Temporary facility rental options include equipment for rent and longer lease arrangements.",
  "Project teams can request temporary facilities for rent, flexible rentals or longer leasing terms.",
  "Compare rentals for short assignments with temporary facility leasing and equipment for rent.",
  "A temporary facilities rental can combine equipment for rent with longer lease options.",
  "Rental planning covers temporary facilities for rent, available rentals and equipment leasing.",
] as const;

const buildCityLinks = (
  state: string,
  cities: string[],
  globalIndex: number,
  path: string,
): ContextualLink[] => {
  const selectedCities = [...new Set(cities)];
  return selectedCities.map((city, cityIndex) => {
    const service = priorityServices[(globalIndex + cityIndex) % 4];
    const label =
      service.labels[(globalIndex + cityIndex * 2) % service.labels.length];
    const cityGuide = citiesForRegion(path).find(
      (entry) => entry.name.toLowerCase() === city.toLowerCase(),
    );
    return {
      href:
        cityGuide && hasCityGuide(cityGuide)
          ? cityGuide.path
          : `${service.href}?location=${encodeURIComponent(`${city}, ${state}`)}`,
      label:
        cityGuide && hasCityGuide(cityGuide)
          ? `${city}, ${state} rental guide`
          : `${city}, ${state}: ${label}`,
      context:
        cityContexts[(globalIndex * 3 + cityIndex) % cityContexts.length],
    };
  });
};

const buildServiceLinks = (
  globalIndex: number,
  location: string,
): ContextualLink[] =>
  priorityServices.map((service, serviceIndex) => ({
    href: service.href,
    label: `${location}: ${service.labels[(globalIndex + serviceIndex) % service.labels.length]}`,
    context: [
      "for temporary meal production.",
      "for coordinated daily hygiene.",
      "for dedicated shower capacity.",
      "for base camps and man camps.",
    ][serviceIndex],
  }));

const introTemplates = [
  (state: string, region: string) =>
    `${region}, ${state}: match temporary facility rental planning to site access, occupancy and schedule. Mobile kitchens, shower/restroom combinations and sleeper trailers can support remote project operations.`,
  (state: string, region: string) =>
    `${region}, ${state}: match temporary facility rental planning to food service, hygiene and crew support. Compare short-term rental options with a longer lease, then confirm access and utilities for the exact site.`,
  (state: string, region: string) =>
    `${region}, ${state}: compare rental facilities before mobilization. Planning can cover commercial kitchen trailers, 22 ft 10-stall shower trailers, combination units and sleeper trailers for short or extended assignments.`,
  (state: string, region: string) =>
    `${region}, ${state}: use a temporary facilities rental plan to support construction, renovation or remote work. Review the site route, equipment footprint and servicing plan before choosing a rental or lease arrangement.`,
  (state: string, region: string) =>
    `${region}, ${state}: a coordinated temporary facility rental can support the next phase. Discuss kitchen capacity, shower/restroom combinations, sleeper trailers and delivery sequence with our team.`,
  (state: string, region: string) =>
    `${region}, ${state}: a clear rental brief should name the work area, crew size and operating dates. Compare mobile kitchen, hygiene and sleeper trailer options for a short-term rental or longer lease.`,
] as const;

const formatCityList = (cities: string[]) => {
  if (cities.length < 2) return cities[0] || "the surrounding area";
  if (cities.length === 2) return `${cities[0]} and ${cities[1]}`;
  return `${cities.slice(0, -1).join(", ")}, and ${cities.at(-1)}`;
};

const detailTemplates = [
  (state: string, region: string) =>
    `${region}, ${state}: start with local access. Share the nearest approach, turning space and service connections to plan safe placement of a temporary facility rental.`,
  (state: string, region: string) =>
    `For ${region} sites, match the facility mix to the people who use it each day. A rent or lease plan can combine food preparation, showers, restrooms and crew sleeping space without separating the servicing route.`,
  (state: string, region: string) =>
    `${region}, ${state}: work patterns may change between setup and peak operations. Confirm dates, occupancy and utilities before reserving temporary facilities for rental.`,
  (state: string, region: string) =>
    `A practical ${region} brief should show where deliveries arrive and where the temporary units will sit. That detail helps our team review a short-term rent or longer lease for the ${state} project.`,
  (state: string, region: string) =>
    `${region}, ${state}: keep kitchen, hygiene and sleeping routes easy to service. Discuss a temporary facility rental that fits the working footprint and project timeline.`,
  (state: string, region: string) =>
    `${region}, ${state}: confirm the receiving contact, ground conditions and return route before equipment moves. These details support a transparent temporary facility rental or lease plan.`,
] as const;

const factTemplates = [
  (state: string, region: string, fact: string) =>
    `${fact} This regional guide helps teams connect that state context with a ${region} rental plan.`,
  (state: string, region: string, fact: string) =>
    `${state}: ${fact} Include ${region} when requesting a temporary facility rental or lease.`,
  (state: string, region: string, fact: string) =>
    `${fact} The regional context is useful when arranging delivery for a ${region} temporary facilities rental.`,
  (state: string, region: string, fact: string) =>
    `${fact} Include ${region} in the project brief so the right rental and servicing discussion can begin.`,
] as const;

const regionStateEntries = Object.entries(stateGuides);

const buildRegionVisuals = (
  index: number,
  state: string,
  region: string,
  cities: string[],
) => equipmentSet(index);

export type RegionGuide = {
  state: string;
  region: string;
  path: string;
  index: number;
  layout: number;
  image: string;
  imageAlt: string;
  gallery: { image: string; imageAlt: string; caption: string }[];
  intro: string;
  detail: string;
  fact: string;
  cities: string[];
  cityLinks: ContextualLink[];
  serviceLinks: ContextualLink[];
  commercialSummary: string;
  seasonal: SeasonalDemand;
  regionalData?: RegionalServiceArea;
};

export const regionPages: RegionGuide[] = regionStateEntries.flatMap(
  ([state, guide], stateIndex) => {
    const stateOffset = regionStateEntries
      .slice(0, stateIndex)
      .reduce((total, [, item]) => total + item.regions.length, 0);
    return guide.regions.map((region, regionIndex) => {
      const index = regionIndex;
      const path = regionPath(state, region);
      const cities = regionCities(state, regionIndex);
      const visuals = buildRegionVisuals(
        stateOffset + regionIndex,
        state,
        region,
        cities,
      );
      const globalIndex = stateOffset + regionIndex;
      return {
        state,
        region,
        path,
        index,
        layout: (Object.keys(stateGuides).indexOf(state) + index) % 6,
        image: visuals[0].image,
        imageAlt: visuals[0].imageAlt,
        gallery: visuals.slice(1, 3),
        intro: introTemplates[index % introTemplates.length](state, region),
        detail: detailTemplates[index % detailTemplates.length](state, region),
        fact: factTemplates[index % factTemplates.length](
          state,
          region,
          guide.fact,
        ),
        cities,
        cityLinks: buildCityLinks(state, cities, globalIndex, path),
        serviceLinks: buildServiceLinks(
          globalIndex,
          regionLocationLabel(region, state),
        ),
        commercialSummary:
          commercialIntentTemplates[
            globalIndex % commercialIntentTemplates.length
          ],
        seasonal: buildRegionSeasonalDemand(state, region, regionIndex, cities),
        regionalData: regionalServiceAreaFor(state, region),
      };
    });
  },
);

export const regionPageByPath = Object.fromEntries(
  regionPages.map((page) => [page.path, page]),
) as Record<string, RegionGuide | undefined>;

const crossBorderRegionPaths: Record<string, string> = {
  "/service-areas/arizona/northern-arizona/":
    "/service-areas/utah/southwestern-utah/",
  "/service-areas/arizona/phoenix-area/":
    "/service-areas/nevada/las-vegas-valley/",
  "/service-areas/arizona/southern-arizona/":
    "/service-areas/new-mexico/southwest-new-mexico/",
  "/service-areas/delaware/northern-delaware/":
    "/service-areas/pennsylvania/philadelphia-and-southeast/",
  "/service-areas/delaware/central-delaware/":
    "/service-areas/maryland/eastern-shore/",
  "/service-areas/delaware/delaware-beaches/":
    "/service-areas/maryland/eastern-shore/",
  "/service-areas/indiana/northern-indiana/":
    "/service-areas/illinois/chicago-area/",
  "/service-areas/indiana/central-indiana/":
    "/service-areas/ohio/southwest-ohio/",
  "/service-areas/indiana/southern-indiana/":
    "/service-areas/kentucky/south-central-kentucky/",
};

export const relatedRegionPages = (guide: RegionGuide): RegionGuide[] => {
  const allStatePages = regionPages.filter(
    (page) => page.state === guide.state,
  );
  const position = allStatePages.findIndex((page) => page.path === guide.path);
  const orderedStatePages = [1, -1, 2]
    .map(
      (offset) =>
        allStatePages[
          (position + offset + allStatePages.length) % allStatePages.length
        ],
    )
    .filter((page): page is RegionGuide => page.path !== guide.path);
  const unique = [
    ...new Map(orderedStatePages.map((page) => [page.path, page])).values(),
  ];
  const crossBorder = regionPageByPath[crossBorderRegionPaths[guide.path]];
  if (unique.length < 3 && crossBorder) unique.push(crossBorder);
  for (const page of allStatePages) {
    if (unique.length >= 3) break;
    if (
      page.path !== guide.path &&
      !unique.some((candidate) => candidate.path === page.path)
    )
      unique.push(page);
  }
  return unique.slice(0, 3);
};

export function RegionDetail({ guide }: { guide: RegionGuide }) {
  const nearby = relatedRegionPages(guide);
  const headline = regionRentalHeadline(guide.region, guide.state, guide.index);
  const location = regionLocationLabel(guide.region, guide.state);
  const query = encodeURIComponent(
    `${guide.cities[0]}, ${guide.state}, United States`,
  );
  return (
    <article className={`region-page region-layout-${guide.layout}`}>
      <section className="region-hero">
        <div className="wrap section region-hero-grid">
          <div className="region-hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/service-areas/">Service Areas</a>
              <span>/</span>
              <a href={statePath(guide.state)}>{guide.state}</a>
              <span>/</span>
              <span aria-current="page">{guide.region}</span>
            </nav>
            <p className="eyebrow">REGIONAL RENTAL GUIDE</p>
            <h1>{headline}</h1>
            <p className="region-intro" data-h1-intro>
              {guide.regionalData
                ? regionDescription(guide.regionalData, guide.region, guide.state)
                : alignedLocationIntro(headline, location, guide.cities)}
            </p>
            <p className="region-emergency">Emergency 24/7</p>
            <a className="button" href={`tel:${site.phoneE164}`}>
              Call now {site.phoneDisplay}
            </a>
          </div>
          <div className="region-hero-visual region-hero-carousel">
            <LocationImageCarousel headline={headline} />
          </div>
        </div>
      </section>
      {guide.regionalData ? (
        <RegionalDataModules
          data={guide.regionalData}
          locationLabel={location}
        />
      ) : null}
      <section className="region-answer" aria-labelledby="region-faq-title">
        <div className="wrap section region-answer-card">
          <div className="region-answer-heading">
            <span className="eyebrow">QUICK ANSWER</span>
            <h2 id="region-faq-title">{location}: Commercial Rental Options</h2>
            <p data-rental-planning>
              {locationRentalPlanningAnswer(headline)
                ? `${location}: ${locationRentalPlanningAnswer(headline)}`
                : `${location}: Rent or lease temporary facilities for construction, man camps, renovations and emergency base camps. Confirm availability, occupancy and utilities with our rental team.`}
            </p>
          </div>
          <div className="region-answer-body">
            {locationRentalPlanningAnswer(headline) && (
              <p>Related rental options:</p>
            )}
            <ul className="region-service-links">
              {guide.serviceLinks.map((service) => (
                <li key={service.href}>
                  <a href={service.href}>{service.label}</a>
                </li>
              ))}
            </ul>
            <p className="supporting-rentals">
              {/\blaundry\b/i.test(headline)
                ? "Other supporting rentals: dishwashing, refrigeration, restrooms and handwashing trailers."
                : "Supporting rentals: dishwashing, refrigeration, restrooms, laundry and handwashing trailers."}
            </p>
          </div>
        </div>
      </section>
      <section
        className="wrap section region-city-links"
        aria-labelledby="region-cities-title"
      >
        <div className="region-section-heading">
          <div>
            <span className="eyebrow">CITIES WE SERVE</span>
            <h2 id="region-cities-title">{location}: Rental Locations</h2>
          </div>
          <p className="region-parent-state">
            Explore all rental regions in{" "}
            <a href={statePath(guide.state)}>{guide.state}</a>.
          </p>
        </div>
        <div className="region-city-link-grid">
          {guide.cityLinks.map((city) => (
            <p key={city.href}>
              <a href={city.href}>{city.label}</a>
            </p>
          ))}
        </div>
        <a className="region-city-directory-link" href={`${guide.path}cities/`}>
          {location}: Browse all {citiesForRegion(guide.path).length} rental
          locations ↗
        </a>
      </section>
      <section
        className="wrap section region-seasonal"
        aria-labelledby="region-seasonal-title"
      >
        <div className="region-seasonal-heading">
          <span className="eyebrow">LOCAL AND SEASONAL INFORMATION</span>
          <h2 id="region-seasonal-title">
            {location}: Rental Planning Conditions
          </h2>
        </div>
        <div className="region-seasonal-copy">
          <p>
            {location}: {stateGuides[guide.state].seasonal.summary[0]}
          </p>
          <p>
            {location}: {guide.seasonal.summary[1]}
          </p>
          <p>
            {location}: plan temporary facility rentals for construction
            seasons, camps, cleanup, kitchen fires, Health Department closures,
            equipment failures and renovations. Kitchen trailers, hygiene units
            and crew accommodation support the site while permanent facilities
            are unavailable.
          </p>
        </div>
        <aside className="region-demand-card">
          <span>Estimated seasonal facility demand</span>
          <strong>
            Code {guide.seasonal.code} · {guide.seasonal.label}
          </strong>
          <p>
            Applies to the {guide.region} regional district, based on normal
            seasonal work and regional weather risks. This is a planning
            estimate, not an official government risk rating.
          </p>
        </aside>
        <nav
          className="region-seasonal-sources"
          aria-label="Planning information sources"
        >
          <span>Planning references:</span>
          {guide.seasonal.sources.map((source) => (
            <a
              href={source.href}
              key={source.href}
              target="_blank"
              rel="external noreferrer"
            >
              {source.label}
            </a>
          ))}
        </nav>
      </section>
      <nav
        className="wrap section region-nearby"
        aria-label="Related travel regions"
      >
        <h2>{location}: Nearby Rental Regions</h2>
        <div className="region-nearby-links">
          {nearby.map((page) => (
            <p key={page.path}>
              <a href={page.path}>
                {page.region}, {page.state}
              </a>
            </p>
          ))}
        </div>
      </nav>
      <section className="region-map-strip" aria-labelledby="region-map-title">
        <div className="wrap region-map-grid">
          <div className="region-map-copy">
            <span className="eyebrow">REGIONAL COVERAGE</span>
            <h2 id="region-map-title">{guide.region} travel area</h2>
            <p>Review the route to your site with the rental team.</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${query}`}
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps
            </a>
          </div>
          <figure className="region-map-visual">
            <iframe
              src={`https://www.google.com/maps/?q=${query}&output=embed&z=7`}
              title={`Google Map near ${guide.cities[0]}, ${guide.state}`}
              width="960"
              height="280"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </figure>
        </div>
      </section>
    </article>
  );
}
