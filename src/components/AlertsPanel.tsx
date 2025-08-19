import React from 'react';
import { Alert } from '../types';

interface AlertsPanelProps {
  alerts: Alert[];
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getAlertStyles = (type: Alert['type']) => {
    switch (type) {
      case 'warning': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getButtonStyles = (type: Alert['type']) => {
    switch (type) {
      case 'warning': return 'bg-orange-100 hover:bg-orange-200 text-orange-800';
      case 'error': return 'bg-red-100 hover:bg-red-200 text-red-800';
      case 'info': return 'bg-blue-100 hover:bg-blue-200 text-blue-800';
      default: return 'bg-gray-100 hover:bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-red-400 rounded-lg flex items-center justify-center">
          <span className="text-xl">🚨</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Önemli Uyarılar</h3>
          <p className="text-sm text-gray-600">Seyahatinizle ilgili dikkat edilmesi gereken noktalar</p>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`border-2 rounded-lg p-4 ${getAlertStyles(alert.type)}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">
                {getAlertIcon(alert.type)}
              </span>
              
              <div className="flex-1">
                <h4 className="font-medium mb-1">{alert.title}</h4>
                <p className="text-sm opacity-90">{alert.message}</p>
                
                {alert.action && (
                  <button className={`
                    mt-3 px-3 py-1 rounded-md text-sm font-medium transition-colors
                    ${getButtonStyles(alert.type)}
                  `}>
                    {alert.action}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-2">💡 Seyahat İpuçları</h5>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• WiFi kullanımını önceliklendirerek data tasarrufu yapın</li>
          <li>• Haritaları offline indirerek data kullanımını azaltın</li>
          <li>• Paket geçerliliği bitmeden yenilemeyi unutmayın</li>
          <li>• Ülke değiştirirken paket kapsamını kontrol edin</li>
        </ul>
      </div>
    </div>
  );
};