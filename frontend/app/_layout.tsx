import React from 'react';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { DefenseProgramProvider } from '../src/context/DefenseProgramContext';

export default function RootLayout() {
  return (
    <DefenseProgramProvider>
      <View style={{ flex: 1 }}>
        <View pointerEvents="none" style={{ position:'absolute', top: 60, left: 10, zIndex: 9999, backgroundColor:'rgba(255,0,0,0.85)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
          <Text style={{ color: 'white', fontWeight: '800' }}>BUILD_MARKER_2026_02_28_ROOT</Text>
        </View>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </View>
    </DefenseProgramProvider>
  );
}
