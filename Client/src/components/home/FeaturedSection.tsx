import React from 'react';
import { Card } from '../ui/Card';
import { GraduationCap, Building2, Briefcase, Newspaper } from 'lucide-react';

const features = [
  {
    title: 'Featured Courses',
    icon: GraduationCap,
    color: 'indigo',
    items: [
      { title: 'Master in Data Science', institution: 'MIT', duration: '2 Years' },
      { title: 'MBA', institution: 'Harvard', duration: '18 Months' }
    ]
  },
  {
    title: 'Top Universities',
    icon: Building2,
    color: 'blue',
    items: [
      { title: 'Massachusetts Institute of Technology', location: 'USA', ranking: '#1' },
      { title: 'University of Oxford', location: 'UK', ranking: '#2' }
    ]
  },
  {
    title: 'Latest Jobs',
    icon: Briefcase,
    color: 'emerald',
    items: [
      { title: 'Senior Data Scientist', company: 'Google', location: 'USA' },
      { title: 'Software Engineer', company: 'Microsoft', location: 'Canada' }
    ]
  },
  {
    title: 'Recent News',
    icon: Newspaper,
    color: 'violet',
    items: [
      { title: 'New Scholarship Programs', date: 'Dec 15, 2023' },
      { title: 'Study Abroad Opportunities', date: 'Dec 10, 2023' }
    ]
  }
];

const colorMap = {
  indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
  violet: 'bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400'
};

export const FeaturedSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Our Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover world-class education opportunities and career paths
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4"
                style={{ borderTopColor: `var(--${feature.color}-500)` }}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-xl ${colorMap[feature.color]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold ml-3">{feature.title}</h3>
                </div>
                <div className="space-y-4">
                  {feature.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {item.institution || item.company || item.date}
                        {item.location && ` • ${item.location}`}
                        {item.duration && ` • ${item.duration}`}
                        {item.ranking && ` • ${item.ranking}`}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};