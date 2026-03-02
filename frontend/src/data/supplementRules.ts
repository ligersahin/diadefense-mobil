export type MealKey = 'breakfast' | 'lunch' | 'dinner';

export type SupplementItem = {
  name: string;
  dose?: string;
};

export type SupplementRule = {
  id: string;
  meal: MealKey;
  offsetMinutes: number;
  title: string;
  items: SupplementItem[];
  enabled: boolean;
  intervalDays?: number;
};

export const supplementRules: SupplementRule[] = [
  {
    id: 'breakfast_pre_30_probiotic_olive',
    meal: 'breakfast',
    offsetMinutes: -30,
    title: 'Kahvaltıdan 30 dk önce',
    items: [
      { name: 'Probiyotik' },
      { name: 'Zeytin yaprağı' },
    ],
    enabled: true,
  },
  {
    id: 'breakfast_post_60_krill_magnesium',
    meal: 'breakfast',
    offsetMinutes: 60,
    title: 'Kahvaltıdan 60 dk sonra',
    items: [
      { name: 'Krill yağı' },
      { name: 'Magnezyum' },
    ],
    enabled: true,
  },
  {
    id: 'breakfast_post_90_vitamin_d',
    meal: 'breakfast',
    offsetMinutes: 90,
    title: 'Kahvaltıdan 90 dk sonra',
    items: [
      { name: 'D vitamini (Devit-3 ampul)', dose: 'Zeytinyağı ile' },
    ],
    enabled: true,
    intervalDays: 15,
  },
  {
    id: 'lunch_pre_30_fenugreek',
    meal: 'lunch',
    offsetMinutes: -30,
    title: 'Öğle yemeğinden 30 dk önce',
    items: [
      { name: 'Çemen otu' },
    ],
    enabled: true,
  },
  {
    id: 'dinner_pre_30_probiotic_olive',
    meal: 'dinner',
    offsetMinutes: -30,
    title: 'Akşam yemeğinden 30 dk önce',
    items: [
      { name: 'Probiyotik' },
      { name: 'Zeytin yaprağı' },
    ],
    enabled: true,
  },
  {
    id: 'dinner_post_60_krill',
    meal: 'dinner',
    offsetMinutes: 60,
    title: 'Akşam yemeğinden 60 dk sonra',
    items: [
      { name: 'Krill yağı' },
    ],
    enabled: true,
  },
];
