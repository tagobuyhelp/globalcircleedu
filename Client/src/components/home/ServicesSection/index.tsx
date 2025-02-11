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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {slide.title}
                  <span className="block text-[#f37021] text-2xl mt-2">
                    {slide.subtitle}
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
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
                    : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
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
                className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className={`inline-flex p-3 rounded-lg bg-${service.color}-50 dark:bg-${service.color}-900/20 text-${service.color}-600 dark:text-${service.color}-400 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[#004e9a] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {service.description}
                </p>
                <Link 
                  to={service.link}
                  className="inline-flex items-center text-[#004e9a] hover:text-[#003d7a] font-medium"
                >
                  Learn more
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/services">
            <Button size="lg" className="bg-[#004e9a] hover:bg-[#003d7a] text-white">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};