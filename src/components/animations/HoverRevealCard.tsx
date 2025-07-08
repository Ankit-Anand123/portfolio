import React, { useState } from 'react';
import { ExternalLink, Github, Eye, ArrowRight } from 'lucide-react';

interface HoverRevealCardProps {
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  technologies?: string[];
  demoUrl?: string;
  githubUrl?: string;
  status?: 'completed' | 'ongoing' | 'research';
  metrics?: Array<{
    label: string;
    value: string;
    type: 'accuracy' | 'performance' | 'scale' | 'impact';
  }>;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'featured' | 'minimal';
}

export const HoverRevealCard: React.FC<HoverRevealCardProps> = ({
  title,
  description,
  longDescription,
  image,
  technologies = [],
  demoUrl,
  githubUrl,
  status = 'completed',
  metrics = [],
  children,
  className = "",
  variant = 'default'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'research': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMetricColor = (type: string) => {
    switch (type) {
      case 'accuracy': return 'text-green-600';
      case 'performance': return 'text-blue-600';
      case 'scale': return 'text-purple-600';
      case 'impact': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'featured':
        return 'lg:col-span-2 min-h-[400px]';
      case 'minimal':
        return 'border-0 shadow-sm';
      default:
        return '';
    }
  };

  return (
    <div 
      className={`
        group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700
        transition-all duration-500 ease-out cursor-pointer
        hover:shadow-2xl hover:shadow-blue-500/10
        transform hover:scale-[1.02] hover:-translate-y-2
        ${getVariantClasses()}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-90' : 'opacity-60'
          }`} />
          
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>

          <div className={`absolute top-4 right-4 flex space-x-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}>
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
              >
                <Github className="w-4 h-4 text-white" />
              </a>
            )}
          </div>
        </div>
      )}

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className={`font-bold text-gray-900 dark:text-white transition-all duration-300 ${
            variant === 'featured' ? 'text-2xl' : 'text-xl'
          } ${isHovered ? 'text-blue-600 dark:text-blue-400' : ''}`}>
            {title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>

          {longDescription && (
            <div className={`overflow-hidden transition-all duration-500 ease-out ${
              isHovered ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                {longDescription}
              </p>
            </div>
          )}
        </div>

        {technologies.length > 0 && (
          <div className="space-y-2">
            <div className={`flex flex-wrap gap-2 transition-all duration-300 ${
              isHovered ? 'transform translate-y-0 opacity-100' : 'transform translate-y-2 opacity-70'
            }`}>
              {technologies.slice(0, isHovered ? technologies.length : 4).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-xs font-medium border border-blue-200 dark:border-blue-700 transition-all duration-200 hover:scale-105"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 4 && !isHovered && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md text-xs">
                  +{technologies.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {metrics.length > 0 && (
          <div className={`grid grid-cols-2 gap-3 transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {metrics.map((metric, index) => (
              <div key={index} className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className={`text-lg font-bold ${getMetricColor(metric.type)}`}>
                  {metric.value}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {children && (
          <div className={`transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {children}
          </div>
        )}

        <div className={`flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-2'
        }`}>
          <button className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
            <Eye className="w-4 h-4" />
            <span>View Details</span>
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
              isHovered ? 'translate-x-1' : ''
            }`} />
          </button>

          {(demoUrl || githubUrl) && (
            <div className="flex space-x-2">
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 transition-opacity duration-500 pointer-events-none ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />

      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5 transition-opacity duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg" />
      </div>
    </div>
  );
};