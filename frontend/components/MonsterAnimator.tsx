import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated as RNAnimated } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Haptics from 'expo-haptics';
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
}) => {
  const scaleAnim = useRef(new RNAnimated.Value(1)).current;
  const rotateAnim = useRef(new RNAnimated.Value(0)).current;
  const bounceAnim = useRef(new RNAnimated.Value(0)).current;
  
  useEffect(() => {
    // Trigger haptic feedback on state change
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Different animations based on state
    switch (state) {
      case 'idle':
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
        break;
        
      case 'think':
        // Tilt animation
        RNAnimated.loop(
          RNAnimated.sequence([
            RNAnimated.timing(rotateAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            RNAnimated.timing(rotateAnim, {
              toValue: -1,
              duration: 1000,
              useNativeDriver: true,
            }),
            RNAnimated.timing(rotateAnim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ).start();
        break;
        
      case 'success':
        // Scale up animation
        RNAnimated.sequence([
          RNAnimated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
          }),
          RNAnimated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
        break;
        
      case 'celebrate':
        // Bounce animation
        RNAnimated.loop(
          RNAnimated.sequence([
            RNAnimated.timing(bounceAnim, {
              toValue: -20,
              duration: 500,
              useNativeDriver: true,
            }),
            RNAnimated.timing(bounceAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        ).start();
        break;
        
      case 'rest':
        // Slow breathing
        RNAnimated.loop(
          RNAnimated.sequence([
            RNAnimated.timing(scaleAnim, {
              toValue: 0.95,
              duration: 3000,
              useNativeDriver: true,
            }),
            RNAnimated.timing(scaleAnim, {
              toValue: 1,
              duration: 3000,
              useNativeDriver: true,
            }),
          ])
        ).start();
        break;
    }
  }, [state]);
  
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
    if (energy >= 70) return 'rgb(240, 220, 130)'; // Sand Yellow
    if (energy >= 40) return 'rgb(170, 180, 140)'; // Olive Green
    return 'rgb(70, 130, 180)'; // Ocean Blue
  };
  
  const rotate = rotateAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-10deg', '10deg'],
  });
  
  return (
    <View style={styles.container}>
      <RNAnimated.View
        style={[
          styles.monsterContainer,
          {
            transform: [
              { scale: scaleAnim },
              { rotate },
              { translateY: bounceAnim },
            ],
          },
        ]}
      >
        <View style={[styles.monsterCircle, { backgroundColor: getMonsterColor() }]}>
          <Ionicons name={getMonsterIcon() as any} size={120} color="white" />
        </View>
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
  monsterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  monsterCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});