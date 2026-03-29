import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
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
    <View style={styles.wrapper}>
      {/* To revert: use BACKUP OLD GRADIENT above */}
      {/* BACKUP OLD GRADIENT
      <LinearGradient
        colors={['#2E5B87', '#4A7FA8', '#5FAF86', '#7BC79B']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      />
      */}
      <LinearGradient
        colors={['#2E5B87', '#3F7FA3', '#4FAF8B']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.container}>
          {shouldShowBack ? (
            <TouchableOpacity
              style={[styles.iconButton, styles.backButton]}
              onPress={onBack || (() => router.back())}
            >
              <Ionicons name="chevron-back" size={22} color="#FFFFFF" style={styles.iconGlyph} />
            </TouchableOpacity>
          ) : null}
          <View style={styles.textBlock}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          {showSettings ? (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push('/(tabs)/settings')}
            >
              <Ionicons name="settings-outline" size={20} color="#FFFFFF" style={styles.iconGlyph} />
            </TouchableOpacity>
          ) : (
            <View style={styles.settingsSpacer} />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  safeArea: {
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 0,
  },
  backButton: {
    marginRight: 6,
  },
  iconGlyph: {
    opacity: 0.95,
  },
  textBlock: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.85,
  },
  settingsSpacer: {
    width: 36,
    height: 36,
  },
});
