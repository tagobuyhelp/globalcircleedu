import type { Country } from './types';

export const czech: Country = {
  name: 'Czech Republic',
  description: 'Experience high-quality education in the heart of Europe with affordable tuition fees and rich academic traditions.',
  image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '70+',
    students: '50,000+',
    programs: '1000+',
  },
  features: ['Affordable Education', 'Rich Academic Heritage', 'High Living Standards', 'Central European Location'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State-funded institutions offering free education in Czech language and competitive fees for English programs.',
      percentage: 65
    },
    technicalUniversities: {
      description: 'Specialized in engineering, technology, and applied sciences with strong industry connections.',
      percentage: 25
    },
    privateInstitutions: {
      description: 'Offering specialized programs with more flexible curricula and personalized attention.',
      percentage: 10
    }
  },
  universities: {
    general: [
      {
        name: 'Charles University',
        fees: 'Czech Programs: Free\nEnglish Programs: €3,000 - €12,000/year'
      },
      {
        name: 'Masaryk University',
        fees: '€4,000 - €15,000/year'
      },
      {
        name: 'Czech Technical University in Prague',
        fees: '€4,000 - €6,000/year'
      },
      {
        name: 'University of Economics, Prague',
        fees: 'From €5,000/year'
      }
    ],
    medical: [
      {
        name: 'First Faculty of Medicine, Charles University',
        fees: 'Medicine: €21,000/year\nDentistry: €21,000/year'
      },
      {
        name: 'Second Faculty of Medicine, Charles University',
        fees: 'Medicine: €19,400/year'
      },
      {
        name: 'Faculty of Medicine, Masaryk University',
        fees: 'Medicine: €16,000/year'
      },
      {
        name: 'Faculty of Medicine, Palacky University',
        fees: 'Medicine: €12,500/year'
      },
      {
        name: 'Faculty of Medicine in Ostrava',
        fees: 'Medicine: €11,000/year'
      }
    ],
    business: [
      {
        name: 'Prague University of Economics and Business',
        fees: 'Bachelor\'s: €5,000/year\nMaster\'s: €6,000/year'
      },
      {
        name: 'NEWTON University',
        fees: 'Bachelor\'s: €4,000/year'
      },
      {
        name: 'University of New York in Prague',
        fees: 'Bachelor\'s: €8,000 - €10,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'High school diploma with nostrification',
      'Academic transcripts',
      'Language proficiency certificates',
      'Motivation letter',
      'CV/Resume',
      'Passport copy',
      'Health certificate',
      'IMAT scores (for medical programs)',
      'Portfolio (for art programs)'
    ],
    languageRequirements: {
      czech: 'B2 level for Czech-taught programs',
      english: 'IELTS 6.0 or TOEFL 80 for English-taught programs',
      medical: 'B2 English for medical programs'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'University acceptance letter',
      'Proof of accommodation',
      'Proof of funds (€3,800/year)',
      'Health insurance',
      'Criminal record certificate',
      'Visa application form',
      'Passport photos'
    ],
    steps: [
      'Get university acceptance',
      'Apply for visa at Czech embassy',
      'Submit required documents',
      'Attend mandatory video interview',
      'Wait for processing (up to 90 days)',
      'Register with Foreign Police within 3 days of arrival'
    ]
  },
  costOfLiving: {
    range: '€550 - €800',
    period: 'per month',
    note: 'Prague and Brno are more expensive than other cities. Dormitories cost €100-150/month.'
  },
  scholarships: {
    available: true,
    types: [
      'Government scholarships for specific countries',
      'Erasmus+ scholarships',
      'University merit scholarships',
      'CEEPUS scholarships',
      'Visegrad Fund scholarships',
      'Need-based grants (€2,482 - €6,158)'
    ]
  }
};