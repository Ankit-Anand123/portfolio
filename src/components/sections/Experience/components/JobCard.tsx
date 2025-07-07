import React, { useState } from 'react';
import { Building, Calendar, MapPin, Target, Code, Award, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { ExperienceData } from '../Experience';
import styles from '../Experience.module.css';

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
      programming: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      data: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      ml: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      framework: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      tools: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      other: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  const companyUrl = getCompanyUrl(experience.company);

  return (
    <div className={`${styles.jobCard} ${experience.type === 'current' ? styles.currentJob : ''} p-8`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {experience.position}
            </h3>
            <div className="flex items-center space-x-2 mb-2">
              {companyUrl ? (
                <a
                  href={companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center"
                >
                  <Building className="w-5 h-5 mr-2" />
                  {experience.company}
                  <ExternalLink className="w-4 h-4 ml-1" />
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

        {/* Meta Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{experience.location}</span>
          </div>
          <div className="flex items-center">
            <Target className="w-4 h-4 mr-2" />
            <span>{experience.domain}</span>
          </div>
        </div>
      </div>

      {/* Technologies */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
          <Code className="w-5 h-5 mr-2" />
          Technologies & Tools
        </h4>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech, index) => {
            const category = getTechnologyCategory(tech);
            const colorClass = getCategoryColor(category);
            
            return (
              <span
                key={index}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${colorClass}`}
              >
                {tech}
              </span>
            );
          })}
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-6">
        {/* Description Section */}
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('description')}
            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Key Responsibilities
            </h4>
            {expandedSection === 'description' ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          
          {expandedSection === 'description' && (
            <div className="px-6 py-4 bg-white dark:bg-gray-800">
              <ul className="space-y-3">
                {experience.description.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Achievements Section */}
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('achievements')}
            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Key Achievements
            </h4>
            {expandedSection === 'achievements' ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          
          {expandedSection === 'achievements' && (
            <div className="px-6 py-4 bg-white dark:bg-gray-800">
              <div className="grid gap-4">
                {experience.achievements.map((achievement, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-700">
                    <div className="flex items-start">
                      <Award className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-800 dark:text-gray-200 font-medium">
                        {achievement}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Impact Metrics (if available) */}
      {(experience.id === 'innova-ds-2020' || experience.id === 'innova-senior-2023') && (
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Metrics
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {experience.id === 'innova-ds-2020' && (
              <>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">93%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Shipment Prediction Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">82%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Treatment Recommendation Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Major Projects Delivered</div>
                </div>
              </>
            )}
            {experience.id === 'innova-senior-2023' && (
              <>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">23%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">MAPE Achievement</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">90%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Confidence Interval</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Historical Anomalies Detected</div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};