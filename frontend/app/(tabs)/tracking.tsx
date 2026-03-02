import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDefenseProgram } from '../../src/context/DefenseProgramContext';
import { Card } from '../../src/components/Card';
import { parseISO, format, addDays } from 'date-fns';

export default function TrackingScreen() {
  const {
    currentDayIndex,
    startISO,
    program,
    waterIntakeByDay,
    activityMinutesByDay,
    sleepHoursByDay,
    glucoseByDay,
    weightByDay,
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
    resetWeightByDay
  } = useDefenseProgram();

  const [selectedDay, setSelectedDay] = useState(currentDayIndex || 1);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [weightInput, setWeightInput] = useState('');

  // Get day plan for selected day
  const selectedDayPlan = useMemo(() => {
    return program.find(p => p.dayIndex === selectedDay) || program[0] || null;
  }, [program, selectedDay]);

  // Get date for selected day
  const getDayDate = (dayIndex: number) => {
    if (!startISO) return null;
    const start = parseISO(startISO);
    const dayDate = addDays(start, dayIndex - 1);
    return format(dayDate, 'dd.MM.yyyy');
  };

  // Get day color based on state
  const getDayColor = (score: number) => {
    if (score >= 70) return '#D1FAE5';
    if (score >= 40) return '#FEF3C7';
    if (score > 0) return '#FEE2E2';
    return '#F3F4F6';
  };

  // Get last 14 days data
  const getLast14Days = () => {
    const days = [];
    const startDay = Math.max(1, (currentDayIndex || 1) - 13);
    const endDay = currentDayIndex || 1;

    for (let day = startDay; day <= endDay; day++) {
      const waterMl = waterIntakeByDay?.[day] || 0;
      const activityMin = activityMinutesByDay?.[day] || 0;
      const sleepH = sleepHoursByDay?.[day] || 0;
      const dayPlan = program.find(p => p.dayIndex === day) || program[0] || null;
      
      let avgScore = 0;
      if (dayPlan) {
        const waterLiters = waterMl / 1000;
        const targetWater = dayPlan.defenseTargets.waterLiters;
        const waterRatio = Math.min(waterLiters / targetWater, 1);
        
        const targetSteps = dayPlan.defenseTargets.steps;
        const estimatedSteps = Math.min(activityMin * 100, targetSteps);
        const activityRatio = Math.min(estimatedSteps / targetSteps, 1);
        
        const targetSleep = dayPlan.defenseTargets.sleepHours;
        const sleepRatio = Math.min(sleepH / targetSleep, 1);
        
        avgScore = ((waterRatio + activityRatio + sleepRatio) / 3) * 100;
      }
      
      days.push({
        index: day,
        dayNumber: day,
        dayIndex: day,
        score: Math.round(avgScore),
        state: Math.round(avgScore),
        isToday: day === (currentDayIndex || 1),
        isFuture: day > (currentDayIndex || 1),
        date: getDayDate(day)
      });
    }
    return days;
  };

  const last14Days = getLast14Days();
  const canGoNext = selectedDay < (currentDayIndex || 1);
  const canGoPrev = selectedDay > 1;

  // Get current day values
  const currentWater = waterIntakeByDay?.[selectedDay] || 0;
  const currentActivity = activityMinutesByDay?.[selectedDay] || 0;
  const currentSleep = sleepHoursByDay?.[selectedDay] || 0;
  const currentGlucose = glucoseByDay?.[selectedDay];
  const currentWeight = weightByDay?.[selectedDay];
  const lastWeight = weightByDay?.[selectedDay - 1] || weightByDay?.[selectedDay - 2] || null;

  const openMetricModal = (key: string) => {
    setActiveModal(key);
  };

  // Metric boxes data
  const metrics = [
    {
      key: 'water',
      disabled: false,
      content: (
        <>
          <View style={[styles.metricIcon, { backgroundColor: '#DBEAFE' }]}>
            <Ionicons name="water" size={24} color="#3B82F6" />
          </View>
          <Text style={styles.metricLabel}>Su</Text>
          <Text style={styles.metricValue}>{currentWater > 0 ? `${currentWater} ml` : '—'}</Text>
          <Text style={styles.metricHelper}>Günlük hedef</Text>
        </>
      )
    },
    {
      key: 'activity',
      disabled: false,
      content: (
        <>
          <View style={[styles.metricIcon, { backgroundColor: '#FEF3C7' }]}>
            <Ionicons name="walk" size={24} color="#F59E0B" />
          </View>
          <Text style={styles.metricLabel}>Aktivite</Text>
          <Text style={styles.metricValue}>{currentActivity > 0 ? `${currentActivity} dk` : '—'}</Text>
          <Text style={styles.metricHelper}>Dakika</Text>
        </>
      )
    },
    {
      key: 'sleep',
      disabled: false,
      content: (
        <>
          <View style={[styles.metricIcon, { backgroundColor: '#EDE9FE' }]}>
            <Ionicons name="moon" size={24} color="#6366F1" />
          </View>
          <Text style={styles.metricLabel}>Uyku</Text>
          <Text style={styles.metricValue}>{currentSleep > 0 ? `${currentSleep.toFixed(1)}s` : '—'}</Text>
          <Text style={styles.metricHelper}>Saat</Text>
        </>
      )
    },
    {
      key: 'glucose',
      disabled: false,
      content: (
        <>
          <View style={[styles.metricIcon, { backgroundColor: '#FEE2E2' }]}>
            <Ionicons name="fitness" size={24} color="#EF4444" />
          </View>
          <Text style={styles.metricLabel}>Kan Şekeri</Text>
          <Text style={styles.metricValue}>{currentGlucose ? `${currentGlucose} mg/dL` : '—'}</Text>
          <Text style={styles.metricHelper}>mg/dL</Text>
        </>
      )
    },
    {
      key: 'weight',
      disabled: false,
      content: (
        <>
          <View style={[styles.metricIcon, { backgroundColor: '#EDE9FE' }]}>
            <Ionicons name="scale" size={24} color="#8B5CF6" />
          </View>
          <Text style={styles.metricLabel}>Kilo</Text>
          <Text style={styles.metricValue}>{currentWeight ? `${currentWeight.toFixed(1)} kg` : '—'}</Text>
          <Text style={styles.metricHelper}>kg</Text>
        </>
      )
    },
    {
      key: 'coming',
      disabled: true,
      content: (
        <>
          <View style={[styles.metricIcon, { backgroundColor: '#F3F4F6' }]}>
            <Ionicons name="time" size={24} color="#9CA3AF" />
          </View>
          <Text style={styles.metricLabel}>Yakında</Text>
          <Text style={styles.metricValue}></Text>
        </>
      )
    }
  ];

  const handleReset = (metricId: string) => {
    Alert.alert(
      'Sıfırla',
      'Bu değeri sıfırlamak istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sıfırla',
          style: 'destructive',
          onPress: () => {
            if (metricId === 'water') resetWaterByDay(selectedDay);
            else if (metricId === 'activity') resetActivityByDay(selectedDay);
            else if (metricId === 'sleep') resetSleepByDay(selectedDay);
            else if (metricId === 'glucose') resetGlucoseByDay(selectedDay);
            else if (metricId === 'weight') resetWeightByDay(selectedDay);
            setActiveModal(null);
          }
        }
      ]
    );
  };

  const handleWeightPreset = (delta: number) => {
    if (lastWeight !== null) {
      setWeightByDay(selectedDay, lastWeight + delta);
    } else {
      setWeightInput('');
      setActiveModal('weight-input');
      return;
    }
    setActiveModal(null);
  };

  const handleWeightSubmit = () => {
    const value = parseFloat(weightInput);
    if (!isNaN(value) && value > 0) {
      setWeightByDay(selectedDay, value);
      setWeightInput('');
      setActiveModal(null);
    } else {
      Alert.alert('Hata', 'Lütfen geçerli bir kilo değeri girin');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Day Selector */}
        <Card style={styles.daySelectorCard}>
          <View style={styles.daySelector}>
            <TouchableOpacity
              style={[styles.dayNavButton, !canGoPrev && styles.dayNavButtonDisabled]}
              onPress={() => canGoPrev && setSelectedDay(selectedDay - 1)}
              disabled={!canGoPrev}
            >
              <Ionicons 
                name="chevron-back" 
                size={24} 
                color={canGoPrev ? '#1F2937' : '#9CA3AF'} 
              />
            </TouchableOpacity>
            
            <View style={styles.daySelectorCenter}>
              <Text style={styles.daySelectorText}>
                Gün {selectedDay}
              </Text>
              {getDayDate(selectedDay) && (
                <Text style={styles.daySelectorDate}>
                  {getDayDate(selectedDay)}
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.dayNavButton, !canGoNext && styles.dayNavButtonDisabled]}
              onPress={() => canGoNext && setSelectedDay(selectedDay + 1)}
              disabled={!canGoNext}
            >
              <Ionicons 
                name="chevron-forward" 
                size={24} 
                color={canGoNext ? '#1F2937' : '#9CA3AF'} 
              />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Metrics Grid */}
        <View style={styles.grid}>
          {metrics.map((item) => (
            <Pressable
              key={item.key}
              style={[
                styles.metricCard,
                item.disabled && styles.metricCardDisabled,
              ]}
              onPress={() => !item.disabled && openMetricModal(item.key)}
            >
              {item.content}
            </Pressable>
          ))}
        </View>

        {/* Son 14 Gün */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Son 14 Gün</Text>
        </View>
        <View style={styles.calendarGrid}>
          {last14Days.map((day) => (
            <TouchableOpacity
              key={day.index}
              style={[
                styles.dayCell,
                { backgroundColor: getDayColor(day.state) },
                day.isToday && styles.todayBorder,
                day.dayIndex === selectedDay && styles.dayCellSelected
              ]}
              onPress={() => setSelectedDay(day.dayIndex)}
              disabled={day.isFuture}
            >
              <Text style={[
                styles.dayNumber,
                day.isFuture && styles.dayNumberDisabled,
                day.dayIndex === selectedDay && styles.dayNumberSelected
              ]}>
                {day.dayNumber}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Water Modal */}
      <Modal visible={activeModal === 'water'} transparent animationType="fade" onRequestClose={() => setActiveModal(null)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setActiveModal(null)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Su Ekle</Text>
            <View style={styles.modalButtons}>
              {[250, 500, 750].map((ml) => (
                <TouchableOpacity
                  key={ml}
                  style={styles.quickButton}
                  onPress={() => {
                    addWaterByDay(selectedDay, ml);
                    setActiveModal(null);
                  }}
                >
                  <Text style={styles.quickButtonText}>+{ml} ml</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.resetButton} onPress={() => handleReset('water')}>
              <Text style={styles.resetButtonText}>Sıfırla</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setActiveModal(null)}>
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Activity Modal */}
      <Modal visible={activeModal === 'activity'} transparent animationType="fade" onRequestClose={() => setActiveModal(null)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setActiveModal(null)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Aktivite Ekle</Text>
            <View style={styles.modalButtons}>
              {[10, 20, 30].map((min) => (
                <TouchableOpacity
                  key={min}
                  style={styles.quickButton}
                  onPress={() => {
                    addActivityByDay(selectedDay, min);
                    setActiveModal(null);
                  }}
                >
                  <Text style={styles.quickButtonText}>+{min} dk</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.resetButton} onPress={() => handleReset('activity')}>
              <Text style={styles.resetButtonText}>Sıfırla</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setActiveModal(null)}>
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Sleep Modal */}
      <Modal visible={activeModal === 'sleep'} transparent animationType="fade" onRequestClose={() => setActiveModal(null)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setActiveModal(null)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Uyku Gir</Text>
            <View style={styles.modalButtons}>
              {[6, 7, 8].map((hours) => (
                <TouchableOpacity
                  key={hours}
                  style={styles.quickButton}
                  onPress={() => {
                    setSleepByDay(selectedDay, hours);
                    setActiveModal(null);
                  }}
                >
                  <Text style={styles.quickButtonText}>{hours}s</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => {
                  addSleepByDay(selectedDay, 0.5);
                  setActiveModal(null);
                }}
              >
                <Text style={styles.quickButtonText}>+0.5s</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => {
                  addSleepByDay(selectedDay, 1);
                  setActiveModal(null);
                }}
              >
                <Text style={styles.quickButtonText}>+1s</Text>
              </TouchableOpacity>
              <View style={styles.quickButton} />
            </View>
            <TouchableOpacity style={styles.resetButton} onPress={() => handleReset('sleep')}>
              <Text style={styles.resetButtonText}>Sıfırla</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setActiveModal(null)}>
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Glucose Modal */}
      <Modal visible={activeModal === 'glucose'} transparent animationType="fade" onRequestClose={() => setActiveModal(null)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setActiveModal(null)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Kan Şekeri Gir</Text>
            <View style={styles.modalButtons}>
              {[90, 110, 140].map((mgdl) => (
                <TouchableOpacity
                  key={mgdl}
                  style={styles.quickButton}
                  onPress={() => {
                    setGlucoseByDay(selectedDay, mgdl);
                    setActiveModal(null);
                  }}
                >
                  <Text style={styles.quickButtonText}>{mgdl} mg/dL</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.resetButton} onPress={() => handleReset('glucose')}>
              <Text style={styles.resetButtonText}>Sıfırla</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setActiveModal(null)}>
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Weight Modal */}
      <Modal visible={activeModal === 'weight'} transparent animationType="fade" onRequestClose={() => setActiveModal(null)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setActiveModal(null)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Kilo Gir</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => handleWeightPreset(-0.5)}
              >
                <Text style={styles.quickButtonText}>-0.5 kg</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => handleWeightPreset(-0.2)}
              >
                <Text style={styles.quickButtonText}>-0.2 kg</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => handleWeightPreset(0.2)}
              >
                <Text style={styles.quickButtonText}>+0.2 kg</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.resetButton} onPress={() => handleReset('weight')}>
              <Text style={styles.resetButtonText}>Sıfırla</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setActiveModal(null)}>
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Weight Input Modal */}
      <Modal visible={activeModal === 'weight-input'} transparent animationType="fade" onRequestClose={() => setActiveModal(null)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setActiveModal(null)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Kilo Gir</Text>
            <TextInput
              style={styles.weightInput}
              value={weightInput}
              onChangeText={setWeightInput}
              keyboardType="decimal-pad"
              placeholder="Kilo (kg)"
              autoFocus
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleWeightSubmit}>
              <Text style={styles.submitButtonText}>Kaydet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setActiveModal(null)}>
              <Text style={styles.closeButtonText}>İptal</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    padding: 16
  },
  daySelectorCard: {
    marginBottom: 16
  },
  daySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dayNavButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6'
  },
  dayNavButtonDisabled: {
    opacity: 0.5
  },
  daySelectorCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  daySelectorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4
  },
  daySelectorDate: {
    fontSize: 14,
    color: '#6B7280'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  metricCardDisabled: {
    backgroundColor: '#F2F2F2',
    opacity: 0.6,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2
  },
  metricHelper: {
    fontSize: 12,
    color: '#6B7280'
  },
  sectionHeader: {
    marginTop: 8,
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937'
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4
  },
  dayCell: {
    width: '13%',
    aspectRatio: 1,
    minWidth: 40,
    maxWidth: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  dayCellSelected: {
    borderColor: '#10B981',
    borderWidth: 3
  },
  todayBorder: {
    borderColor: '#3B82F6',
    borderWidth: 2
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937'
  },
  dayNumberDisabled: {
    color: '#9CA3AF',
    opacity: 0.5
  },
  dayNumberSelected: {
    color: '#10B981',
    fontWeight: 'bold'
  },
  bottomSpacer: {
    height: 32
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  quickButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4
  },
  quickButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937'
  },
  resetButton: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626'
  },
  closeButton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280'
  },
  weightInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16
  },
  submitButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF'
  }
});
