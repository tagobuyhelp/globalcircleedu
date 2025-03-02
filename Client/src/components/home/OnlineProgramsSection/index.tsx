import React, { useState } from 'react';
import { GraduationCap, Award, BookOpen, FileText, Clock, Users, Globe2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

const programs = [
  {
    title: "Online Degree Programs",
    description: "Comprehensive degree programs from leading universities worldwide",
    icon: GraduationCap,
    color: "[#004e9a]",
    type: "degree"
  },
  {
    title: "Online Diploma Programs",
    description: "Professional diplomas to enhance your career prospects",
    icon: Award,
    color: "[#f37021]",
    type: "diploma"
  },
  {
    title: "Online Certificate Programs",
    description: "Specialized certificates for skill development",
    icon: FileText,
    color: "[#faa61a]",
    type: "certificate"
  }
];

const programContent = {
  degree: [
    {
      icon: BookOpen,
      title: "Online Associate's Degree",
      description: "Start your journey with an Associate's Degree – the perfect foundation for your future success.",
      duration: "2 years",
      students: "5,000+",
      countries: "25+",
      color: "[#004e9a]"
    },
    {
      icon: GraduationCap,
      title: "Online Bachelor's Degree",
      description: "Elevate your career prospects with a Bachelor's Degree – unlock a world of opportunities for your future.",
      duration: "4 years",
      students: "15,000+",
      countries: "40+",
      color: "[#f37021]"
    },
    {
      icon: Award,
      title: "Online Master's Degree",
      description: "Take the next step in your academic and professional growth with a Master's Degree – specialize and excel.",
      duration: "2 years",
      students: "8,000+",
      countries: "35+",
      color: "[#faa61a]"
    },
    {
      icon: FileText,
      title: "Online Doctorate/PhD. Degree",
      description: "Reach the pinnacle of academic achievement with a Doctorate/PhD Degree – become a leader in your field.",
      duration: "3-5 years",
      students: "2,000+",
      countries: "30+",
      color: "[#004e9a]"
    }
  ],
  diploma: [
    {
      icon: BookOpen,
      title: "Professional Diploma",
      description: "Gain practical skills and industry knowledge with our professional diploma programs.",
      duration: "1 year",
      students: "3,000+",
      countries: "20+",
      color: "[#004e9a]"
    },
    {
      icon: Award,
      title: "Advanced Diploma",
      description: "Take your expertise to the next level with specialized advanced diploma programs.",
      duration: "1.5 years",
      students: "2,500+",
      countries: "15+",
      color: "[#f37021]"
    },
    {
      icon: GraduationCap,
      title: "Graduate Diploma",
      description: "Bridge the gap between your degree and career goals with a graduate diploma.",
      duration: "1 year",
      students: "2,000+",
      countries: "18+",
      color: "[#faa61a]"
    },
    {
      icon: FileText,
      title: "Postgraduate Diploma",
      description: "Enhance your qualifications with a focused postgraduate diploma program.",
      duration: "1-2 years",
      students: "1,500+",
      countries: "12+",
      color: "[#004e9a]"
    }
  ],
  certificate: [
    {
      icon: BookOpen,
      title: "Professional Certificate",
      description: "Gain specific skills and knowledge with focused professional certificate programs.",
      duration: "3-6 months",
      students: "4,000+",
      countries: "15+",
      color: "[#004e9a]"
    },
    {
      icon: Award,
      title: "Executive Certificate",
      description: "Develop leadership and management skills with executive-level certificates.",
      duration: "6 months",
      students: "1,800+",
      countries: "10+",
      color: "[#f37021]"
    },
    {
      icon: GraduationCap,
      title: "Specialized Certificate",
      description: "Master specific industry skills with specialized certificate programs.",
      duration: "4-8 months",
      students: "2,500+",
      countries: "12+",
      color: "[#faa61a]"
    },
    {
      icon: FileText,
      title: "Advanced Certificate",
      description: "Take your expertise further with advanced certificate programs.",
      duration: "6-12 months",
      students: "2,000+",
      countries: "8+",
      color: "[#004e9a]"
    }
  ]
};

const OnlineProgramsSection = () => {
  const [activeTab, setActiveTab] = useState('degree');

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 dark:from-indigo-950 dark:via-gray-900 dark:to-emerald-950">
        <div className="absolute inset-0 bg-grid-gray-900/[0.04] dark:bg-grid-white/[0.02]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#004e9a] dark:text-white">Accredited Online Degree</span>
            {' '}
            <span className="text-[#f37021]">Programs</span>
          </h2>
        </div>

        {/* Program Type Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg p-1 bg-white dark:bg-gray-800 shadow-lg">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(program.type)}
                  className={cn(
                    "flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    activeTab === program.type
                      ? `bg-${program.color} text-white shadow-md`
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{program.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programContent[activeTab as keyof typeof programContent].map((program, index) => {
            const Icon = program.icon;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                  `bg-${program.color}/10 dark:bg-${program.color}/20`,
                  "group-hover:scale-110 transition-transform duration-300"
                )}>
                  <Icon className={`w-6 h-6 text-${program.color}`} />
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 group-hover:text-${program.color} transition-colors`}>
                  {program.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {program.description}
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Clock className={`w-4 h-4 text-${program.color} mb-1`} />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{program.duration}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Users className={`w-4 h-4 text-${program.color} mb-1`} />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{program.students}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Globe2 className={`w-4 h-4 text-${program.color} mb-1`} />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{program.countries}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OnlineProgramsSection;