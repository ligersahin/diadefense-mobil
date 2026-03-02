export type DefiContext = {
  screen: 'supplements' | 'meals';
  focusSlot?: 'morning' | 'noon' | 'evening' | null;
  highlightedDoseIds?: string[] | null;
  hasStartedToday?: boolean;
  remainingMeals?: number | undefined;
};

export function getDefiMessage(
  ctx: DefiContext
): { title: string; body: string; detail?: string } | null {
  if (ctx.screen === 'supplements') {
    if (ctx.highlightedDoseIds && ctx.highlightedDoseIds.length > 0) {
      return {
        title: 'Defi',
        body: 'Bunlar için buradasın.',
        detail: 'Sadece bu satırları işaretlemen yeter.',
      };
    }
    if (ctx.focusSlot === 'morning') {
      return {
        title: 'Defi',
        body: 'Güne destekle başlamak yeterli.',
        detail: 'Kısa bir ritim gün boyu dengeyi korur.',
      };
    }
    if (ctx.focusSlot === 'noon') {
      return {
        title: 'Defi',
        body: 'Ritmi koru. Küçük bir destek.',
        detail: 'Öğlen düzeni savunmayı sakinleştirir.',
      };
    }
    if (ctx.focusSlot === 'evening') {
      return {
        title: 'Defi',
        body: 'Şimdi vücudu toparlama vakti.',
        detail: 'Akşam küçük bir destek yeter.',
      };
    }
    return {
      title: 'Defi',
      body: 'Bugün düzenli destek yeter.',
      detail: 'Öğün saatlerine bağlı kalmak dengeyi güçlendirir.',
    };
  }

  if (ctx.screen === 'meals') {
    if (ctx.hasStartedToday) {
      return {
        title: 'Defi',
        body: 'Ritim başladı. Bir adım daha yeter.',
        detail: 'Ritmi korumak savunmayı güçlendirir.',
      };
    }
    return {
      title: 'Defi',
      body: 'Bugün tek bir öğünle başlamak yeter.',
      detail: 'Basit bir adım bile savunmayı güçlendirir.',
    };
  }

  return null;
}
