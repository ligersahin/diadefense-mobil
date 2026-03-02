import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { TR_EDUCATION } from '../../src/config/education/tr-education';

const CATEGORY_MAP: Record<string, { title: string; ids: string[]; image: string }> = {
  beslenme: {
    title: 'Beslenme Temelleri',
    ids: ['lesson1', 'lesson2'],
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop',
  },
  'insulin-direnci': {
    title: 'İnsülin Direnci',
    ids: ['lesson3'],
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=800&auto=format&fit=crop',
  },
  'gunluk-aliskanliklar': {
    title: 'Günlük Alışkanlıklar',
    ids: ['warn2', 'warn3'],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
  },
  motivasyon: {
    title: 'Motivasyon',
    ids: ['lesson4', 'warn1'],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop',
  },
};

export default function ArticlesCategoryScreen() {
  const { category } = useLocalSearchParams();
  const categoryKey = typeof category === 'string' ? category : Array.isArray(category) ? category[0] : '';
  const categoryInfo = CATEGORY_MAP[categoryKey];
  const items = categoryInfo
    ? TR_EDUCATION.filter((item) => categoryInfo.ids.includes(item.id))
    : [];

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
          <Text style={styles.title}>{categoryInfo?.title ?? 'Makaleler'}</Text>
          <Text style={styles.subtitle}>Yazılı içerikler</Text>
        </View>

        <View style={styles.cardsRow}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.articleCard}
              onPress={() => router.push(`/education/${item.id}`)}
              activeOpacity={0.85}
            >
              <Image
                source={{ uri: categoryInfo?.image }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <Text style={styles.articleTitle} numberOfLines={2}>
                {item.title}
              </Text>
              {item.shortDescription ? (
                <Text style={styles.articleSubtitle} numberOfLines={2}>
                  {item.shortDescription}
                </Text>
              ) : null}
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
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  articleCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 10,
    marginBottom: 4,
  },
  articleSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
});
