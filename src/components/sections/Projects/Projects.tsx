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
    longDescription: 'Built an end-to-end machine learning pipeline to predict shipment delays in logistics operations, incorporating multiple data sources and real-time tracking.',
    category: 'machine-learning',
    status: 'completed',
    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'Feature Engineering', 'Data Preprocessing'],
    duration: 'July 2022 - March 2023',
    company: 'Innova Solutions',
    achievements: [
      '93% accuracy in delay prediction',
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
    impact: 'Transformed logistics operations with predictive analytics, significantly reducing delays and improving customer satisfaction across the supply chain.',
    featured: true
  },
  {
    id: 'patient-risk',
    title: 'Patient Risk Assessment',
    description: 'Healthcare ML model identifying high-risk patients with 82% accuracy for Humana.',
    longDescription: 'Developed a sophisticated risk assessment model for healthcare domain, applying advanced preprocessing techniques and feature engineering to identify patients requiring immediate attention.',
    category: 'machine-learning',
    status: 'completed',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Feature Engineering', 'Classification', 'Healthcare Analytics'],
    duration: 'July 2022 - March 2023',
    company: 'Innova Solutions (Humana)',
    achievements: [
      '82% accuracy in patient risk prediction',
      'Early intervention for high-risk patients',
      'Improved healthcare outcomes'
    ],
    metrics: [
      {
        label: 'Risk Prediction',
        value: '82%',
        type: 'accuracy'
      },
      {
        label: 'Early Interventions',
        value: '150+',
        type: 'scale'
      }
    ],
    impact: 'Enhanced healthcare delivery through predictive analytics, enabling early intervention and improved patient outcomes in critical care scenarios.'
  },
  {
    id: 'library-automation',
    title: 'Library Automation System',
    description: 'Face recognition + QR code system revolutionizing library management with computer vision.',
    longDescription: 'Comprehensive library management system combining facial recognition technology with QR code scanning for seamless book tracking and user management.',
    category: 'computer-vision',
    status: 'completed',
    technologies: ['Python', 'OpenCV', 'Face Recognition', 'QR Code', 'Computer Vision', 'Database Management'],
    duration: 'September 2019 - June 2022',
    company: 'Innova Solutions (Walmart)',
    achievements: [
      'Automated library operations',
      'Reduced manual processing time by 70%',
      'Enhanced security and tracking'
    ],
    metrics: [
      {
        label: 'Time Saved',
        value: '70%',
        type: 'performance'
      },
      {
        label: 'Books Processed',
        value: '5000+',
        type: 'scale'
      }
    ],
    impact: 'Modernized library management with cutting-edge computer vision technology, streamlining operations and enhancing user experience.'
  },
  {
    id: 'sensor-humidity-analysis',
    title: 'Sensor Humidity Analysis Suite',
    description: 'PCA & UMAP analysis for Bosch inertial sensors with advanced outlier detection algorithms.',
    longDescription: 'Performed in-depth analysis for humidity-affected parts in inertial sensors using high-dimensional analysis tools and sophisticated anomaly detection techniques.',
    category: 'data-analysis',
    status: 'ongoing',
    technologies: ['Python', 'PCA', 'UMAP', 'Tree Classifiers', 'RANSAC', 'Tableau', 'Clustering', 'Anomaly Detection'],
    duration: 'September 2023 - Present',
    company: 'Bosch Global Software Technologies',
    achievements: [
      'Advanced sensor data analytics implementation',
      'Comprehensive outlier detection system',
      'Multi-product KPI dashboard suite'
    ],
    metrics: [
      {
        label: 'Outlier Detection',
        value: '95%+',
        type: 'accuracy'
      },
      {
        label: 'Products Analyzed',
        value: '12',
        type: 'scale'
      }
    ],
    impact: 'Pioneering sensor analytics platform enabling predictive maintenance and quality optimization across Bosch inertial sensor product lines.',
    featured: true
  },
  {
    id: 'kpi-dashboard',
    title: 'KPI Dashboard System',
    description: 'Interactive Tableau dashboards analyzing performance metrics across multiple Bosch products.',
    longDescription: 'Designed and developed comprehensive KPI performance dashboards for various products, providing real-time insights and analytics capabilities.',
    category: 'data-analysis',
    status: 'ongoing',
    technologies: ['Tableau', 'Data Visualization', 'KPI Analytics', 'Dashboard Design', 'Business Intelligence'],
    duration: 'September 2023 - Present',
    company: 'Bosch Global Software Technologies',
    achievements: [
      'Real-time performance monitoring',
      'Cross-product analytics integration',
      'Enhanced decision-making capabilities'
    ],
    metrics: [
      {
        label: 'KPI Dashboards',
        value: '8',
        type: 'scale'
      },
      {
        label: 'Real-time Updates',
        value: '99.9%',
        type: 'performance'
      }
    ],
    impact: 'Comprehensive business intelligence platform providing real-time insights and analytics across multiple Bosch product lines.'
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

  // Get featured projects
  const featuredProjects = projectsData.filter(project => project.featured);
  
  // Get regular projects (non-featured)
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
              i % 4 === 2 ? 'bg-green-400 dark:bg-green-600' :
              'bg-orange-400 dark:bg-orange-600'
            }`}
            style={{
              width: `${Math.random() * 50 + 25}px`,
              height: `${Math.random() * 50 + 25}px`,
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
                text="Project Portfolio"
                trigger="auto"
                className="bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
              />
            </h2>
            <div className="max-w-3xl mx-auto">
              <AdvancedTypewriter
                texts={[
                  "Innovative solutions with real-world impact and measurable results. From machine learning models to data analytics platforms, each project represents a journey of problem-solving and technical excellence."
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

        {/* Featured Projects */}
        {selectedCategory === 'all' && featuredProjects.length > 0 && (
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
              {selectedCategory === 'all' ? 'All Projects' : 'Filtered Projects'}
              <span className="text-lg font-normal text-gray-500 ml-2">
                ({filteredProjects.length})
              </span>
            </h3>
          </FadeInUp>
          
          {filteredProjects.length > 0 ? (
            <StaggerContainer staggerDelay={150}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(selectedCategory === 'all' ? regularProjects : filteredProjects).map((project, index) => (
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
              <ParticleButton explosionType="confetti">
                <MagneticButton
                  variant="primary"
                  size="lg"
                  magnetStrength={0.5}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Target className="w-5 h-5 mr-2" />
                  <span>Start a Project</span>
                </MagneticButton>
              </ParticleButton>

              <ParticleButton explosionType="cyber">
                <MagneticButton
                  variant="outline"
                  size="lg"
                  magnetStrength={0.3}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  <span>Explore AI Labs</span>
                </MagneticButton>
              </ParticleButton>
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