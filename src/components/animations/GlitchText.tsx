import React, { useState, useEffect, useRef } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  isActive?: boolean;
  trigger?: 'hover' | 'click' | 'auto' | 'scroll';
  glitchDuration?: number;
  glitchIntensity?: 'low' | 'medium' | 'high';
  colors?: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  autoInterval?: number;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = "",
  isActive = false,
  trigger = 'hover',
  glitchDuration = 1000,
  glitchIntensity = 'medium',
  colors = {
    primary: '#ff0000',
    secondary: '#00ff00', 
    tertiary: '#0000ff'
  },
  autoInterval = 3000
}) => {
  const [glitchText, setGlitchText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?`~';
  const binaryChars = '01';
  const symbolChars = '█▓▒░▄▀▐▌';

  const getGlitchChars = () => {
    switch (glitchIntensity) {
      case 'low': return binaryChars;
      case 'medium': return glitchChars;
      case 'high': return glitchChars + symbolChars + binaryChars;
      default: return glitchChars;
    }
  };

  const createGlitchedText = () => {
    const chars = getGlitchChars();
    return text
      .split('')
      .map(char => {
        const shouldGlitch = Math.random() > 0.85;
        return shouldGlitch ? chars[Math.floor(Math.random() * chars.length)] : char;
      })
      .join('');
  };

  const startGlitch = () => {
    if (isGlitching) return;
    
    setIsGlitching(true);
    setShowLayers(true);
    
    let changeCount = 0;
    const maxChanges = glitchIntensity === 'high' ? 15 : glitchIntensity === 'medium' ? 10 : 5;
    
    intervalRef.current = setInterval(() => {
      setGlitchText(createGlitchedText());
      changeCount++;
      
      if (changeCount >= maxChanges) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        
        timeoutRef.current = setTimeout(() => {
          setGlitchText(text);
          setShowLayers(false);
          setIsGlitching(false);
        }, 200);
      }
    }, 50);
  };

  // Auto trigger effect
  useEffect(() => {
    if (trigger === 'auto') {
      const autoGlitch = setInterval(startGlitch, autoInterval);
      return () => clearInterval(autoGlitch);
    }
  }, [trigger, autoInterval]);

  // Scroll trigger effect
  useEffect(() => {
    if (trigger !== 'scroll') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startGlitch();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [trigger]);

  // Active prop trigger
  useEffect(() => {
    if (isActive) {
      startGlitch();
    }
  }, [isActive]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      startGlitch();
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      startGlitch();
    }
  };

  return (
    <span
      ref={ref}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{ cursor: trigger === 'click' ? 'pointer' : 'default' }}
    >
      {/* Main text */}
      <span className={`relative z-10 ${isGlitching ? 'animate-pulse' : ''}`}>
        {glitchText}
      </span>

      {/* Glitch layers */}
      {showLayers && (
        <>
          {/* Red layer */}
          <span
            className="absolute top-0 left-0 z-0 animate-glitch-1"
            style={{ 
              color: colors.primary,
              clipPath: 'inset(0 0 95% 0)',
              transform: 'translateX(-2px)'
            }}
          >
            {createGlitchedText()}
          </span>

          {/* Green layer */}
          <span
            className="absolute top-0 left-0 z-0 animate-glitch-2"
            style={{ 
              color: colors.secondary,
              clipPath: 'inset(85% 0 10% 0)',
              transform: 'translateX(2px)'
            }}
          >
            {createGlitchedText()}
          </span>

          {/* Blue layer */}
          <span
            className="absolute top-0 left-0 z-0 animate-glitch-3"
            style={{ 
              color: colors.tertiary,
              clipPath: 'inset(40% 0 50% 0)',
              transform: 'translateX(-1px) translateY(1px)'
            }}
          >
            {createGlitchedText()}
          </span>
        </>
      )}

      {/* Scan lines effect */}
      {isGlitching && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scan-lines" />
        </div>
      )}
    </span>
  );
};

// Matrix-style glitch effect
export const MatrixGlitch: React.FC<{
  text: string;
  className?: string;
  isActive?: boolean;
}> = ({ text, className = "", isActive = false }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayText(text);
      return;
    }

    setIsGlitching(true);
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return char;
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsGlitching(false);
      }

      iteration += 1 / 3;
    }, 50);

    return () => clearInterval(interval);
  }, [text, isActive]);

  return (
    <span className={`font-mono ${isGlitching ? 'text-green-400' : ''} ${className}`}>
      {displayText}
    </span>
  );
};

// Cyberpunk-style glitch
export const CyberpunkGlitch: React.FC<{
  text: string;
  className?: string;
  trigger?: 'hover' | 'auto';
}> = ({ text, className = "", trigger = 'hover' }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (trigger === 'auto') {
      const interval = setInterval(() => {
        setIsActive(true);
        setTimeout(() => setIsActive(false), 2000);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [trigger]);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => trigger === 'hover' && setIsActive(true)}
      onMouseLeave={() => trigger === 'hover' && setIsActive(false)}
    >
      <GlitchText
        text={text}
        isActive={isActive}
        glitchIntensity="high"
        colors={{
          primary: '#ff006e',
          secondary: '#8338ec',
          tertiary: '#3a86ff'
        }}
        className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
      />
    </div>
  );
};

export default GlitchText;