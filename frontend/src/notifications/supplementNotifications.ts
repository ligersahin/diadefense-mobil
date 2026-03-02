import * as Notifications from 'expo-notifications';
import { areNotificationsEnabled } from './notificationsGate';

export type SupplementDose = {
  id: string;
  name: string;
  time: string; // "08:30"
  slotId?: string;
};

export type SupplementDayPlan = {
  dateISO: string; // "2026-02-06"
  doses: SupplementDose[];
};

type ParsedTime = { hours: number; minutes: number } | null;

const parseTime = (time: string): ParsedTime => {
  const [hh, mm] = time.split(':');
  const hours = Number.parseInt(hh, 10);
  const minutes = Number.parseInt(mm, 10);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  return { hours, minutes };
};

const toISODate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const computeSlotId = (dose: SupplementDose): string => {
  if (dose.slotId) return dose.slotId;
  const parsed = parseTime(dose.time);
  if (!parsed) return 'noon';
  if (parsed.hours < 11) return 'morning';
  if (parsed.hours <= 16) return 'noon';
  return 'evening';
};

export const buildDefiLine = (slotId: string): string => {
  if (slotId === 'morning') return 'Güne destekle başlamak yeterli.';
  if (slotId === 'noon') return 'Ritmi koru. Küçük bir destek.';
  if (slotId === 'evening') return 'Şimdi vücudu toparlama vakti.';
  return 'Hazırım.';
};

export const jitterMinutes = (): number =>
  Math.floor(Math.random() * (10 - 3 + 1)) + 3;

export const makeTriggerDate = (
  dateISO: string,
  baseTimeHHMM: string,
  jitterMin: number
): Date | null => {
  const [yearStr, monthStr, dayStr] = dateISO.split('-');
  const year = Number.parseInt(yearStr, 10);
  const month = Number.parseInt(monthStr, 10);
  const day = Number.parseInt(dayStr, 10);
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) return null;

  const parsedTime = parseTime(baseTimeHHMM);
  if (!parsedTime) return null;

  const date = new Date(year, month - 1, day, parsedTime.hours, parsedTime.minutes, 0, 0);
  date.setMinutes(date.getMinutes() + jitterMin);
  if (date.getTime() <= Date.now()) return null;
  return date;
};

export const groupBySlot = (
  doses: SupplementDose[]
): Record<string, SupplementDose[]> =>
  doses.reduce<Record<string, SupplementDose[]>>((acc, dose) => {
    const slotId = computeSlotId(dose);
    if (!acc[slotId]) acc[slotId] = [];
    acc[slotId].push(dose);
    return acc;
  }, {});

export const cancelAllSupplementNotifications = async (): Promise<void> => {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const supplementNotifications = scheduled.filter(
    (item) => item.content?.data?.type === 'supplement'
  );
  await Promise.all(
    supplementNotifications.map((item) =>
      Notifications.cancelScheduledNotificationAsync(item.identifier)
    )
  );
};

export const scheduleSupplementNotificationsForNextDays = async (
  plans: SupplementDayPlan[],
  daysAhead: number = 7,
  takenDoseIdsByDate?: Record<string, string[]>
): Promise<void> => {
  if (!(await areNotificationsEnabled())) {
    await cancelAllSupplementNotifications();
    return;
  }
  await cancelAllSupplementNotifications();

  const planMap = new Map(plans.map((plan) => [plan.dateISO, plan]));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let dayOffset = 0; dayOffset <= daysAhead; dayOffset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);
    const dateISO = toISODate(date);
    const plan = planMap.get(dateISO);
    if (!plan) continue;

    const grouped = groupBySlot(plan.doses);
    const takenSet = new Set(takenDoseIdsByDate?.[dateISO] ?? []);
    for (const [slotId, doses] of Object.entries(grouped)) {
      if (!doses.length) continue;

      const remainingDoses = takenDoseIdsByDate
        ? doses.filter((dose) => !takenSet.has(dose.id))
        : doses;
      if (!remainingDoses.length) continue;

      const earliest = doses
        .map((dose) => ({ dose, parsed: parseTime(dose.time) }))
        .filter((item) => item.parsed)
        .sort((a, b) => {
          const aMinutes = (a.parsed?.hours ?? 0) * 60 + (a.parsed?.minutes ?? 0);
          const bMinutes = (b.parsed?.hours ?? 0) * 60 + (b.parsed?.minutes ?? 0);
          return aMinutes - bMinutes;
        })[0];

      if (!earliest?.parsed) continue;

      const jitterMin = jitterMinutes();
      const triggerDate = makeTriggerDate(dateISO, earliest.dose.time, jitterMin);
      if (!triggerDate) continue;

      const secondsFromNow = Math.max(
        1,
        Math.round((triggerDate.getTime() - Date.now()) / 1000)
      );
      if (secondsFromNow <= 0) continue;

      const defiLine = buildDefiLine(slotId);
      const namesJoined = remainingDoses.map((dose) => dose.name).join(' · ');
      const doseIds = remainingDoses.map((dose) => dose.id);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Defi',
          body: `${defiLine}\n${namesJoined}`,
          data: { type: 'supplement', slotId, dateISO, doseIds },
          categoryIdentifier: 'SUPPLEMENT_REMINDER',
          sound: 'default',
        },
        trigger: { type: 'timeInterval', seconds: secondsFromNow, repeats: false },
      });
    }
  }
};
