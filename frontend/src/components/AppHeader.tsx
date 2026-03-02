import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Theme } from '../config/theme';

type Props = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  showSettings?: boolean;
};

export default function AppHeader({ title, subtitle, showBack, onBack, showSettings = true }: Props) {
  const shouldShowBack = typeof showBack === 'boolean' ? showBack : router.canGoBack();
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        {shouldShowBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack || (() => router.back())}
          >
            <Ionicons name="chevron-back" size={22} color={Theme.surface} />
          </TouchableOpacity>
        ) : null}
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {showSettings ? (
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => router.push('/settings')}
          >
            <Ionicons name="settings-outline" size={20} color={Theme.surface} />
          </TouchableOpacity>
        ) : (
          <View style={styles.settingsSpacer} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Theme.primary,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    backgroundColor: Theme.primary2,
  },
  textBlock: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Theme.surface,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Theme.mint,
  },
  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.primary2,
  },
  settingsSpacer: {
    width: 36,
    height: 36,
  },
});
