import React, { useState, useEffect } from 'react';
import { Download, Github, Linkedin, Mail, Phone, MapPin, ChevronDown, ExternalLink, ArrowRight } from 'lucide-react';
import { ContactInfo, CTAButtons, ProfilePhoto, QuickStats, RotatingText, SocialLinks } from './components';

const Hero: React.FC = () => {
  const roles = [
    "Senior Data Scientist",
    "Machine Learning Engineer", 
    "AI Solutions Architect",
    "Creative Problem Solver"
  ];

  const quickStats = [
    { number: "15+", label: "Projects" },
    { number: "93%", label: "Model Accuracy" },
    { number: "3", label: "Domains" },
    { number: "2", label: "Publications" }
  ];

  const handleViewWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAIPlayground = () => {
    document.getElementById('ai-labs')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>
      
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
          ></div>
        ))}
      </div>

      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-30 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-30 animate-float-delayed"></div>
      <div className="absolute top-1/2 left-20 w-12 h-12 bg-pink-200 dark:bg-pink-800 rounded-full opacity-30 animate-float-slow"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-12 lg:space-y-0 lg:space-x-16">
          
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            <ProfilePhoto />
          </div>

          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left max-w-3xl">
            <div className="space-y-6">
              
              {/* Main heading */}
              <div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
                  Hello, I'm{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Ankit Anand
                  </span>
                </h1>
                
                {/* Rotating roles */}
                <RotatingText 
                  roles={roles} 
                  className="justify-center lg:justify-start"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300">
                  6+ years transforming data into actionable insights
                </p>
                
                <p className="text-base md:text-lg text-gray-500 dark:text-gray-400">
                  Currently @ <span className="font-semibold text-blue-600 dark:text-blue-400">Bosch Global Software Technologies</span>
                </p>
              </div>

              {/* CTA Buttons */}
              <CTAButtons
                onViewWork={handleViewWork}
                onAIPlayground={handleAIPlayground}
                onContact={handleContact}
                className="justify-center lg:justify-start pt-4"
              />

              {/* Quick Stats */}
              <QuickStats 
                stats={quickStats}
                className="flex justify-center lg:justify-start"
              />

              {/* Contact Info */}
              <ContactInfo className="justify-center lg:justify-start pt-4" />

              {/* Social Links */}
              <SocialLinks className="justify-center lg:justify-start pt-4" />

              {/* Resume Download */}
              <div className="pt-4">
                <button className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium">
                  <Download size={16} />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
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