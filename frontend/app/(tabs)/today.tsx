import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Image, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDefenseProgram } from '../../src/context/DefenseProgramContext';
import { moodFromDefenseScore, MonsterMood } from '../../src/components/MonsterAvatar';
import { Card } from '../../src/components/Card';
import { useRouter, useLocalSearchParams } from 'expo-router';
import DefiAvatar from "../../src/components/DefiAvatar";

console.log("ROUTE_HIT__TODAY__MARKER_A__2026_02_28");

export default function TodayScreen() {
  const {
    currentDayPlan,
    currentDayIndex,
    startISO,
    defenseScore,
    monsterState,
    defiMood,
    defiMessage,
    mealRatio,
    supplementRatio,
    waterRatio,
    activityRatio,
    sleepRatio,
    completedMeals,
    completedSupplements,
    waterIntakeByDay,
    activityMinutesByDay,
    sleepHoursByDay,
    addWaterByDay,
    resetWaterByDay,
    addActivityByDay,
    resetActivityByDay,
    setSleepByDay,
    addSleepByDay,
    resetSleepByDay
  } = useDefenseProgram();

  const router = useRouter();
  const { focus } = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null);
  const [mealsYPosition, setMealsYPosition] = useState<number | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [waterModalOpen, setWaterModalOpen] = useState(false);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [sleepModalOpen, setSleepModalOpen] = useState(false);

  const getMonsterImage = (mood: MonsterMood) => {
    switch (mood) {
      case 'weak':
        return require('../../assets/monsters/monster-weak.png');
      case 'neutral':
        return require('../../assets/monsters/monster-neutral.png');
      case 'strong':
        return require('../../assets/monsters/monster-strong.png');
      case 'angry':
        return require('../../assets/monsters/monster-angry.png');
    }
  };

  useEffect(() => {
    if (focus === 'meals' && mealsYPosition !== null && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: mealsYPosition, animated: true });
    }
  }, [focus, mealsYPosition]);

  if (!currentDayPlan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.title}>Program Başlatılmadı</Text>
          <Text style={styles.subtitle}>Ayarlar'dan programı başlatın</Text>
          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => router.push('/settings')}
          >
            <Text style={styles.startButtonText}>Ayarlara Git</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const dayMeals = completedMeals[currentDayIndex] || [];
  const todaySupps = completedSupplements[currentDayIndex] || [];
  // Filter out any potential snack entries and deduplicate
  const safeMeals = (currentDayPlan?.meals ?? []).filter(
    (m: any) => m?.type !== "snack" && m?.slot !== "snack" && m?.label !== "Ara Öğün"
  );
  const safeMealSlots = new Set(safeMeals.map(m => m.slot));
  // Filter and deduplicate completed meals to only include safe meal slots
  const todayMeals = Array.from(new Set(dayMeals.filter(slot => safeMealSlots.has(slot))));
  const totalMeals = safeMeals.length;
  const totalSupps = currentDayPlan.supplements.length;

  const defiOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const defiScale = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0.92],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View pointerEvents="none" style={{ position:'absolute', top:10, left:10, zIndex:9999, backgroundColor:'black', paddingHorizontal:10, paddingVertical:6, borderRadius:6 }}>
        <Text style={{ color:'white', fontWeight:'800' }}>MARKER__TODAY__2026_02_28</Text>
      </View>
      <Animated.ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View
          style={{
            alignItems: "center",
            paddingTop: 8,
            paddingBottom: 0,
            marginBottom: -6,
            opacity: defiOpacity,
            transform: [{ scale: defiScale }],
          }}
        >
          <DefiAvatar size={165} />
        </Animated.View>
        {/* Defi Daily Message Card */}
        <View style={styles.defiCard}>
          <View style={styles.defiTextContainer}>
            <Text style={styles.defiTitle}>Defi'nin Bugünkü Mesajı</Text>
            <Text style={styles.defiMessage}>
              "Bugün metabolizmanı desteklemek için düzenli beslen ve her öğünden sonra kısa yürüyüşlerle kan şekerini dengele."
            </Text>
          </View>
        </View>

        {/* Today's Meal Plan Card */}
        <TouchableOpacity 
          style={styles.mealCtaCard}
          onPress={() => router.push('/menus')}
          activeOpacity={0.85}
        >
          <View style={styles.mealCtaLeft}>
            <View style={styles.mealCtaIcon}>
              <Ionicons name="restaurant" size={20} color="#10B981" />
            </View>
            <View style={styles.mealCtaText}>
              <Text style={styles.mealCtaTitle}>Bugünün Yemek Planı</Text>
              <Text style={styles.mealCtaSubtitle}>
                {todayMeals.length}/{totalMeals} öğün • {todaySupps.length}/{totalSupps} supp
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Canavar ve Savunma Skoru */}
        <TouchableOpacity
          style={styles.monsterMiniCard}
          onPress={() => router.push('/(tabs)/defense')}
          activeOpacity={0.85}
        >
          <View style={styles.monsterMiniLeft}>
            <View style={styles.monsterMiniIcon}>
              <Image
                source={getMonsterImage(moodFromDefenseScore(defenseScore))}
                style={{ width: 70, height: 70 }}
                resizeMode="contain"
              />
            </View>

            <View style={styles.monsterMiniText}>
              <Text style={styles.monsterMiniTitle}>Diyabet Canavarı</Text>
              <Text style={styles.monsterMiniSubtitle}>
                Durum: {String(monsterState).toUpperCase()}
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={22} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Warning Banner */}
        {(defenseScore < 40 || monsterState === 'angry') && (
          <TouchableOpacity
            style={styles.warningBanner}
            onPress={() => router.push('/(tabs)/defense')}
            activeOpacity={0.85}
          >
            <Ionicons name="warning" size={18} color="#D97706" style={styles.warningBannerIcon} />
            <Text style={styles.warningBannerText}>
              Dikkat: Canavar güçlendi. Programı takip et.
            </Text>
          </TouchableOpacity>
        )}

        {/* Günlük Görevler */}
        <Text style={styles.sectionTitle}>Günlük Görevler</Text>

        {/* Menüler */}
        <TouchableOpacity 
          style={styles.taskCard}
          onPress={() => router.push('/menus')}
          onLayout={(event) => {
            const { y } = event.nativeEvent.layout;
            setMealsYPosition(y);
          }}
        >
          <View style={styles.taskIcon}>
            <Ionicons name="restaurant" size={28} color="#10B981" />
          </View>
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>Menüler</Text>
            <Text style={styles.taskSubtitle}>
              {todayMeals.length} / {totalMeals} öğün tamamlandı
            </Text>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressBarFill,
                { width: `${mealRatio * 100}%` }
              ]} />
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Supplementler */}
        <TouchableOpacity 
          style={styles.taskCard}
          onPress={() => router.push('/supplements')}
        >
          <View style={styles.taskIcon}>
            <Ionicons name="medical" size={28} color="#8B5CF6" />
          </View>
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>Supplementler</Text>
            <Text style={styles.taskSubtitle}>
              {todaySupps.length} / {totalSupps} alındı
            </Text>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressBarFill,
                { width: `${supplementRatio * 100}%`, backgroundColor: '#8B5CF6' }
              ]} />
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Su */}
        <TouchableOpacity 
          style={styles.taskCard}
          onPress={() => setWaterModalOpen(true)}
        >
          <View style={styles.taskIcon}>
            <Ionicons name="water" size={28} color="#3B82F6" />
          </View>
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>Su İçme</Text>
            <Text style={styles.taskSubtitle}>
              {Math.round(waterRatio * 100)}% tamamlandı
            </Text>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressBarFill,
                { width: `${waterRatio * 100}%`, backgroundColor: '#3B82F6' }
              ]} />
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Spor/Aktivite */}
        <TouchableOpacity 
          style={styles.taskCard}
          onPress={() => setActivityModalOpen(true)}
        >
          <View style={styles.taskIcon}>
            <Ionicons name="walk" size={28} color="#F59E0B" />
          </View>
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>Aktivite</Text>
            <Text style={styles.taskSubtitle}>
              {Math.round(activityRatio * 100)}% tamamlandı
            </Text>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressBarFill,
                { width: `${activityRatio * 100}%`, backgroundColor: '#F59E0B' }
              ]} />
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Uyku */}
        <TouchableOpacity 
          style={styles.taskCard}
          onPress={() => setSleepModalOpen(true)}
        >
          <View style={styles.taskIcon}>
            <Ionicons name="moon" size={28} color="#6366F1" />
          </View>
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>Uyku</Text>
            <Text style={styles.taskSubtitle}>
              {Math.round(sleepRatio * 100)}% tamamlandı
            </Text>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressBarFill,
                { width: `${sleepRatio * 100}%`, backgroundColor: '#6366F1' }
              ]} />
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      {/* Water Modal */}
      <Modal
        visible={waterModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setWaterModalOpen(false)}
      >
        <Pressable 
          style={styles.modalBackdrop}
          onPress={() => setWaterModalOpen(false)}
        >
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Su Ekle</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => {
                  addWaterByDay(currentDayIndex, 250);
                  setWaterModalOpen(false);
                }}
              >
                <Text style={styles.quickButtonText}>+250 ml</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => {
                  addWaterByDay(currentDayIndex, 500);
                  setWaterModalOpen(false);
                }}
              >
                <Text style={styles.quickButtonText}>+500 ml</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => {
                  addWaterByDay(currentDayIndex, 750);
                  setWaterModalOpen(false);
                }}
              >
                <Text style={styles.quickButtonText}>+750 ml</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                resetWaterByDay(currentDayIndex);
                setWaterModalOpen(false);
              }}
            >
              <Text style={styles.resetButtonText}>Sıfırla</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setWaterModalOpen(false)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Activity Modal */}
      <Modal
        visible={activityModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setActivityModalOpen(false)}
      >
        <Pressable 
          style={styles.modalBackdrop}
          onPress={() => setActivityModalOpen(false)}
        >
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Aktivite Ekle</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => {
                  addActivityByDay(currentDayIndex, 10);
                  setActivityModalOpen(false);
                }}
              >
                <Text style={styles.quickButtonText}>+10 dk</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => {
                  addActivityByDay(currentDayIndex, 20);
                  setActivityModalOpen(false);
                }}
              >
                <Text style={styles.quickButtonText}>+20 dk</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => {
                  addActivityByDay(currentDayIndex, 30);
                  setActivityModalOpen(false);
                }}
              >
                <Text style={styles.quickButtonText}>+30 dk</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                resetActivityByDay(currentDayIndex);
                setActivityModalOpen(false);
              }}
            >
              <Text style={styles.resetButtonText}>Sıfırla</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setActivityModalOpen(false)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Sleep Modal */}
      <Modal
        visible={sleepModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSleepModalOpen(false)}
      >
        <Pressable 
          style={styles.modalBackdrop}
          onPress={() => setSleepModalOpen(false)}
        >
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Uyku Gir</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => {
                  setSleepByDay(currentDayIndex, 6);
                  setSleepModalOpen(false);
                }}
              >
                <Text style={styles.quickButtonText}>6s</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => {
                  setSleepByDay(currentDayIndex, 7);
                  setSleepModalOpen(false);
                }}
              >
                <Text style={styles.quickButtonText}>7s</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => {
                  setSleepByDay(currentDayIndex, 8);
                  setSleepModalOpen(false);
                }}
              >
                <Text style={styles.quickButtonText}>8s</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => {
                  addSleepByDay(currentDayIndex, 0.5);
                  setSleepModalOpen(false);
                }}
              >
                <Text style={styles.quickButtonText}>+0.5s</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => {
                  addSleepByDay(currentDayIndex, 1);
                  setSleepModalOpen(false);
                }}
              >
                <Text style={styles.quickButtonText}>+1s</Text>
              </TouchableOpacity>
              <View style={styles.quickButton} />
            </View>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                resetSleepByDay(currentDayIndex);
                setSleepModalOpen(false);
              }}
            >
              <Text style={styles.resetButtonText}>Sıfırla</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSleepModalOpen(false)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
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
    padding: 16,
    paddingBottom: 32
  },
  monsterSection: {
    alignItems: 'center'
  },
  scoreContainer: {
    width: '100%',
    marginTop: 16,
    alignItems: 'center'
  },
  scoreLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8
  },
  scoreBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden'
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 6
  },
  defiCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2
  },
  defiSection: {
    alignItems: 'center'
  },
  speechBubble: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%'
  },
  defiMessage: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20
  },
  defiSpeechMessage: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 16
  },
  monsterMiniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  monsterMiniLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  monsterMiniIcon: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  monsterMiniText: {
    flex: 1,
  },
  monsterMiniTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  monsterMiniSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  taskIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  taskContent: {
    flex: 1
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4
  },
  taskSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3
  },
  bottomSpacer: {
    height: 32
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24
  },
  startButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  mealCtaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  mealCtaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  mealCtaIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  mealCtaText: {
    flex: 1
  },
  mealCtaTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2
  },
  mealCtaSubtitle: {
    fontSize: 12,
    color: '#6B7280'
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8
  },
  warningBannerIcon: {
    marginRight: 8
  },
  warningBannerText: {
    flex: 1,
    fontSize: 13,
    color: '#92400E',
    lineHeight: 18
  },
  defiRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  defiAvatar: {
    marginRight: 12
  },
  defiTextContainer: {
    flex: 1
  },
  defiTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4
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
    marginBottom: 20
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
  }
});
