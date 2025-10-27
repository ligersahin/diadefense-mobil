# 🌿 DiaDefense - Living Monster System

A modern, full-featured mobile health app built with React Native (Expo) and UI Kitten, inspired by StressWatch's smooth animations and reactive mascot design.

## 📱 App Overview

DiaDefense is a comprehensive health tracking app featuring a **Living Monster System** that responds to your daily health activities. Your monster's energy and mood change based on your:
- Meal logging
- Supplement intake
- Daily activities (steps, water, glucose)
- Physical activity (walks)

## ✨ Key Features Implemented

### 🎨 **UI & Design**
- **Custom DiaDefense Color Palette:**
  - Light Gray: rgb(220,220,215)
  - Olive Green: rgb(170,180,140)
  - Sand Yellow: rgb(240,220,130)
  - Ocean Blue: rgb(70,130,180)
- **Animated gradient backgrounds** that shift based on user progress
- **Light/Dark theme toggle** using UI Kitten themes
- **Smooth transitions and animations** (breathing effects, fade/scale)
- **Responsive card-based layouts** with rounded corners and shadows

### 🦖 **Monster System**
- **5 Monster States:**
  - `idle` - Calm breathing animation
  - `think` - Contemplative tilt animation
  - `success` - Happy scale-up animation
  - `celebrate` - Bouncing celebration
  - `rest` - Slow breathing (low energy)
- **Energy Score System (0-100):**
  - Meals logged: +5 energy
  - Supplements taken: +10 energy
  - Activities completed: +5 energy
  - Daily walk: +15 energy
- **Visual feedback:**
  - Monster changes color based on energy (Blue → Green → Yellow)
  - Animated circular monster with icon-based states
  - Haptic feedback on state changes

### 🤖 **Defi Assistant**
- Motivational coach that appears based on progress
- Time-of-day greetings (morning/afternoon/evening)
- Static messages tied to energy levels
- Modal popup system
- Ready for future LLM integration

### 🍽️ **Daily Meals System**
- **7-day meal plan** with automatic day progression
- Meals auto-advance based on user's start date
- Each day includes:
  - Breakfast
  - Lunch
  - Dinner
- Each meal shows:
  - Title and description
  - Calories
  - Protein content
- Mark meals as complete → triggers Monster success animation

### 💊 **Supplements Tracking**
- 4 pre-loaded supplements:
  - Vitamin D
  - Omega-3
  - Black Seed Oil
  - Magnesium
- Toggle system to mark as taken
- Completion triggers Monster success state
- Persistent state saved locally

### 📊 **Daily Goals (Today Tab)**
- Track progress with visual progress bars:
  - Steps (target: 10,000)
  - Water intake (target: 8 glasses)
  - Glucose checks (target: 3)
  - Daily walk (target: 1)
- Color-coded progress indicators

### 🏆 **Achievements System**
- 5 achievement badges:
  - 3-Day Streak
  - Meal Master (21 meals)
  - Supplement Champion (7 days)
  - Monster Level 5 (80% energy)
  - Weekly Warrior
- Unlocked/locked visual states

### 📈 **Statistics**
- Weekly summary cards
- Placeholder for future graphs (energy trends, glucose)

### ⚙️ **Settings & Personalization**
- **Theme toggle:** Light/Dark mode
- **Language support:** English, Turkish (Türkçe), German (Deutsch)
- **Monster customization:**
  - Choose monster color (Olive, Blue, Yellow)
  - Optional leaf emblem accessory
- **Notification preferences** (mock UI for 6 types)

### 🧭 **Navigation**
- **Bottom Tab Navigation:**
  - Home
  - Today
  - Meals
  - Supplements
  - Profile
- **Stack Navigation for:**
  - Monster (full-screen)
  - Statistics
  - Achievements
  - Settings
  - Personalization
  - Notifications

### 🌍 **Internationalization (i18n)**
- Full support for 3 languages:
  - English (en)
  - Turkish (tr)
  - German (de)
- Auto-detect device language
- All UI elements translated

### 💾 **State Management**
- **Zustand** for global state
- **AsyncStorage** for persistence
- Auto-save on all actions
- State includes:
  - Energy score
  - Monster state
  - Completed meals/supplements/activities
  - User preferences (theme, language)
  - Daily progress

### 🎬 **Onboarding Flow**
- 3-slide introduction:
  1. "Eat your food like medicine"
  2. "Regain balance naturally"
  3. "Your DiaDefense Monster"
- Skip or step through
- Only shown on first launch
- Smooth animated transitions

## 🏗️ Project Structure

```
frontend/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab navigation
│   │   ├── index.tsx             # Home screen
│   │   ├── today.tsx             # Daily goals
│   │   ├── meals.tsx             # Meal tracking
│   │   ├── supplements.tsx       # Supplement tracking
│   │   └── profile.tsx           # Profile & menu
│   ├── _layout.tsx               # Root layout (UI Kitten provider)
│   ├── index.tsx                 # Entry point & routing logic
│   ├── onboarding.tsx            # 3-slide onboarding
│   ├── monster.tsx               # Full-screen monster view
│   ├── statistics.tsx            # Stats & graphs
│   ├── achievements.tsx          # Achievement badges
│   ├── settings.tsx              # App settings
│   ├── personalization.tsx       # Monster customization
│   └── notifications.tsx         # Notification preferences
├── components/
│   ├── MonsterAnimator.tsx       # Animated monster component
│   ├── DefiModal.tsx             # Assistant modal
│   ├── MealCard.tsx              # Meal display card
│   ├── SupplementCard.tsx        # Supplement toggle card
│   └── ProgressCard.tsx          # Progress bar card
├── store/
│   └── appState.ts               # Zustand state management
├── assets/
│   ├── data/
│   │   └── meals.json            # 7-day meal data
│   └── monster/                  # Placeholder for Lottie animations
├── theme/
│   └── custom-theme.json         # UI Kitten custom theme
├── utils/
│   ├── i18n.ts                   # Translation setup
│   └── helpers.ts                # Utility functions
├── constants/
│   └── colors.ts                 # DiaDefense color palette
└── package.json
```

## 📦 Tech Stack

### Core
- **React Native** 0.79.5
- **Expo** 54
- **TypeScript** 5.8.3
- **Expo Router** (file-based routing)

### UI & Styling
- **@ui-kitten/components** 5.3.1
- **@eva-design/eva** (Eva Design System)
- **expo-linear-gradient** (gradient backgrounds)
- **@expo/vector-icons** (Ionicons)

### State & Data
- **zustand** 5.0.8 (global state)
- **@react-native-async-storage/async-storage** 2.2.0 (persistence)
- **date-fns** 4.1.0 (date utilities)

### Navigation
- **@react-navigation/native** 7.1.6
- **@react-navigation/bottom-tabs** 7.3.10
- **@react-navigation/native-stack** 7.5.1

### Features
- **expo-haptics** (tactile feedback)
- **expo-secure-store** (secure storage)
- **expo-localization** (device language detection)
- **i18next** + **react-i18next** (internationalization)
- **react-native-svg** (vector graphics)

### Animations
- **lottie-react-native** 7.3.4 (for future custom monster animations)
- **react-native-reanimated** 3.17.4

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Yarn or npm
- Expo Go app (for mobile testing)

### Installation

```bash
cd /app/frontend
yarn install
```

### Run the App

```bash
# Start Expo development server
yarn start

# For specific platforms
yarn android   # Android emulator
yarn ios       # iOS simulator
yarn web       # Web browser
```

### Testing on Device
1. Install **Expo Go** app on your phone
2. Scan the QR code from the terminal
3. App will load on your device

## 🎯 Key User Flows

### First Launch
1. Onboarding (3 slides) → Skip or Continue
2. App initializes with:
   - Energy: 50%
   - Monster: Idle state
   - Day 1 meals loaded
   - All activities uncompleted

### Daily Usage Loop
1. **Morning:**
   - Check Today's goals
   - Log breakfast → Monster success animation
   - Take supplements → Monster success + energy boost

2. **Afternoon:**
   - Log lunch
   - Track water intake
   - Check glucose

3. **Evening:**
   - Log dinner
   - Complete daily walk → Monster celebrate animation
   - View monster's updated energy level

### Progression System
- Each action increases energy
- Energy determines monster mood
- Achievements unlock as you build streaks
- Day counter auto-advances at midnight

## 🎨 Design Highlights

### Breathing Animations
- Monster performs subtle breathing animation when idle
- Background gradients pulse softly
- Cards fade in on screen load

### Color Psychology
- **Blue (Low Energy):** Calm, needs attention
- **Green (Balanced):** Healthy, stable
- **Yellow (High Energy):** Thriving, excellent

### Accessibility
- High contrast text
- Touch targets ≥44px
- Clear visual hierarchy
- Icon + text labels

## 🔮 Future Enhancements (Noted in Code)

### Ready for Implementation
1. **Custom Lottie Animations:**
   - Replace icon-based monster with actual DiaDefense Monster JSON files
   - Add to `/assets/monster/` directory

2. **Backend Integration:**
   - State management structured for easy API integration
   - Replace AsyncStorage with MongoDB backend
   - User accounts and cloud sync

3. **AI-Powered Defi Assistant:**
   - Hook already in place (`getDefiMessage()`)
   - Connect to Emergent LLM API
   - Dynamic motivational messages

4. **Real Push Notifications:**
   - Notification settings UI already built
   - Add Expo Notifications integration
   - Schedule reminders

5. **Data Visualization:**
   - Placeholder screens ready
   - Add React Native Charts
   - Glucose trends
   - Energy history

## 📝 Data Structures

### Zustand Store State
```typescript
{
  energyScore: number,           // 0-100
  monsterState: MonsterState,    // idle|think|success|celebrate|rest
  startDate: string,             // ISO date
  dayIndex: number,              // Auto-calculated
  completedMeals: string[],      // ['breakfast', 'lunch']
  completedSupplements: string[], // ['vitamin-d', 'omega-3']
  completedActivities: {
    steps: boolean,
    water: boolean,
    glucose: boolean,
    walk: boolean
  },
  theme: 'light' | 'dark',
  language: 'en' | 'tr' | 'de',
  hasCompletedOnboarding: boolean
}
```

### Meals Data Structure
```json
{
  "meals": [
    {
      "day": 1,
      "breakfast": {
        "title": "Avocado Egg Toast",
        "description": "Whole grain toast with mashed avocado...",
        "calories": 350,
        "protein": 15
      },
      ...
    }
  ]
}
```

## 🎭 Monster State Logic

```typescript
// Energy-based automatic state changes:
energyScore >= 70  → celebrate
energyScore >= 40  → idle
energyScore >= 20  → think
energyScore < 20   → rest

// Action-triggered states:
Meal logged        → success (2 seconds)
Supplement taken   → success (2 seconds)
Walk completed     → celebrate (3 seconds)
```

## 🌐 Supported Languages

| Language | Code | Status |
|----------|------|--------|
| English  | en   | ✅ Complete |
| Turkish  | tr   | ✅ Complete |
| German   | de   | ✅ Complete |

## 🎉 Demo Data Included

- **7 days of meal plans** (loops after day 7)
- **4 supplements** with descriptions
- **5 achievements** (2 unlocked by default)
- **Demo progress values** for stats
- **Motivational messages** in 3 languages

## 🔧 Configuration

### Theme Colors
Edit `/constants/colors.ts` to customize the DiaDefense palette.

### Translations
Add/edit translations in `/utils/i18n.ts`.

### Meals
Modify `/assets/data/meals.json` to change meal plans.

### Monster Animations
When ready, add Lottie JSON files to `/assets/monster/`:
- `idle.json`
- `think.json`
- `success.json`
- `celebrate.json`
- `rest.json`

Then update `MonsterAnimator.tsx` to use Lottie instead of icons.

## 📸 Screenshots

**Home Screen:**
- Gradient background
- Quick stats (steps, water, glucose)
- Monster energy display
- Motivational quote
- Defi chat button

**Today Screen:**
- 4 progress cards with visual bars
- Real-time activity tracking

**Meals Screen:**
- Day indicator (auto-updates)
- 3 meal cards per day
- Complete button per meal
- Nutritional info

**Supplements Screen:**
- 4 supplement cards
- Toggle switches
- Descriptions

**Profile Screen:**
- User avatar
- Menu items with icons
- Navigate to sub-screens

**Monster Screen:**
- Full-screen animated monster
- Large energy display
- Energy level text
- State message
- Tips card

## ⚡ Performance

- **State persistence:** Saves automatically on every action
- **Animations:** 60fps using native driver
- **List rendering:** Optimized with key props
- **Bundle size:** Optimized with tree shaking

## 🐛 Known Issues

- Package version warnings (cosmetic, doesn't affect functionality)
- Lottie animations are placeholder icon-based (awaiting custom DiaDefense Monster files)
- Notifications are mock UI (not connected to Expo Notifications)
- Graphs are placeholder (awaiting data viz implementation)

## 🤝 Contributing

This is an MVP. Future additions should maintain:
- Mobile-first responsive design
- TypeScript strict mode
- UI Kitten component library
- Zustand state patterns
- i18n support for all new strings

## 📄 License

DiaDefense - Living Monster System
Built with ❤️ using Expo and UI Kitten

---

## 🎊 MVP Status: ✅ COMPLETE

All core features implemented:
- ✅ Onboarding flow
- ✅ Bottom tab navigation
- ✅ Monster system with 5 states
- ✅ Energy tracking (0-100)
- ✅ Meals (7-day auto-advancing plan)
- ✅ Supplements (4 supplements)
- ✅ Daily goals tracking
- ✅ Achievements system
- ✅ Statistics placeholder
- ✅ Settings (theme, language)
- ✅ Personalization (monster colors)
- ✅ Defi assistant modal
- ✅ State persistence
- ✅ i18n (3 languages)
- ✅ Haptic feedback
- ✅ Gradient backgrounds
- ✅ Smooth animations

**Ready for user testing and feedback!** 🚀
