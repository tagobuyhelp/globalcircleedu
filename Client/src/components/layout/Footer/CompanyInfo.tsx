import React from 'react';
import { GraduationCap } from 'lucide-react';
import { SocialLinks } from './SocialLinks';

export const CompanyInfo = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <GraduationCap className="h-8 w-8 text-[#f37021]" />
        <span className="text-2xl font-bold">Global Circle Edu</span>
      </div>
      
      <p className="text-gray-300 leading-relaxed">
        Your trusted partner for international education and career opportunities. 
        We guide students towards their dream of studying abroad and building successful careers worldwide.
      </p>

      <div className="pt-4">
        <h4 className="text-sm font-semibold text-[#f37021] uppercase tracking-wider mb-3">
          Connect With Us
        </h4>
        <SocialLinks />
      </div>
    </div>
  );
};