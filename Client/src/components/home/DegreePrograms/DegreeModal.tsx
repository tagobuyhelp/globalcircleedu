import React from 'react';
import { X, CheckCircle, BookOpen, Users, Briefcase } from 'lucide-react';
import { Button } from '../../ui/Button';

interface DegreeModalProps {
  program: any;
  onClose: () => void;
}

export const DegreeModal: React.FC<DegreeModalProps> = ({ program, onClose }) => {
  const content = program.content[program.type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8">
          <div className={`inline-flex p-3 rounded-lg bg-${program.color}/10 mb-4`}>
            <program.icon className={`w-6 h-6 text-${program.color}`} />
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold mb-2">{content.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
            {content.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                Key Benefits
              </h3>
              <ul className="space-y-3">
                {content.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                Popular Fields of Study
              </h3>
              <ul className="space-y-2">
                {content.fields.map((field: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">{field}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {content.careers && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-orange-500" />
                Career Opportunities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {content.careers.map((career: string, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex items-center"
                  >
                    <Briefcase className="w-5 h-5 mr-2 text-orange-500" />
                    <span className="text-gray-600 dark:text-gray-400">{career}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};