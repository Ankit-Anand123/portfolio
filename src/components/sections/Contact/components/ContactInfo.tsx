import React, { useState } from 'react';
import {
  Mail,
  Copy,
  ExternalLink,
  CheckCircle,
  Calendar,
  Globe,
  MessageCircle
} from 'lucide-react';
import styles from '../Contact.module.css';
import { ContactMethods } from './ContactMethods';
import { Linkedin } from 'lucide-react';

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
  action?: React.ReactNode;
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
      id: 'meeting',
      icon: Calendar,
      label: 'Schedule a Meeting',
      value: 'Book a 30-minute consultation call',
      description: 'Structured discussion on project requirements',
      availability: 'Available 9 AM - 6 PM IST',
      action: (
        <button className={`${styles.secondaryButton} ${styles.buttonHover} text-sm mt-2`}>
          <Calendar className="w-4 h-4 mr-2" />
          Book Meeting
        </button>
      )
    },
    {
      id: 'tips',
      icon: Globe,
      label: 'Contact Tips',
      value: 'Preferred ways to get in touch',
      description: '• Email is preferred for detailed project discussions\n• Include project timeline and budget range\n• I respond faster to specific, structured inquiries',
      availability: ''
    },
    {
      id: 'social',
      icon: MessageCircle,
      label: 'Social Profiles',
      value: '',
      description: '',
      availability: '',
      action: (
        <div className="flex flex-wrap gap-2 mt-2">
          <a
            href="https://linkedin.com/in/ankitanand29"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/ankitanand29"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-900 transition-colors"
          >
            <img
              src="https://cdn.simpleicons.org/github/ffffff"
              alt="GitHub"
              className="w-4 h-4"
            />
            GitHub
          </a>
          <a
            href="https://kaggle.com/ankitanand29"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500 text-white rounded-lg text-sm hover:bg-cyan-600 transition-colors"
          >
            <img
              src="https://cdn.simpleicons.org/kaggle/ffffff"
              alt="Kaggle"
              className="w-4 h-4"
            />
            Kaggle
          </a>
        </div>
      )
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

  return (
    <div className={`${className} grid sm:grid-cols-2 gap-6`} style={style}>
      {/* Contact Header */}
      <div className={`${styles.contactCard} text-center flex flex-col justify-between p-6`}>
        <div>
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">AA</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Ankit Anand</h3>
          <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">Senior Data Scientist</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">ML Engineer • AI Solutions Architect</p>
          <div className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
            Let’s talk: Open to instructing, consulting & building DS systems
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <ContactMethods isVisible={isVisible} animationState={animationState} />
          </div>
        </div>
      </div>

      {/* Contact Box */}
      <div className="space-y-4">
        {contactItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`${styles.contactCard} group hover:scale-105 transition-all duration-300 ${styles.fadeInLeft} ${
                isVisible ? styles.animated : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{item.label}</h4>
                    {item.copyable && (
                      <button
                        onClick={() => handleCopy(item.value, item.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
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
                  <p className="text-gray-900 dark:text-white font-medium mb-2 break-all">
                    {item.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 whitespace-pre-line">
                    {item.description}
                  </p>
                  {item.availability && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.availability}
                    </p>
                  )}
                  {item.action && (
                    <div>{item.action}</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInfo;
