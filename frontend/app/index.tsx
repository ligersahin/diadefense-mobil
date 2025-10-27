import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAppStore } from '../store/appState';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Index() {
  const hasCompletedOnboarding = useAppStore((state) => state.hasCompletedOnboarding);
  const loadState = useAppStore((state) => state.loadState);
  const [loading, setLoading] = React.useState(true);
  
  useEffect(() => {
    loadState().then(() => setLoading(false));
  }, []);
  
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }
  
  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});