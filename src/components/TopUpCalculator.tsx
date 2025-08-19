import React, { useState } from 'react';
import { TravelPlan, UsageProfile } from '../types';

interface TopUpCalculatorProps {
  travelPlan: TravelPlan;
  usageProfile: UsageProfile;
  onCalculate: (newUsageProfile: UsageProfile) => void;
}

export const TopUpCalculator: React.FC<TopUpCalculatorProps> = ({
  travelPlan,
  usageProfile,
  onCalculate
}) => {
  const [topUpData, setTopUpData] = useState(0);
  const [topUpVoice, setTopUpVoice] = useState(0);
  const [topUpSms, setTopUpSms] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleCalculateWithTopUp = () => {
    // Create a new usage profile with added top-up
    const newUsageProfile: UsageProfile = {
      ...usageProfile,
      dailyData: usageProfile.dailyData + (topUpData / travelPlan.duration),
      dailyVoice: usageProfile.dailyVoice + (topUpVoice / travelPlan.duration),
      dailySms: usageProfile.dailySms + (topUpSms / travelPlan.duration),
      profileType: 'custom'
    };

    onCalculate(newUsageProfile);
    setIsVisible(false);
  };

  const handleReset = () => {
    setTopUpData(0);
    setTopUpVoice(0);
    setTopUpSms(0);
  };

  if (!isVisible) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-400 rounded-lg flex items-center justify-center">
              <span className="text-xl">➕</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top-up Hesaplama</h3>
              <p className="text-sm text-gray-600">Ek kullanım ihtiyacınızı hesaplayın</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsVisible(true)}
            className="px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors"
          >
            Top-up Ekle
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-400 rounded-lg flex items-center justify-center">
          <span className="text-xl">➕</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Top-up Hesaplama</h3>
          <p className="text-sm text-gray-600">Ek ihtiyaçlarınızı belirleyin ve yeniden hesaplayın</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📡 Ek Data (MB) - Toplam
          </label>
          <input
            type="number"
            value={topUpData}
            onChange={(e) => setTopUpData(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
            min="0"
            step="100"
            placeholder="Örn: 500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Günlük: +{(topUpData / travelPlan.duration).toFixed(0)}MB
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📞 Ek Arama (dk) - Toplam
          </label>
          <input
            type="number"
            value={topUpVoice}
            onChange={(e) => setTopUpVoice(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
            min="0"
            step="10"
            placeholder="Örn: 60"
          />
          <p className="text-xs text-gray-500 mt-1">
            Günlük: +{(topUpVoice / travelPlan.duration).toFixed(0)}dk
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            💬 Ek SMS - Toplam
          </label>
          <input
            type="number"
            value={topUpSms}
            onChange={(e) => setTopUpSms(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
            min="0"
            step="5"
            placeholder="Örn: 20"
          />
          <p className="text-xs text-gray-500 mt-1">
            Günlük: +{(topUpSms / travelPlan.duration).toFixed(0)}
          </p>
        </div>
      </div>

      {/* Current vs New Usage Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h5 className="font-medium text-gray-900 mb-3">Kullanım Karşılaştırması</h5>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h6 className="text-sm font-medium text-gray-700 mb-2">Mevcut</h6>
            <div className="space-y-1 text-sm">
              <div>📡 {(usageProfile.dailyData * travelPlan.duration / 1024).toFixed(1)} GB</div>
              <div>📞 {usageProfile.dailyVoice * travelPlan.duration} dk</div>
              <div>💬 {usageProfile.dailySms * travelPlan.duration} SMS</div>
            </div>
          </div>
          <div>
            <h6 className="text-sm font-medium text-gray-700 mb-2">Top-up Sonrası</h6>
            <div className="space-y-1 text-sm">
              <div>📡 {((usageProfile.dailyData * travelPlan.duration + topUpData) / 1024).toFixed(1)} GB</div>
              <div>📞 {usageProfile.dailyVoice * travelPlan.duration + topUpVoice} dk</div>
              <div>💬 {usageProfile.dailySms * travelPlan.duration + topUpSms} SMS</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setIsVisible(false)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          İptal
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Temizle
        </button>
        <button
          onClick={handleCalculateWithTopUp}
          className="flex-1 px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors font-medium"
        >
          Yeniden Hesapla
        </button>
      </div>
    </div>
  );
};