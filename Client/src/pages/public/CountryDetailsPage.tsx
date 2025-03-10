import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronLeft, FileCheck, Clock, DollarSign, 
  BookOpen, School, CheckCircle, FileText,
  Laptop, GraduationCap, HelpCircle, Plus,
  ArrowRight, Mail, Phone, User, MapPin, Building2,
  Globe2
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Footer } from '../../components/layout/Footer';
import { CountryCodeSelect } from '../../components/ui/CountryCodeSelect';
import { countries } from '../../data/studyDestinations';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';
import type { Country } from '../../data/countries/types';

export const CountryDetailsPage = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<'Student' | 'Worker'>('Student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+971',
    program: ''
  });

  useEffect(() => {
    try {
      setLoading(true);
      const decodedCountryName = decodeURIComponent(countryName || '');
      const selectedCountry = countries.find(
        c => c.name.toLowerCase() === decodedCountryName.toLowerCase()
      );
      
      if (selectedCountry) {
        setCountry(selectedCountry);
      } else {
        setError('Country not found');
      }
    } catch (err) {
      console.error('Error loading country:', err);
      setError('Failed to load country details');
    } finally {
      setLoading(false);
    }
  }, [countryName]);

  const handleApplyNow = () => {
    setShowApplicationForm(true);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        toast.error('Please fill in all required fields');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create email content
      const emailSubject = `New ${selectedType} Application for ${country?.name}`;
      const emailBody = `
New Application Details:

Personal Information:
-------------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.countryCode}${formData.phone}

Application Details:
-----------------
Type: ${selectedType}
Country: ${country?.name}
Interested Program: ${formData.program}
      `.trim();

      // Create mailto link with pre-filled data
      const mailtoLink = `mailto:info@globalcircleedu.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      // Open email client
      window.location.href = mailtoLink;

      // Send confirmation email to applicant
      const confirmationSubject = 'Thank you for your application - Global Circle Edu';
      const confirmationBody = `
Dear ${formData.name},

Thank you for your interest in ${selectedType === 'Student' ? 'studying' : 'working'} in ${country?.name} with Global Circle Edu. We have received your application and our team will review it shortly.

We will contact you within 24-48 hours to discuss your application and guide you through the next steps.

Your Application Details:
- Type: ${selectedType}
- Country: ${country?.name}
- Interested Program: ${formData.program}

Best regards,
Global Circle Edu Team
      `.trim();

      // Open confirmation email in new tab
      setTimeout(() => {
        window.open(`mailto:${formData.email}?subject=${encodeURIComponent(confirmationSubject)}&body=${encodeURIComponent(confirmationBody)}`, '_blank');
      }, 1000);

      toast.success('Application submitted successfully!');
      setShowApplicationForm(false);
      
      // Reset form
      setCurrentStep(1);
      setSelectedType('Student');
      setFormData({
        name: '',
        email: '',
        phone: '',
        countryCode: '+971',
        program: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to submit application. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'Country not found'}</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Study in ${country.name} | Global Circle Edu`}</title>
        <meta name="description" content={country.description} />
      </Helmet>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowApplicationForm(false)}
          />

          {/* Modal Content */}
          <Card className="relative w-full max-w-lg bg-white dark:bg-gray-800">
            <div className="p-6">
              {/* Progress Steps */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors",
                        currentStep === step
                          ? "bg-[#004e9a] text-white"
                          : currentStep > step
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      )}>
                        {step}
                      </div>
                      {step < 3 && (
                        <div className={cn(
                          "w-12 h-0.5 mx-2",
                          currentStep > step
                            ? "bg-green-500"
                            : "bg-gray-200"
                        )} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {currentStep === 1 && (
                  <div className="space-y-4">
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
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedType('Student')}
                      className={`relative group overflow-hidden p-6 rounded-xl border-2 transition-all duration-300 ${
                        selectedType === 'Student'
                          ? 'border-[#004e9a] bg-[#004e9a]/5'
                          : 'border-gray-200 hover:border-[#004e9a]/50'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#004e9a]/0 to-[#004e9a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className={`w-16 h-16 mx-auto rounded-full ${
                          selectedType === 'Student'
                            ? 'bg-[#004e9a]/10'
                            : 'bg-gray-100 group-hover:bg-[#004e9a]/5'
                          } transition-colors duration-300 flex items-center justify-center mb-4`}
                        >
                          <GraduationCap className={`w-8 h-8 ${
                            selectedType === 'Student' ? 'text-[#004e9a]' : 'text-gray-400'
                          } transition-colors duration-300`} />
                        </div>
                        <h3 className="font-medium text-lg mb-2">Student</h3>
                        <p className="text-sm text-gray-500">Study Abroad</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedType('Worker')}
                      className={`relative group overflow-hidden p-6 rounded-xl border-2 transition-all duration-300 ${
                        selectedType === 'Worker'
                          ? 'border-[#f37021] bg-[#f37021]/5'
                          : 'border-gray-200 hover:border-[#f37021]/50'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#f37021]/0 to-[#f37021]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className={`w-16 h-16 mx-auto rounded-full ${
                          selectedType === 'Worker'
                            ? 'bg-[#f37021]/10'
                            : 'bg-gray-100 group-hover:bg-[#f37021]/5'
                          } transition-colors duration-300 flex items-center justify-center mb-4`}
                        >
                          <Building2 className={`w-8 h-8 ${
                            selectedType === 'Worker' ? 'text-[#f37021]' : 'text-gray-400'
                          } transition-colors duration-300`} />
                        </div>
                        <h3 className="font-medium text-lg mb-2">Worker</h3>
                        <p className="text-sm text-gray-500">Work Abroad</p>
                      </div>
                    </button>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {selectedType === 'Student' ? 'Interested Program' : 'Job Category'}
                      </label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.program}
                          onChange={(e) => setFormData(prev => ({ ...prev, program: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                          placeholder={selectedType === 'Student' ? 'Enter program name' : 'Enter job category'}
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#004e9a] to-[#f37021] group mt-4 py-3"
                    >
                      Submit Application
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  )}
                  {currentStep < 3 && (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className={`ml-auto ${
                        selectedType === 'Student' 
                          ? 'bg-gradient-to-r from-[#004e9a] to-[#004e9a]/80' 
                          : 'bg-gradient-to-r from-[#f37021] to-[#f37021]/80'
                      } group`}
                    >
                      Next
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}

      {/* Hero Section with Parallax Effect */}
      <div className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-center bg-cover transform scale-110"
          style={{ 
            backgroundImage: `url(${country.image})`,
            transform: 'scale(1.1)',
            transformOrigin: 'center',
            transition: 'transform 0.5s ease-out'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <Link to="/" className="text-white/90 hover:text-white flex items-center mb-4 sm:mb-6 group">
              <ChevronLeft className="w-5 h-5 mr-1 transform group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 animate-fade-in">
              Study in {country.name}
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-xl mx-auto lg:mx-0">
              {country.description}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-8 sm:mt-12">
              {Object.entries(country.stats).map(([key, value]) => (
                <div key={key} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#004e9a]/20 to-[#f37021]/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300" />
                  <div className="relative backdrop-blur-sm bg-white/10 rounded-lg p-3 sm:p-4 hover:bg-white/20 transition-colors border border-white/20">
                    <div className="flex flex-col items-center">
                      {key === 'universities' && <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#EDC700] group-hover:scale-110 transition-transform duration-300" />}
                      {key === 'students' && <User className="w-6 h-6 sm:w-8 sm:h-8 text-[#EDC700] group-hover:scale-110 transition-transform duration-300" />}
                      {key === 'programs' && <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-[#EDC700] group-hover:scale-110 transition-transform duration-300" />}
                      <div className="text-lg sm:text-2xl font-bold mt-2 group-hover:text-[#EDC700] transition-colors">{value}</div>
                      <div className="text-xs sm:text-sm text-gray-200 text-center capitalize">{key}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4">
            {['overview', 'universities', 'admission', 'visa', 'costs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-4 sm:px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'border-[#004e9a] text-[#004e9a]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {activeTab === 'overview' && (
              <>
                {/* Overview Description */}
                <Card className="p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-6">Overview</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {country.description}
                    </p>
                    <div className="mt-6 space-y-4">
                      <h3 className="text-lg font-semibold">Why Study in {country.name}?</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        {country.features.map((feature, index) => (
                          <li key={index} className="text-gray-600 dark:text-gray-400">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Academic Institutions */}
                <Card className="p-4 sm:p-6 overflow-hidden">
                  <h2 className="text-xl sm:text-2xl font-bold mb-6">Academic Institutions</h2>
                  <div className="space-y-6">
                    {Object.entries(country.academicInstitutions).map(([key, value]) => (
                      <div key={key} className="relative">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                            <School className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                              {value.description}
                            </p>
                            <div className="mt-2 relative pt-1">
                              <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                                <div
                                  style={{ width: `${value.percentage}%` }}
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                                />
                              </div>
                              <span className="text-sm text-blue-600 mt-1">
                                {value.percentage}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Features */}
                <Card className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-6">Key Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {country.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#004e9a]/10 flex items-center justify-center mr-3">
                          <CheckCircle className="w-5 h-5 text-[#004e9a]" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {activeTab === 'universities' && (
              <div className="space-y-6">
                {Object.entries(country.universities).map(([type, universities]) => (
                  <Card key={type} className="p-6">
                    <h2 className="text-2xl font-bold mb-6 capitalize">
                      {type.replace(/([A-Z])/g, ' $1').trim()} Universities
                    </h2>
                    <div className="space-y-6">
                      {universities.map((uni, index) => (
                        <div 
                          key={index}
                          className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold mb-4">{uni.name}</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Programs & Fees</h4>
                                  <div className="space-y-2 text-gray-600 dark:text-gray-400">
                                    {uni.fees.split('\n').map((fee, idx) => (
                                      <p key={idx}>{fee}</p>
                                    ))}
                                  </div>
                                </div>
                                {uni.imatScore && (
                                  <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">IMAT Score</h4>
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900">
                                      <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                        Required Score: {uni.imatScore}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'admission' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Admission Requirements</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4">Required Documents</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {country.admissionRequirements.documents.map((doc, index) => (
                          <div 
                            key={index}
                            className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                          >
                            <FileText className="w-5 h-5 text-blue-600 mr-3" />
                            <span>{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">Language Requirements</h3>
                      <div className="space-y-4">
                        {Object.entries(country.admissionRequirements.languageRequirements).map(([lang, req]) => (
                          <div 
                            key={lang}
                            className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                          >
                            <Globe2 className="w-5 h-5 text-blue-600 mr-3" />
                            <div>
                              <p className="font-medium capitalize">{lang}</p>
                              <p className="text-gray-600 dark:text-gray-400">{req}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'visa' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Visa Requirements</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4">Required Documents</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {country.visaRequirements.documents.map((doc, index) => (
                          <div 
                            key={index}
                            className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                          >
                            <FileText className="w-5 h-5 text-blue-600 mr-3" />
                            <span>{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">Application Process</h3>
                      <div className="space-y-4">
                        {country.visaRequirements.steps.map((step, index) => (
                          <div 
                            key={index}
                            className="flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                          >
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 mr-3 flex-shrink-0">
                              {index + 1}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'costs' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Cost of Living</h2>
                  <div className="flex items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg mb-6">
                    <DollarSign className="w-12 h-12 text-blue-600 mr-6" />
                    <div>
                      <p className="text-2xl font-bold">{country.costOfLiving.range}</p>
                      <p className="text-gray-600 dark:text-gray-400">{country.costOfLiving.period}</p>
                      {country.costOfLiving.note && (
                        <p className="text-sm text-gray-500 mt-2">{country.costOfLiving.note}</p>
                      )}
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Scholarships</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {country.scholarships.types.map((scholarship, index) => (
                      <div 
                        key={index}
                        className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <FileCheck className="w-5 h-5 text-blue-600 mr-3" />
                        <span>{scholarship}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <Button 
                onClick={handleApplyNow}
                className="w-full bg-gradient-to-r from-[#004e9a] to-[#f37021] group"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <hr className="my-6" />

              <div className="space-y-4">
                <h3 className="font-semibold">Quick Facts</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Universities</span>
                    <span className="font-medium">{country.stats.universities}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Students</span>
                    <span className="font-medium">{country.stats.students}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Programs</span>
                    <span className="font-medium">{country.stats.programs}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Need Help?</h3>
              <div className="space-y-4">
                <Button 
                  variant="outline"
                  className="w-full flex items-center justify-center"
                  onClick={() => window.location.href = 'mailto:info@globalcircleedu.com'}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email Us
                </Button>
                <Button 
                  variant="outline"
                  className="w-full flex items-center justify-center"
                  onClick={() => window.location.href = 'tel:+971555508943'}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};