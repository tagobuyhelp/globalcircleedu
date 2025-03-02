import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, Globe2, Building2, BookOpen, 
  Users, DollarSign, ArrowRight, ChevronRight 
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { countries } from '../../../data/studyDestinations';
import { JourneyPopup } from '../JourneyPopup';

export const StudyDestinationsSection = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showJourneyPopup, setShowJourneyPopup] = useState(false);

  // Group countries by region
  const regions = {
    'Western Europe': ['France', 'Spain', 'Portugal', 'Ireland', 'Italy', 'Norway'],
    'Central Europe': ['Czech Republic', 'Poland', 'Slovenia', 'Slovakia', 'Bosnia and Herzegovina'],
    'Northern Europe': ['Sweden', 'Denmark', 'Latvia', 'Lithuania', 'Estonia'],
    'Southern Europe': ['Greece', 'Croatia', 'Malta', 'Cyprus'],
    'Eastern Europe': ['Belarus', 'Georgia'],
    'Other Regions': ['Australia', 'United Arab Emirates']
  };

  const handleStartApplication = () => {
    setShowJourneyPopup(true);
  };

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Study Destinations
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our diverse range of study destinations across the globe
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* Mobile Horizontal Scroll Menu */}
          <div className="col-span-12 lg:hidden">
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
              <div className="flex space-x-2 pb-4">
                {countries.map((country) => (
                  <button
                    key={country.name}
                    onClick={() => setSelectedCountry(country)}
                    className={`flex items-center whitespace-nowrap px-3 py-2 rounded-full transition-all ${
                      selectedCountry.name === country.name
                        ? 'bg-[#004e9a] text-white'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-sm font-medium">{country.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Country List */}
          <div className="hidden lg:block lg:col-span-4 space-y-2 pr-4 border-r dark:border-gray-700 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {Object.entries(regions).map(([region, countryList]) => (
              <div key={region} className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                  {region}
                </h3>
                {countryList.map((countryName) => {
                  const country = countries.find(c => c.name === countryName);
                  if (!country) return null;
                  
                  return (
                    <button
                      key={country.name}
                      onClick={() => setSelectedCountry(country)}
                      className={`w-full text-left p-3 sm:p-4 rounded-lg transition-all duration-300 ${
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
                  );
                })}
              </div>
            ))}
          </div>

          {/* Country Details */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <img
                  src={selectedCountry.image}
                  alt={selectedCountry.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      Study in {selectedCountry.name}
                    </h3>
                    <p className="text-sm sm:text-base text-white/90 line-clamp-2">
                      {selectedCountry.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                  <div className="text-center p-2 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-[#004e9a]" />
                    <div className="text-sm sm:text-base font-bold">{selectedCountry.stats.universities}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Universities</div>
                  </div>
                  <div className="text-center p-2 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-[#004e9a]" />
                    <div className="text-sm sm:text-base font-bold">{selectedCountry.stats.students}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Students</div>
                  </div>
                  <div className="text-center p-2 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-[#004e9a]" />
                    <div className="text-sm sm:text-base font-bold">{selectedCountry.stats.programs}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Programs</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-base sm:text-lg">Key Features:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedCountry.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-[#004e9a]/10 flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-4 h-4 text-[#004e9a]" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="w-full sm:flex-1 bg-[#004e9a] hover:bg-[#003d7a] group"
                    onClick={handleStartApplication}
                  >
                    Start Application
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Link 
                    to={`/study/${selectedCountry.name.toLowerCase()}`} 
                    className="w-full sm:flex-1"
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

      {/* Journey Popup */}
      {showJourneyPopup && (
        <JourneyPopup onClose={() => setShowJourneyPopup(false)} />
      )}
    </section>
  );
};