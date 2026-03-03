import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import AppHeader from '../../src/components/AppHeader';
import { Card } from '../../src/components/Card';
import { RECIPES } from '../../src/data/recipes';
import { getRecipeImage } from '../../src/assets/recipeImages';

export default function RecipesScreen() {
  const recipes = Object.values(RECIPES);

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
