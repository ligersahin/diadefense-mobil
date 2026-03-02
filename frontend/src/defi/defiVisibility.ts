import AsyncStorage from '@react-native-async-storage/async-storage';

export const DEFI_HIDE_UNTIL_DATE_KEY = '@diadefense_defi_hide_until_date_v1';
export const LAST_DEFI_MESSAGE_KEY = '@diadefense_defi_last_msg_v1:';

const keyFor = (screen: string) => `${DEFI_HIDE_UNTIL_DATE_KEY}:${screen}`;
const messageKeyFor = (screen: string) => `${LAST_DEFI_MESSAGE_KEY}${screen}`;

export async function shouldShowDefi(todayISO: string, screen: string): Promise<boolean> {
  try {
    const hideUntil = await AsyncStorage.getItem(keyFor(screen));
    if (hideUntil === todayISO) return false;
    return true;
  } catch {
    return true;
  }
}

export async function hideDefiForToday(todayISO: string, screen: string): Promise<void> {
  await AsyncStorage.setItem(keyFor(screen), todayISO);
}

export async function shouldShowMessage(screenId: string, body: string): Promise<boolean> {
  try {
    const raw = await AsyncStorage.getItem(messageKeyFor(screenId));
    if (!raw) return true;
    const parsed = JSON.parse(raw) as { body?: string; ts?: number };
    if (!parsed?.body || typeof parsed.ts !== 'number') return true;
    if (parsed.body !== body) return true;
    const tenMinutesMs = 10 * 60 * 1000;
    return Date.now() - parsed.ts > tenMinutesMs;
  } catch {
    return true;
  }
}

export async function markMessageShown(screenId: string, body: string): Promise<void> {
  try {
    await AsyncStorage.setItem(
      messageKeyFor(screenId),
      JSON.stringify({ body, ts: Date.now() })
    );
  } catch {
    // TODO: Defi mesajı yazılamazsa sessizce yoksay.
  }
}
