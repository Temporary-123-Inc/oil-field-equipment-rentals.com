import calculatorCities from "./calculatorCities.json" with { type: "json" };

export type TargetRoute = {
  path: string;
  title: string;
  family: string;
  sourcePath?: string;
  location?: { city?: string; state: string };
  cities?: string[];
};

const productRoutes: TargetRoute[] = [
  { path: "/12ft-restroom-shower-all-in-one-trailer/", title: "12 ft All-in-One Restroom and Shower Trailer Rental", family: "Restroom and shower trailers" },
  { path: "/12ft-restroom/", title: "12 ft Restroom Trailer Rental", family: "Restroom trailers" },
  { path: "/12ft-shower/", title: "12 ft Shower Trailer Rental", family: "Shower trailers" },
  { path: "/14ft-restroom-shower-combo-trailer-2/", title: "14 ft Restroom and Shower Combination Facility Rental", family: "Restroom and shower trailers" },
  { path: "/14ft-restroom-shower-combo-trailer/", title: "14 ft Restroom and Shower Combination Trailer Rental", family: "Restroom and shower trailers" },
  { path: "/14ft-restroom/", title: "14 ft Restroom Trailer Rental", family: "Restroom trailers" },
  { path: "/14ft-shower/", title: "14 ft Shower Trailer Rental", family: "Shower trailers" },
  { path: "/20ft-restroom-shower-combo-trailer-rental/", title: "20 ft Restroom and Shower Combination Trailer Rental", family: "Restroom and shower trailers" },
  { path: "/20ft-restroom/", title: "20 ft Restroom Trailer Rental", family: "Restroom trailers" },
  { path: "/20ft-shower/", title: "20 ft Shower Trailer Rental", family: "Shower trailers" },
  { path: "/24ft-laundry/", title: "24 ft Mobile Laundry Trailer Rental", family: "Laundry trailers" },
  { path: "/30ft-laundry/", title: "30 ft Mobile Laundry Trailer Rental", family: "Laundry trailers" },
  { path: "/30ft-restroom/", title: "30 ft Restroom Trailer Rental", family: "Restroom trailers" },
  { path: "/30ft-shower/", title: "30 ft Shower Trailer Rental", family: "Shower trailers" },
  { path: "/containerized-laundry-unit-rental/", title: "Containerized Laundry Unit Rental", family: "Containerized laundry" },
  { path: "/containerized-sleeper-rental-2/", title: "Containerized Sleeper Rental", family: "Containerized sleeper units" },
  { path: "/24ft-mobile/", title: "24 ft Mobile Kitchen Trailer Rental", family: "Mobile kitchens", sourcePath: "/services/mobile-kitchen-trailers/24ft/" },
  { path: "/26ft-mobile/", title: "26 ft Mobile Kitchen Trailer Rental", family: "Mobile kitchens", sourcePath: "/services/mobile-kitchen-trailers/26ft-bulk/" },
  { path: "/28ft-mobile/", title: "28 ft Mobile Kitchen Trailer Rental", family: "Mobile kitchens", sourcePath: "/services/mobile-kitchen-trailers/28ft/" },
  { path: "/40ft-mobile/", title: "40 ft Mobile Kitchen Trailer Rental", family: "Mobile kitchens", sourcePath: "/services/mobile-kitchen-trailers/40ft/" },
  { path: "/40ft-combo/", title: "40 ft Combination Mobile Kitchen Trailer Rental", family: "Mobile kitchens", sourcePath: "/services/mobile-kitchen-trailers/40ft-combination/" },
  { path: "/40ft-bulk-combo/", title: "40 ft Bulk Combination Mobile Kitchen Trailer Rental", family: "Mobile kitchens", sourcePath: "/services/mobile-kitchen-trailers/40ft-bulk-combination/" },
  { path: "/refrigeration-trailer-20ft-rental-3/", title: "20 ft Refrigeration Trailer Rental", family: "Refrigeration", sourcePath: "/equipment-rental/refrigeration/" },
  { path: "/refrigeration-container-40ft-rental-5/", title: "40 ft Refrigeration Container Rental", family: "Refrigeration" },
  { path: "/22ft-dishwashing-trailer-rental/", title: "22 ft Dishwashing Trailer Rental", family: "Dishwashing", sourcePath: "/services/dishwashing-trailers/22ft/" },
  { path: "/24ft-dishwashing-trailer-rental/", title: "24 ft Dishwashing Trailer Rental", family: "Dishwashing", sourcePath: "/services/dishwashing-trailers/24ft/" },
  { path: "/26ft-dishwashing-trailer-rental/", title: "26 ft Dishwashing Trailer Rental", family: "Dishwashing", sourcePath: "/services/dishwashing-trailers/26ft/" },
  { path: "/38ft-conveyor-dishwashing-trailer-rental/", title: "38 ft Conveyor Dishwashing Trailer Rental", family: "Dishwashing", sourcePath: "/services/dishwashing-trailers/38ft-conveyor/" },
];

const slug = (value: string) =>
  value.trim().toLowerCase().replace(/[’']/g, "").replace(/\s+/g, "-");

const locationRoutes: TargetRoute[] = Object.entries(calculatorCities).flatMap(
  ([state, cities]) => {
    const statePath = `/${slug(state)}/`;
    return [
      { path: statePath, title: `${state} Commercial Food Service Mobile Kitchen Trailer Rental`, family: "Mobile kitchens", location: { state }, cities: cities as string[] },
      ...(cities as string[]).map((city) => ({
        path: `${statePath}${slug(city)}/`,
        title: `${city}, ${state} Commercial Food Service Mobile Kitchen Trailer Rental`,
        family: "Mobile kitchens",
        location: { city, state },
      })),
    ];
  },
);

export const targetCoreAliases: Record<string, string> = {
  "/locations/": "/service-areas/",
  "/about-us-2/": "/about-us/",
  "/contact/": "/contact-us/",
};

export const targetRoutes = [...productRoutes, ...locationRoutes];
export const targetRouteByPath = Object.fromEntries(
  targetRoutes.map((route) => [route.path, route]),
) as Record<string, TargetRoute>;
