# TemporaryKitchenRental Decision Log

## 2026-10-09 — Use a root SPA rewrite for direct location links

- Keep the state-directory and modal city links as normal anchors so Ctrl/Cmd-click, copy-link, and client-side navigation all use the same canonical URL.
- Use Vercel's standard `/(.*) -> /` rewrite for the Vite SPA. The previous `/:path* -> /index.html` rule produced production `NOT_FOUND` responses for direct state/city requests even though in-app navigation worked.
- Preserve the existing redirects before the fallback. Verify direct routes through the protected deployment URL; do not treat the external Cloudflare challenge as evidence of a route failure until the domain DNS cutover is complete.

## 2026-10-09 — Create the requested GitHub/Vercel deployment target

- Create the public GitHub repository `Temporary-123-Inc/oil-field-equipment-rentals.com` and keep `main` as the source branch.
- Use the Vercel team `temporary-124` (display name `Temporary 123`) and project `oil-field-equipment-rentals.com`; the Vercel deployment is Ready but remains protected by Vercel Authentication.
- Attach `oil-field-equipment-rentals.com` without changing registrar or DNS records. Vercel reports the existing GoDaddy nameservers/Cloudflare A records are not configured for Vercel; the owner must choose whether to update the apex records or nameservers before the custom domain can serve this deployment.
- Treat the Vercel TypeScript diagnostics from legacy API/server files as a remaining boundary, not as proof that those endpoints are production-ready. The deployed frontend is verified through the protected Vercel curl path.

## 2026-10-09 — Use workbook subtitles and incident analyses as location content

- Map the 50 state rows by exact state name and the 246 regional rows by exact `regional_guide_location`; do not infer a city from a nearby region name.
- Use each workbook subtitle as the location description in the page hero and state modal. Resolve `[PHONE]` and `[STARTING PRICE]` at render time and normalize `basecamp` to the preferred `mancamp` term.
- Keep incident analysis on the first-party location page in a `Case study` module. Show the source article title, date, and link for factual attribution, while stating that the cited organization is not claimed as an Oil Field Equipment Rentals customer.

## 2026-10-09 — Remove unverified city planning and ETA-discount claims

- The shared city-page planning-guide panel and pricing-details panel were removed because they repeated a location-planning message and exposed a city ETA-discount policy the business does not want represented.
- Keep the published kitchen/refrigerator component starting table, existing routes, package price values, and delivery-planning ETA data. Delivery timing remains a planning input; it must not be presented as a discount rule.
- Remove the false phrase from regional descriptions and pricing-basis copy across the active and legacy JSON content so it cannot surface through another regional template.

## 2026-10-09 — Full-width stacked CTA cards below 1100px

- The state-directory CTA became a narrow third-column card at medium desktop widths because the legacy breakpoint changed it to `grid-column: span 1` while its copy and button remained side by side.
- Below 1100px, make directory and service-grid CTA cards span the complete grid row, stack the action below the copy, and preserve the existing two-column desktop treatment above the breakpoint.

## 2026-10-09 — Use all caps for the Inventory navigation label

- Keep the visible top-level navigation labels consistent with the existing uppercase styling by rendering the shared Inventory label as `INVENTORY`.
- This is a presentation-only text change; inventory routes, dropdown behavior, and content remain unchanged.

## 2026-10-09 — Use viewport-safe gutters for the mobile menu

- The mobile menu inherited `padding-inline: var(--shell)` even though `--shell` is the full content width, so opening the menu created a panel wider than the viewport and pushed the links offscreen.
- Keep the menu full-width, but use a minimum 1rem gutter that grows to the centered 680px shell margin at tablet widths. This preserves alignment without allowing the menu to expand horizontally.

## 2026-10-09 — Disable the planning-column sticky behavior on mobile

- The planning section’s left copy column was sticky at every viewport size. On narrow screens, it remained over the numbered steps while the page scrolled, producing the reported heading/body collision.
- Keep the sticky two-column treatment for desktop widths, but set `.process-sticky` to `position: static` below 860px so the copy and the numbered plan are sequential, readable, and scroll-safe.

## 2026-10-09 — Keep the mobile hero support card out of the rail

- The homepage hero phone card was intruding into the following four-link rail on narrow screens because the final brand layer left the card absolutely positioned and the hero shell did not reserve the visual overflow.
- Below 860px, use normal block flow for `.hero-grid`, keep `.hero-phone` static, and add a four-rem bottom separation buffer. This preserves the desktop card treatment while making the mobile relationship explicit and stable.
- The fixed contact/help widgets remain intentionally fixed to the viewport; the audited request concerned the hero card/rail collision shown in the supplied screenshot.

## 2026-10-09 — Final brand-layer responsive hero override

- Because `industrial-rental-design.css` loads after the legacy responsive layer, its desktop `.hero-grid` rule must be explicitly reset to one column below 860px.
- On mobile, keep `.hero-visual` positioned relative so the hero callout is anchored to the visual block instead of overlapping the H1; preserve two-column composition at desktop widths.

## 2026-10-09 — Make the homepage product focus explicit

- Use `Commercial remote mancamp facility rentals for the whole worksite.` as the homepage H1 so the primary product and commercial remote intent are immediately clear.
- Retain the more expressive worksite-moving language in the surrounding hero copy and CTAs rather than leaving the H1 generic.

## 2026-10-09 — Keep package access without a header navigation item

- Remove the dedicated `Mancamp Package` link from the primary header to simplify navigation.
- Preserve direct package access through the homepage hero CTA, package CTAs, footer link, and `/mancamp/` / `/basecamp/` routes.

## 2026-10-09 — Preserve dark contrast for the estimate card

- The calculator estimate card remains a dark brand surface with orange labels and total, white values, and light explanatory text across desktop and mobile layouts.
- Brand overrides must explicitly set the estimate card background and descendant text colors together; changing only the surface can make the card appear blank or broken.

## 2026-10-09 — City-detail H1 exception

- Use `Temporary remote mancamp facility rentals in {city}, {state}` for city-detail service-area H1s so the local page directly names the mancamp product focus.
- Keep state-level and broader informational H1s on natural workforce-facility wording; retain mancamp terminology in their supporting copy and package CTAs.
- Keep inventory category and model H1s product-specific and unchanged.

## 2026-10-09 — Keep mancamp topical authority out of shared H1 phrasing

- Do not place the compound `commercial remote mancamp facility rentals` phrase in shared H1s. Use natural H1 wording such as `Temporary remote workforce facility rentals in {location}` instead.
- Keep mancamp as the primary topical term in supporting copy, eyebrows, FAQs, package sections, CTAs, and planning text so the page remains topically aligned without keyword-stacked headings.
- Leave inventory category and model H1s product-specific and unchanged.

## 2026-10-09 — Make remote commercial mancamp rentals the shared site topic

- Use `commercial remote mancamp facility rentals` as the primary shared-site phrase, with `temporary remote mancamp facility rentals` and `temporary remote basecamp facility rentals` as natural variants. Mancamp is primary; basecamp is a secondary field synonym.
- Position the eight core trailer types—mobile kitchen, dishwashing, refrigeration, shower, restroom, shower/restroom combination, sleeper/bunkbed, and laundry—as components of one package for construction, renovation, infrastructure, industrial, emergency-response, and other high-headcount sites. Handwashing remains an add-on when the site plan requires it.
- Keep inventory category and model pages product-specific to prevent package messaging from replacing exact equipment intent. Shared homepage, mancamp hub, service-area, calculator, contact, article, CTA, footer, and location-planning copy should resolve to the package topic.
- Treat location kitchen/refrigeration figures as component planning anchors, never as the complete mancamp package price. Final package, route, site, timing, and availability remain quote-based.
- Implementation is local preview only; no deployment or remote repository action is authorized by this task.

## 2026-10-09 — Supplied Oil Field brand board supersedes the prior design direction

- Use the supplied Oil Field Equipment Rentals brand board as the sole visual source for this local redesign; do not continue using the discarded `designs.md` brief or its prior reference direction.
- Centralize the implementation around `#F47920`, `#1C1C1C`, `#2D2D2D`, `#686868`, `#F2F2F0`, and white; use Bebas Neue for display headlines and Montserrat for body/UI.
- Keep the brand geometry rectangular and square-cornered across cards, buttons, inputs, panels, and navigation. Preserve existing content, routes, data, imagery, calculator behavior, service-area interactions, and form actions.
- This is a local preview-only brand implementation. Deployment, remote pushes, hosted metadata changes, and external form submission remain out of scope.

## 2026-10-08 — Paint viewport-level backgrounds while constraining inner content

- Treat an element that owns a section-level background as a viewport surface, even when a retained template puts a `.wrap` class on it or nests the surface inside another constrained wrapper.
- Give the surface full viewport width and restore the established desktop rail gutter/mobile padding inside it. Do not broaden this rule to cards, map controls, carousel frames, forms, or other intentional content panels.
- Keep the correction in the final brand layer so it applies consistently without changing route markup, copy, imagery, or interactive behavior.

## 2026-10-08 — Deploy the verified local modal update without pushing GitHub

- Deploy the owner-requested state-description modal update directly from the verified local checkout to the existing `temporary-kitchen-rental.com` Vercel project under `temporary-124`.
- Keep GitHub separate for this release: the deployment may contain the local uncommitted changes, but no repository push or remote history mutation is authorized by this deployment request.
- Preserve existing Vercel deployment protection and verify the production response through authenticated Vercel access.

## 2026-10-08 — Reuse state-page descriptions in map dialogs

- Treat `stateServiceAreaFor(name)?.description` as the source of truth for both a state location page and its service-map modal; the hidden `StateGuideCards` template carries the same value as a fallback for the DOM enhancement path.
- Keep the complete description in the modal DOM and use a CSS five-line clamp for the initial view. Reveal the compact accessible toggle only when the rendered text actually overflows, and use `aria-expanded` plus `View more` / `View less` to expose the state clearly.
- Keep this enhancement isolated to regional map/state rendering. Preserve the modal's existing state selection, dialog close behavior, regional links, carousel, routes, content, and images.

## 2026-10-08 — Use a new public repository for the decoupled site

- Store the standalone project at `Temporary-123-Inc/temporary-kitchen-rental.com`, named after the current site identity.
- Keep this checkout's `origin` pointed only to the new repository; do not reconnect it to the former source repository.
- Match the former source repository's public visibility because this project was requested as a public GitHub site repository. Deployment and domain configuration remain separate and unchanged.

## 2026-10-07 — Let semantic section surfaces own full-width backgrounds

- Treat a direct `section.wrap`, `nav.wrap`, or `footer.wrap` as a full-viewport surface with symmetric inline padding, not as a constrained painted box.
- Preserve the existing content width through the same desktop rail gutter and mobile side padding; leave nested `.wrap` elements constrained for text, cards, forms, carousels, and maps.
- Keep the fix in the final brand layer so retained page templates are corrected consistently without changing route markup, content, or interactive behavior.

## 2026-10-07 — Make the local checkout an independent Temporary Kitchen Rental site

- Use `Temporary Kitchen Rental` and `temporary-kitchen-rental.com` as the sole current site identity in visible copy, metadata, config, generated output, public logo assets, favicons, audit records, and tracked filenames.
- Preserve routes, service-area content, carousel/map behavior, images, and existing functionality; this is an identity rebrand, not a content or architecture rewrite.
- Remove the local GitHub remote and local Vercel project link. Do not push or deploy this checkout unless the owner explicitly requests a new repository/deployment connection.
- Retain local Git history for provenance. The current working tree and generated output are the scope of the residue scan; historical Git objects are not rewritten by this decision.

## 2026-10-03 — Enable indexability for eligible public routes

- The owner explicitly authorized moving from staged/preview indexing to a full public-static-route release. For all eligible canonical pages, emit `index,follow`, a self-canonical, and a sitemap entry; publish a `robots.txt` sitemap reference and allow crawling outside `/api/`.
- Keep only private tooling, duplicate legacy aliases, empty/unapproved testimonials, legacy testimonial copy with unverified attribution, and video media whose brand/rights are unverified out of the sitemap. Preserve preview-host `X-Robots-Tag: noindex, follow`.
- Do not attribute another supplier’s GSA/DLA/SBA contract or approval claims to Temporary Kitchen Rental. The GSA and approval pages must remain factual, identify that verified documents are not published there, and invite direct confirmation rather than repeating historical claims.
- A successful build/deployment means the site emits indexable pages; it does not guarantee that Google crawls, indexes, ranks, or selects those URLs. Search Console ownership/submission remains a separate verification step.

## 2026-09-30 — Keep former-brand evidence internal and publish only Temporary Kitchen Rental identity

- Preserve historical import/audit records in source when they are needed for provenance, but do not expose the former TemporaryKitchenRental name, logo, hostname, preview URL, storage namespace, or app identity in customer-facing copy or generated public assets.
- Represent recovered authority evidence publicly by exact legacy path only. Resolve any current-site links against the current Temporary Kitchen Rental origin; do not create, rename, redirect, or remove routes as part of identity cleanup.
- Sanitize final prerender title, description, and rendered copy as a defense-in-depth boundary, and fail the build verification when generated text assets contain the former identity.
- Treat binary social assets as a separate visual-verification requirement because text scanning cannot detect words baked into PNG pixels.
- Preserve the established layout, H1 intent, 75–85% primary / 15–25% supporting-family balance, domain routing, and indexing behavior.

## 2026-09-30 — Move the original domain to the current Temporary Kitchen Rental project

- Treat `temporary-kitchen-rental-team/temporary-kitchen-rental-com` as the current production project for the rebuilt Temporary Kitchen Rental site. Move the existing apex and `www` domain assignments together from the superseded `temporary-kitchen-rental-team/temporary-kitchen-rental` project rather than creating duplicate DNS records or a third project.
- Preserve `temporary-kitchen-rental.com` as a Production apex and `www.temporary-kitchen-rental.com` as a permanent 308 redirect to the apex. Leave the already-valid registrar records unchanged.
- Keep domain routing separate from SEO release approval. The current generated output remains fail-closed (`noindex,follow`, no production canonical, empty sitemap); do not describe the domain as indexable until source configuration is corrected, rebuilt, deployed, and live-verified.

## 2026-09-30 — Correct only the homepage intent-language gaps

- Preserve the verified mobile-kitchen primary family, current offering set, layout, imagery, URLs, state-directory work, and 80/20 semantic grid. Add the approved physical term `Facility` to the single H1 instead of broadening it with supporting families.
- Retain the new primary/support intro spans while making the opening answer what is rented, for whom, and for which verified commercial situations.
- Use concise support-card phrases that each contain a topical service, truthful physical type, and rental intent: mobile shower trailer rentals; shower/restroom trailer rentals; workforce housing unit rentals; refrigeration/freezer trailer rentals; and dishwashing facility rentals.
- Reject the first longer-label candidate because its rendered mobile geometry measured only 72.50% primary. The shortened compliant labels restore the mobile primary visual share to 77.45%, while desktop remains 80.00% and dedicated content measures 81.90%.
- Preserve noindex/empty-sitemap and disabled-inquiry behavior. Do not alter domains, DNS, aliases, redirects, or any URL as part of this copy-only follow-up.

## 2026-09-30 — Use service-specific labels for state directory links

- Label each shared homepage/Service Areas state link “Mobile Kitchen Trailer Rental in [State]” as requested, while preserving its state URL, Temporary Kitchen Rental brand, and adjacent region disclosure/links. Do not change the route to include the label text.

## 2026-09-30 — Keep state labels and counts visually distinct

- State names are links and Census-listed location totals are adjacent supporting text; render a visible whitespace separator between them. Preserve the wording, number formatting, routes, and responsive directory structure.

## 2026-09-30 — Keep the homepage opening strongly kitchen-first

- Lead the opening copy with temporary commercial mobile kitchens and explain meal-service continuity and kitchen planning before secondary services.
- Name all five verified supporting families in a concise follow-up sentence: dishwashing, refrigeration/freezer, mobile showers, shower/restroom combinations, and man-camp/workforce housing.
- Guard the paragraph's family-specific word share at approximately 80% kitchen / 20% support (75–85% accepted), without changing the established 80/20 portfolio cards or H1.

## 2026-09-30 — Keep the audited Mobile Kitchen release fail-closed and noindex

- Release only to the already-linked Vercel project `temporary-kitchen-rental-team/temporary-kitchen-rental-com`; do not touch the separate `Temporary-Kitchen-Rental/Temporary-Kitchen-Rental` repository, project, or domains.
- Preserve the supplied homepage business hierarchy: temporary commercial mobile kitchens lead the H1 and calls to action; the five supporting families remain directly below the intro; both desktop and mobile allocate approximately 75–85% to the primary card and 15–25% collectively to supporting cards while keeping every family name visible.
- Measure homepage copy against dedicated family-specific sections only: primary card, trust bar, model, industry, process, coverage-heading, and FAQ copy versus supporting-family cards and the supporting-equipment section. Exclude mixed introductory copy, generic calculator controls, dynamic map content, global navigation, and the footer rather than assigning shared text to either cohort. This produces a reproducible 430 / 92 word split (82.38% / 17.62%).
- Treat the 24 TemporaryKitchenRental authority URLs as foreign historical evidence, not Mobile Kitchen routes. Keep them label-only, exclude them from generated routes/internal links/indexing targets, and require true live 404 responses.
- Keep inquiries disabled until provider configuration and delivery acceptance are separately authorized. Defer provider initialization until after method, authentication, and feature gates so disabled endpoints return controlled JSON rather than module/provider failures.
- Keep `noindex,follow`, the empty sitemap, and API exclusion in robots. A successful audit/deployment is not permission to enable indexing, modify DNS/Search Console/analytics, or send a live inquiry.
- Record the broad historical Vitest failures, stale security-evidence ledger, two moderate transitive advisories, and large bundle as explicit follow-up debt rather than weakening checks or expanding this incident/audit into a broad rewrite.

## 2026-09-26 — Create an org-owned mirror for the Temporary Kitchen Rental project

- Owner requested a new repository in the TemporaryKitchenRental GitHub organization and a complete repo copy there. Created private Temporary-Kitchen-Rental/temporary-kitchen-rental.com rather than changing ownership of or deleting the source repo.
- Mirrored all Git branches and tags with their history. Set this checkout's origin to the new organization repo and retained the old personal repo as source for reference.
- Git mirroring does not migrate GitHub-only issues, pull requests, settings/secrets, branch protections, release metadata, or wiki data. Vercel source integration was not changed.

## 2026-09-24 — Restore the missing mobile-kitchen and modular-facility parent URLs

- Preserve /equipment-rental/mobile-kitchen-trailers/ as the Mobile Kitchens category URL; /24ft-mobile/ stays a distinct 24 ft product URL. Link the already verified 38 ft product detail from the category directory.
- Use the approved 24 ft gallery on the category page only under an explicit 24 ft model-photo heading and caption. Do not imply it depicts every listed size or configuration.
- Give /modular-kitchen-facilities/ its own building-focused planning content, not mobile-trailer copy or imagery. Keep the route's existing noindex policy until separately reviewed; page restoration is not an indexing approval.
- Verify both routes as generated HTML and SSR, preserve their slugs, and do not claim Vercel deployment absent direct evidence.

## 2026-09-24 — Refresh floating contact-widget wording without changing intent

- Decision: use “Need equipment? / Talk to us” on the contact-page tab and “24/7 rental help / Call us” on the urgent phone-support trigger. Preserve both contact destinations, the existing phone number and action flow.
- Positioning: make a small shared-desktop and mobile offset adjustment so the widgets sit slightly higher/inward while remaining fixed and clear of viewport edges/safe areas.
- Guard: retain Temporary Kitchen Rental red/white CTA colors and verify responsive layout when browser tooling is available; do not report browser or Vercel checks as passed without evidence.

## 2026-09-24 — Restore near-size shower-combination references only with explicit model disclosure

- Owner direction: TemporaryKitchenRental shower-combination images may be used when the image's size and actual service are a reasonable match, even if the product label differs.
- Decision: show 13 ft / 3-stall combination photos on the 12 ft all-in-one and 14 ft combination entries, and 22 ft / 6-stall combination photos on the 20 ft combination entry. These image references are visually unbranded and show the correct combined shower/restroom service. Captions identify the actual reference configuration and explicitly disclaim proof of the listed page's dimensions, stalls, floor plan or availability. Keep the 12 ft, 14 ft, and 30 ft shower-only routes held in header navigation because combo/restroom imagery is not an appropriate substitute for shower-only models.
- Decision: reuse the existing unbranded 8 ft x 40 ft refrigerated-container category illustration on the 40 ft legacy route with its visible category-reference / exact-unit disclaimer.
- Guard: do not alter route slugs or H1s; every near-size reference must remain conspicuously disclosed. Do not claim Vercel deployment without a verified project/deployment.

## 2026-09-24 — Hide only unpictured product destinations from the header inventory menu

- Evidence: server-rendered all 31 inventory menu destinations; eight product pages have no image gallery. The supplied backlinks TSV has 670 referring rows but only one target path (`/`), so it protects no product-specific slug.
- Decision: omit the eight no-gallery product links from the desktop/mobile header Inventory dropdown until an approved photo is assigned or the owner supplies a backlink-backed slug. Keep the direct URLs and all links on `/equipment-rental/` intact; this is a navigation deferral, not route removal.
- Overview behavior: Dishwashing, Shower, and Restroom & Shower Combination category actions point to their corresponding image-bearing family sections in the full inventory directory.
- Guard: add the route back to the header only after a rendered gallery is verified or an exact spreadsheet-protected destination is confirmed. Do not infer spreadsheet coverage from referring pages or anchor text.

## 2026-09-24 — Resolve inventory slugs from backlink targets, then preserve the master equivalent

- Decision: Prefer exact product paths supplied by the owner’s backlink export. When that export has only homepage targets, use the closest matching TemporaryKitchenRental master slug for approved inventory detail pages. Keep these pages in static prerender and link them from the matching equipment family so a valid slug does not resolve to a 404.
- Evidence: the provided tab-separated export has 670 rows and one unique target path (`/`). The three approved product/category slugs are present in the TemporaryKitchenRental source sitemap. The refrigerated-container path also overlaps a `service-details.json` model entry, so the catalog’s explicitly disclosed photo/caption must be passed through the model renderer rather than losing the exact model H1.
- Guard: do not infer new product specifications from a shared slug or category illustration; keep the 8 ft x 40 ft label caveat, preserve model H1s, and do not change the indexing batch or sitemap release scope as part of route recovery.

## 2026-09-24 — Fill the remaining inventory-detail photo gaps with truthful references

- Decision: Use the clean existing refrigerated-container illustration on the generic container-category detail only, with visible copy noting its printed 8 ft x 40 ft label and that it does not establish the exact target unit or availability. Use one 20 ft five-stall shower-only photo as a disclosed family reference on the 22 ft ten-stall detail; do not assign it to the 22 ft map/modals, where no exact photo is verified. Approve the exact 30 ft eight-stall shower/restroom exterior after visual confirmation of a commercial equipment yard and no TemporaryKitchenRental branding; describe it as exterior-only.
- Reason: The owner requested useful photos for inventory entries that previously had no gallery and authorized suitable clean TemporaryKitchenRental imagery, while truthful model identity and target branding remain mandatory.
- Guard: Keep the explicit size/configuration disclosures, actual image alt text, one H1, and all existing URLs/slugs. Audit all catalog entries and detail routes for a gallery without inserting mismatched photos or branded imagery.

## 2026-09-24 — Gallery captions must use target-brand rental copy, and legacy galleries sit beside page leads

- Cause: the screenshot-visible disclaimer was an unbranded generic-photo fallback, while dedicated service details could substitute a separate stale phone CTA. The shared legacy route template also placed its gallery after the page lead, producing a tall single-column sequence.
- Decision: use one shared caption builder for location, legacy model, service-detail, industry, catalog, equipment quick-view, Panhandle and Olympic Peninsula carousels. For service areas, lead in location + commercial use + exact pictured equipment + Rental or Lease order; include rental-term options, a useful product detail and Temporary Kitchen Rental’s verified 24/7 live-agent phone line. Preserve explicit size/configuration disclosures. Do not imply availability or delivery from photo captions.
- Layout: keep the existing approved images and interactive carousel/lightbox; place the target legacy page’s summary/H1/lead/action beside the gallery on desktop and stack at narrow widths. Do not replace the gallery with a static image grid.
- Guard: render-check all photographed preserved product routes and all rendered location/service captions for target phone, rental terms and absence of the generic disclaimer or TemporaryKitchenRental phone. Retain slugs, H1s, image assignment and alt text.

## 2026-09-23 — Align model pages by family and distinguish them only with verified facts

- Cause: legacy product pages had a generic shared planning block, and multiple ServiceDetail records repeated the same use/planning paragraphs across different model URLs. Several legacy data category labels also did not match the current service-menu family labels.
- Decision: keep each established slug, H1, approved image, equipment fact, and indexing setting; use deterministic per-route/per-model planning copy that helps buyers compare verified configurations and asks them to confirm facts the source does not establish. Map known legacy family labels to the current menu taxonomy so related links do not crash during server rendering.
- Truthfulness boundary: unique prose is not a basis to invent model specifications. Where the source has conflicting model identity (12 ft restroom) or near-alias combination URLs, expose the uncertainty and require owner verification rather than padding the page with differentiators. No canonical, redirect, noindex, or sitemap changes were authorized.
- Reusable guard: `docs/prompts/06_CATEGORY_AND_PAGE_DISTINCTIVENESS.md` requires family alignment and a main-content duplicate review for succeeding projects. It describes Google clustering behavior without stating a numeric similarity threshold or promising indexing.

## 2026-09-23 — Legacy product pages use family-matched planning copy

- Cause: the shared `TargetLegacyPage` used one generic food-service lead and kitchen project-brief paragraph for every restored legacy product route, without branching on its equipment family. This allowed a page with a correct restroom H1 and imagery to show kitchen-only planning instructions below it.
- Decision: Keep one stable shared page layout, but choose the lead and planning brief from the route's verified product family. Only kitchen routes discuss meals/cooking. Restroom, shower, combination, laundry, containerized laundry, sleeper, refrigeration, and dishwashing copy each discuss relevant project inputs without asserting unverified capacity or specifications.
- Guard: server-render each legacy product route in Vitest; assert its existing single H1, block kitchen-only phrases on non-kitchen pages, and retain a positive kitchen-page content assertion. Preserve routes, H1s, and image assignments.

## 2026-09-23 — Require schedule-matched imagery for restored inventory routes

- Source: owner-provided Google equipment-image schedule and instruction to replace only with images in that document.
- Decision: Exact approved model photos stay on their model pages. The owner-approved restroom-only collection may be used on restroom-size pages only with a visible caption clarifying that it does not establish the named size, stall count or layout. Other unmatched pages stay unpictured; do not borrow another length or configuration to fill a gallery.
- Inventory treatment: use `model-24` approved container imagery for Containerized Sleeper Units, not the separate two-stall sleeper-trailer photos. Do not use the legacy catalogue container image as approved 40 ft refrigeration imagery unless it is added to the schedule.
- Consequence: 26 ft bulk kitchen, 12 ft refrigerated trailer, 22 ft ten-stall shower trailer, 24 ft laundry trailer, 30 ft shower/restroom combination, and 40 ft refrigerated-container pages remain without a gallery until a matching approved file is available; routes and H1s remain unchanged.

## 2026-09-23 — Mobile Kitchen inventory includes available support equipment

Mobile kitchens, dishwashing, and refrigeration remain the primary Temporary Kitchen Rental inventory families. The confirmed available restroom, shower, restroom-and-shower, laundry, and containerized-sleeper families are also publicly listed in Inventory and the shared navigation, using their exact preserved model URLs. Use one approved representative image for each family and link exact models as text; do not reuse a family image to imply that a different-sized or differently configured unit is pictured. Exclude unrelated legacy template categories from the public target inventory.

## 2026-09-23 — Image schedule is an exact-match approval boundary

Use the owner-supplied Google equipment image schedule only as approval for the equipment/model it names. Reuse its existing processed Drive-derived derivatives where an exact rendered placement matches, retaining responsive variants and truthful alt text. Do not replace logos, maps, general editorial images, or an equipment visual with a different model solely because both categories are broadly related. Unmatched, ambiguous, excluded, residential, or duplicate assets remain out of scope until an explicit approved mapping is supplied.

## 2026-09-23 — Restore all verified original Mobile Kitchen product URLs

- Source: owner approval to restore every product path present on the original Temporary Kitchen Rental site, plus the original homepage navigation inspected on 2026-09-23.
- Decision: Serve all 16 formerly missing exact slugs directly and restore their restroom, shower, combined restroom/shower, laundry, containerized laundry, and containerized sleeper families to the Inventory navigation. Do not redirect them to a kitchen page or a generic planning page.
- Content and image boundary: The original site blocks sitemap and individual-page retrieval, so each page uses conservative target-owned planning copy and only a matching verified gallery. When no exact asset is verified, state that clearly rather than substituting a different model.
- SEO boundary: This approval covers routing and useful page restoration; it does not prove a complete historic sitemap nor change the existing controlled indexing policy.

## 2026-09-23 — Preserved Mobile Kitchen location URLs include the reviewed carousel

The target-only state and city URLs (for example `/massachusetts/`) use a dedicated route component rather than the Temporary Kitchen Rental state-page component. Each location route must render the shared reviewed Mobile Kitchen trailer carousel with its existing arrows, pause control, thumbnails, and lightbox. Its gallery headline is deliberately specific to a commercial Mobile Kitchen trailer so no unrelated TemporaryKitchenRental equipment is selected. The visible page H1 and URL remain unchanged.

## 2026-09-23 — Dark surfaces set their own readable foreground

Any retained Mobile Kitchen dark panel must declare a light foreground instead of relying on an inherited page text color. This prevents shared navigation and layout modules from reintroducing black-on-charcoal text as template styles evolve.

The desktop homepage header is a scoped dark-panel variant and must also declare the same title foreground directly; a generic final override alone is not considered sufficient for that scoped layout.

## 2026-09-22 — Fixed contact rail has no teal/green treatment

The fixed rental-contact rail is part of the public Mobile Kitchen interface. Its tile, status copy, hover/focus surface, and shadow must use only the approved orange/red/black/white system. Retain the rail’s contact behavior and accessibility rather than removing it.

## 2026-09-22 — Button text contrast is color-specific

For the strict two-color system, orange `#f47b20` action fills must use black text and red `#b90000` action fills must use white text. This supersedes the prior white-text-on-all-actions wording.

## 2026-09-22 — Strict two-color button rule

The owner requires exactly two solid button colors across Temporary Kitchen Rental: orange `#f47b20` and red `#b90000`. Use white action text; black text remains allowed only where a control has no solid action fill. Do not retain white, teal, brown, or other legacy solid button backgrounds. Photo-thumbnail controls are excluded because the image itself is their control surface.

## 2026-09-22 — Orange is the universal primary-action color

Use Mobile Kitchen orange for all ordinary customer-facing primary buttons, with darker orange for hover and focus. Use outlined white/cream secondary buttons where needed. Red is reserved for urgent-support controls and explicit urgency surfaces, not routine rental, navigation, map, or regional CTAs.

## 2026-09-22 — Load the shared carousel stylesheet globally

The state-modal gallery reuses the same verified `ServiceHeroCarousel` component as service pages. Its CSS must be imported by the shared client entry point so cloned template content receives the viewport, slide positioning, arrows, controls, and thumbnail styles. Keep this as a global import rather than duplicating a fragile modal-only approximation.

## 2026-09-22 — State-map dialogs use one verified kitchen carousel

Map state dialogs are an entry point for Temporary Kitchen Rental, so they must not expose the inherited office, sleeper, shower, restroom, or base-camp gallery groups. Each state now resolves to one verified Mobile Kitchen trailer gallery, retaining the existing carousel controls (arrows, thumbnails, keyboard navigation, and lightbox) instead of presenting mixed equipment as a loose group of images. The map and all state guide URLs remain in place.

## 2026-09-22 — Mobile Kitchen palette supersedes inherited teal/green

All public shared modules must use Temporary Kitchen Rental charcoal, orange, red, cream, and white. The inherited Temporary Kitchen Rental teal/green palette is not part of the target brand. Preserve service-area maps, calculators, dialogs, rails, and inner-page layouts, but recolor their surfaces, states, and SVG geography through the final shared palette layer.

## 2026-09-22 — Remove the global support ribbon

The owner no longer wants the `Live rental support 24/7`, phone-number, and `Emergency dispatch support available` band in the header. Remove that entire band from the shared route header and delete its dedicated responsive CSS. Keep the standard header call card and other contact paths intact; this decision supersedes the earlier support-ribbon portion of the screenshot header reference.

## 2026-09-22 — Screenshot 1 is the global header reference

The homepage header shown in the supplied first screenshot is the approved navigation reference for every route. Apply its red support ribbon, white navigation shell, Temporary Kitchen Rental mark, orange call card, and orange active indicator globally. Do not allow inner routes to inherit the former teal header; shared header variables must live at the root level.

## 2026-09-22 — Retain the Temporary Kitchen Rental navigation layout, not the homepage header variant

Use the full original Temporary Kitchen Rental shared navigation layout on the homepage and every inner route. The temporary-kitchen-rental rebrand changes brand identity, colors, contact identity, and inventory content only; it does not replace the global navigation structure with a homepage-specific header treatment.

## 2026-09-22 — One Mobile Kitchen visual system across all routes

The homepage header and palette are the approved Temporary Kitchen Rental visual system. Apply that shared header treatment to inner routes as well and use the red/orange/cream/charcoal palette for global controls and coverage-map UI. Do not retain inherited teal/blue Temporary Kitchen Rental color combinations on customer-facing pages.

## 2026-09-22 — Sanitize retained archive prose at render time

Legacy source pages are retained for public URL continuity, but their archived HTML must not display the former TemporaryKitchenRental brand. Replace visible `Temporary Kitchen Rental` / `TemporaryKitchenRental` prose at the archive render boundary with `Temporary Kitchen Rental`; do not rewrite source-domain URLs in that pass because link migration handles those independently. Shared rendered components and structured data must use the Temporary Kitchen Rental name and logo asset.

## 2026-09-22 — Temporary Kitchen Rental visible offer is kitchen-only

Use the original Temporary Kitchen Rental offer as the visible taxonomy: commercial mobile kitchens, dishwashing/warewashing trailers, and refrigeration. Remove inherited shower, restroom, sleeper, laundry, handwashing, workforce-housing, and base-camp material from navigation, catalogue cards, quote options, and generic hubs. Preserve existing public URLs instead of deleting or redirecting them; the restriction applies to promotion and new claims, not URL continuity. Every rendered route retains exactly one stable, service-appropriate H1.

## 2026-09-22 — Let Temporary Kitchen Rental own the homepage visual system

Preserve TemporaryKitchenRental only as the underlying layout/routing reference. The homepage must read unmistakably as Temporary Kitchen Rental through its live red, orange, white, and cyan identity; circular logo; stainless commercial-kitchen photography; kitchen-first inventory; verified phone; and kitchen-specific operational copy. Supporting facilities remain reachable through preserved routes, but the homepage leads with kitchens and limits its prominent support choices to dishwashing and refrigeration. Keep the exact approved H1 and existing public slugs. Use already reviewed local kitchen photography when the live source blocks direct asset download rather than shipping a challenged or unverified file.

## 2026-09-19 — Require crawl links only for indexable pages

Treat a page as an SEO orphan only when it is approved for indexing and has no incoming internal link. Intentionally `noindex` utilities such as `/seo-dashboard/` and staged content may remain outside the public crawl graph. This does not suppress missing-link findings for any `index,follow` route.

## 2026-09-19 — Keep browser regression inventories self-contained

Store the 42 affected equipment routes and modal targets in the browser regression rather than reading an untracked local QA artifact. Select the relevant product tab before asserting images, bound image-load waits, and compare semantic model terms so the test verifies customer behavior without depending on workstation-only files or punctuation formatting.

## 2026-09-19 — Preserve readable text across prerender fragments

Convert React fragments to plain metadata/breadcrumb text with explicit spacing between sibling nodes. A visual line break in the Contact Us H1 must serialize as `The right facilities start here.`, not a collapsed word boundary. This affects derived text only and does not change the visible H1.

## 2026-09-19 — Keep unresolved security evidence blocked

Do not convert security controls to passed from source tests or HTTP availability alone. Keep authorization, browser-origin, App Check enforcement, integration delivery, secret scope, deployment mapping, observability and recovery controls blocked until their required staging or provider-console artifacts exist inside the security evidence bundle. Do not weaken the evidence path boundary to accept documentation outside `security/`.

## 2026-09-19 — Clarify trailer equipment only in the Contact Us selector

Use explicit `Trailers` wording for the seven trailer-equipment choices in the Contact Us selector, including the requested `Mobile Kitchen Trailers` example. Keep the underlying form values unchanged so server validation, stored inquiries, and downstream integrations remain compatible. Do not append `Trailers` to `Workforce housing`, `Temporary facilities`, or `Several facilities / help deciding`; those are broad planning choices and the suffix would make an inaccurate or awkward equipment claim. Keep the shared `services` labels unchanged because this request concerns the Contact Us selector, not navigation or page headings.

## 2026-09-19 — Track crawl readiness separately from Google indexing

The indexing workbook may label a URL `Ready for Google` only when the live page returns HTTP 200, uses its exact self-canonical, permits indexing and appears in the production sitemap. This does not prove Google has indexed it. Keep Search Console status as `Not verified in Search Console` until direct inspection evidence is recorded. Preserve the controlled rollout: Batch 1 has 25 active pages, while the remaining 302 registry URLs stay `noindex,follow` and outside the sitemap until reviewed and approved. The unfinished 1,000-city draft is not part of this production tracker.

## 2026-09-19 — Keep the 1,000-city draft out of the production repair

The active public baseline contains five reviewed city-detail pages and a controlled 25-URL indexing batch. The primary checkout also contains an unfinished deterministic 1,000-city draft, but publishing that draft during an unrelated production QA release would bypass the controlled SEO rollout and content review. Build and release this repair from the clean `origin/main` worktree only. Preserve the draft for a later reviewed batch; do not expand canonicals, sitemap membership or `index,follow` scope here.

## 2026-09-19 — Validate complete keys and mount the dashboard safely

The source must be allowed to contain private-key delimiter strings because server-side validation checks for both markers. Secret scanning therefore detects only a complete key-shaped block rather than a standalone `BEGIN` literal. This does not validate Vercel credential correctness. On `/seo-dashboard/`, retain prerendered fallback HTML but mount the interactive dashboard over it; browser-normalized legacy table markup made hydration unreliable and produced React error 418 on hash-linked tabs.

## 2026-09-18 — Dedicated service captions use the approved customer-facing format

Charles identified the generic `Reviewed equipment reference images` caption on dedicated equipment pages and directed that every occurrence be fixed using the service-area caption standard. Replace only that generic fallback with an equipment-specific Commercial Project and Base Camp Rental or Lease caption, weekly/monthly/yearly inquiry terms, one verified operational benefit/detail, and the approved 24/7 phone-assistance CTA. Keep existing image-specific model or source disclosures because they communicate real photo limitations. Caption changes do not alter image identity, alt text, H1s, URLs, canonicals, or indexing settings.

## 2026-09-18 — Use supplied catalogue imagery and disclose the shower-model difference

Use the synced restroom-only interiors for Restroom trailers and the homepage Restroom card. Use the supplied dining-hall layouts as illustrative dining-structure images and the supplied stair/step images as representative stair-rental images, with truthful alt text and visible captions that preserve those distinctions. No exact 22 ft ten-stall shower photograph exists in the reviewed repository or Drive assets, so keep the verified 20 ft five-stall shower-only reference for both 22 ft catalogue entries and show the model-difference disclosure directly on each card. Do not describe the reference as the ten-stall unit.

## 2026-09-17 — Both approved Panhandle captions set the quality bar

## 2026-09-18 — Remove internal gallery review paragraphs from customer pages

The seven context summaries above grouped service-area galleries were written like internal review notes and made live pages look unfinished. Remove that shared paragraph from every route and both map-modal presentations. Keep the equipment option headings and the individual customer-facing captions, which continue to identify actual photographed equipment and relevant model distinctions. Preserve images, alt text, H1s, URLs, canonicals and indexing. The separate verified-image policy content below the equipment section is outside this top-banner decision.

Charles confirmed the boss approved and was impressed by both the 20 ft laundry-container and 30 ft laundry-trailer captions. For a new gallery caption, use their shared direct structure: exact location/use/equipment/rental opening, specific rental benefit, one useful third sentence, and the approved phone CTA. The third sentence may clarify a genuinely confusing photo identity, as with the container, or help plan around the customer's actual need, as with the trailer. Do not force the same sentence type across every product or copy Panhandle facts into other pages. The Olympic office and kitchen samples were revised accordingly; the shower sample retains its relevant model distinction. The local preview awaits Charles's acceptance.

## 2026-09-17 — Olympic Peninsula final caption sample

Charles asked for a finished customer-facing pass after the screenshot-derived skill update. The three Olympic Peninsula captions now use the Panhandle structure without the former site-logistics lists. Each names its equipment and a specific customer use, states the rental/lease inquiry terms, and ends with the approved phone-assistance CTA. The shower caption includes one useful 20 ft versus 22 ft photo distinction. Keep this as a local review sample until Charles accepts the wording; no broader rollout or deployment is implied.

## 2026-09-17 — Approved Panhandle caption as skill quality standard

Charles supplied a screenshot of the Oklahoma Panhandle 20 ft laundry-container caption and identified its concise, direct customer appeal as the model for future image-group descriptions. The skill now records its structure and exact example: location/commercial use/equipment/rental-or-lease first, rental-term and equipment-specific benefit next, one useful photo-identity clarification when needed, then an approved call line. Captions should be distinct across products and avoid internal audit language. The 24/7 phrase is a verified phone-assistance claim, not a delivery or inventory guarantee. The screenshot is a style example, not permission to copy Oklahoma facts to other pages or sites.

## 2026-09-17 — Olympic Peninsula customer copy revision

Charles rejected the first Olympic Peninsula sample as weaker than the Panhandle example and requested unique, attractive captions with "Call us now ... available 24/7." This supersedes the sample's prior omission of 24/7 below. Use the already published phone-assistance claim, without implying 24/7 delivery or guaranteed stock. Keep the opening location + relevant commercial/base-camp use + exact equipment + Rental or Lease, then write a distinct customer use and practical planning prompt for each of the three existing groups. Keep unsupported image/specification claims out of customer copy and retain internal evidence separately. Only the Olympic Peninsula page is under review; no sitewide change or release follows from this sample.

## 2026-09-17 — Olympic Peninsula caption sample

Use the Oklahoma Panhandle caption opening as the quality reference for one review page: location + remote base-camp use + exact equipment + Rental or Lease, then practical site planning and inquiry terms. Keep the two client-named multifunctional exterior references distinct from visually confirmed features, and identify the 20 ft five-stall shower trailer separately. Weekly, monthly and yearly terms are questions for inquiry, not guaranteed availability. Use the published phone CTA without extending the Panhandle-only 24/7 claim. Limit this sample to the Olympic Peninsula page pending Charles's review; preserve H1, route, images, alt, metadata and indexing.

## 2026-09-17 — Existing service-area gallery captions

Use each existing gallery group's equipment headline with the enclosing location H1's place, commercial use and rent/lease intent to form visible copy. State that photos are equipment references rather than local deployment evidence, and invite discussion of dates, access and utilities using the published phone number. Do not add an unverified 24/7 claim to newly generated captions. Preserve the separately approved Oklahoma Panhandle caption and alt behavior, photo identities and no-gallery layouts. Do not expand routes or change H1, canonical or indexing logic in this narrow pass.

## 2026-09-17 — Oklahoma Panhandle caption-leading phrase and CTA

Charles's latest direction supersedes the tacked-on rental-term and quote-disclaimer candidate. Keep Oklahoma Panhandle, the commercial/base-camp use, the exact trailer/container product and Rental or Lease together in the caption's opening phrase. Include weekly, monthly and yearly rental or lease as discussion options, not guaranteed stock or contract availability. End with Call us now and the published 24/7 phone assistance claim. Do not imply round-the-clock dispatch/delivery. Keep the 30 ft trailer and 20 ft container separate and do not keyword-stuff their image alt text. The existing global punctuation/phone normalization stays unchanged. This instruction changes captions, not page H1s, indexing, image identity, or unrelated layouts.

## 2026-09-16 — New multifunctional photo sources

- Source: Charles supplied two new Drive folders, requested every image downloaded first and matching existing photos updated; earlier owner-delegated selection and no-new-layout limits remain in effect.
- All two listed originals were downloaded and decoded before mapping: 26.01 is the client-named 38ft all-electric multifunctional kitchen reference; 27.01 is the combined office/sleeper/shower/restroom reference. Both are exteriors. Never crop an open doorway and relabel it as a separately supplied interior.
- Keep these models isolated from the standard 38ft kitchen, standalone sleeper/hygiene units, modular kitchens and exact ADA variants. Captions distinguish visible features from unverified electrical specifications, office interior, dimensions and capacities. One exterior is sufficient; no compulsory interior request.
- Source preparation found no exact dedicated product-page H1. Subsequent placement uses the corresponding existing, separately labelled Man Camp product groups rather than creating a new route or photo section. Latest placement evidence is recorded separately under multifunctional-placement-2026-09-16. All changes stay local pending review.

## 2026-09-16 — Authorized placement of the two new multifunctional references

- Source: Charles: "Yes, decide the best exact placements and do it locally."
- Decision: The existing Man Camp / Remote Operations galleries are the relevant broad context. Replace their existing contractor-accommodation selection with the client-named Office, Sleeper and Shower & Restroom Trailer, and the existing standard-kitchen selection with the client-named 38ft All Electric Kitchen. Retain the separate shower-only option as the third group. Two substitutions, no additional gallery positions, sections, category pages or routes.
- Keep each product's exact supplied name, separate image group, truthful exterior alt, reference caption and product-aware full-image viewer. These external views do not independently establish electrical specifications, dimensions, office interior or capacity. Do not mix in photographs of another unit to invent missing views.
- This resolves the previous placement-pending status for these two supplied references. It does not authorize replacing standard 38ft kitchen, standalone sleeper/shower/restroom, modular-building or exact ADA imagery. April's refrigerated-container/trailer and two-stall sleeper exceptions remain unchanged, as does laundry separation.
- Existing hub/directory/category layouts and all H1s/URLs remain unchanged. Implementation and tests stay local; no commit, push, deployment or indexing action is authorized by this task.

## 2026-09-16 — Broad laundry product separation and audit clarity

- Source: Independent QA finding relayed in the current conversation. User authorized either separate, clearly identified laundry options or a single appropriate product; keep the work local until review.
- Decision: A broad Laundry Temporary Facilities title may intentionally retain the 30 ft laundry trailer and 20 ft laundry container as two separately labelled product galleries inside its EXISTING image area. Exact trailer/container headings still select their own product. No H1, URL, photo placement, product specification, or other equipment approval is changed.
- Presentation: Explicit trailer/container headings, product-specific reference captions, and matching product identity/reference notes in each laundry full-image viewer. Trailer image 08.01 alt text now explicitly identifies it as a laundry-trailer interior reference; container alts already identify the container. Interior-only use remains acceptable.
- Audit: The aggregate assignedFiles field is an inventory across the page/modal, not a single carousel. Generated reports must include presentation, groupCount, and imageGroups with each group's title, family, model, files, views, alts and caption. Broad grouped rows must never be described as a single model.
- Scope and release: Preserve the removed hub/directory/category additions and all image identities/holds. The original port-4205 build and its historical evidence remain unchanged. The new follow-up is local-only and requires QA review; no deployment is authorized by this decision.

## 2026-09-16 — Services cards use equipment photos, not diagrams or mixed facilities

Charles's four screenshots and `/services/` clarification apply to the existing generic equipment-card slots also shared by `/equipment-rental/`. Use locally available, visually checked photographs: a commercial dishwashing machine, a shower-only stall, washers/dryers in a mobile laundry trailer, and an open handwashing sink trailer. Keep the separate homepage photo overrides and shower/restroom combination card unchanged. This is a local image-selection correction, not approval to add sections, alter SEO/routing or deploy the shared worktree.

## 2026-09-16 — Ordering follow-up: actual views, shared guard and explicit QA evidence

The coordinator requested interior-before-exterior enforcement across every assigned gallery. Use the actual pictured equipment space, not filenames: an external sink bank and the outside of a trailer inside a warehouse are exterior views. Keep all actual interior views and interior details before any exterior within each individual carousel; keep unrelated labelled equipment options as separate carousels. src/galleryImageOrder.ts defines the shared order and ServiceHeroCarousel enforces it for direct callers. The manifest generator stores each model in the same semantic order. No identity/category/caption/held approval changed; the existing external handwashing image's incorrect Interior detail view label was corrected. The original frozen 4201 revision remains untouched. A new port-4203 candidate and all-gallery visual/HTTP evidence are documented in audit/image-order-followup-2026-09-16/HANDOFF.md, pending independent re-review. No commit, push or deployment is authorized by this follow-up; any later release remains limited to the existing temporary-kitchen-rental-nine project under coordination.

## 2026-09-16 — Charles correction: update existing images, do not add sections

- Latest direct instruction: Charles objected to photography added alongside the Service Areas map and asked to revert photo blocks where the original page had none. This overrides the prior assistant interpretation of delegated placement permission.
- Removed the added gallery beneath the /service-areas/ H1, the added gallery on all city-directory pages, and generic category overview photo-option sections. The main map hero and original directory/category layouts are restored without replacing them with missing-photo placeholders.
- Preserve existing state/regional/city photo slots, all state-modal image uses, approved image classifications, and carousel/lightbox behavior. April's specific 20ft refrigerated-container interior reference is retained; the trailer keeps all five Drive references and the two-stall sleeper keeps its existing approved interiors.
- Navigation pages with no original image slot are intentionally unpictured, NOT photography gaps. The full route inventory still includes them for no-new-section checks. Do not add photography to those pages merely to improve image-coverage totals.
- Only image selection changes in existing slots are authorized by default. No unsolicited layout expansion, H1/URL changes, indexing changes, or deployment follows from this correction. The older frozen port-4201 build is preserved as historical evidence, not the current layout acceptance target.

## 2026-09-16 — Owner-delegated suitable named references and broad location galleries

- Source: Charles explicitly delegated choosing correct and necessary existing images based also on the supplied equipment names. April's specific one-photo, two-stall and refrigeration restrictions remain authoritative.
- Decision: Use client-named, visually appropriate references with explicit limitations. Recognized generic laundry, directory and man-camp titles may show separately named equipment options; every carousel still contains only one equipment family/configuration. Preserve H1s and URLs instead of rewriting them to fit photos.
- Generic ADA titles may use the existing branded ADA Room catalogue image as a disclosed reference, never as proof of a specific ADA model, access arrangement or compliance. Exact variants remain held.
- Supersedes: the older broad-title placeholder policy and requirement to await another approval for scoped named-reference selection. Does not supersede exact April exceptions, truthful labels, unknown-specific-model holds or deployment/indexing gates.
- Evidence: docs/phase1/OWNER_IMAGE_ROLLOUT_2026-09-16.md; 510/548 Service Areas pages now have photos/references and all 648 local route/modal audit records passed.

Record decisions that multiple tasks must follow. Include the date, decision maker/source, decision, reason, and affected areas.

## 2026-09-16 — Exact-title verified photography for every service-area page and state modal

- Source: Charles's urgent Service Areas image implementation request in the current conversation.
- Decision: The exact visible H1/modal title selects one verified equipment family and one compatible model/configuration from content/verified-equipment-images.json through src/locationCarouselImages.ts. Body copy, location names, random selection and the former mixed fallback do not choose images. Explicit dimensions/configuration must be supported. Ambiguous titles, missing models, ADA claims without supporting evidence, and trailer/container mismatches show "Verified photography coming soon" without a substitute photo.
- Image standard: All verified interior views, including interior equipment details, precede all verified exterior views. External fixtures remain exterior. Do not merge different models to obtain a missing view. Suppress exact/near duplicates and unverified category associations. Alt text describes visible equipment, not invented local deployment or inventory availability.
- Runtime standard: Dedicated pages and both map layouts share the resolver and rendered gallery. State opening destroys the previous controller and image DOM, clones the exact state/title template and starts at slide zero. Manual navigation pauses autoplay until Play is chosen and interaction ends; reduced motion disables autoplay. Full-image viewing uses a centered native dialog above map/state dialogs with original uncropped images, controls, keyboard navigation, outside/Escape close and bounded focus.
- Preservation boundary: No H1, URL, slug, canonical, head meta, robots, sitemap or indexing-gate change. Prerendered image structured-data references track the corrected visible hero rather than closed dialogs. Other equipment-detail image registries were not remapped by this task.
- Evidence: 153 classified images, 97 approved, 56 withheld; 548 dedicated routes and 100 state-modal presentations passed the local audit. Missing imagery remains explicit rather than fabricated. See docs/phase1/SERVICE_AREA_IMAGE_AUDIT.md.
- Replaces an earlier decision: Yes, for Service Areas/map image selection and carousel behavior only. Supersedes the mixed-pool location helper and fixed state gallery. It does not authorize domain cutover, indexing changes, or deployment of unrelated unreviewed changes.

## 2026-09-15 — Shared coordination source

- Source: Charles
- Decision: All Codex tasks working on TemporaryKitchenRental must read and update the shared coordination files in this repository.
- Reason: Separate tasks do not share conversation history, even when they can see the same working directory.
- Affected areas: Entire repository.

## 2026-09-15 — Separate calculator location fields

- Source: Charles request; calculator refinement task implementation decision
- Decision: Present State, City, and ZIP code as separate fields. Require State and City; keep ZIP optional until an exact delivery address is known. Use a 50-state dropdown and a free-text city field instead of duplicating all 19,702 city records in another homepage dropdown.
- Reason: Separate fields are clearer for customers and produce cleaner location details, while an optional ZIP avoids blocking early planning. Avoiding a second full city list limits additional homepage HTML weight; the dedicated calculator page still exposes the required city/state text below the form.
- Affected areas: Homepage calculator and `/rental-calculator/`

## 2026-09-15 — Reuse the protected inquiry boundary for calculator quotes

- Source: Charles request to make the homepage calculator a real quote-request feature
- Decision: The calculator submits its estimate and project details to the existing same-origin `/api/contact` endpoint. The endpoint remains the only write boundary and continues to enforce strict schema validation, allowed origin, Firebase App Check, an atomic distributed rate limit, a honeypot, idempotency, and private server-side storage before notification delivery.
- Threat model and access matrix: An anonymous visitor may create one validated inquiry but cannot read, list, update, or delete inquiries. A forged cross-origin or unverified client, spam bot, oversized/unknown payload, repeated request, or limiter failure must be rejected before storage. Site operators receive the inquiry through the existing delivery process; no calculator-specific administrative access is added.
- Negative-test evidence: Existing contact tests cover attacker origins, forged fields, honeypot spam, oversized and invalid bodies, missing App Check, limiter failure, duplicate-safe persistence, and storage/delivery failure ordering. Calculator tests cover the allowed page sources and deterministic service/duration mapping.
- Affected areas: Homepage calculator, `/rental-calculator/`, and the contact schema's page-source allowlist only
- Replaces an earlier decision: No

## 2026-09-15 — Separate calculation from optional quote submission

- Source: Charles clarification that the primary feature is a calculator, followed by approval to improve and enable the optional quote path
- Decision: Use `Calculate Starting Estimate` as a calculator-only button that performs no network request, persistence, or email action. Present contact details and consent in a distinct optional section with a separate `Request Exact Quote` submit button. Keep the estimate visible if quote submission is unavailable or fails.
- Reason: A visitor should be able to obtain the published starting-price calculation without accidentally creating a lead. A separate explicit action makes data transmission and the preliminary-versus-final-pricing boundary clear while retaining the boss-requested lead workflow.
- Affected areas: Homepage calculator, `/rental-calculator/`, calculator browser tests, and quote-request copy
- Replaces an earlier decision: Yes; replaces the combined automatic `Get Starting Estimate / Request Quote` interaction, but retains the protected inquiry boundary decision above for the optional submission

## 2026-09-15 — Keep production inquiry intake disabled until end-to-end configuration passes

- Source: Live activation attempt and production verification evidence
- Decision: Keep `CONTACT_ENABLED=false` after the split-calculator deployment. Enable it only after usable Firebase web/App Check configuration, server persistence credentials, approved delivery configuration, and one controlled end-to-end fictional QA submission are verified.
- Reason: The live client stopped before contacting the API because App Check configuration was unavailable, and a valid-shaped direct API probe returned HTTP 503. Leaving intake enabled would not provide a functioning customer workflow and would conflict with the existing release gate.
- Affected areas: Production Vercel environment, `/api/contact`, calculator exact-quote action, and operations handoff
- Replaces an earlier decision: No

## 2026-09-15 — Do not apply unverified bulk WordPress 404 repairs

- Source: WordPress 442 URL repair task; repository and production safety requirements
- Decision: Make no production permalink, redirect, page, template, plugin, or database change until the exact reported URL set is available, the origin/admin is reachable, and a restorable files-and-database backup is confirmed. Do not use blanket homepage redirects.
- Reason: The public sitemap contains 31,159 URLs and the representative sample did not reproduce a 404, so changing routing without the exact 442-URL evidence could damage valid URLs and SEO signals.
- Affected areas: `mobile-dishwashing-trailer-facility-rental.com` WordPress routing, sitemap, content restoration, and redirects
- Replaces an earlier decision: No

## 2026-09-15 — Do not integrate unverified trailer images

- Source: Charles's exact-model image requirement; Phase 1 page-to-asset mapping and QA evidence
- Decision: Keep the reusable carousel shell isolated until the Drive inventory confirms equipment family, form factor, exact model or length, configuration, and view. Do not fill missing interior or exterior views with a neighboring model or visually similar asset. Do not replace the incorrect homepage Shower and Restroom thumbnails until truthful same-family assets are confirmed.
- Reason: The current source reuses representative images across different lengths and configurations, and both homepage thumbnails were confirmed to depict ADA shower/restroom-combination facilities rather than their linked single-family categories.
- Affected areas: Service and equipment hero imagery, homepage equipment thumbnails, image alt text, carousel registry, and rendered QA
- Replaces an earlier decision: No

## 2026-09-15 — Integrate only inventory-approved exact-model imagery

- Source: Completed `docs/phase1/DRIVE_ASSET_INVENTORY.md`; Charles's exact-model and exclusion requirements
- Decision: Populate the reusable carousel only on routes with exact, unflagged inventory mappings. Order accepted assets as interior, exterior, then remaining approved images. Routes without a safe exact mapping render a truthful non-photo verification-pending state. Homepage Shower and Restroom cards also render neutral pending states because no category-appropriate exact assets were supplied.
- Reason: This adds verified photography where the equipment identity is supported while preventing residential, ambiguous, wrong-model, duplicate, or unverified imagery from being presented as a specific rental product.
- Affected areas: `src/ServiceDetail.tsx`, `src/ServiceHeroCarousel.tsx`, `src/serviceHeroImages.ts`, generated service-hero assets, homepage Shower/Restroom cards, carousel tests, and visual QA
- Replaces an earlier decision: Yes — supersedes only the temporary integration hold in “Do not integrate unverified trailer images”; its exact-model and exclusion requirements remain in force.

## 2026-09-15 — Keep noindex preview URLs out of the sitemap

- Source: Charles's all-pages/sitemap request; live preview audit; controlled indexing requirement in `docs/BOSS_REQUIREMENTS.md`
- Decision: Maintain the complete 650-page owner-visible inventory in `audit/all-pages-sitemap.csv`, but do not add the current Vercel preview URLs to `sitemap.xml`. Add only approved, HTTP-200, indexable, self-canonical `temporary-kitchen-rental.com` URLs to the production sitemap in controlled release batches after canonical-domain routing is ready.
- Reason: All 650 preview pages currently declare `noindex,follow`, expose no canonical, and belong to a build whose canonical production domain is not ready. Listing them would conflict with the robots state and the requirement not to release hundreds of unreviewed pages at once.
- Affected areas: Page inventory, sitemap generation, canonical-domain activation, controlled indexing batches, release QA, and Search Console submission
- Replaces an earlier decision: No

## 2026-09-16 — Provide the complete URL inventory as a separate review sitemap

- Source: Charles's request for the complete sitemap using the eventual `temporary-kitchen-rental.com` hostname
- Decision: Generate all 650 registered routes as `public/sitemap-review.xml` with absolute `https://temporary-kitchen-rental.com` URLs, but keep this owner/dev review artifact separate from the official gated `sitemap.xml` and do not submit it to search engines.
- Reason: This provides the requested complete XML inventory immediately without representing all currently noindex and not-yet-approved pages as the controlled production indexing batch.
- Affected areas: Owner/dev URL review, sitemap QA, future canonical-domain cutover, and controlled indexing release
- Replaces an earlier decision: No; it supplements “Keep noindex preview URLs out of the sitemap.”

## Entry template

### YYYY-MM-DD — Decision title

- Source:
- Decision:
- Reason:
- Affected areas:
- Replaces an earlier decision: Yes/No; link if applicable.

## 2026-09-16 — Keep dashboard evidence typed and owner access explicit

- Source: Urgent owner-visible SEO dashboard request; existing Phase 1 authority and sitemap audits
- Decision: Treat observed crawl data, imported third-party exports, manual owner baselines, and unknown values as separate evidence classes. Keep Search Console property verification, submission, and index status separate. Keep Moz DA, Ahrefs DR/UR, referring domains, and backlinks as distinct metrics. Until authentication exists, expose only a read-only non-confidential preview and state that access boundary visibly.
- Reason: A management dashboard is useful only when it does not turn missing integrations, an owner-entered score, a broad redirect, or a public search result into fabricated SEO evidence.
- Affected areas: `/seo-dashboard/`, protected-URL register, Google status register, portfolio readiness, authority-check workflow, future data imports and owner access
- Replaces an earlier decision: No; it implements the dashboard MVP within the existing controlled-indexing and exact-URL preservation decisions.

## 2026-09-16 — Apply the Boss-approved H1 formula to supported TemporaryKitchenRental pages

- Source: Charles's instruction to implement the H1 plan discussed in the Boss chat; Boss requirements and Phase 1 audit artifacts
- Decision: For supported non-home TemporaryKitchenRental pages, compose one deterministic H1 from a relevant service/facility topic, rental intent, and location where applicable. Use the same H1 source for the document title. Apply explicit approved mappings for Alabama, California, Colorado, Texas, Port Angeles, Tacoma, and Olympia, and deterministic supported-topic rotation for the remaining state and region pages.
- Reason: This implements the approved SEO/content structure without inventing unsupported specifications or changing page intent, URL architecture, or indexing controls.
- Affected areas: State, region, reviewed-city, supported service/category/model, equipment, industry, and service hub H1/title generation and focused validation
- Replaces an earlier decision: No. Homepage wording, URLs, canonicals, redirects, robots/indexing, separate brands, unsupported specifications, Seattle and Sequim editorial headings, dishwashing, and refrigeration wording remain unchanged or held for separate approval.

## 2026-09-16 — Use the owner-identified image for the homepage Shower Trailer card

- Source: Charles explicitly stated that the supplied `Codex Image Sep 15, 2026, 10_55_03 PM.png` is the Shower Trailer.
- Decision: Use responsive derivatives of that image only for the homepage `Shower trailers` card. Describe only the visible private shower stall and fixtures; do not infer a trailer length, stall count, exact model, restroom configuration, or route-level model mapping.
- Reason: The owner supplied the missing category identification, while the image itself does not establish a more specific equipment configuration.
- Affected areas: Homepage Shower Trailer thumbnail, responsive image assets, alt text, and focused homepage image QA. The Restroom card and service-detail carousel registry are unchanged by this decision.
- Replaces an earlier decision: Yes — it supersedes only the homepage Shower pending-photo state in “Integrate only inventory-approved exact-model imagery”; all exact-model safeguards remain in force.

## 2026-09-16 — Reuse the state-page headline source in state map modals

- Source: Charles's request to apply the H1 rule to the state modals on `/service-areas/`
- Decision: Display the same deterministic `stateRentalHeadline(state)` wording in each map modal title, but keep the modal title as an `h2`. Retain the modal's link to the dedicated state guide and leave state routes unchanged.
- Reason: The modal gains consistent topical-service, rental-intent, and location wording without creating multiple document H1s or removing useful crawlable state pages.
- Affected areas: Compact and full state-map modal titles, modal accessible names, state-guide metadata, and focused browser coverage
- Replaces an earlier decision: No; it extends the Boss-approved H1 formula to modal copy while preserving the one-H1 document rule.

## 2026-09-16 — Keep carousel motion controllable and image claims evidence-bound

- Source: Urgent imagery and commercial-page presentation refinement
- Decision: Auto-advance verified service carousels, but persistently pause after any manual navigation until the visitor chooses Play, and disable automatic motion when reduced motion is requested. Present interiors and equipment details before exteriors. Do not label a shower/restroom combination photo as restroom-only, and add setting-specific alt text only when the supplied image visibly confirms that commercial setting; do not infer a geographic location.
- Reason: This keeps the gallery useful without overriding user intent, preserves semantic image priority, and prevents unsupported equipment or location claims.
- Affected areas: Service carousel behavior and controls, route image ordering, homepage Shower/Restroom presentation, alt text, and responsive hero QA
- Replaces an earlier decision: Yes; it refines the earlier interior/exterior order and supersedes only the homepage Restroom-photo assumption. Exact-model and inventory safeguards remain in force.

## 2026-09-16 — Prioritize indexing and authority metrics in the SEO dashboard

- Source: Charles's instruction that the boss wants indexing and `Authority metrics by website` on top
- Decision: Display Google indexing status first and website authority metrics second in the dashboard content and sidebar navigation, before overview and supporting registers. Preserve the existing metric values, evidence classifications, and access warnings.
- Reason: These are the boss's priority management signals, while retaining the dashboard's evidence boundaries and supporting detail.
- Affected areas: `/seo-dashboard/` visual section order, sidebar navigation order, and focused dashboard-order regression coverage
- Replaces an earlier decision: No; it refines presentation priority within the existing evidence-typed dashboard.

## 2026-09-16 — Hydrate only the stateful SEO dashboard route

- Source: Live defect report that the dashboard remained orange with its refresh button disabled; direct live HTML/API and local runtime diagnosis
- Decision: Keep the general site as prerendered HTML with targeted DOM enhancements, but hydrate React on `/seo-dashboard/` because its live evidence controls and tables depend on component state. Render an enabled, truthful stored-evidence fallback before hydration and bound each browser request to 25 seconds.
- Reason: The API was healthy, but React effects and click handlers cannot run in static server-rendered markup without hydration. Route-only hydration restores the dashboard without broadening client hydration across all 651 content pages, and the timeout guarantees recovery from a stalled request.
- Affected areas: `/seo-dashboard/` live status, automatic refresh, manual refresh, live evidence table updates, and the dashboard-only initialization block in `src/main.tsx`
- Replaces an earlier decision: No; it completes the existing live dashboard behavior within the current prerendered architecture.

## 2026-09-16 — Keep downloaded Drive assets deduplicated and outside public website assets

- Source: Charles's 25 supplied Google Drive folder links and the repository's existing image-ownership safeguards
- Decision: Store each of the parent `Equipments` folder's 25 equipment groups once under `work/drive-assets-2026-09-16/`, including the parent-only `20ft Laundry Container` child. Keep the collection out of `public/` until individual images are reviewed and approved for truthful route use.
- Reason: The supplied links include both the parent and 24 children, so reproducing every link literally would duplicate nearly the entire collection. A source-only staging area makes all assets accessible while preventing unreviewed model, setting, or alt-text claims from reaching the site.
- Affected areas: Local source-asset organization, Drive manifest, integrity checks, and future image-review workflow
- Replaces an earlier decision: No; it preserves the existing exact-model and verified-image requirements.

## 2026-09-16 — Coordinate Project Desk and Emergency dispatch as one sticky system

- Source: Urgent owner request to redesign the oversized sticky contact control and duplicate-feeling Emergency UI without changing the existing inquiry workflow
- Decision: Use a compact desktop Project Desk edge tab with a maximum-400 px solid drawer, and two compact bottom actions on mobile while hiding the older duplicate mobile call bar. Keep Emergency as a bottom-right pill that may auto-expand only once, 15 seconds after the first meaningful interaction; dismissing it stores a 24-hour local preference. Show either the Emergency trigger or panel, never both. Opening Project Desk minimizes Emergency and opening Emergency closes Project Desk. Keep availability language conditional, retain the exact telephone action and quote form, and honor keyboard focus, Escape, visible focus, touch targets, and reduced motion.
- Reason: The two urgent-contact entry points need to remain discoverable without obscuring content, creating false urgency, duplicating actions, or competing for focus.
- Affected areas: Global sticky Project Desk and Emergency presentation, drawer interaction, local dismissal preference, responsive behavior, accessibility state, and focused browser regression coverage
- Replaces an earlier decision: Yes; it supersedes the six-second session-based Emergency auto-open and the oversized desktop contact rail while preserving the underlying inquiry workflow and contact routes.

## 2026-09-16 — April one-photo approval and refrigeration follow-up

Implemented locally: one usable photo is sufficient; 20ft container interior-only, 20ft trailer all five Drive references, and two-stall sleeper two existing interior views. 85 focused tests, 44 app tests, 26 browser checks, 651-page build and 648 service-area audit entries passed. No deployment or indexing change. See docs/phase1/APRIL_PHOTO_APPROVALS_2026-09-16.md for the source of the approval, exact scope, evidence and revised tracker totals.

## 2026-09-16 — Preserve current Vercel source until org scope is available

- Decision: Keep the existing `cc-devs/temporary-kitchen-rental` project connected to `charlessslaranangsss-maker/Temporary Kitchen Rental` until GitHub organization access for Vercel is explicitly granted and `Temporary-Kitchen-Rental/Temporary-Kitchen-Rental` is visible in the picker. Do not create a second Vercel project or deploy shared uncommitted work as a workaround.
- Reason: The GitHub namespace picker offered only the personal account. Granting Vercel app access to the organization is a separate security-sensitive permission step, and the combined local release remains under active multi-owner coordination.

## 2026-09-17 Panhandle lease terms — LIVE VERIFIED

The Oklahoma Panhandle 30 ft laundry trailer and 20 ft laundry container captions now include rental or lease and weekly/monthly/yearly rental terms. Live alias temporary-kitchen-rental-nine.vercel.app verified on dpl_6ykocrDRHboUz1zNH2Em9b164U5Q. Both tabs and all four images decoded at desktop/mobile (eight image displays), zero content/browser/overflow failures. Preservation: 651 H1s/intros and 100 map presentations unchanged. Current tests: 209 targeted + 44 application pass; build 651 pages + 404. Preview noindex preserved. Separate primary staging was not promoted over the already-correct concurrent release. Evidence: work/qa/panhandle-lease-20260917/independent-final/REPORT.md. No further deployment is needed for this request.

## 2026-09-17 — Service-area caption standard

Use the boss-approved Panhandle format for existing equipment gallery captions, with model-specific benefit and detail, rental/lease inquiry terms, and the verified 24/7 phone-assistance CTA. Preserve the already approved Panhandle and Olympic page-specific captions. This is local review copy only; no deployment authorization inferred.

## 2026-09-17 — Galleries for previously unpictured service areas

Add verified equipment-option gallery tabs and customer-facing captions to all service-area city directories. For modular-kitchen pages lacking a verified modular-building photo, show verified mobile-kitchen trailers only as explicitly labelled rental alternatives, with visible copy stating that the images do not depict a modular building. Keep image claims truthful and seek a verified modular photo before presenting one as the modular product.

## 2026-09-17 — Existing photos for four equipment needs

Use the approved 38 ft mobile-kitchen interior before the 24 ft kitchen gallery on modular-kitchen pages, explicitly as trailer alternatives. Pair ADA-labelled catalogue and standard combination photos in separate labelled groups. Pair two-stall sleeper interiors and four-room trailer exterior in separate labelled groups. Identify the existing 20 ft five-stall shower set as the photographed reference on generic shower pages. Do not transfer ADA status, room layout, modular building form, or 22 ft ten-stall specifications across these distinct assets.

## 2026-09-17 — Homepage Restroom photo disclosure

Use the approved toilet-interior photo from a shower and restroom combination trailer for the homepage Restroom preview, with an explicit combination-unit label and alt text. Do not represent it as a restroom-only trailer. No verified restroom-only photo was found in the current local asset inventory; the product distinction remains visible.

## 2026-09-18 — Use disclosed reviewed references instead of production photo placeholders

When exact model photography is unavailable, show the closest reviewed commercial equipment reference only with a visible caption that names the pictured equipment and states the size, layout, controls or product-type difference. Alt text describes the visible image itself. Do not infer an exact configuration from a representative image. This rule covers current service-detail and equipment-catalogue gaps and removes customer-facing pending-photo panels from production routes.

## 2026-09-18 — Keep missing Laundry options on the existing category URL

- Decision: Add the owner-requested 20 ft Laundry Container and 26–27 ft Laundry Trailer entries as anchored sections on `/equipment-rental/laundry-trailers/`, using their reviewed client photo collections. Keep those anchors out of `serviceOptions`, prerender route generation and indexing artifacts.
- Reason: The current site has reviewed assets but no approved dedicated routes for these two products. Anchors make both choices and galleries reachable from desktop/mobile Inventory menus without inventing URLs or changing canonicals and indexing settings.
- Truthfulness boundary: The 20 ft container has three reviewed interiors and the 26–27 ft trailer has one reviewed interior; neither has an exterior in the supplied collection. The requested washer/dryer count remains in the owner-provided product label, while visible copy asks customers to confirm machine count, exact length, floor plan and available unit with the quote.
- Restroom correction: Restroom now links only to the four existing restroom-trailer detail routes. Shower and restroom combination models remain in their separate category.

## 2026-09-18 — Preserve old-site authority with exact sources and canonical replacements

- Source: Charles's 153-row old-site backlink export and request to preserve those links during Google indexing.
- Decision: Keep every historical path reachable. Retain a direct page where the current site has a real matching page; otherwise use a permanent redirect to the closest verified replacement. Consolidate `www.temporary-kitchen-rental.com` onto `temporary-kitchen-rental.com`. Do not recreate duplicate or thin legacy pages solely to return HTTP 200.
- Indexing: Activate only the controlled 25-page first batch. It contains the 23 canonical destinations receiving the supplied legacy links plus the Services and Service Areas hubs. Other generated routes remain `noindex,follow` until a later approved batch.
- Reason: Permanent redirects consolidate signals for replaced URLs, while self-canonicals and sitemap membership identify the preferred destination. This preserves exact inbound paths without introducing competing copies.
- Affected areas: Vercel redirects, production-domain gate, indexing order/scope, sitemap, canonical output, migration tests, and backlink audit evidence.
- Replaces an earlier decision: Yes; the production domain is now verified as the active public site, so the earlier `domainRoutingReady:false` hold is released for this controlled batch.

## 2026-09-18 — Reviewed restroom-only images on length-specific restroom pages

The supplied restroom-only interior set may appear on the registered 12 ft, 14 ft, 20 ft and 30 ft restroom detail pages because it truthfully establishes the facility type and installed equipment. Each presentation must visibly disclose that the photos do not establish the separate model's length, stall count or floor plan and must direct the customer to confirm dimensions, accessibility, utilities and the available rental or lease configuration. Decorative carousel thumbnails keep empty alt text; the active image carries truthful equipment-specific alt text. These registered detail URLs remain direct pages rather than redirects to the category page.

## 2026-09-18 — Restore backlink-backed legacy HTML paths before releasing them in controlled batches

- Source: Charles's repeated instruction to preserve the old production URL architecture and the supplied 153-row backlink export.
- Decision: Serve each of the export's 104 unique HTML paths directly at the same path. Restore the 90 paths that were previously redirected as concise, useful facility or equipment planning pages and link them from a related parent page. Keep the single historical PNG as a permanent redirect because it is an asset URL rather than an HTML document.
- Indexing: Release only the first 25 backlink-ranked paths with self-canonicals and sitemap membership. Keep the other 79 exact HTML paths at `noindex,follow` until their controlled release batch.
- Reason: Exact HTML URLs retain the requested architecture and their external-link destinations while useful page content and internal links avoid soft 404 behavior. The staged index controls honor the project's approved rollout limit.
- Replaces an earlier decision: Yes. This supersedes the 2026-09-18 redirect-first treatment for these 90 backlink-backed HTML paths; it does not change unrelated redirects or the controlled indexing limit.

## 2026-09-18 — Declare exact www redirects for backlink paths

- Source: Post-deployment live audit of the restored legacy paths on Vercel.
- Decision: Keep the general `www` to apex redirect and also declare an exact permanent same-path host redirect for every HTML path in the backlink migration map.
- Reason: Live evidence showed that Vercel did not apply the catch-all host rule consistently to these trailing-slash paths. Exact rules produced a direct HTTP 308 to the identical apex path and prevent duplicate-host copies.
- Affected areas: `vercel.json`, migration-map regression coverage, live URL audit and production-domain behavior.

## 2026-09-18 — Use runtime public configuration and physical JSON API routes for inquiries

- Decision: Serve only the non-secret Firebase web identifiers and App Check site key from `/api/public-config.json`; keep Firebase Admin and Resend credentials exclusively in server environment variables.
- Decision: Use physical `.json` Vercel functions for browser POST and scheduled API traffic. Do not depend on extensionless API routes while the site-wide trailing-slash rule is enabled.
- Decision: Accept `FIREBASE_PRIVATE_KEY_BASE64` only when it decodes to a complete PEM, including both boundary lines. A missing closing boundary is invalid and must fail with an actionable server configuration error.
- Reason: This removes the production dependency on unavailable `VITE_*` build variables, prevents POST redirects, and avoids exposing private credentials in the browser bundle.

## 2026-09-23 — Exact product-image evidence and no-placeholder behavior

- Decision: Attach owner-supplied images only to the exact model/configuration supported by archive labels and visual inspection. A generic reference may appear on an explicitly disclosed family page, but must not imply unverified length, stall count, ADA layout, or equipment configuration.
- Decision: If a product route has no exact or truthfully disclosed approved image set, omit its image gallery entirely; do not render “verified photo missing”, “coming soon”, or equivalent UI.
- Reason: An empty gallery is less misleading than false imagery or a public verification placeholder, while the underlying product URL and text remain intact.
- Application: The supplied 30 ft / 10-stall set is withheld because its source bytes are identical to the 13 ft / 3-stall set. Cross-size refrigeration, shower, ADA, and residential-looking ramp images are not substituted.
- Decision: Every Temporary Kitchen Rental service-area landing page must use one stable H1 that names a genuine target inventory topic, an equipment/facility form, and rental intent. Broad city directories may use a facility-rental H1 because they index multiple families; state-map landings remain kitchen-specific.
- Decision: Location-gallery captions must identify the particular pictured equipment, remain consistent with the route location, and use the target site's approved phone. Do not carry TemporaryKitchenRental contact details or 24/7 availability into Temporary Kitchen Rental captions unless the target explicitly approves those claims. If model-specific detail is unavailable, use cautious site/configuration planning language rather than a false claim.
- Reason: Mixed-family legacy H1 rotations and inherited regional caption overrides could make the heading promise, viewed image, site identity, and support offer disagree.

## 2026-09-24 — Location-first service-area copy and target support captions

- Decision: In Temporary Kitchen Rental service-area surfaces, lead a topical rental phrase with its place, then name the service and equipment/facility form, then rental/lease intent. Use the same order in map-modal title, selected-state lead, service summary, and action text; do not write forms such as “equipment rental in [location]”. Preserve existing route paths and slugs.
- Decision: Every service-area gallery caption identifies its page location and pictured equipment form before Rental or Lease intent, adds configuration-planning detail, and includes Temporary Kitchen Rental's phone support CTA: “Call Temporary Kitchen Rental now for 24/7 live-agent support: +1 (888) 563-6507.”
- Evidence boundary: The target homepage advertises 24/7 live-agent/call support for that phone number. This is a phone-support-hours claim only, not a promise of equipment availability, delivery, or dispatch at any hour.

## 2026-09-26 — New Vercel project for org-migrated Mobile Kitchen repo

- Decision: Host `Temporary-Kitchen-Rental/temporary-kitchen-rental.com` in a new project named `temporary-kitchen-rental-com` under the `Temporary Kitchen Rental Pro` Vercel team, using the generated Vercel project domain for this deployment. Keep the existing `temporary-kitchen-rental.com` domain assignment untouched until a separate approved domain migration.
- Reason: The repo was moved to the Temporary-Kitchen-Rental GitHub organization and did not yet have a Vercel project in that team. Vercel's import screen exposed the org namespace and exact repo, so no additional GitHub permission grant was required.
- Evidence: Production deployment `dpl_29ymkYhAqwJ8Ye7TRGYVr9EF2Epz` reached Ready from `main` commit `fb15929`; homepage and both restored kitchen routes were checked live. Details in `docs/TEST_RESULTS.md`.

## 2026-09-29 — Preserve noindex while correcting the audited release candidate

- Decision: keep the current Temporary Kitchen Rental rollout in preview/noindex mode. Every generated public page remains `noindex,follow`, the public sitemap remains empty, and the Vercel alias keeps its protective `X-Robots-Tag`. This audit does not authorize a DNS, Search Console, canonical-release, or indexing change.
- Decision: derive the large Vercel redirect table from the repository route sources with `scripts/sync-vercel-redirects.mjs` and verify query-string preservation in browser tests. This prevents hand-edited redirect drift while retaining historical source paths.
- Decision: generate all registered current-site catalog, location, region, and reviewed-city pages so internal links resolve to useful static HTML. Imported TemporaryKitchenRental authority records remain non-published, non-clickable historical evidence and are excluded from routes, discovery links, indexing checks, and Google Search Console readiness checks. Preserve the Temporary Kitchen Rental URL architecture; do not blanket-redirect valuable current-site routes or replace them with a homepage response.
- Decision: represent the homepage portfolio with one primary mobile-kitchen card and five supporting-family cards. This 2026-09-30 correction supersedes the earlier 25/75 presentation: desktop uses a 4fr/1fr grid, and narrow screens use one image-rich primary card above a compact two-column support grid, keeping the measured primary share within 75–85% and the supporting share within 15–25%. The mobile-kitchen lead remains the largest individual card and controls the H1 and primary actions; every supporting family name remains visible.
- Boundary: inquiry submission remains disabled and fail-closed. The browser test verifies the visible disabled state and server response without sending a real inquiry or asserting delivery.

## 2026-09-30 — Refresh the homepage tab when checking shared-directory fixes

- Evidence: the public homepage HTML and the Service Areas route contained the corrected shared `MapLocationDirectory` output, but one long-lived homepage browser tab continued to expose stale `city pages` content until it was reloaded. After reload, the homepage and `/locations/` both showed the state name separated from its `listed locations` count.
- Decision: when reported output conflicts with the current shared component, check both server HTML and a freshly reloaded browser tab before making another source edit. Do not repeat the same code change when only an old page session is stale.
- Boundary: live rendering was checked on the public theta URL; the Vercel API did not permit deployment metadata access, so the deployed source revision remains unconfirmed.

## 2026-09-30 — Match Temporary Kitchen Rental's state-directory interaction, preserve target routes

- Evidence: the live Temporary Kitchen Rental Service Areas directory presents a linked state name followed by a separate expandable “Regions and cities in [State]” control; expanding a state exposes its region links. The Temporary Kitchen Rental directory previously presented inline totals and exposed city details only for a subset of states.
- Decision: copy the reference's interaction and visual hierarchy for all 50 states, but populate disclosures from Temporary Kitchen Rental's own `stateGuides` and `regionPath` sources. Keep Temporary Kitchen Rental branding, root-level state links and `/service-areas/{state}/{region}/` region routes. Do not import Temporary Kitchen Rental's service/product content, counts or URL paths.
- Verification: focused SSR test, typecheck, production build, generated HTML route checks, and live browser interaction on homepage and `/locations/` pass. Commit `43e92eb` is pushed to `origin/main`; live Alabama disclosure exposes the four Temporary Kitchen Rental region URLs. Exact Vercel deployment metadata remains unverified (API returned 403).
## 2026-10-09 — Use the Oil Field WordPress domain and authoritative contact number

- Treat `https://oil-field-equipment-rentals.com/` as the original site for this Oil Field Equipment Rentals rebuild. The earlier Temporary Kitchen domain was an incorrect source for this brand and must not be used for contact verification.
- Use the owner's corrected `+1-888-385-5513` / `tel:+18883855513` as the authoritative rebuild phone. This supersedes the conflicting number observed in the earlier live-source inspection.
- Preserve the published 24/7 availability wording. Do not add a street address or email because the live rendered pages inspected do not publish either. Keep service coverage as a general North America statement rather than inventing a local office address.

