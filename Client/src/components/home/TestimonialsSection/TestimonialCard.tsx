import React from 'react';
import { Play, Star } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface TestimonialCardProps {
  name: string;
  role: string;
  testimonial: string;
  rating: number;
  image: string;
  videoUrl?: string;
  isActive?: boolean;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  testimonial,
  rating,
  image,
  videoUrl,
  isActive = false,
}) => {
  return (
    <div 
      className={cn(
        "relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-500",
        "border border-gray-200 dark:border-gray-700",
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-50"
      )}
    >
      <div className="flex items-start space-x-4">
        <div className="relative flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {videoUrl && (
            <button 
              className="absolute -right-2 -bottom-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              onClick={() => window.open(videoUrl, '_blank')}
            >
              <Play className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-lg">{name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
          <div className="flex items-center mt-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < rating 
                    ? "text-yellow-400 fill-yellow-400" 
                    : "text-gray-300 dark:text-gray-600"
                )}
              />
            ))}
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            "{testimonial}"
          </p>
        </div>
      </div>
    </div>
  );
};