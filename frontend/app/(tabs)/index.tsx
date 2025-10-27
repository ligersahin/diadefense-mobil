import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated as RNAnimated,
} from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../../store/appState';
import { DefiModal } from '../../components/DefiModal';
import { DiaDefenseColors, gradientColors } from '../../constants/colors';
import { getDefiMessage, getTimeOfDay } from '../../utils/helpers';

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const energyScore = useAppStore((state) => state.energyScore);
  const monsterState = useAppStore((state) => state.monsterState);
  const showDefiModal = useAppStore((state) => state.showDefiModal);
  const setShowDefiModal = useAppStore((state) => state.setShowDefiModal);
  const completedActivities = useAppStore((state) => state.completedActivities);
  
  const [fadeAnim] = React.useState(new RNAnimated.Value(0));
  
  useEffect(() => {
    RNAnimated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);
  
  const getGradientColors = () => {
    if (energyScore >= 70) return gradientColors.high;
    if (energyScore >= 40) return gradientColors.balanced;
    return gradientColors.low;
  };
  
  const defiMessage = getDefiMessage(energyScore, getTimeOfDay());
  
  // Demo data
  const demoSteps = completedActivities.steps ? 8542 : 3421;
  const demoWater = completedActivities.water ? 2.1 : 1.2;
  const demoGlucose = 95;
  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          <RNAnimated.View style={{ opacity: fadeAnim }}>
            <View style={styles.header}>
              <View>
                <Text category="h4" style={styles.welcome}>
                  {t('home.welcome')}
                </Text>
                <Text category="p1" style={styles.subtitle}>
                  {t('defi.focus')}
                </Text>
              </View>
              
              <TouchableOpacity
                onPress={() => setShowDefiModal(true)}
                style={styles.defiButton}
              >
                <Ionicons name="chatbubble-ellipses-outline" size={28} color="white" />
              </TouchableOpacity>
            </View>
            
            {/* Quick Stats */}
            <View style={styles.statsGrid}>
              <Card style={styles.statCard}>
                <Ionicons name="footsteps-outline" size={32} color={DiaDefenseColors.oceanBlue} />
                <Text category="h5" style={styles.statValue}>
                  {demoSteps}
                </Text>
                <Text category="c1" style={styles.statLabel}>
                  {t('home.steps')}
                </Text>
              </Card>
              
              <Card style={styles.statCard}>
                <Ionicons name="water-outline" size={32} color={DiaDefenseColors.oceanBlue} />
                <Text category="h5" style={styles.statValue}>
                  {demoWater}L
                </Text>
                <Text category="c1" style={styles.statLabel}>
                  {t('home.water')}
                </Text>
              </Card>
              
              <Card style={styles.statCard}>
                <Ionicons name="pulse-outline" size={32} color={DiaDefenseColors.oceanBlue} />
                <Text category="h5" style={styles.statValue}>
                  {demoGlucose}
                </Text>
                <Text category="c1" style={styles.statLabel}>
                  {t('home.glucose')}
                </Text>
              </Card>
            </View>
            
            {/* Monster Card */}
            <TouchableOpacity onPress={() => router.push('/monster')}>
              <Card style={styles.monsterCard}>
                <View style={styles.monsterCardContent}>
                  <View style={styles.monsterInfo}>
                    <Text category="h6">{t('monster.title')}</Text>
                    <Text category="p2" style={styles.monsterState}>
                      {t(`monster.state.${monsterState}`)}
                    </Text>
                    <View style={styles.energyBar}>
                      <View
                        style={[
                          styles.energyFill,
                          { width: `${energyScore}%` },
                        ]}
                      />
                    </View>
                    <Text category="c1">
                      Energy: {energyScore}%
                    </Text>
                  </View>
                  <Ionicons
                    name="arrow-forward-circle-outline"
                    size={32}
                    color={DiaDefenseColors.oliveGreen}
                  />
                </View>
              </Card>
            </TouchableOpacity>
            
            {/* Motivation Card */}
            <Card style={styles.motivationCard}>
              <Text category="p1" style={styles.motivationText}>
                {t('defi.motto')}
              </Text>
            </Card>
          </RNAnimated.View>
        </ScrollView>
      </LinearGradient>
      
      <DefiModal
        visible={showDefiModal}
        message={defiMessage}
        onClose={() => setShowDefiModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  welcome: {
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  defiButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  statValue: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666',
    marginTop: 4,
  },
  monsterCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  monsterCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monsterInfo: {
    flex: 1,
  },
  monsterState: {
    color: '#666',
    marginTop: 4,
    marginBottom: 12,
  },
  energyBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  energyFill: {
    height: '100%',
    backgroundColor: DiaDefenseColors.oliveGreen,
  },
  motivationCard: {
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  motivationText: {
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
  },
});