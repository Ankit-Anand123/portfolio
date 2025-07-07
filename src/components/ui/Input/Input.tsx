import React, { useState } from 'react';
import { X, ExternalLink, Github, Calendar, MapPin, Mail, Phone, User, MessageCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ComponentType<{ size?: number }>;
  variant?: 'default' | 'outlined' | 'filled';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon: Icon,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500';
  
  const variantClasses = {
    default: 'border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800',
    outlined: 'border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-transparent',
    filled: 'border-0 bg-gray-100 dark:bg-gray-700 rounded-lg'
  };
  
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';
  const iconClasses = Icon ? 'pl-12' : '';

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon size={20} />
          </div>
        )}
        
        <input
          className={`${baseClasses} ${variantClasses[variant]} ${errorClasses} ${iconClasses} ${className}`}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};
