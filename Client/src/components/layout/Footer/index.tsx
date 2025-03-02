import React from 'react';
import { CompanyInfo } from './CompanyInfo';
import { ContactInfo } from './ContactInfo';
import { QuickLinks } from './QuickLinks';
import { StudyDestinations } from './StudyDestinations';
import { Copyright } from './Copyright';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0C162E] to-[#1a2744] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
          {/* Company Info Section */}
          <div className="space-y-6">
            <CompanyInfo />
          </div>

          {/* Contact Info Section */}
          <div className="space-y-6">
            <ContactInfo />
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <QuickLinks />
          </div>

          {/* Study Destinations Section */}
          <div className="space-y-6">
            <StudyDestinations />
          </div>
        </div>

        {/* Bottom Bar with Additional Links */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
                <a href="/privacy" className="hover:text-[#f37021] transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-[#f37021] transition-colors">Terms of Service</a>
                <a href="/sitemap" className="hover:text-[#f37021] transition-colors">Sitemap</a>
              </div>
              <Copyright />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};