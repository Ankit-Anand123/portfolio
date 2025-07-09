import React, { useState } from 'react';
import { 
  Calendar, 
  Building, 
  ExternalLink, 
  Github, 
  Eye, 
  TrendingUp, 
  Target, 
  Zap,
  ArrowRight,
  Award,
  BarChart3
} from 'lucide-react';
import { 
  MagneticButton,
  ParticleButton,
  RevealOnScroll,
  FadeInUp,
  FadeInLeft,
  FadeInRight
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

interface FeaturedProjectProps {
  project: ProjectData;
  isReversed: boolean;
  onViewDetails: () => void;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ 
  project, 
  isReversed, 
  onViewDetails 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'ongoing': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'research': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getMetricColor = (type: string) => {
    switch (type) {
      case 'accuracy': return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300';
      case 'performance': return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-300';
      case 'scale': return 'bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-900/20 dark:border-purple-700 dark:text-purple-300';
      case 'impact': return 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-900/20 dark:border-orange-700 dark:text-orange-300';
      default: return 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-700 dark:text-gray-300';
    }
  };

  return (
    <RevealOnScroll direction="up" duration={800} className="w-full">
      <div 
        className={`
          bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700
          overflow-hidden transition-all duration-700 ease-out
          ${isHovered ? 'transform -translate-y-1 shadow-2xl' : ''}
          hover:border-blue-300 dark:hover:border-blue-500
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Featured Badge */}
        <div className="absolute top-6 left-6 z-20">
          <div className="flex items-center space-x-3">
            <span className={`px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-full transition-all duration-300 ${isHovered ? 'scale-110 shadow-lg' : ''}`}>
              ⭐ FEATURED
            </span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide transition-all duration-300 ${getStatusColor(project.status)} ${isHovered ? 'scale-105' : ''}`}>
              {project.status}
            </span>
          </div>
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-8 lg:p-12 ${
          isReversed ? 'lg:direction-reverse' : ''
        }`}>
          
          {/* Content Side */}
          <div className={`space-y-6 ${isReversed ? 'lg:order-2' : ''}`}>
            
            {/* Header */}
            <div className="space-y-4">
              <FadeInUp>
                <h3 className={`text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight transition-all duration-300 ${isHovered ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                  {project.title}
                </h3>
              </FadeInUp>

              <FadeInUp>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.longDescription}
                </p>
              </FadeInUp>
            </div>

            {/* Meta Information */}
            <FadeInUp>
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
            </FadeInUp>

            {/* Key Achievement */}
            {project.achievements.length > 0 && (
              <FadeInUp>
                <div className={`p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700 transition-all duration-300 ${isHovered ? 'transform scale-105' : ''}`}>
                  <div className="flex items-start space-x-3">
                    <Target className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">Key Achievement</h4>
                      <p className="text-green-800 dark:text-green-300">{project.achievements[0]}</p>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            )}

            {/* Technology Stack */}
            <FadeInUp>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 ${isHovered ? 'hover:scale-105' : ''}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInUp>

            {/* Action Buttons */}
            <FadeInUp>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <ParticleButton explosionType="confetti">
                  <MagneticButton
                    variant="primary"
                    size="lg"
                    onClick={onViewDetails}
                    magnetStrength={0.4}
                    className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ${isHovered ? 'scale-105 shadow-lg' : ''}`}
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    <span>View Full Details</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </MagneticButton>
                </ParticleButton>

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MagneticButton
                      variant="outline"
                      size="lg"
                      magnetStrength={0.3}
                      className={`border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      <span>Live Demo</span>
                    </MagneticButton>
                  </a>
                )}
              </div>
            </FadeInUp>
          </div>

          {/* Metrics/Visual Side */}
          <div className={`space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
            
            {/* Project Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <FadeInRight>
                <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 ${isHovered ? 'transform scale-105' : ''}`}>
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Performance Metrics
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {project.metrics.map((metric, index) => (
                      <FadeInUp key={index}>
                        <div className={`text-center p-4 rounded-xl transition-all duration-300 border ${getMetricColor(metric.type)} ${isHovered ? 'transform scale-105' : ''}`}>
                          <div className="text-2xl font-bold mb-1">
                            {metric.value}
                          </div>
                          <div className="text-sm font-medium opacity-75">
                            {metric.label}
                          </div>
                        </div>
                      </FadeInUp>
                    ))}
                  </div>
                </div>
              </FadeInRight>
            )}

            {/* Project Impact */}
            {project.impact && (
              <FadeInRight>
                <div className={`p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl border border-purple-200 dark:border-purple-700 transition-all duration-500 ${isHovered ? 'transform scale-105' : ''}`}>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                    Business Impact
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.impact}
                  </p>
                </div>
              </FadeInRight>
            )}

            {/* Visual Representation */}
            <FadeInRight>
              <div className={`relative h-64 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-pink-900/30 rounded-2xl overflow-hidden transition-all duration-500 ${isHovered ? 'transform scale-105' : ''}`}>
                
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`border border-blue-300 dark:border-blue-600 transition-all duration-1000 ${
                          isHovered ? 'bg-blue-400 dark:bg-blue-500' : ''
                        }`}
                        style={{
                          animationDelay: `${i * 50}ms`,
                          transitionDelay: `${i * 20}ms`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Center Icon/Visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500 ${isHovered ? 'scale-125 rotate-12' : ''}`}>
                    <BarChart3 className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4">
                  <div className={`w-6 h-6 bg-yellow-400 rounded-full transition-all duration-700 ${isHovered ? 'scale-150 animate-bounce' : ''}`} />
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className={`w-4 h-4 bg-green-400 rounded-full transition-all duration-500 ${isHovered ? 'scale-125 animate-pulse' : ''}`} />
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>

        {/* Animated Bottom Border */}
        <div className={`h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ${isHovered ? 'h-2' : ''}`} />
      </div>
    </RevealOnScroll>
  );
};