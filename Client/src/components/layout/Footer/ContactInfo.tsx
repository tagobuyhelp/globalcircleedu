import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const ContactInfo = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
      <div className="space-y-4">
        <div className="flex items-center">
          <Phone className="h-5 w-5 mr-2 text-[#f37021]" />
          <div>
            <a href="tel:+971555508943" className="hover:text-[#f37021]">
              +971 55 550 8943
            </a>
            <br />
            <a href="tel:+917052101786" className="hover:text-[#f37021]">
              +91 7052 101 786
            </a>
          </div>
        </div>
        <div className="flex items-center">
          <Mail className="h-5 w-5 mr-2 text-[#f37021]" />
          <a href="mailto:info@globalcircleedu.com" className="hover:text-[#f37021]">
            info@globalcircleedu.com
          </a>
        </div>
        <div className="flex items-start">
          <MapPin className="h-5 w-5 mr-2 text-[#f37021] flex-shrink-0" />
          <address className="not-italic">
            31143-001, FZCO Business Park,<br />
            DDP, Dubai, UAE
          </address>
        </div>
      </div>
    </div>
  );
};