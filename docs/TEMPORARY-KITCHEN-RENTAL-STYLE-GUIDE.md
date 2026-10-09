# Temporary Kitchen Rental — Website Style Guide

Version 1.0 · October 2026

This guide defines the visual, interaction, and content system for Temporary Kitchen Rental. It is the source of truth for the rebrand: approachable, practical, dignified, and ready to help people access food during disruption or emergency.

## 1. Brand foundation

### Positioning

Temporary Kitchen Rental connects people and communities with practical mobile food support. The brand should feel capable enough for emergency response and warm enough for a person asking for help.

### Personality

- **Welcoming:** people should feel safe asking for support.
- **Prepared:** information is organized, specific, and action-oriented.
- **Human:** use plain language and real stories without pity or sensationalism.
- **Resourceful:** show mobility, nourishment, coordination, and community.

### Design principles

1. **Lead with help.** Every page should make the next useful action obvious.
2. **Make complexity calm.** Use strong hierarchy, short sections, and generous spacing.
3. **Protect dignity.** Show people as participants and partners, never as problems.
4. **Design for urgency.** Emergency contact paths remain visible without making the whole site feel alarming.
5. **Earn trust visually.** Consistent color, clear status states, accessible contrast, and specific language matter more than decoration.

## 2. Logo system

### Primary logo

Use `/temporary-kitchen-rental-logo.svg` for the website header and other horizontal placements. It places the emblem on the left and the `Temporary Kitchen Rental` wordmark on the right. The mark combines a mobile kitchen trailer, cooking equipment, and a clean service-focused wordmark.

Use `/images/temporary-kitchen-rental-mark.svg` for centered, stacked, or square placements such as social graphics and promotional panels.

### Clear space

Keep a minimum clear space around the logo equal to the height of the lowercase “o” in the wordmark. Do not place text, borders, photographs, or controls inside this area.

### Minimum sizes

- Header: 152–190 px wide.
- Footer: 140 px wide.
- Compact mark: 32 px wide minimum.
- Favicon/app icon: use the emblem only, never the full wordmark.

### Logo rules

Do:

- Use the original proportions.
- Keep the transparent background intact.
- Use the full logo on light surfaces and the emblem-only version where space is tight.
- Preserve enough contrast for the navy wordmark.

Do not:

- Stretch, rotate, crop, outline, or recolor the logo.
- Add drop shadows, gradients, or effects.
- Place it over a busy photograph.
- Recreate the wordmark in a different font.
- Use the old `temporary-kitchen-rental` logo for new Temporary Kitchen Rental surfaces.

## 3. Color system

### Core palette

| Token | Hex | Role |
| --- | --- | --- |
| `--pfb-navy` | `#123047` | Primary text, navigation, footer, trust surfaces |
| `--pfb-teal` | `#159A9C` | Primary action, links, active states, mobility |
| `--pfb-coral` | `#F26B5B` | Warm emphasis, human moments, secondary action |
| `--pfb-gold` | `#F2B84B` | Nourishment, highlights, badges, attention |
| `--pfb-leaf` | `#63A66B` | Produce, community, positive status |
| `--pfb-ink` | `#18313D` | Body text and headings |
| `--pfb-muted` | `#5B6B72` | Supporting text, metadata |
| `--pfb-canvas` | `#F7FAF9` | Main page background |
| `--pfb-mint` | `#E8F3F0` | Soft panels and information bands |
| `--pfb-white` | `#FFFFFF` | Cards, reverse text, clean space |
| `--pfb-line` | `#D5E3E0` | Borders, dividers, input outlines |
| `--pfb-danger` | `#B42318` | Errors and destructive actions |
| `--pfb-success` | `#18794E` | Confirmed delivery, available, complete |

### Contrast rules

- Use navy or ink for all body copy.
- Use teal as a filled button with white text, or as a large link/icon accent. Do not use teal for small text on white unless contrast is verified.
- Use gold and coral for large labels, fills, borders, and accents—not long paragraphs.
- Every interactive control needs a visible `:focus-visible` ring in gold or teal.
- Never communicate status with color alone; pair it with text or an icon.

## 4. Typography

### Typeface roles

- **Headings:** `Manrope Variable`, `Manrope`, `Segoe UI`, sans-serif; 750–800 weight.
- **Body/UI:** `Manrope Variable`, `Manrope`, `Segoe UI`, system sans-serif; 400–650 weight.
- **Numbers and data:** use the body face with tabular numerals when available.

If hosted fonts are not added, the fallback stack must remain visually stable and readable.

### Type scale

| Token | Desktop | Mobile | Use |
| --- | ---: | ---: | --- |
| Display | 3.75rem / 1.05 | 2.65rem / 1.08 | Homepage hero only |
| H1 | 3rem / 1.08 | 2.2rem / 1.12 | Page headline |
| H2 | 2.15rem / 1.12 | 1.75rem / 1.16 | Section headline |
| H3 | 1.35rem / 1.2 | 1.2rem / 1.25 | Card or subsection |
| Lead | 1.25rem / 1.55 | 1.1rem / 1.55 | Intro paragraph |
| Body | 1rem / 1.65 | 1rem / 1.65 | Default copy |
| Small | 0.875rem / 1.45 | 0.875rem / 1.45 | Metadata and labels |
| Eyebrow | 0.75rem / 1.2 | 0.75rem / 1.2 | Uppercase category label |

Keep paragraphs between 45 and 75 characters per line. Use sentence case for headings and buttons.

## 5. Layout and spacing

### Container

- Max content width: `1200px`.
- Reading width: `720px`.
- Page gutter: `clamp(1rem, 3vw, 3rem)`.
- Desktop grid: 12 columns with a `24px` gap.
- Mobile grid: one column with a `16px` gap.

### Spacing scale

Use a 4px base unit: `4, 8, 12, 16, 24, 32, 48, 64, 80, 96`.

- Section padding: `80–112px` desktop, `56–72px` mobile.
- Card padding: `24–32px` desktop, `20–24px` mobile.
- Inline control gap: `8–12px`.
- Related-content gap: `24–32px`.

### Shape and elevation

- Small radius: `8px` for controls and fields.
- Card radius: `16px`.
- Feature radius: `24px`.
- Avoid fully rounded cards; reserve pill shapes for tags, status, and compact filters.
- Use one soft shadow only: `0 12px 32px rgba(18, 48, 71, 0.10)`.
- Prefer borders and surface contrast over stacked shadows.

## 6. Component language

### Header and navigation

- White or canvas background with a compact logo lockup.
- Sticky header may use a subtle bottom border after scroll.
- Primary navigation: 16px medium text, navy default, teal active state.
- Primary emergency/help action remains visible on desktop and mobile.
- Mobile navigation uses a full-width panel; never hide the contact path behind a tiny icon only.

### Hero

- Eyebrow, one clear H1, short supporting paragraph, and one primary action.
- Use a calm light background or a real operational image with a navy overlay.
- Keep the first viewport focused: no more than two CTAs and no dense feature grid above the fold.

### Buttons

Primary: teal fill, white text, `48px` minimum height, `12px 20px` padding, `8px` radius.

Secondary: white or transparent fill, navy text, `1px` navy/line border.

Urgent/help: coral fill only when the action is genuinely time-sensitive.

All buttons need hover, keyboard focus, disabled, and loading states. Use verbs: “Request support”, “Plan delivery”, “Talk to our team”.

### Cards

- White surface on canvas or mint background.
- One visual, one headline, one short description, one action.
- Use a consistent image ratio within a collection.
- Do not put more than one primary CTA in a card.

### Forms

- Label every field; placeholders are examples, not labels.
- Use 48px controls with 16px text.
- Group related fields under a short legend.
- Explain why sensitive information is requested.
- Show inline validation next to the field and summarize errors at the top.
- Confirmation must state what happens next and when.

### Status and availability

Use text plus color: `Available`, `Limited`, `Unavailable`, `Request received`, or `Needs review`. Do not use green/red dots without labels.

### Footer

- Navy background with white logo treatment or a high-contrast lockup.
- Repeat the main help/contact action.
- Include service scope, operating hours, privacy, accessibility, and social links.
- Keep legal and utility links visually quieter than help actions.

## 7. Imagery and illustration

- Prefer documentary-style images of food preparation, stocked supplies, mobile service units, volunteers, and respectful community interaction.
- Use natural light, clean environments, visible hands and actions, and diverse real people.
- Avoid images that show hunger as spectacle, staged distress, unsafe food handling, or unverified emergency claims.
- Use the logo palette as a grading cue: cool navy/teal foundations with warm food accents.
- Crop images with the subject’s face, hands, or operational action in the safe center area.
- Provide meaningful alt text that describes the purpose of the image, not just its contents.

## 8. Content and voice

### Voice

Clear, calm, respectful, practical, and reassuring.

### Prefer

- “Tell us what your community needs.”
- “We’ll help you plan the next step.”
- “Request portable food support.”
- “Here’s what happens after you contact us.”

### Avoid

- Blame, pity, urgency theater, or fear-based copy.
- Vague claims such as “guaranteed” or “instant” unless operationally true.
- Jargon without a plain-language explanation.
- All-caps paragraphs, exclamation-heavy CTAs, and unexplained acronyms.

## 9. Accessibility and responsive behavior

- Target WCAG 2.2 AA for text, controls, focus, forms, and motion.
- Keyboard order must follow visual order.
- Provide a skip link and visible focus indicators.
- Respect `prefers-reduced-motion`; avoid essential information in animation.
- Touch targets: minimum `44px × 44px`.
- Never rely on hover to reveal essential content.
- Test at 320px, 390px, 768px, 1024px, and 1440px widths.
- At mobile widths, stack cards, keep CTAs full-width when useful, and preserve readable line length.

## 10. Implementation tokens

```css
:root {
  --pfb-navy: #123047;
  --pfb-teal: #159a9c;
  --pfb-coral: #f26b5b;
  --pfb-gold: #f2b84b;
  --pfb-leaf: #63a66b;
  --pfb-ink: #18313d;
  --pfb-muted: #5b6b72;
  --pfb-canvas: #f7faf9;
  --pfb-mint: #e8f3f0;
  --pfb-white: #fff;
  --pfb-line: #d5e3e0;
  --pfb-danger: #b42318;
  --pfb-success: #18794e;
  --pfb-container: 1200px;
  --pfb-reading: 720px;
  --pfb-radius-sm: 8px;
  --pfb-radius-card: 16px;
  --pfb-radius-feature: 24px;
  --pfb-shadow: 0 12px 32px rgb(18 48 71 / 10%);
  --pfb-focus: 0 0 0 3px #f2b84b;
}
```

## 11. Rebrand rollout checklist

- Replace all old logo files in header, footer, favicon, social card, and structured data.
- Replace old brand names, domains, phone numbers, analytics IDs, and deployment references.
- Update page titles, descriptions, canonical URLs, sitemap, robots policy, and JSON-LD.
- Apply the token palette before component-by-component visual refinement.
- Rework the homepage hero, navigation, emergency/help CTA, contact forms, and footer first.
- Audit every route for old brand residue and old external links.
- Run keyboard, contrast, responsive, form, and image-alt checks before release.

## 12. Asset inventory

| Asset | Path | Use |
| --- | --- | --- |
| Horizontal header logo | `/public/temporary-kitchen-rental-logo.svg` | Website header and horizontal footer lockup |
| Stacked logo | `/public/images/temporary-kitchen-rental-mark.svg` | Centered, square, and social compositions |
| Compact brand mark | `/public/images/temporary-kitchen-rental-mark.svg` | Favicon, compact header, and social compositions |

