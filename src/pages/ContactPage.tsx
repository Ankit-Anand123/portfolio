import React from 'react';
import { Contact } from '../components/sections/Contact';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Main Contact Section */}
      <Contact className="pt-20" />
    </div>
  );
};