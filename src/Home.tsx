import site from "../site.json" with { type: "json" };
import { FacilityIcon } from "./FacilityIcon";
import { CoverageMap } from "./CoverageMap";
import { CalculatorWorkspace } from "./RentalCalculator";

const kitchenModels = [
  {
    name: "24 ft Mobile Kitchen",
    path: "/24ft-mobile/",
    image: "/images/service-heroes/24ft-mobile-kitchen/01-960.webp",
    text: "A compact commercial kitchen trailer for temporary meal production.",
  },
  {
    name: "28 ft Mobile Kitchen",
    path: "/28ft-mobile/",
    image: "/images/service-heroes/28ft-mobile-kitchen/01-960.webp",
    text: "More working room for preparation, cooking, and service flow.",
  },
  {
    name: "40 ft Mobile Kitchen",
    path: "/40ft-mobile/",
    image: "/images/service-heroes/40ft-mobile-kitchen/01-960.webp",
    text: "Expanded production space for higher-volume food-service operations.",
  },
  {
    name: "40 ft Combination Kitchen",
    path: "/40ft-combo/",
    image: "/images/service-heroes/40ft-combination-kitchen/01-960.webp",
    text: "A combined kitchen configuration for connected food-service workflows.",
  },
  {
    name: "40 ft Bulk Combination Kitchen",
    path: "/40ft-bulk-combo/",
    image: "/images/service-heroes/40ft-bulk-combination-kitchen/01-960.webp",
    text: "A bulk-production option for demanding temporary feeding programs.",
  },
  {
    name: "Modular Kitchen Facilities",
    path: "/modular-kitchen-facilities/",
    image: "/images/catalog/mobile-kitchen-trailers-960.webp",
    text: "Building-based kitchen layouts planned around your operation and site.",
  },
];

const supportingRentalFamilies = [
  {
    name: "Mobile shower trailer rentals",
    path: "/equipment-rental/#family-shower-trailers",
    text: "Private shower capacity for workforce, institutional, and emergency projects.",
    icon: "shower",
  },
  {
    name: "Shower/restroom trailer rentals",
    path: "/equipment-rental/#family-restroom-and-shower-combination",
    text: "Combined hygiene facilities for projects that need both functions at one site.",
    icon: "shower",
  },
  {
    name: "Workforce housing unit rentals",
    path: "/containerized-sleeper-rental-2/",
    text: "Man camp and temporary workforce accommodation planned around the actual unit.",
    icon: "living",
  },
  {
    name: "Refrigeration/freezer trailer rentals",
    path: "/refrigeration-trailer-20ft-rental-3/",
    text: "Temporary cold storage with the operating mode confirmed for the selected unit.",
    icon: "cold",
  },
  {
    name: "Dishwashing facility rentals",
    path: "/portable-dishwashing-trailer-rental/",
    text: "Dedicated sanitation capacity for temporary and expanded food-service operations.",
    icon: "kitchen",
  },
];

const steps = [
  {
    icon: "phone",
    number: "01",
    title: "Tell us what you need",
    text: "Share your location, schedule, menu, and estimated meal volume.",
  },
  {
    icon: "kitchen",
    number: "02",
    title: "Match the right kitchen",
    text: "Review the kitchen size, supporting equipment, utilities, and site access.",
  },
  {
    icon: "truck",
    number: "03",
    title: "Coordinate delivery",
    text: "Confirm availability, delivery details, setup scope, and ongoing support.",
  },
];

const industries = [
  [
    "Healthcare",
    "Maintain meal service during renovations, planned maintenance, or temporary capacity needs.",
  ],
  [
    "Education",
    "Support campus, district, and institutional food-service continuity.",
  ],
  [
    "Government & Military",
    "Plan temporary kitchen capacity around operational and site requirements.",
  ],
  [
    "Industrial & Commercial",
    "Keep workforce and commercial meal programs moving through disruption or growth.",
  ],
];

const faqs = [
  [
    "What information do you need for a kitchen rental quote?",
    "Start with the project location, dates, expected rental duration, menu, meal volume, and any known site or utility restrictions.",
  ],
  [
    "Can dishwashing and refrigeration be added?",
    "Yes. Mobile dishwashing and refrigeration equipment can be discussed with the kitchen so the full food-service workflow is planned together.",
  ],
  [
    "What site details should I check?",
    "Confirm vehicle access, placement space, and available power, water, and wastewater connections. Final requirements depend on the selected equipment.",
  ],
  [
    "Can you help with an urgent kitchen requirement?",
    `Call ${site.phoneDisplay} and explain the situation. Our team is available 24/7 to discuss current availability and delivery coordination.`,
  ],
];

export function Home() {
  return (
    <div className="homepage">
      <section className="mk-hero pfb-hero" aria-labelledby="rental-title">
        <div className="pfb-hero-grid-lines" aria-hidden="true" />
        <div className="wrap pfb-hero-grid">
          <div className="pfb-hero-copy">
            <span className="mk-kicker">Commercial kitchens · Nationwide</span>
            <h1 id="rental-title">
              Temporary Commercial Mobile Kitchen Facility Rentals Nationwide
            </h1>
            <p data-h1-intro>
              <span data-intro-primary>
                Temporary Kitchen Rental provides temporary commercial mobile kitchen
                trailer and modular facility rentals nationwide for hospitals,
                schools, military and government sites, industrial facilities,
                and other commercial operations. These facilities help teams
                maintain food service while permanent kitchens are offline
                during renovations, planned maintenance, emergency response, or
                added-capacity projects. Each kitchen plan considers the cooking
                line, prep flow, equipment needs, utilities, site access, and
                delivery logistics.
              </span>{" "}
              <span data-intro-support>
                Supporting rentals include temporary dishwashing facilities,
                refrigeration/freezer trailers, mobile shower trailers,
                shower/restroom trailer combinations, and man-camp/workforce
                housing units.
              </span>
            </p>
            <strong className="mk-tagline">
              Fast deployment. Code-compliant solutions. Available nationwide.
            </strong>
            <div className="mk-hero-actions">
              <a className="mk-button mk-button-dark" href="/equipment-rental/">
                View Rental Equipment <span aria-hidden="true">→</span>
              </a>
              <a className="mk-button mk-button-light" href="/contact-us/">
                Request a Quote <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="pfb-hero-visual" aria-hidden="true">
            <div className="pfb-hero-image-card">
              <img
                className="pfb-hero-image"
                src="/images/service-heroes/28ft-mobile-kitchen/03-960.webp"
                alt=""
                width="960"
                height="1280"
                fetchPriority="high"
              />
              <span className="pfb-hero-image-accent" />
            </div>
            <div className="pfb-hero-index">
              <span>01</span>
              <i />
              <span>Nationwide deployment</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mk-portfolio" aria-labelledby="portfolio-title">
        <div className="wrap">
          <div className="mk-portfolio-heading">
            <span className="mk-eyebrow">Temporary rental equipment</span>
            <h2 id="portfolio-title">
              One rental team for the whole operation.
            </h2>
            <p>
              Start with the primary mobile-kitchen family, then add verified
              supporting facilities for hygiene, housing, cold storage, and
              sanitation as the project requires.
            </p>
          </div>
          <div
            className="mk-portfolio-grid"
            aria-label="Rental equipment families"
          >
            <a
              className="mk-family-card mk-family-primary"
              href="/equipment-rental/mobile-kitchen-trailers/"
              data-portfolio-share="80"
            >
              <img
                src="/images/service-heroes/40ft-mobile-kitchen/01-960.webp"
                alt="Commercial cooking line inside a 40 ft mobile kitchen rental"
                width="960"
                height="1280"
                loading="lazy"
              />
              <FacilityIcon kind="kitchen" />
              <span className="mk-family-copy">
                <small>Primary rental family</small>
                <strong>Commercial mobile kitchens</strong>
                <span>
                  Trailer and modular kitchen options for temporary food-service
                  continuity.
                </span>
              </span>
              <b aria-hidden="true">↗</b>
            </a>
            <div className="mk-supporting-families" data-portfolio-share="20">
              {supportingRentalFamilies.map((family) => (
                <a
                  className="mk-family-card"
                  href={family.path}
                  key={family.name}
                >
                  <FacilityIcon kind={family.icon} />
                  <span>
                    <strong>{family.name}</strong>
                    <span>{family.text}</span>
                  </span>
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="mk-trust-bar"
        aria-label="Temporary Kitchen Rental service benefits"
      >
        <div className="wrap">
          {[
            [
              "truck",
              "Nationwide coordination",
              "Delivery planned around your site",
            ],
            [
              "kitchen",
              "Commercial equipment",
              "Kitchen-first rental solutions",
            ],
            ["phone", "24/7 rental support", "A real team ready to talk"],
          ].map(([icon, title, text]) => (
            <div key={title}>
              <FacilityIcon kind={icon} />
              <span>
                <strong>{title}</strong>
                <small>{text}</small>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section
        className="wrap mk-models"
        id="equipment"
        aria-labelledby="equipment-title"
      >
        <div className="mk-section-heading">
          <div>
            <span className="mk-eyebrow">Mobile kitchen models</span>
            <h2 id="equipment-title">
              A commercial kitchen sized for the work ahead.
            </h2>
          </div>
          <div>
            <p>
              Compare mobile and modular kitchen options, then confirm the
              cooking line, preparation space, utilities, and delivery footprint
              for your project.
            </p>
            <a href="/equipment-rental/mobile-kitchen-trailers/">
              View all kitchen models →
            </a>
          </div>
        </div>
        <div className="mk-model-grid">
          {kitchenModels.map((model, index) => (
            <article className="mk-model-card" key={model.path}>
              <a
                href={model.path}
                className="mk-model-image"
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  src={model.image}
                  alt=""
                  width="960"
                  height="720"
                  loading="lazy"
                />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </a>
              <div>
                <h3>
                  <a href={model.path}>{model.name}</a>
                </h3>
                <p>{model.text}</p>
                <a
                  className="mk-card-link"
                  href={model.path}
                  aria-label={`Explore ${model.name}`}
                >
                  Explore this model <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mk-support" aria-labelledby="support-title">
        <div className="wrap mk-support-grid">
          <div className="mk-support-copy">
            <span className="mk-eyebrow">Complete the operation</span>
            <h2 id="support-title">More than cooking space.</h2>
            <p>
              Add dedicated dishwashing and refrigerated storage when your
              temporary food-service plan requires a connected workflow.
            </p>
            <a className="mk-button mk-button-orange" href="/equipment-rental/">
              Explore supporting equipment <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="mk-support-links">
            <a href="/22ft-dishwashing-trailer-rental/">
              <span>
                <small>Food sanitation</small>
                <strong>Dishwashing trailers</strong>
              </span>
              <b aria-hidden="true">↗</b>
            </a>
            <a href="/refrigeration-trailer-20ft-rental-3/">
              <span>
                <small>Cold storage</small>
                <strong>Refrigeration trailers</strong>
              </span>
              <b aria-hidden="true">↗</b>
            </a>
          </div>
        </div>
      </section>

      <CalculatorWorkspace homepage />

      <section
        className="wrap mk-industries"
        aria-labelledby="industries-title"
      >
        <div className="mk-section-heading">
          <div>
            <span className="mk-eyebrow">Industries we serve</span>
            <h2 id="industries-title">
              Keep food service moving when the permanent kitchen cannot.
            </h2>
          </div>
          <p>
            Temporary kitchens planned for renovations, emergency response,
            planned maintenance, disaster recovery, and added production
            capacity.
          </p>
        </div>
        <div className="mk-industry-grid">
          {industries.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="mk-process"
        id="planning"
        aria-labelledby="planning-title"
      >
        <div className="wrap">
          <div className="mk-section-heading">
            <div>
              <span className="mk-eyebrow">How it works</span>
              <h2 id="planning-title">
                From first call to a workable kitchen plan.
              </h2>
            </div>
            <p>
              One conversation connects the equipment, site, and delivery
              details.
            </p>
          </div>
          <ol>
            {steps.map((step) => (
              <li key={step.number}>
                <span className="mk-step-icon">
                  <FacilityIcon kind={step.icon} />
                </span>
                <b>{step.number}</b>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <a className="mk-process-call" href={`tel:${site.phoneE164}`}>
            <FacilityIcon kind="phone" /> Call {site.phoneDisplay}{" "}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section
        className="wrap mk-coverage"
        id="service-area-map"
        aria-labelledby="home-coverage-title"
      >
        <div className="mk-section-heading">
          <div>
            <span className="mk-eyebrow">Nationwide service areas</span>
            <h2 id="home-coverage-title">
              Your area: find commercial mobile kitchen trailer rentals.
            </h2>
          </div>
          <p>
            Choose your state to explore regional rental guides, or{" "}
            <a href="/locations/">browse all locations</a>. Availability and
            delivery are confirmed for each project.
          </p>
        </div>
        <CoverageMap compact />
      </section>

      <section className="mk-faq" aria-labelledby="faq-title">
        <div className="wrap mk-faq-grid">
          <div>
            <span className="mk-eyebrow">Frequently asked questions</span>
            <h2 id="faq-title">Start with the practical details.</h2>
            <p>
              Have a specific requirement?{" "}
              <a href="/contact-us/">Talk to a rental specialist →</a>
            </p>
          </div>
          <div>
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
