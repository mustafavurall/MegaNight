import React, { useState, useEffect } from 'react';
import { User, TravelPlan, UsageProfile, SimulationResult } from './types';
import { UserSelection } from './components/UserSelection';
import { TravelPlanForm } from './components/TravelPlanForm';
import { UsageProfileForm } from './components/UsageProfileForm';
import { CostSimulationResults } from './components/CostSimulationResults';
import { TopUpCalculator } from './components/TopUpCalculator';
import { ProcessFlow } from './components/ProcessFlow';
import { CostCalculator } from './utils/costCalculator';
import { countries, defaultUsageProfiles } from './data/mockData';

function App() {
  // Main application state
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [usageProfile, setUsageProfile] = useState<UsageProfile>(defaultUsageProfiles.medium);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [selectedPackageId, setSelectedPackageId] = useState<string | undefined>();
  const [showProcessFlow, setShowProcessFlow] = useState(false);

  // Calculate simulation whenever inputs change
  useEffect(() => {
    if (selectedUser && travelPlan && usageProfile) {
      const calculator = new CostCalculator(travelPlan, usageProfile);
      const result = calculator.calculateAll();
      setSimulationResult(result);
    }
  }, [selectedUser, travelPlan, usageProfile]);

  // Handle package selection
  const handlePackageSelect = async (packageId?: string) => {
    setSelectedPackageId(packageId);
    setShowProcessFlow(true);
  };

  // Handle process flow completion
  const handleProcessComplete = () => {
    setShowProcessFlow(false);
    setSelectedPackageId(undefined);
  };

  // Handle top-up calculation
  const handleTopUpCalculate = (newSimulation: SimulationResult) => {
    setSimulationResult(newSimulation);
  };

  const isReadyForSimulation = selectedUser && travelPlan && travelPlan.countries.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-yellow-400 font-bold text-sm">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-black">Turkcell Roaming Asistanı</h1>
                <p className="text-sm text-gray-800">Akıllı roaming çözümü</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-800">
                <span>📞</span>
                <span>444 0 532</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <span>🌐</span>
                <span>turkcell.com.tr</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Seyahatiniz İçin En Ekonomik Çözümü Bulun
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Seyahat planınıza göre en uygun roaming paketini öneren akıllı asistanımız ile 
            beklenmedik faturalara karşı korunun. Adım adım ilerleyerek size özel çözümü keşfedin.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            {/* Step 1 */}
            <div className={`flex items-center ${selectedUser ? 'text-green-600' : 'text-yellow-600'}`}>
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white
                ${selectedUser ? 'bg-green-500' : 'bg-yellow-400'}
              `}>
                {selectedUser ? '✓' : '1'}
              </div>
              <span className="ml-2 font-medium">Kullanıcı</span>
            </div>

            <div className="w-8 h-0.5 bg-gray-300"></div>

            {/* Step 2 */}
            <div className={`flex items-center ${travelPlan ? 'text-green-600' : selectedUser ? 'text-yellow-600' : 'text-gray-400'}`}>
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white
                ${travelPlan ? 'bg-green-500' : selectedUser ? 'bg-yellow-400' : 'bg-gray-300'}
              `}>
                {travelPlan ? '✓' : '2'}
              </div>
              <span className="ml-2 font-medium">Seyahat</span>
            </div>

            <div className="w-8 h-0.5 bg-gray-300"></div>

            {/* Step 3 */}
            <div className={`flex items-center ${simulationResult ? 'text-green-600' : isReadyForSimulation ? 'text-yellow-600' : 'text-gray-400'}`}>
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white
                ${simulationResult ? 'bg-green-500' : isReadyForSimulation ? 'bg-yellow-400' : 'bg-gray-300'}
              `}>
                {simulationResult ? '✓' : '3'}
              </div>
              <span className="ml-2 font-medium">Sonuç</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          
          {/* Step 1: User Selection */}
          <UserSelection
            selectedUser={selectedUser}
            onUserSelect={setSelectedUser}
          />

          {/* Step 2: Travel Plan - Only show if user is selected */}
          {selectedUser && (
            <TravelPlanForm
              travelPlan={travelPlan}
              onTravelPlanChange={setTravelPlan}
              countries={countries}
            />
          )}

          {/* Step 3: Usage Profile - Only show if travel plan is set */}
          {selectedUser && travelPlan && (
            <UsageProfileForm
              usageProfile={usageProfile}
              onUsageProfileChange={setUsageProfile}
            />
          )}

          {/* Step 4: Simulation Results */}
          {simulationResult && isReadyForSimulation && (
            <>
              <CostSimulationResults
                simulationResult={simulationResult}
                onPackageSelect={handlePackageSelect}
              />

              {/* Top-up Calculator */}
              <TopUpCalculator
                travelPlan={travelPlan}
                usageProfile={usageProfile}
                onCalculate={(newUsageProfile) => {
                  const calculator = new CostCalculator(travelPlan, newUsageProfile);
                  const newSimulation = calculator.calculateAll();
                  handleTopUpCalculate(newSimulation);
                }}
              />
            </>
          )}

          {/* Loading State */}
          {isReadyForSimulation && !simulationResult && (
            <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-100 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hesaplama Yapılıyor</h3>
              <p className="text-gray-600">En uygun paketler belirleniyor...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-gray-200 pt-12 pb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center">
                <span className="text-black font-bold text-xs">T</span>
              </div>
              <span className="font-bold text-gray-900">Turkcell</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Güçlü altyapımız ve deneyimli ekibimizle her zaman yanınızdayız.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-yellow-600 transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-yellow-600 transition-colors">Kullanım Koşulları</a>
              <a href="#" className="hover:text-yellow-600 transition-colors">Destek</a>
            </div>
          </div>
        </footer>
      </main>

      {/* Process Flow Modal */}
      {showProcessFlow && (
        <ProcessFlow
          selectedPackageId={selectedPackageId}
          onProcessComplete={handleProcessComplete}
        />
      )}
    </div>
  );
}

export default App;