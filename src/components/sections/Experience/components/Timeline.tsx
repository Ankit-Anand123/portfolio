import React from 'react';
import { Building, Calendar, MapPin, Target, ChevronRight, TrendingUp } from 'lucide-react';
import { ExperienceData } from '../Experience';
import styles from '../Experience.module.css';
import { 
  RevealOnScroll, 
  FadeInLeft,
  StaggerContainer
} from '../../../animations';

interface TimelineProps {
  experiences: ExperienceData[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ 
  experiences, 
  selectedId, 
  onSelect 
}) => {
  return (
    <div className="space-y-4">
      
      {/* Timeline Items with Staggered Animation */}
      <StaggerContainer staggerDelay={150} direction="up">
        {experiences.map((experience, index) => {
          const isSelected = experience.id === selectedId;
          const isCurrent = experience.type === 'current';
          
          return (
            <div
              key={experience.id}
              className={`relative cursor-pointer transition-all duration-300 ${
                isSelected ? 'transform scale-105' : 'hover:transform hover:scale-102'
              }`}
              onClick={() => onSelect(experience.id)}
            >
              {/* Timeline connector */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-8 bg-gradient-to-b from-blue-500 to-gray-300 dark:to-gray-600"></div>
              )}
              
              <div className={`relative p-4 rounded-lg border transition-all duration-300 ${
                isSelected 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600 shadow-md' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600'
              }`}>
                
                {/* Timeline dot */}
                <div className={`absolute left-6 top-6 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  isCurrent 
                    ? 'bg-green-500 border-green-500 animate-pulse' 
                    : isSelected 
                      ? 'bg-blue-500 border-blue-500' 
                      : 'bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600'
                }`}></div>
                
                {/* Content */}
                <div className="ml-8 space-y-3">
                  
                  {/* Header */}
                  <div>
                    <h4 className={`font-semibold text-sm transition-colors duration-300 ${
                      isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'
                    }`}>
                      {experience.position}
                    </h4>
                    <div className={`flex items-center text-sm font-medium transition-colors duration-300 ${
                      isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      <Building className="w-3 h-3 mr-1" />
                      <span className="truncate">{experience.company}</span>
                    </div>
                  </div>

                  {/* Meta Information */}
                  <div className="space-y-1 text-xs">
                    <div className={`flex items-center transition-colors duration-300 ${
                      isSelected ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      <Calendar className="w-3 h-3 mr-2 flex-shrink-0" />
                      <span className="truncate">{experience.duration}</span>
                    </div>
                    <div className={`flex items-center transition-colors duration-300 ${
                      isSelected ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      <MapPin className="w-3 h-3 mr-2 flex-shrink-0" />
                      <span className="truncate">{experience.location}</span>
                    </div>
                    <div className={`flex items-center transition-colors duration-300 ${
                      isSelected ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      <Target className="w-3 h-3 mr-2 flex-shrink-0" />
                      <span className="truncate">{experience.domain}</span>
                    </div>
                  </div>

                  {/* Current Position Badge */}
                  {isCurrent && (
                    <div className="flex items-center justify-start">
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                        Current
                      </span>
                    </div>
                  )}

                  {/* Technology Preview */}
                  <div className="flex flex-wrap gap-1">
                    {experience.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-2 py-1 rounded text-xs transition-all duration-200 ${
                          isSelected
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {experience.technologies.length > 3 && (
                      <span className={`px-2 py-1 rounded text-xs ${
                        isSelected
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-500'
                      }`}>
                        +{experience.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 pt-2 border-t border-blue-200 dark:border-blue-700">
                      <span className="font-medium">Selected</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </StaggerContainer>
      
      {/* Career Summary */}
      <FadeInLeft delay={800} className="mt-6">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
            Career Overview
          </h4>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                <span className="text-gray-600 dark:text-gray-400">Experience</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">6+ Years</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                <span className="text-gray-600 dark:text-gray-400">Companies</span>
                <span className="font-medium text-green-600 dark:text-green-400">2 Major</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                <span className="text-gray-600 dark:text-gray-400">Domains</span>
                <span className="font-medium text-purple-600 dark:text-purple-400">5 Industries</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                <span className="text-gray-600 dark:text-gray-400">Focus</span>
                <span className="font-medium text-orange-600 dark:text-orange-400">ML/AI</span>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 pt-3 border-t border-blue-200 dark:border-blue-600">
            <div className="flex items-center justify-center space-x-2 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                <span className="text-gray-600 dark:text-gray-300">Software Engineer</span>
              </div>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                <span className="text-gray-600 dark:text-gray-300">Senior Data Scientist</span>
              </div>
            </div>
          </div>
        </div>
      </FadeInLeft>
    </div>
  );
};