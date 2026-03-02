const baseMeals = {
  breakfast: {
    title: 'Dengeli Kahvaltı',
    description: 'Protein + lif dengesi',
    recipeId: null as string | null,
    shoppingItems: ['Yumurta', 'Yeşil salata'],
    imageKey: 'breakfast-default',
  },
  lunch: {
    title: 'Hafif Öğle',
    description: 'Sebze + kompleks karbonhidrat',
    recipeId: null as string | null,
    shoppingItems: ['Mevsim salatası', 'Zeytinyağı'],
    imageKey: 'lunch-default',
  },
  dinner: {
    title: 'Akşam Tabağı',
    description: 'Az karbonhidrat + protein',
    recipeId: null as string | null,
    shoppingItems: ['Izgara sebze', 'Zeytinyağı'],
    imageKey: 'dinner-default',
  },
};

export const MENUS = Array.from({ length: 91 }, (_, i) => {
  const day = i + 1;
  if (day === 1) {
    return {
      day,
      dayTitle: 'Gün 1 – Adaptasyon',
      daySummary: 'İlk gün, dengeli tabaklarla kan şekerini stabilize etmeye odaklan.',
      focusTag: 'Denge',
      heroImage: null,
      meals: {
        breakfast: {
          title: 'Haşlanmış Yumurta + Salata',
          description:
            '2 yumurta (kayısı kıvamı) + çoban/yeşil salata (zeytinyağı, limon, kekik) + 10–15 zeytin + 15–20 çiğ fındık/badem. Şekersiz çay, yeşil çay veya sade Türk kahvesi.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Domates',
            'Salatalık',
            'Yeşillik',
            'Zeytin',
            'Fındık/Badem',
            'Zeytinyağı',
            'Limon',
            'Kekik',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Soğuk Domates Çorbası',
          description:
            'Yanına zeytinyağlı bamya veya ıspanak kökü salatası ve ev yapımı turşu.',
          recipeId: 'soguk-domates-corbasi',
          shoppingItems: [
            'Domates',
            'Salatalık',
            'Sarımsak',
            'Sirke',
            'Limon',
            'Fesleğen/Kekik',
            'Zeytinyağı',
            'Bamya veya Ispanak kökü',
            'Turşu',
            'Kaya tuzu',
            'Karabiber',
          ],
          imageKey: 'lunch-default',
        },
        dinner: {
          title: 'Izgara Biftek + Salata',
          description:
            'Çoban salata veya karnabahar salatası (buharda, hafif diri; zeytinyağı, limon, kaya tuzu).',
          recipeId: null,
          shoppingItems: [
            'Biftek',
            'Domates',
            'Salatalık',
            'Yeşillik',
            'Karnabahar (opsiyonel)',
            'Zeytinyağı',
            'Limon',
            'Kaya tuzu',
          ],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  return {
    day,
    dayTitle: `Gün ${day} – Rutin`,
    daySummary: 'Basit, sürdürülebilir öğünlerle ritmi koru.',
    focusTag: 'İştah kontrolü',
    heroImage: null,
    meals: {
      breakfast: { ...baseMeals.breakfast },
      lunch: { ...baseMeals.lunch },
      dinner: { ...baseMeals.dinner },
    },
  };
});
