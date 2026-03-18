import React, { useState } from 'react';
import { FolderOpen, Code, ExternalLink, X, Award, Calendar, Building, Search } from 'lucide-react';
import { FadeInUp, FadeInLeft, FadeInRight } from '../../animations';

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
  metrics?: { label: string; value: string; type: string }[];
  impact?: string;
  featured?: boolean;
}

const projectsData: ProjectData[] = [
  {
    id: 'steel-forecasting',
    title: 'Steel Price Forecasting',
    description: 'Advanced time series analysis for Gerdau steel manufacturing with 90% confidence intervals.',
    longDescription: 'Developed a comprehensive forecasting model for direct materials used in steel manufacturing. The system analyzes trends, seasonality, and auto-correlation while identifying historical anomalies.',
    category: 'machine-learning',
    status: 'completed',
    technologies: ['Python', 'Statsmodels', 'Streamlit', 'APIs', 'Time Series', 'Pandas'],
    duration: 'Apr 2023 – Aug 2023',
    company: 'Innova Solutions (Gerdau)',
    achievements: ['23% MAPE accuracy in price forecasting', 'Identified 3 historical anomalies', 'Optimized procurement decisions'],
    metrics: [{ label: 'MAPE Accuracy', value: '23%', type: 'accuracy' }, { label: 'Confidence', value: '90%', type: 'performance' }],
    impact: 'Revolutionized steel procurement with advanced forecasting.',
    featured: true,
  },
  {
    id: 'shipment-predictor',
    title: 'Shipment Delay Predictor',
    description: 'ML model predicting logistics delays with 93% accuracy, optimizing supply chain operations.',
    longDescription: 'Built a machine learning model to predict shipment delays using historical data, weather patterns, and logistics variables.',
    category: 'machine-learning',
    status: 'completed',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'APIs'],
    duration: 'Mar 2023 – Jun 2023',
    company: 'Innova Solutions',
    achievements: ['93% accuracy in delay prediction', 'Reduced operational costs by 15%', 'Improved customer satisfaction'],
    metrics: [{ label: 'Prediction Accuracy', value: '93%', type: 'accuracy' }, { label: 'Cost Reduction', value: '15%', type: 'impact' }],
    featured: false,
  },
  {
    id: 'patient-risk-assessment',
    title: 'Patient Risk Assessment',
    description: 'Healthcare analytics platform with 82% accuracy in predicting patient readmission risks.',
    longDescription: 'Developed a risk assessment system for healthcare providers to predict patient readmission likelihood.',
    category: 'machine-learning',
    status: 'completed',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Healthcare APIs', 'ML'],
    duration: 'Jan 2023 – Apr 2023',
    company: 'Innova Solutions (Humana)',
    achievements: ['82% accuracy in risk prediction', 'Improved patient care outcomes', 'Reduced readmissions by 12%'],
    metrics: [{ label: 'Risk Accuracy', value: '82%', type: 'accuracy' }, { label: 'Readmission Reduction', value: '12%', type: 'impact' }],
    featured: false,
  },
  {
    id: 'library-automation',
    title: 'Library Automation System',
    description: 'Face recognition and QR code-based library management with 95% recognition accuracy.',
    longDescription: 'Developed a comprehensive library automation system using face recognition and QR code technology.',
    category: 'computer-vision',
    status: 'completed',
    technologies: ['Python', 'OpenCV', 'Face Recognition', 'QR Code', 'Pyzbar'],
    duration: 'Sep 2022 – Dec 2022',
    company: 'Innova Solutions',
    achievements: ['95% face recognition accuracy', 'Automated checkout/return', 'Reduced manual workload by 80%'],
    metrics: [{ label: 'Recognition Accuracy', value: '95%', type: 'accuracy' }, { label: 'Automation', value: '80%', type: 'performance' }],
    featured: true,
  },
  {
    id: 'sensor-humidity-analysis',
    title: 'Sensor Humidity Dashboard',
    description: 'Tableau dashboard for IoT sensor data with PCA and UMAP dimensionality reduction.',
    longDescription: 'Created an advanced analytics dashboard for IoT sensor data with unsupervised learning and interactive visualizations.',
    category: 'data-analysis',
    status: 'ongoing',
    technologies: ['Python', 'Tableau', 'PCA', 'UMAP', 'Clustering', 'IoT'],
    duration: 'Sep 2023 – Present',
    company: 'Bosch Global Software Technologies',
    achievements: ['PCA and UMAP dimensionality reduction', 'Interactive Tableau dashboards', 'Sensor anomaly identification'],
    metrics: [{ label: 'Processing Speed', value: '3x', type: 'performance' }, { label: 'Anomaly Detection', value: '99%', type: 'accuracy' }],
    featured: false,
  },
  {
    id: 'anomaly-detection-suite',
    title: 'Anomaly Detection Suite',
    description: 'Multi-algorithm anomaly detection with 94% precision and 25% false positive reduction.',
    longDescription: 'Developed a robust anomaly detection system using multiple ML algorithms including tree-based classifiers.',
    category: 'machine-learning',
    status: 'ongoing',
    technologies: ['Python', 'Scikit-learn', 'Tree Classifiers', 'RANSAC', 'Clustering'],
    duration: 'Oct 2023 – Present',
    company: 'Bosch Global Software Technologies',
    achievements: ['Multiple anomaly detection algorithms', '94% detection precision', 'Reduced false positives by 25%'],
    metrics: [{ label: 'Detection Precision', value: '94%', type: 'accuracy' }, { label: 'False Positive Reduction', value: '25%', type: 'performance' }],
    featured: false,
  },
  {
    id: 'kpi-dashboard',
    title: 'KPI Performance Dashboard',
    description: 'Real-time KPI monitoring with <2s response time and 99.5% data accuracy.',
    longDescription: 'Comprehensive KPI monitoring dashboard with real-time processing and automated reporting.',
    category: 'data-analysis',
    status: 'ongoing',
    technologies: ['Python', 'Tableau', 'KPI Monitoring', 'Real-time Analytics'],
    duration: 'Nov 2023 – Present',
    company: 'Bosch Global Software Technologies',
    achievements: ['Interactive KPI dashboards', 'Real-time data processing', 'Automated reporting'],
    metrics: [{ label: 'Response Time', value: '<2s', type: 'performance' }, { label: 'Data Accuracy', value: '99.5%', type: 'accuracy' }],
    featured: false,
  },
];

type CategoryType = 'all' | 'machine-learning' | 'web-development' | 'data-analysis' | 'computer-vision' | 'current';

const statusColors: Record<string, string> = {
  completed: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  ongoing: 'text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/10',
  research: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
};

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filteredProjects = projectsData.filter(p => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch = !searchTerm ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCat && matchSearch;
  });

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'machine-learning', label: 'ML' },
    { id: 'data-analysis', label: 'Analytics' },
    { id: 'computer-vision', label: 'Vision' },
    { id: 'web-development', label: 'Web Dev' },
  ];

  const stats = [
    { value: projectsData.length.toString(), label: 'Projects' },
    { value: projectsData.filter(p => p.status === 'completed').length.toString(), label: 'Completed' },
    { value: projectsData.filter(p => p.status === 'ongoing').length.toString(), label: 'Active' },
    { value: Array.from(new Set(projectsData.flatMap(p => p.technologies))).length.toString(), label: 'Technologies' },
  ];

  return (
    <section id="projects" data-testid="projects-section" className="relative min-h-screen py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <FadeInUp>
          <div className="mb-16">
            <p className="font-manrope text-xs text-[#D4AF37] tracking-widest uppercase mb-4">Portfolio</p>
            <h1 className="font-playfair text-5xl md:text-6xl font-medium text-[#F5F5F7] mb-6">Projects Showcase</h1>
            <p className="font-manrope text-[#A1A1AA] text-lg leading-relaxed max-w-2xl">
              Transforming complex data into actionable insights through innovative machine learning solutions.
            </p>
          </div>
        </FadeInUp>

        {/* Stats */}
        <FadeInUp delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((s, i) => (
              <div key={i} data-testid={`project-stat-${i}`} className="p-6 rounded-2xl border border-white/5 bg-[#0F0F0F] text-center">
                <div className="font-playfair text-4xl font-medium text-[#D4AF37] mb-2">{s.value}</div>
                <div className="font-manrope text-sm text-[#A1A1AA]">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeInUp>

        {/* Filter + Search */}
        <FadeInUp delay={150}>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="flex space-x-1 p-1 rounded-xl bg-[#0F0F0F] border border-white/5 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  data-testid={`filter-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-manrope font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'bg-[#D4AF37] text-[#050505]'
                      : 'text-[#A1A1AA] hover:text-[#F5F5F7]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search projects or tech..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="project-search"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/8 bg-[#0F0F0F] text-[#F5F5F7] text-sm font-manrope placeholder-[#A1A1AA]/50 focus:border-[#D4AF37]/30 focus:outline-none transition-colors duration-200"
              />
            </div>
          </div>
        </FadeInUp>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="projects-grid">
            {filteredProjects.map((project, i) => (
              <FadeInUp key={project.id} delay={i * 80}>
                <div
                  data-testid={`project-card-${project.id}`}
                  className="group relative p-6 rounded-2xl border border-white/5 hover:border-[#D4AF37]/20 bg-[#0F0F0F] transition-all duration-500 cursor-pointer hover:bg-[#1A1A1A]/60"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10">
                      <span className="font-manrope text-xs text-[#D4AF37]">Featured</span>
                    </div>
                  )}

                  <div className="mb-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full border text-xs font-manrope capitalize ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-playfair text-xl font-medium text-[#F5F5F7] mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-manrope text-[#A1A1AA] text-sm leading-relaxed mb-5">{project.description}</p>

                  {/* Metrics row */}
                  {project.metrics && (
                    <div className="flex gap-4 mb-5">
                      {project.metrics.slice(0, 2).map((m, j) => (
                        <div key={j}>
                          <div className="font-playfair text-lg text-[#D4AF37] font-medium">{m.value}</div>
                          <div className="font-manrope text-xs text-[#A1A1AA]">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2 py-1 border border-white/6 rounded-full text-xs font-manrope text-[#A1A1AA]">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 text-xs font-manrope text-[#A1A1AA]/60">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-xs font-manrope text-[#A1A1AA]/60">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />{project.duration}
                  </div>

                  <div className="mt-4 h-px bg-gradient-to-r from-[#D4AF37] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </FadeInUp>
            ))}
          </div>
        ) : (
          <FadeInUp>
            <div className="text-center py-20">
              <FolderOpen className="w-12 h-12 text-[#A1A1AA]/30 mx-auto mb-4" strokeWidth={1.5} />
              <p className="font-manrope text-[#A1A1AA] mb-6">No projects match your filters.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchTerm(''); }}
                className="px-6 py-2.5 border border-white/10 text-[#F5F5F7] font-manrope text-sm rounded-full hover:border-[#D4AF37]/40 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          </FadeInUp>
        )}

        {/* CTA */}
        <FadeInUp>
          <div className="text-center mt-20">
            <h3 className="font-playfair text-3xl font-medium text-[#F5F5F7] mb-4">Ready to Build Something Amazing?</h3>
            <p className="font-manrope text-[#A1A1AA] mb-8 max-w-xl mx-auto">
              Let's collaborate on your next data science or machine learning project.
            </p>
            <a
              href="/contact"
              data-testid="projects-contact-btn"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#D4AF37] text-[#050505] font-manrope font-semibold text-sm tracking-wide rounded-full transition-all duration-300 hover:bg-[#F0D060] hover:shadow-[0_0_24px_rgba(212,175,55,0.3)]"
            >
              Start a Project
            </a>
          </div>
        </FadeInUp>
      </div>

      {/* ── Project Modal ── */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          data-testid="project-modal"
          onClick={() => setSelectedProject(null)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative z-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl border border-white/8 bg-[#0F0F0F] p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              data-testid="modal-close-btn"
              className="absolute top-4 right-4 p-2 rounded-full text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5 transition-all duration-200"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            <span className={`inline-flex px-2.5 py-1 rounded-full border text-xs font-manrope capitalize mb-4 ${statusColors[selectedProject.status]}`}>
              {selectedProject.status}
            </span>

            <h2 className="font-playfair text-2xl md:text-3xl font-medium text-[#F5F5F7] mb-3">{selectedProject.title}</h2>
            <div className="flex flex-wrap gap-4 text-xs font-manrope text-[#A1A1AA] mb-6">
              <span className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5" strokeWidth={1.5} /><span>{selectedProject.duration}</span></span>
              <span className="flex items-center space-x-1"><Building className="w-3.5 h-3.5" strokeWidth={1.5} /><span>{selectedProject.company}</span></span>
            </div>

            <p className="font-manrope text-[#A1A1AA] text-sm leading-relaxed mb-6">{selectedProject.longDescription}</p>

            {selectedProject.metrics && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {selectedProject.metrics.map((m, i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/5 bg-[#1A1A1A] text-center">
                    <div className="font-playfair text-2xl text-[#D4AF37] font-medium mb-1">{m.value}</div>
                    <div className="font-manrope text-xs text-[#A1A1AA]">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-6">
              <h4 className="font-manrope text-xs text-[#A1A1AA] tracking-widest uppercase mb-3">Achievements</h4>
              <div className="space-y-2">
                {selectedProject.achievements.map((a, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 rounded-lg bg-[#1A1A1A]">
                    <Award className="w-4 h-4 text-[#D4AF37] shrink-0" strokeWidth={1.5} />
                    <span className="font-manrope text-sm text-[#F5F5F7]">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-manrope text-xs text-[#A1A1AA] tracking-widest uppercase mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 border border-white/8 rounded-full text-xs font-manrope text-[#A1A1AA]">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
