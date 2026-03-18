import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/sections/Hero';
import {
  ArrowRight,
  Brain,
  Database,
  BarChart3,
  Code,
  Building,
  Award,
  Zap,
  Star,
  Download,
  Github,
  Linkedin,
  Mail,
  FolderOpen,
} from 'lucide-react';
import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer } from '../components/animations';

export const HomePage: React.FC = () => {

  const quickStats = [
    { number: '6+', label: 'Years Experience' },
    { number: '15+', label: 'Projects Delivered' },
    { number: '93%', label: 'Best Model Accuracy' },
    { number: '5', label: 'Industry Domains' },
  ];

  const expertiseAreas = [
    {
      icon: <Brain className="w-6 h-6" strokeWidth={1.5} />,
      title: 'Machine Learning',
      description: 'Advanced ML algorithms, predictive modeling, and AI solutions.',
      skills: ['Scikit-learn', 'TensorFlow', 'Feature Engineering', 'Model Optimization'],
    },
    {
      icon: <Database className="w-6 h-6" strokeWidth={1.5} />,
      title: 'Data Science',
      description: 'Statistical analysis, data processing, and insight generation.',
      skills: ['Pandas', 'NumPy', 'Statistical Analysis', 'Data Visualization'],
    },
    {
      icon: <BarChart3 className="w-6 h-6" strokeWidth={1.5} />,
      title: 'Analytics & BI',
      description: 'Business intelligence, KPI dashboards, and data storytelling.',
      skills: ['Tableau', 'Power BI', 'Dashboard Design', 'KPI Analysis'],
    },
    {
      icon: <Code className="w-6 h-6" strokeWidth={1.5} />,
      title: 'Software Engineering',
      description: 'Full-stack development and scalable application architecture.',
      skills: ['Python', 'Flask', 'React', 'API Development'],
    },
  ];

  const currentHighlights = [
    {
      title: 'Current Role',
      content: 'Senior Data Scientist at Bosch Global Software Technologies',
      icon: <Building className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      title: 'Latest Achievement',
      content: 'Advanced sensor analytics with PCA and UMAP implementation',
      icon: <Award className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      title: 'Current Focus',
      content: 'Generative AI and LangChain for intelligent solutions',
      icon: <Zap className="w-5 h-5" strokeWidth={1.5} />,
    },
  ];

  const portfolioLinks = [
    {
      title: 'About Me',
      description: '6+ year journey from software engineering to senior data scientist across diverse industries.',
      path: '/about',
    },
    {
      title: 'Professional Journey',
      description: 'Career progression, impactful projects, and the value created across companies and domains.',
      path: '/experience',
    },
    {
      title: 'Project Portfolio',
      description: 'Innovative solutions from EasyBot agentic AI to HypoTestX open-source library and healthcare analytics.',
      path: '/projects',
    },
    {
      title: "Let's Connect",
      description: 'Consulting, collaboration, or full-time opportunities — always excited for new challenges.',
      path: '/contact',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">

      {/* Hero Section */}
      <Hero />

      {/* ── Stats Strip ── */}
      <section
        data-testid="stats-section"
        className="py-16 border-y border-[var(--color-border)]"
        style={{ background: 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-surface) 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeInUp>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {quickStats.map((stat, i) => (
                <div key={i} className="text-center" data-testid={`stat-item-${i}`}>
                  <div className="font-playfair text-4xl md:text-5xl font-medium text-[#D4AF37] mb-2">
                    {stat.number}
                  </div>
                  <div className="font-manrope text-sm text-[var(--color-muted)] tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ── Current Highlights ── */}
      <section
        data-testid="highlights-section"
        className="py-24 bg-[var(--color-surface)]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeInUp>
            <div className="mb-16">
              <p className="font-manrope text-xs text-[#D4AF37] tracking-widest uppercase mb-4">Right Now</p>
              <h2 className="font-playfair text-4xl md:text-5xl font-medium text-[var(--color-text)]">
                Current Highlights
              </h2>
            </div>
          </FadeInUp>

          <div className="grid md:grid-cols-3 gap-6">
            {currentHighlights.map((item, i) => (
              <FadeInUp key={i} delay={i * 150}>
                <div
                  data-testid={`highlight-card-${i}`}
                  className="group p-8 rounded-2xl border border-[var(--color-border)] hover:border-[#D4AF37]/20 transition-all duration-500 hover:bg-[var(--color-surface2)]/50"
                  style={{ backdropFilter: 'blur(8px)' }}
                >
                  <div className="text-[#D4AF37] mb-5 transition-transform duration-300 group-hover:scale-110 inline-block">
                    {item.icon}
                  </div>
                  <h3 className="font-manrope text-xs text-[var(--color-muted)] tracking-widest uppercase mb-3">
                    {item.title}
                  </h3>
                  <p className="font-manrope text-[var(--color-text)] text-base leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expertise Areas ── */}
      <section
        data-testid="expertise-section"
        className="py-24 bg-[var(--color-bg)]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeInUp>
            <div className="mb-16">
              <p className="font-manrope text-xs text-[#D4AF37] tracking-widest uppercase mb-4">
                What I Do
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl font-medium text-[var(--color-text)]">
                Core Expertise
              </h2>
            </div>
          </FadeInUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseAreas.map((area, i) => (
              <FadeInUp key={i} delay={i * 100}>
                <div
                  data-testid={`expertise-card-${i}`}
                  className="group p-8 rounded-2xl border border-[var(--color-border)] hover:border-[#D4AF37]/20 bg-[var(--color-surface)] transition-all duration-500 hover:bg-[var(--color-surface2)]"
                >
                  <div className="text-[#D4AF37] mb-6 transition-transform duration-300 group-hover:scale-110 inline-block">
                    {area.icon}
                  </div>
                  <h3 className="font-manrope font-semibold text-[var(--color-text)] text-lg mb-3">
                    {area.title}
                  </h3>
                  <p className="font-manrope text-[var(--color-muted)] text-sm leading-relaxed mb-6">
                    {area.description}
                  </p>
                  <div className="space-y-1.5">
                    {area.skills.map((skill, j) => (
                      <div key={j} className="flex items-center space-x-2">
                        <div className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-60" />
                        <span className="font-manrope text-xs text-[var(--color-muted)]">{skill}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 h-px bg-gradient-to-r from-[#D4AF37] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio Navigation ── */}
      <section
        data-testid="portfolio-nav-section"
        className="py-24 bg-[var(--color-surface)]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeInUp>
            <div className="mb-16">
              <p className="font-manrope text-xs text-[#D4AF37] tracking-widest uppercase mb-4">
                Explore
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl font-medium text-[var(--color-text)]">
                My Portfolio
              </h2>
            </div>
          </FadeInUp>

          <div className="grid md:grid-cols-2 gap-6">
            {portfolioLinks.map((section, i) => (
              <FadeInUp key={i} delay={i * 100}>
                <Link
                  to={section.path}
                  data-testid={`portfolio-link-${i}`}
                  className="group block p-10 rounded-2xl border border-[var(--color-border)] hover:border-[#D4AF37]/20 bg-[var(--color-bg)] transition-all duration-500 hover:bg-[var(--color-surface2)]/60"
                >
                  <h3 className="font-playfair text-2xl md:text-3xl font-medium text-[var(--color-text)] mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {section.title}
                  </h3>
                  <p className="font-manrope text-[var(--color-muted)] text-sm leading-relaxed mb-8">
                    {section.description}
                  </p>
                  <div className="flex items-center text-[#D4AF37] text-sm font-manrope font-medium">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" strokeWidth={1.5} />
                  </div>
                </Link>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Source Spotlight ── */}
      <section
        data-testid="open-source-spotlight"
        className="py-24 bg-[var(--color-surface)]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeInLeft>
              <div>
                <span className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-xs font-manrope text-purple-400 tracking-widest uppercase">Open Source</span>
                </span>
                <p className="font-manrope text-xs text-[#D4AF37] tracking-widest uppercase mb-4">
                  Latest Release
                </p>
                <h2 className="font-playfair text-3xl md:text-4xl font-medium text-[var(--color-text)] mb-6">
                  HypoTestX — v1.0.6
                </h2>
                <p className="font-manrope text-[var(--color-muted)] text-base leading-relaxed mb-8">
                  A Python library that lets you ask statistical questions in plain English.
                  HypoTestX routes to the right test automatically — with or without an LLM backend.
                  Zero mandatory dependencies, 532 tests passing.
                </p>
                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface2)] mb-8">
                  <code className="font-jetbrains text-sm text-[#D4AF37]">pip install hypotestx</code>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/open-source"
                    data-testid="home-opensource-btn"
                    className="group inline-flex items-center justify-center px-6 py-3 bg-[#D4AF37] text-[#050505] font-manrope font-semibold text-sm rounded-full transition-all duration-300 hover:bg-[#F0D060]"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
                  </Link>
                  <a
                    href="https://github.com/Ankit-Anand123/HypoTestX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 font-manrope text-sm rounded-full transition-all duration-300"
                  >
                    <Github className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    GitHub
                  </a>
                </div>
              </div>
            </FadeInLeft>

            <FadeInRight>
              <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden">
                <div className="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface2)] flex items-center justify-between">
                  <span className="font-manrope text-sm text-[var(--color-muted)]">hypotestx_demo.py</span>
                  <div className="flex space-x-1.5">
                    {['#FF5F57', '#FFBD2E', '#28C840'].map((c) => (
                      <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-[var(--color-surface2)]">
                  <pre className="font-jetbrains text-sm leading-relaxed overflow-x-auto">
{`import hypotestx as hx
import pandas as pd

df = pd.read_csv('survey.csv')

# Ask in plain English — no API key needed
result = hx.analyze(
    df, "Do males earn more than females?"
)

print(result.summary())
# Statistic (t):   3.2456
# p-value:         0.0012
# Significant:     Yes (alpha=0.05)
# Effect size (d): 0.6834  (medium)`}
                  </pre>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ── Featured Work ── */}
      <section
        data-testid="featured-work-section"
        className="py-24 bg-[var(--color-bg)]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <FadeInLeft>
              <div>
                <p className="font-manrope text-xs text-[#D4AF37] tracking-widest uppercase mb-4">
                  Featured Project
                </p>
                <h2 className="font-playfair text-3xl md:text-4xl font-medium text-[var(--color-text)] mb-6">
                  EasyBot — Agentic AI Chatbot
                </h2>
                <p className="font-manrope text-[var(--color-muted)] text-base leading-relaxed mb-8">
                  Designed and built EasyBot at Bosch — an agentic AI chatbot powered by LangGraph
                  multi-agent orchestration. Features SQL dry-run, guided query prompting, and a
                  parallel Agno-based agent. Delivered via Chainlit UI with significantly reduced
                  data analysis turnaround time.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                    <div className="font-playfair text-2xl text-[#D4AF37] font-medium mb-1">2+</div>
                    <div className="font-manrope text-xs text-[var(--color-muted)]">Agents Built</div>
                  </div>
                  <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                    <div className="font-playfair text-2xl text-[#D4AF37] font-medium mb-1">3x</div>
                    <div className="font-manrope text-xs text-[var(--color-muted)]">Faster Analysis</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {['LangGraph', 'LangChain', 'Chainlit', 'Python', 'SQL', 'Multi-Agent'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 border border-[var(--color-border)] rounded-full text-xs font-manrope text-[var(--color-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  to="/projects"
                  data-testid="featured-view-all-btn"
                  className="group inline-flex items-center text-[#D4AF37] font-manrope font-medium text-sm hover:text-[#F0D060] transition-colors duration-300"
                >
                  <FolderOpen className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  View All Projects
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </Link>
              </div>
            </FadeInLeft>

            <FadeInRight>
              <div
                className="rounded-2xl border border-[var(--color-border)] overflow-hidden p-10"
                style={{
                  background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface2) 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(212,175,55,0.08)',
                }}
              >
                <div className="space-y-3 mb-8">
                  {[
                    { label: 'NL Query', pct: 92 },
                    { label: 'SQL Agent', pct: 85 },
                    { label: 'Data Analysis', pct: 95 },
                    { label: 'Multi-Agent', pct: 78 },
                    { label: 'Response Accuracy', pct: 88 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <span className="font-manrope text-xs text-[var(--color-muted)] w-28 shrink-0">{item.label}</span>
                      <div className="flex-1 bg-[var(--color-bg)] rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${item.pct}%`,
                            background: 'linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.4))',
                          }}
                        />
                      </div>
                      <span className="font-manrope text-xs text-[#D4AF37] w-8 text-right">{item.pct}%</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[var(--color-border)] pt-6">
                  <p className="font-playfair text-xl text-[var(--color-text)] mb-1">Agentic AI Architecture</p>
                  <p className="font-manrope text-sm text-[var(--color-muted)]">LangGraph · Multi-agent · Chainlit</p>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section
        data-testid="cta-section"
        className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, var(--color-surface) 0%, var(--color-bg) 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
          <FadeInUp>
            <p className="font-manrope text-xs text-[#D4AF37] tracking-widest uppercase mb-6">
              Let's Work Together
            </p>
            <h2 className="font-playfair text-4xl md:text-6xl font-medium text-[var(--color-text)] mb-6 leading-tight">
              Ready to Transform Your Data?
            </h2>
            <p className="font-manrope text-[var(--color-muted)] text-lg leading-relaxed mb-10">
              Let's collaborate to turn your data challenges into strategic opportunities.
              Whether it's machine learning, analytics, or AI solutions—I'm here to help.
            </p>
          </FadeInUp>

          <FadeInUp delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/contact"
                data-testid="cta-contact-btn"
                className="group inline-flex items-center justify-center px-8 py-3.5 bg-[#D4AF37] text-[#050505] font-manrope font-semibold text-sm tracking-wide rounded-full transition-all duration-300 hover:bg-[#F0D060] hover:shadow-[0_0_24px_rgba(212,175,55,0.3)] active:scale-[0.97]"
              >
                <Mail className="w-4 h-4 mr-2" strokeWidth={2} />
                Start a Conversation
              </Link>
              <a
                href="/resume.pdf"
                download="Ankit_Anand_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-8 py-3.5 border border-[var(--color-border)] text-[var(--color-text)] font-manrope font-medium text-sm tracking-wide rounded-full transition-all duration-300 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] active:scale-[0.97]"
              >
                <Download className="w-4 h-4 mr-2" strokeWidth={1.5} />
                Download Resume
              </a>
            </div>
          </FadeInUp>

          <FadeInUp delay={400}>
            <div className="flex justify-center space-x-4">
              <a
                href="https://linkedin.com/in/ankitanand29"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a
                href="https://github.com/Ankit-Anand123"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <Github className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a
                href="mailto:ankitanand.2910@gmail.com"
                className="p-3 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <Mail className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
};
