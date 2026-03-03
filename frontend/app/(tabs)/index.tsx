import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Image, Modal, Pressable, TextInput, findNodeHandle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDefenseProgram } from '../../src/context/DefenseProgramContext';
import { moodFromDefenseScore, MonsterMood } from '../../src/components/MonsterAvatar';
import { Card } from '../../src/components/Card';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import DefiAvatar from "../../src/components/DefiAvatar";
import DefiBanner from '../../src/components/DefiBanner';
import { Theme } from '../../src/config/theme';
import AppHeader from '../../src/components/AppHeader';
import { getLocalDateISO } from '../../src/utils/dateISO';
import { getRecipeImage } from '../../src/assets/recipeImages';
import { MENUS } from '../../src/data/menus';
import { getMetabolicFocus } from '../../src/data/metabolicFocus';

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
  const navigation = useNavigation();
  const { focus } = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null);
  type SectionKey = 'meals' | 'supplements' | 'water' | 'activity';
  type SectionRef = React.RefObject<React.ElementRef<typeof View> | null>;
  const sectionRefs = useRef<Record<SectionKey, SectionRef>>({
    meals: React.createRef<React.ElementRef<typeof View>>(),
    supplements: React.createRef<React.ElementRef<typeof View>>(),
    water: React.createRef<React.ElementRef<typeof View>>(),
    activity: React.createRef<React.ElementRef<typeof View>>(),
  });
  const lastHandledFocusRef = useRef<string | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [waterModalOpen, setWaterModalOpen] = useState(false);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [sleepModalOpen, setSleepModalOpen] = useState(false);
  const [waterInput, setWaterInput] = useState('');
  const [activityInput, setActivityInput] = useState('');
  const [sleepInput, setSleepInput] = useState('');

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

  const focusValue =
    typeof focus === "string" ? focus : Array.isArray(focus) ? focus[0] : null;
  const normalizedFocus = focusValue === 'steps' ? 'activity' : focusValue;

  useEffect(() => {
    if (!normalizedFocus) return;
    if (lastHandledFocusRef.current === normalizedFocus) return;

    const targetRef = (sectionRefs.current as Record<string, SectionRef>)[normalizedFocus];
    if (!targetRef?.current) return;

    const timeout = setTimeout(() => {
      try {
        const scrollNodeHandle = scrollViewRef.current ? findNodeHandle(scrollViewRef.current) : null;
        if (!scrollNodeHandle) return;

        targetRef.current?.measureLayout(
          scrollNodeHandle,
          (_x: number, y: number) => {
            scrollViewRef.current?.scrollTo({ y, animated: true });
            lastHandledFocusRef.current = normalizedFocus;
          },
          () => {
            // TODO: ölçüm başarısız olduğunda sessizce yoksay.
          }
        );
      } catch {
        // TODO: measureLayout başarısızsa sessizce yoksay.
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [normalizedFocus]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      if (navigation.isFocused()) {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }
    });

    return unsubscribe;
  }, [navigation]);

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
  const totalSupps = currentDayPlan?.supplements?.length || 0;
  const todayISO = useMemo(() => getLocalDateISO(), []);
  const defiBannerMessage = useMemo(() => defiMessage ? { title: 'Defi', body: defiMessage } : null, [defiMessage]);
  const dayMenu = MENUS.find((m) => m.day === currentDayIndex) || MENUS[0];
  const dayHeroSource = getRecipeImage((dayMenu as { heroImageKey?: string | null }).heroImageKey);

  return (
    <View style={styles.container}>
      <AppHeader title="Bugün" subtitle="Günün görevleri ve takibi" />
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
        {/* Defi Hero Card */}
        <View style={styles.defiHeroCard}>
          <View style={styles.defiHeroRow}>
            <View style={styles.defiHeroAvatarWrap}>
              <DefiAvatar size={120} />
            </View>
            <View style={styles.defiHeroMessageWrap}>
              <DefiBanner
                message={defiBannerMessage}
                screenId="today"
                enableTypewriter={true}
                enableIdleReplay={false}
                todayISO={todayISO}
                onOpenPlan={() => router.push('/(tabs)/defense')}
                onHidden={() => {}}
                variant="plain"
              />
            </View>
          </View>
        </View>

        {/* Metabolik Durum */}
        {(() => {
          const day = currentDayIndex ?? 1;
          const mf = getMetabolicFocus(day);
          return (
            <View style={styles.metabolismCard}>
              <Text style={styles.metabolismCardTitle}>Metabolik Durum</Text>
              <Text style={styles.metabolismCardSubtitle}>{mf.headline}</Text>
              <Text style={styles.metabolismCardBody}>{mf.description}</Text>
              <Text style={styles.metabolismCardDefense}>🛡 Savunma Odağı: {mf.defenseFocus}</Text>
            </View>
          );
        })()}

        {/* Today's Meal Plan Card */}
        <TouchableOpacity 
            style={styles.mealCtaCard}
            onPress={() => router.push('/(tabs)/menus')}
          activeOpacity={0.85}
        >
          <View style={styles.mealCtaLeft}>
            {dayHeroSource ? (
              <View style={styles.mealCtaHeroWrap}>
                <Image source={dayHeroSource} style={styles.mealCtaHero} resizeMode="cover" />
              </View>
            ) : (
              <View style={styles.sharedIconChip}>
                <Ionicons name="restaurant" size={20} color="#10B981" />
              </View>
            )}
            <View style={styles.mealCtaText}>
              <Text style={styles.mealCtaTitle}>Bugünün Yemek Planı</Text>
              <Text style={styles.mealCtaSubtitle}>
                {todayMeals.length}/{totalMeals} öğün • {todaySupps.length}/{totalSupps} takviye
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
                style={{ width: 36, height: 36 }}
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

        {/* Günlük Görevler */}
        <Text style={styles.sectionTitle}>Günlük Görevler</Text>

        {/* Menüler */}
        <View ref={sectionRefs.current.meals}>
          <TouchableOpacity
            style={styles.taskCard}
            onPress={() => router.push('/(tabs)/menus')}
          >
            <View style={styles.sharedIconChip}>
              <Ionicons name="restaurant" size={20} color="#10B981" />
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
        </View>

        {/* Supplementler */}
        <View ref={sectionRefs.current.supplements}>
          <TouchableOpacity
            style={styles.taskCard}
            onPress={() => router.push('/(tabs)/supplements')}
          >
            <View style={styles.sharedIconChip}>
              <Ionicons name="medical" size={20} color="#8B5CF6" />
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
        </View>

        {/* Su */}
        <View ref={sectionRefs.current.water}>
          <TouchableOpacity 
            style={styles.taskCard}
            onPress={() => setWaterModalOpen(true)}
          >
            <View style={styles.sharedIconChip}>
              <Ionicons name="water" size={20} color="#3B82F6" />
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
        </View>

        {/* Spor/Aktivite */}
        <View ref={sectionRefs.current.activity}>
          <TouchableOpacity
            style={styles.taskCard}
            onPress={() => setActivityModalOpen(true)}
          >
            <View style={styles.sharedIconChip}>
              <Ionicons name="walk" size={20} color="#F59E0B" />
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
        </View>

        {/* Uyku */}
        <TouchableOpacity 
          style={styles.taskCard}
          onPress={() => setSleepModalOpen(true)}
        >
          <View style={styles.sharedIconChip}>
            <Ionicons name="moon" size={20} color="#6366F1" />
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
            <TextInput
              style={styles.modalInput}
              placeholder="ml"
              keyboardType="numeric"
              value={waterInput}
              onChangeText={setWaterInput}
            />
            <Text style={styles.modalHint}>Öneri: 2000 ml</Text>
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
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                const value = parseInt(waterInput, 10);
                if (!Number.isNaN(value) && value > 0) {
                  addWaterByDay(currentDayIndex, value);
                }
                setWaterInput('');
                setWaterModalOpen(false);
              }}
            >
              <Text style={styles.primaryButtonText}>Kaydet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                resetWaterByDay(currentDayIndex);
                setWaterInput('');
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
            <TextInput
              style={styles.modalInput}
              placeholder="dakika"
              keyboardType="numeric"
              value={activityInput}
              onChangeText={setActivityInput}
            />
            <Text style={styles.modalHint}>Öneri: 30 dk</Text>
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
                  addActivityByDay(currentDayIndex, 30);
                  setActivityModalOpen(false);
                }}
              >
                <Text style={styles.quickButtonText}>+30 dk</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                const value = parseInt(activityInput, 10);
                if (!Number.isNaN(value) && value > 0) {
                  addActivityByDay(currentDayIndex, value);
                }
                setActivityInput('');
                setActivityModalOpen(false);
              }}
            >
              <Text style={styles.primaryButtonText}>Kaydet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                resetActivityByDay(currentDayIndex);
                setActivityInput('');
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
            <TextInput
              style={styles.modalInput}
              placeholder="saat"
              keyboardType="numeric"
              value={sleepInput}
              onChangeText={setSleepInput}
            />
            <Text style={styles.modalHint}>Öneri: 7-8 saat</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => {
                  setSleepByDay(currentDayIndex, 6);
                  setSleepModalOpen(false);
                }}
              >
                <Text style={styles.quickButtonText}>6</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => {
                  setSleepByDay(currentDayIndex, 7);
                  setSleepModalOpen(false);
                }}
              >
                <Text style={styles.quickButtonText}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => {
                  setSleepByDay(currentDayIndex, 8);
                  setSleepModalOpen(false);
                }}
              >
                <Text style={styles.quickButtonText}>8</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                const value = parseFloat(sleepInput);
                if (!Number.isNaN(value) && value > 0) {
                  setSleepByDay(currentDayIndex, value);
                }
                setSleepInput('');
                setSleepModalOpen(false);
              }}
            >
              <Text style={styles.primaryButtonText}>Kaydet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                resetSleepByDay(currentDayIndex);
                setSleepInput('');
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
  // Shared card style
  sharedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2
  },
  // Shared icon chip style
  sharedIconChip: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  mealCtaHeroWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12
  },
  mealCtaHero: {
    width: 44,
    height: 44
  },
  defiHeroCard: {
    backgroundColor: 'rgba(15, 90, 78, 0.08)',
    borderRadius: 20,
    paddingVertical: 12,
    paddingLeft: 8,
    paddingRight: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(15, 90, 78, 0.12)',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  defiHeroRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defiHeroAvatarWrap: {
    marginRight: 6,
  },
  defiHeroMessageWrap: {
    flex: 1,
  },
  metabolismCard: {
    backgroundColor: 'rgba(15, 90, 78, 0.06)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(15, 90, 78, 0.12)',
  },
  metabolismCardTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 4,
  },
  metabolismCardSubtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  metabolismCardBody: {
    fontSize: 12,
    lineHeight: 18,
    color: '#475569',
  },
  metabolismCardDefense: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F5A4E',
    marginTop: 6,
  },
  defiCard: {
    backgroundColor: '#FAFBFC',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 6,
    position: 'relative'
  },
  defiSection: {
    alignItems: 'center'
  },
  speechBubble: {
    marginTop: 16,
    padding: 16,
    backgroundColor: Theme.surface,
    borderRadius: 12,
    width: '100%'
  },
  defiMessage: {
    fontSize: 18,
    color: '#0F172A',
    lineHeight: 26,
    fontWeight: '500',
    marginBottom: 12
  },
  defiSignature: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'right',
    marginTop: 4,
    fontWeight: '500'
  },
  defiBubbleTail: {
    position: 'absolute',
    left: 20,
    bottom: -10,
    width: 14,
    height: 14,
    backgroundColor: '#FAFBFC',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
    transform: [{ rotate: '45deg' }],
    borderRadius: 2,
    zIndex: -1
  },
  defiSpeechMessage: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 8,
    marginBottom: 12
  },
  monsterMiniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  monsterMiniLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  monsterMiniIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
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
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2
  },
  taskIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2
  },
  mealCtaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalCard: {
    backgroundColor: Theme.surface,
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
  modalInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 8,
    backgroundColor: '#F8FAFC',
  },
  modalHint: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 16,
    textAlign: 'center',
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
  primaryButton: {
    backgroundColor: '#0F5A4E',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF'
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
