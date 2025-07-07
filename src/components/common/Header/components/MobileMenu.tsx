import React from 'react';
import { Download, Github, Linkedin, Mail } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: Array<{ label: string; href: string }>;
  onNavClick: (href: string) => void;
  isDarkMode: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  navItems,
  onNavClick,
  isDarkMode
}) => {
  if (!isOpen) return null;

  return (
    <div className={`md:hidden transition-all duration-300 ease-in-out ${
      isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
    } backdrop-blur-sm border-t ${
      isDarkMode ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <div className="px-4 py-6 space-y-4">
        
        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavClick(item.href)}
            className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              isDarkMode 
                ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
            }`}
          >
            {item.label}
          </button>
        ))}
        
        {/* Mobile Social Links */}
        <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <a
            href="https://github.com/ankitanand29"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-full transition-all duration-200 hover:scale-110 ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/ankitanand29"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200 hover:scale-110"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:ankitanand.2910@gmail.com"
            className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-200 hover:scale-110"
          >
            <Mail size={20} />
          </a>
        </div>
        
        {/* Mobile Resume Download */}
        <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium w-full">
          <Download size={16} />
          <span>Download Resume</span>
        </button>
      </div>
    </div>
  );
};