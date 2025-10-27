import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/appState';
import { SupplementCard } from '../../components/SupplementCard';

const SUPPLEMENTS = [
  {
    id: 'vitamin-d',
    name: 'Vitamin D',
    description: 'Supports bone health and immune function',
  },
  {
    id: 'omega-3',
    name: 'Omega-3',
    description: 'Essential fatty acids for heart and brain health',
  },
  {
    id: 'black-seed-oil',
    name: 'Black Seed Oil',
    description: 'Natural anti-inflammatory and antioxidant',
  },
  {
    id: 'magnesium',
    name: 'Magnesium',
    description: 'Supports muscle and nerve function',
  },
];

export default function SupplementsScreen() {
  const { t } = useTranslation();
  const completedSupplements = useAppStore((state) => state.completedSupplements);
  const completeSupplement = useAppStore((state) => state.completeSupplement);
  
  const handleToggle = (id: string) => {
    if (completedSupplements.includes(id)) {
      // Remove from completed
      const current = useAppStore.getState().completedSupplements;
      useAppStore.setState({
        completedSupplements: current.filter((s) => s !== id),
      });
    } else {
      completeSupplement(id);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        <View style={styles.header}>
          <Text category="h3" style={styles.title}>
            {t('supplements.title')}
          </Text>
          <Text category="p1" style={styles.subtitle}>
            {completedSupplements.length} / {SUPPLEMENTS.length} {t('supplements.taken')}
          </Text>
        </View>
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          {SUPPLEMENTS.map((supplement) => (
            <SupplementCard
              key={supplement.id}
              id={supplement.id}
              name={supplement.name}
              description={supplement.description}
              taken={completedSupplements.includes(supplement.id)}
              onToggle={() => handleToggle(supplement.id)}
            />
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
    padding: 16,
    paddingBottom: 8,
  },
  title: {
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
    paddingTop: 8,
  },
});