import React from 'react';

interface MorphingBackgroundProps {
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
  colors?: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
}

export const MorphingBackground: React.FC<MorphingBackgroundProps> = ({ 
  className = "",
  intensity = 'medium',
  colors = {
    primary: 'bg-purple-300',
    secondary: 'bg-yellow-300', 
    tertiary: 'bg-pink-300'
  }
}) => {
  const getOpacity = () => {
    switch (intensity) {
      case 'light': return 'opacity-40';
      case 'medium': return 'opacity-70';
      case 'strong': return 'opacity-90';
      default: return 'opacity-70';
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className={`absolute -top-4 -right-4 w-72 h-72 ${colors.primary} rounded-full mix-blend-multiply filter blur-xl ${getOpacity()} animate-blob`}></div>
      <div className={`absolute -bottom-8 -left-4 w-72 h-72 ${colors.secondary} rounded-full mix-blend-multiply filter blur-xl ${getOpacity()} animate-blob animation-delay-2000`}></div>
      <div className={`absolute -bottom-4 left-20 w-72 h-72 ${colors.tertiary} rounded-full mix-blend-multiply filter blur-xl ${getOpacity()} animate-blob animation-delay-4000`}></div>
      <div className={`absolute top-1/3 right-1/3 w-48 h-48 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-1000`}></div>
      <div className={`absolute bottom-1/3 right-1/4 w-36 h-36 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-3000`}></div>
    </div>
  );
};