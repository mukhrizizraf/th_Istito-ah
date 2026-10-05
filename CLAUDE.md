# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A bilingual (English / Bahasa Melayu) interactive grant proposal from SEFB, Universiti Utara Malaysia, to Lembaga Tabung Haji (TH): the site *is* the proposal, and its tracker runs as a working proof-of-concept on synthetic data. Static HTML/CSS/JS with no framework, no package manager and no build step for the site itself. Published by GitHub Pages from `main` (<https://mukhrizizraf.github.io/th_Istito-ah/>); `_config.yml` excludes the `.md` notes and `tools/` from the published site. Sister site of the owner's Kedah Silver Economy dashboard: same shell, pager and light/dark behaviour.

`PRODUCT.md` (audience, constraints, decisions with dates) and `DESIGN.md` (tokens, typography, named design rules) are the design source of truth; read them before visual or content changes.

## Commands

- Serve locally: `python -m http.server 8000` (pages also open from `file://`).
- **Rebuild the Excel data templates after changing a template:** `python tools/build_templates.py` (needs Node and `openpyxl`). It runs `tools/export-templates.js`, which loads `assets/js/th-data.js` in a Node `vm` and dumps `TH.TEMPLATES` as JSON, then writes `assets/templates/*.xlsx` (a bilingual Guide sheet, styled headers, live formulas, drop-down validation). Never edit the `.xlsx` files by hand.
- There are no tests or linters. To check the scripts parse: `node -e "const fs=require('fs');for(const f of ['th-pages','th-shell','th-data'])new Function(fs.readFileSync('assets/js/'+f+'.js','utf8'))"`. To catch runtime errors, load each page in headless Chrome with `--enable-logging=stderr --dump-dom` against the local server and grep stderr for `CONSOLE`/`Uncaught`.

## Architecture

Everything hangs off one global, `window.TH`, built by three scripts that every page loads in a fixed order:

1. **`<head>` inline script** (copied into every HTML file): applies the saved theme, language and colour palette (`th-theme`, `th-lang`, `th-palette` in localStorage) before first paint, and sets the view-transition direction from a hard-coded page-order array `P=[…]`. Adding or removing a page means updating that array in **every** HTML file.
2. **`assets/js/th-data.js`** (in `<head>`): all content and data, no DOM. It holds:
   - `TH.PAGES` / `TH.EXTRA_PAGES`: the site map. `PAGES` drive the top bar, drawer, pager, footer and page numbering. `EXTRA_PAGES` (the technical blueprint) stay out of the top bar and pager numbering.
   - `TH.POLICY` and `TH.SRC`: TH's published figures and their sources.
   - The seeded synthetic model: `TH.agg(filters, quarter, costK)` aggregates log-normal balance cells by state × age group × channel × quarter. Every tracker figure comes from it.
   - `TH.MODULES`, `TH.EVENTS` (programmes and telemetry), `TH.TEMPLATES` (data templates), `TH.TOPICS` (grant topics), `TH.PALETTES`, and `TH.INFO` (the copy for every "i" button).
3. **`assets/js/th-shell.js`**: must be the first child of `<body data-page="id">`. It injects the top bar and drawer immediately (no layout jump). On `DOMContentLoaded` it:
   - adds the pager, footer, tooltip, info popover and theme/palette controls;
   - expands `[data-info]` into "i" buttons and `[data-picon]` into page icons;
   - runs `TH.pageInit[page]`, then `TH.templateInit`, then the Lottie init.
4. **`assets/js/th-pages.js`** (end of `<body>`): one `TH.pageInit.<id>` per page.
   - Charts are hand-drawn SVG strings laid out at the container's real pixel width (`widthOf`) and redrawn on resize. Do not scale charts down to fit a phone.
   - `TH.templateInit` renders every `[data-template="id"]` section from `TH.TEMPLATES`: the sheet preview, steps that highlight rows and columns, and the column guide.

**Language and theme re-rendering:** static copy is written as sibling `<span lang="en">…</span><span lang="ms">…</span>` pairs, and CSS hides the inactive one. Anything rendered from JS uses `{en, ms}` objects through `TH.t()` (both spans) or `TH.L()` (current language only). JS-drawn content must register a redraw in `TH.onLang` (and `TH.onTheme` if it reads colours or `TH.isDark()`).

**Data templates are single-source:** each entry in `TH.TEMPLATES` defines:

- sheets, columns and sample rows;
- worked-out columns: `calc` for the page, `f` (an Excel formula template using `{r}` = this row, `{p}` = previous row) for the `.xlsx`;
- steps: `match` picks the highlighted rows, `res` gives the result, `cols` names the highlighted columns.

The page preview and the Excel file both come from this, so change the definition, then rebuild.

**CSS** (`assets/css/th.css`): tokens on `:root`, dark mode under `@media (prefers-color-scheme:dark)` guarded by `:not([data-theme="light"])` and again under `[data-theme="dark"]`. Colour themes are `[data-palette="…"]` overrides with their own light and dark variants. Chart ramps (`--b*`, `--h*`, `--s-a/--s-b`) were validated for colour-vision deficiency and are shared by all palettes.

## Rules that are easy to break

- **No blue anywhere, in any theme or chart** (owner's standing rule). Use green, gold and neutrals.
- Every visible string is an EN/BM pair.
- Depositor figures are synthetic and must be labelled so where they appear. TH figures come only from `TH.POLICY` with a source in `TH.SRC`. Future costs and profit rates are scenarios, never forecasts.
- Gold marks only a policy amount, a deadline or the single primary action. Status colours always come with an icon and a word.
- Highlight vocabulary, the same meaning on every page:
  - `.term`: TH and Hajj terms;
  - `.kw`: key figures;
  - `.issue`: problems;
  - `.ask` / `.ask-inline`: open questions for colleagues;
  - `.tag-problem` / `.tag-built` / `.tag-new`: status labels.
- Instrument Serif is for statements and headline figures; all controls, labels, tables and axes use Inter.
- SVG elements with `tabindex` should take focus only on keyboard activation (mouse clicks must not call `.focus()`), so no square focus box appears on click.
- Do not put team members' names on the site; roles show "To be confirmed (SEFB)".
- Adding a page: add it to `TH.PAGES` or `TH.EXTRA_PAGES`, add it to the `P=[…]` array in every HTML head, add a `PICON` entry in `th-shell.js`, and add a `TH.pageInit[id]` if it has logic.
- When work is done: commit and push to `main` (Pages deploys from it).
