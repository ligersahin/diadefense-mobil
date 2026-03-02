import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const categories = [
  { id: 'beslenme', label: 'Beslenme Temelleri', icon: 'restaurant' as const },
  { id: 'insulin-direnci', label: 'İnsülin Direnci', icon: 'heart' as const },
  { id: 'gunluk-aliskanliklar', label: 'Günlük Alışkanlıklar', icon: 'walk' as const },
  { id: 'motivasyon', label: 'Motivasyon', icon: 'flash' as const },
];

export default function ArticlesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color="#0F172A" />
            <Text style={styles.backText}>Geri</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Makaleler</Text>
          <Text style={styles.subtitle}>Kategoriler</Text>
        </View>

        <View style={styles.categoryGrid}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryCard}
              onPress={() => router.push(`/articles/${item.id}`)}
              activeOpacity={0.85}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name={item.icon} size={18} color="#0F172A" />
              </View>
              <Text style={styles.categoryLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  categoryIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    flex: 1,
    marginLeft: 8,
  },
});
