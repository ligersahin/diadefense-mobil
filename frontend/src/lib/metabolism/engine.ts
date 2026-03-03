/**
 * Metabolism engine: phase-based 90-day model.
 * Returns day-specific scores, card copy, and panel comments.
 */

import {
  type DefenseScores,
  type DayCard,
  type PanelComments,
  WEEK1_CARD,
  WEEK1_PANEL,
} from './week1';

export type { DefenseScores };

export type DailyMetabolismInfo = {
  scores: DefenseScores;
  card: DayCard;
  panel: PanelComments;
};

export type RiskMetricType = 'insulin' | 'liver' | 'inflammation' | 'flexibility';

/**
 * Returns risk/adaptation label for a metric value.
 * insulin/liver/inflammation: Yüksek Risk (≥70), Orta Risk (40–69), Düşük Risk (<40)
 * flexibility: Düşük Adaptasyon (<40), Gelişiyor (40–69), İyi Adaptasyon (≥70)
 */
export function getRiskLabel(type: RiskMetricType, value: number): string {
  if (type === 'flexibility') {
    if (value < 40) return 'Düşük Adaptasyon';
    if (value < 70) return 'Gelişiyor';
    return 'İyi Adaptasyon';
  }
  if (value >= 70) return 'Yüksek Risk';
  if (value >= 40) return 'Orta Risk';
  return 'Düşük Risk';
}

/**
 * Returns color for risk/adaptation level.
 * High Risk -> soft red, Medium -> amber, Low Risk / Good Adaptation -> green
 */
export function getRiskColor(type: RiskMetricType, value: number): string {
  if (type === 'flexibility') {
    if (value < 40) return '#F59E0B';
    if (value < 70) return '#F59E0B';
    return '#10B981';
  }
  if (value >= 70) return '#FCA5A5';
  if (value >= 40) return '#FCD34D';
  return '#10B981';
}

/** Returns phase number (1–4) for the given day. */
export function getPhase(day: number): number {
  const d = Math.max(1, Math.min(90, day));
  if (d <= 14) return 1;
  if (d <= 30) return 2;
  if (d <= 60) return 3;
  return 4;
}

function clampInsulinLiverInflammation(value: number): number {
  return Math.max(20, Math.min(100, value));
}

function clampFlexibility(value: number): number {
  return Math.max(0, Math.min(100, value));
}

/** Phase-based score calculation for day 1–90. */
function calculateScores(day: number): DefenseScores {
  const d = Math.max(1, Math.min(90, day));
  let insulin: number;
  let liverFat: number;
  let inflammation: number;
  let flexibility: number;

  if (d <= 14) {
    insulin = 100 - d * 2.5;
    liverFat = 100 - d * 1.2;
    inflammation = 100 - d * 0.8;
    flexibility = 5 + d * 3;
  } else if (d <= 30) {
    insulin = 100 - (35 + (d - 14) * 1.2);
    liverFat = 100 - (18 + (d - 14) * 2);
    inflammation = 100 - (10 + (d - 14) * 1.5);
    flexibility = 5 + (42 + (d - 14) * 2);
  } else if (d <= 60) {
    insulin = 100 - (55 + (d - 30) * 0.6);
    liverFat = 100 - (48 + (d - 30) * 1);
    inflammation = 100 - (32 + (d - 30) * 0.8);
    flexibility = 5 + (72 + (d - 30) * 1);
  } else {
    insulin = 100 - (73 + (d - 60) * 0.3);
    liverFat = 100 - (78 + (d - 60) * 0.5);
    inflammation = 100 - (56 + (d - 60) * 0.4);
    flexibility = 5 + (92 + (d - 60) * 0.5);
  }

  return {
    insulin: Math.round(clampInsulinLiverInflammation(insulin)),
    liverFat: Math.round(clampInsulinLiverInflammation(liverFat)),
    inflammation: Math.round(clampInsulinLiverInflammation(inflammation)),
    flexibility: Math.round(clampFlexibility(flexibility)),
  };
}

/** Phase-based card/panel fallbacks for day 8+. */
const PHASE_CARD: Record<number, DayCard> = {
  1: {
    title: 'Metabolik Geçiş',
    body:
      'Vücut glikozdan yağa geçişe adapte oluyor.\n' +
      'İnsülin seviyesi düşüyor.\n' +
      'Sabırlı ol; geçiş normaldir.',
  },
  2: {
    title: 'İnsülin Duyarlılığı',
    body:
      'İnsülin hassasiyeti artıyor.\n' +
      'Karaciğer yağı azalma eğiliminde.\n' +
      'Enerji daha dengeli.',
  },
  3: {
    title: 'Metabolik Derinleşme',
    body:
      'Metabolizma derinleşiyor.\n' +
      'İnflamasyon düşüyor.\n' +
      'Vücut daha verimli çalışıyor.',
  },
  4: {
    title: 'Metabolik Esneklik',
    body:
      'Yağ ve glikoz arasında rahat geçiş.\n' +
      'Enerji stabil.\n' +
      '90 günlük yolculuk tamamlanıyor.',
  },
};

const PHASE_PANEL: Record<number, PanelComments> = {
  1: {
    insulin: 'Metabolik geçiş döneminde insülin düşüyor.',
    liverFat: 'Karaciğer yağı mobilizasyonu devam ediyor.',
    inflammation: 'İnflamasyon geçiş döneminde.',
    flexibility: 'Esneklik artıyor.',
  },
  2: {
    insulin: 'İnsülin duyarlılığı artıyor.',
    liverFat: 'Karaciğer yağı azalıyor.',
    inflammation: 'İnflamasyon düşüş eğiliminde.',
    flexibility: 'Metabolik esneklik gelişiyor.',
  },
  3: {
    insulin: 'İnsülin düşük seviyede.',
    liverFat: 'Karaciğer yağı belirgin azaldı.',
    inflammation: 'İnflamasyon düşük.',
    flexibility: 'Esneklik iyi seviyede.',
  },
  4: {
    insulin: 'İnsülin baskılandı; metabolik esneklik yüksek.',
    liverFat: 'Karaciğer yağı minimal.',
    inflammation: 'İnflamasyon düşük.',
    flexibility: 'Metabolik esneklik tam.',
  },
};

/**
 * Returns metabolism data for the given program day.
 * Day 1–7: Week 1 card/panel; scores from phase calculation.
 * Day 8–90: Phase-based scores, card, panel.
 * Day is clamped to 1–90.
 */
export function getMetabolismForDay(day: number): DailyMetabolismInfo {
  const clampedDay = Math.max(1, Math.min(90, day));
  const scores = calculateScores(clampedDay);
  const phase = getPhase(clampedDay);

  if (clampedDay >= 1 && clampedDay <= 7) {
    return {
      scores,
      card: WEEK1_CARD[clampedDay],
      panel: WEEK1_PANEL[clampedDay],
    };
  }

  return {
    scores,
    card: PHASE_CARD[phase],
    panel: PHASE_PANEL[phase],
  };
}
