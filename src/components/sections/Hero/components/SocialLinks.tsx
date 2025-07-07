import React, { useState, useEffect } from 'react';
import { Download, Github, Linkedin, Mail, Phone, MapPin, ChevronDown, ExternalLink, ArrowRight } from 'lucide-react';


interface SocialLinksProps {
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className = '' }) => {
  const socialLinks = [
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/ankitanand29',
      icon: Linkedin,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/ankitanand29',
      icon: Github,
      color: 'bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600'
    },
    {
      platform: 'Email',
      url: 'mailto:ankitanand.2910@gmail.com',
      icon: Mail,
      color: 'bg-red-600 hover:bg-red-700'
    }
  ];

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target={link.platform !== 'Email' ? '_blank' : undefined}
          rel={link.platform !== 'Email' ? 'noopener noreferrer' : undefined}
          className={`p-3 ${link.color} text-white rounded-full transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl`}
          aria-label={link.platform}
        >
          <link.icon size={20} />
        </a>
      ))}
    </div>
  );
};
