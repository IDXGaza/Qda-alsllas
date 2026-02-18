
import React from 'react';
import { PrayerKey } from './types';
import { Sun, Moon, Sunrise } from 'lucide-react';

export const PRAYER_METADATA = [
  { 
    key: PrayerKey.FAJR, 
    label: 'صلاة الفجر', 
    icon: <Sunrise className="w-6 h-6" />, 
    color: 'text-amber-500',
    bg: 'bg-amber-50'
  },
  { 
    key: PrayerKey.DHUHR_ASR, 
    label: 'صلاة الظهرين', 
    subLabel: 'الظهر والعصر',
    icon: <Sun className="w-6 h-6" />, 
    color: 'text-orange-500',
    bg: 'bg-orange-50'
  },
  { 
    key: PrayerKey.MAGHRIB_ISHA, 
    label: 'صلاة العشائين', 
    subLabel: 'المغرب والعشاء',
    icon: <Moon className="w-6 h-6" />, 
    color: 'text-indigo-500',
    bg: 'bg-indigo-50'
  },
];

export const INITIAL_QAZA: Record<PrayerKey, number> = {
  [PrayerKey.FAJR]: 0,
  [PrayerKey.DHUHR_ASR]: 0,
  [PrayerKey.MAGHRIB_ISHA]: 0,
};
