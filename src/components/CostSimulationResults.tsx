import React from 'react';
import { SimulationResult } from '../types';
import { PackageCard } from './PackageCard';
import { AlertsPanel } from './AlertsPanel';

interface CostSimulationResultsProps {
  simulationResult: SimulationResult;
  onPackageSelect: (packageId?: string) => void;
}

export const CostSimulationResults: React.FC<CostSimulationResultsProps> = ({
  simulationResult,
  onPackageSelect
}) => {
  const { calculations, alerts, recommendations, bestOption } = simulationResult;

  if (calculations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {alerts.length > 0 && (
        <AlertsPanel alerts={alerts} />
      )}

      {/* Best Recommendation */}
      <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-xl">🏆</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-900">En İyi Seçenek</h3>
            <p className="text-sm text-green-700">Maliyet analizi sonucu önerilen paket</p>
          </div>
        </div>

        <PackageCard
          calculation={bestOption}
          onSelect={() => onPackageSelect(bestOption.packageId)}
          isRecommended={true}
          showDetails={true}
        />
      </div>

      {/* Top 3 Recommendations */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
            <span className="text-xl">📋</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Önerilen Seçenekler</h3>
            <p className="text-sm text-gray-600">Maliyet sıralamasına göre en iyi 3 alternatif</p>
          </div>
        </div>

        <div className="space-y-4">
          {recommendations.map((calc, index) => (
            <div key={calc.packageId || 'payg'} className="relative">
              {index === 0 && (
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-black z-10">
                  1
                </div>
              )}
              {index === 1 && (
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-xs font-bold text-white z-10">
                  2
                </div>
              )}
              {index === 2 && (
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center text-xs font-bold text-white z-10">
                  3
                </div>
              )}
              
              <PackageCard
                calculation={calc}
                onSelect={() => onPackageSelect(calc.packageId)}
                showDetails={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* All Options */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center">
            <span className="text-xl">📊</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Tüm Seçenekler</h3>
            <p className="text-sm text-gray-600">Detaylı maliyet karşılaştırması</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Paket</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Temel Maliyet</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Aşım/Ek</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Toplam</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {calculations.map((calc) => (
                <tr
                  key={calc.packageId || 'payg'}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    calc.isRecommended ? 'bg-green-50' : ''
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{calc.packageName}</div>
                    {calc.warnings.length > 0 && (
                      <div className="text-xs text-orange-600 mt-1">
                        {calc.warnings[0]}
                      </div>
                    )}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-900">
                    {calc.baseCost.toFixed(2)} TL
                  </td>
                  <td className="text-right py-3 px-4">
                    <span className={calc.overageCost > 0 ? 'text-red-600' : 'text-gray-500'}>
                      +{calc.overageCost.toFixed(2)} TL
                    </span>
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-900">
                    {calc.totalCost.toFixed(2)} TL
                  </td>
                  <td className="text-center py-3 px-4">
                    <button
                      onClick={() => onPackageSelect(calc.packageId)}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                        ${calc.isRecommended
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-yellow-400 text-black hover:bg-yellow-500'
                        }
                      `}
                    >
                      {calc.isRecommended ? 'Önerilen' : 'Seç'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};