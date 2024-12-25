import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Users, BookOpen, School, FileText } from 'lucide-react';
import { visitorStatsApi } from '../../features/visitors/api/visitorStatsApi';
import type { VisitorStats } from '../../features/visitors/types/stats';

export const AdminDashboard = () => {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await visitorStatsApi.getStats();
        setStats(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!stats) return null;

  const { basicStats, totalCounts } = stats;

  const dashboardStats = [
    { 
      title: 'Total Visitors', 
      value: basicStats.totalVisitors, 
      icon: Users, 
      color: 'blue',
      description: `${basicStats.studentCount} students, ${basicStats.workerCount} workers`
    },
    { 
      title: 'Active Courses', 
      value: totalCounts.courses, 
      icon: BookOpen, 
      color: 'green',
      description: 'Available courses'
    },
    { 
      title: 'Universities', 
      value: totalCounts.universities, 
      icon: School, 
      color: 'purple',
      description: 'Partner institutions'
    },
    { 
      title: 'Applications', 
      value: basicStats.totalVisitors, 
      icon: FileText, 
      color: 'orange',
      description: 'Total applications'
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  {stat.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.description}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
          <div className="space-y-4">
            {stats.topInterestedCourses.map((course) => (
              <div key={course._id} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {course.courseName}
                </span>
                <span className="font-medium">{course.count} applications</span>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Top Countries</h2>
          <div className="space-y-4">
            {stats.topCountries.map((country) => (
              <div key={country._id} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {country._id}
                </span>
                <span className="font-medium">{country.count} visitors</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};