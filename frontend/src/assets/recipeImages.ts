/**
 * Tüm tarif görselleri: assets/recipes/
 * Cache temiz başlatma: npx expo start --dev-client -c
 */

const RECIPE_IMAGES = {
  'paca-corbasi': require('../../assets/recipes/paca-corbasi.png'),
  'soguk-domates-corbasi': require('../../assets/recipes/soguk-domates-corbasi.png'),
  'pastirmali-yumurta': require('../../assets/recipes/pastirmali-yumurta.png'),
  'defense-empty-plate': require('../../assets/recipes/defense-empty-plate.png'),
  'default-healthy': require('../../assets/recipes/default-healthy.jpg'),
  'iskembe-corbasi': require('../../assets/recipes/iskembe-corbasi.png'),
  'taze_borulce_salatasi': require('../../assets/recipes/taze_borulce_salatasi.png'),
  'terbiyeli_et_suyu_corbasi': require('../../assets/recipes/terbiyeli_et_suyu_corbasi.png'),
  'pratik_pancar_tursusu': require('../../assets/recipes/pratik_pancar_tursusu.png'),
  'kapuska': require('../../assets/recipes/kapuska.png'),
  'kereviz_corbasi': require('../../assets/recipes/kereviz_corbasi.png'),
  'domates-corbasi': require('../../assets/recipes/soguk-domates-corbasi.png'),
  'ciger-yahni': require('../../assets/recipes/ciger-yahni.png'),
  'yesil-biberli-tavuk': require('../../assets/recipes/yesil-biberli-tavuk.png'),
  'patlican-salatasi': require('../../assets/recipes/patlican-salatasi.png'),
  'sebzeli-guvec': require('../../assets/recipes/sebzeli-guvec.png'),
  'sebzeli-paca-corbasi': require('../../assets/recipes/sebzeli-paca-corbasi.png'),
  'sote-edilmis-karnabahar': require('../../assets/recipes/sote-edilmis-karnabahar.png'),
  'sucuk-kofte': require('../../assets/recipes/sucuk-kofte.png'),
  'cevizli-kuru-domates-mezesi': require('../../assets/recipes/cevizli-kuru-domates-mezesi.png'),
  'terbiyeli-tavuk-suyu-corbasi': require('../../assets/recipes/terbiyeli-tavuk-suyu-corbasi.png'),
  'terbiyeli-karalahana-corbasi': require('../../assets/recipes/terbiyeli-karalahana-corbasi.png'),
  'zeytinyagli-kabak-yemegi': require('../../assets/recipes/zeytinyagli-kabak-yemegi.png'),
  'yalanci-tandir': require('../../assets/recipes/yalanci-tandir.png'),
  'enginar-corbasi': require('../../assets/recipes/enginar-corbasi.png'),
  'pirincsiz-biber-dolmasi': require('../../assets/recipes/pirincsiz-biber-dolmasi.png'),
  'ev-yogurdu': require('../../assets/recipes/ev-yogurdu.png'),
  'mercimek-corbasi': require('../../assets/recipes/mercimek-corbasi.png'),
  'tavuk-kulbasti': require('../../assets/recipes/tavuk-kulbasti.png'),
  'cilbir': require('../../assets/recipes/cilbir.png'),
  'yogurtlu-pirasa': require('../../assets/recipes/yogurtlu-pirasa.png'),
  'acili-lahana-corbasi': require('../../assets/recipes/acili-lahana-corbasi.png'),
  'tas-kebabi': require('../../assets/recipes/tas-kebabi.png'),
  'beyaz-peynirli-kabak': require('../../assets/recipes/beyaz-peynirli-kabak.png'),
  'sarimsakli-tereyagli-somon': require('../../assets/recipes/sarimsakli-tereyagli-somon.png'),
  'yogurt-corbasi': require('../../assets/recipes/yogurt-corbasi.png'),
  'dovmec': require('../../assets/recipes/dovmec.jpg'),
  'cevizli-lahana-salatasi': require('../../assets/recipes/cevizli-lahana-salatasi.jpg'),
  'sarimsakli-et-suyu-corbasi': require('../../assets/recipes/sarimsakli-et-suyu-corbasi.jpg'),
  'bobrek-sote': require('../../assets/recipes/bobrek-sote.jpg'),
  'taze-soganli-biftek': require('../../assets/recipes/taze-soganli-biftek.jpg'),
  'tavuk-sote': require('../../assets/recipes/tavuk-sote.jpg'),
  'sebze-turlusu': require('../../assets/recipes/sebze-turlusu.jpg'),
  'sevket-i-bostan': require('../../assets/recipes/sevket-i-bostan.jpg'),
  'kiymali-ispanak': require('../../assets/recipes/kiymali-ispanak.jpg'),
  'peynirli-domates-dolmasi': require('../../assets/recipes/peynirli-domates-dolmasi.png'),
  'day31': require('../../assets/images/day31.jpg'),
  'yogurtlu-pancar-salatasi': require('../../assets/images/yogurtlu-pancar.jpg'),
};

export type RecipeImageKey = keyof typeof RECIPE_IMAGES;

export function getRecipeImage(key?: string | null) {
  const fallback = RECIPE_IMAGES['defense-empty-plate'];
  if (!key) return fallback;
  const img = (RECIPE_IMAGES as Record<string, number>)[key];
  return img ?? fallback;
}

export function getMenuThumbnailImage(key?: string | null) {
  const fallback = RECIPE_IMAGES['default-healthy'];
  if (!key) return fallback;
  const img = (RECIPE_IMAGES as Record<string, number>)[key];
  return img ?? fallback;
}

export function getRecipeImageOrNull(key?: string | null) {
  if (!key) return null;
  const img = (RECIPE_IMAGES as Record<string, number>)[key];
  return img ?? null;
}

