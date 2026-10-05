/* ==========================================================================
   Istito'ah Tracker: page logic
   One init per body[data-page]. Charts are hand-drawn SVG (no library):
   thin marks, one y-axis, colour by role tokens from th.css, hover tooltips,
   a table view next to every chart. Depositor figures are SYNTHETIC
   (th-data.js); TH.POLICY figures are TH's own.
   ========================================================================== */
(function (TH) {
'use strict';
const $ = TH.$, $$ = TH.$$, L = TH.L, t = TH.t, esc = TH.esc, P = TH.POLICY;
const HEAT = ['--h0', '--h1', '--h2', '--h3', '--h4', '--h5', '--h6'];
const BAND = ['--b1', '--b2', '--b3', '--b4', '--b5'];
const v = (name) => `var(${name})`;
const dark = () => TH.isDark();
const heatInk = (i) => i >= 4 ? (dark() ? '#0b1f18' : '#ffffff') : 'var(--ink)';
const bandInk = (i) => dark() ? (i >= 2 ? '#0b1f18' : 'var(--ink)') : (i >= 2 ? '#ffffff' : 'var(--ink)');
const pp = (x) => (x >= 0 ? '+' : '−') + Math.abs(x * 100).toFixed(1) + TH.T(' pts', ' mata');
const name = (list, id) => { const o = list.find((x) => x.id === id); return o ? L(o.name) : ''; };
const monthsTo = (y, m) => (P.deadline.y * 12 + P.deadline.m) - (y * 12 + m);
function bins(values) {
  const lo = Math.min.apply(null, values), hi = Math.max.apply(null, values);
  return {lo, hi, idx: (x) => hi - lo < 1e-9 ? 3 : Math.min(6, Math.floor((x - lo) / (hi - lo) * 7))};
}
function rangeFill(inp) { const p = (inp.value - inp.min) / (inp.max - inp.min) * 100; inp.style.setProperty('--p', p + '%'); }
function onRedraw(fn) { TH.onLang.push(fn); TH.onTheme.push(fn); }
/* Charts are laid out at their real pixel width, so text stays legible on phones. */
const widthOf = (el, min) => Math.max(min || 300, Math.round(el.getBoundingClientRect().width));
function onResize(fn) {
  let w = innerWidth, tmr;
  addEventListener('resize', () => { clearTimeout(tmr); tmr = setTimeout(() => { if (Math.abs(innerWidth - w) > 16) { w = innerWidth; fn(); } }, 180); });
}
function tipRow(color, label, value) { return `<div class="row"><span><i style="background:${color}"></i> ${esc(label)}</span><b>${esc(value)}</b></div>`; }
function svgPoint(svgEl, e) { const pt = svgEl.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; return pt.matrixTransform(svgEl.getScreenCTM().inverse()); }
const statusLabel = (k) => ({good:TH.T('On track', 'Menepati sasaran'), warn:TH.T('Close', 'Hampir'), crit:TH.T('Below target', 'Bawah sasaran')})[k];

/* ======================================================================
   Overview: the Istito'ah ladder (signature moment)
   ====================================================================== */
TH.pageInit.overview = function () {
  const host = $('#ladder'); if (!host) return;
  const DOT = ['rgba(238,245,241,.34)', '#3f9f78', '#6cc39b', '#a7e3c6', 'var(--band-gold)'];
  const VMAX = 42000;
  let cur = 'all', first = true, dots = [], geo = null;

  function build() {
    const W = Math.min(560, widthOf(host, 300)), compact = W < 460, N = compact ? 150 : 220;
    const X0 = compact ? 16 : 28, X1 = W - (compact ? 16 : 28), H = 300;
    geo = {W, compact, N, X0, X1, sx: (x) => X0 + (Math.min(x, VMAX) / VMAX) * (X1 - X0)};
    let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="ladderTitle ladderDesc"><title id="ladderTitle"></title><desc id="ladderDesc"></desc>`;
    svg += `<line x1="${X0}" x2="${X1}" y1="250" y2="250" stroke="rgba(238,245,241,.22)"/>`;
    TH.GATES.forEach((g) => {
      const x = geo.sx(g.rm), strong = g.id === 'g15' || g.id === 'g100';
      svg += `<g class="gate"><line x1="${x}" x2="${x}" y1="58" y2="250" stroke="var(--band-gold)" stroke-width="${strong ? 2 : 1.3}" stroke-dasharray="${strong ? '0' : '3 5'}"/>` +
        `<text x="${x}" y="30" text-anchor="middle" fill="var(--band-gold)" style="font:600 ${compact ? 11.5 : 12.5}px var(--sans)">RM${(g.rm / 1000).toFixed(g.rm % 1000 ? 1 : 0)}k</text>` +
        `<text class="gate-share" data-k="${g.id}" x="${x}" y="46" text-anchor="middle" fill="var(--band-muted)" style="font:500 10.5px var(--sans)"></text></g>`;
    });
    svg += '<g class="dots">';
    for (let i = 0; i < N; i++) svg += `<circle r="${compact ? 3.6 : 4}" cx="0" cy="0" style="transform:translate(${X0}px,150px)"/>`;
    svg += `</g><text x="${X0}" y="272" fill="var(--band-muted)" style="font:500 11px var(--sans)">RM0</text>` +
      `<text class="ax-r" x="${X1}" y="272" text-anchor="end" fill="var(--band-muted)" style="font:500 11px var(--sans)"></text></svg>`;
    host.innerHTML = svg;
    dots = $$('.dots circle', host);
    first = true;
  }
  function draw(stateId) {
    cur = stateId;
    const s = TH.sampleLadder(stateId, geo.N);
    dots.forEach((c, i) => {
      const d = s.dots[i], y = 66 + d.j * 176;
      c.style.fill = DOT[d.b];
      c.style.transitionDelay = (first ? 120 + i * 4 : (i % 40) * 6) + 'ms';
      c.style.transform = `translate(${geo.sx(d.v).toFixed(1)}px,${y.toFixed(1)}px)`;
    });
    first = false;
    labels(s.agg);
  }
  function labels(a) {
    a = a || TH.agg({state:cur}, TH.lastQ);
    $$('.gate-share', host).forEach((el) => { el.textContent = TH.pct(a[el.getAttribute('data-k')]); });
    $('.ax-r', host).textContent = TH.T('balance in TH →', 'baki dalam TH →');
    const where = cur === 'all' ? 'Malaysia' : name(TH.STATES, cur);
    $('#ladderTitle', host).textContent = TH.T('Istito\'ah ladder: ', 'Tangga istito\'ah: ') + where;
    $('#ladderDesc', host).textContent = TH.T(`Synthetic. ${TH.pct(a.g15)} of depositors hold RM15,000 or more and ${TH.pct(a.g100)} hold the full RM33,300.`,
      `Sintetik. ${TH.pct(a.g15)} pendeposit memiliki RM15,000 atau lebih dan ${TH.pct(a.g100)} memiliki RM33,300 penuh.`);
    const per = Math.round(a.n / geo.N / 1000) * 1000;
    $('#ladderNote').innerHTML = t({en:`Synthetic data. Each dot stands for about ${TH.nf(per)} depositors. Gold lines are TH's own amounts for ${P.season}; the figure under each is the share of depositors past it.`, ms:`Data sintetik. Setiap titik mewakili kira-kira ${TH.nf(per)} pendeposit. Garis emas ialah amaun TH sendiri bagi ${P.season}; angka di bawahnya ialah peratus pendeposit yang melepasinya.`});
    $('#ladderShares').innerHTML = TH.GATES.map((g) =>
      `<li><b>${TH.pct(a[g.id])}</b><span>${t(g.name)}</span></li>`).join('');
  }
  $$('#ladderStates button').forEach((b) => b.addEventListener('click', () => {
    $$('#ladderStates button').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    draw(b.getAttribute('data-state'));
  }));
  build();
  requestAnimationFrame(() => requestAnimationFrame(() => draw('all')));
  TH.onLang.push(() => labels());
  onResize(() => { const w = Math.min(560, widthOf(host, 300)); if (w !== geo.W) { build(); requestAnimationFrame(() => requestAnimationFrame(() => draw(cur))); } });
};

/* ======================================================================
   Cost & policy: who pays the RM33,300, and the ladder vs the brief
   ====================================================================== */
TH.pageInit.cost = function () {
  function drawSplit() {
    const rows = TH.CATS.map((c) => ({c, pays:P.pay[c.id], aid:P.aid[c.id].hafis + P.aid[c.id].gov, hafis:P.aid[c.id].hafis, gov:P.aid[c.id].gov}));
    const box = $('#split'), W = widthOf(box, 300), compact = W < 540;
    const l = compact ? 0 : 132, r = 4, rowH = 34, lab = compact ? 20 : 0, gap = compact ? 14 : 16, iw = W - l - r, H = rows.length * (rowH + gap + lab) + 20;
    const x = (rm) => l + rm / P.kosHaji * iw;
    let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(TH.T('How the RM33,300 Kos Haji is split between the pilgrim and assistance, by category', 'Pembahagian Kos Haji RM33,300 antara jemaah dan bantuan, mengikut kategori'))}">`;
    rows.forEach((rw, i) => {
      const y0 = i * (rowH + gap + lab) + lab;
      svg += compact ? `<text x="0" y="${y0 - 6}" style="font:600 12.5px var(--sans);fill:var(--ink)">${esc(L(rw.c.name))}</text>` : `<text x="0" y="${y0 + rowH / 2 + 4}" style="font:600 12.5px var(--sans);fill:var(--ink)">${esc(L(rw.c.name))}</text>`;
      svg += `<g class="split" data-i="${i}"><rect x="${l}" y="${y0}" width="${x(rw.pays) - l - (rw.aid ? 2 : 0)}" height="${rowH}" rx="4" style="fill:var(--s-a)"/>` +
        `<text x="${l + 10}" y="${y0 + rowH / 2 + 4}" style="font:600 12px var(--sans);fill:#fff">${TH.rm(rw.pays)}</text>`;
      if (rw.aid) {
        const aw = l + iw - x(rw.pays), txt = aw > 150 ? TH.rm(rw.aid) + TH.T(' assistance', ' bantuan') : TH.rm(rw.aid);
        svg += `<rect x="${x(rw.pays)}" y="${y0}" width="${aw}" height="${rowH}" rx="4" style="fill:var(--s-b)"/>` +
          `<text x="${l + iw - 10}" y="${y0 + rowH / 2 + 4}" text-anchor="end" style="font:600 12px var(--sans);fill:#1f1703">${esc(txt)}</text>`;
      }
      svg += '</g>';
    });
    svg += `<text x="${l + iw}" y="${H - 4}" text-anchor="end" style="font:500 11px var(--sans);fill:var(--muted)">${esc('Kos Haji ' + TH.rm(P.kosHaji) + ' · ' + P.season)}</text></svg>`;
    box.innerHTML = `<div class="legend"><span><i style="background:var(--s-a)"></i>${t({en:'Pilgrim pays (Bayaran Haji)', ms:'Dibayar jemaah (Bayaran Haji)'})}</span><span><i style="background:var(--s-b)"></i>${t({en:'Assistance: HAFIS from TH, plus RM1,000 from the Government for B40', ms:'Bantuan: HAFIS daripada TH, serta RM1,000 daripada Kerajaan bagi B40'})}</span></div>` + svg;
    $$('#split .split').forEach((g) => {
      g.addEventListener('mousemove', (e) => {
        const rw = rows[+g.dataset.i];
        TH.tip.show(`<b>${esc(L(rw.c.name))}</b><div class="m">${esc(L(rw.c.rule))}</div>` + tipRow('var(--s-a)', TH.T('Pilgrim pays', 'Jemaah bayar'), TH.rm(rw.pays) + ' · ' + TH.pct(rw.pays / P.kosHaji)) +
          (rw.hafis ? tipRow('var(--s-b)', 'HAFIS (TH)', TH.rm(rw.hafis)) : '') + (rw.gov ? tipRow('var(--s-b)', TH.T('Government', 'Kerajaan'), TH.rm(rw.gov)) : ''), e.clientX, e.clientY);
      });
      g.addEventListener('mouseleave', TH.tip.hide);
    });
  }
  function drawRuler() {
    const box = $('#ruler'), W = widthOf(box, 300), narrow = W < 560;
    const brief = [{rm:8325, p:25}, {rm:16650, p:50}, {rm:33300, p:100}];
    const pol = [{rm:15000, en:'RM15,000 gate · B40 payment', ms:'Ambang RM15,000 · bayaran B40'}, {rm:23500, en:'M40 payment', ms:'Bayaran M40'}, {rm:33300, en:'Full Kos Haji · T20', ms:'Kos Haji penuh · T20'}];
    const aria = esc(TH.T('The brief\'s 25, 50 and 100% milestones against TH\'s own amounts', 'Pencapaian 25, 50 dan 100% dalam taklimat berbanding amaun TH sendiri'));
    const briefSub = esc(TH.T('brief\'s milestone', 'pencapaian taklimat'));
    let svg;
    if (narrow) {
      const H = 430, top = 24, ih = H - top - 30, cx = Math.round(W / 2), y = (rm) => top + rm / P.kosHaji * ih;
      svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${aria}">`;
      svg += `<rect x="${cx - 5}" y="${top}" width="10" height="${ih}" rx="5" style="fill:var(--sunk)"/>`;
      svg += `<rect x="${cx - 5}" y="${y(15000)}" width="10" height="${y(16650) - y(15000)}" style="fill:var(--crit);opacity:.75"/>`;
      svg += `<text x="${cx}" y="${top - 8}" text-anchor="middle" style="font:500 11px var(--sans);fill:var(--muted)">RM0</text>`;
      pol.forEach((p) => {
        const yy = y(p.rm);
        svg += `<line x1="${cx}" x2="${cx + 22}" y1="${yy}" y2="${yy}" style="stroke:var(--gold-ink)" stroke-width="2"/>` +
          `<text x="${cx + 28}" y="${yy + 4}" style="font:700 13px var(--sans);fill:var(--gold-ink)">${TH.rm(p.rm)}</text>` +
          `<text x="${cx + 28}" y="${yy + 19}" style="font:500 11px var(--sans);fill:var(--muted)">${esc(L(p))}</text>`;
      });
      brief.forEach((b) => {
        const yy = y(b.rm);
        svg += `<line x1="${cx - 22}" x2="${cx}" y1="${yy}" y2="${yy}" style="stroke:var(--ink-2)" stroke-width="1.5" stroke-dasharray="3 3"/>` +
          `<text x="${cx - 28}" y="${yy + 4}" text-anchor="end" style="font:700 13px var(--sans);fill:var(--ink)">${b.p}% · ${TH.rm(b.rm)}</text>` +
          `<text x="${cx - 28}" y="${yy + 19}" text-anchor="end" style="font:500 11px var(--sans);fill:var(--muted)">${briefSub}</text>`;
      });
    } else {
      const l = 16, r = 16, iw = W - l - r, y = 96, H = 170, x = (rm) => l + rm / P.kosHaji * iw;
      svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${aria}">`;
      svg += `<rect x="${l}" y="${y - 5}" width="${iw}" height="10" rx="5" style="fill:var(--sunk)"/>`;
      svg += `<rect x="${x(15000)}" y="${y - 5}" width="${x(16650) - x(15000)}" height="10" style="fill:var(--crit);opacity:.75"/>`;
      pol.forEach((p, k) => {
        const xx = x(p.rm), anchor = k === 1 ? 'middle' : 'end', dx = k === 0 ? -6 : 0;
        svg += `<line x1="${xx}" x2="${xx}" y1="${y - 26}" y2="${y + 5}" style="stroke:var(--gold-ink)" stroke-width="2"/>` +
          `<text x="${xx + dx}" y="${y - 44}" text-anchor="${anchor}" style="font:700 13px var(--sans);fill:var(--gold-ink)">${TH.rm(p.rm)}</text>` +
          `<text x="${xx + dx}" y="${y - 30}" text-anchor="${anchor}" style="font:500 11px var(--sans);fill:var(--muted)">${esc(L(p))}</text>`;
      });
      brief.forEach((b, k) => {
        const xx = x(b.rm), anchor = k === 2 ? 'end' : k === 1 ? 'start' : 'middle', dx = k === 1 ? 6 : 0;
        svg += `<line x1="${xx}" x2="${xx}" y1="${y - 5}" y2="${y + 26}" style="stroke:var(--ink-2)" stroke-width="1.5" stroke-dasharray="3 3"/>` +
          `<text x="${xx + dx}" y="${y + 42}" text-anchor="${anchor}" style="font:700 13px var(--sans);fill:var(--ink)">${b.p}% · ${TH.rm(b.rm)}</text>` +
          `<text x="${xx + dx}" y="${y + 56}" text-anchor="${anchor}" style="font:500 11px var(--sans);fill:var(--muted)">${briefSub}</text>`;
      });
    }
    box.innerHTML = svg + '</svg>';
  }
  const all = () => { drawSplit(); drawRuler(); };
  all(); onRedraw(all); onResize(all);

  /* Problem 2: what TH pays early against what the next pilgrims have saved (illustrative) */
  const MIX = {B40:.45, M40:.45, T20:.10}, OWNAVG = Object.keys(MIX).reduce((s, k) => s + MIX[k] * P.pay[k], 0);
  const eAdv = $('#e-adv'), eSaved = $('#e-saved');
  const mil = (n) => TH.T('RM' + (n / 1e6).toFixed(0) + ' million', 'RM' + (n / 1e6).toFixed(0) + ' juta');
  function early() {
    rangeFill(eAdv); rangeFill(eSaved);
    const adv = +eAdv.value / 100, saved = +eSaved.value / 100;
    $('#o-adv').textContent = eAdv.value + '%'; $('#o-saved').textContent = eSaved.value + '%';
    $('#e-own').textContent = TH.rm(OWNAVG); $('#e-own2').textContent = TH.rm(OWNAVG);
    const bill = P.quota * P.kosHaji * adv, held = P.quota * OWNAVG * saved, cover = Math.min(bill, held), gap = bill - cover;
    $('#earlyNums').innerHTML =
      `<li><span class="label">${t({en:'TH pays early', ms:'TH bayar awal'})}</span><b>${esc(mil(bill))}</b></li>` +
      `<li><span class="label">${t({en:'Pilgrims\' savings could cover', ms:'Simpanan jemaah boleh tampung'})}</span><b class="ok">${esc(mil(cover))}</b></li>` +
      `<li><span class="label">${t({en:'Gap TH carries', ms:'Jurang ditanggung TH'})}</span><b class="${gap > 0 ? 'bad' : 'ok'}">${esc(mil(gap))}</b></li>`;
    const W = widthOf($('#earlyBar'), 280), H = 46, x = (n) => n / bill * (W - 2);
    $('#earlyBar').innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(TH.T('Early payments split between pilgrims\' savings and the gap TH carries', 'Bayaran awal dibahagi antara simpanan jemaah dan jurang yang ditanggung TH'))}">` +
      `<rect x="1" y="8" width="${Math.max(0, x(cover) - (gap > 0 ? 2 : 0))}" height="30" rx="6" style="fill:var(--s-a)"/>` +
      (gap > 0 ? `<rect x="${1 + x(cover)}" y="8" width="${x(gap)}" height="30" rx="6" style="fill:var(--crit);opacity:.85"/>` : '') + '</svg>' +
      `<div class="legend"><span><i style="background:var(--s-a)"></i>${t({en:'Covered by pilgrims\' own savings', ms:'Ditampung simpanan jemaah sendiri'})}</span><span><i style="background:var(--crit)"></i>${t({en:'Gap TH funds itself', ms:'Jurang dibiayai TH sendiri'})}</span></div>`;
    const need = bill / (P.quota * OWNAVG);
    $('#earlyClose').innerHTML = need <= 1
      ? t({en:`The gap closes if the next pilgrims hold <b>${Math.ceil(need * 100)}%</b> of their own payment three years before their season.`, ms:`Jurang tertutup jika bakal jemaah memiliki <b>${Math.ceil(need * 100)}%</b> daripada bayaran sendiri tiga tahun sebelum musim mereka.`}).replace(/&lt;b&gt;/g, '<b>').replace(/&lt;\/b&gt;/g, '</b>')
      : t({en:'Even full own payments would not cover this: the rest is assistance (HAFIS) that TH carries anyway.', ms:'Bayaran sendiri penuh pun tidak mencukupi: bakinya ialah bantuan (HAFIS) yang memang ditanggung TH.'});
  }
  [eAdv, eSaved].forEach((el) => el.addEventListener('input', early));
  early(); TH.onLang.push(early); onResize(early);
};

/* ======================================================================
   Tracker: the PoC dashboard
   ====================================================================== */
TH.pageInit.tracker = function () {
  const st = {state:'all', seg:'all', chan:'all', q:TH.lastQ, k:1, metric:'g15', by:'seg', watchAll:false, trendTable:false};

  function fillSelects() {
    const opt = (id, label, sel) => `<option value="${id}"${sel ? ' selected' : ''}>${esc(label)}</option>`;
    const all = (en, ms) => opt('all', TH.T(en, ms), false);
    $('#fState').innerHTML = all('All of Malaysia', 'Seluruh Malaysia') + TH.STATES.slice().sort((a, b) => L(a.name).localeCompare(L(b.name))).map((s) => opt(s.id, L(s.name), st.state === s.id)).join('');
    $('#fSeg').innerHTML = all('All age groups', 'Semua kumpulan umur') + TH.SEGMENTS.map((s) => opt(s.id, L(s.name), st.seg === s.id)).join('');
    $('#fChan').innerHTML = all('All categories', 'Semua kategori') + TH.CHANNELS.map((s) => opt(s.id, L(s.name), st.chan === s.id)).join('');
    $('#fQ').innerHTML = TH.QUARTERS.map((q, i) => opt(i, L(q.label), st.q === i)).join('');
    $('#fK').innerHTML = [1, 1.1, 1.2].map((k) => opt(k, k === 1 ? TH.rm(P.kosHaji) + TH.T(' (official)', ' (rasmi)') : TH.rm(P.kosHaji * k) + ' (+' + Math.round((k - 1) * 100) + '%)', st.k === k)).join('');
    $('#fState').value = st.state; $('#fSeg').value = st.seg; $('#fChan').value = st.chan; $('#fQ').value = st.q; $('#fK').value = st.k;
  }
  ['fState', 'fSeg', 'fChan', 'fQ', 'fK'].forEach((id) => $('#' + id).addEventListener('change', (e) => {
    const k = {fState:'state', fSeg:'seg', fChan:'chan', fQ:'q', fK:'k'}[id];
    st[k] = k === 'q' || k === 'k' ? +e.target.value : e.target.value;
    if (k === 'k') TH.costK = st.k;
    render();
  }));
  $('#fReset').addEventListener('click', () => { st.state = st.seg = st.chan = 'all'; st.q = TH.lastQ; st.k = 1; TH.costK = 1; fillSelects(); render(); });
  $$('#metricSeg button').forEach((b) => b.addEventListener('click', () => { st.metric = b.dataset.m; $$('#metricSeg button').forEach((x) => x.setAttribute('aria-pressed', x === b)); render(); }));
  $$('#bySeg button').forEach((b) => b.addEventListener('click', () => { st.by = b.dataset.by; $$('#bySeg button').forEach((x) => x.setAttribute('aria-pressed', x === b)); drawMatrix(); }));
  $('#trendToggle').addEventListener('click', () => { st.trendTable = !st.trendTable; drawTrend(); });
  $('#watchToggle').addEventListener('click', () => { st.watchAll = !st.watchAll; drawWatch(); });

  const f = () => ({state:st.state, seg:st.seg, chan:st.chan});
  const metricName = () => L(TH.METRICS.find((m) => m.id === st.metric).name);
  const qInfo = () => TH.QUARTERS[st.q];
  const monthsLeft = () => monthsTo(qInfo().y, qInfo().q * 3);
  function scopeLabel() {
    const parts = [st.state === 'all' ? 'Malaysia' : name(TH.STATES, st.state)];
    if (st.seg !== 'all') parts.push(name(TH.SEGMENTS, st.seg));
    if (st.chan !== 'all') parts.push(name(TH.CHANNELS, st.chan));
    return parts.join(' · ');
  }

  function drawStats() {
    const a = TH.agg(f(), st.q), b = st.q >= 4 ? TH.agg(f(), st.q - 4) : null;
    const yr = TH.T('vs a year earlier', 'berbanding setahun lalu');
    const delta = (k, invert) => b ? `<span class="delta"><b class="${(a[k] - b[k] < 0) !== !!invert ? 'down' : ''}">${pp(a[k] - b[k])}</b> ${yr}</span>` : `<span class="delta">${TH.T('no earlier year in range', 'tiada tahun sebelumnya')}</span>`;
    $('#stats').innerHTML =
      `<div class="stat"><p class="label">${t({en:'Depositors in view', ms:'Pendeposit dalam paparan'})}${TH.info('statN')}</p><b>${TH.nf(a.n)}</b><span class="delta">${esc(scopeLabel())}</span></div>` +
      `<div class="stat"><p class="label">${t({en:'At or above RM15,000', ms:'RM15,000 ke atas'})}${TH.info('statG15')}</p><b>${TH.pct(a.g15)}</b>${delta('g15')}</div>` +
      `<div class="stat"><p class="label">${t({en:'Can cover own Bayaran Haji', ms:'Mampu tampung Bayaran Haji sendiri'})}${TH.info('statPay')}</p><b>${TH.pct(a.pay)}</b>${delta('pay')}</div>` +
      `<div class="stat stat-risk"><p class="label">${t({en:'Registered, still below RM15,000', ms:'Berdaftar, masih bawah RM15,000'})}${TH.info('statBelow')}</p><b>${TH.nf(a.belowN)}</b><span class="delta">${esc(TH.pct(a.belowShare) + TH.T(' of registered · ', ' daripada yang berdaftar · ') + monthsLeft() + TH.T(' months to 31 Dec 2028', ' bulan ke 31 Dis 2028'))}</span></div>`;
    $('#scopeNow').textContent = scopeLabel() + ' · ' + L(qInfo().label) + ' · Kos Haji ' + TH.rm(P.kosHaji * st.k) + (st.k !== 1 ? TH.T(' (scenario)', ' (senario)') : '');
  }

  function drawGauges() {
    const a = TH.agg(f(), st.q);
    $('#gauges').innerHTML = TH.GATES.map((g) => {
      const val = a[g.id], tgt = g.target / 100;
      const ang = Math.PI * (1 - tgt), c = Math.cos(ang), s = Math.sin(ang);
      const stt = val >= tgt ? 'good' : val >= tgt - .03 ? 'warn' : 'crit';
      return `<figure class="gauge"><svg viewBox="0 0 200 124" role="img" aria-label="${esc(TH.rm(TH.gateRM(g)) + ': ' + TH.pct(val) + ', ' + TH.T('example target ', 'contoh sasaran ') + g.target + '%')}">` +
        `<path class="g-bg" d="M20 104 A80 80 0 0 1 180 104" stroke-width="16" pathLength="100"/>` +
        `<path class="g-fg" d="M20 104 A80 80 0 0 1 180 104" stroke-width="16" pathLength="100" style="stroke:var(--brand);stroke-dasharray:100;stroke-dashoffset:${(100 - val * 100).toFixed(1)}"/>` +
        `<line class="g-target" x1="${100 + 64 * c}" y1="${104 - 64 * s}" x2="${100 + 96 * c}" y2="${104 - 96 * s}"/>` +
        `<text class="g-val" x="100" y="98" text-anchor="middle">${TH.pct(val)}</text></svg>` +
        `<figcaption><h4>${TH.rm(TH.gateRM(g))}</h4><p>${t(g.name)}</p><p class="g-tgt">${esc(TH.T('Example target ', 'Contoh sasaran ') + g.target + '%')}</p><span class="status ${stt}">${TH.statusIcon(stt)}${esc(statusLabel(stt))}</span></figcaption></figure>`;
    }).join('');
  }

  function drawMap() {
    const vals = TH.STATES.map((s) => TH.agg({state:s.id, seg:st.seg, chan:st.chan}, st.q)[st.metric]);
    const b = bins(vals), S = 58, G = 6, Pp = S + G, narrow = widthOf($('#map'), 280) < 480;
    const cx = (s) => (narrow && s.x >= 5 ? s.x - 1 : s.x) * Pp, cols = narrow ? 6 : 7;
    let svg = `<svg viewBox="-4 -4 ${cols * Pp + 4} ${6 * Pp + 4}" role="group" aria-label="${esc(TH.T('States, coloured by ', 'Negeri, diwarnakan mengikut ') + metricName())}">`;
    svg += `<text x="${(narrow ? 4 : 5) * Pp}" y="${1 * Pp + 30}" style="font:600 11px var(--sans);fill:var(--muted);letter-spacing:.06em">${esc(TH.T('EAST MALAYSIA', 'MALAYSIA TIMUR'))}</text>`;
    TH.STATES.forEach((s, i) => {
      const k = b.idx(vals[i]), sel = st.state === s.id;
      svg += `<g class="tile${sel ? ' sel' : ''}" tabindex="0" role="button" aria-pressed="${sel}" data-id="${s.id}" aria-label="${esc(L(s.name) + ': ' + TH.pct(vals[i]))}">` +
        `<rect x="${cx(s)}" y="${s.y * Pp}" width="${S}" height="${S}" rx="10" style="fill:${v(HEAT[k])}"/>` +
        `<text x="${cx(s) + S / 2}" y="${s.y * Pp + 25}" text-anchor="middle" style="font-size:14px;fill:${heatInk(k)}">${s.id}</text>` +
        `<text x="${cx(s) + S / 2}" y="${s.y * Pp + 44}" text-anchor="middle" style="font-size:13px;font-weight:500;fill:${heatInk(k)}">${TH.pct(vals[i])}</text></g>`;
    });
    svg += '</svg>';
    $('#map').innerHTML = svg;
    $('#mapScale').innerHTML = `<span>${TH.pct(b.lo)}</span><span class="ramp">${HEAT.map((h) => `<i style="background:${v(h)}"></i>`).join('')}</span><span>${TH.pct(b.hi)}</span><span>· ${esc(metricName())}</span>`;
    $$('#map .tile').forEach((g) => {
      const s = TH.STATES.find((x) => x.id === g.dataset.id);
      const pick = () => { st.state = st.state === s.id ? 'all' : s.id; fillSelects(); render(); };
      g.addEventListener('click', pick);
      g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
      g.addEventListener('mousemove', (e) => {
        const a = TH.agg({state:s.id, seg:st.seg, chan:st.chan}, st.q);
        TH.tip.show(`<b>${esc(L(s.name))}</b><div class="m">${TH.nf(a.n)} ${TH.T('depositors (synthetic)', 'pendeposit (sintetik)')}</div>` +
          tipRow('var(--b2)', '≥ RM15,000', TH.pct(a.g15)) + tipRow('var(--b3)', TH.T('Own payment', 'Bayaran sendiri'), TH.pct(a.pay)) + tipRow('var(--b5)', '≥ ' + TH.rm(P.kosHaji * st.k), TH.pct(a.g100)) +
          tipRow('var(--crit)', TH.T('Registered < RM15k', 'Berdaftar < RM15k'), TH.nf(a.belowN)) + `<div class="m">${TH.T('Click to filter', 'Klik untuk menapis')}</div>`, e.clientX, e.clientY);
      });
      g.addEventListener('mouseleave', TH.tip.hide);
    });
  }

  function drawTrend() {
    const W = widthOf($('#trend'), 300), narrow = W < 520, H = narrow ? 236 : 256, l = 40, r = narrow ? 88 : 112, tp = 40, bt = 28, iw = W - l - r, ih = H - tp - bt;
    const isAll = st.state === 'all' && st.seg === 'all' && st.chan === 'all';
    const sel = TH.series(f(), st.metric), nat = TH.series({}, st.metric);
    const series = isAll ? [{name:'Malaysia', vals:nat, c:'var(--s-a)'}] : [{name:scopeLabel(), vals:sel, c:'var(--s-a)'}, {name:'Malaysia', vals:nat, c:'var(--s-b)', dash:'6 5'}];
    const mx = Math.min(1, Math.ceil((Math.max.apply(null, series.flatMap((s) => s.vals)) + .04) * 10) / 10);
    const n = TH.QUARTERS.length, x = (i) => l + i / (n - 1) * iw, y = (val) => tp + ih - val / mx * ih;
    let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(metricName() + TH.T(', by quarter', ', mengikut suku tahun'))}">`;
    [[TH.RULE_START, narrow ? TH.T('RM15k minimum', 'Minimum RM15k') : TH.T('RM15,000 minimum (2025)', 'Minimum RM15,000 (2025)'), 'start', tp - 22], [TH.SERUAN_Q, narrow ? 'Seruan Istito\'ah' : 'Seruan Istito\'ah (Sept 2026)', 'end', tp - 8]].forEach((m) => {
      svg += `<line x1="${x(m[0])}" x2="${x(m[0])}" y1="${m[3] + 4}" y2="${tp + ih}" style="stroke:var(--gold)" stroke-width="1.5" stroke-dasharray="4 4"/>` +
        `<text x="${x(m[0]) + (m[2] === 'start' ? 4 : -4)}" y="${m[3]}" text-anchor="${m[2]}" style="font:600 10.5px var(--sans);fill:var(--gold-ink)">${esc(m[1])}</text>`;
    });
    for (let k = 0; k <= 4; k++) {
      const val = mx * k / 4;
      svg += `<line class="gridline" x1="${l}" x2="${l + iw}" y1="${y(val)}" y2="${y(val)}"/><text x="${l - 8}" y="${y(val) + 4}" text-anchor="end" style="font-size:11px;fill:var(--muted)">${Math.round(val * 100)}%</text>`;
    }
    TH.QUARTERS.forEach((q, i) => { if (q.q === 1 || i === n - 1) svg += `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" style="font-size:11px;fill:var(--muted)">${esc(L(q.short))}</text>`; });
    series.slice().reverse().forEach((s) => {
      svg += `<path d="${s.vals.map((val, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(val).toFixed(1)).join('')}" fill="none" style="stroke:${s.c}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"${s.dash ? ` stroke-dasharray="${s.dash}"` : ''}/>`;
    });
    const ends = series.map((s) => ({s, yy:y(s.vals[n - 1])}));
    if (ends.length === 2 && Math.abs(ends[0].yy - ends[1].yy) < 26) { const m = (ends[0].yy + ends[1].yy) / 2, up = ends[0].yy <= ends[1].yy ? 0 : 1; ends[up].yy = m - 13; ends[1 - up].yy = m + 13; }
    ends.forEach((e) => {
      svg += `<circle cx="${x(n - 1)}" cy="${y(e.s.vals[n - 1])}" r="4.5" style="fill:${e.s.c};stroke:var(--surface)" stroke-width="2"/>`;
      const nm = e.s.name.length > 16 ? e.s.name.slice(0, 15) + '…' : e.s.name;
      svg += `<text x="${x(n - 1) + 10}" y="${e.yy - 1}" style="font:600 12px var(--sans);fill:var(--ink)">${TH.pct(e.s.vals[n - 1])}</text><text x="${x(n - 1) + 10}" y="${e.yy + 12}" style="font-size:10.5px;fill:var(--muted)">${esc(nm)}</text>`;
    });
    svg += `<line class="xh" x1="0" x2="0" y1="${tp}" y2="${tp + ih}" style="stroke:var(--ink);opacity:0" stroke-width="1"/>`;
    svg += `<rect class="hit" x="${l}" y="${tp}" width="${iw}" height="${ih}" fill="transparent"/></svg>`;
    const legend = series.length > 1 ? `<div class="legend">${series.map((s) => `<span><i class="line" style="background:${s.dash ? 'repeating-linear-gradient(90deg,' + s.c + ' 0 5px,transparent 5px 9px)' : s.c}"></i>${esc(s.name)}</span>`).join('')}</div>` : '';
    let table = '';
    if (st.trendTable) {
      table = `<div class="scroll-x"><table class="tbl"><thead><tr><th>${t({en:'Quarter', ms:'Suku'})}</th>${series.map((s) => `<th class="r">${esc(s.name)}</th>`).join('')}</tr></thead><tbody>` +
        TH.QUARTERS.map((q, i) => `<tr><td>${esc(L(q.label))}</td>${series.map((s) => `<td class="r">${TH.pct(s.vals[i], 1)}</td>`).join('')}</tr>`).join('') + '</tbody></table></div>';
    }
    $('#trend').innerHTML = legend + svg + table;
    $('#trendToggle').textContent = st.trendTable ? TH.T('Hide data table', 'Sembunyi jadual data') : TH.T('Show data table', 'Papar jadual data');
    $('#trendTitle').textContent = metricName() + TH.T(', over time', ', mengikut masa');
    const svgEl = $('#trend svg'), xh = $('.xh', svgEl);
    $('.hit', svgEl).addEventListener('mousemove', (e) => {
      const p = svgPoint(svgEl, e), i = Math.max(0, Math.min(n - 1, Math.round((p.x - l) / iw * (n - 1))));
      xh.setAttribute('x1', x(i)); xh.setAttribute('x2', x(i)); xh.style.opacity = .35;
      TH.tip.show(`<b>${esc(L(TH.QUARTERS[i].label))}</b>` + series.map((s) => tipRow(s.c, s.name, TH.pct(s.vals[i], 1))).join(''), e.clientX, e.clientY);
    });
    $('.hit', svgEl).addEventListener('mouseleave', () => { xh.style.opacity = 0; TH.tip.hide(); });
  }

  function drawDist() {
    const W = widthOf($('#dist'), 280), rowH = 30, gap = 14, l = W < 420 ? 76 : 96, iw = W - l - 8;
    let svg = `<svg viewBox="0 0 ${W} ${TH.SEGMENTS.length * (rowH + gap)}" role="img" aria-label="${esc(TH.T('Share of depositors in each balance band, by age group', 'Peratus pendeposit dalam setiap jalur baki, mengikut kumpulan umur'))}">`;
    TH.SEGMENTS.forEach((g, r) => {
      const a = TH.agg({state:st.state, seg:g.id, chan:st.chan}, st.q), y0 = r * (rowH + gap), on = st.seg === 'all' || st.seg === g.id;
      svg += `<text x="0" y="${y0 + rowH / 2 + 4}" style="font:${st.seg === g.id ? 700 : 500} 12px var(--sans);fill:var(--ink)">${esc(L(g.short))}</text>`;
      let xx = l;
      a.bands.forEach((share, k) => {
        const w = Math.max(0, share * iw - 2);
        svg += `<g class="seg-bar" data-r="${r}" data-k="${k}" style="opacity:${on ? 1 : .35}"><rect x="${xx}" y="${y0}" width="${w}" height="${rowH}" rx="4" style="fill:${v(BAND[k])}"/>` +
          (w > 38 ? `<text x="${xx + w / 2}" y="${y0 + rowH / 2 + 4}" text-anchor="middle" style="font:600 11px var(--sans);fill:${bandInk(k)};pointer-events:none">${TH.pct(share)}</text>` : '') + '</g>';
        xx += share * iw;
      });
    });
    svg += '</svg>';
    const BN = TH.bandNames();
    $('#dist').innerHTML = `<div class="legend">${BN.map((bd, k) => `<span><i style="background:${v(BAND[k])}"></i>${t(bd)}</span>`).join('')}</div>` + svg;
    $$('#dist .seg-bar').forEach((gEl) => {
      gEl.addEventListener('mousemove', (e) => {
        const g = TH.SEGMENTS[+gEl.dataset.r], a = TH.agg({state:st.state, seg:g.id, chan:st.chan}, st.q);
        TH.tip.show(`<b>${esc(L(g.name))}</b>` + TH.bandNames().map((bd, j) => tipRow(v(BAND[j]), L(bd), TH.pct(a.bands[j], 1))).join(''), e.clientX, e.clientY);
      });
      gEl.addEventListener('mouseleave', TH.tip.hide);
    });
  }

  function drawMatrix() {
    const cols = st.by === 'seg' ? TH.SEGMENTS : TH.CHANNELS;
    const cell = (sid, cid) => TH.agg(st.by === 'seg' ? {state:sid, seg:cid, chan:st.chan} : {state:sid, seg:st.seg, chan:cid}, st.q)[st.metric];
    const grid = TH.STATES.map((s) => cols.map((c) => cell(s.id, c.id)));
    const b = bins([].concat.apply([], grid));
    const rows = TH.STATES.map((s, i) => ({s, vals:grid[i], all:TH.agg({state:s.id, seg:st.seg, chan:st.chan}, st.q)[st.metric]})).sort((p, q) => q.all - p.all);
    $('#matrix').innerHTML = `<table class="matrix"><caption class="sr">${esc(metricName())}</caption><colgroup><col class="c-state">${cols.map(() => '<col>').join('')}<col></colgroup><thead><tr><th scope="col" class="th-state">${t({en:'State', ms:'Negeri'})}</th>` +
      cols.map((c) => `<th scope="col">${esc(L(c.short))}</th>`).join('') + `<th scope="col">${t({en:'All', ms:'Semua'})}</th></tr></thead><tbody>` +
      rows.map((row) => `<tr class="${st.state === row.s.id ? 'sel' : ''}"><th scope="row">${esc(L(row.s.name))}</th>` +
        row.vals.map((val, j) => { const k = b.idx(val); return `<td style="background:${v(HEAT[k])};color:${heatInk(k)}" data-s="${row.s.id}" data-c="${j}">${TH.pct(val)}</td>`; }).join('') +
        `<td style="background:var(--surface-2);color:var(--ink)">${TH.pct(row.all)}</td></tr>`).join('') + '</tbody></table>';
    $('#matrixScale').innerHTML = `<span>${TH.pct(b.lo)}</span><span class="ramp">${HEAT.map((h) => `<i style="background:${v(h)}"></i>`).join('')}</span><span>${TH.pct(b.hi)}</span><span>· ${esc(metricName())}${TH.T(', sorted by state total', ', disusun ikut jumlah negeri')}</span>`;
    $$('#matrix td[data-s]').forEach((td) => {
      td.addEventListener('mousemove', (e) => {
        const s = TH.STATES.find((x) => x.id === td.dataset.s), c = cols[+td.dataset.c];
        TH.tip.show(`<b>${esc(L(s.name))}</b><div class="m">${esc(L(c.name))}</div>${tipRow('var(--brand)', metricName(), td.textContent)}`, e.clientX, e.clientY);
      });
      td.addEventListener('mouseleave', TH.tip.hide);
    });
  }

  function drawWatch() {
    const rows = TH.STATES.map((s) => {
      const a = TH.agg({state:s.id, seg:st.seg, chan:st.chan}, st.q), b = st.q >= 4 ? TH.agg({state:s.id, seg:st.seg, chan:st.chan}, st.q - 4) : null;
      return {s, n:a.belowN, share:a.belowShare, prev:b ? b.belowShare : null, stt: a.belowShare >= .58 ? 'crit' : a.belowShare >= .5 ? 'warn' : 'good'};
    }).sort((a, b) => b.share - a.share);
    const show = st.watchAll ? rows : rows.slice(0, 6);
    const sl = {good:TH.T('Lower risk', 'Risiko lebih rendah'), warn:TH.T('Elevated', 'Meningkat'), crit:TH.T('High risk', 'Risiko tinggi')};
    $('#watchSub').textContent = TH.T(`Registered depositors must hold RM15,000 by 31 December 2028; from 1 January 2029 the queue is re-sorted automatically. ${monthsLeft()} months left from ${L(qInfo().label)}.`,
      `Pendeposit berdaftar perlu memiliki RM15,000 sebelum 31 Disember 2028; mulai 1 Januari 2029 giliran disusun semula secara automatik. Tinggal ${monthsLeft()} bulan dari ${L(qInfo().label)}.`);
    $('#watch').innerHTML = `<div class="scroll-x"><table class="tbl"><thead><tr><th>${t({en:'State', ms:'Negeri'})}</th><th class="r hide-sm">${t({en:'Registered, below RM15,000', ms:'Berdaftar, bawah RM15,000'})}</th><th class="r">${t({en:'Share of registered', ms:'Peratus yang berdaftar'})}</th><th class="r hide-sm">${t({en:'Change in a year', ms:'Perubahan setahun'})}</th><th>${t({en:'Risk', ms:'Risiko'})}</th></tr></thead><tbody>` +
      show.map((r) => `<tr><td>${esc(L(r.s.name))}</td><td class="r hide-sm">${TH.nf(r.n)}</td><td class="r">${TH.pct(r.share, 1)}</td><td class="r hide-sm">${r.prev == null ? '–' : pp(r.share - r.prev)}</td><td><span class="status ${r.stt}">${TH.statusIcon(r.stt)}${esc(sl[r.stt])}</span></td></tr>`).join('') +
      '</tbody></table></div>';
    $('#watchToggle').textContent = st.watchAll ? TH.T('Show the six highest', 'Papar enam tertinggi') : TH.T('Show all 16 states', 'Papar semua 16 negeri');
  }

  function render() { TH.tip.hide(); drawStats(); drawGauges(); drawMap(); drawTrend(); drawDist(); drawMatrix(); drawWatch(); }
  fillSelects(); render();
  TH.onLang.push(() => { fillSelects(); render(); });
  TH.onTheme.push(render);
  onResize(() => { drawTrend(); drawDist(); drawMap(); });
};

/* ======================================================================
   Try a depositor: projection simulator on TH's own amounts
   ====================================================================== */
TH.pageInit.depositor = function () {
  const ids = ['age', 'bal', 'mon', 'cost', 'esc', 'hib', 'extra'];
  const el = {}; ids.forEach((k) => { el[k] = $('#s-' + k); });
  const regd = $('#s-regd');
  const START = {y:2026, m:10};
  let persona = 'aiman', cat = 'M40';

  $('#personas').innerHTML = TH.PERSONAS.map((p) => `<button class="persona" type="button" aria-pressed="${p.id === persona}" data-id="${p.id}">` +
    `<span class="face" style="background:${p.hue}">${p.initials}</span><b>${t(p.name)}</b><span>${t(p.role)} · ${esc(p.place)} · ${p.cat}</span></button>`).join('');
  function setCat(c) { cat = c; $$('#catSeg button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.cat === c)); }
  function setPersona(id) {
    persona = id; const p = TH.PERSONAS.find((x) => x.id === id);
    $$('#personas .persona').forEach((b) => b.setAttribute('aria-pressed', b.dataset.id === id));
    el.age.value = p.age; el.bal.value = p.bal; el.mon.value = p.monthly; regd.checked = p.registered; setCat(p.cat); renderDeadlines(); run();
  }
  const clearPersona = () => $$('#personas .persona').forEach((b) => b.setAttribute('aria-pressed', 'false'));
  $$('#personas .persona').forEach((b) => b.addEventListener('click', () => setPersona(b.dataset.id)));
  $$('#catSeg button').forEach((b) => b.addEventListener('click', () => { setCat(b.dataset.cat); clearPersona(); run(); }));
  regd.addEventListener('change', () => { clearPersona(); renderDeadlines(); run(); });
  ids.forEach((k) => el[k].addEventListener('input', () => { if (['age', 'bal', 'mon'].includes(k)) clearPersona(); run(); }));

  function project(bal, mon, cost, escR, prof, months) {
    const out = [{m:0, b:bal, c:cost}]; let b = bal;
    for (let m = 1; m <= months; m++) {
      b += mon;
      if (m % 12 === 0) b += b * prof;
      out.push({m, b, c:cost * Math.pow(1 + escR, m / 12)});
    }
    return out;
  }
  const hitRM = (path, rm) => { const r = path.find((x) => x.b >= rm); return r ? r.m : null; };
  const hitShare = (path, share) => { const r = path.find((x) => x.b >= share * x.c); return r ? r.m : null; };
  const when = (m) => {
    if (m == null) return TH.T('Not within 30 years', 'Tidak dalam 30 tahun');
    if (m === 0) return TH.T('Already there', 'Sudah dicapai');
    const y = Math.floor(m / 12), mo = m % 12;
    return TH.lang === 'ms' ? ((y ? y + ' thn ' : '') + (mo ? mo + ' bln' : '')).trim() : ((y ? y + (y > 1 ? ' yrs ' : ' yr ') : '') + (mo ? mo + ' mo' : '')).trim();
  };
  const dateOf = (m) => { const tot = START.y * 12 + START.m - 1 + m; return {y:Math.floor(tot / 12), m:tot % 12 + 1}; };
  const MON = {en:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], ms:['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis']};
  const fmtDate = (m) => { const d = dateOf(m); return MON[TH.lang][d.m - 1] + ' ' + d.y; };

  /* ---- Deadlines: TH's 2028 rule (registered depositors) plus any the user adds ---- */
  const TARGETS = [
    {id:'gate', name:{en:'RM15,000 gate', ms:'Ambang RM15,000'}},
    {id:'pay', name:{en:'Own Bayaran Haji', ms:'Bayaran Haji sendiri'}},
    {id:'full', name:{en:'Full Kos Haji', ms:'Kos Haji penuh'}},
    {id:'custom', name:{en:'Custom amount', ms:'Amaun sendiri'}}
  ];
  const SYS = {id:'th2028', sys:true, y:P.deadline.y, m:P.deadline.m, target:'gate'};
  let deadlines;
  try { deadlines = JSON.parse(TH.store.get('th-deadlines') || 'null'); } catch (e) { deadlines = null; }
  if (!Array.isArray(deadlines)) deadlines = [{id:'d1', y:START.y + 4, m:12, target:'gate', amount:20000}, {id:'d2', y:START.y + 8, m:12, target:'pay', amount:20000}];
  const saveDeadlines = () => TH.store.set('th-deadlines', JSON.stringify(deadlines));
  const activeDeadlines = () => (regd.checked ? [SYS] : []).concat(deadlines);
  const monthsUntil = (d) => (d.y * 12 + d.m) - (START.y * 12 + START.m);

  function renderDeadlines() {
    const yrs = []; for (let y = START.y; y <= START.y + 30; y++) yrs.push(y);
    $('#dlList').innerHTML = activeDeadlines().map((d, i) => {
      if (d.sys) return `<li class="dl-row" data-id="${d.id}"><span class="dl-no">${i + 1}</span>` +
        `<div class="dl-ctrl"><span class="dl-sys">31 Dec 2028 · ${t(TARGETS[0].name)}</span><span class="chip gold">${t({en:'TH rule for registered depositors', ms:'Peraturan TH bagi pendeposit berdaftar'})}</span></div><span></span><p class="dl-status"></p></li>`;
      return `<li class="dl-row" data-id="${d.id}"><span class="dl-no">${i + 1}</span><div class="dl-ctrl">` +
        `<select data-f="m" aria-label="${esc(TH.T('Month', 'Bulan'))}">${MON[TH.lang].map((n, k) => `<option value="${k + 1}"${d.m === k + 1 ? ' selected' : ''}>${n}</option>`).join('')}</select>` +
        `<select data-f="y" aria-label="${esc(TH.T('Year', 'Tahun'))}">${yrs.map((y) => `<option value="${y}"${d.y === y ? ' selected' : ''}>${y}</option>`).join('')}</select>` +
        `<select data-f="target" aria-label="${esc(TH.T('Target', 'Sasaran'))}">${TARGETS.map((tg) => `<option value="${tg.id}"${d.target === tg.id ? ' selected' : ''}>${esc(L(tg.name))}</option>`).join('')}</select>` +
        `<input data-f="amount" type="number" min="1000" max="200000" step="500" value="${d.amount || 20000}" aria-label="${esc(TH.T('Amount in ringgit', 'Amaun dalam ringgit'))}"${d.target === 'custom' ? '' : ' hidden'}>` +
        `</div><button class="dl-del" type="button" aria-label="${esc(TH.T('Remove this deadline', 'Buang tarikh akhir ini'))}">${TH.icon('close')}</button><p class="dl-status"></p></li>`;
    }).join('');
    $$('#dlList .dl-row').forEach((row) => {
      const d = deadlines.find((x) => x.id === row.dataset.id); if (!d) return;
      $$('[data-f]', row).forEach((inp) => inp.addEventListener(inp.tagName === 'INPUT' ? 'input' : 'change', () => {
        const f = inp.dataset.f;
        d[f] = f === 'target' ? inp.value : +inp.value;
        if (f === 'target') $('[data-f="amount"]', row).hidden = inp.value !== 'custom';
        saveDeadlines(); run();
      }));
      $('.dl-del', row).addEventListener('click', () => { deadlines = deadlines.filter((x) => x !== d); saveDeadlines(); renderDeadlines(); run(); const a = $('#dlAdd'); a && a.focus(); });
    });
  }
  $('#dlList').addEventListener('click', (e) => {
    const b = e.target.closest('.dl-use'); if (!b) return;
    const need = +b.dataset.need;
    if (need > +el.mon.max) el.mon.max = Math.ceil(need / 500) * 500;
    el.mon.value = need; clearPersona(); run();
    const row = b.closest('.dl-row'); const f = row && $('.dl-status', row); f && f.setAttribute('tabindex', '-1'); f && f.focus();
  });
  $('#dlAdd').addEventListener('click', () => {
    const last = deadlines[deadlines.length - 1];
    deadlines.push({id:'d' + Date.now(), y:Math.min(START.y + 30, (last ? last.y : START.y) + 3), m:12, target:'full', amount:20000});
    saveDeadlines(); renderDeadlines(); run();
    const rows = $$('#dlList .dl-row'); const s = rows.length && $('select', rows[rows.length - 1]); s && s.focus();
  });

  function run() {
    ids.forEach((k) => rangeFill(el[k]));
    const age = +el.age.value, bal = +el.bal.value, mon = +el.mon.value, cost = +el.cost.value, escR = +el.esc.value / 100, prof = +el.hib.value / 100, extra = +el.extra.value;
    const payShare = P.pay[cat] / P.kosHaji, isReg = regd.checked;
    $('#o-age').textContent = age; $('#o-bal').textContent = TH.rm(bal); $('#o-mon').textContent = TH.rm(mon);
    $('#o-cost').textContent = TH.rm(cost); $('#o-esc').textContent = (+el.esc.value).toFixed(1) + '%'; $('#o-hib').textContent = (+el.hib.value).toFixed(2) + '%';
    $('#o-extra').textContent = '+' + TH.rm(extra);
    const months = 360, base = project(bal, mon, cost, escR, prof, months), nud = project(bal, mon + extra, cost, escR, prof, months);
    const payNow = Math.round(cost * payShare);
    const M = [
      {key:'gate', label:{en:'RM15,000 gate', ms:'Ambang RM15,000'}, sub:{en:'offer letter; automatic queue from 2029', ms:'surat tawaran; giliran automatik mulai 2029'}, b:hitRM(base, P.gate), n:hitRM(nud, P.gate)},
      {key:'pay', label:{en:'Own Bayaran Haji (' + cat + ')', ms:'Bayaran Haji sendiri (' + cat + ')'}, sub:{en:TH.rm(payNow) + ' today' + (escR ? ', rising' : ''), ms:TH.rm(payNow) + ' sekarang' + (escR ? ', meningkat' : '')}, b:hitShare(base, payShare), n:hitShare(nud, payShare)},
      {key:'full', label:{en:'Full Kos Haji', ms:'Kos Haji penuh'}, sub:{en:TH.rm(cost) + ' today' + (escR ? ', rising' : ''), ms:TH.rm(cost) + ' sekarang' + (escR ? ', meningkat' : '')}, b:hitShare(base, 1), n:hitShare(nud, 1)}
    ];

    // milestones
    $('#milestones').innerHTML = M.map((mm, i) => {
      const m = mm.b, ag = m != null ? Math.floor(age + m / 12) : null;
      const gain = m != null && mm.n != null ? m - mm.n : (m == null && mm.n != null ? 'new' : 0);
      const same = i === 1 && cat === 'B40' && cost === P.kosHaji && !escR;
      return `<li><p class="label">${t(mm.label)}</p><b>${esc(when(m))}${m === 0 ? '<span class="lt-check" data-check aria-hidden="true"></span>' : ''}</b>` +
        `<span>${m != null ? esc(fmtDate(m) + ' · ' + TH.T('age ', 'umur ') + ag) : esc(TH.T('Raise the monthly amount', 'Tambah jumlah bulanan'))}</span>` +
        `<span class="sub">${esc(same ? TH.T('Same as the gate for B40', 'Sama dengan ambang bagi B40') : L(mm.sub))}</span>` +
        (extra > 0 && gain === 'new' ? `<span class="gain">${esc(TH.T('Reachable with the plan: ', 'Boleh dicapai dengan pelan: ') + when(mm.n))}</span>` : '') +
        (extra > 0 && gain > 0 ? `<span class="gain">${esc(when(gain) + TH.T(' sooner with the plan', ' lebih awal dengan pelan'))}</span>` : '') + '</li>';
    }).join('');
    $$('#milestones [data-check]').forEach((n) => TH.lottie && TH.lottie(n, 'check'));

    // deadlines: status for each, and the monthly amount that would meet a missed one
    const targetAt = (d, row) => d.target === 'gate' ? P.gate : d.target === 'custom' ? (d.amount || 0) : row.c * (d.target === 'pay' ? payShare : 1);
    const hitTarget = (path, d) => { const r = path.find((row) => row.b >= targetAt(d, row)); return r ? r.m : null; };
    function needMonthly(d, dm) {
      let lo = 0, hi = 50000;
      const ok = (mo) => { const pth = project(bal, mo, cost, escR, prof, dm); return pth[dm].b >= targetAt(d, pth[dm]); };
      if (!ok(hi)) return null;
      for (let k = 0; k < 24; k++) { const mid = (lo + hi) / 2; if (ok(mid)) hi = mid; else lo = mid; }
      return Math.ceil(hi / 10) * 10;
    }
    const DL = activeDeadlines().map((d, i) => {
      const dm = monthsUntil(d), mb = hitTarget(base, d), mn = hitTarget(nud, d);
      const met = dm >= 0 && mb != null && mb <= dm, planMeets = extra > 0 && dm >= 0 && mn != null && mn <= dm;
      return {d, i, dm, mb, mn, met, planMeets, need: !met && dm > 0 ? needMonthly(d, dm) : null};
    });
    const tgtName = (d) => d.target === 'custom' ? TH.rm(d.amount || 0) : L(TARGETS.find((x) => x.id === d.target).name);
    $$('#dlList .dl-row').forEach((row, k) => {
      const r = DL[k]; if (!r) return;
      row.classList.toggle('met', r.met); row.classList.toggle('missed', !r.met);
      let msg;
      if (r.dm < 0) msg = TH.T('This date has already passed.', 'Tarikh ini sudah berlalu.');
      else if (r.met) msg = r.mb === 0 ? TH.T(`${tgtName(r.d)} is already reached.`, `${tgtName(r.d)} sudah dicapai.`)
        : TH.T(`${tgtName(r.d)} by ${fmtDate(r.mb)}, ${r.dm - r.mb} months to spare.`, `${tgtName(r.d)} pada ${fmtDate(r.mb)}, lebih ${r.dm - r.mb} bulan.`);
      else msg = (r.mb == null ? TH.T(`${tgtName(r.d)} is not reached in 30 years.`, `${tgtName(r.d)} tidak dicapai dalam 30 tahun.`)
        : TH.T(`Reaches ${tgtName(r.d)} in ${fmtDate(r.mb)}, ${r.mb - r.dm} months after this date.`, `Mencapai ${tgtName(r.d)} pada ${fmtDate(r.mb)}, ${r.mb - r.dm} bulan selepas tarikh ini.`)) +
        (r.planMeets ? TH.T(' The literacy plan alone closes it.', ' Pelan literasi sahaja sudah mencukupi.') : '') +
        (r.need != null ? TH.T(` Needs about ${TH.rm(r.need)} a month from now (${TH.rm(Math.max(0, r.need - mon))} more).`, ` Perlu kira-kira ${TH.rm(r.need)} sebulan mulai sekarang (${TH.rm(Math.max(0, r.need - mon))} lagi).`) : '');
      $('.dl-status', row).innerHTML = `<span class="status ${r.met ? 'good' : 'crit'}">${TH.statusIcon(r.met ? 'good' : 'crit')}${esc(r.met ? TH.T('On track', 'Di landasan') : TH.T('Off track', 'Tersasar'))}</span> ${esc(msg)}` +
        (r.need != null && r.need > mon ? ` <button class="dl-use" type="button" data-need="${r.need}">${esc(TH.T('Use this amount: ', 'Guna amaun ini: ') + TH.rm(r.need) + TH.T('/month', '/bulan'))}</button>` : '');
    });
    $('#dlNote').innerHTML = regd.checked ? '' : t({en:'Not registered yet: from 1 January 2029 this depositor joins the queue automatically on reaching RM15,000, so no TH deadline applies.', ms:'Belum berdaftar: mulai 1 Januari 2029 pendeposit ini menyertai giliran secara automatik apabila mencapai RM15,000, jadi tiada tarikh akhir TH.'});

    // chart
    const far = M[2].b != null ? M[2].b : M[2].n != null ? M[2].n : 300;
    const lastDl = Math.max(0, ...DL.map((r) => r.dm));
    const horizon = Math.min(360, Math.max(72, Math.ceil((Math.max(far, lastDl) + 24) / 12) * 12));
    const W = widthOf($('#simChart'), 300), narrow = W < 520, H = narrow ? 260 : 300, l = narrow ? 50 : 62, r = narrow ? 92 : 118, tp = 18, bt = 30, iw = W - l - r, ih = H - tp - bt;
    const B = base.slice(0, horizon + 1), N2 = nud.slice(0, horizon + 1);
    const ymax = Math.max(B[horizon].c, N2[horizon].b, B[horizon].b, P.gate) * 1.08;
    const x = (m) => l + m / horizon * iw, y = (val) => tp + ih - val / ymax * ih;
    const line = (arr, fn) => arr.map((d, i) => (i ? 'L' : 'M') + x(d.m).toFixed(1) + ' ' + y(fn(d)).toFixed(1)).join('');
    let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(TH.T('Projected balance against RM15,000, the own payment and the full Kos Haji', 'Unjuran baki berbanding RM15,000, bayaran sendiri dan Kos Haji penuh'))}">`;
    const step = ymax > 120000 ? 40000 : ymax > 60000 ? 20000 : 10000;
    for (let val = 0; val <= ymax; val += step) svg += `<line class="gridline" x1="${l}" x2="${l + iw}" y1="${y(val)}" y2="${y(val)}"/><text x="${l - 8}" y="${y(val) + 4}" text-anchor="end" style="font-size:11px;fill:var(--muted)">${val ? 'RM' + (val / 1000) + 'k' : '0'}</text>`;
    const yrStep = horizon > 240 ? 5 : horizon > 120 ? 4 : horizon > 72 ? 2 : 1;
    for (let yr = 0; yr <= horizon / 12; yr += yrStep) svg += `<text x="${x(yr * 12)}" y="${H - 8}" text-anchor="middle" style="font-size:11px;fill:var(--muted)">${START.y + yr}</text>`;
    DL.forEach((r) => {
      if (r.dm < 0 || r.dm > horizon) return;
      const c = r.met ? 'var(--good)' : 'var(--crit)', xx = x(r.dm);
      svg += `<line x1="${xx}" x2="${xx}" y1="${tp + 10}" y2="${tp + ih}" style="stroke:${c}" stroke-width="1.4" stroke-dasharray="4 4"/>` +
        `<circle cx="${xx}" cy="${tp + 2}" r="8" style="fill:${c}"/><text x="${xx}" y="${tp + 6}" text-anchor="middle" style="font:700 10px var(--sans);fill:#fff">${r.i + 1}</text>`;
    });
    const thr = [{fn:() => P.gate, label:'RM15,000', strong:true}];
    if (cat !== 'T20' && !(cat === 'B40' && cost === P.kosHaji && !escR)) thr.push({fn:(d) => d.c * payShare, label:cat + TH.T(' payment', ' bayaran')});
    thr.push({fn:(d) => d.c, label:TH.T('Full Kos Haji', 'Kos Haji penuh')});
    const labY = [];
    thr.forEach((tr) => {
      svg += `<path d="${line(B, tr.fn)}" fill="none" style="stroke:${tr.strong ? 'var(--gold)' : 'var(--axis)'}" stroke-width="${tr.strong ? 1.8 : 1.3}" stroke-dasharray="${tr.strong ? '0' : '4 4'}"/>`;
      let ly = y(tr.fn(B[horizon])) + 4; labY.forEach((p) => { if (Math.abs(p - ly) < 13) ly = p - 13; }); labY.push(ly);
      svg += `<text x="${l + iw + 6}" y="${ly}" style="font:600 10.5px var(--sans);fill:${tr.strong ? 'var(--gold-ink)' : 'var(--muted)'}">${esc(tr.label)}</text>`;
    });
    if (extra > 0) svg += `<path d="${line(N2, (d) => d.b)}" fill="none" style="stroke:var(--s-b)" stroke-width="2" stroke-dasharray="7 5" stroke-linecap="round"/>`;
    svg += `<path d="${line(B, (d) => d.b)}" fill="none" style="stroke:var(--s-a)" stroke-width="2.4" stroke-linecap="round"/>`;
    M.forEach((mm) => { if (mm.b != null && mm.b <= horizon) svg += `<circle cx="${x(mm.b)}" cy="${y(B[mm.b].b)}" r="5" style="fill:var(--s-a);stroke:var(--surface)" stroke-width="2"/>`; });
    if (extra > 0) M.forEach((mm) => { if (mm.n != null && mm.n <= horizon) svg += `<circle cx="${x(mm.n)}" cy="${y(N2[mm.n].b)}" r="4.5" style="fill:var(--s-b);stroke:var(--surface)" stroke-width="2"/>`; });
    svg += `<line class="xh" x1="0" x2="0" y1="${tp}" y2="${tp + ih}" style="stroke:var(--ink);opacity:0"/><rect class="hit" x="${l}" y="${tp}" width="${iw}" height="${ih}" fill="transparent"/></svg>`;
    $('#simChart').innerHTML = `<div class="legend"><span><i class="line" style="background:var(--s-a)"></i>${t({en:'Current plan', ms:'Pelan semasa'})}</span>` +
      (extra > 0 ? `<span><i class="line" style="background:repeating-linear-gradient(90deg,var(--s-b) 0 6px,transparent 6px 10px)"></i>${esc(TH.T('With the literacy plan (+', 'Dengan pelan literasi (+') + TH.rm(extra) + TH.T('/month)', '/bulan)'))}</span>` : '') +
      `<span><i class="line" style="background:var(--gold)"></i>${t({en:'RM15,000 gate', ms:'Ambang RM15,000'})}</span><span><i class="line" style="background:repeating-linear-gradient(90deg,var(--axis) 0 4px,transparent 4px 8px)"></i>${t({en:'Payment and full cost', ms:'Bayaran dan kos penuh'})}</span></div>` + svg;
    const svgEl = $('#simChart svg'), xh = $('.xh', svgEl);
    $('.hit', svgEl).addEventListener('mousemove', (e) => {
      const p = svgPoint(svgEl, e), m = Math.max(0, Math.min(horizon, Math.round((p.x - l) / iw * horizon)));
      xh.setAttribute('x1', x(m)); xh.setAttribute('x2', x(m)); xh.style.opacity = .35;
      TH.tip.show(`<b>${esc(fmtDate(m))}</b> <span class="m">· ${TH.T('age ', 'umur ')}${Math.floor(age + m / 12)}</span>` + tipRow('var(--s-a)', TH.T('Current plan', 'Pelan semasa'), TH.rm(B[m].b)) +
        (extra > 0 ? tipRow('var(--s-b)', TH.T('With plan', 'Dengan pelan'), TH.rm(N2[m].b)) : '') + tipRow('var(--axis)', TH.T('Full Kos Haji', 'Kos Haji penuh'), TH.rm(B[m].c)), e.clientX, e.clientY);
    });
    $('.hit', svgEl).addEventListener('mouseleave', () => { xh.style.opacity = 0; TH.tip.hide(); });

    const mod = TH.MODULES.find((m) => m.id === (age < 30 ? 'youth' : age < 45 ? 'family' : age < 60 ? 'mid' : 'senior'));
    $('#nudgeText').innerHTML = `<b>${t({en:'Suggested module: ', ms:'Modul dicadangkan: '})}${t(mod.name)}</b><p>${t(mod.body)}</p>`;
    const g = M[0].b, py = M[1].b;
    $('#simSummary').textContent = g == null
      ? TH.T('At this pace RM15,000 is not reached within 30 years.', 'Pada kadar ini RM15,000 tidak dicapai dalam 30 tahun.')
      : TH.T(`At this pace: RM15,000 in ${when(g)}` + (cat !== 'B40' ? `, the ${cat} payment in ${when(py)}.` : ', which also covers the B40 payment.'),
             `Pada kadar ini: RM15,000 dalam ${when(g)}` + (cat !== 'B40' ? `, bayaran ${cat} dalam ${when(py)}.` : ', yang turut menampung bayaran B40.'));
  }
  setPersona(persona);
  TH.onLang.push(renderDeadlines);
  onRedraw(run);
  onResize(run);
};

/* ======================================================================
   Phases & plan: Gantt
   ====================================================================== */
TH.pageInit.plan = function () {
  const rows = [
    {n:{en:'Phase 1 · Data architecture & asset mapping', ms:'Fasa 1 · Seni bina data & pemetaan aset'}, s:1, e:4},
    {n:{en:'Phase 2 · User-centred design & KPI workshops', ms:'Fasa 2 · Reka bentuk berpusatkan pengguna & bengkel KPI'}, s:4, e:6, marks:[5, 6]},
    {n:{en:'Phase 3 · Interactive PoC dashboard', ms:'Fasa 3 · Papan pemuka PoC interaktif'}, s:6, e:12},
    {n:{en:'Literacy module pilot (two modules)', ms:'Rintis modul literasi (dua modul)'}, s:8, e:12, soft:true},
    {n:{en:'Steering committee', ms:'Jawatankuasa pemandu'}, marks:[1, 4, 8, 12]}
  ];
  function draw() {
    const W = widthOf($('#gantt'), 300), narrow = W < 600, lab = narrow ? 18 : 0;
    const l = narrow ? 0 : 300, r = 8, rowH = narrow ? 30 : 40, top = 30, iw = W - l - r, H = top + rows.length * (rowH + lab) + 6, cw = iw / 12;
    const x = (m) => l + (m - 1) * cw;
    let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(TH.T('Proposed 12-month timeline', 'Garis masa 12 bulan yang dicadangkan'))}">`;
    for (let m = 1; m <= 12; m++) {
      svg += `<text x="${x(m) + cw / 2}" y="18" text-anchor="middle" style="font:600 ${narrow ? 10.5 : 11}px var(--sans);fill:var(--muted)">${narrow ? m : TH.T('M', 'B') + m}</text>`;
      svg += `<line x1="${x(m)}" x2="${x(m)}" y1="${top - 4}" y2="${H}" class="gridline"/>`;
    }
    rows.forEach((rw, i) => {
      const y0 = top + i * (rowH + lab) + lab;
      svg += `<text x="0" y="${narrow ? y0 - 4 : y0 + rowH / 2 + 4}" style="font:${rw.s ? 600 : 500} 12px var(--sans);fill:var(--ink)">${esc(L(rw.n))}</text>`;
      if (rw.s) svg += `<rect x="${x(rw.s) + 3}" y="${y0 + 9}" width="${(rw.e - rw.s + 1) * cw - 6}" height="${rowH - 18}" rx="6" style="fill:${rw.soft ? 'var(--brand-soft);stroke:var(--brand)' : 'var(--brand)'}" stroke-width="1.5"/>`;
      (rw.marks || []).forEach((m) => {
        const cx = x(m) + cw / 2, cy = y0 + rowH / 2;
        svg += `<path d="M${cx} ${cy - 8} L${cx + 8} ${cy} L${cx} ${cy + 8} L${cx - 8} ${cy}Z" style="fill:var(--ink-2);stroke:var(--surface)" stroke-width="2"/>`;
      });
    });
    svg += '</svg>';
    $('#gantt').innerHTML = svg;
  }
  draw(); TH.onLang.push(draw); onResize(draw);
};

/* ======================================================================
   Technical blueprint: layout schema + ecosystem map
   ====================================================================== */
TH.pageInit.blueprint = function () {
  const R = [
    {k:'A', x:0, y:0, w:600, h:34, n:{en:'Global bar', ms:'Bar global'}, d:{en:'Title, the "as at" quarter, user role (HQ, branch, partner), language and theme. Stays fixed while scrolling.', ms:'Tajuk, suku tahun semasa, peranan pengguna (ibu pejabat, cawangan, rakan), bahasa dan tema. Kekal di atas semasa menatal.'}},
    {k:'B', x:0, y:42, w:600, h:30, n:{en:'Filter rail', ms:'Rel penapis'}, d:{en:'State, age group, corporate category and quarter in one row. Every panel below reads the same filter state; a state tile click writes back to it.', ms:'Negeri, kumpulan umur, kategori korporat dan suku tahun dalam satu baris. Semua panel membaca keadaan penapis yang sama; klik jubin negeri menulis semula kepadanya.'}},
    {k:'C', x:0, y:80, w:600, h:52, n:{en:'Headline figures', ms:'Angka utama'}, d:{en:'Depositors in view, share at RM15,000, share able to cover their own Bayaran Haji, and registered depositors still below RM15,000, each with its change over a year.', ms:'Pendeposit dalam paparan, peratus pada RM15,000, peratus yang mampu menampung Bayaran Haji sendiri, dan pendeposit berdaftar yang masih di bawah RM15,000, setiap satu dengan perubahan setahun.'}},
    {k:'D', x:0, y:140, w:250, h:110, n:{en:'Gauge modules', ms:'Modul tolok'}, d:{en:'One gauge per ladder amount (RM8,325, RM15,000, RM23,500, RM33,300) with the target agreed in Phase 2 and a labelled status. Modular: TH can add a gauge for any new policy amount.', ms:'Satu tolok bagi setiap amaun tangga (RM8,325, RM15,000, RM23,500, RM33,300) dengan sasaran Fasa 2 dan status berlabel. Modular: TH boleh menambah tolok bagi amaun dasar baharu.'}},
    {k:'E', x:258, y:140, w:342, h:110, n:{en:'Geographic panel', ms:'Panel geografi'}, d:{en:'A tile map of all 16 states and federal territories, equal-sized so small states stay visible. Colour shows the chosen measure; click filters.', ms:'Peta jubin 16 negeri dan wilayah persekutuan, saiz sama supaya negeri kecil kekal kelihatan. Warna menunjukkan ukuran dipilih; klik untuk menapis.'}},
    {k:'F', x:0, y:258, w:342, h:96, n:{en:'Trend panel', ms:'Panel trend'}, d:{en:'Quarterly line for the selection against Malaysia, with the 2025 RM15,000 rule and the September 2026 Seruan Istito\'ah launch marked.', ms:'Garis suku tahunan bagi pilihan berbanding Malaysia, dengan peraturan RM15,000 (2025) dan pelancaran Seruan Istito\'ah (September 2026) ditanda.'}},
    {k:'G', x:350, y:258, w:250, h:96, n:{en:'Balance bands', ms:'Jalur baki'}, d:{en:'Share of depositors in each band between TH\'s amounts, per age group.', ms:'Peratus pendeposit dalam setiap jalur antara amaun TH, mengikut kumpulan umur.'}},
    {k:'H', x:0, y:362, w:600, h:70, n:{en:'Trend matrix', ms:'Matriks trend'}, d:{en:'States by age group or corporate category, each cell shaded by the measure. Doubles as the accessible table of the map.', ms:'Negeri mengikut kumpulan umur atau kategori korporat, setiap sel diwarnakan mengikut ukuran. Juga jadual boleh akses bagi peta.'}},
    {k:'I', x:0, y:440, w:600, h:44, n:{en:'2028 watchlist and export', ms:'Senarai pantau 2028 dan eksport'}, d:{en:'Registered depositors still below RM15,000, by state, with months left to 31 December 2028. Export to CSV and PDF for board papers (Phase 3).', ms:'Pendeposit berdaftar yang masih di bawah RM15,000, mengikut negeri, dengan baki bulan ke 31 Disember 2028. Eksport ke CSV dan PDF untuk kertas lembaga (Fasa 3).'}}
  ];
  let cur = 'D';
  function drawWire() {
    const narrow = widthOf($('#wire'), 280) < 520, Wn = widthOf($('#wire'), 280);
    const RR = narrow ? R.map((r, i) => Object.assign({}, r, {x:0, y:i * 46, w:Wn - 4, h:38})) : R;
    const vb = narrow ? `-2 -2 ${Wn} ${R.length * 46 + 2}` : '-2 -2 604 490';
    let svg = `<svg viewBox="${vb}" role="group" aria-label="${esc(TH.T('Dashboard layout schema', 'Skema susun atur papan pemuka'))}">`;
    RR.forEach((r) => {
      svg += `<g class="${r.k === cur ? 'on' : ''}" data-k="${r.k}" tabindex="0" role="button" aria-pressed="${r.k === cur}" aria-label="${esc(r.k + ': ' + L(r.n))}"><rect class="wr" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="8"/>` +
        `<text class="wl" x="${r.x + 12}" y="${r.y + (r.h > 40 ? 22 : r.h / 2 + 5)}">${r.k}</text><text class="wt" x="${r.x + 30}" y="${r.y + (r.h > 40 ? 22 : r.h / 2 + 4)}">${esc(L(r.n))}</text></g>`;
    });
    svg += '</svg>';
    $('#wire').innerHTML = svg;
    $$('#wire g[data-k]').forEach((g) => {
      const pick = (kb) => { cur = g.dataset.k; drawWire(); const f = kb && $(`#wire g[data-k="${cur}"]`); f && f.focus(); };
      g.addEventListener('click', () => pick(false));
      g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(true); } });
    });
    const r = R.find((x) => x.k === cur);
    $('#wireInfo').innerHTML = `<span class="k">${r.k}</span><h3>${t(r.n)}</h3><p>${t(r.d)}</p>`;
  }
  drawWire(); TH.onLang.push(drawWire);

  let on = 'tracker';
  const N = TH.ECO.nodes, byId = {}; N.forEach((n) => { byId[n.id] = n; });
  const ARROW = (dir) => `<svg viewBox="0 0 24 24" aria-hidden="true" class="flow-ic"><path d="${dir === 'out' ? 'M5 12h13M13 6l6 6-6 6' : 'M19 12H6M11 6l-6 6 6 6'}"/></svg>`;
  function drawEco() {
    if (widthOf($('#eco'), 280) < 560) return drawEcoList();
    let svg = `<svg viewBox="-330 -250 660 470" role="group" aria-label="${esc(TH.T('Ecosystem connectivity map', 'Peta kesalinghubungan ekosistem'))}"><defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--brand-ink)"/></marker></defs>`;
    TH.ECO.links.forEach((lk) => {
      const a = byId[lk.a], b = byId[lk.b], act = on === lk.a || on === lk.b;
      const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
      const x1 = a.x + ux * (a.r + 4), y1 = a.y + uy * (a.r + 4), x2 = b.x - ux * (b.r + 8), y2 = b.y - uy * (b.r + 8);
      const bend = lk.curve ? 40 : 0, mx = (x1 + x2) / 2 - uy * bend, my = (y1 + y2) / 2 + ux * bend;
      svg += `<path class="link${act ? ' on flow' : ''}${on !== 'tracker' && !act ? ' dim' : ''}" d="M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}"${act ? ' marker-end="url(#ar)"' : ''}/>`;
    });
    N.forEach((n) => {
      const act = on === n.id || TH.ECO.links.some((lk) => (lk.a === on && lk.b === n.id) || (lk.b === on && lk.a === n.id));
      const prop = n.status === 'proposed';
      const fillC = n.core && n.id === 'tracker' ? 'var(--brand)' : prop ? 'var(--surface-2)' : 'var(--brand-soft)';
      const ly = n.y + n.r + 16;
      svg += `<g class="node${on === n.id ? ' on' : ''}${on !== 'tracker' && !act ? ' dim' : ''}" data-id="${n.id}" tabindex="0" role="button" aria-pressed="${on === n.id}" aria-label="${esc(L(n.name))}">` +
        `<circle cx="${n.x}" cy="${n.y}" r="${n.r}" style="fill:${fillC};stroke:${prop ? 'var(--muted)' : 'var(--surface)'}"${prop ? ' stroke-dasharray="4 3"' : ''}/>` +
        (n.id === 'tracker' ? `<g transform="translate(${n.x - 14} ${n.y - 14}) scale(.7)" style="color:var(--on-brand)">${TH.MARK.replace('class="brand-mark"', 'width="40" height="40"')}</g>` : '') +
        `<text x="${n.x}" y="${ly}" text-anchor="middle">${esc(L(n.name))}</text><text class="sub" x="${n.x}" y="${ly + 13}" text-anchor="middle">${esc(L(n.sub))}</text></g>`;
    });
    svg += '</svg>';
    $('#eco').innerHTML = svg;
    $$('#eco .node').forEach((g) => {
      const pick = (kb) => { on = g.dataset.id; drawEco(); const f = kb && $(`#eco .node[data-id="${on}"]`); f && f.focus(); };
      g.addEventListener('click', () => pick(false));
      g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(true); } });
    });
    ecoInfo();
  }
  function drawEcoList() {
    $('#eco').innerHTML = `<div class="eco-list" role="group" aria-label="${esc(TH.T('Ecosystem connectivity map', 'Peta kesalinghubungan ekosistem'))}">` + N.map((n) =>
      `<button type="button" class="eco-node ${n.status === 'proposed' ? 'proposed' : 'core'}${n.id === 'tracker' ? ' hub' : ''}" data-id="${n.id}" aria-pressed="${on === n.id}"><b>${esc(L(n.name))}</b><small>${esc(L(n.sub))}</small></button>`).join('') + '</div>';
    $$('#eco .eco-node').forEach((b) => b.addEventListener('click', () => { on = b.dataset.id; drawEco(); const f = $(`#eco .eco-node[data-id="${on}"]`); f && f.focus(); }));
    ecoInfo();
  }
  function ecoInfo() {
    const n = byId[on];
    const flows = TH.ECO.links.filter((lk) => lk.a === on || lk.b === on).map((lk) => {
      const out = lk.a === on, other = byId[out ? lk.b : lk.a];
      return `<li>${ARROW(out ? 'out' : 'in')}<span><b>${esc((out ? TH.T('To ', 'Kepada ') : TH.T('From ', 'Daripada ')) + L(other.name))}</b><span class="muted small">${esc(L(lk.label))}</span></span></li>`;
    }).join('');
    $('#ecoInfo').innerHTML = `<h3 style="font-family:var(--display);font-weight:400;font-size:1.6rem">${t(n.name)}</h3>` +
      `<p class="small" style="margin:4px 0 8px">${n.status === 'proposed' ? `<span class="chip">${t({en:'Proposed partner, not yet agreed', ms:'Rakan dicadangkan, belum dipersetujui'})}</span>` : `<span class="chip brand">${t({en:'Core to the project', ms:'Teras projek'})}</span>`}</p>` +
      `<p>${t(n.body)}</p><p class="label">${t({en:'Data flows', ms:'Aliran data'})}</p><ul class="flows">${flows}</ul>`;
  }
  drawEco(); TH.onLang.push(drawEco); onResize(() => { drawWire(); drawEco(); });
  traceInit();
};

/* ======================================================================
   Blueprint (technical): trace one programme's data to the dashboard
   ====================================================================== */
function traceInit() {
  if (!$('#pipe')) return;
  let cur = 'youth';
  const STAGES = [
    {id:'mod', n:{en:'Programme', ms:'Program'}, s:{en:'app · workshop · HR', ms:'aplikasi · bengkel · HR'}},
    {id:'col', n:{en:'Event collector', ms:'Pengumpul acara'}, s:{en:'schema check', ms:'semakan skema'}},
    {id:'pse', n:{en:'Pseudonymise', ms:'Nyahnama'}, s:{en:'inside TH, PDPA', ms:'dalam TH, PDPA'}},
    {id:'wh', n:{en:'Analytics store', ms:'Stor analitik'}, s:{en:'events · snapshots', ms:'acara · petikan'}},
    {id:'agg', n:{en:'Aggregate views', ms:'Paparan agregat'}, s:{en:'cells under 10 hidden', ms:'sel bawah 10 disorok'}},
    {id:'tile', n:{en:'Dashboard tiles', ms:'Jubin papan pemuka'}, s:{en:'', ms:''}}
  ];
  const TILE = {gauge25:{en:'RM8,325 gauge', ms:'Tolok RM8,325'}, gauge15:{en:'RM15,000 gauge', ms:'Tolok RM15,000'}, gauge235:{en:'RM23,500 gauge', ms:'Tolok RM23,500'}, gauge100:{en:'RM33,300 gauge', ms:'Tolok RM33,300'},
    reg:{en:'Regular savers', ms:'Penyimpan tetap'}, funnel:{en:'Programme funnel', ms:'Corong program'}, trend:{en:'Trend panel', ms:'Panel trend'}, matrix:{en:'Trend matrix', ms:'Matriks trend'}, watch:{en:'2028 watchlist', ms:'Senarai pantau 2028'}, map:{en:'Geographic panel', ms:'Panel geografi'}};
  function drawPick() {
    $('#modPick').innerHTML = TH.MODULES.map((m) => `<button type="button" data-id="${m.id}" aria-pressed="${m.id === cur}">${t(m.name)}</button>`).join('');
    $$('#modPick button').forEach((b) => b.addEventListener('click', () => { cur = b.dataset.id; $$('#modPick button').forEach((x) => x.setAttribute('aria-pressed', x === b)); drawPipe(); drawEvents(); }));
  }
  function drawPipe() {
    const m = TH.MODULES.find((x) => x.id === cur), W = 780, bw = 112, gap = (W - bw * 6) / 5, H = 80;
    let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(TH.T('Telemetry pipeline for ', 'Saluran telemetri bagi ') + L(m.name))}">`;
    STAGES.forEach((s, i) => {
      const x = i * (bw + gap);
      if (i) svg += `<path class="wire-l on" d="M${x - gap + 2} 40 L${x - 4} 40"/>`;
      svg += `<g class="stage on"><rect x="${x}" y="12" width="${bw}" height="56" rx="12"/><text x="${x + bw / 2}" y="${s.id === 'tile' ? 44 : 37}" text-anchor="middle">${esc(L(s.n))}</text>`;
      if (s.id !== 'tile') svg += `<text class="s" x="${x + bw / 2}" y="54" text-anchor="middle">${esc(L(s.s))}</text>`;
      svg += '</g>';
    });
    $('#pipe').innerHTML = svg + '</svg>';
    $('#pipeTiles').innerHTML = `<span class="muted small">${esc(m.events.length + TH.T(' event types from ', ' jenis acara dari ') + L(m.name) + TH.T(' feed:', ' menyalurkan:'))}</span> ` + m.tiles.map((k) => `<span class="chip brand">${esc(L(TILE[k]))}</span>`).join(' ');
  }
  function drawEvents() {
    const m = TH.MODULES.find((x) => x.id === cur);
    $('#events').innerHTML = `<div class="scroll-x"><table class="tbl"><thead><tr><th>${t({en:'Event', ms:'Acara'})}</th><th>${t({en:'Sent when', ms:'Dihantar apabila'})}</th><th>${t({en:'Key fields', ms:'Medan utama'})}</th><th>${t({en:'Feeds', ms:'Menyalurkan'})}</th></tr></thead><tbody>` +
      TH.EVENTS.map((e) => `<tr class="${m.events.includes(e.id) ? 'hl' : ''}"><td><code>${e.id}</code></td><td>${t(e.when)}</td><td><code>${esc(e.fields)}</code></td><td>${t(e.feeds)}</td></tr>`).join('') + '</tbody></table></div>';
  }
  const all = () => { drawPick(); drawPipe(); drawEvents(); };
  all(); TH.onLang.push(all);
}

/* ======================================================================
   Literacy programmes (plain language): programme cards and the funnel
   ====================================================================== */
TH.pageInit.literacy = function () {
  function drawProgrammes() {
    $('#programmes').innerHTML = TH.MODULES.map((m) => `<li class="prog"><span class="chip brand">${t(m.who)}</span><h3>${t(m.name)}</h3><p>${t(m.body)}</p>` +
      `<p class="prog-goal"><span class="label">${t({en:'Success looks like', ms:'Tanda kejayaan'})}</span>${t(m.goal)}</p></li>`).join('');
  }
  function drawFunnel() {
    const box = $('#funnel'), W = widthOf(box, 280), compact = W < 520;
    const l = compact ? 0 : 230, r = compact ? 110 : 130, rowH = compact ? 24 : 30, lab = compact ? 18 : 0, gap = 10, iw = W - l - r, top = TH.FUNNEL[0].n;
    let svg = `<svg viewBox="0 0 ${W} ${TH.FUNNEL.length * (rowH + gap + lab)}" role="img" aria-label="${esc(TH.T('Programme funnel, synthetic', 'Corong program, sintetik'))}">`;
    TH.FUNNEL.forEach((f, i) => {
      const y0 = i * (rowH + gap + lab) + lab, w = f.n / top * iw;
      svg += `<text x="0" y="${compact ? y0 - 5 : y0 + rowH / 2 + 4}" style="font:500 12px var(--sans);fill:var(--ink)">${esc(L(f.name))}</text>` +
        `<rect x="${l}" y="${y0}" width="${w}" height="${rowH}" rx="4" style="fill:${v(BAND[4 - i])}"/>` +
        `<text x="${l + w + 8}" y="${y0 + rowH / 2 + 4}" style="font:600 12px var(--sans);fill:var(--ink)">${TH.nf(f.n)}</text>` +
        (i ? `<text x="${l + w + 52}" y="${y0 + rowH / 2 + 4}" style="font:500 11px var(--sans);fill:var(--muted)">${TH.pct(f.n / TH.FUNNEL[i - 1].n)}${compact ? '' : ' ' + esc(TH.T('of previous', 'drp sebelum'))}</text>` : '');
    });
    box.innerHTML = svg + '</svg>';
  }
  const all = () => { drawProgrammes(); drawFunnel(); };
  all(); TH.onLang.push(all); TH.onTheme.push(drawFunnel); onResize(drawFunnel);
};

/* ======================================================================
   Data templates: the spreadsheet behind a page (any [data-template])
   A sheet preview with Excel-style letters and row numbers, sheet tabs,
   steps that light up the rows and columns they use, and a column guide.
   ====================================================================== */
const COLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
TH.templateInit = function () {
  $$('[data-template]').forEach((host) => {
    const T = TH.TEMPLATES && TH.TEMPLATES[host.getAttribute('data-template')]; if (!T) return;
    let step = 0, sheet = T.steps[0].sheet || 0;
    const val = (c, r) => typeof c.calc === 'function' ? c.calc(r) : r[c.k];
    const cell = (c, x) => x === '' || x == null ? '' : typeof x === 'number' && c.type === 'pct' ? x + '%' : typeof x === 'number' ? x.toLocaleString('en-MY', {maximumFractionDigits:2}) : String(x);
    const isNum = (c) => c.type === 'rm' || c.type === 'int' || c.type === 'pct';
    const formula = (c, i, r) => { const f = (r._f && r._f[c.k]) || (i === 0 && c.f0) || c.f; return f ? '=' + f.replace(/\{r\}/g, i + 2).replace(/\{p\}/g, i + 1) : ''; };
    const typeName = (c) => c.type === 'rm' ? 'RM' : c.type === 'yn' ? 'Y / N' : c.type === 'int' ? TH.T('number', 'nombor') : c.type === 'pct' ? '%' : TH.T('text', 'teks');
    function render() {
      const S = T.sheets[sheet], st = T.steps[step], on = (st.sheet || 0) === sheet;
      const hitCols = on ? st.cols.map((x) => COLS.indexOf(x)) : [];
      const hits = S.rows.map((r) => on && !!st.match(r)), anyHit = hits.some(Boolean);
      const ch = (j) => hitCols.includes(j) ? ' col-hit' : '';
      const grid = `<table class="xl-grid"><thead><tr><th class="xl-corner" aria-hidden="true"></th>${S.cols.map((c, j) => `<th scope="col" class="${ch(j)}">${COLS[j]}</th>`).join('')}</tr></thead><tbody>` +
        `<tr class="xl-hdr"><th scope="row">1</th>${S.cols.map((c, j) => `<td class="${c.f ? 'calc' : ''}${ch(j)}" title="${esc(L(c.d))}">${c.f ? '<i class="fx">fx</i>' : ''}${esc(c.k)}</td>`).join('')}</tr>` +
        S.rows.map((r, i) => `<tr class="${hits[i] ? 'hit' : anyHit ? 'dim' : ''}"><th scope="row">${i + 2}</th>${S.cols.map((c, j) => { const f = formula(c, i, r); return `<td class="${f ? 'calc' : ''}${ch(j)}${isNum(c) || typeof val(c, r) === 'number' ? ' r' : ''}"${f ? ` title="${esc(f)}"` : ''}>${esc(cell(c, val(c, r)))}</td>`; }).join('')}</tr>`).join('') +
        '</tbody></table>';
      const tabs = T.sheets.length > 1 ? T.sheets.map((s, k) => `<button type="button" role="tab" aria-selected="${k === sheet}" data-s="${k}">${esc(s.name)}</button>`).join('') : `<span class="xl-tab-one">${esc(S.name)}</span>`;
      const stepsHtml = T.steps.map((s, k) => {
        const res = s.res(T.sheets[s.sheet || 0].rows);
        return `<li><button type="button" class="dt-step${s.proposed ? ' proposed' : ''}" aria-pressed="${k === step}" data-k="${k}"><span class="dt-n">${k + 1}</span>` +
          `<b>${t(s.t)}${s.proposed ? ` <span class="tag tag-new">${t({en:'proposed', ms:'dicadangkan'})}</span>` : ''}</b><span class="dt-rule">${t(s.rule)}</span>` +
          `<span class="dt-res">${t({en:'In these rows: ', ms:'Dalam baris ini: '})}<strong>${t(res)}</strong></span><span class="dt-feeds">${TH.icon('right')}${t(s.feeds)}</span></button></li>`;
      }).join('');
      const guide = T.sheets.map((s) => `<tr class="g-sheet"><th colspan="4">${esc(s.name)}</th></tr>` + s.cols.map((c, j) =>
        `<tr><td class="nowrap"><span class="xl-letter">${COLS[j]}</span><code>${esc(c.k)}</code></td><td class="nowrap">${esc(typeName(c))}${c.f ? ' · fx' : ''}</td><td>${t(c.d)}</td><td class="muted small">${c.opts ? esc(c.opts.length > 6 ? c.opts.slice(0, 5).join(', ') + ' …' : c.opts.join(', ')) : ''}</td></tr>`).join('')).join('');
      const wasOpen = $('.dt-cols', host) && $('.dt-cols', host).open, oldXl = $('.xl', host), keepX = oldXl ? oldXl.scrollLeft : 0;
      host.innerHTML = `<div class="dt-card">` +
        `<header class="dt-head"><span class="dt-ic" aria-hidden="true">${TH.icon('sheet')}</span><div><p class="label">${t({en:'Data template', ms:'Templat data'})}</p>` +
        `<h2 class="with-info">${t({en:'The data behind this page', ms:'Data di sebalik halaman ini'})}${TH.info('dt')}</h2><p>${t(T.intro)}</p></div>` +
        `<a class="btn btn-gold dt-dl" href="${T.file}" download>${TH.icon('download')}${t({en:'Download Excel template', ms:'Muat turun templat Excel'})}</a></header>` +
        `<div class="xl" role="region" tabindex="0" aria-label="${esc(TH.T('Sheet preview: ', 'Pratonton helaian: ') + S.name)}">${grid}</div>` +
        `<div class="xl-tabs" role="tablist" aria-label="${esc(TH.T('Sheets', 'Helaian'))}">${tabs}<span class="xl-note">${t({en:'Sample rows, made up. Shaded fx cells are worked out: hover one for its formula.', ms:'Baris contoh, rekaan. Sel fx berlorek dikira: halakan tetikus untuk formulanya.'})}</span></div>` +
        `<h3 class="dt-how">${t({en:'How rows become the numbers on this page', ms:'Bagaimana baris menjadi angka di halaman ini'})}</h3><p class="muted small dt-hint">${t({en:'Click a step: the rows and columns it uses light up above.', ms:'Klik satu langkah: baris dan lajur yang digunakan akan diserlahkan di atas.'})}</p>` +
        `<ol class="dt-steps">${stepsHtml}</ol>` +
        (T.privacy ? `<p class="dt-privacy">${TH.icon('info')}<span>${t(T.privacy)}</span></p>` : '') +
        `<details class="dt-cols"${wasOpen ? ' open' : ''}><summary>${t({en:'Column guide', ms:'Panduan lajur'})} <span class="muted">(${T.sheets.reduce((n, s) => n + s.cols.length, 0)})</span></summary><div class="scroll-x"><table class="tbl"><thead><tr><th>${t({en:'Column', ms:'Lajur'})}</th><th>${t({en:'Type', ms:'Jenis'})}</th><th>${t({en:'What it means', ms:'Maksud'})}</th><th>${t({en:'Allowed values', ms:'Nilai dibenarkan'})}</th></tr></thead><tbody>${guide}</tbody></table></div></details>` +
        '</div>';
      /* keep the sheet's sideways scroll, but bring the step's columns into view */
      const xl = $('.xl', host), hc = $$('thead th.col-hit', xl);
      xl.scrollLeft = keepX;
      if (hc.length) {
        const first = hc[0], last = hc[hc.length - 1], rowHead = $('tbody th', xl).offsetWidth;
        const left = first.offsetLeft - rowHead - 8, right = last.offsetLeft + last.offsetWidth + 8;
        if (left < xl.scrollLeft || right > xl.scrollLeft + xl.clientWidth) xl.scrollLeft = Math.max(0, Math.min(left, right - xl.clientWidth));
      }
      $$('.dt-step', host).forEach((b) => b.addEventListener('click', () => { step = +b.dataset.k; sheet = T.steps[step].sheet || 0; render(); }));
      $$('.xl-tabs [role="tab"]', host).forEach((b) => b.addEventListener('click', () => { sheet = +b.dataset.s; render(); }));
    }
    render(); TH.onLang.push(render);
  });
};

/* ======================================================================
   Grant proposal topics: coverage table, filter, topic cards, copy
   ====================================================================== */
TH.pageInit.topics = function () {
  let filter = 'all';
  const PAGE_NAME = (id) => { const p = TH.PAGES.concat(TH.EXTRA_PAGES || []).find((x) => x.id === id); return p ? p : null; };
  const COVER = [
    {k:'p1', n:{en:'Problem 1 · irregular saving', ms:'Masalah 1 · simpanan tidak konsisten'}, s:{en:'P1', ms:'M1'}, has:(tp) => tp.problems.includes(1)},
    {k:'p2', n:{en:'Problem 2 · paying ahead', ms:'Masalah 2 · bayaran awal'}, s:{en:'P2', ms:'M2'}, has:(tp) => tp.problems.includes(2)},
    {k:'p3', n:{en:'Problem 3 · the long queue', ms:'Masalah 3 · giliran panjang'}, s:{en:'P3', ms:'M3'}, has:(tp) => tp.problems.includes(3)},
    {k:'tracker', n:{en:'Tracker', ms:'Penjejak'}, has:(tp) => tp.pages.includes('tracker')},
    {k:'depositor', n:{en:'Depositor', ms:'Pendeposit'}, has:(tp) => tp.pages.includes('depositor')},
    {k:'cost', n:{en:'Cost', ms:'Kos'}, has:(tp) => tp.pages.includes('cost')},
    {k:'literacy', n:{en:'Programmes', ms:'Program'}, has:(tp) => tp.pages.includes('literacy')},
    {k:'plan', n:{en:'Plan & KPIs', ms:'Pelan & KPI'}, has:(tp) => tp.pages.includes('plan')},
    {k:'blueprint', n:{en:'Blueprint', ms:'Pelan teknikal'}, has:(tp) => tp.pages.includes('blueprint')}
  ];
  /* the site's highlight vocabulary, applied to topic text: key figures and TH terms */
  const hl = (s) => esc(s)
    .replace(/(RM[\d,.]+(?: (?:million|juta))?|9\.7 (?:million|juta)|31,600|18%|31 (?:December|Disember) 2028)/g, '<span class="kw">$1</span>')
    .replace(/((?:Seruan |Tabung )?Istito&#39;ah|istito&#39;ah)/g, '<span class="term">$1</span>');
  const tx = (o) => `<span lang="en">${hl(o.en)}</span><span lang="ms">${hl(o.ms || o.en)}</span>`;
  const probName = (n) => TH.T('Problem ', 'Masalah ') + n;

  function drawCoverage() {
    $('#coverage').innerHTML = `<table class="cov"><thead><tr><th scope="col">${t({en:'Topic', ms:'Topik'})}</th>` +
      COVER.map((c, j) => `<th scope="col" class="${j === 2 ? 'cov-split' : ''}"><span>${t(c.n)}</span></th>`).join('') + '</tr></thead><tbody>' +
      TH.TOPICS.map((tp, i) => `<tr data-id="${tp.id}" tabindex="0"><th scope="row"><b>${i + 1}</b> ${t(TH.TOPIC_KINDS[tp.kind])}</th>` +
        COVER.map((c, j) => `<td class="${j === 2 ? 'cov-split' : ''}">${c.has(tp) ? `<i class="dot on" aria-label="${esc(TH.T('yes', 'ya'))}"></i>` : '<i class="dot" aria-hidden="true"></i>'}</td>`).join('') + '</tr>').join('') +
      `</tbody><tfoot><tr><th scope="row">${t({en:'Topics', ms:'Topik'})}</th>${COVER.map((c, j) => `<td class="${j === 2 ? 'cov-split' : ''}">${TH.TOPICS.filter(c.has).length}</td>`).join('')}</tr></tfoot></table>`;
    $$('#coverage tbody tr').forEach((tr) => {
      const go = () => { filter = 'all'; drawFilter(); drawTopics(); const el = $('#' + tr.dataset.id); if (el) { el.scrollIntoView({behavior:TH.reduceMotion ? 'auto' : 'smooth', block:'start'}); el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1400); } };
      tr.addEventListener('click', go);
      tr.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
  }
  function drawFilter() {
    const opts = [['all', {en:'All six', ms:'Semua enam'}], ['p1', {en:'Problem 1', ms:'Masalah 1'}], ['p2', {en:'Problem 2', ms:'Masalah 2'}], ['p3', {en:'Problem 3', ms:'Masalah 3'}], ['technical', TH.TOPIC_KINDS.technical]];
    $('#topicFilter').innerHTML = opts.map((o) => `<button type="button" data-f="${o[0]}" aria-pressed="${o[0] === filter}">${t(o[1])}</button>`).join('');
    $$('#topicFilter button').forEach((b) => b.addEventListener('click', () => { filter = b.dataset.f; drawFilter(); drawTopics(); }));
  }
  const shown = (tp) => filter === 'all' || (filter[0] === 'p' ? tp.problems.includes(+filter[1]) : tp.kind === filter);
  function drawTopics() {
    $('#topics').innerHTML = TH.TOPICS.map((tp, i) => !shown(tp) ? '' :
      `<li class="topic" id="${tp.id}"><div class="topic-top"><span class="topic-n">${i + 1}</span><span class="tag tag-kind">${t(TH.TOPIC_KINDS[tp.kind])}</span>` +
      tp.problems.slice().sort().map((n) => `<span class="tag tag-problem">${esc(probName(n))}</span>`).join('') +
      `<button class="btn btn-ghost btn-sm topic-copy" type="button" data-i="${i}">${t({en:'Copy text', ms:'Salin teks'})}</button></div>` +
      `<h3>${tx(tp.title)}</h3>` +
      `<p class="label">${t({en:'Problem statement', ms:'Pernyataan masalah'})}</p><p class="topic-ps">${tx(tp.ps)}</p>` +
      `<p class="label">${t({en:'Research questions', ms:'Soalan kajian'})}</p><ol class="rqs">${tp.rq.map((q, k) => `<li><span class="rq-n">RQ${k + 1}</span><span>${tx(q)}</span></li>`).join('')}</ol>` +
      `<dl class="topic-meta"><div><dt>${t({en:'Method', ms:'Kaedah'})}</dt><dd>${tx(tp.method)}</dd></div>` +
      `<div><dt>${t({en:'Data', ms:'Data'})}</dt><dd>${tx(tp.data)}</dd></div>` +
      `<div><dt>${t({en:'Builds on', ms:'Dibina di atas'})}</dt><dd>${tp.pages.map((id) => { const p = PAGE_NAME(id); return p ? `<a class="chip brand" href="${p.href}">${t(p.label)}</a>` : ''; }).join(' ')}</dd></div>` +
      `<div><dt>${t({en:'Expertise', ms:'Kepakaran'})}</dt><dd>${tx(tp.expertise)}</dd></div>` +
      `<div class="wide"><dt>${t({en:'Expected output', ms:'Hasil dijangka'})}</dt><dd>${tx(tp.output)}</dd></div></dl></li>`).join('');
    $$('#topics .topic-copy').forEach((b) => b.addEventListener('click', () => copyTopic(TH.TOPICS[+b.dataset.i], b)));
  }
  function copyTopic(tp, btn) {
    const txt = [L(tp.title), '', TH.T('Problem statement', 'Pernyataan masalah'), L(tp.ps), '', TH.T('Research questions', 'Soalan kajian')]
      .concat(tp.rq.map((q, k) => 'RQ' + (k + 1) + ': ' + L(q)))
      .concat(['', TH.T('Method: ', 'Kaedah: ') + L(tp.method), TH.T('Data: ', 'Data: ') + L(tp.data), TH.T('Expertise: ', 'Kepakaran: ') + L(tp.expertise), TH.T('Expected output: ', 'Hasil dijangka: ') + L(tp.output)]).join('\n');
    const done = () => { const old = btn.innerHTML; btn.textContent = TH.T('Copied', 'Disalin'); setTimeout(() => { btn.innerHTML = old; }, 1500); };
    const fallback = () => { const ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e) {} ta.remove(); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, fallback); else fallback();
  }
  const all = () => { drawCoverage(); drawFilter(); drawTopics(); };
  all(); TH.onLang.push(all);
};

/* ======================================================================
   Notes: print
   ====================================================================== */
TH.pageInit.notes = function () {
  const b = $('#printBtn'); if (b) b.addEventListener('click', () => window.print());
};

})(window.TH);
