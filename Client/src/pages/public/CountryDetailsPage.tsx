import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronLeft, GraduationCap, Building2, Users, 
  Globe2, DollarSign, Clock, CheckCircle, MapPin,
  BookOpen, Briefcase, Heart, School, FileText,
  Landmark, PenTool, UtensilsCrossed, Brain,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Footer } from '../../components/layout/Footer';
import { countries } from '../../data/studyDestinations';
import type { Country } from '../../data/countries/types';

export const CountryDetailsPage = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const selectedCountry = countries.find(
      c => c.name.toLowerCase() === countryName?.toLowerCase()
    );
    setCountry(selectedCountry || null);
  }, [countryName]);

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Country not found</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Study in {country.name} | Global Circle Edu</title>
        <meta name="description" content={country.description} />
      </Helmet>

      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[70vh] overflow-hidden">
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
            <Link to="/" className="text-white/90 hover:text-white flex items-center mb-6 group">
              <ChevronLeft className="w-5 h-5 mr-1 transform group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Study in {country.name}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl animate-fade-in">
              {country.description}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {Object.entries(country.stats).map(([key, value]) => (
                <div key={key} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm capitalize">{key}</p>
                      <p className="text-2xl font-bold text-white">{value}</p>
                    </div>
                    {key === 'universities' && <Building2 className="w-8 h-8 text-white/50" />}
                    {key === 'students' && <Users className="w-8 h-8 text-white/50" />}
                    {key === 'programs' && <BookOpen className="w-8 h-8 text-white/50" />}
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
          <div className="flex space-x-8 overflow-x-auto">
            {['overview', 'universities', 'admission', 'visa', 'costs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'overview' && (
              <>
                {/* Academic Institutions */}
                <Card className="p-6 overflow-hidden">
                  <h2 className="text-2xl font-bold mb-6">Academic Institutions</h2>
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
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                  <div className="grid grid-cols-2 gap-4">
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
                    <div className="space-y-4">
                      {universities.map((uni, index) => (
                        <div 
                          key={index}
                          className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{uni.name}</h3>
                              <p className="text-gray-600 dark:text-gray-400 mt-2 whitespace-pre-line">
                                {uni.fees}
                              </p>
                            </div>
                            {uni.imatScore && (
                              <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                  IMAT: {uni.imatScore}
                                </span>
                              </div>
                            )}
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
                        <Heart className="w-5 h-5 text-blue-600 mr-3" />
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
            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-to-br from-[#004e9a] to-[#f37021] text-white">
              <h2 className="text-xl font-bold mb-4">Start Your Journey</h2>
              <p className="mb-6 text-white/90">
                Ready to begin your educational journey in {country.name}? Let us guide you through the process.
              </p>
              <Button 
                className="w-full bg-white text-[#004e9a] hover:bg-gray-100 group"
                onClick={() => window.location.href = '/register'}
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Card>

            {/* Key Information */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Key Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <span>Location: {country.name}</span>
                </div>
                <div className="flex items-center">
                  <Globe2 className="w-5 h-5 text-gray-400 mr-3" />
                  <span>Language: English</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  <span>Academic Year: Sept-June</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};