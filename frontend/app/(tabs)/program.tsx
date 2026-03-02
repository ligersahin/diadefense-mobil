import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Card } from '../../src/components/Card';

export default function ProgramScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Program</Text>
          <Text style={styles.subtitle}>Günlük beslenme ve destek programınız</Text>
        </View>

        <TouchableOpacity 
          style={styles.menuCard}
          onPress={() => router.push('/menus')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#DCFCE7' }]}>
            <Ionicons name="restaurant" size={32} color="#10B981" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Menüler</Text>
            <Text style={styles.cardDescription}>
              Günlük öğün planınızı görün ve tamamlayın
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuCard}
          onPress={() => router.push('/supplements')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#EDE9FE' }]}>
            <Ionicons name="medical" size={32} color="#8B5CF6" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Supplementler</Text>
            <Text style={styles.cardDescription}>
              Günlük supplement programınız
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuCard}
          onPress={() => router.push('/smartplate')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#DBEAFE' }]}>
            <Ionicons name="camera" size={32} color="#3B82F6" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Akıllı Tabak</Text>
            <Text style={styles.cardDescription}>
              Yemeğinizin fotoğrafını çekin, analiz edin
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    padding: 16
  },
  header: {
    marginBottom: 24
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280'
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  cardContent: {
    flex: 1
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20
  }
});
