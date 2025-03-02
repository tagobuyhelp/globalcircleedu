import React, { useState, useEffect } from 'react';
import { GraduationCap, FileText, Award, BookOpen, ChevronRight, Globe2, Users, Clock } from 'lucide-react';
import { Button } from '../../ui/Button';
import { DegreeModal } from './DegreeModal';
import { cn } from '../../../utils/cn';

const programs = [
  {
    title: 'Certificate Programs',
    icon: FileText,
    color: '[#004e9a]',
    shortDescription: 'Short-term specialized programs for skill development and career advancement.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2000',
    stats: {
      duration: '3-12 months',
      students: '5,000+',
      global: '25+ countries'
    },
    content: {
      graduate: {
        title: 'Graduate Course Certificate',
        description: 'A Graduate Course Certificate is a specialized short-term program designed for professionals and graduates who want to enhance their knowledge, develop new skills, or gain expertise in a specific field.',
        benefits: [
          'Skill Enhancement – Gain in-depth knowledge in a specific industry or field',
          'Career Growth – Improve job prospects and increase earning potential',
          'Flexible Learning – Available in full-time, part-time, and online formats',
          'Industry Recognition – Enhance your credentials with a recognized certificate',
          'Pathway to Further Studies – Can be a stepping stone to a Master\'s degree'
        ],
        fields: [
          'Business & Management',
          'Data Science & IT',
          'Healthcare & Nursing',
          'Engineering & Technology',
          'Marketing & Digital Media',
          'Education & Teaching'
        ],
        careers: [
          'Business Analyst',
          'Data Scientist',
          'Healthcare Manager',
          'Digital Marketing Specialist',
          'Project Manager'
        ]
      },
      undergraduate: {
        title: 'Undergraduate Course Certificate',
        description: 'An Undergraduate Course Certificate is a specialized program designed to provide students with fundamental knowledge and practical skills in a specific subject.',
        benefits: [
          'Short-Term & Focused – Complete in a few months to a year',
          'Career-Oriented – Gain industry-relevant skills',
          'Flexible Learning – Available in on-campus and online formats',
          'Pathway to a Degree – Can often be credited towards an undergraduate degree',
          'Affordable & Time-Saving – Lower cost and faster completion than a full degree'
        ],
        fields: [
          'Business & Entrepreneurship',
          'Information Technology & Coding',
          'Healthcare & Nursing',
          'Engineering & Technical Skills',
          'Design & Multimedia',
          'Hospitality & Tourism'
        ],
        careers: [
          'Junior Developer',
          'Business Assistant',
          'Healthcare Support',
          'Design Assistant',
          'Tourism Coordinator'
        ]
      }
    }
  },
  {
    title: 'Diploma Programs',
    icon: Award,
    color: '[#f37021]',
    shortDescription: 'Comprehensive diploma programs offering practical skills and industry knowledge.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2000',
    stats: {
      duration: '1-2 years',
      students: '8,000+',
      global: '30+ countries'
    },
    content: {
      graduate: {
        title: 'Graduate Diploma',
        description: 'A Graduate Diploma is a specialized postgraduate qualification designed to provide advanced knowledge and practical skills in a specific field.',
        benefits: [
          'Enhance Career Opportunities – Gain industry-relevant expertise for better job prospects',
          'Shorter Duration – Faster than a master\'s degree, yet highly valued',
          'Skill Development – Practical training to boost professional competence',
          'Pathway to a Master\'s Degree – Many programs allow credit transfer to a master\'s',
          'Specialization – Focus on a particular subject area to refine expertise'
        ],
        fields: [
          'Business & Management',
          'Information Technology',
          'Healthcare & Nursing',
          'Engineering & Applied Sciences',
          'Education & Teaching',
          'Law & Public Administration'
        ],
        careers: [
          'Project Manager',
          'Data Analyst',
          'Financial Consultant',
          'Healthcare Administrator',
          'Marketing Specialist'
        ]
      },
      undergraduate: {
        title: 'Undergraduate Diploma',
        description: 'An Undergraduate Diploma is a specialized program designed to provide foundational knowledge and practical skills in a specific field.',
        benefits: [
          'Fast-Track Your Career – Gain industry-relevant skills in less time',
          'Practical Learning – Hands-on training to prepare for real-world challenges',
          'Cost-Effective – More affordable than a full degree while still offering valuable credentials',
          'Pathway to a Bachelor\'s Degree – Many programs allow credit transfer to continue education',
          'Flexible Study Options – Available in full-time, part-time, and online formats'
        ],
        fields: [
          'Business & Management',
          'Information Technology',
          'Engineering & Applied Sciences',
          'Hospitality & Tourism',
          'Health & Social Sciences',
          'Media & Communication'
        ],
        careers: [
          'Administrative Assistant',
          'IT Support Specialist',
          'Marketing Coordinator',
          'Hospitality Manager',
          'Engineering Technician'
        ]
      }
    }
  },
  {
    title: 'Degree Programs',
    icon: GraduationCap,
    color: '[#faa61a]',
    shortDescription: 'Comprehensive academic programs from Associate\'s to Doctorate level.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2000',
    stats: {
      duration: '2-5 years',
      students: '15,000+',
      global: '40+ countries'
    },
    content: {
      associate: {
        title: 'Associate\'s Degree',
        description: 'An Associate\'s Degree is a two-year undergraduate program designed to provide students with foundational knowledge and practical skills in their chosen field.',
        benefits: [
          'Shorter Duration – Typically completed in two years, allowing for faster career entry',
          'Cost-Effective – More affordable than a full bachelor\'s degree',
          'Career-Focused – Prepares students with job-ready skills',
          'Pathway to a Bachelor\'s – Credits can often be transferred to a four-year university'
        ],
        fields: [
          'Business Administration',
          'Information Technology',
          'Healthcare & Nursing',
          'Engineering Technology',
          'Hospitality & Tourism',
          'Creative Arts & Design'
        ],
        careers: [
          'Office Administrator',
          'IT Support Specialist',
          'Medical Assistant',
          'Graphic Designer',
          'Engineering Technician'
        ]
      },
      bachelor: {
        title: 'Bachelor\'s Degree',
        description: 'A Bachelor\'s Degree is a four-year undergraduate program that provides in-depth academic knowledge and specialized skills in a chosen field.',
        benefits: [
          'Comprehensive Education – Develops critical thinking, problem-solving, and leadership skills',
          'Higher Earning Potential – Graduates typically earn more than those with an associate\'s degree',
          'Broader Career Opportunities – Qualifies for a wider range of professional roles',
          'Pathway to Further Studies – Essential for pursuing a Master\'s or Doctoral degree'
        ],
        fields: [
          'Business & Management',
          'Engineering & Technology',
          'Computer Science & IT',
          'Medicine & Healthcare',
          'Law & Political Science',
          'Arts, Design & Media'
        ],
        careers: [
          'Business Analyst',
          'Software Engineer',
          'Marketing Manager',
          'Civil Engineer',
          'Financial Consultant'
        ]
      },
      master: {
        title: 'Master\'s Degree',
        description: 'A Master\'s Degree is a postgraduate program designed to provide advanced knowledge, specialized skills, and professional expertise in a chosen field.',
        benefits: [
          'Advanced Knowledge & Expertise – Gain in-depth understanding and specialization in your field',
          'Higher Salary Potential – Master\'s degree holders generally earn more than those with only a bachelor\'s degree',
          'Career Growth & Leadership – Qualifies you for senior positions and management roles',
          'Research & Innovation Opportunities – Engage in cutting-edge research and contribute to industry advancements'
        ],
        fields: [
          'Business Administration (MBA)',
          'Engineering & Technology',
          'Computer Science & IT',
          'Medicine & Healthcare',
          'Law & Public Administration',
          'Arts & Humanities'
        ],
        careers: [
          'Data Scientist',
          'Project Manager',
          'Financial Analyst',
          'Healthcare Administrator',
          'Research Scientist'
        ]
      },
      doctorate: {
        title: 'Doctorate/Ph.D. Degree',
        description: 'A Doctorate (Ph.D.) Degree is the highest academic qualification, focusing on advanced research, critical analysis, and expertise in a specific field.',
        benefits: [
          'Expert-Level Knowledge – Become a recognized authority in your area of study',
          'Career Advancement – Qualifies you for top positions in academia, research, and industry leadership',
          'Higher Salary Potential – Ph.D. holders often earn more than those with lower degrees',
          'Innovation & Discovery – Contribute groundbreaking research to your field'
        ],
        fields: [
          'Science & Engineering',
          'Medicine & Healthcare',
          'Business & Management',
          'Computer Science & AI',
          'Social Sciences & Humanities',
          'Law & Public Policy'
        ],
        careers: [
          'University Professor',
          'Research Scientist',
          'Chief Executive Officer (CEO)',
          'Policy Analyst',
          'Clinical Researcher'
        ]
      }
    }
  }
];

export const DegreePrograms = () => {
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-gray-900/[0.04] dark:bg-grid-white/[0.02]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-[#004e9a]">Accredited Degree</span>{' '}
            <span className="text-[#f37021]">Programs</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our comprehensive range of academic programs designed to help you achieve your educational and career goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <div
                key={index}
                className={cn(
                  "group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-500",
                  "hover:shadow-2xl hover:-translate-y-1",
                  "border border-gray-200 dark:border-gray-700"
                )}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Image with Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-500",
                      isHovered && "scale-110"
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  
                  {/* Program Icon */}
                  <div className={cn(
                    "absolute bottom-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center",
                    `bg-${program.color} bg-opacity-90 backdrop-blur-sm`
                  )}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Program Title */}
                  <div className="absolute bottom-4 left-20 right-4">
                    <h3 className="text-xl font-semibold text-white">{program.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {program.shortDescription}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <Clock className={`w-5 h-5 mx-auto mb-2 text-${program.color}`} />
                      <p className="text-sm text-gray-600 dark:text-gray-400">{program.stats.duration}</p>
                    </div>
                    <div className="text-center">
                      <Users className={`w-5 h-5 mx-auto mb-2 text-${program.color}`} />
                      <p className="text-sm text-gray-600 dark:text-gray-400">{program.stats.students}</p>
                    </div>
                    <div className="text-center">
                      <Globe2 className={`w-5 h-5 mx-auto mb-2 text-${program.color}`} />
                      <p className="text-sm text-gray-600 dark:text-gray-400">{program.stats.global}</p>
                    </div>
                  </div>

                  {/* Program Types */}
                  <div className="space-y-2">
                    {Object.entries(program.content).map(([type, content]) => (
                      <Button
                        key={type}
                        onClick={() => {
                          setSelectedProgram({
                            ...program,
                            type
                          });
                          setShowModal(true);
                        }}
                        variant="outline"
                        className={cn(
                          "w-full justify-between group hover:border-transparent",
                          `hover:bg-${program.color} hover:text-white`
                        )}
                      >
                        <span>{content.title}</span>
                        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Program Details Modal */}
      {showModal && selectedProgram && (
        <DegreeModal
          program={selectedProgram}
          onClose={() => {
            setShowModal(false);
            setSelectedProgram(null);
          }}
        />
      )}
    </section>
  );
};