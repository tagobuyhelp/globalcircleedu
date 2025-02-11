import type { Country } from './types';

export const malta: Country = {
  name: 'Malta',
  description: 'Study in one of the safest countries in the world while enjoying Mediterranean lifestyle and high-quality education with affordable tuition fees.',
  image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '15+',
    students: '10,000+',
    programs: '200+',
  },
  features: ['Safest Country', 'English-speaking', 'Mediterranean Lifestyle', 'Affordable Education'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State-funded institutions like the University of Malta offering comprehensive programs.',
      percentage: 40
    },
    privateUniversities: {
      description: 'International institutions offering specialized programs with English-taught courses.',
      percentage: 35
    },
    higherEducationInstitutes: {
      description: 'Specialized institutes focusing on specific fields like tourism, business, and technology.',
      percentage: 25
    }
  },
  universities: {
    medical: [
      {
        name: 'University of Malta Medical School',
        fees: 'Medicine: €6,000/year\nPharmacy: €5,000/year'
      },
      {
        name: 'Barts and The London School of Medicine',
        fees: 'Medicine: €6,500/year'
      }
    ],
    general: [
      {
        name: 'University of Malta',
        fees: 'Bachelor\'s: €7,500-24,000/year\nMaster\'s: €8,000-25,000/year'
      },
      {
        name: 'American University of Malta',
        fees: 'Bachelor\'s: €8,000-20,000/year\nMaster\'s: €9,000-22,000/year'
      }
    ],
    business: [
      {
        name: 'London School of Commerce Malta',
        fees: 'MBA: €4,500/program\nBusiness Programs: €3,500-5,000/year'
      },
      {
        name: 'Global College Malta',
        fees: 'Business Programs: €4,000-6,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'Academic transcripts',
      'Letters of recommendation',
      'English language proficiency proof',
      'Personal statement',
      'CV/Resume',
      'Copy of passport',
      'Passport-size photographs',
      'Application fee payment receipt'
    ],
    languageRequirements: {
      english: 'IELTS 6.0 or TOEFL 80',
      undergraduate: 'High school certificate with good grades',
      postgraduate: 'Bachelor\'s degree in relevant field'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'University acceptance letter',
      'Proof of financial means',
      'Health insurance (€150/year)',
      'Accommodation proof',
      'Police clearance certificate',
      'Visa application form',
      'Temporary residence permit (€200)'
    ],
    steps: [
      'Receive university acceptance',
      'Apply for visa at Maltese embassy',
      'Submit required documents',
      'Pay visa fees',
      'Wait for processing',
      'Obtain residence permit within 3 months of arrival'
    ]
  },
  costOfLiving: {
    range: '€800 - €1,200',
    period: 'per month',
    note: 'Accommodation: €400-600/month, Food: €300/month, Transport: €30/month'
  },
  scholarships: {
    available: true,
    types: [
      'Malta Government Scholarships',
      'University Merit Scholarships',
      'Malta Sports Scholarships',
      'Endeavour Scholarships',
      'Research Grants',
      'Department-specific Awards'
    ]
  }
};