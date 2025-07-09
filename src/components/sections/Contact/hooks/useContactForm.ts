// src/components/sections/Contact/hooks/useContactForm.ts
import { useState, useCallback, useEffect } from 'react';
import emailjs from '@emailjs/browser';

interface ContactFormData {
  name: string;
  email: string;
  inquiryType: 'job' | 'collaboration' | 'consulting' | 'general' | 'other';
  message: string;
  preferredContact: 'email'; // Only email now (removed phone/linkedin)
}

interface FormState {
  isValid: boolean;
  isDirty: boolean;
  errors: Record<string, string>;
}

// EmailJS Configuration - Replace with your actual values
const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID || '',
  TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '',
  PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || ''
};

export const useContactForm = () => {
  const [formState, setFormState] = useState<FormState>({
    isValid: false,
    isDirty: false,
    errors: {}
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS on hook mount
  useEffect(() => {
    console.log('🚀 Initializing EmailJS in hook...');
    console.log('📧 Config:', {
      SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
      TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
      PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY ? 'Set' : 'Missing'
    });

    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      console.log('✅ EmailJS initialized successfully');
    } catch (error) {
      console.error('❌ EmailJS initialization failed:', error);
    }
  }, []);

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
    console.log('🎯 useContactForm handleFormSubmit called!');
    console.log('📋 Form data received:', data);
    
    setIsSubmitting(true);
    
    try {
      const errors = validateForm(data);
      
      if (Object.keys(errors).length > 0) {
        console.log('❌ Validation failed:', errors);
        setFormState(prev => ({
          ...prev,
          errors,
          isValid: false
        }));
        return;
      }

      console.log('✅ Validation passed, sending email...');

      // Check EmailJS configuration
      if (EMAILJS_CONFIG.SERVICE_ID.includes('your_') || 
          EMAILJS_CONFIG.TEMPLATE_ID.includes('your_') || 
          EMAILJS_CONFIG.PUBLIC_KEY.includes('your_')) {
        console.warn('⚠️ EmailJS not properly configured - using simulation');
        
        // Simulate email sending for development
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('✅ Email simulation completed');
      } else {
        // Prepare email template parameters
        const templateParams = {
          from_name: data.name,
          from_email: data.email,
          inquiry_type: data.inquiryType,
          message: data.message,
          preferred_contact: data.preferredContact,
          to_name: 'Ankit',
          reply_to: data.email,
          sent_at: new Date().toLocaleString()
        };

        console.log('📤 Sending email with params:', templateParams);

        // Send email using EmailJS
        const result = await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams
        );

        console.log('✅ Email sent successfully:', result);
        console.log('📊 Status:', result.status, 'Text:', result.text);
      }
      
      setFormState({
        isValid: true,
        isDirty: false,
        errors: {}
      });
      
    } catch (error) {
      console.error('❌ Form submission error:', error);
      
      let errorMessage = 'Failed to send message. Please try again.';
      
      // Handle specific EmailJS errors with proper type checking
      if (error && typeof error === 'object') {
        const emailError = error as { status?: number; message?: string; text?: string };
        
        if (emailError.status === 400) {
          errorMessage = 'Invalid email configuration. Please check your settings.';
        } else if (emailError.status === 401) {
          errorMessage = 'Email service authentication failed.';
        } else if (emailError.status === 403) {
          errorMessage = 'Email service access denied.';
        } else if (emailError.status === 404) {
          errorMessage = 'Email service or template not found.';
        } else if (emailError.message) {
          errorMessage = `Email error: ${emailError.message}`;
        } else if (emailError.text) {
          errorMessage = `Email error: ${emailError.text}`;
        }
      } else if (typeof error === 'string') {
        errorMessage = `Email error: ${error}`;
      }
      
      setFormState(prev => ({
        ...prev,
        errors: { submit: errorMessage }
      }));
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm]);

  // Test function for debugging
  const testEmailJS = useCallback(async () => {
    console.log('🧪 Testing EmailJS configuration...');
    
    try {
      const testParams = {
        from_name: 'Test User',
        from_email: 'test@example.com',
        inquiry_type: 'test',
        message: 'This is a test message from the contact form hook.',
        preferred_contact: 'email',
        to_name: 'Ankit',
        reply_to: 'test@example.com',
        sent_at: new Date().toLocaleString()
      };

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        testParams
      );

      console.log('✅ EmailJS test successful:', result);
      return { success: true, result };
    } catch (error) {
      console.error('❌ EmailJS test failed:', error);
      return { 
        success: false, 
        error: error && typeof error === 'object' && 'message' in error 
          ? (error as { message: string }).message 
          : 'Unknown error occurred'
      };
    }
  }, []);

  return {
    formState,
    handleFormSubmit,
    isSubmitting,
    validationErrors: formState.errors,
    testEmailJS // Export test function for debugging
  };
};