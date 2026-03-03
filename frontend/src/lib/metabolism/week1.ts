/**
 * Week 1 metabolism data for the Diadefense program.
 * Plan B: Only Week 1 active; structure supports adding Week 2+ later.
 */

export type DefenseScores = {
  insulin: number;
  liverFat: number;
  inflammation: number;
  flexibility: number;
};

export type DayCard = {
  title: string;
  body: string;
};

export type PanelComments = {
  insulin: string;
  liverFat: string;
  inflammation: string;
  flexibility: string;
};

/** Day 1–7 scores curve: insulin/liverFat/inflammation (100→lower), flexibility (10→higher) */
export const WEEK1_SCORES: Record<number, DefenseScores> = {
  1: { insulin: 100, liverFat: 100, inflammation: 100, flexibility: 10 },
  2: { insulin: 94, liverFat: 97, inflammation: 98, flexibility: 18 },
  3: { insulin: 88, liverFat: 94, inflammation: 95, flexibility: 28 },
  4: { insulin: 80, liverFat: 90, inflammation: 92, flexibility: 40 },
  5: { insulin: 72, liverFat: 85, inflammation: 88, flexibility: 52 },
  6: { insulin: 65, liverFat: 80, inflammation: 84, flexibility: 65 },
  7: { insulin: 58, liverFat: 74, inflammation: 78, flexibility: 75 },
};

/** Day 1–7 simple card copy (title + 2–3 lines body) */
export const WEEK1_CARD: Record<number, DayCard> = {
  1: {
    title: 'Adaptasyon Başlangıcı',
    body:
      'Vücudun glikojen depolarını kullanmaya başladı.\n' +
      'İnsülin seviyesi düşmeye başlıyor.\n' +
      'Hafif halsizlik normaldir.',
  },
  2: {
    title: 'İnsülin Baskılanma',
    body:
      'İnsülin salınım sıklığı azalmaya başladı.\n' +
      'Karaciğer yağ mobilizasyonu sinyali aldı.\n' +
      'Dalgalanma yaşayabilirsin.',
  },
  3: {
    title: 'Yakıt Değişim Eşiği',
    body:
      'Vücudun glikozdan yağa geçmeye zorlanıyor.\n' +
      'Baş ağrısı veya isteksizlik olabilir.\n' +
      'Bu geçiş normaldir.',
  },
  4: {
    title: 'Yağ Oksidasyonu',
    body:
      'Yağ yakım enzimleri artıyor.\n' +
      'Açlık krizleri azalmaya başlayabilir.\n' +
      'Metabolik geçiş hızlandı.',
  },
  5: {
    title: 'Stabilizasyon',
    body:
      'Kan şekeri dalgalanmaları azalıyor.\n' +
      'Sabah açlık değeri düşmeye başlayabilir.\n' +
      'Enerji daha dengeli hissedilebilir.',
  },
  6: {
    title: 'İnflamasyon Düşüşü',
    body:
      'Sistemik inflamasyon sinyalleri düşmeye başladı.\n' +
      'Ödem ve şişkinlik azalabilir.\n' +
      'Vücut adaptasyona yaklaşıyor.',
  },
  7: {
    title: 'Adaptasyon Tamamlandı',
    body:
      'Vücudun yağ kullanımına daha rahat geçiyor.\n' +
      'Enerji daha stabil.\n' +
      'Metabolik esneklik arttı.',
  },
};

/** Day 1–7 defense panel short explanations (1-line per metric) */
export const WEEK1_PANEL: Record<number, PanelComments> = {
  1: {
    insulin: 'İnsülin henüz yüksek; glikojen kullanımı başladı.',
    liverFat: 'Karaciğer yağı stabil; mobilizasyon sinyali bekleniyor.',
    inflammation: 'İnflamasyon seviyesi referans; değişim izleniyor.',
    flexibility: 'Metabolik esneklik düşük; adaptasyon başlangıcı.',
  },
  2: {
    insulin: 'İnsülin salınımı azalıyor.',
    liverFat: 'Yağ mobilizasyonu sinyali alındı.',
    inflammation: 'Hafif düşüş başladı.',
    flexibility: 'Esneklik artmaya başladı.',
  },
  3: {
    insulin: 'Glikozdan yağa geçiş eşiğinde; dalgalanma normal.',
    liverFat: 'Karaciğer yağ kullanımı artıyor.',
    inflammation: 'Geçiş dönemi; hafif yükselme olabilir.',
    flexibility: 'Yakıt değişimi sırasında orta seviye.',
  },
  4: {
    insulin: 'Düşüş devam ediyor.',
    liverFat: 'Yağ oksidasyonu hızlandı.',
    inflammation: 'Düşüş belirginleşiyor.',
    flexibility: 'Esneklik artıyor.',
  },
  5: {
    insulin: 'Kan şekeri dalgalanmaları azalıyor; sabah değeri düşebilir.',
    liverFat: 'Karaciğer yağı belirgin azalma eğiliminde.',
    inflammation: 'Sistemik inflamasyon düşüyor.',
    flexibility: 'Enerji daha dengeli; metabolik geçiş kolaylaşıyor.',
  },
  6: {
    insulin: 'Stabil düşük seviye.',
    liverFat: 'Yağ kullanımı iyi seviyede.',
    inflammation: 'Ödem ve şişkinlik azalabilir.',
    flexibility: 'Adaptasyona yakın.',
  },
  7: {
    insulin: 'Yağ kullanımına geçiş tamamlandı; insülin baskılandı.',
    liverFat: 'Karaciğer yağı azaldı; metabolik geçiş rahat.',
    inflammation: 'İnflamasyon düşük; vücut adapte oldu.',
    flexibility: 'Metabolik esneklik arttı; enerji stabil.',
  },
};
