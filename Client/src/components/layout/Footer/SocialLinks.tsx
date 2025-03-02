import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, MessageCircle } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/globalcircleedu', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/globalcircleedu', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/globalcircleedu', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/globalcircleedu', label: 'LinkedIn' },
  { icon: MessageCircle, href: 'https://wa.me/971555508943', label: 'WhatsApp' }
];

export const SocialLinks = () => {
  return (
    <div className="flex space-x-4">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#f37021] flex items-center justify-center transition-all duration-300 group"
            aria-label={social.label}
          >
            <Icon className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
          </a>
        );
      })}
    </div>
  );
};