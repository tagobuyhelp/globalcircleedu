export interface VisitorStats {
  basicStats: {
    totalVisitors: number;
    averageAge: number;
    maleCount: number;
    femaleCount: number;
    otherGenderCount: number;
    studentCount: number;
    workerCount: number;
    totalDocumentsUploaded: number;
    genderDistribution: {
      male: number;
      female: number;
      other: number;
    };
    visitorTypeDistribution: {
      student: number;
      worker: number;
    };
  };
  topCountries: Array<{
    _id: string;
    count: number;
  }>;
  topInterestedCourses: Array<{
    _id: string;
    count: number;
    courseName: string;
  }>;
  ageDistribution: Array<{
    _id: number;
    count: number;
  }>;
  monthlyTrends: Array<{
    _id: string;
    count: number;
  }>;
  educationLevelDistribution: Array<{
    _id: string;
    count: number;
  }>;
  preferredContactMethod: Array<{
    _id: string;
    count: number;
  }>;
  consultationBookingRate: {
    bookingRate: number;
  };
  totalUniqueCountries: number;
  totalCounts: {
    universities: number;
    courses: number;
    jobs: number;
    news: number;
  };
}