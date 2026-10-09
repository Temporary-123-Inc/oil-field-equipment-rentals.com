import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowLeft, ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Menu, Phone, X } from 'lucide-react';
import '@fontsource-variable/manrope';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/bebas-neue/400.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import './styles.css';
import './industrial-rental-design.css';
import site from './data/site-39.json';
import locationContent from './data/locationContent.json';
import regionCities from './data/regionCities.json';
import calculatorCities from './data/calculatorCities.json';
import statesMap from './data/usStates.json';
import referenceServiceDetails from './data/reference-service-details.json';

const phone = '888-385-5513';
const phoneHref = 'tel:+18883855513';
const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
const slugify = (value) => value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const approvedImages = {
  mobileKitchen: ['/approved/mobile-kitchen/24ft-exterior.png', '/approved/mobile-kitchen/24ft-interior.png', '/approved/mobile-kitchen/26ft-interior.png', '/approved/mobile-kitchen/28ft-exterior.png', '/approved/mobile-kitchen/28ft-interior.png', '/approved/mobile-kitchen/40ft-exterior.png', '/approved/mobile-kitchen/40ft-combo-exterior.png', '/approved/mobile-kitchen/40ft-bulk.png', '/approved/mobile-kitchen/multifunctional.png'],
  dishwashing: ['/approved/dishwashing/22-26ft-exterior.png', '/approved/dishwashing/22-26ft-interior.png', '/approved/dishwashing/22-26ft-sink.png', '/approved/dishwashing/30ft-exterior.png', '/approved/dishwashing/38ft-high-temp.png', '/approved/dishwashing/38ft-low-temp.png'],
  refrigeration: ['/approved/refrigeration/12ft-exterior.png', '/approved/refrigeration/12ft-interior.png', '/approved/refrigeration/20ft-fleet.png', '/approved/refrigeration/20ft-cooling.png', '/approved/refrigeration/container-interior.png'],
  shower: ['/approved/shower/20ft-exterior.png', '/approved/shower/20ft-wash-station.png', '/approved/shower/20ft-stalls.png', '/approved/shower/20ft-private-stall.png'],
  restroom: ['/approved/restroom/interior.png', '/approved/restroom/sink-interior.png', '/approved/restroom/urinal-sink.png'],
  showerRestroom: ['/approved/shower-restroom/13ft-exterior.png', '/approved/shower-restroom/13ft-interior.png', '/approved/shower-restroom/22ft-exterior.png', '/approved/shower-restroom/30ft-exterior.png', '/approved/shower-restroom/3-stall-ada-exterior.png', '/approved/shower-restroom/8-stall-ada-exterior.png'],
  sleeper: ['/approved/sleeper/2-stall-exterior.png', '/approved/sleeper/2-stall-interior.png', '/approved/sleeper/contractor-exterior.png', '/approved/sleeper/contractor-bunk-room.png', '/approved/sleeper/vip-private-room.png', '/approved/sleeper/bunkhouse-interior.png'],
  laundry: ['/approved/laundry/24ft-machines.png', '/approved/laundry/24ft-interior.png', '/approved/laundry/24ft-trailer.png', '/approved/laundry/26ft-machines.png'],
  handwashing: ['/approved/handwashing/six-station.png', '/approved/handwashing/mobile.png', '/approved/handwashing/portable.png'],
};

const services = [
  { slug: 'mobile-kitchen-trailers', name: 'Mobile kitchen trailers', family: 'Kitchen family', image: approvedImages.mobileKitchen[1], cardGallery: [approvedImages.mobileKitchen[1], approvedImages.mobileKitchen[2], approvedImages.mobileKitchen[4]], gallery: approvedImages.mobileKitchen, description: 'A commercial cooking workspace for restaurant continuity, led by a stove, oven, essential cooking utensils, preparation space, and an approved equipment package.' },
  { slug: 'dishwashing-trailers', name: 'Dishwashing trailers', family: 'Kitchen family', image: approvedImages.dishwashing[2], cardGallery: [approvedImages.dishwashing[2], approvedImages.dishwashing[1], approvedImages.dishwashing[4]], gallery: approvedImages.dishwashing, description: 'Commercial dishwashing capacity with connections and drainage reviewed during site preparation.' },
  { slug: 'refrigeration-trailers', name: 'Refrigeration trailers', family: 'Kitchen family', image: approvedImages.refrigeration[3], cardGallery: [approvedImages.refrigeration[3], approvedImages.refrigeration[1], approvedImages.refrigeration[4]], gallery: approvedImages.refrigeration, description: 'Separate temporary cold storage with site-wide starting pricing; final availability is confirmed in the quote.' },
  { slug: 'shower-trailers', name: 'Shower trailers', family: 'Supporting facility', image: approvedImages.shower[2], cardGallery: [approvedImages.shower[2], approvedImages.shower[3], approvedImages.shower[1]], gallery: approvedImages.shower, description: 'A supporting hygiene facility available by request, with configuration and site requirements confirmed in the quote.' },
  { slug: 'restroom-trailers', name: 'Restroom trailers', family: 'Supporting facility', image: approvedImages.restroom[1], cardGallery: [approvedImages.restroom[0], approvedImages.restroom[1], approvedImages.restroom[2]], gallery: approvedImages.restroom, description: 'Temporary bathroom facilities available by request for sites that need support beyond the kitchen family.' },
  { slug: 'shower-restroom-combinations', name: 'Shower & restroom combinations', family: 'Supporting facility', image: approvedImages.showerRestroom[1], cardGallery: [approvedImages.showerRestroom[1], approvedImages.showerRestroom[4], approvedImages.showerRestroom[5]], gallery: approvedImages.showerRestroom, description: 'Combined bathroom and shower facilities reviewed against the project site, access, utilities, and availability.' },
  { slug: 'sleeper-trailers', name: 'Sleeper & bunkbed trailers', family: 'Supporting facility', image: approvedImages.sleeper[5], cardGallery: [approvedImages.sleeper[5], approvedImages.sleeper[3], approvedImages.sleeper[1]], gallery: approvedImages.sleeper, description: 'Temporary sleeping facilities shown as a supporting category; final fit and availability are quote-based.' },
  { slug: 'laundry-trailers', name: 'Laundry trailers', family: 'Supporting facility', image: approvedImages.laundry[0], cardGallery: [approvedImages.laundry[0], approvedImages.laundry[1], approvedImages.laundry[3]], gallery: approvedImages.laundry, description: 'Mobile laundry facilities that can support longer projects, subject to site review and availability.' },
  { slug: 'handwashing-trailers', name: 'Handwashing trailers', family: 'Supporting facility', image: approvedImages.handwashing[0], cardGallery: [approvedImages.handwashing[0], approvedImages.handwashing[1], approvedImages.handwashing[2]], gallery: approvedImages.handwashing, description: 'Handwashing capacity that can be added when the approved site plan calls for a separate sanitation station.' },
];
const mancampPackageSlugs = [
  'mobile-kitchen-trailers',
  'dishwashing-trailers',
  'refrigeration-trailers',
  'shower-trailers',
  'restroom-trailers',
  'shower-restroom-combinations',
  'sleeper-trailers',
  'laundry-trailers',
];
const mancampPackageServices = services.filter((service) => mancampPackageSlugs.includes(service.slug));
const mancampPackageBySlug = Object.fromEntries(mancampPackageServices.map((service) => [service.slug, service]));
const heroRailServices = [
  { ...mancampPackageBySlug['mobile-kitchen-trailers'], railLabel: 'Commercial feeding' },
  { ...mancampPackageBySlug['sleeper-trailers'], railLabel: 'Workforce lodging' },
  { ...mancampPackageBySlug['shower-restroom-combinations'], railLabel: 'Workforce hygiene' },
  { ...mancampPackageBySlug['laundry-trailers'], railLabel: 'Site readiness' },
];

const referenceRouteAliases = {
  '/24ft-mobile/': '/services/mobile-kitchen-trailers/24ft/',
  '/26ft-mobile/': '/services/mobile-kitchen-trailers/26ft-bulk/',
  '/28ft-mobile/': '/services/mobile-kitchen-trailers/28ft/',
  '/services/mobile-kitchen-trailers/38ft/': '/services/mobile-kitchen-trailers/38ft/',
  '/40ft-mobile/': '/services/mobile-kitchen-trailers/40ft/',
  '/40ft-combo/': '/services/mobile-kitchen-trailers/40ft-combination/',
  '/40ft-bulk-combo/': '/services/mobile-kitchen-trailers/40ft-bulk-combination/',
  '/22ft-dishwashing-trailer-rental/': '/services/dishwashing-trailers/22ft/',
  '/24ft-dishwashing-trailer-rental/': '/services/dishwashing-trailers/24ft/',
  '/26ft-dishwashing-trailer-rental/': '/services/dishwashing-trailers/26ft/',
  '/38ft-conveyor-dishwashing-trailer-rental/': '/services/dishwashing-trailers/38ft-conveyor/',
  '/20ft-refrigeration-trailers/': '/20ft-refrigeration-trailers/',
  '/refrigeration-container-40ft-rental-5/': '/equipment-rental/refrigerated-containers/',
  '/12ft-restroom/': '/services/restroom-trailers/12ft/',
  '/14ft-restroom/': '/services/restroom-trailers/14ft/',
  '/20ft-restroom/': '/services/restroom-trailers/20ft/',
  '/30ft-restroom/': '/services/restroom-trailers/30ft/',
  '/24ft-laundry/': '/services/laundry-trailers/24ft/',
  '/30ft-laundry/': '/services/laundry-trailers/30ft/',
  '/containerized-sleeper-rental-2/': '/remote-containerized-military-berthing-solution-for-rent/',
  '/handwashing-stations/': '/equipment-rental/handwashing-stations/',
  '/services/handwashing-trailers/hands-free/': '/services/handwashing-trailers/hands-free/',
  '/services/shower-trailers/22ft-10-stall/': '/services/shower-trailers/22ft-10-stall/',
  '/12ft-restroom-shower-all-in-one-trailer/': '/services/shower-restroom-combination-trailers/13ft-3-stall/',
  '/14ft-restroom-shower-combo-trailer/': '/services/shower-restroom-combination-trailers/22ft-6-stall/',
  '/14ft-restroom-shower-combo-trailer-2/': '/services/shower-restroom-combination-trailers/3-stall-1-ada/',
  '/20ft-restroom-shower-combo-trailer-rental/': '/services/shower-containers/20ft-5-stall/',
  '/services/shower-restroom-combination-trailers/30ft-8-stall/': '/services/shower-restroom-combination-trailers/30ft-8-stall/',
};

const referenceDetailForPath = (path) => referenceServiceDetails[referenceRouteAliases[path] || path];
const referenceProductHeadline = (name) => {
  if (/Combination Trailer/i.test(name)) {
    const size = name.match(/^(\d+)\s*ft/i)?.[1];
    const stalls = name.match(/(\d+) Stalls?/i)?.[1];
    if (/ADA/i.test(name)) return `${stalls || 'ADA'}-Stall + 1 ADA Shower and Restroom Combination Trailer Rental`;
    if (size && stalls) return `${size} ft ${stalls}-Stall Shower and Restroom Combination Trailer Rental`;
  }
  if (/^22 ft Shower Trailer, 10 Stalls$/i.test(name)) return '22 ft 10-Stall Shower Trailer Rental';
  if (/^20 ft Shower Container, 5 Stalls$/i.test(name)) return '20 ft 5-Stall Shower Container Rental';
  return /rental|lease/i.test(name) ? name : `${name} Rental`;
};
const referenceServiceForDetail = (detail) => {
  const category = detail.category || '';
  if (/dishwashing/i.test(category)) return services.find((item) => item.slug === 'dishwashing-trailers');
  if (/refrigerat/i.test(category)) return services.find((item) => item.slug === 'refrigeration-trailers');
  if (/restroom.*shower|shower.*restroom/i.test(category)) return services.find((item) => item.slug === 'shower-restroom-combinations');
  if (/restroom/i.test(category)) return services.find((item) => item.slug === 'restroom-trailers');
  if (/shower/i.test(category)) return services.find((item) => item.slug === 'shower-trailers');
  if (/laundry/i.test(category)) return services.find((item) => item.slug === 'laundry-trailers');
  if (/sleeper|berthing/i.test(category)) return services.find((item) => item.slug === 'sleeper-trailers');
  if (/handwashing/i.test(category)) return services.find((item) => item.slug === 'handwashing-trailers');
  return services.find((item) => item.slug === 'mobile-kitchen-trailers');
};
const referenceTrailerOptions = {
  'mobile-kitchen-trailers': [
    '24ft Mobile Kitchen', '26ft Baby Bulk Kitchen', '28ft Mobile Kitchen', '38ft Mobile Kitchen', '40ft Mobile Kitchen', '40ft Mobile Combo Kitchen', '40ft Bulk Kitchen', '40ft Bulk Combo Kitchen',
  ],
  'dishwashing-trailers': [
    '22–26ft Low Temp Dish Trailer (Tier 1–4)', '30ft Conveyor Dishwashing Trailer', '38ft Low Temp Dish Trailer (Tier 1–4)', '38ft High Temp Conveyor Dishwashing Trailer',
  ],
  'refrigeration-trailers': [
    '12ft Refrigerated Trailer (Tier 1–4)', '20ft Refrigerated Trailer (Tier 1–4)', '20ft Refrigerated Container (Tier 1–4)', '40ft Refrigerated Container (Tier 1–4)',
  ],
  'shower-trailers': ['20ft Shower Container (5 Stalls)', '20ft Shower Trailer (10 Stalls) with Handwashing Sink'],
  'restroom-trailers': ['Restroom Trailer'],
  'shower-restroom-combinations': [
    '13ft Luxury Shower–Restroom Combination Trailer (3 Stalls)', '22ft Luxury Shower–Restroom Combination Trailer (6 Stalls)', '30ft Luxury Shower–Restroom Combination Trailer (8 Stalls)', '30ft Luxury Shower–Restroom Combination Trailer (10 Stalls)', 'Luxury Combination Trailer (3 Stalls + 1 ADA)', 'Luxury Combination Trailer (8 Stalls + 1 ADA)',
  ],
  'sleeper-trailers': ['Sleeper Trailer (2 Stalls)', '20ft Contractor Accommodation', '20ft VIP Accommodation'],
  'laundry-trailers': ['30ft Laundry Trailer (10 Washer/Dryer)', '24ft Laundry Trailer', '26–27ft Laundry Trailer (8 Washer/Dryer)', '20ft Laundry Container'],
  'handwashing-trailers': ['Handwashing Sink Trailer'],
};

const gallerySlides = (service, limit = service.gallery.length) => service.gallery.slice(0, limit).map((image, index) => ({ ...service, image, slug: `${service.slug}-${index}`, name: `${service.name} · view ${index + 1}` }));
const kitchenHeroSlides = [
  { image: approvedImages.mobileKitchen[1], name: '24 ft mobile kitchen · interior', size: '24 ft', description: 'A compact commercial cooking workspace with stainless preparation and service surfaces.' },
  { image: approvedImages.mobileKitchen[2], name: '26 ft mobile kitchen · interior', size: '26 ft', description: 'A practical interior configuration for keeping core kitchen functions online.' },
  { image: approvedImages.mobileKitchen[4], name: '28 ft mobile kitchen · interior', size: '28 ft', description: 'A larger mobile cooking layout with room for preparation, cooking, and movement.' },
  { image: approvedImages.mobileKitchen[5], name: '40 ft mobile kitchen · exterior', size: '40 ft', description: 'A full-size mobile kitchen facility built for extended commercial continuity.' },
  { image: approvedImages.mobileKitchen[6], name: '40 ft combination kitchen · exterior', size: '40 ft combo', description: 'A combination kitchen configuration for projects coordinating multiple food-service needs.' },
  { image: approvedImages.mobileKitchen[8], name: 'Multifunctional kitchen · interior', size: '38 ft', description: 'A multifunctional all-electric kitchen interior for a more complete temporary operation.' },
];

const calculatorEquipment = [
  { id: 'refrigeration-trailer', name: 'Refrigeration Trailer', startingPrice: 1495, details: 'Temporary cold-storage support.' },
  { id: 'modular-dishwashing', name: 'Temporary Modular Dishwashing Facility', startingPrice: 4995, details: 'Commercial ware-washing capacity.' },
  { id: 'mobile-kitchen', name: 'Temporary Mobile Kitchen', startingPrice: 4995, details: 'Commercial food-service workspace.' },
  { id: 'sleeper-bunkbed-trailer', name: 'Sleeper/Bunkbed Trailer', startingPrice: 4995, details: 'Sleeps 16 people at four per room, or eight at two per room.' },
  { id: 'sleeper-modular-container', name: 'Sleeper Modular Container', startingPrice: 2495, details: 'Sleeps four to eight people.' },
  { id: 'shower-trailer', name: 'Shower Trailer', startingPrice: 5995, details: 'Ten stalls, three hand sinks and individually locking privacy rooms.' },
  { id: 'shower-restroom-combination', name: 'Shower and Restroom Combination', startingPrice: 6995, details: 'Eight stalls with individually locking privacy rooms.' },
  { id: 'ada-shower-restroom-combination', name: 'ADA Shower and Restroom Combination', startingPrice: 3995, details: 'Three to eight stalls with individually locking privacy rooms.' },
  { id: 'laundry-trailer', name: 'Laundry Trailer', startingPrice: 7995, details: 'Eight to ten stackable washers and dryers.' },
  { id: 'man-camp', name: 'Man Camp', startingPrice: 200, perPerson: true, details: 'Food, sleeping, laundry, showers, tents and water.' },
];
const calculatorTrailerLengths = [20, 25, 30, 35, 40];
const calculatorDeliveryPrice = (length) => 995 + (length - 20) * 100;

const inventoryCategories = [
  { name: 'Mobile Kitchens', href: '/equipment-rental/mobile-kitchen-trailers/', description: 'Compare verified mobile kitchen trailer configurations for commercial food-service continuity, renovation projects, and temporary operations. Review the listed sizes and layouts, then confirm the actual unit, utilities, access, dates, and availability for your site.', links: [['24 ft Mobile Kitchen Trailer', '/24ft-mobile/'], ['26 ft Bulk Mobile Kitchen', '/26ft-mobile/'], ['28 ft Mobile Kitchen Trailer', '/28ft-mobile/'], ['38 ft Mobile Kitchen Trailer', '/services/mobile-kitchen-trailers/38ft/'], ['40 ft Mobile Kitchen Trailer', '/40ft-mobile/'], ['40 ft Combination Mobile Kitchen', '/40ft-combo/'], ['40 ft Bulk Combination Mobile Kitchen', '/40ft-bulk-combo/']] },
  { name: 'Dishwashing', href: '/portable-dishwashing-trailer-rental/', description: 'Portable dishwashing facilities for high-volume sanitation and food-service support.', links: [['22 ft Dishwashing Trailer', '/22ft-dishwashing-trailer-rental/'], ['24 ft Dishwashing Trailer', '/24ft-dishwashing-trailer-rental/'], ['26 ft Dishwashing Trailer', '/26ft-dishwashing-trailer-rental/'], ['38 ft Conveyor Dishwashing Trailer', '/38ft-conveyor-dishwashing-trailer-rental/']] },
  { name: 'Refrigeration', href: '/refrigeration-trailer-20ft-rental-3/', description: 'Temporary cold storage for ingredients, prepared food, and temperature-sensitive supplies.', links: [['20 ft Refrigeration Trailer', '/refrigeration-trailer-20ft-rental-3/'], ['40 ft Refrigerated Container', '/refrigeration-container-40ft-rental-5/'], ['Refrigerated Container Options', '/equipment-rental/refrigerated-containers/']] },
  { name: 'Restroom Trailers', href: '/12ft-restroom/', description: 'Temporary restroom trailer rentals for commercial, institutional, and project-site operations.', links: [['12 ft Restroom Trailer', '/12ft-restroom/'], ['14 ft Restroom Trailer', '/14ft-restroom/'], ['20 ft Restroom Trailer', '/20ft-restroom/'], ['30 ft Restroom Trailer', '/30ft-restroom/']] },
  { name: 'Shower Trailers', href: '/12ft-shower/', description: 'Temporary shower trailer rentals for workforce, institutional, and emergency projects.', links: [['12 ft Shower Trailer', '/12ft-shower/'], ['14 ft Shower Trailer', '/14ft-shower/'], ['20 ft Shower Trailer', '/20ft-shower/'], ['30 ft Shower Trailer', '/30ft-shower/'], ['22 ft Shower Trailer, 10 Stalls', '/services/shower-trailers/22ft-10-stall/']] },
  { name: 'Restroom & Shower Combination', href: '/services/shower-restroom-combination-trailers/', description: 'Temporary combined restroom and shower facilities for projects that need both functions at one site.', links: [['12 ft All-in-One Restroom and Shower Trailer', '/12ft-restroom-shower-all-in-one-trailer/'], ['14 ft Restroom and Shower Combination Trailer', '/14ft-restroom-shower-combo-trailer/'], ['14 ft Restroom and Shower Combination Facility', '/14ft-restroom-shower-combo-trailer-2/'], ['20 ft Restroom and Shower Combination Trailer', '/20ft-restroom-shower-combo-trailer-rental/'], ['30 ft Shower and Restroom Combination Trailer, 8 Stalls', '/services/shower-restroom-combination-trailers/30ft-8-stall/']] },
  { name: 'Laundry', href: '/24ft-laundry/', description: 'Temporary mobile and containerized laundry rentals for operational continuity and remote projects.', links: [['24 ft Mobile Laundry Trailer', '/24ft-laundry/'], ['30 ft Mobile Laundry Trailer', '/30ft-laundry/'], ['Containerized Laundry Unit', '/containerized-laundry-unit-rental/']] },
  { name: 'Containerized Sleeper Units', href: '/containerized-sleeper-rental-2/', description: 'Containerized sleeper rentals for temporary workforce accommodation planning.', links: [['Containerized Sleeper Unit', '/containerized-sleeper-rental-2/']] },
];

const inventoryRouteMap = Object.fromEntries([
  ['/equipment-rental/', 'services'],
  ['/equipment-rental/mobile-kitchen-trailers/', 'mobile-kitchen-trailers'],
  ['/portable-dishwashing-trailer-rental/', 'dishwashing-trailers'],
  ['/refrigeration-trailer-20ft-rental-3/', 'refrigeration-trailers'],
  ['/equipment-rental/refrigerated-containers/', 'refrigeration-trailers'],
  ['/12ft-restroom/', 'restroom-trailers'], ['/14ft-restroom/', 'restroom-trailers'], ['/20ft-restroom/', 'restroom-trailers'], ['/30ft-restroom/', 'restroom-trailers'],
  ['/12ft-shower/', 'shower-trailers'], ['/14ft-shower/', 'shower-trailers'], ['/20ft-shower/', 'shower-trailers'], ['/30ft-shower/', 'shower-trailers'],
  ['/services/shower-restroom-combination-trailers/', 'shower-restroom-combinations'], ['/12ft-restroom-shower-all-in-one-trailer/', 'shower-restroom-combinations'], ['/14ft-restroom-shower-combo-trailer/', 'shower-restroom-combinations'], ['/14ft-restroom-shower-combo-trailer-2/', 'shower-restroom-combinations'], ['/20ft-restroom-shower-combo-trailer-rental/', 'shower-restroom-combinations'],
  ['/24ft-laundry/', 'laundry-trailers'], ['/30ft-laundry/', 'laundry-trailers'], ['/containerized-laundry-unit-rental/', 'laundry-trailers'], ['/containerized-sleeper-rental-2/', 'sleeper-trailers'],
  ['/24ft-mobile/', 'mobile-kitchen-trailers'], ['/26ft-mobile/', 'mobile-kitchen-trailers'], ['/28ft-mobile/', 'mobile-kitchen-trailers'], ['/services/mobile-kitchen-trailers/38ft/', 'mobile-kitchen-trailers'], ['/40ft-mobile/', 'mobile-kitchen-trailers'], ['/40ft-combo/', 'mobile-kitchen-trailers'], ['/40ft-bulk-combo/', 'mobile-kitchen-trailers'],
  ['/22ft-dishwashing-trailer-rental/', 'dishwashing-trailers'], ['/24ft-dishwashing-trailer-rental/', 'dishwashing-trailers'], ['/26ft-dishwashing-trailer-rental/', 'dishwashing-trailers'], ['/38ft-conveyor-dishwashing-trailer-rental/', 'dishwashing-trailers'], ['/refrigeration-container-40ft-rental-5/', 'refrigeration-trailers'], ['/services/shower-trailers/22ft-10-stall/', 'shower-trailers'], ['/services/shower-restroom-combination-trailers/30ft-8-stall/', 'shower-restroom-combinations'],
]);

const serviceH1 = {
  'mobile-kitchen-trailers': 'Mobile Kitchen Trailer Rentals for Temporary Commercial Food Service',
  'dishwashing-trailers': 'Commercial Dishwashing Trailer Rentals for Temporary Kitchen Operations',
  'refrigeration-trailers': 'Refrigerated Trailer Rentals for Temporary Commercial Cold Storage',
  'shower-trailers': 'Portable Shower Trailer Rentals for Temporary Site Facilities',
  'restroom-trailers': 'Mobile Restroom Trailer Rentals for Temporary Site Facilities',
  'shower-restroom-combinations': 'Shower and Restroom Combination Trailer Rentals for Temporary Sites',
  'sleeper-trailers': 'Sleeper and Bunkbed Trailer Rentals for Temporary Workforce Housing',
  'laundry-trailers': 'Mobile Laundry Trailer Rentals for Temporary Workforce Facilities',
  'handwashing-trailers': 'Portable Handwashing Trailer Rentals for Temporary Sanitation Stations',
};

const statePages = site.location_data?.state_pages || [];
const cityRecords = site.service_area_data || [];
const stateNames = statePages.map((item) => item.state).sort((a, b) => a.localeCompare(b));
const stateByName = Object.fromEntries(statePages.map((item) => [item.state, item]));
const locationContentByLocation = Object.fromEntries(locationContent.map((item) => [item.location, item]));
const mancampLocationHeadline = (location) => `Temporary remote workforce facility rentals in ${location}`;
const mancampCityHeadline = (location) => `Temporary remote mancamp facility rentals in ${location}`;
const mancampLocationDescription = (location) => `Temporary remote mancamp facility rentals in ${location} coordinate the eight core trailer types around construction, renovation, infrastructure, industrial, emergency-response, and other high-headcount sites. Start with the workforce size, operating schedule, access route, utilities, and project phases; the final package, delivery plan, and availability require a site-specific quote.`;
const contentText = (text, price) => (text || '').replaceAll('[PHONE]', phone).replaceAll('[STARTING PRICE]', price ? money(price) : 'a project-specific starting estimate').replace(/\bbasecamp\b/gi, 'mancamp');
const contentForState = (state) => locationContentByLocation[state];
const contentForCity = (record) => record?.regional_guide_location ? locationContentByLocation[record.regional_guide_location] : undefined;
const locationDescription = (content, fallback, price) => contentText(content?.subtitle, price) || fallback;
const incidentText = (content, price) => contentText(content?.incidentAnalysis, price);
const regionsForState = (state) => (regionCities[state] || []).map((cities, index) => ({
  name: `Around ${cities[0] || `Region ${index + 1}`}`,
  cities,
}));
const cityRecordFor = (state, city) => cityRecords.find((record) => record.state === state && slugify(record.representative_city) === slugify(city)) || cityRecords.find((record) => record.page_layout_data?.slug === city);
const locationsForState = (state) => cityRecords
  .filter((record) => record.state === state)
  .map((record) => record.representative_city)
  .filter(Boolean);
const cityHref = (state, city) => `/service-areas/${slugify(state)}/${slugify(city)}/`;
const stateHref = (state) => `/service-areas/${slugify(state)}/`;

function navigate(href) {
  window.history.pushState({}, '', href);
  window.dispatchEvent(new Event('popstate'));
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function Link({ href, children, className = '', onClick, ...props }) {
  const handleClick = (event) => {
    if (onClick) onClick(event);
    if (event.defaultPrevented || !href || !href.startsWith('/') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(href);
  };
  return <a href={href} className={className} onClick={handleClick} {...props}>{children}</a>;
}

function Shell({ children, className = '' }) { return <div className={`shell ${className}`}>{children}</div>; }
function Eyebrow({ children }) { return <span className="eyebrow"><i />{children}</span>; }

function Header({ onContact }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [activeInventoryCategory, setActiveInventoryCategory] = useState(0);
  const inventoryCloseTimer = useRef(null);
  const openInventory = () => {
    if (inventoryCloseTimer.current) window.clearTimeout(inventoryCloseTimer.current);
    inventoryCloseTimer.current = null;
    setInventoryOpen(true);
  };
  const scheduleInventoryClose = () => {
    if (inventoryCloseTimer.current) window.clearTimeout(inventoryCloseTimer.current);
    inventoryCloseTimer.current = window.setTimeout(() => {
      setInventoryOpen(false);
      inventoryCloseTimer.current = null;
    }, 500);
  };
  useEffect(() => () => { if (inventoryCloseTimer.current) window.clearTimeout(inventoryCloseTimer.current); }, []);
  useEffect(() => setMenuOpen(false), [window.location.pathname]);
  return <>
    <header className="site-header">
      <Shell className="nav-shell">
        <Link href="/" className="brand" aria-label="Oil Field Equipment Rentals home"><img src="/oil-field-equipment-rentals-logo.svg" alt="Oil Field Equipment Rentals" /></Link>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <Link href="/">Home</Link>
          <div className={`nav-dropdown ${inventoryOpen ? 'is-open' : ''}`} onMouseEnter={openInventory} onMouseLeave={scheduleInventoryClose} onFocus={openInventory} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) scheduleInventoryClose(); }}>
            <button type="button" aria-expanded={inventoryOpen} aria-controls="inventory-dropdown" onClick={openInventory}>INVENTORY <ChevronDown size={16} /></button>
            <div className="inventory-panel reference-inventory-panel" id="inventory-dropdown" role="group" aria-label="Equipment rental inventory menu">
              <div className="inventory-panel-heading"><div><span>Commercial remote mancamp rentals</span><strong>Eight connected trailer types for one temporary site package</strong></div><Link href="/equipment-rental/">View All Equipment <ArrowRight size={16} /></Link></div>
              <div className="inventory-panel-body"><div className="inventory-category-list">{inventoryCategories.map((category, index) => <button type="button" className={`inventory-category-link ${activeInventoryCategory === index ? 'is-active' : ''}`} key={category.name} onMouseEnter={() => setActiveInventoryCategory(index)} onFocus={() => setActiveInventoryCategory(index)} onClick={() => setActiveInventoryCategory(index)}>{category.name}<ChevronRight size={18} /></button>)}</div><section className="inventory-submenu" aria-label={`${inventoryCategories[activeInventoryCategory].name} models`}><div className="inventory-submenu-heading"><div><span>Available configurations</span><strong>{inventoryCategories[activeInventoryCategory].name}</strong></div><Link href={inventoryCategories[activeInventoryCategory].href}>Category Overview <ArrowRight size={16} /></Link></div><p>{inventoryCategories[activeInventoryCategory].description}</p><div className="inventory-submenu-links">{inventoryCategories[activeInventoryCategory].links.map(([name, href]) => <Link href={href} key={href}>{name}<ArrowRight size={15} /></Link>)}</div></section></div>
            </div>
          </div>
          <Link href="/service-areas/">Service Areas</Link>
          <Link href="/rental-calculator/">Calculator</Link>
          <Link href="/about-us/">About Us</Link>
          <Link href="/blog/">Articles</Link>
          <Link href="/contact-us/">Contact Us</Link>
        </nav>
        <a className="header-call" href={phoneHref}><Phone size={16} /><span>Call our team<strong>{phone}</strong></span></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</button>
      </Shell>
    </header>
  </>;
}

function Footer() {
  return <footer className="footer-band"><Shell className="footer-grid">
    <div><Link href="/" className="footer-brand"><img src="/oil-field-equipment-rentals-logo-dark.svg" alt="Oil Field Equipment Rentals" /></Link><p>Commercial remote mancamp facility rentals for construction, renovation, industrial, emergency-response, and other high-headcount sites.</p></div>
    <div><Eyebrow>Explore</Eyebrow><Link href="/mancamp/">Mancamp package</Link><Link href="/services/">Inventory components</Link><Link href="/service-areas/">Service areas</Link><Link href="/rental-calculator/">Package estimator</Link></div>
    <div><Eyebrow>Plan</Eyebrow><Link href="/about-us/">Rental process</Link><Link href="/contact-us/">Request availability</Link><Link href="/blog/">Articles</Link></div>
    <div><Eyebrow>Call us</Eyebrow><a className="footer-phone" href={phoneHref}>{phone}</a><p>Pricing, route timing, site fit, configuration, and final availability are confirmed through the company quote.</p></div>
  </Shell><div className="copyright"><Shell>© 2026 Oil Field Equipment Rentals. All rights reserved.</Shell></div></footer>;
}

function Carousel({ slides, label = 'Inventory carousel', renderCaption }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || slides.length < 2) return undefined;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5500);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);
  const current = slides[active];
  return <figure className="image-carousel" aria-label={label}>
    <div className="carousel-frame"><img src={current.image} alt={current.name} />
      <button className="carousel-arrow prev" type="button" onClick={() => { setPaused(true); setActive((active - 1 + slides.length) % slides.length); }} aria-label="Previous image"><ChevronLeft /></button>
      <button className="carousel-arrow next" type="button" onClick={() => { setPaused(true); setActive((active + 1) % slides.length); }} aria-label="Next image"><ChevronRight /></button>
    </div>
    {renderCaption ? renderCaption(current) : null}
  </figure>;
}

function Button({ href, children, className = '', onClick }) { return href ? <Link href={href} className={`button ${className}`}>{children}</Link> : <button type="button" className={`button ${className}`} onClick={onClick}>{children}</button>; }

function HomeHero({ onContact }) {
  return <section className="hero-band"><Shell className="hero-grid">
    <div className="hero-copy"><Eyebrow>Commercial remote mancamp facilities · nationwide</Eyebrow><h1>Commercial remote mancamp facility rentals for the whole worksite.</h1><p>Oil Field Equipment Rentals builds temporary remote mancamp facility rentals around construction, renovation, infrastructure, industrial, and emergency-response sites with large workforces. One package can coordinate feeding, cold storage, dishwashing, sleeping, showers, restrooms, and laundry through one rental plan.</p><div className="hero-actions"><Button href="/mancamp/" className="button-blue">Plan a mancamp package <ArrowRight size={17} /></Button><Button href="#inventory" className="button-ghost">Explore package components</Button></div><small>Mancamp is our primary term; basecamp describes the same temporary field-support package.</small></div>
    <div className="hero-visual"><div className="hero-note"><span>Your project</span><strong>Build the mancamp package.</strong></div><Carousel slides={services.slice(0, 3).flatMap((service) => gallerySlides(service, 2))} label="Mancamp package component references" /><a className="hero-phone" href={phoneHref}><span>24/7 rental support</span><strong>{phone}</strong><ArrowDownRight size={18} /></a></div>
  </Shell><Shell className="hero-rail">{heroRailServices.map((service) => <Link href={`/services/${service.slug}/`} key={service.slug}><strong>{service.railLabel}</strong><span>{service.name}</span></Link>)}</Shell></section>;
}

function Inventory({ onContact, packageFocus = true }) {
  const [filter, setFilter] = useState('all');
  const sourceServices = packageFocus ? mancampPackageServices : services;
  const visible = sourceServices.filter((service) => filter === 'all' || (filter === 'kitchen' ? service.family === 'Kitchen family' : service.family !== 'Kitchen family'));
  return <section className="section light-band" id="inventory"><Shell><div className="section-head"><div><Eyebrow>{packageFocus ? 'Eight connected package components' : 'Nine connected facility types'}</Eyebrow><h2>{packageFocus ? 'One commercial remote mancamp facility rental.' : 'Start with the kitchen. Keep the whole site in view.'}</h2></div><p>{packageFocus ? 'These eight trailer types work together as one temporary remote mancamp facility rental for high-headcount sites. Choose the package around workforce size, site phase, utilities, access, and operating schedule; handwashing can be added when the site plan requires it.' : 'Explore mobile kitchens, dishwashing, refrigeration, and the supporting facility families that can be coordinated around a temporary or remote project.'}</p></div><div className="filter-row"><button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>{packageFocus ? 'Package components' : 'All facilities'} <span>{packageFocus ? '8' : '9'}</span></button><button className={filter === 'kitchen' ? 'active' : ''} onClick={() => setFilter('kitchen')}>{packageFocus ? 'Food service' : 'Kitchen family'} <span>3</span></button><button className={filter === 'support' ? 'active' : ''} onClick={() => setFilter('support')}>{packageFocus ? 'Workforce support' : 'Supporting'} <span>{packageFocus ? '5' : '6'}</span></button></div><div className="service-grid">{visible.map((service, index) => <article className={`service-card ${index === 0 ? 'featured' : ''}`} key={service.slug}><Link href={`/services/${service.slug}/`}><div className="service-image"><img src={service.image} alt={service.name} loading={index > 2 ? 'lazy' : 'eager'} /><span className="service-index">{String(index + 1).padStart(2, '0')}</span></div><span className="card-kicker">{packageFocus ? (service.family === 'Kitchen family' ? 'Mancamp food service' : 'Mancamp workforce support') : service.family}</span><h3>{service.name}</h3><p>{service.description}</p><span className="card-link">{packageFocus ? 'View component details' : 'Explore this facility'} <ArrowRight size={16} /></span></Link></article>)}<aside className="service-grid-cta"><div><Eyebrow>{packageFocus ? 'Need a complete package?' : 'Need help choosing?'}</Eyebrow><h3>{packageFocus ? 'Plan one facility rental around the whole site.' : 'Check availability for your project.'}</h3><p>{packageFocus ? 'Tell us the workforce, project phase, location, utilities, and schedule. The rental team will map the eight core components and confirm the package by quote.' : 'Tell us what needs to stay operational and our rental team will help match the right facility, route, and timing.'}</p></div>{packageFocus ? <Button href="/mancamp/" className="button-blue">Build the package <ArrowRight size={16} /></Button> : <Button onClick={onContact} className="button-blue">Check availability <ArrowRight size={16} /></Button>}</aside></div></Shell></section>;
}

function Process() {
  const steps = [{ step: 1, title: 'Scope the workforce', description: 'Share headcount, shifts, site location, project phase, and which living or operating functions must stay available.' }, { step: 2, title: 'Shape the package', description: 'Coordinate feeding, cold storage, dishwashing, sleeping, showers, restrooms, and laundry around the approved site plan.' }, { step: 3, title: 'Coordinate deployment', description: 'Confirm access, utilities, placement, schedule, setup scope, servicing, and the transition plan with one rental team.' }];
  return <section className="section process-band"><Shell className="process-grid"><div className="process-sticky"><Eyebrow>Remote mancamp rental planning</Eyebrow><h2>Keep the workforce supported while the project moves.</h2><p>Commercial remote mancamp facility rentals work best when the eight trailer components are planned as one operating system for construction, renovation, infrastructure, industrial, and emergency-response sites.</p><Button href="/mancamp/" className="button-light">Plan the mancamp package <ArrowRight size={17} /></Button></div><ol>{steps.map((step) => <li key={step.step}><span>{String(step.step).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol></Shell></section>;
}

const mapCallouts = ['Vermont', 'New Hampshire', 'Massachusetts', 'Rhode Island', 'Connecticut', 'New Jersey', 'Delaware', 'Maryland'];
const mapOffsets = { Michigan: [0, 23], Mississippi: [-4, 17], Illinois: [0, 12], Indiana: [0, -12], 'West Virginia': [0, 3], Virginia: [17, 13] };

function Geography({ onStateClick }) {
  return <svg className="usa-geography" viewBox="-25 -15 1190 690" role="group" aria-label="Geographic map of all 50 US states, each labeled with its full name">
    <defs><linearGradient id="mapGradient" x2="0.8" y2="1"><stop stopColor="#9dbbff" /><stop offset="1" stopColor="#3b6cff" /></linearGradient></defs>
    <g className="map-depth" transform="translate(0 5)" aria-hidden="true">{statesMap.map((state) => <path key={state.id} d={state.d} />)}</g>
    <g className="map-land" fill="url(#mapGradient)">{statesMap.map((state) => <path key={state.id} d={state.d} role="button" tabIndex={0} data-state={state.name} aria-label={`${state.name}: explore service options`} onClick={() => onStateClick(state.name)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onStateClick(state.name); } }}><title>{state.name}</title></path>)}</g>
    <g className="map-labels">{statesMap.map((state) => {
      const index = mapCallouts.indexOf(state.name);
      const external = index >= 0;
      const [dx, dy] = mapOffsets[state.name] || [0, 0];
      const x = external ? 1015 : state.x + dx;
      const y = external ? 130 + index * 42 : state.y + dy;
      const words = external ? [state.name] : state.name.split(' ');
      return <g key={state.id} className={external ? 'map-callout' : undefined}>
        {external ? <><path className="map-leader" d={`M${state.x},${state.y}L980,${y - 6}H1003`} /><circle className="map-leader-point" cx={state.x} cy={state.y} r="3" /><rect className="map-callout-surface" x="1003" y={y - 23} width="159" height="32" rx="4" /></> : null}
        <text x={x} y={y - (words.length - 1) * 7} textAnchor={external ? 'start' : 'middle'}>{words.map((word, wordIndex) => <tspan x={x} dy={wordIndex ? 15 : 0} key={word}>{word}</tspan>)}</text>
      </g>;
    })}</g>
    <text className="map-ocean" x="990" y="520">ATLANTIC OCEAN</text><text className="map-ocean" x="270" y="657">ALASKA AND HAWAII SHOWN AS INSETS</text>
  </svg>;
}

function ServiceAreaDirectory({ onStateClick, onContact }) {
  const [search, setSearch] = useState('');
  const [openState, setOpenState] = useState('');
  const closeTimer = useRef(null);
  const visibleStates = stateNames.filter((state) => state.toLowerCase().includes(search.toLowerCase()));
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenState(''), 500);
  };
  const toggleState = (state) => {
    cancelClose();
    setOpenState((current) => current === state ? '' : state);
  };
  useEffect(() => () => cancelClose(), []);
  return <div className="map-directory"><label className="directory-search"><span>Search states</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Type a state" /></label><div className="state-directory">{visibleStates.map((state) => { const locations = locationsForState(state); const isOpen = openState === state; const panelId = `locations-${slugify(state)}`; return <article key={state} className={`state-row${isOpen ? ' is-open' : ''}`} onMouseEnter={cancelClose} onMouseLeave={scheduleClose}><div className="state-row-inner"><Link className="state-name-link" href={stateHref(state)} onClick={() => onStateClick(state)}><span className="state-name">{state}</span><ArrowRight size={15} /></Link><button type="button" className="state-toggle" aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggleState(state)}><span>View locations</span><span className="state-count">{locations.length}</span><ChevronDown size={17} /></button></div>{isOpen && <div id={panelId} className="state-row-content"><div className="location-grid">{locations.map((location) => <Link key={location} href={cityHref(state, location)}>{location}<ArrowRight size={13} /></Link>)}</div></div>}</article>; })}<div className="directory-cta"><div><Eyebrow>Can’t find your location?</Eyebrow><h3>Check availability for your project.</h3><p>Tell us where you need service and our team will confirm coverage, routing, and current inventory.</p></div><Button onClick={onContact} className="button-white">Check availability <ArrowRight size={16} /></Button></div></div></div>;
}

const priceSizes = [
  ['20_ft', '20 ft'],
  ['25_ft', '25 ft'],
  ['30_ft', '30 ft'],
  ['35_ft', '35 ft'],
  ['40_ft', '40 ft'],
];

function PriceTable({ city, inventoryContext = false }) {
  if (!city) return <ReferencePricing inventoryContext={inventoryContext} />;
  const pricing = site.service_profile?.pricing || {};
  const kitchen = city?.prices || Object.fromEntries(priceSizes.map(([key]) => [key, (pricing.fixed_base_price || 0) + (pricing.size_surcharges?.[key] || 0)]));
  const refrigerator = pricing.temporary_refrigerator_trailer || {};
  return <section className="section pricing-band"><Shell><div className="section-head"><div><Eyebrow>Published component starting estimates</Eyebrow><h2>Build the package around the workforce and site.</h2></div><p>The table below shows kitchen and refrigerator component starting points for {city ? `${city.representative_city}'s city-specific planning` : 'site-wide planning'}. A complete commercial remote mancamp facility rental quote combines these with the other selected components, rental term, delivery, setup, and site requirements.</p></div><div className="price-table" role="table" aria-label="Kitchen and refrigerator component starting prices"><div className="price-row price-head" role="row"><span>Length</span><span>Kitchen component</span><span>Refrigerator component</span></div>{priceSizes.map(([key, label]) => <div className="price-row" role="row" key={key}><strong>{label}</strong><span>{money(kitchen[key])}</span><span>{money(refrigerator.size_prices?.[key] || 0)}</span></div>)}</div></Shell></section>;
}

function ReferencePricing({ inventoryContext = false }) {
  return <section className="section calculator-prices-band" aria-labelledby="price-guide-title"><Shell><div className="section-head"><div><Eyebrow>{inventoryContext ? 'Published starting prices' : 'Published package planning prices'}</Eyebrow><h2 id="price-guide-title">{inventoryContext ? 'A transparent planning baseline.' : 'A transparent baseline for a remote mancamp rental.'}</h2></div><p>{inventoryContext ? 'These figures are starting points in U.S. dollars and require a project-specific quote.' : 'These figures are component starting points in U.S. dollars, not a complete mancamp package price. A project-specific quote combines the selected eight components, rental term, delivery, setup, site conditions, and availability.'}</p></div><div className="calculator-tables"><div className="calculator-price-table"><h3>{inventoryContext ? 'Facility and equipment' : 'Package components and equipment'}</h3><table><thead><tr><th>Equipment</th><th>Starting price</th></tr></thead><tbody>{calculatorEquipment.filter((item) => !['sleeper-modular-container', 'man-camp'].includes(item.id)).map((item) => <tr key={item.id}><td><strong>{item.name}</strong><small>{item.details}</small></td><td>{money(item.startingPrice)}{item.perPerson ? ' per person' : ''}</td></tr>)}</tbody></table></div><div className="calculator-price-table"><h3>Trailer delivery</h3><table><thead><tr><th>Trailer length</th><th>Starting delivery</th></tr></thead><tbody>{calculatorTrailerLengths.map((length) => <tr key={length}><td>{length} ft</td><td>{money(calculatorDeliveryPrice(length))}</td></tr>)}</tbody></table></div></div><p className="calculator-disclaimer">Estimates exclude final rental duration, taxes, permits, utilities, site preparation, setup, servicing, mileage adjustments and other project-specific charges unless confirmed in writing.</p></Shell></section>;
}

function CalculatorWidget({ onContact }) {
  const calculatorStates = useMemo(() => Object.keys(calculatorCities).sort((a, b) => a.localeCompare(b)), []);
  const [form, setForm] = useState({ state: '', city: '', zipCode: '', equipment: '', length: '20', people: '1', startDate: '', endDate: '', name: '', phone: '', email: '', industry: '', projectDetails: '', consent: false });
  const [estimate, setEstimate] = useState(null);
  const [calculationStatus, setCalculationStatus] = useState('');
  const [quoteStatus, setQuoteStatus] = useState('');
  const cities = calculatorCities[form.state] || [];
  const selectedEquipment = calculatorEquipment.find((item) => item.id === form.equipment);
  const requiresPeople = Boolean(selectedEquipment?.perPerson);
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const calculate = () => {
    if (!form.state || !form.city || !form.equipment || !form.length || !form.startDate || !form.endDate || (requiresPeople && !form.people)) { setCalculationStatus('Complete the state, city, equipment, trailer length, and rental date fields first.'); return; }
    if (form.endDate < form.startDate) { setCalculationStatus('End date must be on or after the start date.'); return; }
    const start = Date.parse(`${form.startDate}T00:00:00Z`);
    const end = Date.parse(`${form.endDate}T00:00:00Z`);
    const days = Math.floor((end - start) / 86400000) + 1;
    const chargedMonths = Math.max(1, Math.ceil(days / 30));
    const equipmentPrice = selectedEquipment?.perPerson ? selectedEquipment.startingPrice * Number(form.people) : selectedEquipment?.startingPrice || 0;
    const delivery = calculatorDeliveryPrice(Number(form.length));
    const monthlySubtotal = equipmentPrice + delivery;
    setEstimate({ equipment: equipmentPrice, delivery, monthlySubtotal, chargedMonths, total: monthlySubtotal * chargedMonths });
    setCalculationStatus('Starting estimate calculated. No contact information was sent.');
  };
  const submitQuote = (event) => { event.preventDefault(); setQuoteStatus('Online exact-quote requests are not enabled yet. Your estimate remains available; call for confirmed pricing and availability.'); };
  const estimateLocation = form.city && form.state ? `${form.city}, ${form.state}${form.zipCode ? ` ${form.zipCode}` : ''}` : 'Choose your project location';
  return <section className="section calculator-band calculator-widget"><Shell className="calculator-grid"><div className="calculator-form-card"><Eyebrow>Remote mancamp package estimate</Eyebrow><h2>Tell us what your workforce site needs.</h2><p className="calculator-lead">Use the estimate as a planning baseline for a commercial remote mancamp facility rental. Select the state, city, component, trailer length, workforce details, and dates; the final eight-component package, rental period, transport charges, site work, and availability require a separate quote.</p><p className="calculator-monthly-note">Pricing is monthly. One day is charged as one month; one month plus one day is charged as two months.</p><form onSubmit={submitQuote}><div className="calculator-fields"><label>State<select name="state" autoComplete="address-level1" required value={form.state} onChange={(event) => setForm((current) => ({ ...current, state: event.target.value, city: '' }))}><option value="">Choose a state</option>{calculatorStates.map((state) => <option value={state} key={state}>{state}</option>)}</select></label><label>City<select name="city" autoComplete="address-level2" required value={form.city} disabled={!form.state} onChange={update}><option value="">{form.state ? 'Choose a city' : 'Choose a state first'}</option>{cities.map((city) => <option value={city} key={city}>{city}</option>)}</select></label><label>ZIP code <span className="field-optional">(optional)</span><input name="zipCode" inputMode="numeric" autoComplete="postal-code" maxLength="10" pattern="[0-9]{5}(-[0-9]{4})?" title="Enter a 5-digit ZIP code or ZIP+4." placeholder="e.g. 98362" value={form.zipCode} onChange={update} /></label><label className="calculator-wide">Package component<select name="equipment" required value={form.equipment} onChange={update}><option value="">Choose a component</option>{calculatorEquipment.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label><label>Trailer length<select name="length" required value={form.length} onChange={update}>{calculatorTrailerLengths.map((length) => <option value={length} key={length}>{length} ft</option>)}</select></label>{requiresPeople && <label>Number of people<input name="people" type="number" min="1" step="1" required value={form.people} onChange={update} /></label>}<label>Rental start date<input name="startDate" type="date" required value={form.startDate} onChange={update} /></label><label>Rental end date<input name="endDate" type="date" required value={form.endDate} onChange={update} /></label></div><button className="button button-blue calculator-calculate" type="button" onClick={calculate}>Calculate Starting Estimate <ArrowRight size={16} /></button>{calculationStatus && <p className="calculator-submit-status" role="status">{calculationStatus}</p>}<fieldset className="calculator-quote-section"><legend>Optional: request an exact quote</legend><p>Your estimate does not send your information. Complete this section only if you want our team to contact you about availability and final pricing.</p><div className="calculator-fields"><label>Name<input name="name" autoComplete="name" required minLength="2" maxLength="100" value={form.name} onChange={update} /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" required minLength="7" maxLength="30" pattern="[+()0-9 .-]+" value={form.phone} onChange={update} /></label><label className="calculator-wide">Email<input name="email" type="email" autoComplete="email" required maxLength="254" value={form.email} onChange={update} /></label><label className="calculator-wide">Industry<select name="industry" required value={form.industry} onChange={update}><option value="">Choose an industry</option><option value="construction">Construction and workforce</option><option value="government">Government and public services</option><option value="food-service">Food service and hospitality</option><option value="emergency-response">Emergency and disaster response</option><option value="other">Other</option></select></label><label className="calculator-wide">Project details <span className="field-optional">(optional)</span><textarea name="projectDetails" rows="3" maxLength="1500" placeholder="Site access, utilities, occupancy or other requirements" value={form.projectDetails} onChange={update} /></label></div><div className="honeypot" aria-hidden="true"><label>Company website<input name="website" tabIndex="-1" autoComplete="off" /></label></div><label className="calculator-consent"><input type="checkbox" name="consent" required checked={form.consent} onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))} /><span>I agree that Oil Field Equipment Rentals may use these details to prepare and respond to my quote request. <Link href="/privacy/">Read the Privacy Notice.</Link></span></label><p className="calculator-privacy">Quote-request details are securely saved only when you select Request Exact Quote.</p>{quoteStatus && <p className="calculator-submit-status" role="status">{quoteStatus}</p>}<button className="button button-outline" type="submit">Request Exact Quote <ArrowRight size={16} /></button></fieldset></form></div><aside className="estimate-card" aria-live="polite" aria-atomic="true"><span>Preliminary total</span><strong>{estimate ? money(estimate.total) : 'Choose your equipment'}</strong><dl><div><dt>Equipment starting price</dt><dd>{estimate ? money(estimate.equipment) : '—'}</dd></div><div><dt>Starting delivery</dt><dd>{estimate ? money(estimate.delivery) : '—'}</dd></div><div><dt>Monthly subtotal</dt><dd>{estimate ? money(estimate.monthlySubtotal) : '—'}</dd></div><div><dt>Charged months</dt><dd>{estimate ? estimate.chargedMonths : '—'}</dd></div><div><dt>Location</dt><dd>{estimate ? estimateLocation : '—'}</dd></div><div><dt>Equipment</dt><dd>{estimate ? selectedEquipment?.name : '—'}</dd></div></dl><p className="estimate-message">{estimate ? `Monthly starting subtotal multiplied by ${estimate.chargedMonths} charged month${estimate.chargedMonths === 1 ? '' : 's'}. One day is one month; each day after a 30-day block starts another month. Rental duration and project-specific charges are not included.` : 'Complete the fields to calculate the published monthly starting prices. Your city is used for project planning; final route, mileage, toll, ferry and site-access charges require confirmation.'}</p><a className="calculator-phone" href={phoneHref}>Call {phone} to request a quote <ArrowRight size={16} /></a>{onContact && <Button onClick={onContact} className="button-blue">Open contact form <ArrowRight size={16} /></Button>}</aside></Shell></section>;
}

function ContentWriting() {
  return <section className="section content-writing-band"><Shell className="content-writing-grid"><div><Eyebrow>What the mancamp rental plan covers</Eyebrow><h2>Capacity, utilities, and timing stay connected.</h2><p>Commercial remote mancamp facility rentals are planned as one operating package for large workforces. The eight core trailer types are matched to the site, project phase, workforce schedule, access route, utilities, and required changeovers.</p></div><div className="writing-columns"><div><h3>Prepare the site</h3><p>Review power, water, wastewater, fuel, ventilation, access, placement, servicing, and approvals for every selected component before deployment.</p></div><div><h3>Keep the workforce ready</h3><p>Coordinate food service, cold storage, dishwashing, sleeping, showers, restrooms, and laundry so the remote site can support the people assigned to it.</p></div><div><h3>Build around each phase</h3><p>Short-term, long-term, extension, relocation, and demobilization plans are reviewed against construction milestones and current availability.</p></div></div></Shell></section>;
}

function CoverageMap({ onStateClick, onContact }) {
  const [mapOpen, setMapOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const handleState = (state) => { setSelected(state); onStateClick(state); };
  return <section className="section map-band" id="service-area-map"><Shell><div className="map-heading"><div><Eyebrow>Nationwide mancamp coverage</Eyebrow><h2>Find commercial remote mancamp facility rentals by state.</h2></div><p>Choose a state to explore regional and city planning guides for temporary remote mancamp facility rentals. Confirm the workforce, route, utilities, delivery timing, package components, and availability for the exact site.</p></div><div className="map-card"><div className="map-copy"><span className="map-kicker">Find your state</span><strong>50 states</strong><p>Every state guide connects to its assigned regions, cities, local planning information, and the eight-component mancamp package.</p><select aria-label="Choose your state" value={selected} onChange={(event) => event.target.value && handleState(event.target.value)}><option value="">Choose your state</option>{stateNames.map((state) => <option key={state} value={state}>{state}</option>)}</select><div className="map-actions"><Button onClick={() => setMapOpen(true)} className="button-blue">Explore full map <ArrowUpRightIcon /></Button><a href="https://www.google.com/maps/place/United+States/" target="_blank" rel="noreferrer">Open Google Maps <ArrowRight size={15} /></a></div></div><div className="map-stage"><Geography onStateClick={handleState} /></div></div><p className="map-caption">Includes Alaska and Hawaii. Availability and delivery timing depend on your site and dates. Map boundaries: U.S. Census Bureau.</p><ServiceAreaDirectory onStateClick={onStateClick} onContact={onContact} /></Shell>{mapOpen && <Overlay title="All 50 states. One mancamp rental planning network." onClose={() => setMapOpen(false)}><p>Scroll across the map on smaller screens to read every state name.</p><div className="large-map"><Geography onStateClick={(state) => { setMapOpen(false); handleState(state); }} /></div></Overlay>}</section>;
}
function ArrowUpRightIcon() { return <ArrowRight size={16} />; }

function StateModal({ state, onClose, onContact }) {
  const [locationsOpen, setLocationsOpen] = useState(false);
  if (!state) return null;
  const detail = stateByName[state] || { state, description: `Oil Field Equipment Rentals supports mobile facility and field-service planning in ${state}.` };
  const content = contentForState(state);
  const locations = locationsForState(state);
  const panelId = `modal-locations-${slugify(state)}`;
  return <Overlay title={`${state} mancamp rental guide`} onClose={onClose} className="state-modal"><div className="state-modal-grid"><div><Eyebrow>Oil Field Equipment Rentals · nationwide service</Eyebrow><h2>{mancampLocationHeadline(state)}</h2><p>{locationDescription(content, mancampLocationDescription(state), detail.starting_price)}</p><div className="modal-actions"><Button href={stateHref(state)} className="button-blue">View state guide <ArrowRight size={16} /></Button><Button onClick={onContact} className="button-outline">Request availability</Button></div></div><div className="state-modal-side"><Carousel slides={mancampPackageServices.slice(0, 3)} label={`${state} mancamp package references`} /><div className="state-modal-location-block"><Eyebrow>State locations</Eyebrow><h3>Find your route in {state}.</h3><p>Open the locations list to see the published city guides for this state.</p><div className={`state-modal-location state-row${locationsOpen ? ' is-open' : ''}`}><div className="state-row-inner"><Link className="state-name-link" href={stateHref(state)} onClick={onClose}><span className="state-name">{state}</span><ArrowRight size={15} /></Link><button type="button" className="state-toggle" aria-expanded={locationsOpen} aria-controls={panelId} onClick={() => setLocationsOpen((open) => !open)}><span>View locations</span><span className="state-count">{locations.length}</span><ChevronDown size={17} /></button></div>{locationsOpen && <div id={panelId} className="state-row-content"><div className="location-grid">{locations.map((location) => <Link key={location} href={cityHref(state, location)} onClick={onClose}>{location}<ArrowRight size={13} /></Link>)}</div></div>}</div></div></div></div><div className="modal-call"><div><Eyebrow>24/7 response</Eyebrow><h3>Need a facility now?</h3><p>Speak directly with the rental team about your site and timing.</p></div><a className="button button-blue" href={phoneHref}>Call Now <strong>{phone}</strong> <ArrowRight size={16} /></a></div></Overlay>;
}

function Overlay({ title, onClose, children, className = '' }) { return <div className={`overlay ${className}`} role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="overlay-panel"><div className="overlay-header"><span>{title}</span><button type="button" onClick={onClose} aria-label="Close"><X size={20} /></button></div>{children}</div></div>; }

function ContactForm({ onDone }) {
  const [status, setStatus] = useState('');
  const submit = (event) => { event.preventDefault(); setStatus('Your request is ready for the rental team. We will follow up with availability and next steps.'); if (onDone) onDone(); };
  return <form className="contact-form" onSubmit={submit}><div className="form-row"><label>Name<input name="name" required placeholder="Your name" /></label><label>Company<input name="company" placeholder="Company or organization" /></label></div><div className="form-row"><label>Email<input type="email" name="email" required placeholder="you@example.com" /></label><label>Phone<input type="tel" name="phone" required placeholder="(000) 000-0000" /></label></div><div className="form-row"><label>Project location<input name="location" required placeholder="City, State or ZIP" /></label><label>Facility needed<select name="service" defaultValue=""><option value="" disabled>Choose a facility</option><option>Commercial remote mancamp facility rental package</option>{services.map((service) => <option key={service.slug}>{service.name}</option>)}</select></label></div><label>Tell us about the project<textarea name="message" rows="4" placeholder="Workforce size, site phase, access, utilities, schedule, and what needs to stay online" /></label><label className="consent"><input type="checkbox" required /> <span>I agree to be contacted about this rental request.</span></label><Button className="button-blue">Send request <ArrowRight size={16} /></Button>{status && <p className="form-status" role="status"><Check size={16} />{status}</p>}</form>;
}

function ContactModal({ onClose }) { return <Overlay title="Request a mancamp package quote" onClose={onClose} className="contact-modal"><div className="contact-modal-grid"><div><Eyebrow>Direct access, translated digitally</Eyebrow><h2>Tell us what needs to stay online.</h2><p>Share the site, workforce, dates, and facility needs. Our team will review the eight-component package, utilities, access, and availability with you.</p><a className="phone-line" href={phoneHref}><Phone size={16} /> {phone} <span>Available 24/7</span></a></div><ContactForm /></div></Overlay>; }

function PageIntro({ eyebrow, title, text, children }) { return <section className="page-intro"><Shell className={`page-intro-grid${children ? ' has-aside' : ''}`}><div className="page-intro-copy"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p></div>{children && <div className="page-intro-map"><div className="page-intro-map-label">Click a state to explore service options</div>{children}</div>}</Shell></section>; }

function ServiceAreaHero({ eyebrow, title, text, price, location, onContact }) {
  return <section className="page-intro service-area-hero"><Shell className="page-intro-grid has-aside"><div className="page-intro-copy"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p><div className="hero-actions"><Button onClick={onContact} className="button-blue">Request availability <ArrowRight size={16} /></Button></div></div><div className="service-area-hero-aside"><Carousel slides={kitchenHeroSlides} label={`${location} mancamp package component references`} renderCaption={(slide) => <p className="kitchen-carousel-caption">{slide.size} mobile kitchen component. {slide.description} This is one part of a commercial remote mancamp facility rental; the complete package and quote depend on the workforce and site.</p>} /></div></Shell></section>;
}

function CaseStudy({ content, location, price }) {
  if (!content?.incidentAnalysis) return null;
  return <section className="section case-study-band"><Shell className="case-study-grid"><div className="case-study-copy"><Eyebrow>Case study</Eyebrow><h2>What the reported work means for {location}.</h2>{incidentText(content, price).split(/\n\s*\n/).map((paragraph, index) => <p key={`${content.location}-${index}`}>{paragraph}</p>)}</div><aside className="case-study-source"><span>Source report</span><strong>{contentText(content.title, price)}</strong><small>{content.date} · {content.location}</small><p>Editorial analysis based on the linked report. It does not claim that the cited organization used Oil Field Equipment Rentals.</p><a href={content.articleUrl} target="_blank" rel="noreferrer">Read the original article <ArrowRight size={15} /></a></aside></Shell></section>;
}

function Home({ onStateClick, onContact }) { return <><HomeHero onContact={onContact} /><section className="stat-band"><Shell><div><strong>50</strong><span>states served</span></div><div><strong>08</strong><span>package components</span></div><div><strong>24/7</strong><span>rental support</span></div><div><strong>01</strong><span>point of contact</span></div></Shell></section><Inventory onContact={onContact} /><CalculatorWidget onContact={onContact} /><PriceTable /><Process /><CoverageMap onStateClick={onStateClick} onContact={onContact} /><section className="section supporting-band"><Shell className="supporting-grid"><div><Eyebrow>Mancamp package planning</Eyebrow><h2>One rental plan for the whole workforce site.</h2><p>Commercial remote mancamp facility rentals connect food service, sleeping, hygiene, laundry, and cold storage for construction, renovation, industrial, infrastructure, and emergency-response projects.</p><Link className="text-link" href="/mancamp/">Explore the mancamp package <ArrowRight size={15} /></Link></div><div className="support-list">{mancampPackageServices.slice(3, 7).map((service) => <Link href={`/services/${service.slug}/`} key={service.slug}><img src={service.image} alt="" /><span><strong>{service.name}</strong><small>{service.description}</small></span><ArrowRight size={18} /></Link>)}</div></Shell></section><ContentWriting /><section className="section faq-band"><Shell className="faq-grid"><div><Eyebrow>Planning questions</Eyebrow><h2>Make the first mancamp request more useful.</h2><p>Final package fit depends on workforce size, project phase, utility plan, placement, access, approvals, rental term, and current availability.</p></div><div><details><summary>What is included in a mancamp package?<ChevronDown size={17} /></summary><p>The core package can coordinate mobile kitchens, dishwashing, refrigeration, showers, restrooms, shower/restroom combinations, sleeper facilities, and laundry. Final components depend on the site and quote.</p></details><details><summary>Is basecamp the same as mancamp?<ChevronDown size={17} /></summary><p>We use mancamp as the primary product term. Basecamp is a commonly used field synonym for a temporary remote workforce support facility.</p></details><details><summary>What information is needed for a remote rental quote?<ChevronDown size={17} /></summary><p>Share the location, workforce count, shifts, dates, site access, utilities, placement area, operating functions, and project phase.</p></details><details><summary>Can the package change during construction?<ChevronDown size={17} /></summary><p>Extensions, relocations, additions, and reductions can be reviewed against the approved site plan, schedule, availability, and company approval.</p></details></div></Shell></section><CtaBand onContact={onContact} /></>; }

function CtaBand({ onContact, inventoryContext = false }) { return <section className="cta-band"><Shell><Eyebrow>Let’s get your project moving</Eyebrow><h2>{inventoryContext ? 'One call. A clearer equipment plan.' : 'One commercial remote mancamp facility rental plan.'}</h2><p>{inventoryContext ? 'Tell us what you need, where, when, and which facility should be reviewed first.' : 'Tell us the location, workforce, schedule, site conditions, and which functions need to stay online.'}</p><div className="cta-actions"><Button onClick={onContact} className="button-white">{inventoryContext ? 'Request availability' : 'Request a mancamp quote'} <ArrowRight size={16} /></Button><a className="cta-phone" href={phoneHref}>Call Now <strong>{phone}</strong></a></div></Shell></section>; }

function ServicesPage({ onContact }) { return <><PageIntro eyebrow="Inventory · 9 facility families" title="Start with the kitchen. Keep the whole site in view." text="Explore mobile kitchens, dishwashing, refrigeration, and the supporting facility families that can be coordinated around a temporary or remote project." /><Inventory onContact={onContact} packageFocus={false} /><CtaBand onContact={onContact} inventoryContext /></>; }

function MancampPage({ onContact }) {
  return <><PageIntro eyebrow="Commercial remote mancamp facility rentals" title="One temporary facility package for the whole worksite." text="Plan a remote commercial mancamp facility rental around construction, renovation, infrastructure, industrial, emergency-response, and other high-headcount projects. Mancamp is our primary term; basecamp is the field synonym for the same coordinated package." /><section className="section mancamp-authority-band"><Shell><div className="section-head"><div><Eyebrow>Eight core trailer types</Eyebrow><h2>Coordinate the workforce site as one rental plan.</h2></div><p>The package connects food service, hygiene, sleeping, laundry, and cold storage instead of forcing the project team to plan each trailer as a separate product. Handwashing can be added when the approved site plan requires a separate sanitation station.</p></div><div className="service-grid mancamp-component-grid">{mancampPackageServices.map((service, index) => <article className={`service-card ${index === 0 ? 'featured' : ''}`} key={service.slug}><Link href={`/services/${service.slug}/`}><div className="service-image"><img src={service.image} alt={service.name} loading={index > 2 ? 'lazy' : 'eager'} /><span className="service-index">{String(index + 1).padStart(2, '0')}</span></div><span className="card-kicker">{service.family === 'Kitchen family' ? 'Food service component' : 'Workforce support component'}</span><h3>{service.name}</h3><p>{service.description}</p><span className="card-link">Review component details <ArrowRight size={16} /></span></Link></article>)}</div></Shell></section><section className="section mancamp-use-cases"><Shell className="two-column"><div><Eyebrow>Where the package fits</Eyebrow><h2>Built for remote workforces and changing site phases.</h2><p>Use the package when crews need a coordinated temporary living and operating base while permanent facilities are being built, renovated, repaired, expanded, or brought online.</p></div><div className="numbered-list"><div><span>01</span><strong>Construction and infrastructure</strong><p>Support crews working beyond permanent food, hygiene, sleeping, and laundry capacity.</p></div><div><span>02</span><strong>Renovation and shutdowns</strong><p>Keep people supported while permanent facilities move through phased work or commissioning.</p></div><div><span>03</span><strong>Emergency and industrial response</strong><p>Plan a temporary remote basecamp facility rental around changing workforce, access, and service requirements.</p></div></div></Shell></section><section className="section mancamp-planning-band"><Shell className="process-grid"><div className="process-sticky"><Eyebrow>Package planning inputs</Eyebrow><h2>Start with the people, the place, and the phase.</h2><p>Share the workforce count, shift pattern, location, access route, utility conditions, expected rental term, and the functions that must remain operational. The rental team can then confirm the right component mix and quote.</p><Button onClick={onContact} className="button-blue">Request a mancamp quote <ArrowRight size={16} /></Button></div><ol><li><span>01</span><div><h3>Workforce profile</h3><p>Headcount, rooms, shifts, meals, hygiene, laundry, and operating hours.</p></div></li><li><span>02</span><div><h3>Site conditions</h3><p>Placement, access, power, water, wastewater, fuel, ventilation, and approvals.</p></div></li><li><span>03</span><div><h3>Deployment sequence</h3><p>Delivery, setup, servicing, expansion, relocation, extension, and demobilization.</p></div></li></ol></Shell></section><CtaBand onContact={onContact} /></>;
}

function InventoryAvailabilityForm({ serviceName }) {
  const [ready, setReady] = useState(false);
  return <aside className="inventory-availability" aria-label={`Request ${serviceName} availability`}><Eyebrow>Quick availability request</Eyebrow><h2>Need a trailer fast?</h2><p>Share the basics or call our 24/7 team at <a href={phoneHref}>{phone}</a>.</p><form onSubmit={(event) => { event.preventDefault(); setReady(true); }}><label>Name<input name="name" autoComplete="name" required /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label><label>Project location<input name="location" required /></label><label>Needed date<input name="date" type="date" /></label><label>Service<input name="service" value={serviceName} readOnly /></label><button className="button button-blue" type="submit">Prepare request <ArrowRight size={16} /></button>{ready && <p className="inventory-form-note" role="status">Your details are ready. This preview does not transmit forms yet—call {phone} for immediate service.</p>}</form></aside>;
}

function InventoryEquipmentPlan() {
  const equipment = site.service_profile?.equipment || {};
  return <section className="section inventory-equipment-plan"><Shell><div className="section-head"><div><Eyebrow>Preparation · cooking · utilities</Eyebrow><h2>The kitchen is a working system, not just a trailer.</h2></div><p>{site.inventory?.family_definition || 'Each kitchen includes a stove, oven, and essential cooking utensils. Additional equipment options are available through 24/7 support.'}</p></div><div className="inventory-plan-grid"><article><h3>Cooking &amp; preparation</h3><p>{equipment.cooking?.[0] || 'Review the cooking line and appliance schedule for the selected configuration.'}</p><p>{equipment.preparation?.[0] || 'Plan preparation space around menu, meal volume, and service timing.'}</p></article><article><h3>Sanitation &amp; dishwashing</h3><p>{equipment.sanitation?.[0] || 'Confirm dishwashing capacity, hot water, drainage, and service flow.'}</p><p>{site.service_profile?.sanitation_plan?.confirmation_note || 'Confirm sanitation requirements with the rental team.'}</p></article><article><h3>Utilities &amp; site access</h3><p>{equipment.utilities?.[0] || 'Confirm power, water, wastewater, fuel, ventilation, and delivery access.'}</p></article><article><h3>Refrigeration &amp; storage</h3><p>{equipment.refrigeration?.[0] || 'Review temperature-controlled storage against the operation.'}</p><p>{equipment.storage?.[0] || 'Plan loading access and supply movement.'}</p></article></div></Shell></section>;
}

function InventoryCategoryPage({ slug, onContact }) {
  const service = services.find((item) => item.slug === slug) || services[0];
  const options = referenceTrailerOptions[slug] || [];
  const isKitchen = service.family === 'Kitchen family';
  return <article className="inventory-category-page"><div className="inventory-category-hero"><Shell className="service-hero-grid"><div><nav className="inventory-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services/">Inventory</Link><span>/</span><span>{service.name}</span></nav><Eyebrow>{service.family} · nationwide rentals</Eyebrow><h1>{serviceH1[service.slug] || service.name}</h1><p>{service.description}</p><a className="button button-blue" href="#inventory-options">View trailer options <ArrowRight size={16} /></a></div><img className="inventory-category-hero-image" src={service.image} alt={service.name} /></Shell></div><section className="section inventory-options" id="inventory-options"><Shell className="inventory-options-layout"><div><div className="section-head"><div><Eyebrow>Available configurations</Eyebrow><h2>Explore {service.name.toLowerCase()}.</h2></div><p>These trailer names and photos come directly from the supplied inventory. Exact configuration, tier, capacity, site fit, and current availability are confirmed during the quote.</p></div><div className="inventory-options-grid">{options.map((name, index) => <article className="inventory-option-card" key={name}><img src={service.gallery[index % service.gallery.length]} alt={name} /><div><span>{String(index + 1).padStart(2, '0')} · {service.family}</span><h3>{name}</h3><p>Request current availability and confirm the equipment package for your project location.</p><a href={phoneHref}>Check this trailer <ArrowRight size={15} /></a></div></article>)}</div></div><InventoryAvailabilityForm serviceName={service.name} /></Shell></section>{isKitchen ? <><InventoryEquipmentPlan /><PriceTable inventoryContext /></> : <section className="section inventory-support-note"><Shell><h2>Plan this facility around the whole site.</h2><p>Configuration, utilities, placement, access, rental term, and availability are reviewed with the company quote. This supporting category does not replace the JSON-defined kitchen, dishwasher, and refrigerator family.</p></Shell></section>}<CtaBand onContact={onContact} inventoryContext /></article>;
}

function InventoryDetailPage({ detail, sourcePath, onContact }) {
  const service = referenceServiceForDetail(detail);
  const slides = gallerySlides(service, Math.min(6, service.gallery.length));
  const category = inventoryCategories.find((item) => item.name === detail.category);
  const related = (category?.links || []).filter(([, href]) => href !== sourcePath);
  return <article className="inventory-model-page">
    <section className="inventory-model-hero-band">
      <Shell className="inventory-model-hero-grid">
        <div>
          <nav className="inventory-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/equipment-rental/">Inventory</Link><span>/</span><Link href={detail.categoryHref || category?.href || '/equipment-rental/'}>{detail.category}</Link></nav>
          <Eyebrow>Explore the configuration</Eyebrow>
          <h1>{referenceProductHeadline(detail.name)}</h1>
          <p className="inventory-model-intro">{detail.intro}</p>
          <div className="hero-actions"><a className="button button-blue" href={phoneHref}>Call Now, {detail.category} Specialist 24/7 <ArrowRight size={16} /></a><a className="inventory-model-phone" href={phoneHref}>{phone}</a></div>
        </div>
        <div className="inventory-model-hero-carousel"><Carousel slides={slides} label={detail.name} renderCaption={() => <p className="inventory-model-caption">{detail.alt || `Representative ${detail.name.toLowerCase()} image.`} Call Oil Field Equipment Rentals now for 24/7 live-agent support: {phone}.</p>} /></div>
      </Shell>
    </section>
    <section className="section inventory-model-body"><Shell className="inventory-model-information">
      <div>
        <Eyebrow>Equipment &amp; layout</Eyebrow>
        <h2>What the {detail.name} listing specifies</h2>
        <ul className="inventory-model-features">{detail.equipment.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        <p className="inventory-model-highlight">{detail.highlight}</p>
        <h2>Where {detail.name} fits</h2>
        <p>{detail.use}</p>
      </div>
      <aside className="inventory-model-planning">
        <Eyebrow>Plan before delivery</Eyebrow>
        <h2>Plan for {detail.name}</h2>
        <ol>{detail.planning.map((item) => <li key={item}>{item}</li>)}</ol>
        <div className="inventory-model-confirm"><h3>Confirm this configuration</h3><p>{detail.unknown} Availability, final equipment and service arrangements are confirmed in your proposal.</p></div>
        <a className="button button-blue" href={phoneHref}>Emergency support 24/7 <ArrowRight size={16} /></a>
      </aside>
    </Shell></section>
    <section className="section inventory-model-related"><Shell><Eyebrow>Compare the options</Eyebrow><h2>More {detail.category.toLowerCase()}</h2><div className="inventory-related-grid">{related.map(([name, href]) => <Link key={href} href={href}><strong>{name}</strong><ArrowRight size={16} /></Link>)}</div></Shell></section>
  </article>;
}

function ServicePage({ slug, onContact }) { const service = services.find((item) => item.slug === slug) || services[0]; const slides = gallerySlides(service); const cardGallery = service.cardGallery || service.gallery; return <><section className="service-hero-band"><Shell className="service-hero-grid"><div><Eyebrow>{service.family} · nationwide rentals</Eyebrow><h1>{serviceH1[service.slug] || service.name}</h1><p>{service.description}</p><div className="hero-actions"><Button onClick={onContact} className="button-blue">Request availability <ArrowRight size={16} /></Button><Button href="/service-areas/" className="button-ghost dark">Find your area</Button></div></div><Carousel slides={slides} label={`${service.name} images`} /></Shell></section><section className="section service-content-band"><Shell className="two-column"><div><Eyebrow>Plan the facility around the whole site</Eyebrow><h2>Configuration, utilities, placement, access, and timing stay connected.</h2><p>Final pricing and availability are confirmed through the company quote. Start with the project location and the functions that need to stay operational, then build the approved facility package with our team.</p></div><div className="numbered-list"><div><span>01</span><strong>Site fit</strong><p>Review access, placement, clearance, and delivery constraints.</p></div><div><span>02</span><strong>Utility plan</strong><p>Confirm power, water, wastewater, fuel, and ventilation requirements.</p></div><div><span>03</span><strong>Operational handoff</strong><p>Align setup, rental duration, support, and return sequence.</p></div></div></Shell></section><section className="section trailer-band"><Shell><div className="section-head"><div><Eyebrow>Representative options</Eyebrow><h2>Choose a starting configuration.</h2></div><p>These examples help frame the conversation. The final equipment package is reviewed against the exact project site.</p></div><div className="trailer-grid">{cardGallery.slice(0, 3).map((image, index) => <article key={image}><img src={image} alt={`${service.name} option ${index + 1}`} /><div><span>Option {String(index + 1).padStart(2, '0')}</span><h3>{service.name}</h3><Button onClick={onContact} className="text-button">Ask about this configuration <ArrowRight size={15} /></Button></div></article>)}</div></Shell></section><PriceTable /><CtaBand onContact={onContact} /></>; }

function ServiceAreasPage({ onStateClick, onContact }) { return <><PageIntro eyebrow="50 state guides · remote mancamp planning" title="Temporary remote workforce facility rentals by state." text="Every state page links to regional and city guides for temporary remote mancamp facility rentals. Use the location context to plan workforce size, access, utilities, delivery timing, and the eight-component package." /><CoverageMap onStateClick={onStateClick} onContact={onContact} /><CtaBand onContact={onContact} /></>; }

function StatePage({ state, onStateClick, onContact }) { const info = stateByName[state] || { state, h1: mancampLocationHeadline(state), description: mancampLocationDescription(state) }; const content = contentForState(state); const regions = regionsForState(state); return <><ServiceAreaHero eyebrow={`Service area · ${state}`} title={mancampLocationHeadline(state)} text={locationDescription(content, mancampLocationDescription(state), info.starting_price)} price={info.starting_price || 0} location={state} onContact={onContact} /><section className="section state-detail-band"><Shell className="state-detail-grid"><div><Eyebrow>Choose a local mancamp planning guide</Eyebrow><h2>{state} by region and city.</h2><p>Use the regional list to move into a city-specific commercial remote mancamp facility rental guide, then call for the exact site, workforce, and dates.</p><Button onClick={() => onContact()} className="button-blue">Request availability <ArrowRight size={16} /></Button></div><div className="region-detail-grid">{regions.map((region) => <details key={region.name} open={region === regions[0]}><summary>{region.name}<span>{region.cities.length} cities <ChevronDown size={15} /></span></summary><div className="city-links">{region.cities.map((city) => <Link key={city} href={cityHref(state, city)}>{city}</Link>)}</div></details>)}</div></Shell></section><section className="section state-map-band"><Shell><CoverageMap onStateClick={onStateClick} onContact={onContact} /></Shell></section><CaseStudy content={content} location={state} price={info.starting_price} /><CtaBand onContact={onContact} /></>; }

function CityPage({ state, city, onContact }) { const record = cityRecordFor(state, city); const label = record?.representative_city || city; const info = record?.page_layout_data || {}; const price = record?.prices?.['20_ft'] || info.starting_price || 0; const content = contentForCity(record); return <><ServiceAreaHero eyebrow={`Service area · ${state} · ${label}`} title={mancampCityHeadline(`${label}, ${state}`)} text={locationDescription(content, mancampLocationDescription(`${label}, ${state}`), price)} price={price} location={`${label}, ${state}`} onContact={onContact} /><section className="section city-facts-band"><Shell className="facts-grid"><div><span>Package anchor estimate</span><strong>{money(price)}</strong><small>20 ft kitchen component</small></div><div><span>Planning ETA</span><strong>{info.delivery_time_range?.display || 'By quote'}</strong><small>route-dependent</small></div><div><span>Availability</span><strong>{info.availability_label || 'By request'}</strong><small>package dependent</small></div><div><span>Service hours</span><strong>{info.service_hours || '24/7 response'}</strong><small>project dependent</small></div></Shell></section><PriceTable city={{ ...record, representative_city: label, state }} /><section className="section nearby-band"><Shell><div className="section-head"><div><Eyebrow>Package components</Eyebrow><h2>Build around the whole workforce site.</h2></div><p>Review the core mancamp components most often coordinated for this location, then request a site-specific quote.</p></div><div className="mini-service-grid">{mancampPackageServices.slice(0, 3).map((service) => <Link key={service.slug} href={`/services/${service.slug}/`}><img src={service.image} alt="" /><span>{service.name}</span><ArrowRight size={16} /></Link>)}</div></Shell></section><CaseStudy content={content} location={`${label}, ${state}`} price={price} /><CtaBand onContact={onContact} /></>; }

function CalculatorPage({ onContact }) { return <><PageIntro eyebrow="Remote mancamp package estimate" title="Temporary remote workforce facility rental estimate." text="Select a location, package component, trailer length, and dates for a starting planning baseline. Final package pricing includes the selected components, rental period, route, setup, site conditions, and availability review." /><CalculatorWidget onContact={onContact} /><PriceTable /><CtaBand onContact={onContact} /></>; }

function AboutPage({ onContact }) { return <><PageIntro eyebrow="About the rental team" title="Direct access for remote workforce facility rentals." text="Oil Field Equipment Rentals helps construction, renovation, infrastructure, industrial, emergency-response, and other high-headcount sites plan one temporary facility package around the workforce and project phase." /><section className="section about-band"><Shell className="two-column"><div><Eyebrow>Information without noise</Eyebrow><h2>Keep the package clear, close, and useful.</h2><p>Every project starts with a real operating constraint: a new site needs support, a permanent facility is being renovated, or a workforce must operate beyond the existing capacity. Our job is to connect the eight trailer components, route, utility plan, timing, servicing, and transition into one practical rental conversation.</p></div><div className="manifesto"><p>“When the permanent facility changes, the operating plan has to move with it.”</p><span>Oil Field Equipment Rentals</span></div></Shell></section><Process /><CtaBand onContact={onContact} /></>; }

function BlogPage({ onContact }) { const articles = site.site_identity_articles || []; return <><PageIntro eyebrow="Articles and planning notes" title="Useful context for remote workforce facility rentals." text="Read the practical questions behind construction workforce support, renovation phases, emergency response, and temporary basecamp planning. Then talk with the rental team about your specific site." /><section className="section article-band"><Shell className="article-grid">{articles.slice(0, 6).map((article, index) => <article key={`${article.title}-${index}`}><span>{article.date || 'Planning note'}</span><h2>{article.title}</h2><p>{article.rental_relevance || article.event_summary || 'Context for a temporary remote mancamp facility rental conversation.'}</p><a href={article.source_url} target="_blank" rel="noreferrer">Read source <ArrowRight size={15} /></a></article>)}{!articles.length && <article><span>Planning note</span><h2>What to prepare before requesting a mancamp rental.</h2><p>Start with the site address, workforce count, dates, access route, utility plan, placement, and the functions that need to remain operational.</p></article>}</Shell></section><CtaBand onContact={onContact} /></>; }

function ContactPage() { return <><PageIntro eyebrow="Contact us" title="Start a temporary remote workforce facility rental plan." text="Tell us the site, workforce, schedule, access, utilities, and functions that must stay online. The rental team can shape the next step around the eight-component package." /><section className="section contact-page-band"><Shell className="contact-page-grid"><div><Eyebrow>24/7 rental support</Eyebrow><h2>One point of contact for the whole site.</h2><p>Use the form to send the basics, or call directly for urgent planning.</p><a className="phone-line large" href={phoneHref}><Phone size={17} /> {phone} <span>Available 24/7</span></a></div><ContactForm /></Shell></section></>; }

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [stateModal, setStateModal] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  useEffect(() => { document.title = path === '/' ? 'Oil Field Equipment Rentals | Mobile Facilities' : `${path.split('/').filter(Boolean).at(-1)?.replaceAll('-', ' ') || 'Oil Field Equipment Rentals'} | Oil Field Equipment Rentals`; }, [path]);
  const pathParts = path.split('/').filter(Boolean);
  const referenceDetail = referenceDetailForPath(path);
  let page;
  if (referenceDetail) page = <InventoryDetailPage detail={referenceDetail} sourcePath={path} onContact={() => setContactOpen(true)} />;
  else if (path === '/') page = <Home onStateClick={setStateModal} onContact={() => setContactOpen(true)} />;
  else if (path === '/services/' || path === '/inventory/') page = <ServicesPage onContact={() => setContactOpen(true)} />;
  else if (path === '/mancamp/' || path === '/basecamp/') page = <MancampPage onContact={() => setContactOpen(true)} />;
  else if (inventoryRouteMap[path] === 'services') page = <ServicesPage onContact={() => setContactOpen(true)} />;
  else if (inventoryRouteMap[path]) page = <InventoryCategoryPage slug={inventoryRouteMap[path]} onContact={() => setContactOpen(true)} />;
  else if (pathParts[0] === 'services') page = <InventoryCategoryPage slug={pathParts[1]} onContact={() => setContactOpen(true)} />;
  else if (path === '/service-areas/' || path === '/locations/') page = <ServiceAreasPage onStateClick={setStateModal} onContact={() => setContactOpen(true)} />;
  else if (pathParts[0] === 'service-areas' && pathParts.length === 2) page = <StatePage state={stateNames.find((name) => slugify(name) === pathParts[1]) || pathParts[1].replaceAll('-', ' ')} onStateClick={setStateModal} onContact={() => setContactOpen(true)} />;
  else if (pathParts[0] === 'service-areas' && pathParts.length >= 3) page = <CityPage state={stateNames.find((name) => slugify(name) === pathParts[1]) || pathParts[1].replaceAll('-', ' ')} city={pathParts[2]} onContact={() => setContactOpen(true)} />;
  else if (path === '/rental-calculator/') page = <CalculatorPage onContact={() => setContactOpen(true)} />;
  else if (path === '/about-us/') page = <AboutPage onContact={() => setContactOpen(true)} />;
  else if (path === '/blog/') page = <BlogPage onContact={() => setContactOpen(true)} />;
  else if (path === '/contact-us/' || path === '/contact/') page = <ContactPage />;
  else page = <Home onStateClick={setStateModal} onContact={() => setContactOpen(true)} />;
  return <><Header onContact={() => setContactOpen(true)} /><main>{page}</main><Footer /><button className="fixed-contact" type="button" onClick={() => setContactOpen(true)}><span>Need equipment?</span><strong>Talk to us</strong></button><a className="fixed-call" href={phoneHref}><Phone size={18} aria-hidden="true" /><span>24/7 rental help</span><strong>Call us</strong></a>{stateModal && <StateModal state={stateModal} onClose={() => setStateModal(null)} onContact={() => { setStateModal(null); setContactOpen(true); }} />}{contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}</>;
}

createRoot(document.getElementById('root')).render(<App />);
