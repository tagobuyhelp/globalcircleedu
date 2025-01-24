import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GraduationCap, Briefcase, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { BackgroundSlider } from './BackgroundSlider';

export const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'courses' | 'jobs' | 'all'>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const searchParams = new URLSearchParams();
    searchParams.set('q', searchTerm);

    switch (searchType) {
      case 'courses':
        navigate(`/courses?${searchParams.toString()}`);
        break;
      case 'jobs':
        navigate(`/jobs?${searchParams.toString()}`);
        break;
      default:
        // Search all sections
        navigate(`/search?${searchParams.toString()}`);
    }
  };

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
              <span className="block text-[#F37021]  mt-2">
                Shape Your Future
              </span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Access world-class education and career opportunities across the globe. Start your international journey today.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search courses, universities, or jobs..."
                  className="w-full px-6 py-4 pr-32 rounded-full text-gray-900 bg-white/95 shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-gray-500"
                />
                <div className="absolute right-2 top-2 flex space-x-2">
                  <select 
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value as 'courses' | 'jobs' | 'all')}
                    className="px-3 py-2 rounded-full text-sm bg-gray-100 border-none focus:ring-2 focus:ring-emerald-400 text-black"
                  >
                    <option value="all">All</option>
                    <option value="courses">Courses</option>
                    <option value="jobs">Jobs</option>
                  </select>
                  <Button type="submit" className="rounded-full px-6 bg-gradient-to-r from-[#f37021] to-[#e94e61] hover:from-emerald-600 hover:to-teal-700">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </form>

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