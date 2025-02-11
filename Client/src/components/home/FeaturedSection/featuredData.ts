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
        link: '/courses'
      },
      { 
        title: 'MBA',
        institution: 'Harvard',
        duration: '18 Months',
        link: '/courses'
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
      title: 'Lithuanian University of Health Sciences',
      location: 'Europe',
      ranking: '#1',
      link: '/universities'
    },
    {
      title: 'Moscow State University',
      location: 'Russia',
      ranking: '#1',
      link: '/universities'
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
        link: '/jobs'
      },
      {
        title: 'Software Engineer',
        company: 'Microsoft',
        location: 'Canada',
        link: '/jobs'
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
        date: 'Jan 3, 2025',
        link: '/news'
      },
      {
        title: 'Study Abroad Opportunities',
        date: 'Jan 2, 2025',
        link: '/news'
      }
    ]
  }
];