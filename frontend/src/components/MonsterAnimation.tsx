import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { MonsterState } from '../types';

type Props = {
  state: MonsterState;
  size?: number;
};

const ANIMATION_FILES = {
  weak: require('../../assets/animations/monster_rest.json'),
  neutral: require('../../assets/animations/monster_think.json'),
  angry: require('../../assets/animations/monster_angry.json')
};

export function MonsterAnimation({ state, size = 200 }: Props) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <LottieView
        source={ANIMATION_FILES[state]}
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
