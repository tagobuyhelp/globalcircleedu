import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, Globe2, Building2, BookOpen, 
  Users, DollarSign, ArrowRight, ChevronRight 
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { countries } from '../../../data/studyDestinations';

export const StudyDestinationsSection = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Study Destinations
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our diverse range of study destinations across Europe
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Mobile Menu Button */}
          <div className="col-span-12 lg:hidden">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-full flex justify-between items-center"
            >
              <span>Select Country</span>
              <ChevronRight className={`w-5 h-5 transition-transform ${isMenuOpen ? 'rotate-90' : ''}`} />
            </Button>
          </div>

          {/* Mobile Country List */}
          <div className={`col-span-12 lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 space-y-2">
              {countries.map((country) => (
                <button
                  key={country.name}
                  onClick={() => {
                    setSelectedCountry(country);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                    selectedCountry.name === country.name
                      ? 'bg-[#004e9a] text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{country.name}</span>
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      selectedCountry.name === country.name ? 'translate-x-1' : ''
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Country List */}
          <div className="hidden lg:block lg:col-span-4 space-y-2">
            {countries.map((country) => (
              <button
                key={country.name}
                onClick={() => setSelectedCountry(country)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                  selectedCountry.name === country.name
                    ? 'bg-[#004e9a] text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{country.name}</span>
                  <ChevronRight className={`w-5 h-5 transition-transform ${
                    selectedCountry.name === country.name ? 'translate-x-1' : ''
                  }`} />
                </div>
              </button>
            ))}
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedCountry.image}
                  alt={selectedCountry.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Study in {selectedCountry.name}
                    </h3>
                    <p className="text-white/90">
                      {selectedCountry.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Building2 className="w-6 h-6 mx-auto mb-2 text-[#004e9a]" />
                    <div className="font-bold">{selectedCountry.stats.universities}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Universities</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Users className="w-6 h-6 mx-auto mb-2 text-[#004e9a]" />
                    <div className="font-bold">{selectedCountry.stats.students}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Students</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <BookOpen className="w-6 h-6 mx-auto mb-2 text-[#004e9a]" />
                    <div className="font-bold">{selectedCountry.stats.programs}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Programs</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Key Features:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCountry.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-[#004e9a]/10 flex items-center justify-center">
                          <GraduationCap className="w-4 h-4 text-[#004e9a]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="flex-1 bg-[#004e9a] hover:bg-[#003d7a]"
                    onClick={() => window.location.href = '/register'}
                  >
                    Start Application
                  </Button>
                  <Link 
                    to={`/study/${selectedCountry.name.toLowerCase()}`} 
                    className="flex-1"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full border-[#004e9a] text-[#004e9a] hover:bg-[#004e9a]/5"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};