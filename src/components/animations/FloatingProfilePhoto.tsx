import React from 'react';

interface FloatingProfilePhotoProps {
  src?: string;
  alt?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const FloatingProfilePhoto: React.FC<FloatingProfilePhotoProps> = ({ 
  src = "/images/profile.jpg", 
  alt = "Profile",
  className = "",
  size = 'lg'
}) => {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48', 
    lg: 'w-64 h-64',
    xl: 'w-80 h-80'
  };

  return (
    <div className={`relative ${className}`}>
      <div className="animate-float">
        <div className="relative">
          <img
            src={src}
            alt={alt}
            className={`${sizeClasses[size]} rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-800 transition-all duration-300`}
          />
          <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-20 blur-xl animate-pulse`}></div>
          <div className={`absolute inset-[-10px] ${sizeClasses[size]} rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 blur-2xl animate-gradient`}></div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute bottom-8 left-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 left-4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 right-6 w-1 h-1 bg-indigo-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
      </div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};