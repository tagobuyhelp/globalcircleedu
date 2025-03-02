import type { Country } from './types';

export const estonia: Country = {
  name: 'Estonia',
  description: 'Experience world-class digital education in one of Europe\'s most innovative and tech-savvy countries, offering high-quality programs with reasonable tuition fees.',
  image: 'https://res.cloudinary.com/dttifrbaa/image/upload/v1740639735/download_3_n3mgwo.jpg',
  stats: {
    universities: '35+',
    students: '8,000+',
    programs: '150+'
  },
  features: ['Digital Society', 'Innovation Hub', 'High Tech Education', 'Affordable Living'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State-funded universities offering comprehensive programs with competitive fees.',
      percentage: 65
    },
    privateUniversities: {
      description: 'Private institutions focusing on specialized programs and business education.',
      percentage: 20
    },
    technicalInstitutes: {
      description: 'Technical schools specializing in IT, engineering, and applied sciences.',
      percentage: 15
    }
  },
  universities: {
    general: [
      {
        name: 'University of Tartu',
        fees: 'Bachelor\'s: €3,000-6,000/year\nMaster\'s: €3,500-7,000/year'
      },
      {
        name: 'Tallinn University',
        fees: 'Bachelor\'s: €2,800-5,500/year\nMaster\'s: €3,200-6,500/year'
      },
      {
        name: 'Estonian University of Life Sciences',
        fees: 'Bachelor\'s: €2,500-5,000/year\nMaster\'s: €3,000-6,000/year'
      }
    ],
    technology: [
      {
        name: 'Tallinn University of Technology',
        fees: 'IT Programs: €3,500-6,500/year\nEngineering: €3,200-6,000/year'
      },
      {
        name: 'Estonian Entrepreneurship University of Applied Sciences',
        fees: 'Technology Programs: €2,800-4,500/year'
      }
    ],
    business: [
      {
        name: 'Estonian Business School',
        fees: 'Bachelor\'s: €5,000-7,000/year\nMBA: €10,000-15,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'Secondary education certificate',
      'Academic transcripts',
      'Proof of English proficiency',
      'Motivation letter',
      'CV/Resume',
      'Copy of passport',
      'Digital ID photo',
      'Health insurance proof',
      'Bank statement'
    ],
    languageRequirements: {
      english: 'IELTS 6.0 or TOEFL 75 for Bachelor\'s\nIELTS 6.5 or TOEFL 85 for Master\'s',
      estonian: 'B2 level for Estonian-taught programs',
      doctoral: 'C1 level in program language'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'Acceptance letter',
      'Proof of sufficient funds (€4,500/year)',
      'Health insurance',
      'Accommodation proof',
      'Visa application form',
      'Biometric photo',
      'Visa fee payment receipt'
    ],
    steps: [
      'Receive university acceptance',
      'Apply for temporary residence permit',
      'Submit required documents',
      'Pay visa fees',
      'Provide biometric data',
      'Wait for processing (up to 2 months)',
      'Register residence upon arrival'
    ]
  },
  costOfLiving: {
    range: '€500 - €800',
    period: 'per month',
    note: 'Tallinn is more expensive than other cities. Student dormitories cost €100-250/month'
  },
  scholarships: {
    available: true,
    types: [
      'Dora Plus Scholarships',
      'Estonian Government Scholarships',
      'University Merit Scholarships',
      'IT Academy Scholarships',
      'Erasmus+ Funding',
      'Baltic-American Freedom Foundation Scholarships'
    ]
  }
};