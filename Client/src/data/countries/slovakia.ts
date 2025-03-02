import type { Country } from './types';

export const slovakia: Country = {
  name: 'Slovakia',
  description: 'Experience quality education in the heart of Europe with affordable tuition fees, rich cultural heritage, and strong emphasis on science and technology, all while enjoying a high standard of living at reasonable costs.',
  image: 'https://images.unsplash.com/photo-1589385973461-eaa7aa35b024?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '35+',
    students: '15,000+',
    programs: '250+'
  },
  features: ['Affordable Education', 'Central Location', 'Rich History', 'Growing Economy'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State-funded universities offering programs in Slovak and English at competitive rates.',
      percentage: 65
    },
    privateUniversities: {
      description: 'Private institutions with international partnerships and English-taught programs.',
      percentage: 20
    },
    specializedInstitutes: {
      description: 'Technical and specialized institutions focusing on specific fields.',
      percentage: 15
    }
  },
  universities: {
    medical: [
      {
        name: 'Comenius University Faculty of Medicine',
        fees: 'Medicine: €11,000/year\nDentistry: €11,000/year'
      },
      {
        name: 'Pavol Jozef Šafárik University in Košice',
        fees: 'Medicine: €10,500/year\nPharmacy: €9,500/year'
      },
      {
        name: 'Jessenius Faculty of Medicine',
        fees: 'Medicine: €10,800/year\nNursing: €8,500/year'
      }
    ],
    general: [
      {
        name: 'Comenius University Bratislava',
        fees: 'Bachelor\'s: €3,000-5,000/year\nMaster\'s: €3,500-6,000/year'
      },
      {
        name: 'Slovak University of Technology',
        fees: 'Bachelor\'s: €2,800-4,500/year\nMaster\'s: €3,200-5,500/year'
      },
      {
        name: 'University of Economics in Bratislava',
        fees: 'Bachelor\'s: €2,500-4,000/year\nMaster\'s: €3,000-5,000/year'
      }
    ],
    technology: [
      {
        name: 'Technical University of Košice',
        fees: 'Engineering: €4,000-6,000/year\nIT Programs: €3,500-5,500/year'
      },
      {
        name: 'Slovak University of Technology in Bratislava',
        fees: 'Technology Programs: €3,000-5,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'High school diploma with apostille',
      'Academic transcripts',
      'Language proficiency certificates',
      'Motivation letter',
      'CV/Resume',
      'Copy of passport',
      'Health certificate',
      'Birth certificate',
      'Passport photos'
    ],
    languageRequirements: {
      slovak: 'B2 level for Slovak-taught programs',
      english: 'IELTS 6.0 or TOEFL 75 for English-taught programs',
      medical: 'IELTS 6.5 or equivalent for medical programs'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'University acceptance letter',
      'Proof of accommodation',
      'Proof of sufficient funds',
      'Health insurance',
      'Criminal record certificate',
      'Visa application form',
      'Biometric photos'
    ],
    steps: [
      'Receive university acceptance',
      'Gather required documents',
      'Apply for temporary residence permit',
      'Submit documents at embassy',
      'Pay visa fees',
      'Wait for processing',
      'Register with foreign police upon arrival'
    ]
  },
  costOfLiving: {
    range: '€450 - €700',
    period: 'per month',
    note: 'Bratislava is more expensive than other cities. Student dormitories from €80/month'
  },
  scholarships: {
    available: true,
    types: [
      'National Scholarship Programme',
      'Government of Slovakia Scholarships',
      'University Merit Scholarships',
      'Erasmus+ Funding',
      'CEEPUS Scholarships',
      'Visegrad Fund Scholarships'
    ]
  }
};