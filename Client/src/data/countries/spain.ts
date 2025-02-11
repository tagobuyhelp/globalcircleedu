import type { Country } from './types';

export const spain: Country = {
  name: 'Spain',
  description: 'Experience world-class education in Spain while immersing yourself in a rich cultural heritage and vibrant student life.',
  image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '100+',
    students: '20,000+',
    programs: '400+',
  },
  features: ['Vibrant Student Life', 'Affordable Education', 'Historic Universities'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State-funded institutions offering a wide range of programs with affordable tuition fees.',
      percentage: 70
    },
    privateUniversities: {
      description: 'Private institutions and business schools with specialized programs.',
      percentage: 20
    },
    artSchools: {
      description: 'Specialized institutions for art and design education.',
      percentage: 10
    }
  },
  universities: {
    business: [
      {
        name: 'IE Business School',
        fees: 'MBA: €72,200 - €86,000\nExecutive MBA: €99,000'
      },
      {
        name: 'ESIC Business & Marketing School',
        fees: 'International MBA: €18,000\nMaster in Digital Marketing: €10,000 - €12,000'
      }
    ],
    technology: [
      {
        name: 'Ironhack',
        fees: 'Web Development Bootcamp: €7,500\nUX/UI Design Bootcamp: €7,500'
      },
      {
        name: 'La Salle - URL',
        fees: 'Master in AI: €18,500\nMaster in Digital Marketing: €12,000'
      }
    ],
    medical: [
      {
        name: 'Universidad de Navarra',
        fees: 'Medicine: €18,000/year\nMaster in Medical Imaging: €18,000'
      },
      {
        name: 'European University of Madrid',
        fees: 'Medicine: €18,500/year\nDentistry: €15,500/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'High school diploma/transcripts',
      'Bachelor\'s degree (for Master\'s programs)',
      'Spanish/English language proficiency',
      'Passport copy',
      'Motivation letter',
      'Letters of recommendation',
      'CV/Resume',
      'Standardized test scores (if required)'
    ],
    languageRequirements: {
      spanish: 'DELE B2 for Spanish-taught programs',
      english: 'IELTS 6.5 or TOEFL 90 for English-taught programs',
      medical: 'B2 Spanish required for medical programs'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'University acceptance letter',
      'Proof of financial means',
      'Health insurance',
      'Criminal record certificate',
      'Medical certificate',
      'Visa application form'
    ],
    steps: [
      'Apply to university and receive acceptance',
      'Gather required documents',
      'Apply for student visa at Spanish embassy',
      'Wait for visa processing (3-4 weeks)',
      'Receive visa and prepare for travel'
    ]
  },
  costOfLiving: {
    range: '€700 - €1,200',
    period: 'per month',
    note: 'Madrid and Barcelona are more expensive than other cities'
  },
  scholarships: {
    available: true,
    types: [
      'Spanish Government Scholarships',
      'Regional Government Grants',
      'University-specific Scholarships',
      'Erasmus+ Funding',
      'Research Grants'
    ]
  }
};