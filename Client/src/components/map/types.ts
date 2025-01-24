export interface EducationStats {
  universities: number;
  students: number;
  courses: number;
  jobs: number;
}

export interface MapLocation {
  id: string;
  name: string;
  coordinates: [number, number];
  stats: EducationStats;
}

export interface CountryData {
  id: string;
  name: string;
  path: string;
  color: string;
  stats?: EducationStats;
}

export interface LocationTooltipProps {
  location: MapLocation;
}