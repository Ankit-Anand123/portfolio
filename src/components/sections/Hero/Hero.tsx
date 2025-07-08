import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ChevronDown } from 'lucide-react';
import { ContactInfo, SocialLinks } from './components';
import { FastStaticNameLoopingRoles } from './components/FastLoopingRoles';
import { FloatingProfilePhoto, AnimatedStats, MagneticButton, ParticleButton } from '../../animations';
import { MorphingBackground } from '../../animations/MorphingBackground';

const Hero: React.FC = () => {
  const navigate = useNavigate();

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

  // Navigation handlers for React Router
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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>

      {/* Morphing Background */}
      <MorphingBackground intensity="light" />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left mb-12 lg:mb-0">
            <div className="mb-8">
              {/* Fast Static Name + Looping Roles */}
              <FastStaticNameLoopingRoles
                roles={roles}
                className="mb-8"
              />

              {/* Description */}
              <div className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 opacity-0 animate-fadeInUp"
                style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
                <p className="mb-2">
                  6+ years transforming data into actionable insights
                </p>
                <p>
                  Currently @ <span className="font-semibold text-blue-600 dark:text-blue-400">Bosch Global Software Technologies</span>
                </p>
              </div>

              {/* Enhanced CTA Buttons with Magnetic Effect */}
              <div className="opacity-0 animate-fadeInUp"
                style={{ animationDelay: '3s', animationFillMode: 'forwards' }}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <ParticleButton explosionType="cyber">
                    <MagneticButton
                      variant="primary"
                      size="lg"
                      onClick={handleViewWork}
                      className="shadow-lg hover:shadow-xl"
                    >
                      <span>View My Work</span>
                      <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </MagneticButton>
                  </ParticleButton>

                  <ParticleButton explosionType="cyber">
                    <MagneticButton
                      variant="outline"
                      size="lg"
                      onClick={handleAIPlayground}
                      magnetStrength={0.4}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span>AI Playground</span>
                    </MagneticButton>
                  </ParticleButton>

                  <ParticleButton explosionType="cyber">
                    <MagneticButton
                      variant="secondary"
                      size="lg"
                      onClick={handleContact}
                      magnetStrength={0.2}
                    >
                      <span>Let's Connect</span>
                    </MagneticButton>
                  </ParticleButton>
                </div>
              </div>

              {/* Animated Stats */}
              <div className="opacity-0 animate-fadeInUp"
                style={{ animationDelay: '3.5s', animationFillMode: 'forwards' }}>
                <AnimatedStats
                  stats={quickStats}
                  className="mt-8"
                  layout="grid"
                />
              </div>

              {/* Contact Info */}
              <div className="opacity-0 animate-fadeInUp"
                style={{ animationDelay: '4s', animationFillMode: 'forwards' }}>
                <ContactInfo className="justify-center lg:justify-start pt-4" />
              </div>

              {/* Social Links */}
              <div className="opacity-0 animate-fadeInUp"
                style={{ animationDelay: '4.2s', animationFillMode: 'forwards' }}>
                <SocialLinks className="justify-center lg:justify-start pt-4" />
              </div>

              {/* Resume Download */}
              <div className="pt-4 opacity-0 animate-fadeInUp"
                style={{ animationDelay: '4.5s', animationFillMode: 'forwards' }}>
                <button className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium">
                  <Download size={16} />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Floating Profile Photo */}
          <div className="flex justify-center lg:justify-end opacity-0 animate-fadeInRight"
            style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <FloatingProfilePhoto
              src="/images/profile.jpg"
              alt="Ankit Anand - Senior Data Scientist"
              size="xl"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fadeInUp"
          style={{ animationDelay: '5s', animationFillMode: 'forwards' }}>
          <button
            onClick={handleScrollDown}
            className="flex flex-col items-center space-y-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 animate-bounce"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ChevronDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;