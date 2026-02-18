
export enum PrayerKey {
  FAJR = 'fajr',
  DHUHR_ASR = 'dhuhr_asr',
  MAGHRIB_ISHA = 'maghrib_isha'
}

export interface DailyPrayers {
  [date: string]: {
    [key in PrayerKey]?: boolean;
  };
}

export interface QazaState {
  [PrayerKey.FAJR]: number;
  [PrayerKey.DHUHR_ASR]: number;
  [PrayerKey.MAGHRIB_ISHA]: number;
}

export interface AppState {
  daily: DailyPrayers;
  qaza: QazaState;
  settings: {
    userName: string;
    calculationMethod: string;
  };
}
