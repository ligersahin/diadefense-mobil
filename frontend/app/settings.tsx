import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Layout, Text, Card, Toggle, Select, SelectItem } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/appState';
import i18n from '../utils/i18n';
import { DiaDefenseColors } from '../constants/colors';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const theme = useAppStore((state) => state.theme);
  const language = useAppStore((state) => state.language);
  const setTheme = useAppStore((state) => state.setTheme);
  const setLanguage = useAppStore((state) => state.setLanguage);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const handleLanguageChange = (lang: 'en' | 'tr' | 'de') => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: t('settings.title'),
        }}
      />
      <Layout style={styles.layout}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          <Card style={styles.card}>
            <View style={styles.setting}>
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="moon-outline"
                    size={20}
                    color={DiaDefenseColors.oceanBlue}
                  />
                </View>
                <Text category="s1">{t('settings.theme')}</Text>
              </View>
              <Toggle
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
            </View>
          </Card>
          
          <Card style={styles.card}>
            <View style={styles.settingColumn}>
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="language-outline"
                    size={20}
                    color={DiaDefenseColors.oceanBlue}
                  />
                </View>
                <Text category="s1">{t('settings.language')}</Text>
              </View>
              
              <View style={styles.languageButtons}>
                <View style={styles.languageButton}>
                  <Toggle
                    checked={language === 'en'}
                    onChange={() => handleLanguageChange('en')}
                  >
                    English
                  </Toggle>
                </View>
                <View style={styles.languageButton}>
                  <Toggle
                    checked={language === 'tr'}
                    onChange={() => handleLanguageChange('tr')}
                  >
                    Türkçe
                  </Toggle>
                </View>
                <View style={styles.languageButton}>
                  <Toggle
                    checked={language === 'de'}
                    onChange={() => handleLanguageChange('de')}
                  >
                    Deutsch
                  </Toggle>
                </View>
              </View>
            </View>
          </Card>
          
          <Card style={styles.card}>
            <Text category="h6" style={styles.sectionTitle}>
              {t('settings.about')}
            </Text>
            <Text category="p2" style={styles.aboutText}>
              DiaDefense - Living Monster System
            </Text>
            <Text category="c1" style={styles.version}>
              Version 1.0.0
            </Text>
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
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingColumn: {
    gap: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: DiaDefenseColors.oceanBlueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageButtons: {
    gap: 8,
  },
  languageButton: {
    paddingVertical: 4,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  aboutText: {
    marginBottom: 8,
  },
  version: {
    color: '#999',
  },
});