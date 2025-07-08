import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/sections/Hero';
import { ArrowRight, User, Briefcase, FolderOpen, Brain, Camera, FileText, Mail } from 'lucide-react';

export const HomePage: React.FC = () => {
  const sections = [
    {
      id: 'about',
      title: 'About Me',
      description: 'Learn about my background, skills, and current focus areas in data science and machine learning.',
      icon: <User className="w-6 h-6" />,
      path: '/about',
      color: 'blue'
    },
    {
      id: 'experience',
      title: 'Professional Journey',
      description: '6+ years of experience across multiple companies and domains with proven track record.',
      icon: <Briefcase className="w-6 h-6" />,
      path: '/experience',
      color: 'green'
    },
    {
      id: 'projects',
      title: 'Project Portfolio',
      description: 'Showcase of innovative solutions with real-world impact and measurable results.',
      icon: <FolderOpen className="w-6 h-6" />,
      path: '/projects',
      color: 'purple'
    },
    {
      id: 'ai-labs',
      title: 'AI Playground',
      description: 'Interactive AI features including resume analyzer and data story generator.',
      icon: <Brain className="w-6 h-6" />,
      path: '/ai-labs',
      color: 'orange'
    },
    {
      id: 'creative',
      title: 'Creative Corner',
      description: 'Photography gallery and poetry with AI-powered sentiment analysis.',
      icon: <Camera className="w-6 h-6" />,
      path: '/creative',
      color: 'pink'
    },
    {
      id: 'blog',
      title: 'Technical Blog',
      description: 'Insights, tutorials, and thoughts on data science, AI, and technology trends.',
      icon: <FileText className="w-6 h-6" />,
      path: '/blog',
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400',
      green: 'bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 border-green-200 dark:border-green-700 text-green-600 dark:text-green-400',
      purple: 'bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400',
      orange: 'bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/30 border-orange-200 dark:border-orange-700 text-orange-600 dark:text-orange-400',
      pink: 'bg-pink-50 hover:bg-pink-100 dark:bg-pink-900/20 dark:hover:bg-pink-900/30 border-pink-200 dark:border-pink-700 text-pink-600 dark:text-pink-400',
      indigo: 'bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero />
      
      {/* Portfolio Navigation */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore My Portfolio
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover my journey through data science, machine learning, and software development.
              Each section showcases different aspects of my expertise and passion for innovation.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section) => (
              <Link
                key={section.id}
                to={section.path}
                className={`group p-8 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${getColorClasses(section.color)}`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {section.description}
                </p>
                
                <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
                  <span className="mr-2">Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">6+</div>
              <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">6</div>
              <div className="text-gray-600 dark:text-gray-300">Major Projects</div>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">25+</div>
              <div className="text-gray-600 dark:text-gray-300">Technologies</div>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">93%</div>
              <div className="text-gray-600 dark:text-gray-300">Best Accuracy</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              <span>Get In Touch</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};