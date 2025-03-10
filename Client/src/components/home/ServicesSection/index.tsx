import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, Briefcase, FileText, Globe2, 
  Building2, FileCheck, Plane,
  Home, Car, CreditCard, Phone, HelpCircle
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
    gradient: 'from-[#004e9a] to-[#0077cc]',
    iconColor: '#004e9a',
    link: '/services'
  },
  {
    icon: Briefcase,
    title: 'Career Placement',
    description: 'Get professional assistance in finding the right job opportunities abroad with our extensive network of employers.',
    gradient: 'from-[#f37021] to-[#ff9f00]',
    iconColor: '#f37021',
    link: '/services'
  },
  {
    icon: FileText,
    title: 'Visa Assistance',
    description: 'Expert guidance through the entire visa application process, ensuring a smooth transition to your destination country.',
    gradient: 'from-[#00a651] to-[#00c853]',
    iconColor: '#00a651',
    link: '/services'
  },
  {
    icon: Building2,
    title: 'University Selection',
    description: 'Personalized counseling to help you choose the right university and program aligned with your career goals.',
    gradient: 'from-[#662d91] to-[#8e44ad]',
    iconColor: '#662d91',
    link: '/services'
  },
  {
    icon: Globe2,
    title: 'Language Programs',
    description: 'Comprehensive language training programs to help you meet university requirements and adapt to your new environment.',
    gradient: 'from-[#2e3192] to-[#3f51b5]',
    iconColor: '#2e3192',
    link: '/services'
  },
  {
    icon: FileCheck,
    title: 'Immigration Support',
    description: 'Complete assistance with immigration procedures, documentation, and compliance requirements.',
    gradient: 'from-[#92278f] to-[#c2185b]',
    iconColor: '#92278f',
    link: '/services'
  }
];

const postServices = [
  {
    icon: Plane,
    title: 'Pre-Departure Support',
    description: 'Comprehensive preparation assistance before you leave your home country.',
    gradient: 'from-[#004e9a] to-[#0077cc]',
    iconColor: '#004e9a',
    link: '/services'
  },
  {
    icon: Car,
    title: 'Airport Pickup',
    description: 'Reliable transportation service from the airport to your accommodation.',
    gradient: 'from-[#f37021] to-[#ff9f00]',
    iconColor: '#f37021',
    link: '/services'
  },
  {
    icon: Home,
    title: 'Accommodation Assistance',
    description: 'Help finding and securing suitable student housing or temporary accommodation.',
    gradient: 'from-[#00a651] to-[#00c853]',
    iconColor: '#00a651',
    link: '/services'
  },
  {
    icon: CreditCard,
    title: 'Bank Account Setup',
    description: 'Assistance with opening a local bank account and managing finances.',
    gradient: 'from-[#662d91] to-[#8e44ad]',
    iconColor: '#662d91',
    link: '/services'
  },
  {
    icon: Phone,
    title: 'Local SIM Card',
    description: 'Help getting a local phone number and mobile plan setup.',
    gradient: 'from-[#2e3192] to-[#3f51b5]',
    iconColor: '#2e3192',
    link: '/services'
  },
  {
    icon: HelpCircle,
    title: 'Orientation Services',
    description: 'Comprehensive orientation to help you settle into your new environment.',
    gradient: 'from-[#92278f] to-[#c2185b]',
    iconColor: '#92278f',
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=2000)',
          transform: 'translateZ(0)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#004e9a]/95 via-[#004e9a]/85 to-[#f37021]/90 backdrop-blur-sm" />
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
                <p className="text-lg text-white/90 max-w-2xl mx-auto">
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

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className={`group relative p-6 rounded-xl overflow-hidden transition-all duration-300 bg-gradient-to-br ${service.gradient}`}
              >
                <div 
                  className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                >
                  <Icon 
                    className="w-8 h-8" 
                    style={{ color: service.iconColor }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {service.title}
                </h3>
                <p className="text-white/90">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Post-Departure & Arrival Services */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Post-Departure & Arrival Services
            <span className="block text-[#f37021] text-2xl mt-2">
              Supporting Your Transition
            </span>
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Comprehensive support services to ensure a smooth transition and comfortable settlement in your new environment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {postServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className={`group relative p-6 rounded-xl overflow-hidden transition-all duration-300 bg-gradient-to-br ${service.gradient}`}
              >
                <div 
                  className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                >
                  <Icon 
                    className="w-8 h-8" 
                    style={{ color: service.iconColor }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {service.title}
                </h3>
                <p className="text-white/90">
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