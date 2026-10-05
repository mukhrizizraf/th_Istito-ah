# Istito'ah Readiness & Literacy Tracker — proposal dashboard

An interactive research-and-development proposal from the **School of Economics, Finance and Banking (SEFB), Universiti Utara Malaysia** to **Lembaga Tabung Haji (TH)**. The site *is* the proposal: each section of the written proposal has a page you can use, and the core deliverable (a depositor readiness and literacy tracker) runs as a working proof-of-concept.

Sister site of the [Kedah Silver Economy dashboard](https://mukhrizizraf.github.io/kedah-silver-economy_claude-version/index.html).

> **Not an official Lembaga Tabung Haji product.** Dashboard figures are synthetic. Only the policy amounts (Kos Haji RM33,300; Bayaran Haji RM15,000 / RM23,500 / RM33,300; the RM15,000 queue gate; the 31 December 2028 deadline; 31,600 places; 9.7 million depositors) are TH's own, cited on the Cost & policy and Sources pages.

## Pages

| Page | What it does |
| --- | --- |
| `index.html` | Overview: the live *istito'ah ladder*, TH's three problems (each with what the prototype does and an open question), executive summary, team, and a link to the technical blueprint |
| `cost.html` | TH's official 1448H/2027M Hajj cost and payment rules, read critically; an illustrative early-payment calculator (problem 2) |
| `tracker.html` | The PoC dashboard: filters, Kos Haji scenario, gauges, tile map, trend, matrix, 2028 watchlist |
| `depositor.html` | One-depositor simulator: payment category, any number of deadlines (TH's 31 Dec 2028 rule is added for registered depositors; "Use this amount" applies the saving a missed one needs), literacy plan |
| `plan.html` | Methodology by development phase, the threshold ladder, timeline, risks |
| `literacy.html` | Literacy programmes in plain language: four steps, five programmes, the funnel |
| `blueprint.html` | Technical appendix, not in the top bar (linked from the bottom of the overview, the menu and the footer): layout schema, data architecture, backend schema, programme telemetry trace, ecosystem map, governance |
| `notes.html` | Sources, what is official vs synthetic, questions for TH, glossary |

Pages that use data (tracker, depositor, plan, cost, programmes) end with **The data behind this page**: a preview of the Excel template that feeds it, sample rows, a column guide, and clickable steps that light up the rows and columns each figure uses. The `.xlsx` files are in `assets/templates/`.

Highlights follow one vocabulary on every page: `.term` (serif italic) for TH and Hajj terms, `.kw` (gold marker) for key figures, `.issue` (red wavy underline) for problems, `.ask` / `.ask-inline` (gold, with a ?) for open questions for colleagues, and `.tag` labels for problem / in the prototype / proposed.

Every page is bilingual (English / Bahasa Melayu toggle), has light and dark themes, and supports ← → keys to move between pages. The "i" buttons explain each panel; switch on **Presenter notes** in the footer to add pitch tips to them (or open any page with `?present`).

## Run it

No build step. Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

## Deploy (GitHub Pages)

Settings → Pages → *Deploy from a branch* → `main` / root. `_config.yml` keeps the internal design notes (`PRODUCT.md`, `DESIGN.md`) out of the published site.

## Structure

```
assets/css/th.css        design tokens (light/dark), components, pages, print
assets/js/th-data.js     page map, TH policy figures + sources, synthetic model, copy for info notes
assets/js/th-shell.js    top bar, co-branded lockup, language/theme, drawer, pager, tooltips, info notes
assets/js/th-pages.js    page logic and hand-drawn SVG charts
assets/js/th-lottie.js   Lottie animations (bodymovin JSON kept inline so the site runs from file://)
assets/vendor/           lottie-web light player (5.12.2, MIT, from cdnjs)
assets/img/              SEFB and TH logos (sourced from sefb.uum.edu.my and tabunghaji.gov.my)
assets/templates/        Excel data templates (built, do not edit by hand)
tools/                   build_templates.py + export-templates.js: rebuild the templates
```

### Rebuilding the Excel templates

The templates are defined once, in `TH.TEMPLATES` in `th-data.js`; the pages render them and the `.xlsx` files are built from them. After changing a template, run `python tools/build_templates.py` (needs Node and `openpyxl`).

### Adding a LottieFiles animation

Download the animation's Lottie JSON from [lottiefiles.com](https://lottiefiles.com) into `assets/lottie/`, then either add `data-lottie="assets/lottie/name.json"` to an element or call `TH.lottie(element, 'assets/lottie/name.json')`. Loading a `.json` file needs the site to be served over http(s) (GitHub Pages is fine); the built-in animations also work from `file://`.

## Data honesty

- `TH.POLICY` and `TH.SRC` in `th-data.js` hold TH's published figures and their sources (read 4 October 2026).
- Everything else the tracker draws comes from a seeded synthetic model and is labelled as synthetic where it appears.
- The fictional depositors, example targets and programme funnel are illustrative.

Every page ends with a Kedah-style footer (brand, page links, about, disclaimer). The live site is https://mukhrizizraf.github.io/th_Istito-ah/.

Prepared by SEFB, UUM.
