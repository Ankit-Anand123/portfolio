import React, { useState, useEffect } from 'react';

interface QuickStatsProps {
  stats: Array<{ number: string; label: string; icon?: React.ComponentType<{ size?: number }> }>;
  className?: string;
}

export const QuickStats: React.FC<QuickStatsProps> = ({ stats, className = '' }) => {
  return (
    <div className={`pt-8 ${className}`}>
      <div className="inline-flex items-center space-x-6 md:space-x-8 px-6 py-4 rounded-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {stat.number}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};