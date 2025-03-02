import type { Country } from './types';

export const greece: Country = {
  name: 'Greece',
  description: 'Experience world-class education in the cradle of Western civilization, offering high-quality programs, rich cultural heritage, and excellent Mediterranean lifestyle at competitive costs.',
  image: 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '40+',
    students: '15,000+',
    programs: '300+'
  },
  features: ['Rich Academic Heritage', 'Affordable Education', 'Mediterranean Lifestyle', 'Cultural Experience'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State-funded universities offering comprehensive programs at very competitive rates.',
      percentage: 65
    },
    privateUniversities: {
      description: 'Private institutions offering specialized programs with modern facilities.',
      percentage: 20
    },
    technicalInstitutes: {
      description: 'Specialized institutions focusing on technical and applied sciences.',
      percentage: 15
    }
  },
  universities: {
    general: [
      {
        name: 'National and Kapodistrian University of Athens',
        fees: 'Bachelor\'s: €3,000-7,000/year\nMaster\'s: €4,000-8,000/year'
      },
      {
        name: 'Aristotle University of Thessaloniki',
        fees: 'Bachelor\'s: €2,500-6,000/year\nMaster\'s: €3,500-7,000/year'
      },
      {
        name: 'University of Patras',
        fees: 'Bachelor\'s: €2,800-5,500/year\nMaster\'s: €3,200-6,500/year'
      }
    ],
    medical: [
      {
        name: 'Medical School of Athens',
        fees: 'Medicine: €9,000/year\nDentistry: €8,500/year'
      },
      {
        name: 'Medical School of Thessaloniki',
        fees: 'Medicine: €8,500/year\nPharmacy: €7,500/year'
      }
    ],
    technology: [
      {
        name: 'National Technical University of Athens',
        fees: 'Engineering: €4,000-6,000/year\nIT Programs: €3,500-5,500/year'
      },
      {
        name: 'Athens University of Economics and Business',
        fees: 'Business & Tech: €3,500-5,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'High school diploma or equivalent',
      'Academic transcripts with official translation',
      'Language proficiency certificates',
      'Passport copy',
      'Motivation letter',
      'CV/Resume',
      'Birth certificate',
      'Health insurance proof',
      'Passport photos'
    ],
    languageRequirements: {
      greek: 'B2 level for Greek-taught programs',
      english: 'IELTS 6.0 or TOEFL 80 for English-taught programs',
      medical: 'B2 level in program language'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'University acceptance letter',
      'Proof of sufficient funds',
      'Health insurance',
      'Accommodation proof',
      'Criminal record certificate',
      'Visa application form',
      'Biometric photos'
    ],
    steps: [
      'Receive university acceptance',
      'Gather required documents',
      'Submit visa application',
      'Attend visa interview if required',
      'Wait for processing (up to 60 days)',
      'Register with local authorities upon arrival'
    ]
  },
  costOfLiving: {
    range: '€600 - €900',
    period: 'per month',
    note: 'Athens and islands are more expensive than other cities. Student housing from €250/month'
  },
  scholarships: {
    available: true,
    types: [
      'Greek State Scholarships (IKY)',
      'Erasmus+ Scholarships',
      'University Merit Scholarships',
      'EU Student Support',
      'Research Grants',
      'Cultural Exchange Programs'
    ]
  }
};