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
            className="text-white hover:text-[#f37021] transition-colors"
            aria-label={social.label}
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
};