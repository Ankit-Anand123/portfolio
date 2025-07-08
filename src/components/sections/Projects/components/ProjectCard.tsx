import React from 'react';
import { Calendar, Building, ExternalLink, Eye, Target, Brain, Globe, BarChart, Zap } from 'lucide-react';
import { ProjectData } from '../Projects';
import styles from '../Projects.module.css';

interface ProjectCardProps {
  project: ProjectData;
  onViewDetails: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'machine-learning':
        return <Brain className="w-4 h-4" />;
      case 'web-development':
        return <Globe className="w-4 h-4" />;
      case 'data-analysis':
        return <BarChart className="w-4 h-4" />;
      case 'computer-vision':
        return <Eye className="w-4 h-4" />;
      case 'current':
        return <Zap className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      'machine-learning': 'Machine Learning',
      'web-development': 'Web Development',
      'data-analysis': 'Data Analytics',
      'computer-vision': 'Computer Vision',
      'current': 'Current Work'
    };
    return labels[category as keyof typeof labels] || 'Project';
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

  const getHighlightMetric = () => {
    if (project.metrics && project.metrics.length > 0) {
      // Prioritize accuracy metrics first
      const accuracyMetric = project.metrics.find(m => m.type === 'accuracy');
      if (accuracyMetric) return accuracyMetric;
      
      // Then impact metrics
      const impactMetric = project.metrics.find(m => m.type === 'impact');
      if (impactMetric) return impactMetric;
      
      // Finally any other metric
      return project.metrics[0];
    }
    return null;
  };

  const highlightMetric = getHighlightMetric();

  return (
    <div className={`${styles.projectCard} ${project.featured ? styles.featuredCard : ''} group`}>
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-lg ${
              project.category === 'machine-learning' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
              project.category === 'web-development' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
              project.category === 'data-analysis' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
              project.category === 'computer-vision' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
              project.category === 'current' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
              'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
            }`}>
              {getCategoryIcon(project.category)}
            </div>
            <span className={`text-sm font-medium px-2 py-1 rounded ${
              project.category === 'machine-learning' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
              project.category === 'web-development' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
              project.category === 'data-analysis' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
              project.category === 'computer-vision' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
              project.category === 'current' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}>
              {getCategoryLabel(project.category)}
            </span>
          </div>
          
          <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wide ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4 mb-4">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{project.duration}</span>
          </div>
          <div className="flex items-center">
            <Building className="w-3 h-3 mr-1" />
            <span>{project.company}</span>
          </div>
        </div>

        {/* Highlight Metric */}
        {highlightMetric && (
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">{highlightMetric.label}</span>
              <span className={`text-lg font-bold ${
                highlightMetric.type === 'accuracy' ? 'text-green-600 dark:text-green-400' :
                highlightMetric.type === 'performance' ? 'text-blue-600 dark:text-blue-400' :
                highlightMetric.type === 'scale' ? 'text-purple-600 dark:text-purple-400' :
                'text-orange-600 dark:text-orange-400'
              }`}>
                {highlightMetric.value}
              </span>
            </div>
          </div>
        )}

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded font-medium">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Key Achievement */}
        {project.achievements.length > 0 && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
            <div className="flex items-start">
              <Target className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm text-green-800 dark:text-green-300 font-medium">
                {project.achievements[0]}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onViewDetails}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>

          <div className="flex items-center space-x-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                title="View Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                title="View Code"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            FEATURED
          </span>
        </div>
      )}

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
    </div>
  );
};