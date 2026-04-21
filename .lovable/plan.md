
# Academic Research Ecosystem — Landing Page

A single-page interactive site that visualizes a university research program as an ecosystem: a clickable pie-chart hub on the left, faculty bubbles on the right that filter by research area.

## Defaults I'll use (easy to swap later)

- **Tagline:** `DISCOVER · CREATE · SUSTAIN · LEAD`
- **Program acronym (red center hub):** `MTEC`
- **Research areas:**
  1. Advanced Materials
  2. Smart Manufacturing
  3. Sustainable Energy
  4. Entrepreneurship *(decorative, non-clickable)*
- **Faculty:** 8 demo professors with placeholder profile images and mixed area mappings so the filter behavior is visible immediately. You can replace names + images by editing one data file or uploading photos.
- **Palette:** muted earthy — warm clay, sage, ochre, dusty teal slices; cream background; deep ink text; signature red center hub. All defined as HSL design tokens in `index.css` / theme.

## Page structure

**Hero (full viewport, side-by-side, stacks on mobile)**

- **Left 50%** — Tagline above an SVG pie diagram:
  - 4 equal quadrants in distinct muted earthy colors
  - Red circular hub at center with "MTEC" — clicking resets filters
  - Slice labels arc-positioned around each quadrant
  - 4th slice (Entrepreneurship) is decorative; cursor stays default, no hover lift
  - Hover state: subtle lift + outline on clickable slices
  - Active slice: stronger outline + slight scale
- **Right 50%** — Faculty grid:
  - 2 cols mobile / 3 cols desktop
  - 80px circular bubbles, fill `#D6CFCA`, thin dark border
  - Two-line name (first / last), bold IBM Plex Sans 12px
  - Filtering: matched profs at 100% opacity, others fade to 30% with smooth transition

## Interactions

| Action | Result |
|---|---|
| Click a colored slice (1–3) | Filter grid to that research area |
| Click red center hub | Reset — all faculty back to 100% |
| Click 4th slice | No-op (decorative) |
| Click a faculty bubble | Open image-only popup |
| Click X / press Esc | Close popup |

## Faculty popup

- Clean shadcn Dialog, white background, rounded-2xl, max-width ~950px
- Single full-bleed profile image, no other text or links
- Small X close button top-right
- Screen-reader-only `DialogTitle` with the professor's name for a11y

## Tech & quality

- React + TanStack Start route at `/` (replaces the placeholder index)
- Tailwind + shadcn/ui (Dialog), IBM Plex Sans loaded via Google Fonts
- All colors as HSL design tokens — no hardcoded hex in components
- Responsive: stacks vertically below `md`, grid collapses to 2 cols
- Accessibility: keyboard navigable slices (button + role), focus rings, alt text on every image, single H1, descriptive meta tags, og/twitter tags on the route
- Faculty data lives in a single typed `faculty.ts` file for easy editing

## Easy customization after build

You'll be able to:
1. Edit `src/data/faculty.ts` to change names, area weights, and image paths
2. Upload professor images to chat — I'll wire them in
3. Change tagline / acronym / area names in one config object
