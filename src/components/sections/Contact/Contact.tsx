import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Send, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { FadeInUp, FadeInLeft, FadeInRight } from '../../animations';

interface ContactFormData {
  name: string;
  email: string;
  inquiryType: 'job' | 'collaboration' | 'consulting' | 'general' | 'other';
  message: string;
}

const inquiryTypes = [
  { value: 'job', label: 'Job Opportunity' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'other', label: 'Other' },
];

const contactMethods = [
  {
    icon: <Mail className="w-5 h-5" strokeWidth={1.5} />,
    label: 'Email',
    value: 'ankitanand.2910@gmail.com',
    href: 'mailto:ankitanand.2910@gmail.com',
  },
  {
    icon: <Phone className="w-5 h-5" strokeWidth={1.5} />,
    label: 'Phone',
    value: '+91 8249089552',
    href: 'tel:+918249089552',
  },
  {
    icon: <Linkedin className="w-5 h-5" strokeWidth={1.5} />,
    label: 'LinkedIn',
    value: 'ankitanand29',
    href: 'https://linkedin.com/in/ankitanand29',
  },
  {
    icon: <Github className="w-5 h-5" strokeWidth={1.5} />,
    label: 'GitHub',
    value: 'ankitanand29',
    href: 'https://github.com/ankitanand29',
  },
];

interface ContactSectionProps {
  className?: string;
}

export const Contact: React.FC<ContactSectionProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'form'>('info');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    inquiryType: 'general',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.message.trim() || formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', inquiryType: 'general', message: '' });
    }, 5000);
  };

  const inputBase = 'w-full px-0 py-3 bg-transparent border-0 border-b border-white/10 text-[#F5F5F7] font-manrope text-sm placeholder-[#A1A1AA]/40 focus:outline-none focus:border-[#D4AF37]/60 transition-colors duration-300';

  return (
    <section
      ref={undefined}
      id="contact"
      data-testid="contact-section"
      className={`relative min-h-screen py-24 bg-[#050505] ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <FadeInUp>
          <div className="mb-16">
            <p className="font-manrope text-xs text-[#D4AF37] tracking-widest uppercase mb-4">Contact</p>
            <h1 className="font-playfair text-5xl md:text-6xl font-medium text-[#F5F5F7] mb-6">
              Let's Connect
            </h1>
            <p className="font-manrope text-[#A1A1AA] text-lg leading-relaxed max-w-2xl">
              Whether it's consulting, collaboration, or full-time opportunities—I'm always excited to
              work on challenging problems.
            </p>
          </div>
        </FadeInUp>

        {/* Tab Navigation */}
        <FadeInUp delay={100}>
          <div className="flex space-x-1 mb-12 p-1 rounded-xl bg-[#0F0F0F] border border-white/5 w-fit">
            <button
              data-testid="contact-tab-info"
              onClick={() => setActiveTab('info')}
              className={`px-6 py-2.5 rounded-lg text-sm font-manrope font-medium transition-all duration-300 ${
                activeTab === 'info' ? 'bg-[#D4AF37] text-[#050505]' : 'text-[#A1A1AA] hover:text-[#F5F5F7]'
              }`}
            >
              Contact Information
            </button>
            <button
              data-testid="contact-tab-form"
              onClick={() => setActiveTab('form')}
              className={`px-6 py-2.5 rounded-lg text-sm font-manrope font-medium transition-all duration-300 ${
                activeTab === 'form' ? 'bg-[#D4AF37] text-[#050505]' : 'text-[#A1A1AA] hover:text-[#F5F5F7]'
              }`}
            >
              Send a Message
            </button>
          </div>
        </FadeInUp>

        {/* ── Contact Info Tab ── */}
        {activeTab === 'info' && (
          <div className="grid lg:grid-cols-2 gap-12">
            <FadeInLeft>
              <div className="space-y-4">
                {contactMethods.map((method, i) => (
                  <a
                    key={i}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    data-testid={`contact-method-${i}`}
                    className="group flex items-center space-x-5 p-6 rounded-2xl border border-white/5 hover:border-[#D4AF37]/20 bg-[#0F0F0F] transition-all duration-300"
                  >
                    <div className="p-3 rounded-xl bg-[#1A1A1A] text-[#D4AF37] group-hover:scale-110 transition-transform duration-300 shrink-0">
                      {method.icon}
                    </div>
                    <div>
                      <div className="font-manrope text-xs text-[#A1A1AA] tracking-widest uppercase mb-1">{method.label}</div>
                      <div className="font-manrope text-[#F5F5F7] group-hover:text-[#D4AF37] transition-colors duration-300">{method.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </FadeInLeft>

            <FadeInRight>
              <div className="space-y-6">
                {/* Location */}
                <div className="p-8 rounded-2xl border border-white/5 bg-[#0F0F0F]">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
                    <h3 className="font-manrope font-semibold text-[#F5F5F7]">Location</h3>
                  </div>
                  <p className="font-manrope text-[#A1A1AA] leading-relaxed">
                    Coimbatore, Tamil Nadu, India<br />
                    <span className="text-sm">Open to remote opportunities worldwide</span>
                  </p>
                </div>

                {/* Response Time */}
                <div className="p-8 rounded-2xl border border-white/5 bg-[#0F0F0F]">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
                    <h3 className="font-manrope font-semibold text-[#F5F5F7]">Response Time</h3>
                  </div>
                  <p className="font-manrope text-[#A1A1AA]">
                    I typically respond within{' '}
                    <span className="text-[#D4AF37] font-medium">24 hours</span>
                  </p>
                  <p className="font-manrope text-sm text-[#A1A1AA]/60 mt-2">
                    High response rate · Professional communication
                  </p>
                </div>

                {/* CTA to form */}
                <button
                  data-testid="goto-form-btn"
                  onClick={() => setActiveTab('form')}
                  className="w-full py-4 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37] font-manrope font-medium text-sm hover:bg-[#D4AF37]/10 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
                  <span>Send me a message</span>
                </button>
              </div>
            </FadeInRight>
          </div>
        )}

        {/* ── Contact Form Tab ── */}
        {activeTab === 'form' && (
          <div className="max-w-2xl">
            {isSubmitted ? (
              <FadeInUp>
                <div
                  data-testid="contact-success"
                  className="p-12 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-6" strokeWidth={1.5} />
                  <h3 className="font-playfair text-2xl font-medium text-[#F5F5F7] mb-3">Message Sent!</h3>
                  <p className="font-manrope text-[#A1A1AA]">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                </div>
              </FadeInUp>
            ) : (
              <FadeInUp>
                <form
                  onSubmit={handleSubmit}
                  data-testid="contact-form"
                  className="p-8 rounded-2xl border border-white/5 bg-[#0F0F0F] space-y-8"
                >
                  {/* Inquiry Type */}
                  <div>
                    <label className="block font-manrope text-xs text-[#A1A1AA] tracking-widest uppercase mb-4">
                      Inquiry Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {inquiryTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          data-testid={`inquiry-${type.value}`}
                          onClick={() => setFormData(d => ({ ...d, inquiryType: type.value as any }))}
                          className={`px-4 py-2 rounded-full border text-sm font-manrope transition-all duration-200 ${
                            formData.inquiryType === type.value
                              ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                              : 'border-white/8 text-[#A1A1AA] hover:border-[#D4AF37]/30 hover:text-[#D4AF37]'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block font-manrope text-xs text-[#A1A1AA] tracking-widest uppercase mb-2">Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                      data-testid="contact-name"
                      className={inputBase}
                    />
                    {errors.name && <p className="mt-2 font-manrope text-xs text-red-400">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-manrope text-xs text-[#A1A1AA] tracking-widest uppercase mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                      data-testid="contact-email"
                      className={inputBase}
                    />
                    {errors.email && <p className="mt-2 font-manrope text-xs text-red-400">{errors.email}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-manrope text-xs text-[#A1A1AA] tracking-widest uppercase mb-2">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project or opportunity..."
                      value={formData.message}
                      onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                      data-testid="contact-message"
                      className={`${inputBase} resize-none`}
                    />
                    {errors.message && <p className="mt-2 font-manrope text-xs text-red-400">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-testid="contact-submit"
                    className="w-full py-4 bg-[#D4AF37] text-[#050505] font-manrope font-semibold text-sm tracking-wide rounded-full transition-all duration-300 hover:bg-[#F0D060] hover:shadow-[0_0_24px_rgba(212,175,55,0.3)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#050505]/30 border-t-[#050505] rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" strokeWidth={2} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </FadeInUp>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
