import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TR_EDUCATION } from '../../src/config/education/tr-education';
import { Card } from '../../src/components/Card';

export default function InfoScreen() {
  const router = useRouter();

  const warnings = TR_EDUCATION.filter(item => item.type === 'warning').sort((a, b) => a.order - b.order);
  const lessons = TR_EDUCATION.filter(item => item.type === 'lesson').sort((a, b) => a.order - b.order);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Bilgi Merkezi</Text>
          <Text style={styles.subtitle}>Diyabet yönetimi hakkında her şey</Text>
        </View>

        {/* Ayarlar */}
        <TouchableOpacity 
          style={styles.settingsCard}
          onPress={() => router.push('/settings')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#EDE9FE' }]}>
            <Ionicons name="settings" size={24} color="#8B5CF6" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Ayarlar</Text>
            <Text style={styles.cardDescription}>Program ve tercihleriniz</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Kritik Uyarılar */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="warning" size={24} color="#EF4444" />
            <Text style={styles.sectionTitle}>Kritik Uyarılar</Text>
          </View>

          {warnings.map((warning) => (
            <TouchableOpacity
              key={warning.id}
              style={[styles.itemCard, styles.warningCard]}
              onPress={() => router.push(`/education/${warning.id}`)}
            >
              <View style={styles.itemHeader}>
                <Ionicons name="alert-circle" size={20} color="#EF4444" />
                <Text style={styles.itemTitle}>{warning.title}</Text>
              </View>
              {warning.shortDescription && (
                <Text style={styles.itemDescription}>{warning.shortDescription}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Dersler */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book" size={24} color="#10B981" />
            <Text style={styles.sectionTitle}>Eğitim Dersleri</Text>
          </View>

          {lessons.map((lesson) => (
            <TouchableOpacity
              key={lesson.id}
              style={styles.itemCard}
              onPress={() => router.push(`/education/${lesson.id}`)}
            >
              <View style={styles.itemHeader}>
                <Ionicons name="book-outline" size={20} color="#10B981" />
                <Text style={styles.itemTitle}>{lesson.title}</Text>
              </View>
              {lesson.shortDescription && (
                <Text style={styles.itemDescription}>{lesson.shortDescription}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
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
    marginBottom: 16
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280'
  },
  settingsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
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
    color: '#6B7280'
  },
  section: {
    marginBottom: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  warningCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444'
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1
  },
  itemDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 28,
    lineHeight: 20
  },
  bottomSpacer: {
    height: 32
  }
});
