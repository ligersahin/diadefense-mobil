import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/appState';
import { ProgressCard } from '../../components/ProgressCard';
import { DiaDefenseColors } from '../../constants/colors';

export default function TodayScreen() {
  const { t } = useTranslation();
  const completedActivities = useAppStore((state) => state.completedActivities);
  const completeActivity = useAppStore((state) => state.completeActivity);
  
  // Demo data
  const demoSteps = completedActivities.steps ? 8542 : 3421;
  const demoWater = completedActivities.water ? 8 : 4;
  const demoGlucose = completedActivities.glucose ? 2 : 1;
  
  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        <View style={styles.header}>
          <Text category="h3" style={styles.title}>
            {t('today.title')}
          </Text>
          <Text category="p1" style={styles.subtitle}>
            {t('today.dailyGoals')}
          </Text>
        </View>
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          <ProgressCard
            title={t('home.steps')}
            icon="footsteps-outline"
            current={demoSteps}
            target={10000}
            unit="steps"
            color={DiaDefenseColors.oceanBlue}
          />
          
          <ProgressCard
            title={t('home.water')}
            icon="water-outline"
            current={demoWater}
            target={8}
            unit="glasses"
            color={DiaDefenseColors.oceanBlue}
          />
          
          <ProgressCard
            title="Glucose Checks"
            icon="pulse-outline"
            current={demoGlucose}
            target={3}
            unit="checks"
            color={DiaDefenseColors.sandYellow}
          />
          
          <ProgressCard
            title="Daily Walk"
            icon="walk-outline"
            current={completedActivities.walk ? 1 : 0}
            target={1}
            unit="walk"
            color={DiaDefenseColors.oliveGreen}
          />
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 8,
  },
});