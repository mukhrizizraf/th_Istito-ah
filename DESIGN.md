---
name: Istito'ah Tracker
description: Co-branded SEFB–Tabung Haji proposal dashboard that measures depositor readiness against TH's own Hajj amounts.
colors:
  paddy-green: "#0a6b4c"
  paddy-ink: "#0a5a40"
  paddy-soft: "#dcece3"
  pilgrim-gold: "#c99316"
  gold-ink: "#7d5806"
  gold-soft: "#f6e9c6"
  night-band: "#0b2a22"
  night-band-raised: "#103a2f"
  band-ink: "#eef5f1"
  band-muted: "#a6bfb4"
  band-gold: "#e6bb4c"
  page-mist: "#eef2ee"
  surface: "#fbfcfa"
  surface-raised: "#f3f6f3"
  surface-sunk: "#e3eae5"
  ink: "#0f231d"
  ink-soft: "#3a4f47"
  muted: "#566960"
  line: "#d3ddd7"
  series-green: "#0a7a55"
  series-gold: "#b8790a"
  balance-band-1: "#7abd98"
  balance-band-2: "#4b9f78"
  balance-band-3: "#2a805c"
  balance-band-4: "#156444"
  balance-band-5: "#0a4531"
  status-good: "#0ca30c"
  status-warn: "#fab219"
  status-crit: "#d03b3b"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2.6rem, 5.4vw, 4.6rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.06rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    letterSpacing: "0.09em"
rounded:
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "28px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "22px"
  xl: "34px"
components:
  button-primary:
    backgroundColor: "{colors.pilgrim-gold}"
    textColor: "#1f1703"
    rounded: "{rounded.pill}"
    padding: "12px 18px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 18px"
  nav-item-active:
    backgroundColor: "{colors.paddy-green}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "8px 11px"
  chip:
    backgroundColor: "{colors.surface-sunk}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "22px"
  night-band:
    backgroundColor: "{colors.night-band}"
    textColor: "{colors.band-ink}"
    rounded: "{rounded.xl}"
    padding: "34px"
  stat-tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "18px"
    padding: "16px 18px"
---

# Design System: Istito'ah Tracker

## Overview

**Creative North Star: "The Istito'ah Ladder"**

Every screen is a rung on one ladder: a depositor's TH balance climbing past the amounts Tabung Haji itself uses (RM8,325, RM15,000, RM23,500, RM33,300). The system is the sister of the Kedah Silver Economy dashboard: paddy green sheets on a pale mist ground, a deep night-green band for the moments that matter, and pilgrimage gold reserved for thresholds and the one primary action. It reads as a working instrument presented as a proposal, so data panels carry the weight and decoration stays out of the way.

Density is moderate: generous sheets on the overview and reading pages, a 12-column dashboard grid on the tracker. Light is the default for meeting rooms and projectors; dark is a first-class, separately tuned theme. Everything is bilingual (English and Bahasa Melayu) through paired spans, so no layout may depend on the length of one language.

**Key Characteristics:**
- Paddy green carries brand and structure; gold marks thresholds and the primary action only.
- Instrument Serif headlines over Inter interface text.
- Night-green bands with faint khatam (8-point star) linework for the signature moments.
- Charts drawn in validated green and gold ramps; status colours always ship with an icon and label.
- A co-branded lockup (SEFB, UUM with Lembaga Tabung Haji) sits on a light plate in every theme.

## Colors

A restrained two-hue world: paddy greens for structure and data, pilgrimage gold for the few things that must be found first, and quiet green-grey neutrals. No blue anywhere.

### Primary
- **Paddy Green** (#0a6b4c): active navigation, page icons, gauge fills, focus colour, the brand mark. Its deeper ink step (#0a5a40) carries links and green text on light surfaces.

### Secondary
- **Pilgrimage Gold** (#c99316): the primary button, threshold lines on charts, deadline and policy chips (gold-soft #f6e9c6 with gold-ink #7d5806 text). On the night band it brightens to Band Gold (#e6bb4c).

### Tertiary
- **Night Band** (#0b2a22, raised #103a2f): the hero ladder card, the problem statement band, the governance band and the threshold band. Text on it uses Band Ink (#eef5f1) and Band Muted (#a6bfb4).

### Neutral
- **Page Mist** (#eef2ee): the page ground.
- **Sheet** (#fbfcfa), **Raised Sheet** (#f3f6f3), **Sunk Well** (#e3eae5): cards, nested tiles, segmented-control tracks and chips.
- **Deep Ink** (#0f231d), **Soft Ink** (#3a4f47), **Muted** (#566960): headings and body, secondary copy, labels and axis text.
- **Hairline** (#d3ddd7): dividers, table rules, input borders.

### Data colours
- **Series pair** (green #0a7a55, gold #b8790a): two-series charts (selection vs Malaysia; current plan vs literacy plan). Validated for colour-vision deficiency with the dataviz validator; the second series is always dashed as well.
- **Balance bands** (#7abd98 → #0a4531, five steps): ordinal ramp for balance bands and funnels.
- **Heat ramp** (seven steps, #d6ece0 → #073f2b): tile map and trend matrix; cells always print their value.
- Dark theme has its own stepped values for every data colour (light-to-bright on the dark surface), defined in th.css, not an automatic flip.

### Named Rules
**The Gold Means Threshold Rule.** Gold marks a policy amount, a deadline or the single primary action on a view. If gold appears on anything else, it is noise.

**The No Blue Rule.** The owner rejected blue for this family of sites. Categorical needs are met with green, gold and neutral, never blue.

**The Status Pairing Rule.** Good, warn and critical colours appear only with an icon and a word (On track, Close, Below target, Met, Missed).

## Typography

**Display Font:** Instrument Serif (with Georgia, serif)
**Body Font:** Inter (with system-ui, sans-serif)

**Character:** A calm, slightly literary serif for the argument, a neutral workhorse sans for the instrument. Both are pinned by the sister site.

### Hierarchy
- **Display** (400, clamp(2.6rem, 5.4vw, 4.6rem), 1.04): the overview hero headline only.
- **Headline** (400, clamp(1.8rem, 3.4vw, 2.6rem), 1.12): page and section headings; page heads use clamp(2.4rem, 5vw, 4rem).
- **Title** (650, 1.06rem, 1.2): panel and card titles in Inter; headings that sit directly under a page title use this look on an h2 to keep the outline correct.
- **Body** (400, 16px, 1.6): prose capped near 66ch; ledes at 1.12rem.
- **Label** (700, 0.72rem, 0.09em, uppercase): figure labels, field labels, table headers.
- **Figures** (Instrument Serif 2–2.5rem, tabular numerals): stat tiles, milestone times, fact tiles.

### Named Rules
**The Serif Speaks, Sans Works Rule.** Instrument Serif is for statements and headline figures; every control, label, table and axis is Inter.

**The No Kicker Rule.** Headings carry their own weight. No eyebrow labels above headings.

## Layout

Content sits in a centred container of min(1240px, 100% − 32px), giving a 16px gutter on phones. Sections breathe at 34px vertical padding; card and panel grids use a 16px gap. The tracker uses a 12-column grid with panels spanning 4, 5, 7, 8 or 12 columns; below 1100px every panel spans the full width, and below 760px the page becomes one column, filters fall into a two-up grid and wide tables scroll sideways inside their card.

Charts are laid out at their real pixel width (re-drawn on resize), so chart text stays at its true size on phones. Complex diagrams (layout schema, ecosystem map, Gantt) keep a minimum width and scroll sideways instead of shrinking their labels.

Breakpoints: 1180px (top-bar navigation moves into the page drawer), 1100px (dashboard and hero collapse), 760px (single column).

## Elevation & Depth

A hybrid of tonal layering and one soft elevation. Surfaces step from Page Mist to Sheet to Raised Sheet to Sunk Well; a single small shadow lifts sheets off the page, and a larger lift is reserved for things that float (tooltip, drawer, the hero ladder card). The night band provides depth by value, not by shadow.

### Shadow Vocabulary
- **Sheet** (`0 1px 2px rgba(15,35,30,.05), 0 3px 8px -4px rgba(15,35,30,.12)`): cards, panels, stat tiles, personas.
- **Lift** (`0 2px 6px rgba(15,35,30,.08), 0 22px 44px -22px rgba(15,35,30,.35)`): tooltip, drawer, hero ladder card.

### Named Rules
**The Neutral Shadow Rule.** Shadows are neutral green-black and offset downward. No coloured glows.

## Shapes

Soft, generous corners in a fixed ladder: 12px for nested tiles and inputs, 16px for rows and sub-panels, 20px for sheets and panels, 28px for night bands and the hero card, and full pills for buttons, chips, navigation and segmented controls. Borders are 1px hairlines; a bordered, tinted container is used for selected states (personas, modules) rather than heavier strokes. The only ornament is the khatam star: the brand mark and the faint linework pattern inside night bands.

## Components

### Buttons
- **Shape:** full pill (999px), 12px × 18px padding, Inter 600 at 0.95rem.
- **Primary:** Pilgrimage Gold with near-black text (#1f1703); one per view.
- **Ghost:** transparent with a hairline border; on night bands the border and text switch to band tones.
- **Hover / Focus:** a 1px lift on primary, a sheet fill on ghost, a 0.97 press scale; focus is a 2.5px Paddy Green outline with a 3px offset.

### Chips
- **Style:** pill, Sunk Well background, Soft Ink text, 0.78rem 600.
- **Variants:** gold (policy and proposal status), green (core to the project).

### Cards / Containers
- **Corner Style:** 20px.
- **Background:** Sheet on Page Mist.
- **Shadow Strategy:** Sheet shadow (see Elevation).
- **Border:** 1px light hairline (#e4ebe6).
- **Internal Padding:** 22px (panels 18px).

### Inputs / Fields
- **Style:** 12px corners, hairline border, Sheet background, custom chevron; range sliders have a filled Paddy Green track and a white thumb ringed in green.
- **Segmented controls:** pill track in Sunk Well, the active segment lifts to Sheet with a soft shadow.

### Navigation
- **Top bar:** sticky, translucent mist with a blur; the co-branded lockup on a light plate, product name in Instrument Serif, short pill links (active = Paddy Green fill), language (BM/EN) and theme buttons as 40px circles. Below 1180px links move into a right-hand drawer listing every page with its description.
- **Pager:** every page ends with previous/next sheets; left and right arrow keys move between pages.

### The Istito'ah Ladder (signature)
A night-band card where about 220 depositor dots (150 on phones) settle along a ringgit axis, crossing gold lines at TH's four amounts; state chips re-flow the dots. Dots are coloured by balance band, with gold for those past the full Kos Haji.

### Lottie marks
Small bodymovin animations (khatam star, live pulse, coin into a Tabung, check) recolour from theme tokens through layer classes and freeze on their last frame under reduced motion.

## Do's and Don'ts

### Do:
- **Do** measure readiness against TH's published amounts and label every synthetic figure as synthetic where it appears.
- **Do** write every visible string as an English and Bahasa Melayu pair.
- **Do** validate any new chart palette with the dataviz validator before use, and give every chart a hover layer and a table view.
- **Do** keep the co-branded lockup on its light plate in both themes.
- **Do** scope text styles with child selectors (for example `.pager a>span`) so they never reach the language spans inside titles.

### Don't:
- **Don't** use blue, gradient text or coloured shadows.
- **Don't** put eyebrow labels above headings.
- **Don't** let colour carry status alone.
- **Don't** shrink chart text to fit a phone; lay the chart out at its real width or let it scroll.
