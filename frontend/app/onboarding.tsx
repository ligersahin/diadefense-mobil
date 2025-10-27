import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated as RNAnimated,
} from 'react-native';
import { Button, Text, Layout } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/appState';
import { DiaDefenseColors } from '../constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    icon: 'nutrition-outline',
    color: DiaDefenseColors.sandYellow,
    titleKey: 'onboarding.slide1.title',
    textKey: 'onboarding.slide1.text',
  },
  {
    id: 2,
    icon: 'fitness-outline',
    color: DiaDefenseColors.oliveGreen,
    titleKey: 'onboarding.slide2.title',
    textKey: 'onboarding.slide2.text',
  },
  {
    id: 3,
    icon: 'heart-outline',
    color: DiaDefenseColors.oceanBlue,
    titleKey: 'onboarding.slide3.title',
    textKey: 'onboarding.slide3.text',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new RNAnimated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();
  const { t } = useTranslation();
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);
  
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * SCREEN_WIDTH,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      handleComplete();
    }
  };
  
  const handleSkip = () => {
    handleComplete();
  };
  
  const handleComplete = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(220,220,215,0.3)', 'rgba(170,180,140,0.2)']}
        style={styles.gradient}
      >
        <View style={styles.skipContainer}>
          {currentIndex < slides.length - 1 && (
            <Button
              appearance="ghost"
              onPress={handleSkip}
              size="small"
            >
              {t('common.skip')}
            </Button>
          )}
        </View>
        
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={RNAnimated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / SCREEN_WIDTH
            );
            setCurrentIndex(index);
          }}
          style={styles.scrollView}
        >
          {slides.map((slide) => (
            <View key={slide.id} style={styles.slide}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: slide.color + '40' },
                ]}
              >
                <Ionicons
                  name={slide.icon as any}
                  size={100}
                  color={slide.color}
                />
              </View>
              
              <Text category="h1" style={styles.title}>
                {t(slide.titleKey)}
              </Text>
              
              <Text category="p1" style={styles.text}>
                {t(slide.textKey)}
              </Text>
            </View>
          ))}
        </ScrollView>
        
        <View style={styles.footer}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
          
          <Button
            size="large"
            onPress={handleNext}
            style={styles.button}
          >
            {currentIndex === slides.length - 1
              ? t('common.continue')
              : t('common.continue')}
          </Button>
        </View>
      </LinearGradient>
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
  skipContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 8,
    height: 50,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 32,
    gap: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: DiaDefenseColors.oliveGreen,
  },
  button: {
    borderRadius: 12,
  },
});