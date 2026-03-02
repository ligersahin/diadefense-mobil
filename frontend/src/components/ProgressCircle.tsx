import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  progress: number; // 0-1
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
};

export function ProgressCircle({ 
  progress, 
  size = 100, 
  strokeWidth = 8, 
  color = '#10B981',
  label 
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  const percentage = Math.round(progress * 100);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
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
        <View
          style={[
            styles.progressArc,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: color,
              transform: [{ rotate: `${progress * 360}deg` }]
            }
          ]}
        />
        <View style={styles.textContainer}>
          <Text style={styles.percentage}>{percentage}%</Text>
          {label && <Text style={styles.label}>{label}</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
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
