# Prompt 6 — Product-family alignment and distinct model pages

Copy-ready brief for rebuilding or reviewing websites with multiple categories, product families, model pages, or preserved legacy URLs. Fill in the bracketed values before use.

## Copy-ready prompt

Audit and improve the product/service pages for **[REPOSITORY]**, **[DOMAIN]**, covering **[EXACT ROUTES OR APPROVED BATCH]**, with **[OWNER / APPROVAL CONTACT]**. Follow the repository's `AGENTS.md`, business requirements, protected URL register, current project status, assignments, and decisions. Preserve every approved URL, slug, H1, brand, contact path, and approved image unless a separate change is explicitly authorized. Do not push, deploy, alter indexing directives, or publish a large batch without the required owner approval.

### Goal

Every page must describe the exact service and product family named by its URL and H1. Separate URLs for different models must provide independently useful, fact-supported information—not just a different H1 above the same generic description and “What the rental team needs to know” block. Create substantive model distinctions only where the evidence supports them. Do not manufacture page differences to manipulate search engines.

### 1. Inventory and verify before writing

For every route, record:

- Exact current URL and slug; current and approved H1; canonical and indexing state.
- Page family, transaction, intended audience, and exact product/model identity.
- Every verified product fact and its source: owner-approved schedule, original page, specification sheet, current inventory record, or documented approval.
- Exact approved image set, what each image actually depicts, image disclosure needs, and alt text.
- Existing links, page-specific copy, metadata, schema, and related products.
- Missing/conflicting facts and any suspected aliases or duplicate model identities.

Do not treat a route name, nominal size, image, inherited template, or TemporaryKitchenRental source fact as proof of capacity, fixture count, configuration, technical specification, price, availability, local coverage, or business claim. Never infer a model difference from the H1 alone. Escalate conflicts; do not guess.

### 2. Enforce family and image alignment

Map each page to one primary family and verify that its H1, title/meta, opening copy, specifications, body sections, FAQs, CTA, internal links, structured data, captions, and images all fulfill that same subject.

Examples of prohibited leakage include kitchen meals/cooking on a restroom, shower, laundry, sleeper, or refrigeration page; shower-only claims on a restroom/shower combination; trailer language for a container-only unit; or a model's capacity/layout copied from a different size. One H1 must remain stable and truthful per page. Never force a keyword family or change headings randomly to create variation.

Use only approved imagery for the exact model or an explicitly approved representative set with a clear, visible disclosure. A generic/category photo must not imply an unverified size, layout, capacity, accessibility feature, or configuration. Keep image alt text descriptive of the visible scene.

### 3. Make model pages meaningfully useful

Before drafting separate model pages, identify what facts genuinely distinguish each model and what customer decision the page helps make. Where verified, explain relevant differences such as:

- Actual layout, dimensions, fixture/equipment list, capacity, configuration, or supported use.
- Correct physical form factor and delivery/placement considerations.
- Verified utility requirements, operating conditions, service scope, or application.
- A useful comparison against the site's other verified model options.

Use precise sources for every such claim. Separate useful buyer guidance from assumptions: questions to confirm are not claims about an offered feature. Give each page a stable, specific lead and useful page-specific sections. Replace generic headings and paragraphs with clear model/topic-specific content. Avoid repeating a shared sales paragraph under different H1s.

If evidence does not support meaningful differences between two URLs, do **not** create synonym-swapped or size-token-only copy, invented specifications, or doorway-style pages. Preserve the URLs and mark the pair **BLOCKED — product distinction unverified**. Present the owner with the evidence gap and options—obtain verified product details, confirm that the pages intentionally serve different needs, or approve a canonical/consolidation/redirect/indexing plan. Do not implement such canonical, redirect, or `noindex` changes without explicit approval.

### 4. Audit similarity and indexing risk accurately

Compare the primary rendered content of all pages in the batch, excluding shared navigation, footer, and purely functional UI. Report exact duplicates and close-content pairs across titles/meta, leads, substantive body copy, FAQs, model facts, and imagery/captions. Similarity scores or text-distance thresholds are **internal screening signals only**; they are not Google's thresholds and do not replace expert/content review. A different H1, slug, or city/model token does not alone make a page meaningfully distinct. Conversely, shared design or common navigation is not substantive page duplication.

Explain that Google clusters pages when their primary content is very similar and chooses a representative canonical; a site's canonical and sitemap are signals, not guarantees of indexing or of Google's canonical choice. Do not promise that unique copy, self-canonicals, sitemap inclusion, or a request for indexing will cause every URL to be indexed. Validate Google-selected canonical status in Search Console URL Inspection when authorized, and record “unknown” when it cannot be checked.

### 5. Add regression guards

Add focused tests or extend the existing checks to:

- Render every affected route and assert exact path, one unchanged H1, and a present route-specific lead.
- Assert family-specific positive terms and block known cross-family phrases in the wrong route.
- Assert every model URL has content/configuration mapped to its exact identity; detect missing and unreferenced data entries.
- Detect repeated/near-identical substantive sections and report the exact route pairs for human review. Treat approved shared boilerplate separately from the primary content.
- Verify each referenced image exists, is approved for the depicted product, has accurate alt/caption treatment, and does not contradict the page.
- Verify related links resolve to the intended preserved model URLs; check canonical, sitemap, and indexing behavior only within the approved release scope.

Keep tests deterministic: content must not rotate or change by request, viewport, or random selection. Test content independently of H1 so changing a headline cannot hide a duplicate-body regression.

### 6. Review and release

Before edits, present the route/family/evidence map and flag suspected aliases, weak pages, unresolved facts, and the proposed content changes for owner review when required. During implementation, coordinate shared files and preserve other people's changes. After edits, run the focused tests, typecheck/build, generated HTML inspection, and representative mobile/desktop QA. Re-run the content-alignment and similarity report on the final rendered output. Preserve stable URLs and approved H1s; document any blocked distinction rather than padding the page.

Update the repository's assignment, status, test-result, and decision records. Do not report Google indexing or a successful deployment without direct evidence. Return an acceptance table with route, family, evidence used, H1, distinct supporting content, image match, canonical/indexing check, tests, release state, and PASS / FAIL / BLOCKED.
