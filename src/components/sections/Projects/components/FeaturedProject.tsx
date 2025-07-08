import React from 'react';
import { Calendar, Building, Target, Eye, ExternalLink, ArrowRight, Zap, TrendingUp } from 'lucide-react';
import { ProjectData } from '../Projects';
import styles from '../Projects.module.css';

interface FeaturedProjectProps {
  project: ProjectData;
  isReversed?: boolean;
  onViewDetails: () => void;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ 
  project, 
  isReversed = false, 
  onViewDetails 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-300';
      case 'ongoing':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300';
      case 'research':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getMetricColor = (type: string) => {
    switch (type) {
      case 'accuracy':
        return 'text-green-600 dark:text-green-400';
      case 'performance':
        return 'text-blue-600 dark:text-blue-400';
      case 'scale':
        return 'text-purple-600 dark:text-purple-400';
      case 'impact':
        return 'text-orange-600 dark:text-orange-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className={`${styles.featuredCard} group relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10"></div>
      
      {/* Content Container */}
      <div className={`relative grid lg:grid-cols-2 gap-8 lg:gap-12 p-8 lg:p-12 items-center ${
        isReversed ? 'lg:direction-reverse' : ''
      }`}>
        {/* Content Side */}
        <div className={`space-y-6 ${isReversed ? 'lg:order-2' : ''}`}>
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                  FEATURED
                </span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wide ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              
              {project.status === 'ongoing' && (
                <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">Active</span>
                </div>
              )}
            </div>

            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {project.title}
            </h3>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{project.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building className="w-4 h-4" />
              <span className="font-medium">{project.company}</span>
            </div>
          </div>

          {/* Key Achievement Highlight */}
          {project.achievements.length > 0 && (
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
              <div className="flex items-start space-x-3">
                <Target className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">Key Achievement</h4>
                  <p className="text-green-800 dark:text-green-300">{project.achievements[0]}</p>
                </div>
              </div>
            </div>
          )}

          {/* Technology Stack */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Technology Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onViewDetails}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Eye className="w-4 h-4" />
              <span>View Full Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Metrics/Visual Side */}
        <div className={`space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
          {/* Project Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Performance Metrics
                </h4>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {project.metrics.map((metric, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className={`text-2xl font-bold mb-1 ${getMetricColor(metric.type)}`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Impact Statement */}
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Business Impact
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.impact}
            </p>
          </div>

          {/* Additional Achievements */}
          {project.achievements.length > 1 && (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Additional Achievements</h4>
              <div className="space-y-2">
                {project.achievements.slice(1, 3).map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Featured Badge */}
      <div className="absolute top-6 right-6">
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          ⭐ FEATURED
        </div>
      </div>
    </div>
  );
};