import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Building2 } from 'lucide-react';
import { Button } from '../../../ui/Button';

export const CTAButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
      <Link to="/courses">
        <Button 
          size="lg" 
          className="w-full sm:w-auto group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300"
        >
          <GraduationCap className="w-5 h-5 mr-2" />
          Browse Courses
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
      <Link to="/universities">
        <Button 
          size="lg" 
          variant="outline"
          className="w-full sm:w-auto group border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950 transform hover:scale-105 transition-all duration-300"
        >
          <Building2 className="w-5 h-5 mr-2" />
          Explore Universities
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
};