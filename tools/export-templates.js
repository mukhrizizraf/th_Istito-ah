/* Prints TH.TEMPLATES from assets/js/th-data.js as JSON, so the Excel files
   are built from the same definitions the pages render.
   Used by build_templates.py; run from the repository root. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const ctx = {console};
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'th-data.js'), 'utf8'), ctx);
const TH = ctx.TH, out = {};
for (const id of Object.keys(TH.TEMPLATES)) {
  const T = TH.TEMPLATES[id];
  out[id] = {
    file: T.file, intro: T.intro, privacy: T.privacy || null,
    sheets: T.sheets.map((s) => ({
      name: s.name,
      cols: s.cols.map((c) => ({k: c.k, type: c.type, d: c.d, opts: c.opts || null, f: c.f || null, f0: c.f0 || null})),
      rows: s.rows.map((r) => {
        const row = {};
        s.cols.forEach((c) => { row[c.k] = typeof c.calc === 'function' ? c.calc(r) : r[c.k]; });
        if (r._f) row._f = r._f;
        return row;
      })
    })),
    steps: T.steps.map((st) => ({sheet: st.sheet || 0, cols: st.cols, t: st.t, rule: st.rule, feeds: st.feeds, proposed: !!st.proposed}))
  };
}
process.stdout.write(JSON.stringify(out));
