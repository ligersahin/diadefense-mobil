import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../src/components/AppHeader';
import { Card } from '../src/components/Card';

export default function SmartPlateScreen() {
  return (
    <View style={styles.container}>
      <AppHeader title="Akıllı Tabak" subtitle="Yemeğinizi analiz edin" />
      <View style={styles.content}>
        <Card style={styles.card}>
          <Ionicons name="time-outline" size={48} color="#94A3B8" style={styles.icon} />
          <Text style={styles.title}>Akıllı Tabak</Text>
          <Text style={styles.body}>Akıllı Tabak özelliği yakında aktif olacak.</Text>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
    textAlign: 'center',
  },
  body: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
});
