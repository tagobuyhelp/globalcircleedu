import React from 'react';
import { CourseCard } from './CourseCard';
import { ViewToggle } from '../../../components/ui/ViewToggle';
import { Button } from '../../../components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Course } from '../types/course';

interface CourseListProps {
  courses: Course[];
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
  onApply: (courseId: string) => void;
}

export const CourseList: React.FC<CourseListProps> = ({ 
  courses, 
  view,
  onViewChange,
  onApply 
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6; // Show 6 items per page (3 rows of 2 in grid view)
  
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = courses.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <ViewToggle view={view} onViewChange={onViewChange} />
      </div>
      
      <div className={
        view === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 gap-6"
          : "space-y-4"
      }>
        {currentCourses.map((course) => (
          <CourseCard 
            key={course._id} 
            course={course} 
            onAddInterest={onApply}
            view={view}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handlePageChange(page)}
              className="min-w-[2.5rem]"
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};