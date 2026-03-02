import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { areNotificationsEnabled } from './notificationsGate';

export const MEALS_NUDGE_LAST_SCHEDULED_DATE_KEY =
  '@diadefense_meals_nudge_last_scheduled_date_v1';
export const MEALS_INTERACTION_DATE_KEY = '@diadefense_meals_interaction_date_v1';

const jitterMinutes = (): number =>
  Math.floor(Math.random() * (10 - 3 + 1)) + 3;

const makeTriggerDate = (
  dateISO: string,
  baseTimeHHMM: string,
  jitterMin: number
): Date | null => {
  const [yearStr, monthStr, dayStr] = dateISO.split('-');
  const year = Number.parseInt(yearStr, 10);
  const month = Number.parseInt(monthStr, 10);
  const day = Number.parseInt(dayStr, 10);
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) return null;

  const [hhStr, mmStr] = baseTimeHHMM.split(':');
  const hours = Number.parseInt(hhStr, 10);
  const minutes = Number.parseInt(mmStr, 10);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;

  const date = new Date(year, month - 1, day, hours, minutes, 0, 0);
  date.setMinutes(date.getMinutes() + jitterMin);
  if (date.getTime() <= Date.now()) return null;
  return date;
};

export async function cancelAllMealsNudgeNotifications(): Promise<void> {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const nudgeNotifications = scheduled.filter(
    (item) => item.content?.data?.type === 'meals_nudge'
  );
  await Promise.all(
    nudgeNotifications.map((item) =>
      Notifications.cancelScheduledNotificationAsync(item.identifier)
    )
  );
}

export async function markMealsInteractedToday(dateISO: string): Promise<void> {
  await AsyncStorage.setItem(MEALS_INTERACTION_DATE_KEY, dateISO);
}

export async function scheduleMealsNudgeIfNotStarted(args: {
  dateISO: string;
  hasAnyMealCompletedToday: boolean;
  preferredTimeHHMM?: string;
}): Promise<void> {
  const { dateISO, hasAnyMealCompletedToday, preferredTimeHHMM } = args;

  if (!(await areNotificationsEnabled())) {
    await cancelAllMealsNudgeNotifications();
    return;
  }

  if (hasAnyMealCompletedToday) {
    await cancelAllMealsNudgeNotifications();
    return;
  }

  const lastInteraction = await AsyncStorage.getItem(MEALS_INTERACTION_DATE_KEY);
  if (lastInteraction === dateISO) {
    await cancelAllMealsNudgeNotifications();
    return;
  }

  const lastScheduled = await AsyncStorage.getItem(MEALS_NUDGE_LAST_SCHEDULED_DATE_KEY);
  if (lastScheduled === dateISO) return;

  const jitterMin = jitterMinutes();
  const triggerDate = makeTriggerDate(dateISO, preferredTimeHHMM ?? '12:00', jitterMin);
  if (!triggerDate) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Defi',
      body: 'Bugün henüz başlamadık. Bir öğün yeter.',
      data: { type: 'meals_nudge', dateISO },
      sound: 'default',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: triggerDate,
    },
  });

  await AsyncStorage.setItem(MEALS_NUDGE_LAST_SCHEDULED_DATE_KEY, dateISO);
}
