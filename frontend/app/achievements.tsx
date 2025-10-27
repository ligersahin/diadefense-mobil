import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { DiaDefenseColors } from '../constants/colors';

const ACHIEVEMENTS = [
  {
    id: 1,
    title: '3-Day Streak',
    description: 'Complete 3 consecutive days',
    icon: 'flame',
    unlocked: true,
  },
  {
    id: 2,
    title: 'Meal Master',
    description: 'Log 21 meals',
    icon: 'restaurant',
    unlocked: true,
  },
  {
    id: 3,
    title: 'Supplement Champion',
    description: 'Take supplements for 7 days',
    icon: 'medical',
    unlocked: false,
  },
  {
    id: 4,
    title: 'Monster Level 5',
    description: 'Reach 80% energy',
    icon: 'trophy',
    unlocked: false,
  },
  {
    id: 5,
    title: 'Weekly Warrior',
    description: 'Complete all goals for a week',
    icon: 'star',
    unlocked: false,
  },
];

export default function AchievementsScreen() {
  const { t } = useTranslation();
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: t('profile.achievements'),
        }}
      />
      <Layout style={styles.layout}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          {ACHIEVEMENTS.map((achievement) => (
            <Card
              key={achievement.id}
              style={[
                styles.card,
                !achievement.unlocked && styles.lockedCard,
              ]}
            >
              <View style={styles.cardContent}>
                <View
                  style={[
                    styles.iconContainer,
                    achievement.unlocked
                      ? styles.unlockedIcon
                      : styles.lockedIcon,
                  ]}
                >
                  <Ionicons
                    name={achievement.icon as any}
                    size={32}
                    color={achievement.unlocked ? DiaDefenseColors.sandYellow : '#ccc'}
                  />
                </View>
                
                <View style={styles.info}>
                  <Text
                    category="s1"
                    style={[
                      styles.title,
                      !achievement.unlocked && styles.lockedText,
                    ]}
                  >
                    {achievement.title}
                  </Text>
                  <Text
                    category="p2"
                    style={[
                      styles.description,
                      !achievement.unlocked && styles.lockedText,
                    ]}
                  >
                    {achievement.description}
                  </Text>
                </View>
                
                {achievement.unlocked && (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={DiaDefenseColors.oliveGreen}
                  />
                )}
              </View>
            </Card>
          ))}
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
  },
  lockedCard: {
    opacity: 0.6,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockedIcon: {
    backgroundColor: DiaDefenseColors.sandYellowLight,
  },
  lockedIcon: {
    backgroundColor: '#f5f5f5',
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: '#666',
    fontSize: 12,
  },
  lockedText: {
    color: '#999',
  },
});