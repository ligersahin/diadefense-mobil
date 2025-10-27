import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Toggle } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { DiaDefenseColors } from '../constants/colors';

interface SupplementCardProps {
  id: string;
  name: string;
  description: string;
  taken: boolean;
  onToggle: () => void;
}

export const SupplementCard: React.FC<SupplementCardProps> = ({
  name,
  description,
  taken,
  onToggle,
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={styles.icon}>
          <Ionicons name="medical-outline" size={32} color={DiaDefenseColors.oceanBlue} />
        </View>
        
        <View style={styles.info}>
          <Text category="s1" style={styles.name}>
            {name}
          </Text>
          <Text category="p2" style={styles.description}>
            {description}
          </Text>
        </View>
        
        <Toggle checked={taken} onChange={onToggle} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: DiaDefenseColors.oceanBlueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: '#666',
    fontSize: 12,
  },
});