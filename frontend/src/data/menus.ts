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

export type DefiInsightSwapRule = {
  trigger: string;
  alternatives: string[];
  reason: string;
};

export type DefiInsight = {
  focus: string;
  goal: string;
  primaryFoods: string[];
  metabolicTags: string[];
  explanation: string;
  swapRules?: DefiInsightSwapRule[];
};

export type MenuMeal = {
  title: string;
  description: string;
  recipeId: string | null;
  shoppingItems: string[];
  imageKey: string | null;
};

export type MenuDay = {
  day: number;
  dayTitle: string;
  daySummary: string;
  metabolicLine: string;
  defenseFocus: string;
  focusTag: string;
  heroImageKey: string | null;
  meals: {
    breakfast: MenuMeal;
    lunch: MenuMeal;
    dinner: MenuMeal;
  };
  defiInsight?: DefiInsight;
};

export const MENUS: MenuDay[] = Array.from({ length: 91 }, (_, i) => {
  const day = i + 1;
  if (day === 1) {
    return {
      day,
      dayTitle: 'Gün 1 — Adaptasyon',
      daySummary: 'İlk gün, dengeli tabaklarla kan şekerini stabilize etmeye odaklan.',
      metabolicLine: 'Vücudun glikojen depolarını kullanmaya başladı.',
      defenseFocus: 'Kan Şekeri Dengesi',
      focusTag: 'Denge',
      heroImageKey: 'soguk-domates-corbasi',
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
          imageKey: 'soguk-domates-corbasi',
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

  if (day === 2) {
    return {
      day,
      dayTitle: 'Gün 2 — Devam',
      daySummary: 'İkinci gün, protein ve omega-3 ağırlıklı öğünlerle savunmayı güçlendir.',
      metabolicLine: 'İnsülin salınım sıklığı azalmaya başladı.',
      defenseFocus: 'İnsülin Dengesi',
      focusTag: 'Protein + Omega-3',
      heroImageKey: 'paca-corbasi',
      meals: {
        breakfast: {
          title: 'Sahanda Pastırmalı Yumurta',
          description:
            'Mevsimine göre yeşil salata veya çoban salatası (biber, salatalık, domates, bol sızma zeytinyağı, limon, kekik) + 10–15 adet siyah veya yeşil zeytin. Şekersiz çay, yeşil çay veya sade Türk kahvesi.',
          recipeId: 'pastirmali-yumurta',
          shoppingItems: [
            'Yumurta',
            'Pastırma',
            'Domates',
            'Salatalık',
            'Biber',
            'Yeşillik',
            'Zeytin',
            'Zeytinyağı',
            'Limon',
            'Kekik',
          ],
          imageKey: 'pastirmali-yumurta',
        },
        lunch: {
          title: 'Sirke ve Sarımsakla Çeşnilendirilmiş Paça Çorbası',
          description:
            'Sızma zeytinyağı ve ev sirkesi ile hazırlanmış mevsim salatası + 5–6 adet ceviz.',
          recipeId: 'paca-corbasi',
          imageKey: 'paca-corbasi',
          shoppingItems: [
            'Paça',
            'Limon',
            'Yumurta',
            'Sarımsak',
            'Sirke',
            'Zeytinyağı',
            'Mevsim sebzeleri',
            'Ceviz',
            'Tuz',
          ],
        },
        dinner: {
          title: 'Palamut Izgara veya Deniz Levreği',
          description:
            'Mevsimine göre palamut izgara veya deniz levreği. Sızma zeytinyağı ve ev sirkesi ya da limon suyu ile hazırlanmış yeşil salata veya çoban salata.',
          recipeId: null,
          shoppingItems: [
            'Palamut veya levrek',
            'Domates',
            'Salatalık',
            'Yeşillik',
            'Zeytinyağı',
            'Sirke',
            'Limon',
          ],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 3) {
    return {
      day,
      dayTitle: 'Gün 3 — Çeşitlilik',
      daySummary: 'Üçüncü gün, işkembe çorbası ve taze börülce salatası ile öğün çeşitliliği.',
      metabolicLine: 'Vücudun glikozdan yağa geçmeye zorlanıyor.',
      defenseFocus: 'Yakıt Geçişi',
      focusTag: 'Probiyotik + Omega-3',
      heroImageKey: 'taze_borulce_salatasi',
      meals: {
        breakfast: {
          title: 'Tereyağlı Omlet + Kuruyemiş',
          description:
            'Mevsim sebzeleriyle hazırlanmış tereyağlı omlet (2 yumurta). 10–15 adet çiğ fındık ya da badem. Siyah ya da yeşil zeytin (10–15 adet). Şekersiz çay, yeşil çay ya da sade Türk kahvesi. Kahvaltıdan 30 dakika önce: enterik probiyotik kapsülü, zeytin yaprağı kapsülü. Kahvaltıdan 1 saat sonra: krill yağı kapsülü, 200 mg magnezyum kapsülü.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Tereyağı',
            'Mevsim sebzeleri',
            'Fındık/Badem',
            'Zeytin',
            'Zeytinyağı',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'İşkembe Çorbası + Taze Börülce Salatası',
          description:
            'İşkembe çorbası (ev sirkesi ve dövülmüş sarımsakla çeşitlendirilmiş). Mevsimine göre: taze börülce salatası ya da sızma zeytinyağı, limon ve kaya tuzu ile çeşitlendirilmiş Brüksel lahanası salatası (buharda az haşlanmış). Öğlen yemeğinden 30 dakika önce: çemen otu kapsülü.',
          recipeId: 'taze-borulce-salatasi',
          imageKey: 'taze_borulce_salatasi',
          shoppingItems: [
            'İşkembe',
            'Sirke',
            'Sarımsak',
            'Taze börülce veya Brüksel lahanası',
            'Zeytinyağı',
            'Limon',
            'Kaya tuzu',
          ],
        },
        dinner: {
          title: 'Çeşnili Tavuk Izgara + Salata',
          description:
            'Çeşnili tavuk ızgara (tavuk göğsü: kimyon, zerdeçal, kekik, kırmızı pul biber + 1 diş dövülmüş sarımsak; 1–2 saat dolapta dinlendir; sonra sızma zeytinyağı gezdirilmiş tavada pişir). Mevsimine göre: dövülmüş sarımsak + zeytinyağı ile çeşitlendirilmiş tere salatası ya da çoban salata. Akşam yemeğinden 30 dakika önce: enterik probiyotik kapsülü, zeytin yaprağı kapsülü. Akşam yemeğinden 1 saat sonra: krill yağı kapsülü.',
          recipeId: null,
          shoppingItems: [
            'Tavuk göğsü',
            'Kimyon',
            'Zerdeçal',
            'Kekik',
            'Kırmızı pul biber',
            'Sarımsak',
            'Zeytinyağı',
            'Tere/yeşillik',
            'Domates',
            'Salatalık',
          ],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 4) {
    return {
      day,
      dayTitle: 'Gün 4 — Kemik Suyu',
      daySummary: 'Dördüncü gün, terbiyeli et suyu çorbası ve ciğer ızgara ile besin yoğunluğu.',
      metabolicLine: 'Yağ yakım enzimleri artıyor.',
      defenseFocus: 'Yağ Oksidasyonu',
      focusTag: 'Kemik suyu + Demir',
      heroImageKey: 'terbiyeli_et_suyu_corbasi',
      meals: {
        breakfast: {
          title: 'Sahanda Tereyağlı Yumurta + Ceviz',
          description:
            'Sahanda tereyağlı yumurta (2 yumurta ile hazırlanmış). Mevsim salatası. Siyah ya da yeşil zeytin (10–15 adet). 6–7 adet ceviz. Şekersiz çay, yeşil çay ya da sade Türk kahvesi. Kahvaltıdan 30 dakika önce: enterik probiyotik kapsülü, zeytin yaprağı kapsülü. Kahvaltıdan 1 saat sonra: krill yağı kapsülü, 200 mg magnezyum kapsülü.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Tereyağı',
            'Mevsim sebzeleri',
            'Zeytin',
            'Ceviz',
            'Zeytinyağı',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Terbiyeli Et Suyu Çorbası + Zeytinyağlı Enginar',
          description:
            'Terbiyeli et suyu çorbası (et suyu kaynatılır; bir çanağa alınıp içine 1 yumurta sarısı eklenerek çırpılır; üzerine karabiber, birkaç damla limon suyu ve ince kıyılmış maydanoz eklenir). Zeytinyağlı enginar. Öğlen yemeğinden 30 dakika önce: çemen otu kapsülü.',
          recipeId: 'terbiyeli-et-suyu-corbasi',
          imageKey: 'terbiyeli_et_suyu_corbasi',
          shoppingItems: [
            'Et suyu / kemik suyu',
            'Yumurta sarısı',
            'Karabiber',
            'Limon',
            'Maydanoz',
            'Enginar',
            'Zeytinyağı',
          ],
        },
        dinner: {
          title: 'Ciğer Izgara + Kök Salata',
          description:
            'Ciğer ızgara. Turp, kereviz kökü ve ince doğranmış kereviz yaprakları ile hazırlanmış kök salata ya da çoban salata. Ev turşusu. Akşam yemeğinden 30 dakika önce: enterik probiyotik kapsülü, zeytin yaprağı kapsülü. Akşam yemeğinden 1 saat sonra: krill yağı kapsülü.',
          recipeId: null,
          shoppingItems: [
            'Ciğer',
            'Turp',
            'Kereviz kökü',
            'Kereviz yaprağı',
            'Domates',
            'Salatalık',
            'Yeşillik',
            'Ev turşusu',
            'Zeytinyağı',
          ],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 5) {
    return {
      day,
      dayTitle: 'Gün 5 — Omega-3',
      daySummary: 'Beşinci gün, sebze çorbası, zencefilli somon ve pratik pancar turşusu ile.',
      metabolicLine: 'Kan şekeri dalgalanmaları azalıyor.',
      defenseFocus: 'Stabilizasyon',
      focusTag: 'Omega-3 + Probiyotik',
      heroImageKey: 'pratik_pancar_tursusu',
      meals: {
        breakfast: {
          title: 'Sucuklu Yumurta + Mevsim Salatası',
          description:
            'Sucuklu yumurta (2 yumurta ile hazırlanmış). Mevsim salatası. Siyah ya da yeşil zeytin (10–15 adet). Şekersiz çay, yeşil çay ya da sade Türk kahvesi. Kahvaltıdan 30 dakika önce: enterik probiyotik kapsül, zeytin yaprağı kapsül. Kahvaltıdan 1 saat sonra: krill yağı kapsül, 200 mg magnezyum kapsül.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Sucuk',
            'Mevsim sebzeleri',
            'Zeytin',
            'Zeytinyağı',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Sebze Çorbası + Pratik Pancar Turşusu',
          description:
            'Sebze çorbası (et suyu bazlı). Çoban salata veya mevsim salatası. 10–15 adet çiğ fındık veya badem. Öğle yemeğinden 30 dakika önce: çemen otu kapsül.',
          recipeId: 'pratik_pancar_tursusu',
          imageKey: 'pratik_pancar_tursusu',
          shoppingItems: [
            'Et suyu',
            'Sebzeler',
            'Pancar',
            'Sarımsak',
            'Üzüm sirkesi',
            'Kaya tuzu',
            'Domates',
            'Salatalık',
            'Yeşillik',
            'Fındık/Badem',
          ],
        },
        dinner: {
          title: 'Zencefilli Somon + Izgara Sebzeler',
          description:
            'Zencefilli somon. Izgara yaz sebzeleri veya mevsim salatası. Akşam yemeğinden 30 dakika önce: enterik probiyotik kapsül, zeytin yaprağı kapsül. Akşam yemeğinden 1 saat sonra: krill yağı kapsül.',
          recipeId: null,
          shoppingItems: [
            'Somon',
            'Zencefil',
            'Mevsim sebzeleri',
            'Zeytinyağı',
          ],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 6) {
    return {
      day,
      dayTitle: 'Gün 6 — Lahana',
      daySummary: 'Altıncı gün, yumurta dolması, terbiyeli paça çorbası ve kapuska ile.',
      metabolicLine: 'Sistemik inflamasyon sinyalleri düşmeye başladı.',
      defenseFocus: 'İnflamasyon',
      focusTag: 'Probiyotik + Omega-3',
      heroImageKey: 'kapuska',
      meals: {
        breakfast: {
          title: 'Yumurta Dolması + Mevsim Salatası',
          description:
            '2 adet yumurta dolması (sarı: tereyağı + ince doğranmış dereotu + taze soğan; beyazın içine doldur). Mevsim salatası. 10-15 adet siyah ya da yeşil zeytin. Şekersiz çay, yeşil çay ya da sade Türk kahvesi. Kahvaltıdan 30 dakika önce: enterik probiyotik kapsülü, zeytin yaprağı kapsülü. Kahvaltıdan 1 saat sonra: krill yağı kapsülü, 200 mg magnezyum kapsülü.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Tereyağı',
            'Dereotu',
            'Taze soğan',
            'Mevsim sebzeleri',
            'Zeytin',
            'Zeytinyağı',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Terbiyeli Paça Çorbası + Közlenmiş Biber',
          description:
            'Terbiyeli paça çorbası (dövülmüş sarımsak, ev sirkesi, kaya tuzu, karabiber ile). Yeşil salata ya da sirkeyle çeşnilendirilmiş közlenmiş kırmızı çan biberi (1-2 saat buzdolabında dinlendir). 5-6 adet ceviz. Öğlen yemeğinden 30 dakika önce: çemen otu kapsülü.',
          recipeId: 'paca-corbasi',
          imageKey: 'paca-corbasi',
          shoppingItems: [
            'Paça',
            'Sarımsak',
            'Sirke',
            'Kaya tuzu',
            'Karabiber',
            'Kırmızı biber',
            'Ceviz',
            'Yeşillik',
          ],
        },
        dinner: {
          title: 'Kapuska + Mevsim Salatası',
          description:
            'Kapuska. Mevsim salatası. Akşam yemeğinden 30 dakika önce: enterik probiyotik kapsülü, zeytin yaprağı kapsülü. Akşam yemeğinden 1 saat sonra: krill yağı kapsülü.',
          recipeId: 'kapuska',
          imageKey: 'kapuska',
          shoppingItems: [
            'Beyaz lahana',
            'Soğan',
            'Kemikli kuzu eti',
            'Zeytinyağı',
            'Domates salçası',
            'Kaya tuzu',
            'Kırmızı pul biber',
            'Kurutulmuş kırmızı biber',
            'Limon',
            'Mevsim sebzeleri',
          ],
        },
      },
    };
  }

  if (day === 7) {
    return {
      day,
      dayTitle: 'Gün 7 — Avokado + Omega-3',
      daySummary: 'Yedinci gün, kereviz çorbası ve avokado ile omega-3 ve lif dengesi.',
      metabolicLine: 'Vücudun yağ kullanımına daha rahat geçiyor.',
      defenseFocus: 'Metabolik Esneklik',
      focusTag: 'Avokado + Omega-3',
      heroImageKey: 'kereviz_corbasi',
      meals: {
        breakfast: {
          title: 'Menemen + Mevsim Salatası',
          description:
            'Menemen (2 yumurta ile). Mevsim salatası (zeytinyağı, limon, kekik). 10–15 zeytin. Şekersiz çay, yeşil çay veya sade Türk kahvesi. Kahvaltıdan 30 dakika önce: enterik probiyotik kapsülü, zeytin yaprağı kapsülü. Kahvaltıdan 1 saat sonra: krill yağı kapsülü, 200 mg magnezyum kapsülü.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Domates',
            'Biber',
            'Mevsim sebzeleri',
            'Zeytin',
            'Zeytinyağı',
            'Limon',
            'Kekik',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Kereviz Çorbası + Mevsim Salatası',
          description:
            'Kereviz çorbası (tarife bak). Mevsim salatası. 10–15 adet çiğ fındık veya badem. Öğlen yemeğinden 30 dakika önce: çemen otu kapsülü.',
          recipeId: 'kereviz-corbasi',
          imageKey: 'kereviz_corbasi',
          shoppingItems: [
            'Kereviz kökü',
            'Soğan',
            'Zeytinyağı',
            'Et suyu',
            'Yumurta',
            'Limon',
            'Mevsim sebzeleri',
            'Fındık/Badem',
            'Kaya tuzu',
            'Karabiber',
            'Maydanoz',
          ],
        },
        dinner: {
          title: 'Fırında Tavuk + Soğuk Avokado Püresi',
          description:
            'Fırında tavuk. Soğuk avokado püresi veya mevsim salatası. Ev turşusu. Akşam yemeğinden 30 dakika önce: enterik probiyotik kapsülü, zeytin yaprağı kapsülü. Akşam yemeğinden 1 saat sonra: krill yağı kapsülü.',
          recipeId: null,
          shoppingItems: [
            'Tavuk',
            'Avokado',
            'Mevsim sebzeleri',
            'Ev turşusu',
            'Zeytinyağı',
            'Limon',
          ],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 8) {
    return {
      day,
      dayTitle: '8. Gün',
      daySummary: 'Sekizinci gün, sucuk köfte ve sebzeli paça çorbası ile karbonhidrat yükü minimum.',
      metabolicLine: 'İnsülin dalgalanması azalıyor, karaciğer yükü hafifliyor.',
      defenseFocus: 'Kan Şekeri Stabilitesi',
      focusTag: 'Düşük KH',
      heroImageKey: 'sucuk-kofte',
      infoCards: [
        {
          title: 'Bugünün Metabolik Amacı',
          text: 'Bugün karbonhidrat yükü minimum tutulur. Amaç insülin dalgalanmasını azaltmak, karaciğer yükünü hafifletmek ve gece kan şekeri stabilitesini artırmaktır.',
        },
        {
          title: 'Karaciğer Destek Stratejisi',
          text: 'Paça çorbasındaki kolajen ve sağlıklı yağlar doku onarımına destek olur. Çemen otu ve zeytin yaprağı insülin duyarlılığını desteklemeye yardımcı olabilir.',
        },
        {
          title: 'Günün Önerisi: Patlıcan Salatası',
          text: 'Yaz aylarında keyifle yenen salatalardan biri közlenmiş patlıcan salatasıdır. Zeytinyağı, sirke, biraz limon suyu, damak tadına göre dövülmüş 2–3 diş sarımsak ve tuz ile sos hazırlanır. Patlıcanlar ve tercihe göre kırmızı çan biber közlenip kabukları soyulur. İnce doğranıp sosla harmanlanır. Üzerine ince doğranmış maydanoz serpilir ve biraz daha sızma zeytinyağı gezdirilir.',
        },
      ],
      meals: {
        breakfast: {
          title: 'Sahanda Kavurmalı Yumurta',
          description:
            'Sahanda kavurmalı yumurta (2 yumurta ile hazırlanmış). Mevsim salatası. 10–15 adet siyah ya da yeşil zeytin. Şekersiz çay, yeşil çay ya da sade Türk kahvesi. Kahvaltıdan 30 dakika önce: enterik probiyotik kapsülü + zeytin yaprağı kapsülü. Kahvaltıdan 1 saat sonra: 200 mg krill yağı kapsülü + magnezyum kapsülü.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Mevsim sebzeleri',
            'Zeytin',
            'Zeytinyağı',
            'Limon',
            'Kekik',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Sebzeli Paça Çorbası',
          description:
            'Sebzeli paça çorbası (Önce paça suyu hazırlanır. Patates, havuç ve bezelye gibi glisemik indeksi yüksek sebzeler kullanılmaz. Sebzeler yumuşayınca blender ile çorba kıvamına getirilir. Paçalar saatlerce haşlanarak kemiğin içindeki kolajenin açığa çıkması sağlanır.). Ev sirkesi, kaya tuzu ve sızma zeytinyağı ile hazırlanmış kırmızı lahana salatası ya da çoban salata. 5–6 adet ceviz. Öğle yemeğinden 30 dakika önce: çemen otu kapsülü.',
          recipeId: 'sebzeli-paca-corbasi',
          imageKey: 'sebzeli-paca-corbasi',
          shoppingItems: [
            'Paça',
            'Ev sirkesi',
            'Kaya tuzu',
            'Zeytinyağı',
            'Kırmızı lahana veya mevsim sebzeleri',
            'Ceviz',
          ],
        },
        dinner: {
          title: 'Sucuk Köfte + Patlıcan Salatası',
          description:
            'Sucuk köfte. Mevsimine göre patlıcan salatası ya da marul, taze soğan, kereviz yaprakları ile hazırlanmış yeşil salata. Ev turşusu. Akşam yemeğinden 30 dakika önce: enterik probiyotik kapsülü + zeytin yaprağı kapsülü. Akşam yemeğinden 1 saat sonra: krill yağı kapsülü.',
          recipeId: 'sucuk-kofte',
          imageKey: 'sucuk-kofte',
          shoppingItems: [
            'Köftelik kıyma',
            'Sarımsak',
            'Kimyon',
            'Sucuk baharatı',
            'Karabiber',
            'Kaya tuzu',
            'Patlıcan veya marul, taze soğan, kereviz yaprağı',
            'Ev turşusu',
            'Zeytinyağı',
          ],
        },
      },
    };
  }

  if (day === 9) {
    return {
      day,
      dayTitle: 'Gün 9 — Metabolik Derinleşme',
      daySummary: 'Dokuzuncu gün, düşük karbonhidrat ve yüksek yağ/protein dengesiyle metabolik esnekliği artırır.',
      metabolicLine: 'Açlık kan şekeri düşmeye başlar ve insülin duyarlılığı artar.',
      defenseFocus: 'Metabolik Denge',
      focusTag: 'Protein + Sağlıklı Yağ',
      heroImageKey: 'sote-edilmis-karnabahar',

      meals: {
        breakfast: {
          title: 'Pastırmalı Yumurta',
          description:
            'Pastırmalı yumurta, 2 yumurta ve bol tereyağı ile hazırlanmış.\n\nMarketlerde satılan pastırmalara rağbet etmeyin, geleneksel olarak hazırlanmış olanları tercih edin.\n\nMevsim salatası.\n\n10–15 adet siyah ya da yeşil zeytin.\n\n10–15 adet çiğ fındık ya da badem.\n\nŞekersiz çay, yeşil çay ya da sade Türk kahvesi.\n\nKahvaltıdan 30 dakika önce enterik probiyotik kapsülü, zeytin yaprağı kapsülü.\n\nKahvaltıdan 1 saat sonra krill yağı kapsülü, 200 mg magnezyum kapsülü.',
          recipeId: 'pastirmali-yumurta',
          shoppingItems: [
            'Yumurta',
            'Pastırma',
            'Tereyağı',
            'Yeşillik',
            'Zeytin',
            'Fındık veya badem',
            'Çay veya kahve',
          ],
          imageKey: 'pastirmali-yumurta',
        },

        lunch: {
          title: 'Sebzeli Tavuk Çorbası + Karnabahar',
          description:
            'Sebzeli tavuk çorbası.\n\nMevsimine göre tereyağında sote edilmiş karnabahar veya zeytinyağlı kabak yemeği.\n\nÖğlen yemeğinden 30 dakika önce çemen otu kapsülü.',
          recipeId: 'sote-edilmis-karnabahar',
          imageKey: 'sote-edilmis-karnabahar',
          shoppingItems: [
            'Tavuk',
            'Havuç',
            'Soğan',
            'Sarımsak',
            'Karnabahar',
            'Kabak',
            'Tereyağı',
            'Zeytinyağı',
            'Tuz',
          ],
        },

        dinner: {
          title: 'Biftek ve Salata',
          description:
            'Biftek, kimyon, kekik, kaya tuzu ve karabiberle çeşitlendirilmiş.\n\nMevsimine göre ev sirkesi, sızma zeytinyağı ile çeşitlendirilmiş, taze nane, domates, kuru soğan, maydanoz ve salatalıkla hazırlanmış çoban salata\n\nya da kış yeşillikleri ile hazırlanmış, kabaca dövülmüş badem ile çeşitlendirilmiş yeşil salata.\n\nEv turşusu.\n\nAkşam yemeğinden 30 dakika önce enterik probiyotik kapsülü, zeytin yaprağı kapsülü.\n\nAkşam yemeğinden 1 saat sonra krill yağı kapsülü.',
          recipeId: null,
          imageKey: 'biftek',
          shoppingItems: [
            'Biftek',
            'Kimyon',
            'Kekik',
            'Karabiber',
            'Tuz',
            'Yeşillik',
            'Zeytinyağı',
            'Sirke',
            'Badem',
            'Turşu',
          ],
        },
      },
    };
  }

  if (day === 10) {
    return {
      day,
      dayTitle: 'Gün 10 — Devam',
      daySummary: 'Onuncu gün, düzenli glikoz kontrolü ve düşük karbonhidratlı seçimlerle metabolik dengeyi sürdürür.',
      metabolicLine: 'Kan şekeri dalgalanmaları azalırken savunma düzeni daha istikrarlı hale gelir.',
      defenseFocus: 'Glikoz Dengesi',
      focusTag: 'Düşük Karbonhidrat + Düzen',
      heroImageKey: 'ciger-yahni',

      meals: {
        breakfast: {
          title: 'Haşlanmış Yumurta + Salata',
          description:
            '2 adet kayısı kıvamında haşlanmış yumurta. Çoban salatası ya da yeşil salata, 10–15 zeytin, 6–7 ceviz ve şekersiz çay/yeşil çay/Türk kahvesi.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Domates',
            'Salatalık',
            'Biber',
            'Yeşillik',
            'Zeytinyağı',
            'Limon',
            'Kekik',
            'Zeytin',
            'Ceviz',
          ],
          imageKey: 'breakfast-default',
        },

        lunch: {
          title: 'Domates Çorbası + Zeytinyağlı Sebze',
          description:
            'Domates çorbası. Yanında zeytinyağlı pırasa veya zeytinyağlı bamya.',
          recipeId: 'domates-corbasi',
          shoppingItems: [
            'Domates',
            'Pırasa veya bamya',
            'Zeytinyağı',
            'Soğan',
            'Tuz',
          ],
          imageKey: 'domates-corbasi',
        },

        dinner: {
          title: 'Ciğer Yahni',
          description:
            'Ciğer yahni. Yanında mevsim salatası veya kırmızı soğanlı domates salatası, ayrıca ev turşusu.',
          recipeId: 'ciger-yahni',
          shoppingItems: [
            'Kuzu ciğeri',
            'Soğan',
            'Domates',
            'Taze soğan',
            'Dereotu',
            'Kaya tuzu',
            'Karabiber',
            'Zeytinyağı',
            'Domates',
            'Kırmızı soğan',
            'Maydanoz',
            'Sirke',
            'Limon',
            'Turşu',
          ],
          imageKey: 'ciger-yahni',
        },
      },
    };
  }

  if (day === 11) {
    return {
      day,
      dayTitle: 'Gün 11 — Devam',
      daySummary: 'On birinci gün, glikoz kontrolü ve düşük karbonhidratlı seçimlerle savunma düzenini güçlendirmeyi sürdürür.',
      metabolicLine: 'Metabolik denge sürerken dalgalanmalar azalır ve düzen hissi artar.',
      defenseFocus: 'Metabolik Düzen',
      focusTag: 'Protein + Sebze Desteği',
      heroImageKey: 'terbiyeli_et_suyu_corbasi',

      meals: {
        breakfast: {
          title: 'Sahanda Yumurta + Mevsim Salatası',
          description:
            'Sahanda yumurta, mevsim salatası, 10–15 zeytin, 10–15 fındık veya badem, şekersiz çay/yeşil çay/Türk kahvesi.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Tereyağı',
            'Yeşillik',
            'Domates',
            'Salatalık',
            'Biber',
            'Zeytin',
            'Fındık veya badem',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },

        lunch: {
          title: 'Terbiyeli Et Suyu Çorbası + Zeytinyağlı Sebze',
          description:
            'Terbiyeli et suyu çorbası. Yanında zeytinyağlı taze fasulye veya zeytinyağlı pırasa. Ev turşusu.',
          recipeId: 'terbiyeli-et-suyu-corbasi',
          shoppingItems: [
            'Et suyu',
            'Yumurta veya terbiye malzemeleri',
            'Taze fasulye veya pırasa',
            'Zeytinyağı',
            'Turşu',
            'Tuz',
          ],
          imageKey: 'terbiyeli_et_suyu_corbasi',
        },

        dinner: {
          title: 'Balık Buğulama',
          description:
            'Balık buğulama. Yanında çoban salata ya da brokoli salatası.',
          recipeId: null,
          shoppingItems: [
            'Hamsi veya levrek veya kefal',
            'Domates',
            'Salatalık',
            'Yeşillik',
            'Brokoli',
            'Zeytinyağı',
            'Limon',
            'Tuz',
          ],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 12) {
    return {
      day,
      dayTitle: 'Gün 12 — Devam',
      daySummary: 'On ikinci gün, protein ve düşük glisemik yük taşıyan besinlerle metabolik istikrarı sürdürür.',
      metabolicLine: 'Vücut kan şekeri dalgalanmalarını daha iyi tolere etmeye başlar.',
      defenseFocus: 'Glisemik Stabilite',
      focusTag: 'Protein + Düşük Glisemik Yük',
      heroImageKey: 'iskembe-corbasi',

      meals: {
        breakfast: {
          title: 'Sebzeli Omlet + Mevsim Salatası',
          description:
            'Sebzeli omlet, mevsim salatası, 10–15 zeytin, 5–6 ceviz ve şekersiz çay/yeşil çay/Türk kahvesi.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Sebzeler',
            'Tereyağı',
            'Yeşillik',
            'Domates',
            'Salatalık',
            'Zeytin',
            'Ceviz',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },

        lunch: {
          title: 'İşkembe Çorbası',
          description:
            'İşkembe çorbası, mevsim salatası ve ev turşusu.',
          recipeId: 'iskembe-corbasi',
          shoppingItems: [
            'İşkembe',
            'Sarımsak',
            'Sirke',
            'Limon',
            'Tuz',
            'Salata malzemeleri',
            'Turşu',
          ],
          imageKey: 'iskembe-corbasi',
        },

        dinner: {
          title: 'Izgara Biftek + Mantar',
          description:
            'Izgara biftek, tereyağında sote edilmiş mantar ve mevsim salatası.',
          recipeId: null,
          shoppingItems: [
            'Biftek',
            'Mantar',
            'Tereyağı',
            'Salata malzemeleri',
            'Tuz',
            'Karabiber',
          ],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 13) {
    return {
      day,
      dayTitle: 'Gün 13 — Devam',
      daySummary: 'On üçüncü gün, protein ve sebze dengesini koruyarak metabolik istikrarı sürdürür.',
      metabolicLine: 'Kan şekeri dalgalanmaları azalırken düzenli protein alımı tokluk ve dengeyi destekler.',
      defenseFocus: 'Metabolik Denge',
      focusTag: 'Protein + Sebze Uyumu',
      heroImageKey: 'yesil-biberli-tavuk',

      meals: {
        breakfast: {
          title: 'Sahanda Kıymalı Yumurta',
          description:
            'Sahanda kıymalı yumurta, mevsim salatası, 10–15 adet siyah ya da yeşil zeytin, 10–15 adet fındık ya da badem ve şekersiz çay / yeşil çay / sade Türk kahvesi.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Kıyma',
            'Soğan',
            'Kimyon',
            'Maydanoz',
            'Mevsim salatası malzemeleri',
            'Zeytin',
            'Fındık veya badem',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },

        lunch: {
          title: 'Terbiyeli Sebze Çorbası',
          description:
            'Terbiyeli sebze çorbası, zeytinyağlı kereviz ya da zeytinyağlı kabak yemeği, ayrıca mevsimine göre yeşil salata ya da çoban salatası.',
          recipeId: null,
          shoppingItems: [
            'Sebze çorbası malzemeleri',
            'Kereviz veya kabak',
            'Zeytinyağı',
            'Yeşil salata malzemeleri',
            'Çoban salata malzemeleri',
          ],
          imageKey: 'corba',
        },

        dinner: {
          title: 'Yeşil Biberli Tavuk',
          description:
            'Yeşil biberli tavuk ve ev yapımı sirke ile çeşitlendirilmiş mevsim salatası.',
          recipeId: 'yesil-biberli-tavuk',
          shoppingItems: [
            'Tavuk eti',
            'Soğan',
            'Domates',
            'Tarla biberi',
            'Zeytinyağı',
            'Mevsim salatası malzemeleri',
            'Ev yapımı sirke',
          ],
          imageKey: 'yesil-biberli-tavuk',
        },
      },
    };
  }

  if (day === 14) {
    return {
      day,
      dayTitle: 'Gün 14 — Devam',
      daySummary: 'On dördüncü gün, protein ve sebze ağırlıklı seçimlerle metabolik dengeyi korumayı sürdürür.',
      metabolicLine: 'Düşük glisemik yük ve dengeli öğünler, gün içi dalgalanmaları azaltmaya destek olur.',
      defenseFocus: 'Metabolik Denge',
      focusTag: 'Protein + Sebze Çeşitliliği',
      heroImageKey: 'sebzeli-guvec',

      meals: {
        breakfast: {
          title: 'Sahanda Kavurmalı Yumurta',
          description:
            'Sahanda kavurmalı yumurta, mevsim salatası, 10–15 adet siyah ya da yeşil zeytin ve şekersiz çay / yeşil çay / sade Türk kahvesi.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Kavurma',
            'Tereyağı',
            'Mevsim salatası malzemeleri',
            'Zeytin',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },

        lunch: {
          title: 'Terbiyeli Paça Çorbası',
          description:
            'Terbiyeli paça çorbası, semizotu salatası veya sızma zeytinyağı, limon ve kaya tuzu ile hazırlanmış hindiba salatası, ayrıca 5–6 adet ceviz.',
          recipeId: 'paca-corbasi',
          shoppingItems: [
            'Paça',
            'Semizotu veya hindiba',
            'Zeytinyağı',
            'Limon',
            'Kaya tuzu',
            'Ceviz',
          ],
          imageKey: 'paca-corbasi',
        },

        dinner: {
          title: 'Sebzeli Güveç',
          description:
            'Sebzeli güveç, mevsim salatası ve ev turşusu.',
          recipeId: 'sebzeli-guvec',
          shoppingItems: [
            'Kemikli kuzu eti',
            'Patlıcan',
            'Kabak',
            'Yeşil biber',
            'Domates',
            'Arpacık soğan',
            'Sarımsak',
            'Ev salçası',
            'Mevsim salatası malzemeleri',
            'Turşu',
          ],
          imageKey: 'sebzeli-guvec',
        },
      },
    };
  }

  if (day === 15) {
    return {
      day,
      dayTitle: 'Gün 15 — Devam',
      daySummary: 'On beşinci gün, protein ve sağlıklı yağ dengesi ile metabolik istikrarı sürdürür.',
      metabolicLine: 'Düşük glisemik yük ve dengeli öğünler enerji stabilitesini artırır.',
      defenseFocus: 'Metabolik Stabilite',
      focusTag: 'Protein + Sağlıklı Yağ',
      heroImageKey: 'cevizli-kuru-domates-mezesi',

      meals: {
        breakfast: {
          title: 'Sebzeli Omlet',
          description:
            'Sebzeli omlet, mevsim salatası, 10–15 adet zeytin, 10–15 adet çiğ fındık veya badem ve şekersiz çay / kahve.',
          recipeId: null,
          imageKey: 'breakfast-default',
        },

        lunch: {
          title: 'Terbiyeli Tavuk Suyu Çorbası',
          description:
            'Terbiyeli tavuk suyu çorbası ve kök sebze salatası veya çoban salata.',
          recipeId: 'terbiyeli-tavuk-suyu-corbasi',
          imageKey: 'terbiyeli-tavuk-suyu-corbasi',
        },

        dinner: {
          title: 'Köfte',
          description:
            'Köfte (ekmek yerine yumurta ile hazırlanmış), cevizli kuru domates mezesi ve mevsim salatası.',
          recipeId: null,
          imageKey: 'kofte',
        },
      },
    };
  }

  if (day === 16) {
    return {
      day,
      dayTitle: 'Gün 16 — Devam',
      daySummary: 'On altıncı gün, düşük glisemik yük ve lifli öğünlerle metabolik dengeyi destekler.',
      metabolicLine: 'Lif, protein ve fermente destekle gün içi dalgalanmalar daha iyi kontrol edilir.',
      defenseFocus: 'Metabolik Stabilite',
      focusTag: 'Lif + Protein + Fermente',
      heroImageKey: 'terbiyeli-karalahana-corbasi',

      meals: {
        breakfast: {
          title: 'Menemen',
          description:
            'Menemen, mevsim salatası, 10–15 adet siyah ya da yeşil zeytin ve şekersiz çay / yeşil çay / sade Türk kahvesi.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Domates',
            'Biber',
            'Tereyağı veya zeytinyağı',
            'Mevsim salatası malzemeleri',
            'Zeytin',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },

        lunch: {
          title: 'Et Suyuna Terbiyeli Karalahana Çorbası',
          description:
            'Et suyuna terbiyeli karalahana çorbası, mevsim salatası ve 5–6 adet ceviz.',
          recipeId: 'terbiyeli-karalahana-corbasi',
          shoppingItems: [
            'Karalahana',
            'Tereyağı',
            'Domates salçası',
            'Et suyu',
            'Limon',
            'Yumurta',
            'Kaya tuzu',
            'Karabiber',
            'Mevsim salatası malzemeleri',
            'Ceviz',
          ],
          imageKey: 'terbiyeli-karalahana-corbasi',
        },

        dinner: {
          title: 'Söğüş Nuar',
          description:
            'Söğüş nuar, yeşil salata ya da çoban salata ve ev turşusu.',
          recipeId: null,
          shoppingItems: [
            'Nuar eti',
            'Kimyon',
            'Kaya tuzu',
            'Karabiber',
            'Taze soğan',
            'Marul',
            'Dereotu',
            'Roka',
            'Çoban salata malzemeleri',
            'Ev turşusu',
          ],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 17) {
    return {
      day,
      dayTitle: 'Gün 17 — Denge ve Lif',
      daySummary: 'Sebze ağırlıklı öğünlerle lif alımı artırılır ve metabolik denge desteklenir.',
      metabolicLine: 'Düşük karbonhidrat ve yüksek lif kombinasyonu kan şekeri stabilitesini destekler.',
      defenseFocus: 'Lif ve Sindirim',
      focusTag: 'Sebze + Lif',

      heroImageKey: 'zeytinyagli-kabak-yemegi',

      meals: {
        breakfast: {
          title: 'Ispanaklı, Mantarlı Yumurta',
          description: 'Ispanaklı, mantarlı yumurta, mevsim salatası, zeytin ve çiğ kuruyemişler.',
          recipeId: null,
          imageKey: 'breakfast-default',
        },

        lunch: {
          title: 'Zeytinyağlı Kabak Yemeği veya Brüksel Lahanası',
          description: 'Mevsimine göre zeytinyağlı kabak yemeği veya zeytinyağlı Brüksel lahanası, mevsim salatası ve ev turşusu.',
          recipeId: null,
          imageKey: 'zeytinyagli-kabak-yemegi',
        },

        dinner: {
          title: 'Izgara Böbrek',
          description: 'Izgara böbrek, yanında sumak ve pul biberle çeşitlendirilmiş ince doğranmış kuru soğan ile mevsim salatası.',
          recipeId: null,
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 18) {
    return {
      day,
      dayTitle: 'Gün 18 — Protein ve Denge',
      daySummary: 'Protein yoğun öğünlerle doygunluk ve metabolik denge desteklenir.',
      metabolicLine: 'Düşük glisemik yük ve güçlü protein kombinasyonu enerji dalgalanmalarını azaltmaya yardımcı olur.',
      defenseFocus: 'Protein ve Stabilite',
      focusTag: 'Protein Odaklı',
      heroImageKey: 'yalanci-tandir',

      meals: {
        breakfast: {
          title: 'Sahanda Sucuklu Yumurta',
          description:
            'Sahanda sucuklu yumurta, mevsim salatası, 10–15 adet siyah ya da yeşil zeytin, 5–6 adet ceviz ve şekersiz çay / yeşil çay / sade Türk kahvesi.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Sucuk',
            'Mevsim salatası malzemeleri',
            'Siyah veya yeşil zeytin',
            'Ceviz',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Terbiyeli Et Suyu Çorbası',
          description:
            'Terbiyeli et suyu çorbası, semizotu salatası ya da zeytinyağlı kereviz yemeği.',
          recipeId: 'terbiyeli-et-suyu-corbasi',
          shoppingItems: [
            'Et suyu',
            'Yumurta sarısı',
            'Limon',
            'Semizotu veya kereviz',
            'Zeytinyağı',
          ],
          imageKey: 'terbiyeli_et_suyu_corbasi',
        },
        dinner: {
          title: 'Yalancı Tandır',
          description:
            'Yalancı tandır, kuzu koldan hazırlanmış; yanında mevsimine göre çiğ karnabahar salatası ya da çoban salata ve ev turşusu.',
          recipeId: 'yalanci-tandir',
          shoppingItems: [
            'Kuzu kolu',
            'Soğan',
            'Havuç',
            'Maydanoz sapı',
            'Brüksel lahanası',
            'Kaya tuzu',
            'Tane karabiber',
            'Karnabahar veya çoban salata malzemeleri',
            'Ev turşusu',
          ],
          imageKey: 'yalanci-tandir',
        },
      },
    };
  }

  if (day === 19) {
    return {
      day,
      dayTitle: 'Gün 19 — Hafif ve Denge',
      daySummary: 'Sebze ve sağlıklı yağlar ile dengeli bir gün.',
      metabolicLine: 'Düşük glisemik yük ve lif dengesi kan şekeri stabilitesine katkı sağlar.',
      defenseFocus: 'Lif ve Antioksidan',
      focusTag: 'Hafif Gün',
      heroImageKey: 'enginar-corbasi',
      meals: {
        breakfast: {
          title: 'Sebzeli Omlet',
          description: 'Sebzeli omlet, mevsim salatası, zeytin ve çiğ kuruyemişler.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Sebzeler',
            'Zeytin',
            'Fındık veya badem',
            'Mevsim salatası malzemeleri'
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Enginar Çorbası',
          description: 'Enginar çorbası, mevsim salata ve ev turşusu ile.',
          recipeId: 'enginar-corbasi',
          shoppingItems: [
            'Enginar',
            'Limon',
            'Yumurta sarısı',
            'Zeytinyağı',
            'Dereotu',
            'Salata malzemeleri',
            'Turşu'
          ],
          imageKey: 'enginar-corbasi',
        },
        dinner: {
          title: 'Kağıtta Somon',
          description: 'Fırında kağıtta somon, yanında alabaş veya mevsim salatası.',
          recipeId: null,
          shoppingItems: [
            'Somon',
            'Defne yaprağı',
            'Maydanoz',
            'Limon',
            'Alabaş veya salata malzemeleri'
          ],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 20) {
    return {
      day,
      dayTitle: 'Gün 20 — Denge ve Doygunluk',
      daySummary: 'Protein, lif ve fermente destekle dengeli bir gün.',
      metabolicLine: 'Düşük glisemik yük ve güçlü öğün yapısı kan şekeri stabilitesine yardımcı olur.',
      defenseFocus: 'Denge ve Tokluk',
      focusTag: 'Protein + Lif',
      heroImageKey: 'pirincsiz-biber-dolmasi',
      meals: {
        breakfast: {
          title: 'Pastırmalı Yumurta',
          description:
            'Pastırmalı yumurta, mevsim salatası, siyah ya da yeşil zeytin, ceviz ve şekersiz çay / yeşil çay / sade Türk kahvesi.',
          recipeId: 'pastirmali-yumurta',
          shoppingItems: [
            'Yumurta',
            'Pastırma',
            'Mevsim salatası malzemeleri',
            'Siyah veya yeşil zeytin',
            'Ceviz',
            'Çay veya kahve',
          ],
          imageKey: 'pastirmali-yumurta',
        },
        lunch: {
          title: 'Sebzeli Paça Çorbası',
          description:
            'Sebzeli paça çorbası, yeşil salata ya da çoban salata ve ev turşusu.',
          recipeId: 'sebzeli-paca-corbasi',
          shoppingItems: [
            'Paça suyu',
            'Sebzeler',
            'Yeşil salata malzemeleri',
            'Çoban salata malzemeleri',
            'Ev turşusu',
          ],
          imageKey: 'sebzeli-paca-corbasi',
        },
        dinner: {
          title: 'Pirinçsiz Biber Dolması',
          description:
            'Pirinçsiz biber dolması ve mevsim salatası.',
          recipeId: 'pirincsiz-biber-dolmasi',
          shoppingItems: [
            'Soğan',
            'Kıyma',
            'Karnabahar',
            'Domates salçası',
            'Biber salçası',
            'Dolmalık yeşilbiber',
            'Sızma zeytinyağı',
            'Kaya tuzu',
            'Karabiber',
            'Kimyon',
            'Nane',
            'Sumak',
            'Mevsim salatası malzemeleri',
          ],
          imageKey: 'pirincsiz-biber-dolmasi',
        },
      },
    };
  }

  if (day === 21) {
    return {
      day,
      dayTitle: 'Gün 21 — Çeşitlilik ve Probiyotik',
      daySummary: 'Üçüncü haftanın sonunda çeşitlilik artıyor; probiyotik ve fermente destek öne çıkıyor.',
      metabolicLine: 'Dengeli protein, sebze ve fermente içerikler metabolik istikrarı destekler.',
      defenseFocus: 'Probiyotik ve Çeşitlilik',
      focusTag: 'Fermente + Sebze',
      heroImageKey: 'ev-yogurdu',
      meals: {
        breakfast: {
          title: 'Beyaz Peynirli Omlet',
          description:
            'Maydanoz, dereotu, taze soğan ve beyaz peynirli omlet; mevsim salatası, zeytin, çiğ badem veya fındık ve şekersiz içecekler.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Maydanoz',
            'Dereotu',
            'Taze soğan',
            'Beyaz peynir',
            'Mevsim salatası malzemeleri',
            'Sızma zeytinyağı',
            'Limon',
            'Siyah veya yeşil zeytin',
            'Çiğ badem veya fındık',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Tavuk Suyuna Sebze Çorbası',
          description:
            'Tavuk suyuna sebze çorbası, mevsim salatası ve ev turşusu.',
          recipeId: null,
          shoppingItems: [
            'Tavuk suyu',
            'Sebzeler',
            'Mevsim salatası malzemeleri',
            'Ev turşusu',
          ],
          imageKey: 'terbiyeli-tavuk-suyu-corbasi',
        },
        dinner: {
          title: 'Kıymalı Karnabahar Yemeği veya Patlıcan Musakka',
          description:
            'Mevsimine göre kıymalı karnabahar yemeği veya patlıcan musakka, yanında ev yoğurdu ve mevsim salatası.',
          recipeId: null,
          shoppingItems: [
            'Kıyma',
            'Karnabahar veya patlıcan',
            'Soğan',
            'Domates veya salça',
            'Baharatlar',
            'Ev yoğurdu',
            'Mevsim salatası malzemeleri',
          ],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 22) {
    return {
      day,
      dayTitle: 'Gün 22 — Güç ve Denge',
      daySummary: 'Protein ağırlıklı ve dengeli bir gün.',
      metabolicLine: 'Protein ve sağlıklı yağ dengesi kan şekeri stabilitesini destekler.',
      defenseFocus: 'Protein ve Denge',
      focusTag: 'Protein Günü',
      heroImageKey: 'tavuk-kulbasti',
      meals: {
        breakfast: {
          title: 'Peynir Tabağı',
          description:
            'Beyaz ya da kaşar peyniri, mevsim salatası, zeytin, ceviz ve şekersiz içecekler.',
          recipeId: null,
          shoppingItems: [
            'Beyaz peynir',
            'Kaşar peyniri',
            'Mevsim salatası malzemeleri',
            'Zeytin',
            'Ceviz',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Tavuk Külbastı',
          description:
            'Tavuk külbastı, yanında beyaz lahana salatası ya da çoban salata.',
          recipeId: 'tavuk-kulbasti',
          shoppingItems: [
            'Tavuk göğsü',
            'Zeytinyağı',
            'Sarımsak',
            'Kekik',
            'Tuz',
            'Karabiber',
            'Beyaz lahana',
            'Dereotu',
            'Salata malzemeleri',
          ],
          imageKey: 'tavuk-kulbasti',
        },
        dinner: {
          title: 'Çılbır',
          description: 'Çılbır, mevsim salatası ile.',
          recipeId: 'cilbir',
          shoppingItems: [
            'Yumurta',
            'Yoğurt',
            'Sarımsak',
            'Tereyağı',
            'Kırmızı toz biber',
            'Mevsim salatası malzemeleri',
          ],
          imageKey: 'cilbir',
        },
      },
    };
  }

  if (day === 23) {
    return {
      day,
      dayTitle: 'Gün 23 — Lif ve Denge',
      daySummary: 'Bakliyat ve sebze dengesiyle metabolik destek.',
      metabolicLine: 'Lif ve protein dengesi kan şekeri kontrolünü destekler.',
      defenseFocus: 'Lif ve Bağırsak Desteği',
      focusTag: 'Lif + Protein',
      heroImageKey: 'yogurtlu-pirasa',
      meals: {
        breakfast: {
          title: 'Tereyağlı Yumurta',
          description:
            'Sahanda tereyağlı yumurta, peynir, zeytin, kuruyemiş ve şekersiz içecekler.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Tereyağı',
            'Kaşar / beyaz / tulum peyniri',
            'Zeytin',
            'Fındık veya badem',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Kırmızı Mercimek Çorbası',
          description:
            'Kırmızı mercimek çorbası, yoğurtlu pırasa veya bamya ve salata.',
          recipeId: null,
          shoppingItems: [
            'Kırmızı mercimek',
            'Pırasa veya bamya',
            'Yoğurt',
            'Salata malzemeleri',
            'Turşu',
          ],
          imageKey: 'mercimek-corbasi',
        },
        dinner: {
          title: 'Izgara Köfte',
          description:
            'Izgara köfte (ekmek yerine yumurta kullanarak), yanında salata.',
          recipeId: null,
          shoppingItems: [
            'Kıyma',
            'Yumurta',
            'Soğan',
            'Baharatlar',
            'Marul',
            'Avokado',
            'Salata malzemeleri',
          ],
          imageKey: 'kofte',
        },
      },
    };
  }

  if (day === 24) {
    return {
      day,
      dayTitle: 'Gün 24 — Güçlü Başlangıç',
      daySummary: 'Protein, fermente destek ve lifli sebzelerle dengeli bir gün.',
      metabolicLine: 'Protein ve lif birlikteliği gün içi dengeyi destekler.',
      defenseFocus: 'Protein ve Bağırsak Desteği',
      focusTag: 'Protein + Lif',
      heroImageKey: 'acili-lahana-corbasi',
      meals: {
        breakfast: {
          title: 'Sahanda Sucuklu Yumurta',
          description:
            'Sahanda sucuklu yumurta, mevsim salata, zeytin, ceviz ve şekersiz içecekler.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Sucuk',
            'Mevsim salatası malzemeleri',
            'Siyah veya yeşil zeytin',
            'Ceviz',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Acılı Lahana Çorbası',
          description:
            'Acılı lahana çorbası, tulum peynirli ve cevizli salata, ev yoğurdu.',
          recipeId: 'acili-lahana-corbasi',
          shoppingItems: [
            'Beyaz lahana',
            'Zeytinyağı',
            'Soğan',
            'Domates salçası',
            'Kırmızıbiber salçası',
            'Limon',
            'Tulum peyniri',
            'Ceviz',
            'Ispanak veya maydanoz',
            'Kurutulmuş domates',
            'Ev yoğurdu',
          ],
          imageKey: 'acili-lahana-corbasi',
        },
        dinner: {
          title: 'Taş Kebabı',
          description:
            'Taş kebabı, brokoli salatası ya da mevsim salata ve turşu.',
          recipeId: 'tas-kebabi',
          shoppingItems: [
            'Taş kebabı malzemeleri',
            'Brokoli',
            'Salata malzemeleri',
            'Turşu',
          ],
          imageKey: 'tas-kebabi',
        },
      },
    };
  }

  if (day === 25) {
    return {
      day,
      dayTitle: 'Gün 25 — Denge ve Güç',
      daySummary: 'Protein, sağlıklı yağ ve baharat desteğiyle metabolik denge.',
      metabolicLine: 'Baharatlar ve sağlıklı yağlar metabolizmayı destekler.',
      defenseFocus: 'Metabolik Destek',
      focusTag: 'Protein + Baharat',
      heroImageKey: 'iskembe-corbasi',
      meals: {
        breakfast: {
          title: 'Rafadan Yumurta',
          description:
            'Rafadan yumurta, kuruyemişli ve tarçınlı yoğurt, salata ve zeytin.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Yoğurt',
            'Ceviz',
            'Fındık veya badem',
            'Tarçın',
            'Salata malzemeleri',
            'Zeytin',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'İşkembe Çorbası',
          description:
            'İşkembe çorbası, fırında peynirli mantar ve salata.',
          recipeId: 'iskembe-corbasi',
          shoppingItems: [
            'İşkembe',
            'Mantar',
            'Kaşar peyniri',
            'Tereyağı',
            'Salata malzemeleri',
          ],
          imageKey: 'iskembe-corbasi',
        },
        dinner: {
          title: 'Sebzeli Tavuk Sote',
          description:
            'Sebzeli tavuk sote, cacık ve turşu.',
          recipeId: null,
          shoppingItems: [
            'Tavuk',
            'Sebzeler',
            'Yoğurt',
            'Salatalık',
            'Turşu',
          ],
          imageKey: 'tavuk-sote',
        },
      },
    };
  }

  if (day === 26) {
    return {
      day,
      dayTitle: 'Gün 26 — Sebze ve Protein Dengesi',
      daySummary: 'Sebze, protein ve sağlıklı yağlarla dengeli beslenme.',
      metabolicLine: 'Düşük glisemik yük + yüksek besin değeri.',
      defenseFocus: 'Denge',
      focusTag: 'Sebze + Protein',
      heroImageKey: 'beyaz-peynirli-kabak',
      meals: {
        breakfast: {
          title: 'Kavurmalı Yumurta',
          description: 'Sahanda kavurmalı yumurta, peynir, zeytin ve kuruyemiş.',
          recipeId: null,
          shoppingItems: ['Yumurta','Kavurma','Peynir','Zeytin','Fındık veya badem'],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Beyaz Peynirli Kabak',
          description: 'Zeytinyağlı kereviz yemeği veya beyaz peynirli kabak, yoğurt ve salata.',
          recipeId: 'beyaz-peynirli-kabak',
          shoppingItems: ['Kabak','Beyaz peynir','Yoğurt','Baharatlar','Salata'],
          imageKey: 'beyaz-peynirli-kabak',
        },
        dinner: {
          title: 'Fırında Ciğer',
          description: 'Fırında ciğer, salata ve turşu.',
          recipeId: null,
          shoppingItems: ['Ciğer','Baharatlar','Soğan','Maydanoz','Turşu'],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 27) {
    return {
      day,
      dayTitle: 'Gün 27 — Omega Gücü',
      daySummary: 'Sağlıklı yağlar ve protein ile metabolik destek.',
      metabolicLine: 'Omega-3 ile hücresel destek.',
      defenseFocus: 'Anti-inflamasyon',
      focusTag: 'Omega-3',
      heroImageKey: 'sarimsakli-tereyagli-somon',
      meals: {
        breakfast: {
          title: 'Beyaz Peynirli Menemen',
          description: 'Beyaz peynirli menemen, salata ve zeytin.',
          recipeId: null,
          shoppingItems: ['Yumurta','Beyaz peynir','Domates','Biber'],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Dil Söğüş',
          description: 'Dil söğüş, salata ve yoğurt.',
          recipeId: null,
          shoppingItems: ['Dil','Yoğurt','Ceviz','Fındık'],
          imageKey: 'lunch-default',
        },
        dinner: {
          title: 'Sarımsaklı Tereyağlı Somon',
          description: 'Sarımsaklı tereyağlı somon ve salata.',
          recipeId: 'sarimsakli-tereyagli-somon',
          shoppingItems: ['Somon','Sarımsak','Tereyağı','Maydanoz','Limon'],
          imageKey: 'sarimsakli-tereyagli-somon',
        },
      },
    };
  }

  if (day === 28) {
    return {
      day,
      dayTitle: 'Gün 28 — Stabil Şeker',
      daySummary: 'Düşük glisemik seçimlerle dengeyi koruma günü.',
      metabolicLine: 'Kaloriden çok glisemik etkiyi kontrol etmek önemlidir.',
      defenseFocus: 'Glisemik Denge',
      focusTag: 'Stabilite',
      heroImageKey: 'yogurt-corbasi',
      meals: {
        breakfast: {
          title: 'Sahanda Yumurta',
          description:
            'Sahanda yumurta, peynir, zeytin, çiğ kuruyemiş ve şekersiz içeceklerle.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Tereyağı',
            'Kaşar / beyaz / tulum peyniri',
            'Siyah veya yeşil zeytin',
            'Çiğ fındık veya badem',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Yoğurt Çorbası',
          description:
            'Yoğurt çorbası, kırmızılahana salatası veya çoban salata, ev turşusu.',
          recipeId: 'yogurt-corbasi',
          shoppingItems: [
            'Ev yoğurdu',
            'Yumurta',
            'Et suyu',
            'Tereyağı',
            'Nane',
            'Pul biber',
            'Biber salçası',
            'Kırmızılahana veya salata malzemeleri',
            'Ev turşusu',
          ],
          imageKey: 'yogurt-corbasi',
        },
        dinner: {
          title: 'Sucuk Köfte',
          description:
            'Sucuk köfte, cacık ve mevsim salatası.',
          recipeId: 'sucuk-kofte',
          shoppingItems: [
            'Sucuk köfte malzemeleri',
            'Yoğurt',
            'Salatalık',
            'Mevsim salatası malzemeleri',
          ],
          imageKey: 'sucuk-kofte',
        },
      },
    };
  }

  if (day === 29) {
    return {
      day,
      dayTitle: `Gün ${day} — Rutin`,
      daySummary: 'Basit, sürdürülebilir öğünlerle ritmi koru.',
      metabolicLine: 'Metabolik ritim korunuyor.',
      defenseFocus: 'İştah kontrolü',
      focusTag: 'İştah kontrolü',
      heroImageKey: 'paca-corbasi',
      meals: {
        breakfast: {
          title: 'Pastırmalı Yumurta',
          description:
            'Pastırmalı yumurta, mevsim salata, kaşar/beyaz/tulum peyniri, 10-15 adet siyah ya da yeşil zeytin, 5-6 adet ceviz ve şekersiz çay/yeşil çay/sade Türk kahvesi.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Pastırma',
            'Mevsim salata malzemeleri',
            'Kaşar / beyaz / tulum peyniri',
            'Siyah veya yeşil zeytin',
            'Ceviz',
            'Çay veya kahve',
          ],
          imageKey: 'pastirmali-yumurta',
        },
        lunch: {
          title: 'Paça Çorbası',
          description:
            'Paça çorbası, mevsimine göre patlıcan silikme veya kıymalı ıspanak yemeği (pirinçsiz) ve ev yoğurdu.',
          recipeId: 'paca-corbasi',
          shoppingItems: [
            'Paça',
            'Patlıcan silikme veya kıymalı ıspanak yemeği malzemeleri',
            'Ev yoğurdu',
          ],
          imageKey: 'paca-corbasi',
        },
        dinner: {
          title: 'Izgara Kokoreç',
          description:
            'Kekik ve kimyonla çeşnilendirilmiş ızgara kokoreç, çoban salata ya da yeşil salata ve ev turşusu.',
          recipeId: null,
          shoppingItems: [
            'Kokoreç',
            'Kekik',
            'Kimyon',
            'Çoban salata veya yeşil salata malzemeleri',
            'Ev turşusu',
          ],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 30) {
    return {
      day,
      dayTitle: 'Gün 30 — Temiz Protein',
      daySummary: 'Dengeli protein ve sebze ile stabil enerji.',
      metabolicLine: 'Protein + sağlıklı yağ dengesi.',
      defenseFocus: 'Metabolik Denge',
      focusTag: 'Protein',
      heroImageKey: 'peynirli-domates-dolmasi',
      meals: {
        breakfast: {
          title: 'Haşlanmış Yumurta',
          description: 'Haşlanmış yumurta, mevsim salata, zeytin ve fındık/badem.',
          recipeId: null,
          shoppingItems: ['Yumurta','Zeytin','Fındık','Badem'],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Peynirli Domates Dolması',
          description: 'Balık çorbası ile birlikte fırında peynirli domates dolması ya da fırında Brüksel lahanası.',
          recipeId: 'peynirli-domates-dolmasi',
          shoppingItems: ['Balık','Soğan','Sarımsak'],
          imageKey: 'peynirli-domates-dolmasi',
        },
        dinner: {
          title: 'Çeşnili Izgara Tavuk',
          description: 'Çeşnili ızgara tavuk, tereyağında sote edilmiş mantar ve mevsim salatası.',
          recipeId: null,
          shoppingItems: ['Tavuk','Mantar','Salata'],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 31) {
    return {
      day,
      dayTitle: 'Gün 31 — Yağ tüketimini artır',
      daySummary: 'Sağlıklı yağlarla tokluk ve glisemik dengeyi güçlendirme günü.',
      metabolicLine: 'Yağlar, birlikte tüketilen besinlerin glisemik etkisini düşürmeye yardımcı olur.',
      defenseFocus: 'Glisemik Denge',
      focusTag: 'Sağlıklı Yağlar',
      heroImageKey: 'day31',
      defiInsight: {
        focus: 'Düşük karbonhidrat dengesi',
        goal: 'Kan şekeri dalgalanmasını azaltıp daha dengeli tokluk sağlamak',
        primaryFoods: ['yumurta', 'zeytinyağı', 'ceviz'],
        metabolicTags: ['lowCarb', 'glucoseStability', 'satietySupport'],
        explanation: 'Bugünün menüsü protein, lif ve dengeli yağ kombinasyonuyla daha kontrollü bir enerji akışı hedefler.',
      },
      meals: {
        breakfast: {
          title: 'Sahanda Kıymalı Yumurta',
          description:
            'Sahanda kıymalı yumurta, çoban salata veya yeşil salata, kaşar/beyaz/tulum peyniri, 10-15 adet siyah ya da yeşil zeytin, 4-5 adet ceviz ve şekersiz çay/yeşil çay/sade Türk kahvesi.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Kıyma',
            'Biber',
            'Salatalık',
            'Domates',
            'Sızma zeytinyağı',
            'Limon',
            'Kekik',
            'Kaşar / beyaz / tulum peyniri',
            'Siyah veya yeşil zeytin',
            'Ceviz',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Sebze Çorbası',
          description:
            'Sebze çorbası (et suyu ve mevsim sebzeleri ile), mevsimine göre yoğurtlu pancar salatası veya yoğurtlu semizotu salatası.',
          recipeId: null,
          shoppingItems: [
            'Et suyu',
            'Mevsim sebzeleri',
            'Pancar veya semizotu',
            'Ev yoğurdu',
          ],
          imageKey: 'lunch-default',
        },
        dinner: {
          title: 'Kemikli Etle Kuru Fasulye',
          description:
            'Kemikli etle pişirilmiş kuru fasulye, mevsim salatası ve ev yoğurdu ile hazırlanmış cacık (kuru nane ve sızma zeytinyağı ile).',
          recipeId: null,
          shoppingItems: [
            'Kemikli et',
            'Kuru fasulye',
            'Mevsim salatası malzemeleri',
            'Ev yoğurdu',
            'Salatalık',
            'Kuru nane',
            'Sızma zeytinyağı',
          ],
          imageKey: 'day31',
        },
      },
    };
  }

  if (day === 32) {
    return {
      day,
      dayTitle: 'Gün 32 — Doğal dengeyi koru',
      daySummary: 'Doğal dengeyi koruyarak glisemik istikrarı sürdür.',
      metabolicLine: 'Düşük glisemik yük ve dengeli yağ-protein alımı destekleniyor.',
      defenseFocus: 'Doğal Denge',
      focusTag: 'Denge',
      heroImageKey: 'yogurt-corbasi',
      defiInsight: {
        focus: 'Protein ve fermente denge',
        goal: 'Öğün ritmini koruyarak uzun süreli tokluk desteği sağlamak',
        primaryFoods: ['yumurta', 'yoğurt çorbası', 'zeytinyağlı sebzeler'],
        metabolicTags: ['proteinBalance', 'satietySupport', 'lowCarb'],
        explanation: 'Günün yapısı, düşük karbonhidrat çizgisini bozmadan öğünler arasında enerji dengesini korumaya odaklanır.',
        swapRules: [
          {
            trigger: 'yoğurt',
            alternatives: ['kefir', 'yumurta', 'zeytinyağlı sebze'],
            reason: 'tokluk ve dengeli içerik etkisini korumak',
          },
        ],
      },
      meals: {
        breakfast: {
          title: 'Haşlanmış Yumurta',
          description:
            '2 adet haşlanmış yumurta (kayısı kıvamında), mevsim salata, kaşar/beyaz/tulum peyniri (şirden mayalı), 10-15 adet siyah ya da yeşil zeytin, 10-15 adet çiğ fındık ya da badem ve şekersiz çay/yeşil çay/sade Türk kahvesi.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Mevsim salata malzemeleri',
            'Kaşar / beyaz / tulum peyniri',
            'Siyah veya yeşil zeytin',
            'Çiğ fındık veya badem',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Yoğurt Çorbası',
          description:
            'Yoğurt çorbası, zeytinyağlı taze fasulye veya zeytinyağlı pırasa (şeker ve pirinç eklenmeden), mevsim salata.',
          recipeId: 'yogurt-corbasi',
          shoppingItems: [
            'Ev yoğurdu',
            'Yumurta',
            'Et suyu',
            'Taze fasulye veya pırasa',
            'Sızma zeytinyağı',
            'Mevsim salata malzemeleri',
          ],
          imageKey: 'yogurt-corbasi',
        },
        dinner: {
          title: 'Patlıcan Musakka veya Kıymalı Karnabahar',
          description:
            'Patlıcan musakka veya kıymalı karnabahar yemeği, yanında ev yoğurdu.',
          recipeId: null,
          shoppingItems: [
            'Patlıcan veya karnabahar',
            'Kıyma',
            'Soğan',
            'Domates veya salça',
            'Ev yoğurdu',
          ],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 33) {
    return {
      day,
      dayTitle: 'Gün 33 — Doğal Güç: Ispanak',
      daySummary: 'Ispanak ve dengeli protein kaynaklarıyla doğal gücü destekleme günü.',
      metabolicLine: 'Düşük glisemik yük ve mineral zengini öğünler dengeyi destekler.',
      defenseFocus: 'Mineral ve Denge',
      focusTag: 'Doğal Güç',
      heroImageKey: 'terbiyeli-tavuk-suyu-corbasi',
      meals: {
        breakfast: {
          title: 'Sahanda Yumurta',
          description:
            'Sahanda yumurta (2 adet, bol tereyağı), kaşar/beyaz/tulum peyniri (şirden mayalı), yeşil salata veya çoban salata, 10-15 adet siyah ya da yeşil zeytin, 7-8 adet çiğ fındık veya badem ve şekersiz çay/yeşil çay/Türk kahvesi.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Tereyağı',
            'Kaşar / beyaz / tulum peyniri',
            'Yeşil salata veya çoban salata malzemeleri',
            'Siyah veya yeşil zeytin',
            'Çiğ fındık veya badem',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Terbiyeli Tavuk Suyu Çorbası',
          description:
            'Terbiyeli tavuk suyu çorbası, tulum peynirli ve cevizli ıspanak salatası veya çoban salata, ev yoğurdu.',
          recipeId: 'terbiyeli-tavuk-suyu-corbasi',
          shoppingItems: [
            'Tavuk suyu',
            'Yumurta sarısı',
            'Limon',
            'Tulum peyniri',
            'Ceviz',
            'Ispanak veya çoban salata malzemeleri',
            'Ev yoğurdu',
          ],
          imageKey: 'terbiyeli-tavuk-suyu-corbasi',
        },
        dinner: {
          title: 'Sardalye / Hamsi / Somon',
          description:
            'Sardalye, hamsi veya somon (ızgara ya da buğulama), mevsim salatası.',
          recipeId: null,
          shoppingItems: [
            'Sardalye veya hamsi veya somon',
            'Mevsim salatası malzemeleri',
          ],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 34) {
    return {
      day,
      dayTitle: 'Gün 34 — Taze Soğanlı Biftek',
      daySummary: 'Protein ve yeşil sebze dengesini koruyarak metabolik ritmi destekleme günü.',
      metabolicLine: 'Düşük glisemik yük ve dengeli yağ/protein kombinasyonu ile stabilite korunur.',
      defenseFocus: 'Protein ve Denge',
      focusTag: 'Doğal Güç',
      heroImageKey: 'taze-soganli-biftek',
      meals: {
        breakfast: {
          title: 'Kavurmalı Yumurta',
          description:
            'Kavurmalı yumurta, mevsim salata, peynir çeşitleri, 10-15 zeytin, 5-6 ceviz ve şekersiz içecekler.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Kavurma',
            'Mevsim salata malzemeleri',
            'Kaşar / beyaz / tulum peyniri',
            'Zeytin',
            'Ceviz',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Domates Çorbası',
          description:
            'Domates çorbası, börülce salatası veya kırmızı lahana salatası ve yoğurt.',
          recipeId: 'domates-corbasi',
          shoppingItems: [
            'Domates çorbası malzemeleri',
            'Börülce veya kırmızı lahana',
            'Yoğurt',
          ],
          imageKey: 'domates-corbasi',
        },
        dinner: {
          title: 'Taze Soğanlı Biftek',
          description:
            'Taze soğanlı biftek, çoban salata veya karnabahar salatası.',
          recipeId: null,
          shoppingItems: [
            'Biftek',
            'Zeytinyağı',
            'Taze soğan',
            'Dereotu',
            'Limon',
            'Tereyağı',
            'Kaya tuzu',
            'Karabiber',
            'Çoban salata veya karnabahar salatası malzemeleri',
          ],
          imageKey: 'taze-soganli-biftek',
        },
      },
    };
  }

  if (day === 35) {
    return {
      day,
      dayTitle: 'Gün 35 — Otuz beşinci gün',
      daySummary: 'Mineral ve protein dengesiyle metabolik istikrarı koruma günü.',
      metabolicLine: 'Düşük glisemik yük ve dengeli öğün yapısı kan şekeri stabilitesini destekler.',
      defenseFocus: 'Denge ve Güç',
      focusTag: 'Doğal Güç: Ispanak',
      heroImageKey: 'dovmec',
      meals: {
        breakfast: {
          title: 'Omlet',
          description:
            'Omlet (iki yumurta), mevsim salatası, kaşar/beyaz/tulum peyniri (şirden mayalı), 10-15 siyah ya da yeşil zeytin, 10-15 çiğ fındık ya da badem, şekersiz çay/yeşil çay/sade Türk kahvesi.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Mevsim salatası malzemeleri',
            'Kaşar / beyaz / tulum peyniri',
            'Siyah veya yeşil zeytin',
            'Çiğ fındık veya badem',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Sebzeli Paça Çorbası',
          description:
            'Sebzeli paça çorbası, fırında kabak mücver (tarif için sayfa 268’e bakınız) ya da fırında peynirli mantar, ev yoğurdu veya ev yoğurdu ile hazırlanmış ayran.',
          recipeId: 'sebzeli-paca-corbasi',
          shoppingItems: [
            'Paça suyu',
            'Düşük glisemik sebzeler',
            'Kabak mücver veya peynirli mantar malzemeleri',
            'Ev yoğurdu',
          ],
          imageKey: 'sebzeli-paca-corbasi',
        },
        dinner: {
          title: 'Çeşnili Tavuk Izgara + Dövmeç',
          description:
            'Çeşnili tavuk ızgara (fileto göğüs eti; biberiye, kekik, 1 tatlı kaşığı limon suyu, dövülmüş sarımsak ile 2-3 saat marine edilip tavada kızartılır), dövmeç ve çoban salata ya da mevsim salata.',
          recipeId: 'dovmec',
          shoppingItems: [
            'Tavuk göğsü',
            'Biberiye',
            'Kekik',
            'Limon',
            'Sarımsak',
            'Dövmeç malzemeleri',
            'Çoban salata veya mevsim salata malzemeleri',
          ],
          imageKey: 'dovmec',
        },
      },
    };
  }

  if (day === 36) {
    return {
      day,
      dayTitle: 'Gün 36 — Otuz altıncı gün',
      daySummary: 'Protein, sağlıklı yağ ve sebze dengesiyle metabolik ritmi sürdürme günü.',
      metabolicLine: 'Düşük glisemik yük ve düzenli öğün akışı şeker dengesini destekler.',
      defenseFocus: 'Denge ve Süreklilik',
      focusTag: 'Otuz altıncı gün',
      heroImageKey: 'bobrek-sote',
      defiInsight: {
        focus: 'Protein yoğunluk ve glisemik kontrol',
        goal: 'Karbonhidrat yükünü düşük tutarken tokluk süresini uzatmak',
        primaryFoods: ['pastırma', 'menemen', 'böbrek sote'],
        metabolicTags: ['proteinBalance', 'glucoseStability', 'satietySupport'],
        explanation: 'Günlük plan protein odağını koruyarak gün içi açlık dalgalanmalarını azaltmayı hedefler.',
        swapRules: [
          {
            trigger: 'sakatat',
            alternatives: ['yumurta', 'ızgara et', 'zeytinyağlı sebze yanında protein'],
            reason: 'protein ve tokluk desteğini korumak',
          },
        ],
      },
      meals: {
        breakfast: {
          title: 'Pastırma Tabağı',
          description:
            'Pastırma, avokado ya da mevsim salatası, peynir, zeytin, ceviz ve şekersiz çay/yeşil çay/Türk kahvesi.',
          recipeId: null,
          shoppingItems: [
            'Pastırma',
            'Avokado veya mevsim salatası malzemeleri',
            'Kaşar / beyaz / tulum peyniri',
            'Zeytin',
            'Ceviz',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Menemen',
          description:
            'Menemen, mevsim salatası, kuruyemiş ve tarçınlı yoğurt.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Domates',
            'Biber',
            'Mevsim salatası malzemeleri',
            'Kuruyemiş',
            'Tarçın',
            'Yoğurt',
          ],
          imageKey: 'lunch-default',
        },
        dinner: {
          title: 'Böbrek Sote',
          description:
            'Böbrek sote ve kök salata ya da çoban salata.',
          recipeId: 'bobrek-sote',
          shoppingItems: [
            'Kuzu böbrek',
            'Soğan',
            'Biber',
            'Sarımsak',
            'Tereyağı',
            'Kök salata veya çoban salata malzemeleri',
          ],
          imageKey: 'bobrek-sote',
        },
      },
    };
  }

  if (day === 37) {
    return {
      day,
      dayTitle: 'Gün 37 — Otuz yedinci gün',
      daySummary: 'Dengeli protein ve sağlıklı yağlarla metabolik istikrarı sürdürme günü.',
      metabolicLine: 'Düşük glisemik yük ve anti-inflamatuar içerikler kan şekeri dengesini destekler.',
      defenseFocus: 'Denge ve Stabilite',
      focusTag: 'Otuz yedinci gün',
      heroImageKey: 'cevizli-lahana-salatasi',
      meals: {
        breakfast: {
          title: 'Sahanda Sucuklu Yumurta',
          description:
            'Sahanda sucuklu yumurta, mevsim salata, peynir, zeytin, badem veya fındık ve şekersiz çay/yeşil çay/Türk kahvesi.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Sucuk',
            'Mevsim salata malzemeleri',
            'Kaşar / beyaz / tulum peyniri',
            'Zeytin',
            'Badem veya fındık',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'İşkembe Çorbası',
          description:
            'İşkembe çorbası ve cevizli beyaz lahana salatası.',
          recipeId: 'cevizli-lahana-salatasi',
          shoppingItems: [
            'İşkembe çorbası malzemeleri',
            'Beyaz lahana',
            'Ceviz',
            'Ev yoğurdu',
            'Limon',
            'Sarımsak',
          ],
          imageKey: 'cevizli-lahana-salatasi',
        },
        dinner: {
          title: 'Zencefilli Somon Izgara',
          description:
            'Zencefilli somon ızgara, tereyağında sebze ve mevsim salata.',
          recipeId: null,
          shoppingItems: [
            'Somon',
            'Taze zencefil',
            'Tereyağı',
            'Mevsim sebzeleri',
            'Mevsim salata malzemeleri',
          ],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 38) {
    return {
      day,
      dayTitle: 'Gün 38 — Otuz sekizinci gün',
      daySummary: 'Dengeli protein ve fermente destekle metabolik istikrarı sürdürme günü.',
      metabolicLine: 'Düşük glisemik yük ve düzenli öğün akışı kan şekeri dengesini destekler.',
      defenseFocus: 'Denge ve Süreklilik',
      focusTag: 'Otuz sekizinci gün',
      heroImageKey: 'sarimsakli-et-suyu-corbasi',
      defiInsight: {
        focus: 'Hafif akşam ve denge',
        goal: 'Akşam öğününde yükü artırmadan ritmi korumak',
        primaryFoods: ['et suyu çorbası', 'zeytinyağlı sebze', 'cacık'],
        metabolicTags: ['eveningLightness', 'glucoseStability', 'satietySupport'],
        explanation: 'Plan, günün ikinci yarısında daha kontrollü bir tabakla metabolik ritmin dengede kalmasını destekler.',
        swapRules: [
          {
            trigger: 'yoğurt',
            alternatives: ['kefir', 'haşlanmış yumurta', 'zeytinyağlı salata'],
            reason: 'hafif akşam dengesini ve tokluk desteğini korumak',
          },
        ],
      },
      meals: {
        breakfast: {
          title: 'Yumurta Dolması',
          description:
            'Yumurta dolması (2 adet), mevsim salata, peynir, zeytin, ceviz ve şekersiz çay/yeşil çay/Türk kahvesi.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Mevsim salata malzemeleri',
            'Kaşar / beyaz / tulum peyniri',
            'Zeytin',
            'Ceviz',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Sarımsaklı Et Suyu Çorbası',
          description:
            'Sarımsaklı et suyu çorbası, zeytinyağlı pırasa veya bamya ve mevsim salata.',
          recipeId: 'sarimsakli-et-suyu-corbasi',
          shoppingItems: [
            'Et suyu',
            'Kuşbaşı et',
            'Ev yoğurdu',
            'Yumurta',
            'Sarımsak',
            'Tereyağı',
            'Zeytinyağlı pırasa veya bamya',
            'Mevsim salata malzemeleri',
          ],
          imageKey: 'sarimsakli-et-suyu-corbasi',
        },
        dinner: {
          title: 'Etli Nohut',
          description:
            'Kemikli etle hazırlanmış etli nohut, cacık ve ev turşusu.',
          recipeId: null,
          shoppingItems: [
            'Kemikli et',
            'Nohut',
            'Yoğurt',
            'Salatalık',
            'Ev turşusu',
          ],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 39) {
    return {
      day,
      dayTitle: 'Gün 39 — Otuz dokuzuncu gün',
      daySummary: 'Düşük glisemik yükle sürdürülebilir beslenme düzenini devam ettirme günü.',
      metabolicLine: 'Protein ve sağlıklı yağ dengesiyle glisemik dalgalanmaları sınırlama.',
      defenseFocus: 'Süreklilik',
      focusTag: 'Otuz dokuzuncu gün',
      heroImageKey: 'tavuk-sote',
      meals: {
        breakfast: {
          title: 'Kahvaltı',
          description:
            'Pastırma, geleneksel yöntemlerle hazırlanmış pastırmaları tercih edin. Mevsim salata. Kaşar, beyaz ya da tulum peyniri, peynir şirden mayası ile hazırlanmış olmalı. 10-15 adet siyah ya da yeşil zeytin. 10-15 adet çiğ badem ya da fındık. Şekersiz çay, yeşil çay ya da sade Türk kahvesi. Kahvaltıdan 30 dakika önce enterik probiyotik kapsülü, zeytin yaprağı kapsülü. Kahvaltıdan 1 saat sonra krill yağı kapsülü, 200 mg magnezyum kapsülü.',
          recipeId: null,
          shoppingItems: [
            'Pastırma',
            'Mevsim salata malzemeleri',
            'Kaşar / beyaz / tulum peyniri',
            'Zeytin',
            'Çiğ badem veya fındık',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Öğlen',
          description:
            'Mantarlı omlet. Çoban salatası ya da roka, maydanoz, taze soğan, taze nane ile hazırlanmış yeşil salata. Bir bardak kefir kokteyli - kefir, öğütülmüş keten tohumu, taze nane ya da kuru nane ile hazırlanmış. Öğlen yemeğinden 30 dakika önce çemen otu kapsülü.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Mantar',
            'Çoban salata veya yeşil salata malzemeleri',
            'Kefir',
            'Öğütülmüş keten tohumu',
            'Taze veya kuru nane',
          ],
          imageKey: 'lunch-default',
        },
        dinner: {
          title: 'Akşam',
          description:
            'Tavuk sote. Mevsim salatası. Cacık, kuru nane ve sızma zeytinyağı ile çeşnilendirin. Ev turşusu. Akşam yemeğinden 30 dakika önce enterik probiyotik kapsülü, zeytin yaprağı kapsülü. Akşam yemeğinden 1 saat sonra krill yağı kapsülü.',
          recipeId: 'tavuk-sote',
          shoppingItems: [
            'Tavuk but',
            'Sarımsak',
            'Kuru soğan',
            'Közlenmiş biber',
            'Zeytinyağı',
            'Mevsim salata malzemeleri',
            'Yoğurt',
            'Salatalık',
            'Kuru nane',
            'Ev turşusu',
          ],
          imageKey: 'tavuk-sote',
        },
      },
    };
  }

  if (day === 40) {
    return {
      day,
      dayTitle: 'Gün 40 — Kırkıncı gün',
      daySummary: 'Protein, fermente besinler ve düşük glisemik sebze dengesiyle devam günü.',
      metabolicLine: 'Düzenli öğün ritmi ve sağlıklı yağlarla glisemik denge korunur.',
      defenseFocus: 'Denge ve Süreklilik',
      focusTag: 'Kırkıncı gün',
      heroImageKey: 'sebze-turlusu',
      defiInsight: {
        focus: 'Protein + lif dengesi',
        goal: 'Gün boyu daha stabil enerji ve kontrollü açlık sağlamak',
        primaryFoods: ['menemen', 'sebze türlüsü', 'yoğurt'],
        metabolicTags: ['fiberSupport', 'glucoseStability', 'proteinBalance'],
        explanation: 'Bugünün tabak kurgusu, lif ve protein kombinasyonunu kullanarak ani enerji düşüşlerini azaltmayı hedefler.',
      },
      meals: {
        breakfast: {
          title: 'Peynirli Menemen',
          description:
            'Peynirli menemen (iki yumurta ile hazırlanmış), yeşil salata ya da çoban salata (biber, salatalık, domates, bol sızma zeytinyağı, limon ve kekikle hazırlanmış), 10-15 adet siyah ya da yeşil zeytin, 5-6 adet ceviz ve şekersiz çay/yeşil çay/sade Türk kahvesi. Kahvaltıdan 30 dakika önce enterik probiyotik kapsülü ve zeytin yaprağı kapsülü, 1 saat sonra krill yağı kapsülü ve 200 mg magnezyum.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Peynir',
            'Biber',
            'Domates',
            'Salatalık',
            'Yeşillik',
            'Zeytin',
            'Ceviz',
            'Zeytinyağı',
            'Limon',
            'Kekik',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Terbiyeli Tavuk Suyu Çorbası + Kaşar Peynirli Sebze Türlüsü',
          description:
            'Terbiyeli tavuk suyu çorbası (tavuk suyunu iyice kaynatıp bir kâseye alın; içine yumurtanın sarısını kırıp bir çatalla iyice çırpın; limon, ince doğranmış taze maydanoz ve kaya tuzuyla çeşnilendirin), kaşar peynirli sebze türlüsü ve ev turşusu. Öğlen yemeğinden 30 dakika önce çemen otu kapsülü.',
          recipeId: 'sebze-turlusu',
          shoppingItems: [
            'Tavuk suyu',
            'Yumurta sarısı',
            'Limon',
            'Taze maydanoz',
            'Kaya tuzu',
            'Kabak',
            'Patlıcan',
            'Çarliston biber',
            'Soğan',
            'Sarımsak',
            'Domates',
            'Domates salçası',
            'Kaşar peyniri',
            'Ev turşusu',
          ],
          imageKey: 'sebze-turlusu',
        },
        dinner: {
          title: 'Kıymalı Domates Dolması',
          description:
            'Kıymalı domates dolması (pirinçsiz hazırlayın), mevsimine göre beyaz lahana salatası ya da yeşil salata ve ev yoğurdu. Akşam yemeğinden 30 dakika önce enterik probiyotik kapsülü ve zeytin yaprağı kapsülü, 1 saat sonra krill yağı kapsülü.',
          recipeId: null,
          shoppingItems: [
            'Domates',
            'Kıyma',
            'Beyaz lahana veya yeşil salata malzemeleri',
            'Ev yoğurdu',
          ],
          imageKey: 'dinner-default',
        },
      },
    };
  }

  if (day === 41) {
    return {
      day,
      dayTitle: 'Gün 41 — Kırk birinci gün',
      daySummary: 'Dengeli protein, fermente destek ve sebze ağırlıklı akşam öğünüyle ritmi koru.',
      metabolicLine: 'Öğünlerde düşük glisemik yük ve düzenli takviye dengesi sürdürülür.',
      defenseFocus: 'Süreklilik',
      focusTag: 'Kırk birinci gün',
      heroImageKey: 'sevket-i-bostan',
      meals: {
        breakfast: {
          title: 'Haşlanmış Yumurta',
          description:
            'İki adet haşlanmış yumurta (kayısı kıvamında), mevsim salata, kaşar/beyaz/tulum peyniri (şirden mayalı), 10-15 adet siyah ya da yeşil zeytin ve şekersiz çay/yeşil çay/Türk kahvesi. Kahvaltıdan 30 dk önce enterik probiyotik + zeytin yaprağı, 1 saat sonra krill yağı + 200 mg magnezyum.',
          recipeId: null,
          shoppingItems: [
            'Yumurta',
            'Mevsim salata malzemeleri',
            'Kaşar / beyaz / tulum peyniri',
            'Zeytin',
            'Çay veya kahve',
          ],
          imageKey: 'breakfast-default',
        },
        lunch: {
          title: 'Terbiyeli Paça Çorbası',
          description:
            'Terbiyeli paça çorbası, beyaz peynirli Ege salatası ve kuruyemiş + tarçınlı ev yoğurdu. Öğlen yemeğinden 30 dk önce çemen otu.',
          recipeId: 'paca-corbasi',
          shoppingItems: [
            'Paça',
            'Yumurta',
            'Limon',
            'Sirke',
            'Sarımsak',
            'Beyaz peynir',
            'Ege salatası malzemeleri',
            'Kuruyemiş',
            'Tarçın',
            'Ev yoğurdu',
          ],
          imageKey: 'paca-corbasi',
        },
        dinner: {
          title: 'Etli Şevket-i Bostan',
          description:
            'Etli şevket-i bostan, tereyağında çevrilmiş Brüksel lahanası veya kırmızı biber ve ev turşusu. Akşam yemeğinden 30 dk önce enterik probiyotik + zeytin yaprağı, 1 saat sonra krill yağı.',
          recipeId: 'sevket-i-bostan',
          shoppingItems: [
            'Şevket-i bostan',
            'Kuşbaşı kuzu eti',
            'Soğan',
            'Sarımsak',
            'Tereyağı',
            'Brüksel lahanası veya kırmızı biber',
            'Ev turşusu',
          ],
          imageKey: 'sevket-i-bostan',
        },
      },
    };
  }

  return {
    day,
    dayTitle: `Gün ${day} — Rutin`,
    daySummary: 'Basit, sürdürülebilir öğünlerle ritmi koru.',
    metabolicLine: 'Metabolik ritim korunuyor.',
    defenseFocus: 'İştah kontrolü',
    focusTag: 'İştah kontrolü',
    heroImageKey: null,
    meals: {
      breakfast: { ...baseMeals.breakfast },
      lunch: { ...baseMeals.lunch },
      dinner: { ...baseMeals.dinner },
    },
  };
});
