import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Card } from '../src/components/Card';
import { useDefenseProgram } from '../src/context/DefenseProgramContext';

export default function SmartPlateScreen() {
  const router = useRouter();
  const { addWater, setActivityScore } = useDefenseProgram();
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Hata', 'Galeri erişimi için izin gerekli');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8
    });

    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
      analyzeImage();
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Hata', 'Kamera erişimi için izin gerekli');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8
    });

    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
      analyzeImage();
    }
  };

  const analyzeImage = () => {
    setAnalyzing(true);
    
    // Dummy analysis - Gerçek AI entegrasyonu için placeholder
    setTimeout(() => {
      setAnalysis({
        calories: 450,
        protein: 28,
        carbs: 42,
        fat: 18,
        fiber: 8,
        glycemicLoad: 'Orta',
        recommendation: 'İyi dengeli bir öğün! Protein oranı uygun, karbonhidrat miktarı kontrol altında.',
        score: 85
      });
      setAnalyzing(false);
    }, 2000);
  };

  const resetAnalysis = () => {
    setImage(null);
    setAnalysis(null);
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
          <Text style={styles.headerTitle}>Akıllı Tabak</Text>
          <Text style={styles.headerSubtitle}>Yemeğinizi analiz edin</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!image ? (
          <>
            <Card style={styles.infoCard}>
              <Ionicons name="information-circle" size={32} color="#3B82F6" />
              <Text style={styles.infoTitle}>Nasıl Çalışır?</Text>
              <Text style={styles.infoText}>
                Yemeğinizin fotoğrafını çekin veya galeriden seçin. Akıllı analiz sistemi besin değerlerini tahmin edecek ve öneriler sunacak.
              </Text>
            </Card>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
                <View style={[styles.buttonIcon, { backgroundColor: '#DBEAFE' }]}>
                  <Ionicons name="camera" size={32} color="#3B82F6" />
                </View>
                <Text style={styles.buttonText}>Fotoğraf Çek</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
                <View style={[styles.buttonIcon, { backgroundColor: '#EDE9FE' }]}>
                  <Ionicons name="images" size={32} color="#8B5CF6" />
                </View>
                <Text style={styles.buttonText}>Galeriden Seç</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Card>
              <Image source={{ uri: image }} style={styles.image} />
            </Card>

            {analyzing && (
              <Card style={styles.analyzingCard}>
                <Text style={styles.analyzingText}>Analiz ediliyor...</Text>
              </Card>
            )}

            {analysis && (
              <>
                <Card style={styles.scoreCard}>
                  <Text style={styles.scoreLabel}>Beslenme Skoru</Text>
                  <Text style={[
                    styles.scoreValue,
                    { color: analysis.score >= 70 ? '#10B981' : analysis.score >= 50 ? '#F59E0B' : '#EF4444' }
                  ]}>
                    {analysis.score}/100
                  </Text>
                </Card>

                <Card>
                  <Text style={styles.sectionTitle}>Besin Değerleri (Tahmini)</Text>
                  
                  <View style={styles.nutrientRow}>
                    <Text style={styles.nutrientLabel}>Kalori</Text>
                    <Text style={styles.nutrientValue}>{analysis.calories} kcal</Text>
                  </View>
                  
                  <View style={styles.nutrientRow}>
                    <Text style={styles.nutrientLabel}>Protein</Text>
                    <Text style={styles.nutrientValue}>{analysis.protein}g</Text>
                  </View>
                  
                  <View style={styles.nutrientRow}>
                    <Text style={styles.nutrientLabel}>Karbonhidrat</Text>
                    <Text style={styles.nutrientValue}>{analysis.carbs}g</Text>
                  </View>
                  
                  <View style={styles.nutrientRow}>
                    <Text style={styles.nutrientLabel}>Yağ</Text>
                    <Text style={styles.nutrientValue}>{analysis.fat}g</Text>
                  </View>
                  
                  <View style={styles.nutrientRow}>
                    <Text style={styles.nutrientLabel}>Lif</Text>
                    <Text style={styles.nutrientValue}>{analysis.fiber}g</Text>
                  </View>
                  
                  <View style={styles.nutrientRow}>
                    <Text style={styles.nutrientLabel}>Glisemik Yük</Text>
                    <Text style={styles.nutrientValue}>{analysis.glycemicLoad}</Text>
                  </View>
                </Card>

                <Card style={styles.recommendationCard}>
                  <View style={styles.recommendationHeader}>
                    <Ionicons name="bulb" size={24} color="#F59E0B" />
                    <Text style={styles.recommendationTitle}>Öneri</Text>
                  </View>
                  <Text style={styles.recommendationText}>{analysis.recommendation}</Text>
                </Card>

                <View style={styles.actionButtonsRow}>
                  <TouchableOpacity 
                    style={styles.secondaryButton}
                    onPress={resetAnalysis}
                  >
                    <Text style={styles.secondaryButtonText}>Yeni Analiz</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
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
    alignItems: 'center',
    backgroundColor: '#EFF6FF'
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 8
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  buttonIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12
  },
  analyzingCard: {
    alignItems: 'center',
    backgroundColor: '#FEF3C7'
  },
  analyzingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937'
  },
  scoreCard: {
    alignItems: 'center',
    backgroundColor: '#DCFCE7'
  },
  scoreLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 8
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16
  },
  nutrientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  nutrientLabel: {
    fontSize: 15,
    color: '#6B7280'
  },
  nutrientValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937'
  },
  recommendationCard: {
    backgroundColor: '#FFFBEB'
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8
  },
  recommendationText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#10B981'
  },
  secondaryButtonText: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '600'
  },
  bottomSpacer: {
    height: 32
  }
});
