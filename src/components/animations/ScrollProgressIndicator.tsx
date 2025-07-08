import React, { useState, useEffect } from 'react';

interface ScrollProgressIndicatorProps {
  height?: string;
  className?: string;
  color?: 'blue' | 'purple' | 'gradient' | 'custom';
  customColor?: string;
  position?: 'top' | 'bottom';
  showPercentage?: boolean;
}

export const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  height = 'h-1',
  className = '',
  color = 'gradient',
  customColor,
  position = 'top',
  showPercentage = false
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((window.scrollY / totalHeight) * 100, 100);
      setScrollProgress(progress);
    };

    handleScroll();

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  const getColorClass = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-600';
      case 'purple':
        return 'bg-purple-600';
      case 'gradient':
        return 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500';
      case 'custom':
        return '';
      default:
        return 'bg-gradient-to-r from-blue-500 to-purple-600';
    }
  };

  const positionClass = position === 'top' ? 'top-0' : 'bottom-0';

  return (
    <>
      <div className={`fixed ${positionClass} left-0 w-full ${height} bg-gray-200 dark:bg-gray-700 z-50 ${className}`}>
        <div 
          className={`${height} ${getColorClass()} transition-all duration-150 ease-out`}
          style={{ 
            width: `${scrollProgress}%`,
            backgroundColor: customColor || undefined
          }}
        />
      </div>

      {showPercentage && (
        <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      )}
    </>
  );
};

export const CircularScrollProgress: React.FC<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}> = ({
  size = 60,
  strokeWidth = 4,
  className = ''
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((window.scrollY / totalHeight) * 100, 100);
      setScrollProgress(progress);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (scrollProgress / 100) * circumference}
          strokeLinecap="round"
          className="transition-all duration-150 ease-out"
        />
        
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {Math.round(scrollProgress)}%
        </span>
      </div>
    </div>
  );
};