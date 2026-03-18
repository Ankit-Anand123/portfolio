import React, { useState, useMemo } from 'react';
import {
  Code, Database, Brain, BarChart, Users, Wrench,
  Target, Zap, MapPin, Calendar, Download,
  Award, Building, GraduationCap, Mail, Phone, Linkedin,
} from 'lucide-react';
import { FadeInUp, FadeInLeft, FadeInRight, ScaleIn } from '../../animations';

const About: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'bio' | 'focus' | 'education'>('bio');

  const skillsData = useMemo(() => [
    { category: 'Programming', level: 95, description: 'Expert in Python and SQL with 8+ years of experience', icon: <Code className="w-4 h-4" strokeWidth={1.5} />, color: '#D4AF37', skills: ['Python', 'SQL', 'Flask', 'REST APIs'] },
    { category: 'Data Science', level: 90, description: 'Advanced ML, Statistical Analysis, and Computer Vision', icon: <Brain className="w-4 h-4" strokeWidth={1.5} />, color: '#D4AF37', skills: ['Machine Learning', 'Statistical Analysis', 'Computer Vision', 'Time Series', 'Gen AI'] },
    { category: 'Libraries', level: 88, description: 'Proficient in modern data science and ML frameworks', icon: <Database className="w-4 h-4" strokeWidth={1.5} />, color: '#D4AF37', skills: ['Pandas', 'NumPy', 'Scikit-learn', 'Seaborn', 'Plotly', 'Streamlit', 'LangChain'] },
    { category: 'Analytics', level: 85, description: 'Business intelligence and data visualization expertise', icon: <BarChart className="w-4 h-4" strokeWidth={1.5} />, color: '#D4AF37', skills: ['Tableau', 'Hypothesis Testing', 'Predictive Modeling', 'KPI Dashboards'] },
    { category: 'Tools', level: 82, description: 'Development and data management tools', icon: <Wrench className="w-4 h-4" strokeWidth={1.5} />, color: '#D4AF37', skills: ['Git', 'Anaconda', 'Docker', 'APIs'] },
    { category: 'Leadership', level: 80, description: 'Team leadership and project management capabilities', icon: <Users className="w-4 h-4" strokeWidth={1.5} />, color: '#D4AF37', skills: ['Team Leadership', 'Ownership', 'Analytical Thinking', 'Problem-Solving'] },
  ], []);

  const focusAreas = [
    { icon: <Brain className="w-5 h-5" strokeWidth={1.5} />, title: 'Sensor Data Analytics', description: 'In-depth analysis of humidity effects in Inertial sensors using PCA and UMAP for higher dimension analysis.', progress: 85, impact: '20% accuracy improvement', timeline: '2023–2024' },
    { icon: <Target className="w-5 h-5" strokeWidth={1.5} />, title: 'Outlier Detection', description: 'Advanced anomaly detection using Tree-based classifiers, clustering, RANSAC, and Elliptical Envelope techniques.', progress: 90, impact: '95% anomaly detection rate', timeline: '2022–2024' },
    { icon: <BarChart className="w-5 h-5" strokeWidth={1.5} />, title: 'KPI Dashboards', description: 'Designing comprehensive Tableau dashboards for analyzing KPI performance across various product lines.', progress: 80, impact: '40% faster insights', timeline: '2023–Present' },
    { icon: <Zap className="w-5 h-5" strokeWidth={1.5} />, title: 'Generative AI', description: 'Exploring LangChain and LangGraph for building intelligent AI-powered solutions and workflows.', progress: 70, impact: 'Next-gen AI solutions', timeline: '2024–Present' },
  ];

  const aboutStats = [
    { number: '6+', label: 'Years Experience' },
    { number: '3', label: 'Companies' },
    { number: '15+', label: 'Projects' },
    { number: '93%', label: 'Model Accuracy' },
  ];

  const svgSize = 280;
  const center = svgSize / 2;
  const maxRadius = 110;

  const radarPoints = skillsData.map((skill, index) => {
    const angle = (index * (2 * Math.PI)) / skillsData.length - Math.PI / 2;
    const radius = (skill.level / 100) * maxRadius;
    return { x: center + radius * Math.cos(angle), y: center + radius * Math.sin(angle) };
  });

  const pathData = radarPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  const tabs: { id: 'bio' | 'focus' | 'education'; label: string }[] = [
    { id: 'bio', label: 'Biography' },
    { id: 'focus', label: 'Current Focus' },
    { id: 'education', label: 'Education' },
  ];

  return (
    <section id="about" className="relative min-h-screen py-24 bg-[var(--color-bg)]" data-testid="about-section">

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <FadeInUp>
          <div className="mb-16">
            <p className="font-manrope text-xs text-[#D4AF37] tracking-widest uppercase mb-4">About</p>
            <h1 className="font-playfair text-5xl md:text-6xl font-medium text-[var(--color-text)] mb-6">
              Meet Ankit Anand
            </h1>
            <p className="font-manrope text-[var(--color-muted)] text-lg leading-relaxed max-w-2xl">
              Dedicated Data Scientist with 8+ years of experience building data-intensive applications
              and helping businesses solve complex problems through analytics and machine learning.
            </p>
          </div>
        </FadeInUp>

        {/* Tab Navigation */}
        <FadeInUp delay={100}>
          <div className="flex space-x-1 mb-12 p-1 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                data-testid={`about-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-lg text-sm font-manrope font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#D4AF37] text-[#050505]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeInUp>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">

          {/* Left — Tab Content */}
          <div>
            {/* Bio Tab */}
            {activeTab === 'bio' && (
              <FadeInUp>
                <div
                  data-testid="bio-tab-content"
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8"
                >
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-14 h-14 rounded-full bg-[var(--color-surface2)] border border-[#D4AF37]/20 flex items-center justify-center">
                      <span className="font-playfair text-xl font-bold text-[#D4AF37]">AA</span>
                    </div>
                    <div>
                      <h3 className="font-playfair text-xl font-medium text-[var(--color-text)]">Ankit Anand</h3>
                      <p className="font-manrope text-sm text-[#D4AF37]">Senior Data Scientist & Blogger</p>
                    </div>
                  </div>

                  <p className="font-manrope text-[var(--color-muted)] text-sm leading-relaxed mb-8">
                    Dedicated and result-oriented Data Scientist and Blogger with a strong mathematical
                    background and 8+ years of experience in building data-intensive applications.
                    Proficient in descriptive analytics, predictive modeling, and data processing,
                    helping businesses solve complex problems.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { icon: <MapPin className="w-4 h-4" strokeWidth={1.5} />, label: 'Coimbatore, TN, India' },
                      { icon: <Mail className="w-4 h-4" strokeWidth={1.5} />, label: 'ankitanand.2910@gmail.com', href: 'mailto:ankitanand.2910@gmail.com' },
                      { icon: <Phone className="w-4 h-4" strokeWidth={1.5} />, label: '+91 8249089552' },
                      { icon: <Linkedin className="w-4 h-4" strokeWidth={1.5} />, label: 'ankitanand29', href: 'https://linkedin.com/in/ankitanand29' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <span className="text-[#D4AF37]/60">{item.icon}</span>
                        {item.href ? (
                          <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                            className="font-manrope text-xs text-[var(--color-muted)] hover:text-[#D4AF37] transition-colors duration-200 truncate">
                            {item.label}
                          </a>
                        ) : (
                          <span className="font-manrope text-xs text-[var(--color-muted)] truncate">{item.label}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="p-5 rounded-xl border border-[#D4AF37]/15 bg-[#D4AF37]/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Building className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                          <span className="font-manrope font-semibold text-[var(--color-text)] text-sm">
                            Bosch Global Software Technologies
                          </span>
                        </div>
                        <p className="font-manrope text-xs text-[var(--color-muted)] flex items-center space-x-3">
                          <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" strokeWidth={1.5} />Coimbatore</span>
                          <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" strokeWidth={1.5} />Sep 2023 – Present</span>
                        </p>
                      </div>
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </FadeInUp>
            )}

            {/* Focus Tab */}
            {activeTab === 'focus' && (
              <FadeInUp>
                <div className="space-y-4" data-testid="focus-tab-content">
                  {focusAreas.map((area, i) => (
                    <div
                      key={i}
                      className="group p-6 rounded-2xl border border-[var(--color-border)] hover:border-[#D4AF37]/20 bg-[var(--color-surface)] transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-2.5 rounded-lg bg-[var(--color-surface2)] text-[#D4AF37] shrink-0">{area.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-manrope font-semibold text-[var(--color-text)] mb-2">{area.title}</h4>
                          <p className="font-manrope text-[var(--color-muted)] text-sm leading-relaxed mb-4">{area.description}</p>
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-xs font-manrope">
                              <span className="text-[var(--color-muted)]">Progress</span>
                              <span className="text-[#D4AF37]">{area.progress}%</span>
                            </div>
                            <div className="w-full bg-[var(--color-surface2)] rounded-full h-1">
                              <div
                                className="h-1 rounded-full transition-all duration-1000"
                                style={{ width: `${area.progress}%`, background: 'linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.4))' }}
                              />
                            </div>
                          </div>
                          <div className="flex justify-between text-xs font-manrope">
                            <span className="text-[#D4AF37]/80">{area.impact}</span>
                            <span className="text-[var(--color-muted)]/60">{area.timeline}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeInUp>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <FadeInUp>
                <div
                  data-testid="education-tab-content"
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8"
                >
                  <div className="flex items-center space-x-3 mb-8">
                    <GraduationCap className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
                    <h3 className="font-playfair text-2xl font-medium text-[var(--color-text)]">Education & Certifications</h3>
                  </div>

                  <div className="space-y-4 mb-8">
                    {[
                      { degree: 'Master of Science: ML & AI', school: 'Woolf University Canterbury, England', period: 'March 2022 – June 2024' },
                      { degree: 'B.Tech: Computer Science & Technology', school: 'Indira Gandhi Institute of Technology, Sarang', period: 'July 2014 – June 2018', extra: 'CGPA: 8.23' },
                    ].map((edu, i) => (
                      <div key={i} className="p-6 rounded-xl border border-[var(--color-border)] hover:border-[#D4AF37]/15 transition-colors duration-300">
                        <div className="font-manrope font-semibold text-[var(--color-text)] mb-1">{edu.degree}</div>
                        <div className="font-manrope text-sm text-[#D4AF37] mb-2">{edu.school}</div>
                        <div className="flex justify-between font-manrope text-xs text-[var(--color-muted)]">
                          <span>{edu.period}</span>
                          {edu.extra && <span>{edu.extra}</span>}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h4 className="font-manrope font-semibold text-[var(--color-text)] text-sm mb-4 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-[#D4AF37]" strokeWidth={1.5} />
                    Professional Certifications
                  </h4>
                  <div className="space-y-2 mb-8">
                    {[
                      'Python for Data Science, AI & Development – Coursera',
                      'Machine Learning Specialization – Coursera',
                      'Advanced Analytics & Data Science Professional',
                    ].map((cert, i) => (
                      <div key={i} className="flex items-center space-x-3 p-3 rounded-lg bg-[var(--color-surface2)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span className="font-manrope text-sm text-[var(--color-muted)]">{cert}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface2)]">
                    <h5 className="font-manrope font-semibold text-[var(--color-text)] text-sm mb-2">Research & Publications</h5>
                    <p className="font-manrope text-sm text-[var(--color-muted)] leading-relaxed">
                      <strong className="text-[var(--color-text)]">"Analysis of the Attention Level of the Human Body in Different Forms"</strong>
                      <br />Published in Springer Nature, September 2018. Research focusing on human attention analysis using ML techniques.
                    </p>
                  </div>
                </div>
              </FadeInUp>
            )}
          </div>

          {/* Right — Skills Radar */}
          <div className="lg:sticky lg:top-24">
            <FadeInRight>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                <h3 className="font-playfair text-xl font-medium text-[var(--color-text)] mb-6 text-center">
                  Skills Radar
                </h3>

                <div className="flex justify-center mb-6">
                  <svg width={svgSize} height={svgSize}>
                    <defs>
                      <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.02" />
                      </radialGradient>
                    </defs>

                    {/* Grid circles */}
                    {[20, 40, 60, 80, 100].map((level) => (
                      <circle
                        key={level}
                        cx={center}
                        cy={center}
                        r={(level / 100) * maxRadius}
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth={1}
                      />
                    ))}

                    {/* Axis lines */}
                    {skillsData.map((_, i) => {
                      const angle = (i * (2 * Math.PI)) / skillsData.length - Math.PI / 2;
                      return (
                        <line
                          key={i}
                          x1={center} y1={center}
                          x2={center + maxRadius * Math.cos(angle)}
                          y2={center + maxRadius * Math.sin(angle)}
                          stroke="rgba(255,255,255,0.06)"
                          strokeWidth={1}
                        />
                      );
                    })}

                    {/* Fill area */}
                    <path d={pathData} fill="url(#radarFill)" stroke="#D4AF37" strokeWidth={1.5} />

                    {/* Skill points */}
                    {skillsData.map((skill, i) => {
                      const angle = (i * (2 * Math.PI)) / skillsData.length - Math.PI / 2;
                      const radius = (skill.level / 100) * maxRadius;
                      const x = center + radius * Math.cos(angle);
                      const y = center + radius * Math.sin(angle);
                      return (
                        <g key={i}>
                          {selectedSkill === skill.category && (
                            <circle cx={x} cy={y} r={12} fill="#D4AF37" opacity={0.15} />
                          )}
                          <circle
                            cx={x} cy={y}
                            r={selectedSkill === skill.category ? 6 : 4}
                            fill="#D4AF37"
                            stroke="var(--color-bg)"
                            strokeWidth={2}
                            className="cursor-pointer transition-all duration-200"
                            onClick={() => setSelectedSkill(selectedSkill === skill.category ? null : skill.category)}
                          />
                        </g>
                      );
                    })}

                    {/* Labels */}
                    {skillsData.map((skill, i) => {
                      const angle = (i * (2 * Math.PI)) / skillsData.length - Math.PI / 2;
                      const labelRadius = maxRadius + 22;
                      return (
                        <text
                          key={i}
                          x={center + labelRadius * Math.cos(angle)}
                          y={center + labelRadius * Math.sin(angle)}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className={`text-xs font-manrope transition-colors duration-200 ${selectedSkill === skill.category ? 'fill-[#D4AF37]' : 'fill-[#A1A1AA]'}`}
                          style={{ fontSize: '11px' }}
                        >
                          {skill.category}
                        </text>
                      );
                    })}
                  </svg>
                </div>

                {/* Selected skill details */}
                {selectedSkill ? (
                  <ScaleIn>
                    {(() => {
                      const skill = skillsData.find(s => s.category === selectedSkill);
                      return skill ? (
                        <div
                          data-testid="skill-detail"
                          className="p-5 rounded-xl border border-[#D4AF37]/15 bg-[#D4AF37]/5"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <span className="text-[#D4AF37]">{skill.icon}</span>
                              <div>
                                <span className="font-manrope font-semibold text-[var(--color-text)] text-sm">{skill.category}</span>
                                <div className="font-manrope text-xs text-[var(--color-muted)]">
                                  {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Proficient'}
                                </div>
                              </div>
                            </div>
                            <span className="font-playfair text-xl text-[#D4AF37]">{skill.level}%</span>
                          </div>
                          <p className="font-manrope text-xs text-[var(--color-muted)] mb-3 leading-relaxed">{skill.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {skill.skills.map((s, j) => (
                              <span key={j} className="px-2 py-1 rounded-full border border-[var(--color-border)] text-xs font-manrope text-[var(--color-muted)]">{s}</span>
                            ))}
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </ScaleIn>
                ) : (
                  <p className="text-center font-manrope text-xs text-[var(--color-muted)]/60 mt-2">
                    Click on a radar point to see details
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[var(--color-border)]">
                  <div className="text-center">
                    <div className="font-playfair text-xl text-[#D4AF37] font-medium">
                      {Math.round(skillsData.reduce((a, s) => a + s.level, 0) / skillsData.length)}%
                    </div>
                    <div className="font-manrope text-xs text-[var(--color-muted)]">Overall Average</div>
                  </div>
                  <div className="text-center">
                    <div className="font-playfair text-xl text-[#D4AF37] font-medium">
                      {skillsData.filter(s => s.level >= 85).length}/{skillsData.length}
                    </div>
                    <div className="font-manrope text-xs text-[var(--color-muted)]">Expert Level</div>
                  </div>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>

        {/* Stats */}
        <FadeInUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {aboutStats.map((stat, i) => (
              <div
                key={i}
                data-testid={`about-stat-${i}`}
                className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-center"
              >
                <div className="font-playfair text-4xl font-medium text-[#D4AF37] mb-2">{stat.number}</div>
                <div className="font-manrope text-sm text-[var(--color-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeInUp>

        {/* CTA */}
        <FadeInUp>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/resume.pdf"
              download="Ankit_Anand_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="about-download-btn"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#D4AF37] text-[#050505] font-manrope font-semibold text-sm tracking-wide rounded-full transition-all duration-300 hover:bg-[#F0D060] hover:shadow-[0_0_24px_rgba(212,175,55,0.3)]"
            >
              <Download className="w-4 h-4 mr-2" strokeWidth={2} />
              Download Resume
            </a>
            <a
              href="https://linkedin.com/in/ankitanand29"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="about-linkedin-btn"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-[var(--color-border)] text-[var(--color-text)] font-manrope font-medium text-sm tracking-wide rounded-full transition-all duration-300 hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
            >
              <Linkedin className="w-4 h-4 mr-2" strokeWidth={1.5} />
              View LinkedIn
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

export { About };
