import React from 'react';
import { Search, Filter, Brain, Globe, BarChart, Eye, Zap } from 'lucide-react';
import { ProjectData } from '../Projects';
import styles from '../Projects.module.css';

interface ProjectFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  projects: ProjectData[];
}

const categoryConfig = {
  'all': {
    label: 'All Projects',
    icon: <Filter className="w-4 h-4" />,
    color: 'gray'
  },
  'machine-learning': {
    label: 'Machine Learning',
    icon: <Brain className="w-4 h-4" />,
    color: 'purple'
  },
  'web-development': {
    label: 'Web Development',
    icon: <Globe className="w-4 h-4" />,
    color: 'blue'
  },
  'data-analysis': {
    label: 'Data Analytics',
    icon: <BarChart className="w-4 h-4" />,
    color: 'green'
  },
  'computer-vision': {
    label: 'Computer Vision',
    icon: <Eye className="w-4 h-4" />,
    color: 'orange'
  },
  'current': {
    label: 'Current Work',
    icon: <Zap className="w-4 h-4" />,
    color: 'red'
  }
};

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  projects
}) => {
  const getCategoryCount = (category: string) => {
    if (category === 'all') return projects.length;
    return projects.filter(project => project.category === category).length;
  };

  const getPopularTechnologies = () => {
    const techCount = new Map<string, number>();
    projects.forEach(project => {
      project.technologies.forEach(tech => {
        techCount.set(tech, (techCount.get(tech) || 0) + 1);
      });
    });
    
    return Array.from(techCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tech]) => tech);
  };

  const popularTechs = getPopularTechnologies();

  const handleTechClick = (tech: string) => {
    onSearchChange(tech);
  };

  return (
    <div className={styles.filterContainer}>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects by name, description, or technology..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
          Filter by Category
        </h4>
        <div className={styles.filterTabs}>
          {Object.entries(categoryConfig).map(([key, config]) => {
            const count = getCategoryCount(key);
            const isActive = selectedCategory === key;
            
            return (
              <button
                key={key}
                onClick={() => onCategoryChange(key)}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 flex items-center space-x-2 ${
                  selectedCategory === key
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                }`}
              >
                {config.icon}
                <span>{config.label}</span>
                <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Popular Technologies */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
          Popular Technologies
        </h4>
        <div className="flex flex-wrap gap-2">
          {popularTechs.map((tech) => (
            <button
              key={tech}
              onClick={() => handleTechClick(tech)}
              className={`px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 rounded-full transition-colors duration-200 ${
                searchTerm === tech ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Summary */}
      {(selectedCategory !== 'all' || searchTerm) && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            {selectedCategory !== 'all' && (
              <span className="flex items-center space-x-1">
                <span>Category:</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {categoryConfig[selectedCategory as keyof typeof categoryConfig]?.label}
                </span>
              </span>
            )}
            {searchTerm && (
              <span className="flex items-center space-x-1">
                <span>Search:</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  "{searchTerm}"
                </span>
              </span>
            )}
          </div>
          
          <button
            onClick={() => {
              onCategoryChange('all');
              onSearchChange('');
            }}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
          </div>
          
          <div>
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {projects.filter(p => p.status === 'ongoing').length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Ongoing</div>
          </div>
          
          <div>
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {projects.filter(p => p.featured).length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Featured</div>
          </div>
          
          <div>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {popularTechs.length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Top Tech</div>
          </div>
        </div>
      </div>
    </div>
  );
};