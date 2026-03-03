/**
 * Tüm tarif görselleri: assets/recipes/
 * Cache temiz başlatma: npx expo start --dev-client -c
 */
const RECIPE_IMAGES = {
  'paca-corbasi': require('../../assets/recipes/paca-corbasi.png'),
  'soguk-domates-corbasi': require('../../assets/recipes/soguk-domates-corbasi.png'),
  'pastirmali-yumurta': require('../../assets/recipes/pastirmali-yumurta.png'),
  'defense-empty-plate': require('../../assets/recipes/defense-empty-plate.png'),
  'taze_borulce_salatasi': require('../../assets/recipes/taze_borulce_salatasi.png'),
  'terbiyeli_et_suyu_corbasi': require('../../assets/recipes/terbiyeli_et_suyu_corbasi.png'),
  'pratik_pancar_tursusu': require('../../assets/recipes/pratik_pancar_tursusu.png'),
  'kapuska': require('../../assets/recipes/kapuska.png'),
  'kereviz_corbasi': require('../../assets/recipes/kereviz_corbasi.png'),
};

export type RecipeImageKey = keyof typeof RECIPE_IMAGES;

export function getRecipeImage(key?: string | null) {
  const fallback = RECIPE_IMAGES['defense-empty-plate'];
  if (!key) return fallback;
  const img = (RECIPE_IMAGES as Record<string, number>)[key];
  return img ?? fallback;
}

