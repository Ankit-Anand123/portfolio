import React, { useState, useMemo } from 'react';
import { Code, Database, Brain, BarChart, Users, Wrench } from 'lucide-react';

interface Skill {
  category: string;
  level: number;
  description: string;
  icon: React.ReactNode;
  color: string;
  skills: string[];
}

export const SkillsRadar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const skillsData: Skill[] = useMemo(() => [
    {
      category: "Programming",
      level: 95,
      description: "Expert in Python and SQL with 6+ years of experience",
      icon: <Code className="w-5 h-5" />,
      color: "#3B82F6",
      skills: ["Python", "SQL", "Flask", "REST APIs"]
    },
    {
      category: "Data Science",
      level: 90,
      description: "Advanced ML, Statistical Analysis, and Computer Vision",
      icon: <Brain className="w-5 h-5" />,
      color: "#8B5CF6",
      skills: ["Machine Learning", "Statistical Analysis", "Computer Vision", "Feature Engineering", "Time Series", "Gen AI"]
    },
    {
      category: "Libraries",
      level: 88,
      description: "Proficient in modern data science and ML frameworks",
      icon: <Database className="w-5 h-5" />,
      color: "#10B981",
      skills: ["Pandas", "NumPy", "Scikit-learn", "Seaborn", "Plotly", "Streamlit", "LangChain"]
    },
    {
      category: "Analytics",
      level: 85,
      description: "Business intelligence and data visualization expertise",
      icon: <BarChart className="w-5 h-5" />,
      color: "#F59E0B",
      skills: ["Tableau", "Hypothesis Testing", "Predictive Modeling", "KPI Dashboards"]
    },
    {
      category: "Tools",
      level: 82,
      description: "Development and data management tools",
      icon: <Wrench className="w-5 h-5" />,
      color: "#EF4444",
      skills: ["Git", "Anaconda", "Docker", "APIs"]
    },
    {
      category: "Leadership",
      level: 80,
      description: "Team leadership and project management capabilities",
      icon: <Users className="w-5 h-5" />,
      color: "#06B6D4",
      skills: ["Team Leadership", "Ownership", "Analytical Thinking", "Problem-Solving"]
    }
  ], []);

  const svgSize = 300;
  const center = svgSize / 2;
  const maxRadius = 120;

  // Generate radar chart points
  const generateRadarPoints = (levels: number[]) => {
    const angleStep = (2 * Math.PI) / levels.length;
    return levels.map((level, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const radius = (level / 100) * maxRadius;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { x, y, level };
    });
  };

  const radarPoints = generateRadarPoints(skillsData.map(skill => skill.level));
  const pathData = radarPoints.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  // Generate grid circles
  const gridLevels = [20, 40, 60, 80, 100];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Skills Overview
      </h3>

      {/* Radar Chart */}
      <div className="flex justify-center mb-8">
        <svg width={svgSize} height={svgSize} className="overflow-visible">
          {/* Grid circles */}
          {gridLevels.map((level) => (
            <circle
              key={level}
              cx={center}
              cy={center}
              r={(level / 100) * maxRadius}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.2"
              className="text-gray-400"
            />
          ))}

          {/* Grid lines */}
          {skillsData.map((_, index) => {
            const angle = index * (2 * Math.PI) / skillsData.length - Math.PI / 2;
            const endX = center + maxRadius * Math.cos(angle);
            const endY = center + maxRadius * Math.sin(angle);
            
            return (
              <line
                key={index}
                x1={center}
                y1={center}
                x2={endX}
                y2={endY}
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.2"
                className="text-gray-400"
              />
            );
          })}

          {/* Radar area */}
          <path
            d={pathData}
            fill="url(#radarGradient)"
            stroke="#3B82F6"
            strokeWidth="2"
            opacity="0.8"
          />

          {/* Skill points */}
          {radarPoints.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="6"
              fill={skillsData[index].color}
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer hover:r-8 transition-all duration-200"
              onMouseEnter={() => setSelectedCategory(skillsData[index].category)}
              onMouseLeave={() => setSelectedCategory(null)}
            />
          ))}

          {/* Category labels */}
          {skillsData.map((skill, index) => {
            const angle = index * (2 * Math.PI) / skillsData.length - Math.PI / 2;
            const labelRadius = maxRadius + 25;
            const labelX = center + labelRadius * Math.cos(angle);
            const labelY = center + labelRadius * Math.sin(angle);
            
            return (
              <text
                key={index}
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-current text-gray-700 dark:text-gray-300 text-sm font-medium"
              >
                {skill.category}
              </text>
            );
          })}

          {/* Gradient definition */}
          <defs>
            <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Skills Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillsData.map((skill, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
              selectedCategory === skill.category
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
            onMouseEnter={() => setSelectedCategory(skill.category)}
            onMouseLeave={() => setSelectedCategory(null)}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
              >
                {skill.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {skill.category}
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {skill.level}% Proficiency
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {skill.description}
            </p>
            
            <div className="flex flex-wrap gap-1">
              {skill.skills.map((skillName, skillIndex) => (
                <span
                  key={skillIndex}
                  className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {skillName}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Skill Details Popup */}
      {selectedCategory && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          {(() => {
            const skill = skillsData.find(s => s.category === selectedCategory);
            return skill ? (
              <div className="text-center">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {skill.category} - {skill.level}% Proficiency
                </h5>
                <p className="text-gray-600 dark:text-gray-300">
                  {skill.description}
                </p>
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
};