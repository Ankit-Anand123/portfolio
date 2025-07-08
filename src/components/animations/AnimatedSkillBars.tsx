import React, { useState, useEffect, useRef } from 'react';

interface SkillItem {
  name: string;
  percentage: number;
  color?: string;
}

interface AnimatedSkillBarsProps {
  skills: SkillItem[];
  className?: string;
}

export const AnimatedSkillBars: React.FC<AnimatedSkillBarsProps> = ({ 
  skills, 
  className = "" 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`space-y-6 ${className}`}>
      {skills.map((skill, index) => (
        <div key={skill.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {skill.name}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {skill.percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                skill.color || 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}
              style={{
                width: isVisible ? `${skill.percentage}%` : '0%',
                transitionDelay: `${index * 200}ms`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export {};