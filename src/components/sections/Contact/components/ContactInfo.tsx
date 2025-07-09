// src/components/sections/Contact/components/ContactInfo.tsx
import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Copy, 
  ExternalLink, 
  CheckCircle,
  Calendar,
  Globe,
  Download
} from 'lucide-react';
import styles from '../Contact.module.css';

interface ContactInfoProps {
  isVisible: boolean;
  animationState?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface ContactItem {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  href?: string;
  copyable?: boolean;
  description?: string;
  availability?: string;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  isVisible,
  animationState,
  className = '',
  style
}) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const contactItems: ContactItem[] = [
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      value: 'ankitanand.2910@gmail.com',
      href: 'mailto:ankitanand.2910@gmail.com',
      copyable: true,
      description: 'Primary contact method',
      availability: 'Responds within 24 hours'
    },
    {
      id: 'phone',
      icon: Phone,
      label: 'Phone',
      value: '+91 8249089552',
      href: 'tel:+918249089552',
      copyable: true,
      description: 'For urgent inquiries',
      availability: 'Available 9 AM - 6 PM IST'
    },
    {
      id: 'location',
      icon: MapPin,
      label: 'Location',
      value: 'Coimbatore, Tamil Nadu, India',
      description: 'Open to remote work worldwide',
      availability: 'GMT+5:30 timezone'
    },
    {
      id: 'timezone',
      icon: Clock,
      label: 'Local Time',
      value: new Date().toLocaleTimeString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      description: 'India Standard Time (IST)',
      availability: 'Best contact hours: 9 AM - 6 PM'
    }
  ];

  const handleCopy = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemId);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const formatPhoneForDisplay = (phone: string) => {
    return phone.replace('+91', '+91 ').replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  };

  return (
    <div className={`${className} space-y-6`} style={style}>
      {/* Contact Header */}
      <div className={`${styles.contactCard} text-center`}>
        <div className="relative mb-6">
          {/* Profile Avatar */}
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-white">AA</span>
          </div>
          
          {/* Online Status Indicator */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Ankit Anand
        </h3>
        <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
          Senior Data Scientist
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          ML Engineer • AI Solutions Architect
        </p>

        {/* Availability Status */}
        <div className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
          Available for new opportunities
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="space-y-4">
        {contactItems.map((item, index) => {
          const IconComponent = item.icon;
          const isPhone = item.id === 'phone';
          const displayValue = isPhone ? formatPhoneForDisplay(item.value) : item.value;
          
          return (
            <div
              key={item.id}
              className={`${styles.contactCard} group hover:scale-105 transition-all duration-300 ${styles.fadeInLeft} ${
                isVisible ? styles.animated : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className={`${styles.contactCardIcon} w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.label}
                    </h4>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      {item.copyable && (
                        <button
                          onClick={() => handleCopy(item.value, item.id)}
                          className={`${styles.copyButton} ${copiedItem === item.id ? 'copied' : ''} p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200`}
                          title="Copy to clipboard"
                        >
                          {copiedItem === item.id ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-500" />
                          )}
                        </button>
                      )}
                      
                      {item.href && (
                        <a
                          href={item.href}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                          title={`Contact via ${item.label.toLowerCase()}`}
                        >
                          <ExternalLink className="w-4 h-4 text-gray-500" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Value */}
                  <p className="text-gray-900 dark:text-white font-medium mb-2 break-all">
                    {displayValue}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    {item.description}
                  </p>

                  {/* Availability */}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.availability}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Actions */}
      <div className="space-y-4">
        {/* Schedule Meeting */}
        <div className={`${styles.contactCard} ${styles.fadeInLeft} ${isVisible ? styles.animated : ''}`}
             style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-md">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Schedule a Meeting
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Book a 30-minute consultation call
              </p>
              <button className={`${styles.secondaryButton} ${styles.buttonHover} text-sm`}>
                <Calendar className="w-4 h-4 mr-2" />
                Book Meeting
              </button>
            </div>
          </div>
        </div>

        {/* Download Resume */}
        <div className={`${styles.contactCard} ${styles.fadeInLeft} ${isVisible ? styles.animated : ''}`}
             style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Download Resume
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Get my latest CV (PDF, 2.1 MB)
              </p>
              <a 
                href="/resume/Ankit_Anand_Resume.pdf"
                download
                className={`${styles.tertiaryButton} ${styles.buttonHover} text-sm`}
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Professional Links */}
        <div className={`${styles.contactCard} ${styles.fadeInLeft} ${isVisible ? styles.animated : ''}`}
             style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Professional Profiles
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Connect on professional platforms
              </p>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="https://linkedin.com/in/ankitanand29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/ankitanand29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-900 transition-colors"
                >
                  GitHub
                </a>
                <a 
                  href="https://kaggle.com/ankitanand29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 bg-cyan-500 text-white rounded-lg text-sm hover:bg-cyan-600 transition-colors"
                >
                  Kaggle
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Preference Note */}
      <div className={`${styles.fadeInLeft} ${isVisible ? styles.animated : ''} p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800`}
           style={{ animationDelay: '0.7s' }}>
        <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
          💡 Contact Tips
        </h4>
        <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
          <li>• Email is preferred for detailed project discussions</li>
          <li>• Phone calls are great for urgent matters or quick clarifications</li>
          <li>• Include project timeline and budget range when possible</li>
          <li>• I typically respond faster to specific, well-structured inquiries</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactInfo;