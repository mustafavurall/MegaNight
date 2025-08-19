import { 
  TravelPlan, 
  UsageProfile, 
  RoamingPackage, 
  PayAsYouGoRate, 
  CostCalculation, 
  Alert, 
  SimulationResult 
} from '../types';
import { roamingPackages, payAsYouGoRates } from '../data/mockData';

export class CostCalculator {
  private travelPlan: TravelPlan;
  private usageProfile: UsageProfile;
  private packages: RoamingPackage[];
  private rates: PayAsYouGoRate[];

  constructor(travelPlan: TravelPlan, usageProfile: UsageProfile) {
    this.travelPlan = travelPlan;
    this.usageProfile = usageProfile;
    this.packages = roamingPackages;
    this.rates = payAsYouGoRates;
  }

  public calculateAll(): SimulationResult {
    const calculations: CostCalculation[] = [];
    const alerts: Alert[] = [];

    // Calculate package costs
    for (const pkg of this.packages) {
      const calculation = this.calculatePackageCost(pkg);
      if (calculation) {
        calculations.push(calculation);
      }
    }

    // Calculate pay-as-you-go cost
    const payAsYouGo = this.calculatePayAsYouGoCost();
    calculations.push(payAsYouGo);

    // Generate alerts
    alerts.push(...this.generateAlerts());

    // Sort by total cost and get recommendations
    calculations.sort((a, b) => a.totalCost - b.totalCost);
    const recommendations = calculations.slice(0, 3);
    const bestOption = calculations[0];

    // Mark best option as recommended
    if (bestOption) {
      bestOption.isRecommended = true;
    }

    return {
      calculations,
      alerts,
      recommendations,
      bestOption
    };
  }

  private calculatePackageCost(pkg: RoamingPackage): CostCalculation | null {
    const warnings: string[] = [];
    const countryCodes = this.travelPlan.countries.map(c => c.code);
    
    // Check if package covers any of the travel countries
    const coveredCountries = countryCodes.filter(code => 
      pkg.countries.includes(code)
    );
    
    if (coveredCountries.length === 0) {
      return null; // Package doesn't cover any destination
    }

    // Calculate total usage
    const totalDataMB = this.usageProfile.dailyData * this.travelPlan.duration;
    const totalVoice = this.usageProfile.dailyVoice * this.travelPlan.duration;
    const totalSms = this.usageProfile.dailySms * this.travelPlan.duration;

    // Check validity
    let validityIssue = false;
    let requiredPackages = 1;
    
    if (pkg.validity < this.travelPlan.duration) {
      validityIssue = true;
      requiredPackages = Math.ceil(this.travelPlan.duration / pkg.validity);
      warnings.push(`Paket geçerliliği (${pkg.validity} gün) seyahat süresinden kısa. ${requiredPackages} paket gerekli.`);
    }

    // Calculate base cost
    const baseCost = pkg.price * requiredPackages;
    
    // Calculate overage
    const packageDataGB = pkg.data * requiredPackages;
    const packageVoice = pkg.voice * requiredPackages;
    const packageSms = pkg.sms * requiredPackages;
    
    let overageCost = 0;
    const breakdown = { data: baseCost * 0.7, voice: baseCost * 0.2, sms: baseCost * 0.1 };

    // Data overage
    if (totalDataMB > packageDataGB * 1024) {
      const overageDataMB = totalDataMB - (packageDataGB * 1024);
      const avgRate = this.getAverageRate(coveredCountries);
      overageCost += overageDataMB * avgRate.dataPerMb;
      warnings.push(`${(overageDataMB / 1024).toFixed(2)}GB data aşımı var.`);
    }

    // Voice overage
    if (totalVoice > packageVoice) {
      const overageVoice = totalVoice - packageVoice;
      const avgRate = this.getAverageRate(coveredCountries);
      overageCost += overageVoice * avgRate.voicePerMin;
      warnings.push(`${overageVoice} dakika arama aşımı var.`);
    }

    // SMS overage
    if (totalSms > packageSms) {
      const overageSms = totalSms - packageSms;
      const avgRate = this.getAverageRate(coveredCountries);
      overageCost += overageSms * avgRate.smsPerUnit;
      warnings.push(`${overageSms} SMS aşımı var.`);
    }

    // Check if all countries are covered
    const uncoveredCountries = countryCodes.filter(code => 
      !pkg.countries.includes(code)
    );
    
    if (uncoveredCountries.length > 0) {
      const uncoveredDays = this.calculateUncoveredDays(uncoveredCountries);
      const uncoveredCost = this.calculateUncoveredCountriesCost(uncoveredCountries, uncoveredDays);
      overageCost += uncoveredCost;
      
      const countryNames = uncoveredCountries.map(code => 
        this.travelPlan.countries.find(c => c.code === code)?.name
      ).join(', ');
      warnings.push(`${countryNames} kapsam dışı. Ek ücret: ${uncoveredCost.toFixed(2)} TL`);
    }

    return {
      packageId: pkg.id,
      packageName: pkg.name,
      totalCost: baseCost + overageCost,
      baseCost,
      overageCost,
      breakdown,
      warnings,
      isRecommended: false,
      validityIssue
    };
  }

  private calculatePayAsYouGoCost(): CostCalculation {
    const countryCodes = this.travelPlan.countries.map(c => c.code);
    const totalDataMB = this.usageProfile.dailyData * this.travelPlan.duration;
    const totalVoice = this.usageProfile.dailyVoice * this.travelPlan.duration;
    const totalSms = this.usageProfile.dailySms * this.travelPlan.duration;

    let totalCost = 0;
    const breakdown = { data: 0, voice: 0, sms: 0 };
    const warnings: string[] = [];

    for (const countryCode of countryCodes) {
      const rate = this.rates.find(r => r.country === countryCode);
      if (!rate) continue;

      const countryDays = this.getCountryDays(countryCode);
      const dailyDataMB = this.usageProfile.dailyData;
      const dailyVoice = this.usageProfile.dailyVoice;
      const dailySms = this.usageProfile.dailySms;

      const dataCost = dailyDataMB * countryDays * rate.dataPerMb;
      const voiceCost = dailyVoice * countryDays * rate.voicePerMin;
      const smsCost = dailySms * countryDays * rate.smsPerUnit;

      breakdown.data += dataCost;
      breakdown.voice += voiceCost;
      breakdown.sms += smsCost;
      totalCost += dataCost + voiceCost + smsCost;
    }

    warnings.push('Paket kullanmadan tekil ücretlerle çok yüksek fatura riski.');

    return {
      packageName: 'Pay-as-you-go (Tekil Ücretler)',
      totalCost,
      baseCost: totalCost,
      overageCost: 0,
      breakdown,
      warnings,
      isRecommended: false
    };
  }

  private getAverageRate(countryCodes: string[]) {
    const rates = countryCodes.map(code => 
      this.rates.find(r => r.country === code)
    ).filter(Boolean) as PayAsYouGoRate[];

    if (rates.length === 0) {
      return { dataPerMb: 0.20, voicePerMin: 3.0, smsPerUnit: 1.0 };
    }

    return {
      dataPerMb: rates.reduce((sum, r) => sum + r.dataPerMb, 0) / rates.length,
      voicePerMin: rates.reduce((sum, r) => sum + r.voicePerMin, 0) / rates.length,
      smsPerUnit: rates.reduce((sum, r) => sum + r.smsPerUnit, 0) / rates.length
    };
  }

  private calculateUncoveredDays(countryCodes: string[]): number {
    // Simplified: assume equal distribution of days
    const totalCountries = this.travelPlan.countries.length;
    const uncoveredRatio = countryCodes.length / totalCountries;
    return Math.ceil(this.travelPlan.duration * uncoveredRatio);
  }

  private calculateUncoveredCountriesCost(countryCodes: string[], days: number): number {
    let totalCost = 0;
    
    for (const countryCode of countryCodes) {
      const rate = this.rates.find(r => r.country === countryCode);
      if (!rate) continue;

      const dailyDataMB = this.usageProfile.dailyData;
      const dailyVoice = this.usageProfile.dailyVoice;
      const dailySms = this.usageProfile.dailySms;

      totalCost += (dailyDataMB * rate.dataPerMb + 
                   dailyVoice * rate.voicePerMin + 
                   dailySms * rate.smsPerUnit) * days;
    }

    return totalCost;
  }

  private getCountryDays(countryCode: string): number {
    // Simplified: assume equal distribution
    return Math.ceil(this.travelPlan.duration / this.travelPlan.countries.length);
  }

  private generateAlerts(): Alert[] {
    const alerts: Alert[] = [];
    
    if (this.travelPlan.duration > 30) {
      alerts.push({
        type: 'warning',
        title: 'Uzun Seyahat',
        message: 'Seyahatiniz 30 günden uzun. Aylık paketleri değerlendirin.',
        action: 'Aylık paketleri gör'
      });
    }

    if (this.usageProfile.dailyData > 1000) {
      alerts.push({
        type: 'info',
        title: 'Yoğun Kullanım',
        message: 'Günlük 1GB+ kullanım planladınız. Yüksek kotali paketler önerilir.',
        action: 'Büyük paketleri gör'
      });
    }

    if (this.travelPlan.countries.length > 1) {
      alerts.push({
        type: 'info',
        title: 'Çoklu Ülke',
        message: 'Birden fazla ülke ziyaret ediyorsunuz. Bölgesel paketler daha ekonomik olabilir.',
        action: 'Bölgesel paketleri gör'
      });
    }

    return alerts;
  }
}