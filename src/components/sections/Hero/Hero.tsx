import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ChevronDown, Play, Code, Brain } from 'lucide-react';
import { ContactInfo, SocialLinks } from './components';
import { 
  FloatingProfilePhoto, 
  AnimatedStats, 
  MagneticButton, 
  ParticleButton,
  MorphingBackground,
  GlitchText,
  CyberpunkGlitch,
  AdvancedTypewriter,
  RoleTypewriter,
  RevealOnScroll,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  StaggerContainer,
  ParticleExplosion,
  CyberExplosion,
  ConfettiExplosion,
  ScrollProgressIndicator
} from '../../animations';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [showMainContent, setShowMainContent] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  const roles = [
    "Senior Data Scientist",
    "Machine Learning Engineer", 
    "AI Solutions Architect",
    "Creative Problem Solver",
    "Data Science Instructor"
  ];

  const quickStats = [
    { number: "15+", label: "Projects", duration: 2000 },
    { number: "93%", label: "Model Accuracy", duration: 2500 },
    { number: "3", label: "Domains", duration: 1800 },
    { number: "2", label: "Publications", duration: 1500 }
  ];

  const codeSnippets = [
    "model.fit(X_train, y_train)",
    "predictions = model.predict(X_test)",
    "accuracy_score(y_test, predictions)",
    "from sklearn.ensemble import RandomForestClassifier"
  ];

  // Auto-trigger glitch effect periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 2000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Show main content after initial load
  useEffect(() => {
    const timer = setTimeout(() => setShowMainContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Navigation handlers
  const handleViewWork = () => {
    navigate('/projects');
  };

  const handleAIPlayground = () => {
    navigate('/ai-labs');
  };

  const handleContact = () => {
    navigate('/contact');
  };

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/about');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />

      {/* Dynamic Background with Morphing */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <MorphingBackground intensity="medium" />
      </div>

      {/* Advanced Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-30 ${
              i % 4 === 0 ? 'animate-float' : 
              i % 4 === 1 ? 'animate-float-delayed' : 
              i % 4 === 2 ? 'animate-float-slow' : 'animate-pulse-slow'
            }`}
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981'][i % 4],
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Scan Lines Effect (Cyberpunk Style) */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-scan-lines"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            
            {/* Greeting with Advanced Typewriter */}
            <div className="mb-6">
              <AdvancedTypewriter
                texts={["Hello, I'm"]}
                typingSpeed={80}
                showCursor={false}
                loop={false}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium"
              />
            </div>

            {/* Name with Glitch Effect */}
            <div className="mb-8">
              <CyberpunkGlitch
                text="Ankit Anand"
                trigger="auto"
                className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              />
            </div>

            {/* Role Typewriter with Advanced Effects */}
            <div className="mb-8 h-20 flex items-center justify-center lg:justify-start">
              <RoleTypewriter
                roles={roles}
                className="text-2xl md:text-3xl lg:text-4xl"
              />
            </div>

            {/* Description with Stagger Animation */}
            <div className="mb-8 space-y-4">
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                6+ years transforming data into actionable insights
              </p>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Currently @ <GlitchText text="Bosch Global Software Technologies" isActive={glitchActive} />
              </p>
            </div>

            {/* Interactive CTA Buttons with Particle Effects */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              
              <ParticleButton explosionType="cyber">
                <MagneticButton
                  variant="primary"
                  size="lg"
                  onClick={handleViewWork}
                  magnetStrength={0.6}
                  className="group"
                >
                  <Play size={18} className="mr-2 group-hover:animate-spin" />
                  <span>View My Work</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
                </MagneticButton>
              </ParticleButton>

              <ParticleButton explosionType="confetti">
                <MagneticButton
                  variant="outline"
                  size="lg"
                  onClick={handleAIPlayground}
                  magnetStrength={0.4}
                  className="group"
                >
                  <Brain size={18} className="mr-2 group-hover:animate-pulse" />
                  <span>AI Playground</span>
                </MagneticButton>
              </ParticleButton>

              <ParticleButton explosionType="success">
                <MagneticButton
                  variant="secondary"
                  size="lg"
                  onClick={handleContact}
                  magnetStrength={0.3}
                  className="group"
                >
                  <span>Let's Connect</span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                </MagneticButton>
              </ParticleButton>

            </div>

            {/* Animated Stats with Enhanced Effects */}
            <div className="mb-8">
              <AnimatedStats
                stats={quickStats}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center lg:text-left"
                layout="grid"
              />
            </div>

            {/* Code Snippet Typewriter */}
            <div className="mb-8 p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="flex items-center mb-2">
                <Code size={16} className="text-green-400 mr-2" />
                <span className="text-green-400 text-sm font-mono">~/ankit-portfolio</span>
              </div>
              <div className="font-mono text-sm">
                <span className="text-blue-400">$ </span>
                <AdvancedTypewriter
                  texts={codeSnippets}
                  typingSpeed={60}
                  deletingSpeed={30}
                  pauseTime={2000}
                  className="text-green-400"
                  scrambleEffect={true}
                />
              </div>
            </div>

            {/* Contact Info and Social Links */}
            <div className="space-y-4">
              <ContactInfo className="justify-center lg:justify-start pt-4" />
              <SocialLinks className="justify-center lg:justify-start pt-4" />
            </div>

            {/* Resume Download with Particle Effect */}
            <div className="pt-6">
              <ParticleButton explosionType="sparkle">
                <MagneticButton
                  variant="secondary"
                  size="lg"
                  magnetStrength={0.3}
                  className="group bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-lg hover:shadow-xl"
                >
                  <Download size={16} className="mr-2 group-hover:animate-bounce" />
                  <span>Download Resume</span>
                </MagneticButton>
              </ParticleButton>
            </div>

          </div>

          {/* Right Column - Enhanced Profile Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <FloatingProfilePhoto
                src="/images/profile.jpg"
                alt="Ankit Anand - Senior Data Scientist"
                size="xl"
                className="transform hover:scale-105 transition-transform duration-500"
              />
              
              {/* Additional Floating Elements */}
              <div className="absolute -top-4 -right-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse opacity-75"></div>
              </div>
              
              <div className="absolute -bottom-6 -left-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full animate-float opacity-60"></div>
              </div>

              {/* Particle Explosion Trigger on Hover */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <ConfettiExplosion trigger={false} />
              </div>
            </div>
          </div>
          
        </div>

        {/* Enhanced Scroll Indicator with Multiple Animations */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          
          {/* Animated Portfolio Preview Icons */}
          <div className="flex justify-center space-x-8 mb-6">
            {/* Floating Tech Icons */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center animate-float opacity-70 hover:opacity-100 transition-opacity duration-300">
                <Brain size={20} className="text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            </div>

            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center animate-float-delayed opacity-70 hover:opacity-100 transition-opacity duration-300">
                <Code size={20} className="text-white animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            </div>

            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center animate-float-slow opacity-70 hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-white animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            </div>
          </div>

          {/* Glowing Connection Lines */}
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
            <div className="mx-4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>

          {/* Main Scroll Button with Enhanced Effects */}
          <ParticleButton explosionType="cyber">
            <MagneticButton
              variant="ghost"
              onClick={handleScrollDown}
              magnetStrength={0.3}
              className="relative group flex flex-col items-center space-y-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
            >
              {/* Pulsing Ring Around Button */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-0 group-hover:opacity-100 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border border-purple-400 opacity-0 group-hover:opacity-75 animate-pulse"></div>
              
              {/* Text with Typewriter Effect */}
              <span className="text-sm font-medium group-hover:animate-pulse relative z-10">
                <GlitchText 
                  text="Explore Portfolio" 
                  trigger="hover"
                  className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400"
                />
              </span>
              
              {/* Animated Arrow with Multiple Effects */}
              <div className="relative z-10">
                <ChevronDown size={24} className="animate-bounce group-hover:animate-ping transition-all duration-300" />
                
                {/* Trail Effect */}
                <ChevronDown size={24} className="absolute inset-0 animate-bounce opacity-30 group-hover:opacity-60" style={{animationDelay: '0.1s'}} />
                <ChevronDown size={24} className="absolute inset-0 animate-bounce opacity-20 group-hover:opacity-40" style={{animationDelay: '0.2s'}} />
              </div>

              {/* Floating Particles Around Button */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 30}px`,
                      top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 30}px`,
                      animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </MagneticButton>
          </ParticleButton>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  opacity: i === 0 ? 1 : 0.5
                }}
              />
            ))}
          </div>

        </div>

        {/* Invisible Particle Effects for Ambiance */}
        <div className="absolute inset-0 pointer-events-none">
          <CyberExplosion trigger={false} />
          <ParticleExplosion trigger={false} />
        </div>

      </div>
    </section>
  );
};

export default Hero;