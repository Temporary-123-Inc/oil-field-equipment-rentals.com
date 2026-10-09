const commercialHeadlineOverrides: Record<string, string> = {
  "/26ft-military-bulk-kitchen/": "26 ft Military Bulk Kitchen Rental",
  "/2800-correctional-facilities-series/":
    "2800 Correctional Facility Kitchen Rental",
  "/2800-military-series/": "2800 Military Kitchen Facility Rental",
  "/4000-correctional-facilities-series/":
    "4000 Correctional Facility Kitchen Rental",
  "/4000-military-series/": "4000 Military Kitchen Facility Rental",
  "/40ft-military-bulk-kitchen/": "40 ft Military Bulk Kitchen Rental",
  "/4500-correctional-facilities-series/":
    "4500 Correctional Facility Kitchen Rental",
  "/4500-military-series/": "4500 Military Kitchen Facility Rental",
  "/government/correctional-facilities/":
    "Correctional Facility Mobile Kitchen Rental",
  "/government/hospitals/": "Hospital Temporary Commercial Kitchen Rental",
  "/government/military-kitchen/": "Military Commercial Kitchen Rental",
  "/hospitality/": "Hospitality Commercial Kitchen Rental",
  "/mobile-units-for-disaster-relief-special-events/":
    "Disaster Relief Temporary Facility Rental",
  "/shop/": "Temporary Commercial Kitchen Trailer Rental",
  "/temporary-man-camp-solutions/":
    "Temporary Man Camp Workforce Housing Rental",
  "/turnkey-man-camp-solutions/": "Turnkey Man Camp Workforce Housing Rental",
};

export const commercialPageHeadline = (path: string, fallback: string) =>
  commercialHeadlineOverrides[path] || fallback;
