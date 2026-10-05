# Istito'ah Tracker: notes for Claude

Bilingual (EN/BM) proposal dashboard from SEFB, UUM to Lembaga Tabung Haji. Static HTML/CSS/JS, no build step, published on GitHub Pages from `main` (https://mukhrizizraf.github.io/th_Istito-ah/). See `README.md` for the page list and `DESIGN.md` / `PRODUCT.md` for design and product notes.

## Commands

- Serve locally: `python -m http.server 8000`
- **Rebuild the Excel data templates after changing a template:** `python tools/build_templates.py` (needs Node and `openpyxl`). It reads `TH.TEMPLATES` from `assets/js/th-data.js` through `tools/export-templates.js` and writes `assets/templates/*.xlsx`. Never edit the `.xlsx` files by hand.
- Check the scripts parse: `node -e "const fs=require('fs');for(const f of ['th-pages','th-shell','th-data'])new Function(fs.readFileSync('assets/js/'+f+'.js','utf8'))"`

## Conventions

- Every visible string is bilingual: sibling `<span lang="en">…</span><span lang="ms">…</span>` in HTML, `{en, ms}` objects in JS rendered with `TH.t()` / `TH.L()`.
- No blue anywhere, in any theme. Colours come from tokens in `th.css`; colour themes are `[data-palette]` overrides (light and dark) listed in `TH.PALETTES`.
- Highlight vocabulary, same meaning on every page: `.term` TH/Hajj terms, `.kw` key figures, `.issue` problems, `.ask` / `.ask-inline` open questions for colleagues, `.tag-problem` / `.tag-built` / `.tag-new` labels.
- Depositor figures are synthetic and must stay labelled so; TH policy figures live in `TH.POLICY` with sources in `TH.SRC`.
- Pages that use data end with `<section … data-template="id">`; the template (sheets, sample rows, steps) is defined once in `TH.TEMPLATES`.
- Adding a page: add it to `TH.PAGES` (top bar, pager, footer) or `TH.EXTRA_PAGES` (kept out of the top bar, like the blueprint), add its id to the `P=[…]` page-order array in the inline `<head>` script of every HTML file, give it a `PICON` in `th-shell.js`, and a `TH.pageInit[id]` in `th-pages.js` if it has logic.
- Do not put team members' names on the site; roles show "To be confirmed (SEFB)".
- When work is done: commit and push to `main`.
