import React, { useState, useEffect, useMemo } from 'react';
import { 
  Code, 
  Database, 
  Brain, 
  BarChart, 
  Users, 
  Wrench,
  TrendingUp,
  Target,
  Zap,
  MapPin,
  Calendar,
  Download,
  Sparkles,
  Award,
  Building,
  GraduationCap,
  Mail,
  Phone,
  Linkedin
} from 'lucide-react';
import { 
  AnimatedStats,
  MagneticButton,
  ParticleButton,
  GlitchText,
  CyberpunkGlitch,
  AdvancedTypewriter,
  MorphingBackground,
  StaggerContainer,
  ScaleIn
} from '../../animations';

const About: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'bio' | 'focus' | 'education'>('bio');

  // Enhanced Skills Data for the Spider Chart
  const skillsData = useMemo(() => [
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

  // Focus Areas with enhanced interactivity
  const focusAreas = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Sensor Data Analytics",
      description: "In-depth analysis of humidity effects in Inertial sensors using PCA and UMAP for higher dimension analysis.",
      color: "blue",
      progress: 85,
      impact: "20% accuracy improvement",
      timeline: "2023-2024"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Outlier Detection",
      description: "Advanced anomaly detection using Tree-based classifiers, clustering, RANSAC, and Elliptical Envelope techniques.",
      color: "green",
      progress: 90,
      impact: "95% anomaly detection rate",
      timeline: "2022-2024"
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "KPI Dashboards",
      description: "Designing comprehensive Tableau dashboards for analyzing KPI performance across various product lines.",
      color: "purple",
      progress: 80,
      impact: "40% faster insights",
      timeline: "2023-Present"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Generative AI",
      description: "Exploring LangChain and LangGraph for building intelligent AI-powered solutions and workflows.",
      color: "orange",
      progress: 70,
      impact: "Next-gen AI solutions",
      timeline: "2024-Present"
    }
  ];

  // Enhanced stats for animation
  const aboutStats = [
    { number: "6+", label: "Years Experience", duration: 2000, color: "blue" },
    { number: "3", label: "Companies", duration: 1500, color: "green" },
    { number: "15+", label: "Projects", duration: 2500, color: "purple" },
    { number: "93%", label: "Model Accuracy", duration: 3000, color: "orange" }
  ];

  // Spider Chart calculations
  const svgSize = 320;
  const center = svgSize / 2;
  const maxRadius = 130;

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

  const gridLevels = [20, 40, 60, 80, 100];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        border: "border-blue-200 dark:border-blue-700",
        icon: "text-blue-600 dark:text-blue-400",
        progress: "bg-blue-500",
        gradient: "from-blue-500 to-blue-600"
      },
      green: {
        bg: "bg-green-50 dark:bg-green-900/20",
        border: "border-green-200 dark:border-green-700",
        icon: "text-green-600 dark:text-green-400",
        progress: "bg-green-500",
        gradient: "from-green-500 to-green-600"
      },
      purple: {
        bg: "bg-purple-50 dark:bg-purple-900/20",
        border: "border-purple-200 dark:border-purple-700",
        icon: "text-purple-600 dark:text-purple-400",
        progress: "bg-purple-500",
        gradient: "from-purple-500 to-purple-600"
      },
      orange: {
        bg: "bg-orange-50 dark:bg-orange-900/20",
        border: "border-orange-200 dark:border-orange-700",
        icon: "text-orange-600 dark:text-orange-400",
        progress: "bg-orange-500",
        gradient: "from-orange-500 to-orange-600"
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <section id="about" className="relative min-h-screen py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <MorphingBackground intensity="light" />
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-20 ${
              i % 3 === 0 ? 'animate-float' : 
              i % 3 === 1 ? 'animate-float-delayed' : 'animate-float-slow'
            }`}
            style={{
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'][i % 4],
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <ParticleButton explosionType="sparkle">
              <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full">
                <span className="text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  About Me
                </span>
              </div>
            </ParticleButton>
          </div>
          
          <CyberpunkGlitch
            text="Meet Ankit Anand"
            trigger="auto"
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6"
          />
          
          <div className="max-w-3xl mx-auto">
            <AdvancedTypewriter
              texts={[
                "Dedicated Data Scientist with 6+ years of experience building data-intensive applications and helping businesses solve complex problems through analytics and machine learning."
              ]}
              typingSpeed={50}
              loop={false}
              className="text-xl text-gray-600 dark:text-gray-300"
            />
          </div>
        </div>

        {/* Interactive Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg border border-gray-200 dark:border-gray-700">
            {[
              { id: 'bio', label: 'Biography', icon: <Users className="w-4 h-4" /> },
              { id: 'focus', label: 'Current Focus', icon: <Target className="w-4 h-4" /> },
              { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> }
            ].map((tab) => (
              <MagneticButton
                key={tab.id}
                variant={activeTab === tab.id ? "primary" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id as any)}
                magnetStrength={0.2}
                className="mx-1"
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </MagneticButton>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          
          {/* Left Column - Dynamic Content */}
          <div className="space-y-8">
            
            {/* Bio Tab Content */}
            {activeTab === 'bio' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  {/* Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">AA</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Ankit Anand
                      </h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
                        Senior Data Scientist & Blogger
                      </p>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Professional Summary
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Dedicated and result-oriented Data Scientist and Blogger with a strong mathematical 
                      background and 6+ years of experience in building data-intensive applications. 
                      Proficient in descriptive analytics, predictive modeling, and data processing, 
                      helping businesses solve complex problems.
                    </p>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Coimbatore, Tamil Nadu, India
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <a 
                        href="mailto:ankitanand.2910@gmail.com"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        ankitanand.2910@gmail.com
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        +91 8249089552
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Linkedin className="w-5 h-5 text-gray-400" />
                      <a 
                        href="https://linkedin.com/in/ankitanand29"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        ankitanand29
                      </a>
                    </div>
                  </div>

                  {/* Current Role Highlight */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Bosch Global Software Technologies
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          Coimbatore, India
                          <Calendar className="w-3 h-3 ml-3 mr-1" />
                          September 2023 - Present
                        </p>
                      </div>
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Focus Tab Content */}
            {activeTab === 'focus' && (
              <div className="space-y-6">
                {focusAreas.map((area, index) => {
                  const colors = getColorClasses(area.color);
                  return (
                    <div 
                      key={index}
                      className={`${colors.bg} ${colors.border} border-2 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 transform`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg bg-white dark:bg-gray-800 ${colors.icon} shadow-md`}>
                          {area.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {area.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {area.description}
                          </p>
                          
                          {/* Progress Bar with Animation */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-300">Progress</span>
                              <span className={colors.icon}>{area.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${colors.progress} transition-all duration-1000 ease-out`}
                                style={{ width: `${area.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Impact & Timeline */}
                          <div className="flex justify-between mt-4 text-xs">
                            <span className={`px-2 py-1 rounded ${colors.bg} ${colors.icon} font-medium`}>
                              {area.impact}
                            </span>
                            <span className="text-gray-500">{area.timeline}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Education Tab Content */}
            {activeTab === 'education' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-3 mb-6">
                  <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Education & Certifications
                  </h3>
                </div>

                {/* Education */}
                <div className="space-y-6 mb-8">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
                    <div className="font-semibold text-xl text-gray-900 dark:text-white mb-2">
                      Master of Science: ML & AI
                    </div>
                    <div className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                      Woolf University Canterbury, England
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      March 2022 - June 2024
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-700">
                    <div className="font-semibold text-xl text-gray-900 dark:text-white mb-2">
                      B.Tech: Computer Science & Technology
                    </div>
                    <div className="text-green-600 dark:text-green-400 font-medium mb-2">
                      Indira Gandhi Institute of Technology, Sarang
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 flex justify-between">
                      <span>July 2014 - June 2018</span>
                      <span className="font-medium">CGPA: 8.23</span>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Professional Certifications
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">
                        Python for Data Science, AI & Development - Coursera
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">
                        Machine Learning Specialization - Coursera
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">
                        Advanced Analytics & Data Science Professional
                      </span>
                    </div>
                  </div>
                </div>

                {/* Publications */}
                <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    Research & Publications
                  </h5>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>"Analysis of the Attention Level of the Human Body in Different Forms"</strong><br/>
                    Published in Springer Nature, September 2018. Research focusing on human attention analysis using machine learning techniques.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Right Column - Compact Skills Radar Chart */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                <GlitchText text="Skills Radar" />
              </h3>

              {/* Compact Spider/Radar Chart */}
              <div className="flex justify-center mb-6">
                <svg width={280} height={280} className="overflow-visible">
                  {/* Grid circles */}
                  {gridLevels.map((level) => (
                    <circle
                      key={level}
                      cx={140}
                      cy={140}
                      r={(level / 100) * 110}
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
                    const endX = 140 + 110 * Math.cos(angle);
                    const endY = 140 + 110 * Math.sin(angle);
                    
                    return (
                      <line
                        key={index}
                        x1={140}
                        y1={140}
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
                    d={skillsData.map((skill, index) => {
                      const angle = index * (2 * Math.PI) / skillsData.length - Math.PI / 2;
                      const radius = (skill.level / 100) * 110;
                      const x = 140 + radius * Math.cos(angle);
                      const y = 140 + radius * Math.sin(angle);
                      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ') + ' Z'}
                    fill="url(#radarGradient)"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    opacity="0.6"
                    className="animate-pulse"
                  />

                  {/* Interactive Skill Points - Fixed Implementation */}
                  {skillsData.map((skill, index) => {
                    const angle = index * (2 * Math.PI) / skillsData.length - Math.PI / 2;
                    const radius = (skill.level / 100) * 110;
                    const x = 140 + radius * Math.cos(angle);
                    const y = 140 + radius * Math.sin(angle);
                    
                    return (
                      <g key={index}>
                        {/* Glow effect for selected skill */}
                        {selectedSkill === skill.category && (
                          <circle
                            cx={x}
                            cy={y}
                            r="15"
                            fill={skill.color}
                            opacity="0.3"
                            className="animate-ping"
                          />
                        )}
                        
                        {/* Hover ring */}
                        <circle
                          cx={x}
                          cy={y}
                          r="12"
                          fill="none"
                          stroke={skill.color}
                          strokeWidth="2"
                          opacity="0"
                          className="transition-opacity duration-200 hover:opacity-30 pointer-events-none"
                        />
                        
                        {/* Main skill point - Clickable */}
                        <circle
                          cx={x}
                          cy={y}
                          r={selectedSkill === skill.category ? "8" : "6"}
                          fill={skill.color}
                          stroke="white"
                          strokeWidth="3"
                          className="cursor-pointer transition-all duration-300 drop-shadow-md hover:r-8"
                          style={{
                            filter: selectedSkill === skill.category ? 'brightness(1.2) drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                            transformOrigin: `${x}px ${y}px`,
                            transform: selectedSkill === skill.category ? 'scale(1.3)' : 'scale(1)'
                          }}
                          onClick={() => {
                            setSelectedSkill(selectedSkill === skill.category ? null : skill.category);
                          }}
                        />
                      </g>
                    );
                  })}

                  {/* Category labels */}
                  {skillsData.map((skill, index) => {
                    const angle = index * (2 * Math.PI) / skillsData.length - Math.PI / 2;
                    const labelRadius = 130;
                    const labelX = 140 + labelRadius * Math.cos(angle);
                    const labelY = 140 + labelRadius * Math.sin(angle);
                    
                    return (
                      <text
                        key={index}
                        x={labelX}
                        y={labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className={`fill-current text-xs font-medium transition-colors duration-200 ${
                          selectedSkill === skill.category 
                            ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {skill.category}
                      </text>
                    );
                  })}

                  {/* Gradient definition */}
                  <defs>
                    <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>

              {/* Simple Skills Overview */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {skillsData.map((skill, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg border transition-all duration-200 text-center ${
                      selectedSkill === skill.category
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md'
                        : 'border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div 
                      className="flex justify-center mb-1"
                      style={{ color: skill.color }}
                    >
                      {skill.icon}
                    </div>
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {skill.category}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {skill.level}%
                    </div>
                  </div>
                ))}
              </div>

              {/* Click instruction */}
              <div className="text-center text-xs text-gray-500 dark:text-gray-400 mb-4 flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                Click on the radar points for details
              </div>

              {/* Expanded Skill Details - Only when radar point is clicked */}
              {selectedSkill && (
                <ScaleIn>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700 shadow-inner">
                    {(() => {
                      const skill = skillsData.find(s => s.category === selectedSkill);
                      return skill ? (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div 
                                className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
                                style={{ color: skill.color }}
                              >
                                {skill.icon}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {skill.category}
                                </h4>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Expert Level
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold" style={{ color: skill.color }}>
                                {skill.level}%
                              </div>
                              <div className="text-xs text-gray-500">
                                Proficiency
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            {skill.description}
                          </p>
                          
                          <div className="space-y-3">
                            <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                              Core Technologies
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {skill.skills.map((skillName, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="inline-flex items-center px-2 py-1 text-xs bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full border shadow-sm"
                                >
                                  {skillName}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Enhanced Progress Bar */}
                          <div className="mt-4">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600 dark:text-gray-400">Skill Level</span>
                              <span className="font-medium" style={{ color: skill.color }}>
                                {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Proficient'}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 shadow-inner">
                              <div 
                                className="h-2 rounded-full transition-all duration-1000 ease-out shadow-sm"
                                style={{ 
                                  width: `${skill.level}%`,
                                  backgroundColor: skill.color,
                                  boxShadow: `0 0 8px ${skill.color}40`
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* Close hint */}
                          <div className="text-center mt-3">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Click the point again to close
                            </span>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                </ScaleIn>
              )}

              {/* Overall Performance Stats */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {Math.round(skillsData.reduce((acc, skill) => acc + skill.level, 0) / skillsData.length)}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Overall Average
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {skillsData.filter(s => s.level >= 85).length}/{skillsData.length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Expert Level
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Animated Stats */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              <GlitchText text="Achievement Stats" />
            </h3>
          </div>
          
          <AnimatedStats
            stats={aboutStats}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            layout="grid"
          />
        </div>

        {/* Call to Action with Multiple Options */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ParticleButton explosionType="confetti">
              <MagneticButton
                variant="primary"
                size="lg"
                magnetStrength={0.5}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Download className="w-5 h-5 mr-2" />
                <span>Download Resume</span>
              </MagneticButton>
            </ParticleButton>

            <ParticleButton explosionType="cyber">
              <MagneticButton
                variant="outline"
                size="lg"
                magnetStrength={0.3}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                <span>View LinkedIn</span>
              </MagneticButton>
            </ParticleButton>
          </div>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to transform your data challenges into strategic opportunities? 
            Let's connect and explore how we can collaborate.
          </p>
        </div>

      </div>
    </section>
  );
};

export { About };