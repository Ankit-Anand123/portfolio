import React from 'react';
import { Calendar, MapPin, Building, Crown } from 'lucide-react';
import { ExperienceData } from '../Experience';
import styles from '../Experience.module.css';

interface TimelineProps {
  experiences: ExperienceData[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ experiences, selectedId, onSelect }) => {
  const getPositionLevel = (position: string) => {
    if (position.toLowerCase().includes('senior')) return 'senior';
    if (position.toLowerCase().includes('data scientist')) return 'mid';
    return 'junior';
  };

  const getPositionIcon = (position: string, type: 'current' | 'past') => {
    const level = getPositionLevel(position);
    
    if (type === 'current') {
      return <Crown className="w-4 h-4 text-green-600" />;
    }
    
    switch (level) {
      case 'senior':
        return <Crown className="w-4 h-4 text-blue-600" />;
      case 'mid':
        return <Building className="w-4 h-4 text-purple-600" />;
      default:
        return <Building className="w-4 h-4 text-gray-600" />;
    }
  };

  const getDurationInMonths = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = endDate === 'Present' ? new Date() : new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return months;
  };

  const formatDuration = (months: number) => {
    if (months < 12) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    }
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    }
    
    return `${years}y ${remainingMonths}m`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 sticky top-24">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
        Career Timeline
      </h3>
      
      <div className={styles.timeline}>
        {experiences.map((experience, index) => {
          const isSelected = experience.id === selectedId;
          const isCurrent = experience.type === 'current';
          const duration = getDurationInMonths(experience.startDate, experience.endDate);
          
          return (
            <div
              key={experience.id}
              className={`${styles.timelineItem} ${isSelected ? styles.active : ''} ${isCurrent ? styles.current : ''}`}
              onClick={() => onSelect(experience.id)}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 cursor-pointer">
                {/* Header with Icon and Current Badge */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getPositionIcon(experience.position, experience.type)}
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {experience.position}
                    </h4>
                  </div>
                  
                  {isCurrent && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Current
                    </span>
                  )}
                </div>
                
                {/* Company */}
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {experience.company}
                </div>
                
                {/* Duration */}
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mb-2">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{experience.duration}</span>
                  <span className="mx-2">•</span>
                  <span className="font-medium">{formatDuration(duration)}</span>
                </div>
                
                {/* Location */}
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mb-3">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{experience.location}</span>
                </div>
                
                {/* Domain */}
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                    {experience.domain}
                  </span>
                </div>
                
                {/* Key Technologies Preview */}
                <div className="flex flex-wrap gap-1">
                  {experience.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="inline-block px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {experience.technologies.length > 3 && (
                    <span className="inline-block px-2 py-0.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                      +{experience.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                {/* Selected Indicator */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-center text-xs text-blue-600 dark:text-blue-400">
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                      <span>Click to view details →</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Career Progression Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Career Progression
        </h4>
        <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
          <div className="flex justify-between">
            <span>Software Engineer → Senior Data Scientist</span>
            <span className="font-medium">6+ Years</span>
          </div>
          <div className="flex justify-between">
            <span>Companies</span>
            <span className="font-medium">2 (Innova Solutions, Bosch)</span>
          </div>
          <div className="flex justify-between">
            <span>Domains</span>
            <span className="font-medium">5 (Retail, Healthcare, Supply Chain, Sensor Tech)</span>
          </div>
        </div>
      </div>
    </div>
  );
};