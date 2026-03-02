import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDefenseProgram } from '../../src/context/DefenseProgramContext';
import { Card } from '../../src/components/Card';
import { ProgressCircle } from '../../src/components/ProgressCircle';
import { getCurrentProgramDay } from '../../src/utils/programDay';
import MonsterAvatar from '../../src/components/MonsterAvatar';

export default function DefensePanelScreen() {
  const {
    defenseScore,
    monsterState,
    defiMood,
    defiMessage,
    mealRatio,
    supplementRatio,
    waterRatio,
    activityRatio,
    sleepRatio,
    currentDayIndex,
    startISO
  } = useDefenseProgram();

  const currentDay = getCurrentProgramDay(startISO);

  const getMonsterStatus = (score: number) => {
    if (score >= 80) return { label: '🟣 WEAK', message: 'Canavar zayıflıyor. Savunman güçlü.' };
    if (score >= 60) return { label: '🟡 NEUTRAL', message: 'Denge var. Dikkati bırakma.' };
    if (score >= 40) return { label: '🟠 STRONG', message: 'Canavar güçleniyor. Programdan sapma.' };
    return { label: '🔴 ANGRY', message: 'Tehlike! Canavar kontrolden çıkıyor.' };
  };

  const getHelperText = (score: number) => {
    if (score >= 80) return 'Harika gidiyorsun — hedefi koru.';
    if (score >= 50) return 'İyi gidiyorsun — 80+ hedefle.';
    return 'Savunma zayıf — bugün toparlayalım.';
  };

  const monsterStatus = getMonsterStatus(defenseScore);

  const getScoreColor = (score: number) => {
    if (score >= 70) return '#10B981';
    if (score >= 40) return '#F59E0B';
    return '#EF4444';
  };

  const getStatusDotColor = (state: string) => {
    if (state === 'weak') return '#8B5CF6'; // Purple
    if (state === 'neutral') return '#F59E0B'; // Yellow/Orange
    return '#EF4444'; // Red for angry
  };

  const getDefiCoachMessage = (state: string, score: number) => {
    if (state === 'weak' || score >= 80) {
      return 'Harika gidiyorsun! Canavar zayıflıyor. Bu momentumu koru.';
    }
    if (state === 'neutral' || (score >= 60 && score < 80)) {
      return 'Denge var ama dikkatli ol. Programına sadık kal.';
    }
    if (score >= 40 && score < 60) {
      return 'Canavar güçleniyor. Programdan sapma var. Hemen toparla!';
    }
    return 'Tehlike! Canavar kontrolden çıkıyor. Acil önlem al.';
  };

  const getActionChips = (state: string, score: number) => {
    if (state === 'weak' || score >= 80) {
      return ['10 dk yürüyüş', '1L su'];
    }
    if (state === 'neutral' || (score >= 60 && score < 80)) {
      return ['Öğünleri tamamla', '1L su'];
    }
    return ['Öğünleri tamamla', '10 dk yürüyüş'];
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.subtitle}>Program Günü: {currentDay}</Text>
        </View>

        {/* Ana Skor Kartı */}
        <Card style={styles.mainScoreCard}>
          <View style={styles.monsterContainer}>
            <MonsterAvatar score={defenseScore} size={200} />
            <Text style={styles.statusLabel}>
              {monsterStatus.label}
            </Text>
            <Text style={styles.statusMessage}>
              {monsterStatus.message}
            </Text>
          </View>
          
          <Text style={styles.mainScoreLabel}>Savunma Gücü</Text>
          <Text style={[
            styles.mainScoreValue,
            { color: getScoreColor(defenseScore) }
          ]}>
            {Math.round(defenseScore)}
          </Text>
          <View style={styles.scoreBar}>
            <View style={[
              styles.scoreBarFill,
              { 
                width: `${defenseScore}%`,
                backgroundColor: getScoreColor(defenseScore)
              }
            ]} />
          </View>
          <Text style={styles.helperText}>
            {getHelperText(defenseScore)}
          </Text>
        </Card>

        {/* Savunma Oranları */}
        <Text style={styles.sectionTitle}>Savunma Oranları</Text>
        
        <View style={styles.ratiosContainer}>
          <View style={styles.ratioCard}>
            <ProgressCircle 
              progress={mealRatio} 
              size={80} 
              strokeWidth={6}
              color="#10B981"
            />
            <Text style={styles.ratioLabel}>Öğünler</Text>
          </View>

          <View style={styles.ratioCard}>
            <ProgressCircle 
              progress={supplementRatio} 
              size={80} 
              strokeWidth={6}
              color="#8B5CF6"
            />
            <Text style={styles.ratioLabel}>Supplement</Text>
          </View>

          <View style={styles.ratioCard}>
            <ProgressCircle 
              progress={waterRatio} 
              size={80} 
              strokeWidth={6}
              color="#3B82F6"
            />
            <Text style={styles.ratioLabel}>Su</Text>
          </View>
        </View>

        <View style={styles.ratiosContainer}>
          <View style={styles.ratioCard}>
            <ProgressCircle 
              progress={activityRatio} 
              size={80} 
              strokeWidth={6}
              color="#F59E0B"
            />
            <Text style={styles.ratioLabel}>Aktivite</Text>
          </View>

          <View style={styles.ratioCard}>
            <ProgressCircle 
              progress={sleepRatio} 
              size={80} 
              strokeWidth={6}
              color="#6366F1"
            />
            <Text style={styles.ratioLabel}>Uyku</Text>
          </View>

          <View style={styles.ratioCard} />
        </View>

        {/* Defi Yorumu */}
        <Card style={styles.defiCard}>
          <View style={styles.defiHeader}>
            <View style={[styles.statusDot, { backgroundColor: getStatusDotColor(monsterState) }]} />
            <Text style={styles.defiTitle}>Defi'nin Yorumu</Text>
            {(monsterState === 'angry' || defenseScore < 40) && (
              <Text style={styles.warningIcon}>⚠️</Text>
            )}
          </View>
          <Text style={styles.defiMessage}>{getDefiCoachMessage(monsterState, defenseScore)}</Text>
          <View style={styles.actionChips}>
            {getActionChips(monsterState, defenseScore).map((chip, index) => (
              <View key={index} style={styles.actionChip}>
                <Text style={styles.actionChipText}>{chip}</Text>
              </View>
            ))}
          </View>
        </Card>

        <View style={styles.bottomSpacer} />
      </ScrollView>
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
  header: {
    marginBottom: 12,
    marginTop: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280'
  },
  mainScoreCard: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingTop: 12
  },
  mainScoreLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 6
  },
  mainScoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 12
  },
  scoreBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12
  },
  helperText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic'
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 6
  },
  monsterContainer: {
    alignItems: 'center',
    marginBottom: 8
  },
  statusLabel: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '700',
    marginTop: 12
  },
  statusMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 4,
    marginBottom: 12
  },
  ratiosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  ratioCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  ratioLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center'
  },
  defiCard: {
    backgroundColor: '#FFFFFF'
  },
  defiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8
  },
  defiTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1
  },
  warningIcon: {
    fontSize: 18
  },
  defiMessage: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12
  },
  actionChips: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  actionChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8
  },
  actionChipText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500'
  },
  bottomSpacer: {
    height: 32
  }
});
