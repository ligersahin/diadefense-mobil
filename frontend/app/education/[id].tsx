import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TR_EDUCATION } from '../../src/config/education/tr-education';
import { Card } from '../../src/components/Card';

export default function EducationDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [acknowledged, setAcknowledged] = useState(false);

  const item = TR_EDUCATION.find(e => e.id === id);

  useEffect(() => {
    if (item?.isCritical) {
      checkAcknowledgment();
    }
  }, [item]);

  const checkAcknowledgment = async () => {
    if (!item) return;
    try {
      const value = await AsyncStorage.getItem(`@education_ack_${item.id}`);
      setAcknowledged(value === 'true');
    } catch (error) {
      console.error('Failed to check acknowledgment:', error);
    }
  };

  const handleAcknowledge = async () => {
    if (!item) return;
    try {
      await AsyncStorage.setItem(`@education_ack_${item.id}`, 'true');
      setAcknowledged(true);
    } catch (error) {
      console.error('Failed to save acknowledgment:', error);
    }
  };

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.emptyText}>İçerik bulunamadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {item.type === 'warning' ? 'Uyarı' : 'Ders'}
          </Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {item.isCritical && (
          <Card style={styles.criticalBanner}>
            <View style={styles.criticalHeader}>
              <Ionicons name="warning" size={32} color="#EF4444" />
              <Text style={styles.criticalText}>Kritik Bilgi</Text>
            </View>
            <Text style={styles.criticalSubtext}>
              Bu bilgiyi dikkatlice okuyun ve anladığınızı onaylayın.
            </Text>
          </Card>
        )}

        <Card>
          <Text style={styles.contentTitle}>{item.title}</Text>
          <Text style={styles.contentText}>{item.content}</Text>
        </Card>

        {item.isCritical && (
          <Card>
            <TouchableOpacity 
              style={[
                styles.acknowledgeButton,
                acknowledged && styles.acknowledgeButtonDone
              ]}
              onPress={handleAcknowledge}
              disabled={acknowledged}
            >
              <Ionicons 
                name={acknowledged ? "checkmark-circle" : "checkbox-outline"} 
                size={24} 
                color={acknowledged ? "#10B981" : "#FFFFFF"} 
              />
              <Text style={[
                styles.acknowledgeButtonText,
                acknowledged && styles.acknowledgeButtonTextDone
              ]}>
                {acknowledged ? 'Okundu ve Anlaşıldı' : 'Okudum ve Anlaşıldı'}
              </Text>
            </TouchableOpacity>
          </Card>
        )}

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  headerContent: {
    flex: 1
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937'
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    padding: 16
  },
  criticalBanner: {
    backgroundColor: '#FEE2E2',
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444'
  },
  criticalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  criticalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DC2626',
    marginLeft: 12
  },
  criticalSubtext: {
    fontSize: 14,
    color: '#991B1B',
    lineHeight: 20
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16
  },
  contentText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 28
  },
  acknowledgeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 12
  },
  acknowledgeButtonDone: {
    backgroundColor: '#D1FAE5',
    borderWidth: 2,
    borderColor: '#10B981'
  },
  acknowledgeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8
  },
  acknowledgeButtonTextDone: {
    color: '#10B981'
  },
  bottomSpacer: {
    height: 32
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280'
  }
});
