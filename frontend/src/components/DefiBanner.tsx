import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { hideDefiForToday } from '../defi/defiVisibility';

type DefiMessage = {
  title: string;
  body: string;
  detail?: string;
};

type DefiBannerProps = {
  message: DefiMessage | null;
  onOpenPlan?: () => void;
  todayISO?: string;
  onHidden?: () => void;
  screenId: string;
  enableTypewriter?: boolean;
  enableIdleReplay?: boolean;
  variant?: 'card' | 'plain';
};

export default function DefiBanner({ message, onOpenPlan, todayISO, onHidden, screenId, enableTypewriter = true, enableIdleReplay = true, variant = 'card' }: DefiBannerProps) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [displayBody, setDisplayBody] = useState('');
  const lastRunAtRef = useRef(0);
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const firstVisibleDoneRef = useRef(false);
  const prevBodyRef = useRef<string | null>(null);

  const stopTyping = useCallback(() => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    typingTimerRef.current = null;
  }, []);

  const startTypewriter = useCallback((reason: 'first-visible' | 'idle-60s' | 'tap' | 'message-change') => {
    if (!message?.body) { setDisplayBody(''); return; }
    const now = Date.now();
    const isCooldownReason = reason === 'tap' || reason === 'idle-60s';
    if (isCooldownReason && now - lastRunAtRef.current < 12000) return;
    stopTyping();
    setDisplayBody('');
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
      startTypewriter('message-change');
    }
  }, [enableTypewriter, message?.body, startTypewriter]);

  // cleanup on unmount
  useEffect(() => () => stopTyping(), [stopTyping]);

  if (!message || hidden) return null;

  const handleHideForToday = async () => {
    if (!todayISO) return;
    await hideDefiForToday(todayISO, screenId);
    setHidden(true);
    onHidden?.();
  };

  const content = (
    <>
      <Pressable
        onPress={() => setOpen((prev) => !prev)}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Text style={styles.title}>{message.title}</Text>
        <Text style={styles.body}>{enableTypewriter ? displayBody : message.body}</Text>
      </Pressable>

      {open && (
        <View style={styles.detailBlock}>
          {message.detail ? <Text style={styles.detail}>{message.detail}</Text> : null}
          <View style={styles.actions}>
            {onOpenPlan ? (
              <TouchableOpacity onPress={onOpenPlan} style={styles.actionButton} activeOpacity={0.85}>
                <Text style={styles.actionText}>Planı aç</Text>
              </TouchableOpacity>
            ) : null}
            {todayISO ? (
              <View>
                <TouchableOpacity onLongPress={handleHideForToday} delayLongPress={500} activeOpacity={0.85} style={styles.actionButton}>
                  <Text style={styles.actionTextMuted}>Bugün gizle</Text>
                </TouchableOpacity>
                <Text style={styles.hideHint}>Gizlemek için basılı tut</Text>
              </View>
            ) : null}
          </View>
        </View>
      )}
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
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6
  },
  body: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20
  },
  detailBlock: {
    marginTop: 10
  },
  detail: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 10
  },
  actions: {
    flexDirection: 'row',
    gap: 10
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#F1F5F9'
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A'
  },
  actionTextMuted: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B'
  },
  hideHint: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 4
  }
});
