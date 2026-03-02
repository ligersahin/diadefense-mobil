// DiaDefense Type Definitions

export type MealSlot = 'breakfast' | 'lunch' | 'dinner';

export type DayMeal = {
  slot: MealSlot;
  title: string;
  description?: string;
};

export type DaySupplement = {
  id: string;
  time: string;
  name: string;
  dose: string;
};

export type DefenseTargets = {
  waterLiters: number;
  steps: number;
  sleepHours: number;
};

export type DayPlan = {
  dayIndex: number; // 1..90
  label: string;
  meals: DayMeal[];
  supplements: DaySupplement[];
  defenseTargets: DefenseTargets;
};

export type EducationSectionType = 'lesson' | 'warning' | 'faq';

export type EducationSection = {
  id: string;
  type: EducationSectionType;
  title: string;
  shortDescription?: string;
  content: string;
  isCritical?: boolean;
  order: number;
};

export type MonsterState = 'weak' | 'neutral' | 'angry';

export type DefiMood = 'idle' | 'happy' | 'concerned' | 'warning';

export type BloodValues = {
  lastGlucose?: number;
  lastBloodPressureSystolic?: number;
  lastBloodPressureDiastolic?: number;
};

export type UserProgress = {
  completedMeals: Record<number, MealSlot[]>;
  completedSupplements: Record<number, string[]>;
  waterIntakeLiters: number;
  activityScore: number; // 0-100
  sleepHours: number;
  bloodValues: BloodValues;
};
