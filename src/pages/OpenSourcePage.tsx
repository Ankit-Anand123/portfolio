import React from 'react';
import { OpenSource } from '../components/sections/OpenSource';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const OpenSourcePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <OpenSource />
      <div className="py-12 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">
            <Link
              to="/projects"
              className="flex items-center space-x-2 px-6 py-3 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] font-manrope text-sm transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              <span>Projects</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-[#D4AF37] text-[#050505] hover:bg-[#F0D060] font-manrope font-semibold text-sm transition-all duration-300"
            >
              <span>Contact</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
