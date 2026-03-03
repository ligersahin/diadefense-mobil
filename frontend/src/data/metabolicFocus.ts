/**
 * Single source of truth for metabolic day focus (headline, description, defenseFocus).
 * Replaces food-based day titles in hero headers.
 */

export type MetabolicFocus = {
  headline: string;
  description: string;
  defenseFocus: string;
};

const DAY_1_7: Record<number, MetabolicFocus> = {
  1: {
    headline: 'Glikojen Tüketimi Başlangıcı',
    description:
      'Karaciğer ve kaslardaki glikojen depoları kullanılmaya başlar. İnsülin pikleri düşmeye başlar ancak vücut hâlâ glikoza bağımlıdır.',
    defenseFocus: 'İnsülin Dengesi',
  },
  2: {
    headline: 'İnsülin Regülasyonu Başlangıcı',
    description:
      'İnsülin salınım sıklığı azalır ve kan şekeri dalgalanmaları hafifler. Açlık hissinde değişiklikler yaşayabilirsin.',
    defenseFocus: 'Glisemik Kontrol',
  },
  3: {
    headline: 'Metabolik Yakıt Geçişi',
    description:
      'Vücut glikozdan yağ kullanımına geçiş sürecine girer. Enerji dalgalanmaları veya hafif halsizlik görülebilir.',
    defenseFocus: 'Metabolik Esneklik',
  },
  4: {
    headline: 'Yağ Oksidasyon Aktivasyonu',
    description:
      'Yağ kullanım mekanizmaları daha aktif çalışmaya başlar. Açlık toleransında artış hissedebilirsin.',
    defenseFocus: 'Yağ Kullanımı',
  },
  5: {
    headline: 'Glisemik Stabilizasyon Başlangıcı',
    description:
      'Kan şekeri dalgalanmaları daha kontrollü hale gelir. Sabah değerlerinde düşüş eğilimi görülebilir.',
    defenseFocus: 'Kan Şekeri Stabilitesi',
  },
  6: {
    headline: 'İnflamatuar Yük Azalımı',
    description:
      'İnsülin baskılanmasıyla birlikte inflamasyon sinyalleri azalmaya başlar. Ödemde hafif azalma fark edebilirsin.',
    defenseFocus: 'İnflamasyon Dengesi',
  },
  7: {
    headline: 'Metabolik Geçiş Stabilizasyonu',
    description:
      'Vücut yağ kullanımına daha uyumlu hale gelir. Enerji daha dengeli hissedilebilir.',
    defenseFocus: 'Metabolik Uyum',
  },
};

const FALLBACK: MetabolicFocus = {
  headline: 'Metabolik Uyum',
  description: 'Vücut yağ kullanımına daha uyumlu hale gelir. Enerji daha dengeli hissedilebilir.',
  defenseFocus: 'Metabolik Uyum',
};

export function getMetabolicFocus(day: number): MetabolicFocus {
  const d = Math.max(1, day);
  return DAY_1_7[d] ?? FALLBACK;
}
