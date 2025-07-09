import React, { useState, useEffect, useRef } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Clock, Send, CheckCircle, Star } from 'lucide-react';
import styles from './Contact.module.css';

// Sub-components (will be created separately)
import { ContactHero } from './components/ContactHero';
import { ContactInfo } from './components/ContactInfo';
import { SmartContactForm } from './components/SmartContactForm';
import { ContactMethods } from './components/ContactMethods';
import { ContactSuccess } from './components/ContactSuccess';

// Hooks
import { useContactAnimation } from './hooks/useContactAnimation';
import { useContactForm } from './hooks/useContactForm';

// Types - Update to remove phone/linkedin
export interface ContactFormData {
  name: string;
  email: string;
  inquiryType: 'job' | 'collaboration' | 'consulting' | 'general' | 'other';
  message: string;
  preferredContact: 'email'; // Only email now
}

interface ContactSectionProps {
  className?: string;
}

export const Contact: React.FC<ContactSectionProps> = ({ className = '' }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  // Custom hooks for animations and form handling
  const { 
    animationStates, 
    triggerAnimation, 
    resetAnimations 
  } = useContactAnimation();
  
  const {
    formState,
    handleFormSubmit,
    isSubmitting,
    validationErrors,
    testEmailJS // Get test function from hook
  } = useContactForm();

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          triggerAnimation('hero');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [triggerAnimation]);

  // Scroll to form function
  const handleScrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
      triggerAnimation('form');
    }
  };

  // Handle form submission success
  const handleFormSubmissionSuccess = (data: ContactFormData) => {
    console.log('✅ Form submission success callback called:', data);
    setFormData(data);
    setIsFormSubmitted(true);
    triggerAnimation('success');
    
    // Reset success state after 5 seconds
    setTimeout(() => {
      setIsFormSubmitted(false);
      resetAnimations();
    }, 5000);
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className={`${styles.contactSection} ${className} relative min-h-screen overflow-hidden`}
    >
      {/* Dynamic Background with Morphing - Consistent with other sections */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className={styles.morphingBackground} />
      </div>

      {/* Animated Background Particles - Similar to Hero section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-20 ${
              i % 3 === 0 ? styles.floatSlow : 
              i % 3 === 1 ? styles.floatMedium : 
              styles.floatFast
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              background: i % 2 === 0 
                ? 'linear-gradient(45deg, #3B82F6, #8B5CF6)' 
                : 'linear-gradient(45deg, #10B981, #06B6D4)',
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Contact Hero Section */}
        <ContactHero 
          isVisible={isVisible}
          onScrollToForm={handleScrollToForm}
          animationState={animationStates.hero}
        />

        {/* Contact Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mt-20">
          {/* Contact Information - Left Column */}
          <div className={`lg:col-span-1 ${styles.contactInfoWrapper}`}>
            <ContactInfo 
              isVisible={isVisible}
              animationState={animationStates.contactInfo}
              className={`${styles.fadeInLeft} ${isVisible ? styles.animated : ''}`}
              style={{ animationDelay: '0.2s' }}
            />
            
            {/* Contact Methods */}
            <ContactMethods 
              isVisible={isVisible}
              animationState={animationStates.contactMethods}
              className={`${styles.fadeInLeft} ${isVisible ? styles.animated : ''} mt-8`}
              style={{ animationDelay: '0.4s' }}
            />
          </div>

          {/* Smart Contact Form - Right Column */}
          <div 
            ref={formRef}
            className={`lg:col-span-2 ${styles.contactFormWrapper}`}
          >
            {!isFormSubmitted ? (
              <SmartContactForm 
                isVisible={isVisible}
                animationState={animationStates.form}
                onSubmissionSuccess={handleFormSubmissionSuccess}
                formState={formState}
                onFormSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
                validationErrors={validationErrors}
                className={`${styles.fadeInRight} ${isVisible ? styles.animated : ''}`}
                style={{ animationDelay: '0.6s' }}
              />
            ) : (
              <ContactSuccess 
                formData={formData}
                animationState={animationStates.success}
                onReset={() => setIsFormSubmitted(false)}
              />
            )}
          </div>
        </div>

        {/* Additional Contact Features */}
        <div className={`mt-20 ${styles.additionalFeatures}`}>
          {/* Response Time Indicator */}
          <div className={`${styles.responseTimeCard} ${styles.fadeInUp} ${isVisible ? styles.animated : ''}`}
               style={{ animationDelay: '0.8s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
              <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Expected Response Time
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                I typically respond within <span className="font-semibold text-blue-600 dark:text-blue-400">24 hours</span>
              </p>
              <div className="flex justify-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className="w-5 h-5 text-yellow-400 mx-1"
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                High response rate • Professional communication
              </p>
            </div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className={`mt-20 text-center ${styles.ctaSection}`}>
          <div className={`${styles.fadeInUp} ${isVisible ? styles.animated : ''}`}
               style={{ animationDelay: '1.0s' }}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether it's a cutting-edge ML solution, data-driven insights, or creative collaboration, 
              I'm excited to bring your ideas to life.
            </p>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={handleScrollToForm}
                className={`${styles.primaryButton} ${styles.buttonHover}`}
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
              
              <a 
                href="mailto:ankitanand.2910@gmail.com"
                className={`${styles.secondaryButton} ${styles.buttonHover}`}
              >
                <Mail className="w-5 h-5 mr-2" />
                Direct Email
              </a>
              
              {/* Removed LinkedIn button as requested */}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className={styles.scrollProgress}>
        <div className={styles.progressBar} />
      </div>
    </section>
  );
};

export default Contact;