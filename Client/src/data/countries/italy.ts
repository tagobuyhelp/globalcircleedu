import type { Country } from './types';

export const italy: Country = {
  name: 'Italy',
  description: 'Study in the cradle of Western civilization and culture with world-renowned universities and rich academic traditions.',
  image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '90+',
    students: '28,000+',
    programs: '550+',
  },
  features: ['Historic Universities', 'Art & Culture', 'Research Excellence'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State-funded universities offering comprehensive programs at affordable rates.',
      percentage: 70
    },
    privateUniversities: {
      description: 'Private institutions offering specialized programs with more personalized attention.',
      percentage: 20
    },
    specializedInstitutes: {
      description: 'Focused on specific fields like art, design, fashion, and culinary arts.',
      percentage: 10
    }
  },
  universities: {
    medical: [
      {
        name: 'La Sapienza',
        fees: 'Medicine: €3,000 - €5,000/year',
        imatScore: 73.8
      },
      {
        name: 'Milano Statale',
        fees: 'Medicine: €3,500 - €5,500/year',
        imatScore: 75.3
      },
      {
        name: 'University of Pavia',
        fees: 'Medicine: €3,000 - €4,500/year',
        imatScore: 71.5
      },
      {
        name: 'University of Bologna',
        fees: 'Medicine: €3,200 - €5,000/year',
        imatScore: 74.5
      },
      {
        name: 'University of Padova',
        fees: 'Medicine: €3,000 - €4,800/year',
        imatScore: 71.6
      }
    ],
    dental: [
      {
        name: 'Siena',
        fees: 'Dentistry: €3,500 - €5,500/year',
        imatScore: 69.3
      },
      {
        name: 'La Sapienza Dentistry',
        fees: 'Dentistry: €3,500 - €5,500/year',
        imatScore: 73.1
      }
    ],
    general: [
      {
        name: 'University of Turin',
        fees: '€2,500 - €4,500/year',
        imatScore: 70.8
      },
      {
        name: 'University of Milan-Bicocca',
        fees: '€2,800 - €4,800/year',
        imatScore: 72.7
      },
      {
        name: 'Federico II Naples',
        fees: '€2,500 - €4,000/year',
        imatScore: 68.1
      },
      {
        name: 'University of Parma',
        fees: '€2,000 - €4,000/year',
        imatScore: 59.1
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'Academic transcripts',
      'High School Diploma (12 years of education required)',
      'IMAT scores for medical programs',
      'Language proficiency certificates',
      'Passport copy',
      'Motivation letter',
      'CV/Resume',
      'Declaration of Value (DOV)',
      'Pre-enrollment on UNIVERSITALY portal'
    ],
    languageRequirements: {
      english: 'IELTS 6.0 or TOEFL 85+',
      italian: 'CELI or B2 equivalent for Italian-taught programs',
      medical: 'English B2 for English-taught medical programs'
    }
  },
  visaRequirements: {
    documents: [
      'Entry visa application form',
      'Recent passport-size photograph',
      'Valid passport',
      'University enrollment/pre-enrollment proof',
      'Accommodation proof',
      'Financial means proof (€467.65/month)',
      'Health insurance',
      'Return travel proof',
      'Birth certificate (for minors)',
      'Parental consent (for minors)'
    ],
    steps: [
      'Apply and get university acceptance',
      'Pre-enroll on UNIVERSITALY portal',
      'Schedule visa appointment at VFS Global',
      'Submit documents at VFS Global',
      'Attend mandatory video interview',
      'Wait for processing (up to 90 days)',
      'Receive visa decision'
    ]
  },
  costOfLiving: {
    range: '€700 - €1,500',
    period: 'per month',
    note: 'Varies significantly between northern and southern cities'
  },
  scholarships: {
    available: true,
    types: [
      'Italian Government Scholarships',
      'Regional Scholarships',
      'University Merit Awards',
      'EU Student Support',
      'Research Fellowships',
      'Need-based grants (€2,482 - €6,158)'
    ]
  }
};