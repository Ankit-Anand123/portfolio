import React, { useState, useEffect, useRef } from 'react';

interface StatItem {
  number: string;
  label: string;
  duration?: number;
  suffix?: string;
  color?: string;
}

interface AnimatedStatsProps {
  stats: StatItem[];
  className?: string;
  layout?: 'horizontal' | 'grid';
}

export const AnimatedStats: React.FC<AnimatedStatsProps> = ({ 
  stats, 
  className = "",
  layout = 'grid'
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

  const layoutClasses = {
    horizontal: 'flex flex-wrap justify-center gap-8',
    grid: 'grid grid-cols-2 md:grid-cols-4 gap-6'
  };

  return (
    <div 
      ref={ref} 
      className={`${layoutClasses[layout]} ${className}`}
    >
      {stats.map((stat, index) => (
        <StatCard 
          key={index}
          stat={stat}
          isVisible={isVisible}
          delay={index * 200}
        />
      ))}
    </div>
  );
};

interface StatCardProps {
  stat: StatItem;
  isVisible: boolean;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, isVisible, delay }) => {
  return (
    <div 
      className={`text-center transform transition-all duration-700 ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`text-3xl md:text-4xl font-bold mb-2 ${
        stat.color || 'text-blue-600 dark:text-blue-400'
      }`}>
        <CountingNumber 
          target={parseInt(stat.number.replace(/\D/g, ''))} 
          duration={stat.duration || 2000}
          isVisible={isVisible}
          delay={delay}
        />
        {stat.number.includes('+') && '+'}
        {stat.number.includes('%') && '%'}
        {stat.suffix && stat.suffix}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide font-medium">
        {stat.label}
      </div>
      <div className={`mt-2 mx-auto h-0.5 bg-gradient-to-r from-transparent via-current to-transparent transition-all duration-1000 ${
        isVisible ? 'w-12 opacity-50' : 'w-0 opacity-0'
      }`} style={{ transitionDelay: `${delay + 300}ms` }} />
    </div>
  );
};

interface CountingNumberProps {
  target: number;
  duration: number;
  isVisible: boolean;
  delay: number;
}

const CountingNumber: React.FC<CountingNumberProps> = ({ 
  target, 
  duration, 
  isVisible, 
  delay 
}) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now() + delay;
    const increment = target / (duration / 16);

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }

      if (elapsed < duration) {
        const progress = elapsed / duration;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCurrent(Math.floor(target * easeOut));
        requestAnimationFrame(animate);
      } else {
        setCurrent(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, isVisible, delay]);

  return <span>{current}</span>;
};
