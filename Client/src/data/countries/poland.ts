import type { Country } from './types';

export const poland: Country = {
  name: 'Poland',
  description: 'High-quality education at competitive prices in Central Europe with a wide range of English-taught programs.',
  image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '120+',
    students: '35,000+',
    programs: '600+',
  },
  features: ['Affordable Tuition', 'Rich History', 'Modern Facilities'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State-funded institutions offering comprehensive programs at affordable rates.',
      percentage: 65
    },
    technicalUniversities: {
      description: 'Specialized in engineering, technology, and applied sciences.',
      percentage: 25
    },
    medicalUniversities: {
      description: 'Dedicated to medical education and healthcare programs.',
      percentage: 10
    }
  },
  universities: {
    general: [
      {
        name: 'University of Warsaw',
        fees: 'Business, IT, Social Sciences, Law: €2,000 - €4,500/year'
      },
      {
        name: 'Jagiellonian University',
        fees: 'Medicine, Business, Law, IT, Arts: €3,000 - €12,000/year'
      }
    ],
    technology: [
      {
        name: 'Warsaw University of Technology',
        fees: 'Engineering, Computer Science, Business: €2,500 - €4,500/year'
      },
      {
        name: 'AGH University of Science and Technology',
        fees: 'Engineering, IT, Management: €2,000 - €4,000/year'
      }
    ],
    medical: [
      {
        name: 'Medical University of Warsaw',
        fees: 'Medicine, Dentistry, Pharmacy: €12,000 - €14,000/year'
      }
    ],
    business: [
      {
        name: 'University of Economics in Katowice',
        fees: 'Business, Economics, Management: €1,500 - €3,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'High School Certificate (for Bachelor\'s)',
      'Bachelor\'s degree (for Master\'s)',
      'English language proficiency test',
      'Passport copy',
      'Application form',
      'Statement of purpose',
      'CV and Motivation Letter',
      'Reference letters'
    ],
    languageRequirements: {
      english: 'IELTS 6.0 or TOEFL 80',
      polish: 'B2 level for Polish-taught programs',
      medical: 'B2 English for medical programs'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'Letter of Acceptance',
      'Proof of tuition fee payment',
      'Proof of sufficient funds',
      'Health insurance',
      'Completed visa application form',
      'Accommodation proof',
      'Flight itinerary'
    ],
    steps: [
      'Apply to university and get acceptance',
      'Gather required documents',
      'Submit visa application',
      'Wait for processing (4-6 weeks)',
      'Receive visa decision'
    ]
  },
  costOfLiving: {
    range: '€400 - €800',
    period: 'per month',
    note: 'Major cities like Warsaw and Krakow are more expensive than smaller cities'
  },
  scholarships: {
    available: true,
    types: [
      'Polish Government Scholarships',
      'University Merit Scholarships',
      'Erasmus+ Scholarships',
      'Research Grants',
      'Department-specific Scholarships'
    ]
  }
};