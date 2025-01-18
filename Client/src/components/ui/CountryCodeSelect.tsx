import React, { useState, useRef, useEffect } from 'react';
import { Search, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Country {
  name: string;
  code: string;
  dialCode: string;
}

const countries: Country[] = [
  { name: 'United States', code: 'US', dialCode: '+1' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44' },
  { name: 'India', code: 'IN', dialCode: '+91' },
  { name: 'United Arab Emirates', code: 'AE', dialCode: '+971' },
  { name: 'Canada', code: 'CA', dialCode: '+1' },
  { name: 'Australia', code: 'AU', dialCode: '+61' },
  { name: 'Germany', code: 'DE', dialCode: '+49' },
  { name: 'France', code: 'FR', dialCode: '+33' },
  { name: 'Italy', code: 'IT', dialCode: '+39' },
  { name: 'Spain', code: 'ES', dialCode: '+34' },
  { name: 'Japan', code: 'JP', dialCode: '+81' },
  { name: 'China', code: 'CN', dialCode: '+86' },
  { name: 'Singapore', code: 'SG', dialCode: '+65' },
  { name: 'Malaysia', code: 'MY', dialCode: '+60' },
  { name: 'New Zealand', code: 'NZ', dialCode: '+64' },
];

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({
  value,
  onChange,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedCountry = countries.find(country => country.dialCode === value) || countries[0];

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm)
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between w-full px-3 py-2 text-left border rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "hover:bg-gray-50 dark:hover:bg-gray-700",
          "transition-colors duration-150",
          error ? "border-red-500" : "border-gray-300 dark:border-gray-600",
          "dark:bg-gray-700"
        )}
      >
        <span className="font-medium">{selectedCountry.dialCode}</span>
        <span className="text-xs text-gray-500">{selectedCountry.code}</span>
      </button>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {isOpen && (
        <div className="absolute z-50 w-64 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onChange(country.dialCode);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-4 py-2 text-left flex items-center justify-between",
                  "hover:bg-gray-100 dark:hover:bg-gray-700",
                  "focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700",
                  value === country.dialCode && "bg-blue-50 dark:bg-blue-900/50"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium">{country.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">{country.dialCode}</span>
                  {value === country.dialCode && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};