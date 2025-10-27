import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppStore } from '../store/appState';
import customTheme from '../theme/custom-theme.json';
import '../utils/i18n';

export default function RootLayout() {
  const loadState = useAppStore((state) => state.loadState);
  const theme = useAppStore((state) => state.theme);
  
  useEffect(() => {
    loadState();
  }, []);
  
  const currentTheme = theme === 'dark' ? { ...eva.dark, ...customTheme } : { ...eva.light, ...customTheme };
  
  return (
    <>
      <ApplicationProvider {...eva} theme={currentTheme}>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="monster" />
            <Stack.Screen name="statistics" />
            <Stack.Screen name="achievements" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="personalization" />
            <Stack.Screen name="notifications" />
          </Stack>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
}