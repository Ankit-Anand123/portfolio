import React, { useState } from 'react';
import {
  Briefcase, Calendar, MapPin, Target, TrendingUp, Code, Award, Building,
} from 'lucide-react';
import { FadeInUp, FadeInLeft, FadeInRight } from '../../animations';

export interface ExperienceData {
  id: string;
  company: string;
  position: string;
  duration: string;
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
    duration: 'September 2023 – Present',
    location: 'Coimbatore, India',
    domain: 'Sensor Technology',
    description: [
      'Performed in-depth analysis for parts affected by humidity in Inertial sensors using higher dimension analysis tools like PCA and UMAP.',
      'Outlier detection performed using Tree based classifiers (supervised) and anomaly detection techniques (unsupervised) like clustering, RANSAC, and Elliptical Envelope.',
      'Designed dashboards in Tableau for analyzing KPI performance across various products.',
    ],
    technologies: ['Python', 'PCA', 'UMAP', 'Tree Classifiers', 'RANSAC', 'Tableau', 'Clustering'],
    achievements: ['Advanced sensor data analytics', 'Comprehensive outlier detection system', 'Multi-product KPI dashboard suite'],
    type: 'current',
  },
  {
    id: 'innova-senior-2023',
    company: 'Innova Solutions',
    position: 'Senior Data Scientist',
    duration: 'April 2023 – August 2023',
    location: 'Hyderabad, India',
    domain: 'Supply Chain, Procurement (Gerdau)',
    description: [
      'Price data for direct materials used in steel manufacturing was researched and acquired from multiple APIs.',
      'Discovered anomalies in relation to 3 historical events by identifying change points in historical data.',
      'Developed a model to forecast 90% confidence interval of alloy prices, achieving a MAPE of 23%.',
      'Streamlit UI for displaying analysis and forecasted results.',
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Statsmodels', 'Streamlit', 'APIs'],
    achievements: ['23% MAPE in price forecasting', 'Historical anomaly detection', 'Interactive Streamlit dashboard'],
    type: 'past',
  },
  {
    id: 'innova-2022',
    company: 'Innova Solutions',
    position: 'Data Scientist',
    duration: 'July 2022 – March 2023',
    location: 'Hyderabad, India',
    domain: 'Healthcare (Humana)',
    description: [
      'Developed an end-to-end ML model to identify high-risk patients in the healthcare domain.',
      'Applied data preprocessing techniques and feature engineering to enhance model performance.',
      'Implemented classification algorithms achieving 82% accuracy in patient risk assessment.',
    ],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Feature Engineering', 'Classification'],
    achievements: ['82% accuracy in patient risk prediction', 'End-to-end ML pipeline', 'Stakeholder presentations'],
    type: 'past',
  },
  {
    id: 'innova-2019',
    company: 'Innova Solutions',
    position: 'Software Engineer',
    duration: 'September 2019 – June 2022',
    location: 'Hyderabad, India',
    domain: 'Retail (Walmart)',
    description: [
      'Developed and maintained web applications using Java Spring framework and React.js.',
      'Implemented barcode scanning functionality using Python libraries for inventory management.',
      'Collaborated with cross-functional teams to deliver high-quality software solutions.',
    ],
    technologies: ['Java', 'Spring MVC', 'React', 'JavaScript', 'Python', 'Pyzbar', 'Git'],
    achievements: ['Full-stack web application development', 'Barcode scanning system', 'Cross-functional team collaboration'],
    type: 'past',
  },
];

type TabType = 'overview' | 'journey' | 'technologies';

export const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedId, setSelectedId] = useState(experienceData[0].id);
  const current = experienceData.find(e => e.id === selectedId)!;

  const careerStats = [
    { value: '4', label: 'Positions' },
    { value: '6+', label: 'Years' },
    { value: '2', label: 'Cities' },
    { value: '5', label: 'Domains' },
  ];

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Career Overview' },
    { id: 'journey', label: 'Professional Journey' },
    { id: 'technologies', label: 'Technology Stack' },
  ];

  const allTechnologies = Array.from(new Set(experienceData.flatMap(e => e.technologies)));

  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="relative min-h-screen py-24 bg-[#050505]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <FadeInUp>
          <div className="mb-16">
            <p className="font-manrope text-xs text-[#D4AF37] tracking-widest uppercase mb-4">Career</p>
            <h1 className="font-playfair text-5xl md:text-6xl font-medium text-[#F5F5F7] mb-6">
              Professional Experience
            </h1>
            <p className="font-manrope text-[#A1A1AA] text-lg leading-relaxed max-w-2xl">
              My journey through data science and software engineering, building impactful solutions
              across diverse domains and technologies.
            </p>
          </div>
        </FadeInUp>

        {/* Tab Navigation */}
        <FadeInUp delay={100}>
          <div className="flex space-x-1 mb-12 p-1 rounded-xl bg-[#0F0F0F] border border-white/5 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                data-testid={`exp-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-manrope font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#D4AF37] text-[#050505]'
                    : 'text-[#A1A1AA] hover:text-[#F5F5F7]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeInUp>

        {/* ── Overview Tab ── */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <FadeInUp delay={200}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {careerStats.map((stat, i) => (
                  <div key={i} data-testid={`career-stat-${i}`} className="p-6 rounded-2xl border border-white/5 bg-[#0F0F0F] text-center">
                    <div className="font-playfair text-4xl font-medium text-[#D4AF37] mb-2">{stat.value}</div>
                    <div className="font-manrope text-sm text-[#A1A1AA]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeInUp>

            <div className="grid lg:grid-cols-2 gap-6">
              <FadeInLeft delay={300}>
                <div className="p-8 rounded-2xl border border-white/5 bg-[#0F0F0F] hover:border-[#D4AF37]/20 transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                      <Building className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-manrope font-semibold text-[#F5F5F7]">Current Position</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="font-manrope text-xs text-emerald-400">Active</span>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-playfair text-xl font-medium text-[#F5F5F7] mb-1">Senior Data Scientist</h4>
                  <p className="font-manrope text-sm text-[#D4AF37] mb-4">Bosch Global Software Technologies</p>
                  <div className="space-y-2 text-sm font-manrope text-[#A1A1AA]">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" strokeWidth={1.5} /><span>Since September 2023</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" strokeWidth={1.5} /><span>Coimbatore, India</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4" strokeWidth={1.5} /><span>Sensor Technology</span>
                    </div>
                  </div>
                </div>
              </FadeInLeft>

              <FadeInRight delay={300}>
                <div className="p-8 rounded-2xl border border-white/5 bg-[#0F0F0F] hover:border-[#D4AF37]/20 transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-manrope font-semibold text-[#F5F5F7]">Career Growth</h3>
                      <p className="font-manrope text-xs text-[#A1A1AA]">Progressive Development</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Role Evolution', value: 'Engineer → Senior Data Scientist' },
                      { label: 'Industry Impact', value: '5 Different Domains' },
                      { label: 'Geographic Reach', value: 'Hyderabad → Coimbatore' },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#1A1A1A]">
                        <span className="font-manrope text-sm text-[#A1A1AA]">{row.label}</span>
                        <span className="font-manrope text-sm text-[#F5F5F7]">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInRight>
            </div>

            <FadeInUp delay={500}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  data-testid="explore-journey-btn"
                  onClick={() => setActiveTab('journey')}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-[#D4AF37] text-[#050505] font-manrope font-semibold text-sm tracking-wide rounded-full transition-all duration-300 hover:bg-[#F0D060] hover:shadow-[0_0_24px_rgba(212,175,55,0.3)]"
                >
                  <Briefcase className="w-4 h-4 mr-2" strokeWidth={2} />
                  Explore My Journey
                </button>
                <button
                  data-testid="view-tech-stack-btn"
                  onClick={() => setActiveTab('technologies')}
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-white/10 text-[#F5F5F7] font-manrope font-medium text-sm tracking-wide rounded-full transition-all duration-300 hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                >
                  <Code className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  View Tech Stack
                </button>
              </div>
            </FadeInUp>
          </div>
        )}

        {/* ── Journey Tab ── */}
        {activeTab === 'journey' && (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Timeline sidebar */}
            <FadeInLeft delay={200} className="lg:col-span-1">
              <div className="p-6 rounded-2xl border border-white/5 bg-[#0F0F0F]">
                <h3 className="font-manrope font-semibold text-[#F5F5F7] mb-6 flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                  <span>Career Timeline</span>
                </h3>

                <div className="relative">
                  {/* Gold center line */}
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/30 to-transparent" />

                  <div className="space-y-1">
                    {experienceData.map((exp, i) => (
                      <button
                        key={exp.id}
                        data-testid={`timeline-item-${exp.id}`}
                        onClick={() => setSelectedId(exp.id)}
                        className={`relative w-full text-left pl-10 pr-4 py-4 rounded-xl transition-all duration-300 ${
                          selectedId === exp.id
                            ? 'bg-[#D4AF37]/8 border border-[#D4AF37]/20'
                            : 'hover:bg-white/3'
                        }`}
                      >
                        {/* Dot */}
                        <div
                          className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                            exp.type === 'current'
                              ? 'bg-[#D4AF37] border-[#D4AF37]'
                              : selectedId === exp.id
                              ? 'bg-[#D4AF37]/50 border-[#D4AF37]'
                              : 'bg-[#1A1A1A] border-white/20'
                          }`}
                        />
                        <div className="font-manrope font-medium text-sm text-[#F5F5F7] mb-0.5">{exp.position}</div>
                        <div className="font-manrope text-xs text-[#D4AF37] mb-0.5">{exp.company}</div>
                        <div className="font-manrope text-xs text-[#A1A1AA]/60">{exp.duration}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInLeft>

            {/* Job Details */}
            <FadeInRight delay={200} className="lg:col-span-2">
              <div
                key={current.id}
                data-testid="job-detail-card"
                className="p-8 rounded-2xl border border-white/5 bg-[#0F0F0F] animate-fadeInUp"
              >
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="font-playfair text-2xl font-medium text-[#F5F5F7] mb-1">{current.position}</h3>
                    <p className="font-manrope text-[#D4AF37] font-medium mb-3">{current.company}</p>
                    <div className="flex flex-wrap gap-4 text-sm font-manrope text-[#A1A1AA]">
                      <span className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} /><span>{current.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} /><span>{current.location}</span>
                      </span>
                    </div>
                  </div>
                  {current.type === 'current' && (
                    <span className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-manrope">
                      Active
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <h4 className="font-manrope text-xs text-[#A1A1AA] tracking-widest uppercase mb-4">Responsibilities</h4>
                  <ul className="space-y-3">
                    {current.description.map((d, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <div className="w-1 h-1 rounded-full bg-[#D4AF37] mt-2.5 shrink-0" />
                        <span className="font-manrope text-[#A1A1AA] text-sm leading-relaxed">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-manrope text-xs text-[#A1A1AA] tracking-widest uppercase mb-4">Key Achievements</h4>
                  <div className="grid gap-2">
                    {current.achievements.map((a, i) => (
                      <div key={i} className="flex items-center space-x-3 p-3 rounded-lg bg-[#1A1A1A]">
                        <Award className="w-4 h-4 text-[#D4AF37] shrink-0" strokeWidth={1.5} />
                        <span className="font-manrope text-sm text-[#F5F5F7]">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-manrope text-xs text-[#A1A1AA] tracking-widest uppercase mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {current.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 border border-white/8 rounded-full text-xs font-manrope text-[#A1A1AA] hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInRight>
          </div>
        )}

        {/* ── Technologies Tab ── */}
        {activeTab === 'technologies' && (
          <div>
            <FadeInUp delay={200}>
              <div className="text-center mb-12">
                <h3 className="font-playfair text-3xl font-medium text-[#F5F5F7] mb-4">Technology Ecosystem</h3>
                <p className="font-manrope text-[#A1A1AA] max-w-xl mx-auto">
                  Technologies, frameworks, and tools I've mastered across different roles and projects.
                </p>
              </div>
            </FadeInUp>

            <FadeInUp delay={300}>
              <div className="p-8 rounded-2xl border border-white/5 bg-[#0F0F0F]">
                <div className="flex flex-wrap gap-3">
                  {allTechnologies.map((tech, i) => (
                    <span
                      key={tech}
                      data-testid={`tech-tag-${i}`}
                      className="px-4 py-2 border border-white/8 rounded-full text-sm font-manrope text-[#A1A1AA] hover:border-[#D4AF37]/40 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInUp>
          </div>
        )}
      </div>
    </section>
  );
};
