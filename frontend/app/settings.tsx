import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, Pressable, Platform, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { Card } from '../src/components/Card';
import { cancelAllAppNotifications, NOTIFICATIONS_ENABLED_KEY } from '../src/notifications/notificationsGate';
import { useDefenseProgram } from '../src/context/DefenseProgramContext';
import AppHeader from '../src/components/AppHeader';

export default function SettingsScreen() {
  const router = useRouter();
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { startISO, setStartISO, resetProgram } = useDefenseProgram();
  
  const programStarted = !!startISO;

  useEffect(() => {
    const loadNotificationsEnabled = async () => {
      try {
        const stored = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED_KEY);
        if (stored === null) {
          setNotificationsEnabled(true);
          return;
        }
        setNotificationsEnabled(stored === 'true');
      } catch {
        // TODO: Bildirim ayarı okunamazsa varsayılan true kullanılır.
      }
    };
    loadNotificationsEnabled();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(NOTIFICATIONS_ENABLED_KEY, String(notificationsEnabled));
    if (!notificationsEnabled) {
      cancelAllAppNotifications();
    }
  }, [notificationsEnabled]);

  const handlePress = (title: string) => {
    if (title === 'Hakkında / Sürüm') {
      setAboutModalVisible(true);
    } else {
      Alert.alert(title, 'Yakında');
    }
  };

  const handleStartProgram = () => {
    const today = new Date().toISOString().split('T')[0];
    setStartISO(today);
    Alert.alert('Başarılı', 'Program başlatıldı!');
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
          onPress: async () => {
            await resetProgram();
            Alert.alert('Başarılı', 'Program sıfırlandı.');
          }
        }
      ]
    );
  };

  // Get version info
  const appVersion = Constants.expoConfig?.version || Constants.manifest2?.extra?.expoClient?.version || '—';
  const sdkVersion = Constants.expoConfig?.sdkVersion || '—';
  const platformName = Platform.OS === 'ios' ? 'iOS' : Platform.OS === 'android' ? 'Android' : Platform.OS;

  return (
    <View style={styles.container}>
      <AppHeader title="Ayarlar" subtitle="Uygulama ve hesap ayarları" showSettings={false} />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Program Section */}
        <Text style={styles.sectionTitle}>Program</Text>
        <Card>
          {!programStarted && (
            <>
              <TouchableOpacity 
                style={styles.programButton}
                onPress={handleStartProgram}
              >
                <View style={styles.programButtonLeft}>
                  <Ionicons name="play-circle-outline" size={24} color="#10B981" />
                  <Text style={styles.programButtonText}>Programı Başlat</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.menuDivider} />
            </>
          )}
          <TouchableOpacity 
            style={styles.programButton}
            onPress={handleResetProgram}
          >
            <View style={styles.programButtonLeft}>
              <Ionicons name="refresh-circle-outline" size={24} color="#EF4444" />
              <Text style={[styles.programButtonText, styles.programButtonTextDanger]}>Programı Sıfırla</Text>
            </View>
          </TouchableOpacity>
        </Card>

        {/* Hesap Section */}
        <Text style={styles.sectionTitle}>Hesap</Text>
        <Card>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handlePress('Profil')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="person-outline" size={24} color="#6B7280" />
              <Text style={styles.menuItemText}>Profil</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handlePress('Hedefler')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="flag-outline" size={24} color="#6B7280" />
              <Text style={styles.menuItemText}>Hedefler</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </Card>

        {/* Uygulama Section */}
        <Text style={styles.sectionTitle}>Uygulama</Text>
        <Card>
          <View style={[styles.menuItem, styles.menuItemDisabled]}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="color-palette-outline" size={24} color="#9CA3AF" />
              <Text style={styles.menuItemText}>Tema</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Yakında</Text>
            </View>
          </View>
          <View style={styles.menuDivider} />
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handlePress('Dil')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="language-outline" size={24} color="#6B7280" />
              <Text style={styles.menuItemText}>Dil</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="notifications-outline" size={24} color="#6B7280" />
              <View style={styles.menuItemTextGroup}>
                <Text style={styles.menuItemText}>Bildirimler</Text>
                <Text style={styles.menuItemSubtext}>
                  Kapalıysa uygulama hiçbir bildirim göndermez. Defi içeride konuşmaya devam eder.
                </Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>
          <View style={styles.menuDivider} />
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handlePress('Gizlilik (KVKK/GDPR)')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#6B7280" />
              <Text style={styles.menuItemText}>Gizlilik (KVKK/GDPR)</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handlePress('İzinler')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="lock-closed-outline" size={24} color="#6B7280" />
              <Text style={styles.menuItemText}>İzinler</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handlePress('Hakkında / Sürüm')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="information-circle-outline" size={24} color="#6B7280" />
              <Text style={styles.menuItemText}>Hakkında / Sürüm</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </Card>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* About Modal */}
      <Modal
        visible={aboutModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setAboutModalVisible(false)}
      >
        <Pressable 
          style={styles.modalBackdrop}
          onPress={() => setAboutModalVisible(false)}
        >
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Hakkında</Text>
            
            <View style={styles.aboutSection}>
              <Text style={styles.aboutLabel}>Uygulama Adı</Text>
              <Text style={styles.aboutValue}>DiaDefense</Text>
            </View>

            <View style={styles.aboutSection}>
              <Text style={styles.aboutLabel}>Versiyon</Text>
              <Text style={styles.aboutValue}>{appVersion}</Text>
            </View>

            <View style={styles.aboutSection}>
              <Text style={styles.aboutLabel}>Platform</Text>
              <Text style={styles.aboutValue}>{platformName} {sdkVersion !== '—' ? `(SDK ${sdkVersion})` : ''}</Text>
            </View>

            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionText}>
                DiaDefense, Tip 2 diyabet ve insülin direncinde günlük düzen kurmana yardımcı olan bir savunma panelidir.
              </Text>
              <Text style={styles.descriptionText}>
                Beslenme, rutin ve davranışlarını takip ederek riskini görünür kılar.
              </Text>
              <Text style={styles.descriptionText}>
                Defi seni yargılamadan destekler, Canavar ise disiplinini temsil eder.
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setAboutModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 12,
    marginBottom: 12
  },
  bottomSpacer: {
    height: 32
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    minHeight: 52
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  menuItemText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12
  },
  menuItemTextGroup: {
    flex: 1,
    marginLeft: 12
  },
  menuItemSubtext: {
    marginTop: 4,
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16
  },
  menuItemDisabled: {
    opacity: 0.6
  },
  badge: {
    backgroundColor: '#E2E8F0',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B'
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 36
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center'
  },
  aboutSection: {
    marginBottom: 16
  },
  aboutLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4
  },
  aboutValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937'
  },
  descriptionSection: {
    marginTop: 8,
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6'
  },
  descriptionText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 12
  },
  closeButton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280'
  },
  programButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    minHeight: 52
  },
  programButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  programButtonText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12
  },
  programButtonTextDanger: {
    color: '#EF4444'
  }
});
