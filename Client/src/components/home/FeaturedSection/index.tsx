import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Building2, Briefcase, Newspaper } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { featuredData } from './featuredData';
import { CourseSlider } from './components/CourseSlider';

export const FeaturedSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#004e9a] via-[#f37021] to-[#faa61a] animate-gradient">
            Explore Our Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover world-class education opportunities and career paths
          </p>
        </div>


        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link to="/courses">
            <Button 
              size="lg" 
              className="w-full sm:w-auto group bg-gradient-to-r from-[#004e9a] to-[#f37021] hover:from-[#003d7a] hover:to-[#d85a0f] transform hover:scale-105 transition-all duration-300"
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Browse Courses
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/universities">
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto group border-2 border-[#004e9a] text-[#004e9a] hover:bg-[#004e9a]/5 dark:border-[#60a5fa] dark:text-[#60a5fa] dark:hover:bg-[#60a5fa]/5 transform hover:scale-105 transition-all duration-300"
            >
              <Building2 className="w-5 h-5 mr-2" />
              Explore Universities
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>


        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredData.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4"
              style={{ borderTopColor: `var(--${feature.color}-500)` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`p-3 rounded-xl bg-${feature.color}-50 dark:bg-${feature.color}-900/20 text-${feature.color}-600 dark:text-${feature.color}-400`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold ml-3">{feature.title}</h3>
                </div>
                <Link 
                  to={feature.viewAllLink}
                  className={`text-${feature.color}-600 hover:text-${feature.color}-700 text-sm font-medium`}
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {feature.items.map((item, idx) => (
                  <Link 
                    key={idx}
                    to={item.link}
                    className="block p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white group-hover:text-[#004e9a] dark:group-hover:text-[#60a5fa] transition-colors">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {item.institution || item.company || item.date}
                          {item.location && ` • ${item.location}`}
                          {item.duration && ` • ${item.duration}`}
                          {item.ranking && ` • ${item.ranking}`}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#004e9a] dark:group-hover:text-[#60a5fa] transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};