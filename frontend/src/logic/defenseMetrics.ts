/**
 * Pure, side-effect-free defense score computation.
 * Extracted from DefenseProgramContext so it can be tested independently
 * and reused without React dependency.
 */

import { DayPlan, BloodValues, MonsterState, DefiMood } from '../types';
import { getDefiMessage, getMonsterState } from './defiMessages';

export type DefenseMetrics = {
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
};

export type DefenseMetricsInput = {
  currentDayPlan: DayPlan | null;
  currentDayIndex: number;
  completedMeals: Record<number, string[]>;
  completedSupplements: Record<number, string[]>;
  waterIntakeByDay: Record<number, number>;
  activityMinutesByDay: Record<number, number>;
  sleepHoursByDay: Record<number, number>;
  bloodValues: BloodValues;
};

export const DEFAULT_DEFENSE_METRICS: DefenseMetrics = {
  mealRatio: 0,
  supplementRatio: 0,
  waterRatio: 0,
  activityRatio: 0,
  sleepRatio: 0,
  bloodModifier: 0,
  defenseScore: 0,
  monsterState: 'neutral',
  defiMood: 'idle',
  defiMessage: 'Merhaba! Programına başlamaya hazır mısın?',
};

export function computeDefenseMetrics(input: DefenseMetricsInput): DefenseMetrics {
  const {
    currentDayPlan,
    currentDayIndex,
    completedMeals,
    completedSupplements,
    waterIntakeByDay,
    activityMinutesByDay,
    sleepHoursByDay,
    bloodValues,
  } = input;

  if (!currentDayPlan) return DEFAULT_DEFENSE_METRICS;

  const dayMeals = completedMeals[currentDayIndex] || [];
  const daySupps = completedSupplements[currentDayIndex] || [];

  // Filter out snack entries and deduplicate
  const safeMeals = (currentDayPlan.meals ?? []).filter(
    (m: any) => m?.type !== 'snack' && m?.slot !== 'snack' && m?.label !== 'Ara Öğün',
  );
  const safeMealSlots = new Set(safeMeals.map((m: any) => m.slot));
  const completedSafe = Array.from(new Set(dayMeals.filter(slot => safeMealSlots.has(slot))));

  const totalMeals = safeMeals.length || 1;
  const mealRatio = Math.min(Math.max(completedSafe.length / totalMeals, 0), 1);

  const totalSupps = currentDayPlan.supplements.length;
  const supplementRatio = totalSupps > 0 ? daySupps.length / totalSupps : 0;

  const targetWater = currentDayPlan.defenseTargets.waterLiters;
  const currentWaterLiters = (waterIntakeByDay[currentDayIndex] || 0) / 1000;
  const waterRatio = Math.min(currentWaterLiters / targetWater, 1);

  const targetSteps = currentDayPlan.defenseTargets.steps;
  const currentActivityMinutes = activityMinutesByDay[currentDayIndex] || 0;
  const activityRatio =
    typeof targetSteps === 'number' && targetSteps > 0
      ? Math.min((currentActivityMinutes * 100) / targetSteps, 1)
      : 0;

  const targetSleep = currentDayPlan.defenseTargets.sleepHours;
  const currentSleepHours = sleepHoursByDay[currentDayIndex] || 0;
  const sleepRatio =
    typeof targetSleep === 'number' && targetSleep > 0
      ? Math.min(currentSleepHours / targetSleep, 1)
      : 0;

  // Blood modifier: -10 to +10
  let bloodModifier = 0;
  if (bloodValues.lastGlucose) {
    if (bloodValues.lastGlucose < 70) bloodModifier = -10;
    else if (bloodValues.lastGlucose > 180) bloodModifier = -5;
    else if (bloodValues.lastGlucose >= 80 && bloodValues.lastGlucose <= 120) bloodModifier = 5;
  }

  const baseScore =
    mealRatio * 30 +
    supplementRatio * 20 +
    waterRatio * 15 +
    activityRatio * 20 +
    sleepRatio * 15;

  const defenseScore = Math.min(Math.max(baseScore + bloodModifier, 0), 100);
  const monsterState = getMonsterState(defenseScore);

  const allMealSlots = safeMeals.map((m: any) => m.slot);
  const missedMeals = allMealSlots.filter((slot: string) => !completedSafe.includes(slot));
  const missedSupplements = totalSupps - daySupps.length;

  const defiResponse = getDefiMessage({
    defenseScore,
    mealRatio,
    supplementRatio,
    waterRatio,
    sleepRatio,
    activityRatio,
    missedMeals,
    missedSupplements,
    monsterState,
  });

  return {
    mealRatio,
    supplementRatio,
    waterRatio,
    activityRatio,
    sleepRatio,
    bloodModifier,
    defenseScore,
    monsterState,
    defiMood: defiResponse.mood,
    defiMessage: defiResponse.message,
  };
}
