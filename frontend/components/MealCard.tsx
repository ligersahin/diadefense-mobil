import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { DiaDefenseColors } from '../constants/colors';

interface Meal {
  title: string;
  description: string;
  calories: number;
  protein: number;
}

interface MealCardProps {
  meal: Meal;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  completed: boolean;
  onComplete: () => void;
}

export const MealCard: React.FC<MealCardProps> = ({
  meal,
  mealType,
  completed,
  onComplete,
}) => {
  const { t } = useTranslation();
  
  const getMealIcon = () => {
    switch (mealType) {
      case 'breakfast':
        return 'sunny-outline';
      case 'lunch':
        return 'restaurant-outline';
      case 'dinner':
        return 'moon-outline';
    }
  };
  
  return (
    <Card style={[styles.card, completed && styles.completedCard]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons
            name={getMealIcon() as any}
            size={24}
            color={DiaDefenseColors.oliveGreen}
          />
          <Text category="h6" style={styles.mealType}>
            {t(`meals.${mealType}`)}
          </Text>
        </View>
        {completed && (
          <Ionicons name="checkmark-circle" size={24} color={DiaDefenseColors.sandYellow} />
        )}
      </View>
      
      <Text category="s1" style={styles.title}>
        {meal.title}
      </Text>
      
      <Text category="p2" style={styles.description}>
        {meal.description}
      </Text>
      
      <View style={styles.nutrients}>
        <View style={styles.nutrientItem}>
          <Text category="c1" style={styles.nutrientValue}>
            {meal.calories}
          </Text>
          <Text category="c2" style={styles.nutrientLabel}>
            {t('meals.calories')}
          </Text>
        </View>
        
        <View style={styles.nutrientItem}>
          <Text category="c1" style={styles.nutrientValue}>
            {meal.protein}
          </Text>
          <Text category="c2" style={styles.nutrientLabel}>
            {t('meals.protein')}
          </Text>
        </View>
      </View>
      
      <Button
        size="small"
        style={styles.button}
        disabled={completed}
        onPress={onComplete}
        status={completed ? 'success' : 'primary'}
      >
        {completed ? t('meals.completed') : t('meals.markComplete')}
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  completedCard: {
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mealType: {
    color: DiaDefenseColors.oliveGreen,
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 12,
    color: '#666',
  },
  nutrients: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 12,
  },
  nutrientItem: {
    alignItems: 'center',
  },
  nutrientValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  nutrientLabel: {
    color: '#888',
  },
  button: {
    marginTop: 8,
  },
});