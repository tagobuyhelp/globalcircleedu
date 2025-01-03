import React from 'react';
import { Search, GraduationCap, Briefcase, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { BackgroundSlider } from './BackgroundSlider';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center">
      <BackgroundSlider />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-indigo-900/90 to-blue-900/85" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Study & Work Abroad
              <span className="block bg-gradient-to-r from-emerald-300 to-[#5fef00] bg-clip-text text-transparent mt-2">
                Shape Your Future
              </span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Access world-class education and career opportunities across the globe. Start your international journey today.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="Search courses, universities, or jobs..."
                className="w-full px-6 py-4 rounded-full text-gray-900 bg-white/95 shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-gray-500"
              />
              <Button className="absolute right-2 top-2 rounded-full px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center backdrop-blur-sm bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors border border-white/10">
                <div className="flex justify-center mb-2">
                  <GraduationCap className="h-8 w-8 text-[#EDC700]" />
                </div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-emerald-100">Universities</div>
              </div>
              <div className="text-center backdrop-blur-sm bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors border border-white/10">
                <div className="flex justify-center mb-2">
                  <Globe className="h-8 w-8 text-[#EDC700]" />
                </div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-emerald-100">Countries</div>
              </div>
              <div className="text-center backdrop-blur-sm bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors border border-white/10">
                <div className="flex justify-center mb-2">
                  <Briefcase className="h-8 w-8 text-[#EDC700]" />
                </div>
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-emerald-100">Jobs</div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="hidden lg:grid grid-rows-3 gap-4">
            <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-lg p-6 transform hover:-translate-y-1 transition-all duration-300 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Study Abroad Programs</h3>
              <p className="text-emerald-100 text-sm">Access top universities worldwide with comprehensive support</p>
            </div>
            <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-lg p-6 transform hover:-translate-y-1 transition-all duration-300 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Career Guidance</h3>
              <p className="text-emerald-100 text-sm">Expert counseling for international career opportunities</p>
            </div>
            <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-lg p-6 transform hover:-translate-y-1 transition-all duration-300 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Visa Assistance</h3>
              <p className="text-emerald-100 text-sm">Complete support for student and work visas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};