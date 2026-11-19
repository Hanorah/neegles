# Neegles — Creative Direction & Architecture

## Stage 1 findings

- **Repository:** contained no codebase, only inspiration material (Dribbble-style shots of Luma, Luxfolio,
  Common, Inex, Creagen and two showcase reels: Rekolet, Visual Record). None of it is Neegles content.
- **Live site (neegles.com):** Next.js. Real content was extracted from `/`, `/about`, `/services`, `/projects`,
  `/labs`, `/careers`, `/contact` and the four industry pages. All copy, projects, industries, lab work and
  testimonials used in this build come from there (see `lib/content.ts`). Nothing was invented.
- **Brand signals found in the live CSS:** Neegles blue `#0049de`, ember `#fe4a23`, warm paper `#ede6e1`,
  abyss `#071625`, a noise texture overlay, Inter + a serif for Labs.
- **Reference (farmminerals.com):** did not resolve from the build environment, so the brief's description of it
  (a physical event told cinematically through scroll) was used as the reference point.

## Concept — "Beneath the surface"

Every product has a surface: the screen people touch. Neegles' work is what sits under it: the systems,
data, infrastructure and logic. The site tells that story literally:

1. A laptop hangs above black water at night, screen glowing. **(0 m)**
2. Scroll: it falls, hits the surface, the water crowns and ripples, and the camera follows it under.
3. Underwater, rising bubbles turn into code glyphs, and the laptop's screen breaks apart into the
   interfaces Neegles builds (dispatch maps, CRMs, pipelines, inference, automations) arranged around you.
4. From there the site alternates between **the deep** (immersive, dark, 3D) and **the plan** (paper,
   editorial, typographic), so it never becomes one long dark page.
5. It ends by surfacing: a tunnel of interfaces and glyphs around the visitor, and a plain human ask.

A fixed **depth gauge** (desktop) acts as wayfinding and ties the whole page to the dive.

## Section rhythm

| # | Section | Surface | Signature interaction |
|---|---------|---------|-----------------------|
| A | Hero / Dive | abyss | Scroll-scrubbed laptop fall, shader water, analytic splash, underwater transition, bubbles→glyphs, panels emerge |
| B | What we do | paper | One particle system morphing between 5 forms: code braces, exploded UI stack, cloud constellation, neural field, Möbius loop. Cursor repels particles |
| C | How we think | Neegles blue | Scroll-scrubbed word reveal, mission statement, pinned horizontal process (6 real steps) |
| D | Selected work | ink | Real 3D devices (procedural laptop + slate) running live scrolling previews of ProFix Desk and Kiké; project file dialog |
| E | Industries | paper | Typographic strata that open into the real modules per industry; cursor-following image reveal; real client voices |
| F | Labs | ink + grid | Live GPU wave-equation simulation refracting type (an actual experiment), real lab product surfaces |
| G | Final CTA | abyss | Camera inside a tunnel of interfaces and code, steered by the pointer |

## Design system

- **Type:** Archivo (variable width, display, set expanded/condensed for drama) · Inter (text) ·
  JetBrains Mono (technical labels, gauge) · Instrument Serif italic (editorial accents, sparingly).
- **Colour:** `--abyss #040d13`, `--ink #0b0c0e`, `--paper #ece6df`, `--signal #0049de` (brand),
  `--signal-bright #4a7dff`, `--ember #fe4a23` (one accent, used rarely). No gradients for decoration.
- **Motion language:** physical, weighted, never bouncy. Ease `expo.out` for reveals, `power2.inOut` for camera.
  Text enters by line masks. Everything scroll-linked is reversible.

## Architecture

- **Next.js (App Router), TypeScript**, plain CSS with design tokens (no UI kit).
- **three + @react-three/fiber + drei** for all 3D; every model is procedural (no GLB download cost).
  Water, splash, bubbles/glyphs, god rays, particles and the ripple sim are custom GLSL.
- **GSAP + ScrollTrigger + SplitText** for choreography; **Lenis** for smooth scroll (disabled for reduced motion).
- Each WebGL scene is `next/dynamic` (no SSR), mounted only when near the viewport, and its render loop
  is paused when offscreen (`components/three/LazyCanvas.tsx`).
- **Quality tiers** (`lib/quality.ts`): DPR caps, particle counts and water mesh resolution scale by device.
  Mobile gets a shorter dive, fewer particles and stacked layouts, not a broken-down desktop.
- **Fallbacks:** no WebGL → static poster compositions; `prefers-reduced-motion` → no smooth scroll,
  no pinning/scrubbing, static scene frames, all content visible.
- **SEO:** server-rendered semantic HTML for all content, metadata/OG, JSON-LD Organization, sitemap, robots.

## Open items for the Neegles team

- External "Visit website" URLs for ProFix Desk and Kiké weren't exposed on the live site, so the build has no
  outbound links for them (add them in `lib/content.ts`).
- Lab item names (Prism, oio, iDara, Footera) come from the live Labs page's image files and the screens themselves.
  Confirm the names and descriptions.
- Testimonials are the short excerpts published on the industry pages. Confirm the full wording before launch.
- The contact form on the live site posts to an unknown backend. This build links to email and WhatsApp.
  Reconnect the existing `/contact` and `/start-a-project` routes when merging.
