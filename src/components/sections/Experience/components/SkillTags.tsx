import React, { useState, useMemo } from 'react';
import { Code, Database, Brain, Wrench, Globe, Filter } from 'lucide-react';
import { ExperienceData } from '../Experience';
import styles from '../Experience.module.css';

interface SkillTagsProps {
  experiences: ExperienceData[];
}

interface SkillCount {
  name: string;
  count: number;
  category: string;
  positions: string[];
}

const categoryConfig = {
  programming: {
    icon: <Code className="w-4 h-4" />,
    label: 'Programming Languages',
    color: 'blue',
    keywords: ['Python', 'Java', 'SQL', 'JavaScript', 'HTML', 'CSS']
  },
  data: {
    icon: <Database className="w-4 h-4" />,
    label: 'Data & Analytics',
    color: 'green',
    keywords: ['Pandas', 'NumPy', 'Seaborn', 'Plotly', 'Matplotlib', 'Statsmodels', 'APIs']
  },
  ml: {
    icon: <Brain className="w-4 h-4" />,
    label: 'Machine Learning',
    color: 'purple',
    keywords: ['PCA', 'UMAP', 'K-NN', 'Logistic Regression', 'Tree Classifiers', 'RANSAC', 'Clustering', 'Anomaly Detection', 'Computer Vision', 'Time Series']
  },
  frameworks: {
    icon: <Globe className="w-4 h-4" />,
    label: 'Frameworks & Libraries',
    color: 'orange',
    keywords: ['Spring MVC', 'React', 'Spring Boot', 'Flask', 'Streamlit', 'Backbone.js', 'REST APIs']
  },
  tools: {
    icon: <Wrench className="w-4 h-4" />,
    label: 'Tools & Platforms',
    color: 'gray',
    keywords: ['Git', 'Tableau', 'Pyzbar', 'Anaconda']
  }
};

export const SkillTags: React.FC<SkillTagsProps> = ({ experiences }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'count' | 'alphabetical'>('count');

  const skillsData = useMemo(() => {
    const skillMap = new Map<string, SkillCount>();

    experiences.forEach(exp => {
      exp.technologies.forEach(tech => {
        const existing = skillMap.get(tech);
        if (existing) {
          existing.count += 1;
          existing.positions.push(exp.position);
        } else {
          // Determine category
          let category = 'other';
          for (const [catKey, catConfig] of Object.entries(categoryConfig)) {
            if (catConfig.keywords.some(keyword => tech.toLowerCase().includes(keyword.toLowerCase()))) {
              category = catKey;
              break;
            }
          }

          skillMap.set(tech, {
            name: tech,
            count: 1,
            category,
            positions: [exp.position]
          });
        }
      });
    });

    return Array.from(skillMap.values());
  }, [experiences]);

  const filteredSkills = useMemo(() => {
    let filtered = selectedCategory === 'all' 
      ? skillsData 
      : skillsData.filter(skill => skill.category === selectedCategory);

    if (sortBy === 'count') {
      filtered.sort((a, b) => b.count - a.count);
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [skillsData, selectedCategory, sortBy]);

  const getCategoryCount = (category: string) => {
    return skillsData.filter(skill => skill.category === category).length;
  };

  const getCategoryColor = (category: string) => {
    const config = categoryConfig[category as keyof typeof categoryConfig];
    if (!config) return 'gray';
    
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-700',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-700',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-700',
      orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-700',
      gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
    };
    
    return colorMap[config.color as keyof typeof colorMap];
  };

  const getSkillIntensity = (count: number) => {
    const maxCount = Math.max(...skillsData.map(s => s.count));
    const intensity = count / maxCount;
    
    if (intensity >= 0.8) return 'high';
    if (intensity >= 0.5) return 'medium';
    return 'low';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Technology Stack Overview
        </h3>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Sort Control */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'count' | 'alphabetical')}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm"
            >
              <option value="count">By Usage</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-700'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All ({skillsData.length})
          </button>
          
          {Object.entries(categoryConfig).map(([key, config]) => {
            const count = getCategoryCount(key);
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 flex items-center space-x-2 ${
                  selectedCategory === key
                    ? getCategoryColor(key)
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {config.icon}
                <span>{config.label} ({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="space-y-6">
        {selectedCategory === 'all' ? (
          // Show by categories when 'all' is selected
          Object.entries(categoryConfig).map(([categoryKey, categoryConfig]) => {
            const categorySkills = skillsData.filter(skill => skill.category === categoryKey);
            if (categorySkills.length === 0) return null;

            return (
              <div key={categoryKey} className="border-l-4 border-blue-500 pl-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  {categoryConfig.icon}
                  <span className="ml-2">{categoryConfig.label}</span>
                  <span className="ml-2 text-sm text-gray-500">({categorySkills.length})</span>
                </h4>
                
                <div className="flex flex-wrap gap-3">
                  {categorySkills
                    .sort((a, b) => b.count - a.count)
                    .map((skill, index) => {
                      const intensity = getSkillIntensity(skill.count);
                      
                      return (
                        <div
                          key={index}
                          className={`group relative px-4 py-2 rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer ${getCategoryColor(categoryKey)}`}
                          title={`Used in: ${skill.positions.join(', ')}`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{skill.name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              intensity === 'high' ? 'bg-green-500 text-white' :
                              intensity === 'medium' ? 'bg-yellow-500 text-white' :
                              'bg-gray-400 text-white'
                            }`}>
                              {skill.count}
                            </span>
                          </div>
                          
                          {/* Hover tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                            Used in: {skill.positions.slice(0, 2).join(', ')}
                            {skill.positions.length > 2 && ` +${skill.positions.length - 2} more`}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })
        ) : (
          // Show filtered skills when a specific category is selected
          <div className="flex flex-wrap gap-3">
            {filteredSkills.map((skill, index) => {
              const intensity = getSkillIntensity(skill.count);
              
              return (
                <div
                  key={index}
                  className={`group relative px-4 py-2 rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer ${getCategoryColor(skill.category)}`}
                  title={`Used in: ${skill.positions.join(', ')}`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      intensity === 'high' ? 'bg-green-500 text-white' :
                      intensity === 'medium' ? 'bg-yellow-500 text-white' :
                      'bg-gray-400 text-white'
                    }`}>
                      {skill.count}
                    </span>
                  </div>
                  
                  {/* Hover tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    Used in: {skill.positions.slice(0, 2).join(', ')}
                    {skill.positions.length > 2 && ` +${skill.positions.length - 2} more`}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {skillsData.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Technologies
            </div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {skillsData.filter(s => s.count >= 3).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Core Skills
            </div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {Object.keys(categoryConfig).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Categories
            </div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {Math.max(...skillsData.map(s => s.count))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Max Usage
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};