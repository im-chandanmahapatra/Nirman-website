# ERA Residence — Complete Reverse Engineering Report (Target: NIRMAN)

**Reference URL:** `https://www.era-residence.com/`  
**Inspection Date:** 2026-11-17  
**Browser:** Headless Chromium via `playwright-cli`  
**Primary Desktop Viewport:** `1440 × 900` (Total Document Height: `24,605px`, Horizontal Overflow: `0px`)

---

## 1. Website Architecture & Section Order

The reference is a 24,605px editorial storytelling landing page built on Webflow + GSAP 3.15.1 + ScrollTrigger + SplitText + CustomEase + Lenis 1.3.21 + Barba.js, structured on a strict **10-column architectural grid** using fluid `1vw` scaling (`1rem = 1vw` on desktop `>=992px`, `14.4px` at `1440px`).

| # | Section / Component | Y Range (1440×900) | Height | Theme / Background | Key Purpose |
|---|---|---|---:|---|---|
| 00 | **Preloader Curtain** | Fixed overlay | `100vh` | `#340C24` Velvet Plum | Arch-portal reveal from `24vw -> 36vw -> 125vw` over `4s` (`loaderEase` + `diveIn`), hairline border frame, faint script watermark. |
| 00b | **Fixed Chrome (`Header` + `ScrollBar` + `ScrollDown`)** | Fixed | `100vh` | Auto-adapting (`theme_on-color` / `theme_on-brand` / `theme_on-light` / `theme_on-dark`) | Top-left rotating circular wordmark (`122×122px`), top-right 3-link nav (`Select an Apartment`, `Book a call`, `Contact`), left vertical scroll rail (`00–100` draggable thumb), bottom-left rotated `SCROLL ↓` label. |
| 00c | **Cookie Consent Card** | Fixed bottom-right | `238×294px` | `#F3F3EC` Cream (`17:21` beveled card) | Tilted `Cookies` script header (`-12deg`), short copy, `Accept / Decline` dual-line links. |
| 01 | **Hero (`#hero`)** | `0 – 5220` (`3600` sticky + transition) | `5220px` | `#340C24` -> Full-bleed Day/Night Pool Photo | Centered display title (`ERA RESIDENCE`), script subtitle (`Estepona`), `A PLACE [BY DAY | BY NIGHT] TO RETURN TO`, interactive pulsing hotspot pins (`⊙`), bottom circular CTA (`View available apartments`), scroll zoom (`scale 1 -> 2`). |
| 02 | **Rising Arch Intro (`THREE REASONS`)** | `3600 – 4320` | `720px` | `#B5CEDB` Powder Sky (`border-top-radius: 50rem`) | Semicircular arch rising over hero with curved SVG text `"THREE REASONS TO CHOOSE..."`, lockup `COSTA [emblem] DEL SOL`, hairline, kicker. |
| 03 | **Reasons Carousel** | `4320 – 5220` | `900px` | `#B5CEDB` Powder Sky | 3-slide auto/manual showcase (`REAL-LIFE LOCATION`, `BUILT TO STAY`, `BOUTIQUE CONCEPT`), centered `562×281px` image with polygon clip wipe, `< 1 ———— 2 >` progress bar. |
| 04 | **Architectural Pull-Quote** | `5220 – 6300` | `1080px` | Full-bleed Twilight Pool Photo | Architectural quote anchored lower-right (`"INSTEAD OF CORRIDORS, WALKING PATHS..."`), attribution (`Architecture Team`). |
| 05 | **Horizontal Concept & Location Track** | `6300 – 10814` | `4514px` | `#F3F3EC` Alabaster Cream | Desktop scroll-pinned horizontal track (`loc-scroll-area`): (A) *The Concept* + cascading bougainvillea; (B) *Spain / New Golden Mile* staggered 3-line kinetic headline + vertical terrace photo + *Between Marbella & Estepona* + circular CTA; (C) *The coast you wanted yours this year* + animated SVG coastline distance map. |
| 06 | **Aerial Master Plan & Clouds** | `10814 – 12074` | `1260px` | `#340C24` Velvet Plum + Aerial Photo | Multi-layer parallax clouds (`clouds is-33 / is-47 / is-02`) framing the aerial master plan (`scale 1.15 -> 1`) + bottom-left location coordinates. |
| 07 | **Residence Typologies Carousel** | `12074 – 12974` | `900px` | `#B5CEDB` Powder Sky | 3-slide typology explorer (`Ground floor + basement`, `Ground Floor`, `Penthouse duplex`): left specs (`Bedrooms`, `Area up to`), center portrait architectural render (`594×792px`), right summary + pill CTA, giant bottom title, `< 1 ———— 2 >`. |
| 08 | **Square Footage Statement** | `12974 – 13829` | `855px` | `#B5CEDB` Powder Sky | Editorial statement (`104 to 244 sq.m.`) + cascading bougainvillea left frame. |
| 09 | **Amenities Interactive Showcase** | `13829 – 16799` | `2970px` | `#340C24` Velvet Plum + Twilight Photo | 5 interactive tabs (`Gated community`, `Swimming Pool`, `Parking area`, `Spa & gym`, `Landscaping`) with sliding vertical indicator bar, dynamic bottom-left copy, circular `Book a call now` CTA, and scroll-exit zoom (`scale 1 -> 2`, `opacity 1 -> 0`). |
| 10 | **The Space to Live In** | `15179 – 18158` | `2979px` | `#F3F3EC` Cream (`arch` top) | Rising cream arch, `THE SPACE TO Live in`, left `#340C24` block with trapezoid garden window + optional upgrades list, right angled terrace photo + specs + circular CTA + interactive gallery slider + lightbox zoom. |
| 11 | **Architecture Split Reveal** | `18158 – 21538` | `3380px` | `#F3F3EC` Cream -> Facade Photo | Two animated vertical `clip-path` photo windows opening and scaling (`1 -> 1.84`) into full-bleed facade under giant fitted `ARCHITECTURE` (`349px`), architect credits, and circular CTA. |
| 12 | **Credentials & Milestones Accordion** | `21538 – 22356` | `818px` | `#F3F3EC` Cream | 4 expandable items (`Developer⁺`, `Sales & Marketing⁺`, `License obtained⁺`, `2026⁺`) with `+ -> ×` `-45deg` rotation and smooth height expansion. |
| 13 | **Perfect Sea Views CTA** | `22356 – 23935` | `1579px` | `#340C24` Velvet Plum + Rooftop Photo | Full-bleed rooftop sea-view terrace, top kicker, `PERFECT SEA VIEWS / FROM ROOFTOP TERRACES`, circular `View available apartments` CTA. |
| 14 | **Clip-Transition Footer** | `23705 – 24605` | `900px` | `#340C24` Velvet Plum | Scroll-driven `clip-path: inset(0% -> 8% 22%)` on the rooftop image above, footer scaling `0.75 -> 1`, rosette emblem, giant phone number, Sales Office address, vertical `↑ TO TOP`, legal links, studio credit. |
| 15 | **Subpages & Modals** | Overlay / Routes | `100vh` | `#B5CEDB` / `#F3F3EC` / `#340C24` | `Book a call` 3D-tilt modal form, mobile full-screen menu overlay, `/apartments` filterable floorplan catalog (`25 residences`), `/contact` inquiry view. |

---

## 2. Exact Design System & Measured Values

### 2.1 Exact Color Palette (`ref-styles.css` CSS Variables)

| Token / Element | Actual CSS Color | HEX / RGBA | Usage |
|---|---|---|---|
| `--_global-colors---brand-500--velvet-plum` | `rgb(52, 12, 36)` | `#340C24` | Preloader, Hero base, Master Plan, Amenities, Space-to-Live-In left block, CTA, Footer, Mobile Menu |
| `--_global-colors---brand-500--powder-sky` | `rgb(181, 206, 219)` | `#B5CEDB` | Arch intro, Reasons carousel, Typologies carousel, Square footage statement, Book-a-Call modal, Contact page |
| `--_global-colors---base-0--100` | `rgb(243, 243, 236)` | `#F3F3EC` | Primary light canvas: Concept horizontal track, Space to Live In, Architecture, Accordion, Apartments, Cookie Card |
| `--_global-colors---base-1000--100` | `rgb(23, 35, 59)` | `#17233B` | Primary dark ink (headings & body text on Cream `#F3F3EC` and Powder Sky `#B5CEDB`) |
| `--_global-colors---white--100` | `rgb(255, 255, 255)` | `#FFFFFF` | Primary light ink on Velvet Plum (`#340C24`) and photography |
| `--_global-colors---brand-500--blush-bloom` | `rgb(248, 187, 203)` | `#F8BBCB` | Brand accent token (botanical bloom register) |
| `--_global-colors---base-1000--60` | `rgba(23, 35, 59, 0.6)` | `#17233B99` | Muted text on light surfaces |
| `--_global-colors---base-1000--10` | `rgba(23, 35, 59, 0.1)` | `#17233B1A` | Hairline borders & scroll track on light surfaces |
| `--_global-colors---white--40` | `rgba(255, 255, 255, 0.4)` | `#FFFFFF66` | Inactive tab/control labels on dark surfaces |
| `--_global-colors---white--20` | `rgba(255, 255, 255, 0.2)` | `#FFFFFF33` | Hairline borders & circle tracks on dark surfaces |

### 2.2 Typography Specification (Verified Computed Styles at `1440 × 900`)

Reference uses fluid `html { font-size: 1vw; }` (`14.4px` at `1440px`) with `--_special-units---scale-ratio: 16`:

| Style Class | Reference Font | NIRMAN Open Web Font Equivalent | Weight | Size @1440px | Line Height | Letter Spacing | Transform |
|---|---|---|---|---:|---:|---:|---|
| `.h1` (Hero / Display) | `ambroise-francois-std` | `Bodoni Moda` (condensed editorial scale) | 400 | `172.8px` (`12rem`) | `87.5%` (`150.3px`) | `-0.024em` | `uppercase` |
| `.h2` (Typology Title) | `ambroise-francois-std` | `Bodoni Moda` | 400 | `122.4px` (`8.5rem`) | `88.235%` | `-0.024em` | `uppercase` |
| `.h3` (Accordion / Coast) | `ambroise-francois-std` | `Bodoni Moda` | 400 | `86.4px` (`6rem`) | `91.667%` | `-0.024em` | `uppercase` |
| `.h4` (Section Lead) | `ambroise-francois-std` | `Bodoni Moda` | 400 | `56.7px` (`3.9375rem`) | `88.889%` | `-0.016em` | `uppercase` |
| `.h5` (Subhead / Quote) | `ambroise-francois-std` | `Bodoni Moda` | 400 | `36px` (`2.5rem`) | `100%` | `-0.008em` | `uppercase` |
| `.a1` / `.a2` (Script) | `sloop-script-three` | `Pinyon Script` / `Alex Brush` | 400 | `172.8px` / `108px` | `100%` | `0em` | `none` |
| `.c1` (Wide Tracked) | `ambroise-francois-std` | `Bodoni Moda` | 400 | `22.5px` (`1.5625rem`) | `112%` | `0.8em` | `uppercase` |
| `.p1` (Body Copy) | `Maison Neue Extended` | `Plus Jakarta Sans` | 400 | `11.7px` (`0.8125rem`) | `138.462%` | `-0.024em` | `none` |
| `.l1` (Micro Label) | `Maison Neue Extended` | `Plus Jakarta Sans` | 700 | `9.9px` (`0.6875rem`) | `145.455%` | `0.048em` | `uppercase` |

### 2.3 Grid, Spacing & Responsive Breakpoints

- **Grid**: 10 equal columns (`repeat(10, 1fr)`), `gap: 1rem` (`14.4px` at `1440px`), horizontal page margin `offset-l/r: 3rem` (`43.2px` at `1440px`), cell width `1-cell-h: 8.5rem` (`122.4px`), cell height `1-cell-v: 6rem` (`86.4px`).
- **Breakpoints** (verified from `ref-styles.css` & `slater-main.js`):
  - Desktop: `>= 992px` (`1rem = 1vw`, 10-column grid, horizontal `loc-scroll-area`, fixed scroll rail `.s-bar-w` + `.s-down`, desktop 3-link nav).
  - Tablet: `768px – 991px` (stacked `loc-scroll-area_track`, mobile `MENU` trigger replaces inline nav links, `.s-bar-w` hidden).
  - Mobile Landscape / Portrait: `<= 767px` and `<= 479px` (4-column grid, `1rem` scaled for mobile legibility, centered hero circular CTA over the pool).

---

## 3. Animation & Motion Reverse Engineering (`slater-main.js`)

- **Custom Easings**: `InOut` (`cubic-bezier(0.75, 0, 0.25, 1)`), `Out` (`0.25, 1, 0.5, 1`), `In` (`0.5, 0, 0.75, 0`), `diveIn` (`0.6, 0, 0, 1`), `loaderEase` (custom deceleration-pause-surge curve), `horScroll` (`0.25, 0, 0.75, 1`).
- **Durations**: `durS = 0.4s`, `durM = 0.8s`, `durL = 1.2s`, `stagger = 0.1s`, `delayReveal = 0.3s`.
- **Key Orchestrations**:
  1. **Preloader Arch Reveal**: `--arch-w` expands `24vw -> 36vw` (`1.5s`, `InOut`), then `--arch-w: 125vw, --arch-y: -100vh` (`2.4s`, `diveIn`) while hero image scales `0.75 -> 1`.
  2. **Header Logo Spin**: Continuous ticker rotation (`30 deg/s`) accelerating proportionally to Lenis scroll velocity (`30 + 10 * |velocity|`) and flipping direction on upward scroll.
  3. **Theme Inversion (`initThemeChange`)**: `ScrollTrigger` probes element center against `[data-bg="color|light|dark"]` sections to swap `theme_on-color` / `theme_on-brand` / `theme_on-light` / `theme_on-dark`.
  4. **Link & Nav Dual-Text Hover**:
     - `nav-item`: Old characters slide up `yPercent: 0 -> -100`, new characters rise `100 -> 0` staggered left-to-right.
     - `link`: Old characters rotate `rotateY: 0 -> -90` with `x: 0.4em` + bottom hairline shrinks `scaleX: 1 -> 0`, incoming characters enter from `rotateY: 90, x: -0.4em`.
  5. **Circle Button Arc (`btn-circle`)**: SVG circle stroke-dasharray expands from `4.17%` arc gaps to `50%` full embrace on hover + magnetic cursor attraction (`strength: 25`).
  6. **Carousel Clip-Path Polygon Wipe (`animateSlide`)**: Outgoing image clips `polygon(0 0, 100% 0, 125% 100%, 0 100%) -> polygon(0 0, 0 0, 0 100%, 0 100%)` while incoming enters from `polygon(100% 0, 100% 0, 101% 100%, 125% 100%)` with internal `scale(1.5) xPercent(25) -> scale(1) xPercent(0)`.
  7. **Scroll-Driven Parallax & Scrubs**: Hero scroll zoom (`scale 1 -> 2`), horizontal track (`loc-scroll-area`), amenities exit zoom (`scale 1 -> 2, opacity 1 -> 0`), architecture dual-window `clipPath` split opening, and footer image inset clip (`inset(0%) -> inset(8% 22%)`).

---

## 4. Development Implementation Plan (NIRMAN)

1. Generate 10 cohesive architectural & interior photographic assets for NIRMAN via `generate_image` (in `/src/assets/images/`).
2. Configure `/index.html`, `/metadata.json`, and `/src/index.css` with NIRMAN metadata, Google Fonts (`Bodoni Moda`, `Pinyon Script`, `Plus Jakarta Sans`), and exact design tokens (`#340C24`, `#B5CEDB`, `#F3F3EC`, `#17233B`, `#FFFFFF`).
3. Create modular data & pure logic utilities (`src/data/nirmanData.ts`, `src/utils/residences.ts` + `src/utils/residences.test.ts` verified with `node:test`) covering all 25 NIRMAN residences, 3 reasons, 3 typologies, 5 amenities, 4 credentials, and filtering/sorting logic.
4. Implement all components with full motion fidelity (GSAP + Lenis, or native RAF/Scroll-linked + GSAP installed cleanly — let's install `gsap` and `lenis` in one batched `install_applet_package` call if needed, or verify! Actually installing `gsap` and `lenis` ensures exact `ScrollTrigger`, `CustomEase`, `Lenis` motion parity!).
5. Build every section, interactive modal (`BookACallModal`, `MobileMenuModal`, `LightboxModal`, `CookieBanner`), and subpage view (`/apartments`, `/contact`), then execute live browser testing, side-by-side visual comparison + pixel-difference analysis against reference screenshots, and iterative refinement until `>= 95%` fidelity.
