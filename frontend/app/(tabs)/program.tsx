import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import AppHeader from '../../src/components/AppHeader';

export default function ProgramScreen() {
  const router = useRouter();

  const programCards = [
    {
      key: 'menus',
      title: 'Menüler',
      description: 'Günlük öğün planınızı görün ve tamamlayın',
      icon: 'restaurant',
      color: '#10B981',
      bg: '#DCFCE7',
      route: '/menus',
    },
    {
      key: 'supplements',
      title: 'Supplementler',
      description: 'Günlük supplement programınız',
      icon: 'medical',
      color: '#8B5CF6',
      bg: '#EDE9FE',
      route: '/supplements',
    },
    {
      key: 'recipes',
      title: 'Tarifler',
      description: 'Dengeli tarif önerileri',
      icon: 'book',
      color: '#F59E0B',
      bg: '#FEF3C7',
      route: '/recipes',
    },
    {
      key: 'shopping',
      title: 'Alışveriş Listesi',
      description: 'Haftalık listeyi yönetin',
      icon: 'cart',
      color: '#06B6D4',
      bg: '#CFFAFE',
      route: '/shopping',
    },
    {
      key: 'smartplate',
      title: 'Akıllı Tabak',
      description: 'Yemeğinizi analiz edin',
      icon: 'camera',
      color: '#3B82F6',
      bg: '#DBEAFE',
      route: '/smartplate',
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <AppHeader title="Programlar" subtitle="Plan, menüler ve araçlar" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {programCards.map((card) => (
            <TouchableOpacity
              key={card.key}
              style={[styles.gridCard, card.key === 'smartplate' && styles.gridCardFull]}
              onPress={() => router.push(card.route)}
              activeOpacity={0.85}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: card.bg }]}>
                  <Ionicons name={card.icon as any} size={22} color={card.color} />
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    gap: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    minHeight: 150,
  },
  gridCardFull: {
    width: '100%',
    marginTop: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
});
