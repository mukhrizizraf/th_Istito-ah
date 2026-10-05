/* ==========================================================================
   Istito'ah Tracker: content, official policy figures and synthetic data
   Everything bilingual is {en, ms}.
   TH.POLICY holds figures published by Lembaga Tabung Haji (see TH.SRC).
   Every depositor figure the dashboard draws comes from the seeded model at
   the bottom: it is SYNTHETIC and labelled so wherever it appears.
   ========================================================================== */
window.TH = window.TH || {};
(function (TH) {
'use strict';

/* ---------- Site map (order = proposal order) ---------- */
TH.PAGES = [
  {id:'overview', href:'index.html', nav:{en:'Overview', ms:'Gambaran'}, label:{en:'Overview', ms:'Gambaran'},
   desc:{en:'The proposal in brief: why, what and who.', ms:'Ringkasan cadangan: kenapa, apa dan siapa.'}},
  {id:'cost', href:'cost.html', nav:{en:'Cost', ms:'Kos'}, label:{en:'Cost & policy', ms:'Kos & dasar'},
   desc:{en:'TH\'s official Hajj cost and payment rules, read critically.', ms:'Kos haji dan peraturan bayaran rasmi TH, dinilai secara kritis.'}},
  {id:'tracker', href:'tracker.html', nav:{en:'Tracker', ms:'Penjejak'}, label:{en:'Readiness tracker', ms:'Penjejak kesediaan'},
   desc:{en:'The proof-of-concept dashboard, on synthetic data.', ms:'Papan pemuka bukti konsep, dengan data sintetik.'}},
  {id:'depositor', href:'depositor.html', nav:{en:'Depositor', ms:'Pendeposit'}, label:{en:'Try a depositor', ms:'Cuba pendeposit'},
   desc:{en:'See when one depositor reaches RM15,000 and their own payment.', ms:'Lihat bila seorang pendeposit mencapai RM15,000 dan bayaran hajinya.'}},
  {id:'plan', href:'plan.html', nav:{en:'Plan', ms:'Pelan'}, label:{en:'Phases & plan', ms:'Fasa & pelan'},
   desc:{en:'Three development phases, the KPI workshops and the timeline.', ms:'Tiga fasa pembangunan, bengkel KPI dan garis masa.'}},
  {id:'literacy', href:'literacy.html', nav:{en:'Programmes', ms:'Program'}, label:{en:'Literacy programmes', ms:'Program literasi'},
   desc:{en:'Programmes that help depositors save every month, and how TH sees if they work.', ms:'Program yang membantu pendeposit menabung setiap bulan, dan cara TH melihat keberkesanannya.'}},
  {id:'notes', href:'notes.html', nav:{en:'Sources', ms:'Sumber'}, label:{en:'Sources & assumptions', ms:'Sumber & andaian'},
   desc:{en:'What is official, what is synthetic, and what TH must confirm.', ms:'Apa yang rasmi, apa yang sintetik, dan apa yang perlu disahkan TH.'}},
  {id:'topics', href:'topics.html', nav:{en:'Topics', ms:'Topik'}, label:{en:'Grant proposal topics', ms:'Topik cadangan geran'},
   desc:{en:'Six possible proposals from TH\'s problems, each with a problem statement and research questions.', ms:'Enam cadangan yang mungkin daripada masalah TH, setiap satu dengan pernyataan masalah dan soalan kajian.'}}
];
/* Colour themes (no blue). Each one has light and dark tokens in th.css under [data-palette]. */
TH.PALETTES = [
  {id:'th', name:{en:'TH green', ms:'Hijau TH'}, sw:['#0a6b4c', '#c99316', '#eef2ee']},
  {id:'sand', name:{en:'Desert sand', ms:'Pasir gurun'}, sw:['#9a5b1e', '#c99316', '#f4efe6']},
  {id:'kiswah', name:{en:'Kiswah black & gold', ms:'Kiswah hitam & emas'}, sw:['#1c1c1c', '#e0b03a', '#f1f0ec']},
  {id:'olive', name:{en:'Olive grove', ms:'Kebun zaitun'}, sw:['#5a6b1f', '#c99316', '#eff0e6']}
];
/* Pages kept out of the top bar: linked from the bottom of the overview and the footer */
TH.EXTRA_PAGES = [
  {id:'blueprint', href:'blueprint.html', label:{en:'Technical blueprint', ms:'Pelan teknikal'},
   desc:{en:'For IT teams and reviewers: layout, data architecture, ecosystem map.', ms:'Untuk pasukan IT dan penilai: susun atur, seni bina data, peta ekosistem.'}}
];

/* ---------- Official figures (Lembaga Tabung Haji) ---------- */
TH.SRC = {
  faq: {url:'https://assets.tabunghaji.gov.my/uploads/FINAL_FAQ_KOS_BAYARAN_DAN_BANTUAN_KEWANGAN_HAJI_1448_H_44323584e1.pdf',
    name:{en:'TH, FAQ on Hajj payment and financial assistance, 1448H/2027M (PDF)', ms:'TH, Soalan lazim bayaran haji & bantuan kewangan haji 1448H/2027M (PDF)'}},
  cost: {url:'https://www.tabunghaji.gov.my/bm/kos-haji-dan-bayaran',
    name:{en:'TH, "Kos Haji dan Bayaran" page: what the cost covers and the category rates', ms:'TH, halaman "Kos Haji dan Bayaran": skop kos dan kadar mengikut kategori'}},
  seruan: {url:'https://www.tabunghaji.gov.my/bm/seruanistitoah',
    name:{en:'TH, Seruan Istito\'ah: Pelan Persediaan Haji', ms:'TH, Seruan Istito\'ah: Pelan Persediaan Haji'}},
  profit: {url:'https://assets.tabunghaji.gov.my/uploads/SIMPANAN_18_MAC_2026_TABUNG_HAJI_CATAT_PRESTASI_TERBAIK_DALAM_LAPAN_TAHUN_UMUM_AGIHAN_KEUNTUNGAN_3_50_PERATUS_KEPADA_9_7_JUTA_PENDEPOSIT_223cb221b3.pdf',
    name:{en:'TH press release, 18 March 2026: 3.50% profit distribution for 2025 to 9.7 million depositors (PDF)', ms:'Siaran akhbar TH, 18 Mac 2026: agihan keuntungan 3.50% bagi 2025 kepada 9.7 juta pendeposit (PDF)'}},
  rtm: {url:'https://berita.rtm.gov.my/nasional/senarai-berita-nasional/senarai-artikel/th-perkenal-pelan-persediaan-haji-seruan-istitoah/',
    name:{en:'RTM, 11 September 2026: TH introduces the Hajj Preparation Plan, Seruan Istito\'ah', ms:'RTM, 11 September 2026: TH perkenal Pelan Persediaan Haji, Seruan Istito\'ah'}},
  tribune: {url:'https://malaysiatribune.news/th-lancar-pelan-persediaan-haji-seruan-istitoah-bantu-bakal-jemaah/',
    name:{en:'Malaysia Tribune, September 2026: deferment fell from nearly 50% to 18% after the RM15,000 minimum', ms:'Malaysia Tribune, September 2026: kadar penangguhan turun daripada hampir 50% kepada 18% selepas syarat RM15,000'}}
};
TH.POLICY = {
  season: '1448H/2027M',
  kosHaji: 33300,            // Muassasah, unchanged since 1445H/2024M (FAQ Q1)
  pay: {B40:15000, M40:23500, T20:33300, appeal:33300},   // FAQ Q2
  aid: {B40:{hafis:17300, gov:1000}, M40:{hafis:9800, gov:0}, T20:{hafis:0, gov:0}, appeal:{hafis:0, gov:0}},
  gate: 15000,               // offer letters need >= RM15,000 (FAQ Q3); automatic queue eligibility from 1 Jan 2029 (Seruan Istito'ah)
  deadline: {y:2028, m:12},  // registered depositors must reach the gate by 31 Dec 2028
  quota: 31600,              // FAQ Q4
  depositors: 9.7e6,         // press release, 18 Mar 2026
  profit: {y2025:3.50, y2024:3.25},
  hafisSeason: 234e6, hafisSince2001: 2.8e9,
  deferBefore: .5, deferAfter: .18,
  options: {B40:[16000, 17000, 18000, 19000, 25000, 30000, 33300], M40:[25000, 26000, 27000, 28000, 30000, 32000, 33300]}
};
TH.CATS = [
  {id:'B40', name:{en:'B40', ms:'B40'}, rule:{en:'Receives Sumbangan Tunai Rahmah (STR) or other government aid for B40', ms:'Penerima Sumbangan Tunai Rahmah (STR) atau bantuan Kerajaan lain bagi B40'}},
  {id:'M40', name:{en:'M40', ms:'M40'}, rule:{en:'Neither B40 nor T20', ms:'Bukan dalam kategori B40 dan T20'}},
  {id:'T20', name:{en:'T20', ms:'T20'}, rule:{en:'Individual income above RM15,000 a month', ms:'Pendapatan individu melebihi RM15,000 sebulan'}},
  {id:'appeal', name:{en:'Successful appeal', ms:'Rayuan berjaya'}, rule:{en:'Out-of-turn appeal that succeeds', ms:'Rayuan luar giliran yang berjaya'}}
];

/* ---------- The readiness ladder: anchored on TH's own figures ----------
   The brief's example milestones were 25%, 50% and 100% of the package.
   TH policy already fixes RM15,000 (45%) and RM23,500 (71%), so the working
   ladder keeps 25% and 100% and uses the policy amounts in between. */
TH.GATES = [
  {id:'g25', rm:8325, pct:25, target:40, name:{en:'25% of Kos Haji', ms:'25% Kos Haji'},
   role:{en:'Saving has started in earnest', ms:'Simpanan bermula dengan serius'}},
  {id:'g15', rm:15000, pct:45, target:25, name:{en:'RM15,000 gate', ms:'Ambang RM15,000'},
   role:{en:'Offer letter possible; automatic queue from 2029; full B40 payment', ms:'Layak surat tawaran; giliran automatik mulai 2029; bayaran penuh B40'}},
  {id:'g235', rm:23500, pct:71, target:17, name:{en:'M40 payment', ms:'Bayaran M40'},
   role:{en:'Covers the M40 Bayaran Haji', ms:'Menampung Bayaran Haji M40'}},
  {id:'g100', rm:33300, pct:100, target:12, name:{en:'Full Kos Haji', ms:'Kos Haji penuh'},
   role:{en:'What T20 and successful appeals pay', ms:'Bayaran T20 dan rayuan yang berjaya'}}
];
/* Balance bands between the ladder amounts (they move with the cost scenario) */
TH.bandNames = function (k) {
  var a = TH.GATES.map(function (g) { return TH.gateRM(g, k); }), f = function (x) { return x.toLocaleString('en-MY'); };
  return [
    {en:'Below RM' + f(a[0]), ms:'Bawah RM' + f(a[0])},
    {en:'RM' + f(a[0]) + ' – ' + f(a[1] - 1), ms:'RM' + f(a[0]) + ' – ' + f(a[1] - 1)},
    {en:'RM' + f(a[1]) + ' – ' + f(a[2] - 1), ms:'RM' + f(a[1]) + ' – ' + f(a[2] - 1)},
    {en:'RM' + f(a[2]) + ' – ' + f(a[3] - 1), ms:'RM' + f(a[2]) + ' – ' + f(a[3] - 1)},
    {en:'RM' + f(a[3]) + ' and above', ms:'RM' + f(a[3]) + ' ke atas'}
  ];
};

/* ---------- Dimensions ---------- */
// x,y = tile-grid position for the cartogram (Peninsula cols 0-3, East Malaysia cols 5-6)
TH.STATES = [
  {id:'PLS', name:{en:'Perlis', ms:'Perlis'}, w:.25, x:1, y:0},
  {id:'KDH', name:{en:'Kedah', ms:'Kedah'}, w:1.7, x:1, y:1},
  {id:'PNG', name:{en:'Penang', ms:'Pulau Pinang'}, w:.7, x:0, y:1},
  {id:'KTN', name:{en:'Kelantan', ms:'Kelantan'}, w:1.8, x:2, y:1},
  {id:'TRG', name:{en:'Terengganu', ms:'Terengganu'}, w:1.2, x:3, y:2},
  {id:'PRK', name:{en:'Perak', ms:'Perak'}, w:1.5, x:1, y:2},
  {id:'PHG', name:{en:'Pahang', ms:'Pahang'}, w:1.2, x:2, y:2},
  {id:'SGR', name:{en:'Selangor', ms:'Selangor'}, w:4.2, x:1, y:3},
  {id:'KUL', name:{en:'Kuala Lumpur', ms:'W.P. Kuala Lumpur'}, w:.9, x:2, y:3},
  {id:'PJY', name:{en:'Putrajaya', ms:'W.P. Putrajaya'}, w:.1, x:2, y:4},
  {id:'NSN', name:{en:'Negeri Sembilan', ms:'Negeri Sembilan'}, w:.6, x:1, y:4},
  {id:'MLK', name:{en:'Melaka', ms:'Melaka'}, w:.6, x:1, y:5},
  {id:'JHR', name:{en:'Johor', ms:'Johor'}, w:2.4, x:2, y:5},
  {id:'LBN', name:{en:'Labuan', ms:'W.P. Labuan'}, w:.06, x:5, y:2},
  {id:'SBH', name:{en:'Sabah', ms:'Sabah'}, w:1.3, x:6, y:2},
  {id:'SWK', name:{en:'Sarawak', ms:'Sarawak'}, w:.8, x:5, y:3}
];
TH.SEGMENTS = [
  {id:'youth', e:-.95, share:.28, regd:.18, name:{en:'Youth (18–29)', ms:'Belia (18–29)'}, short:{en:'Youth', ms:'Belia'}},
  {id:'family', e:-.3, share:.30, regd:.40, name:{en:'Young families (30–44)', ms:'Keluarga muda (30–44)'}, short:{en:'Families', ms:'Keluarga'}},
  {id:'mid', e:.4, share:.24, regd:.60, name:{en:'Mid-career (45–59)', ms:'Pertengahan kerjaya (45–59)'}, short:{en:'Mid-career', ms:'Pert. kerjaya'}},
  {id:'senior', e:.7, share:.18, regd:.68, name:{en:'60 and above', ms:'60 tahun ke atas'}, short:{en:'60+', ms:'60+'}}
];
// mix = synthetic share of each payment category in the channel
TH.CHANNELS = [
  {id:'pub', e:.5, share:.22, mix:[.25, .65, .10], name:{en:'Public-sector payroll', ms:'Potongan gaji sektor awam'}, short:{en:'Public payroll', ms:'Gaji awam'}},
  {id:'pvt', e:.2, share:.30, mix:[.30, .55, .15], name:{en:'Private & GLC payroll', ms:'Potongan gaji swasta & GLC'}, short:{en:'Private payroll', ms:'Gaji swasta'}},
  {id:'self', e:-.1, share:.20, mix:[.45, .45, .10], name:{en:'Self-employed', ms:'Bekerja sendiri'}, short:{en:'Self-employed', ms:'Kerja sendiri'}},
  {id:'irr', e:-.7, share:.28, mix:[.60, .37, .03], name:{en:'No regular deposit', ms:'Tiada simpanan tetap'}, short:{en:'Irregular', ms:'Tidak tetap'}}
];
TH.QUARTERS = [];
for (var yy = 2024; yy <= 2026; yy++) for (var qq = 1; qq <= 4; qq++) if (!(yy === 2026 && qq === 4))
  TH.QUARTERS.push({y:yy, q:qq, label:{en:'Q' + qq + ' ' + yy, ms:'S' + qq + ' ' + yy}, short:{en:'Q' + qq + " '" + String(yy).slice(2), ms:'S' + qq + " '" + String(yy).slice(2)}});
TH.RULE_START = 4;  // Q1 2025: the RM15,000 minimum for offer letters
TH.SERUAN_Q = 10;   // Q3 2026: Seruan Istito'ah plan announced (Sept 2026)
TH.METRICS = [
  {id:'g15', name:{en:'At or above RM15,000', ms:'RM15,000 ke atas'}, short:{en:'RM15k', ms:'RM15k'}},
  {id:'pay', name:{en:'Can cover own Bayaran Haji', ms:'Mampu menampung Bayaran Haji sendiri'}, short:{en:'Own payment', ms:'Bayaran sendiri'}},
  {id:'g100', name:{en:'At or above full Kos Haji', ms:'Kos Haji penuh ke atas'}, short:{en:'RM33.3k', ms:'RM33.3k'}},
  {id:'reg', name:{en:'Regular savers', ms:'Penyimpan tetap'}, short:{en:'Regular', ms:'Tetap'}}
];

/* ---------- Synthetic generator ----------
   Each cell (state x age group x category x quarter) holds a log-normal
   balance distribution; shares above any ringgit amount follow from it. */
function mulberry(seed) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function sig(x) { return 1 / (1 + Math.exp(-x)); }
function erf(x) { // Abramowitz-Stegun 7.1.26
  var s = x < 0 ? -1 : 1; x = Math.abs(x);
  var t = 1 / (1 + .3275911 * x);
  return s * (1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - .284496736) * t + .254829592) * t * Math.exp(-x * x));
}
var SIGMA = 1.35;
function above(mu, rm) { return .5 * (1 - erf((Math.log(rm) - mu) / (SIGMA * Math.SQRT2))); }
TH.above = above; TH.SIGMA = SIGMA;

var rnd = mulberry(1448);
var stateE = {};
TH.STATES.forEach(function (s) { stateE[s.id] = (rnd() - .5) * .7; });
stateE.KUL += .45; stateE.PJY += .45; stateE.SGR += .15; stateE.SBH -= .3; stateE.SWK -= .15;

var K = 448500, MU0 = Math.log(3700);
var cells = {};
TH.STATES.forEach(function (s) {
  cells[s.id] = {};
  TH.SEGMENTS.forEach(function (g) {
    cells[s.id][g.id] = {};
    TH.CHANNELS.forEach(function (c) {
      var noise = (rnd() - .5) * .2, lift = .8 + rnd() * .6, base = s.w * K * g.share * c.share, arr = [];
      TH.QUARTERS.forEach(function (_, q) {
        var mu = MU0 + stateE[s.id] + g.e + c.e + noise + .018 * q + (q >= TH.RULE_START ? .03 * lift * (q - TH.RULE_START + 1) : 0);
        arr.push({
          n: Math.round(base * (1 + .012 * q)), mu: mu, regd: g.regd,
          reg: sig(.5 * (mu - MU0) + .9 * c.e + .3 + (q >= TH.RULE_START ? .05 * (q - TH.RULE_START + 1) : 0))
        });
      });
      cells[s.id][g.id][c.id] = arr;
    });
  });
});

/* Cost scenario: k scales every amount tied to Kos Haji (25%, the category
   payments, the full cost). The RM15,000 gate is a policy minimum and stays. */
TH.costK = 1;
TH.gateRM = function (g, k) { k = k || TH.costK; return g.id === 'g15' ? TH.POLICY.gate : Math.round(g.rm * k); };

/* Aggregate any slice. f = {state, seg, chan} ('all' or an id), q = quarter index */
TH.agg = function (f, q, k) {
  k = k || TH.costK;
  var t25 = 8325 * k, t15 = TH.POLICY.gate, t235 = 23500 * k, t100 = 33300 * k, b40 = 15000 * k;
  var n = 0, gs = [0, 0, 0, 0], pay = 0, reg = 0, regd = 0, below = 0;
  TH.STATES.forEach(function (s) {
    if (f.state && f.state !== 'all' && f.state !== s.id) return;
    TH.SEGMENTS.forEach(function (g) {
      if (f.seg && f.seg !== 'all' && f.seg !== g.id) return;
      TH.CHANNELS.forEach(function (c) {
        if (f.chan && f.chan !== 'all' && f.chan !== c.id) return;
        var x = cells[s.id][g.id][c.id][q], mu = x.mu;
        var a25 = above(mu, t25), a15 = above(mu, t15), a235 = above(mu, t235), a100 = above(mu, t100);
        var aB40 = k === 1 ? a15 : above(mu, b40);
        n += x.n; reg += x.n * x.reg; regd += x.n * x.regd;
        below += x.n * x.regd * (1 - Math.min(.97, a15 * 1.6));
        pay += x.n * (c.mix[0] * aB40 + c.mix[1] * a235 + c.mix[2] * a100);
        gs[0] += x.n * a25; gs[1] += x.n * a15; gs[2] += x.n * a235; gs[3] += x.n * a100;
      });
    });
  });
  if (!n) return {n:0, g25:0, g15:0, g235:0, g100:0, pay:0, reg:0, regdN:0, belowN:0, belowShare:0, bands:[1, 0, 0, 0, 0]};
  var r = {n:n, g25:gs[0] / n, g15:gs[1] / n, g235:gs[2] / n, g100:gs[3] / n, pay:pay / n, reg:reg / n, regdN:regd, belowN:below, belowShare:regd ? below / regd : 0};
  r.bands = [1 - r.g25, r.g25 - r.g15, r.g15 - r.g235, r.g235 - r.g100, r.g100];
  return r;
};
TH.series = function (f, metric) {
  return TH.QUARTERS.map(function (_, q) { return TH.agg(f, q)[metric]; });
};
TH.lastQ = TH.QUARTERS.length - 1;

/* Sample N depositors' balances (RM) for the hero ladder */
TH.sampleLadder = function (stateId, N) {
  var r = mulberry(stateId === 'all' ? 7 : stateId.charCodeAt(0) * 31 + stateId.charCodeAt(1) * 7 + stateId.charCodeAt(2));
  var a = TH.agg({state:stateId}, TH.lastQ), out = [];
  for (var i = 0; i < N; i++) {
    // pick a band by its share, then a balance inside it
    var u = r(), acc = 0, b = 0;
    for (; b < 5; b++) { acc += a.bands[b]; if (u <= acc) break; }
    b = Math.min(b, 4);
    var lo = [300, 8325, 15000, 23500, 33300][b], hi = [8325, 15000, 23500, 33300, 42000][b]; // base scenario
    var v = b === 0 ? lo + Math.pow(r(), 1.6) * (hi - lo) : lo + r() * (hi - lo);
    out.push({v:v, b:b, j:r()});
  }
  return {dots:out, agg:a};
};

/* ---------- Simulator personas (fictional) ---------- */
TH.PERSONAS = [
  {id:'aiman', initials:'A', hue:'#2f8a63', name:{en:'Aiman, 24', ms:'Aiman, 24'}, place:'Kedah', cat:'M40', registered:false,
   role:{en:'Fresh graduate, private payroll', ms:'Graduan baharu, gaji swasta'}, age:24, bal:1800, monthly:150},
  {id:'nurul', initials:'N', hue:'#4a5d55', name:{en:'Nurul & Hafiz, 34', ms:'Nurul & Hafiz, 34'}, place:'Selangor', cat:'B40', registered:true,
   role:{en:'Young family, STR recipients', ms:'Keluarga muda, penerima STR'}, age:34, bal:6500, monthly:200},
  {id:'rahman', initials:'R', hue:'#156444', name:{en:'Encik Rahman, 51', ms:'Encik Rahman, 51'}, place:'Perak', cat:'M40', registered:true,
   role:{en:'Civil servant', ms:'Penjawat awam'}, age:51, bal:11000, monthly:300},
  {id:'som', initials:'S', hue:'#0a4531', name:{en:'Mak Som, 63', ms:'Mak Som, 63'}, place:'Kelantan', cat:'B40', registered:true,
   role:{en:'Retired, STR recipient', ms:'Bersara, penerima STR'}, age:63, bal:9800, monthly:150}
];

/* ---------- Literacy programmes and their data ----------
   body and goal are the plain-language copy on the Programmes page;
   events and tiles are the technical trace shown on the blueprint page. */
TH.MODULES = [
  {id:'youth', who:{en:'Youth 18–29', ms:'Belia 18–29'}, name:{en:'Youth Savings Starter', ms:'Pelan Simpanan Belia'},
   body:{en:'Six short lessons in the app and a campus workshop. Each young saver leaves with a monthly auto-deposit into Tabung Istito\'ah and a date for reaching RM15,000.', ms:'Enam pelajaran ringkas dalam aplikasi dan bengkel kampus. Setiap penyimpan muda pulang dengan simpanan automatik bulanan ke Tabung Istito\'ah dan tarikh untuk mencapai RM15,000.'},
   goal:{en:'Still saving every month after six months', ms:'Masih menyimpan setiap bulan selepas enam bulan'},
   events:['module_enrolled','lesson_completed','plan_created','auto_deposit_on','milestone_reached'], tiles:['gauge25','reg','funnel']},
  {id:'family', who:{en:'Couples 30–44', ms:'Pasangan 30–44'}, name:{en:'Family Hajj Plan', ms:'Pelan Haji Keluarga'},
   body:{en:'A worksheet for couples that plans RM15,000 and the Hajj payment for both husband and wife, and checks the 2028 deadline for each.', ms:'Lembaran untuk pasangan yang merancang RM15,000 dan bayaran haji bagi suami dan isteri, serta menyemak tarikh akhir 2028 bagi setiap seorang.'},
   goal:{en:'Both spouses on track for RM15,000', ms:'Kedua-dua pasangan di landasan ke RM15,000'},
   events:['module_enrolled','plan_created','auto_deposit_on','milestone_reached'], tiles:['gauge15','trend','funnel']},
  {id:'mid', who:{en:'Mid-career 45–59', ms:'Pertengahan kerjaya 45–59'}, name:{en:'Mid-career Top-up', ms:'Tambahan Pertengahan Kerjaya'},
   body:{en:'Adds a small top-up to salary deduction and sets a rule for each bonus, for registered depositors still below RM15,000 before 31 December 2028.', ms:'Menambah sedikit potongan gaji dan menetapkan peraturan bagi setiap bonus, untuk pendeposit berdaftar yang masih di bawah RM15,000 sebelum 31 Disember 2028.'},
   goal:{en:'Fewer registered depositors below RM15,000 at the 2028 deadline', ms:'Kurang pendeposit berdaftar di bawah RM15,000 pada tarikh akhir 2028'},
   events:['module_enrolled','plan_created','auto_deposit_on','milestone_reached'], tiles:['gauge235','watch','matrix']},
  {id:'senior', who:{en:'60 and above', ms:'60 tahun ke atas'}, name:{en:'Pre-departure Readiness Check', ms:'Semakan Kesediaan Pra-Pemergian'},
   body:{en:'A one-to-one check of money, Hajj knowledge, health and family support, before the offer letter arrives.', ms:'Semakan bersemuka tentang kewangan, ilmu haji, kesihatan dan sokongan keluarga, sebelum surat tawaran tiba.'},
   goal:{en:'Fewer offers deferred (now about 18%)', ms:'Kurang tawaran ditangguhkan (kini kira-kira 18%)'},
   events:['module_enrolled','readiness_check_done','milestone_reached'], tiles:['gauge100','watch']},
  {id:'employer', who:{en:'Employers', ms:'Majikan'}, name:{en:'Employer Payroll Programme', ms:'Program Potongan Gaji Majikan'},
   body:{en:'A simple HR kit so employers can sign staff up for salary deduction into TH in one step.', ms:'Kit HR mudah supaya majikan boleh mendaftarkan pekerja untuk potongan gaji ke TH dengan satu langkah.'},
   goal:{en:'More depositors saving through payroll', ms:'Lebih ramai pendeposit menyimpan melalui potongan gaji'},
   events:['employer_enrolled','auto_deposit_on','milestone_reached'], tiles:['reg','map','matrix']}
];
TH.EVENTS = [
  {id:'module_enrolled', when:{en:'A depositor joins a module', ms:'Pendeposit menyertai modul'}, fields:'pseudo_id, module_id, channel, ts', feeds:{en:'Funnel; enrolment by state', ms:'Corong; pendaftaran mengikut negeri'}},
  {id:'lesson_completed', when:{en:'A lesson is finished', ms:'Pelajaran diselesaikan'}, fields:'pseudo_id, lesson_id, quiz_score, ts', feeds:{en:'Literacy score', ms:'Skor literasi'}},
  {id:'plan_created', when:{en:'A target year and monthly amount are set', ms:'Tahun sasaran dan jumlah bulanan ditetapkan'}, fields:'pseudo_id, target_year, monthly_rm, pay_category', feeds:{en:'Projected readiness', ms:'Unjuran kesediaan'}},
  {id:'auto_deposit_on', when:{en:'Direct debit or salary deduction starts', ms:'Debit terus atau potongan gaji bermula'}, fields:'pseudo_id, amount_rm, frequency, into_tabung', feeds:{en:'Regular savers', ms:'Penyimpan tetap'}},
  {id:'milestone_reached', when:{en:'Balance crosses a ladder amount', ms:'Baki melepasi amaun tangga'}, fields:'pseudo_id, gate_rm, days_since_plan', feeds:{en:'Gauges; trend; watchlist', ms:'Tolok; trend; senarai pantau'}},
  {id:'readiness_check_done', when:{en:'Pre-departure check is complete', ms:'Semakan pra-pemergian selesai'}, fields:'pseudo_id, finance_ok, health_ok, support_ok', feeds:{en:'Watchlist', ms:'Senarai pantau'}},
  {id:'employer_enrolled', when:{en:'An employer joins the payroll programme', ms:'Majikan menyertai program potongan gaji'}, fields:'employer_id, sector, size_band, state', feeds:{en:'Corporate category filter', ms:'Penapis kategori korporat'}}
];
TH.FUNNEL = [
  {name:{en:'Enrolled in a module', ms:'Mendaftar modul'}, n:10000},
  {name:{en:'Finished the core lessons', ms:'Tamat pelajaran teras'}, n:6400},
  {name:{en:'Set a target and amount', ms:'Tetapkan sasaran & jumlah'}, n:4100},
  {name:{en:'Started direct debit or deduction', ms:'Mulakan debit terus atau potongan'}, n:2600},
  {name:{en:'Still saving after 6 months', ms:'Masih menyimpan selepas 6 bulan'}, n:1900}
];

/* ---------- Ecosystem map ---------- */
TH.ECO = {
  nodes: [
    {id:'tracker', x:0, y:0, r:34, core:true, name:{en:'Istito\'ah Tracker', ms:'Penjejak Istito\'ah'}, sub:{en:'this proposal', ms:'cadangan ini'},
     body:{en:'One shared view of depositor readiness against TH\'s own amounts. It takes in pseudonymised balances, registration status, payroll flags and module telemetry, and returns national, state and partner views.', ms:'Satu paparan bersama kesediaan pendeposit berbanding amaun TH sendiri. Ia menerima baki tanpa nama, status pendaftaran, penanda potongan gaji dan telemetri modul, dan menghasilkan paparan nasional, negeri dan rakan.'}, status:'core'},
    {id:'thhq', x:-210, y:-120, r:24, name:{en:'TH leadership', ms:'Kepimpinan TH'}, sub:{en:'strategy, Hajj readiness', ms:'strategi, kesediaan haji'},
     body:{en:'Owns the targets set in Phase 2. Sees the national view, the 2028 watchlist and the cost stress tests.', ms:'Pemilik sasaran yang ditetapkan dalam Fasa 2. Melihat paparan nasional, senarai pantau 2028 dan ujian tekanan kos.'}, status:'core'},
    {id:'thbr', x:-250, y:40, r:20, name:{en:'TH state branches', ms:'Cawangan negeri TH'}, sub:{en:'state views', ms:'paparan negeri'},
     body:{en:'Each branch sees its own state and segments, and follows up registered depositors still below RM15,000.', ms:'Setiap cawangan melihat negeri dan segmen sendiri, dan menyusul pendeposit berdaftar yang masih di bawah RM15,000.'}, status:'core'},
    {id:'main', x:-120, y:175, r:20, name:{en:'State religious councils', ms:'Majlis Agama Islam Negeri'}, sub:{en:'MAIN, mosques', ms:'MAIN, masjid'},
     body:{en:'Community reach through mosques and religious classes. Receive aggregate state summaries only.', ms:'Jangkauan komuniti melalui masjid dan kelas agama. Menerima ringkasan agregat negeri sahaja.'}, status:'proposed'},
    {id:'agency', x:110, y:180, r:20, name:{en:'Regional agencies', ms:'Agensi wilayah'}, sub:{en:'financial education', ms:'pendidikan kewangan'},
     body:{en:'Financial-education and counselling bodies that could co-deliver sessions. Report attendance back.', ms:'Badan pendidikan dan kaunseling kewangan yang boleh bersama menyampaikan sesi. Melaporkan kehadiran.'}, status:'proposed'},
    {id:'employer', x:250, y:40, r:20, name:{en:'Employers', ms:'Majikan'}, sub:{en:'salary deduction', ms:'potongan gaji'},
     body:{en:'Public and private employers that run salary deduction into TH. Their flags drive the corporate-category filter.', ms:'Majikan awam dan swasta yang menjalankan potongan gaji ke TH. Penanda mereka menggerakkan penapis kategori korporat.'}, status:'proposed'},
    {id:'sefb', x:210, y:-120, r:24, name:{en:'SEFB, UUM', ms:'SEFB, UUM'}, sub:{en:'research, modules', ms:'penyelidikan, modul'},
     body:{en:'Designs the literacy modules, the behavioural models and the evaluation. Builds and hands over the dashboard.', ms:'Mereka bentuk modul literasi, model tingkah laku dan penilaian. Membina dan menyerahkan papan pemuka.'}, status:'core'},
    {id:'dep', x:0, y:-200, r:24, name:{en:'Depositors', ms:'Pendeposit'}, sub:{en:'via THiJARI and counters', ms:'melalui THiJARI dan kaunter'},
     body:{en:'See only their own plan, Tabung Istito\'ah balance and milestones. Their data enters the tracker pseudonymised, never by name.', ms:'Hanya melihat pelan, baki Tabung Istito\'ah dan pencapaian sendiri. Data mereka masuk ke penjejak tanpa nama.'}, status:'core'}
  ],
  links: [
    {a:'dep', b:'tracker', label:{en:'balances, registration (pseudonymised)', ms:'baki, pendaftaran (tanpa nama)'}},
    {a:'sefb', b:'tracker', label:{en:'module telemetry, models', ms:'telemetri modul, model'}},
    {a:'employer', b:'tracker', label:{en:'salary deduction flags', ms:'penanda potongan gaji'}},
    {a:'agency', b:'tracker', label:{en:'session attendance', ms:'kehadiran sesi'}},
    {a:'tracker', b:'thhq', label:{en:'national view, alerts', ms:'paparan nasional, amaran'}},
    {a:'thhq', b:'tracker', label:{en:'targets from Phase 2', ms:'sasaran dari Fasa 2'}, curve:1},
    {a:'tracker', b:'thbr', label:{en:'state view, 2028 watchlist', ms:'paparan negeri, senarai pantau 2028'}},
    {a:'tracker', b:'main', label:{en:'aggregate summaries', ms:'ringkasan agregat'}},
    {a:'sefb', b:'dep', label:{en:'lessons and nudges', ms:'pelajaran dan dorongan'}},
    {a:'main', b:'dep', label:{en:'community outreach', ms:'jangkauan komuniti'}, curve:1}
  ]
};


/* ---------- Data templates: the spreadsheets that feed each page ----------
   One entry per page. Each sheet has columns (k = header, type, d = meaning,
   opts = allowed values, calc = worked out from the row, f = Excel formula
   with {r} for this row and {p} for the row above) and SAMPLE rows that are
   made up. steps explain how rows become the page's numbers: match picks the
   rows to highlight, cols the columns, res the result in these sample rows.
   tools/build_templates.py turns the same entries into the .xlsx downloads. */
const RMf = (n) => 'RM' + Math.round(n).toLocaleString('en-MY');
const pctf = (a, b) => b ? Math.round(a / b * 100) + '%' : '0%';
const OWN = {B40:15000, M40:23500, T20:33300};
const bal = (r) => r.tabung_istitoah_rm + r.tabung_am_rm;

/* Depositor page: yearly projection worked out from the Inputs sheet */
const SIM_IN = {age:24, balance_today_rm:1800, monthly_deposit_rm:150, extra_from_programme_rm:50, pay_category:'M40', registered:'N', kos_haji_rm:33300, profit_pct:3.5};
function simRows() {
  const out = [], mon = SIM_IN.monthly_deposit_rm, p = SIM_IN.profit_pct / 100, own = OWN[SIM_IN.pay_category];
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let open = SIM_IN.balance_today_rm;
  for (let y = 1; y <= 12; y++) {
    const dep = 12 * mon, prof = Math.round((open + dep) * p * 100) / 100, close = open + dep + prof, hit = [];
    if (open < 15000 && close >= 15000) hit.push('RM15,000 gate');
    if (open < own && close >= own) hit.push('Own payment');
    out.push({year_no:y, to_month:MON[8] + ' ' + (2026 + y), opening_rm:Math.round(open * 100) / 100, deposits_rm:dep, profit_rm:prof, closing_rm:Math.round(close * 100) / 100, passes:hit.join(', ')});
    open = close;
    if (close >= own) break;
  }
  return out;
}
/* first month the balance reaches rm, on the same rule as the simulator */
function monthsTo(rm, extra) {
  let b = SIM_IN.balance_today_rm;
  for (let m = 1; m <= 600; m++) { b += SIM_IN.monthly_deposit_rm + (extra || 0); if (m % 12 === 0) b += b * SIM_IN.profit_pct / 100; if (b >= rm) return m; }
  return null;
}
const ym = (m) => { const t = 2026 * 12 + 9 + m - 1; return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][t % 12] + ' ' + Math.floor(t / 12); };

TH.TEMPLATES = {
  tracker: {
    file:'assets/templates/tracker-monthly-snapshot.xlsx',
    intro:{en:'One row per depositor per month. TH would produce this inside its own systems each month; the dashboard only ever receives the totals worked out from it. The eight rows below are made up.', ms:'Satu baris bagi setiap pendeposit setiap bulan. TH akan menghasilkannya di dalam sistem sendiri setiap bulan; papan pemuka hanya menerima jumlah yang dikira daripadanya. Lapan baris di bawah adalah rekaan.'},
    sheets:[{name:'Monthly snapshot',
      cols:[
        {k:'month', type:'text', d:{en:'Month of the balance (end of month), as YYYY-MM.', ms:'Bulan baki (akhir bulan), format YYYY-MM.'}},
        {k:'pseudo_id', type:'text', d:{en:'A code TH makes inside TH. Never a name, IC or account number.', ms:'Kod yang dijana di dalam TH. Bukan nama, nombor KP atau nombor akaun.'}},
        {k:'state', type:'text', opts:TH.STATES.map((s) => s.id), d:{en:'State code of the depositor\'s TH branch.', ms:'Kod negeri cawangan TH pendeposit.'}},
        {k:'age_band', type:'text', opts:['18-29', '30-44', '45-59', '60+'], d:{en:'Age group.', ms:'Kumpulan umur.'}},
        {k:'saving_channel', type:'text', opts:['Public payroll', 'Private payroll', 'Self-employed', 'None'], d:{en:'How the depositor saves. "None" means no regular deposit. Called corporate category on the tracker.', ms:'Cara pendeposit menyimpan. "None" bermaksud tiada simpanan tetap. Dipanggil kategori korporat pada penjejak.'}},
        {k:'pay_category', type:'text', opts:['B40', 'M40', 'T20'], d:{en:'Payment category, projected until the offer letter fixes it.', ms:'Kategori bayaran, diunjurkan sehingga ditetapkan dalam surat tawaran.'}},
        {k:'registered', type:'yn', opts:['Y', 'N'], d:{en:'Y if already registered for Hajj.', ms:'Y jika sudah mendaftar haji.'}},
        {k:'tabung_istitoah_rm', type:'rm', d:{en:'Balance in Tabung Istito\'ah.', ms:'Baki dalam Tabung Istito\'ah.'}},
        {k:'tabung_am_rm', type:'rm', d:{en:'Balance in Tabung Am.', ms:'Baki dalam Tabung Am.'}},
        {k:'deposit_this_month_rm', type:'rm', d:{en:'Total paid in during the month.', ms:'Jumlah simpanan dalam bulan itu.'}},
        {k:'months_deposited_12m', type:'int', d:{en:'Of the last 12 months, how many had a deposit (0 to 12).', ms:'Daripada 12 bulan lepas, berapa bulan ada simpanan (0 hingga 12).'}},
        {k:'balance_rm', type:'rm', calc:bal, f:'H{r}+I{r}', d:{en:'Worked out: H + I. TH to confirm whether Tabung Am counts.', ms:'Dikira: H + I. TH perlu mengesahkan sama ada Tabung Am dikira.'}}
      ],
      rows:[
        {month:'2026-09', pseudo_id:'D-0001', state:'KDH', age_band:'18-29', saving_channel:'Private payroll', pay_category:'M40', registered:'N', tabung_istitoah_rm:2400, tabung_am_rm:300, deposit_this_month_rm:150, months_deposited_12m:12},
        {month:'2026-09', pseudo_id:'D-0002', state:'KDH', age_band:'30-44', saving_channel:'None', pay_category:'B40', registered:'Y', tabung_istitoah_rm:6100, tabung_am_rm:0, deposit_this_month_rm:0, months_deposited_12m:2},
        {month:'2026-09', pseudo_id:'D-0003', state:'SGR', age_band:'45-59', saving_channel:'Public payroll', pay_category:'M40', registered:'Y', tabung_istitoah_rm:16800, tabung_am_rm:4200, deposit_this_month_rm:400, months_deposited_12m:12},
        {month:'2026-09', pseudo_id:'D-0004', state:'KTN', age_band:'60+', saving_channel:'None', pay_category:'B40', registered:'Y', tabung_istitoah_rm:9800, tabung_am_rm:1200, deposit_this_month_rm:5000, months_deposited_12m:1},
        {month:'2026-09', pseudo_id:'D-0005', state:'SGR', age_band:'30-44', saving_channel:'Private payroll', pay_category:'T20', registered:'N', tabung_istitoah_rm:27500, tabung_am_rm:8000, deposit_this_month_rm:800, months_deposited_12m:11},
        {month:'2026-09', pseudo_id:'D-0006', state:'PRK', age_band:'45-59', saving_channel:'Self-employed', pay_category:'M40', registered:'Y', tabung_istitoah_rm:12500, tabung_am_rm:3000, deposit_this_month_rm:0, months_deposited_12m:4},
        {month:'2026-09', pseudo_id:'D-0007', state:'SBH', age_band:'18-29', saving_channel:'None', pay_category:'B40', registered:'N', tabung_istitoah_rm:350, tabung_am_rm:0, deposit_this_month_rm:0, months_deposited_12m:0},
        {month:'2026-09', pseudo_id:'D-0008', state:'KDH', age_band:'60+', saving_channel:'Public payroll', pay_category:'B40', registered:'Y', tabung_istitoah_rm:15200, tabung_am_rm:900, deposit_this_month_rm:250, months_deposited_12m:12}
      ]}],
    steps:[
      {cols:['L'], match:(r) => bal(r) >= 15000,
       t:{en:'At or above RM15,000', ms:'RM15,000 ke atas'}, rule:{en:'Count the rows where balance_rm (L) is RM15,000 or more, then divide by all rows.', ms:'Kira baris dengan balance_rm (L) RM15,000 atau lebih, kemudian bahagi dengan semua baris.'},
       res:(rows) => { const n = rows.filter((r) => bal(r) >= 15000).length; return {en:n + ' of ' + rows.length + ' rows = ' + pctf(n, rows.length), ms:n + ' daripada ' + rows.length + ' baris = ' + pctf(n, rows.length)}; },
       feeds:{en:'RM15,000 gauge, map, trend', ms:'Tolok RM15,000, peta, trend'}},
      {cols:['F', 'L'], match:(r) => bal(r) >= OWN[r.pay_category],
       t:{en:'Can cover own Bayaran Haji', ms:'Mampu tampung Bayaran Haji sendiri'}, rule:{en:'Compare L with the payment for the row\'s category (F): B40 RM15,000, M40 RM23,500, T20 RM33,300.', ms:'Bandingkan L dengan bayaran kategori baris (F): B40 RM15,000, M40 RM23,500, T20 RM33,300.'},
       res:(rows) => { const n = rows.filter((r) => bal(r) >= OWN[r.pay_category]).length; return {en:n + ' of ' + rows.length + ' rows = ' + pctf(n, rows.length), ms:n + ' daripada ' + rows.length + ' baris = ' + pctf(n, rows.length)}; },
       feeds:{en:'"Own payment" figure and map measure', ms:'Angka dan ukuran peta "Bayaran sendiri"'}},
      {cols:['G', 'L'], match:(r) => r.registered === 'Y' && bal(r) < 15000,
       t:{en:'Registered, still below RM15,000', ms:'Berdaftar, masih bawah RM15,000'}, rule:{en:'Rows with registered (G) = Y and L under RM15,000. These depositors must reach RM15,000 by 31 December 2028.', ms:'Baris dengan registered (G) = Y dan L bawah RM15,000. Mereka perlu mencapai RM15,000 sebelum 31 Disember 2028.'},
       res:(rows) => { const reg = rows.filter((r) => r.registered === 'Y').length, n = rows.filter((r) => r.registered === 'Y' && bal(r) < 15000).length; return {en:n + ' people, ' + pctf(n, reg) + ' of the ' + reg + ' registered', ms:n + ' orang, ' + pctf(n, reg) + ' daripada ' + reg + ' yang berdaftar'}; },
       feeds:{en:'2028 watchlist', ms:'Senarai pantau 2028'}},
      {cols:['K'], match:(r) => r.months_deposited_12m >= 10,
       t:{en:'Regular savers', ms:'Penyimpan tetap'}, rule:{en:'Rows where months_deposited_12m (K) is 10 or more: saving in almost every month (proposed rule).', ms:'Baris dengan months_deposited_12m (K) 10 atau lebih: menyimpan hampir setiap bulan (peraturan dicadangkan).'},
       res:(rows) => { const n = rows.filter((r) => r.months_deposited_12m >= 10).length; return {en:n + ' of ' + rows.length + ' rows = ' + pctf(n, rows.length), ms:n + ' daripada ' + rows.length + ' baris = ' + pctf(n, rows.length)}; },
       feeds:{en:'"Regular" map measure', ms:'Ukuran peta "Tetap"'}},
      {cols:['J', 'K'], match:(r) => r.months_deposited_12m <= 3 && r.deposit_this_month_rm >= 3000, proposed:true,
       t:{en:'Last-minute lump sums', ms:'Simpanan sekaligus saat akhir'}, rule:{en:'Deposited in 3 or fewer of the last 12 months (K), yet RM3,000 or more this month (J). The pattern TH raised: little for years, then one big deposit near the turn.', ms:'Menyimpan dalam 3 bulan atau kurang daripada 12 bulan lepas (K), tetapi RM3,000 atau lebih bulan ini (J). Corak yang dibangkitkan TH: sedikit bertahun-tahun, kemudian satu simpanan besar apabila hampir giliran.'},
       res:(rows) => { const n = rows.filter((r) => r.months_deposited_12m <= 3 && r.deposit_this_month_rm >= 3000).length; return {en:n + ' of ' + rows.length + ' rows', ms:n + ' daripada ' + rows.length + ' baris'}; },
       feeds:{en:'Proposed new measure, not on the tracker yet', ms:'Ukuran baharu dicadangkan, belum ada pada penjejak'}}
    ],
    privacy:{en:'On the real dashboard TH runs these counts inside its own systems over millions of rows. Only the totals leave, and any group under 10 people is hidden.', ms:'Pada papan pemuka sebenar TH membuat kiraan ini di dalam sistem sendiri ke atas berjuta-juta baris. Hanya jumlah yang keluar, dan kumpulan bawah 10 orang disorok.'}
  },

  depositor: {
    file:'assets/templates/depositor-plan.xlsx',
    intro:{en:'Two sheets: the settings for one depositor, and the year-by-year projection the page works out from them. In Excel the projection is live formulas, so changing a setting changes it. Aiman\'s settings are shown.', ms:'Dua helaian: tetapan bagi seorang pendeposit, dan unjuran tahun demi tahun yang dikira daripadanya. Dalam Excel unjuran ialah formula hidup, jadi menukar tetapan akan mengubahnya. Tetapan Aiman dipaparkan.'},
    sheets:[
      {name:'Inputs',
       cols:[
         {k:'setting', type:'text', d:{en:'What the value is.', ms:'Maksud nilai.'}},
         {k:'value', type:'text', d:{en:'The depositor\'s figure. Change these.', ms:'Angka pendeposit. Ubah nilai ini.'}},
         {k:'note', type:'text', d:{en:'Where the figure comes from.', ms:'Dari mana angka itu datang.'}}
       ],
       rows:[
         {setting:'age', value:SIM_IN.age, note:'Age today'},
         {setting:'balance_today_rm', value:SIM_IN.balance_today_rm, note:'Real data: balance_rm in the Monthly snapshot'},
         {setting:'monthly_deposit_rm', value:SIM_IN.monthly_deposit_rm, note:'Real data: average deposit_this_month_rm'},
         {setting:'extra_from_programme_rm', value:SIM_IN.extra_from_programme_rm, note:'Extra a month agreed in a literacy programme'},
         {setting:'pay_category', value:SIM_IN.pay_category, note:'B40, M40 or T20'},
         {setting:'registered', value:SIM_IN.registered, note:'Y adds the 31 Dec 2028 deadline'},
         {setting:'kos_haji_rm', value:SIM_IN.kos_haji_rm, note:'TH, 1448H/2027M'},
         {setting:'profit_pct', value:SIM_IN.profit_pct, note:'Assumed yearly profit distribution; never guaranteed'},
         {setting:'own_payment_rm', value:OWN[SIM_IN.pay_category], note:'Worked out from pay_category', _f:{value:'IF(B6="B40",15000,IF(B6="M40",23500,33300))'}}
       ]},
      {name:'Projection',
       cols:[
         {k:'year_no', type:'int', d:{en:'Year of saving, from October 2026.', ms:'Tahun menyimpan, mulai Oktober 2026.'}},
         {k:'to_month', type:'text', d:{en:'The year ends in this month.', ms:'Tahun berakhir pada bulan ini.'}},
         {k:'opening_rm', type:'rm', calc:true, f:'F{p}', f0:'Inputs!B3', d:{en:'Balance at the start of the year: last year\'s closing balance.', ms:'Baki awal tahun: baki akhir tahun sebelumnya.'}},
         {k:'deposits_rm', type:'rm', calc:true, f:'12*Inputs!$B$4', d:{en:'Twelve monthly deposits.', ms:'Dua belas simpanan bulanan.'}},
         {k:'profit_rm', type:'rm', calc:true, f:'ROUND((C{r}+D{r})*Inputs!$B$9/100,2)', d:{en:'Profit distribution added at year end on the balance.', ms:'Agihan keuntungan ditambah pada akhir tahun ke atas baki.'}},
         {k:'closing_rm', type:'rm', calc:true, f:'C{r}+D{r}+E{r}', d:{en:'Opening + deposits + profit.', ms:'Baki awal + simpanan + keuntungan.'}},
         {k:'passes', type:'text', calc:true, f:'TRIM(IF(AND(C{r}<15000,F{r}>=15000),"RM15,000 gate ","")&IF(AND(C{r}<Inputs!$B$10,F{r}>=Inputs!$B$10),"Own payment",""))', d:{en:'The amounts passed during the year.', ms:'Amaun yang dilepasi dalam tahun itu.'}}
       ],
       rows:simRows()}
    ],
    steps:[
      {sheet:1, cols:['D'], match:() => true,
       t:{en:'Every month: add the deposit', ms:'Setiap bulan: tambah simpanan'}, rule:{en:'RM150 a month goes in, RM1,800 a year (column D).', ms:'RM150 sebulan dimasukkan, RM1,800 setahun (lajur D).'},
       res:() => ({en:'RM1,800 a year', ms:'RM1,800 setahun'}), feeds:{en:'Green line on the chart', ms:'Garis hijau pada carta'}},
      {sheet:1, cols:['E'], match:() => true,
       t:{en:'Every 12 months: add the profit', ms:'Setiap 12 bulan: tambah keuntungan'}, rule:{en:'3.5% of the balance at year end (column E). An assumption you can change; TH never guarantees it.', ms:'3.5% daripada baki pada akhir tahun (lajur E). Andaian yang boleh diubah; TH tidak menjaminnya.'},
       res:(rows) => ({en:RMf(rows.reduce((s, r) => s + r.profit_rm, 0)) + ' of profit over ' + rows.length + ' years', ms:RMf(rows.reduce((s, r) => s + r.profit_rm, 0)) + ' keuntungan dalam ' + rows.length + ' tahun'}),
       feeds:{en:'Green line on the chart', ms:'Garis hijau pada carta'}},
      {sheet:1, cols:['F', 'G'], match:(r) => /RM15,000/.test(r.passes),
       t:{en:'Milestone: first month past RM15,000', ms:'Pencapaian: bulan pertama melepasi RM15,000'}, rule:{en:'The year is found here (G); the page then steps month by month to give the exact date.', ms:'Tahunnya dikenal pasti di sini (G); halaman kemudian mengira bulan demi bulan untuk tarikh tepat.'},
       res:() => { const m = monthsTo(15000); return {en:ym(m) + ', age ' + Math.floor(SIM_IN.age + m / 12), ms:ym(m) + ', umur ' + Math.floor(SIM_IN.age + m / 12)}; },
       feeds:{en:'Milestones list', ms:'Senarai pencapaian'}},
      {sheet:0, cols:['B'], match:(r) => r.setting === 'extra_from_programme_rm',
       t:{en:'With the programme\'s extra RM50', ms:'Dengan tambahan RM50 daripada program'}, rule:{en:'The same sums with RM200 a month instead of RM150.', ms:'Kiraan yang sama dengan RM200 sebulan, bukan RM150.'},
       res:() => { const a = monthsTo(15000), b = monthsTo(15000, SIM_IN.extra_from_programme_rm); return {en:'RM15,000 ' + (a - b) + ' months sooner (' + ym(b) + ')', ms:'RM15,000 ' + (a - b) + ' bulan lebih awal (' + ym(b) + ')'}; },
       feeds:{en:'Dashed gold line', ms:'Garis emas putus-putus'}}
    ]
  },

  plan: {
    file:'assets/templates/kpi-targets.xlsx',
    intro:{en:'What the Phase 2 workshops produce: the ladder of amounts and a target for each, by scope. The gauges read these two sheets. The targets below are examples, not agreed figures.', ms:'Hasil bengkel Fasa 2: tangga amaun dan sasaran bagi setiap satu, mengikut skop. Tolok membaca dua helaian ini. Sasaran di bawah ialah contoh, bukan angka yang dipersetujui.'},
    sheets:[
      {name:'KPI targets',
       cols:[
         {k:'kpi_id', type:'int', d:{en:'Row number of the target.', ms:'Nombor baris sasaran.'}},
         {k:'step_amount_rm', type:'rm', opts:['8325', '15000', '23500', '33300'], d:{en:'Which ladder amount the target is for (from the Ladder sheet).', ms:'Amaun tangga bagi sasaran ini (daripada helaian Ladder).'}},
         {k:'scope_type', type:'text', opts:['National', 'State', 'Age group'], d:{en:'Whole country, one state or one age group.', ms:'Seluruh negara, satu negeri atau satu kumpulan umur.'}},
         {k:'scope', type:'text', d:{en:'Which one, e.g. Kedah or 45-59.', ms:'Yang mana, contohnya Kedah atau 45-59.'}},
         {k:'target_pct', type:'pct', d:{en:'Share of depositors that should be at or above the amount.', ms:'Peratus pendeposit yang sepatutnya mencapai amaun itu.'}},
         {k:'due_quarter', type:'text', d:{en:'When the target should be met.', ms:'Bila sasaran perlu dicapai.'}},
         {k:'owner', type:'text', d:{en:'Who answers for it at TH.', ms:'Siapa yang bertanggungjawab di TH.'}}
       ],
       rows:[
         {kpi_id:1, step_amount_rm:8325, scope_type:'National', scope:'Malaysia', target_pct:40, due_quarter:'Q4 2027', owner:'TH Strategy'},
         {kpi_id:2, step_amount_rm:15000, scope_type:'National', scope:'Malaysia', target_pct:25, due_quarter:'Q4 2027', owner:'TH Strategy'},
         {kpi_id:3, step_amount_rm:23500, scope_type:'National', scope:'Malaysia', target_pct:17, due_quarter:'Q4 2027', owner:'TH Strategy'},
         {kpi_id:4, step_amount_rm:33300, scope_type:'National', scope:'Malaysia', target_pct:12, due_quarter:'Q4 2027', owner:'TH Strategy'},
         {kpi_id:5, step_amount_rm:15000, scope_type:'State', scope:'Kedah', target_pct:28, due_quarter:'Q4 2027', owner:'TH Kedah branch'},
         {kpi_id:6, step_amount_rm:15000, scope_type:'Age group', scope:'45-59', target_pct:35, due_quarter:'Q4 2028', owner:'TH Strategy'}
       ]},
      {name:'Ladder',
       cols:[
         {k:'step_id', type:'int', d:{en:'Order on the ladder.', ms:'Susunan pada tangga.'}},
         {k:'amount_rm', type:'rm', d:{en:'The amount in ringgit.', ms:'Amaun dalam ringgit.'}},
         {k:'basis', type:'text', d:{en:'Why this amount: a TH policy, or a share of Kos Haji.', ms:'Sebab amaun ini: dasar TH, atau peratus Kos Haji.'}},
         {k:'label', type:'text', d:{en:'Name shown on the dashboard.', ms:'Nama yang dipaparkan pada papan pemuka.'}}
       ],
       rows:[
         {step_id:1, amount_rm:8325, basis:'25% of Kos Haji', label:'Saving has started'},
         {step_id:2, amount_rm:15000, basis:'TH policy: offer letter minimum', label:'RM15,000 gate'},
         {step_id:3, amount_rm:23500, basis:'TH policy: M40 Bayaran Haji', label:'M40 payment'},
         {step_id:4, amount_rm:33300, basis:'TH policy: full Kos Haji', label:'Full Kos Haji'}
       ]}
    ],
    steps:[
      {sheet:1, cols:['B'], match:() => true,
       t:{en:'The ladder sets the lines', ms:'Tangga menetapkan garisan'}, rule:{en:'Each row is one gold line on the overview and one gauge on the tracker. Add a row to add a step.', ms:'Setiap baris ialah satu garis emas pada gambaran dan satu tolok pada penjejak. Tambah baris untuk menambah langkah.'},
       res:(rows) => ({en:rows.length + ' steps', ms:rows.length + ' langkah'}), feeds:{en:'Ladder, gauges', ms:'Tangga, tolok'}},
      {sheet:0, cols:['E'], match:(r) => r.scope_type === 'National',
       t:{en:'Each target is one row', ms:'Setiap sasaran satu baris'}, rule:{en:'A national target, a state target or an age-group target: the same columns, a different scope.', ms:'Sasaran nasional, negeri atau kumpulan umur: lajur yang sama, skop berbeza.'},
       res:(rows) => ({en:rows.length + ' targets, ' + rows.filter((r) => r.scope_type === 'National').length + ' national', ms:rows.length + ' sasaran, ' + rows.filter((r) => r.scope_type === 'National').length + ' nasional'}),
       feeds:{en:'The dark tick on each gauge', ms:'Tanda gelap pada setiap tolok'}},
      {sheet:0, cols:['B', 'E'], match:(r) => r.kpi_id === 2,
       t:{en:'The gauge compares actual with target', ms:'Tolok membandingkan sebenar dengan sasaran'}, rule:{en:'On track at or above the target; Close within 3 points; Below target otherwise.', ms:'Menepati sasaran jika sama atau melebihi; Hampir jika dalam 3 mata; Bawah sasaran jika tidak.'},
       res:() => { const a = TH.agg({}, TH.lastQ).g15 * 100, d = a - 25, s = d >= 0 ? ['On track', 'Menepati sasaran'] : d >= -3 ? ['Close', 'Hampir'] : ['Below target', 'Bawah sasaran']; return {en:'Malaysia, RM15,000: ' + a.toFixed(0) + '% against 25%: ' + s[0], ms:'Malaysia, RM15,000: ' + a.toFixed(0) + '% berbanding 25%: ' + s[1]}; },
       feeds:{en:'Gauge status label', ms:'Label status tolok'}}
    ]
  },

  cost: {
    file:'assets/templates/th-amounts.xlsx',
    intro:{en:'TH\'s own amounts, one row per payment category per season, plus the policy settings. These are real 1448H/2027M figures. When TH announces a new season, the team adds rows here and every page follows.', ms:'Amaun TH sendiri, satu baris bagi setiap kategori bayaran setiap musim, serta tetapan dasar. Ini angka sebenar 1448H/2027M. Apabila TH mengumumkan musim baharu, pasukan menambah baris di sini dan semua halaman mengikut.'},
    sheets:[
      {name:'Amounts by season',
       cols:[
         {k:'season', type:'text', d:{en:'Hajj season.', ms:'Musim haji.'}},
         {k:'category', type:'text', opts:['B40', 'M40', 'T20', 'Appeal'], d:{en:'Payment category.', ms:'Kategori bayaran.'}},
         {k:'kos_haji_rm', type:'rm', d:{en:'Full cost per Muassasah pilgrim.', ms:'Kos penuh bagi seorang jemaah Muassasah.'}},
         {k:'bayaran_haji_rm', type:'rm', d:{en:'What the pilgrim pays.', ms:'Bayaran oleh jemaah.'}},
         {k:'hafis_rm', type:'rm', d:{en:'TH assistance (HAFIS).', ms:'Bantuan TH (HAFIS).'}},
         {k:'government_aid_rm', type:'rm', d:{en:'Government assistance.', ms:'Bantuan Kerajaan.'}},
         {k:'check_rm', type:'rm', calc:(r) => r.bayaran_haji_rm + r.hafis_rm + r.government_aid_rm, f:'D{r}+E{r}+F{r}', d:{en:'Worked out: D + E + F. Must equal C.', ms:'Dikira: D + E + F. Mesti sama dengan C.'}}
       ],
       rows:TH.CATS.map((c) => ({season:'1448H/2027M', category:c.id === 'appeal' ? 'Appeal' : c.id, kos_haji_rm:TH.POLICY.kosHaji, bayaran_haji_rm:TH.POLICY.pay[c.id], hafis_rm:TH.POLICY.aid[c.id].hafis, government_aid_rm:TH.POLICY.aid[c.id].gov}))},
      {name:'Policy settings',
       cols:[
         {k:'setting', type:'text', d:{en:'Name of the setting.', ms:'Nama tetapan.'}},
         {k:'value', type:'text', d:{en:'Its value.', ms:'Nilainya.'}},
         {k:'source', type:'text', d:{en:'Where TH published it.', ms:'Di mana TH menerbitkannya.'}}
       ],
       rows:[
         {setting:'gate_rm', value:15000, source:'TH FAQ 1448H, Q3'},
         {setting:'registered_deadline', value:'2028-12-31', source:'Seruan Istito\'ah'},
         {setting:'auto_queue_from', value:'2029-01-01', source:'Seruan Istito\'ah'},
         {setting:'quota_places', value:31600, source:'TH FAQ 1448H, Q4'},
         {setting:'depositors', value:9700000, source:'TH press release, 18 Mar 2026'}
       ]}
    ],
    steps:[
      {cols:['D', 'E', 'F', 'G'], match:() => true,
       t:{en:'The parts add up to Kos Haji', ms:'Bahagian-bahagian menjadi Kos Haji'}, rule:{en:'Bayaran Haji + HAFIS + Government aid (G) must equal Kos Haji (C) in every row. A wrong figure shows at once.', ms:'Bayaran Haji + HAFIS + bantuan Kerajaan (G) mesti sama dengan Kos Haji (C) dalam setiap baris. Angka salah kelihatan serta-merta.'},
       res:(rows) => { const ok = rows.filter((r) => r.bayaran_haji_rm + r.hafis_rm + r.government_aid_rm === r.kos_haji_rm).length; return {en:ok + ' of ' + rows.length + ' rows add up', ms:ok + ' daripada ' + rows.length + ' baris tepat'}; },
       feeds:{en:'"Who pays the RM33,300" chart', ms:'Carta "Siapa membayar RM33,300"'}},
      {cols:['B', 'D'], match:(r) => r.category !== 'Appeal',
       t:{en:'Each person\'s own target', ms:'Sasaran setiap orang'}, rule:{en:'Bayaran Haji by category becomes each depositor\'s own payment target.', ms:'Bayaran Haji mengikut kategori menjadi sasaran bayaran sendiri setiap pendeposit.'},
       res:(rows) => ({en:rows.filter((r) => r.category !== 'Appeal').map((r) => r.category + ' ' + RMf(r.bayaran_haji_rm)).join(' · '), ms:rows.filter((r) => r.category !== 'Appeal').map((r) => r.category + ' ' + RMf(r.bayaran_haji_rm)).join(' · ')}),
       feeds:{en:'"Own payment" on the tracker and simulator', ms:'"Bayaran sendiri" pada penjejak dan simulasi'}},
      {sheet:1, cols:['B'], match:(r) => r.setting === 'gate_rm' || r.setting === 'registered_deadline',
       t:{en:'Policy settings drive the rules', ms:'Tetapan dasar menggerakkan peraturan'}, rule:{en:'The RM15,000 gate and the 31 December 2028 deadline are read from here, not typed into the charts.', ms:'Ambang RM15,000 dan tarikh akhir 31 Disember 2028 dibaca dari sini, bukan ditaip ke dalam carta.'},
       res:() => ({en:'Gate RM15,000 · deadline 31 Dec 2028', ms:'Ambang RM15,000 · tarikh akhir 31 Dis 2028'}), feeds:{en:'Gold lines, 2028 watchlist', ms:'Garis emas, senarai pantau 2028'}}
    ]
  },

  literacy: {
    file:'assets/templates/programme-log.xlsx',
    intro:{en:'One row each time a depositor takes a step in a programme. Programme staff or the app add rows; the funnel counts people at each step. The rows below are made up.', ms:'Satu baris setiap kali pendeposit mengambil langkah dalam program. Kakitangan program atau aplikasi menambah baris; corong mengira orang pada setiap langkah. Baris di bawah adalah rekaan.'},
    sheets:[{name:'Programme log',
      cols:[
        {k:'date', type:'text', d:{en:'When it happened, YYYY-MM-DD.', ms:'Bila berlaku, YYYY-MM-DD.'}},
        {k:'pseudo_id', type:'text', d:{en:'Same code as in the Monthly snapshot, so the two sheets can be joined inside TH.', ms:'Kod sama seperti dalam Monthly snapshot, supaya dua helaian boleh digabung di dalam TH.'}},
        {k:'programme', type:'text', opts:['Youth Savings Starter', 'Family Hajj Plan', 'Mid-career Top-up', 'Pre-departure Readiness Check', 'Employer Payroll Programme'], d:{en:'Which programme.', ms:'Program yang mana.'}},
        {k:'state', type:'text', opts:TH.STATES.map((s) => s.id), d:{en:'State code.', ms:'Kod negeri.'}},
        {k:'step', type:'text', opts:['Joined', 'Finished lessons', 'Set a plan', 'Started auto-deposit', 'Still saving at 6 months'], d:{en:'What the person did.', ms:'Apa yang dilakukan.'}},
        {k:'monthly_rm', type:'rm', d:{en:'Monthly amount, for "Set a plan" and "Started auto-deposit". Blank otherwise.', ms:'Jumlah bulanan, bagi "Set a plan" dan "Started auto-deposit". Kosong jika tidak.'}}
      ],
      rows:[
        {date:'2026-10-03', pseudo_id:'D-0001', programme:'Youth Savings Starter', state:'KDH', step:'Joined', monthly_rm:''},
        {date:'2026-10-03', pseudo_id:'D-0007', programme:'Youth Savings Starter', state:'SBH', step:'Joined', monthly_rm:''},
        {date:'2026-10-05', pseudo_id:'D-0004', programme:'Pre-departure Readiness Check', state:'KTN', step:'Joined', monthly_rm:''},
        {date:'2026-10-08', pseudo_id:'D-0006', programme:'Mid-career Top-up', state:'PRK', step:'Joined', monthly_rm:''},
        {date:'2026-10-12', pseudo_id:'D-0004', programme:'Pre-departure Readiness Check', state:'KTN', step:'Set a plan', monthly_rm:400},
        {date:'2026-10-15', pseudo_id:'D-0006', programme:'Mid-career Top-up', state:'PRK', step:'Started auto-deposit', monthly_rm:300},
        {date:'2026-10-17', pseudo_id:'D-0001', programme:'Youth Savings Starter', state:'KDH', step:'Finished lessons', monthly_rm:''},
        {date:'2026-10-20', pseudo_id:'D-0001', programme:'Youth Savings Starter', state:'KDH', step:'Set a plan', monthly_rm:200},
        {date:'2026-11-01', pseudo_id:'D-0001', programme:'Youth Savings Starter', state:'KDH', step:'Started auto-deposit', monthly_rm:200},
        {date:'2027-05-01', pseudo_id:'D-0001', programme:'Youth Savings Starter', state:'KDH', step:'Still saving at 6 months', monthly_rm:''}
      ]}],
    steps:[
      {cols:['B', 'E'], match:(r) => r.step === 'Joined',
       t:{en:'Joined', ms:'Menyertai'}, rule:{en:'Count different people (B) with step "Joined".', ms:'Kira orang berbeza (B) dengan langkah "Joined".'},
       res:(rows) => { const n = new Set(rows.filter((r) => r.step === 'Joined').map((r) => r.pseudo_id)).size; return {en:n + ' people', ms:n + ' orang'}; }, feeds:{en:'Top of the funnel', ms:'Bahagian atas corong'}},
      {cols:['B', 'E', 'F'], match:(r) => r.step === 'Set a plan',
       t:{en:'Set a plan', ms:'Tetapkan pelan'}, rule:{en:'People who chose a target date and a monthly amount (F).', ms:'Orang yang memilih tarikh sasaran dan jumlah bulanan (F).'},
       res:(rows) => { const n = new Set(rows.filter((r) => r.step === 'Set a plan').map((r) => r.pseudo_id)).size; return {en:n + ' people', ms:n + ' orang'}; }, feeds:{en:'Funnel, step 3', ms:'Corong, langkah 3'}},
      {cols:['B', 'E', 'F'], match:(r) => r.step === 'Started auto-deposit',
       t:{en:'Saving automatically', ms:'Menyimpan secara automatik'}, rule:{en:'Direct debit or salary deduction started: saving no longer depends on memory.', ms:'Debit terus atau potongan gaji bermula: menyimpan tidak lagi bergantung pada ingatan.'},
       res:(rows) => { const n = new Set(rows.filter((r) => r.step === 'Started auto-deposit').map((r) => r.pseudo_id)).size; return {en:n + ' people', ms:n + ' orang'}; }, feeds:{en:'Funnel, step 4', ms:'Corong, langkah 4'}},
      {cols:['B', 'E'], match:(r) => r.step === 'Still saving at 6 months',
       t:{en:'Still saving after 6 months', ms:'Masih menyimpan selepas 6 bulan'}, rule:{en:'The step that matters most: a habit, not a one-off.', ms:'Langkah paling penting: tabiat, bukan sekali sahaja.'},
       res:(rows) => { const n = new Set(rows.filter((r) => r.step === 'Still saving at 6 months').map((r) => r.pseudo_id)).size; return {en:n + ' person', ms:n + ' orang'}; }, feeds:{en:'Bottom of the funnel', ms:'Bahagian bawah corong'}}
    ],
    privacy:{en:'To see whether a programme works, TH joins this log to the Monthly snapshot by pseudo_id and compares people who joined with similar people who did not.', ms:'Untuk melihat keberkesanan program, TH menggabungkan log ini dengan Monthly snapshot melalui pseudo_id dan membandingkan peserta dengan orang serupa yang tidak menyertai.'}
  }
};

/* ---------- Possible grant proposal topics ----------
   Drafts for the team discussion: each grows out of one or more of TH's
   three problems and builds on a part of this dashboard (pages). */
TH.TOPIC_KINDS = {
  technical:{en:'Technical', ms:'Teknikal'}, readiness:{en:'Readiness', ms:'Kesediaan'}, behaviour:{en:'Behavioural', ms:'Tingkah laku'},
  finance:{en:'Institutional finance', ms:'Kewangan institusi'}, literacy:{en:'Literacy & education', ms:'Literasi & pendidikan'}, policy:{en:'Policy & equity', ms:'Dasar & ekuiti'}
};
TH.TOPICS = [
  {id:'t1', kind:'technical', problems:[1, 2, 3], pages:['tracker', 'plan', 'blueprint'],
   title:{en:'A privacy-preserving Istito\'ah Readiness Tracker for Tabung Haji: design and evaluation', ms:'Penjejak Kesediaan Istito\'ah yang memelihara privasi untuk Tabung Haji: reka bentuk dan penilaian'},
   ps:{en:'TH holds balances for 9.7 million depositors but has no single view of who is ready for Hajj, who has stalled, and where. Readiness data sits across systems and branches, reports arrive after the quarter ends, and any view must respect PDPA 2010. Seruan Istito\'ah and the 31 December 2028 deadline make a near real-time, privacy-preserving view urgent.',
       ms:'TH memegang baki 9.7 juta pendeposit tetapi tiada satu paparan tentang siapa yang bersedia untuk haji, siapa yang terhenti, dan di mana. Data kesediaan tersebar di pelbagai sistem dan cawangan, laporan tiba selepas suku tahun berakhir, dan sebarang paparan mesti mematuhi PDPA 2010. Seruan Istito\'ah dan tarikh akhir 31 Disember 2028 menjadikan paparan hampir masa nyata yang memelihara privasi satu keperluan mendesak.'},
   rq:[{en:'What data architecture and readiness indicators let TH monitor 9.7 million depositors by state, age group and saving channel, using only pseudonymised, aggregated data?', ms:'Seni bina data dan penunjuk kesediaan apakah yang membolehkan TH memantau 9.7 juta pendeposit mengikut negeri, kumpulan umur dan saluran simpanan, menggunakan data agregat tanpa nama sahaja?'},
       {en:'Does the tracker help TH leaders and branch staff decide faster and more accurately than current reports, and which design features explain the difference?', ms:'Adakah penjejak membantu pemimpin dan kakitangan cawangan TH membuat keputusan lebih cepat dan tepat berbanding laporan semasa, dan ciri reka bentuk mana yang menjelaskan perbezaannya?'}],
   method:{en:'Design science research: build the tracker in three phases with TH, then test it with leaders and branch staff on real decision tasks (time, accuracy, usability score).', ms:'Penyelidikan sains reka bentuk: membina penjejak dalam tiga fasa bersama TH, kemudian mengujinya dengan pemimpin dan kakitangan cawangan pada tugasan keputusan sebenar (masa, ketepatan, skor kebolehgunaan).'},
   data:{en:'Monthly snapshot, KPI targets and TH amounts templates; usability test records.', ms:'Templat Monthly snapshot, sasaran KPI dan amaun TH; rekod ujian kebolehgunaan.'},
   expertise:{en:'Information systems, data engineering, UX design', ms:'Sistem maklumat, kejuruteraan data, reka bentuk UX'},
   output:{en:'A working dashboard inside TH, a data dictionary and an evaluation paper.', ms:'Papan pemuka berfungsi di dalam TH, kamus data dan kertas penilaian.'}},

  {id:'t2', kind:'readiness', problems:[3, 1], pages:['tracker', 'depositor', 'cost'],
   title:{en:'How ready are Tabung Haji depositors to perform Hajj? Measuring financial istito\'ah against each pilgrim\'s own payment', ms:'Sejauh mana pendeposit Tabung Haji bersedia menunaikan haji? Mengukur istito\'ah kewangan berbanding bayaran jemaah sendiri'},
   ps:{en:'Seruan Istito\'ah makes savings the main criterion for choosing pilgrims, yet "ready" means different amounts for different people: RM15,000 for a first-time B40 pilgrim, RM23,500 for M40 and RM33,300 for T20. There is no published measure of how many depositors are ready against their own payment, which groups lag, or how many registered depositors may miss RM15,000 by the 2028 deadline. Istito\'ah is also more than money: knowledge, health and family support matter.',
       ms:'Seruan Istito\'ah menjadikan simpanan kriteria utama pemilihan jemaah, namun "bersedia" bermaksud amaun berbeza bagi orang berbeza: RM15,000 bagi jemaah B40 kali pertama, RM23,500 bagi M40 dan RM33,300 bagi T20. Tiada ukuran diterbitkan tentang berapa ramai pendeposit bersedia berbanding bayaran sendiri, kumpulan mana yang ketinggalan, atau berapa ramai pendeposit berdaftar mungkin tidak mencapai RM15,000 menjelang tarikh akhir 2028. Istito\'ah juga lebih daripada wang: ilmu, kesihatan dan sokongan keluarga turut penting.'},
   rq:[{en:'What share of depositors, by state, age group, payment category and saving channel, can meet their own Bayaran Haji, and which household factors explain the gap?', ms:'Berapa peratus pendeposit, mengikut negeri, kumpulan umur, kategori bayaran dan saluran simpanan, mampu memenuhi Bayaran Haji sendiri, dan faktor isi rumah mana yang menjelaskan jurangnya?'},
       {en:'Which registered depositors are most at risk of missing RM15,000 by 31 December 2028, and how does financial readiness relate to knowledge, health and family readiness?', ms:'Pendeposit berdaftar mana yang paling berisiko tidak mencapai RM15,000 menjelang 31 Disember 2028, dan bagaimana kesediaan kewangan berkait dengan kesediaan ilmu, kesihatan dan keluarga?'}],
   method:{en:'Analysis of pseudonymised balances inside TH, plus a survey of a stratified sample of registered depositors on income, commitments and non-financial readiness.', ms:'Analisis baki tanpa nama di dalam TH, serta tinjauan sampel berstrata pendeposit berdaftar tentang pendapatan, komitmen dan kesediaan bukan kewangan.'},
   data:{en:'Monthly snapshot template; a depositor survey.', ms:'Templat Monthly snapshot; tinjauan pendeposit.'},
   expertise:{en:'Household finance, Islamic finance, survey statistics', ms:'Kewangan isi rumah, kewangan Islam, statistik tinjauan'},
   output:{en:'An Istito\'ah readiness index by state and group, a 2028 risk profile and a policy brief.', ms:'Indeks kesediaan istito\'ah mengikut negeri dan kumpulan, profil risiko 2028 dan ringkasan dasar.'}},

  {id:'t3', kind:'behaviour', problems:[1], pages:['tracker', 'literacy', 'depositor'],
   title:{en:'Why do depositors save irregularly? Behavioural drivers of last-minute Hajj saving and Shariah-compliant nudges for steady saving', ms:'Mengapa pendeposit menyimpan secara tidak konsisten? Pemacu tingkah laku simpanan haji saat akhir dan dorongan patuh Syariah untuk simpanan berterusan'},
   ps:{en:'TH reports that many depositors save little for years and deposit a lump sum only when their turn is near. Irregular saving makes readiness hard to predict and leaves TH carrying costs in the meantime. The causes are unclear (irregular income, present bias, competing priorities, or the sense that the turn is far away), and which nudges work for Malaysian Muslim savers, within Shariah, has not been tested.',
       ms:'TH melaporkan ramai pendeposit menyimpan sedikit bertahun-tahun dan memasukkan wang sekaligus hanya apabila giliran hampir tiba. Simpanan tidak konsisten menyukarkan ramalan kesediaan dan menyebabkan TH menanggung kos sementara itu. Puncanya belum jelas (pendapatan tidak tetap, bias masa kini, keutamaan lain, atau rasa giliran masih jauh), dan dorongan mana yang berkesan bagi penyimpan Muslim Malaysia, dalam batas Syariah, belum diuji.'},
   rq:[{en:'What saving patterns (regular, irregular, last-minute lump sum) do depositors follow, and which income, demographic and attitude factors predict them?', ms:'Apakah corak simpanan (tetap, tidak tetap, sekaligus saat akhir) yang diikuti pendeposit, dan faktor pendapatan, demografi dan sikap mana yang meramalkannya?'},
       {en:'Do default payroll deduction, monthly reminders and commitment devices increase the number of months depositors save, compared with no nudge, in a randomised field trial?', ms:'Adakah potongan gaji secara lalai, peringatan bulanan dan alat komitmen meningkatkan bilangan bulan pendeposit menyimpan, berbanding tanpa dorongan, dalam ujian lapangan rawak?'}],
   method:{en:'Pattern mining on 12-month deposit histories, then a randomised controlled trial with TH (THiJARI reminders, payroll defaults) over 6 to 12 months.', ms:'Perlombongan corak pada sejarah simpanan 12 bulan, kemudian ujian terkawal rawak bersama TH (peringatan THiJARI, potongan gaji lalai) selama 6 hingga 12 bulan.'},
   data:{en:'Monthly snapshot (months_deposited_12m, deposit_this_month_rm) and Programme log templates.', ms:'Templat Monthly snapshot (months_deposited_12m, deposit_this_month_rm) dan Programme log.'},
   expertise:{en:'Behavioural economics, experimental design, Shariah advisory', ms:'Ekonomi tingkah laku, reka bentuk eksperimen, nasihat Syariah'},
   output:{en:'A typology of saving patterns, trial results and a nudge playbook for TH.', ms:'Tipologi corak simpanan, keputusan ujian dan buku panduan dorongan untuk TH.'}},

  {id:'t4', kind:'finance', problems:[2, 1], pages:['cost', 'depositor'],
   title:{en:'Funding Hajj costs before the season: liquidity planning and Shariah-compliant ways to align pilgrims\' savings with TH\'s early payments', ms:'Membiayai kos haji sebelum musim: perancangan kecairan dan kaedah patuh Syariah untuk menyelaraskan simpanan jemaah dengan bayaran awal TH'},
   ps:{en:'TH must pay some Hajj costs two to three years before each season, but cannot use depositors\' money while many future pilgrims have not saved enough, so TH funds the gap itself, on top of HAFIS assistance of about RM234 million this season. How large this gap is under different saving behaviours and cost rises, and how more of it could fairly come from pilgrims\' own savings, is not publicly known.',
       ms:'TH perlu membayar sebahagian kos haji dua hingga tiga tahun sebelum setiap musim, tetapi tidak boleh menggunakan wang pendeposit selagi ramai bakal jemaah belum cukup simpanan, jadi TH membiayai jurang itu sendiri, selain bantuan HAFIS kira-kira RM234 juta musim ini. Saiz jurang ini di bawah tingkah laku simpanan dan kenaikan kos yang berbeza, dan bagaimana lebih banyak daripadanya boleh datang secara adil daripada simpanan jemaah sendiri, tidak diketahui umum.'},
   rq:[{en:'How large is TH\'s early-payment funding gap for coming seasons under different scenarios of depositor saving, Kos Haji rises and category mix?', ms:'Berapa besar jurang pembiayaan bayaran awal TH bagi musim akan datang di bawah senario simpanan pendeposit, kenaikan Kos Haji dan campuran kategori yang berbeza?'},
       {en:'Which Shariah-compliant mechanisms, such as an earlier savings deadline for those near their turn or a ring-fenced Tabung Istito\'ah, would reduce the gap, and how acceptable are they to depositors?', ms:'Mekanisme patuh Syariah mana, seperti tarikh akhir simpanan lebih awal bagi yang hampir giliran atau Tabung Istito\'ah yang diasingkan, akan mengurangkan jurang, dan sejauh mana ia diterima pendeposit?'}],
   method:{en:'Cash-flow scenario modelling with TH finance, Shariah analysis of candidate mechanisms, and a choice experiment on depositor acceptance.', ms:'Pemodelan senario aliran tunai bersama kewangan TH, analisis Syariah mekanisme calon, dan eksperimen pilihan tentang penerimaan pendeposit.'},
   data:{en:'TH amounts template; aggregated Monthly snapshot of registrants near their turn; TH\'s early-payment schedule (to be shared by TH).', ms:'Templat amaun TH; Monthly snapshot agregat pendaftar yang hampir giliran; jadual bayaran awal TH (akan dikongsi TH).'},
   expertise:{en:'Islamic and corporate finance, actuarial modelling, Shariah', ms:'Kewangan Islam dan korporat, pemodelan aktuari, Syariah'},
   output:{en:'A funding-gap model and an options paper for TH\'s board.', ms:'Model jurang pembiayaan dan kertas pilihan untuk lembaga TH.'}},

  {id:'t5', kind:'literacy', problems:[1, 3], pages:['literacy', 'depositor'],
   title:{en:'Does Hajj financial literacy change saving behaviour? Evaluating age-targeted programmes delivered through apps, mosques and employers', ms:'Adakah literasi kewangan haji mengubah tingkah laku simpanan? Menilai program mengikut umur melalui aplikasi, masjid dan majikan'},
   ps:{en:'Literacy efforts usually report attendance, not changes in saving. TH needs to know which programme, for which group and through which channel, actually makes depositors save every month and reach RM15,000 sooner. Without that evidence, outreach budgets cannot be targeted, and the reported 18% deferral rate at the offer stage cannot be traced to its causes.',
       ms:'Usaha literasi biasanya melaporkan kehadiran, bukan perubahan simpanan. TH perlu tahu program mana, bagi kumpulan mana dan melalui saluran mana, yang benar-benar membuat pendeposit menyimpan setiap bulan dan mencapai RM15,000 lebih awal. Tanpa bukti ini, bajet jangkauan tidak dapat disasarkan, dan kadar penangguhan 18% pada peringkat tawaran tidak dapat dikesan puncanya.'},
   rq:[{en:'Do depositors who join a programme save in more months a year and reach RM15,000 sooner than similar depositors who do not?', ms:'Adakah pendeposit yang menyertai program menyimpan dalam lebih banyak bulan setahun dan mencapai RM15,000 lebih awal berbanding pendeposit serupa yang tidak menyertai?'},
       {en:'Which delivery channel (THiJARI app, mosque sessions, employer payroll) works best for youth, families, mid-career and older depositors?', ms:'Saluran penyampaian mana (aplikasi THiJARI, sesi masjid, potongan gaji majikan) paling berkesan bagi belia, keluarga, pertengahan kerjaya dan pendeposit berumur?'}],
   method:{en:'Quasi-experimental evaluation (matched comparison, difference-in-differences) using the programme log joined to monthly snapshots, with a literacy quiz before and after.', ms:'Penilaian kuasi-eksperimen (perbandingan padanan, perbezaan-dalam-perbezaan) menggunakan log program yang digabung dengan petikan bulanan, dengan kuiz literasi sebelum dan selepas.'},
   data:{en:'Programme log and Monthly snapshot templates.', ms:'Templat Programme log dan Monthly snapshot.'},
   expertise:{en:'Financial education, programme evaluation, Islamic studies', ms:'Pendidikan kewangan, penilaian program, pengajian Islam'},
   output:{en:'Evaluated programme kits and evidence on what works for whom.', ms:'Kit program yang dinilai dan bukti tentang apa yang berkesan bagi siapa.'}},

  {id:'t6', kind:'policy', problems:[3], pages:['tracker', 'cost'],
   title:{en:'Is savings-based selection fair? Equity effects of Seruan Istito\'ah on who gets to perform Hajj', ms:'Adakah pemilihan berasaskan simpanan adil? Kesan ekuiti Seruan Istito\'ah terhadap siapa yang dapat menunaikan haji'},
   ps:{en:'With 31,600 places a year against 9.7 million depositors, Seruan Istito\'ah shifts selection toward savings: automatic queue eligibility at RM15,000 from 2029 and a re-sorted queue. This may speed up ready pilgrims but could push back lower-income, rural or older depositors who save slowly. These equity effects have not been measured.',
       ms:'Dengan 31,600 tempat setahun berbanding 9.7 juta pendeposit, Seruan Istito\'ah mengalihkan pemilihan ke arah simpanan: kelayakan giliran automatik pada RM15,000 mulai 2029 dan giliran yang disusun semula. Ini mungkin mempercepat jemaah yang bersedia tetapi boleh melambatkan pendeposit berpendapatan rendah, luar bandar atau berumur yang menyimpan perlahan. Kesan ekuiti ini belum diukur.'},
   rq:[{en:'How will the RM15,000 rule and the automatic re-sorting of the queue change the profile of pilgrims by payment category, state and age?', ms:'Bagaimana peraturan RM15,000 dan penyusunan semula giliran secara automatik mengubah profil jemaah mengikut kategori bayaran, negeri dan umur?'},
       {en:'Which complementary criteria or support (years of steady saving, first-time status, targeted assistance) keep selection fair without weakening readiness?', ms:'Kriteria atau sokongan pelengkap mana (tempoh menyimpan secara konsisten, status kali pertama, bantuan bersasar) mengekalkan pemilihan yang adil tanpa melemahkan kesediaan?'}],
   method:{en:'Microsimulation of the queue before and after the rule, on pseudonymised registration and balance data, plus interviews with TH and depositor groups.', ms:'Mikrosimulasi giliran sebelum dan selepas peraturan, menggunakan data pendaftaran dan baki tanpa nama, serta temu bual bersama TH dan kumpulan pendeposit.'},
   data:{en:'Monthly snapshot with registration dates; queue data from TH.', ms:'Monthly snapshot dengan tarikh pendaftaran; data giliran daripada TH.'},
   expertise:{en:'Public policy, econometrics and simulation, maqasid al-shariah', ms:'Dasar awam, ekonometrik dan simulasi, maqasid al-syariah'},
   output:{en:'An equity assessment of Seruan Istito\'ah and policy options.', ms:'Penilaian ekuiti Seruan Istito\'ah dan pilihan dasar.'}}
];

/* ---------- Info notes ("i" buttons) ----------
   t = title, d = what it shows and how to read it (everyone),
   p = pitch tip (shown only when Presenter notes are switched on). */
TH.INFO = {
  ladder: {t:{en:'The istito\'ah ladder', ms:'Tangga istito\'ah'},
    d:{en:'Each dot is a group of depositors (synthetic), placed by TH balance. Gold lines are TH\'s own amounts: RM8,325 (25% of Kos Haji), RM15,000 (offer-letter minimum; automatic queue from 2029), RM23,500 (M40 payment) and RM33,300 (full Kos Haji). The figure under each line is the share of depositors past it. Tap a state to compare.', ms:'Setiap titik ialah sekumpulan pendeposit (sintetik), disusun mengikut baki TH. Garis emas ialah amaun TH sendiri: RM8,325 (25% Kos Haji), RM15,000 (minimum surat tawaran; giliran automatik mulai 2029), RM23,500 (bayaran M40) dan RM33,300 (Kos Haji penuh). Angka di bawah setiap garis ialah peratus pendeposit yang melepasinya. Ketik negeri untuk membandingkan.'},
    p:{en:'Open with this: most depositors sit left of RM15,000. Closing that gap is what the tracker and the literacy modules are for.', ms:'Mulakan di sini: kebanyakan pendeposit berada di kiri RM15,000. Merapatkan jurang itulah tujuan penjejak dan modul literasi.'}},
  split: {t:{en:'Who pays the RM33,300', ms:'Siapa membayar RM33,300'},
    d:{en:'One bar per payment category. Green is what the pilgrim pays (Bayaran Haji); gold is assistance (HAFIS from TH, plus RM1,000 from the Government for B40). Official 1448H/2027M figures.', ms:'Satu bar bagi setiap kategori bayaran. Hijau ialah bayaran jemaah (Bayaran Haji); emas ialah bantuan (HAFIS daripada TH, serta RM1,000 daripada Kerajaan bagi B40). Angka rasmi 1448H/2027M.'},
    p:{en:'Make the point that "ready" means RM15,000 for a B40 pilgrim but RM33,300 for T20, so one percentage for everyone misleads.', ms:'Tegaskan bahawa "bersedia" bermaksud RM15,000 bagi jemaah B40 tetapi RM33,300 bagi T20, jadi satu peratus untuk semua mengelirukan.'}},
  ruler: {t:{en:'Brief vs TH amounts', ms:'Taklimat berbanding amaun TH'},
    d:{en:'Dashed marks below the bar are the brief\'s 25%, 50% and 100% of the package. Gold marks above are TH\'s own amounts. The red strip is the RM1,650 between TH\'s RM15,000 gate and the brief\'s 50%.', ms:'Tanda putus-putus di bawah bar ialah 25%, 50% dan 100% pakej dalam taklimat. Tanda emas di atas ialah amaun TH sendiri. Jalur merah ialah RM1,650 antara ambang RM15,000 TH dan 50% taklimat.'},
    p:{en:'Present the new ladder as a proposal for TH to confirm in Phase 2, not a decision already made.', ms:'Bentangkan tangga baharu sebagai cadangan untuk disahkan TH dalam Fasa 2, bukan keputusan muktamad.'}},
  filters: {t:{en:'Filters and scenario', ms:'Penapis dan senario'},
    d:{en:'Every panel follows these filters. Corporate category is how the depositor saves (payroll type, or no regular deposit). The Kos Haji scenario tests a higher cost: the RM15,000 gate stays fixed and the other amounts rise.', ms:'Setiap panel mengikut penapis ini. Kategori korporat ialah cara pendeposit menyimpan (jenis potongan gaji, atau tiada simpanan tetap). Senario Kos Haji menguji kos lebih tinggi: ambang RM15,000 kekal dan amaun lain meningkat.'},
    p:{en:'Switch the scenario to +20% to show readiness falling before any cost change is announced.', ms:'Tukar senario kepada +20% untuk menunjukkan kesediaan menurun sebelum sebarang perubahan kos diumumkan.'}},
  statN: {t:{en:'Depositors in view', ms:'Pendeposit dalam paparan'},
    d:{en:'How many depositors match the filters. Synthetic: only the national total is scaled to TH\'s reported 9.7 million.', ms:'Bilangan pendeposit yang sepadan dengan penapis. Sintetik: hanya jumlah nasional diskala kepada 9.7 juta yang dilaporkan TH.'}},
  statG15: {t:{en:'At or above RM15,000', ms:'RM15,000 ke atas'},
    d:{en:'Share of depositors holding at least RM15,000: the minimum for an offer letter today and for automatic queue eligibility from 1 January 2029. The change is in percentage points against the same quarter a year earlier.', ms:'Peratus pendeposit yang memiliki sekurang-kurangnya RM15,000: minimum surat tawaran hari ini dan kelayakan giliran automatik mulai 1 Januari 2029. Perubahan dalam mata peratus berbanding suku yang sama setahun lalu.'}},
  statPay: {t:{en:'Can cover own Bayaran Haji', ms:'Mampu tampung Bayaran Haji sendiri'},
    d:{en:'Share who could pay their own category\'s Bayaran Haji today: B40 RM15,000, M40 RM23,500, T20 RM33,300. The category mix is synthetic until Phase 1 maps it.', ms:'Peratus yang mampu membayar Bayaran Haji kategori sendiri hari ini: B40 RM15,000, M40 RM23,500, T20 RM33,300. Campuran kategori adalah sintetik sehingga dipetakan dalam Fasa 1.'}},
  statBelow: {t:{en:'Registered, still below RM15,000', ms:'Berdaftar, masih bawah RM15,000'},
    d:{en:'Depositors already registered for Hajj who hold less than RM15,000. They must reach it by 31 December 2028; from 1 January 2029 the queue is re-sorted automatically.', ms:'Pendeposit yang sudah mendaftar haji tetapi memiliki kurang daripada RM15,000. Mereka perlu mencapainya sebelum 31 Disember 2028; mulai 1 Januari 2029 giliran disusun semula secara automatik.'},
    p:{en:'This is the headline risk for 2026 to 2028, and where the mid-career and pre-departure modules start.', ms:'Inilah risiko utama bagi 2026 hingga 2028, dan tempat modul pertengahan kerjaya dan pra-pemergian bermula.'}},
  gauges: {t:{en:'Readiness against targets', ms:'Kesediaan berbanding sasaran'},
    d:{en:'Share of depositors at each ladder amount. The dark tick is an example target. On track = at or above target; Close = within 3 points; Below target = more than 3 points short.', ms:'Peratus pendeposit pada setiap amaun tangga. Tanda gelap ialah contoh sasaran. Menepati sasaran = pada atau melebihi sasaran; Hampir = dalam 3 mata; Bawah sasaran = kurang lebih 3 mata.'},
    p:{en:'Say "example targets": TH sets the real ones in the Phase 2 workshops.', ms:'Sebut "contoh sasaran": TH menetapkan sasaran sebenar dalam bengkel Fasa 2.'}},
  map: {t:{en:'Tile map', ms:'Peta jubin'},
    d:{en:'One equal tile per state, so small states stay visible; it is not drawn to geographic scale. Darker means higher on the chosen measure. Click a tile to filter every panel to that state; click again to clear.', ms:'Satu jubin sama saiz bagi setiap negeri supaya negeri kecil kekal kelihatan; ia bukan skala geografi. Lebih gelap bermaksud lebih tinggi bagi ukuran dipilih. Klik jubin untuk menapis semua panel; klik sekali lagi untuk membatalkan.'}},
  trend: {t:{en:'Trend over time', ms:'Trend mengikut masa'},
    d:{en:'Quarterly line for your selection against Malaysia. Gold dashed lines mark the RM15,000 minimum (2025) and the Seruan Istito\'ah plan (September 2026). Show data table gives exact values.', ms:'Garis suku tahunan bagi pilihan anda berbanding Malaysia. Garis emas putus-putus menandakan minimum RM15,000 (2025) dan pelan Seruan Istito\'ah (September 2026). Papar jadual data untuk nilai tepat.'}},
  bands: {t:{en:'Balance bands', ms:'Jalur baki'},
    d:{en:'How depositors spread between TH\'s amounts, for each age group. Darker bands are closer to the full Kos Haji. Hover a bar for the exact shares.', ms:'Taburan pendeposit antara amaun TH, bagi setiap kumpulan umur. Jalur lebih gelap lebih hampir dengan Kos Haji penuh. Halakan tetikus pada bar untuk peratus tepat.'}},
  matrix: {t:{en:'Trend matrix', ms:'Matriks trend'},
    d:{en:'Each state by age group or corporate category, on the measure chosen on the map, sorted by the state total. Use it to see where a module would help most.', ms:'Setiap negeri mengikut kumpulan umur atau kategori korporat, bagi ukuran yang dipilih pada peta, disusun ikut jumlah negeri. Gunakannya untuk melihat di mana modul paling membantu.'}},
  watch: {t:{en:'2028 watchlist', ms:'Senarai pantau 2028'},
    d:{en:'Registered depositors below RM15,000 by state, ranked by share. Risk: High = 58% or more of registered; Elevated = 50–58%; Lower = under 50%. The cut-offs are illustrative.', ms:'Pendeposit berdaftar di bawah RM15,000 mengikut negeri, disusun ikut peratus. Risiko: Tinggi = 58% atau lebih daripada yang berdaftar; Meningkat = 50–58%; Lebih rendah = bawah 50%. Had ini ialah contoh.'}},
  personas: {t:{en:'Fictional depositors', ms:'Pendeposit rekaan'},
    d:{en:'Four made-up depositors with typical starting points. Pick one, then change any setting. This page models one person; it does not change the Readiness tracker, which covers all depositors.', ms:'Empat pendeposit rekaan dengan titik mula biasa. Pilih seorang, kemudian ubah mana-mana tetapan. Halaman ini memodelkan seorang; ia tidak mengubah Penjejak kesediaan, yang meliputi semua pendeposit.'},
    p:{en:'Use Mak Som (B40, registered) for the 2028 deadline story, and Aiman for the long road young savers face.', ms:'Gunakan Mak Som (B40, berdaftar) untuk kisah tarikh akhir 2028, dan Aiman untuk perjalanan panjang penyimpan muda.'}},
  category: {t:{en:'Payment category', ms:'Kategori bayaran'},
    d:{en:'Sets the depositor\'s own Bayaran Haji: B40 RM15,000, M40 RM23,500, T20 RM33,300 (TH, 1448H/2027M). TH fixes the category on the offer letter.', ms:'Menetapkan Bayaran Haji pendeposit: B40 RM15,000, M40 RM23,500, T20 RM33,300 (TH, 1448H/2027M). TH menetapkan kategori pada surat tawaran.'}},
  registered: {t:{en:'Already registered', ms:'Sudah berdaftar'},
    d:{en:'Tick if the depositor has already registered for Hajj. Registered depositors must reach RM15,000 by 31 December 2028, so that deadline is added to the list automatically.', ms:'Tandakan jika pendeposit sudah mendaftar haji. Pendeposit berdaftar perlu mencapai RM15,000 sebelum 31 Disember 2028, jadi tarikh akhir itu ditambah secara automatik.'}},
  extra: {t:{en:'Extra from a literacy plan', ms:'Tambahan dari pelan literasi'},
    d:{en:'The extra monthly saving a literacy module helps the depositor commit to, such as a payroll top-up. The dashed gold line shows its effect; it does not change the green current-plan line.', ms:'Simpanan bulanan tambahan yang dibantu oleh modul literasi, seperti tambahan potongan gaji. Garis emas putus-putus menunjukkan kesannya; ia tidak mengubah garis hijau pelan semasa.'}},
  assumptions: {t:{en:'TH figures and assumptions', ms:'Angka TH dan andaian'},
    d:{en:'Kos Haji, its yearly rise and the profit distribution are settings, not forecasts. TH has held Kos Haji at RM33,300 since 1445H/2024M and declared 3.50% for 2025; neither is guaranteed for the future.', ms:'Kos Haji, kenaikan tahunannya dan agihan keuntungan ialah tetapan, bukan ramalan. TH mengekalkan Kos Haji RM33,300 sejak 1445H/2024M dan mengisytiharkan 3.50% bagi 2025; kedua-duanya tidak dijamin pada masa hadapan.'}},
  simchart: {t:{en:'Reading the chart', ms:'Membaca carta'},
    d:{en:'Green: balance on the current plan. Dashed gold: with the literacy plan. Solid gold line: RM15,000 gate. Grey dashed: own payment and full Kos Haji (they rise if you set a yearly rise). Numbered lines: your deadlines, green if met and red if missed.', ms:'Hijau: baki pelan semasa. Emas putus-putus: dengan pelan literasi. Garis emas: ambang RM15,000. Kelabu putus-putus: bayaran sendiri dan Kos Haji penuh (meningkat jika kenaikan tahunan ditetapkan). Garis bernombor: tarikh akhir anda, hijau jika dicapai dan merah jika terlepas.'}},
  milestones: {t:{en:'Milestones', ms:'Pencapaian'},
    d:{en:'When the current plan reaches each amount, with the date and the depositor\'s age, and how much sooner the literacy plan would get there.', ms:'Bila pelan semasa mencapai setiap amaun, dengan tarikh dan umur pendeposit, dan berapa lebih awal pelan literasi akan mencapainya.'}},
  deadlines: {t:{en:'How deadlines work', ms:'Cara tarikh akhir berfungsi'},
    d:{en:'A deadline is a date you want an amount reached by, such as a planned Hajj year. It tests the plan; it does not change it, so moving a date only moves its line. When one is missed, press "Use this amount" to set the monthly deposit it needs, and the chart and milestones update.', ms:'Tarikh akhir ialah tarikh anda mahu sesuatu amaun dicapai, seperti tahun haji yang dirancang. Ia menguji pelan; ia tidak mengubahnya, jadi mengalihkan tarikh hanya mengalihkan garisnya. Jika terlepas, tekan "Guna amaun ini" untuk menetapkan simpanan bulanan yang diperlukan, dan carta serta pencapaian dikemas kini.'},
    p:{en:'Live demo: set a deadline the plan misses, press "Use this amount", and watch the line turn green.', ms:'Demo langsung: tetapkan tarikh akhir yang terlepas, tekan "Guna amaun ini", dan lihat garis bertukar hijau.'}},
  gantt: {t:{en:'Timeline', ms:'Garis masa'},
    d:{en:'Proposed months, counted from the month the agreement is signed. Bars are phase work; gold diamonds are KPI workshops and steering committee meetings.', ms:'Bulan yang dicadangkan, dikira dari bulan perjanjian ditandatangani. Bar ialah kerja fasa; berlian emas ialah bengkel KPI dan mesyuarat jawatankuasa pemandu.'}},
  planLadder: {t:{en:'The ladder to calibrate', ms:'Tangga untuk ditentukur'},
    d:{en:'The four amounts the gauges and the watchlist use. The brief\'s 50% is replaced by TH\'s RM15,000 gate, and the M40 payment is added.', ms:'Empat amaun yang digunakan tolok dan senarai pantau. 50% dalam taklimat digantikan dengan ambang RM15,000 TH, dan bayaran M40 ditambah.'},
    p:{en:'Frame it as our proposal for TH to approve or change in the Phase 2 workshops.', ms:'Bentangkan sebagai cadangan kami untuk diluluskan atau diubah TH dalam bengkel Fasa 2.'}},
  wire: {t:{en:'Layout schema', ms:'Skema susun atur'},
    d:{en:'A plan of the dashboard\'s nine regions. Click a region to read what it shows and which data it reads.', ms:'Pelan sembilan kawasan papan pemuka. Klik kawasan untuk membaca apa yang dipaparkan dan data yang dibacanya.'}},
  eco: {t:{en:'Ecosystem map', ms:'Peta ekosistem'},
    d:{en:'Who sends data into the tracker and who sees what comes out. Solid green circles are core to the project; dashed gold circles are proposed partners, not yet agreed. Click a node to trace its flows.', ms:'Siapa menghantar data ke penjejak dan siapa melihat hasilnya. Bulatan hijau ialah teras projek; bulatan emas putus-putus ialah rakan dicadangkan, belum dipersetujui. Klik nod untuk menjejak alirannya.'},
    p:{en:'Do not present proposed partners as agreed; they are invitations.', ms:'Jangan bentangkan rakan dicadangkan sebagai sudah bersetuju; mereka ialah jemputan.'}},
  schema: {t:{en:'Backend schema', ms:'Skema bahagian belakang'},
    d:{en:'Draft tables for Phase 1. Depositors appear only as pseudonymised IDs, never names or IC numbers; the dashboard reads aggregate views with at least 10 people per cell.', ms:'Jadual draf untuk Fasa 1. Pendeposit hanya muncul sebagai ID tanpa nama, bukan nama atau nombor KP; papan pemuka membaca paparan agregat dengan sekurang-kurangnya 10 orang setiap sel.'}},
  layers: {t:{en:'Four layers', ms:'Empat lapisan'},
    d:{en:'The four steps a depositor moves through, each measured by one figure on the dashboard.', ms:'Empat langkah yang dilalui pendeposit, setiap satu diukur oleh satu angka di papan pemuka.'}},
  pipe: {t:{en:'Telemetry pipeline', ms:'Saluran telemetri'},
    d:{en:'How one module\'s events travel from the app or workshop to the dashboard tiles, staying anonymous on the way. Pick a module above to change it.', ms:'Bagaimana acara sesuatu modul bergerak dari aplikasi atau bengkel ke jubin papan pemuka, kekal tanpa nama sepanjang jalan. Pilih modul di atas untuk menukarnya.'}},
  events: {t:{en:'Telemetry events', ms:'Acara telemetri'},
    d:{en:'The events modules can send. Highlighted rows are the ones the chosen module sends.', ms:'Acara yang boleh dihantar modul. Baris berwarna ialah acara yang dihantar oleh modul yang dipilih.'}},
  early: {t:{en:'Early-payment calculator', ms:'Kalkulator bayaran awal'},
    d:{en:'What TH pays ahead = 31,600 pilgrims × RM33,300 × the share paid early. What the next pilgrims hold = 31,600 × their average own payment × the share saved. Their savings can cover up to the bill; the rest is the gap TH funds itself. Both shares are assumptions to check with TH.', ms:'Bayaran awal TH = 31,600 jemaah × RM33,300 × bahagian dibayar awal. Simpanan bakal jemaah = 31,600 × purata bayaran sendiri × bahagian disimpan. Simpanan mereka boleh menampung sehingga jumlah bil; bakinya jurang yang dibiayai TH. Kedua-dua bahagian ialah andaian untuk disemak dengan TH.'},
    p:{en:'Ask TH in the meeting: what share is paid early, and how far ahead? Then set the slider live.', ms:'Tanya TH dalam mesyuarat: berapa bahagian dibayar awal, dan berapa lama lebih awal? Kemudian tetapkan peluncur secara langsung.'}},
  coverage: {t:{en:'What each topic covers', ms:'Liputan setiap topik'},
    d:{en:'A filled dot means the topic works directly on that TH problem or builds on that part of the dashboard. Every column has at least one topic, so together the proposals cover everything the dashboard explains.', ms:'Titik penuh bermaksud topik itu menangani terus masalah TH tersebut atau membina di atas bahagian papan pemuka itu. Setiap lajur mempunyai sekurang-kurangnya satu topik, jadi bersama-sama cadangan ini meliputi semua yang dijelaskan papan pemuka.'},
    p:{en:'Topics can be merged or split; the table shows nothing is left out if a topic is dropped.', ms:'Topik boleh digabung atau dipecahkan; jadual menunjukkan tiada yang tertinggal jika satu topik digugurkan.'}},
  dt: {t:{en:'Data template', ms:'Templat data'},
    d:{en:'The shape of the spreadsheet that feeds this page: its columns, a few made-up rows, and how the page turns rows into numbers. Click a step to light up the rows and columns it uses. Shaded fx columns are worked out, not typed. Download it to see the same thing in Excel.', ms:'Bentuk hamparan yang menyalurkan data ke halaman ini: lajurnya, beberapa baris rekaan, dan cara halaman menukar baris kepada angka. Klik satu langkah untuk menyerlahkan baris dan lajur yang digunakan. Lajur fx berlorek dikira, bukan ditaip. Muat turun untuk melihatnya dalam Excel.'},
    p:{en:'Show this when someone asks "where do the numbers come from?" Click the steps one by one.', ms:'Tunjukkan ini apabila ditanya "dari mana angka ini datang?" Klik langkah satu demi satu.'}},
  funnel: {t:{en:'Programme funnel', ms:'Corong program'},
    d:{en:'Illustrative drop-off from enrolment to still saving after six months. In the real tool each step is counted from events, by state and segment.', ms:'Contoh keciciran dari pendaftaran hingga masih menyimpan selepas enam bulan. Dalam alat sebenar setiap langkah dikira daripada acara, mengikut negeri dan segmen.'}}
};

})(window.TH);
