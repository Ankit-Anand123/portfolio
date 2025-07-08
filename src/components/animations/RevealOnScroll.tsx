import React, { useState, useEffect, useRef } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  triggerOnce?: boolean;
  cascade?: boolean;
  cascadeDelay?: number;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = "",
  direction = 'up',
  delay = 0,
  duration = 600,
  distance = 50,
  threshold = 0.1,
  triggerOnce = true,
  cascade = false,
  cascadeDelay = 100
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          setTimeout(() => {
            setIsVisible(true);
            if (triggerOnce) setHasTriggered(true);
          }, delay);
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold, triggerOnce, hasTriggered]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';
    
    switch (direction) {
      case 'up': return `translate3d(0, ${distance}px, 0) scale(1)`;
      case 'down': return `translate3d(0, -${distance}px, 0) scale(1)`;
      case 'left': return `translate3d(${distance}px, 0, 0) scale(1)`;
      case 'right': return `translate3d(-${distance}px, 0, 0) scale(1)`;
      case 'scale': return 'translate3d(0, 0, 0) scale(0.8)';
      case 'fade': return 'translate3d(0, 0, 0) scale(1)';
      default: return `translate3d(0, ${distance}px, 0) scale(1)`;
    }
  };

  const renderChildren = () => {
    if (!cascade) {
      return children;
    }

    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;

      return React.cloneElement(child as React.ReactElement<any>, {
        style: {
          ...child.props.style,
          transitionDelay: isVisible ? `${index * cascadeDelay}ms` : '0ms'
        }
      });
    });
  };

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDuration: `${duration}ms`,
        transitionDelay: cascade ? '0ms' : `${delay}ms`
      }}
    >
      {renderChildren()}
    </div>
  );
};

export const FadeInUp: React.FC<Omit<RevealOnScrollProps, 'direction'>> = (props) => (
  <RevealOnScroll {...props} direction="up" />
);

export const FadeInDown: React.FC<Omit<RevealOnScrollProps, 'direction'>> = (props) => (
  <RevealOnScroll {...props} direction="down" />
);

export const FadeInLeft: React.FC<Omit<RevealOnScrollProps, 'direction'>> = (props) => (
  <RevealOnScroll {...props} direction="left" />
);

export const FadeInRight: React.FC<Omit<RevealOnScrollProps, 'direction'>> = (props) => (
  <RevealOnScroll {...props} direction="right" />
);

export const ScaleIn: React.FC<Omit<RevealOnScrollProps, 'direction'>> = (props) => (
  <RevealOnScroll {...props} direction="scale" />
);

export const FadeIn: React.FC<Omit<RevealOnScrollProps, 'direction'>> = (props) => (
  <RevealOnScroll {...props} direction="fade" />
);

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
}> = ({ children, className = "", staggerDelay = 100, direction = 'up' }) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <RevealOnScroll
          key={index}
          direction={direction}
          delay={index * staggerDelay}
          duration={600}
        >
          {child}
        </RevealOnScroll>
      ))}
    </div>
  );
};

export const SectionReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}> = ({ children, className = "", title, subtitle }) => {
  return (
    <div className={className}>
      {title && (
        <FadeInUp delay={0}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
        </FadeInUp>
      )}
      
      {subtitle && (
        <FadeInUp delay={200}>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
            {subtitle}
          </p>
        </FadeInUp>
      )}
      
      <FadeInUp delay={400}>
        {children}
      </FadeInUp>
    </div>
  );
};