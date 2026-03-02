import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { DefiMood } from '../types';

// Import character animations explicitly
import DefiHappy from '../../assets/animations/monster-happy.json';
import IdleCharacter from '../../assets/animations/defi_idle.json';
import ConcernedCharacter from '../../assets/animations/defi_concerned.json';
import WarningCharacter from '../../assets/animations/defi_warning.json';

type Props = {
  mood: DefiMood;
  size?: number;
};

// Map moods to animation sources
// For "happy" mood, using DefiHappy (monster-happy.json)
const animationSources: Record<string, any> = {
  happy: DefiHappy,
  idle: IdleCharacter,
  concerned: ConcernedCharacter,
  warning: WarningCharacter,
  default: DefiHappy
};

export function DefiAnimation({ mood, size = 150 }: Props) {
  // Get animation source for the mood, fallback to default if mood not found
  const animationSource = animationSources[mood] || animationSources.default;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <LottieView
        source={animationSource}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  animation: {
    width: '100%',
    height: '100%'
  }
});
