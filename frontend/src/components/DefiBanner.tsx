import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';

type SwapItem = {
  mealKey: string;
  label: string;
  alternatives: string[];
};

type DefiMessage = {
  title: string;
  body: string;
  detail?: string;
  swaps?: SwapItem[];
};

type DefiBannerProps = {
  message: DefiMessage | null;
  onOpenPlan?: () => void;
  onSwapSelect?: (mealKey: string, alternative: string) => void;
  swappedMeals?: Record<string, string>;
  todayISO?: string;
  onHidden?: () => void;
  screenId: string;
  resetKey?: number | string;
  enableTypewriter?: boolean;
  enableIdleReplay?: boolean;
  variant?: 'card' | 'plain';
};

export default function DefiBanner({ message, onOpenPlan, onSwapSelect, swappedMeals, todayISO, onHidden, screenId, resetKey, enableTypewriter = true, enableIdleReplay = true, variant = 'card' }: DefiBannerProps) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [displayBody, setDisplayBody] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bodyExpanded, setBodyExpanded] = useState(false);
  const lastRunAtRef = useRef(0);

  useEffect(() => {
    setHidden(false);
    setOpen(false);
    setBodyExpanded(false);
  }, [resetKey]);
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pulse = useRef(new Animated.Value(0)).current;
  const pulseLoopRef = useRef<Animated.CompositeAnimation | null>(null);
  const firstVisibleDoneRef = useRef(false);
  const prevBodyRef = useRef<string | null>(null);

  const stopTyping = useCallback(() => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    typingTimerRef.current = null;
    setIsTyping(false);
  }, []);

  const stopPulse = useCallback(() => {
    pulseLoopRef.current?.stop();
    pulseLoopRef.current = null;
    pulse.stopAnimation(() => {
      pulse.setValue(0);
    });
  }, [pulse]);

  const startPulse = useCallback(() => {
    if (pulseLoopRef.current) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoopRef.current = loop;
    loop.start();
  }, [pulse]);

  const startTypewriter = useCallback((reason: 'first-visible' | 'idle-60s' | 'tap' | 'message-change') => {
    if (!message?.body) {
      setDisplayBody('');
      setIsTyping(false);
      return;
    }
    const now = Date.now();
    const isCooldownReason = reason === 'tap' || reason === 'idle-60s';
    if (isCooldownReason && now - lastRunAtRef.current < 12000) return;
    stopTyping();
    setDisplayBody('');
    setIsTyping(true);
    const full = message.body;
    const total = full.length;
    const targetMs = Math.min(1600, Math.max(900, total * 25));
    const perChar = Math.max(16, Math.floor(targetMs / Math.max(1, total)));
    let i = 0;
    typingTimerRef.current = setInterval(() => {
      i += 1;
      setDisplayBody(full.slice(0, i));
      if (i >= total) stopTyping();
    }, perChar);
    lastRunAtRef.current = now;
  }, [message?.body, stopTyping]);

  useEffect(() => {
    if (isTyping) {
      startPulse();
      return;
    }
    stopPulse();
  }, [isTyping, startPulse, stopPulse]);

  // first visible (once)
  useEffect(() => {
    if (!enableTypewriter) return;
    if (!message?.body) return;
    if (firstVisibleDoneRef.current) return;
    firstVisibleDoneRef.current = true;
    startTypewriter('first-visible');
  }, [enableTypewriter, message?.body, startTypewriter]);

  // idle 60s replay (once per message)
  useEffect(() => {
    if (!enableTypewriter || !enableIdleReplay) return;
    if (!message?.body) return;
    const t = setTimeout(() => startTypewriter('idle-60s'), 60000);
    return () => clearTimeout(t);
  }, [enableTypewriter, enableIdleReplay, message?.body, startTypewriter]);

  // message change
  useEffect(() => {
    if (!enableTypewriter) return;
    if (!message?.body) return;
    const prev = prevBodyRef.current;
    prevBodyRef.current = message.body;
    if (prev && prev !== message.body) {
      setBodyExpanded(false);
      startTypewriter('message-change');
    }
  }, [enableTypewriter, message?.body, startTypewriter]);

  // İlk cümleyi ayır (nokta/ünlem/soru işaretinden sonra boşluk varsa böl)
  const firstSentence = useMemo(() => {
    if (!message?.body) return '';
    const match = message.body.match(/^(.+?[.!?])\s+\S/s);
    return match ? match[1] : message.body;
  }, [message?.body]);

  const hasMore = !!message?.body && message.body.length > firstSentence.length;

  // cleanup on unmount
  useEffect(() => () => {
    stopTyping();
    stopPulse();
  }, [stopTyping, stopPulse]);

  if (!message || hidden) return null;

  const dotScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1.15],
  });

  const dotOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const handleHideForToday = () => {
    setHidden(true);
    onHidden?.();
  };

  const hasSwaps = !!(message.swaps && message.swaps.length > 0 && onSwapSelect);

  const content = (
    <>
      {/* × gizle butonu — sağ üstte her zaman görünür */}
      {todayISO ? (
        <TouchableOpacity
          onPress={handleHideForToday}
          activeOpacity={0.7}
          style={styles.closeButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      ) : null}

      <View style={styles.messageArea}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{message.title}</Text>
          <View style={styles.dotSlot}>
            {isTyping ? (
              <Animated.View
                style={[
                  styles.thinkingDot,
                  {
                    transform: [{ scale: dotScale }],
                    opacity: dotOpacity,
                  },
                ]}
              />
            ) : null}
          </View>
        </View>
        <Text style={styles.body}>
          {bodyExpanded
            ? message.body
            : enableTypewriter
              ? displayBody.slice(0, firstSentence.length)
              : firstSentence}
        </Text>
        {hasMore && (
          <TouchableOpacity
            onPress={() => setBodyExpanded((prev) => !prev)}
            activeOpacity={0.7}
            style={styles.expandButton}
          >
            <Text style={styles.expandButtonText}>
              {bodyExpanded ? 'Daralt ↑' : 'Devamını oku ↓'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {hasSwaps && !open && (
        <TouchableOpacity
          onPress={() => setOpen(true)}
          activeOpacity={0.8}
          style={styles.swapCta}
        >
          <Text style={styles.swapCtaText}>Alternatif seç →</Text>
        </TouchableOpacity>
      )}

      {open && hasSwaps && onSwapSelect ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setOpen(false)}
          style={styles.swapContainer}
        >
          <Text style={styles.swapHeading}>Alternatif seç:</Text>
          {message.swaps!.map((swap) => {
            const chosen = swappedMeals?.[swap.mealKey];
            return (
              <View key={swap.mealKey} style={styles.swapRow}>
                <Text style={styles.swapLabel}>{swap.label}</Text>
                <View style={styles.swapChips}>
                  {swap.alternatives.map((alt) => {
                    const isSelected = chosen === alt;
                    return (
                      <TouchableOpacity
                        key={alt}
                        onPress={() => onSwapSelect(swap.mealKey, alt)}
                        activeOpacity={0.8}
                        style={[styles.swapChip, isSelected && styles.swapChipSelected]}
                      >
                        <Text style={[styles.swapChipText, isSelected && styles.swapChipTextSelected]}>
                          {isSelected ? '✓ ' : ''}{alt}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                  {chosen ? (
                    <TouchableOpacity
                      onPress={() => onSwapSelect(swap.mealKey, '')}
                      activeOpacity={0.8}
                      style={styles.swapResetChip}
                    >
                      <Text style={styles.swapResetChipText}>Orijinale dön</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            );
          })}
          <Text style={styles.swapCollapseHint}>Kapatmak için dokun ↑</Text>
        </TouchableOpacity>
      ) : null}
    </>
  );

  if (variant === 'plain') return <View>{content}</View>;

  return <View style={styles.cardShell}>{content}</View>;
}

const styles = StyleSheet.create({
  cardShell: {
    backgroundColor: 'rgba(15, 90, 78, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(15, 90, 78, 0.12)',
    borderRadius: 20,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 12,
    zIndex: 10,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#94A3B8',
    lineHeight: 22,
  },
  messageArea: {
    paddingRight: 28,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotSlot: {
    width: 12,
    height: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  thinkingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1A1A1A',
  },
  body: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20
  },
  expandButton: {
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  expandButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F5A4E',
  },
  swapCta: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#0F5A4E',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 14,
  },
  swapCtaText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  swapContainer: {
    marginBottom: 10,
    backgroundColor: 'rgba(15, 90, 78, 0.05)',
    borderRadius: 12,
    padding: 10,
  },
  swapHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F5A4E',
    marginBottom: 8,
  },
  swapRow: {
    marginBottom: 8,
  },
  swapLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 4,
  },
  swapChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  swapChip: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  swapChipSelected: {
    backgroundColor: '#0F5A4E',
    borderColor: '#0F5A4E',
  },
  swapChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  swapChipTextSelected: {
    color: '#FFFFFF',
  },
  swapResetChip: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#94A3B8',
  },
  swapResetChipText: {
    fontSize: 11,
    color: '#64748B',
  },
  swapCollapseHint: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
  },
});
