import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, Building, Target, CheckCircle, ExternalLink, TrendingUp } from 'lucide-react';
import { ProjectData } from '../Projects';

interface ProjectModalProps {
  project: ProjectData;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700';
      case 'performance':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700';
      case 'scale':
        return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700';
      case 'impact':
        return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600';
    }
  };

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4"
      style={{ zIndex: 999999 }}
      onClick={handleOverlayClick}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform scale-100 transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600 p-6 flex items-start justify-between rounded-t-xl">
          <div className="flex-1 pr-8">
            <div className="flex items-center space-x-3 mb-3">
              {project.featured && (
                <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full">
                  ⭐ FEATURED
                </span>
              )}
              <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wide ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {project.title}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {project.longDescription}
            </p>
            
            <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{project.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4" />
                <span className="font-medium">{project.company}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-200 flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Performance Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Performance Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.metrics.map((metric, index) => (
                  <div key={index} className={`p-4 rounded-xl border ${getMetricColor(metric.type)}`}>
                    <div className="text-xl lg:text-2xl font-bold mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm opacity-80">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Achievements */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
              Key Achievements
            </h3>
            <div className="space-y-3">
              {project.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 dark:text-gray-200">{achievement}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-lg font-medium transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Business Impact */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Business Impact
            </h3>
            <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                {project.impact}
              </p>
            </div>
          </section>

          {/* Action Buttons */}
          <section className="flex flex-wrap items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Live Demo</span>
              </a>
            )}
            
            <button
              onClick={onClose}
              className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors duration-200"
            >
              <span>Close</span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );

  // Render modal using portal to document body
  return createPortal(modalContent, document.body);
};