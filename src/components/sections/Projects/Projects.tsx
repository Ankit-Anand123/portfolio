import React, { useState } from 'react';
import { ProjectCard } from './components/ProjectCard';
import { ProjectFilter } from './components/ProjectFilter';
import { FeaturedProject } from './components/FeaturedProject';
import { ProjectModal } from './components/ProjectModal';
import { 
  FolderOpen, 
  Code, 
  Brain, 
  Zap, 
  TrendingUp,
  Target,
  Award,
  Users,
  Building,
  Calendar
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

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'machine-learning' | 'web-development' | 'data-analysis' | 'computer-vision' | 'current';
  status: 'completed' | 'ongoing' | 'research';
  technologies: string[];
  duration: string;
  company: string;
  achievements: string[];
  metrics?: {
    label: string;
    value: string;
    type: 'accuracy' | 'performance' | 'scale' | 'impact';
  }[];
  impact?: string;
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

const projectsData: ProjectData[] = [
  {
    id: 'steel-forecasting',
    title: 'Steel Price Forecasting System',
    description: 'Advanced time series analysis for Gerdau steel manufacturing, achieving 90% confidence intervals with 23% MAPE accuracy.',
    longDescription: 'Developed a comprehensive forecasting model for direct materials used in steel manufacturing. The system analyzes trends, seasonality, and auto-correlation while identifying historical anomalies and change points.',
    category: 'machine-learning',
    status: 'completed',
    technologies: ['Python', 'Statsmodels', 'Streamlit', 'APIs', 'Time Series Analysis', 'Pandas', 'NumPy'],
    duration: 'April 2023 - August 2023',
    company: 'Innova Solutions (Gerdau)',
    achievements: [
      'Achieved 23% MAPE accuracy in price forecasting',
      'Identified 3 historical anomalies with 90% confidence intervals',
      'Optimized procurement decisions saving significant costs'
    ],
    metrics: [
      {
        label: 'MAPE Accuracy',
        value: '23%',
        type: 'accuracy'
      },
      {
        label: 'Confidence Interval',
        value: '90%',
        type: 'performance'
      }
    ],
    impact: 'Revolutionized steel procurement decisions with advanced forecasting, enabling proactive cost management and supply chain optimization.',
    featured: true
  },
  {
    id: 'shipment-predictor',
    title: 'Shipment Delay Predictor',
    description: 'ML model predicting logistics delays with 93% accuracy, optimizing supply chain operations.',
    longDescription: 'Built a machine learning model to predict shipment delays using historical data, weather patterns, and logistics variables. The system enables proactive intervention and resource allocation.',
    category: 'machine-learning',
    status: 'completed',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'APIs'],
    duration: 'March 2023 - June 2023',
    company: 'Innova Solutions',
    achievements: [
      'Achieved 93% accuracy in delay prediction',
      'Reduced operational costs by 15%',
      'Improved customer satisfaction scores'
    ],
    metrics: [
      {
        label: 'Prediction Accuracy',
        value: '93%',
        type: 'accuracy'
      },
      {
        label: 'Cost Reduction',
        value: '15%',
        type: 'impact'
      }
    ],
    impact: 'Transformed logistics operations with predictive insights, enabling better customer service and resource optimization.',
    featured: false
  },
  {
    id: 'patient-risk-assessment',
    title: 'Patient Risk Assessment System',
    description: 'Healthcare analytics platform with 82% accuracy in predicting patient readmission risks.',
    longDescription: 'Developed a comprehensive risk assessment system for healthcare providers to predict patient readmission likelihood and optimize care delivery.',
    category: 'machine-learning',
    status: 'completed',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Healthcare APIs', 'Machine Learning'],
    duration: 'January 2023 - April 2023',
    company: 'Innova Solutions',
    achievements: [
      'Achieved 82% accuracy in risk prediction',
      'Improved patient care outcomes',
      'Reduced readmission rates by 12%'
    ],
    metrics: [
      {
        label: 'Risk Prediction Accuracy',
        value: '82%',
        type: 'accuracy'
      },
      {
        label: 'Readmission Reduction',
        value: '12%',
        type: 'impact'
      }
    ],
    impact: 'Enhanced healthcare delivery with predictive analytics, improving patient outcomes and reducing healthcare costs.',
    featured: false
  },
  {
    id: 'library-automation',
    title: 'Library Automation System',
    description: 'Face recognition and QR code-based library management system with advanced computer vision.',
    longDescription: 'Developed a comprehensive library automation system using face recognition and QR code technology for seamless user experience and efficient book management.',
    category: 'computer-vision',
    status: 'completed',
    technologies: ['Python', 'OpenCV', 'Face Recognition', 'QR Code', 'Computer Vision', 'Pyzbar'],
    duration: 'September 2022 - December 2022',
    company: 'Innova Solutions',
    achievements: [
      'Implemented face recognition with 95% accuracy',
      'Automated book checkout/return processes',
      'Reduced manual workload by 80%'
    ],
    metrics: [
      {
        label: 'Recognition Accuracy',
        value: '95%',
        type: 'accuracy'
      },
      {
        label: 'Automation Efficiency',
        value: '80%',
        type: 'performance'
      }
    ],
    impact: 'Modernized library operations with computer vision, creating a seamless and efficient user experience.',
    featured: true
  },
  {
    id: 'sensor-humidity-analysis',
    title: 'Sensor Humidity Analysis Dashboard',
    description: 'Interactive Tableau dashboard for IoT sensor data analysis with PCA and UMAP dimensionality reduction.',
    longDescription: 'Created an advanced analytics dashboard for IoT sensor data, implementing unsupervised learning techniques and interactive visualizations for humidity analysis.',
    category: 'data-analysis',
    status: 'ongoing',
    technologies: ['Python', 'Tableau', 'PCA', 'UMAP', 'Clustering', 'IoT Sensors'],
    duration: 'September 2023 - Present',
    company: 'Bosch Global Software Technologies',
    achievements: [
      'Implemented PCA and UMAP for dimensionality reduction',
      'Created interactive Tableau dashboards',
      'Identified sensor anomalies and patterns'
    ],
    metrics: [
      {
        label: 'Data Processing Speed',
        value: '3x',
        type: 'performance'
      },
      {
        label: 'Anomaly Detection',
        value: '99%',
        type: 'accuracy'
      }
    ],
    impact: 'Enabled data-driven decision making for IoT sensor networks with advanced analytics and visualization.',
    featured: false
  },
  {
    id: 'anomaly-detection-suite',
    title: 'Anomaly Detection Suite',
    description: 'Comprehensive anomaly detection system using tree-based classifiers and advanced algorithms.',
    longDescription: 'Developed a robust anomaly detection system using multiple machine learning algorithms including tree-based classifiers and ensemble methods.',
    category: 'machine-learning',
    status: 'ongoing',
    technologies: ['Python', 'Scikit-learn', 'Tree Classifiers', 'Anomaly Detection', 'RANSAC', 'Clustering'],
    duration: 'October 2023 - Present',
    company: 'Bosch Global Software Technologies',
    achievements: [
      'Implemented multiple anomaly detection algorithms',
      'Achieved high precision in outlier detection',
      'Reduced false positive rates by 25%'
    ],
    metrics: [
      {
        label: 'Detection Precision',
        value: '94%',
        type: 'accuracy'
      },
      {
        label: 'False Positive Reduction',
        value: '25%',
        type: 'performance'
      }
    ],
    impact: 'Enhanced system reliability with advanced anomaly detection, preventing potential failures and improving operational efficiency.',
    featured: false
  },
  {
    id: 'kpi-dashboard',
    title: 'KPI Performance Dashboard',
    description: 'Interactive dashboard for KPI performance monitoring with real-time analytics and reporting.',
    longDescription: 'Built a comprehensive KPI monitoring dashboard with real-time data processing, interactive visualizations, and automated reporting capabilities.',
    category: 'data-analysis',
    status: 'ongoing',
    technologies: ['Python', 'Tableau', 'KPI Monitoring', 'Interactive Dashboards', 'Real-time Analytics'],
    duration: 'November 2023 - Present',
    company: 'Bosch Global Software Technologies',
    achievements: [
      'Created interactive KPI dashboards',
      'Implemented real-time data processing',
      'Automated reporting and alerts'
    ],
    metrics: [
      {
        label: 'Dashboard Response Time',
        value: '<2s',
        type: 'performance'
      },
      {
        label: 'Data Accuracy',
        value: '99.5%',
        type: 'accuracy'
      }
    ],
    impact: 'Empowered data-driven decision making with real-time KPI monitoring and automated insights.',
    featured: false
  }
];

type CategoryType = 'all' | 'machine-learning' | 'web-development' | 'data-analysis' | 'computer-vision' | 'current';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // Filter projects based on category and search term
  const filteredProjects = projectsData.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Get featured projects - NOW FILTERED BY SAME CRITERIA
  const featuredProjects = filteredProjects.filter(project => project.featured);
  
  // Get regular projects (non-featured) - NOW FILTERED BY SAME CRITERIA
  const regularProjects = filteredProjects.filter(project => !project.featured);

  // Calculate stats
  const stats = {
    total: projectsData.length,
    completed: projectsData.filter(p => p.status === 'completed').length,
    ongoing: projectsData.filter(p => p.status === 'ongoing').length,
    totalTechnologies: Array.from(new Set(projectsData.flatMap(p => p.technologies))).length
  };

  // Stats for animated counter
  const projectStats = [
    { number: stats.total.toString(), label: "Projects", color: "text-blue-600 dark:text-blue-400" },
    { number: stats.completed.toString(), label: "Completed", color: "text-green-600 dark:text-green-400" },
    { number: stats.ongoing.toString(), label: "Active", color: "text-orange-600 dark:text-orange-400" },
    { number: stats.totalTechnologies.toString(), label: "Technologies", color: "text-purple-600 dark:text-purple-400" }
  ];

  return (
    <section id="projects" className="relative min-h-screen py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <MorphingBackground intensity="light" />
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-20 ${
              i % 3 === 0 ? 'animate-float' : 
              i % 3 === 1 ? 'animate-float-delayed' : 'animate-float-slow'
            } ${
              i % 4 === 0 ? 'bg-blue-400 dark:bg-blue-600' :
              i % 4 === 1 ? 'bg-purple-400 dark:bg-purple-600' :
              i % 4 === 2 ? 'bg-green-400 dark:bg-green-600' : 'bg-orange-400 dark:bg-orange-600'
            }`}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <GlitchText 
                text="Projects Showcase" 
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              />
            </div>
            <div className="max-w-3xl mx-auto">
              <AdvancedTypewriter
                texts={[
                  "Transforming complex data into actionable insights through innovative machine learning solutions.",
                  "From machine learning models to data analytics platforms, each project represents a journey of problem-solving and technical excellence."
                ]}
                typingSpeed={45}
                loop={false}
                className="text-xl text-gray-600 dark:text-gray-300"
              />
            </div>
          </div>
        </SectionReveal>

        {/* Project Stats */}
        <FadeInUp>
          <AnimatedStats 
            stats={projectStats}
            layout="grid"
            className="max-w-4xl mx-auto mb-16"
          />
        </FadeInUp>

        {/* Project Filter */}
        <FadeInUp>
          <ProjectFilter
            selectedCategory={selectedCategory}
            onCategoryChange={(category: string) => setSelectedCategory(category as CategoryType)}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            projects={projectsData}
          />
        </FadeInUp>

        {/* Featured Projects - NOW RESPECTS ALL FILTERS */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <FadeInUp>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Featured Projects
              </h3>
            </FadeInUp>
            <StaggerContainer staggerDelay={200}>
              <div className="space-y-12">
                {featuredProjects.map((project, index) => (
                  <FadeInUp key={project.id}>
                    <FeaturedProject
                      project={project}
                      isReversed={index % 2 === 1}
                      onViewDetails={() => setSelectedProject(project)}
                    />
                  </FadeInUp>
                ))}
              </div>
            </StaggerContainer>
          </div>
        )}

        {/* Regular Projects Grid */}
        <div className="mb-8">
          <FadeInUp>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {selectedCategory === 'all' && searchTerm === '' ? 'All Projects' : 'Filtered Projects'}
              <span className="text-lg font-normal text-gray-500 ml-2">
                ({regularProjects.length})
              </span>
            </h3>
          </FadeInUp>
          
          {regularProjects.length > 0 ? (
            <StaggerContainer staggerDelay={150}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularProjects.map((project, index) => (
                  <FadeInUp key={project.id}>
                    <ProjectCard
                      project={project}
                      onViewDetails={() => setSelectedProject(project)}
                    />
                  </FadeInUp>
                ))}
              </div>
            </StaggerContainer>
          ) : (
            <FadeInUp>
              <div className="text-center py-16">
                <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No projects found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Try adjusting your filters or search terms.
                </p>
                <MagneticButton
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                  }}
                  magnetStrength={0.3}
                >
                  Clear Filters
                </MagneticButton>
              </div>
            </FadeInUp>
          )}
        </div>

        {/* Show message when no projects match filters (including featured) */}
        {filteredProjects.length === 0 && (
          <FadeInUp>
            <div className="text-center py-16">
              <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                No projects match your current filters. Try adjusting your search terms or category selection.
              </p>
              <MagneticButton
                variant="outline"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                magnetStrength={0.3}
              >
                Clear All Filters
              </MagneticButton>
            </div>
          </FadeInUp>
        )}

        {/* Call to Action */}
        <FadeInUp>
          <div className="text-center space-y-6 mt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Let's collaborate on your next data science or machine learning project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Start a Project
              </MagneticButton>
              <MagneticButton
                variant="outline"
                size="lg"
                magnetStrength={0.3}
              >
                View Resume
              </MagneticButton>
            </div>
          </div>
        </FadeInUp>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};