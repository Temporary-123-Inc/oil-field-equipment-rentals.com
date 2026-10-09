# Temporary Kitchen Rental URL and backlink audit — 2026-09-23

## Evidence sources

- Original public homepage, inspected in browser on 2026-09-23. Its rendered navigation exposed 33 non-fragment public paths plus the homepage.
- Rebuild production route registry and `https://temporary-kitchen-rental-com.vercel.app/` browser checks.
- Supplied `temporary-kitchen-rental.com-backlinks-subdomains_2026-09-23_00-09-43.csv` file.

## Backlink export finding

The supplied tab-delimited file contains 670 referring-page rows, but only one target path: `/`. It has three homepage target variants: 662 `https://temporary-kitchen-rental.com/`, 7 `http://temporary-kitchen-rental.com/`, and 1 `https://www.temporary-kitchen-rental.com/`. It provides no page-level evidence for product, location, or informational slugs and must not be treated as a complete original-site URL inventory.

## Original homepage route comparison

### Present in the rebuild

- `/`
- `/22ft-dishwashing-trailer-rental/`
- `/24ft-dishwashing-trailer-rental/`
- `/24ft-mobile/`
- `/26ft-dishwashing-trailer-rental/`
- `/26ft-mobile/`
- `/28ft-mobile/`
- `/38ft-conveyor-dishwashing-trailer-rental/`
- `/40ft-bulk-combo/`
- `/40ft-combo/`
- `/40ft-mobile/`
- `/about-us-2/`
- `/contact-us/`
- `/contact/`
- `/locations/`
- `/refrigeration-container-40ft-rental-5/`
- `/refrigeration-trailer-20ft-rental-3/`
- `/testinmonials/`

### Missing from the rebuild (currently rendered as the generic 404 page)

- `/12ft-restroom-shower-all-in-one-trailer/`
- `/12ft-restroom/`
- `/12ft-shower/`
- `/14ft-restroom-shower-combo-trailer-2/`
- `/14ft-restroom-shower-combo-trailer/`
- `/14ft-restroom/`
- `/14ft-shower/`
- `/20ft-restroom-shower-combo-trailer-rental/`
- `/20ft-restroom/`
- `/20ft-shower/`
- `/24ft-laundry/`
- `/30ft-laundry/`
- `/30ft-restroom/`
- `/30ft-shower/`
- `/containerized-laundry-unit-rental/`
- `/containerized-sleeper-rental-2/`

## Approved restoration mapping

| Original path family | Proposed treatment | Content source / status |
| --- | --- | --- |
| 12/14/20/30 ft shower and restroom slugs | Restore each exact slug as a dedicated Mobile Kitchen product landing page and retain the original family distinction. | Owner approved restoration on 2026-09-23. Original individual-page retrieval remains blocked; recreated copy must avoid unverified specifications. |
| 24/30 ft laundry and containerized laundry | Restore exact slugs as distinct laundry product pages; do not merge trailer and container copy or imagery. | Owner approved restoration on 2026-09-23. |
| Containerized sleeper | Restore the exact original slug as a sleeper-container page, without promising capacity, amenities, or availability not verified for a project. | Owner approved restoration on 2026-09-23. |

## Verified limitation

The original origin permits interactive browser access to the homepage, but automated direct requests and sitemap/robots fetches return HTTP 403. The original sitemap could not be retrieved. Therefore the 33-path homepage inventory is verified, while a claim that it is the entire historical site remains blocked until a crawl/sitemap or CMS export is supplied.

## Owner decision and scope

The owner approved restoration of every verified product path from the original site on 2026-09-23. This audit does not authorize inventing additional URLs: the origin blocks its sitemap and direct automated retrieval, so the verified homepage inventory is the current restoration boundary. New pages preserve the original exact slugs and each receives one page-specific H1; copy remains intentionally non-speculative where the original individual-page content could not be retrieved.
