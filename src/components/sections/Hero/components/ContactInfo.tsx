import React, { useState, useEffect } from 'react';
import { Download, Github, Linkedin, Mail, Phone, MapPin, ChevronDown, ExternalLink, ArrowRight } from 'lucide-react';

interface ContactInfoProps {
  className?: string;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ className = '' }) => {
  const contactItems = [
    {
      icon: Mail,
      text: 'ankitanand.2910@gmail.com',
      href: 'mailto:ankitanand.2910@gmail.com',
      show: 'email'
    },
    {
      icon: Phone,
      text: '+91 8249089552',
      href: 'tel:+918249089552',
      show: 'phone'
    },
    {
      icon: MapPin,
      text: 'Coimbatore, India',
      href: null,
      show: 'location'
    }
  ];

  return (
    <div className={`flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-500 dark:text-gray-400 ${className}`}>
      {contactItems.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {item.href ? (
            <a
              href={item.href}
              className="flex items-center space-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <item.icon size={16} />
              <span className="hidden sm:inline text-sm">{item.text}</span>
            </a>
          ) : (
            <div className="flex items-center space-x-2">
              <item.icon size={16} />
              <span className="hidden sm:inline text-sm">{item.text}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
