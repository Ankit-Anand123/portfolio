import React from 'react';
import { 
  MessageSquare, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail,
  ExternalLink,
  Coffee
} from 'lucide-react';
import styles from '../Contact.module.css';

interface ContactMethodsProps {
  isVisible: boolean;
  animationState?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ContactMethods: React.FC<ContactMethodsProps> = ({
  isVisible,
  animationState,
  className = '',
  style
}) => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/ankitanand29',
      icon: Linkedin,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Professional network'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/ankitanand29',
      icon: Github,
      color: 'bg-gray-800 hover:bg-gray-900',
      description: 'Code repositories'
    },
    {
      name: 'Email',
      href: 'mailto:ankitanand.2910@gmail.com',
      icon: Mail,
      color: 'bg-red-600 hover:bg-red-700',
      description: 'Direct email'
    },
    {
      name: 'Kaggle',
      href: 'https://kaggle.com/ankitanand29',
      icon: MessageSquare,
      color: 'bg-cyan-600 hover:bg-cyan-700',
      description: 'ML competitions'
    }
  ];

  return (
    <div className={`${className} space-y-6`} style={style}>
      {/* Quick Actions */}
      <div className={`${styles.contactCard} ${styles.fadeInUp} ${isVisible ? styles.animated : ''}`}
           style={{ animationDelay: '0.4s' }}>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Coffee className="w-5 h-5 mr-2 text-orange-500" />
          Quick Actions
        </h4>
        
        <div className="space-y-3">
          <a
            href="mailto:ankitanand.2910@gmail.com?subject=Project Collaboration"
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-blue-500 mr-3" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Project Discussion
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
          
          <a
            href="mailto:ankitanand.2910@gmail.com?subject=Job Opportunity"
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center">
              <MessageSquare className="w-4 h-4 text-green-500 mr-3" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Job Opportunity
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
          
          <a
            href="mailto:ankitanand.2910@gmail.com?subject=Consulting Inquiry"
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center">
              <Coffee className="w-4 h-4 text-purple-500 mr-3" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Consulting
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
        </div>
      </div>

      {/* Response Promise */}
      <div className={`${styles.fadeInUp} ${isVisible ? styles.animated : ''} p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800`}
           style={{ animationDelay: '0.6s' }}>
        <h4 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
          🤝 My Commitment
        </h4>
        <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
          <li>• Professional and timely responses</li>
          <li>• Honest assessment of project feasibility</li>
          <li>• Clear communication throughout</li>
          <li>• Respect for your time and requirements</li>
        </ul>
      </div>
    </div>
  );
};