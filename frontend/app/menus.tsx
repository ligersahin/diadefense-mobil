import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, Pressable, Modal, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import AppHeader from '../src/components/AppHeader';
import { Card } from '../src/components/Card';
import DefiBanner from '../src/components/DefiBanner';
import { MENUS } from '../src/data/menus';
import { supplementRules } from '../src/data/supplementRules';
import { useDefenseProgram } from '../src/context/DefenseProgramContext';
import { MealSlot } from '../src/types';
import { getRecipeImage } from '../src/assets/recipeImages';
import { markMealsInteractedToday } from '../src/notifications/mealsNudgeNotifications';
import { getLocalDateISO } from '../src/utils/dateISO';
import { shouldShowDefi, shouldShowMessage, markMessageShown } from '../src/defi/defiVisibility';
import { getDefiMessage } from '../src/defi/defiMessages';
import DayInfoBoard, { type DayInfoCard } from '../src/components/DayInfoBoard';
import { DAY_INFO_BOARD, type DayInfoCardData } from '../src/data/dayInfoBoard';
import { Theme } from '../src/config/theme';
import { getMetabolicFocus } from '../src/data/metabolicFocus';

const SECTION_META = [
  { key: 'breakfast', title: 'Kahvaltı' },
  { key: 'lunch', title: 'Öğlen' },
  { key: 'dinner', title: 'Akşam' },
] as const;

type MealKey = typeof SECTION_META[number]['key'];

type MealCardProps = {
  title: string;
  description: string;
  recipeId?: string | null;
  isCompleted?: boolean;
  onToggle?: () => void;
  thumbKey?: string;
  showSupplementsAction?: boolean;
  onSupplementsPress?: () => void;
  supplementSummary?: string;
  mealKey?: string;
};

type InfoMap = {
  breakfast?: string[];
  lunch?: string[];
  dinner?: string[];
};

const DAY1_INFO: InfoMap = {
  breakfast: [
    '2 yumurta (kayısı kıvamı).',
    'Çoban veya yeşil salata (zeytinyağı, limon, kekik).',
    '10–15 zeytin.',
    '15–20 çiğ fındık veya badem.',
    'Şekersiz çay, yeşil çay veya sade Türk kahvesi.',
    'Kahvaltıdan 30 dk önce: Enterik probiyotik kapsülü ve zeytin yaprağı kapsülü.',
    'Kahvaltıdan 60 dk sonra: Krill yağı kapsülü ve 200 mg magnezyum kapsülü.',
    'Kahvaltıdan 90 dk sonra (15 günde 1): D vitamini (zeytinyağı ile).',
  ],
  lunch: [
    'Soğuk domates çorbası (tarife bak).',
    'Zeytinyağlı bamya veya ıspanak kökü salatası.',
    'Ev yapımı turşu.',
    'Öğle yemeğinden 30 dk önce: Çemen otu kapsülü.',
  ],
  dinner: [
    'Izgara biftek.',
    'Çoban salata veya karnabahar salatası (buharda, hafif diri).',
    'Zeytinyağı, limon, kaya tuzu ile.',
    'Akşam yemeğinden 30 dk önce: Enterik probiyotik kapsülü ve zeytin yaprağı kapsülü.',
    'Akşam yemeğinden 60 dk sonra: Krill yağı kapsülü.',
  ],
};

const DAY2_INFO: InfoMap = {
  breakfast: [
    'Sahanda pastırmalı yumurta.',
    'Mevsimine göre yeşil salata veya çoban salatası (biber, salatalık, domates, bol sızma zeytinyağı, limon, kekik).',
    '10–15 adet siyah veya yeşil zeytin.',
    'Şekersiz çay, yeşil çay veya sade Türk kahvesi.',
    'Kahvaltıdan 30 dakika önce enterik probiyotik kapsülü ve zeytin yaprağı kapsülü.',
    'Kahvaltıdan 1 saat sonra krill yağı kapsülü ve 200 mg magnezyum kapsülü.',
  ],
  lunch: [
    'Sirke ve sarımsakla çeşnilendirilmiş paça çorbası.',
    'Sızma zeytinyağı ve ev sirkesi ile hazırlanmış mevsim salatası.',
    '5–6 adet ceviz.',
    'Öğle yemeğinden 30 dakika önce çemen otu kapsülü.',
  ],
  dinner: [
    'Mevsimine göre palamut izgara veya deniz levreği.',
    'Sızma zeytinyağı ve ev sirkesi ya da limon suyu ile hazırlanmış yeşil salata veya çoban salata.',
    'Akşam yemeğinden 30 dakika önce enterik probiyotik kapsülü ve zeytin yaprağı kapsülü.',
    'Akşam yemeğinden 1 saat sonra krill yağı kapsülü.',
  ],
};

const DAY3_INFO: InfoMap = {
  breakfast: [
    'Mevsim sebzeleriyle hazırlanmış tereyağlı omlet (2 yumurta).',
    '10–15 adet çiğ fındık ya da badem.',
    'Siyah ya da yeşil zeytin (10–15 adet).',
    'Şekersiz çay, yeşil çay ya da sade Türk kahvesi.',
    'Kahvaltıdan 30 dakika önce: enterik probiyotik kapsülü, zeytin yaprağı kapsülü.',
    'Kahvaltıdan 1 saat sonra: krill yağı kapsülü, 200 mg magnezyum kapsülü.',
  ],
  lunch: [
    'İşkembe çorbası (ev sirkesi ve dövülmüş sarımsakla çeşitlendirilmiş).',
    'Mevsimine göre: taze börülce salatası ya da sızma zeytinyağı, limon ve kaya tuzu ile çeşitlendirilmiş Brüksel lahanası salatası (buharda az haşlanmış).',
    'Öğlen yemeğinden 30 dakika önce: çemen otu kapsülü.',
  ],
  dinner: [
    'Çeşnili tavuk ızgara (tavuk göğsü: kimyon, zerdeçal, kekik, kırmızı pul biber + 1 diş dövülmüş sarımsak; 1–2 saat dolapta dinlendir; sonra sızma zeytinyağı gezdirilmiş tavada pişir).',
    'Mevsimine göre: dövülmüş sarımsak + zeytinyağı ile çeşitlendirilmiş tere salatası ya da çoban salata.',
    'Akşam yemeğinden 30 dakika önce: enterik probiyotik kapsülü, zeytin yaprağı kapsülü.',
    'Akşam yemeğinden 1 saat sonra: krill yağı kapsülü.',
  ],
};

const DAY4_INFO: InfoMap = {
  breakfast: [
    'Sahanda tereyağlı yumurta (2 yumurta ile hazırlanmış).',
    'Mevsim salatası.',
    'Siyah ya da yeşil zeytin (10–15 adet).',
    '6–7 adet ceviz.',
    'Şekersiz çay, yeşil çay ya da sade Türk kahvesi.',
    'Kahvaltıdan 30 dakika önce: enterik probiyotik kapsülü, zeytin yaprağı kapsülü.',
    'Kahvaltıdan 1 saat sonra: krill yağı kapsülü, 200 mg magnezyum kapsülü.',
  ],
  lunch: [
    'Terbiyeli et suyu çorbası (et suyu kaynatılır; bir çanağa alınıp içine 1 yumurta sarısı eklenerek çırpılır; üzerine karabiber, birkaç damla limon suyu ve ince kıyılmış maydanoz eklenir).',
    'Zeytinyağlı enginar.',
    'Öğlen yemeğinden 30 dakika önce: çemen otu kapsülü.',
  ],
  dinner: [
    'Ciğer ızgara.',
    'Turp, kereviz kökü ve ince doğranmış kereviz yaprakları ile hazırlanmış kök salata ya da çoban salata.',
    'Ev turşusu.',
    'Akşam yemeğinden 30 dakika önce: enterik probiyotik kapsülü, zeytin yaprağı kapsülü.',
    'Akşam yemeğinden 1 saat sonra: krill yağı kapsülü.',
  ],
};

const DAY5_INFO: InfoMap = {
  breakfast: [
    'Sucuklu yumurta (2 yumurta ile hazırlanmış).',
    'Mevsim salatası.',
    'Siyah ya da yeşil zeytin (10–15 adet).',
    'Şekersiz çay, yeşil çay ya da sade Türk kahvesi.',
    'Kahvaltıdan 30 dakika önce: enterik probiyotik kapsül, zeytin yaprağı kapsül.',
    'Kahvaltıdan 1 saat sonra: krill yağı kapsül, 200 mg magnezyum kapsül.',
  ],
  lunch: [
    'Sebze çorbası (et suyu bazlı).',
    'Çoban salata veya mevsim salatası.',
    '10–15 adet çiğ fındık veya badem.',
    'Pratik pancar turşusu (tarife bak).',
    'Öğle yemeğinden 30 dakika önce: çemen otu kapsül.',
  ],
  dinner: [
    'Zencefilli somon.',
    'Izgara yaz sebzeleri veya mevsim salatası.',
    'Akşam yemeğinden 30 dakika önce: enterik probiyotik kapsül, zeytin yaprağı kapsül.',
    'Akşam yemeğinden 1 saat sonra: krill yağı kapsül.',
  ],
};

const DAY6_INFO: InfoMap = {
  breakfast: [
    '2 adet yumurta dolması (sarı: tereyağı + ince doğranmış dereotu + taze soğan; beyazın içine doldur).',
    'Mevsim salatası.',
    '10-15 adet siyah ya da yeşil zeytin.',
    'Şekersiz çay, yeşil çay ya da sade Türk kahvesi.',
    'Kahvaltıdan 30 dakika önce: enterik probiyotik kapsülü, zeytin yaprağı kapsülü.',
    'Kahvaltıdan 1 saat sonra: krill yağı kapsülü, 200 mg magnezyum kapsülü.',
  ],
  lunch: [
    'Terbiyeli paça çorbası (dövülmüş sarımsak, ev sirkesi, kaya tuzu, karabiber ile).',
    'Yeşil salata ya da sirkeyle çeşnilendirilmiş közlenmiş kırmızı çan biberi (1-2 saat buzdolabında dinlendir).',
    '5-6 adet ceviz.',
    'Öğlen yemeğinden 30 dakika önce: çemen otu kapsülü.',
  ],
  dinner: [
    'Kapuska (tarife bak).',
    'Mevsim salatası.',
    'Akşam yemeğinden 30 dakika önce: enterik probiyotik kapsülü, zeytin yaprağı kapsülü.',
    'Akşam yemeğinden 1 saat sonra: krill yağı kapsülü.',
  ],
};

const DAY7_INFO: InfoMap = {
  breakfast: [
    'Menemen (2 yumurta ile hazırlanmış).',
    'Mevsim salatası (zeytinyağı, limon, kekik).',
    '10–15 zeytin.',
    'Şekersiz çay, yeşil çay ya da sade Türk kahvesi.',
    'Kahvaltıdan 30 dakika önce: enterik probiyotik kapsülü, zeytin yaprağı kapsülü.',
    'Kahvaltıdan 1 saat sonra: krill yağı kapsülü, 200 mg magnezyum kapsülü.',
  ],
  lunch: [
    'Kereviz çorbası (tarife bak).',
    'Mevsim salatası.',
    '10–15 adet çiğ fındık veya badem.',
    'Öğlen yemeğinden 30 dakika önce: çemen otu kapsülü.',
  ],
  dinner: [
    'Fırında tavuk.',
    'Soğuk avokado püresi veya mevsim salatası.',
    'Ev turşusu.',
    'Akşam yemeğinden 30 dakika önce: enterik probiyotik kapsülü, zeytin yaprağı kapsülü.',
    'Akşam yemeğinden 1 saat sonra: krill yağı kapsülü.',
  ],
};

function MealCard({ title, description, recipeId, infoLines, isCompleted, onToggle, thumbKey, showSupplementsAction, onSupplementsPress, supplementSummary, mealKey }: MealCardProps & { infoLines?: string[] }) {
  const [open, setOpen] = useState(false);
  const infoLinesToRender = infoLines || [];
  const summaryLine = infoLinesToRender.length > 0 ? infoLinesToRender[0] : description;
  const thumbSource = getRecipeImage(thumbKey);
  return (
    <Card style={styles.mealCard}>
      <View style={styles.mealTopRow}>
        <View style={styles.mealThumb}>
          {thumbSource ? (
            <Image source={thumbSource} style={styles.mealThumbImage} resizeMode="cover" />
          ) : (
            <Text style={styles.mealThumbEmoji}>🍽️</Text>
          )}
        </View>
        <View style={styles.mealTextBlock}>
          <Text style={styles.mealTitle}>{title}</Text>
          <Text style={styles.mealDescription} numberOfLines={1}>{summaryLine}</Text>
        </View>
        <TouchableOpacity
          onPress={onToggle}
          style={[styles.mealCheck, isCompleted && styles.mealCheckActive]}
          activeOpacity={0.8}
        >
          {isCompleted ? <Text style={styles.mealCheckMark}>✓</Text> : null}
        </TouchableOpacity>
      </View>
      <View style={styles.mealActions}>
        <TouchableOpacity
          onPress={() => setOpen((prev) => !prev)}
          activeOpacity={0.8}
          style={styles.actionButton}
        >
          <Text style={styles.actionText}>Bilgiler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            recipeId
              ? router.push({
                  pathname: '/recipes/[id]',
                  params: { id: recipeId },
                })
              : undefined
          }
          activeOpacity={recipeId ? 0.8 : 1}
          style={[styles.actionButton, !recipeId && styles.actionButtonDisabled, !!recipeId && styles.recipeButtonHasRecipe]}
        >
          <Text style={[styles.actionText, !recipeId && styles.actionTextDisabled, !!recipeId && styles.recipeButtonTextHasRecipe]}>
            Tarife git
          </Text>
        </TouchableOpacity>
      </View>
      {open ? (
        <View style={styles.infoList}>
          {infoLinesToRender.map((line, index) => (
            <Text key={`${line}-${index}`} style={styles.infoText}>
              {line}
            </Text>
          ))}
          {showSupplementsAction ? (
            <TouchableOpacity
              onPress={onSupplementsPress}
              activeOpacity={0.8}
              style={styles.supplementRow}
            >
              <View style={styles.supplementStarButton}>
                <Ionicons name="star" size={16} color="#8B5CF6" />
              </View>
              <Text style={styles.supplementLabel}>Takviyeler</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/shopping')}
            activeOpacity={0.8}
            style={styles.shoppingActionRow}
          >
            <Ionicons name="cart-outline" size={16} color="#0F5A4E" />
            <Text style={styles.shoppingActionLabel}>Alışveriş Listesi</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </Card>
  );
}

const DEBUG_SHOW_DEFI_MENUS = true; // TEMP: set false after visual verification

const TAB_BAR_BASE = {
  backgroundColor: Theme.surface,
  borderTopWidth: 1,
  borderTopColor: Theme.border,
  height: 60,
  paddingTop: 6,
  paddingBottom: 6,
  elevation: 0,
  shadowOpacity: 0,
};

export default function MenusScreen() {
  const navigation = useNavigation();
  const { currentDayIndex, completedMeals, toggleMealCompleted } = useDefenseProgram();
  const [defiVisible, setDefiVisible] = useState(true);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const lastYRef = useRef(0);
  const [defiMessage, setDefiMessage] = useState<{ title: string; body: string; detail?: string } | null>(null);
  const hasShownOnceRef = useRef(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const defiRevealAnim = useRef(new Animated.Value(0)).current;
  const defiMsgTextRef = useRef<string | null>(null);
  const lastRevealAtRef = useRef(0);
  const [selectedDay, setSelectedDay] = useState(currentDayIndex || 1);
  const [manualDay, setManualDay] = useState(false);
  const [activeInfoId, setActiveInfoId] = useState<string | null>(null);
  const days = useMemo(() => MENUS.map((item) => item.day), []);
  const dayMenu = MENUS.find((item) => item.day === selectedDay) || MENUS[0];
  const dayMeals = completedMeals[selectedDay] || [];
  const safeCompleted = Array.from(new Set(dayMeals.filter((s) => s === 'breakfast' || s === 'lunch' || s === 'dinner')));
  const completedCount = safeCompleted.length;
  const hasAnyMealCompletedToday = (completedMeals[currentDayIndex] || []).length > 0;
  const todayISO = useMemo(() => getLocalDateISO(), []);
  const supplementsByMeal = useMemo(() => {
    const enabled = supplementRules.filter((rule) => rule.enabled);
    const buildSummary = (mealKey: string) => {
      const rules = enabled.filter((rule) => rule.meal === mealKey);
      if (!rules.length) return { has: false, summary: '' };
      const parts = rules.map((rule) => {
        const prefix = rule.offsetMinutes < 0
          ? `${Math.abs(rule.offsetMinutes)} dk önce`
          : `+${rule.offsetMinutes} dk`;
        const names = rule.items.map((item) => item.name).join(' + ');
        return `${prefix} ${names}`;
      });
      return { has: true, summary: `Takviyeler: ${parts.join(' · ')}` };
    };
    return {
      breakfast: buildSummary('breakfast'),
      lunch: buildSummary('lunch'),
      dinner: buildSummary('dinner'),
    };
  }, []);
  const baseDefiMessage = useMemo(
    () =>
      (DEBUG_SHOW_DEFI_MENUS || defiVisible)
        ? getDefiMessage({
            screen: 'meals',
            hasStartedToday: hasAnyMealCompletedToday,
            remainingMeals: undefined,
          })
        : null,
    [defiVisible, hasAnyMealCompletedToday]
  );

  const handleOpenPlan = () => {
    router.push('/(tabs)/defense');
  };

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const dy = y - lastYRef.current;
    lastYRef.current = y;
    if (y <= 10) {
      setIsTabHidden(false);
      return;
    }
    if (dy < -12) {
      setIsTabHidden(false);
    } else if (dy > 12 && y > 60) {
      setIsTabHidden(true);
    }
  }, []);

  useEffect(() => {
    const base = { ...TAB_BAR_BASE };
    navigation.setOptions({
      tabBarStyle: isTabHidden
        ? { ...base, opacity: 0, transform: [{ translateY: 80 }], height: 0, paddingBottom: 0 }
        : { ...base, opacity: 1, transform: [{ translateY: 0 }] },
    });
  }, [isTabHidden, navigation]);

  useEffect(() => {
    return () => {
      navigation.setOptions({
        tabBarStyle: { ...TAB_BAR_BASE, opacity: 1, transform: [{ translateY: 0 }] },
      });
    };
  }, [navigation]);

  useEffect(() => {
    if (!manualDay && currentDayIndex) {
      setSelectedDay(currentDayIndex);
    }
  }, [currentDayIndex, manualDay]);

  useEffect(() => {
    setActiveInfoId(null);
  }, [selectedDay]);

  useEffect(() => {
    let mounted = true;
    shouldShowDefi(todayISO, 'meals').then((show) => {
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
    // TEMP: debug bypass — skip cooldown/visibility gates
    if (DEBUG_SHOW_DEFI_MENUS) {
      setDefiMessage(baseDefiMessage);
      return () => { active = false; };
    }
    if (!hasShownOnceRef.current) {
      setDefiMessage(baseDefiMessage);
      void markMessageShown('meals', baseDefiMessage.body);
      hasShownOnceRef.current = true;
      return () => {
        active = false;
      };
    }
    (async () => {
      const shouldShow = await shouldShowMessage('meals', baseDefiMessage.body);
      if (!active) return;
      if (!shouldShow) {
        setDefiMessage(null);
        return;
      }
      setDefiMessage(baseDefiMessage);
      await markMessageShown('meals', baseDefiMessage.body);
    })();
    return () => {
      active = false;
    };
  }, [baseDefiMessage]);

  const runRevealAnimation = useCallback((reason: string) => {
    const now = Date.now();
    if (now - lastRevealAtRef.current < 12000) {
      console.log('[DefiReveal] blocked by cooldown:', reason);
      return;
    }
    lastRevealAtRef.current = now;
    console.log('[DefiReveal] run:', reason);
    defiRevealAnim.stopAnimation();
    defiRevealAnim.setValue(0);
    Animated.timing(defiRevealAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [defiRevealAnim]);


  const nowVisible = Boolean(defiVisible) && Boolean(defiMessage);
  const wasVisibleRef = useRef(false);

  useEffect(() => {
    if (nowVisible && !wasVisibleRef.current) {
      runRevealAnimation('first-visible');
    }
    wasVisibleRef.current = nowVisible;
  }, [nowVisible, runRevealAnimation]);

  useEffect(() => {
    if (!nowVisible) return;
    const t = setTimeout(() => runRevealAnimation('idle-60s'), 60000);
    return () => clearTimeout(t);
  }, [nowVisible, runRevealAnimation]);

  useEffect(() => {
    if (!defiMessage) return;
    const body = defiMessage.body;
    const isNew = defiMsgTextRef.current !== body;
    defiMsgTextRef.current = body;
    if (isNew) runRevealAnimation('message-change');
  }, [defiMessage, runRevealAnimation]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <AppHeader
        title="Menüler"
        subtitle="Gün seç ve öğünleri görüntüle"
        showBack={router.canGoBack()}
        onBack={() => router.back()}
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.daySelectorWrap}>
          <Text style={styles.sectionTitle}>Gün Seç</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {days.map((day) => {
              const isActive = day === selectedDay;
              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayChip, isActive && styles.dayChipActive]}
                  onPress={() => {
                    setSelectedDay(day);
                    setManualDay(true);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.dayText, isActive && styles.dayTextActive]}>{day}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <Text style={styles.dayIndicator}>Gün {selectedDay} / 91 • {completedCount}/3 öğün tamamlandı</Text>

        <View style={styles.infoBoardWrap}>
          <DayInfoBoard
            cards={(() => {
              const config = DAY_INFO_BOARD[selectedDay]?.cards ?? [];
              return config.map((c): DayInfoCard => {
                const data = c as DayInfoCardData;
                const hasContent = !!(data.contentBody && data.contentTitle);
                const onPress = hasContent
                  ? () => setActiveInfoId((prev) => (prev === data.id ? null : data.id))
                  : undefined;
                return { ...c, onPress };
              });
            })()}
          />
          {activeInfoId ? (() => {
            const config = DAY_INFO_BOARD[selectedDay]?.cards ?? [];
            const card = config.find((c) => c.id === activeInfoId) as DayInfoCardData | undefined;
            if (!card?.contentBody) return null;
            return (
              <View style={styles.infoDetailPanel}>
                <ScrollView
                  style={styles.infoDetailScroll}
                  contentContainerStyle={styles.infoDetailScrollContent}
                  showsVerticalScrollIndicator={true}
                >
                  <Text style={styles.infoDetailBody}>{card.contentBody}</Text>
                </ScrollView>
              </View>
            );
          })() : null}
        </View>

        <View style={styles.defiBlock}>
          <Animated.View style={{
            opacity: defiRevealAnim,
            transform: [{ translateY: defiRevealAnim.interpolate({ inputRange: [0, 1], outputRange: [-8, 0] }) }],
          }}>
            <DefiBanner
              message={DEBUG_SHOW_DEFI_MENUS ? (defiMessage ?? { title: 'Defi', body: 'Debug: Defi card görünürlük testi.' }) : defiMessage}
              onOpenPlan={handleOpenPlan}
              todayISO={todayISO}
              onHidden={() => setDefiVisible(false)}
              screenId="meals"
              enableTypewriter={true}
              enableIdleReplay={true}
              variant="card"
            />
          </Animated.View>
        </View>

        <Card style={styles.heroCard}>
          <Image
            source={getRecipeImage(dayMenu.heroImageKey)!}
            style={{
              width: '100%',
              height: 150,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
            resizeMode="cover"
          />
          <View style={styles.heroContent}>
            {(() => {
              const mf = getMetabolicFocus(selectedDay);
              return (
                <>
                  <Text style={styles.heroTitle}>{mf.headline}</Text>
                  <Text style={styles.metabolicLine} numberOfLines={3}>{mf.description}</Text>
                  <View style={styles.heroTag}>
                    <Text style={styles.heroTagText}>🛡 Savunma Odağı: {mf.defenseFocus}</Text>
                  </View>
                </>
              );
            })()}
          </View>
        </Card>

        {SECTION_META.map((section) => {
          const meal = dayMenu.meals[section.key as MealKey];
          const infoLines = selectedDay === 1 ? DAY1_INFO[section.key] : selectedDay === 2 ? DAY2_INFO[section.key] : selectedDay === 3 ? DAY3_INFO[section.key] : selectedDay === 4 ? DAY4_INFO[section.key] : selectedDay === 5 ? DAY5_INFO[section.key] : selectedDay === 6 ? DAY6_INFO[section.key] : selectedDay === 7 ? DAY7_INFO[section.key] : undefined;
          const isCompleted = safeCompleted.includes(section.key);
          return (
            <View key={section.key} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <MealCard
                title={meal.title}
                description={meal.description}
                recipeId={meal.recipeId}
                infoLines={infoLines}
                isCompleted={isCompleted}
                onToggle={() => {
                  void markMealsInteractedToday(getLocalDateISO());
                  toggleMealCompleted(selectedDay, section.key as MealSlot);
                }}
                showSupplementsAction={supplementsByMeal[section.key as MealKey].has}
                supplementSummary={supplementsByMeal[section.key as MealKey].summary}
                onSupplementsPress={() =>
                  router.push({ pathname: '/(tabs)/supplements', params: { meal: section.key } })
                }
                thumbKey={meal.imageKey || meal.recipeId || undefined}
                mealKey={section.key}
              />
            </View>
          );
        })}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 20,
  },
  infoBoardWrap: {
    marginBottom: 4,
  },
  infoDetailPanel: {
    marginTop: 4,
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    maxHeight: 200,
    overflow: 'hidden',
  },
  infoDetailScroll: {
    maxHeight: 200,
  },
  infoDetailScrollContent: {
    padding: 12,
  },
  infoDetailBody: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569',
  },
  metabolicLine: {
    fontSize: 12,
    lineHeight: 16,
    color: Theme.muted,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  modalScroll: {
    flex: 1,
    minHeight: 0,
  },
  modalScrollContent: {
    paddingBottom: 16,
  },
  modalClose: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F5D4F',
  },
  defiBlock: {
    marginTop: 8,
    marginBottom: 14,
  },
  container: { flex: 1, backgroundColor: '#F5F6F8' },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingTop: 18,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
  daySelectorWrap: {
    marginBottom: 16,
  },
  dayIndicator: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 12,
  },
  dayChip: {
    minWidth: 44,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    paddingHorizontal: 12,
  },
  dayChipActive: {
    backgroundColor: '#0F5A4E',
  },
  dayText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  dayTextActive: {
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  mealCard: {
    marginBottom: 12,
  },
  mealTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mealThumb: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  mealThumbImage: {
    width: '100%',
    height: '100%',
  },
  mealThumbEmoji: {
    fontSize: 20,
  },
  mealTextBlock: {
    flex: 1,
  },
  mealCheck: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  mealCheckActive: {
    backgroundColor: '#0F5A4E',
    borderColor: '#0F5A4E',
  },
  mealCheckMark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  mealDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 10,
  },
  mealActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  actionButton: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonDisabled: {
    backgroundColor: '#E2E8F0',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  actionTextDisabled: {
    color: '#94A3B8',
  },
  recipeButtonHasRecipe: {
    backgroundColor: '#0F5A4E',
  },
  recipeButtonTextHasRecipe: {
    color: '#FFFFFF',
  },
  infoList: {
    marginTop: 8,
    gap: 6,
  },
  supplementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
  },
  supplementStarButton: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supplementLabel: {
    flex: 1,
    fontSize: 12,
    color: '#8B5CF6',
    lineHeight: 16,
  },
  shoppingActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(15, 90, 78, 0.08)',
  },
  shoppingActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F5A4E',
  },
  infoText: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  heroCard: {
    marginBottom: 18,
    padding: 0,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: 140,
  },
  heroPlaceholder: {
    width: '100%',
    height: 140,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 22,
    marginBottom: 6,
  },
  heroPlaceholderText: {
    fontSize: 12,
    color: '#64748B',
  },
  heroContent: {
    padding: 14,
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  heroSummary: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 10,
  },
  heroTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F3F1',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  heroTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F5A4E',
  },
});
