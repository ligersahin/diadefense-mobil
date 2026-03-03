import React, { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInDays, parseISO } from 'date-fns';
import * as Notifications from 'expo-notifications';
import { Stack, router } from 'expo-router';
import { DefenseProgramProvider, useDefenseProgram } from '../src/context/DefenseProgramContext';
import { scheduleMealsNudgeIfNotStarted } from '../src/notifications/mealsNudgeNotifications';
import { getLocalDateISO } from '../src/utils/dateISO';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const PENDING_SUPP_ACTIONS_KEY = '@diadefense_pending_supplement_actions_v1';

type PendingSupplementAction = {
  dateISO: string;
  doseIds: string[];
};

function NotificationHandler() {
  const lastHandledIdRef = useRef<string | null>(null);
  const { startISO, currentDayIndex, currentDayPlan, completedMeals, setSupplementTaken } = useDefenseProgram();

  useEffect(() => {
    (async () => {
      try {
        await Notifications.setNotificationCategoryAsync('SUPPLEMENT_REMINDER', [
          {
            identifier: 'TAKE_SUPPLEMENTS',
            buttonTitle: 'Aldım',
            options: { opensAppToForeground: false },
          },
        ]);
      } catch (e) {
        console.warn('SUPPLEMENT_REMINDER category setup failed', e);
      }
    })();
  }, []);

  const normalizeDoseIds = (raw: any): string[] => {
    if (Array.isArray(raw)) {
      return raw.filter((id) => typeof id === 'string');
    }
    if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.filter((id) => typeof id === 'string');
        }
      } catch {
        // TODO: doseIds parse edilemezse sessizce yoksay.
      }
    }
    return [];
  };

  const getDayIndexFromDateISO = (dateISO: string) => {
    if (!startISO) return null;
    try {
      const start = parseISO(startISO);
      const target = parseISO(dateISO);
      const daysPassed = differenceInDays(target, start) + 1;
      const dayIndex = Math.min(Math.max(daysPassed, 1), 90);
      return Number.isNaN(dayIndex) ? null : dayIndex;
    } catch {
      return null;
    }
  };

  const removeAppliedPendingAction = async (action: PendingSupplementAction) => {
    try {
      const raw = await AsyncStorage.getItem(PENDING_SUPP_ACTIONS_KEY);
      if (!raw) return;
      const actions = JSON.parse(raw) as PendingSupplementAction[];
      if (!Array.isArray(actions) || !actions.length) return;

      const updated = actions
        .map((entry) => {
          if (entry.dateISO !== action.dateISO) return entry;
          const remaining = entry.doseIds.filter((id) => !action.doseIds.includes(id));
          return { ...entry, doseIds: remaining };
        })
        .filter((entry) => entry.doseIds.length > 0);

      if (updated.length) {
        await AsyncStorage.setItem(PENDING_SUPP_ACTIONS_KEY, JSON.stringify(updated));
      } else {
        await AsyncStorage.removeItem(PENDING_SUPP_ACTIONS_KEY);
      }
    } catch {
      // TODO: Pending action temizliği başarısızsa sessizce yoksay.
    }
  };

  const applySupplementAction = async (action: PendingSupplementAction) => {
    const dayIndex = getDayIndexFromDateISO(action.dateISO);
    if (dayIndex === null) return false;
    const uniqueDoseIds = Array.from(new Set(action.doseIds));
    for (const doseId of uniqueDoseIds) {
      await setSupplementTaken(dayIndex, doseId);
    }
    await removeAppliedPendingAction({ dateISO: action.dateISO, doseIds: uniqueDoseIds });
    return true;
  };

  const appendPendingAction = async (action: PendingSupplementAction) => {
    try {
      const raw = await AsyncStorage.getItem(PENDING_SUPP_ACTIONS_KEY);
      const existing = raw ? (JSON.parse(raw) as PendingSupplementAction[]) : [];
      const updated = existing.map((entry) => {
        if (entry.dateISO !== action.dateISO) return entry;
        const merged = new Set([...(entry.doseIds || []), ...action.doseIds]);
        return { ...entry, doseIds: Array.from(merged) };
      });
      const hasEntry = updated.some((entry) => entry.dateISO === action.dateISO);
      if (!hasEntry) {
        updated.push({ dateISO: action.dateISO, doseIds: Array.from(new Set(action.doseIds)) });
      }
      await AsyncStorage.setItem(PENDING_SUPP_ACTIONS_KEY, JSON.stringify(updated));
    } catch {
      // TODO: Pending action kaydı başarısızsa sessizce yoksay.
    }
  };

  const flushPendingActions = async () => {
    try {
      const raw = await AsyncStorage.getItem(PENDING_SUPP_ACTIONS_KEY);
      if (!raw) return;
      const actions = JSON.parse(raw) as PendingSupplementAction[];
      if (!Array.isArray(actions) || !actions.length) return;
      let appliedAny = false;
      for (const action of actions) {
        const applied = await applySupplementAction(action);
        if (applied) appliedAny = true;
      }
      if (appliedAny) {
        await AsyncStorage.removeItem(PENDING_SUPP_ACTIONS_KEY);
      }
    } catch {
      // TODO: Pending action temizliği başarısızsa sessizce yoksay.
    }
  };

  const handleNotificationResponse = async (response: Notifications.NotificationResponse | null) => {
    if (!response) return;
    const id = response?.notification?.request?.identifier ?? null;
    if (id && lastHandledIdRef.current === id) return;
    if (id) lastHandledIdRef.current = id;
    const data = response?.notification?.request?.content?.data;
    if (!data) return;
    if (response.actionIdentifier === 'TAKE_SUPPLEMENTS') {
      const dateISO = typeof data.dateISO === 'string' ? data.dateISO : '';
      const doseIds = normalizeDoseIds(data.doseIds);
      if (!dateISO || !doseIds.length) return;
      await appendPendingAction({ dateISO, doseIds });
      await applySupplementAction({ dateISO, doseIds });
      return;
    }
    if (data.type === 'supplement') {
      const focusSlot = data.slotId ?? '';
      const focusDate = data.dateISO ?? '';
      const doseIds = Array.isArray(data.doseIds) ? JSON.stringify(data.doseIds) : undefined;
      router.push({ pathname: '/(tabs)/supplements', params: { focusSlot, focusDate, doseIds } });
    }
  };

  useEffect(() => {
    let isMounted = true;

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted) return;
      if (response) handleNotificationResponse(response);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      handleNotificationResponse(response);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!startISO) return;
    flushPendingActions();
  }, [startISO]);

  useEffect(() => {
    const dayMeals = completedMeals[currentDayIndex] || [];
    const hasAnyMealCompletedToday = dayMeals.length > 0;
    scheduleMealsNudgeIfNotStarted({ dateISO: getLocalDateISO(), hasAnyMealCompletedToday });
  }, [currentDayIndex]);

  return null;
}

export default function RootLayout() {
  return (
    <DefenseProgramProvider>
      <NotificationHandler />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </DefenseProgramProvider>
  );
}
