import React, { useState } from 'react';
import { TravelPlan, Country } from '../types';

interface TravelPlanFormProps {
  travelPlan: TravelPlan | null;
  onTravelPlanChange: (plan: TravelPlan) => void;
  countries: Country[];
}

export const TravelPlanForm: React.FC<TravelPlanFormProps> = ({
  travelPlan,
  onTravelPlanChange,
  countries
}) => {
  const [selectedCountries, setSelectedCountries] = useState<Country[]>(
    travelPlan?.countries || []
  );
  const [startDate, setStartDate] = useState(travelPlan?.startDate || '');
  const [endDate, setEndDate] = useState(travelPlan?.endDate || '');

  const calculateDuration = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end dates
  };

  const handleCountryToggle = (country: Country) => {
    const isSelected = selectedCountries.some(c => c.code === country.code);
    let newCountries;
    
    if (isSelected) {
      newCountries = selectedCountries.filter(c => c.code !== country.code);
    } else {
      newCountries = [...selectedCountries, country];
    }
    
    setSelectedCountries(newCountries);
    updateTravelPlan(newCountries, startDate, endDate);
  };

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    updateTravelPlan(selectedCountries, start, end);
  };

  const updateTravelPlan = (countries: Country[], start: string, end: string) => {
    if (countries.length > 0 && start && end) {
      const duration = calculateDuration(start, end);
      onTravelPlanChange({
        countries,
        startDate: start,
        endDate: end,
        duration
      });
    }
  };

  const groupedCountries = countries.reduce((acc, country) => {
    if (!acc[country.region]) {
      acc[country.region] = [];
    }
    acc[country.region].push(country);
    return acc;
  }, {} as { [region: string]: Country[] });

  const duration = calculateDuration(startDate, endDate);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
          <span className="text-xl">✈️</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Seyahat Planı</h3>
          <p className="text-sm text-gray-600">Gideceğiniz ülkeleri ve tarihleri belirleyin</p>
        </div>
      </div>

      {/* Date Selection */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Seyahat Tarihleri</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Başlangıç Tarihi
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleDateChange(e.target.value, endDate)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bitiş Tarihi
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleDateChange(startDate, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              min={startDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
        
        {duration > 0 && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-medium text-yellow-800">
              Seyahat Süresi: {duration} gün
            </p>
          </div>
        )}
      </div>

      {/* Country Selection */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Ülke Seçimi (Çoklu)</h4>
        
        {selectedCountries.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-800 mb-2">
              Seçilen Ülkeler ({selectedCountries.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedCountries.map(country => (
                <span
                  key={country.code}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                >
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                  <button
                    onClick={() => handleCountryToggle(country)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {Object.entries(groupedCountries).map(([region, regionCountries]) => (
            <div key={region}>
              <h5 className="text-sm font-semibold text-gray-700 mb-2">{region}</h5>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {regionCountries.map(country => {
                  const isSelected = selectedCountries.some(c => c.code === country.code);
                  return (
                    <button
                      key={country.code}
                      onClick={() => handleCountryToggle(country)}
                      className={`
                        p-3 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md
                        ${isSelected
                          ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-400/20'
                          : 'border-gray-200 hover:border-yellow-300'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{country.flag}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {country.name}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};