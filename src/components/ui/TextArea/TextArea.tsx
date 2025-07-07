import React, { useState } from 'react';
import { X, ExternalLink, Github, Calendar, MapPin, Mail, Phone, User, MessageCircle } from 'lucide-react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'outlined' | 'filled';
}

export const TextArea: React.FC<TextareaProps> = ({
  label,
  error,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-vertical';
  
  const variantClasses = {
    default: 'border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800',
    outlined: 'border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-transparent',
    filled: 'border-0 bg-gray-100 dark:bg-gray-700 rounded-lg'
  };
  
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <textarea
        className={`${baseClasses} ${variantClasses[variant]} ${errorClasses} ${className}`}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};