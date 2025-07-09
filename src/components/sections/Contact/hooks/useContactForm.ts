import { useState, useCallback } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  inquiryType: 'job' | 'collaboration' | 'consulting' | 'general' | 'other';
  message: string;
  preferredContact: 'email' | 'phone' | 'linkedin';
}

interface FormState {
  isValid: boolean;
  isDirty: boolean;
  errors: Record<string, string>;
}

export const useContactForm = () => {
  const [formState, setFormState] = useState<FormState>({
    isValid: false,
    isDirty: false,
    errors: {}
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback((data: ContactFormData): Record<string, string> => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!data.message.trim()) {
      errors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    } else if (data.message.trim().length > 500) {
      errors.message = 'Message must be less than 500 characters';
    }

    return errors;
  }, []);

  const handleFormSubmit = useCallback(async (data: ContactFormData): Promise<void> => {
    setIsSubmitting(true);
    
    try {
      const errors = validateForm(data);
      
      if (Object.keys(errors).length > 0) {
        setFormState(prev => ({
          ...prev,
          errors,
          isValid: false
        }));
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an actual API call
      console.log('Form submitted:', data);
      
      setFormState({
        isValid: true,
        isDirty: false,
        errors: {}
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      setFormState(prev => ({
        ...prev,
        errors: { submit: 'Failed to send message. Please try again.' }
      }));
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm]);

  return {
    formState,
    handleFormSubmit,
    isSubmitting,
    validationErrors: formState.errors
  };
};
