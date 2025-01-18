import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, Briefcase, FileText, Globe2, 
  Building2, FileCheck, ArrowRight 
} from 'lucide-react';
import { Button } from '../../ui/Button';

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
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions for your international education and career journey
          </p>
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
                  <Icon className="w-6 h-6" />
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