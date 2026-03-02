import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import AppHeader from '../../src/components/AppHeader';
import { Card } from '../../src/components/Card';
import { RECIPES } from '../../src/data/recipes';

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
        {recipes.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            activeOpacity={0.85}
            onPress={() => router.push(`/recipes/${recipe.id}`)}
          >
            <Card style={styles.recipeCard}>
              <Text style={styles.cardTitle}>{recipe.title}</Text>
              <Text style={styles.cardMeta}>{(recipe.ingredients ?? []).length} malzeme</Text>
            </Card>
          </TouchableOpacity>
        ))}
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
