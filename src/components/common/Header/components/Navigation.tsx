import React from 'react';

interface NavigationProps {
  navItems: Array<{ label: string; href: string }>;
  onNavClick: (href: string) => void;
  isDarkMode: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  navItems,
  onNavClick,
  isDarkMode
}) => {
  return (
    <nav className="hidden md:flex space-x-8">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => onNavClick(item.href)}
          className={`font-medium transition-all duration-200 hover:text-blue-500 relative group ${
            isDarkMode 
              ? 'text-gray-300 hover:text-blue-400' 
              : 'text-gray-700 hover:text-blue-600'
          }`}
        >
          {item.label}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-200 group-hover:w-full"></span>
        </button>
      ))}
    </nav>
  );
};