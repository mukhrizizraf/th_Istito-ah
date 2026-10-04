/* ==========================================================================
   Istito'ah Tracker: shared shell
   Placed as the FIRST child of <body data-page="…">. Injects the top bar and
   page drawer at once (no layout jump), then on DOMContentLoaded adds the
   pager, footer and tooltip, runs the page's init (th-pages.js) and wires
   language (EN / BM), theme and arrow-key paging.
   Bilingual static copy is written as sibling <span lang="en"> / <span
   lang="ms"> pairs; CSS hides the inactive one. Charts and selects that
   cannot hold spans re-render through TH.onLang.
   ========================================================================== */
(function (TH) {
'use strict';
var doc = document, body = doc.body, root = doc.documentElement;

/* ---------- Helpers ---------- */
TH.$ = function (s, r) { return (r || doc).querySelector(s); };
TH.$$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
TH.esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
TH.store = {
  get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
TH.reduceMotion = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
TH.lang = root.getAttribute('data-lang') === 'ms' ? 'ms' : 'en';
TH.L = function (v) { return v == null ? '' : typeof v === 'string' ? v : (v[TH.lang] || v.en); };
TH.t = function (v) { return typeof v === 'string' ? TH.esc(v) : '<span lang="en">' + TH.esc(v.en) + '</span><span lang="ms">' + TH.esc(v.ms || v.en) + '</span>'; };
TH.T = function (en, ms) { return TH.lang === 'ms' ? ms : en; };
TH.nf = function (n) { return Math.round(n).toLocaleString(TH.lang === 'ms' ? 'ms-MY' : 'en-MY'); };
TH.pct = function (x, d) { return (x * 100).toFixed(d == null ? 0 : d) + '%'; };
TH.rm = function (n) { return 'RM' + TH.nf(n); };
TH.onLang = [];
TH.pageInit = {};

TH.page = body.getAttribute('data-page') || 'overview';
TH.pageIndex = 0;
TH.PAGES.forEach(function (p, i) { if (p.id === TH.page) TH.pageIndex = i; });

/* ---------- Icons (24px grid, 1.8 stroke) ---------- */
var ICON = {
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  close:'<path d="M6 6l12 12M18 6 6 18"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5V5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/>',
  moon:'<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
  right:'<path d="M5 12h13M13 6l6 6-6 6"/>',
  left:'<path d="M19 12H6M11 6l-6 6 6 6"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.2"/>',
  ok:'<path d="M6.5 12.5l3.5 3.5 7.5-8"/>',
  warn:'<path d="M12 7.5v5.5M12 16.4v.2"/>',
  crit:'<path d="M8 8l8 8M16 8l-8 8"/>',
  print:'<path d="M7 9V3.5h10V9M7 17H4.5V10.5a1.5 1.5 0 0 1 1.5-1.5h12a1.5 1.5 0 0 1 1.5 1.5V17H17"/><path d="M7 14h10v6.5H7z"/>',
  coin:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M9.5 9.8c0-1.2 1.1-1.8 2.5-1.8s2.5.6 2.5 1.7c0 2.6-5 1.6-5 4.3 0 1.1 1.1 1.8 2.5 1.8s2.5-.6 2.5-1.8"/>'
};
TH.icon = function (n) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[n] + '</svg>'; };

/* ---------- Info notes: "i" buttons with a short explanation ---------- */
TH.present = (function () { try { return /[?&]present\b/.test(location.search) || localStorage.getItem('th-present') === '1'; } catch (e) { return false; } }());
function infoLabel(key) { var it = TH.INFO && TH.INFO[key]; return it ? TH.T('About: ', 'Tentang: ') + TH.L(it.t) : ''; }
TH.info = function (key) {
  if (!TH.INFO || !TH.INFO[key]) return '';
  return '<button class="info-btn" type="button" data-key="' + key + '" aria-expanded="false" aria-controls="infoPop" aria-label="' + TH.esc(infoLabel(key)) + '">' + TH.icon('info') + '</button>';
};
TH.statusIcon = function (k) { return '<i aria-hidden="true"><svg viewBox="0 0 24 24" style="width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:3;stroke-linecap:round;stroke-linejoin:round">' + ICON[k === 'good' ? 'ok' : k === 'warn' ? 'warn' : 'crit'] + '</svg></i>'; };

/* One drawn icon per page; parts carry pathLength="1" so the head can draw them in. */
var PICON = {
  overview:'<path pathLength="1" d="M12 2.8l2.7 2.7h3.8v3.8l2.7 2.7-2.7 2.7v3.8h-3.8L12 21.2l-2.7-2.7H5.5v-3.8L2.8 12l2.7-2.7V5.5h3.8z"/><circle pathLength="1" cx="12" cy="12" r="3.2"/>',
  tracker:'<path pathLength="1" d="M3.5 16.5a8.5 8.5 0 0 1 17 0"/><path pathLength="1" d="M12 16.5l4-5.5"/><path pathLength="1" d="M3.5 20h17"/>',
  depositor:'<circle pathLength="1" cx="9" cy="7.5" r="3.2"/><path pathLength="1" d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><circle pathLength="1" cx="17.5" cy="15.5" r="3.5"/><path pathLength="1" d="M17.5 13.8v3.4"/>',
  plan:'<rect pathLength="1" x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path pathLength="1" d="M3.5 9.8h17M8 3v4M16 3v4"/><path pathLength="1" d="M8.5 14.8l2.3 2.2 4.7-4.6"/>',
  blueprint:'<rect pathLength="1" x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path pathLength="1" d="M3.5 9h17M10 9v11.5"/>',
  literacy:'<path pathLength="1" d="M12 6.5C9.8 5 6.6 4.5 3.5 5v13.5c3.1-.5 6.3 0 8.5 1.5 2.2-1.5 5.4-2 8.5-1.5V5c-3.1-.5-6.3 0-8.5 1.5z"/><path pathLength="1" d="M12 6.5V20"/>',
  notes:'<path pathLength="1" d="M6 3.5h8.5l4 4v13H6z"/><path pathLength="1" d="M14.5 3.5v4h4M9 12h7M9 15.5h7M9 9h3"/>',
  cost:'<rect pathLength="1" x="2.5" y="6" width="19" height="12" rx="2.5"/><circle pathLength="1" cx="12" cy="12" r="2.8"/><path pathLength="1" d="M6.5 9.5v5M17.5 9.5v5"/>'
};
TH.picon = function (id) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (PICON[id] || PICON.overview) + '</svg>'; };

/* Brand mark: khatam (8-point) star, the linework of the band. */
var MARK = '<svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true"><rect x="8" y="8" width="24" height="24" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="8" y="8" width="24" height="24" rx="2" fill="none" stroke="currentColor" stroke-width="2.2" transform="rotate(45 20 20)"/><circle cx="20" cy="20" r="4" fill="var(--gold)"/></svg>';
TH.MARK = MARK;

/* Co-branded lockup (SEFB, UUM with Lembaga Tabung Haji), on a light plate so both read in any theme. */
TH.LOCKUP = '<span class="lockup"><img src="assets/img/logo-sefb.png" width="105" height="30" alt="SEFB, Universiti Utara Malaysia"><i aria-hidden="true"></i><img src="assets/img/logo-th.png" width="76" height="26" alt="Lembaga Tabung Haji"></span>';

/* ---------- Top bar + drawer (immediately) ---------- */
function navLinks() {
  return TH.PAGES.map(function (p, i) {
    return '<a href="' + p.href + '"' + (i === TH.pageIndex ? ' aria-current="page"' : '') + ' title="' + TH.esc(TH.L(p.label)) + '">' + TH.t(p.nav || p.label) + '</a>';
  }).join('');
}
function drawerLinks() {
  return TH.PAGES.map(function (p, i) {
    return '<li><a href="' + p.href + '"' + (i === TH.pageIndex ? ' aria-current="page"' : '') + '><span class="n" aria-hidden="true">' + (i + 1) + '</span><b>' + TH.t(p.label) + '</b><span>' + TH.t(p.desc) + '</span></a></li>';
  }).join('');
}
var bar = '<a class="skip sr" href="#main">' + TH.t({en:'Skip to content', ms:'Langkau ke kandungan'}) + '</a>' +
  '<header class="topbar"><div class="wrap topbar-in">' +
  '<a class="brand" href="index.html" aria-label="' + TH.esc(TH.T('Istito\'ah Tracker: a proposal from SEFB, UUM to Lembaga Tabung Haji. Home', 'Penjejak Istito\'ah: cadangan SEFB, UUM kepada Lembaga Tabung Haji. Laman utama')) + '">' + TH.LOCKUP + '<span class="brand-text"><b>' + TH.t({en:'Istito\'ah Tracker', ms:'Penjejak Istito\'ah'}) + '</b><span>' + TH.t({en:'Proposal · SEFB to TH', ms:'Cadangan · SEFB kepada TH'}) + '</span></span></a>' +
  '<nav class="nav" aria-label="Pages">' + navLinks() + '</nav>' +
  '<button class="bar-btn lang-btn" type="button" aria-label="Bahasa / Language"><span class="lang-code"></span></button>' +
  '<button class="bar-btn theme-btn" type="button"></button>' +
  '<button class="bar-btn menu-btn" type="button" aria-expanded="false" aria-controls="drawer" aria-label="Menu">' + TH.icon('menu') + '</button>' +
  '</div></header>' +
  '<div class="drawer" id="drawer" aria-hidden="true"><div class="drawer-scrim" data-close></div>' +
  '<div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Pages"><div class="drawer-head"><b>' + TH.t({en:'All pages', ms:'Semua halaman'}) + '</b>' +
  '<button class="bar-btn" type="button" data-close aria-label="Close">' + TH.icon('close') + '</button></div>' +
  '<ul class="drawer-list">' + drawerLinks() + '</ul></div></div>';
body.insertAdjacentHTML('afterbegin', bar);

/* ---------- Language ---------- */
function applyLang() {
  root.setAttribute('data-lang', TH.lang);
  root.setAttribute('lang', TH.lang === 'ms' ? 'ms' : 'en');
  var b = TH.$('.lang-btn .lang-code');
  if (b) b.textContent = TH.lang === 'ms' ? 'EN' : 'BM';
  var lb = TH.$('.lang-btn');
  if (lb) lb.setAttribute('title', TH.lang === 'ms' ? 'Switch to English' : 'Tukar ke Bahasa Melayu');
  TH.$$('[data-aria-en]').forEach(function (el) { el.setAttribute('aria-label', el.getAttribute(TH.lang === 'ms' ? 'data-aria-ms' : 'data-aria-en')); });
  TH.$$('.info-btn').forEach(function (b) { b.setAttribute('aria-label', infoLabel(b.getAttribute('data-key'))); });
  if (TH.closeInfo) TH.closeInfo();
  var pb = TH.$('.present-btn'); if (pb) paintPresent();
  var dt = body.getAttribute('data-title-' + TH.lang);
  if (dt) doc.title = dt;
}
TH.setLang = function (l) {
  TH.lang = l; TH.store.set('th-lang', l); applyLang();
  TH.onLang.forEach(function (f) { try { f(); } catch (e) { console.error(e); } });
};

/* ---------- Theme ---------- */
function isDark() {
  var t = root.getAttribute('data-theme');
  if (t) return t === 'dark';
  return !!(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
}
function paintThemeBtn() {
  var b = TH.$('.theme-btn'); if (!b) return;
  var d = isDark();
  b.innerHTML = TH.icon(d ? 'sun' : 'moon');
  b.setAttribute('aria-label', d ? TH.T('Light mode', 'Mod cerah') : TH.T('Dark mode', 'Mod gelap'));
}
TH.onTheme = [];
TH.isDark = isDark;
function paintPresent() {
  var b = TH.$('.present-btn'); if (!b) return;
  b.setAttribute('aria-pressed', TH.present ? 'true' : 'false');
  b.textContent = TH.present ? TH.T('Presenter notes: on', 'Nota pembentang: hidup') : TH.T('Presenter notes: off', 'Nota pembentang: mati');
  root.classList.toggle('presenting', !!TH.present);
}

/* ---------- Drawer ---------- */
var drawer = TH.$('#drawer'), menuBtn = TH.$('.menu-btn'), lastFocus = null;
function openDrawer(o) {
  drawer.classList.toggle('open', o);
  drawer.setAttribute('aria-hidden', o ? 'false' : 'true');
  menuBtn.setAttribute('aria-expanded', o ? 'true' : 'false');
  if (o) { lastFocus = doc.activeElement; var c = TH.$('[aria-current="page"]', drawer) || TH.$('a', drawer); setTimeout(function () { c && c.focus(); }, 60); }
  else if (lastFocus) lastFocus.focus();
}

/* ---------- Tooltip ---------- */
var tip;
TH.tip = {
  show: function (html, x, y) {
    if (!tip) return;
    tip.innerHTML = html; tip.classList.add('on');
    var w = tip.offsetWidth, h = tip.offsetHeight, vw = innerWidth, vh = innerHeight;
    var left = x + 14, top = y - h - 12;
    if (left + w > vw - 8) left = x - w - 14;
    if (left < 8) left = 8;
    if (top < 8) top = y + 16;
    if (top + h > vh - 8) top = vh - h - 8;
    tip.style.left = left + 'px'; tip.style.top = top + 'px';
  },
  hide: function () { if (tip) tip.classList.remove('on'); }
};

/* ---------- Page transitions: direction for the view transition ---------- */
function go(href, dir) {
  root.setAttribute('data-dir', dir < 0 ? 'back' : 'forward');
  location.href = href;
}

doc.addEventListener('DOMContentLoaded', function () {
  /* info buttons on marked elements (a label gets its button just after it) */
  TH.$$('[data-info]').forEach(function (el) {
    var html = TH.info(el.getAttribute('data-info'));
    if (el.tagName === 'LABEL') el.insertAdjacentHTML('afterend', html); else el.insertAdjacentHTML('beforeend', html);
  });

  /* page head icon */
  TH.$$('[data-picon]').forEach(function (el) { el.innerHTML = TH.picon(el.getAttribute('data-picon')); });

  /* official sources: links and the source list */
  TH.$$('a[data-src]').forEach(function (a) { var s = TH.SRC && TH.SRC[a.getAttribute('data-src')]; if (s) a.href = s.url; });
  TH.$$('.src-list').forEach(function (ul) {
    ul.innerHTML = Object.keys(TH.SRC || {}).map(function (k) { var s = TH.SRC[k]; return '<li><a href="' + s.url + '" target="_blank" rel="noopener">' + TH.t(s.name) + '</a></li>'; }).join('');
  });

  /* pager + footer */
  var prev = TH.PAGES[TH.pageIndex - 1], next = TH.PAGES[TH.pageIndex + 1];
  var pager = '<nav class="wrap pager" aria-label="' + TH.T('Previous and next page', 'Halaman sebelum dan seterusnya') + '">' +
    (prev ? '<a class="prev" href="' + prev.href + '" data-dir="-1"><small>' + TH.t({en:'Previous', ms:'Sebelum'}) + '</small><b>' + TH.t(prev.label) + '</b><span>' + TH.t(prev.desc) + '</span></a>' : '') +
    (next ? '<a class="next" href="' + next.href + '" data-dir="1"><small>' + TH.t({en:'Next', ms:'Seterusnya'}) + '</small><b>' + TH.t(next.label) + '</b><span>' + TH.t(next.desc) + '</span></a>' : '') +
    '</nav>';
  var flink = function (p) { return '<li><a href="' + p.href + '"' + (p.id === TH.page ? ' aria-current="page"' : '') + '>' + TH.t(p.label) + '</a></li>'; };
  var footer = '<footer class="site-foot"><div class="wrap">' +
    '<div class="foot-grid">' +
      '<div class="foot-brand">' + MARK + '<div><b>' + TH.t({en:'Istito\'ah Tracker', ms:'Penjejak Istito\'ah'}) + '</b>' +
        '<p>' + TH.t({en:'A working proposal that shows how ready Tabung Haji depositors are for Hajj, measured against TH\'s own amounts, and which literacy programmes move them.', ms:'Cadangan berfungsi yang menunjukkan tahap kesediaan pendeposit Tabung Haji untuk menunaikan haji, diukur berbanding amaun TH sendiri, dan program literasi yang menggerakkan mereka.'}) + '</p>' + TH.LOCKUP + '</div></div>' +
      '<nav class="foot-col" aria-label="' + TH.esc(TH.T('Dashboard pages', 'Halaman papan pemuka')) + '"><p class="foot-h">' + TH.t({en:'Dashboard', ms:'Papan pemuka'}) + '</p><ul>' + TH.PAGES.slice(0, 4).map(flink).join('') + '</ul></nav>' +
      '<nav class="foot-col" aria-label="' + TH.esc(TH.T('Proposal pages', 'Halaman cadangan')) + '"><p class="foot-h">' + TH.t({en:'Proposal', ms:'Cadangan'}) + '</p><ul>' + TH.PAGES.slice(4).map(flink).join('') + '</ul></nav>' +
      '<div class="foot-col"><p class="foot-h">' + TH.t({en:'About', ms:'Perihal'}) + '</p><ul class="foot-facts">' +
        '<li>' + TH.t({en:'12 months, proposed', ms:'12 bulan, dicadangkan'}) + '</li>' +
        '<li>' + TH.t({en:'SEFB, UUM, with RMC', ms:'SEFB, UUM, bersama RMC'}) + '</li>' +
        '<li>' + TH.t({en:'For Lembaga Tabung Haji', ms:'Untuk Lembaga Tabung Haji'}) + '</li>' +
        '<li>' + TH.t({en:'TH figures for 1448H/2027M', ms:'Angka TH bagi 1448H/2027M'}) + '</li></ul></div>' +
    '</div>' +
    '<div class="foot-bar"><span>' + TH.t({en:'Draft proposal by the School of Economics, Finance and Banking (SEFB), Universiti Utara Malaysia. Not an official Lembaga Tabung Haji product. Dashboard figures are synthetic.', ms:'Draf cadangan oleh Pusat Pengajian Ekonomi, Kewangan dan Perbankan (SEFB), Universiti Utara Malaysia. Bukan produk rasmi Lembaga Tabung Haji. Angka papan pemuka adalah sintetik.'}) + '</span>' +
      '<span class="foot-tools"><button class="present-btn" type="button" aria-pressed="false"></button><span>' + TH.t({en:'Page', ms:'Halaman'}) + ' ' + (TH.pageIndex + 1) + ' / ' + TH.PAGES.length + '</span><span><kbd>←</kbd> <kbd>→</kbd> ' + TH.t({en:'move between pages', ms:'beralih halaman'}) + '</span></span></div>' +
    '</div></footer>';
  var main = TH.$('#main');
  main.insertAdjacentHTML('beforeend', pager);
  main.insertAdjacentHTML('afterend', footer);

  tip = doc.createElement('div'); tip.className = 'tip'; tip.setAttribute('role', 'status'); body.appendChild(tip);

  /* info popover (one, shared) */
  var pop = doc.createElement('div'); pop.className = 'info-pop'; pop.id = 'infoPop'; pop.setAttribute('role', 'dialog'); pop.hidden = true; body.appendChild(pop);
  var openBtn = null;
  TH.closeInfo = function (refocus) {
    if (!openBtn) return;
    pop.hidden = true; openBtn.setAttribute('aria-expanded', 'false');
    if (refocus) openBtn.focus();
    openBtn = null;
  };
  function openInfo(btn) {
    var it = TH.INFO[btn.getAttribute('data-key')]; if (!it) return;
    TH.closeInfo();
    pop.innerHTML = '<b class="ip-t">' + TH.esc(TH.L(it.t)) + '</b><p class="ip-d">' + TH.esc(TH.L(it.d)) + '</p>' +
      (TH.present && it.p ? '<p class="ip-p"><span>' + TH.esc(TH.T('Pitch tip', 'Tip pembentangan')) + '</span>' + TH.esc(TH.L(it.p)) + '</p>' : '');
    pop.setAttribute('aria-label', TH.L(it.t));
    pop.hidden = false; btn.setAttribute('aria-expanded', 'true'); openBtn = btn;
    var r = btn.getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight;
    var left = Math.min(Math.max(12, r.left + r.width / 2 - 24), innerWidth - w - 12);
    var top = r.bottom + 8; if (top + h > innerHeight - 12 && r.top - h - 8 > 12) top = r.top - h - 8;
    pop.style.left = (left + scrollX) + 'px'; pop.style.top = (top + scrollY) + 'px';
  }
  doc.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.info-btn');
    if (b) { e.preventDefault(); e.stopPropagation(); if (openBtn === b) TH.closeInfo(); else openInfo(b); return; }
    if (openBtn && !pop.contains(e.target)) TH.closeInfo();
  }, true);
  addEventListener('resize', function () { TH.closeInfo(); });

  /* events */
  TH.$('.lang-btn').addEventListener('click', function () { TH.setLang(TH.lang === 'ms' ? 'en' : 'ms'); });
  TH.$('.theme-btn').addEventListener('click', function () {
    var d = !isDark();
    root.setAttribute('data-theme', d ? 'dark' : 'light'); TH.store.set('th-theme', d ? 'dark' : 'light');
    paintThemeBtn(); TH.onTheme.forEach(function (f) { f(); });
  });
  menuBtn.addEventListener('click', function () { openDrawer(!drawer.classList.contains('open')); });
  TH.$$('[data-close]', drawer).forEach(function (el) { el.addEventListener('click', function () { openDrawer(false); }); });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('open')) { openDrawer(false); return; }
    if (e.key === 'Escape' && TH.closeInfo) TH.closeInfo(true);
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    var t = e.target, tag = t && t.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || (t && t.isContentEditable) || drawer.classList.contains('open')) return;
    if (t && t.closest && t.closest('[role="toolbar"],[role="radiogroup"],.seg,svg')) return;
    if (e.key === 'ArrowRight' && next) go(next.href, 1);
    if (e.key === 'ArrowLeft' && prev) go(prev.href, -1);
  });
  TH.$$('.pager a').forEach(function (a) { a.addEventListener('click', function () { root.setAttribute('data-dir', a.getAttribute('data-dir') === '-1' ? 'back' : 'forward'); }); });
  if (window.matchMedia) {
    var mq = matchMedia('(prefers-color-scheme: dark)');
    var onMq = function () { if (!root.getAttribute('data-theme')) { paintThemeBtn(); TH.onTheme.forEach(function (f) { f(); }); } };
    mq.addEventListener ? mq.addEventListener('change', onMq) : mq.addListener(onMq);
  }

  TH.$('.present-btn').addEventListener('click', function () {
    TH.present = !TH.present; TH.store.set('th-present', TH.present ? '1' : '0'); paintPresent(); TH.closeInfo();
  });
  applyLang(); paintThemeBtn(); paintPresent();
  var init = TH.pageInit[TH.page];
  if (init) init();
  if (TH.lottieInit) TH.lottieInit();
});

})(window.TH);
