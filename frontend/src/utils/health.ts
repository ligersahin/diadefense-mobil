import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health';

export function isHealthAvailable(): Promise<boolean> {
  return new Promise((resolve) => {
    AppleHealthKit.isAvailable((err: string) => resolve(!err));
  });
}

export function requestWeightPermission(): Promise<boolean> {
  const permissions: HealthKitPermissions = {
    permissions: {
      read: [AppleHealthKit.Constants.Permissions.Weight],
      write: [],
    },
  };

  return new Promise((resolve) => {
    AppleHealthKit.initHealthKit(permissions, (err: string) => resolve(!err));
  });
}

export function getLatestWeight(): Promise<number | null> {
  const options = {
    unit: 'kg',
    startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
    endDate: new Date().toISOString(),
    limit: 1,
    ascending: false,
  };

  return new Promise((resolve) => {
    AppleHealthKit.getWeightSamples(options as any, (err: string, results: HealthValue[]) => {
      if (err || !results || results.length === 0) return resolve(null);
      const v = (results[0] as any).value;
      resolve(typeof v === 'number' ? v : null);
    });
  });
}
