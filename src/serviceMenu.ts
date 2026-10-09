import modelDetails from "../content/service-details.json" with { type: "json" };

export type ServiceLink = { name: string; href: string; description?: string };
export type ServiceCategory = {
  name: string;
  href: string;
  description: string;
  links: ServiceLink[];
};

// Each product family below is linked to a verified original Temporary Kitchen Rental
// URL. Keep exact historical slugs visible rather than replacing them with a
// legacy source path or a generic category redirect.
export const serviceCategories: ServiceCategory[] = [
  {
    name: "Mobile Kitchens",
    href: "/equipment-rental/mobile-kitchen-trailers/",
    description:
      "Compare verified mobile kitchen trailer configurations for commercial food-service continuity, renovation projects, and temporary operations. Review the listed sizes and layouts, then confirm the actual unit, utilities, access, dates, and availability for your site.",
    links: [
      { name: "24 ft Mobile Kitchen Trailer", href: "/24ft-mobile/" },
      { name: "26 ft Bulk Mobile Kitchen", href: "/26ft-mobile/" },
      { name: "28 ft Mobile Kitchen Trailer", href: "/28ft-mobile/" },
      {
        name: "38 ft Mobile Kitchen Trailer",
        href: "/services/mobile-kitchen-trailers/38ft/",
      },
      { name: "40 ft Mobile Kitchen Trailer", href: "/40ft-mobile/" },
      { name: "40 ft Combination Mobile Kitchen", href: "/40ft-combo/" },
      {
        name: "40 ft Bulk Combination Mobile Kitchen",
        href: "/40ft-bulk-combo/",
      },
    ],
  },
  {
    name: "Dishwashing",
    href: "/portable-dishwashing-trailer-rental/",
    description:
      "Portable dishwashing facilities for high-volume sanitation and food-service support.",
    links: [
      {
        name: "22 ft Dishwashing Trailer",
        href: "/22ft-dishwashing-trailer-rental/",
      },
      {
        name: "24 ft Dishwashing Trailer",
        href: "/24ft-dishwashing-trailer-rental/",
      },
      {
        name: "26 ft Dishwashing Trailer",
        href: "/26ft-dishwashing-trailer-rental/",
      },
      {
        name: "38 ft Conveyor Dishwashing Trailer",
        href: "/38ft-conveyor-dishwashing-trailer-rental/",
      },
    ],
  },
  {
    name: "Refrigeration",
    href: "/refrigeration-trailer-20ft-rental-3/",
    description:
      "Temporary cold storage for ingredients, prepared food, and temperature-sensitive supplies.",
    links: [
      {
        name: "20 ft Refrigeration Trailer",
        href: "/refrigeration-trailer-20ft-rental-3/",
      },
      {
        name: "40 ft Refrigerated Container",
        href: "/refrigeration-container-40ft-rental-5/",
      },
      {
        name: "Refrigerated Container Options",
        href: "/equipment-rental/refrigerated-containers/",
      },
    ],
  },
  {
    name: "Restroom Trailers",
    href: "/12ft-restroom/",
    description:
      "Temporary restroom trailer rentals for commercial, institutional, and project-site operations.",
    links: [
      { name: "12 ft Restroom Trailer", href: "/12ft-restroom/" },
      { name: "14 ft Restroom Trailer", href: "/14ft-restroom/" },
      { name: "20 ft Restroom Trailer", href: "/20ft-restroom/" },
      { name: "30 ft Restroom Trailer", href: "/30ft-restroom/" },
    ],
  },
  {
    name: "Shower Trailers",
    href: "/12ft-shower/",
    description:
      "Temporary shower trailer rentals for workforce, institutional, and emergency projects.",
    links: [
      { name: "12 ft Shower Trailer", href: "/12ft-shower/" },
      { name: "14 ft Shower Trailer", href: "/14ft-shower/" },
      { name: "20 ft Shower Trailer", href: "/20ft-shower/" },
      { name: "30 ft Shower Trailer", href: "/30ft-shower/" },
      {
        name: "22 ft Shower Trailer, 10 Stalls",
        href: "/services/shower-trailers/22ft-10-stall/",
      },
    ],
  },
  {
    name: "Restroom & Shower Combination",
    href: "/services/shower-restroom-combination-trailers/",
    description:
      "Temporary combined restroom and shower facilities for projects that need both functions at one site.",
    links: [
      {
        name: "12 ft All-in-One Restroom and Shower Trailer",
        href: "/12ft-restroom-shower-all-in-one-trailer/",
      },
      {
        name: "14 ft Restroom and Shower Combination Trailer",
        href: "/14ft-restroom-shower-combo-trailer/",
      },
      {
        name: "14 ft Restroom and Shower Combination Facility",
        href: "/14ft-restroom-shower-combo-trailer-2/",
      },
      {
        name: "20 ft Restroom and Shower Combination Trailer",
        href: "/20ft-restroom-shower-combo-trailer-rental/",
      },
      {
        name: "30 ft Shower and Restroom Combination Trailer, 8 Stalls",
        href: "/services/shower-restroom-combination-trailers/30ft-8-stall/",
      },
    ],
  },
  {
    name: "Laundry",
    href: "/24ft-laundry/",
    description:
      "Temporary mobile and containerized laundry rentals for operational continuity and remote projects.",
    links: [
      { name: "24 ft Mobile Laundry Trailer", href: "/24ft-laundry/" },
      { name: "30 ft Mobile Laundry Trailer", href: "/30ft-laundry/" },
      {
        name: "Containerized Laundry Unit",
        href: "/containerized-laundry-unit-rental/",
      },
    ],
  },
  {
    name: "Containerized Sleeper Units",
    href: "/containerized-sleeper-rental-2/",
    description:
      "Containerized sleeper rentals for temporary workforce accommodation planning.",
    links: [
      {
        name: "Containerized Sleeper Unit",
        href: "/containerized-sleeper-rental-2/",
      },
    ],
  },
];

// Temporarily keep public inventory routes with no rendered gallery out of
// the header dropdowns. Their direct URLs and full inventory-directory links
// remain available. Remove a path from this set once its page has an approved
// image or the owner supplies a protected backlink URL for it.
export const inventoryNavigationPhotoHolds = new Set([
  "/12ft-shower/",
  "/14ft-shower/",
  "/30ft-shower/",
]);

// Only the header navigation uses this filtered copy. Keep serviceCategories
// unfiltered for the full inventory directory, recommendations and routes.
export const inventoryNavigationCategories = serviceCategories.map(
  (category): ServiceCategory => {
    const links = category.links.filter(
      (link) => !inventoryNavigationPhotoHolds.has(link.href),
    );
    const overviewSections: Readonly<Record<string, string>> = {
      Dishwashing: "family-dishwashing",
      "Shower Trailers": "family-shower-trailers",
      "Restroom & Shower Combination": "family-restroom-and-shower-combination",
    };
    const href = overviewSections[category.name]
      ? `/equipment-rental/#${overviewSections[category.name]}`
      : inventoryNavigationPhotoHolds.has(category.href)
        ? (links[0]?.href ?? category.href)
        : category.href;
    return { ...category, href, links };
  },
);

export const serviceOptions = serviceCategories.flatMap((category) =>
  category.links.map((link) => ({
    ...link,
    category: category.name,
    categoryHref: category.href,
    categoryDescription: category.description,
    description:
      modelDetails[link.href as keyof typeof modelDetails]?.intro ||
      `${link.name} rental planning from Temporary Kitchen Rental.`,
  })),
);

export type ServiceOption = (typeof serviceOptions)[number];
