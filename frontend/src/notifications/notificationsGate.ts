import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export const NOTIFICATIONS_ENABLED_KEY = '@diadefense_notifications_enabled_v1';

export async function areNotificationsEnabled(): Promise<boolean> {
  try {
    const stored = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED_KEY);
    if (stored === null) return true;
    return stored === 'true';
  } catch {
    return true;
  }
}

export async function cancelAllAppNotifications(): Promise<void> {
  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    await Promise.all(
      scheduled.map((item) =>
        Notifications.cancelScheduledNotificationAsync(item.identifier)
      )
    );
  } catch {
    // TODO: Toplu bildirim iptali başarısızsa sessizce yoksay.
  }
}
