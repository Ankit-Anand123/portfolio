import React, { useState, useEffect } from 'react';

interface RotatingTextProps {
  roles: string[];
  className?: string;
}

export const RotatingText: React.FC<RotatingTextProps> = ({ roles, className = '' }) => {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles]);

  return (
    <div className={`h-16 flex items-center ${className}`}>
      <div className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-600 dark:text-gray-300">
        <span className="inline-block transform transition-all duration-500 ease-in-out">
          {roles[currentRole]}
        </span>
        <span className="inline-block w-1 h-8 md:h-10 bg-blue-500 ml-2 animate-pulse"></span>
      </div>
    </div>
  );
};