import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import type { University } from '../types/university';

interface UniversityCampusProps {
  university: University;
}

export const UniversityCampus: React.FC<UniversityCampusProps> = ({ university }) => {
  return (
    <>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Campus Information</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div className="ml-3">
              <h4 className="font-medium">Main Campus</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {university.location}, {university.country}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-blue-600" />
            <a href="tel:+1234567890" className="ml-3 text-sm text-gray-600 hover:text-blue-600">
              +1 (234) 567-890
            </a>
          </div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-blue-600" />
            <a href="mailto:admissions@university.edu" className="ml-3 text-sm text-gray-600 hover:text-blue-600">
              admissions@university.edu
            </a>
          </div>
          <div className="flex items-center">
            <Globe className="w-5 h-5 text-blue-600" />
            <a href="#" className="ml-3 text-sm text-gray-600 hover:text-blue-600">
              www.university.edu
            </a>
          </div>
        </div>
        <Button className="w-full mt-6">Schedule Campus Tour</Button>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Campus Gallery</h3>
        <div className="grid grid-cols-2 gap-2">
          {university.campusPhotos?.slice(0, 4).map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`${university.name} campus ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg"
            />
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          View All Photos
        </Button>
      </Card>
    </>
  );
};