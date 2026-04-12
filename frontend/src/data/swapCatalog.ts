export type SwapCatalog = {
  [restriction: string]: {
    [mealTitle: string]: string[];
  };
};

export const SWAP_CATALOG: SwapCatalog = {
  sakatat: {
    // Paça varyantları
    'Terbiyeli Paça Çorbası': ['Kemik suyu çorbası (terbiyeli)', 'Terbiyeli et suyu çorbası'],
    'Terbiyeli Paça Çorbası + Közlenmiş Biber': ['Kemik suyu çorbası (terbiyeli)', 'Terbiyeli et suyu çorbası'],
    'Sebzeli Paça Çorbası': ['Kemik suyu çorbası (terbiyeli)', 'Terbiyeli et suyu çorbası'],
    'Paça Çorbası': ['Kemik suyu çorbası (terbiyeli)', 'Terbiyeli et suyu çorbası'],
    'Sirke ve Sarımsakla Çeşnilendirilmiş Paça Çorbası': ['Kemik suyu çorbası (terbiyeli)', 'Terbiyeli et suyu çorbası'],
    // İşkembe varyantları
    'İşkembe Çorbası': ['Terbiyeli et suyu çorbası', 'Terbiyeli tavuk suyu çorbası'],
    'İşkembe Çorbası + Taze Börülce Salatası': ['Terbiyeli et suyu çorbası', 'Terbiyeli tavuk suyu çorbası'],
    'İşkembe Çorbası veya Paça Çorbası': ['Terbiyeli et suyu çorbası', 'Kemik suyu çorbası (terbiyeli)'],
    // Ciğer varyantları
    'Ciğer Yahni': ['Kuzu kuşbaşı yahni', 'Tavuk sote'],
    'Ciğer Sote': ['Kuzu kuşbaşı sote', 'Tavuk sote'],
    'Ciğer Izgara + Kök Salata': ['Izgara köfte', 'Biftek ızgara'],
    'Fırında Ciğer': ['Fırında tavuk', 'Izgara köfte'],
    // Böbrek varyantları
    'Izgara Böbrek': ['Izgara köfte', 'Biftek ızgara'],
    'Böbrek Sote': ['Izgara köfte', 'Biftek ızgara'],
    // Kokoreç
    'Izgara Kokoreç': ['Izgara tavuk şiş', 'Izgara köfte'],
  },
};

export function getSwapAlternatives(
  restriction: string,
  mealTitle: string
): string[] | null {
  const catalog = SWAP_CATALOG[restriction];
  if (!catalog) return null;
  return catalog[mealTitle] ?? null;
}
