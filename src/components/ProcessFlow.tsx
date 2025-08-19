import React, { useState } from 'react';

interface ProcessFlowProps {
  selectedPackageId?: string;
  onProcessComplete: () => void;
}

export const ProcessFlow: React.FC<ProcessFlowProps> = ({
  selectedPackageId,
  onProcessComplete
}) => {
  const [currentStep, setCurrentStep] = useState<'confirmation' | 'processing' | 'success'>('confirmation');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setCurrentStep('processing');
    setIsProcessing(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setCurrentStep('success');
    setIsProcessing(false);
    
    // Auto close after success
    setTimeout(() => {
      onProcessComplete();
    }, 3000);
  };

  if (!selectedPackageId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-300">
        
        {/* Confirmation Step */}
        {currentStep === 'confirmation' && (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Paket Aktivasyonu</h3>
              <p className="text-gray-600">Seçtiğiniz paketi aktif etmek istediğinizi onaylayın</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-sm font-medium text-gray-900 mb-2">Seçilen Paket:</div>
              <div className="text-lg font-semibold text-yellow-600">
                {selectedPackageId === 'payg' ? 'Pay-as-you-go' : selectedPackageId}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onProcessComplete}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 px-4 bg-yellow-400 rounded-lg font-medium text-black hover:bg-yellow-500 transition-colors"
              >
                Onayla
              </button>
            </div>
          </>
        )}

        {/* Processing Step */}
        {currentStep === 'processing' && (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">İşlem Yapılıyor</h3>
              <p className="text-gray-600">Paketiniz aktif ediliyor, lütfen bekleyin...</p>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-yellow-400 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm text-gray-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400"></div>
                Sistem ile bağlantı kuruluyor...
              </div>
            </div>
          </>
        )}

        {/* Success Step */}
        {currentStep === 'success' && (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Başarılı!</h3>
              <p className="text-gray-600">Paketiniz başarıyla aktif edildi</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-green-600">✅</span>
                <div className="text-sm">
                  <div className="font-medium text-green-900">Aktivasyon Tamamlandı</div>
                  <div className="text-green-700">Paketiniz artık kulıma hazır</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Aktivasyon Zamanı:</span>
                <span className="font-medium">{new Date().toLocaleString('tr-TR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Durum:</span>
                <span className="font-medium text-green-600">Aktif</span>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500">
              Bu pencere otomatik olarak kapanacak...
            </div>
          </>
        )}
      </div>
    </div>
  );
};