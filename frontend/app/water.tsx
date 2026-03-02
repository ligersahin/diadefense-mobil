import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppHeader from '../src/components/AppHeader';
import { Card } from '../src/components/Card';

export default function WaterScreen() {
  return (
    <View style={styles.container}>
      <AppHeader title="Su Takibi" subtitle="Günlük su hedefi ve kayıtlar" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card>
          <Text style={styles.placeholderTitle}>Yakında</Text>
          <Text style={styles.placeholderText}>
            Su takibi ekranı burada olacak. Hedefler, günlük kayıtlar ve hızlı ekleme.
          </Text>
        </Card>
        <View style={styles.bottomSpacer} />
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
    paddingHorizontal: 20
  },
  placeholderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6
  },
  placeholderText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20
  },
  bottomSpacer: {
    height: 32
  }
});
