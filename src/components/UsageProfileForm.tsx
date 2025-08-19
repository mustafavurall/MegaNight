import React from 'react';
import { UsageProfile } from '../types';
import { defaultUsageProfiles } from '../data/mockData';

interface UsageProfileFormProps {
  usageProfile: UsageProfile;
  onUsageProfileChange: (profile: UsageProfile) => void;
}

export const UsageProfileForm: React.FC<UsageProfileFormProps> = ({
  usageProfile,
  onUsageProfileChange
}) => {
  const handleProfileTypeChange = (profileType: 'light' | 'medium' | 'heavy' | 'custom') => {
    if (profileType === 'custom') {
      onUsageProfileChange({
        ...usageProfile,
        profileType: 'custom'
      });
    } else {
      const defaultProfile = defaultUsageProfiles[profileType];
      onUsageProfileChange(defaultProfile);
    }
  };

  const handleCustomChange = (field: 'dailyData' | 'dailyVoice' | 'dailySms', value: number) => {
    onUsageProfileChange({
      ...usageProfile,
      [field]: value,
      profileType: 'custom'
    });
  };

  const profileDescriptions = {
    light: 'Temel kullanım - sosyal medya, mesajlaşma',
    medium: 'Orta kullanım - web gezinme, haritalar, fotoğraf paylaşımı',
    heavy: 'Yoğun kullanım - video izleme, dosya indirme, sürekli online'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
          <span className="text-xl">📊</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Kullanım Profili</h3>
          <p className="text-sm text-gray-600">Günlük kullanım tahmininizi belirleyin</p>
        </div>
      </div>

      {/* Preset Profiles */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Hazır Profiller</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(['light', 'medium', 'heavy'] as const).map((type) => {
            const profile = defaultUsageProfiles[type];
            const isSelected = usageProfile.profileType === type && 
                               usageProfile.dailyData === profile.dailyData &&
                               usageProfile.dailyVoice === profile.dailyVoice &&
                               usageProfile.dailySms === profile.dailySms;

            return (
              <button
                key={type}
                onClick={() => handleProfileTypeChange(type)}
                className={`
                  p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md
                  ${isSelected
                    ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-400/20'
                    : 'border-gray-200 hover:border-yellow-300'
                  }
                `}
              >
                <div className="text-sm font-semibold text-gray-900 capitalize mb-2">
                  {type === 'light' && '💡 Hafif'}
                  {type === 'medium' && '⚖️ Orta'}
                  {type === 'heavy' && '🔥 Yoğun'}
                </div>
                <div className="text-xs text-gray-600 mb-3">
                  {profileDescriptions[type]}
                </div>
                <div className="space-y-1 text-xs">
                  <div>📡 {profile.dailyData}MB/gün</div>
                  <div>📞 {profile.dailyVoice}dk/gün</div>
                  <div>💬 {profile.dailySms}SMS/gün</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Profile */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center gap-3 mb-4">
          <h4 className="font-medium text-gray-900">Özel Profil</h4>
          <button
            onClick={() => handleProfileTypeChange('custom')}
            className={`
              px-3 py-1 text-xs rounded-full transition-all duration-200
              ${usageProfile.profileType === 'custom'
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-200 text-gray-700 hover:bg-yellow-300'
              }
            `}
          >
            Özelleştir
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📡 Günlük Data (MB)
            </label>
            <input
              type="number"
              value={usageProfile.dailyData}
              onChange={(e) => handleCustomChange('dailyData', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              min="0"
              step="50"
            />
            <p className="text-xs text-gray-500 mt-1">
              {(usageProfile.dailyData / 1024).toFixed(2)} GB
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📞 Günlük Arama (dk)
            </label>
            <input
              type="number"
              value={usageProfile.dailyVoice}
              onChange={(e) => handleCustomChange('dailyVoice', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              min="0"
              step="5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              💬 Günlük SMS
            </label>
            <input
              type="number"
              value={usageProfile.dailySms}
              onChange={(e) => handleCustomChange('dailySms', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              min="0"
              step="1"
            />
          </div>
        </div>

        {/* Usage Summary */}
        {usageProfile.profileType === 'custom' && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">Toplam Kullanım Tahmini</h5>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  {((usageProfile.dailyData / 1024) * (7)).toFixed(1)} GB
                </div>
                <div className="text-gray-600">Haftalık Data</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  {usageProfile.dailyVoice * 7} dk
                </div>
                <div className="text-gray-600">Haftalık Arama</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  {usageProfile.dailySms * 7}
                </div>
                <div className="text-gray-600">Haftalık SMS</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};