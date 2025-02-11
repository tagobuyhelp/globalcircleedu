import type { Country } from './types';

export const ireland: Country = {
  name: 'Ireland',
  description: 'Experience high-quality education in an English-speaking environment with excellent career opportunities and a rich cultural heritage.',
  image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '50+',
    students: '30,000+',
    programs: '450+',
  },
  features: ['English-Speaking', 'Tech Industry Hub', 'Post-Study Work Visa', 'Safe Environment'],
  academicInstitutions: {
    publicUniversities: {
      description: 'Public universities offer a wide range of programs with tuition fees ranging from €9,000 to €25,000 per year for international students.',
      percentage: 60
    },
    privateUniversities: {
      description: 'Private institutions offering specialized programs, particularly in business, medicine, and technology.',
      percentage: 30
    },
    specializedColleges: {
      description: 'Focused institutions offering specific professional and technical programs.',
      percentage: 10
    }
  },
  universities: {
    general: [
      {
        name: 'University College Dublin (UCD)',
        fees: 'Undergraduate: €17,500 - €26,000/year\nPostgraduate: €19,000 - €30,000/year'
      },
      {
        name: 'Trinity College Dublin (TCD)',
        fees: 'Undergraduate: €15,000 - €25,000/year\nPostgraduate: €18,000 - €32,000/year'
      },
      {
        name: 'University College Cork (UCC)',
        fees: 'Undergraduate: €14,000 - €22,000/year\nPostgraduate: €17,000 - €27,000/year'
      }
    ],
    business: [
      {
        name: 'Dublin City University (DCU)',
        fees: 'Undergraduate: €14,000 - €18,000/year\nPostgraduate: €15,000 - €23,000/year'
      },
      {
        name: 'National University of Ireland Galway (NUIG)',
        fees: 'Undergraduate: €14,000 - €20,000/year\nPostgraduate: €16,000 - €24,000/year'
      }
    ],
    medical: [
      {
        name: 'Royal College of Surgeons in Ireland (RCSI)',
        fees: 'Medicine: €40,000 - €55,000/year\nPostgraduate: €15,000 - €50,000/year'
      }
    ],
    technology: [
      {
        name: 'Technological University Dublin (TU Dublin)',
        fees: 'Undergraduate: €12,000 - €18,000/year\nPostgraduate: €13,000 - €22,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'Completed application form',
      'Official transcripts and academic records',
      'Proof of English proficiency',
      'Personal statement/motivation letter',
      'CV/resume (for master\'s and doctoral programs)',
      'Letters of recommendation',
      'Copy of passport'
    ],
    languageRequirements: {
      english: 'IELTS 6.5 or TOEFL 90',
      undergraduate: 'Secondary education equivalent to Irish Leaving Certificate',
      postgraduate: 'Relevant bachelor\'s degree'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'Letter of acceptance from Irish university',
      'Proof of sufficient funds (€7,000 per year)',
      'Health insurance',
      'Proof of English proficiency',
      'Visa application form'
    ],
    steps: [
      'Receive university acceptance',
      'Gather required documents',
      'Submit online visa application',
      'Pay visa fee',
      'Wait for processing',
      'Receive visa decision'
    ]
  },
  costOfLiving: {
    range: '€800 - €2,000',
    period: 'per month',
    note: 'Dublin is significantly more expensive than other cities'
  },
  scholarships: {
    available: true,
    types: [
      'Government of Ireland Scholarships',
      'University Merit Scholarships',
      'Research Council Scholarships',
      'Department-specific Scholarships',
      'Sport and Cultural Scholarships'
    ]
  }
};