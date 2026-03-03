import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { useDefenseProgram } from '../../src/context/DefenseProgramContext';
import { Card } from '../../src/components/Card';
import AppHeader from '../../src/components/AppHeader';
import { Theme } from '../../src/config/theme';

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

export default function TrackingScreen() {
  const navigation = useNavigation();
  const lastYRef = useRef(0);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const {
    currentDayIndex,
    defenseScore,
    completedMeals,
    completedSupplements,
    currentDayPlan
  } = useDefenseProgram();

  const todayIndexSafe = useMemo(() => {
    // Bazı context’lerde 0 veya undefined gelebiliyor; senin UI’da 1-index kullanıyorsun gibi.
    // Bu yüzden “0 ise 1” fallback’i yapıyoruz.
    const v = typeof currentDayIndex === 'number' ? currentDayIndex : 1;
    return v === 0 ? 1 : v;
  }, [currentDayIndex]);


  const todayMeals = (completedMeals && completedMeals[todayIndexSafe]) ? completedMeals[todayIndexSafe] : [];
  const todaySupps = (completedSupplements && completedSupplements[todayIndexSafe]) ? completedSupplements[todayIndexSafe] : [];

  const totalMeals =
    currentDayPlan?.meals?.filter((m: any) => m?.type !== 'snack' && m?.slot !== 'snack' && m?.label !== 'Ara Öğün')
      .length || 0;
  const totalSupps = currentDayPlan?.supplements?.length || 0;

  const baseTrend = [40, 45, 42, 50, 47, 55, 48];
  const trendDelta = (todayIndexSafe % 5) - 2;
  const trendData = baseTrend.map((value) => {
    const next = value + trendDelta * 2;
    return Math.max(30, Math.min(90, next));
  });
  if (typeof defenseScore === 'number') {
    trendData[trendData.length - 1] = Math.max(0, Math.min(100, defenseScore));
  }

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

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <AppHeader
        title="Verilerim"
        subtitle="Günlük, haftalık ve uzun vadeli sağlık verileri"
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>7 Günlük Savunma Trendi</Text>
          <Text style={styles.cardSubtitle}>Savunma skoru (%)</Text>
          <View style={styles.chartContainer}>
            <View style={styles.chart}>
              {trendData.map((value, index) => {
                const height = Math.max(20, (value / 100) * 120);
                return (
                  <View key={index} style={styles.chartBarContainer}>
                    <View style={[styles.chartBar, { height }]} />
                    <Text style={styles.chartLabel}>{index + 1}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.chartAxis}>
              <Text style={styles.chartAxisLabel}>0%</Text>
              <Text style={styles.chartAxisLabel}>100%</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Öğün Geçmişi</Text>
          <Text style={styles.cardSubtitle}>
            {todayMeals.length} / {totalMeals} öğün tamamlandı
          </Text>
          <Text style={styles.insightText}>Gün/hafta bazlı dağılım yakında.</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Supplement Geçmişi</Text>
          <Text style={styles.cardSubtitle}>
            {todaySupps.length} / {totalSupps} alındı
          </Text>
          <Text style={styles.insightText}>Geçmiş ve hatırlatıcılar yakında.</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Kilo Takibi</Text>
          <Text style={styles.cardSubtitle}>Son ölçüm: —</Text>
          <Text style={styles.insightText}>Grafik yakında eklenecek.</Text>
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sağlık Verileri</Text>
          <Text style={styles.sectionHint}>Pasif</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContent}
        >
          <View style={styles.healthCard}>
            <View style={styles.healthMedia}>
              <Ionicons name="walk-outline" size={22} color="#0F172A" />
            </View>
            <Text style={styles.healthTitle}>Adım</Text>
            <Text style={styles.healthValue}>—</Text>
            <Text style={styles.healthSubtitle}>Bugün</Text>
          </View>
          <View style={styles.healthCard}>
            <View style={styles.healthMedia}>
              <Ionicons name="water-outline" size={22} color="#0F172A" />
            </View>
            <Text style={styles.healthTitle}>Su</Text>
            <Text style={styles.healthValue}>—</Text>
            <Text style={styles.healthSubtitle}>Bugün</Text>
          </View>
          <View style={styles.healthCard}>
            <View style={styles.healthMedia}>
              <Ionicons name="moon-outline" size={22} color="#0F172A" />
            </View>
            <Text style={styles.healthTitle}>Uyku</Text>
            <Text style={styles.healthValue}>—</Text>
            <Text style={styles.healthSubtitle}>Yakında</Text>
          </View>
        </ScrollView>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
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
  card: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: -10,
    marginBottom: 8
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    marginTop: 4
  },
  sectionHint: {
    fontSize: 13,
    color: '#94A3B8'
  },
  healthCard: {
    width: 160,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3
  },
  healthMedia: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  healthTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4
  },
  healthValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A'
  },
  healthSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2
  },
  carouselContent: {
    paddingHorizontal: 4,
    paddingBottom: 4
  },
  chartContainer: {
    marginTop: 8
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 140,
    marginBottom: 8
  },
  chartBarContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2
  },
  chartBar: {
    width: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
    marginBottom: 4,
    minHeight: 4
  },
  chartLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4
  },
  chartAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4
  },
  chartAxisLabel: {
    fontSize: 11,
    color: '#9CA3AF'
  },
  insightText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 8
  },
  bottomSpacer: {
    height: 32
  }
});
