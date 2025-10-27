import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  en: {
    translation: {
      // Common
      'common.continue': 'Continue',
      'common.skip': 'Skip',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.done': 'Done',
      'common.close': 'Close',
      
      // Onboarding
      'onboarding.slide1.title': 'Eat Food as Medicine',
      'onboarding.slide1.text': 'Transform your relationship with food. Every meal is an opportunity to heal and strengthen your body naturally.',
      'onboarding.slide2.title': 'Regain Balance Naturally',
      'onboarding.slide2.text': 'Discover the power of natural healing through mindful eating, movement, and daily rituals.',
      'onboarding.slide3.title': 'Your DiaDefense Monster',
      'onboarding.slide3.text': 'Meet your companion on this journey. Your monster grows stronger as you build healthier habits.',
      
      // Navigation
      'nav.home': 'Home',
      'nav.today': 'Today',
      'nav.meals': 'Meals',
      'nav.supplements': 'Supplements',
      'nav.profile': 'Profile',
      
      // Home
      'home.welcome': 'Welcome Back',
      'home.steps': 'Steps',
      'home.water': 'Water',
      'home.glucose': 'Blood Sugar',
      'home.viewMonster': 'View Monster',
      
      // Monster
      'monster.title': 'Your Monster',
      'monster.energyLevel': 'Energy Level',
      'monster.state.idle': 'Your monster is calm and balanced',
      'monster.state.think': 'Your monster is contemplating',
      'monster.state.success': 'Your monster feels great!',
      'monster.state.celebrate': 'Your monster is celebrating!',
      'monster.state.rest': 'Your monster needs rest',
      
      // Meals
      'meals.title': 'Daily Meals',
      'meals.day': 'Day',
      'meals.breakfast': 'Breakfast',
      'meals.lunch': 'Lunch',
      'meals.dinner': 'Dinner',
      'meals.calories': 'cal',
      'meals.protein': 'g protein',
      'meals.completed': 'Completed',
      'meals.markComplete': 'Mark as Complete',
      
      // Supplements
      'supplements.title': 'Supplements',
      'supplements.taken': 'Taken Today',
      'supplements.reminder': 'Set Reminder',
      
      // Today
      'today.title': 'Today\'s Goals',
      'today.dailyGoals': 'Daily Goals',
      'today.complete': 'Complete',
      
      // Defi Assistant
      'defi.greeting.morning': 'Good morning! Ready to nourish your body today?',
      'defi.greeting.afternoon': 'Keep up the great work! Stay balanced.',
      'defi.greeting.evening': 'Evening reflection: How did your day go?',
      'defi.motto': 'Eat your food like medicine, or one day you\'ll have to eat your medicine as food.',
      'defi.focus': 'Today\'s focus: hydration and gentle motion.',
      'defi.summary': 'You stayed balanced today — your monster smiles.',
      'defi.reminder.supplements': 'Don\'t forget your supplements!',
      'defi.reminder.water': 'Time to hydrate!',
      'defi.reminder.movement': 'A little movement goes a long way.',
      
      // Settings
      'settings.title': 'Settings',
      'settings.theme': 'Theme',
      'settings.language': 'Language',
      'settings.notifications': 'Notifications',
      'settings.personalization': 'Personalization',
      'settings.about': 'About',
      
      // Profile
      'profile.title': 'Profile',
      'profile.statistics': 'Statistics',
      'profile.achievements': 'Achievements',
      'profile.settings': 'Settings',
    },
  },
  tr: {
    translation: {
      'common.continue': 'Devam Et',
      'common.skip': 'Atla',
      'common.save': 'Kaydet',
      'common.cancel': 'İptal',
      'common.done': 'Tamam',
      'common.close': 'Kapat',
      
      'onboarding.slide1.title': 'Yemeğini İlaç Gibi Ye',
      'onboarding.slide1.text': 'Yiyeceklerle ilişkinizi dönüştürün. Her öğün, vücudunuzu doğal olarak iyileştirme fırsatıdır.',
      'onboarding.slide2.title': 'Doğal Dengeyi Yeniden Kazanın',
      'onboarding.slide2.text': 'Bilinçli beslenme, hareket ve günlük ritüellerle doğal iyileşmenin gücünü keşfedin.',
      'onboarding.slide3.title': 'DiaDefense Canavarınız',
      'onboarding.slide3.text': 'Bu yolculukta size eşlik edecek arkadaşınızla tanışın. Sağlıklı alışkanlıklar geliştirdikçe canavarınız güçlenir.',
      
      'nav.home': 'Ana Sayfa',
      'nav.today': 'Bugün',
      'nav.meals': 'Yemekler',
      'nav.supplements': 'Takviyeler',
      'nav.profile': 'Profil',
      
      'home.welcome': 'Tekrar Hoş Geldiniz',
      'home.steps': 'Adımlar',
      'home.water': 'Su',
      'home.glucose': 'Kan Şekeri',
      'home.viewMonster': 'Canavarı Gör',
      
      'monster.title': 'Canavarınız',
      'monster.energyLevel': 'Enerji Seviyesi',
      'monster.state.idle': 'Canavarınız sakin ve dengeli',
      'monster.state.think': 'Canavarınız düşünüyor',
      'monster.state.success': 'Canavarınız harika hissediyor!',
      'monster.state.celebrate': 'Canavarınız kutlama yapıyor!',
      'monster.state.rest': 'Canavarınızın dinlenmeye ihtiyacı var',
      
      'meals.title': 'Günlük Yemekler',
      'meals.day': 'Gün',
      'meals.breakfast': 'Kahvaltı',
      'meals.lunch': 'Öğle Yemeği',
      'meals.dinner': 'Akşam Yemeği',
      'meals.calories': 'kal',
      'meals.protein': 'g protein',
      'meals.completed': 'Tamamlandı',
      'meals.markComplete': 'Tamamlandı Olarak İşaretle',
      
      'supplements.title': 'Takviyeler',
      'supplements.taken': 'Bugün Alındı',
      'supplements.reminder': 'Hatırlatıcı Ayarla',
      
      'today.title': 'Bugünün Hedefleri',
      'today.dailyGoals': 'Günlük Hedefler',
      'today.complete': 'Tamamla',
      
      'defi.greeting.morning': 'Günaydın! Bugün vücudunuzu beslemeye hazır mısınız?',
      'defi.greeting.afternoon': 'Harika gidiyorsun! Dengede kal.',
      'defi.greeting.evening': 'Akşam değerlendirmesi: Gününüz nasıl geçti?',
      'defi.motto': 'Yemeğini ilacınmış gibi ye, yoksa bir gün ilacını yemek zorunda kalırsın.',
      'defi.focus': 'Bugünün odağı: hidrasyon ve hafif hareket.',
      'defi.summary': 'Bugün dengede kaldınız — canavarınız gülümsüyor.',
      'defi.reminder.supplements': 'Takviyelerinizi unutmayın!',
      'defi.reminder.water': 'Su içme zamanı!',
      'defi.reminder.movement': 'Biraz hareket çok şey katar.',
      
      'settings.title': 'Ayarlar',
      'settings.theme': 'Tema',
      'settings.language': 'Dil',
      'settings.notifications': 'Bildirimler',
      'settings.personalization': 'Kişiselleştirme',
      'settings.about': 'Hakkında',
      
      'profile.title': 'Profil',
      'profile.statistics': 'İstatistikler',
      'profile.achievements': 'Başarılar',
      'profile.settings': 'Ayarlar',
    },
  },
  de: {
    translation: {
      'common.continue': 'Weiter',
      'common.skip': 'Überspringen',
      'common.save': 'Speichern',
      'common.cancel': 'Abbrechen',
      'common.done': 'Fertig',
      'common.close': 'Schließen',
      
      'onboarding.slide1.title': 'Essen als Medizin',
      'onboarding.slide1.text': 'Transformieren Sie Ihre Beziehung zum Essen. Jede Mahlzeit ist eine Gelegenheit, Ihren Körper natürlich zu heilen.',
      'onboarding.slide2.title': 'Natürliches Gleichgewicht',
      'onboarding.slide2.text': 'Entdecken Sie die Kraft der natürlichen Heilung durch achtsames Essen, Bewegung und tägliche Rituale.',
      'onboarding.slide3.title': 'Ihr DiaDefense Monster',
      'onboarding.slide3.text': 'Treffen Sie Ihren Begleiter auf dieser Reise. Ihr Monster wird stärker, während Sie gesündere Gewohnheiten aufbauen.',
      
      'nav.home': 'Start',
      'nav.today': 'Heute',
      'nav.meals': 'Mahlzeiten',
      'nav.supplements': 'Nahrungsergänzung',
      'nav.profile': 'Profil',
      
      'home.welcome': 'Willkommen zurück',
      'home.steps': 'Schritte',
      'home.water': 'Wasser',
      'home.glucose': 'Blutzucker',
      'home.viewMonster': 'Monster ansehen',
      
      'monster.title': 'Ihr Monster',
      'monster.energyLevel': 'Energieniveau',
      'monster.state.idle': 'Ihr Monster ist ruhig und ausgeglichen',
      'monster.state.think': 'Ihr Monster denkt nach',
      'monster.state.success': 'Ihr Monster fühlt sich großartig!',
      'monster.state.celebrate': 'Ihr Monster feiert!',
      'monster.state.rest': 'Ihr Monster braucht Ruhe',
      
      'meals.title': 'Tägliche Mahlzeiten',
      'meals.day': 'Tag',
      'meals.breakfast': 'Frühstück',
      'meals.lunch': 'Mittagessen',
      'meals.dinner': 'Abendessen',
      'meals.calories': 'kcal',
      'meals.protein': 'g Protein',
      'meals.completed': 'Erledigt',
      'meals.markComplete': 'Als erledigt markieren',
      
      'supplements.title': 'Nahrungsergänzung',
      'supplements.taken': 'Heute eingenommen',
      'supplements.reminder': 'Erinnerung einstellen',
      
      'today.title': 'Heutige Ziele',
      'today.dailyGoals': 'Tagesziele',
      'today.complete': 'Abschließen',
      
      'defi.greeting.morning': 'Guten Morgen! Bereit, Ihren Körper heute zu nähren?',
      'defi.greeting.afternoon': 'Weiter so! Bleiben Sie im Gleichgewicht.',
      'defi.greeting.evening': 'Abendbilanz: Wie war Ihr Tag?',
      'defi.motto': 'Essen Sie Ihr Essen wie Medizin, oder eines Tages müssen Sie Ihre Medizin wie Essen nehmen.',
      'defi.focus': 'Heutiger Fokus: Hydratation und sanfte Bewegung.',
      'defi.summary': 'Sie blieben heute im Gleichgewicht — Ihr Monster lächelt.',
      'defi.reminder.supplements': 'Vergessen Sie Ihre Nahrungsergänzung nicht!',
      'defi.reminder.water': 'Zeit zu trinken!',
      'defi.reminder.movement': 'Ein bisschen Bewegung hilft viel.',
      
      'settings.title': 'Einstellungen',
      'settings.theme': 'Thema',
      'settings.language': 'Sprache',
      'settings.notifications': 'Benachrichtigungen',
      'settings.personalization': 'Personalisierung',
      'settings.about': 'Über',
      
      'profile.title': 'Profil',
      'profile.statistics': 'Statistiken',
      'profile.achievements': 'Erfolge',
      'profile.settings': 'Einstellungen',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: Localization.getLocales()[0]?.languageCode || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;