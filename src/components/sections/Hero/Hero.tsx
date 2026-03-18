import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { FloatingProfilePhoto } from '../../animations';

const roles = [
  'Senior Data Scientist',
  'Machine Learning Engineer',
  'AI Solutions Architect',
  'Data Science Instructor',
];

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Smooth role transition
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setVisible(true);
      }, 400);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: '6+', label: 'Years Experience' },
    { value: '15+', label: 'Projects Delivered' },
    { value: '93%', label: 'Best Model Accuracy' },
    { value: '5', label: 'Industry Domains' },
  ];

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] pt-16"
    >
      {/* Subtle radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Faint grid lines for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Main layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT — Text Content */}
          <div className="order-2 lg:order-1">

            {/* Status badge */}
            <div
              data-testid="hero-status-badge"
              className="inline-flex items-center space-x-2 mb-8 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-manrope text-emerald-400 tracking-widest uppercase">
                Open to Opportunities
              </span>
            </div>

            {/* Greeting */}
            <p
              className="font-manrope text-[#A1A1AA] text-lg mb-3 animate-fadeInUp"
              style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
            >
              Hello, I'm
            </p>

            {/* Name — Playfair Display */}
            <h1
              data-testid="hero-name"
              className="font-playfair text-5xl md:text-7xl lg:text-8xl font-medium text-[#F5F5F7] leading-none tracking-tight mb-6 animate-fadeInUp"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              Ankit{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Anand
              </span>
            </h1>

            {/* Animated Role */}
            <div
              className="h-10 md:h-12 flex items-center mb-8 animate-fadeInUp"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              <span
                data-testid="hero-role"
                className={`font-manrope text-xl md:text-2xl font-light text-[#D4AF37] transition-all duration-400 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}
                style={{ transition: 'opacity 0.4s ease, transform 0.4s ease' }}
              >
                {roles[roleIndex]}
              </span>
            </div>

            {/* Description */}
            <p
              className="font-manrope text-[#A1A1AA] text-base md:text-lg leading-relaxed max-w-lg mb-3 animate-fadeInUp"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              6+ years transforming complex data into actionable insights.
            </p>
            <p
              className="font-manrope text-[#A1A1AA] text-base md:text-lg leading-relaxed max-w-lg mb-10 animate-fadeInUp"
              style={{ animationDelay: '0.45s', animationFillMode: 'both' }}
            >
              Currently{' '}
              <span className="text-[#F5F5F7] font-medium">
                @&nbsp;Bosch Global Software Technologies
              </span>
            </p>

            {/* Location */}
            <div
              className="flex items-center space-x-2 text-[#A1A1AA] text-sm mb-8 animate-fadeInUp"
              style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
            >
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
              <span className="font-manrope">Coimbatore, Tamil Nadu, India</span>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 mb-8 animate-fadeInUp"
              style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
            >
              <button
                data-testid="hero-view-work-btn"
                onClick={() => navigate('/projects')}
                className="group inline-flex items-center justify-center px-8 py-3.5 bg-[#D4AF37] text-[#050505] font-manrope font-semibold text-sm tracking-wide rounded-full transition-all duration-300 hover:bg-[#F0D060] hover:shadow-[0_0_24px_rgba(212,175,55,0.3)] active:scale-[0.97]"
              >
                View My Work
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
              </button>

              <button
                data-testid="hero-contact-btn"
                onClick={() => navigate('/contact')}
                className="group inline-flex items-center justify-center px-8 py-3.5 border border-white/10 text-[#F5F5F7] font-manrope font-medium text-sm tracking-wide rounded-full transition-all duration-300 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] hover:bg-white/5 active:scale-[0.97]"
              >
                Let's Connect
              </button>

              <a
                href="#resume"
                data-testid="hero-resume-btn"
                className="group inline-flex items-center justify-center px-6 py-3.5 text-[#A1A1AA] font-manrope font-medium text-sm tracking-wide rounded-full transition-all duration-300 hover:text-[#F5F5F7] active:scale-[0.97]"
              >
                <Download className="w-4 h-4 mr-2" strokeWidth={1.5} />
                Resume
              </a>
            </div>

            {/* Social Links */}
            <div
              className="flex items-center space-x-4 mb-8 animate-fadeInUp"
              style={{ animationDelay: '0.7s', animationFillMode: 'both' }}
            >
              <a
                href="https://linkedin.com/in/ankitanand29"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-linkedin"
                className="p-2.5 rounded-full border border-white/8 text-[#A1A1AA] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="https://github.com/ankitanand29"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-github"
                className="p-2.5 rounded-full border border-white/8 text-[#A1A1AA] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <Github className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="mailto:ankitanand.2910@gmail.com"
                data-testid="social-email"
                className="p-2.5 rounded-full border border-white/8 text-[#A1A1AA] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <Mail className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>

            {/* Stats Row */}
            <div
              className="grid grid-cols-4 gap-6 animate-fadeInUp"
              style={{ animationDelay: '0.8s', animationFillMode: 'both' }}
              data-testid="hero-stats"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="font-playfair text-2xl md:text-3xl font-medium text-[#D4AF37] mb-1">
                    {stat.value}
                  </div>
                  <div className="font-manrope text-xs text-[#A1A1AA] leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Profile Photo */}
          <div
            className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fadeIn"
            style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
          >
            <div className="relative">
              <FloatingProfilePhoto
                src="/images/profile.jpg"
                alt="Ankit Anand — Senior Data Scientist"
                size="xl"
              />

              {/* Decorative corner accent */}
              <div
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-10 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
                  filter: 'blur(24px)',
                }}
              />
              <div
                className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-10 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
            </div>
          </div>

        </div>

        {/* Scroll cue */}
        <div className="flex justify-center mt-10 md:mt-12">
          <button
            onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            className="flex flex-col items-center space-y-2 text-[#A1A1AA] hover:text-[#D4AF37] transition-colors duration-300 group"
            aria-label="Scroll down"
          >
            <span className="font-manrope text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-[#A1A1AA] to-transparent group-hover:from-[#D4AF37] transition-colors duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
