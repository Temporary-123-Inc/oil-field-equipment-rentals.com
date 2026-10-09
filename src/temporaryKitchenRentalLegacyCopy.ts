export type LegacyProductGuide = {
  intro: string;
  sectionTitle: string;
  summary: string;
  checks: string[];
  related: { label: string; href: string }[];
};

// Only identify facts present in the retained product names and approved route
  // registry. Do not infer capacity, fixture counts, floor plans, utilities, or
// availability from the nominal model name or category-level photographs.
export const legacyProductPageCopy: Record<string, LegacyProductGuide> = {
  "/12ft-restroom-shower-all-in-one-trailer/": {
    intro: "This listing is for the named 12 ft all-in-one restroom and shower trailer. It combines both service types in one product title; it is not the shower-only 12 ft option or the restroom-only 12 ft option.",
    sectionTitle: "Evaluate the 12 ft all-in-one combination",
    summary: "Before comparing the combined option with separate restroom or shower units, confirm the exact interior plan and usable fixture layout for the offered model. The page title establishes the combination and nominal length, but not capacity or room arrangement.",
    checks: [
      "Ask for the current plan showing how restroom and shower functions are arranged in this exact unit.",
      "Confirm total transport dimensions, access clearances, and placement area from the equipment sheet.",
      "Compare the combined layout with the separate 12 ft restroom and 12 ft shower listings linked below.",
    ],
    related: [
      { label: "12 ft Restroom Trailer", href: "/12ft-restroom/" },
      { label: "12 ft Shower Trailer", href: "/12ft-shower/" },
    ],
  },
  "/12ft-restroom/": {
    intro: "The 12 ft restroom trailer is the shortest named option in Temporary Kitchen Rental's restroom-only listing group. Use this page to evaluate that model's site fit; the approved restroom reference photos do not establish its specific floor plan, fixture count, or capacity.",
    sectionTitle: "Check the 12 ft restroom model against your site",
    summary: "For a compact-site review, start with the exact transport drawing for this 12 ft model rather than estimating its usable dimensions from photographs. Confirm the layout and service connections before comparing it with the 14 ft restroom listing.",
    checks: [
      "Request the 12 ft model's overall dimensions and floor plan; neither is verified by the category reference photos.",
      "Measure the delivery approach and intended set-down area against the supplied drawing.",
      "Confirm the actual fixture arrangement and site connections with the rental team before selecting this option.",
    ],
    related: [{ label: "14 ft Restroom Trailer", href: "/14ft-restroom/" }],
  },
  "/12ft-shower/": {
    intro: "This page covers the 12 ft shower-trailer listing only. The 12 ft all-in-one restroom-and-shower option is a separate product path, so confirm which service mix the site needs before requesting a quote.",
    sectionTitle: "Plan around the 12 ft shower-only listing",
    summary: "The route identifies a shower trailer and its nominal length, not its shower count or internal arrangement. Ask for the exact model drawing and site-connection requirements before using the 12 ft label to assess project fit.",
    checks: [
      "Confirm that a shower-only unit meets the project's need; restroom service is listed separately.",
      "Request the exact floor plan, fixture count, and utility requirements for the available 12 ft model.",
      "Check delivery access and placement using verified transport dimensions rather than the gallery image.",
    ],
    related: [
      { label: "12 ft All-in-One Restroom and Shower Trailer", href: "/12ft-restroom-shower-all-in-one-trailer/" },
      { label: "14 ft Shower Trailer", href: "/14ft-shower/" },
    ],
  },
  "/14ft-restroom-shower-combo-trailer-2/": {
    intro: "This preserved 14 ft combination listing uses “facility” in its product title. The current target evidence does not confirm whether it is a different configuration from the separately listed 14 ft combination trailer, so request the exact model identity before treating the two listings as different units.",
    sectionTitle: "Verify the 14 ft combination-facility identity",
    summary: "The URL and title preserve a second legacy entry, but wording alone is not proof of a separate product. We are keeping both paths while the product schedule is checked; do not assume a different layout, capacity, or feature set from the label “facility.”",
    checks: [
      "Ask whether this 14 ft facility entry and the 14 ft combination-trailer entry refer to one unit or distinct configurations.",
      "Use the approved model schedule or a current equipment sheet to verify any difference before quoting it.",
      "Confirm restroom/shower layout and site requirements from the identified unit's documentation.",
    ],
    related: [{ label: "14 ft Restroom and Shower Combination Trailer", href: "/14ft-restroom-shower-combo-trailer/" }],
  },
  "/14ft-restroom-shower-combo-trailer/": {
    intro: "This preserved 14 ft combination-trailer listing names both restroom and shower service. A second 14 ft combination URL uses “facility” in its title; Temporary Kitchen Rental is verifying whether that path represents another model or a legacy duplicate.",
    sectionTitle: "Confirm the 14 ft trailer configuration",
    summary: "Use the identified equipment sheet—not the difference between two URL names—to establish whether the 14 ft combination entries describe one product or two. No capacity or interior distinction is claimed here until the source schedule confirms it.",
    checks: [
      "Confirm the exact 14 ft unit and whether the paired facility listing is a separate configuration.",
      "Review its documented restroom and shower arrangement, fixture count, and transport dimensions.",
      "Verify placement access and water, wastewater, and power requirements for the confirmed unit.",
    ],
    related: [{ label: "14 ft Restroom and Shower Combination Facility", href: "/14ft-restroom-shower-combo-trailer-2/" }],
  },
  "/14ft-restroom/": {
    intro: "The 14 ft restroom trailer is a distinct named size in the restroom-only range, alongside the 12 ft, 20 ft, and 30 ft listings. The shared restroom photo reference does not establish this model's own floor plan or fixture count.",
    sectionTitle: "Review the 14 ft restroom option",
    summary: "Compare the stated 14 ft model length with the project's delivery path and set-down area, then obtain the model-specific drawing. Confirm its actual interior arrangement rather than assuming it is simply the 12 ft layout with additional capacity.",
    checks: [
      "Request the verified overall dimensions and floor plan for the 14 ft restroom unit.",
      "Check maneuvering and staging clearance using those dimensions.",
      "Confirm fixture arrangement, accessibility details, and site connections from the equipment documentation.",
    ],
    related: [
      { label: "12 ft Restroom Trailer", href: "/12ft-restroom/" },
      { label: "20 ft Restroom Trailer", href: "/20ft-restroom/" },
    ],
  },
  "/14ft-shower/": {
    intro: "The 14 ft shower trailer is the middle-size entry between the listed 12 ft and 20 ft shower-only models. This page does not claim that the longer model has more fixtures; confirm the available unit's specifications before comparing capacity.",
    sectionTitle: "Compare the 14 ft shower-only model",
    summary: "Start with the 14 ft product drawing and compare its verified transport envelope with the delivery approach and planned placement. The separate restroom-and-shower combination listings serve a different product need.",
    checks: [
      "Verify shower count, interior layout, and equipment on the 14 ft model sheet.",
      "Confirm water, wastewater, and power connections with the rental team.",
      "Choose a shower-only listing or a combined restroom/shower listing based on the site's actual facility requirement.",
    ],
    related: [
      { label: "12 ft Shower Trailer", href: "/12ft-shower/" },
      { label: "20 ft Shower Trailer", href: "/20ft-shower/" },
      { label: "14 ft Restroom and Shower Combination Trailer", href: "/14ft-restroom-shower-combo-trailer/" },
    ],
  },
  "/20ft-restroom-shower-combo-trailer-rental/": {
    intro: "This listing is specifically for a 20 ft restroom-and-shower combination trailer, not a shower-only or restroom-only unit. Confirm the exact floor plan and delivery dimensions for the offered model before planning the site's combined facility service.",
    sectionTitle: "Plan the 20 ft combined restroom and shower unit",
    summary: "A combined unit needs a placement plan that accounts for the documented restroom and shower layout as well as the site's utility locations. The nominal length in the listing is not a substitute for the equipment drawing or a capacity specification.",
    checks: [
      "Request the 20 ft unit's plan and confirm how restroom and shower functions are arranged.",
      "Check transport access, turning space, and staging against verified dimensions.",
      "Confirm site water, wastewater, and power requirements for the specific available configuration.",
    ],
    related: [
      { label: "20 ft Restroom Trailer", href: "/20ft-restroom/" },
      { label: "20 ft Shower Trailer", href: "/20ft-shower/" },
    ],
  },
  "/20ft-restroom/": {
    intro: "The 20 ft restroom trailer is the larger-length restroom-only listing between the 14 ft and 30 ft restroom models. Use its own documented footprint and floor plan for a site review; do not infer capacity or layout from the nominal length or shared reference photos.",
    sectionTitle: "Site-plan the 20 ft restroom trailer",
    summary: "For this listed 20 ft option, check the delivery route and available staging area against the actual transport drawing. Confirm fixture layout, service access, and site connections from the model documentation before selecting it over the shorter or longer restroom listings.",
    checks: [
      "Obtain the exact 20 ft unit dimensions, fixture arrangement, and floor plan.",
      "Verify turning, access, and staging space along the complete delivery route.",
      "Confirm site connections and servicing arrangements for the identified equipment.",
    ],
    related: [
      { label: "14 ft Restroom Trailer", href: "/14ft-restroom/" },
      { label: "30 ft Restroom Trailer", href: "/30ft-restroom/" },
    ],
  },
  "/20ft-shower/": {
    intro: "This is the 20 ft shower-only trailer listing, distinct from the 20 ft restroom-and-shower combination. Its model length is identified, but the current page evidence does not establish the number of showers or the interior plan.",
    sectionTitle: "Check the 20 ft shower trailer against the site",
    summary: "Use the 20 ft model drawing to verify the transport footprint, shower arrangement, and service connections. When the project also needs restrooms, compare this shower-only entry with the separate 20 ft combination listing instead of assuming they are interchangeable.",
    checks: [
      "Confirm the exact shower count and layout on the 20 ft equipment sheet.",
      "Review delivery access and staging needs against documented dimensions.",
      "Verify water, wastewater, and power details for the identified unit.",
    ],
    related: [
      { label: "20 ft Restroom and Shower Combination Trailer", href: "/20ft-restroom-shower-combo-trailer-rental/" },
      { label: "30 ft Shower Trailer", href: "/30ft-shower/" },
    ],
  },
  "/24ft-laundry/": {
    intro: "This listing is for a 24 ft mobile laundry trailer, not a containerized laundry unit. The page identifies the product family and nominal length; confirm the available trailer's washer/dryer arrangement and utility requirements from its equipment sheet.",
    sectionTitle: "Plan the 24 ft laundry-trailer installation",
    summary: "For the 24 ft trailer option, match the delivery route and final placement to the verified trailer dimensions, then confirm the machine layout and connections. Do not use container specifications or photos to fill gaps for this trailer model.",
    checks: [
      "Request the specific 24 ft trailer layout and washer/dryer equipment list.",
      "Verify water, wastewater, and power requirements for the identified model.",
      "Compare trailer access and placement with the separate 30 ft laundry-trailer listing.",
    ],
    related: [
      { label: "30 ft Mobile Laundry Trailer", href: "/30ft-laundry/" },
      { label: "Containerized Laundry Unit", href: "/containerized-laundry-unit-rental/" },
    ],
  },
  "/30ft-laundry/": {
    intro: "The 30 ft mobile laundry trailer is the longer named trailer option in the current target inventory, alongside the separate 24 ft trailer and containerized laundry unit. Ask for its own equipment drawing; another model's photos or utility sheet do not confirm this trailer's layout.",
    sectionTitle: "Coordinate delivery for the 30 ft laundry trailer",
    summary: "Plan the route, turning space, and staging location using the confirmed 30 ft trailer dimensions. The laundry equipment list and service connections must also be verified for this exact model rather than inferred from a different-length trailer.",
    checks: [
      "Confirm the 30 ft model's transport dimensions and washer/dryer arrangement.",
      "Review approach, maneuvering, and placement space with the delivery team.",
      "Verify water, wastewater, and power connections for this trailer before scheduling.",
    ],
    related: [
      { label: "24 ft Mobile Laundry Trailer", href: "/24ft-laundry/" },
      { label: "Containerized Laundry Unit", href: "/containerized-laundry-unit-rental/" },
    ],
  },
  "/30ft-restroom/": {
    intro: "This page identifies the 30 ft restroom trailer listing. Before planning a project around that nominal length, request the specific transport drawing and floor plan; the approved general restroom photos do not establish this model's dimensions, fixture count, or layout.",
    sectionTitle: "Coordinate the 30 ft restroom trailer delivery",
    summary: "A 30 ft listing deserves a route-and-staging review based on verified dimensions, including maneuvering room at the destination. Confirm servicing access, the interior configuration, and site connections from the identified unit's documentation.",
    checks: [
      "Obtain the 30 ft model's overall dimensions and floor plan.",
      "Check route clearance, turning area, set-down location, and servicing access.",
      "Verify fixture layout, accessibility details, and required site connections before quoting.",
    ],
    related: [{ label: "20 ft Restroom Trailer", href: "/20ft-restroom/" }],
  },
  "/30ft-shower/": {
    intro: "The 30 ft shower trailer is the longest named shower-only listing in the current restored product set. Its length does not establish shower count or throughput; use the exact model sheet to confirm layout and project fit.",
    sectionTitle: "Review access for the 30 ft shower trailer",
    summary: "For this longer listed model, confirm the full delivery approach and staging space against the transport drawing, then verify the shower layout and utility connections. If restrooms are also needed, the combination products are separate options.",
    checks: [
      "Request verified dimensions and the shower layout for the exact 30 ft unit.",
      "Check turning and placement clearance along the delivery route.",
      "Confirm water, wastewater, power, and servicing details before scheduling.",
    ],
    related: [
      { label: "20 ft Shower Trailer", href: "/20ft-shower/" },
      { label: "20 ft Restroom and Shower Combination Trailer", href: "/20ft-restroom-shower-combo-trailer-rental/" },
    ],
  },
  "/containerized-laundry-unit-rental/": {
    intro: "This listing is for a containerized laundry unit rather than a mobile laundry trailer. Confirm how the available container is transported and placed, then request the exact laundry equipment layout and utility schedule before planning an installation.",
    sectionTitle: "Prepare the site for containerized laundry",
    summary: "Container placement, handling, and connections are not interchangeable with trailer delivery assumptions. Use the identified unit's equipment and transport documents to check the access route, set-down area, and service points.",
    checks: [
      "Confirm the container's verified dimensions and delivery/handling method.",
      "Request the washer/dryer layout and equipment list for this exact unit.",
      "Check placement surface, access, and water, wastewater, and power connections.",
    ],
    related: [
      { label: "24 ft Mobile Laundry Trailer", href: "/24ft-laundry/" },
      { label: "30 ft Mobile Laundry Trailer", href: "/30ft-laundry/" },
    ],
  },
  "/containerized-sleeper-rental-2/": {
    intro: "This page covers the containerized sleeper listing, a different form factor and use from the trailer-based equipment elsewhere in the inventory. Confirm the actual sleeping arrangement and rated occupancy from the offered unit's documentation; neither is established by the product name alone.",
    sectionTitle: "Plan placement for a containerized sleeper unit",
    summary: "Start with the verified container dimensions, transport/handling plan, and internal layout for this exact sleeper unit. Match the placement and site connections to those documents instead of assuming trailer access or an unverified bed count.",
    checks: [
      "Request the exact floor plan, sleeping arrangement, and confirmed occupancy information.",
      "Verify the container dimensions and how the unit will be delivered and set in place.",
      "Confirm applicable site utilities, access, and project dates with the rental team.",
    ],
    related: [{ label: "View the complete Temporary Kitchen Rental inventory", href: "/equipment-rental/" }],
  },
  "/refrigeration-container-40ft-rental-5/": {
    intro: "This is the 40 ft refrigeration-container listing, not the separately listed 20 ft refrigeration trailer. Request the identified container's verified cooling specifications and handling details; the title alone does not establish temperature range, capacity, or electrical configuration.",
    sectionTitle: "Verify the 40 ft refrigeration-container requirements",
    summary: "Container transport and placement differ from trailer assumptions. Before reserving this listed option, match the actual container dimensions and handling plan to the site, then verify the required electrical service and operating temperature range from its equipment documentation.",
    checks: [
      "Confirm the 40 ft container's exact transport dimensions and delivery/handling method.",
      "Request its verified temperature range, capacity, and electrical requirements.",
      "Check placement clearance and service access against the equipment drawing.",
    ],
    related: [{ label: "20 ft Refrigeration Trailer", href: "/refrigeration-trailer-20ft-rental-3/" }],
  },
};
