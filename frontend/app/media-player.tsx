import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { router } from 'expo-router';

const audioSource = {
  uri: 'https://tqacemjwnjpezyhyydap.supabase.co/storage/v1/object/public/media/podcast/diadefense/diadefense-episode-1.m4a',
};

export default function MediaPlayerScreen() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const progressBarWidthRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);

  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
      soundRef.current = null;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!soundRef.current) return;
      const status = await soundRef.current.getStatusAsync();
      if (!status.isLoaded) return;
      setPositionMillis(status.positionMillis ?? 0);
      setDurationMillis(status.durationMillis ?? 0);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const playAudio = async () => {
    if (!soundRef.current) {
      const { sound } = await Audio.Sound.createAsync(audioSource);
      soundRef.current = sound;
    }
    await soundRef.current.playAsync();
  };

  const pauseAudio = async () => {
    await soundRef.current?.pauseAsync();
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await pauseAudio();
      setIsPlaying(false);
    } else {
      await playAudio();
      setIsPlaying(true);
    }
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  const handleSeek = async (event: any) => {
    if (!soundRef.current || !durationMillis || !progressBarWidthRef.current) return;
    const x = event.nativeEvent.locationX;
    const ratio = Math.max(0, Math.min(1, x / progressBarWidthRef.current));
    const nextPosition = Math.floor(durationMillis * ratio);
    await soundRef.current.setPositionAsync(nextPosition);
    setPositionMillis(nextPosition);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color="#0F172A" />
            <Text style={styles.backText}>Geri</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Sesli içerik</Text>
      </View>

      <View style={styles.playerCard}>
        <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <View>
          <Text style={styles.trackTitle}>DiaDefense Felsefesi – Bölüm 1</Text>
          <Text style={styles.trackSubtitle}>Yerel dosya</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{formatTime(positionMillis)}</Text>
          <Text style={styles.timeText}>{formatTime(durationMillis)}</Text>
        </View>
        <TouchableOpacity
          style={styles.progressBar}
          onPress={handleSeek}
          onLayout={(event) => {
            progressBarWidthRef.current = event.nativeEvent.layout.width;
          }}
        >
          <View
            style={[
              styles.progressFill,
              {
                width: durationMillis
                  ? `${Math.min(100, (positionMillis / durationMillis) * 100)}%`
                  : '0%',
              },
            ]}
          />
          <View
            style={[
              styles.progressThumb,
              {
                left: durationMillis
                  ? `${Math.min(100, (positionMillis / durationMillis) * 100)}%`
                  : '0%',
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    paddingVertical: 4,
    paddingRight: 6,
  },
  backText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  playerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  trackSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  progressSection: {
    marginTop: 16,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#64748B',
  },
  progressBar: {
    height: 12,
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
  },
  progressFill: {
    height: 12,
    borderRadius: 999,
    backgroundColor: '#6366F1',
  },
  progressThumb: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#6366F1',
    marginLeft: -8,
  },
});
