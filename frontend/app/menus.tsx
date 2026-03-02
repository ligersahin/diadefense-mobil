import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useDefenseProgram } from '../src/context/DefenseProgramContext';
import { Card } from '../src/components/Card';
import { MealSlot, DayPlan } from '../src/types';
import { getCurrentProgramDay } from '../src/utils/programDay';

const MEAL_ICONS: Record<MealSlot, string> = {
  breakfast: 'sunny',
  lunch: 'restaurant',
  dinner: 'moon'
};

const MEAL_NAMES: Record<MealSlot, string> = {
  breakfast: 'Kahvaltı',
  lunch: 'Öğle Yemeği',
  dinner: 'Akşam Yemeği'
};

export default function MenusScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [mealsYPosition, setMealsYPosition] = useState<number | null>(null);
  const [supplementsYPosition, setSupplementsYPosition] = useState<number | null>(null);
  
  const { 
    currentDayPlan, 
    currentDayIndex,
    startISO,
    completedMeals,
    completedSupplements,
    toggleMealCompleted,
    toggleSupplementTaken
  } = useDefenseProgram();

  if (!currentDayPlan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.emptyText}>Program başlatılmadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Calculate current program day using the utility function
  const currentDay = getCurrentProgramDay(startISO);

  const rawDayMeals = completedMeals[currentDayIndex] || [];
  // Filter out snacks and deduplicate for meal counter
  const todayMeals = Array.from(new Set(rawDayMeals.filter(s => s !== 'snack' && (s === 'breakfast' || s === 'lunch' || s === 'dinner'))));
  const safeMeals = (currentDayPlan?.meals ?? []).filter(
    (m: any) => m?.type !== "snack" && m?.slot !== "snack" && m?.label !== "Ara Öğün"
  );
  const totalMeals = safeMeals.length;

  const todaySupps = completedSupplements[currentDayIndex] || [];
  const totalSupps = currentDayPlan.supplements.length;

  const handleToggleMeal = (dayIndex: number, slot: MealSlot) => {
    toggleMealCompleted(dayIndex, slot);
  };

  const handleToggleSupplement = (id: string) => {
    toggleSupplementTaken(currentDayIndex, id);
  };

  const scrollToMeals = () => {
    if (mealsYPosition !== null && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: mealsYPosition, animated: true });
    }
  };

  const scrollToSupplements = () => {
    if (supplementsYPosition !== null && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: supplementsYPosition, animated: true });
    }
  };

  // Reusable function to render meals for a given day
  const renderMealsForDay = (dayPlan: DayPlan, dayIndex: number, showCheckbox: boolean = false) => {
    const rawDayMeals = completedMeals[dayIndex] || [];
    // Filter out snacks and deduplicate for safe meal checking
    const dayMeals = Array.from(new Set(rawDayMeals.filter(s => s !== 'snack' && (s === 'breakfast' || s === 'lunch' || s === 'dinner'))));
    
    return dayPlan.meals.map((meal, index) => {
      const isCompleted = dayMeals.includes(meal.slot);
      
      return (
        <Card key={`${dayIndex}-${index}`}>
          <View style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <View style={styles.mealTitleContainer}>
                <View style={[styles.mealIcon, isCompleted && styles.mealIconCompleted]}>
                  <Ionicons 
                    name={MEAL_ICONS[meal.slot] as any} 
                    size={24} 
                    color={isCompleted ? '#10B981' : '#6B7280'} 
                  />
                </View>
                <View>
                  <Text style={styles.mealSlotName}>{MEAL_NAMES[meal.slot]}</Text>
                  <Text style={styles.mealTitle}>{meal.title}</Text>
                </View>
              </View>
              {showCheckbox && (
                <TouchableOpacity
                  style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}
                  onPress={() => handleToggleMeal(dayIndex, meal.slot)}
                >
                  {isCompleted && (
                    <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              )}
            </View>
            
            {meal.description && (
              <Text style={styles.mealDescription}>{meal.description}</Text>
            )}
          </View>
        </Card>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Menüler</Text>
          <Text style={styles.headerSubtitle}>Gün {currentDay}</Text>
        </View>
      </View>

      {/* Jump Buttons */}
      <View style={styles.jumpButtons}>
        <TouchableOpacity style={styles.jumpButton} onPress={scrollToMeals}>
          <Ionicons name="restaurant" size={16} color="#10B981" />
          <Text style={styles.jumpButtonText}>Yemekler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.jumpButton} onPress={scrollToSupplements}>
          <Ionicons name="medical" size={16} color="#8B5CF6" />
          <Text style={styles.jumpButtonText}>Supplementler</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Bugünün Menüsü - Today's Meal Plan */}
        <View
          onLayout={(event) => {
            const { y } = event.nativeEvent.layout;
            setMealsYPosition(y);
          }}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bugünün Menüsü</Text>
            <Text style={styles.sectionSubtitle}>
              {todayMeals.length} / {totalMeals} tamamlandı
            </Text>
          </View>
          {renderMealsForDay(currentDayPlan, currentDayIndex, true)}
        </View>

        {/* Bugünün Supplementleri - Today's Supplements */}
        {currentDayPlan.supplements.length > 0 && (
          <View
            onLayout={(event) => {
              const { y } = event.nativeEvent.layout;
              setSupplementsYPosition(y);
            }}
            style={styles.supplementsSection}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Bugünün Supplementleri</Text>
              <Text style={styles.sectionSubtitle}>
                {todaySupps.length} / {totalSupps} alındı
              </Text>
            </View>
            {currentDayPlan.supplements.map((supp) => {
              const isTaken = todaySupps.includes(supp.id);
              
              return (
                <Card key={supp.id}>
                  <View style={styles.suppCard}>
                    <View style={styles.suppHeader}>
                      <View style={styles.suppInfo}>
                        <View style={[styles.suppIcon, isTaken && styles.suppIconTaken]}>
                          <Ionicons 
                            name="medical" 
                            size={24} 
                            color={isTaken ? '#8B5CF6' : '#6B7280'} 
                          />
                        </View>
                        <View style={styles.suppDetails}>
                          <Text style={styles.suppTime}>{supp.time}</Text>
                          <Text style={styles.suppName}>{supp.name}</Text>
                          <Text style={styles.suppDose}>{supp.dose}</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={[styles.checkbox, isTaken && styles.checkboxTaken]}
                        onPress={() => handleToggleSupplement(supp.id)}
                      >
                        {isTaken && (
                          <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              );
            })}
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  headerContent: {
    flex: 1
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937'
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2
  },
  jumpButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 8
  },
  jumpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    gap: 6
  },
  jumpButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937'
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    padding: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 16
  },
  sectionHeader: {
    marginBottom: 16
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4
  },
  supplementsSection: {
    marginTop: 24
  },
  suppCard: {
    width: '100%'
  },
  suppHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  suppInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  suppIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  suppIconTaken: {
    backgroundColor: '#EDE9FE'
  },
  suppDetails: {
    flex: 1
  },
  suppTime: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4
  },
  suppName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2
  },
  suppDose: {
    fontSize: 14,
    color: '#6B7280'
  },
  checkboxTaken: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6'
  },
  mealCard: {
    width: '100%'
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  mealTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  mealIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  mealIconCompleted: {
    backgroundColor: '#D1FAE5'
  },
  mealSlotName: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600'
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 2
  },
  mealDescription: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981'
  },
  bottomSpacer: {
    height: 32
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280'
  }
});
