const locationSeed = (value: string) =>
  [...value].reduce(
    (seed, character) => (seed * 31 + character.charCodeAt(0)) >>> 0,
    7,
  );

const select = <T>(items: readonly T[], key: string) =>
  items[locationSeed(key) % items.length];

export const commercialUseCases = [
  "Emergency Basecamp",
  "Industrial Basecamp",
  "Institutional Facility",
  "Accessible Commercial Site",
  "Workforce Camp",
  "Construction Project",
  "Commercial Food Service",
  "Workforce Housing",
  "Remote Operations",
] as const;

export const locationEquipmentFamilies = [
  "Shower Trailer",
  "Shower and Restroom Combination Trailer",
  "ADA Shower and Restroom Combination Trailer",
  "Laundry Temporary Facilities",
  "Kitchen Emergency Trailer",
  "Commercial Kitchen Trailer",
  "Commercial Kitchen Modular Building",
  "Sleeper Bunk-Bed Facility",
  "Man Camp Temporary Facilities",
] as const;

export const locationRentalIntents = [
  "Rental",
  "For Rent",
  "Leasing",
  "Short-Term Rental",
  "Long-Term Rental",
] as const;

export type LocationHeadlineOption = {
  commercialUseCase: (typeof commercialUseCases)[number];
  equipmentFamily: (typeof locationEquipmentFamilies)[number];
  rentalIntent: (typeof locationRentalIntents)[number];
};

const locationHeadlineRotation: readonly LocationHeadlineOption[] = [
  {
    commercialUseCase: "Emergency Basecamp",
    equipmentFamily: "Shower Trailer",
    rentalIntent: "Rental",
  },
  {
    commercialUseCase: "Institutional Facility",
    equipmentFamily: "Shower and Restroom Combination Trailer",
    rentalIntent: "For Rent",
  },
  {
    commercialUseCase: "Accessible Commercial Site",
    equipmentFamily: "ADA Shower and Restroom Combination Trailer",
    rentalIntent: "Leasing",
  },
  {
    commercialUseCase: "Workforce Camp",
    equipmentFamily: "Laundry Temporary Facilities",
    rentalIntent: "Long-Term Rental",
  },
  {
    commercialUseCase: "Construction Project",
    equipmentFamily: "Kitchen Emergency Trailer",
    rentalIntent: "Rental",
  },
  {
    commercialUseCase: "Commercial Food Service",
    equipmentFamily: "Commercial Kitchen Modular Building",
    rentalIntent: "For Rent",
  },
  {
    commercialUseCase: "Workforce Housing",
    equipmentFamily: "Sleeper Bunk-Bed Facility",
    rentalIntent: "Leasing",
  },
  {
    commercialUseCase: "Remote Operations",
    equipmentFamily: "Man Camp Temporary Facilities",
    rentalIntent: "Rental",
  },
] as const;

const acceptedLocationHeadlineOptions: readonly LocationHeadlineOption[] = [
  ...locationHeadlineRotation,
  {
    commercialUseCase: "Industrial Basecamp",
    equipmentFamily: "Commercial Kitchen Trailer",
    rentalIntent: "Rental",
  },
  {
    commercialUseCase: "Industrial Basecamp",
    equipmentFamily: "Commercial Kitchen Modular Building",
    rentalIntent: "Rental",
  },
  {
    commercialUseCase: "Industrial Basecamp",
    equipmentFamily: "Shower Trailer",
    rentalIntent: "Rental",
  },
  {
    commercialUseCase: "Workforce Camp",
    equipmentFamily: "Shower Trailer",
    rentalIntent: "Short-Term Rental",
  },
] as const;

const approvedStateOptions: Record<string, LocationHeadlineOption> = {
  Alabama: locationHeadlineRotation[0],
  California: locationHeadlineRotation[1],
  Colorado: locationHeadlineRotation[4],
  Texas: locationHeadlineRotation[7],
};

export const buildLocationRentalHeadline = (
  location: string,
  option: LocationHeadlineOption,
) =>
  `${location} ${option.commercialUseCase} ${option.equipmentFamily} ${option.rentalIntent}`;

export const matchesLocationRentalHeadline = (
  headline: string,
  location: string,
) => {
  if (!headline.startsWith(`${location} `)) return false;
  const phrase = headline.slice(location.length + 1);
  return (
    /^(?:Commercial Food Service (?:Mobile Kitchen Trailer|Dishwashing Trailer|Refrigerated Trailer)|Workforce Camp (?:Commercial Restroom Trailer|Commercial Shower Trailer|Shower and Restroom Combination Trailer|Commercial Laundry Trailer|Commercial Containerized Sleeper Facility)) Rental$/.test(
      phrase,
    ) ||
    acceptedLocationHeadlineOptions.some(
    ({ commercialUseCase, equipmentFamily, rentalIntent }) =>
      phrase === `${commercialUseCase} ${equipmentFamily} ${rentalIntent}`,
    )
  );
};

export const regionLocationLabel = (region: string, state: string) =>
  region.toLowerCase() === state.toLowerCase() ||
  region.toLowerCase().endsWith(`, ${state.toLowerCase()}`) ||
  region.toLowerCase().endsWith(` ${state.toLowerCase()}`)
    ? region
    : `${region}, ${state}`;

export const stateRentalOption = (state: string): LocationHeadlineOption =>
  approvedStateOptions[state] || select(locationHeadlineRotation, state);

export const stateRentalHeadline = (state: string) =>
  buildLocationRentalHeadline(state, stateRentalOption(state));

/**
 * The interactive nationwide map is a Temporary Kitchen Rental sales surface, not
 * a catch-all temporary-facilities catalogue. Keep its gallery title specific
 * enough for the verified kitchen-photo resolver to select one real model.
 */
export const stateMapRentalHeadline = (state: string) =>
  `${state} Commercial Food Service Mobile Kitchen Trailer Rental`;

export const regionRentalHeadline = (
  region: string,
  state: string,
  _regionIndex: number,
) => {
  const location = regionLocationLabel(region, state);
  return `${location} Commercial Food Service Mobile Kitchen Trailer Rental`;
};

export const cityRentalHeadline = (location: string, service: string) => {
  const lowerService = service.toLowerCase();
  const focus = /dishwash|warewash/.test(lowerService)
    ? "Commercial Food Service Dishwashing Trailer Rental"
    : /refrigerat|cold storage/.test(lowerService)
      ? "Commercial Food Service Refrigerated Trailer Rental"
      : /laundry/.test(lowerService)
        ? "Workforce Camp Commercial Laundry Trailer Rental"
        : /combination|shower.*restroom|restroom.*shower/.test(lowerService)
          ? "Workforce Camp Shower and Restroom Combination Trailer Rental"
          : /restroom/.test(lowerService)
            ? "Workforce Camp Commercial Restroom Trailer Rental"
            : /shower/.test(lowerService)
              ? "Workforce Camp Commercial Shower Trailer Rental"
              : /container|sleep|bunk|accommodation/.test(lowerService)
                ? "Workforce Camp Commercial Containerized Sleeper Facility Rental"
                : "Commercial Food Service Mobile Kitchen Trailer Rental";
  return `${location} ${focus}`;
};

export const rentalProductHeadline = (name: string) => {
  if (/Combination Trailer/i.test(name)) {
    if (/ADA/i.test(name)) {
      const stalls = name.match(/(\d+) Stalls?/i)?.[1];
      if (stalls)
        return `${stalls}-Stall + 1 ADA Shower and Restroom Combination Trailer Rental`;
      return "ADA Shower and Restroom Combination Trailer Rental";
    }
    const size = name.match(/^(\d+)\s*ft/i)?.[1];
    const stalls = name.match(/(\d+) Stalls?/i)?.[1];
    if (size && stalls)
      return `${size} ft ${stalls}-Stall Shower and Restroom Combination Trailer Rental`;
    return "Shower and Restroom Combination Trailer Rental";
  }
  if (/^22 ft Shower Trailer, 10 Stalls$/i.test(name))
    return "22 ft 10-Stall Shower Trailer Rental";
  if (/^20 ft Shower Container, 5 Stalls$/i.test(name))
    return "20 ft 5-Stall Shower Container Rental";
  return /rental|lease/i.test(name) ? name : `${name} Rental`;
};

const categoryHeadlines: Record<string, string> = {
  "Mobile Kitchens": "Kitchen Trailer Rental",
  Dishwashing: "Dishwashing Trailer Rental",
  Refrigeration: "Refrigerated Trailer Rental",
  Shower: "Emergency Shower Trailer Rental",
  Restroom: "Restroom Trailer Rental",
  "Shower and Restroom Combination Trailers":
    "Shower and Restroom Combination Trailer Rental",
  Sleeper: "Sleeper Bunk-Bed Facility Rental",
  Laundry: "Laundry Trailer Rental",
  "Handwashing Trailers": "Portable Handwashing Trailer Rental",
};

export const rentalCategoryHeadline = (name: string) =>
  categoryHeadlines[name] || `${name} Facility Rental`;

const hubHeadlines: Record<string, string> = {
  "/equipment-rental/": "Commercial Mobile Kitchen Rental Inventory",
  "/industries/": "Commercial Kitchen Rentals for Essential Operations",
  "/services/": "Mobile Kitchen, Dishwashing and Refrigeration Rentals",
};

export const rentalHubHeadline = (path: string) => hubHeadlines[path];
