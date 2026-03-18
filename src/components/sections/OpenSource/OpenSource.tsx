import React, { useState } from 'react';
import {
  Github, ExternalLink, Package, Code, CheckCircle,
  Star, GitBranch, BookOpen, Zap, Terminal, Layers,
} from 'lucide-react';
import { FadeInUp, FadeInLeft, FadeInRight } from '../../animations';

export const OpenSource: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'usage'>('overview');

  const stats = [
    { value: 'v1.0.6', label: 'Latest Version' },
    { value: '532', label: 'Tests Passing' },
    { value: '79%', label: 'Code Coverage' },
    { value: '12+', label: 'Statistical Tests' },
  ];

  const features = [
    {
      icon: <Terminal className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Natural Language Interface',
      description: 'Ask statistical questions in plain English. HypoTestX routes to the right test automatically — no statistics knowledge required.',
      code: 'result = hx.analyze(df, "Do males earn more than females?")',
    },
    {
      icon: <Layers className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Plug-in LLM Backends',
      description: 'Swap between Gemini, OpenAI, Groq, Ollama, or HuggingFace with a single keyword argument.',
      code: 'hx.analyze(df, question, backend="gemini", api_key="...")',
    },
    {
      icon: <Code className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Pure Python Mathematics',
      description: 'Zero mandatory external dependencies. All statistical computations implemented from scratch using Newton\'s method, Taylor series, and Lanczos approximation.',
      code: '# No NumPy or SciPy required!\npip install hypotestx',
    },
    {
      icon: <Zap className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Comprehensive Toolkit',
      description: 'Parametric, non-parametric, categorical, and correlation tests — all with effect sizes, confidence intervals, and power analysis.',
      code: 'hx.ttest_2samp(group1, group2, equal_var=False)',
    },
  ];

  const supportedTests = [
    { category: 'Parametric', tests: ['One-sample t-test', "Welch's t-test", 'Two-sample t-test', 'Paired t-test', 'One-way ANOVA'] },
    { category: 'Non-Parametric', tests: ['Mann-Whitney U', 'Wilcoxon signed-rank', 'Kruskal-Wallis'] },
    { category: 'Categorical', tests: ['Chi-square (independence)', 'Chi-square (GoF)', "Fisher's exact"] },
    { category: 'Correlation', tests: ['Pearson', 'Spearman', 'Point-biserial'] },
  ];

  const llmBackends = [
    { name: 'Regex Fallback', cost: 'Free, Offline', notes: 'Default, zero deps' },
    { name: 'Ollama', cost: 'Free, Offline', notes: 'Local LLM' },
    { name: 'Google Gemini', cost: 'Free tier (1500 req/day)', notes: 'Best accuracy' },
    { name: 'Groq', cost: 'Free tier', notes: 'Very fast' },
    { name: 'OpenAI', cost: 'Paid', notes: 'Most capable' },
    { name: 'HuggingFace', cost: 'Free / Local', notes: 'transformers' },
  ];

  const tabs: { id: 'overview' | 'features' | 'usage'; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'usage', label: 'Quick Start' },
  ];

  return (
    <section
      id="open-source"
      data-testid="opensource-section"
      className="relative min-h-screen py-24 bg-[var(--color-bg)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <FadeInUp>
          <div className="mb-16">
            <p className="font-manrope text-xs text-[#D4AF37] tracking-widest uppercase mb-4">Open Source</p>
            <h1 className="font-playfair text-5xl md:text-6xl font-medium text-[var(--color-text)] mb-4">
              Building for the Community
            </h1>
            <p className="font-manrope text-[var(--color-muted)] text-lg leading-relaxed max-w-2xl mb-8">
              Giving back through open-source tools that make data science more accessible.
            </p>

            {/* Repo hero card */}
            <div
              className="relative p-8 rounded-2xl border border-[#D4AF37]/20 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface2) 100%)' }}
            >
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(212,175,55,0.5) 0%, transparent 70%)',
                }}
              />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                      <Package className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="font-playfair text-2xl font-medium text-[var(--color-text)]">HypoTestX</h2>
                      <p className="font-manrope text-sm text-[#D4AF37]">Ankit-Anand123/HypoTestX</p>
                    </div>
                  </div>
                  <p className="font-manrope text-[var(--color-muted)] max-w-lg leading-relaxed">
                    Natural Language Hypothesis Testing — Powered by LLMs or Pure Regex.
                    Ask a statistical question in plain English and get a full structured result.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 shrink-0">
                  <a
                    href="https://github.com/Ankit-Anand123/HypoTestX"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="github-repo-link"
                    className="group flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#D4AF37] text-[#050505] font-manrope font-semibold text-sm transition-all duration-300 hover:bg-[#F0D060] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  >
                    <Github className="w-4 h-4" strokeWidth={2} />
                    <span>View on GitHub</span>
                  </a>
                  <a
                    href="https://pypi.org/project/hypotestx/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="pypi-link"
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] font-manrope text-sm hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-all duration-300"
                  >
                    <Package className="w-4 h-4" strokeWidth={1.5} />
                    <span>PyPI</span>
                    <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Stats */}
        <FadeInUp delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <div key={i} data-testid={`os-stat-${i}`} className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-center">
                <div className="font-playfair text-3xl font-medium text-[#D4AF37] mb-2">{stat.value}</div>
                <div className="font-manrope text-sm text-[var(--color-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeInUp>

        {/* Install command */}
        <FadeInUp delay={150}>
          <div className="mb-12 p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Terminal className="w-4 h-4 text-[#D4AF37] shrink-0" strokeWidth={1.5} />
              <code className="font-jetbrains text-sm text-[var(--color-text)]">pip install hypotestx</code>
            </div>
            <span className="font-manrope text-xs text-[var(--color-muted)] hidden sm:block">
              No mandatory external dependencies
            </span>
          </div>
        </FadeInUp>

        {/* Tab Navigation */}
        <FadeInUp delay={200}>
          <div className="flex space-x-1 mb-12 p-1 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                data-testid={`os-tab-${tab.id}`}
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

        {/* ── Overview Tab ── */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <FadeInUp>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Why HypoTestX */}
                <div className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <h3 className="font-playfair text-2xl font-medium text-[var(--color-text)] mb-6">Why HypoTestX?</h3>
                  <div className="space-y-4">
                    {[
                      { icon: '❌', lib: 'scipy', issue: 'Must know which test to run — manual, code-only' },
                      { icon: '❌', lib: 'Ask an LLM', issue: 'Plain text answers — not embeddable or reproducible' },
                      { icon: '✅', lib: 'HypoTestX', issue: 'Plain English question → full structured HypoResult' },
                    ].map((row, i) => (
                      <div key={i} className={`p-4 rounded-xl ${i === 2 ? 'border border-[#D4AF37]/20 bg-[#D4AF37]/5' : 'bg-[var(--color-surface2)]'}`}>
                        <div className="flex items-center space-x-3">
                          <span className="text-base">{row.icon}</span>
                          <div>
                            <span className={`font-manrope font-semibold text-sm ${i === 2 ? 'text-[#D4AF37]' : 'text-[var(--color-text)]'}`}>{row.lib}</span>
                            <p className="font-manrope text-xs text-[var(--color-muted)] mt-0.5">{row.issue}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Supported Tests */}
                <div className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <h3 className="font-playfair text-2xl font-medium text-[var(--color-text)] mb-6">Supported Tests</h3>
                  <div className="space-y-4">
                    {supportedTests.map((group, i) => (
                      <div key={i}>
                        <div className="font-manrope text-xs text-[#D4AF37] tracking-widest uppercase mb-2">{group.category}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {group.tests.map((test) => (
                            <span key={test} className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[var(--color-surface2)] text-xs font-manrope text-[var(--color-muted)]">
                              <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" strokeWidth={2} />
                              <span>{test}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* LLM Backends */}
            <FadeInUp delay={200}>
              <div className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                <h3 className="font-playfair text-2xl font-medium text-[var(--color-text)] mb-6">LLM Backends</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {llmBackends.map((b, i) => (
                    <div key={i} className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface2)]">
                      <div className="font-manrope font-semibold text-[var(--color-text)] text-sm mb-1">{b.name}</div>
                      <div className="font-manrope text-xs text-[#D4AF37] mb-1">{b.cost}</div>
                      <div className="font-manrope text-xs text-[var(--color-muted)]">{b.notes}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInUp>
          </div>
        )}

        {/* ── Features Tab ── */}
        {activeTab === 'features' && (
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <FadeInUp key={i} delay={i * 100}>
                <div className="p-8 rounded-2xl border border-[var(--color-border)] hover:border-[#D4AF37]/20 bg-[var(--color-surface)] transition-all duration-300 group">
                  <div className="flex items-center space-x-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="font-manrope font-semibold text-[var(--color-text)]">{feature.title}</h3>
                  </div>
                  <p className="font-manrope text-[var(--color-muted)] text-sm leading-relaxed mb-5">{feature.description}</p>
                  <div className="p-4 rounded-xl bg-[var(--color-surface2)] border border-[var(--color-border)]">
                    <code className="font-jetbrains text-xs text-[#D4AF37] whitespace-pre">{feature.code}</code>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        )}

        {/* ── Quick Start Tab ── */}
        {activeTab === 'usage' && (
          <div className="max-w-3xl space-y-6">
            {[
              {
                title: 'Installation',
                code: `pip install hypotestx`,
                note: 'No mandatory external dependencies — all statistical math is pure Python stdlib.',
              },
              {
                title: 'Natural Language Interface',
                code: `import hypotestx as hx
import pandas as pd

df = pd.read_csv('data.csv')

# Zero config — regex router, no API key needed
result = hx.analyze(df, "Do males earn more than females?")
print(result.summary())
# Statistic (t): 3.2456
# p-value:       0.0012
# Significant:   Yes (alpha = 0.05)
# Effect size:   0.6834 (medium)`,
              },
              {
                title: 'With LLM Backend (Gemini Free Tier)',
                code: `result = hx.analyze(
    df,
    "Is there a salary difference between engineering and sales?",
    backend="gemini",
    api_key="AIza...",
    model="gemini-2.0-flash",
    temperature=0.0,
)
print(result.p_value)       # 0.0012
print(result.effect_size)   # 0.6834
print(result.is_significant) # True`,
              },
              {
                title: 'Direct API (Explicit Control)',
                code: `# Direct API — full parameter control
result = hx.ttest_2samp(
    group1, group2,
    equal_var=False,  # Welch's t-test
    alternative='greater',
    alpha=0.01,
)

# Power analysis
n = hx.n_ttest_two_sample(effect_size=0.5, power=0.8)`,
              },
            ].map((section, i) => (
              <FadeInUp key={i} delay={i * 100}>
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
                  <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
                    <span className="font-manrope font-semibold text-[var(--color-text)] text-sm">{section.title}</span>
                    <div className="flex space-x-1.5">
                      {['#FF5F57', '#FFBD2E', '#28C840'].map((c) => (
                        <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                  <div className="p-6 bg-[var(--color-surface2)]">
                    <pre className="font-jetbrains text-sm text-[#D4AF37] whitespace-pre overflow-x-auto leading-relaxed">
                      {section.code}
                    </pre>
                  </div>
                  {section.note && (
                    <div className="px-6 py-3 border-t border-[var(--color-border)]">
                      <p className="font-manrope text-xs text-[var(--color-muted)]">{section.note}</p>
                    </div>
                  )}
                </div>
              </FadeInUp>
            ))}

            <FadeInUp delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="https://github.com/Ankit-Anand123/HypoTestX"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="os-github-btn"
                  className="group inline-flex items-center justify-center px-8 py-3.5 bg-[#D4AF37] text-[#050505] font-manrope font-semibold text-sm tracking-wide rounded-full transition-all duration-300 hover:bg-[#F0D060] hover:shadow-[0_0_24px_rgba(212,175,55,0.3)]"
                >
                  <Github className="w-4 h-4 mr-2" strokeWidth={2} />
                  View Full Source Code
                </a>
                <a
                  href="https://github.com/Ankit-Anand123/HypoTestX#contributing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-[var(--color-border)] text-[var(--color-text)] font-manrope font-medium text-sm tracking-wide rounded-full transition-all duration-300 hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                >
                  <BookOpen className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Contributing Guide
                </a>
              </div>
            </FadeInUp>
          </div>
        )}
      </div>
    </section>
  );
};
