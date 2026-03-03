import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../src/components/AppHeader';
import { Card } from '../../src/components/Card';
import { RECIPES } from '../../src/data/recipes';
import { getRecipeImage } from '../../src/assets/recipeImages';
import { Theme } from '../../src/config/theme';

const TAB_BAR_BASE = {
  backgroundColor: Theme.surface,
  borderTopWidth: 1,
  borderTopColor: Theme.border,
  height: 60,
  paddingTop: 6,
  paddingBottom: 6,
  elevation: 0,
  shadowOpacity: 0,
};

export default function RecipesScreen() {
  const navigation = useNavigation();
  const lastYRef = useRef(0);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const recipes = Object.values(RECIPES);

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const dy = y - lastYRef.current;
    lastYRef.current = y;
    if (y <= 10) {
      setIsTabHidden(false);
      return;
    }
    if (dy < -12) {
      setIsTabHidden(false);
    } else if (dy > 12 && y > 60) {
      setIsTabHidden(true);
    }
  }, []);

  useEffect(() => {
    const base = { ...TAB_BAR_BASE };
    navigation.setOptions({
      tabBarStyle: isTabHidden
        ? { ...base, opacity: 0, transform: [{ translateY: 80 }], height: 0, paddingBottom: 0 }
        : { ...base, opacity: 1, transform: [{ translateY: 0 }] },
    });
  }, [isTabHidden, navigation]);

  useEffect(() => {
    return () => {
      navigation.setOptions({
        tabBarStyle: { ...TAB_BAR_BASE, opacity: 1, transform: [{ translateY: 0 }] },
      });
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <AppHeader
        title="Tarifler"
        subtitle="Dengeli tarif önerileri"
        showBack
        onBack={() => router.back()}
        showSettings={false}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {recipes.map((recipe) => {
          const key = recipe.thumbImageKey ?? recipe.heroImageKey ?? null;
          const imageSource = getRecipeImage(key);
          return (
            <TouchableOpacity
              key={recipe.id}
              activeOpacity={0.85}
              onPress={() => router.push(`/recipes/${recipe.id}`)}
            >
              <Card style={styles.recipeCard}>
                <View style={styles.cardContent}>
                  <View style={styles.thumbnailWrapper}>
                    {imageSource ? (
                      <Image source={imageSource} style={styles.thumbnail} resizeMode="cover" />
                    ) : (
                      <View style={styles.thumbnailPlaceholder}>
                        <Ionicons name="image-outline" size={24} color="#94A3B8" />
                      </View>
                    )}
                  </View>
                  <View style={styles.textBlock}>
                    <Text style={styles.cardTitle}>{recipe.title}</Text>
                    <Text style={styles.cardMeta}>{(recipe.ingredients ?? []).length} malzeme</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6F8' },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingTop: 18,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
  recipeCard: {
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnailWrapper: {
    width: 64,
    height: 64,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  thumbnail: {
    width: 64,
    height: 64,
  },
  thumbnailPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  cardMeta: {
    fontSize: 13,
    color: '#64748B',
  },
});
