/* ==========================================================================
   Istito'ah Tracker: Lottie animations
   Small Lottie (bodymovin 5.x) animations kept as JS objects so the site runs
   from file:// with no fetch(). Layers carry a class (cl) so th.css can
   recolour them from the theme tokens (.lt-brand-*, .lt-gold-*, .lt-ink-*).
     live   : a pulse, used where the page shows live (synthetic) data
     star   : the khatam star drawing itself, then settling
     coin   : a coin dropping into a Tabung (savings box)
     check  : a tick drawn once, for a milestone reached
   TH.lottie(el, nameOrPath, opts) plays one. A path ending in .json loads a
   file instead (e.g. one downloaded from lottiefiles.com into assets/lottie/);
   that needs http(s), not file://. Under reduced motion the last frame shows,
   still. Any element with data-lottie="name" is started automatically.
   ========================================================================== */
(function (TH) {
'use strict';

var OUT = {x:[0.16], y:[1]}, IN = {x:[0.5], y:[0]};
var OUT2 = {x:[0.16, 0.16], y:[1, 1]}, IN2 = {x:[0.5, 0.5], y:[0, 0]};
var WHITE = {a:0, k:[1, 1, 1, 1]}, GREEN = {a:0, k:[0.04, 0.42, 0.3, 1]}, GOLD = {a:0, k:[0.79, 0.58, 0.09, 1]};
function tr(r) { return {ty:'tr', p:{a:0, k:[0, 0]}, a:{a:0, k:[0, 0]}, s:{a:0, k:[100, 100]}, r:r || {a:0, k:0}, o:{a:0, k:100}}; }
function ks(p, o, s, r) { return {o:o || {a:0, k:100}, r:r || {a:0, k:0}, p:{a:0, k:p}, a:{a:0, k:[0, 0, 0]}, s:s || {a:0, k:[100, 100, 100]}}; }
function layer(ind, nm, cl, k, shapes, op) { return {ddd:0, ind:ind, ty:4, nm:nm, cl:cl, sr:1, ks:k, shapes:shapes, ip:0, op:op, st:0, bm:0}; }
function fill(c) { return {ty:'fl', c:c, o:{a:0, k:100}, r:1}; }
function stroke(c, w) { return {ty:'st', c:c, o:{a:0, k:100}, w:{a:0, k:w}, lc:2, lj:2, ml:4}; }
function trim(t0, t1) { return {ty:'tm', s:{a:0, k:0}, e:{a:1, k:[{t:t0, s:[0], i:OUT, o:IN}, {t:t1, s:[100]}]}, o:{a:0, k:0}, m:1}; }
function rect(w, h, r) { return {ty:'rc', d:1, p:{a:0, k:[0, 0]}, s:{a:0, k:[w, h]}, r:{a:0, k:r || 0}}; }
function path(v, closed) {
  var z = v.map(function () { return [0, 0]; });
  return {ty:'sh', ks:{a:0, k:{i:z, o:z, v:v, c:!!closed}}};
}

function ring(ind, start) {
  var end = start + 60;
  return layer(ind, 'Ring ' + ind, 'lt-brand-stroke',
    ks([24, 24, 0], {a:1, k:[{t:start, s:[80], i:OUT, o:IN}, {t:end, s:[0]}]}),
    [{ty:'gr', nm:'Ring', it:[
      {ty:'el', d:1, p:{a:0, k:[0, 0]}, s:{a:1, k:[{t:start, s:[12, 12], i:OUT2, o:IN2}, {t:end, s:[46, 46]}]}},
      stroke(GREEN, 2), tr()]}], 90);
}

var A = {
  live: {v:'5.7.4', fr:30, ip:0, op:90, w:48, h:48, nm:'Live', ddd:0, assets:[], layers:[
    layer(1, 'Dot', 'lt-brand-fill', ks([24, 24, 0]), [{ty:'gr', nm:'Dot', it:[{ty:'el', d:1, p:{a:0, k:[0, 0]}, s:{a:0, k:[14, 14]}}, fill(GREEN), tr()]}], 90),
    ring(2, 0), ring(3, 30)
  ]},

  /* Two squares trace themselves (the second 45° turned), then the star turns 45° and the gold centre lands. */
  star: {v:'5.7.4', fr:30, ip:0, op:72, w:64, h:64, nm:'Khatam', ddd:0, assets:[], layers:[
    layer(1, 'Centre', 'lt-gold-fill', ks([32, 32, 0], null, {a:1, k:[{t:34, s:[0, 0, 100], i:{x:[0.3, 0.3, 0.3], y:[1.5, 1.5, 1]}, o:{x:[0.5, 0.5, 0.5], y:[0, 0, 0]}}, {t:52, s:[100, 100, 100]}]}),
      [{ty:'gr', nm:'C', it:[{ty:'el', d:1, p:{a:0, k:[0, 0]}, s:{a:0, k:[11, 11]}}, fill(GOLD), tr()]}], 72),
    layer(2, 'Star', 'lt-brand-stroke', ks([32, 32, 0], null, null, {a:1, k:[{t:30, s:[0], i:OUT, o:IN}, {t:66, s:[45]}]}), [
      {ty:'gr', nm:'Square A', it:[rect(36, 36, 3), stroke(GREEN, 3), trim(0, 30), tr()]},
      {ty:'gr', nm:'Square B', it:[rect(36, 36, 3), stroke(GREEN, 3), trim(8, 38), tr({a:0, k:45})]}
    ], 72)
  ]},

  /* A coin drops through the slot of a savings box; the box gives a small bounce. Loops. */
  coin: {v:'5.7.4', fr:30, ip:0, op:60, w:64, h:64, nm:'Tabung', ddd:0, assets:[], layers:[
    layer(1, 'Box', 'lt-brand-stroke', ks([32, 42, 0], null, {a:1, k:[{t:22, s:[100, 100, 100], i:{x:[0.3, 0.3, 0.3], y:[1, 1, 1]}, o:{x:[0.5, 0.5, 0.5], y:[0, 0, 0]}}, {t:27, s:[104, 94, 100], i:{x:[0.3, 0.3, 0.3], y:[1, 1, 1]}, o:{x:[0.5, 0.5, 0.5], y:[0, 0, 0]}}, {t:36, s:[100, 100, 100]}]}), [
      {ty:'gr', nm:'Body', it:[rect(40, 26, 5), stroke(GREEN, 3), tr()]},
      {ty:'gr', nm:'Slot', it:[path([[-7, -13], [7, -13]]), stroke(GREEN, 3), tr()]},
      {ty:'gr', nm:'Band', it:[path([[-20, -1], [20, -1]]), stroke(GREEN, 2), tr()]}
    ], 60),
    layer(2, 'Coin', 'lt-gold-fill', {o:{a:1, k:[{t:0, s:[100], i:OUT, o:IN}, {t:18, s:[100], i:OUT, o:IN}, {t:22, s:[0], i:OUT, o:IN}, {t:36, s:[0], i:OUT, o:IN}, {t:46, s:[100]}]}, r:{a:0, k:0},
      p:{a:1, k:[{t:0, s:[32, 12, 0], i:{x:0.6, y:0}, o:{x:0.6, y:0}, ti:[0, 0, 0], to:[0, 0, 0]}, {t:20, s:[32, 30, 0], h:1}, {t:36, s:[32, 4, 0], i:{x:0.2, y:1}, o:{x:0.4, y:0}, ti:[0, 0, 0], to:[0, 0, 0]}, {t:46, s:[32, 12, 0]}]}, a:{a:0, k:[0, 0, 0]}, s:{a:0, k:[100, 100, 100]}},
      [{ty:'gr', nm:'C', it:[{ty:'el', d:1, p:{a:0, k:[0, 0]}, s:{a:0, k:[14, 14]}}, fill(GOLD), tr()]}], 60)
  ]},

  check: {v:'5.7.4', fr:30, ip:0, op:36, w:48, h:48, nm:'Done', ddd:0, assets:[], layers:[
    layer(1, 'Tick', 'lt-white-stroke', ks([24, 24, 0]), [{ty:'gr', nm:'Tick', it:[path([[-8, 1], [-2.5, 6.5], [9, -6]]), stroke(WHITE, 3.4), trim(12, 30), tr()]}], 36),
    layer(2, 'Disc', 'lt-brand-fill', ks([24, 24, 0], null, {a:1, k:[{t:0, s:[0, 0, 100], i:{x:[0.3, 0.3, 0.3], y:[1.4, 1.4, 1]}, o:{x:[0.5, 0.5, 0.5], y:[0, 0, 0]}}, {t:16, s:[100, 100, 100]}]}),
      [{ty:'gr', nm:'D', it:[{ty:'el', d:1, p:{a:0, k:[0, 0]}, s:{a:0, k:[36, 36]}}, fill(GREEN), tr()]}], 36)
  ]}
};
var LOOP = {live:true, coin:true};

TH.lottie = function (el, name, opts) {
  opts = opts || {};
  if (!el || !window.lottie) return null;
  var file = /\.json$/i.test(name);
  if (!file && !A[name]) return null;
  if (el._lt) { el._lt.destroy(); el._lt = null; }
  el.classList.add('lt');
  var anim = window.lottie.loadAnimation({
    container: el, renderer: 'svg',
    loop: TH.reduceMotion ? false : (opts.loop != null ? opts.loop : !!LOOP[name]),
    autoplay: !TH.reduceMotion && opts.autoplay !== false,
    animationData: file ? undefined : JSON.parse(JSON.stringify(A[name])),
    path: file ? name : undefined,
    rendererSettings: {preserveAspectRatio: 'xMidYMid meet', progressiveLoad: true}
  });
  if (TH.reduceMotion) anim.addEventListener('DOMLoaded', function () { anim.goToAndStop(anim.totalFrames - 1, true); });
  el._lt = anim;
  return anim;
};
TH.lottieInit = function () {
  TH.$$('[data-lottie]').forEach(function (el) {
    var n = el.getAttribute('data-lottie');
    if (el.hasAttribute('data-lottie-visible') && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { TH.lottie(el, n); io.disconnect(); } });
      }, {threshold: .6});
      io.observe(el);
    } else TH.lottie(el, n);
  });
};

})(window.TH);
