import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, Briefcase, FileText, Globe2, 
  Building2, FileCheck, ArrowRight 
} from 'lucide-react';
import { Button } from '../../ui/Button';

const serviceSlides = [
  {
    title: "Comprehensive Education Services",
    subtitle: "Your Path to Academic Excellence",
    description: "From application to admission, we guide you through every step of your educational journey",
    color: "blue"
  },
  {
    title: "Career Development Programs",
    subtitle: "Build Your Professional Future",
    description: "Expert guidance for international career opportunities and professional growth",
    color: "green"
  },
  {
    title: "Immigration Support",
    subtitle: "Seamless Transition Abroad",
    description: "Complete assistance with visa applications and immigration procedures",
    color: "purple"
  }
];

const services = [
  {
    icon: GraduationCap,
    title: 'Study Abroad Programs',
    description: 'Access world-class education opportunities at top universities worldwide with comprehensive support and guidance.',
    color: 'blue',
    link: '/services'
  },
  {
    icon: Briefcase,
    title: 'Career Placement',
    description: 'Get professional assistance in finding the right job opportunities abroad with our extensive network of employers.',
    color: 'orange',
    link: '/services'
  },
  {
    icon: FileText,
    title: 'Visa Assistance',
    description: 'Expert guidance through the entire visa application process, ensuring a smooth transition to your destination country.',
    color: 'green',
    link: '/services'
  },
  {
    icon: Building2,
    title: 'University Selection',
    description: 'Personalized counseling to help you choose the right university and program aligned with your career goals.',
    color: 'purple',
    link: '/services'
  },
  {
    icon: Globe2,
    title: 'Language Programs',
    description: 'Comprehensive language training programs to help you meet university requirements and adapt to your new environment.',
    color: 'indigo',
    link: '/services'
  },
  {
    icon: FileCheck,
    title: 'Immigration Support',
    description: 'Complete assistance with immigration procedures, documentation, and compliance requirements.',
    color: 'rose',
    link: '/services'
  }
];

export const ServicesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % serviceSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000)',
          transform: 'translateZ(0)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-900/80 to-indigo-900/90 backdrop-blur-sm" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="relative h-32">
            {serviceSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 transform ${
                  index === currentSlide 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  {slide.title}
                  <span className="block text-[#f37021] text-2xl mt-2">
                    {slide.subtitle}
                  </span>
                </h2>
                <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                  {slide.description}
                </p>
              </div>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-3 mt-6">
            {serviceSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8 bg-[#f37021]' 
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm p-6 rounded-xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-lg bg-${service.color}-50/10 text-${service.color}-400 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#f37021] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-300">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};