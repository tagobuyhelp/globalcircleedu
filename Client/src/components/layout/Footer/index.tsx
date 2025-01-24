import React from 'react';
import { CompanyInfo } from './CompanyInfo';
import { ContactInfo } from './ContactInfo';
import { QuickLinks } from './QuickLinks';
import { StudyDestinations } from './StudyDestinations';
import { Copyright } from './Copyright';

export const Footer = () => {
  return (
    <footer className="bg-[#0C162E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <CompanyInfo />
          <ContactInfo />
          <QuickLinks />
          <StudyDestinations />
        </div>
        <Copyright />
      </div>
    </footer>
  );
};