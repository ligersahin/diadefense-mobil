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
