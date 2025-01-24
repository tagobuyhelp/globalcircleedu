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
  score: {
    gpa: number;
    percentage: number;
  };
  yearOfReceiving?: number;
}

export interface Professional {
  companyName: string;
  jobTitle: string;
  yearsOfExperience: number;
}

export interface Document {
  name: string;
  fileURL: string | null;
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
  user?: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  visitorType?: 'Student' | 'Worker';
  interestedCourse?: any;
  interestedJob?: any;
  country?: string;
  address: string | Address; // Can be stringified JSON
  education: string | Education; // Can be stringified JSON
  professional: string | Professional; // Can be stringified JSON
  documents: Documents;
  profilePicture?: string | null;
  preferredContact?: 'Phone' | 'Email' | 'WhatsApp';
  gender?: string;
  age?: number;
  isConsultationBooked: boolean;
  notes?: string;
  preferredConsultationDate?: string;
  referralSource?: string;
  createdAt: string;
  updatedAt: string;
}