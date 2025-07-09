// src/components/sections/Contact/components/ContactSuccess.tsx
import React, { useEffect, useState } from 'react';
import { 
  CheckCircle, 
  Mail, 
  Clock, 
  ArrowRight, 
  Star, 
  Heart,
  MessageSquare,
  Calendar,
  RefreshCw
} from 'lucide-react';
import styles from '../Contact.module.css';

interface ContactFormData {
  name: string;
  email: string;
  inquiryType: 'job' | 'collaboration' | 'consulting' | 'general' | 'other';
  message: string;
  preferredContact: 'email' | 'phone' | 'linkedin';
}

interface ContactSuccessProps {
  formData: ContactFormData | null;
  animationState?: string;
  onReset: () => void;
}

export const ContactSuccess: React.FC<ContactSuccessProps> = ({
  formData,
  animationState,
  onReset
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(5);

  const steps = [
    { icon: CheckCircle, text: 'Message received', color: 'text-green-500' },
    { icon: Mail, text: 'Processing inquiry', color: 'text-blue-500' },
    { icon: MessageSquare, text: 'Preparing response', color: 'text-purple-500' },
    { icon: Clock, text: 'Ready to respond', color: 'text-orange-500' }
  ];

  const getResponseTimeByType = (type: string) => {
    const times = {
      job: '12-24 hours',
      collaboration: '24-48 hours',
      consulting: '4-12 hours',
      general: '24-72 hours',
      other: '24-48 hours'
    };
    return times[type as keyof typeof times] || '24-48 hours';
  };

  const getNextSteps = (type: string) => {
    const nextSteps = {
      job: [
        'Review your background and skills',
        'Check current project opportunities',
        'Prepare role-specific discussion points'
      ],
      collaboration: [
        'Analyze collaboration potential',
        'Review project requirements',
        'Prepare collaboration proposal'
      ],
      consulting: [
        'Assess consulting requirements',
        'Prepare initial consultation agenda',
        'Review relevant case studies'
      ],
      general: [
        'Review your message details',
        'Prepare comprehensive response',
        'Gather relevant resources'
      ],
      other: [
        'Analyze your specific requirements',
        'Research best approach',
        'Prepare customized response'
      ]
    };
    return nextSteps[type as keyof typeof nextSteps] || nextSteps.general;
  };

  // Confetti animation trigger
  useEffect(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  // Step animation
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 1000);

    return () => clearInterval(stepInterval);
  }, [steps.length]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!formData) return null;

  return (
    <div className={`${styles.contactCard} ${styles.successAnimation} text-center relative overflow-hidden`}>
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce opacity-75"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Success Header */}
      <div className="relative z-10 mb-8">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shadow-2xl">
          <CheckCircle className={`w-12 h-12 text-white ${styles.successCheckmark}`} />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Message Sent Successfully!
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
          Thank you, <span className="font-semibold text-blue-600 dark:text-blue-400">{formData.name}</span>!
        </p>
        
        <p className="text-gray-500 dark:text-gray-400">
          Your {formData.inquiryType} inquiry has been received and will be processed shortly.
        </p>
      </div>

      {/* Processing Steps Animation */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Processing Your Request
        </h3>
        
        <div className="space-y-3">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div
                key={index}
                className={`flex items-center justify-center transition-all duration-500 ${
                  isActive ? 'scale-110' : isCompleted ? 'opacity-75' : 'opacity-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all duration-500 ${
                  isActive 
                    ? 'bg-blue-500 shadow-lg scale-110' 
                    : isCompleted 
                      ? 'bg-green-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                }`}>
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                
                <span className={`font-medium transition-all duration-500 ${
                  isActive 
                    ? step.color + ' scale-105' 
                    : isCompleted 
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step.text}
                </span>
                
                {isActive && (
                  <div className="ml-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Message Summary */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8 text-left">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-blue-500" />
          Message Summary
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Inquiry Type:</span>
            <div className="font-medium text-gray-900 dark:text-white capitalize">
              {formData.inquiryType.replace('_', ' ')}
            </div>
          </div>
          
          <div>
            <span className="text-gray-500 dark:text-gray-400">Preferred Contact:</span>
            <div className="font-medium text-gray-900 dark:text-white capitalize">
              {formData.preferredContact}
            </div>
          </div>
          
          <div>
            <span className="text-gray-500 dark:text-gray-400">Your Email:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {formData.email}
            </div>
          </div>
          
          <div>
            <span className="text-gray-500 dark:text-gray-400">Message Length:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {formData.message.length} characters
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <span className="text-gray-500 dark:text-gray-400">Message Preview:</span>
          <div className="font-medium text-gray-900 dark:text-white mt-1 line-clamp-3">
            "{formData.message.substring(0, 150)}..."
          </div>
        </div>
      </div>

      {/* Response Timeline */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8 border border-blue-200 dark:border-blue-800">
        <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Expected Response Timeline
        </h4>
        
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {getResponseTimeByType(formData.inquiryType)}
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">
            Typical response time for {formData.inquiryType} inquiries
          </div>
        </div>

        <div className="space-y-2">
          <h5 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-3">
            What happens next:
          </h5>
          {getNextSteps(formData.inquiryType).map((step, index) => (
            <div key={index} className="flex items-center text-sm text-blue-700 dark:text-blue-300">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:ankitanand.2910@gmail.com"
            className={`${styles.primaryButton} ${styles.buttonHover}`}
          >
            <Mail className="w-5 h-5 mr-2" />
            Send Follow-up Email
          </a>
          
          <button 
            onClick={onReset}
            className={`${styles.secondaryButton} ${styles.buttonHover}`}
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Send Another Message
          </button>
        </div>

        <button 
          className={`${styles.tertiaryButton} ${styles.buttonHover} w-full`}
        >
          <Calendar className="w-5 h-5 mr-2" />
          Schedule a Meeting Instead
        </button>
      </div>

      {/* Social Media Follow */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Stay Connected
        </h4>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Follow my journey and get updates on new projects, insights, and opportunities.
        </p>
        
        <div className="flex justify-center space-x-4">
          <a 
            href="https://linkedin.com/in/ankitanand29"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            LinkedIn
          </a>
          
          <a 
            href="https://github.com/ankitanand29"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Auto-reset Timer */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300">
          <RefreshCw className="w-4 h-4 mr-2" />
          Auto-reset in {timeRemaining} seconds
        </div>
      </div>

      {/* Testimonial/Trust Signal */}
      <div className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-center justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
        
        <p className="text-sm text-center text-gray-700 dark:text-gray-300">
          "Ankit's response was incredibly detailed and professional. He followed up within hours 
          and provided exactly what we needed for our ML project."
        </p>
        
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
          - Recent client feedback
        </p>
      </div>

      {/* Fun Thank You Animation */}
      <div className="mt-6 flex justify-center">
        <div className="flex items-center space-x-2 text-pink-500">
          <Heart className="w-5 h-5 animate-pulse" />
          <span className="text-sm font-medium">Thank you for reaching out!</span>
          <Heart className="w-5 h-5 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ContactSuccess;