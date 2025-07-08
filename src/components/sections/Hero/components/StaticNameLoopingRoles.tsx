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
    
    // Start typing after a brief delay
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

// Looping typewriter for roles only
interface LoopingRolesProps {
  roles: string[];
  className?: string;
  startDelay?: number; // Delay before starting roles animation
}

export const LoopingRoles: React.FC<LoopingRolesProps> = ({ 
  roles, 
  className = '',
  startDelay = 2000 // Wait for name to finish typing
}) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Start the roles animation after delay
    const startTimer = setTimeout(() => {
      setHasStarted(true);
      setShowCursor(true);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!hasStarted) return;

    const currentRole = roles[currentRoleIndex] || '';
    let charIndex = 0;
    let isDeleting = false;
    
    const typeWriter = () => {
      if (!isDeleting) {
        // Typing phase
        if (charIndex <= currentRole.length) {
          setDisplayText(currentRole.slice(0, charIndex));
          charIndex++;
          setTimeout(typeWriter, 100); // Typing speed
        } else {
          // Pause when complete, then start deleting
          setTimeout(() => {
            isDeleting = true;
            typeWriter();
          }, 1200); // Pause time - reduced from 1500
        }
      } else {
        // Deleting phase
        if (charIndex > 0) {
          charIndex--;
          setDisplayText(currentRole.slice(0, charIndex));
          setTimeout(typeWriter, 25); // Faster deleting
        } else {
          // Move to next role immediately
          isDeleting = false;
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTimeout(typeWriter, 100); // Minimal delay between roles
        }
      }
    };
    
    const timer = setTimeout(typeWriter, 200);
    
    return () => clearTimeout(timer);
  }, [currentRoleIndex, roles, hasStarted]);

  // Cursor blinking effect
  useEffect(() => {
    if (!showCursor) return;
    
    const cursorInterval = setInterval(() => {
      const cursor = document.getElementById('role-cursor');
      if (cursor) {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
      }
    }, 530);
    
    return () => clearInterval(cursorInterval);
  }, [showCursor]);

  if (!hasStarted) {
    return <div className={`h-16 ${className}`}></div>;
  }

  return (
    <div className={`h-16 flex items-center ${className}`}>
      <div className="text-2xl md:text-3xl lg:text-4xl font-semibold">
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {displayText}
        </span>
        <span 
          id="role-cursor"
          className="text-purple-600 ml-1"
          style={{ opacity: 1 }}
        >
          |
        </span>
      </div>
    </div>
  );
};

// Combined component
interface StaticNameLoopingRolesProps {
  roles: string[];
  className?: string;
}

export const StaticNameLoopingRoles: React.FC<StaticNameLoopingRolesProps> = ({ 
  roles, 
  className = '' 
}) => {
  return (
    <div className={className}>
      <StaticAnimatedGreeting className="mb-6" />
      <LoopingRoles 
        roles={roles} 
        className="justify-center lg:justify-start"
        startDelay={2500} // Start roles after name finishes + small delay
      />
    </div>
  );
};

// Alternative: Simple version using custom hook
const useLoopingTypewriter = (
  texts: string[], 
  speed: number = 120, 
  deleteSpeed: number = 30, 
  pauseTime: number = 1500,
  startDelay: number = 0
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(startDelay === 0);
  
  useEffect(() => {
    if (startDelay > 0) {
      const timer = setTimeout(() => setHasStarted(true), startDelay);
      return () => clearTimeout(timer);
    }
  }, [startDelay]);
  
  useEffect(() => {
    if (!hasStarted) return;
    
    const currentText = texts[currentIndex];
    
    const handleTyping = () => {
      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }
      
      let typeSpeed = isDeleting ? deleteSpeed : speed;
      
      if (!isDeleting && displayText === currentText) {
        typeSpeed = pauseTime;
        setIsDeleting(true);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        typeSpeed = 300;
      }
      
      setTimeout(handleTyping, typeSpeed);
    };
    
    const timer = setTimeout(handleTyping, speed);
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, texts, speed, deleteSpeed, pauseTime, hasStarted]);
  
  return { displayText, hasStarted };
};

// Simple alternative component
export const SimpleStaticNameLoopingRoles: React.FC<StaticNameLoopingRolesProps> = ({ 
  roles, 
  className = '' 
}) => {
  const [nameComplete, setNameComplete] = useState(false);
  const [nameText, setNameText] = useState('');
  const { displayText: roleText, hasStarted: roleStarted } = useLoopingTypewriter(
    roles, 
    120, 
    30, 
    1500, 
    2500
  );
  
  const fullName = "Hello, I'm Ankit Anand";
  
  // Name typing effect
  useEffect(() => {
    let index = 0;
    const typeTimer = setInterval(() => {
      if (index <= fullName.length) {
        setNameText(fullName.slice(0, index));
        index++;
      } else {
        setNameComplete(true);
        clearInterval(typeTimer);
      }
    }, 80);
    
    return () => clearInterval(typeTimer);
  }, []);
  
  const renderNameText = () => {
    const helloText = "Hello, I'm ";
    if (nameText.length <= helloText.length) {
      return <span>{nameText}</span>;
    }
    
    const nameOnly = nameText.slice(helloText.length);
    return (
      <>
        <span>{helloText}</span>
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {nameOnly}
        </span>
      </>
    );
  };

  return (
    <div className={className}>
      {/* Static animated name */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
        {renderNameText()}
        {!nameComplete && (
          <span className="animate-pulse text-blue-600 ml-1">|</span>
        )}
      </h1>
      
      {/* Looping roles */}
      <div className="h-16 flex items-center justify-center lg:justify-start">
        <div className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {roleText}
          </span>
          {roleStarted && (
            <span className="animate-pulse text-purple-600 ml-1">|</span>
          )}
        </div>
      </div>
    </div>
  );
};