import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInDays } from 'date-fns';

export type MonsterState = 'idle' | 'think' | 'success' | 'celebrate' | 'rest';

export type ThemeMode = 'light' | 'dark';
export type Language = 'en' | 'tr' | 'de';

interface AppState {
  // Monster & Energy
  energyScore: number;
  monsterState: MonsterState;
  
  // User Journey
  startDate: string | null;
  dayIndex: number;
  
  // Daily Progress
  completedMeals: string[]; // ['breakfast', 'lunch', 'dinner']
  completedSupplements: string[]; // supplement IDs
  completedActivities: {
    steps: boolean;
    water: boolean;
    glucose: boolean;
    walk: boolean;
  };
  
  // Settings
  theme: ThemeMode;
  language: Language;
  hasCompletedOnboarding: boolean;
  
  // Defi Assistant
  lastDefiMessageTime: string | null;
  showDefiModal: boolean;
  
  // Actions
  setEnergyScore: (score: number) => void;
  updateEnergyScore: (delta: number) => void;
  setMonsterState: (state: MonsterState) => void;
  
  setStartDate: (date: string) => void;
  calculateDayIndex: () => void;
  
  completeMeal: (meal: string) => void;
  completeSupplement: (id: string) => void;
  completeActivity: (activity: keyof AppState['completedActivities']) => void;
  
  resetDailyProgress: () => void;
  
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: Language) => void;
  completeOnboarding: () => void;
  
  setShowDefiModal: (show: boolean) => void;
  
  // Persistence
  loadState: () => Promise<void>;
  saveState: () => Promise<void>;
}

const STORAGE_KEY = '@DiaDefense:appState';

export const useAppStore = create<AppState>((set, get) => ({
  // Initial State
  energyScore: 50,
  monsterState: 'idle',
  
  startDate: null,
  dayIndex: 1,
  
  completedMeals: [],
  completedSupplements: [],
  completedActivities: {
    steps: false,
    water: false,
    glucose: false,
    walk: false,
  },
  
  theme: 'light',
  language: 'en',
  hasCompletedOnboarding: false,
  
  lastDefiMessageTime: null,
  showDefiModal: false,
  
  // Actions
  setEnergyScore: (score) => {
    set({ energyScore: Math.max(0, Math.min(100, score)) });
    get().saveState();
  },
  
  updateEnergyScore: (delta) => {
    const current = get().energyScore;
    const newScore = Math.max(0, Math.min(100, current + delta));
    set({ energyScore: newScore });
    
    // Auto-update monster state based on energy
    if (newScore >= 70) {
      set({ monsterState: 'celebrate' });
    } else if (newScore >= 40) {
      set({ monsterState: 'idle' });
    } else if (newScore >= 20) {
      set({ monsterState: 'think' });
    } else {
      set({ monsterState: 'rest' });
    }
    
    get().saveState();
  },
  
  setMonsterState: (state) => {
    set({ monsterState: state });
    get().saveState();
  },
  
  setStartDate: (date) => {
    set({ startDate: date });
    get().calculateDayIndex();
    get().saveState();
  },
  
  calculateDayIndex: () => {
    const { startDate } = get();
    if (!startDate) {
      set({ dayIndex: 1 });
      return;
    }
    
    const start = new Date(startDate);
    const today = new Date();
    const days = differenceInDays(today, start) + 1;
    
    set({ dayIndex: Math.max(1, days) });
  },
  
  completeMeal: (meal) => {
    const current = get().completedMeals;
    if (!current.includes(meal)) {
      set({ completedMeals: [...current, meal] });
      get().updateEnergyScore(5);
      get().setMonsterState('success');
      
      // Return to idle after 2 seconds
      setTimeout(() => {
        if (get().monsterState === 'success') {
          get().setMonsterState('idle');
        }
      }, 2000);
    }
    get().saveState();
  },
  
  completeSupplement: (id) => {
    const current = get().completedSupplements;
    if (!current.includes(id)) {
      set({ completedSupplements: [...current, id] });
      get().updateEnergyScore(10);
      get().setMonsterState('success');
      
      setTimeout(() => {
        if (get().monsterState === 'success') {
          get().setMonsterState('idle');
        }
      }, 2000);
    }
    get().saveState();
  },
  
  completeActivity: (activity) => {
    const current = get().completedActivities;
    if (!current[activity]) {
      set({
        completedActivities: {
          ...current,
          [activity]: true,
        },
      });
      
      const energyBonus = activity === 'walk' ? 15 : 5;
      get().updateEnergyScore(energyBonus);
      
      if (activity === 'walk') {
        get().setMonsterState('celebrate');
        setTimeout(() => {
          if (get().monsterState === 'celebrate') {
            get().setMonsterState('idle');
          }
        }, 3000);
      }
    }
    get().saveState();
  },
  
  resetDailyProgress: () => {
    set({
      completedMeals: [],
      completedSupplements: [],
      completedActivities: {
        steps: false,
        water: false,
        glucose: false,
        walk: false,
      },
    });
    get().saveState();
  },
  
  setTheme: (theme) => {
    set({ theme });
    get().saveState();
  },
  
  setLanguage: (language) => {
    set({ language });
    get().saveState();
  },
  
  completeOnboarding: () => {
    set({ hasCompletedOnboarding: true });
    const now = new Date().toISOString();
    set({ startDate: now });
    get().calculateDayIndex();
    get().saveState();
  },
  
  setShowDefiModal: (show) => {
    set({ showDefiModal: show });
  },
  
  // Persistence
  loadState: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        set(parsed);
        get().calculateDayIndex();
      }
    } catch (error) {
      console.error('Failed to load state:', error);
    }
  },
  
  saveState: async () => {
    try {
      const state = get();
      const toSave = {
        energyScore: state.energyScore,
        monsterState: state.monsterState,
        startDate: state.startDate,
        dayIndex: state.dayIndex,
        completedMeals: state.completedMeals,
        completedSupplements: state.completedSupplements,
        completedActivities: state.completedActivities,
        theme: state.theme,
        language: state.language,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        lastDefiMessageTime: state.lastDefiMessageTime,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  },
}));