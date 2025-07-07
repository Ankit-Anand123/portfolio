import React, { useState, useEffect } from 'react';

interface ProfilePhotoProps {
  className?: string;
}

export const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Main photo container */}
      <div className="relative">
        <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 shadow-2xl">
          {/* Replace with actual photo or keep placeholder */}
          <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 overflow-hidden">
            {/* Option 1: Placeholder */}
            AA
            {/* Option 2: Actual photo (uncomment when you add your photo) */}
            {/* <img 
              src="/images/profile.jpg" 
              alt="Ankit Anand" 
              className="w-full h-full object-cover rounded-full"
            /> */}
          </div>
        </div>
        
        {/* Online status indicator */}
        <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 animate-pulse shadow-lg"></div>
        
        {/* Floating elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce delay-75 opacity-75"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-500 rounded-full animate-bounce delay-150 opacity-75"></div>
      </div>
    </div>
  );
};
