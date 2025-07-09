import React, { useState } from 'react';
import { 
  Calendar, 
  Building, 
  ExternalLink, 
  Github, 
  Eye, 
  TrendingUp,
  Brain,
  Code,
  BarChart3,
  Camera,
  Zap,
  Target,
  ArrowRight
} from 'lucide-react';
import { 
  MagneticButton,
  ParticleButton,
  RevealOnScroll,
  FadeInUp
} from '../../../animations';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'machine-learning' | 'web-development' | 'data-analysis' | 'computer-vision' | 'current';
  status: 'completed' | 'ongoing' | 'research';
  technologies: string[];
  duration: string;
  company: string;
  achievements: string[];
  metrics?: {
    label: string;
    value: string;
    type: 'accuracy' | 'performance' | 'scale' | 'impact';
  }[];
  impact?: string;
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: ProjectData;
  onViewDetails: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'machine-learning': return <Brain className="w-5 h-5" />;
      case 'web-development': return <Code className="w-5 h-5" />;
      case 'data-analysis': return <BarChart3 className="w-5 h-5" />;
      case 'computer-vision': return <Camera className="w-5 h-5" />;
      case 'current': return <Zap className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'machine-learning': return 'Machine Learning';
      case 'web-development': return 'Web Development';
      case 'data-analysis': return 'Data Analysis';
      case 'computer-vision': return 'Computer Vision';
      case 'current': return 'Current Project';
      default: return 'Project';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'ongoing': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'research': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getHighlightMetric = () => {
    if (project.metrics && project.metrics.length > 0) {
      // Prioritize accuracy metrics first
      const accuracyMetric = project.metrics.find((m: any) => m.type === 'accuracy');
      if (accuracyMetric) return accuracyMetric;
      
      // Then impact metrics
      const impactMetric = project.metrics.find((m: any) => m.type === 'impact');
      if (impactMetric) return impactMetric;
      
      // Finally any other metric
      return project.metrics[0];
    }
    return null;
  };

  const highlightMetric = getHighlightMetric();

  return (
    <RevealOnScroll direction="up" duration={600} className="h-full">
      <div 
        className={`
          bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 
          overflow-hidden transition-all duration-500 ease-out h-full flex flex-col
          ${isHovered ? 'transform -translate-y-2 shadow-2xl scale-105' : ''}
          hover:border-blue-300 dark:hover:border-blue-500
          group cursor-pointer
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Top Border */}
        <div className={`h-1 bg-gradient-to-r transition-all duration-500 ${
          project.category === 'machine-learning' ? 'from-purple-500 to-pink-500' :
          project.category === 'web-development' ? 'from-blue-500 to-cyan-500' :
          project.category === 'data-analysis' ? 'from-green-500 to-emerald-500' :
          project.category === 'computer-vision' ? 'from-orange-500 to-red-500' :
          'from-gray-500 to-gray-600'
        } ${isHovered ? 'h-2' : ''}`} />

        {/* Header */}
        <div className="p-6 pb-4 flex-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                project.category === 'machine-learning' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                project.category === 'web-development' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                project.category === 'data-analysis' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                project.category === 'computer-vision' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              } ${isHovered ? 'scale-110' : ''}`}>
                {getCategoryIcon(project.category)}
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded transition-all duration-300 ${
                project.category === 'machine-learning' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                project.category === 'web-development' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                project.category === 'data-analysis' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                project.category === 'computer-vision' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              } ${isHovered ? 'px-3 py-1.5' : ''}`}>
                {getCategoryLabel(project.category)}
              </span>
            </div>
            
            <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wide transition-all duration-300 ${getStatusColor(project.status)} ${isHovered ? 'scale-105' : ''}`}>
              {project.status}
            </span>
          </div>

          <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-3 transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 ${isHovered ? 'text-lg' : ''}`}>
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
            <FadeInUp delay={300}>
              <div className={`mb-4 p-3 rounded-lg border transition-all duration-300 ${
                highlightMetric.type === 'accuracy' ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700' :
                highlightMetric.type === 'performance' ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700' :
                highlightMetric.type === 'scale' ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-700' :
                'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-700'
              } ${isHovered ? 'transform scale-105' : ''}`}>
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
            </FadeInUp>
          )}

          {/* Technology Tags */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs transition-all duration-300 ${isHovered ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : ''}`}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded text-xs">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-0 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <ParticleButton explosionType="sparkle">
              <MagneticButton
                variant="primary"
                size="sm"
                onClick={onViewDetails}
                magnetStrength={0.3}
                className={`transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}
              >
                <Eye className="w-4 h-4 mr-2" />
                <span>View Details</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </ParticleButton>

            <div className="flex items-center space-x-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MagneticButton
                    variant="ghost"
                    size="sm"
                    magnetStrength={0.2}
                    className={`transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </MagneticButton>
                </a>
              )}
              
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MagneticButton
                    variant="ghost"
                    size="sm"
                    magnetStrength={0.2}
                    className={`transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
                  >
                    <Github className="w-4 h-4" />
                  </MagneticButton>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Hover Overlay Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </RevealOnScroll>
  );
};