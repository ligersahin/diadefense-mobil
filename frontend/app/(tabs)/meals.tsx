import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/appState';
import { MealCard } from '../../components/MealCard';
import mealsData from '../../assets/data/meals.json';

export default function MealsScreen() {
  const { t } = useTranslation();
  const dayIndex = useAppStore((state) => state.dayIndex);
  const completedMeals = useAppStore((state) => state.completedMeals);
  const completeMeal = useAppStore((state) => state.completeMeal);
  
  // Get meals for current day (loop if beyond 7 days)
  const currentDayIndex = ((dayIndex - 1) % 7);
  const todayMeals = mealsData.meals[currentDayIndex];
  
  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        <View style={styles.header}>
          <Text category="h3" style={styles.title}>
            {t('meals.title')}
          </Text>
          <Text category="p1" style={styles.subtitle}>
            {t('meals.day')} {dayIndex}
          </Text>
        </View>
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          <MealCard
            meal={todayMeals.breakfast}
            mealType="breakfast"
            completed={completedMeals.includes('breakfast')}
            onComplete={() => completeMeal('breakfast')}
          />
          
          <MealCard
            meal={todayMeals.lunch}
            mealType="lunch"
            completed={completedMeals.includes('lunch')}
            onComplete={() => completeMeal('lunch')}
          />
          
          <MealCard
            meal={todayMeals.dinner}
            mealType="dinner"
            completed={completedMeals.includes('dinner')}
            onComplete={() => completeMeal('dinner')}
          />
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 8,
  },
});