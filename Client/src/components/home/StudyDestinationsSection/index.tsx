import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Building2, MapPin, Calendar, Globe2, 
  CheckCircle, Plus, Mail, Phone, User, BookOpen
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { countries } from '../../../data/studyDestinations';
import { CountryCodeSelect } from '../../ui/CountryCodeSelect';
import toast from 'react-hot-toast';

// Define regions and their countries
const regions = {
  'Western Europe': ['France', 'Spain', 'Portugal', 'Ireland', 'Italy', 'Norway'],
  'Central Europe': ['Czech Republic', 'Poland', 'Slovenia', 'Slovakia', 'Bosnia and Herzegovina'],
  'Northern Europe': ['Sweden', 'Denmark', 'Latvia', 'Lithuania', 'Estonia'],
  'Southern Europe': ['Greece', 'Croatia', 'Malta', 'Cyprus'],
  'Eastern Europe': ['Belarus', 'Georgia'],
  'Other Regions': ['Australia', 'United Arab Emirates']
};

export const StudyDestinationsSection = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showJourneyModal, setShowJourneyModal] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+971',
    program: ''
  });

  // Auto-change country every 5 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        const currentIndex = countries.findIndex(c => c.name === selectedCountry.name);
        const nextIndex = (currentIndex + 1) % countries.length;
        setSelectedCountry(countries[nextIndex]);
      }, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [selectedCountry, isAutoPlaying]);

  // Pause auto-play when user interacts
  const handleCountrySelect = (country: typeof countries[0]) => {
    setIsAutoPlaying(false);
    setSelectedCountry(country);
  };

  // Resume auto-play after 30 seconds of inactivity
  useEffect(() => {
    if (!isAutoPlaying) {
      const timeout = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 30000);

      return () => clearTimeout(timeout);
    }
  }, [isAutoPlaying]);

  const handleStartJourney = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create email content
      const emailSubject = `New Journey Inquiry for ${selectedCountry.name}`;
      const emailBody = `
New Journey Inquiry Details:

Personal Information:
-------------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.countryCode}${formData.phone}

Interest Details:
---------------
Country: ${selectedCountry.name}
Program: ${formData.program}
      `.trim();

      // Create mailto link with pre-filled data
      const mailtoLink = `mailto:info@globalcircleedu.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      // Open email client
      window.location.href = mailtoLink;

      // Send confirmation email to inquirer
      const confirmationSubject = 'Thank you for your interest - Global Circle Edu';
      const confirmationBody = `
Dear ${formData.name},

Thank you for your interest in studying in ${selectedCountry.name} with Global Circle Edu. We have received your inquiry and our team will review it shortly.

We will contact you within 24-48 hours to discuss your interests and guide you through the next steps.

Your Inquiry Details:
- Country of Interest: ${selectedCountry.name}
- Program of Interest: ${formData.program}

Best regards,
Global Circle Edu Team
      `.trim();

      // Open confirmation email in new tab
      setTimeout(() => {
        window.open(`mailto:${formData.email}?subject=${encodeURIComponent(confirmationSubject)}&body=${encodeURIComponent(confirmationBody)}`, '_blank');
      }, 1000);

      toast.success('Your inquiry has been submitted successfully!');
      setShowJourneyModal(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        countryCode: '+971',
        program: ''
      });
    } catch (error) {
      console.error('Error sending inquiry:', error);
      toast.error('Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Study Destinations
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join our growing network of students and universities worldwide
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Mobile Horizontal Scroll Menu */}
          <div className="col-span-12 lg:hidden">
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
              <div className="flex space-x-2 pb-4">
                {countries.map((country) => (
                  <button
                    key={country.name}
                    onClick={() => handleCountrySelect(country)}
                    className={`flex items-center whitespace-nowrap px-3 py-2 rounded-full transition-colors ${
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
                      onClick={() => handleCountrySelect(country)}
                      className={`w-full text-left p-3 sm:p-4 rounded-lg transition-all duration-300 ${
                        selectedCountry.name === country.name
                          ? 'bg-[#004e9a] text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{country.name}</h4>
                        </div>
                        <Plus className={`w-4 h-4 transition-transform ${
                          selectedCountry.name === country.name ? 'rotate-45' : ''
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
            <Card className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
              <div className="relative h-48 sm:h-96">
                <img
                  src={selectedCountry.image}
                  alt={selectedCountry.name}
                  className="w-full h-full object-cover rounded-t-xl transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      Study in {selectedCountry.name}
                    </h3>
                    <p className="text-sm sm:text-base text-white/90 line-clamp-2">
                      {selectedCountry.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-4">
                  <h4 className="font-medium mb-2">Key Features:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedCountry.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-[#004e9a]/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-[#004e9a]" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="w-full sm:flex-1 bg-[#004e9a] hover:bg-[#003d7a] group"
                    onClick={() => setShowJourneyModal(true)}
                  >
                    Start Your Journey
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
            </Card>
          </div>
        </div>
      </div>

      {/* Journey Modal */}
      {showJourneyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowJourneyModal(false)}
          />

          {/* Modal Content */}
          <Card className="relative w-full max-w-lg bg-white dark:bg-gray-800">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Start Your Journey</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Fill out this form to begin your journey to studying in {selectedCountry.name}
              </p>

              <form onSubmit={handleStartJourney} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <div className="flex gap-3">
                    <div className="w-32">
                      <CountryCodeSelect
                        value={formData.countryCode}
                        onChange={(value) => setFormData(prev => ({ ...prev, countryCode: value }))}
                      />
                    </div>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Program of Interest</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.program}
                      onChange={(e) => setFormData(prev => ({ ...prev, program: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      placeholder="Enter program name or field of study"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowJourneyModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-[#004e9a] to-[#f37021] group"
                  >
                    Start Journey
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </section>
  );
};