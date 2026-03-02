import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  progress: number; // 0-1
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  onPress?: () => void;
};

export function ProgressCircle({ 
  progress, 
  size = 100, 
  strokeWidth = 8, 
  color = '#10B981',
  label,
  onPress
}: Props) {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const percentage = Math.round(clampedProgress * 100);
  const showStroke = percentage > 0;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.container,
        { width: size, height: size },
        pressed && styles.pressed
      ]}
    >
      <View style={styles.progressContainer}>
        {/* Background circle */}
        <View
          style={[
            styles.circle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: '#E5E7EB'
            }
          ]}
        />
        {/* Progress arc - Simple approximation */}
        {showStroke ? (
          <View
            style={[
              styles.progressArc,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: color,
                opacity: percentage === 0 ? 0 : 1,
                borderRightColor: percentage === 100 ? color : 'transparent',
                borderBottomColor: percentage === 100 ? color : 'transparent',
                transform: [{ rotate: `${clampedProgress * 360}deg` }]
              }
            ]}
          />
        ) : null}
        <View style={styles.textContainer}>
          <Text style={styles.percentage}>{percentage}%</Text>
          {label && <Text style={styles.label}>{label}</Text>}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  pressed: {
    opacity: 0.7
  },
  progressContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    position: 'absolute'
  },
  progressArc: {
    position: 'absolute',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent'
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  percentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937'
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2
  }
});
