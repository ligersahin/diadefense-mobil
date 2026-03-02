import { DefiMood, MonsterState, MealSlot } from '../types';

type DefiResponse = {
  mood: DefiMood;
  message: string;
};

type MessageInput = {
  defenseScore: number;
  mealRatio: number;
  supplementRatio: number;
  waterRatio: number;
  sleepRatio: number;
  activityRatio: number;
  missedMeals: MealSlot[];
  missedSupplements: number;
  monsterState: MonsterState;
};

export function getDefiMessage(input: MessageInput): DefiResponse {
  const {
    defenseScore,
    mealRatio,
    supplementRatio,
    waterRatio,
    sleepRatio,
    activityRatio,
    missedMeals,
    missedSupplements,
    monsterState
  } = input;

  // Yüksek savunma skoru (80+)
  if (defenseScore >= 80) {
    const happyMessages = [
      'Çok iyi gidiyorsun! Canavar zayıfladı, seni görmekten korkuyor! 👏',
      'Mükemmel! Savunman güçlü, diyabet canavarı çaresiz! 🛡️',
      'Harika bir performans! Böyle devam et, kazanan sensin! ⭐',
      'Savunma sistemi tam güçte! Canavar geri çekiliyor! 🚀'
    ];
    return {
      mood: 'happy',
      message: happyMessages[Math.floor(Math.random() * happyMessages.length)]
    };
  }

  // Orta-iyi savunma (60-79)
  if (defenseScore >= 60) {
    if (waterRatio < 0.7) {
      return {
        mood: 'concerned',
        message: 'İyi gidiyorsun ama su içmeyi unutma! Su savunmanı güçlendirir. 💧'
      };
    }
    if (activityRatio < 0.6) {
      return {
        mood: 'concerned',
        message: 'Güzel! Ama biraz daha hareket etsen savunman mükemmel olur. 🚶'
      };
    }
    if (missedMeals.length > 0) {
      const mealNames: Record<MealSlot, string> = {
        breakfast: 'kahvaltı',
        lunch: 'öğle',
        dinner: 'akşam'
      };
      return {
        mood: 'concerned',
        message: `İyi gidiyorsun! ${mealNames[missedMeals[0]]} öğnünü tamamlarsan tam puan! 🍽️`
      };
    }
    return {
      mood: 'idle',
      message: 'İyi gidiyorsun! Biraz daha çaba göster, mükemmel olacaksın! 👍'
    };
  }

  // Orta savunma (40-59)
  if (defenseScore >= 40) {
    if (mealRatio < 0.5) {
      return {
        mood: 'concerned',
        message: 'Ögünlerini atlama! Düzensiz beslenme canavarı güçlendiriyor. 🍽️'
      };
    }
    if (supplementRatio < 0.5 && missedSupplements > 2) {
      return {
        mood: 'concerned',
        message: 'Supplementlerini almayı unutmuşsun. Bunlar savunman için önemli! 💊'
      };
    }
    if (waterRatio < 0.4) {
      return {
        mood: 'concerned',
        message: 'Su içmek çok önemli! Hedefinin yarısına bile ulaşamadın. 💧'
      };
    }
    if (sleepRatio < 0.7) {
      return {
        mood: 'concerned',
        message: 'Yeterli uyumadın gibi görünüyor. Uyku savunmanı güçlendirir! 😴'
      };
    }
    return {
      mood: 'concerned',
      message: 'Biraz geride kaldık. Hadi toparlayalım, sen yaparsın! 💪'
    };
  }

  // Düşük savunma (<40) - UYARI
  if (monsterState === 'angry') {
    return {
      mood: 'warning',
      message: '⚠️ DİKKAT! Canavar çok güçlendi! Acil harekete geç ! Programı takip et!'
    };
  }

  if (mealRatio < 0.3) {
    return {
      mood: 'warning',
      message: '⚠️ Ögünlerinin çoğunu atlıyorsun! Bu çok tehlikeli, lütfen ye! 🍽️'
    };
  }

  if (waterRatio < 0.3) {
    return {
      mood: 'warning',
      message: '⚠️ Çok az su içiyorsun! Bu sağlığını riske atıyor! 💧'
    };
  }

  return {
    mood: 'warning',
    message: '⚠️ Savunman çok zayıf! Lütfen programı takip et, sağlığın önemli! 🚚'
  };
}

export function getMonsterState(defenseScore: number): MonsterState {
  if (defenseScore >= 70) return 'weak';
  if (defenseScore >= 40) return 'neutral';
  return 'angry';
}
