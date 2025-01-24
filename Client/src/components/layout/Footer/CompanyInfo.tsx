import React from 'react';
import { Logo } from '../../ui/Logo';
import { SocialLinks } from './SocialLinks';

export const CompanyInfo = () => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <Logo className="h-12" />
      </div>
      <p className="text-blue-100 mb-6">
        Your trusted partner for international education and career opportunities.
      </p>
      <SocialLinks />
    </div>
  );
};