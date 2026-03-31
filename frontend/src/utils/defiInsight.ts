import type { DefiInsight, MenuDay } from '../data/menus';

type DefiInsightPayload = {
  comment: string;
  suggestion: string | null;
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

export function buildDefiInsightPayload(
  dayMenu: Pick<MenuDay, 'defiInsight' | 'meals'> | null | undefined
): DefiInsightPayload | null {
  const insight = dayMenu?.defiInsight;
  if (!insight) return null;
  return {
    comment: buildDefiComment(insight),
    suggestion: getDefiSwapSuggestion(insight, undefined, dayMenu),
  };
}
