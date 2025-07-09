import React, { useEffect, useState } from 'react';
import { Mail, MessageSquare, Send, ArrowDown, Sparkles, Zap } from 'lucide-react';
import styles from '../Contact.module.css';

interface ContactHeroProps {
  isVisible: boolean;
  onScrollToForm: () => void;
  animationState?: string;
  className?: string;
}

export const ContactHero: React.FC<ContactHeroProps> = ({
  isVisible,
  onScrollToForm,
  animationState,
  className = ''
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Rotating words for typewriter effect
  const rotatingWords = [
    'collaborate',
    'build amazing projects',
    'solve complex problems',
    'create something extraordinary',
    'discuss opportunities'
  ];

  // Typewriter animation effect
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => 
        (prevIndex + 1) % rotatingWords.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, rotatingWords.length]);

  return (
    <div className={`text-center ${className}`}>
      {/* Animated Icons */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          {/* Main Contact Icon */}
          <div className={`relative w-24 h-24 mx-auto ${styles.floatMedium}`}>
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Mail className="w-12 h-12 text-white" />
            </div>
            
            {/* Orbiting Icons */}
            <div className="absolute -top-4 -right-4">
              <div className={`w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg ${styles.floatFast}`}>
                <Send className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4">
              <div className={`w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg ${styles.floatSlow}`}>
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Sparkle Effects */}
            <div className="absolute -top-2 left-2">
              <Sparkles className={`w-4 h-4 text-yellow-400 ${styles.floatFast}`} />
            </div>
            
            <div className="absolute -bottom-2 right-2">
              <Zap className={`w-4 h-4 text-yellow-400 ${styles.floatMedium}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Title with Animation */}
      <h1 className={`${styles.contactHeroTitle} text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6`}>
        Let's{' '}
        <span className="relative">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {rotatingWords[currentWordIndex]}
          </span>
          {/* Typewriter cursor */}
          <span className={`inline-block w-1 h-12 md:h-16 bg-blue-600 ml-1 ${isTyping ? 'animate-pulse' : ''}`} />
        </span>
      </h1>

      {/* Subtitle */}
      <p className={`${styles.contactHeroSubtitle} text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed`}>
        Ready to transform ideas into reality? Whether it's cutting-edge ML solutions, 
        data-driven insights, or creative collaborations—I'm here to help bring your vision to life.
      </p>

      {/* Contact Stats */}
      <div className={`${styles.fadeInUp} ${isVisible ? styles.animated : ''} grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto`}
           style={{ animationDelay: '0.6s' }}>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            24h
          </div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">
            Response Time
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            100+
          </div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">
            Projects Delivered
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            99%
          </div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">
            Client Satisfaction
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className={`${styles.fadeInUp} ${isVisible ? styles.animated : ''} flex flex-col sm:flex-row gap-4 justify-center items-center mb-12`}
           style={{ animationDelay: '0.8s' }}>
        <button 
          onClick={onScrollToForm}
          className={`${styles.primaryButton} ${styles.buttonHover} group`}
        >
          <Send className="w-5 h-5 mr-2 group-hover:animate-pulse" />
          Start a Conversation
        </button>
        
        <a 
          href="mailto:ankitanand.2910@gmail.com"
          className={`${styles.secondaryButton} ${styles.buttonHover} group`}
        >
          <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Quick Email
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className={`${styles.fadeInUp} ${isVisible ? styles.animated : ''}`}
           style={{ animationDelay: '1.0s' }}>
        <button 
          onClick={onScrollToForm}
          className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
        >
          <span className="text-sm mb-2 font-medium">Scroll to connect</span>
          <ArrowDown className="w-6 h-6 animate-bounce group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Floating Action Hint */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 hidden lg:block">
        <div className={`${styles.fadeInLeft} ${isVisible ? styles.animated : ''} bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg max-w-xs`}
             style={{ animationDelay: '1.2s' }}>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Available for new opportunities
            </span>
          </div>
        </div>
      </div>

      {/* Contact Preference Hint */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 hidden lg:block">
        <div className={`${styles.fadeInRight} ${isVisible ? styles.animated : ''} bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg max-w-xs`}
             style={{ animationDelay: '1.4s' }}>
          <div className="flex items-center">
            <MessageSquare className="w-4 h-4 text-blue-500 mr-3" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Prefer detailed project discussions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;