import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Layout, Text, Card, Button } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { DiaDefenseColors } from '../constants/colors';

const MONSTER_COLORS = [
  { id: 'olive', name: 'Olive Green', color: DiaDefenseColors.oliveGreen },
  { id: 'blue', name: 'Ocean Blue', color: DiaDefenseColors.oceanBlue },
  { id: 'yellow', name: 'Sand Yellow', color: DiaDefenseColors.sandYellow },
];

export default function PersonalizationScreen() {
  const { t } = useTranslation();
  const [selectedColor, setSelectedColor] = useState('olive');
  const [leafEmblem, setLeafEmblem] = useState(false);
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: t('settings.personalization'),
        }}
      />
      <Layout style={styles.layout}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          <Card style={styles.card}>
            <Text category="h6" style={styles.sectionTitle}>
              Monster Color
            </Text>
            <Text category="p2" style={styles.description}>
              Choose your monster's primary color
            </Text>
            
            <View style={styles.colorGrid}>
              {MONSTER_COLORS.map((item) => (
                <View key={item.id} style={styles.colorOption}>
                  <View
                    style={[
                      styles.colorCircle,
                      { backgroundColor: item.color },
                      selectedColor === item.id && styles.selectedColor,
                    ]}
                    onTouchEnd={() => setSelectedColor(item.id)}
                  />
                  <Text category="c1" style={styles.colorName}>
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
          
          <Card style={styles.card}>
            <Text category="h6" style={styles.sectionTitle}>
              Monster Accessory
            </Text>
            <Text category="p2" style={styles.description}>
              Add a leaf emblem to your monster
            </Text>
            
            <Button
              appearance={leafEmblem ? 'filled' : 'outline'}
              onPress={() => setLeafEmblem(!leafEmblem)}
              style={styles.button}
            >
              {leafEmblem ? 'Leaf Emblem Active' : 'Activate Leaf Emblem'}
            </Button>
          </Card>
          
          <Card style={styles.infoCard}>
            <Text category="p2" style={styles.infoText}>
              More customization options coming soon! Your preferences are saved automatically.
            </Text>
          </Card>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 16,
    color: '#666',
  },
  colorGrid: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  colorOption: {
    alignItems: 'center',
    gap: 8,
  },
  colorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#000',
  },
  colorName: {
    fontSize: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
  },
  infoCard: {
    borderRadius: 12,
    backgroundColor: DiaDefenseColors.oliveGreenLight,
  },
  infoText: {
    textAlign: 'center',
    color: '#666',
  },
});