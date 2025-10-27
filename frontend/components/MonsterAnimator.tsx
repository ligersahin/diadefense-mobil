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
  size = 250,
}) => {
  const lottieRef = useRef<LottieView>(null);
  const fadeAnim = useRef(new RNAnimated.Value(1)).current;
  const [currentAnimation, setCurrentAnimation] = useState(state);
  
  const animations = {
    idle: require('../assets/animations/monster_idle.json'),
    think: require('../assets/animations/monster_think.json'),
    success: require('../assets/animations/monster_success.json'),
    celebrate: require('../assets/animations/monster_celebrate.json'),
    rest: require('../assets/animations/monster_rest.json'),
  };
  
  useEffect(() => {
    // Trigger haptic feedback on state change
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Smooth fade transition when changing animation
    if (currentAnimation !== state) {
      RNAnimated.sequence([
        RNAnimated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        RNAnimated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentAnimation(state);
        if (lottieRef.current) {
          lottieRef.current.play();
        }
      });
    } else {
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }
  }, [state]);
  
  return (
    <View style={styles.container}>
      <RNAnimated.View
        style={[
          styles.monsterContainer,
          { opacity: fadeAnim },
        ]}
      >
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
});
