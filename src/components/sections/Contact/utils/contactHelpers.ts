export const formatPhoneNumber = (phone: string): string => {
  return phone.replace('+91', '+91 ').replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
};

export const getResponseTime = (inquiryType: string): string => {
  const responseTimes: Record<string, string> = {
    job: '12-24 hours',
    collaboration: '24-48 hours',
    consulting: '4-12 hours',
    general: '24-72 hours',
    other: '24-48 hours'
  };
  return responseTimes[inquiryType] || '24-48 hours';
};

export const getInquiryTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    job: 'Job Opportunity',
    collaboration: 'Collaboration',
    consulting: 'Consulting',
    general: 'General Inquiry',
    other: 'Other'
  };
  return labels[type] || 'General Inquiry';
};

export const generateEmailSubject = (inquiryType: string, name: string): string => {
  const subjects: Record<string, string> = {
    job: `Job Opportunity Inquiry - ${name}`,
    collaboration: `Collaboration Proposal - ${name}`,
    consulting: `Consulting Request - ${name}`,
    general: `General Inquiry - ${name}`,
    other: `Contact Form Submission - ${name}`
  };
  return subjects[inquiryType] || `Contact Form Submission - ${name}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};