import { User, Country, RoamingPackage, PayAsYouGoRate, UsageProfile } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    phone: '0532 123 45 67',
    currentPlan: 'Turkcell Platinum 50GB'
  },
  {
    id: '2',
    name: 'Ayşe Demir',
    phone: '0533 987 65 43',
    currentPlan: 'Turkcell Gold 25GB'
  },
  {
    id: '3',
    name: 'Mehmet Kaya',
    phone: '0534 555 44 33',
    currentPlan: 'Turkcell Silver 10GB'
  }
];

export const countries: Country[] = [
  { code: 'TR', name: 'Türkiye', region: 'Türkiye', flag: '🇹🇷' },
  { code: 'DE', name: 'Almanya', region: 'Avrupa', flag: '🇩🇪' },
  { code: 'FR', name: 'Fransa', region: 'Avrupa', flag: '🇫🇷' },
  { code: 'IT', name: 'İtalya', region: 'Avrupa', flag: '🇮🇹' },
  { code: 'ES', name: 'İspanya', region: 'Avrupa', flag: '🇪🇸' },
  { code: 'GB', name: 'İngiltere', region: 'Avrupa', flag: '🇬🇧' },
  { code: 'US', name: 'Amerika', region: 'Amerika', flag: '🇺🇸' },
  { code: 'AE', name: 'BAE', region: 'Ortadoğu', flag: '🇦🇪' },
  { code: 'SA', name: 'Suudi Arabistan', region: 'Ortadoğu', flag: '🇸🇦' },
  { code: 'JP', name: 'Japonya', region: 'Asya', flag: '🇯🇵' },
  { code: 'CN', name: 'Çin', region: 'Asya', flag: '🇨🇳' },
  { code: 'IN', name: 'Hindistan', region: 'Asya', flag: '🇮🇳' },
  { code: 'RU', name: 'Rusya', region: 'Avrasya', flag: '🇷🇺' },
  { code: 'EG', name: 'Mısır', region: 'Afrika', flag: '🇪🇬' },
  { code: 'ZA', name: 'Güney Afrika', region: 'Afrika', flag: '🇿🇦' }
];

export const roamingPackages: RoamingPackage[] = [
  {
    id: 'eu-weekly',
    name: 'Avrupa Haftalık',
    type: 'regional',
    regions: ['Avrupa'],
    countries: ['DE', 'FR', 'IT', 'ES', 'GB'],
    data: 5,
    voice: 100,
    sms: 50,
    price: 149,
    validity: 7,
    description: 'Avrupa ülkeleri için haftalık roaming paketi',
    features: ['5GB Data', '100 Dakika', '50 SMS', '7 Gün Geçerli']
  },
  {
    id: 'eu-monthly',
    name: 'Avrupa Aylık',
    type: 'regional',
    regions: ['Avrupa'],
    countries: ['DE', 'FR', 'IT', 'ES', 'GB'],
    data: 20,
    voice: 300,
    sms: 150,
    price: 399,
    validity: 30,
    description: 'Avrupa ülkeleri için aylık roaming paketi',
    features: ['20GB Data', '300 Dakika', '150 SMS', '30 Gün Geçerli']
  },
  {
    id: 'usa-weekly',
    name: 'Amerika Haftalık',
    type: 'country',
    regions: ['Amerika'],
    countries: ['US'],
    data: 3,
    voice: 60,
    sms: 30,
    price: 199,
    validity: 7,
    description: 'Amerika için haftalık roaming paketi',
    features: ['3GB Data', '60 Dakika', '30 SMS', '7 Gün Geçerli']
  },
  {
    id: 'global-monthly',
    name: 'Global Aylık',
    type: 'global',
    regions: ['Avrupa', 'Amerika', 'Asya', 'Ortadoğu'],
    countries: ['DE', 'FR', 'IT', 'ES', 'GB', 'US', 'AE', 'SA', 'JP'],
    data: 15,
    voice: 200,
    sms: 100,
    price: 599,
    validity: 30,
    description: 'Tüm dünya için aylık roaming paketi',
    features: ['15GB Data', '200 Dakika', '100 SMS', '30 Gün Geçerli']
  },
  {
    id: 'middle-east-weekly',
    name: 'Ortadoğu Haftalık',
    type: 'regional',
    regions: ['Ortadoğu'],
    countries: ['AE', 'SA'],
    data: 4,
    voice: 80,
    sms: 40,
    price: 129,
    validity: 7,
    description: 'Ortadoğu ülkeleri için haftalık paket',
    features: ['4GB Data', '80 Dakika', '40 SMS', '7 Gün Geçerli']
  }
];

export const payAsYouGoRates: PayAsYouGoRate[] = [
  { country: 'DE', dataPerMb: 0.15, voicePerMin: 2.5, smsPerUnit: 1.0 },
  { country: 'FR', dataPerMb: 0.15, voicePerMin: 2.5, smsPerUnit: 1.0 },
  { country: 'IT', dataPerMb: 0.15, voicePerMin: 2.5, smsPerUnit: 1.0 },
  { country: 'ES', dataPerMb: 0.15, voicePerMin: 2.5, smsPerUnit: 1.0 },
  { country: 'GB', dataPerMb: 0.18, voicePerMin: 3.0, smsPerUnit: 1.2 },
  { country: 'US', dataPerMb: 0.25, voicePerMin: 4.0, smsPerUnit: 1.5 },
  { country: 'AE', dataPerMb: 0.12, voicePerMin: 2.0, smsPerUnit: 0.8 },
  { country: 'SA', dataPerMb: 0.12, voicePerMin: 2.0, smsPerUnit: 0.8 },
  { country: 'JP', dataPerMb: 0.30, voicePerMin: 5.0, smsPerUnit: 2.0 },
  { country: 'CN', dataPerMb: 0.20, voicePerMin: 3.5, smsPerUnit: 1.3 },
  { country: 'IN', dataPerMb: 0.08, voicePerMin: 1.5, smsPerUnit: 0.5 },
  { country: 'RU', dataPerMb: 0.22, voicePerMin: 3.8, smsPerUnit: 1.4 },
  { country: 'EG', dataPerMb: 0.10, voicePerMin: 1.8, smsPerUnit: 0.6 },
  { country: 'ZA', dataPerMb: 0.16, voicePerMin: 2.8, smsPerUnit: 1.1 }
];

export const defaultUsageProfiles: { [key: string]: UsageProfile } = {
  light: {
    dailyData: 200, // 200MB
    dailyVoice: 10, // 10 minutes
    dailySms: 5, // 5 SMS
    profileType: 'light'
  },
  medium: {
    dailyData: 500, // 500MB
    dailyVoice: 20, // 20 minutes
    dailySms: 10, // 10 SMS
    profileType: 'medium'
  },
  heavy: {
    dailyData: 1000, // 1GB
    dailyVoice: 40, // 40 minutes
    dailySms: 15, // 15 SMS
    profileType: 'heavy'
  }
};