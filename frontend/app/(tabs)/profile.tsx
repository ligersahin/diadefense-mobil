import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { DiaDefenseColors } from '../../constants/colors';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  
  const menuItems = [
    {
      title: t('profile.statistics'),
      icon: 'stats-chart-outline',
      route: '/statistics',
    },
    {
      title: t('profile.achievements'),
      icon: 'trophy-outline',
      route: '/achievements',
    },
    {
      title: t('settings.notifications'),
      icon: 'notifications-outline',
      route: '/notifications',
    },
    {
      title: t('settings.personalization'),
      icon: 'color-palette-outline',
      route: '/personalization',
    },
    {
      title: t('profile.settings'),
      icon: 'settings-outline',
      route: '/settings',
    },
  ];
  
  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color="white" />
          </View>
          <Text category="h4" style={styles.name}>
            DiaDefense User
          </Text>
          <Text category="p2" style={styles.subtitle}>
            Health Journey Member
          </Text>
        </View>
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.route as any)}
            >
              <Card style={styles.menuCard}>
                <View style={styles.menuItem}>
                  <View style={styles.menuLeft}>
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name={item.icon as any}
                        size={24}
                        color={DiaDefenseColors.oliveGreen}
                      />
                    </View>
                    <Text category="s1">{item.title}</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#999"
                  />
                </View>
              </Card>
            </TouchableOpacity>
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
  header: {
    alignItems: 'center',
    padding: 24,
    paddingTop: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: DiaDefenseColors.oliveGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
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
  },
  menuCard: {
    marginBottom: 12,
    borderRadius: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DiaDefenseColors.oliveGreenLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});