export interface Job {
  _id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  country: string;
  jobType: string;
  salary: string;
  requirements: string[];
  postedAt: string;
  applicationDeadline: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface JobsResponse {
  success: boolean;
  jobs: Job[];
}