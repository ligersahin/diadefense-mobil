import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useDefenseProgram } from '../src/context/DefenseProgramContext';
import { Card } from '../src/components/Card';

export default function SettingsScreen() {
  const router = useRouter();
  const { startISO, setStartISO } = useDefenseProgram();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    setHasStarted(!!startISO);
  }, [startISO]);

  const handleStartProgram = () => {
    Alert.alert(
      'Programı Başlat',
      'Bugün programınızın 1. günü olarak ayarlanacak. Devam etmek istiyor musunuz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Başlat', 
          onPress: () => {
            const today = new Date().toISOString();
            setStartISO(today);
            Alert.alert('Başarılı', 'Program başlatıldı! İyi şanslar!');
          }
        }
      ]
    );
  };

  const handleResetProgram = () => {
    Alert.alert(
      'Programı Sıfırla',
      'Tüm ilerlemeniz silinecek ve program baştan başlayacak. Emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sıfırla', 
          style: 'destructive',
          onPress: () => {
            const today = new Date().toISOString();
            setStartISO(today);
            Alert.alert('Başarılı', 'Program sıfırlandı.');
          }
        }
      ]
    );
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
          <Text style={styles.headerTitle}>Ayarlar</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Program Durumu */}
        <Card>
          <View style={styles.statusContainer}>
            <View style={styles.statusHeader}>
              <Ionicons 
                name={hasStarted ? "checkmark-circle" : "alert-circle"} 
                size={32} 
                color={hasStarted ? "#10B981" : "#F59E0B"} 
              />
              <Text style={styles.statusTitle}>
                {hasStarted ? 'Program Aktif' : 'Program Başlatılmadı'}
              </Text>
            </View>
            {hasStarted && startISO && (
              <Text style={styles.statusText}>
                Başlangıç tarihi: {new Date(startISO).toLocaleDateString('tr-TR')}
              </Text>
            )}
          </View>
        </Card>

        {/* Program Kontrolleri */}
        <Text style={styles.sectionTitle}>Program Yönetimi</Text>

        {!hasStarted ? (
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleStartProgram}
          >
            <Ionicons name="play-circle" size={24} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Programı Başlat</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.dangerButton}
            onPress={handleResetProgram}
          >
            <Ionicons name="refresh-circle" size={24} color="#FFFFFF" />
            <Text style={styles.dangerButtonText}>Programı Sıfırla</Text>
          </TouchableOpacity>
        )}

        {/* Hakkında */}
        <Text style={styles.sectionTitle}>Uygulama</Text>

        <Card>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Versiyon</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={[styles.infoRow, styles.infoRowLast]}>
            <Text style={styles.infoLabel}>Uygulama Adı</Text>
            <Text style={styles.infoValue}>DiaDefense</Text>
          </View>
        </Card>

        <Card style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>Hakkında</Text>
          <Text style={styles.aboutText}>
            DiaDefense, diyabet yönetimini kolaylaştıran, size özel bir dijital sağlık asistanıdır. 
            90 günlük programınız boyunca sizi yönlendirir ve motive eder.
          </Text>
          <Text style={styles.aboutText}>
            Defi ve Diyabet Canavarı animasyonları ile görsel geri bildirim alarak, 
            sağlıklı yaşam alışkanlıklarını geliştirebilirsiniz.
          </Text>
        </Card>

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
  statusContainer: {
    alignItems: 'center'
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12
  },
  statusText: {
    fontSize: 14,
    color: '#6B7280'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 12
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  dangerButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  infoRowLast: {
    borderBottomWidth: 0
  },
  infoLabel: {
    fontSize: 16,
    color: '#6B7280'
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937'
  },
  aboutCard: {
    backgroundColor: '#EFF6FF'
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12
  },
  aboutText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 12
  },
  bottomSpacer: {
    height: 32
  }
});
