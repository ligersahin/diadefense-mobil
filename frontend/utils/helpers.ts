export const getDefiMessage = (energyScore: number, timeOfDay: 'morning' | 'afternoon' | 'evening'): string => {
  if (timeOfDay === 'morning') {
    if (energyScore < 30) {
      return "defi.greeting.morning";
    } else if (energyScore < 70) {
      return "defi.focus";
    } else {
      return "defi.greeting.morning";
    }
  } else if (timeOfDay === 'afternoon') {
    return "defi.greeting.afternoon";
  } else {
    return "defi.greeting.evening";
  }
};

export const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
};

export const formatEnergyLevel = (energy: number): string => {
  if (energy < 20) return '1 – Very Low';
  if (energy < 40) return '2 – Low';
  if (energy < 60) return '3 – Balanced';
  if (energy < 80) return '4 – High';
  return '5 – Excellent';
};