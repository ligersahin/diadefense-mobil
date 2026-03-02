import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInDays, parseISO } from 'date-fns';
import { DayPlan, MealSlot, BloodValues, MonsterState, DefiMood, UserProgress } from '../types';
import { TR_PROGRAM } from '../config/program/tr-program';
import { getDefiMessage, getMonsterState } from '../logic/defiMessages';

type DefenseProgramContextType = {
  // Program data
  program: DayPlan[];
  startISO: string | null;
  currentDayIndex: number;
  currentDayPlan: DayPlan | null;
  
  // User progress
  completedMeals: Record<number, MealSlot[]>;
  completedSupplements: Record<number, string[]>;
  waterIntakeLiters: number; // Legacy - kept for backward compatibility
  activityScore: number; // Legacy - kept for backward compatibility
  sleepHours: number; // Legacy - kept for backward compatibility
  waterIntakeByDay: Record<number, number>; // ml per day
  activityMinutesByDay: Record<number, number>; // minutes per day
  sleepHoursByDay: Record<number, number>; // hours per day
  glucoseByDay: Record<number, number>; // mg/dL per day
  weightByDay: Record<number, number>; // kg per day
  bloodValues: BloodValues;
  
  // Calculated values
  mealRatio: number;
  supplementRatio: number;
  waterRatio: number;
  activityRatio: number;
  sleepRatio: number;
  bloodModifier: number;
  defenseScore: number;
  monsterState: MonsterState;
  defiMood: DefiMood;
  defiMessage: string;
  
  // Actions
  setStartISO: (dateString: string) => void;
  markMealCompleted: (dayIndex: number, slot: MealSlot) => void;
  toggleMealCompleted: (dayIndex: number, slot: MealSlot) => void;
  markSupplementTaken: (dayIndex: number, id: string) => void;
  toggleSupplementTaken: (dayIndex: number, id: string) => void;
  addWater: (liters: number) => void; // Legacy
  setWater: (liters: number) => void; // Legacy
  setActivityScore: (value: number) => void; // Legacy
  setSleepHours: (value: number) => void; // Legacy
  // Day-based functions
  addWaterByDay: (dayIndex: number, amountMl: number) => void;
  resetWaterByDay: (dayIndex: number) => void;
  addActivityByDay: (dayIndex: number, minutes: number) => void;
  resetActivityByDay: (dayIndex: number) => void;
  setSleepByDay: (dayIndex: number, hours: number) => void;
  addSleepByDay: (dayIndex: number, deltaHours: number) => void;
  resetSleepByDay: (dayIndex: number) => void;
  setGlucoseByDay: (dayIndex: number, mgdl: number) => void;
  resetGlucoseByDay: (dayIndex: number) => void;
  setWeightByDay: (dayIndex: number, kg: number) => void;
  resetWeightByDay: (dayIndex: number) => void;
  setBloodValues: (values: BloodValues) => void;
  resetDailyProgress: () => void;
};

const DefenseProgramContext = createContext<DefenseProgramContextType | undefined>(undefined);

const STORAGE_KEYS = {
  START_DATE: '@diadefense_start_date',
  COMPLETED_MEALS: '@diadefense_completed_meals',
  COMPLETED_SUPPS: '@diadefense_completed_supps',
  WATER: '@diadefense_water',
  ACTIVITY: '@diadefense_activity',
  SLEEP: '@diadefense_sleep',
  WATER_BY_DAY: '@diadefense_water_by_day',
  ACTIVITY_BY_DAY: '@diadefense_activity_by_day',
  SLEEP_BY_DAY: '@diadefense_sleep_by_day',
  GLUCOSE_BY_DAY: '@diadefense_glucose_by_day',
  WEIGHT_BY_DAY: '@diadefense_weight_by_day',
  BLOOD: '@diadefense_blood',
  LAST_RESET_DATE: '@diadefense_last_reset'
};

export function DefenseProgramProvider({ children }: { children: ReactNode }) {
  const [program] = useState<DayPlan[]>(TR_PROGRAM);
  const [startISO, setStartISOState] = useState<string | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(1);
  const [currentDayPlan, setCurrentDayPlan] = useState<DayPlan | null>(null);
  
  // User progress state
  const [completedMeals, setCompletedMeals] = useState<Record<number, MealSlot[]>>({});
  const [completedSupplements, setCompletedSupplements] = useState<Record<number, string[]>>({});
  const [waterIntakeLiters, setWaterIntakeLiters] = useState<number>(0); // Legacy
  const [activityScore, setActivityScoreState] = useState<number>(0); // Legacy
  const [sleepHours, setSleepHoursState] = useState<number>(0); // Legacy
  const [waterIntakeByDay, setWaterIntakeByDay] = useState<Record<number, number>>({});
  const [activityMinutesByDay, setActivityMinutesByDay] = useState<Record<number, number>>({});
  const [sleepHoursByDay, setSleepHoursByDay] = useState<Record<number, number>>({});
  const [glucoseByDay, setGlucoseByDayState] = useState<Record<number, number>>({});
  const [weightByDay, setWeightByDayState] = useState<Record<number, number>>({});
  const [bloodValues, setBloodValuesState] = useState<BloodValues>({});
  
  // Calculated state
  const [mealRatio, setMealRatio] = useState<number>(0);
  const [supplementRatio, setSupplementRatio] = useState<number>(0);
  const [waterRatio, setWaterRatio] = useState<number>(0);
  const [activityRatio, setActivityRatio] = useState<number>(0);
  const [sleepRatio, setSleepRatio] = useState<number>(0);
  const [bloodModifier, setBloodModifier] = useState<number>(0);
  const [defenseScore, setDefenseScore] = useState<number>(0);
  const [monsterState, setMonsterState] = useState<MonsterState>('neutral');
  const [defiMood, setDefiMood] = useState<DefiMood>('idle');
  const [defiMessage, setDefiMessage] = useState<string>('Merhaba! Programına başlamaya hazır mısın?');

  // Load saved data on mount
  useEffect(() => {
    loadSavedData();
  }, []);

  // Auto-reset daily at midnight
  useEffect(() => {
    checkAndResetDaily();
  }, []);

  // Calculate current day when start date changes
  useEffect(() => {
    if (startISO) {
      const start = parseISO(startISO);
      const today = new Date();
      const daysPassed = differenceInDays(today, start) + 1;
      const newDayIndex = Math.min(Math.max(daysPassed, 1), 90);
      setCurrentDayIndex(newDayIndex);
      
      // Find current day plan
      const plan = program.find(p => p.dayIndex === newDayIndex);
      setCurrentDayPlan(plan || program[0] || null);
    }
  }, [startISO, program]);

  // Recalculate everything when progress changes
  useEffect(() => {
    calculateDefenseMetrics();
  }, [
    currentDayPlan,
    currentDayIndex,
    completedMeals,
    completedSupplements,
    waterIntakeLiters,
    activityScore,
    sleepHours,
    waterIntakeByDay,
    activityMinutesByDay,
    sleepHoursByDay,
    bloodValues
  ]);

  async function loadSavedData() {
    try {
      const [savedStart, savedMeals, savedSupps, savedWater, savedActivity, savedSleep, savedWaterByDay, savedActivityByDay, savedSleepByDay, savedGlucoseByDay, savedWeightByDay, savedBlood] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.START_DATE),
        AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_MEALS),
        AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_SUPPS),
        AsyncStorage.getItem(STORAGE_KEYS.WATER),
        AsyncStorage.getItem(STORAGE_KEYS.ACTIVITY),
        AsyncStorage.getItem(STORAGE_KEYS.SLEEP),
        AsyncStorage.getItem(STORAGE_KEYS.WATER_BY_DAY),
        AsyncStorage.getItem(STORAGE_KEYS.ACTIVITY_BY_DAY),
        AsyncStorage.getItem(STORAGE_KEYS.SLEEP_BY_DAY),
        AsyncStorage.getItem(STORAGE_KEYS.GLUCOSE_BY_DAY),
        AsyncStorage.getItem(STORAGE_KEYS.WEIGHT_BY_DAY),
        AsyncStorage.getItem(STORAGE_KEYS.BLOOD)
      ]);

      if (savedStart) setStartISOState(savedStart);
      if (savedMeals) setCompletedMeals(JSON.parse(savedMeals));
      if (savedSupps) setCompletedSupplements(JSON.parse(savedSupps));
      if (savedWater) setWaterIntakeLiters(parseFloat(savedWater));
      if (savedActivity) setActivityScoreState(parseFloat(savedActivity));
      if (savedSleep) setSleepHoursState(parseFloat(savedSleep));
      if (savedWaterByDay) setWaterIntakeByDay(JSON.parse(savedWaterByDay));
      if (savedActivityByDay) setActivityMinutesByDay(JSON.parse(savedActivityByDay));
      if (savedSleepByDay) setSleepHoursByDay(JSON.parse(savedSleepByDay));
      if (savedGlucoseByDay) setGlucoseByDayState(JSON.parse(savedGlucoseByDay));
      if (savedWeightByDay) setWeightByDayState(JSON.parse(savedWeightByDay));
      if (savedBlood) setBloodValuesState(JSON.parse(savedBlood));
    } catch (error) {
      console.error('Failed to load saved data:', error);
    }
  }

  async function checkAndResetDaily() {
    try {
      const lastReset = await AsyncStorage.getItem(STORAGE_KEYS.LAST_RESET_DATE);
      const today = new Date().toDateString();
      
      if (lastReset !== today) {
        // Reset daily progress
        await resetDailyProgress();
        await AsyncStorage.setItem(STORAGE_KEYS.LAST_RESET_DATE, today);
      }
    } catch (error) {
      console.error('Failed to check daily reset:', error);
    }
  }

  async function resetDailyProgress() {
    setWaterIntakeLiters(0);
    setActivityScoreState(0);
    setSleepHoursState(0);
    
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.WATER, '0'),
        AsyncStorage.setItem(STORAGE_KEYS.ACTIVITY, '0'),
        AsyncStorage.setItem(STORAGE_KEYS.SLEEP, '0')
      ]);
    } catch (error) {
      console.error('Failed to reset daily progress:', error);
    }
  }

  function calculateDefenseMetrics() {
    if (!currentDayPlan) {
      setDefenseScore(0);
      return;
    }

    const dayMeals = completedMeals[currentDayIndex] || [];
    const daySupps = completedSupplements[currentDayIndex] || [];
    
    // Calculate ratios - filter out any potential snack entries and deduplicate
    const safeMeals = (currentDayPlan?.meals ?? []).filter(
      (m: any) => m?.type !== "snack" && m?.slot !== "snack" && m?.label !== "Ara Öğün"
    );
    const safeMealSlots = new Set(safeMeals.map(m => m.slot));
    
    // Filter and deduplicate completed meals to only include safe meal slots
    const completedSafe = Array.from(new Set(dayMeals.filter(slot => safeMealSlots.has(slot))));
    
    const totalMeals = safeMeals.length || 1;
    const newMealRatio = Math.min(Math.max(completedSafe.length / totalMeals, 0), 1);
    
    const totalSupps = currentDayPlan.supplements.length;
    const newSuppRatio = totalSupps > 0 ? daySupps.length / totalSupps : 0;
    
    const targetWater = currentDayPlan.defenseTargets.waterLiters;
    const currentWaterMl = waterIntakeByDay[currentDayIndex] || 0;
    const currentWaterLiters = currentWaterMl / 1000;
    const newWaterRatio = Math.min(currentWaterLiters / targetWater, 1);
    
    const targetSteps = currentDayPlan.defenseTargets.steps;
    const currentActivityMinutes = activityMinutesByDay[currentDayIndex] || 0;
    // Convert minutes to estimated steps (rough estimate: 1 minute = ~100 steps)
    const estimatedSteps = Math.min(currentActivityMinutes * 100, targetSteps);
    const newActivityRatio = Math.min(estimatedSteps / targetSteps, 1);
    
    const targetSleep = currentDayPlan.defenseTargets.sleepHours;
    const currentSleepHours = sleepHoursByDay[currentDayIndex] || 0;
    const newSleepRatio = Math.min(currentSleepHours / targetSleep, 1);
    
    // Blood modifier: -10 to +10
    let newBloodModifier = 0;
    if (bloodValues.lastGlucose) {
      if (bloodValues.lastGlucose < 70) newBloodModifier = -10;
      else if (bloodValues.lastGlucose > 180) newBloodModifier = -5;
      else if (bloodValues.lastGlucose >= 80 && bloodValues.lastGlucose <= 120) newBloodModifier = 5;
    }
    
    // Calculate defense score (0-100)
    const baseScore = (
      newMealRatio * 30 +
      newSuppRatio * 20 +
      newWaterRatio * 15 +
      newActivityRatio * 20 +
      newSleepRatio * 15
    );
    
    const finalScore = Math.min(Math.max(baseScore + newBloodModifier, 0), 100);
    
    // Update all calculated values
    setMealRatio(newMealRatio);
    setSupplementRatio(newSuppRatio);
    setWaterRatio(newWaterRatio);
    setActivityRatio(newActivityRatio);
    setSleepRatio(newSleepRatio);
    setBloodModifier(newBloodModifier);
    setDefenseScore(finalScore);
    
    // Calculate monster state
    const newMonsterState = getMonsterState(finalScore);
    setMonsterState(newMonsterState);
    
    // Get Defi message - use safe meals only
    const allMeals = safeMeals.map(m => m.slot);
    const missedMeals = allMeals.filter(slot => !completedSafe.includes(slot));
    const missedSupplements = totalSupps - daySupps.length;
    
    const defiResponse = getDefiMessage({
      defenseScore: finalScore,
      mealRatio: newMealRatio,
      supplementRatio: newSuppRatio,
      waterRatio: newWaterRatio,
      sleepRatio: newSleepRatio,
      activityRatio: newActivityRatio,
      missedMeals,
      missedSupplements,
      monsterState: newMonsterState
    });
    
    setDefiMood(defiResponse.mood);
    setDefiMessage(defiResponse.message);
  }

  async function setStartISO(dateString: string) {
    setStartISOState(dateString);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.START_DATE, dateString);
    } catch (error) {
      console.error('Failed to save start date:', error);
    }
  }

  async function markMealCompleted(dayIndex: number, slot: MealSlot) {
    // Prevent adding snack or invalid slots
    if (slot === 'snack' || (slot !== 'breakfast' && slot !== 'lunch' && slot !== 'dinner')) {
      return;
    }
    
    const dayMeals = completedMeals[dayIndex] || [];
    // Deduplicate existing entries and filter out snacks
    const cleanDayMeals = Array.from(new Set(dayMeals.filter(s => s !== 'snack' && (s === 'breakfast' || s === 'lunch' || s === 'dinner'))));
    
    if (!cleanDayMeals.includes(slot)) {
      const updated = { ...completedMeals, [dayIndex]: [...cleanDayMeals, slot] };
      setCompletedMeals(updated);
      
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_MEALS, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save completed meal:', error);
      }
    }
  }

  async function toggleMealCompleted(dayIndex: number, slot: MealSlot) {
    // Prevent adding snack or invalid slots
    if (slot === 'snack' || (slot !== 'breakfast' && slot !== 'lunch' && slot !== 'dinner')) {
      return;
    }
    
    const dayMeals = completedMeals[dayIndex] || [];
    // Deduplicate existing entries and filter out snacks
    const cleanDayMeals = Array.from(new Set(dayMeals.filter(s => s !== 'snack' && (s === 'breakfast' || s === 'lunch' || s === 'dinner'))));
    
    let updated: Record<number, MealSlot[]>;
    
    if (cleanDayMeals.includes(slot)) {
      // Remove if already completed
      updated = {
        ...completedMeals,
        [dayIndex]: cleanDayMeals.filter(s => s !== slot)
      };
    } else {
      // Add if not completed (deduplicated)
      updated = {
        ...completedMeals,
        [dayIndex]: [...cleanDayMeals, slot]
      };
    }
    
    setCompletedMeals(updated);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_MEALS, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save completed meal:', error);
    }
  }

  async function markSupplementTaken(dayIndex: number, id: string) {
    const daySupps = completedSupplements[dayIndex] || [];
    if (!daySupps.includes(id)) {
      const updated = { ...completedSupplements, [dayIndex]: [...daySupps, id] };
      setCompletedSupplements(updated);
      
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_SUPPS, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save completed supplement:', error);
      }
    }
  }

  async function toggleSupplementTaken(dayIndex: number, id: string) {
    const daySupps = completedSupplements[dayIndex] || [];
    let updated: Record<number, string[]>;
    
    if (daySupps.includes(id)) {
      // Remove if already taken
      updated = {
        ...completedSupplements,
        [dayIndex]: daySupps.filter(s => s !== id)
      };
    } else {
      // Add if not taken
      updated = {
        ...completedSupplements,
        [dayIndex]: [...daySupps, id]
      };
    }
    
    setCompletedSupplements(updated);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_SUPPS, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save completed supplement:', error);
    }
  }

  async function addWater(liters: number) {
    const newValue = waterIntakeLiters + liters;
    setWaterIntakeLiters(newValue);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WATER, newValue.toString());
    } catch (error) {
      console.error('Failed to save water intake:', error);
    }
  }

  async function setWater(liters: number) {
    setWaterIntakeLiters(liters);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WATER, liters.toString());
    } catch (error) {
      console.error('Failed to save water intake:', error);
    }
  }

  async function setActivityScore(value: number) {
    setActivityScoreState(value);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ACTIVITY, value.toString());
    } catch (error) {
      console.error('Failed to save activity score:', error);
    }
  }

  async function setSleepHours(value: number) {
    setSleepHoursState(value);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SLEEP, value.toString());
    } catch (error) {
      console.error('Failed to save sleep hours:', error);
    }
  }

  async function setBloodValues(values: BloodValues) {
    setBloodValuesState(values);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.BLOOD, JSON.stringify(values));
    } catch (error) {
      console.error('Failed to save blood values:', error);
    }
  }

  // Day-based functions
  async function addWaterByDay(dayIndex: number, amountMl: number) {
    const current = waterIntakeByDay[dayIndex] || 0;
    const updated = { ...waterIntakeByDay, [dayIndex]: current + amountMl };
    setWaterIntakeByDay(updated);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WATER_BY_DAY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save water by day:', error);
    }
  }

  async function resetWaterByDay(dayIndex: number) {
    const updated = { ...waterIntakeByDay, [dayIndex]: 0 };
    setWaterIntakeByDay(updated);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WATER_BY_DAY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to reset water by day:', error);
    }
  }

  async function addActivityByDay(dayIndex: number, minutes: number) {
    const current = activityMinutesByDay[dayIndex] || 0;
    const updated = { ...activityMinutesByDay, [dayIndex]: current + minutes };
    setActivityMinutesByDay(updated);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ACTIVITY_BY_DAY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save activity by day:', error);
    }
  }

  async function resetActivityByDay(dayIndex: number) {
    const updated = { ...activityMinutesByDay, [dayIndex]: 0 };
    setActivityMinutesByDay(updated);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ACTIVITY_BY_DAY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to reset activity by day:', error);
    }
  }

  async function setSleepByDay(dayIndex: number, hours: number) {
    const updated = { ...sleepHoursByDay, [dayIndex]: hours };
    setSleepHoursByDay(updated);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SLEEP_BY_DAY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save sleep by day:', error);
    }
  }

  async function addSleepByDay(dayIndex: number, deltaHours: number) {
    const current = sleepHoursByDay[dayIndex] || 0;
    const updated = { ...sleepHoursByDay, [dayIndex]: current + deltaHours };
    setSleepHoursByDay(updated);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SLEEP_BY_DAY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to add sleep by day:', error);
    }
  }

  async function resetSleepByDay(dayIndex: number) {
    const updated = { ...sleepHoursByDay, [dayIndex]: 0 };
    setSleepHoursByDay(updated);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SLEEP_BY_DAY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to reset sleep by day:', error);
    }
  }

  async function setGlucoseByDay(dayIndex: number, mgdl: number) {
    const updated = { ...glucoseByDay, [dayIndex]: mgdl };
    setGlucoseByDayState(updated);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.GLUCOSE_BY_DAY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save glucose by day:', error);
    }
  }

  async function resetGlucoseByDay(dayIndex: number) {
    const updated = { ...glucoseByDay };
    delete updated[dayIndex];
    setGlucoseByDayState(updated);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.GLUCOSE_BY_DAY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to reset glucose by day:', error);
    }
  }

  async function setWeightByDay(dayIndex: number, kg: number) {
    const updated = { ...weightByDay, [dayIndex]: kg };
    setWeightByDayState(updated);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WEIGHT_BY_DAY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save weight by day:', error);
    }
  }

  async function resetWeightByDay(dayIndex: number) {
    const updated = { ...weightByDay };
    delete updated[dayIndex];
    setWeightByDayState(updated);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WEIGHT_BY_DAY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to reset weight by day:', error);
    }
  }

  const value: DefenseProgramContextType = {
    program,
    startISO,
    currentDayIndex,
    currentDayPlan,
    completedMeals,
    completedSupplements,
    waterIntakeLiters,
    activityScore,
    sleepHours,
    waterIntakeByDay,
    activityMinutesByDay,
    sleepHoursByDay,
    glucoseByDay,
    weightByDay,
    bloodValues,
    mealRatio,
    supplementRatio,
    waterRatio,
    activityRatio,
    sleepRatio,
    bloodModifier,
    defenseScore,
    monsterState,
    defiMood,
    defiMessage,
    setStartISO,
    markMealCompleted,
    toggleMealCompleted,
    markSupplementTaken,
    toggleSupplementTaken,
    addWater,
    setWater,
    setActivityScore,
    setSleepHours,
    addWaterByDay,
    resetWaterByDay,
    addActivityByDay,
    resetActivityByDay,
    setSleepByDay,
    addSleepByDay,
    resetSleepByDay,
    setGlucoseByDay,
    resetGlucoseByDay,
    setWeightByDay,
    resetWeightByDay,
    setBloodValues,
    resetDailyProgress
  };

  return (
    <DefenseProgramContext.Provider value={value}>
      {children}
    </DefenseProgramContext.Provider>
  );
}

export function useDefenseProgram() {
  const context = useContext(DefenseProgramContext);
  if (context === undefined) {
    throw new Error('useDefenseProgram must be used within a DefenseProgramProvider');
  }
  return context;
}
