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
  {id:'blueprint', href:'blueprint.html', nav:{en:'Blueprint', ms:'Teknikal'}, label:{en:'Technical blueprint', ms:'Pelan teknikal'},
   desc:{en:'Layout schema, data architecture and the ecosystem map.', ms:'Skema susun atur, seni bina data dan peta ekosistem.'}},
  {id:'literacy', href:'literacy.html', nav:{en:'Literacy', ms:'Literasi'}, label:{en:'Literacy layers', ms:'Lapisan literasi'},
   desc:{en:'How SEFB literacy modules feed the dashboard.', ms:'Bagaimana modul literasi SEFB menyalurkan data ke papan pemuka.'}},
  {id:'notes', href:'notes.html', nav:{en:'Sources', ms:'Sumber'}, label:{en:'Sources & assumptions', ms:'Sumber & andaian'},
   desc:{en:'What is official, what is synthetic, and what TH must confirm.', ms:'Apa yang rasmi, apa yang sintetik, dan apa yang perlu disahkan TH.'}}
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

/* ---------- Literacy modules and telemetry ---------- */
TH.MODULES = [
  {id:'youth', who:{en:'Youth 18–29', ms:'Belia 18–29'}, name:{en:'Youth Savings Blueprint', ms:'Pelan Simpanan Belia'},
   body:{en:'Six short in-app lessons and a campus workshop. Goal: a standing instruction into Tabung Istito\'ah and a dated path to RM15,000.', ms:'Enam pelajaran ringkas dalam aplikasi dan bengkel kampus. Matlamat: arahan tetap ke Tabung Istito\'ah dan laluan bertarikh ke RM15,000.'},
   events:['module_enrolled','lesson_completed','plan_created','auto_deposit_on','milestone_reached'], tiles:['gauge25','reg','funnel']},
  {id:'family', who:{en:'Couples 30–44', ms:'Pasangan 30–44'}, name:{en:'Family Hajj Plan', ms:'Pelan Haji Keluarga'},
   body:{en:'A household worksheet that plans two RM15,000 gates and two category payments, and checks the 2028 deadline for each spouse.', ms:'Lembaran isi rumah yang merancang dua ambang RM15,000 dan dua bayaran kategori, serta menyemak tarikh akhir 2028 bagi setiap pasangan.'},
   events:['module_enrolled','plan_created','auto_deposit_on','milestone_reached'], tiles:['gauge15','trend','funnel']},
  {id:'mid', who:{en:'Mid-career 45–59', ms:'Pertengahan kerjaya 45–59'}, name:{en:'Mid-career Top-up', ms:'Tambahan Pertengahan Kerjaya'},
   body:{en:'Payroll top-ups and a rule for each bonus, aimed at the registered depositors still below RM15,000 before 31 December 2028.', ms:'Tambahan potongan gaji dan peraturan bagi setiap bonus, untuk pendeposit berdaftar yang masih di bawah RM15,000 sebelum 31 Disember 2028.'},
   events:['module_enrolled','plan_created','auto_deposit_on','milestone_reached'], tiles:['gauge235','watch','matrix']},
  {id:'senior', who:{en:'60 and above', ms:'60 tahun ke atas'}, name:{en:'Pre-departure Readiness Check', ms:'Semakan Kesediaan Pra-Pemergian'},
   body:{en:'A one-to-one check across money, knowledge, health and family support, before the offer letter arrives.', ms:'Semakan bersemuka merangkumi kewangan, ilmu, kesihatan dan sokongan keluarga, sebelum surat tawaran tiba.'},
   events:['module_enrolled','readiness_check_done','milestone_reached'], tiles:['gauge100','watch']},
  {id:'employer', who:{en:'Corporate partners', ms:'Rakan korporat'}, name:{en:'Employer Payroll Programme', ms:'Program Potongan Gaji Majikan'},
   body:{en:'An HR toolkit that enrols staff in salary deduction into TH in one step, reported as the corporate category on the dashboard.', ms:'Kit HR yang mendaftarkan pekerja dalam potongan gaji ke TH dengan satu langkah, dilaporkan sebagai kategori korporat di papan pemuka.'},
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
  funnel: {t:{en:'Programme funnel', ms:'Corong program'},
    d:{en:'Illustrative drop-off from enrolment to still saving after six months. In the real tool each step is counted from events, by state and segment.', ms:'Contoh keciciran dari pendaftaran hingga masih menyimpan selepas enam bulan. Dalam alat sebenar setiap langkah dikira daripada acara, mengikut negeri dan segmen.'}}
};

})(window.TH);
