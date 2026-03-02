import React, { useEffect } from 'react';
import { Image, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export type MonsterMood = 'weak' | 'neutral' | 'strong' | 'angry';

export function moodFromDefenseScore(score: number): MonsterMood {
  if (score >= 80) return 'weak';
  if (score >= 60) return 'neutral';
  if (score >= 40) return 'strong';
  return 'angry';
}

type Props = {
  score: number;
  size?: number;
  style?: ViewStyle;
};

export default function MonsterAvatar({ score, size = 170, style }: Props) {
  const mood = moodFromDefenseScore(score);
  
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    // Reset all values
    scale.value = 1;
    translateY.value = 0;
    translateX.value = 0;
    rotate.value = 0;

    if (mood === 'weak') {
      // Breathing: slow scale loop 1.00 -> 1.05 -> 1.00, ~2600ms
      scale.value = withRepeat(
        withSequence(
          withTiming(1.05, {
            duration: 1300,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, {
            duration: 1300,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1,
        false
      );
    } else if (mood === 'neutral') {
      // Idle: subtle bob translateY 0 -> -3 -> 0, ~2400ms
      translateY.value = withRepeat(
        withSequence(
          withTiming(-3, {
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0, {
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1,
        false
      );
    } else if (mood === 'strong') {
      // Pulse: scale 1.00 -> 1.07 -> 1.00, ~1400ms + slight rotate
      scale.value = withRepeat(
        withSequence(
          withTiming(1.07, {
            duration: 700,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, {
            duration: 700,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1,
        false
      );
      rotate.value = withRepeat(
        withSequence(
          withTiming(1, {
            duration: 700,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0, {
            duration: 700,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1,
        false
      );
    } else if (mood === 'angry') {
      // Alarm shake: translateX 0 -> -4 -> 4 -> 0, ~800ms + subtle scale
      translateX.value = withRepeat(
        withSequence(
          withTiming(-4, { duration: 200, easing: Easing.inOut(Easing.ease) }),
          withTiming(4, { duration: 200, easing: Easing.inOut(Easing.ease) }),
          withTiming(-4, { duration: 200, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 200, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
      scale.value = withRepeat(
        withSequence(
          withTiming(1.03, {
            duration: 400,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, {
            duration: 400,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1,
        false
      );
    }
  }, [mood, scale, translateY, translateX, rotate]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: translateY.value },
        { translateX: translateX.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });
  
  const getMonsterImage = (mood: MonsterMood) => {
    switch (mood) {
      case 'weak':
        return require('../../assets/monsters/monster-weak.png');
      case 'neutral':
        return require('../../assets/monsters/monster-neutral.png');
      case 'strong':
        return require('../../assets/monsters/monster-strong.png');
      case 'angry':
        return require('../../assets/monsters/monster-angry.png');
    }
  };

  return (
    <Animated.View style={[animatedStyle, { width: size, height: size }, style]}>
      <Image
        source={getMonsterImage(mood)}
        style={[styles.image, { width: size, height: size }]}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  image: {
    // width and height come from props
  },
});

