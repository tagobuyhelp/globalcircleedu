import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold relative">
        <span className="relative">
          Contact Us
          <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#f37021]"></span>
        </span>
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-start group">
          <Phone className="h-5 w-5 mr-3 text-[#f37021] flex-shrink-0 mt-1" />
          <div>
            <a href="tel:+971555508943" className="block hover:text-[#f37021] transition-colors">
              +971 55 550 8943
            </a>
            <a href="tel:+918336932235" className="block hover:text-[#f37021] transition-colors">
              +91 8336932235
            </a>
          </div>
        </div>

        <div className="flex items-center group">
          <Mail className="h-5 w-5 mr-3 text-[#f37021] flex-shrink-0" />
          <a 
            href="mailto:info@globalcircleedu.com" 
            className="hover:text-[#f37021] transition-colors"
          >
            info@globalcircleedu.com
          </a>
        </div>

        <div className="flex items-start">
          <MapPin className="h-5 w-5 mr-3 text-[#f37021] flex-shrink-0 mt-1" />
          <address className="not-italic text-gray-300">
            31143-001, FZCO Business Park,<br />
            DDP, Dubai, UAE
          </address>
        </div>
      </div>

      <div className="pt-4">
        <h4 className="text-sm font-semibold text-[#f37021] uppercase tracking-wider mb-3">
          Office Hours
        </h4>
        <p className="text-gray-300">
          Monday - Friday: 9:00 AM - 6:00 PM<br />
          Saturday: 10:00 AM - 2:00 PM
        </p>
      </div>
    </div>
  );
};