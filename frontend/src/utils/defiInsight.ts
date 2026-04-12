import type { DefiInsight, MenuDay } from '../data/menus';

type DefiInsightPayload = {
  comment: string;
  suggestion: string | null;
};

// ---------------------------------------------------------------------------
// Öğün keyword → klinik not haritası
// menus.ts'e dokunmadan öğün başlıklarından otomatik klinik bağlam üretir
// ---------------------------------------------------------------------------
const MEAL_CLINICAL_NOTES: Array<{ keywords: string[]; note: string }> = [
  {
    keywords: ['paça', 'kemik suyu'],
    note: 'kolajen ve glisin içeriği eklem dokusunu ve bağırsak bariyerini destekler',
  },
  {
    keywords: ['işkembe'],
    note: 'bağırsak mukozasını besleyen doğal kolajen ve glutamin kaynağıdır',
  },
  {
    keywords: ['ciğer'],
    note: 'demir, B12 ve A vitamini açısından yoğundur; doku onarımını ve enerji üretimini doğrudan destekler',
  },
  {
    keywords: ['böbrek'],
    note: 'yüksek B12 ve çinko içeriğiyle mitokondriyal enerji üretimine katkı sağlar',
  },
  {
    keywords: ['kokoreç'],
    note: 'B vitamini kompleksi ve demir içeriğiyle sinir sistemi ve enerji metabolizmasını destekler',
  },
  {
    keywords: ['somon', 'hamsi', 'levrek', 'balık', 'sardalye', 'kefal', 'palamut'],
    note: 'omega-3 yağ asitleri kronik inflamasyonu düşürür ve insülin duyarlılığını artırır',
  },
  {
    keywords: ['yumurta'],
    note: 'kolin ve tam protein içeriği sabah kan şekerini sabit tutar ve tokluk süresini uzatır',
  },
  {
    keywords: ['yoğurt', 'kefir'],
    note: 'canlı probiyotik kültürler bağırsak florasını destekler ve öğün sonrası glukoz yanıtını yumuşatır',
  },
  {
    keywords: ['turşu'],
    note: 'laktofermente olduğunda probiyotik yük taşır; sindirimi kolaylaştırır ve şişkinliği azaltır',
  },
  {
    keywords: ['zeytinyağı', 'zeytin'],
    note: 'oleik asit insülin sinyalleşmesini iyileştirir ve öğünün glisemik etkisini düşürür',
  },
  {
    keywords: ['brokoli', 'karnabahar', 'lahana', 'brüksel'],
    note: 'sulforafan ve lif kombinasyonu insülin direncine karşı güçlü koruyucu etki sağlar',
  },
  {
    keywords: ['avokado'],
    note: 'tekli doymamış yağlar ve potasyum içeriği kan basıncı ve insülin dengesini destekler',
  },
  {
    keywords: ['ceviz', 'badem', 'fındık'],
    note: 'sağlıklı yağ ve E vitamini kombinasyonu öğün arası kan şekeri dalgalanmalarını frenler',
  },
  {
    keywords: ['ıspanak', 'marul', 'roka', 'semizotu'],
    note: 'magnezyum ve folat içeriği insülin reseptörlerinin çalışmasını optimize eder',
  },
  {
    keywords: ['patlıcan', 'kabak', 'biber'],
    note: 'düşük glisemik yük ve yüksek su içeriği öğün kalori yoğunluğunu düşürür',
  },
  {
    keywords: ['köfte', 'biftek', 'kuzu', 'nuar', 'söğüş'],
    note: 'tam amino asit profili kas kütlesini korurken gün içi açlık krizlerini geciktirir',
  },
  {
    keywords: ['tavuk'],
    note: 'yağsız protein kaynağı olarak kas onarımını destekler ve tokluk hormonlarını aktive eder',
  },
];

// ---------------------------------------------------------------------------
// defenseFocus → koçluk haritası
// Her focus için kullanıcıya yansıyan somut etki + motivasyon cümlesi
// ---------------------------------------------------------------------------
const FOCUS_COACH_MAP: Record<string, { effect: string; tip: string }> = {
  'Kan Şekeri Dengesi': {
    effect: 'kan şekerini gün boyunca sabit tutarak enerji çöküşlerini ve ani açlık krizlerini önler',
    tip: 'Öğün aralarını 4-5 saatte tutarsan bu dengeyi pekiştirirsin.',
  },
  'İnsülin Dengesi': {
    effect: 'insülin dalgalanmalarını baskılayarak öğün aralarında daha konforlu ve uyanık hissettir',
    tip: 'Yemekten sonra 10-15 dakikalık hafif bir yürüyüş insülin yanıtını belirgin şekilde iyileştirir.',
  },
  'Yakıt Geçişi': {
    effect: 'vücudun glikozu önce tüketip ardından yağ yakımına geçiş hızını destekler',
    tip: 'Bu geçiş döneminde hafif baş dönmesi normal; bol su ve elektrolit dengesi süreci kolaylaştırır.',
  },
  'Yağ Oksidasyonu': {
    effect: 'vücudu yağı birincil enerji kaynağı olarak kullanmaya yönlendirerek metabolik esneklik kazandırır',
    tip: 'Sabah aç karnına 20-30 dakika hareket yaparsan yağ oksidasyonunu hızlandırırsın.',
  },
  'Stabilizasyon': {
    effect: 'metabolik ritmi stabilize ederek yorgunluk ve konsantrasyon kayıplarını azaltır',
    tip: 'Bu dönemde düzenlilik performanstan daha önemli; saatleri tutturmak yeterli.',
  },
  'İnflamasyon': {
    effect: 'düşük dereceli kronik inflamasyonu baskılayarak eklem rahatlığı ve enerji düzeyini iyileştirir',
    tip: 'Şeker ve işlenmiş gıdalardan uzak durduğun her gün inflamatuar yük düşer.',
  },
  'Metabolik Esneklik': {
    effect: 'vücudun hem glikoz hem yağ kullanabilme kapasitesini artırarak enerji istikrarı sağlar',
    tip: 'Öğün atlama ya da hafif açlık periyotları metabolik esnekliği hızla geliştirir.',
  },
  'Kan Şekeri Stabilitesi': {
    effect: 'postprandiyal glikoz tepkisini yumuşatarak öğün sonrası uyku hissini ve yorgunluğu azaltır',
    tip: 'Yemek sırasında yavaş çiğnemek bile glukoz tepkisini %10-15 düşürebilir.',
  },
  'Metabolik Denge': {
    effect: 'hormon, sindirim ve enerji sistemlerini eş zamanlı dengeleyerek sürdürülebilir bir ritim oluşturur',
    tip: 'Tutarlılık bu dönemin en güçlü silahı; mükemmellik değil süreklilik önemli.',
  },
  'Glikoz Dengesi': {
    effect: 'glikoz tepkisini düzleştirerek öğün sonrası konsantrasyon ve sinirlilik dalgalanmalarını azaltır',
    tip: 'Yemekten önce bir bardak su içmek mide boşalma hızını yavaşlatır, glukoz tepkisini yumuşatır.',
  },
  'Metabolik Düzen': {
    effect: 'sindirim, enerji ve hormon döngülerini senkronize ederek günlük performansı stabilize eder',
    tip: 'Öğün saatlerini her gün aynı tutmak sirkadyen ritmi güçlendirir.',
  },
  'Glisemik Stabilite': {
    effect: 'kan şekerindeki ani yükseliş ve düşüşleri frenleyerek gün içi enerji eğrisini düzleştirir',
    tip: 'Karbonhidratı proteinden önce yemek glisemik tepkiyi önemli ölçüde azaltır.',
  },
  'Metabolik Stabilite': {
    effect: 'metabolik süreçleri dengede tutarak zihinsel netlik ve fiziksel enerjiyi korur',
    tip: 'Uyku kalitesi metabolik stabiliteyi doğrudan etkiler; 7-8 saat hedefle.',
  },
  'Lif ve Sindirim': {
    effect: 'bağırsak pasajını düzenleyerek öğün sonrası şişkinliği azaltır ve tokluk süresini uzatır',
    tip: 'Günde 2-3 litre su lifin etkisini katlar; susuz lif tam çalışmaz.',
  },
  'Protein ve Stabilite': {
    effect: 'yeterli protein alımı kas kütlesini korurken insülin salgısını kontrollü tutar',
    tip: 'Proteini güne yay; tek öğünde yoğunlaştırırsan emilim verimi düşer.',
  },
  'Lif ve Antioksidan': {
    effect: 'lif ve antioksidan kombinasyonu bağırsak sağlığını ve hücresel korumayı eş zamanlı destekler',
    tip: 'Renkli sebzeler ne kadar çeşitliyse antioksidan spektrumu o kadar geniş olur.',
  },
  'Denge ve Tokluk': {
    effect: 'makrobesin dengesini kurarak iştah hormonlarını düzenler ve aşırı yeme dürtüsünü azaltır',
    tip: 'Yemeği bitirdikten 20 dakika sonra tokluğun gerçek düzeyini hissedersin; acele etme.',
  },
  'Probiyotik ve Çeşitlilik': {
    effect: 'canlı kültürler ve çeşitli lifler bağırsak mikrobiomunu zenginleştirerek metabolik sağlığı destekler',
    tip: 'Fermente gıdaları ısıtmadan tüketirsen canlı kültürler korunur.',
  },
  'Protein ve Denge': {
    effect: 'protein-yağ dengesi kan şekerini sabit tutarken kas onarım süreçlerini aktif halde tutar',
    tip: 'Her öğünde bir avuç kadar protein kaynağı hedeflemek dengeyi kolaylaştırır.',
  },
  'Lif ve Bağırsak Desteği': {
    effect: 'prebiyotik lif bağırsak florasını besleyerek uzun vadeli insülin duyarlılığını artırır',
    tip: 'Turşu ve fermente ürünler bu günün gizli kahramanı; atlamadan tüket.',
  },
  'Protein ve Bağırsak Desteği': {
    effect: 'protein ve probiyotik kombinasyonu hem kas bakımını hem bağırsak dengesini eş zamanlı destekler',
    tip: 'Yoğurt veya kefiri yemekle birlikte tüketmek sindirimi kolaylaştırır.',
  },
  'Metabolik Destek': {
    effect: 'vücudun tüm metabolik süreçlerini besleyerek enerji üretimini ve atık temizliğini optimize eder',
    tip: 'Sabah ritüeline 5 dakika hareket eklemek metabolik sinyali güne erken başlatır.',
  },
  'Denge': {
    effect: 'besin grupları arasındaki dengeyi kurarak vücudun günlük ihtiyaçlarını eksiksiz karşılar',
    tip: 'Denge karmaşık değil; her öğünde protein + sebze + sağlıklı yağ üçlüsünü hedefle.',
  },
  'Anti-inflamasyon': {
    effect: 'inflamatuar yükü düşürerek eklem rahatlığı, enerji ve zihinsel netliği iyileştirir',
    tip: 'Omega-3 zengini balık ve zeytinyağı bu günün en güçlü araçları.',
  },
  'Glisemik Denge': {
    effect: 'glikoz tepkisini kontrol altında tutarak gün boyunca istikrarlı bir enerji seviyesi sağlar',
    tip: 'Öğünleri protein ya da yağla başlamak glikoz tepkisini başından yumuşatır.',
  },
  'İştah kontrolü': {
    effect: 'tokluk hormonlarını dengeleyerek gereksiz atıştırma dürtüsünü ve porsiyon kaymalarını azaltır',
    tip: 'Öğün öncesi bir bardak su ve yavaş yemek iştah kontrolünün en basit iki aracı.',
  },
  'Doğal Denge': {
    effect: 'işlenmemiş, doğal besinler vücudun kendi dengeleme mekanizmalarını destekler',
    tip: 'Raf ömrü uzun her şeyden uzak dur; bugün kısa listeyle git.',
  },
  'Mineral ve Denge': {
    effect: 'magnezyum, çinko ve potasyum gibi mineraller insülin sinyalleşmesinin temel taşlarıdır',
    tip: 'Yeşil yapraklılar ve kuruyemiş bu minerallerin en kolay kaynakları.',
  },
  'Denge ve Güç': {
    effect: 'protein ve mikro besin dengesi hem metabolik sağlığı hem kas gücünü eş zamanlı destekler',
    tip: 'Egzersiz yapıyorsan bu günün protein yükü kas onarımına direkt gider.',
  },
  'Denge ve Süreklilik': {
    effect: 'sürdürülebilir besin örüntüsü uzun vadeli metabolik iyileşmenin temelidir',
    tip: 'Mükemmel bir gün değil, tutarlı birçok gün fark yaratır.',
  },
  'Denge ve Stabilite': {
    effect: 'kararlı beslenme alışkanlıkları kan şekeri ve enerji dalgalanmalarını giderek azaltır',
    tip: 'Bu noktaya geldiysen vücudun artık sinyalleri daha net gönderiyor; dinlemeye devam et.',
  },
  'Süreklilik': {
    effect: 'düzenli beslenme ritmi hormonal ve metabolik sistemi öngörülebilir kılar, adaptasyonu hızlandırır',
    tip: 'Bugün doğru yaptığın her şey yarının başlangıç noktasını yükseltir.',
  },
};

const TAG_EFFECT_MAP: Record<string, string> = {
  lowCarb: 'kan şekeri dalgalanmalarını sınırlamaya yardımcı olur',
  glucoseStability: 'gün içindeki ani iniş çıkışları azaltmayı destekler',
  satietySupport: 'daha uzun süre tok kalmayı kolaylaştırır',
  fiberSupport: 'öğün sonrası daha kontrollü bir sindirim akışı sağlar',
  highProtein: 'kas kütlesini korurken açlık krizlerini azaltmaya destek olur',
  lightDinner: 'akşam saatlerinde yükü artırmadan ritmi korur',
  fermented: 'bağırsak ritmini destekleyerek öğün toleransını iyileştirmeye yardımcı olur',
  healthyFat: 'enerjiyi daha dengeli yayarak erken acıkmayı geciktirir',
  antiInflammatory: 'vücuttaki gereksiz inflamatuar yükü azaltmaya katkı sağlar',
  gutSupport: 'bağırsak konforunu destekleyip günlük ritmi rahatlatır',
  proteinBalance: 'protein dağılımını gün içine yayarak iştah kontrolünü güçlendirir',
  eveningLightness: 'geceye daha hafif geçişi destekler',
};

const FOCUS_DISPLAY_MAP: Record<string, string> = {
  'düşük karbonhidrat dengesi': 'düşük karbonhidrat ritmi',
  'protein yoğunluk ve glisemik kontrol': 'protein ağırlıklı glisemik kontrol',
  'hafif akşam ve denge': 'hafif akşam akışı',
  'protein + lif dengesi': 'protein ve lif odağı',
  'protein ve fermente denge': 'protein ve fermente destek çizgisi',
};

const LOW_PRIORITY_FOODS = ['pastırma', 'sos', 'yan ürün'];
const HIGH_PRIORITY_FOODS = ['yumurta', 'yoğurt', 'et suyu çorbası', 'sebze', 'et', 'balık'];

const normalizeTr = (value: string) =>
  value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

function toSentence(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return '';
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function pickPrimaryFood(primaryFoods: string[]): string | null {
  const cleaned = primaryFoods
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
  if (!cleaned.length) return null;

  const scored = cleaned.map((item) => {
    const normalized = normalizeTr(item);
    let score = 0;
    if (HIGH_PRIORITY_FOODS.some((token) => normalized.includes(normalizeTr(token)))) score += 2;
    if (LOW_PRIORITY_FOODS.some((token) => normalized.includes(normalizeTr(token)))) score -= 2;
    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.item ?? null;
}

export function buildDefiComment(insight: DefiInsight): string {
  const normalizedFocus = normalizeTr(insight.focus);
  const focusDisplay = FOCUS_DISPLAY_MAP[normalizedFocus] ?? insight.focus.toLocaleLowerCase('tr-TR');
  const primaryFood = pickPrimaryFood(insight.primaryFoods);

  const openingTemplates: Array<(focus: string, food?: string | null) => string> = [
    (focus, food) => (food ? `Bugün hedefimiz ${focus}; bu çizgide ${food} öne çıkıyor.` : `Bugün hedefimiz ${focus}.`),
    (focus, food) => (food ? `Bugünün planı ${focus} üzerine kurulu; ${food} bu planı taşıyan ana parçalardan biri.` : `Bugünün planı ${focus} üzerine kurulu.`),
    (focus, food) => (food ? `Bu günün menüsünde ${focus} öne çıkıyor; özellikle ${food} ile bunu güçlendiriyoruz.` : `Bu günün menüsünde ${focus} öne çıkıyor.`),
    (focus, food) => (food ? `Bugün ${focus} çizgisini koruyoruz; ${food} bu akışa net katkı veriyor.` : `Bugün ${focus} çizgisini koruyoruz.`),
  ];
  const selectorSeed = `${normalizedFocus}|${normalizeTr(primaryFood ?? '')}`;
  const templateIndex =
    selectorSeed.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % openingTemplates.length;
  const focusSentence = toSentence(openingTemplates[templateIndex](focusDisplay, primaryFood));

  const mechanismSentence = insight.explanation && insight.explanation.trim().length > 0
    ? toSentence(insight.explanation)
    : toSentence(insight.goal);

  const effects = insight.metabolicTags
    .map((tag) => TAG_EFFECT_MAP[tag])
    .filter((effect): effect is string => Boolean(effect))
    .slice(0, 2);

  const effectSentence =
    effects.length === 0
      ? 'Bu seçim gün içinde daha istikrarlı enerji ve daha rahat tokluk hissi sağlar.'
      : effects.length === 1
        ? toSentence(`Bu seçim ${effects[0]}`)
        : toSentence(`Bu seçim ${effects[0]} ve ${effects[1]}`);

  return [focusSentence, mechanismSentence, effectSentence].join(' ');
}

export function getDefiSwapSuggestion(
  insight: DefiInsight,
  excludedItem?: string,
  dayMenu?: Pick<MenuDay, 'meals'>
): string | null {
  const rules = insight.swapRules ?? [];
  if (!rules.length) return null;

  const normalize = (value: string) =>
    value
      .toLocaleLowerCase('tr-TR')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const menuText = dayMenu
    ? normalize(
        [dayMenu.meals.breakfast, dayMenu.meals.lunch, dayMenu.meals.dinner]
          .map((meal) =>
            [meal.title, meal.description, ...(meal.shoppingItems ?? [])]
              .filter(Boolean)
              .join(' ')
          )
          .join(' ')
      )
    : '';

  const normalizedExcluded = (excludedItem || '').trim().toLowerCase();
  const matchedRule =
    (normalizedExcluded
      ? rules.find((rule) => normalize(rule.trigger).includes(normalize(normalizedExcluded)))
      : rules.find((rule) => menuText.includes(normalize(rule.trigger)))) ?? null;

  if (!matchedRule || !matchedRule.alternatives.length) return null;
  return `Eğer ${matchedRule.trigger} sana uygun değilse, ${matchedRule.alternatives[0]} tercih edilebilir. Böylece ${matchedRule.reason} korunur.`;
}

// ---------------------------------------------------------------------------
// defiInsight olmayan günler için menü verisinden otomatik yorum üretir
// ---------------------------------------------------------------------------
function findMealClinicalNote(
  meals: Pick<MenuDay, 'meals'>['meals']
): string | null {
  const allText = [meals.breakfast, meals.lunch, meals.dinner]
    .map((m) => normalizeTr(`${m.title} ${m.description}`))
    .join(' ');

  for (const entry of MEAL_CLINICAL_NOTES) {
    if (entry.keywords.some((kw) => allText.includes(normalizeTr(kw)))) {
      return entry.note;
    }
  }
  return null;
}

function buildDayProgressSentence(dayIndex: number, completedMealCount: number): string {
  const dayPhrase =
    dayIndex <= 7
      ? `İlk haftandasın (${dayIndex}. gün) — vücut henüz adapte oluyor`
      : dayIndex <= 30
        ? `${dayIndex}. gündesin — ritim oturmaya başlıyor`
        : dayIndex <= 60
          ? `${dayIndex}. günde bu menüyü takip etmek ciddi bir kararlılık`
          : `${dayIndex}. gündesin — bu noktaya gelenler gerçekten azınlık`;

  const mealPhrase =
    completedMealCount === 3
      ? 'Bugünü tam kapattın, yarına hazırsın.'
      : completedMealCount === 2
        ? '2/3 öğün tamam — son öğünü de tamamlarsan günü mühürlemiş olursun.'
        : completedMealCount === 1
          ? 'İyi başlangıç, devam et.'
          : 'Henüz başlamamışsın — ilk öğünü tamamlamak çığır açar.';

  return `${dayPhrase}. ${mealPhrase}`;
}

export function buildDefiCommentFromMenuData(
  dayMenu: Pick<MenuDay, 'defenseFocus' | 'metabolicLine' | 'daySummary' | 'meals'>,
  options?: { dayIndex?: number; completedMealCount?: number }
): DefiInsightPayload {
  const focus = dayMenu.defenseFocus ?? '';
  const coach = FOCUS_COACH_MAP[focus];
  const { dayIndex, completedMealCount } = options ?? {};

  const sentence1 = coach
    ? toSentence(`Bugünün odağı ${focus.toLocaleLowerCase('tr-TR')} — bu ${coach.effect}`)
    : toSentence(dayMenu.daySummary ?? `Bugün odak noktamız ${focus}.`);

  const clinicalNote = findMealClinicalNote(dayMenu.meals);
  const sentence2 = clinicalNote
    ? toSentence(`Menüdeki ${clinicalNote}`)
    : toSentence(dayMenu.metabolicLine ?? '');

  const sentence3 =
    dayIndex != null && completedMealCount != null
      ? buildDayProgressSentence(dayIndex, completedMealCount)
      : coach
        ? toSentence(coach.tip)
        : toSentence(dayMenu.daySummary ?? '');

  const parts = [sentence1, sentence2, sentence3].filter((s) => s.length > 0);
  return {
    comment: parts.join(' '),
    suggestion: null,
  };
}

export function buildDefiInsightPayload(
  dayMenu: Pick<MenuDay, 'defiInsight' | 'meals' | 'defenseFocus' | 'metabolicLine' | 'daySummary'> | null | undefined,
  options?: { dayIndex?: number; completedMealCount?: number }
): DefiInsightPayload | null {
  if (!dayMenu) return null;
  const insight = dayMenu.defiInsight;
  if (insight) {
    return {
      comment: buildDefiComment(insight),
      suggestion: getDefiSwapSuggestion(insight, undefined, dayMenu),
    };
  }
  return buildDefiCommentFromMenuData(dayMenu, options);
}
