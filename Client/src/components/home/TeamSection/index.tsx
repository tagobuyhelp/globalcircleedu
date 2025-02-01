import React from 'react';
import { 
  Linkedin, Mail, GraduationCap, Briefcase, 
  Globe, Award, Users, MessageCircle
} from 'lucide-react';
import { Carousel } from '../../ui/Carousel';

const teamMembers = [
  {
    name: 'Dr. Ratan Kumar Gupta',
    role: 'General Manager',
    image: 'https://res.cloudinary.com/dttifrbaa/image/upload/v1737992723/GCE/oq66vicoxpswalm8byay.png',
    expertise: 'Management & Operations',
    description: 'Dr. Gupta brings extensive experience in business management, ensuring smooth operational efficiency.',
    linkedin: '#',
    email: 'ratan@globalcircleedu.com',
    icon: GraduationCap,
    color: 'blue'
  },
  {
    name: 'Gargi Guha Roy',
    role: 'Administrative & Operational Manager',
    image: 'https://res.cloudinary.com/dttifrbaa/image/upload/v1737992694/GCE/o786jiirv48hwhkh89fi.png',
    expertise: 'Administration & Operations',
    description: 'Gargi specializes in overseeing administrative functions and streamlining operational processes.',
    linkedin: '#',
    email: 'gargi@globalcircleedu.com',
    icon: Briefcase,
    color: 'green'
  },
  {
    name: 'Mamata Pathak',
    role: 'Admission and Immigration Incharge',
    image: 'https://res.cloudinary.com/dttifrbaa/image/upload/v1737992696/GCE/uhny8tanhfj2vkxtkyus.png',
    expertise: 'Admissions & Immigration',
    description: 'Mamata has a deep understanding of global immigration policies and student admission processes.',
    linkedin: '#',
    email: 'mamata@globalcircleedu.com',
    icon: Globe,
    color: 'red'
  },
  {
    name: 'Abhik Majumder',
    role: 'International Language and Relations Head',
    image: 'https://res.cloudinary.com/dttifrbaa/image/upload/v1738393354/GCE/dkfxv6k3ibysgcdmn4ml.png',
    expertise: 'Language & International Relations',
    description: 'Abhik leads our international language programs, fostering global collaboration.',
    linkedin: '#',
    email: 'abhik@globalcircleedu.com',
    icon: MessageCircle,
    color: 'purple'
  }
];


export const TeamSection = () => {
  // Create team member cards for the carousel
  const teamCards = teamMembers.map((member, index) => {
    const Icon = member.icon;
    return (
      <div 
        key={index}
        className="px-4 py-2 h-full"
      >
        <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
          <div className="relative">
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
              <div className="flex space-x-2">
                <a 
                  href={member.linkedin}
                  className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4 text-white" />
                </a>
                <a 
                  href={`mailto:${member.email}`}
                  className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                >
                  <Mail className="w-4 h-4 text-white" />
                </a>
                <a 
                  href={`https://wa.me/${member.email}`}
                  className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className={`inline-flex p-2 rounded-lg bg-${member.color}-50 dark:bg-${member.color}-900/20 text-${member.color}-600 dark:text-${member.color}-400 mb-3`}>
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
            <p className="text-sm text-[#004e9a] dark:text-[#60a5fa] font-medium mb-2">
              {member.role}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {member.description}
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <Award className="w-4 h-4 text-[#f37021]" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {member.expertise}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our experienced team of education and career professionals is dedicated to helping you achieve your international goals
          </p>
        </div>

        {/* Desktop Grid View (hidden on mobile) */}
        <div className="hidden lg:grid grid-cols-4 gap-8">
          {teamMembers.map((member, index) => {
            const Icon = member.icon;
            return (
              <div 
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <div className="flex space-x-2">
                      <a 
                        href={member.linkedin}
                        className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-4 h-4 text-white" />
                      </a>
                      <a 
                        href={`mailto:${member.email}`}
                        className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-white" />
                      </a>
                      <a 
                        href={`https://wa.me/${member.email}`}
                        className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className={`inline-flex p-2 rounded-lg bg-${member.color}-50 dark:bg-${member.color}-900/20 text-${member.color}-600 dark:text-${member.color}-400 mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-[#004e9a] dark:text-[#60a5fa] font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.description}
                  </p>
                  <div className="mt-4 flex items-center space-x-2">
                    <Award className="w-4 h-4 text-[#f37021]" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {member.expertise}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Carousel (hidden on desktop) */}
        <div className="lg:hidden">
          <Carousel 
            items={teamCards}
            interval={5000}
            className="pb-12"
          />
        </div>
      </div>
    </section>
  );
};