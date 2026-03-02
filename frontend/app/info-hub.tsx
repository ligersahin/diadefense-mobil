import React from 'react';
import { Stack } from 'expo-router';
import MediaHubScreen from './media-hub';

export default function InfoHub() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <MediaHubScreen />
    </>
  );
}
