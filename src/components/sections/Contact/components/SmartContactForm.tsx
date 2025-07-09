import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Send, 
  Bot, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Lightbulb,
  MessageSquare
} from 'lucide-react';
import styles from '../Contact.module.css';

// Types - Updated to only include email
interface ContactFormData {
  name: string;
  email: string;
  inquiryType: 'job' | 'collaboration' | 'consulting' | 'general' | 'other';
  message: string;
  preferredContact: 'email'; // Only email option now
}

interface FormSuggestion {
  text: string;
  type: 'template' | 'improvement' | 'addition';
}

interface SmartContactFormProps {
  onSubmissionSuccess: (data: ContactFormData) => void;
  validationErrors?: Record<string, string>;
  isVisible: boolean;
  animationState?: string;
  formState?: any;
  onFormSubmit?: (data: ContactFormData) => Promise<void>;
  isSubmitting?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const SmartContactForm: React.FC<SmartContactFormProps> = ({
  onSubmissionSuccess,
  validationErrors = {},
  isVisible,
  animationState,
  formState,
  onFormSubmit,
  isSubmitting: externalIsSubmitting,
  className = '',
  style
}) => {
  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    inquiryType: 'general',
    message: '',
    preferredContact: 'email' // Default and only option
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [internalErrors, setInternalErrors] = useState<Record<string, string>>({});
  const [activeField, setActiveField] = useState<string | null>(null);
  const [formProgress, setFormProgress] = useState(0);
  const [estimatedResponseTime, setEstimatedResponseTime] = useState('24-48 hours');
  const [suggestions, setSuggestions] = useState<FormSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Use external isSubmitting if provided, otherwise use internal state
  const actualIsSubmitting = externalIsSubmitting ?? isSubmitting;

  // Message templates for AI suggestions
  const inquiryTemplates: Record<string, string> = {
    job: "Hi Ankit! I'm reaching out regarding potential job opportunities. I'm particularly interested in [specific role/field] and believe my background in [your expertise] would be a great fit. I'd love to discuss how we can work together.",
    collaboration: "Hello Ankit! I have an exciting collaboration opportunity that aligns with your expertise in [specific area]. I think we could create something impactful together. Would you be interested in exploring this further?",
    consulting: "Hi Ankit! I'm looking for consulting expertise in [specific domain]. Based on your portfolio and experience, I believe you'd be the perfect fit for this project. Let's discuss the details and see how we can move forward.",
    general: "Hello Ankit! I've been following your work and I'm impressed by [specific project/skill]. I'd love to connect and learn more about your experience. Looking forward to hearing from you!",
    other: "Hi Ankit! I have a unique opportunity/question that I'd like to discuss with you. [Brief description of your inquiry]."
  };

  // Form validation function
  const validateForm = (data: ContactFormData): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!data.name.trim()) {
      errors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.message.trim()) {
      errors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    } else if (data.message.trim().length > 500) {
      errors.message = 'Message must be less than 500 characters';
    }

    return errors;
  };

  // Calculate form completion progress
  useEffect(() => {
    const filledFields = Object.values(formData).filter(value => value.trim() !== '').length;
    const totalFields = Object.keys(formData).length;
    setFormProgress((filledFields / totalFields) * 100);
  }, [formData]);

  // Update estimated response time based on inquiry type
  useEffect(() => {
    const responseTimes = {
      job: '12-24 hours',
      collaboration: '24-48 hours',
      consulting: '4-12 hours',
      general: '24-72 hours',
      other: '24-48 hours'
    };
    setEstimatedResponseTime(responseTimes[formData.inquiryType]);
  }, [formData.inquiryType]);

  // AI-powered message suggestions
  useEffect(() => {
    if (formData.inquiryType && formData.message.length < 50) {
      const template = inquiryTemplates[formData.inquiryType];
      setSuggestions([
        {
          text: template,
          type: 'template'
        }
      ]);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [formData.inquiryType, formData.message.length]);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear errors for this field
    if (internalErrors[field]) {
      setInternalErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSuggestionClick = (suggestion: FormSuggestion) => {
    if (suggestion.type === 'template') {
      setFormData(prev => ({
        ...prev,
        message: suggestion.text
      }));
    }
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🎯 SmartContactForm handleSubmit called');
    console.log('📋 Form data:', formData);
    
    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      console.log('❌ Form validation failed:', errors);
      setInternalErrors(errors);
      return;
    }

    console.log('✅ Form validation passed');

    // Use external form submit handler if provided
    if (onFormSubmit) {
      console.log('📤 Using external onFormSubmit handler');
      try {
        await onFormSubmit(formData);
        console.log('✅ External submit successful');
        onSubmissionSuccess(formData);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          inquiryType: 'general',
          message: '',
          preferredContact: 'email'
        });
      } catch (error) {
        console.error('❌ External submit failed:', error);
        setInternalErrors({ 
          submit: 'Failed to send message. Please try again.' 
        });
      }
      return;
    }

    // Fallback: This shouldn't happen with your current setup
    console.log('⚠️ No external submit handler provided');
    setInternalErrors({ 
      submit: 'Form submission handler not configured.' 
    });
  };

  const isFormValid = formData.name.trim() && 
                     formData.email.trim() && 
                     formData.message.trim().length >= 10 &&
                     Object.keys(internalErrors).length === 0;

  const allErrors = { ...internalErrors, ...validationErrors };

  return (
    <div className={`${className} ${styles.contactCard}`} style={style}>
      {/* Form Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Smart Contact Form
          </h3>
          <p className="text-gray-600 dark:text-gray-300 flex items-center">
            <Bot className="w-4 h-4 mr-2 text-blue-500" />
            AI-powered with smart suggestions
          </p>
        </div>
        
        {/* Progress Indicator */}
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Progress: {Math.round(formProgress)}%
          </div>
          <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${formProgress}%` }}
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Inquiry Type Selection */}
        <div className={`${styles.formField} ${styles.fadeInLeft} ${isVisible ? styles.animated : ''}`}
             style={{ animationDelay: '0.1s' }}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            What's this about? *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { value: 'job', label: 'Job Opportunity', icon: '💼' },
              { value: 'collaboration', label: 'Collaboration', icon: '🤝' },
              { value: 'consulting', label: 'Consulting', icon: '💡' },
              { value: 'general', label: 'General Inquiry', icon: '💬' },
              { value: 'other', label: 'Other', icon: '✨' }
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleInputChange('inquiryType', option.value as ContactFormData['inquiryType'])}
                className={`p-3 rounded-lg border-2 transition-all duration-300 text-left ${
                  formData.inquiryType === option.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                }`}
              >
                <div className="text-lg mb-1">{option.icon}</div>
                <div className="text-sm font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Name and Email Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className={`${styles.formField} ${styles.fadeInLeft} ${isVisible ? styles.animated : ''}`}
               style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onFocus={() => setActiveField('name')}
                onBlur={() => setActiveField(null)}
                className={`${styles.formInput} peer`}
                placeholder=" "
                required
              />
              <label htmlFor="name" className={styles.formLabel}>
                <User className="w-4 h-4 inline mr-2" />
                Your Name *
              </label>
              {allErrors.name && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {allErrors.name}
                </div>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className={`${styles.formField} ${styles.fadeInLeft} ${isVisible ? styles.animated : ''}`}
               style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField(null)}
                className={`${styles.formInput} peer`}
                placeholder=" "
                required
              />
              <label htmlFor="email" className={styles.formLabel}>
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address *
              </label>
              {allErrors.email && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {allErrors.email}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Method Info - Updated to show email only */}
        <div className={`${styles.formField} ${styles.fadeInLeft} ${isVisible ? styles.animated : ''}`}
             style={{ animationDelay: '0.4s' }}>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Contact Method: Email
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  All responses will be sent to your email address
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Field with AI Suggestions */}
        <div className={`${styles.formField} ${styles.fadeInLeft} ${isVisible ? styles.animated : ''}`}
             style={{ animationDelay: '0.5s' }}>
          <div className="relative">
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              onFocus={() => setActiveField('message')}
              onBlur={() => setActiveField(null)}
              className={`${styles.formInput} peer resize-none`}
              placeholder=" "
              rows={6}
              required
            />
            <label htmlFor="message" className={styles.formLabel}>
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Your Message * (Min. 10 characters)
            </label>
            
            {/* Character Counter */}
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {formData.message.length}/500
            </div>
            
            {allErrors.message && (
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {allErrors.message}
              </div>
            )}
          </div>

          {/* AI Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center mb-3">
                <Lightbulb className="w-4 h-4 text-blue-500 mr-2" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  AI Suggestions
                </span>
              </div>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200"
                  >
                    <div className="flex items-start">
                      <div className={`w-3 h-3 rounded-full mt-1 mr-3 ${
                        suggestion.type === 'template' ? 'bg-green-400' :
                        suggestion.type === 'improvement' ? 'bg-yellow-400' :
                        'bg-blue-400'
                      }`} />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white mb-1">
                          {suggestion.type === 'template' ? 'Use Template' :
                           suggestion.type === 'improvement' ? 'Improvement' :
                           'Addition'}
                        </div>
                        <div className="text-gray-600 dark:text-gray-300 text-sm">
                          {suggestion.text}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Response Time Indicator */}
        <div className={`${styles.fadeInLeft} ${isVisible ? styles.animated : ''} bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800`}
             style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
            <div>
              <div className="text-sm font-medium text-green-700 dark:text-green-300">
                Expected Response Time
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Based on inquiry type: <span className="font-semibold">{estimatedResponseTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className={`${styles.fadeInLeft} ${isVisible ? styles.animated : ''}`}
             style={{ animationDelay: '0.7s' }}>
          <button
            type="submit"
            disabled={!isFormValid || actualIsSubmitting}
            className={`w-full ${styles.primaryButton} ${
              isFormValid && !actualIsSubmitting ? styles.buttonHover : 'opacity-50 cursor-not-allowed'
            } ${actualIsSubmitting ? styles.buttonLoading : ''} relative`}
          >
            {actualIsSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending Message...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </div>
            )}
          </button>
          
          {/* Form Validation Status */}
          <div className="mt-3 text-center">
            {isFormValid ? (
              <div className="flex items-center justify-center text-green-600 dark:text-green-400 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Form is ready to submit
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                Please fill in all required fields (min. 10 characters for message)
              </div>
            )}
          </div>

          {/* Submit Error */}
          {allErrors.submit && (
            <div className="flex items-center justify-center mt-3 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              {allErrors.submit}
            </div>
          )}
        </div>

        {/* Privacy Notice */}
        <div className={`${styles.fadeInLeft} ${isVisible ? styles.animated : ''} text-center pt-4 border-t border-gray-200 dark:border-gray-700`}
             style={{ animationDelay: '0.8s' }}>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            🔒 Your information is secure and will only be used to respond to your inquiry. 
            I respect your privacy and never share personal data.
          </p>
        </div>
      </form>

      {/* AI Features Info */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center mb-2">
          <Bot className="w-5 h-5 text-blue-500 mr-2" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            AI-Powered Features
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
            Smart message templates
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
            Response time estimation
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
            Inquiry categorization
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartContactForm;