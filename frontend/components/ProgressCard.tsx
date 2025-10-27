import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { DiaDefenseColors } from '../constants/colors';

interface ProgressCardProps {
  title: string;
  icon: string;
  current: number;
  target: number;
  unit: string;
  color?: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  icon,
  current,
  target,
  unit,
  color = DiaDefenseColors.oliveGreen,
}) => {
  const progress = Math.min(current / target, 1);
  
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon as any} size={24} color={color} />
        </View>
        <Text category="s1" style={styles.title}>
          {title}
        </Text>
      </View>
      
      <View style={styles.stats}>
        <Text category="h5" style={styles.current}>
          {current}
        </Text>
        <Text category="p2" style={styles.target}>
          / {target} {unit}
        </Text>
      </View>
      
      <ProgressBar
        progress={progress}
        style={styles.progressBar}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  current: {
    fontWeight: 'bold',
  },
  target: {
    color: '#888',
    marginLeft: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
});