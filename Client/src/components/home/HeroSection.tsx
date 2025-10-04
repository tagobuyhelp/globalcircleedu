import React, { useState } from 'react';
import { 
  ArrowRight, Clock, DollarSign, 
  Mail, Phone, User, MapPin, BookOpen,
  Building2, Globe2, Users, GraduationCap 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { CountryCodeSelect } from '../ui/CountryCodeSelect';
import { BackgroundSlider, slides } from './BackgroundSlider';
import { JourneyPopup } from './JourneyPopup';
import { countries } from '../../data/studyDestinations';
import toast from 'react-hot-toast';

export const HeroSection = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedType, setSelectedType] = useState<'Student' | 'Worker'>('Student');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+971',
    country: '',
    program: ''
  });
  const [showJourneyPopup, setShowJourneyPopup] = useState(false);

  const stats = [
    {
      icon: Building2,
      value: '500+',
      label: 'Universities'
    },
    {
      icon: Globe2,
      value: '50+',
      label: 'Countries'
    },
    {
      icon: Users,
      value: '50,000+',
      label: 'Students'
    }
  ];

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!selectedType) {
      toast.error('Please select your path');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.country) {
      toast.error('Please select your preferred country');
      return false;
    }
    if (!formData.program) {
      toast.error('Please enter your interested program');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create email content
      const emailSubject = `New Journey Inquiry for ${selectedType}`;
      const emailBody = `
New Journey Inquiry Details:

Personal Information:
-------------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.countryCode}${formData.phone}

Interest Details:
---------------
Type: ${selectedType}
Country: ${formData.country}
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

Thank you for your interest in ${selectedType === 'Student' ? 'studying' : 'working'} abroad with Global Circle Edu. We have received your inquiry and our team will review it shortly.

We will contact you within 24-48 hours to discuss your interests and guide you through the next steps.

Your Inquiry Details:
- Type: ${selectedType}
- Country: ${formData.country}
- Program: ${formData.program}

Best regards,
Global Circle Edu Team
      `.trim();

      // Open confirmation email in new tab
      setTimeout(() => {
        window.open(`mailto:${formData.email}?subject=${encodeURIComponent(confirmationSubject)}&body=${encodeURIComponent(confirmationBody)}`, '_blank');
      }, 1000);

      toast.success('Your inquiry has been submitted successfully!');
      setShowJourneyPopup(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        countryCode: '+971',
        country: '',
        program: ''
      });
      setCurrentStep(1);
      setSelectedType('Student');
    } catch (error) {
      console.error('Error sending inquiry:', error);
      toast.error('Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <section className="relative min-h-[70vh] md:min-h-[75vh] flex items-center">
      <BackgroundSlider currentSlide={currentSlide} onSlideChange={setCurrentSlide} />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="text-white space-y-4 sm:space-y-6 text-center lg:text-left">
            <div className="space-y-3 transition-all duration-500 transform">
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {slides[currentSlide].title}
                <span className="block text-[#F37021] mt-2">
                  {slides[currentSlide].subtitle}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-200 max-w-xl mx-auto lg:mx-0">
                {slides[currentSlide].description}
              </p>
              {/* Helpful info row */}
              <div className="flex items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-gray-200">
                <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" /> Under 1 minute</span>
                <span className="opacity-50">•</span>
                <span className="inline-flex items-center gap-1"><DollarSign className="w-4 h-4" /> Free counselling</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#004e9a]/20 to-[#f37021]/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300" />
                    <div className="relative backdrop-blur-sm bg-white/10 rounded-lg p-3 sm:p-4 hover:bg-white/20 transition-colors border border-white/20">
                      <div className="flex flex-col items-center">
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#EDC700] group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-lg sm:text-2xl font-bold mt-2 group-hover:text-[#EDC700] transition-colors">{stat.value}</div>
                        <div className="text-xs sm:text-sm text-gray-200 text-center">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Multi-step Form */}
          <div className="w-full max-w-md mx-auto lg:max-w-none">
            <Card className="relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#004e9a]/5 to-[#f37021]/5" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#004e9a]/10 to-[#f37021]/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-[#f37021]/10 to-[#004e9a]/10 rounded-full blur-2xl transform -translate-x-16 translate-y-16" />

              <div className="relative p-4 sm:p-5 md:p-6">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#004e9a]">Start Your Journey</h2>
                    <p className="text-xs text-gray-500 mt-1">3 quick steps: Details → Path → Preferences</p>
                  </div>
                  <div className="flex space-x-2">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          step === currentStep 
                            ? 'w-6 bg-gradient-to-r from-[#004e9a] to-[#f37021]' 
                            : step < currentStep
                            ? 'w-2 bg-[#004e9a]'
                            : 'w-2 bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {currentStep === 1 && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent bg-gray-50/50"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">As shown on your passport</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent bg-gray-50/50"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">We’ll only use this to contact you about your inquiry</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <div className="flex gap-2 sm:gap-3">
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
                              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent bg-gray-50/50"
                              placeholder="Enter phone number"
                              required
                            />
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">WhatsApp-enabled number preferred</p>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedType('Student')}
                        className={`relative group overflow-hidden p-4 rounded-xl border-2 transition-all duration-300 ${
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
                        className={`relative group overflow-hidden p-4 rounded-xl border-2 transition-all duration-300 ${
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
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Preferred Country</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <select
                            value={formData.country}
                            onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent bg-gray-50/50"
                            required
                          >
                            <option value="">Select your preferred country</option>
                            {countries.map((country) => (
                              <option key={country.name} value={country.name}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

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
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent bg-gray-50/50"
                            placeholder={selectedType === 'Student' ? 'Enter program name' : 'Enter job category'}
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#004e9a] to-[#f37021] group mt-4 py-3"
                      >
                        {loading ? 'Submitting...' : 'Submit Application'}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-4 sm:mt-6">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        onClick={handleBack}
                        variant="outline"
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
                        Continue
                        <ArrowRight className="ml-1 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </Card>
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