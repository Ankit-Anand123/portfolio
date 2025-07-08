import React, { useState } from 'react';
import { ProjectCard } from './components/ProjectCard';
import { ProjectFilter } from './components/ProjectFilter';
import { FeaturedProject } from './components/FeaturedProject';
import { ProjectModal } from './components/ProjectModal';
import styles from './Projects.module.css';
import { Rocket, Target, Code, Brain } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'machine-learning' | 'web-development' | 'data-analysis' | 'computer-vision' | 'current';
  technologies: string[];
  achievements: string[];
  metrics?: {
    label: string;
    value: string;
    type: 'accuracy' | 'performance' | 'scale' | 'impact';
  }[];
  status: 'completed' | 'ongoing' | 'research';
  duration: string;
  company: string;
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  images?: string[];
  challenges: string[];
  solutions: string[];
  impact: string;
}

const projectsData: ProjectData[] = [
  {
    id: 'sensor-analytics',
    title: 'Advanced Sensor Data Analytics Platform',
    description: 'In-depth analysis of humidity effects in Inertial sensors using higher dimension analysis tools and advanced outlier detection.',
    longDescription: 'Comprehensive sensor data analytics platform for analyzing humidity effects in Inertial sensors at Bosch. Implemented advanced dimensionality reduction techniques and sophisticated outlier detection algorithms to identify patterns and anomalies in sensor data.',
    category: 'current',
    technologies: ['Python', 'PCA', 'UMAP', 'Tree Classifiers', 'RANSAC', 'Clustering', 'Tableau', 'Anomaly Detection'],
    achievements: [
      'Implemented higher dimension analysis using PCA and UMAP',
      'Developed comprehensive outlier detection system',
      'Created interactive Tableau dashboards for KPI monitoring',
      'Established automated anomaly detection pipeline'
    ],
    metrics: [
      { label: 'Sensors Analyzed', value: '1000+', type: 'scale' },
      { label: 'Detection Accuracy', value: '95%', type: 'accuracy' },
      { label: 'Processing Speed', value: '10x faster', type: 'performance' }
    ],
    status: 'ongoing',
    duration: 'Sep 2023 - Present',
    company: 'Bosch Global Software Technologies',
    featured: true,
    challenges: [
      'High-dimensional sensor data complexity',
      'Real-time processing requirements',
      'Multiple anomaly detection approaches needed'
    ],
    solutions: [
      'Implemented PCA and UMAP for dimensionality reduction',
      'Used ensemble of tree-based classifiers and unsupervised methods',
      'Created automated pipeline with Tableau integration'
    ],
    impact: 'Improved sensor quality control and reduced defect rates in production'
  },
  {
    id: 'steel-price-forecasting',
    title: 'Steel Price Forecasting System',
    description: 'Advanced time series forecasting model for predicting alloy prices with 90% confidence intervals, achieving 23% MAPE.',
    longDescription: 'Developed a comprehensive price forecasting system for direct materials used in steel manufacturing. The system integrates multiple APIs, performs advanced time series analysis, and provides accurate price predictions with confidence intervals.',
    category: 'machine-learning',
    technologies: ['Python', 'Time Series Analysis', 'Matplotlib', 'Seaborn', 'Statsmodels', 'APIs', 'Streamlit', 'SQL'],
    achievements: [
      'Achieved 23% MAPE in price forecasting',
      'Built 90% confidence interval predictions',
      'Identified 3 historical anomalies related to market events',
      'Created interactive Streamlit dashboard'
    ],
    metrics: [
      { label: 'MAPE Achievement', value: '23%', type: 'accuracy' },
      { label: 'Confidence Interval', value: '90%', type: 'accuracy' },
      { label: 'Historical Anomalies', value: '3 detected', type: 'impact' }
    ],
    status: 'completed',
    duration: 'Apr 2023 - Aug 2023',
    company: 'Innova Solutions (Gerdau)',
    featured: true,
    challenges: [
      'Complex market dynamics affecting steel prices',
      'Multiple data sources with varying formats',
      'Need for real-time price analysis'
    ],
    solutions: [
      'Implemented robust time series analysis with seasonality detection',
      'Created unified API integration system',
      'Built automated anomaly detection for market events'
    ],
    impact: 'Enabled strategic procurement decisions saving millions in material costs'
  },
  {
    id: 'healthcare-treatment-ai',
    title: 'AI-Powered Healthcare Treatment Recommender',
    description: 'Intelligent system predicting hospitalization risk and recommending treatment plans with 82% accuracy using similarity algorithms.',
    longDescription: 'Developed a sophisticated healthcare AI system that analyzes patient data to predict hospitalization risks and recommend personalized treatment plans. Uses advanced similarity search algorithms and custom scoring methods on historical patient records.',
    category: 'machine-learning',
    technologies: ['Python', 'K-NN', 'Custom Algorithms', 'Similarity Search', 'Distance Metrics', 'Feature Selection', 'Matplotlib', 'Seaborn'],
    achievements: [
      '82% accuracy in treatment recommendations',
      'Minimum 7 treatments per plan optimization',
      'Advanced feature selection implementation',
      'Real-time risk assessment capability'
    ],
    metrics: [
      { label: 'Treatment Accuracy', value: '82%', type: 'accuracy' },
      { label: 'Patients Analyzed', value: '10,000+', type: 'scale' },
      { label: 'Risk Reduction', value: '35%', type: 'impact' }
    ],
    status: 'completed',
    duration: 'Oct 2020 - Mar 2023',
    company: 'Innova Solutions (TMC)',
    featured: false,
    challenges: [
      'Complex patient data with missing values',
      'Need for explainable AI in healthcare',
      'Real-time processing for critical decisions'
    ],
    solutions: [
      'Implemented robust K-NN with custom distance metrics',
      'Created interpretable similarity-based recommendations',
      'Built efficient feature selection pipeline'
    ],
    impact: 'Improved patient outcomes and reduced hospital readmission rates'
  },
  {
    id: 'supply-chain-prediction',
    title: 'Supply Chain Delay Prediction System',
    description: 'Machine learning system predicting shipment delays with 93% accuracy, reducing logistics losses through anomaly detection.',
    longDescription: 'Comprehensive supply chain analytics platform that predicts shipment delays and identifies anomalies in transportation operations. Includes advanced EDA, predictive modeling, and third-party vendor analysis.',
    category: 'machine-learning',
    technologies: ['Python', 'Logistic Regression', 'Pandas', 'NumPy', 'Seaborn', 'Plotly', 'EDA', 'Flask', 'Anomaly Detection'],
    achievements: [
      '93% accuracy in shipment delay prediction',
      'Significant reduction in logistics losses',
      'Comprehensive EDA and visualization suite',
      'Automated anomaly detection for vendor analysis'
    ],
    metrics: [
      { label: 'Prediction Accuracy', value: '93%', type: 'accuracy' },
      { label: 'Cost Savings', value: '$2M+', type: 'impact' },
      { label: 'Shipments Analyzed', value: '100K+', type: 'scale' }
    ],
    status: 'completed',
    duration: 'Oct 2020 - Mar 2023',
    company: 'Innova Solutions (Gerdau)',
    featured: true,
    challenges: [
      'Complex logistics network with multiple variables',
      'Real-time prediction requirements',
      'Third-party vendor data integration'
    ],
    solutions: [
      'Implemented robust logistic regression with feature engineering',
      'Created comprehensive anomaly detection system',
      'Built automated reporting and alerting system'
    ],
    impact: 'Reduced logistics costs by 15% and improved delivery reliability'
  },
  {
    id: 'library-automation',
    title: 'Smart Library Automation System',
    description: 'Innovative facial recognition system with QR code integration for automated library check-in/check-out operations.',
    longDescription: 'Revolutionary library management system combining state-of-the-art facial recognition technology with QR code scanning for seamless book tracking. Features automated check-in/check-out, user identification, and comprehensive inventory management.',
    category: 'computer-vision',
    technologies: ['Python', 'Computer Vision', 'Facial Recognition', 'Pyzbar', 'QR Codes', 'Flask', 'SQL Database', 'OpenCV'],
    achievements: [
      'Implemented state-of-the-art facial recognition',
      'QR code integration for book tracking',
      'Automated check-in/check-out system',
      'Real-time inventory management'
    ],
    metrics: [
      { label: 'Recognition Accuracy', value: '98%', type: 'accuracy' },
      { label: 'Processing Time', value: '<2 seconds', type: 'performance' },
      { label: 'User Satisfaction', value: '95%', type: 'impact' }
    ],
    status: 'completed',
    duration: 'Oct 2020 - Mar 2023',
    company: 'Innova Solutions',
    featured: false,
    challenges: [
      'Real-time facial recognition accuracy',
      'Integration of multiple identification methods',
      'Scalable system architecture'
    ],
    solutions: [
      'Implemented advanced facial recognition algorithms',
      'Created hybrid QR code and biometric system',
      'Built modular backend architecture with Flask'
    ],
    impact: 'Reduced manual processing time by 80% and improved user experience'
  },
  {
    id: 'retail-platform',
    title: 'Enterprise Retail Shopping Platform',
    description: 'Full-stack enterprise retail application with microservices architecture, featuring modern web technologies and RESTful APIs.',
    longDescription: 'Comprehensive retail shopping platform built with modern web technologies and microservices architecture. Features include user management, product catalog, shopping cart functionality, and sales analytics with responsive design.',
    category: 'web-development',
    technologies: ['Spring MVC', 'React', 'Spring Boot', 'HTML', 'CSS', 'Backbone.js', 'Git', 'REST APIs', 'Microservices', 'Java'],
    achievements: [
      'Full-stack web application development',
      'Microservices architecture implementation',
      'RESTful API design and development',
      'Responsive front-end with modern frameworks'
    ],
    metrics: [
      { label: 'Users Supported', value: '50,000+', type: 'scale' },
      { label: 'API Response Time', value: '<200ms', type: 'performance' },
      { label: 'Uptime', value: '99.9%', type: 'performance' }
    ],
    status: 'completed',
    duration: 'Aug 2018 - Sep 2020',
    company: 'Innova Solutions (HCSC)',
    featured: false,
    challenges: [
      'Scalable microservices architecture',
      'Frontend-backend integration',
      'High-performance API development'
    ],
    solutions: [
      'Implemented Spring Boot microservices',
      'Created modern React-based frontend',
      'Built comprehensive REST API layer'
    ],
    impact: 'Supported enterprise retail operations with high performance and reliability'
  }
];

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projectsData.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = projectsData.filter(project => project.featured);
  const regularProjects = filteredProjects.filter(project => !project.featured);

  const getProjectStats = () => {
    const completed = projectsData.filter(p => p.status === 'completed').length;
    const ongoing = projectsData.filter(p => p.status === 'ongoing').length;

    const allTechnologies = projectsData.flatMap(p => p.technologies);
    const uniqueTechnologies = allTechnologies.reduce((unique: string[], tech: string) => {
      if (!unique.includes(tech)) {
        unique.push(tech);
      }
      return unique;
    }, []);
    const totalTechnologies = uniqueTechnologies.length;
    
    return { completed, ongoing, totalTechnologies, total: projectsData.length };
  };

  const stats = getProjectStats();

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Project Portfolio
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Showcasing innovative solutions across machine learning, data analytics, web development, 
            and computer vision with real-world impact and measurable results.
          </p>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <Rocket className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Projects</div>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <Target className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats.completed}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Completed</div>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats.ongoing}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Ongoing</div>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <Code className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalTechnologies}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Technologies</div>
          </div>
        </div>

        {/* Project Filter */}
        <ProjectFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          projects={projectsData}
        />

        {/* Featured Projects */}
        {selectedCategory === 'all' && featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Featured Projects</h3>
            <div className="grid gap-8">
              {featuredProjects.map((project, index) => (
                <FeaturedProject
                  key={project.id}
                  project={project}
                  isReversed={index % 2 === 1}
                  onViewDetails={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Projects Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {selectedCategory === 'all' ? 'All Projects' : 'Filtered Projects'}
            <span className="text-lg font-normal text-gray-500 ml-2">
              ({filteredProjects.length})
            </span>
          </h3>
          
          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory === 'all' ? regularProjects : filteredProjects).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewDetails={() => setSelectedProject(project)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <Target className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg">No projects found matching your criteria.</p>
                <p className="text-sm">Try adjusting your search or category filter.</p>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Interested in Collaboration?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            These projects represent just a glimpse of what's possible when data science meets innovation. 
            Let's discuss how we can create impactful solutions together.
          </p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200">
            Get In Touch
          </button>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};