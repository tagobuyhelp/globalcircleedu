import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { JourneyStep } from './JourneyStep';
import { JourneyGrid } from './JourneyGrid';

interface JourneySliderProps {
  steps: Array<{
    icon: any;
    title: string;
    description: string;
  }>;
  view: 'list' | 'grid';
}

export const JourneySlider: React.FC<JourneySliderProps> = ({ steps, view }) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Adjust items per page based on screen size
  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 3; // Desktop
    }
    return 3;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  // Update items per page on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(steps.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleSteps = steps.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <button
        onClick={prevPage}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextPage}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Steps Container */}
      <div className="overflow-hidden mx-8">
        <div
          className={cn(
            "transition-transform duration-500 ease-in-out",
            view === 'grid' ? [
              'grid gap-6',
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            ] : 'space-y-6'
          )}
        >
          {visibleSteps.map((step, index) => {
            const stepNumber = currentPage * itemsPerPage + index + 1;
            return view === 'grid' ? (
              <JourneyGrid
                key={stepNumber}
                icon={step.icon}
                title={step.title}
                description={step.description}
                step={stepNumber}
              />
            ) : (
              <JourneyStep
                key={stepNumber}
                icon={step.icon}
                title={step.title}
                description={step.description}
                step={stepNumber}
              />
            );
          })}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              index === currentPage
                ? "bg-blue-600 w-4"
                : "bg-gray-300 dark:bg-gray-600"
            )}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};