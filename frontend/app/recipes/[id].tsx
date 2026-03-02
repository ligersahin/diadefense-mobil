import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import AppHeader from '../../src/components/AppHeader';
import { Card } from '../../src/components/Card';
import { RECIPES } from '../../src/data/recipes';
import { getRecipeHeroImage } from '../../src/assets/recipeImages';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const recipe = id ? RECIPES[id as keyof typeof RECIPES] : undefined;
  const ingredients = recipe?.ingredients ?? [];
  const steps = recipe?.steps ?? [];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <AppHeader
        title={recipe ? recipe.title : 'Tarif'}
        subtitle="Tarif detayları"
        showBack
        onBack={() => router.back()}
        showSettings={false}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!recipe ? (
          <Text style={styles.notFound}>Bulunamadı</Text>
        ) : (
          <View style={styles.content}>
            {getRecipeHeroImage(recipe.heroImageKey) ? (
              <Image source={getRecipeHeroImage(recipe.heroImageKey)} style={styles.heroImage} resizeMode="cover" />
            ) : (
              <View style={styles.heroPlaceholder}>
                <Text style={styles.heroEmoji}>🛡️</Text>
                <Text style={styles.heroPlaceholderText}>Görsel yakında</Text>
              </View>
            )}
            {ingredients.length > 0 ? (
              <Card style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Malzemeler</Text>
                {ingredients.map((item, index) => (
                  <Text key={`${item}-${index}`} style={styles.listItem}>
                    • {item}
                  </Text>
                ))}
              </Card>
            ) : null}

            {steps.length > 0 ? (
              <Card style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Hazırlanışı</Text>
                {steps.map((step, index) => (
                  <Text key={`${step}-${index}`} style={styles.listItem}>
                    {index + 1}. {step}
                  </Text>
                ))}
              </Card>
            ) : null}

            {recipe.notes ? (
              <Card style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Notlar</Text>
                <Text style={styles.body}>{recipe.notes}</Text>
              </Card>
            ) : null}
          </View>
        )}
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
  notFound: {
    fontSize: 16,
    color: '#0F172A',
  },
  content: {
    gap: 12,
  },
  heroImage: {
    width: '100%',
    height: 190,
    borderRadius: 16,
  },
  heroPlaceholder: {
    width: '100%',
    height: 190,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 24,
    marginBottom: 6,
  },
  heroPlaceholderText: {
    fontSize: 12,
    color: '#64748B',
  },
  sectionCard: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  listItem: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
});
