import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, 
  Facebook, Twitter, Instagram, Linkedin, MessageCircle 
} from 'lucide-react';
import { Logo } from '../ui/Logo';

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/globalcircleedu', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/globalcircleedu', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/globalcircleedu', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/globalcircleedu', label: 'LinkedIn' },
  { icon: MessageCircle, href: 'https://wa.me/971555508943', label: 'WhatsApp' }
];

export const Footer = () => {
  return (
    <footer className="bg-[#004e9a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <Logo className="h-12" />
            </div>
            <p className="text-blue-100 mb-6">
              Your trusted partner for international education and career opportunities.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#f37021] transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact Info */}
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

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="hover:text-[#f37021]">Courses</Link>
              </li>
              <li>
                <Link to="/universities" className="hover:text-[#f37021]">Universities</Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-[#f37021]">Jobs</Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-[#f37021]">News</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#f37021]">Services</Link>
              </li>
            </ul>
          </div>

          {/* Study Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Study Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/study/usa" className="hover:text-[#f37021]">USA</Link>
              </li>
              <li>
                <Link to="/study/uk" className="hover:text-[#f37021]">UK</Link>
              </li>
              <li>
                <Link to="/study/canada" className="hover:text-[#f37021]">Canada</Link>
              </li>
              <li>
                <Link to="/study/australia" className="hover:text-[#f37021]">Australia</Link>
              </li>
              <li>
                <Link to="/study/new-zealand" className="hover:text-[#f37021]">New Zealand</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-800 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} Global Circle Edu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};