import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import AppHeader from '../src/components/AppHeader';
import { Card } from '../src/components/Card';
import { MENUS } from '../src/data/menus';
import { RECIPES } from '../src/data/recipes';

const FILTERS = [
  { label: 'Bugün', days: 1 },
  { label: '2 gün', days: 2 },
  { label: '7 gün', days: 7 },
] as const;

type CategoryKey = 'Protein/Et' | 'Sebze/Yeşillik' | 'Yağ/Sos' | 'Kuruyemiş' | 'Baharat/Ekstra' | 'Diğer';

const CATEGORY_ORDER: CategoryKey[] = [
  'Protein/Et',
  'Sebze/Yeşillik',
  'Yağ/Sos',
  'Kuruyemiş',
  'Baharat/Ekstra',
  'Diğer',
];

const categorizeItem = (item: string): CategoryKey => {
  const name = item.toLowerCase().trim();
  if (/(yumurta|et|balık|tavuk|paça|pastırma)/.test(name)) return 'Protein/Et';
  if (/(salata|domates|biber|marul|dereotu|sebze|yeşillik)/.test(name)) return 'Sebze/Yeşillik';
  if (/(zeytinyağı|sirke|sos|limon)/.test(name)) return 'Yağ/Sos';
  if (/(ceviz|badem|fındık|kuruyemiş)/.test(name)) return 'Kuruyemiş';
  if (/(baharat|sarımsak|kekik)/.test(name)) return 'Baharat/Ekstra';
  return 'Diğer';
};

export default function ShoppingListScreen() {
  const [rangeDays, setRangeDays] = useState(1);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const groupedItems = useMemo(() => {
    const startIndex = 0;
    const slice = MENUS.slice(startIndex, startIndex + rangeDays);
    const items: string[] = [];

    slice.forEach((day) => {
      const meals = day.meals;
      (Object.keys(meals) as Array<keyof typeof meals>).forEach((key) => {
        const meal = meals[key];
        if (meal.recipeId) {
          const recipe = RECIPES[meal.recipeId as keyof typeof RECIPES];
          if (recipe?.ingredients) items.push(...recipe.ingredients);
        } else if (meal.shoppingItems) {
          items.push(...meal.shoppingItems);
        }
      });
    });

    const unique = Array.from(
      new Map(items.map((item) => [item.toLowerCase().trim(), item])).values()
    );

    return unique.reduce<Record<CategoryKey, string[]>>((acc, item) => {
      const category = categorizeItem(item);
      acc[category].push(item);
      return acc;
    }, {
      'Protein/Et': [],
      'Sebze/Yeşillik': [],
      'Yağ/Sos': [],
      'Kuruyemiş': [],
      'Baharat/Ekstra': [],
      'Diğer': [],
    });
  }, [rangeDays]);

  const toggleItem = (item: string) => {
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <AppHeader title="Alışveriş Listesi" subtitle="Menülerden türetilen kalemler" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.filterRow}>
          {FILTERS.map((filter) => {
            const active = filter.days === rangeDays;
            return (
              <TouchableOpacity
                key={filter.label}
                style={[styles.filterChip, active && styles.filterChipActive]}
                onPress={() => setRangeDays(filter.days)}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {CATEGORY_ORDER.map((category) => {
          const items = groupedItems[category];
          if (!items.length) return null;
          return (
            <View key={category} style={styles.section}>
              <Text style={styles.sectionTitle}>{category}</Text>
              <Card style={styles.listCard}>
                {items.map((item) => {
                  const done = !!checked[item];
                  return (
                    <TouchableOpacity
                      key={item}
                      onPress={() => toggleItem(item)}
                      style={styles.listRow}
                      activeOpacity={0.8}
                    >
                      <View style={[styles.checkbox, done && styles.checkboxChecked]}>
                        {done ? <Text style={styles.checkboxMark}>✓</Text> : null}
                      </View>
                      <Text style={[styles.listText, done && styles.listTextDone]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </Card>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6F8' },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingTop: 18,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 14,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: '#0F5A4E',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  listCard: {
    marginBottom: 0,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CBD5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#0F5A4E',
    borderColor: '#0F5A4E',
  },
  checkboxMark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  listText: {
    fontSize: 14,
    color: '#0F172A',
  },
  listTextDone: {
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
});
