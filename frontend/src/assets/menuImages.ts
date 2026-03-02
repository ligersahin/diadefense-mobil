export const MENU_MEAL_IMAGES: Record<string, any> = {
  // 'breakfast-default': require('../../assets/menus/meals/breakfast.jpg'),
};

export function getMenuMealImage(key?: string) {
  if (!key) return null;
  return MENU_MEAL_IMAGES[key] ?? null;
}
