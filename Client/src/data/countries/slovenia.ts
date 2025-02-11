import type { Country } from './types';

export const slovenia: Country = {
  name: 'Slovenia',
  description: 'Experience high-quality education in a country that perfectly blends Central European charm with Mediterranean lifestyle, offering affordable education and excellent quality of life.',
  image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '40+',
    students: '12,000+',
    programs: '200+',
  },
  features: ['Green Country', 'Safe Environment', 'Growing Economy', 'Central European Location'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State-funded institutions offering free education for EU students and competitive fees for non-EU students.',
      percentage: 60
    },
    privateUniversities: {
      description: 'Independent institutions offering specialized programs with more flexible curricula.',
      percentage: 25
    },
    vocationalColleges: {
      description: 'Professional higher education institutions focused on practical skills.',
      percentage: 15
    }
  },
  universities: {
    general: [
      {
        name: 'University of Ljubljana',
        fees: 'Bachelor\'s: €2,000 - €11,000/year\nMaster\'s: €2,000 - €15,000/year'
      },
      {
        name: 'University of Maribor',
        fees: 'Bachelor\'s: €2,000 - €5,000/year\nMaster\'s: €2,000 - €6,000/year'
      },
      {
        name: 'University of Primorska',
        fees: 'Bachelor\'s: €2,000 - €4,000/year\nMaster\'s: €2,000 - €5,000/year'
      }
    ],
    business: [
      {
        name: 'IEDC Bled School of Management',
        fees: 'MBA: €25,000/program'
      },
      {
        name: 'GEA College',
        fees: 'Bachelor\'s in Entrepreneurship: €2,500/year'
      }
    ],
    technology: [
      {
        name: 'Faculty of Information Studies',
        fees: 'Bachelor\'s: €2,000 - €3,000/year'
      },
      {
        name: 'Jožef Stefan International Postgraduate School',
        fees: 'Master\'s: €3,000 - €4,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'Secondary school certificate',
      'Academic transcripts',
      'Language proficiency certificates',
      'Motivation letter',
      'CV/Resume',
      'Passport copy',
      'Birth certificate',
      'Health insurance proof',
      'Document translations'
    ],
    languageRequirements: {
      english: 'B2 level for English-taught programs',
      slovenian: 'B2 level for Slovenian-taught programs',
      doctoral: 'C1 level in program language'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'Acceptance letter from university',
      'Proof of sufficient funds (€484.88/month)',
      'Health insurance',
      'Criminal record certificate',
      'Proof of accommodation',
      'Visa application form',
      'Biometric photo'
    ],
    steps: [
      'Get university acceptance',
      'Submit eVŠ online application',
      'Apply for visa/residence permit',
      'Submit required documents',
      'Wait for processing',
      'Register residence within 3 days of arrival'
    ]
  },
  costOfLiving: {
    range: '€500 - €800',
    period: 'per month',
    note: 'Student dorms: €120-250/month, Private rooms: €150-350/month'
  },
  scholarships: {
    available: true,
    types: [
      'Public Scholarship Fund',
      'Bilateral Agreement Scholarships',
      'University Merit Scholarships',
      'Erasmus+ Funding',
      'Research Grants',
      'Doctoral Research Support'
    ]
  }
};