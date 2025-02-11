import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GraduationCap, Briefcase, Globe, ChevronRight, Building2, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { BackgroundSlider, slides } from './BackgroundSlider';

export const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'courses' | 'jobs' | 'all'>('all');
  const [currentSlide, setCurrentSlide] = useState(0);

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
        navigate(`/search?${searchParams.toString()}`);
    }
  };

  const features = [
    {
      icon: GraduationCap,
      title: "Study Abroad Programs",
      description: "Access world-class education at top universities worldwide"
    },
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description: "Find international job placements and career growth"
    },
    {
      icon: Building2,
      title: "Top Universities",
      description: "Partner with prestigious educational institutions"
    }
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center">
      <BackgroundSlider currentSlide={currentSlide} onSlideChange={setCurrentSlide} />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4 transition-all duration-500 transform">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {slides[currentSlide].title}
                <span className="block text-[#F37021] mt-2">
                  {slides[currentSlide].subtitle}
                </span>
              </h1>
              <p className="text-xl text-gray-200 max-w-xl">
                {slides[currentSlide].description}
              </p>
            </div>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search courses, universities, or jobs..."
                  className="w-full px-6 py-4 pr-32 rounded-full text-gray-900 bg-white/95 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F37021] placeholder-gray-500"
                />
                <div className="absolute right-2 top-2 flex space-x-2">
                  <select 
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value as 'courses' | 'jobs' | 'all')}
                    className="px-3 py-2 rounded-full text-sm bg-gray-100 border-none focus:ring-2 focus:ring-[#F37021] text-gray-700"
                  >
                    <option value="all">All</option>
                    <option value="courses">Courses</option>
                    <option value="jobs">Jobs</option>
                  </select>
                  <Button type="submit" className="rounded-full px-6 bg-gradient-to-r from-[#004e9a] to-[#f37021] hover:from-[#003d7a] hover:to-[#d85a0f]">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center backdrop-blur-sm bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors border border-white/10">
                <div className="flex justify-center mb-2">
                  <Building2 className="h-8 w-8 text-[#EDC700]" />
                </div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-gray-200">Universities</div>
              </div>
              <div className="text-center backdrop-blur-sm bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors border border-white/10">
                <div className="flex justify-center mb-2">
                  <Globe className="h-8 w-8 text-[#EDC700]" />
                </div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-gray-200">Countries</div>
              </div>
              <div className="text-center backdrop-blur-sm bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors border border-white/10">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-[#EDC700]" />
                </div>
                <div className="text-2xl font-bold">50,000+</div>
                <div className="text-sm text-gray-200">Students</div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="hidden lg:grid gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-lg p-6 transform hover:-translate-y-1 transition-all duration-300 border border-white/10"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-white/20">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{feature.title}</h3>
                    <p className="text-gray-200 text-sm mt-1">{feature.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/50 group-hover:text-white transition-colors ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};