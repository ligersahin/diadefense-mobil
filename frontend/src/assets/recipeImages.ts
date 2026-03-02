export const RECIPE_HERO_IMAGES: Record<string, any> = {
  'paca-corbasi': require('../../assets/recipes/hero/paca-corbasi-hero.png'),
};

export const RECIPE_THUMB_IMAGES: Record<string, any> = {
  'paca-corbasi': require('../../assets/recipes/hero/paca-corbasi-hero.png'),
};

export function getRecipeHeroImage(key?: string) {
  if (!key) return null;
  return RECIPE_HERO_IMAGES[key] ?? null;
}

export function getRecipeThumbImage(key?: string) {
  if (!key) return null;
  return RECIPE_THUMB_IMAGES[key] ?? null;
}
