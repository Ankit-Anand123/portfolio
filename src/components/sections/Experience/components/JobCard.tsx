import React, { useState } from 'react';
import { Building, Calendar, MapPin, Target, Code, Award, ChevronDown, ChevronUp, ExternalLink, TrendingUp, Users, Zap } from 'lucide-react';
import { ExperienceData } from '../Experience';
import styles from '../Experience.module.css';
import { 
  RevealOnScroll, 
  FadeInUp, 
  FadeInRight,
  StaggerContainer
} from '../../../animations';

interface JobCardProps {
  experience: ExperienceData;
}

export const JobCard: React.FC<JobCardProps> = ({ experience }) => {
  const [expandedSection, setExpandedSection] = useState<'description' | 'achievements' | null>('description');

  const toggleSection = (section: 'description' | 'achievements') => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getCompanyUrl = (company: string) => {
    switch (company) {
      case 'Bosch Global Software Technologies':
        return 'https://www.bosch.com/';
      case 'Innova Solutions':
        return 'https://www.innovasolutions.com/';
      default:
        return null;
    }
  };

  const getTechnologyCategory = (tech: string) => {
    const programmingLangs = ['Python', 'Java', 'HTML', 'CSS', 'JavaScript'];
    const dataTools = ['Pandas', 'NumPy', 'Seaborn', 'Plotly', 'Matplotlib', 'Statsmodels'];
    const mlTools = ['PCA', 'UMAP', 'K-NN', 'Logistic Regression', 'Tree Classifiers', 'RANSAC', 'Clustering'];
    const frameworks = ['Spring MVC', 'React', 'Spring Boot', 'Flask', 'Streamlit', 'Backbone.js'];
    const tools = ['Git', 'Tableau', 'APIs', 'SQL', 'Pyzbar'];

    if (programmingLangs.some(lang => tech.includes(lang))) return 'programming';
    if (dataTools.some(tool => tech.includes(tool))) return 'data';
    if (mlTools.some(ml => tech.includes(ml))) return 'ml';
    if (frameworks.some(fw => tech.includes(fw))) return 'framework';
    if (tools.some(tool => tech.includes(tool))) return 'tools';
    return 'other';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      programming: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-700',
      data: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-700',
      ml: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-700',
      framework: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-700',
      tools: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600',
      other: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 border-pink-200 dark:border-pink-700'
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  const companyUrl = getCompanyUrl(experience.company);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      
      {/* Header Section */}
      <FadeInUp delay={0}>
        <div className="p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {experience.position}
              </h3>
              <div className="flex items-center space-x-2 mb-4">
                {companyUrl ? (
                  <a
                    href={companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center group transition-colors duration-300"
                  >
                    <Building className="w-5 h-5 mr-2" />
                    {experience.company}
                    <ExternalLink className="w-4 h-4 ml-1 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                ) : (
                  <div className="text-xl text-blue-600 dark:text-blue-400 font-semibold flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    {experience.company}
                  </div>
                )}
              </div>
            </div>
            
            {experience.type === 'current' && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                  Current Position
                </span>
              </div>
            )}
          </div>

          {/* Meta Information Grid */}
          <StaggerContainer staggerDelay={100} direction="right">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Calendar className="w-4 h-4 mr-3 text-blue-500 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Duration</div>
                  <div className="text-gray-600 dark:text-gray-400">{experience.duration}</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <MapPin className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Location</div>
                  <div className="text-gray-600 dark:text-gray-400">{experience.location}</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Target className="w-4 h-4 mr-3 text-purple-500 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Domain</div>
                  <div className="text-gray-600 dark:text-gray-400">{experience.domain}</div>
                </div>
              </div>
            </div>
          </StaggerContainer>
        </div>
      </FadeInUp>

      {/* Technologies Section */}
      <FadeInUp delay={200}>
        <div className="p-8 border-b border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Code className="w-5 h-5 mr-2 text-blue-500" />
            Technologies & Tools
          </h4>
          <div className="flex flex-wrap gap-3">
            {experience.technologies.map((tech, index) => {
              const category = getTechnologyCategory(tech);
              const colorClasses = getCategoryColor(category);
              
              return (
                <span
                  key={index}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 hover:scale-105 hover:shadow-sm ${colorClasses}`}
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </div>
      </FadeInUp>

      {/* Content Sections */}
      <div className="p-8 space-y-6">
        
        {/* Description Section */}
        <FadeInUp delay={400}>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('description')}
              className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-between transition-colors duration-200"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Users className="w-5 h-5 mr-2 text-orange-500" />
                Key Responsibilities
              </h4>
              {expandedSection === 'description' ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {expandedSection === 'description' && (
              <RevealOnScroll direction="up" duration={300}>
                <div className="p-6 bg-white dark:bg-gray-800">
                  <div className="space-y-4">
                    {experience.description.map((desc, index) => (
                      <FadeInUp key={index} delay={index * 100}>
                        <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {desc}
                          </p>
                        </div>
                      </FadeInUp>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            )}
          </div>
        </FadeInUp>

        {/* Achievements Section */}
        <FadeInUp delay={600}>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('achievements')}
              className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-between transition-colors duration-200"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Key Achievements
              </h4>
              {expandedSection === 'achievements' ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {expandedSection === 'achievements' && (
              <RevealOnScroll direction="up" duration={300}>
                <div className="p-6 bg-white dark:bg-gray-800">
                  <div className="space-y-4">
                    {experience.achievements.map((achievement, index) => (
                      <FadeInUp key={index} delay={index * 100}>
                        <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                            {achievement}
                          </p>
                        </div>
                      </FadeInUp>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            )}
          </div>
        </FadeInUp>

        {/* Impact Metrics */}
        <FadeInUp delay={800}>
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Position Impact
            </h4>
            <StaggerContainer staggerDelay={100} direction="up">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {experience.technologies.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Technologies
                  </div>
                </div>
                
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <Award className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {experience.achievements.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Achievements
                  </div>
                </div>
                
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <Target className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    1
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Domain
                  </div>
                </div>
              </div>
            </StaggerContainer>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
};