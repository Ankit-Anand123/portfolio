import React, { useState } from 'react';
import { Code, Database, Brain, Wrench, Globe, Filter } from 'lucide-react';
import { ExperienceData } from '../Experience';
import { 
  RevealOnScroll, 
  FadeInUp,
  StaggerContainer,
  ScaleIn
} from '../../../animations';

interface SkillTagsProps {
  experiences: ExperienceData[];
}

type CategoryType = 'all' | 'programming' | 'data' | 'ml' | 'framework' | 'tools';

interface SkillCategory {
  id: CategoryType;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
}

const categories: SkillCategory[] = [
  {
    id: 'all',
    name: 'All Technologies',
    icon: <Globe className="w-4 h-4" />,
    color: 'text-gray-700 dark:text-gray-300',
    bgColor: 'bg-gray-100 dark:bg-gray-700',
    borderColor: 'border-gray-300 dark:border-gray-600'
  },
  {
    id: 'programming',
    name: 'Programming',
    icon: <Code className="w-4 h-4" />,
    color: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    borderColor: 'border-blue-300 dark:border-blue-700'
  },
  {
    id: 'data',
    name: 'Data Science',
    icon: <Database className="w-4 h-4" />,
    color: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    borderColor: 'border-green-300 dark:border-green-700'
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    icon: <Brain className="w-4 h-4" />,
    color: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    borderColor: 'border-purple-300 dark:border-purple-700'
  },
  {
    id: 'tools',
    name: 'Tools & Platforms',
    icon: <Wrench className="w-4 h-4" />,
    color: 'text-orange-700 dark:text-orange-300',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    borderColor: 'border-orange-300 dark:border-orange-700'
  }
];

export const SkillTags: React.FC<SkillTagsProps> = ({ experiences }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  // Extract all unique technologies
  const allTechnologies = Array.from(
    new Set(experiences.flatMap(exp => exp.technologies))
  );

  const getTechnologyCategory = (tech: string): CategoryType => {
    const programmingLangs = ['Python', 'Java', 'HTML', 'CSS', 'JavaScript'];
    const dataTools = ['Pandas', 'NumPy', 'Seaborn', 'Plotly', 'Matplotlib', 'Statsmodels'];
    const mlTools = ['PCA', 'UMAP', 'K-NN', 'Logistic Regression', 'Tree Classifiers', 'RANSAC', 'Clustering', 'Anomaly Detection', 'Feature Engineering', 'Classification', 'Scikit-learn'];
    const tools = ['Git', 'Tableau', 'APIs', 'SQL', 'Pyzbar', 'Spring MVC', 'React', 'Spring Boot', 'Flask', 'Streamlit', 'Backbone.js'];

    if (programmingLangs.some(lang => tech.includes(lang))) return 'programming';
    if (dataTools.some(tool => tech.includes(tool))) return 'data';
    if (mlTools.some(ml => tech.includes(ml))) return 'ml';
    if (tools.some(tool => tech.includes(tool))) return 'tools';
    return 'tools'; // Default fallback
  };

  const getSkillFrequency = (tech: string) => {
    return experiences.filter(exp => exp.technologies.includes(tech)).length;
  };

  const filteredTechnologies = selectedCategory === 'all' 
    ? allTechnologies 
    : allTechnologies.filter(tech => getTechnologyCategory(tech) === selectedCategory);

  // Sort by frequency and alphabetically
  const sortedTechnologies = filteredTechnologies.sort((a, b) => {
    const freqA = getSkillFrequency(a);
    const freqB = getSkillFrequency(b);
    
    if (freqA !== freqB) {
      return freqB - freqA; // Higher frequency first
    }
    return a.localeCompare(b); // Alphabetical for same frequency
  });

  const getCategoryForTech = (tech: string) => {
    const categoryId = getTechnologyCategory(tech);
    return categories.find(cat => cat.id === categoryId) || categories[4]; // Default to tools
  };

  const getSkillIntensity = (frequency: number) => {
    const maxFreq = Math.max(...allTechnologies.map(getSkillFrequency));
    const intensity = frequency / maxFreq;
    
    if (intensity >= 0.8) return 'high';
    if (intensity >= 0.5) return 'medium';
    return 'low';
  };

  const getIntensityStyles = (intensity: string, category: SkillCategory) => {
    const base = `${category.bgColor} ${category.color} border ${category.borderColor}`;
    
    switch (intensity) {
      case 'high':
        return `${base} ring-2 ring-offset-2 ring-current shadow-md font-semibold`;
      case 'medium':
        return `${base} shadow-sm font-medium`;
      default:
        return `${base} opacity-80`;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Category Filter */}
      <FadeInUp delay={0}>
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 mb-6">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-lg font-medium text-gray-900 dark:text-white">Filter Technologies</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <ScaleIn key={category.id} delay={index * 100}>
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-medium border transition-all duration-300 hover:scale-105 hover:shadow-md ${
                    selectedCategory === category.id
                      ? `${category.bgColor} ${category.color} border-current shadow-lg ring-2 ring-offset-2 ring-current`
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                  <span className={`ml-2 px-2 py-1 rounded-lg text-xs font-bold ${
                    selectedCategory === category.id 
                      ? 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {category.id === 'all' ? allTechnologies.length : allTechnologies.filter(tech => getTechnologyCategory(tech) === category.id).length}
                  </span>
                </button>
              </ScaleIn>
            ))}
          </div>
        </div>
      </FadeInUp>

      {/* Skills Section */}
      <RevealOnScroll direction="up" delay={200}>
        <div className="space-y-6">
          
          {/* Section Header */}
          <div className="text-center">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {categories.find(cat => cat.id === selectedCategory)?.name || 'All Technologies'}
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              {sortedTechnologies.length} technologies • Organized by experience level
            </p>
          </div>

          {/* Technologies Grid */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <StaggerContainer staggerDelay={50} direction="scale">
              <div className="flex flex-wrap gap-4 justify-center">
                {sortedTechnologies.map((tech, index) => {
                  const frequency = getSkillFrequency(tech);
                  const intensity = getSkillIntensity(frequency);
                  const category = getCategoryForTech(tech);
                  const styles = getIntensityStyles(intensity, category);
                  
                  return (
                    <div
                      key={tech}
                      className={`group relative px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-default ${styles}`}
                    >
                      <div className="flex items-center space-x-2">
                        {category.icon}
                        <span>{tech}</span>
                        {frequency > 1 && (
                          <span className="ml-2 px-2 py-1 bg-white dark:bg-gray-900 rounded-lg text-xs font-bold shadow-sm">
                            {frequency}
                          </span>
                        )}
                      </div>
                      
                      {/* Enhanced Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 shadow-xl">
                        <div className="font-bold">{tech}</div>
                        <div className="text-gray-300 dark:text-gray-600 text-xs">
                          Used in {frequency} position{frequency > 1 ? 's' : ''}
                        </div>
                        <div className="text-gray-300 dark:text-gray-600 text-xs">
                          Experience level: {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </StaggerContainer>

            {/* Experience Legend */}
            <FadeInUp delay={400}>
              <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
                <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-lg ring-2 ring-offset-1 ring-blue-500"></div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">High Experience (3+ positions)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-lg shadow-sm"></div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Medium Experience (2 positions)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-lg opacity-80"></div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Basic Experience (1 position)</span>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </RevealOnScroll>

      {/* Category Statistics */}
      <FadeInUp delay={600}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(1).map((category, index) => {
            const categoryCount = allTechnologies.filter(tech => getTechnologyCategory(tech) === category.id).length;
            
            return (
              <ScaleIn key={category.id} delay={index * 100}>
                <div className={`text-center p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg ${category.bgColor} ${category.borderColor}`}>
                  <div className="mb-3">
                    {React.cloneElement(category.icon as React.ReactElement, { className: `w-8 h-8 ${category.color} mx-auto` })}
                  </div>
                  <div className={`text-3xl font-bold ${category.color} mb-2`}>
                    {categoryCount}
                  </div>
                  <div className={`text-sm font-medium ${category.color}`}>
                    {category.name}
                  </div>
                </div>
              </ScaleIn>
            );
          })}
        </div>
      </FadeInUp>
    </div>
  );
};