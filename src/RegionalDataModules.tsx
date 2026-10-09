import {
  formatDollars,
  regionalPathForLabel,
  type RegionalServiceArea,
} from "./regionalSiteData";

type RegionalDataModulesProps = {
  data: RegionalServiceArea;
  locationLabel: string;
};

const sizeLabel = (value: string) => value.replace("_ft", " ft");

export function RegionalDataModules({
  data,
  locationLabel,
}: RegionalDataModulesProps) {
  const layout = data.page_layout_data;
  const prices = Object.entries(data.prices);
  const article = layout.related_incident_articles[0];

  return (
    <section
      className="wrap section regional-data-modules"
      aria-labelledby="regional-data-title"
    >
      <div className="regional-data-heading">
        <span className="eyebrow">PROJECT DATA</span>
        <h2 id="regional-data-title">
          {locationLabel}: Availability, delivery, and rental planning
        </h2>
        <p>
          Use the planning details below to scope a temporary kitchen request
          for the {data.representative_city} service area. Final configuration,
          route timing, and availability are confirmed by quote.
        </p>
      </div>

      <div className="regional-data-summary" aria-label="Regional rental summary">
        <article>
          <span>Availability</span>
          <strong>{layout.availability_label}</strong>
          <p>{data.availability_note}</p>
        </article>
        <article>
          <span>20 ft starting price</span>
          <strong>{formatDollars(layout.starting_price)}</strong>
          <p>{layout.starting_price_basis}.</p>
        </article>
        <article>
          <span>Planned delivery</span>
          <strong>{layout.delivery_time_range.display}</strong>
          <p>{layout.estimated_delivery_display}</p>
        </article>
        <article>
          <span>Operating hours</span>
          <strong>{layout.service_hours}</strong>
          <p>{layout.inventory_family}.</p>
        </article>
      </div>

      <div className="regional-data-grid">
        <section className="regional-data-panel regional-data-pricing">
          <span className="eyebrow">LOCATION-ADJUSTED STARTING ESTIMATES</span>
          <h3>Kitchen sizes and planning prices</h3>
          <p>
            These published starting estimates include the location adjustment
            in this record. The final quote depends on the project details.
          </p>
          <div className="regional-price-list">
            {prices.map(([size, price]) => (
              <div key={size}>
                <span>{sizeLabel(size)}</span>
                <strong>{formatDollars(price)}</strong>
              </div>
            ))}
          </div>
        </section>

        <aside className="regional-data-panel regional-data-delivery">
          <span className="eyebrow">DELIVERY PLANNING</span>
          <h3>Route and dispatch context</h3>
          <dl>
            <div>
              <dt>Planning distance</dt>
              <dd>{layout.delivery_distance.display}</dd>
            </div>
            <div>
              <dt>Nearest planning anchor</dt>
              <dd>{data.nearest_included_top_100_place}</dd>
            </div>
            <div>
              <dt>Dispatch order</dt>
              <dd>Site {String(data.site_dispatch_order).padStart(2, "0")}</dd>
            </div>
          </dl>
          <p>{data.site_dispatch_order_note}</p>
        </aside>
      </div>

      <div className="regional-data-grid regional-data-grid-secondary">
        <section className="regional-data-panel">
          <span className="eyebrow">RENTAL TERMS</span>
          <h3>What the quote confirms</h3>
          <ul className="regional-data-list">
            <li>{layout.rental_information.minimum_rental}</li>
            <li>{layout.rental_information.delivery_fee}</li>
            <li>{layout.rental_information.setup}</li>
            <li>{layout.rental_information.extensions}</li>
            <li>{layout.rental_information.long_term_rental}</li>
          </ul>
        </section>

        <section className="regional-data-panel">
          <span className="eyebrow">CONTINUE PLANNING</span>
          <h3>Related service areas</h3>
          <div className="regional-nearby-list">
            {data.nearby_service_area_data.map((nearby) => (
              <a
                href={regionalPathForLabel(nearby.regional_guide_location)}
                key={nearby.slug}
              >
                <span>{nearby.label}</span>
                <small>{nearby.regional_guide_location}</small>
              </a>
            ))}
          </div>
          {article ? (
            <div className="regional-incident-note">
              <span>Local planning reference</span>
              <a href={article.source_url} target="_blank" rel="external noreferrer">
                {article.title} ↗
              </a>
              <small>{article.date}</small>
            </div>
          ) : null}
        </section>
      </div>
    </section>
  );
}
