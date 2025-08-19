import React from 'react';
import { CostCalculation } from '../types';

interface PackageCardProps {
  calculation: CostCalculation;
  onSelect: () => void;
  isRecommended?: boolean;
  showDetails?: boolean;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  calculation,
  onSelect,
  isRecommended = false,
  showDetails = false
}) => {
  const { packageName, totalCost, baseCost, overageCost, breakdown, warnings } = calculation;

  return (
    <div className={`
      rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg
      ${isRecommended 
        ? 'border-green-400 bg-green-50 shadow-md' 
        : 'border-gray-200 bg-white hover:border-yellow-300'
      }
    `}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            {packageName}
            {isRecommended && (
              <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                ÖNERİLEN
              </span>
            )}
          </h4>
          
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {totalCost.toFixed(2)} TL
          </div>
          
          {overageCost > 0 && (
            <div className="text-sm text-gray-600">
              Temel: {baseCost.toFixed(2)} TL + Ek: {overageCost.toFixed(2)} TL
            </div>
          )}
        </div>

        <button
          onClick={onSelect}
          className={`
            px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ml-4
            ${isRecommended
              ? 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
              : 'bg-yellow-400 text-black hover:bg-yellow-500 hover:shadow-md'
            }
          `}
        >
          {isRecommended ? 'Bu Paketi Seç' : 'Seç'}
        </button>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="mb-4">
          {warnings.map((warning, index) => (
            <div key={index} className="flex items-start gap-2 mb-2">
              <span className="text-orange-500 mt-0.5">⚠️</span>
              <span className="text-sm text-orange-700">{warning}</span>
            </div>
          ))}
        </div>
      )}

      {/* Cost Breakdown */}
      {showDetails && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h5 className="font-medium text-gray-900 mb-3">Maliyet Dağılımı</h5>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">📡 Data</span>
              <span className="font-medium">{breakdown.data.toFixed(2)} TL</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">📞 Arama</span>
              <span className="font-medium">{breakdown.voice.toFixed(2)} TL</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">💬 SMS</span>
              <span className="font-medium">{breakdown.sms.toFixed(2)} TL</span>
            </div>
          </div>

          {/* Visual breakdown */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="flex h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-500" 
                  style={{ width: `${(breakdown.data / totalCost) * 100}%` }}
                />
                <div 
                  className="bg-green-500" 
                  style={{ width: `${(breakdown.voice / totalCost) * 100}%` }}
                />
                <div 
                  className="bg-purple-500" 
                  style={{ width: `${(breakdown.sms / totalCost) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Data</span>
              <span>Arama</span>
              <span>SMS</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};