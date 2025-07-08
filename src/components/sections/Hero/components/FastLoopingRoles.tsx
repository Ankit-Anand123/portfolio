import React, { useState, useEffect } from 'react';

// Static animated greeting that types once and stays
interface StaticAnimatedGreetingProps {
  className?: string;
}

export const StaticAnimatedGreeting: React.FC<StaticAnimatedGreetingProps> = ({ 
  className = '' 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const fullText = "Hello, I'm Ankit Anand";
  
  useEffect(() => {
    let index = 0;
    
    const typeWriter = () => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
        setTimeout(typeWriter, 80);
      } else {
        setIsComplete(true);
      }
    };
    
    const timer = setTimeout(typeWriter, 300);
    return () => clearTimeout(timer);
  }, []);

  const renderText = () => {
    const helloText = "Hello, I'm ";
    if (displayText.length <= helloText.length) {
      return <span>{displayText}</span>;
    }
    
    const nameText = displayText.slice(helloText.length);
    return (
      <>
        <span>{helloText}</span>
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {nameText}
        </span>
      </>
    );
  };

  return (
    <div className={className}>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
        {renderText()}
        {!isComplete && (
          <span className="animate-pulse text-blue-600 ml-1">|</span>
        )}
      </h1>
    </div>
  );
};

// Fast continuous looping roles
interface FastLoopingRolesProps {
  roles: string[];
  className?: string;
  startDelay?: number;
}

export const FastLoopingRoles: React.FC<FastLoopingRolesProps> = ({ 
  roles, 
  className = '',
  startDelay = 2000
}) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start animation after delay
    const startTimer = setTimeout(() => {
      setIsVisible(true);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!isVisible) return;

    const currentRole = roles[currentRoleIndex];
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const animate = () => {
      if (!isDeleting) {
        // Typing
        if (charIndex <= currentRole.length) {
          setDisplayText(currentRole.slice(0, charIndex));
          charIndex++;
          timeoutId = setTimeout(animate, 80); // Fast typing
        } else {
          // Pause briefly then start deleting
          timeoutId = setTimeout(() => {
            isDeleting = true;
            animate();
          }, 1000); // Reduced pause time
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          charIndex--;
          setDisplayText(currentRole.slice(0, charIndex));
          timeoutId = setTimeout(animate, 20); // Very fast deleting
        } else {
          // Move to next role instantly
          isDeleting = false;
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          timeoutId = setTimeout(animate, 50); // Almost instant transition
        }
      }
    };

    const initialTimer = setTimeout(animate, 200);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(timeoutId);
    };
  }, [currentRoleIndex, roles, isVisible]);

  if (!isVisible) {
    return <div className={`h-16 ${className}`}></div>;
  }

  return (
    <div className={`h-16 flex items-center ${className}`}>
      <div className="text-2xl md:text-3xl lg:text-4xl font-semibold">
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {displayText}
        </span>
        <span className="animate-pulse text-purple-600 ml-1">|</span>
      </div>
    </div>
  );
};

// Super fast alternative - even quicker transitions
export const SuperFastLoopingRoles: React.FC<FastLoopingRolesProps> = ({ 
  roles, 
  className = '',
  startDelay = 2000
}) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setIsVisible(true), startDelay);
    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!isVisible) return;

    let charIndex = 0;
    let isDeleting = false;
    const currentRole = roles[currentRoleIndex];

    const runAnimation = () => {
      const speed = isDeleting ? 15 : 60; // Even faster speeds
      
      if (!isDeleting) {
        if (charIndex <= currentRole.length) {
          setDisplayText(currentRole.slice(0, charIndex));
          charIndex++;
        } else {
          setTimeout(() => { isDeleting = true; }, 800); // Shorter pause
          return;
        }
      } else {
        if (charIndex > 0) {
          charIndex--;
          setDisplayText(currentRole.slice(0, charIndex));
        } else {
          isDeleting = false;
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          return; // Exit and let the next useEffect cycle handle it
        }
      }
      
      setTimeout(runAnimation, speed);
    };

    const timer = setTimeout(runAnimation, 100);
    return () => clearTimeout(timer);
  }, [currentRoleIndex, roles, isVisible]);

  if (!isVisible) {
    return <div className={`h-16 ${className}`}></div>;
  }

  return (
    <div className={`h-16 flex items-center ${className}`}>
      <div className="text-2xl md:text-3xl lg:text-4xl font-semibold">
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {displayText}
        </span>
        <span className="animate-pulse text-purple-600 ml-1">|</span>
      </div>
    </div>
  );
};

// Combined fast component
interface FastStaticNameLoopingRolesProps {
  roles: string[];
  className?: string;
}

export const FastStaticNameLoopingRoles: React.FC<FastStaticNameLoopingRolesProps> = ({ 
  roles, 
  className = '' 
}) => {
  return (
    <div className={className}>
      <StaticAnimatedGreeting className="mb-6" />
      <FastLoopingRoles 
        roles={roles} 
        className="justify-center lg:justify-start"
        startDelay={2200} // Start after name finishes
      />
    </div>
  );
};

// Ultra-fast combined component
export const UltraFastStaticNameLoopingRoles: React.FC<FastStaticNameLoopingRolesProps> = ({ 
  roles, 
  className = '' 
}) => {
  return (
    <div className={className}>
      <StaticAnimatedGreeting className="mb-6" />
      <SuperFastLoopingRoles 
        roles={roles} 
        className="justify-center lg:justify-start"
        startDelay={2200}
      />
    </div>
  );
};