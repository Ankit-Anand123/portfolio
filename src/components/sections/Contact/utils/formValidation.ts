export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validateMessage = (message: string): boolean => {
  return message.trim().length >= 10 && message.trim().length <= 500;
};

export const getValidationErrors = (formData: {
  name: string;
  email: string;
  message: string;
}): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!validateName(formData.name)) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validateMessage(formData.message)) {
    errors.message = 'Message must be between 10 and 500 characters';
  }

  return errors;
};