import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AppHeader from '../src/components/AppHeader';

const featured = {
  title: 'Şeker Dengesinde 10 Dakika',
  subtitle: 'Kısa egzersizlerle kan şekeri yönetimi',
  image:
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
};

const podcasts = [
  {
    id: 'p1',
    title: 'DiaDefense Felsefesi',
    author: 'Uzman Konuk',
    image: require('../assets/images/podcasts/diadefense-philosophy.png'),
  },
  {
    id: 'p2',
    title: 'Beslenme 101',
    author: 'Diyetisyen',
    image: {
      uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
    },
  },
  {
    id: 'p3',
    title: 'Motivasyon Notları',
    author: 'Koç',
    image: {
      uri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop',
    },
  },
];

const categories = [
  { id: 'c1', label: 'Nutrition', icon: 'restaurant' as const },
  { id: 'c2', label: 'Diabetes', icon: 'heart' as const },
  { id: 'c3', label: 'Motivation', icon: 'flash' as const },
  { id: 'c4', label: 'Science', icon: 'flask' as const },
];

export default function MediaHubScreen() {
  return (
    <View style={styles.screen}>
      <AppHeader title="Info Hub" subtitle="Videolar, Podcastler ve Makaleler" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Videolar</Text>
          <Text style={styles.sectionHint}>Öne çıkanlar</Text>
        </View>

        <ImageBackground source={{ uri: featured.image }} style={styles.featured}>
          <View style={styles.featuredOverlay} />
          <View style={styles.featuredContent}>
            <View style={styles.featuredBadge}>
              <Ionicons name="play" size={14} color="#FFFFFF" />
              <Text style={styles.featuredBadgeText}>Öne Çıkan Video</Text>
            </View>
            <Text style={styles.featuredTitle}>{featured.title}</Text>
            <Text style={styles.featuredSubtitle}>{featured.subtitle}</Text>
          </View>
        </ImageBackground>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Podcast’ler</Text>
          <Text style={styles.sectionHint}>Yeni bölümler</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {podcasts.map((item, index) => {
            const CardWrapper = index === 0 ? TouchableOpacity : View;
            return (
              <CardWrapper
                key={item.id}
                style={styles.podcastCard}
                onPress={index === 0 ? () => router.push('/media-player') : undefined}
                activeOpacity={index === 0 ? 0.85 : undefined}
              >
                <Image
                  source={item.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <Text style={styles.podcastTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.podcastAuthor}>{item.author}</Text>
              </CardWrapper>
            );
          })}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Makaleler</Text>
          <Text style={styles.sectionHint}>En Popülerler</Text>
        </View>

        <View style={styles.articlesRow}>
          <TouchableOpacity
            style={styles.podcastCard}
            onPress={() => router.push('/articles')}
            activeOpacity={0.85}
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
              }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <Text style={styles.podcastTitle} numberOfLines={2}>
              Makale Kategorileri
            </Text>
            <Text style={styles.podcastAuthor}>Beslenme, Motivasyon, Bilim</Text>
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.podcastCard}
              onPress={() => router.push('/education/lesson1')}
              activeOpacity={0.85}
            >
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop',
                }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <Text style={styles.podcastTitle} numberOfLines={2}>
                📚 Diyabet Nedir?
              </Text>
              <Text style={styles.podcastAuthor}>Temel bilgiler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.podcastCard}
              onPress={() => router.push('/education/lesson2')}
              activeOpacity={0.85}
            >
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
                }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <Text style={styles.podcastTitle} numberOfLines={2}>
                📚 Beslenme ve Diyabet
              </Text>
              <Text style={styles.podcastAuthor}>Pratik öneriler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.podcastCard}
              onPress={() => router.push('/education/warn1')}
              activeOpacity={0.85}
            >
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
                }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <Text style={styles.podcastTitle} numberOfLines={2}>
                ⚠️ Hipoglisemi Belirtileri
              </Text>
              <Text style={styles.podcastAuthor}>Kritik uyarı</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <Text style={styles.sectionHint}>Keşfet</Text>
        </View>

        <View style={styles.categoryGrid}>
          {categories.map((item) => (
            <View key={item.id} style={styles.categoryCard}>
              <View style={styles.categoryIcon}>
                <Ionicons name={item.icon} size={18} color="#0F172A" />
              </View>
              <Text style={styles.categoryLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F6F8' },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 18,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
  featured: {
    height: 190,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'flex-end',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  featuredContent: {
    padding: 16,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.9)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 10,
    gap: 6,
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  featuredSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  sectionHint: {
    fontSize: 13,
    color: '#94A3B8',
  },
  podcastCard: {
    width: 160,
    marginRight: 12,
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
  podcastTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  podcastAuthor: {
    fontSize: 12,
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
  },
  articlesRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  bottomSpacer: {
    height: 32,
  },
});
