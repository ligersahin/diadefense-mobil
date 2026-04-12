import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInDays, parseISO } from 'date-fns';
import { DayPlan, MealSlot, BloodValues, MonsterState, DefiMood, UserProgress } from '../types';
import { TR_PROGRAM } from '../config/program/tr-program';
import { computeDefenseMetrics, DEFAULT_DEFENSE_METRICS } from '../logic/defenseMetrics';

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
  setSupplementTaken: (dayIndex: number, id: string) => void;
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
  resetProgram: () => Promise<void>;
  sakatatRestriction: boolean;
  updateSakatatRestriction: (value: boolean) => void;
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
  LAST_RESET_DATE: '@diadefense_last_reset',
};

const VALID_MEAL_SLOTS = new Set<MealSlot>(['breakfast', 'lunch', 'dinner']);

function isValidMealSlot(slot: MealSlot): boolean {
  return VALID_MEAL_SLOTS.has(slot);
}

function cleanMealSlots(slots: MealSlot[]): MealSlot[] {
  return Array.from(new Set(slots.filter(isValidMealSlot)));
}

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
  const [sakatatRestriction, setSakatatRestriction] = useState<boolean>(false);

  // Derived defense metrics — pure computation, no intermediate useState cascade
  const metrics = useMemo(
    () =>
      computeDefenseMetrics({
        currentDayPlan,
        currentDayIndex,
        completedMeals,
        completedSupplements,
        waterIntakeByDay,
        activityMinutesByDay,
        sleepHoursByDay,
        bloodValues,
      }),
    [
      currentDayPlan,
      currentDayIndex,
      completedMeals,
      completedSupplements,
      waterIntakeByDay,
      activityMinutesByDay,
      sleepHoursByDay,
      bloodValues,
    ],
  );

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
      const plan = program.find(p => p.dayIndex === newDayIndex);
      setCurrentDayPlan(plan || program[0] || null);
    }
  }, [startISO, program]);

  async function loadSavedData() {
    try {
      const [
        savedStart,
        savedMeals,
        savedSupps,
        savedWater,
        savedActivity,
        savedSleep,
        savedWaterByDay,
        savedActivityByDay,
        savedSleepByDay,
        savedGlucoseByDay,
        savedWeightByDay,
        savedBlood,
      ] = await Promise.all([
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
        AsyncStorage.getItem(STORAGE_KEYS.BLOOD),
      ]);

      // Auto-init: if startISO is missing, set it to today
      if (savedStart) {
        setStartISOState(savedStart);
      } else {
        const today = new Date().toISOString().split('T')[0];
        setStartISOState(today);
        await AsyncStorage.setItem(STORAGE_KEYS.START_DATE, today);
      }
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
      const savedSakatat = await AsyncStorage.getItem('@diadefense_sakatat_restriction');
      if (savedSakatat !== null) setSakatatRestriction(JSON.parse(savedSakatat));
    } catch (error) {
      console.error('Failed to load saved data:', error);
    }
  }

  async function checkAndResetDaily() {
    try {
      const lastReset = await AsyncStorage.getItem(STORAGE_KEYS.LAST_RESET_DATE);
      const today = new Date().toDateString();
      if (lastReset !== today) {
        resetDailyProgress();
        await AsyncStorage.setItem(STORAGE_KEYS.LAST_RESET_DATE, today);
      }
    } catch (error) {
      console.error('Failed to check daily reset:', error);
    }
  }

  // ─── Actions (all use functional setState to avoid stale closures) ───────────

  const setStartISO = useCallback((dateString: string) => {
    setStartISOState(dateString);
    AsyncStorage.setItem(STORAGE_KEYS.START_DATE, dateString).catch(e =>
      console.error('Failed to save start date:', e),
    );
  }, []);

  const markMealCompleted = useCallback((dayIndex: number, slot: MealSlot) => {
    if (!isValidMealSlot(slot)) return;
    setCompletedMeals(prev => {
      const clean = cleanMealSlots(prev[dayIndex] || []);
      if (clean.includes(slot)) return prev;
      const next = { ...prev, [dayIndex]: [...clean, slot] };
      AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_MEALS, JSON.stringify(next)).catch(e =>
        console.error('Failed to save completed meal:', e),
      );
      return next;
    });
  }, []);

  const toggleMealCompleted = useCallback((dayIndex: number, slot: MealSlot) => {
    if (!isValidMealSlot(slot)) return;
    setCompletedMeals(prev => {
      const clean = cleanMealSlots(prev[dayIndex] || []);
      const next = {
        ...prev,
        [dayIndex]: clean.includes(slot)
          ? clean.filter(s => s !== slot)
          : [...clean, slot],
      };
      AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_MEALS, JSON.stringify(next)).catch(e =>
        console.error('Failed to save completed meal:', e),
      );
      return next;
    });
  }, []);

  const markSupplementTaken = useCallback((dayIndex: number, id: string) => {
    setCompletedSupplements(prev => {
      const daySupps = prev[dayIndex] || [];
      if (daySupps.includes(id)) return prev;
      const next = { ...prev, [dayIndex]: [...daySupps, id] };
      AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_SUPPS, JSON.stringify(next)).catch(e =>
        console.error('Failed to save completed supplement:', e),
      );
      return next;
    });
  }, []);

  const setSupplementTaken = useCallback((dayIndex: number, id: string) => {
    setCompletedSupplements(prev => {
      const daySupps = prev[dayIndex] || [];
      if (daySupps.includes(id)) return prev;
      const next = { ...prev, [dayIndex]: [...daySupps, id] };
      AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_SUPPS, JSON.stringify(next)).catch(e =>
        console.error('Failed to save completed supplement:', e),
      );
      return next;
    });
  }, []);

  const toggleSupplementTaken = useCallback((dayIndex: number, id: string) => {
    setCompletedSupplements(prev => {
      const daySupps = prev[dayIndex] || [];
      const next = {
        ...prev,
        [dayIndex]: daySupps.includes(id)
          ? daySupps.filter(s => s !== id)
          : [...daySupps, id],
      };
      AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_SUPPS, JSON.stringify(next)).catch(e =>
        console.error('Failed to save completed supplement:', e),
      );
      return next;
    });
  }, []);

  // Legacy water/activity/sleep actions
  const addWater = useCallback((liters: number) => {
    setWaterIntakeLiters(prev => {
      const next = prev + liters;
      AsyncStorage.setItem(STORAGE_KEYS.WATER, next.toString()).catch(e =>
        console.error('Failed to save water intake:', e),
      );
      return next;
    });
  }, []);

  const setWater = useCallback((liters: number) => {
    setWaterIntakeLiters(liters);
    AsyncStorage.setItem(STORAGE_KEYS.WATER, liters.toString()).catch(e =>
      console.error('Failed to save water intake:', e),
    );
  }, []);

  const setActivityScore = useCallback((value: number) => {
    setActivityScoreState(value);
    AsyncStorage.setItem(STORAGE_KEYS.ACTIVITY, value.toString()).catch(e =>
      console.error('Failed to save activity score:', e),
    );
  }, []);

  const setSleepHours = useCallback((value: number) => {
    setSleepHoursState(value);
    AsyncStorage.setItem(STORAGE_KEYS.SLEEP, value.toString()).catch(e =>
      console.error('Failed to save sleep hours:', e),
    );
  }, []);

  // Day-based actions
  const addWaterByDay = useCallback((dayIndex: number, amountMl: number) => {
    setWaterIntakeByDay(prev => {
      const next = { ...prev, [dayIndex]: (prev[dayIndex] || 0) + amountMl };
      AsyncStorage.setItem(STORAGE_KEYS.WATER_BY_DAY, JSON.stringify(next)).catch(e =>
        console.error('Failed to save water by day:', e),
      );
      return next;
    });
  }, []);

  const resetWaterByDay = useCallback((dayIndex: number) => {
    setWaterIntakeByDay(prev => {
      const next = { ...prev, [dayIndex]: 0 };
      AsyncStorage.setItem(STORAGE_KEYS.WATER_BY_DAY, JSON.stringify(next)).catch(e =>
        console.error('Failed to reset water by day:', e),
      );
      return next;
    });
  }, []);

  const addActivityByDay = useCallback((dayIndex: number, minutes: number) => {
    setActivityMinutesByDay(prev => {
      const next = { ...prev, [dayIndex]: (prev[dayIndex] || 0) + minutes };
      AsyncStorage.setItem(STORAGE_KEYS.ACTIVITY_BY_DAY, JSON.stringify(next)).catch(e =>
        console.error('Failed to save activity by day:', e),
      );
      return next;
    });
  }, []);

  const resetActivityByDay = useCallback((dayIndex: number) => {
    setActivityMinutesByDay(prev => {
      const next = { ...prev, [dayIndex]: 0 };
      AsyncStorage.setItem(STORAGE_KEYS.ACTIVITY_BY_DAY, JSON.stringify(next)).catch(e =>
        console.error('Failed to reset activity by day:', e),
      );
      return next;
    });
  }, []);

  const setSleepByDay = useCallback((dayIndex: number, hours: number) => {
    setSleepHoursByDay(prev => {
      const next = { ...prev, [dayIndex]: hours };
      AsyncStorage.setItem(STORAGE_KEYS.SLEEP_BY_DAY, JSON.stringify(next)).catch(e =>
        console.error('Failed to save sleep by day:', e),
      );
      return next;
    });
  }, []);

  const addSleepByDay = useCallback((dayIndex: number, deltaHours: number) => {
    setSleepHoursByDay(prev => {
      const next = { ...prev, [dayIndex]: (prev[dayIndex] || 0) + deltaHours };
      AsyncStorage.setItem(STORAGE_KEYS.SLEEP_BY_DAY, JSON.stringify(next)).catch(e =>
        console.error('Failed to add sleep by day:', e),
      );
      return next;
    });
  }, []);

  const resetSleepByDay = useCallback((dayIndex: number) => {
    setSleepHoursByDay(prev => {
      const next = { ...prev, [dayIndex]: 0 };
      AsyncStorage.setItem(STORAGE_KEYS.SLEEP_BY_DAY, JSON.stringify(next)).catch(e =>
        console.error('Failed to reset sleep by day:', e),
      );
      return next;
    });
  }, []);

  const setGlucoseByDay = useCallback((dayIndex: number, mgdl: number) => {
    setGlucoseByDayState(prev => {
      const next = { ...prev, [dayIndex]: mgdl };
      AsyncStorage.setItem(STORAGE_KEYS.GLUCOSE_BY_DAY, JSON.stringify(next)).catch(e =>
        console.error('Failed to save glucose by day:', e),
      );
      return next;
    });
  }, []);

  const resetGlucoseByDay = useCallback((dayIndex: number) => {
    setGlucoseByDayState(prev => {
      const next = { ...prev };
      delete next[dayIndex];
      AsyncStorage.setItem(STORAGE_KEYS.GLUCOSE_BY_DAY, JSON.stringify(next)).catch(e =>
        console.error('Failed to reset glucose by day:', e),
      );
      return next;
    });
  }, []);

  const setWeightByDay = useCallback((dayIndex: number, kg: number) => {
    setWeightByDayState(prev => {
      const next = { ...prev, [dayIndex]: kg };
      AsyncStorage.setItem(STORAGE_KEYS.WEIGHT_BY_DAY, JSON.stringify(next)).catch(e =>
        console.error('Failed to save weight by day:', e),
      );
      return next;
    });
  }, []);

  const resetWeightByDay = useCallback((dayIndex: number) => {
    setWeightByDayState(prev => {
      const next = { ...prev };
      delete next[dayIndex];
      AsyncStorage.setItem(STORAGE_KEYS.WEIGHT_BY_DAY, JSON.stringify(next)).catch(e =>
        console.error('Failed to reset weight by day:', e),
      );
      return next;
    });
  }, []);

  const setBloodValues = useCallback((values: BloodValues) => {
    setBloodValuesState(values);
    AsyncStorage.setItem(STORAGE_KEYS.BLOOD, JSON.stringify(values)).catch(e =>
      console.error('Failed to save blood values:', e),
    );
  }, []);

  const updateSakatatRestriction = useCallback((value: boolean) => {
    setSakatatRestriction(value);
    AsyncStorage.setItem('@diadefense_sakatat_restriction', JSON.stringify(value)).catch(console.error);
  }, []);

  const resetDailyProgress = useCallback(() => {
    setWaterIntakeLiters(0);
    setActivityScoreState(0);
    setSleepHoursState(0);
    Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.WATER, '0'),
      AsyncStorage.setItem(STORAGE_KEYS.ACTIVITY, '0'),
      AsyncStorage.setItem(STORAGE_KEYS.SLEEP, '0'),
    ]).catch(e => console.error('Failed to reset daily progress:', e));
  }, []);

  const resetProgram = useCallback(async () => {
    const today = new Date().toISOString().split('T')[0];
    setStartISOState(today);
    setCompletedMeals({});
    setCompletedSupplements({});
    setWaterIntakeByDay({});
    setActivityMinutesByDay({});
    setSleepHoursByDay({});
    setGlucoseByDayState({});
    setWeightByDayState({});
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.START_DATE, today),
        AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_MEALS, JSON.stringify({})),
        AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_SUPPS, JSON.stringify({})),
        AsyncStorage.setItem(STORAGE_KEYS.WATER_BY_DAY, JSON.stringify({})),
        AsyncStorage.setItem(STORAGE_KEYS.ACTIVITY_BY_DAY, JSON.stringify({})),
        AsyncStorage.setItem(STORAGE_KEYS.SLEEP_BY_DAY, JSON.stringify({})),
        AsyncStorage.setItem(STORAGE_KEYS.GLUCOSE_BY_DAY, JSON.stringify({})),
        AsyncStorage.setItem(STORAGE_KEYS.WEIGHT_BY_DAY, JSON.stringify({})),
      ]);
    } catch (error) {
      console.error('Failed to reset program:', error);
    }
  }, []);

  // ─── Stable context value ────────────────────────────────────────────────────
  const value = useMemo(
    (): DefenseProgramContextType => ({
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
      ...metrics,
      setStartISO,
      markMealCompleted,
      toggleMealCompleted,
      markSupplementTaken,
      setSupplementTaken,
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
      resetDailyProgress,
      resetProgram,
      sakatatRestriction,
      updateSakatatRestriction,
    }),
    [
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
      metrics,
      setStartISO,
      markMealCompleted,
      toggleMealCompleted,
      markSupplementTaken,
      setSupplementTaken,
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
      resetDailyProgress,
      resetProgram,
      sakatatRestriction,
      updateSakatatRestriction,
    ],
  );

  return (
    <DefenseProgramContext.Provider value={value}>{children}</DefenseProgramContext.Provider>
  );
}

export function useDefenseProgram() {
  const context = useContext(DefenseProgramContext);
  if (context === undefined) {
    throw new Error('useDefenseProgram must be used within a DefenseProgramProvider');
  }
  return context;
}
