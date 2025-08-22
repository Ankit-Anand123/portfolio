import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/sections/Hero';
import { 
  ArrowRight, 
  User, 
  Briefcase, 
  FolderOpen, 
  Brain, 
  Camera, 
  FileText, 
  Mail,
  Code,
  Database,
  BarChart3,
  Target,
  Award,
  TrendingUp,
  Zap,
  Star,
  ExternalLink,
  Download,
  Github,
  Linkedin
} from 'lucide-react';
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  StaggerContainer,
  AnimatedStats,
  MagneticButton,
  ParticleButton,
  GlitchText,
  AdvancedTypewriter,
  HoverRevealCard,
  MorphingBackground
} from '../components/animations';

export const HomePage: React.FC = () => {
  const portfolioSections = [
    {
      id: 'about',
      title: 'About Me',
      description: 'Discover my background, skills, and passion for transforming data into actionable insights.',
      longDescription: 'Learn about my 6+ years journey in data science, from software engineering to senior data scientist roles across diverse industries.',
      icon: <User className="w-6 h-6" />,
      path: '/about',
      color: 'blue',
      technologies: ['Python', 'Machine Learning', 'Statistical Analysis'],
      metrics: [
        { label: 'Experience', value: '6+ Years', type: 'scale' as const },
        { label: 'Domains', value: '5', type: 'impact' as const }
      ]
    },
    {
      id: 'experience',
      title: 'Professional Journey',
      description: 'Explore my career progression and the impactful projects I\'ve delivered.',
      longDescription: 'From software engineer to senior data scientist, see how I\'ve grown and the value I\'ve created across different companies and domains.',
      icon: <Briefcase className="w-6 h-6" />,
      path: '/experience',
      color: 'green',
      technologies: ['Leadership', 'Project Management', 'Cross-functional Teams'],
      metrics: [
        { label: 'Positions', value: '4', type: 'scale' as const },
        { label: 'Companies', value: '2', type: 'impact' as const }
      ]
    },
    {
      id: 'projects',
      title: 'Project Portfolio',
      description: 'Innovative solutions with real-world impact and measurable results.',
      longDescription: 'Dive deep into my most significant projects, from steel price forecasting to patient risk assessment systems.',
      icon: <FolderOpen className="w-6 h-6" />,
      path: '/projects',
      color: 'purple',
      technologies: ['ML Models', 'Data Visualization', 'Predictive Analytics'],
      metrics: [
        { label: 'Projects', value: '15+', type: 'scale' as const },
        { label: 'Best Accuracy', value: '93%', type: 'accuracy' as const }
      ]
    },
    {
      id: 'contact',
      title: 'Let\'s Connect',
      description: 'Ready to collaborate? Let\'s discuss your next data science project.',
      longDescription: 'Whether it\'s consulting, collaboration, or full-time opportunities, I\'m always excited to work on challenging problems.',
      icon: <Mail className="w-6 h-6" />,
      path: '/contact',
      color: 'orange',
      technologies: ['Consulting', 'Collaboration', 'Problem Solving'],
      metrics: [
        { label: 'Response Time', value: '24h', type: 'performance' as const },
        { label: 'Satisfaction', value: '99%', type: 'impact' as const }
      ]
    }
  ];

  const quickStats = [
    { number: "6+", label: "Years Experience", color: "text-blue-600 dark:text-blue-400" },
    { number: "15+", label: "Projects Delivered", color: "text-green-600 dark:text-green-400" },
    { number: "93%", label: "Best Model Accuracy", color: "text-purple-600 dark:text-purple-400" },
    { number: "5", label: "Industry Domains", color: "text-orange-600 dark:text-orange-400" }
  ];

  const expertiseAreas = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Machine Learning',
      description: 'Advanced ML algorithms, predictive modeling, and AI solutions',
      skills: ['Scikit-learn', 'TensorFlow', 'Feature Engineering', 'Model Optimization'],
      color: 'purple'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Data Science',
      description: 'Statistical analysis, data processing, and insight generation',
      skills: ['Pandas', 'NumPy', 'Statistical Analysis', 'Data Visualization'],
      color: 'blue'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Analytics & BI',
      description: 'Business intelligence, KPI dashboards, and data storytelling',
      skills: ['Tableau', 'Power BI', 'Dashboard Design', 'KPI Analysis'],
      color: 'green'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Software Engineering',
      description: 'Full-stack development and scalable application architecture',
      skills: ['Python', 'Flask', 'React', 'API Development'],
      color: 'orange'
    }
  ];

  const currentHighlights = [
    {
      title: 'Current Role',
      content: 'Senior Data Scientist at Bosch Global Software Technologies',
      icon: <Building className="w-5 h-5" />,
      color: 'blue'
    },
    {
      title: 'Latest Achievement',
      content: 'Advanced sensor analytics with PCA and UMAP implementation',
      icon: <Award className="w-5 h-5" />,
      color: 'green'
    },
    {
      title: 'Current Focus',
      content: 'Generative AI and LangChain for intelligent solutions',
      icon: <Zap className="w-5 h-5" />,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-700',
        text: 'text-blue-600 dark:text-blue-400',
        gradient: 'from-blue-500 to-blue-600'
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-700',
        text: 'text-green-600 dark:text-green-400',
        gradient: 'from-green-500 to-green-600'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        border: 'border-purple-200 dark:border-purple-700',
        text: 'text-purple-600 dark:text-purple-400',
        gradient: 'from-purple-500 to-purple-600'
      },
      orange: {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        border: 'border-orange-200 dark:border-orange-700',
        text: 'text-orange-600 dark:text-orange-400',
        gradient: 'from-orange-500 to-orange-600'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Quick Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <MorphingBackground intensity="light" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <FadeInUp>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                <GlitchText text="Impact by Numbers" />
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Measurable results across projects and career milestones
              </p>
            </div>
          </FadeInUp>
          
          <AnimatedStats 
            stats={quickStats}
            layout="grid"
            className="max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* Current Highlights */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <FadeInUp>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Current Highlights
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                What I'm working on right now
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer staggerDelay={200}>
            <div className="grid md:grid-cols-3 gap-8">
              {currentHighlights.map((highlight, index) => {
                const colors = getColorClasses(highlight.color);
                return (
                  <FadeInUp key={index}>
                    <div className={`p-6 ${colors.bg} ${colors.border} border-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                      <div className={`w-12 h-12 ${colors.text} ${colors.bg} rounded-lg flex items-center justify-center mb-4 shadow-sm`}>
                        {highlight.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {highlight.content}
                      </p>
                    </div>
                  </FadeInUp>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10" />
          <MorphingBackground intensity="medium" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <AdvancedTypewriter
                  texts={["Core Expertise Areas"]}
                  typingSpeed={80}
                  loop={false}
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                />
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Specialized skills and technologies that drive innovation and deliver exceptional results
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer staggerDelay={200}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {expertiseAreas.map((area, index) => {
                const colors = getColorClasses(area.color);
                return (
                  <FadeInUp key={index}>
                    <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                      <div className={`${colors.text} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        {area.icon}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {area.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {area.description}
                      </p>
                      
                      <div className="space-y-2">
                        {area.skills.map((skill, skillIndex) => (
                          <div key={skillIndex} className="flex items-center text-sm">
                            <div className={`w-2 h-2 ${colors.text} rounded-full mr-2 opacity-60`} />
                            <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                          </div>
                        ))}
                      </div>

                      <div className={`mt-4 h-1 bg-gradient-to-r ${colors.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                    </div>
                  </FadeInUp>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Portfolio Navigation with Enhanced Cards */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full opacity-20 ${
                i % 3 === 0 ? 'animate-float' : 
                i % 3 === 1 ? 'animate-float-delayed' : 'animate-float-slow'
              }`}
              style={{
                width: `${Math.random() * 60 + 30}px`,
                height: `${Math.random() * 60 + 30}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981'][i % 4],
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Explore My Portfolio
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover my journey through data science, machine learning, and software development.
                Each section showcases different aspects of my expertise and passion for innovation.
              </p>
            </div>
          </FadeInUp>

          {/* Enhanced Portfolio Grid */}
          <StaggerContainer staggerDelay={200}>
            <div className="grid md:grid-cols-2 gap-8">
              {portfolioSections.map((section, index) => (
                <FadeInUp key={section.id}>
                  <HoverRevealCard
                    title={section.title}
                    description={section.description}
                    longDescription={section.longDescription}
                    technologies={section.technologies}
                    metrics={section.metrics}
                    variant={index === 0 ? 'featured' : 'default'}
                    className="h-full"
                  >
                    <div className="mt-4">
                      <Link to={section.path}>
                        <MagneticButton
                          variant="primary"
                          size="md"
                          magnetStrength={0.3}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          <span>Explore {section.title}</span>
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </MagneticButton>
                      </Link>
                    </div>
                  </HoverRevealCard>
                </FadeInUp>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Work
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Highlights from my most impactful projects
              </p>
            </div>
          </FadeInUp>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInLeft>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full">
                  <Star className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                  <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">Featured Project</span>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Steel Price Forecasting System
                </h3>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Advanced time series analysis for Gerdau steel manufacturing, achieving 90% confidence 
                  intervals with 23% MAPE accuracy. The system analyzes trends, seasonality, and 
                  auto-correlation while identifying historical anomalies.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">23%</div>
                    <div className="text-sm text-green-700 dark:text-green-300">MAPE Accuracy</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">90%</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Confidence Interval</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['Python', 'Statsmodels', 'Time Series', 'Streamlit'].map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>

                <Link to="/projects">
                  <MagneticButton
                    variant="primary"
                    size="lg"
                    magnetStrength={0.4}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <FolderOpen className="w-5 h-5 mr-2" />
                    <span>View All Projects</span>
                  </MagneticButton>
                </Link>
              </div>
            </FadeInLeft>

            <FadeInRight>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-pink-900/30 rounded-2xl p-8 shadow-xl">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-8 rounded transition-all duration-1000 ${
                          i % 3 === 0 ? 'bg-blue-300 dark:bg-blue-600' :
                          i % 3 === 1 ? 'bg-purple-300 dark:bg-purple-600' :
                          'bg-pink-300 dark:bg-pink-600'
                        }`}
                        style={{
                          animationDelay: `${i * 200}ms`,
                          transform: `scaleY(${Math.random() * 0.5 + 0.5})`
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Data Visualization
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Interactive charts and insights
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-75" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-pulse opacity-75" />
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <FadeInUp>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Data?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's collaborate to turn your data challenges into strategic opportunities. 
              Whether it's machine learning, analytics, or AI solutions—I'm here to help.
            </p>
          </FadeInUp>

          <FadeInUp delay={400}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <ParticleButton explosionType="confetti">
                <Link to="/contact">
                  <MagneticButton
                    variant="secondary"
                    size="lg"
                    magnetStrength={0.5}
                    className="bg-white text-blue-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    <span>Start a Conversation</span>
                  </MagneticButton>
                </Link>
              </ParticleButton>

              <ParticleButton explosionType="cyber">
                <MagneticButton
                  variant="outline"
                  size="lg"
                  magnetStrength={0.3}
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Download className="w-5 h-5 mr-2" />
                  <span>Download Resume</span>
                </MagneticButton>
              </ParticleButton>
            </div>
          </FadeInUp>

          <FadeInUp delay={600}>
            <div className="mt-12 flex justify-center space-x-6">
              <a
                href="https://linkedin.com/in/ankitanand29"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://github.com/ankitanand29"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-6 h-6 text-white" />
              </a>
              <a
                href="mailto:ankitanand.2910@gmail.com"
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-6 h-6 text-white" />
              </a>
            </div>
          </FadeInUp>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 4}s`
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};