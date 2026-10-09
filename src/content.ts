import site from "../site.json" with { type: "json" };
export const services = [
  { slug: "mobile-kitchens", name: "Mobile kitchens" },
  { slug: "dishwashing", name: "Dishwashing" },
  { slug: "refrigeration", name: "Refrigeration" },
];
export const routes = [
  "/",
  "/services/",
  "/equipment-rental/",
  "/industries/",
  "/locations/",
  "/rental-calculator/",
  "/planning/",
  "/about-us-2/",
  "/blog/",
  "/contact-us/",
  "/privacy/",
];
const titles: Record<string, string> = {
  "/": "Temporary Commercial Mobile Kitchen Facility Rentals Nationwide",
  "/services/": "Commercial Kitchen and Support Equipment Rentals",
  "/equipment-rental/": "Mobile Kitchen Rental Inventory",
  "/industries/": "Industries & Project Solutions",
  "/locations/": "Mobile Kitchen Rental Locations Across the USA and Canada",
  "/service-areas/": "Nationwide Commercial Mobile Kitchen Rental Locations",
  "/seo-dashboard/": "SEO Migration Dashboard",
  "/rental-calculator/":
    "Nationwide Mobile Kitchen Rental and Delivery Calculator",
  "/planning/": "Plan Your Temporary Commercial Kitchen",
  "/about-us/": "About Temporary Kitchen Rental",
  "/about-us-2/": "About Our Nationwide Rental Coordination",
  "/blog/": "Articles on Temporary Commercial Kitchen Planning",
  "/contact/": "Contact Temporary Kitchen Rental",
  "/contact-us/": "Contact Our Team",
  "/gsa-schedule/": "GSA Schedule Information for Government Rentals",
  "/testinmonials/": "Mobile Kitchen Rental Client Testimonials",
  "/privacy/": "Privacy",
};
const descriptions: Record<string, string> = {
  "/": "Temporary commercial mobile kitchen trailer and modular facility rentals nationwide for hospitals, schools, military, government, industrial and commercial operations.",
  "/equipment-rental/":
    "Browse mobile kitchens, dishwashing and refrigeration trailers. Discuss your site and dates with Temporary Kitchen Rental.",
  "/services/":
    "Plan commercial kitchen equipment, site access, utilities and delivery. Talk through your project requirements with the Temporary Kitchen Rental team.",
  "/industries/":
    "Explore temporary commercial kitchen support for healthcare, education, government, food service and emergency response projects.",
  "/locations/":
    "Explore Temporary Kitchen Rental rental locations across the USA and Canada, then confirm equipment availability and delivery for the project address.",
  "/service-areas/":
    "Browse Temporary Kitchen Rental state, regional and reviewed city rental guides across the United States.",
  "/seo-dashboard/":
    "Owner-facing Temporary Kitchen Rental migration dashboard for crawl health, city landing pages, protected URLs, and controlled SEO release readiness.",
  "/rental-calculator/":
    "Calculate published starting prices for nationwide mobile kitchen rental and trailer delivery, then contact Temporary Kitchen Rental for a project-specific quote.",
  "/planning/":
    "Prepare your commercial kitchen project brief with site access, utilities, meal volume and rental dates before you call Temporary Kitchen Rental.",
  "/about-us/":
    "Learn how Temporary Kitchen Rental coordinates commercial kitchen trailers and supporting equipment rentals nationwide.",
  "/about-us-2/":
    "Learn about Temporary Kitchen Rental and its nationwide coordination of temporary commercial kitchens and project support equipment.",
  "/blog/":
    "Read practical guides for mobile kitchen trailer rentals, dishwashing, refrigeration, utilities, delivery and site planning.",
  "/contact-us/":
    "Call Temporary Kitchen Rental at +1 (888) 563-6507, available 24/7. Discuss equipment availability, your project location, rental dates and delivery requirements.",
  "/contact/":
    "Contact Temporary Kitchen Rental by phone to discuss temporary kitchen equipment, site requirements, delivery timing and rental availability.",
  "/gsa-schedule/":
    "No verified Temporary Kitchen Rental GSA Schedule contract details are published here. Government buyers can request current supplier documents and verify purchasing eligibility directly.",
  "/testinmonials/":
    "Read client feedback about Temporary Kitchen Rental temporary kitchen planning, equipment coordination and project support.",
  "/privacy/":
    "Read how the Temporary Kitchen Rental website handles visitor information and contact the team with questions about your information.",
};
export function pageInfo(path: string) {
  return {
    title: `${titles[path] || "Page not found"} | ${site.brand}`,
    description:
      descriptions[path] ||
      "Find the right commercial kitchen solution for your project. Explore Temporary Kitchen Rental equipment or call +1 (888) 563-6507 for help.",
  };
}
