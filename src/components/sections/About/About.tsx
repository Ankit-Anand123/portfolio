import React from 'react';
import { SkillsRadar } from './components/SkillsRadar';
import { Bio } from './components/Bio';
import { CurrentFocus } from './components/CurrentFocus';
import styles from './About.module.css';
import { SectionReveal } from '../../animations';

export const About: React.FC = () => {
  return (
    <SectionReveal>
    <section id="about" className={styles.aboutSection}>
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Dedicated Data Scientist with 6+ years of experience building data-intensive applications
            and helping businesses solve complex problems through analytics and machine learning.
          </p>
        </div>
        

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Bio and Current Focus */}
          <div className="space-y-8">
            <Bio />
            <CurrentFocus />
          </div>

          {/* Right Column: Skills Radar */}
          <div className="lg:sticky lg:top-24">
            <SkillsRadar />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              6+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Years Experience
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              3
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Companies
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              10+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Technologies
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              1
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Publication
            </div>
          </div>
        </div>
      </div>
    </section>
    </SectionReveal>
  );
};