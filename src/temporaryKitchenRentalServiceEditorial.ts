export type ServiceModelEditorial = {
  use: string;
  planning: [string, string, string];
  confirm: string;
};

// Route-level edits to repeated service-detail sections. Equipment facts stay
// in content/service-details.json; this layer adds model-specific planning
// context without creating new capacity, price, or availability claims.
export const temporaryKitchenRentalServiceEditorial: Record<string, ServiceModelEditorial> = {
  "/services/mobile-kitchen-trailers/24ft/": {
    use: "For the 24 ft Mobile Kitchen Trailer, match the listed ovens, cooktops, grills, refrigerated storage, and preparation stations to the menu and work sequence. The published listing does not provide appliance quantities or production rate.",
    planning: [
      "List the menu items and cooking methods the temporary kitchen must support.",
      "Request the offered 24 ft unit's floor plan and appliance quantities before laying out work positions.",
      "Confirm the site's fuel, electrical, water, drainage, and trailer-access requirements from the equipment sheet.",
    ],
    confirm: "The listing names a 24 ft model and equipment types, but does not establish appliance counts, utility load, or meals per hour. Verify those items against the exact available unit.",
  },
  "/services/mobile-kitchen-trailers/26ft-bulk/": {
    use: "The 26 ft page is specifically the Bulk Mobile Kitchen listing. Compare its documented appliance schedule with the menu and batch-preparation workflow; the word “bulk” does not establish a production rate.",
    planning: [
      "Identify the batch-cooking tasks and appliance types required for the project.",
      "Review the exact 26 ft bulk unit's equipment schedule; do not estimate meals per hour from its name or length.",
      "Check staff movement, delivery access, and utility service against the confirmed floor plan.",
    ],
    confirm: "The target listing identifies this as a bulk kitchen but does not publish output per hour. Confirm the appliance schedule and site utilities for the offered unit.",
  },
  "/services/mobile-kitchen-trailers/28ft/": {
    use: "The 28 ft Mobile Kitchen Trailer page calls out cooking-line and staff-position planning. Use the actual floor plan to map receiving, preparation, cooking, and hand-off rather than assuming positions from the length alone.",
    planning: [
      "Mark the cooking line and staff stations on the supplied 28 ft floor plan.",
      "Trace ingredient movement from receiving and preparation through cooking and service.",
      "Confirm the available unit's equipment quantities and utility connections before finalizing the layout.",
    ],
    confirm: "The listing highlights line and staffing layout, but does not establish the number of work positions or appliance output. Confirm the model drawing and equipment schedule.",
  },
  "/services/mobile-kitchen-trailers/38ft/": {
    use: "The 38 ft Mobile Kitchen listing describes both refrigerated and frozen storage alongside food preparation and cooking. Confirm how those storage areas are configured in the offered unit before assigning menu items or deliveries.",
    planning: [
      "Separate the project's refrigerated and frozen product needs when requesting the unit details.",
      "Confirm the available storage layout and operating temperature requirements from the current specification.",
      "Plan receiving, preparation, and cooking positions against the documented 38 ft floor plan and utility schedule.",
    ],
    confirm: "The listing mentions refrigerated and frozen storage but does not publish compartment volumes or set points. Verify both for the available configuration.",
  },
  "/services/mobile-kitchen-trailers/40ft/": {
    use: "For the 40 ft Mobile Kitchen Trailer, the published planning note emphasizes the complete delivery footprint—not just the trailer body—including stairs, service areas, and utility access.",
    planning: [
      "Obtain the 40 ft unit's full transport dimensions and the separate dimensions of any stairs or service equipment.",
      "Check the approach, turning area, staging position, and utility reach at the destination.",
      "Confirm the offered appliance schedule and site connections before reserving the delivery window.",
    ],
    confirm: "The page calls attention to delivery footprint and utility access. Confirm the actual dimensions and included access equipment for this specific 40 ft unit.",
  },
  "/services/mobile-kitchen-trailers/40ft-combination/": {
    use: "The 40 ft Combination Mobile Kitchen is presented as a combined layout that can keep preparation and storage close to the cooking line. Review the supplied plan to verify how that arrangement works for the project's menu and service flow.",
    planning: [
      "Trace prep-to-cook movement on the 40 ft combination floor plan.",
      "Confirm where listed refrigerated storage sits in relation to preparation and cooking areas.",
      "Check delivery footprint and all utility connections for the offered combination unit.",
    ],
    confirm: "The target listing describes a combined layout but does not guarantee a particular station arrangement. Verify the floor plan and included appliances for the available unit.",
  },
  "/services/mobile-kitchen-trailers/40ft-bulk-combination/": {
    use: "This 40 ft page is the Bulk Combination Mobile Kitchen listing. Its published copy identifies bulk cooking equipment but does not state meals per hour, so plan from the verified equipment schedule rather than an assumed output.",
    planning: [
      "Identify the bulk-cooking tasks and appliance types needed for the menu.",
      "Review the 40 ft bulk-combination floor plan for preparation, cooking, storage, and service positions.",
      "Ask for the exact utility loads and delivery footprint; neither is implied by the “bulk combination” name.",
    ],
    confirm: "The listing does not state meals per hour. Confirm appliance quantities, utilities, floor plan, and the exact offered configuration before planning output.",
  },
  "/services/dishwashing-trailers/22ft/": {
    use: "The 22 ft Dishwashing Trailer listing highlights a separate dish-return area for organizing soiled items before washing. Plan the return point and hand-off to the wash line around the site's actual kitchen path.",
    planning: [
      "Locate where soiled plates and cookware arrive from the kitchen or dining area.",
      "Use the 22 ft floor plan to review the separate return area and its connection to washing, rinsing, and drying.",
      "Confirm machine details, sanitation process, hot-water supply, drainage, and power for the offered unit.",
    ],
    confirm: "The listing notes a separate return area; it does not publish a rated wash rate. Verify the machine specification and sanitation requirements.",
  },
  "/services/dishwashing-trailers/24ft/": {
    use: "The 24 ft Dishwashing Trailer is compared with the 22 ft model in the published note. Additional length alone does not establish a higher wash rate; select against the machine specification and floor plan.",
    planning: [
      "Compare the 24 ft and 22 ft equipment sheets, not only their nominal lengths.",
      "Confirm the rated machine throughput, rack or cookware requirements, and dirty-to-clean workflow.",
      "Check delivery clearance and the site's hot-water, wastewater, and power connections.",
    ],
    confirm: "The 24 ft listing expressly cautions that length does not prove a faster wash rate. Verify the exact machine and throughput for the offered unit.",
  },
  "/services/dishwashing-trailers/26ft/": {
    use: "The 26 ft Dishwashing Trailer's page emphasizes staff circulation, cookware handling, and clean-dish collection. Use its exact floor plan to prevent those tasks from crossing the soiled return path.",
    planning: [
      "Mark soiled-item return, wash, clean-item staging, and collection on the 26 ft plan.",
      "Review staff circulation and cookware movement against the kitchen's service route.",
      "Confirm machine specifications and the site's water, drainage, hot-water, and power arrangements.",
    ],
    confirm: "The page highlights circulation and collection, but does not state a wash rate. Confirm equipment throughput and layout from the available-unit documents.",
  },
  "/services/dishwashing-trailers/38ft-conveyor/": {
    use: "The 38 ft Dishwashing Trailer is the conveyor model in this group. Conveyor movement is its published distinguishing feature; verify rack loading, line setup, and rated throughput before comparing it with non-conveyor trailers.",
    planning: [
      "Confirm how items are loaded onto and collected from the conveyor line.",
      "Request the exact rack or conveyor specification and rated throughput for the available model.",
      "Plan dirty-to-clean separation and confirm hot-water, wastewater, and power requirements.",
    ],
    confirm: "The page identifies conveyor movement but does not establish a specific rack rate or machine brand. Confirm both from the current equipment sheet.",
  },
  "/services/restroom-trailers/12ft/": {
    use: "The 12 ft restroom page is preserved, but the available source description conflicts with its 12 ft title by describing a 14 ft model. Treat this as an identity-verification page until the exact 12 ft unit and its layout are confirmed.",
    planning: [
      "Request the current specification sheet that identifies the 12 ft restroom unit by model and overall dimensions.",
      "Do not transfer the 14 ft listing's features or floor plan to this page.",
      "After the unit is identified, confirm fixture count, accessible entry, water/waste service, and delivery access.",
    ],
    confirm: "The current source record contains a 12 ft/14 ft description conflict. Verify the correct model and specification before making capacity or layout claims.",
  },
  "/services/restroom-trailers/14ft/": {
    use: "The 14 ft restroom listing names flush toilets, handwashing sinks, interior lighting, ventilation, and water/waste storage. It does not publish a stall count, so evaluate occupancy only after confirming the actual floor plan.",
    planning: [
      "Request the 14 ft model's documented stall count and floor plan.",
      "Check the approach and set-down area using confirmed transport dimensions, not a capacity assumption based on length.",
      "Plan handwashing, cleaning, water/waste servicing, electrical access, and any documented accessibility arrangement.",
    ],
    confirm: "The listing describes toilets, sinks, lighting, ventilation, and water/waste storage. Stall count, accessible configuration, tank sizes, and power requirements need unit-level confirmation.",
  },
  "/services/restroom-trailers/20ft/": {
    use: "For the 20 ft restroom listing, verify whether the supplied floor plan and service access match the site's expected attendance. Its listed fixtures do not establish a stall count or occupancy capacity.",
    planning: [
      "Obtain the 20 ft unit's current stall count and fixture layout.",
      "Measure turning and staging space against the actual transport drawing.",
      "Coordinate cleaning, water/waste servicing, electrical access, and documented accessibility needs.",
    ],
    confirm: "The source lists toilets, handwashing sinks, lighting, ventilation, and storage, but no verified 20 ft stall count. Confirm actual configuration and service requirements.",
  },
  "/services/restroom-trailers/30ft/": {
    use: "The 30 ft restroom page should be planned around the exact route and staging footprint for this named model. Do not equate its longer label with a particular number of stalls or greater occupancy without a specification.",
    planning: [
      "Review the 30 ft unit's verified transport dimensions and the site's route, turning area, and set-down location.",
      "Confirm stall count and internal arrangement from the actual floor plan.",
      "Schedule cleaning and water/waste servicing access and verify electrical and documented accessibility requirements.",
    ],
    confirm: "The listing identifies a 30 ft restroom trailer but does not establish capacity. Confirm the exact stall arrangement, tank sizes, accessibility, and power needs.",
  },
  "/services/laundry-trailers/24ft/": {
    use: "For the 24 ft Mobile Laundry Trailer, start with the project's daily laundry volume and hours of operation, then request the available machine schedule. The listed trailer length does not establish washer count or load size.",
    planning: [
      "Estimate loads per day and identify whether workwear, bedding, or both are in scope.",
      "Request the 24 ft unit's washer/dryer count, load sizes, and cycle information.",
      "Confirm water, drainage, dryer venting, power, maintenance access, and delivery clearance.",
    ],
    confirm: "Machine quantities, load capacities, cycle times, and utility ratings are not established by the 24 ft name. Verify the offered equipment schedule.",
  },
  "/services/laundry-trailers/30ft/": {
    use: "The 30 ft Mobile Laundry Trailer is the longer trailer listing beside the 24 ft option. Compare its confirmed machine count and load capacity with the smaller listing; do not infer laundry throughput from length.",
    planning: [
      "Ask for the 30 ft unit's machine count, load sizes, and cycle details before estimating daily output.",
      "Compare its documented trailer footprint and equipment arrangement with the 24 ft option.",
      "Verify water, drainage, dryer venting, power, maintenance access, and site placement.",
    ],
    confirm: "The source recommends comparing machine count and load capacity with the 24 ft unit. These values and the utility ratings require confirmation.",
  },
  "/services/mobile-sleeper-trailers/20ft-shared/": {
    use: "The 20 ft Shared Sleeper Trailer is identified by its shared sleeping arrangement. Coordinate privacy and shift use with the listed heating, air conditioning, power, and lighting, while confirming bed count from the exact floor plan.",
    planning: [
      "Confirm the documented bed layout and occupancy for the shared arrangement.",
      "Plan room sharing and quiet periods around the crew's shift schedule.",
      "Verify site access, power, cleaning, and any separate bathroom or meal-service facilities needed.",
    ],
    confirm: "The page describes shared sleeping areas with heating, cooling, power, and lighting, but does not establish bed count or bathroom layout.",
  },
  "/services/mobile-sleeper-trailers/20ft-contractor/": {
    use: "The 20 ft Contractor Sleeper Trailer is a contractor-labeled accommodation option. Use its confirmed room and bed layout to assess privacy between occupants; the category name alone does not establish room count.",
    planning: [
      "Request the contractor model's room plan, bed count, and privacy details.",
      "Match arrival and quiet-hour arrangements to contractor shifts at the site.",
      "Confirm power, heating/cooling, cleaning, access, and any separate facilities required.",
    ],
    confirm: "Sleeping areas, heating, air conditioning, power, and lighting are listed. Room count, bed count, and bathroom configuration require confirmation.",
  },
  "/services/mobile-sleeper-trailers/20ft-vip/": {
    use: "The 20 ft VIP Sleeper Trailer has a private bathroom and kitchenette in its published equipment list, unlike the shared model. Confirm the offered room plan and included fixtures before making accommodation arrangements.",
    planning: [
      "Verify the exact room/bed plan and the listed private bathroom and kitchenette for the available VIP unit.",
      "Confirm which fixtures and furnishings are included rather than assuming a fit-out from the VIP label.",
      "Check site access, power, heating/cooling, cleaning, and utility connections for the specific layout.",
    ],
    confirm: "A private bathroom and kitchenette are listed for this model; confirm their exact layout, included equipment, and utility requirements with the offered-unit documentation.",
  },
  "/equipment-rental-refrigeration-12ft-refrigerated-trailer/": {
    use: "The 12 ft Refrigeration Trailer is the compact trailer-based listing. The source notes refrigeration and freezer configurations but makes temperature depend on the selected unit and requirements; do not assume a set point from the page title.",
    planning: [
      "List the products, target temperature, and loading pattern for the 12 ft trailer inquiry.",
      "Confirm whether the offered trailer is set up for refrigeration or frozen storage and verify its operating range.",
      "Check usable volume, electrical service, loading access, and towing/placement clearance from the unit sheet.",
    ],
    confirm: "The source provides only a conditional typical range. Verify the actual unit's temperature specification, electrical rating, and usable volume for the load.",
  },
  "/20ft-refrigeration-trailers/": {
    use: "This 20 ft Refrigeration Trailer page is for a larger named trailer option, but the available record does not confirm whether the rental unit is configured for chilled or frozen storage. Verify the mode and temperature range before matching it to goods.",
    planning: [
      "Specify product temperature requirements and expected loading frequency.",
      "Confirm the offered 20 ft unit's refrigeration/freezer configuration and usable storage volume.",
      "Review power, monitoring, loading approach, and trailer delivery clearance with the current specification.",
    ],
    confirm: "The 20 ft listing does not resolve the available unit's chilled or frozen configuration. Confirm operating range and electrical requirements before booking.",
  },
  "/equipment-rental/refrigerated-containers/": {
    use: "The 40 ft Refrigerated Container is a container-based cold-storage option, not the 12 ft or 20 ft towable trailer listing. Plan container handling, loading access, placement, and electrical service from its own equipment documentation.",
    planning: [
      "Request the container's exact exterior dimensions and delivery/handling method.",
      "Confirm how product loading will work at the planned container placement.",
      "Verify temperature range, usable volume, power, monitoring, and service clearance for the offered container.",
    ],
    confirm: "The route names a 40 ft refrigerated container, but the source does not establish its temperature range, capacity, or electrical rating. Confirm the exact offered unit.",
  },
  "/services/handwashing-trailers/hands-free/": {
    use: "The Hands-Free Handwashing Station listing identifies foot-pump operation, a basin, and soap and hand-towel dispensers in the published drawing. It is a portable station design, not an enclosed wash trailer.",
    planning: [
      "Place each station where the site's staff or visitors can reach it before returning to work or food handling.",
      "Confirm station count, water replenishment, wastewater collection, and dispenser consumables.",
      "Check access and servicing frequency for the exact station arrangement.",
    ],
    confirm: "The drawing shows foot-pump operation and dispensers, but does not establish how many stations are included or their tank capacities.",
  },
  "/equipment-rental/handwashing-stations/": {
    use: "This Portable Handwashing Stations listing describes station equipment rather than an enclosed handwashing trailer. Plan the number and placement of stations for the work zone, then verify the supplied water and waste arrangements.",
    planning: [
      "Map the work and entry points where portable handwashing stations are needed.",
      "Request the number of stations included and confirm basin, pump, and dispenser details for the supplied equipment.",
      "Arrange water replenishment, wastewater collection, consumables, and servicing for the operating schedule.",
    ],
    confirm: "The source shows a hands-free station drawing but does not specify station count, tank capacity, or hot-water provision.",
  },
  "/services/shower-trailers/22ft-10-stall/": {
    use: "The 22 ft shower-only trailer is listed with 10 stalls. Keep this shower-only configuration distinct from the separate shower-and-restroom combination products; verify the actual available-unit layout before scheduling.",
    planning: [
      "Use the listed 10-stall configuration when describing the inquiry, then confirm the available unit's stall plan.",
      "Estimate peak-use periods and schedule cleaning and service access around shift changes.",
      "Verify hot-water, water supply, wastewater, power, and delivery requirements from the equipment sheet.",
    ],
    confirm: "The fleet listing identifies a 22 ft, 10-stall shower-only trailer. Confirm the exact available unit, connections, and service plan; this is not a restroom combination.",
  },
  "/services/shower-restroom-combination-trailers/13ft-3-stall/": {
    use: "The published 13 ft combination configuration lists three stalls total. Confirm how those stalls are allocated between shower and restroom functions; the total alone does not show the interior plan.",
    planning: [
      "Use the three-stall listing to identify the product, then request the unit's shower/restroom allocation.",
      "Review the 13 ft transport drawing, privacy plan, and peak-use schedule for the project.",
      "Confirm water heating, wastewater, power, and accessible-entry details for the exact unit.",
    ],
    confirm: "The schedule lists 13 ft and three total stalls, but not the detailed allocation or floor plan. Confirm those details and utilities before selection.",
  },
  "/services/shower-restroom-combination-trailers/22ft-6-stall/": {
    use: "The listed 22 ft combination unit has six stalls total. Ask for the floor plan to see how shower and restroom functions are divided instead of assuming an equal allocation.",
    planning: [
      "Confirm the allocation of the six listed stalls between restroom and shower use.",
      "Match the 22 ft unit's verified layout and access dimensions to the crew's peak schedule.",
      "Coordinate water heating, wastewater servicing, power, and delivery access for the identified unit.",
    ],
    confirm: "The published configuration specifies six stalls at 22 ft, but the split and exact floor plan still require confirmation.",
  },
  "/services/shower-restroom-combination-trailers/30ft-8-stall/": {
    use: "This 30 ft combination listing names eight stalls total. For site planning, verify the shower/restroom split and full transport footprint; neither can be inferred from the combined product name.",
    planning: [
      "Request the eight-stall floor plan and identify the restroom/shower allocation.",
      "Check the delivery route, turning room, staging area, and service access against verified 30 ft dimensions.",
      "Confirm water heating, wastewater, power, and cleaning arrangements for the offered configuration.",
    ],
    confirm: "The page lists a 30 ft, eight-stall combination, but does not publish the split, tank details, utility rating, or available-unit status.",
  },
  "/services/shower-restroom-combination-trailers/3-stall-1-ada/": {
    use: "The ADA-labeled combination entry lists three stalls plus one ADA stall and does not state a trailer length. Verify the specific accessible room, route, ramp, and overall dimensions from the unit documents before site planning.",
    planning: [
      "Confirm the actual dimensions and floor plan; the current entry is identified by its stall configuration, not length.",
      "Review the documented accessible room and continuous access route with the project requirements.",
      "Verify water, wastewater, power, and site approach for the exact combination unit.",
    ],
    confirm: "The equipment schedule lists three stalls plus one ADA stall but does not identify length or exact accessible features. Confirm both from the available-unit documentation.",
  },
  "/services/shower-restroom-combination-trailers/8-stall-1-ada/": {
    use: "The ADA-labeled combination entry lists eight stalls plus one ADA stall, with no trailer length in the current schedule. Confirm the actual accessible layout and transport dimensions; do not infer them from another combination model.",
    planning: [
      "Request the plan and length for the eight-stall-plus-one configuration.",
      "Verify the accessible room, ramp/route, and turning clearances against the project site.",
      "Check utility, water/waste service, privacy, and delivery access on the identified model sheet.",
    ],
    confirm: "The schedule identifies eight stalls plus one ADA stall but does not establish trailer length or detailed accessibility features.",
  },
  "/services/shower-containers/20ft-5-stall/": {
    use: "The 20 ft shower container is listed with five stalls. Its container form factor and unloading method differ from towable shower trailers; confirm handling, placement, and site utilities for this exact unit.",
    planning: [
      "Use the five-stall listing to identify the product, then request its internal plan and container dimensions.",
      "Confirm unloading and set-down method, placement access, and the required support surface.",
      "Verify hot-water, water, wastewater, power, and service access before arranging delivery.",
    ],
    confirm: "The published configuration lists a 20 ft container with five stalls; confirm the available unit, unloading method, actual floor plan, and utilities.",
  },
  "/remote-containerized-military-berthing-solution-for-rent/": {
    use: "The containerized sleeper listing is a container-based accommodation option, distinct from the shared, contractor, and VIP 20 ft sleeper trailers. Confirm occupancy, room layout, and delivery handling for the actual container.",
    planning: [
      "Request the exact room/bed plan and confirmed occupancy for the containerized unit.",
      "Verify transport, lifting or placement method, dimensions, and access at the project site.",
      "Confirm included furnishings, utility connections, and any separate restroom or meal facilities needed.",
    ],
    confirm: "The container form factor is identified, but bed count, bathroom arrangement, utilities, and included furnishings require unit-level confirmation.",
  },
};
