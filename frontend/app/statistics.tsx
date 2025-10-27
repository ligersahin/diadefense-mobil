import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function StatisticsScreen() {
  const { t } = useTranslation();
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: t('profile.statistics'),
        }}
      />
      <Layout style={styles.layout}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          <Card style={styles.card}>
            <Text category="h6" style={styles.cardTitle}>
              Weekly Summary
            </Text>
            <View style={styles.statRow}>
              <Text category="p1">Meals Logged:</Text>
              <Text category="s1">18 / 21</Text>
            </View>
            <View style={styles.statRow}>
              <Text category="p1">Supplements Taken:</Text>
              <Text category="s1">24 / 28</Text>
            </View>
            <View style={styles.statRow}>
              <Text category="p1">Daily Walks:</Text>
              <Text category="s1">5 / 7</Text>
            </View>
          </Card>
          
          <Card style={styles.card}>
            <Text category="h6" style={styles.cardTitle}>
              Energy Trends
            </Text>
            <View style={styles.placeholder}>
              <Text category="p2" style={styles.placeholderText}>
                Graph visualization coming soon
              </Text>
            </View>
          </Card>
          
          <Card style={styles.card}>
            <Text category="h6" style={styles.cardTitle}>
              Glucose Tracking
            </Text>
            <View style={styles.placeholder}>
              <Text category="p2" style={styles.placeholderText}>
                Glucose trends visualization
              </Text>
            </View>
          </Card>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  placeholder: {
    height: 150,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#999',
  },
});