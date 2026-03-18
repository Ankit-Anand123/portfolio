import React from 'react';
import { Contact } from '../components/sections/Contact';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Contact className="pt-20" />
    </div>
  );
};
