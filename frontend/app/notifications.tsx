import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Layout, Text, Card, Toggle } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { DiaDefenseColors } from '../constants/colors';

const NOTIFICATION_SETTINGS = [
  {
    id: 'breakfast',
    title: 'Breakfast Reminder',
    description: 'Daily at 8:00 AM',
    icon: 'sunny',
  },
  {
    id: 'lunch',
    title: 'Lunch Reminder',
    description: 'Daily at 12:30 PM',
    icon: 'restaurant',
  },
  {
    id: 'dinner',
    title: 'Dinner Reminder',
    description: 'Daily at 7:00 PM',
    icon: 'moon',
  },
  {
    id: 'supplements',
    title: 'Supplement Reminder',
    description: 'Daily at 9:00 AM',
    icon: 'medical',
  },
  {
    id: 'water',
    title: 'Hydration Reminder',
    description: 'Every 2 hours',
    icon: 'water',
  },
  {
    id: 'walk',
    title: 'Daily Walk',
    description: 'Daily at 5:00 PM',
    icon: 'walk',
  },
];

export default function NotificationsScreen() {
  const { t } = useTranslation();
  const [enabledNotifications, setEnabledNotifications] = React.useState<Set<string>>(
    new Set(['breakfast', 'lunch', 'dinner', 'supplements'])
  );
  
  const toggleNotification = (id: string) => {
    const newSet = new Set(enabledNotifications);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setEnabledNotifications(newSet);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: t('settings.notifications'),
        }}
      />
      <Layout style={styles.layout}>
        <View style={styles.header}>
          <Text category="p1" style={styles.headerText}>
            Manage your daily reminders and notifications
          </Text>
        </View>
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          {NOTIFICATION_SETTINGS.map((item) => (
            <Card key={item.id} style={styles.card}>
              <View style={styles.notificationItem}>
                <View style={styles.notificationLeft}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name={`${item.icon}-outline` as any}
                      size={24}
                      color={DiaDefenseColors.oliveGreen}
                    />
                  </View>
                  <View style={styles.notificationInfo}>
                    <Text category="s1" style={styles.title}>
                      {item.title}
                    </Text>
                    <Text category="c1" style={styles.description}>
                      {item.description}
                    </Text>
                  </View>
                </View>
                <Toggle
                  checked={enabledNotifications.has(item.id)}
                  onChange={() => toggleNotification(item.id)}
                />
              </View>
            </Card>
          ))}
          
          <Card style={styles.infoCard}>
            <Text category="p2" style={styles.infoText}>
              Note: Push notifications will be enabled in a future update. These settings are saved for when notifications become available.
            </Text>
          </Card>
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
  headerText: {
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: DiaDefenseColors.oliveGreenLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationInfo: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
    fontWeight: '600',
  },
  description: {
    color: '#999',
  },
  infoCard: {
    borderRadius: 12,
    backgroundColor: DiaDefenseColors.oceanBlueLight,
  },
  infoText: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
  },
});