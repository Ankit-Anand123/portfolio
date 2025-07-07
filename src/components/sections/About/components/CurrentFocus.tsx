import React from 'react';
import { Zap, Target, TrendingUp, Brain, Database, BarChart3 } from 'lucide-react';

export const CurrentFocus: React.FC = () => {
  const focusAreas = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Sensor Data Analytics",
      description: "In-depth analysis of humidity effects in Inertial sensors using PCA and UMAP for higher dimension analysis.",
      color: "blue",
      progress: 85
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Outlier Detection",
      description: "Advanced anomaly detection using Tree-based classifiers, clustering, RANSAC, and Elliptical Envelope techniques.",
      color: "green",
      progress: 90
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "KPI Dashboards",
      description: "Designing comprehensive Tableau dashboards for analyzing KPI performance across various product lines.",
      color: "purple",
      progress: 80
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Generative AI",
      description: "Exploring LangChain and LangGraph for building intelligent AI-powered solutions and workflows.",
      color: "orange",
      progress: 70
    }
  ];

  const currentRole = {
    company: "Bosch Global Software Technologies",
    position: "Senior Data Scientist",
    domain: "Sensor Technology",
    startDate: "September 2023",
    location: "Coimbatore, India"
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        border: "border-blue-200 dark:border-blue-700",
        icon: "text-blue-600 dark:text-blue-400",
        progress: "bg-blue-500"
      },
      green: {
        bg: "bg-green-50 dark:bg-green-900/20",
        border: "border-green-200 dark:border-green-700",
        icon: "text-green-600 dark:text-green-400",
        progress: "bg-green-500"
      },
      purple: {
        bg: "bg-purple-50 dark:bg-purple-900/20",
        border: "border-purple-200 dark:border-purple-700",
        icon: "text-purple-600 dark:text-purple-400",
        progress: "bg-purple-500"
      },
      orange: {
        bg: "bg-orange-50 dark:bg-orange-900/20",
        border: "border-orange-200 dark:border-orange-700",
        icon: "text-orange-600 dark:text-orange-400",
        progress: "bg-orange-500"
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      {/* Current Role Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Current Focus
          </h3>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
          <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {currentRole.position}
          </div>
          <div className="text-blue-600 dark:text-blue-400 font-medium mb-1">
            {currentRole.company}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 flex flex-wrap gap-4">
            <span>Domain: {currentRole.domain}</span>
            <span>•</span>
            <span>Since {currentRole.startDate}</span>
            <span>•</span>
            <span>{currentRole.location}</span>
          </div>
        </div>
      </div>

      {/* Focus Areas */}
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Key Areas of Expertise
        </h4>
        
        {focusAreas.map((area, index) => {
          const colors = getColorClasses(area.color);
          
          return (
            <div 
              key={index}
              className={`${colors.bg} ${colors.border} border rounded-lg p-6 transition-all duration-300 hover:shadow-md`}
            >
              <div className="flex items-start space-x-4">
                <div className={`${colors.icon} p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm`}>
                  {area.icon}
                </div>
                
                <div className="flex-1">
                  <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {area.title}
                  </h5>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {area.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-medium text-gray-900 dark:text-white">{area.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`${colors.progress} h-2 rounded-full transition-all duration-500 ease-out`}
                        style={{ width: `${area.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Research Interest */}
      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-3 mb-3">
          <Database className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
            Research & Publications
          </h5>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Published research on "Analysis of the Attention Level of the Human Body in Different Forms" 
          (Springer Nature, September 2018). Continuing research in sensor analytics and machine learning applications.
        </p>
      </div>
    </div>
  );
};