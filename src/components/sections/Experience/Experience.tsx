import React, { useState } from 'react';
import { Timeline } from './components/Timeline';
import { JobCard } from './components/JobCard';
import { SkillTags } from './components/SkillTags';
import styles from './Experience.module.css';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Target, 
  TrendingUp, 
  Code, 
  Award,
  Users,
  Building,
  Zap
} from 'lucide-react';
import { 
  RevealOnScroll, 
  FadeInUp, 
  FadeInLeft, 
  FadeInRight,
  StaggerContainer,
  SectionReveal,
  AnimatedStats,
  MagneticButton,
  ParticleButton,
  GlitchText,
  MorphingBackground,
  CyberpunkGlitch,
  AdvancedTypewriter
} from '../../animations';

export interface ExperienceData {
  id: string;
  company: string;
  position: string;
  duration: string;
  startDate: string;
  endDate: string;
  location: string;
  domain: string;
  description: string[];
  technologies: string[];
  achievements: string[];
  type: 'current' | 'past';
}

const experienceData: ExperienceData[] = [
  {
    id: 'bosch-2023',
    company: 'Bosch Global Software Technologies',
    position: 'Senior Data Scientist',
    duration: 'September 2023 - Present',
    startDate: '2023-09',
    endDate: 'Present',
    location: 'Coimbatore, India',
    domain: 'Sensor Technology',
    description: [
      'Performed in-depth analysis for parts affected by humidity in Inertial sensors using various higher dimension analysis tools like PCA and UMAP.',
      'Outlier detection was performed for the above-mentioned parts using Tree based classifiers for supervised approach and anomaly detection techniques for unsupervised approach like clustering, RANSAC, and Elliptical Envelope.',
      'Designed dashboards in Tableau for analyzing KPI performance for various products.'
    ],
    technologies: ['Python', 'PCA', 'UMAP', 'Tree Classifiers', 'RANSAC', 'Tableau', 'Clustering', 'Anomaly Detection'],
    achievements: [
      'Advanced sensor data analytics implementation',
      'Comprehensive outlier detection system',
      'Multi-product KPI dashboard suite'
    ],
    type: 'current'
  },
  {
    id: 'innova-senior-2023',
    company: 'Innova Solutions',
    position: 'Senior Data Scientist',
    duration: 'April 2023 - August 2023',
    startDate: '2023-04',
    endDate: '2023-08',
    location: 'Hyderabad, India',
    domain: 'Supply Chain, Procurement (Gerdau)',
    description: [
      'Price data for direct materials used in steel manufacturing was researched and acquired from multiple APIs and kept in the application database.',
      'Useful insights on trends, seasonality, and auto-correlation were gained by utilizing data analysis and visualization approaches using Matplotlib, Seaborn, and Statsmodels.',
      'Discovered anomalies in relation to 3 historical events by identifying change points in the historical data.',
      'Developed a model to forecast 90% confidence interval of the alloy prices and achieved a MAPE of 23%.',
      'Streamlit was used to develop a user interface for displaying the analysis and forecasted results.'
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Statsmodels', 'Streamlit', 'APIs'],
    achievements: [
      'Advanced time series forecasting model with 23% MAPE',
      'Historical anomaly detection system',
      'Interactive Streamlit dashboard'
    ],
    type: 'past'
  },
  {
    id: 'innova-2022',
    company: 'Innova Solutions',
    position: 'Data Scientist',
    duration: 'July 2022 - March 2023',
    startDate: '2022-07',
    endDate: '2023-03',
    location: 'Hyderabad, India',
    domain: 'Healthcare (Humana)',
    description: [
      'Developed an end-to-end machine learning model to identify high-risk patients in the healthcare domain.',
      'Applied various data preprocessing techniques and feature engineering to enhance model performance.',
      'Implemented classification algorithms achieving 82% accuracy in patient risk assessment.',
      'Created comprehensive data visualizations and reports for stakeholder presentations.'
    ],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Feature Engineering', 'Classification', 'Data Visualization'],
    achievements: [
      '82% accuracy in patient risk prediction',
      'End-to-end ML pipeline development',
      'Stakeholder presentation system'
    ],
    type: 'past'
  },
  {
    id: 'innova-2019',
    company: 'Innova Solutions',
    position: 'Software Engineer',
    duration: 'September 2019 - June 2022',
    startDate: '2019-09',
    endDate: '2022-06',
    location: 'Hyderabad, India',
    domain: 'Retail (Walmart)',
    description: [
      'Developed and maintained web applications using Java Spring framework and React.js.',
      'Implemented barcode scanning functionality using Python libraries for inventory management.',
      'Collaborated with cross-functional teams to deliver high-quality software solutions.',
      'Participated in code reviews and maintained coding standards across the development team.'
    ],
    technologies: ['Java', 'Spring MVC', 'React', 'JavaScript', 'HTML', 'CSS', 'Python', 'Pyzbar', 'Git'],
    achievements: [
      'Full-stack web application development',
      'Barcode scanning system implementation',
      'Cross-functional team collaboration'
    ],
    type: 'past'
  }
];

type TabType = 'overview' | 'journey' | 'technologies';

interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabConfig[] = [
  {
    id: 'overview',
    label: 'Career Overview',
    icon: <TrendingUp className="w-4 h-4" />
  },
  {
    id: 'journey',
    label: 'Professional Journey',
    icon: <Briefcase className="w-4 h-4" />
  },
  {
    id: 'technologies',
    label: 'Technology Stack',
    icon: <Code className="w-4 h-4" />
  }
];

export const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedExperience, setSelectedExperience] = useState<string>(experienceData[0].id);
  
  const currentExperience = experienceData.find(exp => exp.id === selectedExperience);

  // Stats for animated counter
  const careerStats = [
    { number: "4", label: "Positions", color: "text-blue-600 dark:text-blue-400" },
    { number: "6+", label: "Years", color: "text-green-600 dark:text-green-400" },
    { number: "2", label: "Cities", color: "text-purple-600 dark:text-purple-400" },
    { number: "5", label: "Domains", color: "text-orange-600 dark:text-orange-400" }
  ];

  return (
    <section id="experience" className="relative min-h-screen py-20 overflow-hidden">
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
            } ${
              i % 4 === 0 ? 'bg-blue-400 dark:bg-blue-600' :
              i % 4 === 1 ? 'bg-purple-400 dark:bg-purple-600' :
              i % 4 === 2 ? 'bg-green-400 dark:bg-green-600' :
              'bg-orange-400 dark:bg-orange-600'
            }`}
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionReveal className="text-center mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <CyberpunkGlitch
                text="Professional Experience"
                trigger="auto"
                className="bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
              />
            </h2>
            <div className="max-w-3xl mx-auto">
              <AdvancedTypewriter
                texts={[
                  "My journey through the world of data science and software engineering, building impactful solutions across diverse domains and technologies."
                ]}
                typingSpeed={50}
                loop={false}
                className="text-xl text-gray-600 dark:text-gray-300"
              />
            </div>
          </div>
        </SectionReveal>

        {/* Tab Navigation */}
        <FadeInUp delay={400}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <MagneticButton
                key={tab.id}
                variant={activeTab === tab.id ? "primary" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                magnetStrength={0.2}
                className="mx-1"
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </MagneticButton>
            ))}
          </div>
        </FadeInUp>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            
            {/* Career Stats */}
            <FadeInUp delay={600}>
              <AnimatedStats 
                stats={careerStats}
                layout="grid"
                className="max-w-4xl mx-auto mb-12"
              />
            </FadeInUp>

            {/* Career Summary Cards */}
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Current Position Card */}
              <FadeInLeft delay={800}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Current Position
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-600 dark:text-green-400 font-medium">Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Senior Data Scientist
                    </h4>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      Bosch Global Software Technologies
                    </p>
                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Since September 2023</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Coimbatore, India</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        <span>Sensor Technology</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInLeft>

              {/* Career Growth Card */}
              <FadeInRight delay={800}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Career Growth
                      </h3>
                      <p className="text-lg text-purple-600 dark:text-purple-400 font-medium">
                        Progressive Development
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Role Evolution</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Engineer → Senior Data Scientist</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Industry Impact</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">5 Different Domains</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Geographic Reach</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Hyderabad → Coimbatore</span>
                    </div>
                  </div>
                </div>
              </FadeInRight>
            </div>

            {/* Call to Action */}
            <FadeInUp delay={1000}>
              <div className="text-center space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ParticleButton explosionType="confetti">
                    <MagneticButton
                      variant="primary"
                      size="lg"
                      magnetStrength={0.5}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => setActiveTab('journey')}
                    >
                      <Briefcase className="w-5 h-5 mr-2" />
                      <span>Explore My Journey</span>
                    </MagneticButton>
                  </ParticleButton>

                  <ParticleButton explosionType="cyber">
                    <MagneticButton
                      variant="outline"
                      size="lg"
                      magnetStrength={0.3}
                      className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                      onClick={() => setActiveTab('technologies')}
                    >
                      <Code className="w-5 h-5 mr-2" />
                      <span>View Tech Stack</span>
                    </MagneticButton>
                  </ParticleButton>
                </div>
              </div>
            </FadeInUp>
          </div>
        )}

        {activeTab === 'journey' && (
          <div className="space-y-12">
            
            {/* Journey Section Header */}
            <div className="grid lg:grid-cols-3 gap-8">
            
              {/* Left: Timeline */}
              <FadeInLeft delay={600} className="lg:col-span-1">
                <div className="lg:sticky lg:top-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                      Career Timeline
                    </h3>
                    <Timeline 
                      experiences={experienceData}
                      selectedId={selectedExperience}
                      onSelect={setSelectedExperience}
                    />
                  </div>
                </div>
              </FadeInLeft>

              {/* Right: Job Details */}
              <FadeInRight delay={800} className="lg:col-span-2">
                <div className="min-h-[600px]">
                  {currentExperience && (
                    <RevealOnScroll 
                      key={currentExperience.id} 
                      direction="up" 
                      duration={500}
                      className="h-full"
                    >
                      <JobCard experience={currentExperience} />
                    </RevealOnScroll>
                  )}
                </div>
              </FadeInRight>
            </div>
          </div>
        )}

        {activeTab === 'technologies' && (
          <div className="space-y-8">
            
            {/* Technology Section Header */}
            <div className="text-center">
              <FadeInUp delay={0}>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Technology Ecosystem
                </h3>
              </FadeInUp>
              <FadeInUp delay={200}>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                  A comprehensive collection of technologies, frameworks, and tools I've mastered 
                  across different roles and projects throughout my career journey.
                </p>
              </FadeInUp>
            </div>

            <FadeInUp delay={400}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                <SkillTags experiences={experienceData} />
              </div>
            </FadeInUp>
          </div>
        )}
      </div>
    </section>
  );
};