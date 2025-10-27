import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated as RNAnimated, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { MonsterState } from '../store/appState';
import { Ionicons } from '@expo/vector-icons';

interface MonsterAnimatorProps {
  state: MonsterState;
  energy: number;
  loop?: boolean;
  size?: number;
}

// Native Lottie Component
const NativeLottieMonster: React.FC<{
  state: MonsterState;
  size: number;
  loop: boolean;
  fadeAnim: RNAnimated.Value;
}> = ({ state, size, loop, fadeAnim }) => {
  const lottieRef = useRef<any>(null);
  const [currentAnimation, setCurrentAnimation] = useState(state);
  
  // Import LottieView only for native
  const LottieView = require('lottie-react-native').default;
  
  const animations = {
    idle: require('../assets/animations/monster_idle.json'),
    think: require('../assets/animations/monster_think.json'),
    success: require('../assets/animations/monster_success.json'),
    celebrate: require('../assets/animations/monster_celebrate.json'),
    rest: require('../assets/animations/monster_rest.json'),
  };
  
  useEffect(() => {
    setCurrentAnimation(state);
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  }, [state]);
  
  return (
    <RNAnimated.View style={{ opacity: fadeAnim }}>
      <LottieView
        ref={lottieRef}
        source={animations[currentAnimation]}
        autoPlay
        loop={loop}
        style={{
          width: size,
          height: size,
        }}
      />
    </RNAnimated.View>
  );
};

// Web/Fallback Icon Component
const IconMonster: React.FC<{
  state: MonsterState;
  energy: number;
  size: number;
}> = ({ state, energy, size }) => {
  const scaleAnim = useRef(new RNAnimated.Value(1)).current;
  
  useEffect(() => {
    // Simple breathing animation
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
    <RNAnimated.View
      style={[
        styles.iconCircle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: getMonsterColor(),
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Ionicons name={getMonsterIcon() as any} size={size * 0.6} color="white" />
    </RNAnimated.View>
  );
};

export const MonsterAnimator: React.FC<MonsterAnimatorProps> = ({
  state,
  energy,
  loop = true,
  size = 250,
}) => {
  const fadeAnim = useRef(new RNAnimated.Value(1)).current;
  
  useEffect(() => {
    // Trigger haptic feedback on state change
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
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
  
  return (
    <View style={styles.container}>
      <View style={styles.monsterContainer}>
        {Platform.OS !== 'web' ? (
          <NativeLottieMonster
            state={state}
            size={size}
            loop={loop}
            fadeAnim={fadeAnim}
          />
        ) : (
          <IconMonster state={state} energy={energy} size={size} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  monsterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
