import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { courseApi } from '../../features/courses/api/courseApi';
import { jobApi } from '../../features/jobs/api/jobApi';
import { universityApi } from '../../features/universities/api/universityApi';
import type { Course } from '../../features/courses/types/course';
import type { Job } from '../../features/jobs/types/job';
import type { University } from '../../features/universities/types/university';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const [coursesData, jobsData, universitiesData] = await Promise.all([
          courseApi.getAll(),
          jobApi.getAll(),
          universityApi.getAll()
        ]);

        // Filter results based on search query
        const filteredCourses = coursesData.filter(course => 
          course.name.toLowerCase().includes(query.toLowerCase()) ||
          course.description?.toLowerCase().includes(query.toLowerCase())
        );

        const filteredJobs = jobsData.filter(job =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase())
        );

        const filteredUniversities = universitiesData.universities.filter(uni =>
          uni.name.toLowerCase().includes(query.toLowerCase()) ||
          uni.location.toLowerCase().includes(query.toLowerCase())
        );

        setCourses(filteredCourses);
        setJobs(filteredJobs);
        setUniversities(filteredUniversities);
      } catch (err) {
        console.error('Error fetching search results:', err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) return <LoadingSpinner message="Searching..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">Search Results for "{query}"</h1>

      {courses.length === 0 && jobs.length === 0 && universities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No results found for your search</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Courses Section */}
          {courses.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                  <Link key={course._id} to={`/courses/${course._id}`}>
                    <Card className="p-4 hover:shadow-lg transition-shadow">
                      <h3 className="font-medium">{course.name}</h3>
                      <p className="text-sm text-gray-600 mt-2">
                        {course.program.university.name}
                      </p>
                      <div className="mt-2 text-sm">
                        <span className="text-blue-600">${course.fee.toLocaleString()}/yr</span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Universities Section */}
          {universities.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Universities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {universities.map(university => (
                  <Link key={university._id} to={`/universities/${university._id}`}>
                    <Card className="p-4 hover:shadow-lg transition-shadow">
                      <h3 className="font-medium">{university.name}</h3>
                      <p className="text-sm text-gray-600 mt-2">
                        {university.location}, {university.country}
                      </p>
                      <div className="mt-2 text-sm">
                        <span className="text-blue-600">Rank #{university.ranking}</span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Jobs Section */}
          {jobs.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Jobs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map(job => (
                  <Link key={job._id} to={`/jobs/${job._id}`}>
                    <Card className="p-4 hover:shadow-lg transition-shadow">
                      <h3 className="font-medium">{job.title}</h3>
                      <p className="text-sm text-gray-600 mt-2">
                        {job.company} • {job.location}
                      </p>
                      <div className="mt-2 text-sm">
                        <span className="text-blue-600">{job.salary}</span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};