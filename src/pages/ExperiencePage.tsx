import React from 'react';
import { Experience } from '../components/sections/Experience';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Experience />
      <div className="py-12 bg-[var(--color-surface)] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">
            <Link
              to="/about"
              className="flex items-center space-x-2 px-6 py-3 rounded-full border border-white/8 text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-white/16 font-manrope text-sm transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              <span>About</span>
            </Link>
            <Link
              to="/projects"
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-[#D4AF37] text-[#050505] hover:bg-[#F0D060] font-manrope font-semibold text-sm transition-all duration-300"
            >
              <span>Projects</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
