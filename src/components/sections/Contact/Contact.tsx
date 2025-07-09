import React, { useState, useEffect, useRef } from 'react';
import {
  Mail, Info, Send, Star, Clock
} from 'lucide-react';
import styles from './Contact.module.css';

// Sub-components
import { ContactHero } from './components/ContactHero';
import { SmartContactForm } from './components/SmartContactForm';
import { ContactSuccess } from './components/ContactSuccess';
import { ContactInfo } from './components/ContactInfo';
import { MagneticButton } from '../../animations/MagneticButton';
import { FadeInUp } from '../../animations';

// Hooks
import { useContactForm } from './hooks/useContactForm';
import { useContactAnimation } from './hooks/useContactAnimation';

// Types
export interface ContactFormData {
  name: string;
  email: string;
  inquiryType: 'job' | 'collaboration' | 'consulting' | 'general' | 'other';
  message: string;
  preferredContact: 'email';
}

type TabType = 'info' | 'form';

interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabConfig[] = [
  {
    id: 'info',
    label: 'Contact Information',
    icon: <Info className="w-4 h-4" />
  },
  {
    id: 'form',
    label: 'Smart Contact Form',
    icon: <Mail className="w-4 h-4" />
  }
];

interface ContactSectionProps {
  className?: string;
}

export const Contact: React.FC<ContactSectionProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Form logic
  const {
    formState,
    handleFormSubmit,
    isSubmitting,
    validationErrors
  } = useContactForm();

  // Animation logic
  const {
    animationStates,
    triggerAnimation,
    resetAnimations
  } = useContactAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          triggerAnimation('hero');
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [triggerAnimation]);

  const handleScrollToForm = () => {
    setActiveTab('form');
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
      triggerAnimation('form');
    }, 100);
  };

  const handleFormSubmissionSuccess = (data: ContactFormData) => {
    setSubmittedData(data);
    setIsFormSubmitted(true);
    triggerAnimation('success');

    // Optional: Reset animations after success
    setTimeout(() => {
      setIsFormSubmitted(false);
      resetAnimations();
    }, 5000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative min-h-screen py-20 overflow-hidden ${className}`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full opacity-30 ${
                i % 3 === 0 ? styles.floatSlow :
                i % 3 === 1 ? styles.floatMedium :
                styles.floatFast
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 30 + 10}px`,
                height: `${Math.random() * 30 + 10}px`,
                background: i % 2 === 0
                  ? 'linear-gradient(45deg, #3B82F6, #8B5CF6)'
                  : 'linear-gradient(45deg, #10B981, #06B6D4)',
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <ContactHero
          isVisible={isVisible}
          onScrollToForm={handleScrollToForm}
          animationState={animationStates.hero}
        />

        {/* Tabs */}
        <FadeInUp delay={400}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map(tab => (
              <MagneticButton
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                magnetStrength={0.2}
                className="mx-1"
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </MagneticButton>
            ))}
          </div>
        </FadeInUp>

        {/* Tab Panels */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'info' && (
            <FadeInUp delay={600}>
              <ContactInfo
                isVisible={isVisible}
                animationState={animationStates.contactInfo}
                className="grid sm:grid-cols-2 gap-6 mt-8"
              />
            </FadeInUp>
          )}

          {activeTab === 'form' && (
            <div ref={formRef}>
              <FadeInUp delay={600}>
                {!isFormSubmitted ? (
                  <SmartContactForm
                    isVisible={isVisible}
                    animationState={animationStates.form}
                    onSubmissionSuccess={handleFormSubmissionSuccess}
                    formState={formState}
                    onFormSubmit={handleFormSubmit}
                    isSubmitting={isSubmitting}
                    validationErrors={validationErrors}
                    className="w-full"
                  />
                ) : (
                  <ContactSuccess
                    formData={submittedData}
                    animationState={animationStates.success}
                    onReset={() => setIsFormSubmitted(false)}
                  />
                )}
              </FadeInUp>
            </div>
          )}
        </div>

        {/* Extra UI: Response Time Card */}
        <div className={`mt-20 ${styles.fadeInUp} ${isVisible ? styles.animated : ''}`} style={{ animationDelay: '0.8s' }}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center max-w-md mx-auto">
            <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Expected Response Time
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              I typically respond within <span className="font-semibold text-blue-600 dark:text-blue-400">24 hours</span>
            </p>
            <div className="flex justify-center mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 mx-1" fill="currentColor" />
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              High response rate • Professional communication
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
