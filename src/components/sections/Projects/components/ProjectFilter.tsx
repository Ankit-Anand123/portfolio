import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Brain, 
  Code, 
  BarChart3, 
  Camera, 
  Zap,
  Grid,
  X
} from 'lucide-react';
import { 
  MagneticButton,
  FadeInUp,
  StaggerContainer
} from '../../../animations';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: 'machine-learning' | 'web-development' | 'data-analysis' | 'computer-vision' | 'current';
  status: 'completed' | 'ongoing' | 'research';
  technologies: string[];
  duration: string;
  company: string;
  achievements: string[];
  featured?: boolean;
}

interface ProjectFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  projects: ProjectData[];
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  projects
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories = [
    { 
      id: 'all', 
      label: 'All Projects', 
      icon: <Grid className="w-4 h-4" />,
      color: 'blue',
      count: projects.length
    },
    { 
      id: 'machine-learning', 
      label: 'Machine Learning', 
      icon: <Brain className="w-4 h-4" />,
      color: 'purple',
      count: projects.filter(p => p.category === 'machine-learning').length
    },
    { 
      id: 'web-development', 
      label: 'Web Development', 
      icon: <Code className="w-4 h-4" />,
      color: 'blue',
      count: projects.filter(p => p.category === 'web-development').length
    },
    { 
      id: 'data-analysis', 
      label: 'Data Analysis', 
      icon: <BarChart3 className="w-4 h-4" />,
      color: 'green',
      count: projects.filter(p => p.category === 'data-analysis').length
    },
    { 
      id: 'computer-vision', 
      label: 'Computer Vision', 
      icon: <Camera className="w-4 h-4" />,
      color: 'orange',
      count: projects.filter(p => p.category === 'computer-vision').length
    },
    { 
      id: 'current', 
      label: 'Current', 
      icon: <Zap className="w-4 h-4" />,
      color: 'red',
      count: projects.filter(p => p.category === 'current').length
    }
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const baseClasses = isActive ? 'bg-gradient-to-r text-white border-transparent' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500';
    
    if (isActive) {
      switch (color) {
        case 'purple': return `${baseClasses} from-purple-500 to-pink-500`;
        case 'blue': return `${baseClasses} from-blue-500 to-cyan-500`;
        case 'green': return `${baseClasses} from-green-500 to-emerald-500`;
        case 'orange': return `${baseClasses} from-orange-500 to-red-500`;
        case 'red': return `${baseClasses} from-red-500 to-pink-500`;
        default: return `${baseClasses} from-gray-500 to-gray-600`;
      }
    }
    
    return baseClasses;
  };

  return (
    <div className="mb-12 space-y-6">
      
      {/* Search Bar */}
      <FadeInUp>
        <div className="max-w-md mx-auto">
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`w-5 h-5 transition-colors duration-300 ${
                isSearchFocused ? 'text-blue-500' : 'text-gray-400'
              }`} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search projects, technologies, or keywords..."
              className={`
                w-full pl-10 pr-10 py-3 border rounded-xl
                bg-white dark:bg-gray-800 
                text-gray-900 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${isSearchFocused 
                  ? 'border-blue-500 shadow-lg' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                }
              `}
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </FadeInUp>

      {/* Category Filters */}
      <FadeInUp>
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter by Category</span>
          </div>
        </div>
        
        <StaggerContainer staggerDelay={100}>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <FadeInUp key={category.id}>
                <MagneticButton
                  variant={selectedCategory === category.id ? "primary" : "outline"}
                  size="sm"
                  onClick={() => onCategoryChange(category.id)}
                  magnetStrength={0.3}
                  className={`
                    group relative overflow-hidden border transition-all duration-300
                    ${getColorClasses(category.color, selectedCategory === category.id)}
                    ${selectedCategory === category.id ? 'shadow-lg scale-105' : 'hover:scale-105 hover:shadow-md'}
                  `}
                >
                  <div className="flex items-center space-x-2 relative z-10">
                    <span className={`transition-transform duration-300 ${
                      selectedCategory === category.id ? 'scale-110' : 'group-hover:scale-110'
                    }`}>
                      {category.icon}
                    </span>
                    <span className="font-medium">{category.label}</span>
                    <span className={`
                      px-2 py-0.5 rounded-full text-xs font-bold transition-all duration-300
                      ${selectedCategory === category.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }
                    `}>
                      {category.count}
                    </span>
                  </div>
                  
                  {/* Animated Background */}
                  <div className={`
                    absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300
                    bg-gradient-to-r
                    ${category.color === 'purple' ? 'from-purple-500 to-pink-500' :
                      category.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                      category.color === 'green' ? 'from-green-500 to-emerald-500' :
                      category.color === 'orange' ? 'from-orange-500 to-red-500' :
                      category.color === 'red' ? 'from-red-500 to-pink-500' :
                      'from-gray-500 to-gray-600'
                    }
                  `} />
                </MagneticButton>
              </FadeInUp>
            ))}
          </div>
        </StaggerContainer>
      </FadeInUp>

      {/* Active Filters Display */}
      {(selectedCategory !== 'all' || searchTerm) && (
        <FadeInUp>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <span className="text-gray-600 dark:text-gray-400">Active filters:</span>
            
            {selectedCategory !== 'all' && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                <span>Category: {categories.find(c => c.id === selectedCategory)?.label}</span>
                <button
                  onClick={() => onCategoryChange('all')}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {searchTerm && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                <span>Search: "{searchTerm}"</span>
                <button
                  onClick={() => onSearchChange('')}
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-colors duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {(selectedCategory !== 'all' || searchTerm) && (
              <MagneticButton
                variant="ghost"
                size="sm"
                onClick={() => {
                  onCategoryChange('all');
                  onSearchChange('');
                }}
                magnetStrength={0.2}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Clear all
              </MagneticButton>
            )}
          </div>
        </FadeInUp>
      )}
    </div>
  );
};