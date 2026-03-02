import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { supplementRules, type MealKey, type SupplementItem } from '../../data/supplementRules';

const SCHEDULED_IDS_KEY = 'scheduled_supplement_notification_ids_v1';
const VITAMIN_D_LAST_KEY = 'vitamin_d_last_scheduled_v1';

export type MealTimes = Record<MealKey, string>;

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseTimeForToday = (time: string) => {
  const [hh, mm] = time.split(':').map((value) => parseInt(value, 10));
  if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
  const date = new Date();
  date.setHours(hh, mm, 0, 0);
  return date;
};

const daysBetween = (start: Date, end: Date) => {
  const startMidnight = new Date(start);
  startMidnight.setHours(0, 0, 0, 0);
  const endMidnight = new Date(end);
  endMidnight.setHours(0, 0, 0, 0);
  return Math.floor((endMidnight.getTime() - startMidnight.getTime()) / 86400000);
};

const formatItems = (items: SupplementItem[]) =>
  items
    .map((item) => (item.dose ? `${item.name} (${item.dose})` : item.name))
    .join(' • ');

export const ensureNotificationPermissions = async () => {
  try {
    const existing = await Notifications.getPermissionsAsync();
    if (existing.granted) return true;

    const requested = await Notifications.requestPermissionsAsync({
      ios: { allowAlert: true, allowSound: true, allowBadge: false },
    });
    return requested.granted;
  } catch {
    return false;
  }
};

export const cancelScheduledSupplementNotifications = async () => {
  try {
    const storedIds = await AsyncStorage.getItem(SCHEDULED_IDS_KEY);
    if (!storedIds) return;

    const ids: string[] = JSON.parse(storedIds);
    await Promise.all(ids.map((id) => Notifications.cancelScheduledNotificationAsync(id)));
    await AsyncStorage.removeItem(SCHEDULED_IDS_KEY);
  } catch {
    // TODO: Depoda beklenmedik veri varsa sessizce yoksay.
  }
};

export const scheduleSupplementsForToday = async (mealTimes: MealTimes) => {
  try {
    const now = new Date();
    const groupedByMinute = new Map<number, { date: Date; items: SupplementItem[] }>();
    const scheduledIds: string[] = [];
    let scheduledIntervalRule = false;

    for (const rule of supplementRules) {
      if (!rule.enabled) continue;
      const mealTime = mealTimes[rule.meal];
      if (!mealTime) continue;

      if (rule.intervalDays) {
        const lastTakenRaw = await AsyncStorage.getItem(VITAMIN_D_LAST_KEY);
        if (lastTakenRaw) {
          const lastTaken = new Date(lastTakenRaw);
          if (daysBetween(lastTaken, now) < rule.intervalDays) {
            continue;
          }
        }
      }

      const baseDate = parseTimeForToday(mealTime);
      if (!baseDate) continue;
      baseDate.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
      const triggerDate = new Date(baseDate);
      triggerDate.setMinutes(triggerDate.getMinutes() + rule.offsetMinutes);

      if (triggerDate.getTime() <= now.getTime()) continue;

      const minuteKey = Math.floor(triggerDate.getTime() / 60000) * 60000;
      const existingGroup = groupedByMinute.get(minuteKey);
      if (existingGroup) {
        existingGroup.items.push(...rule.items);
      } else {
        groupedByMinute.set(minuteKey, { date: triggerDate, items: [...rule.items] });
      }

      if (rule.intervalDays) {
        scheduledIntervalRule = true;
      }
    }

    for (const group of groupedByMinute.values()) {
      const secondsFromNow = Math.max(
        1,
        Math.round((group.date.getTime() - Date.now()) / 1000)
      );
      if (secondsFromNow <= 0) continue;
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Takviye Hatırlatması',
          body: formatItems(group.items),
          sound: 'default',
        },
        trigger: { type: 'timeInterval', seconds: secondsFromNow, repeats: false },
      });
      scheduledIds.push(id);
    }

    if (scheduledIds.length) {
      await AsyncStorage.setItem(SCHEDULED_IDS_KEY, JSON.stringify(scheduledIds));
    }

    if (scheduledIntervalRule) {
      await AsyncStorage.setItem(VITAMIN_D_LAST_KEY, toDateKey(now));
    }
  } catch {
    // TODO: schedule sırasında hata olursa sessizce yoksay.
  }
};
