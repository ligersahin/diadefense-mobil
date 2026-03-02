import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Platform, Animated, findNodeHandle, InteractionManager } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDefenseProgram } from '../src/context/DefenseProgramContext';
import { Card } from '../src/components/Card';
import AppHeader from '../src/components/AppHeader';
import DefiBanner from '../src/components/DefiBanner';
import { supplementRules } from '../src/data/supplementRules';
import { scheduleSupplementsForToday, cancelScheduledSupplementNotifications, ensureNotificationPermissions, type MealTimes } from '../src/lib/notifications/supplementScheduler';
import { shouldShowDefi, shouldShowMessage, markMessageShown } from '../src/defi/defiVisibility';
import { getLocalDateISO } from '../src/utils/dateISO';
import { getDefiMessage } from '../src/defi/defiMessages';

export default function SupplementsScreen() {
  const router = useRouter();
  const { focusSlot, focusDate, doseIds, meal } = useLocalSearchParams();
  const { 
    currentDayPlan, 
    currentDayIndex, 
    completedSupplements, 
    toggleSupplementTaken 
  } = useDefenseProgram();
  const [mealTimes, setMealTimes] = useState<MealTimes>({
    breakfast: '08:00',
    lunch: '13:00',
    dinner: '19:00',
  });
  const [activePicker, setActivePicker] = useState<keyof MealTimes | null>(null);
  const [tempDate, setTempDate] = useState<Date>(new Date());
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [permissionMessage, setPermissionMessage] = useState<string | null>(null);
  const [defiVisible, setDefiVisible] = useState(true);
  const [defiMessage, setDefiMessage] = useState<{ title: string; body: string; detail?: string } | null>(null);
  const hasShownOnceRef = useRef(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const alreadyScrolledRef = useRef(false);
  const highlightOpacity = useRef(new Animated.Value(0)).current;
  type SlotId = 'morning' | 'noon' | 'evening';
  type DoseView = {
    id: string;
    time: string;
    dose?: string;
    slotId: SlotId;
    taken: boolean;
    context: string;
  };
  type SupplementGroup = {
    key: string;
    name: string;
    doses: DoseView[];
    primarySlot: SlotId;
  };
  const [highlightSlot, setHighlightSlot] = useState<SlotId | null>(null);
  const headerRefs = useRef<Record<SlotId, React.RefObject<View>>>({
    morning: React.createRef<View>(),
    noon: React.createRef<View>(),
    evening: React.createRef<View>(),
  });

  const focusSlotValue =
    typeof focusSlot === 'string' ? focusSlot : Array.isArray(focusSlot) ? focusSlot[0] : null;
  const focusDateValue =
    typeof focusDate === 'string' ? focusDate : Array.isArray(focusDate) ? focusDate[0] : null;
  const mealValue =
    typeof meal === 'string' ? meal : Array.isArray(meal) ? meal[0] : null;
  const normalizedFocusSlot: SlotId | null =
    focusSlotValue === 'morning' || focusSlotValue === 'noon' || focusSlotValue === 'evening'
      ? focusSlotValue
      : null;
  // TODO: focusDateValue ileride tarih bazlı filtre için kullanılacak.

  const parsedDoseIds = useMemo(() => {
    if (typeof doseIds !== 'string') return null;
    try {
      const parsed = JSON.parse(doseIds);
      if (Array.isArray(parsed) && parsed.every((id) => typeof id === 'string')) {
        return parsed;
      }
    } catch {
      // TODO: doseIds parse edilemezse sessizce yoksay.
    }
    return null;
  }, [doseIds]);

  const slotFromMealParam = useMemo((): SlotId | null => {
    if (mealValue !== 'breakfast' && mealValue !== 'lunch' && mealValue !== 'dinner') return null;
    const timeBase = mealTimes[mealValue];
    if (!timeBase) return null;
    const [hh] = timeBase.split(':').map((v) => parseInt(v, 10));
    if (Number.isNaN(hh)) return 'noon';
    if (hh < 11) return 'morning';
    if (hh <= 16) return 'noon';
    return 'evening';
  }, [mealValue, mealTimes]);

  const todayISO = useMemo(() => getLocalDateISO(), []);

  const baseDefiMessage = useMemo(
    () =>
      defiVisible
        ? getDefiMessage({
            screen: 'supplements',
            focusSlot: normalizedFocusSlot,
            highlightedDoseIds: parsedDoseIds ?? null,
          })
        : null,
    [defiVisible, normalizedFocusSlot, parsedDoseIds]
  );

  useEffect(() => {
    let mounted = true;
    shouldShowDefi(todayISO, 'supplements').then((show) => {
      if (mounted) setDefiVisible(show);
    });
    return () => {
      mounted = false;
    };
  }, [todayISO]);

  useEffect(() => {
    let active = true;
    if (!baseDefiMessage) {
      setDefiMessage(null);
      return () => {
        active = false;
      };
    }
    if (!hasShownOnceRef.current) {
      setDefiMessage(baseDefiMessage);
      void markMessageShown('supplements', baseDefiMessage.body);
      hasShownOnceRef.current = true;
      return () => {
        active = false;
      };
    }
    (async () => {
      const shouldShow = await shouldShowMessage('supplements', baseDefiMessage.body);
      if (!active) return;
      if (!shouldShow) {
        setDefiMessage(null);
        return;
      }
      setDefiMessage(baseDefiMessage);
      await markMessageShown('supplements', baseDefiMessage.body);
    })();
    return () => {
      active = false;
    };
  }, [baseDefiMessage]);

  useEffect(() => {
    const loadMealTimes = async () => {
      const stored = await AsyncStorage.getItem('meal_times_v1');
      if (!stored) return;
      try {
        const parsed = JSON.parse(stored) as MealTimes;
        setMealTimes((prev) => ({ ...prev, ...parsed }));
      } catch {
        // TODO: Depoda beklenmedik veri varsa sessizce yoksay.
      }
    };
    loadMealTimes();
  }, []);

  const handleOpenPlan = () => {
    router.push('/defense');
  };

  const handleScrollToSlot = () => {
    const slot = normalizedFocusSlot;
    if (!slot) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      return;
    }
    const targetRef = headerRefs.current[slot];
    if (!targetRef?.current || !scrollViewRef.current) return;
    const scrollNodeHandle = findNodeHandle(scrollViewRef.current);
    if (!scrollNodeHandle) return;
    targetRef.current.measureLayout(
      scrollNodeHandle,
      (_x, y) => {
        scrollViewRef.current?.scrollTo({ y: Math.max(0, y - 12), animated: true });
      },
      () => {
        // TODO: Ölçüm başarısızsa sessizce yoksay.
      }
    );
  };

  useEffect(() => {
    AsyncStorage.setItem('meal_times_v1', JSON.stringify(mealTimes));
  }, [mealTimes]);

  if (!currentDayPlan) {
    return (
      <View style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.emptyText}>Program başlatılmadı</Text>
        </View>
      </View>
    );
  }

  const todaySupps = completedSupplements[currentDayIndex] || [];

  const handleToggleSupplement = (id: string) => {
    toggleSupplementTaken(currentDayIndex, id);
  };

  const parseTimeToDate = useCallback((time: string) => {
    const [hh, mm] = time.split(':').map((value) => parseInt(value, 10));
    const date = new Date();
    date.setHours(Number.isNaN(hh) ? 0 : hh, Number.isNaN(mm) ? 0 : mm, 0, 0);
    return date;
  }, []);

  const formatTime = useCallback((date: Date) => {
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }, []);

  const computeSlotId = useCallback((timeHHMM: string): SlotId => {
    const [hh] = timeHHMM.split(':').map((value) => parseInt(value, 10));
    if (Number.isNaN(hh)) return 'noon';
    if (hh < 11) return 'morning';
    if (hh <= 16) return 'noon';
    return 'evening';
  }, []);

  const updateMealTime = (key: keyof MealTimes, date?: Date) => {
    if (!date) {
      setActivePicker(null);
      return;
    }
    setMealTimes((prev) => ({ ...prev, [key]: formatTime(date) }));
    setActivePicker(null);
  };

  const openPicker = (key: keyof MealTimes) => {
    setTempDate(parseTimeToDate(mealTimes[key]));
    setActivePicker(key);
  };

  const handlePickerChange = (_event: any, date?: Date) => {
    if (date) setTempDate(date);
  };

  const handlePickerCancel = () => {
    setActivePicker(null);
  };

  const handlePickerDone = () => {
    if (!activePicker) return;
    updateMealTime(activePicker, tempDate);
  };

  const handleSchedule = async () => {
    setStatusMessage(null);
    try {
      if (
        typeof Notifications.scheduleNotificationAsync !== 'function' ||
        typeof Notifications.getPermissionsAsync !== 'function'
      ) {
        setPermissionMessage('Bildirim modülü hazır değil. iOS için dev client rebuild gerekir.');
        return;
      }
      const hasPermission = await ensureNotificationPermissions();
      if (!hasPermission) {
        setPermissionMessage('Bildirim izni gerekli');
        return;
      }
      setPermissionMessage(null);
      await cancelScheduledSupplementNotifications();
      await scheduleSupplementsForToday(mealTimes);
      setStatusMessage('Bugün için hatırlatmalar kuruldu ✅');
    } catch (e: any) {
      console.error('Schedule error', e);
      setPermissionMessage(null);
      setPermissionMessage(`Bildirim hatası: ${e?.message ?? String(e)}`);
    }
  };

  const supplementItems = useMemo(
    () =>
      supplementRules.flatMap((rule) => {
        const timeBase = mealTimes[rule.meal];
        if (!timeBase) return [];
        const base = parseTimeToDate(timeBase);
        base.setMinutes(base.getMinutes() + rule.offsetMinutes);
        const timeHHMM = formatTime(base);
        const slotId = computeSlotId(timeHHMM);
        return rule.items.map((item, itemIndex) => ({
          id: `${rule.id}_${itemIndex}`,
          time: timeHHMM,
          name: item.name,
          dose: item.dose,
          slotId,
          context: rule.title,
        }));
      }),
    [supplementRules, mealTimes, parseTimeToDate, formatTime, computeSlotId]
  );

  const supplementGroups = useMemo(() => {
    const groups = new Map<string, SupplementGroup>();

    supplementItems.forEach((item) => {
      const key = item.name.trim().toLowerCase();
      const displayName = item.name.trim().replace(/\s+/g, ' ');
      const existing = groups.get(key);
      const doseView: DoseView = {
        id: item.id,
        time: item.time,
        dose: item.dose,
        slotId: item.slotId,
        taken: todaySupps.includes(item.id),
        context: item.context,
      };

      if (!existing) {
        groups.set(key, {
          key,
          name: displayName,
          doses: [doseView],
          primarySlot: item.slotId,
        });
        return;
      }

      existing.doses.push(doseView);
    });

    const result = Array.from(groups.values()).map((group) => {
      group.doses.sort((a, b) => a.time.localeCompare(b.time));
      const primary = group.doses[0];
      return { ...group, primarySlot: primary.slotId };
    });
    result.sort((a, b) => a.doses[0].time.localeCompare(b.doses[0].time));
    return result;
  }, [supplementItems, todaySupps]);

  const slotFromDoseIds = useMemo(() => {
    if (!parsedDoseIds?.length) return null;
    for (const group of supplementGroups) {
      for (const dose of group.doses) {
        if (parsedDoseIds.includes(dose.id)) {
          return dose.slotId;
        }
      }
    }
    return null;
  }, [parsedDoseIds, supplementGroups]);

  useEffect(() => {
    const slotForScroll = slotFromDoseIds ?? slotFromMealParam ?? normalizedFocusSlot;
    if (!slotForScroll) return;
    if (alreadyScrolledRef.current) return;
    const availableSlots = new Set(
      supplementGroups.flatMap((group) => group.doses.map((dose) => dose.slotId))
    );
    if (!availableSlots.has(slotForScroll)) return;

    alreadyScrolledRef.current = true;
    setHighlightSlot(slotForScroll);
    highlightOpacity.setValue(1);
    Animated.timing(highlightOpacity, {
      toValue: 0,
      duration: 2500,
      useNativeDriver: true,
    }).start(() => {
      setHighlightSlot(null);
    });

    const task = InteractionManager.runAfterInteractions(() => {
      const targetRef = headerRefs.current[slotForScroll];
      if (!targetRef?.current || !scrollViewRef.current) return;
      const scrollNodeHandle = findNodeHandle(scrollViewRef.current);
      if (!scrollNodeHandle) return;
      targetRef.current.measureLayout(
        scrollNodeHandle,
        (_x, y) => {
          scrollViewRef.current?.scrollTo({ y: Math.max(0, y - 12), animated: true });
        },
        () => {
          // TODO: Ölçüm başarısızsa sessizce yoksay.
        }
      );
    });

    return () => task.cancel();
  }, [normalizedFocusSlot, slotFromDoseIds, slotFromMealParam, supplementGroups]);


  return (
    <View style={styles.container}>
      <AppHeader title="Supplementler" subtitle={`Gün ${currentDayIndex}`} />
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.defiWrap}>
          <DefiBanner
            message={defiMessage}
            onOpenPlan={handleOpenPlan}
            todayISO={todayISO}
            onHidden={() => setDefiVisible(false)}
            screenId="supplements"
            variant="card"
          />
        </View>

        <Card style={styles.mealTimesCard}>
          <Text style={styles.mealTimesTitle}>Öğün Saatleri</Text>
          <Text style={styles.mealTimesSubtitle}>Öğün saatlerinizi girerseniz takviye alım saatleriniz buna göre hesaplanacaktır.</Text>
          <View style={styles.mealRow}>
            <Text style={styles.mealLabel}>Kahvaltı</Text>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => openPicker('breakfast')}
            >
              <Text style={styles.timeButtonText}>{mealTimes.breakfast}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mealRow}>
            <Text style={styles.mealLabel}>Öğle</Text>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => openPicker('lunch')}
            >
              <Text style={styles.timeButtonText}>{mealTimes.lunch}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mealRow}>
            <Text style={styles.mealLabel}>Akşam</Text>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => openPicker('dinner')}
            >
              <Text style={styles.timeButtonText}>{mealTimes.dinner}</Text>
            </TouchableOpacity>
          </View>
          {activePicker && (
            <Modal transparent animationType="fade" visible onRequestClose={handlePickerCancel}>
              <View style={styles.pickerOverlay}>
                <View style={styles.pickerCard}>
                  <Text style={styles.pickerTitle}>Saat seç</Text>
                  <DateTimePicker
                    value={tempDate}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handlePickerChange}
                  />
                  <View style={styles.pickerActions}>
                    <TouchableOpacity style={styles.pickerButton} onPress={handlePickerCancel}>
                      <Text style={styles.pickerButtonText}>İptal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.pickerButtonPrimary} onPress={handlePickerDone}>
                      <Text style={styles.pickerButtonPrimaryText}>Tamam</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
          <TouchableOpacity style={styles.scheduleButton} onPress={handleSchedule}>
            <Text style={styles.scheduleButtonText}>Hatırlatmaları oluştur</Text>
          </TouchableOpacity>
          {!!permissionMessage && (
            <Text style={styles.warningText}>{permissionMessage}</Text>
          )}
          {!!statusMessage && (
            <Text style={styles.successText}>{statusMessage}</Text>
          )}
        </Card>

        {supplementGroups.map((group) => (
          <Card key={group.key} style={styles.suppCardWrap}>
            <View style={styles.suppCard}>
              <View style={styles.suppHeader}>
                <View style={styles.suppInfo}>
                  <View style={styles.suppIcon}>
                    <Ionicons name="medical" size={24} color="#6B7280" />
                  </View>
                  <View style={styles.suppDetails}>
                    <Text style={styles.suppName}>{group.name}</Text>
                  </View>
                </View>
              </View>
              {group.doses.map((dose) => (
                <View key={dose.id} style={styles.doseRow}>
                  {(parsedDoseIds ? parsedDoseIds.includes(dose.id) : highlightSlot === dose.slotId) && (
                    <Animated.View
                      pointerEvents="none"
                      style={[styles.doseRowHighlight, { opacity: highlightOpacity }]}
                    />
                  )}
                  <TouchableOpacity
                    style={styles.doseRowContent}
                    onPress={() => handleToggleSupplement(dose.id)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.doseTimeBlock}>
                      <Text style={styles.doseTime}>{dose.time}</Text>
                      <Text style={styles.doseContext} numberOfLines={1}>{dose.context}</Text>
                    </View>
                    {dose.dose ? (
                      <Text style={styles.doseText}>{dose.dose}</Text>
                    ) : null}
                    <View style={[styles.checkbox, dose.taken && styles.checkboxTaken]}>
                      {dose.taken && (
                        <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Card>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8'
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingTop: 18,
    paddingBottom: 120,
    paddingHorizontal: 20
  },
  defiWrap: {
    marginBottom: 12,
  },
  mealTimesCard: {
    marginTop: 4,
    marginBottom: 12
  },
  mealTimesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4
  },
  mealTimesSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 10,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  mealLabel: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600'
  },
  timeButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8
  },
  timeButtonText: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600'
  },
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pickerCard: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8
  },
  pickerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12
  },
  pickerButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8
  },
  pickerButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600'
  },
  pickerButtonPrimary: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#10B981',
    borderRadius: 8
  },
  pickerButtonPrimaryText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700'
  },
  scheduleButton: {
    marginTop: 8,
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center'
  },
  scheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700'
  },
  warningText: {
    marginTop: 8,
    fontSize: 12,
    color: '#B45309'
  },
  successText: {
    marginTop: 8,
    fontSize: 12,
    color: '#047857'
  },
  sectionHeader: {
    marginTop: 8,
    marginBottom: 6
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A'
  },
  suppCardWrap: {
    marginBottom: 10,
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
  doseRow: {
    position: 'relative',
    marginTop: 8,
    borderRadius: 12
  },
  doseRowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  doseRowHighlight: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)'
  },
  doseTimeBlock: {
    flex: 1,
    marginRight: 8,
  },
  doseTime: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
  },
  doseContext: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  doseText: {
    fontSize: 13,
    color: '#1F2937',
    marginRight: 8,
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
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxTaken: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6'
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
