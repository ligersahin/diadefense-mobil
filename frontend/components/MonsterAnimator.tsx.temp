import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated as RNAnimated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MonsterState } from '../store/appState';

interface MonsterAnimatorProps {
  state: MonsterState;
  energy: number;
  loop?: boolean;
  size?: number;
}

export const MonsterAnimator: React.FC<MonsterAnimatorProps> = ({
  state,
  energy,
  loop = true,
  size = 250,
}) => {
  const scaleAnim = useRef(new RNAnimated.Value(1)).current;
  const fadeAnim = useRef(new RNAnimated.Value(1)).current;
  
  useEffect(() => {
    // Fade transition
    RNAnimated.sequence([
      RNAnimated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 150,
        useNativeDriver: true,
      }),
      RNAnimated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [state]);
  
  useEffect(() => {
    // Breathing animation
    RNAnimated.loop(
      RNAnimated.sequence([
        RNAnimated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        RNAnimated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  
  const getMonsterIcon = () => {
    switch (state) {
      case 'idle':
        return 'happy-outline';
      case 'think':
        return 'bulb-outline';
      case 'success':
        return 'thumbs-up-outline';
      case 'celebrate':
        return 'trophy-outline';
      case 'rest':
        return 'bed-outline';
      default:
        return 'happy-outline';
    }
  };
  
  const getMonsterColor = () => {
    if (energy >= 70) return 'rgb(240, 220, 130)';
    if (energy >= 40) return 'rgb(170, 180, 140)';
    return 'rgb(70, 130, 180)';
  };
  
  return (
    <View style={styles.container}>
      <RNAnimated.View
        style={[
          styles.iconCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: getMonsterColor(),
            transform: [{ scale: scaleAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <Ionicons name={getMonsterIcon() as any} size={size * 0.6} color="white" />
      </RNAnimated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  iconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
