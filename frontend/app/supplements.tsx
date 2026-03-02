import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useDefenseProgram } from '../src/context/DefenseProgramContext';
import { Card } from '../src/components/Card';

export default function SupplementsScreen() {
  const router = useRouter();
  const { 
    currentDayPlan, 
    currentDayIndex, 
    completedSupplements, 
    toggleSupplementTaken 
  } = useDefenseProgram();

  if (!currentDayPlan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.emptyText}>Program başlatılmadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  const todaySupps = completedSupplements[currentDayIndex] || [];

  const handleToggleSupplement = (id: string) => {
    toggleSupplementTaken(currentDayIndex, id);
  };

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
          <Text style={styles.headerTitle}>Supplementler</Text>
          <Text style={styles.headerSubtitle}>Gün {currentDayIndex}</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons name="information-circle" size={24} color="#3B82F6" />
          </View>
          <Text style={styles.infoText}>
            Supplementlerinizi belirtilen saatlerde almayı unutmayın. Alındıktan sonra işaretleyin.
          </Text>
        </Card>

        {currentDayPlan.supplements.map((supp, index) => {
          const isTaken = todaySupps.includes(supp.id);
          
          return (
            <Card key={supp.id}>
              <View style={styles.suppCard}>
                <View style={styles.suppHeader}>
                  <View style={styles.suppInfo}>
                    <View style={[styles.suppIcon, isTaken && styles.suppIconTaken]}>
                      <Ionicons 
                        name="medical" 
                        size={24} 
                        color={isTaken ? '#8B5CF6' : '#6B7280'} 
                      />
                    </View>
                    <View style={styles.suppDetails}>
                      <Text style={styles.suppTime}>{supp.time}</Text>
                      <Text style={styles.suppName}>{supp.name}</Text>
                      <Text style={styles.suppDose}>{supp.dose}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.checkbox, isTaken && styles.checkboxTaken]}
                    onPress={() => handleToggleSupplement(supp.id)}
                  >
                    {isTaken && (
                      <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          );
        })}

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
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    padding: 16
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EFF6FF'
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20
  },
  suppCard: {
    width: '100%'
  },
  suppHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  suppInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  suppIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  suppIconTaken: {
    backgroundColor: '#EDE9FE'
  },
  suppDetails: {
    flex: 1
  },
  suppTime: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4
  },
  suppName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2
  },
  suppDose: {
    fontSize: 14,
    color: '#6B7280'
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxTaken: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6'
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
