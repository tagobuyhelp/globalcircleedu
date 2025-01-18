export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Education {
  level: 'Intermediate' | 'Bachelor' | 'Masters';
  institution: string;
  fieldOfStudy: string;
  degreeName: string;
  courseType: string;
  modeOfStudy: string;
  mediumOfEducation: string;
  division: string;
  score: {
    percentage: number;
    gpa: number;
  };
  yearOfReceiving: number;
}

export interface Professional {
  companyName: string;
  jobTitle: string;
  yearsOfExperience: number;
}

export interface Document {
  name: string;
  fileURL: string;
  documentType: string;
}

export interface Documents {
  identityDocument: Document;
  transcript: Document;
  workExperience: Document;
  languageTests: Document;
}

export interface Visitor {
  _id: string;
  user: string; // User ID reference
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  visitorType: 'Student' | 'Worker';
  interestedCourse?: string; // Course ID reference
  interestedJob?: string; // Job ID reference
  country: string;
  address: Address;
  education: Education;
  professional: Professional;
  documents: Documents;
  profilePicture: string;
  preferredContact: 'Phone' | 'Email' | 'WhatsApp';
  gender: 'Male' | 'Female' | 'Non-Binary' | 'Other';
  age: number;
  isConsultationBooked: boolean;
  notes: string;
  preferredConsultationDate: string | null;
  referralSource: string;
  createdAt: string;
  updatedAt: string;
}