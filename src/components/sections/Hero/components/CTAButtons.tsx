import React, { useState, useEffect } from 'react';
import { Download, Github, Linkedin, Mail, Phone, MapPin, ChevronDown, ExternalLink, ArrowRight } from 'lucide-react';

interface CTAButtonsProps {
  onViewWork: () => void;
  onAIPlayground: () => void;
  onContact: () => void;
  className?: string;
}

export const CTAButtons: React.FC<CTAButtonsProps> = ({ 
  onViewWork, 
  onAIPlayground, 
  onContact, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <button
        onClick={onViewWork}
        className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
      >
        <span>View My Work</span>
        <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
      </button>
      
      <button
        onClick={onAIPlayground}
        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
      >
        <span>AI Playground</span>
        <ExternalLink size={16} />
      </button>
      
      <button
        onClick={onContact}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        Let's Connect
      </button>
    </div>
  );
};
