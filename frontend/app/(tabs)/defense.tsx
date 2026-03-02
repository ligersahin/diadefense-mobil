import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDefenseProgram } from '../../src/context/DefenseProgramContext';
import { Card } from '../../src/components/Card';
import { getCurrentProgramDay } from '../../src/utils/programDay';
import MonsterAvatar from '../../src/components/MonsterAvatar';
import AppHeader from '../../src/components/AppHeader';
import { ProgressCircle } from '../../src/components/ProgressCircle';

export default function DefensePanelScreen() {
  const router = useRouter();
  const {
    defenseScore,
    mealRatio,
    supplementRatio,
    waterRatio,
    activityRatio,
    sleepRatio,
    startISO
  } = useDefenseProgram();

  const currentDay = getCurrentProgramDay(startISO);

  const getMonsterStatus = (score: number) => {
    if (score >= 90) {
      return {
        stateLabel: 'WEAK',
        title: 'Mükemmel savunma',
        message: 'Bugün canavara gün yok. Böyle devam.',
      };
    }
    if (score >= 70) {
      return {
        stateLabel: 'CALM',
        title: 'İyi gidiyorsun',
        message: 'Canavar geri çekiliyor. Disiplini koru.',
      };
    }
    if (score >= 40) {
      return {
        stateLabel: 'ALERT',
        title: 'Denge sınırda',
        message: 'İyiye gidiyorsun ama canavar hâlâ besleniyor. 1 adım daha.',
      };
    }
    return {
      stateLabel: 'STRONG',
      title: 'Canavar güçleniyor',
      message: 'Bugün aksama var. Programını uygula.',
    };
  };

  const monsterStatus = getMonsterStatus(defenseScore);
  const mealPct = Math.round(mealRatio * 100);
  const suppPct = Math.round(supplementRatio * 100);
  const lowestLabel = mealPct <= suppPct ? 'Öğünler' : 'Supp';
  const lowestValue = mealPct <= suppPct ? mealPct : suppPct;
  const ctaText = mealPct <= suppPct ? 'Menülere git' : 'Supplementlere git';
  const ctaRoute = mealPct <= suppPct ? '/menus' : '/supplements';
  const waterPct = Math.round(waterRatio * 100);
  const activityPct = Math.round(activityRatio * 100);
  const sleepPct = Math.round(sleepRatio * 100);
  const reasonCandidates = [
    { label: 'Öğünler', value: mealPct },
    { label: 'Takviyeler', value: suppPct },
    { label: 'Su', value: waterPct },
    { label: 'Aktivite', value: activityPct },
    { label: 'Uyku', value: sleepPct },
  ]
    .filter((item) => item.value < 90)
    .sort((a, b) => a.value - b.value)
    .slice(0, 3);
  const reasonLines = reasonCandidates.length
    ? reasonCandidates.map((item) => `• ${item.label} %${item.value}`)
    : ['• Tüm göstergeler güçlü'];
  const monsterStatusText =
    monsterStatus.stateLabel === 'STRONG'
      ? 'Canavar güçleniyor'
      : monsterStatus.stateLabel === 'ALERT'
        ? 'Canavar uyanık'
        : 'Canavar sakin';
  const monsterStatusColor =
    monsterStatus.stateLabel === 'STRONG'
      ? '#EF4444'
      : monsterStatus.stateLabel === 'ALERT'
        ? '#F59E0B'
        : '#16A34A';

  const getScoreColor = (score: number) => {
    if (score >= 70) return '#10B981';
    if (score >= 40) return '#F59E0B';
    return '#EF4444';
  };

  const monsterProgress = defenseScore >= 90 ? 0.9 : defenseScore >= 70 ? 0.7 : defenseScore >= 40 ? 0.5 : 0.25;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <AppHeader title="Savunma" subtitle="Canavar durumu, savunma gücü ve araçlar" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.dayLabel}>Program Günü: {currentDay}</Text>

        <Card style={styles.scoreCard}>
          <View style={styles.scoreTopRow}>
            <View style={styles.scoreLeft}>
              <Text style={styles.scoreTitle}>Savunma Skoru</Text>
              <Text style={styles.scoreValue}>{Math.round(defenseScore)}%</Text>
            </View>
            <View style={styles.scoreRight}>
              <View style={styles.batteryWrap}>
                <View style={styles.batteryOutline}>
                  <View
                    style={[
                      styles.batteryFill,
                      {
                        width: `${Math.max(8, Math.min(100, Math.round(defenseScore)))}%`,
                        backgroundColor:
                          defenseScore >= 80 ? '#16A34A' : defenseScore >= 50 ? '#F59E0B' : '#DC2626',
                      },
                    ]}
                  />
                </View>
                <View style={styles.batteryTerminal} />
              </View>
              <View style={styles.batteryLabelRow}>
                <Ionicons name="flash-outline" size={16} color="#FACC15" style={styles.batteryLabelIcon} />
                <Text style={styles.batteryLabel}>Enerji Seviyesi</Text>
              </View>
            </View>
          </View>
        </Card>

        <Card style={styles.monsterCard}>
          <Text style={styles.monsterTitle}>Canavar</Text>
          <View style={styles.monsterRow}>
            <MonsterAvatar score={defenseScore} size={160} />
            <View style={styles.monsterInfo}>
              <Text style={styles.monsterLabel}>{monsterStatus.title}</Text>
              <Text style={styles.monsterText}>{monsterStatus.message}</Text>
              <Text style={styles.monsterReasonTitle}>Neden böyle?</Text>
              {reasonLines.map((line) => (
                <Text key={line} style={styles.monsterReasonItem}>{line}</Text>
              ))}
            </View>
          </View>
          <Text style={[styles.monsterStatus, { color: monsterStatusColor }]}>{monsterStatusText}</Text>
          {(mealPct < 90 || suppPct < 90) ? (
            <TouchableOpacity style={styles.monsterCta} onPress={() => router.push(ctaRoute)} activeOpacity={0.85}>
              <Text style={styles.monsterCtaText}>{ctaText}</Text>
            </TouchableOpacity>
          ) : null}
        </Card>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Savunma Araçları</Text>
          <Text style={styles.sectionLink}>Keşfet</Text>
        </View>

        <View style={styles.ringsRow}>
          <View style={styles.ringItem}>
            <ProgressCircle
              progress={mealRatio}
              size={64}
              strokeWidth={6}
              color="#10B981"
            />
            <Text style={styles.ringTitle}>Öğünler</Text>
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/menus' })}
              activeOpacity={0.75}
              accessibilityRole="button"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.ringIconButton}
            >
              <Ionicons name="arrow-forward" size={14} color="#0F172A" />
            </TouchableOpacity>
          </View>
          <View style={styles.ringItem}>
            <ProgressCircle
              progress={supplementRatio}
              size={64}
              strokeWidth={6}
              color="#8B5CF6"
            />
            <Text style={styles.ringTitle}>Supp</Text>
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/supplements' })}
              activeOpacity={0.75}
              accessibilityRole="button"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.ringIconButton}
            >
              <Ionicons name="arrow-forward" size={14} color="#0F172A" />
            </TouchableOpacity>
          </View>
          <View style={styles.ringItem}>
            <ProgressCircle
              progress={waterRatio}
              size={64}
              strokeWidth={6}
              color="#3B82F6"
            />
            <Text style={styles.ringTitle}>Su</Text>
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/', params: { focus: 'water' } })}
              activeOpacity={0.75}
              accessibilityRole="button"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.ringIconButton}
            >
              <Ionicons name="arrow-forward" size={14} color="#0F172A" />
            </TouchableOpacity>
          </View>
          <View style={styles.ringItem}>
            <ProgressCircle
              progress={activityRatio}
              size={64}
              strokeWidth={6}
              color="#F59E0B"
            />
            <Text style={styles.ringTitle}>Aktivite</Text>
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/', params: { focus: 'activity' } })}
              activeOpacity={0.75}
              accessibilityRole="button"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.ringIconButton}
            >
              <Ionicons name="arrow-forward" size={14} color="#0F172A" />
            </TouchableOpacity>
          </View>
          <View style={styles.ringItem}>
            <ProgressCircle progress={sleepRatio} size={64} strokeWidth={6} color="#6366F1" />
            <Text style={styles.ringTitle}>Uyku</Text>
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/', params: { focus: 'sleep' } })}
              activeOpacity={0.75}
              accessibilityRole="button"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.ringIconButton}
            >
              <Ionicons name="arrow-forward" size={14} color="#0F172A" />
            </TouchableOpacity>
          </View>
        </View>

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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24
  },
  dayLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12
  },
  scoreCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  scoreTitle: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '600'
  },
  scoreValue: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 12
  },
  scoreTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12
  },
  scoreLeft: {
    flex: 1
  },
  scoreRight: {
    minWidth: 160,
    alignItems: 'flex-start'
  },
  batteryWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  batteryOutline: {
    width: 170,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    padding: 2,
    backgroundColor: 'transparent'
  },
  batteryFill: {
    height: '100%',
    borderRadius: 2
  },
  batteryTerminal: {
    width: 6,
    height: 10,
    borderRadius: 2,
    marginLeft: 2,
    backgroundColor: '#CBD5E1'
  },
  batteryLabel: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'left'
  },
  batteryLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6
  },
  batteryLabelIcon: {
    marginRight: 4
  },
  monsterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2
  },
  monsterTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10
  },
  monsterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  monsterInfo: {
    flex: 1
  },
  monsterLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6
  },
  monsterText: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18
  },
  monsterReasonTitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 6,
    fontWeight: '600'
  },
  monsterReasonItem: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4
  },
  monsterStatus: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6
  },
  monsterCta: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#E8F3F1',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  monsterCtaText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F5A4E',
  },
  monsterCtaMuted: {
    marginTop: 10,
    fontSize: 12,
    color: '#94A3B8',
  },
  sectionHeaderRow: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop: 18, marginBottom: 10 },
  sectionTitle: { fontSize: 22, fontWeight:'800', color:'#0F172A' },
  sectionLink: { fontSize: 14, color:'#94A3B8', fontWeight:'600' },
  ringsRow: { flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between' },
  ringItem: { width: '20%', alignItems: 'center' },
  ringTitle: { marginTop: 8, fontSize: 9, fontWeight: '600', color: '#1F2937' },
  ringIconButton: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  ringValue: { marginTop: 2, fontSize: 9, color: '#6B7280' },
  bottomSpacer: {
    height: 24,
  },
});
