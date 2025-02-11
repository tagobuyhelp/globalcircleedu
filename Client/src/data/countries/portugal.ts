import type { Country } from './types';

export const portugal: Country = {
  name: 'Portugal',
  description: 'Quality education at affordable costs in a welcoming environment with a growing focus on international programs.',
  image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '80+',
    students: '15,000+',
    programs: '300+',
  },
  features: ['Low Cost of Living', 'High Quality of Life', 'Growing Tech Hub'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State-funded institutions offering high-quality education at very affordable rates.',
      percentage: 65
    },
    privateUniversities: {
      description: 'Private institutions offering specialized programs with more flexible curricula.',
      percentage: 25
    },
    specializedSchools: {
      description: 'Focused institutions offering programs in specific fields.',
      percentage: 10
    }
  },
  universities: {
    business: [
      {
        name: 'Católica Lisbon School of Business and Economics',
        fees: 'Bachelor\'s: €7,000 - €12,000/year\nMaster\'s: €12,000/year'
      },
      {
        name: 'Nova School of Business and Economics',
        fees: 'Bachelor\'s: €7,500/year\nMaster\'s: €9,500/year'
      }
    ],
    technology: [
      {
        name: 'Instituto Superior Técnico',
        fees: 'Bachelor\'s: €3,000/year\nMaster\'s: €4,000/year'
      },
      {
        name: 'University of Porto - Faculty of Engineering',
        fees: 'Bachelor\'s: €2,500/year\nMaster\'s: €3,500/year'
      }
    ],
    medical: [
      {
        name: 'University of Lisbon - Faculty of Medicine',
        fees: 'Medicine: €7,000/year\nPostgraduate: €4,500/year'
      },
      {
        name: 'University of Porto - Faculty of Medicine',
        fees: 'Medicine: €7,000/year\nMedical Sciences: €4,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'High school diploma/transcripts',
      'Bachelor\'s degree (for Master\'s programs)',
      'English/Portuguese language proficiency',
      'Passport copy',
      'Motivation letter',
      'Letters of recommendation',
      'CV/Resume',
      'Standardized test scores (if required)'
    ],
    languageRequirements: {
      portuguese: 'B2 level for Portuguese-taught programs',
      english: 'IELTS 6.0 or TOEFL 80 for English-taught programs',
      medical: 'B2 Portuguese required for medical programs'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'University acceptance letter',
      'Proof of financial means',
      'Health insurance',
      'Criminal record certificate',
      'Visa application form'
    ],
    steps: [
      'Receive university acceptance',
      'Gather required documents',
      'Apply for student visa',
      'Wait for processing (4-6 weeks)',
      'Receive visa and prepare for travel'
    ]
  },
  costOfLiving: {
    range: '€600 - €900',
    period: 'per month',
    note: 'Lisbon and Porto are more expensive than other cities'
  },
  scholarships: {
    available: true,
    types: [
      'Portuguese Government Scholarships',
      'Erasmus+ Scholarships',
      'University Merit Scholarships',
      'Research Grants',
      'Regional Development Scholarships'
    ]
  }
};