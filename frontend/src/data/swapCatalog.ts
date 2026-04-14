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
    'Terbiyeli Paça Çorbası + Ispanak Kökü': ['Kemik suyu çorbası (terbiyeli)', 'Terbiyeli et suyu çorbası'],
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
    'Izgara Ciğer': ['Izgara köfte', 'Biftek ızgara'],
    'Böbrek Sote': ['Izgara köfte', 'Tavuk sote'],
    // Dil varyantları
    'Dana Dil Söğüş + Kök Salata': ['Haşlanmış tavuk söğüş', 'Izgara köfte'],
    'Terbiyeli Dil Çorbası + Fırında Peynirli Mantar': ['Terbiyeli et suyu çorbası', 'Terbiyeli tavuk suyu çorbası'],
    // Böbrek varyantları
    'Izgara Böbrek': ['Izgara köfte', 'Biftek ızgara'],
    'Böbrek Sote': ['Izgara köfte', 'Biftek ızgara'],
    // Kokoreç
    'Izgara Kokoreç': ['Izgara tavuk şiş', 'Izgara köfte'],
    'Kokoreç ya da Sucuk Köfte': ['Izgara köfte', 'Tavuk şiş'],
    'Paça Çorbası + Terbiyeli Kereviz': ['Tavuk çorbası', 'Mercimek çorbası'],
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
