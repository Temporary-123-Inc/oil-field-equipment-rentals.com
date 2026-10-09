import { alignedLocationIntro } from "./alignedIntroductions";
import site from "../site.json" with { type: "json" };
import { nearbyCities, type CityPage } from "./cityDirectory";
import { cityEditorial } from "./cityEditorial";
import { regionCities } from "./regionCities";
import { cityRentalHeadline } from "./rentalHeadlines";
import { buildRegionSeasonalDemand } from "./seasonalDemand";
import { LocationImageCarousel } from "./LocationImageCarousel";
import { RegionalDataModules } from "./RegionalDataModules";
import { cityDescription, cityServiceAreaFor } from "./regionalSiteData";

const serviceLinks = [
  {
    label: "Commercial Mobile Kitchen Trailer Rental",
    href: "/equipment-rental/mobile-kitchen-trailers/",
  },
  {
    label: "Shower and Restroom Combination Trailer Rental",
    href: "/12ft-restroom-shower-all-in-one-trailer/",
  },
  {
    label: "22 ft 10-Stall Shower Trailer Rental",
    href: "/services/shower-trailers/22ft-10-stall/",
  },
  {
    label: "Sleeper and Bunk-Bed Trailer Rental",
    href: "/equipment-rental/mobile-sleep-trailers/",
  },
] as const;

const approvedCityHeadlines: Record<string, string> = {
  "5355365":
    "Port Angeles, Washington Commercial Food Service Mobile Kitchen Trailer Rental",
  "5370000":
    "Tacoma, Washington Workforce Camp Commercial Containerized Sleeper Facility Rental",
  "5351300":
    "Olympia, Washington Workforce Camp Shower and Restroom Combination Trailer Rental",
  "5363000":
    "Seattle, Washington Commercial Food Service Dishwashing Trailer Rental",
  "5363385":
    "Sequim, Washington Commercial Food Service Mobile Kitchen Trailer Rental",
};

export const cityHeadline = (city: CityPage): string =>
  approvedCityHeadlines[city.geoid] ||
  cityRentalHeadline(
    `${city.name}, ${city.state}`,
    cityEditorial[city.geoid]?.heading || "Temporary Facilities",
  );

export function CityDetail({ city }: { city: CityPage }) {
  const editorial = cityEditorial[city.geoid];
  if (!editorial)
    throw new Error(`City guide lacks reviewed local content: ${city.path}`);
  const nearby = nearbyCities(city, 4);
  const seasonal = buildRegionSeasonalDemand(
    city.state,
    city.region,
    city.regionIndex,
    regionCities(city.state, city.regionIndex),
  );
  const headline = cityHeadline(city);
  const location = `${city.name}, ${city.state}`;
  const regionalData = cityServiceAreaFor(city.name, city.state, city.region);
  return (
    <article className={`city-page city-layout-${Number(city.geoid) % 4}`}>
      <section className="city-hero">
        <div className="wrap city-hero-grid">
          <div className="city-hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/service-areas/">Service Areas</a>
              <span>/</span>
              <a href={city.statePath}>{city.state}</a>
              <span>/</span>
              <a href={city.regionPath}>{city.region}</a>
              <span>/</span>
              <span aria-current="page">{city.name}</span>
            </nav>
            <span className="eyebrow">CITY RENTAL GUIDE</span>
            <h1>{headline}</h1>
            <p className="city-lead" data-h1-intro>
              {regionalData
                ? cityDescription(regionalData, city.name, city.state)
                : alignedLocationIntro(headline, location)}
            </p>
            <div className="city-hero-actions">
              <span className="city-emergency">Emergency 24/7</span>
              <a className="button" href={`tel:${site.phoneE164}`}>
                Call the rental team {site.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="city-equipment-photo city-equipment-carousel">
            <LocationImageCarousel headline={headline} />
          </div>
        </div>
      </section>
      {regionalData ? (
        <RegionalDataModules data={regionalData} locationLabel={location} />
      ) : null}
      <section
        className="wrap city-section city-answer"
        aria-labelledby="city-answer-title"
      >
        <div>
          <span className="eyebrow">QUICK ANSWER</span>
          <h2 id="city-answer-title">
            {city.name}, {city.state}: Commercial Rental Options
          </h2>
          <p>{editorial.answer}</p>
        </div>
        <div>
          <ul className="city-service-list">
            {serviceLinks.map((service) => (
              <li key={service.href}>
                <a href={service.href}>
                  {city.geoid === "5355365" &&
                  service.href === "/services/shower-trailers/22ft-10-stall/"
                    ? `${location}: ${service.label} with individual rooms`
                    : `${location}: ${service.label}`}
                </a>
              </li>
            ))}
          </ul>
          <p className="city-supporting">
            {location}: supporting rentals include refrigerated trailers,
            dishwashing trailers, laundry trailers, restroom trailers and
            handwashing trailers.
          </p>
        </div>
      </section>
      <section
        className="wrap city-section city-local"
        aria-labelledby="city-local-title"
      >
        <div>
          <span className="eyebrow">LOCAL AND SEASONAL PLANNING</span>
          <h2 id="city-local-title">
            {city.name}, {city.state}: Rental Planning Conditions
          </h2>
          <p>{editorial.local}</p>
          <p>{editorial.seasonal}</p>
          <p className="city-planning-question">
            <strong>Ask before you rent:</strong> {editorial.question}
          </p>
        </div>
        <aside className="city-demand-card">
          <span>Estimated Seasonal Facility Demand Code</span>
          <strong>
            {seasonal.code} · {seasonal.label}
          </strong>
          <p>
            Applies to the {city.region} regional district, based on normal work
            seasons and regional risks. This is a planning estimate, not an
            official government risk rating.
          </p>
          <div className="city-sources">
            <a
              href={editorial.sourceUrl}
              rel="external noreferrer"
              target="_blank"
            >
              {editorial.sourceTitle} ↗
            </a>
            <a
              href={editorial.seasonalSourceUrl}
              rel="external noreferrer"
              target="_blank"
            >
              {editorial.seasonalSourceTitle} ↗
            </a>
            <a
              href="https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html"
              rel="external noreferrer"
              target="_blank"
            >
              Census place reference ↗
            </a>
          </div>
        </aside>
      </section>
      <nav
        className="wrap city-section city-related"
        aria-label="Nearby rental locations"
      >
        <div>
          <span className="eyebrow">CONTINUE EXPLORING</span>
          <h2>Nearby rental locations</h2>
          <p>
            Explore the {city.region} planning directory. The exact site address
            determines the delivery discussion.
          </p>
        </div>
        <div className="city-related-links">
          {nearby.map((other) => (
            <a href={other.path} key={other.geoid}>
              {other.name}
            </a>
          ))}
          <a href={`${city.regionPath}cities/`}>All {city.region} cities</a>
          <a href={city.regionPath}>{city.region} rental guide</a>
          <a href={city.statePath}>All {city.state} travel regions</a>
        </div>
      </nav>
    </article>
  );
}
