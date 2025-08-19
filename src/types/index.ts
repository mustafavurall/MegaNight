// Core type definitions for the Turkcell Roaming Assistant

export interface User {
  id: string;
  name: string;
  phone: string;
  currentPlan: string;
}

export interface Country {
  code: string;
  name: string;
  region: string;
  flag: string;
}

export interface TravelPlan {
  countries: Country[];
  startDate: string;
  endDate: string;
  duration: number; // days
}

export interface UsageProfile {
  dailyData: number; // MB
  dailyVoice: number; // minutes
  dailySms: number; // count
  profileType: 'light' | 'medium' | 'heavy' | 'custom';
}

export interface RoamingPackage {
  id: string;
  name: string;
  type: 'regional' | 'country' | 'global';
  regions: string[];
  countries: string[];
  data: number; // GB
  voice: number; // minutes
  sms: number; // count
  price: number; // TL
  validity: number; // days
  description: string;
  features: string[];
}

export interface PayAsYouGoRate {
  country: string;
  dataPerMb: number; // TL
  voicePerMin: number; // TL
  smsPerUnit: number; // TL
}

export interface CostCalculation {
  packageId?: string;
  packageName: string;
  totalCost: number;
  baseCost: number;
  overageCost: number;
  payAsYouGoCost?: number;
  breakdown: {
    data: number;
    voice: number;
    sms: number;
  };
  warnings: string[];
  isRecommended: boolean;
  validityIssue?: boolean;
}

export interface Alert {
  type: 'warning' | 'info' | 'error';
  title: string;
  message: string;
  action?: string;
}

export interface SimulationResult {
  calculations: CostCalculation[];
  alerts: Alert[];
  recommendations: CostCalculation[];
  bestOption: CostCalculation;
}