import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MonsterAnimator } from '../components/MonsterAnimator';
import { useAppStore } from '../store/appState';
import { formatEnergyLevel } from '../utils/helpers';
import { gradientColors } from '../constants/colors';

export default function MonsterScreen() {
  const { t } = useTranslation();
  const energyScore = useAppStore((state) => state.energyScore);
  const monsterState = useAppStore((state) => state.monsterState);
  
  const getGradientColors = () => {
    if (energyScore >= 70) return gradientColors.high;
    if (energyScore >= 40) return gradientColors.balanced;
    return gradientColors.low;
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: t('monster.title'),
          headerTransparent: true,
          headerBlurEffect: 'light',
        }}
      />
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          <View style={styles.monsterContainer}>
            <MonsterAnimator
              state={monsterState}
              energy={energyScore}
              loop
            />
          </View>
          
          <Card style={styles.infoCard}>
            <View style={styles.energyHeader}>
              <Text category="h5">{t('monster.energyLevel')}</Text>
              <Text category="h3" style={styles.energyScore}>
                {energyScore}%
              </Text>
            </View>
            
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${energyScore}%` },
                ]}
              />
            </View>
            
            <Text category="s1" style={styles.energyLevel}>
              {formatEnergyLevel(energyScore)}
            </Text>
            
            <View style={styles.divider} />
            
            <Text category="p1" style={styles.stateMessage}>
              {t(`monster.state.${monsterState}`)}
            </Text>
          </Card>
          
          <Card style={styles.tipsCard}>
            <Text category="h6" style={styles.tipsTitle}>
              How to Boost Energy:
            </Text>
            <View style={styles.tipItem}>
              <Text category="p2">• Complete daily meals (+5 energy each)</Text>
            </View>
            <View style={styles.tipItem}>
              <Text category="p2">• Take supplements (+10 energy each)</Text>
            </View>
            <View style={styles.tipItem}>
              <Text category="p2">• Complete daily walk (+15 energy)</Text>
            </View>
            <View style={styles.tipItem}>
              <Text category="p2">• Track daily activities (+5 energy each)</Text>
            </View>
          </Card>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 100,
  },
  monsterContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  infoCard: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
  },
  energyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  energyScore: {
    fontWeight: 'bold',
  },
  progressBar: {
    height: 12,
    backgroundColor: '#eee',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'rgb(170, 180, 140)',
  },
  energyLevel: {
    fontWeight: '600',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 16,
  },
  stateMessage: {
    textAlign: 'center',
    lineHeight: 22,
  },
  tipsCard: {
    borderRadius: 16,
    padding: 20,
  },
  tipsTitle: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  tipItem: {
    marginBottom: 8,
  },
});