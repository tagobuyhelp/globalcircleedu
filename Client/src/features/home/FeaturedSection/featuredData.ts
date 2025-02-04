import { GraduationCap, Building2, Briefcase, Newspaper } from 'lucide-react';
import type { Feature } from './types';

export const featuredData: Feature[] = [
  {
    title: 'Featured Courses',
    icon: GraduationCap,
    color: 'indigo',
    viewAllLink: '/courses',
    items: [
      { 
        title: 'Master in Data Science',
        institution: 'MIT',
        duration: '2 Years',
        link: '/courses/master-data-science'
      },
      { 
        title: 'MBA',
        institution: 'Harvard',
        duration: '18 Months',
        link: '/courses/mba-harvard'
      }
    ]
  },
  {
    title: 'Top Universities',
    icon: Building2,
    color: 'blue',
    viewAllLink: '/universities',
    items: [
      {
        title: 'Moscow State University',
        location: 'Russia',
        ranking: '#1',
        link: '/universities/msu'
      },
      {
        title: 'Saint Petersburg State University',
        location: 'Russia',
        ranking: '#2',
        link: '/universities/spsu'
      },
      {
        title: 'Novosibirsk State University',
        location: 'Russia',
        ranking: '#3',
        link: '/universities/nsu'
      },
      {
        title: 'RUDN University',
        location: 'Russia',
        ranking: '#4',
        link: '/universities/rudn'
      }
    ]
  },
  {
    title: 'Latest Jobs',
    icon: Briefcase,
    color: 'emerald',
    viewAllLink: '/jobs',
    items: [
      {
        title: 'Senior Data Scientist',
        company: 'Google',
        location: 'USA',
        link: '/jobs/senior-data-scientist'
      },
      {
        title: 'Software Engineer',
        company: 'Microsoft',
        location: 'Canada',
        link: '/jobs/software-engineer'
      }
    ]
  },
  {
    title: 'Recent News',
    icon: Newspaper,
    color: 'violet',
    viewAllLink: '/news',
    items: [
      {
        title: 'New Scholarship Programs',
        date: 'Dec 15, 2023',
        link: '/news/new-scholarship-programs'
      },
      {
        title: 'Study Abroad Opportunities',
        date: 'Dec 10, 2023',
        link: '/news/study-abroad-opportunities'
      }
    ]
  }
];