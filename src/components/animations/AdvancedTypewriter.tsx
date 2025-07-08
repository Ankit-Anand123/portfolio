import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  startDelay?: number;
  className?: string;
  cursorColor?: string;
  showCursor?: boolean;
  loop?: boolean;
  onComplete?: () => void;
  highlightWords?: string[];
  highlightColor?: string;
  preserveLength?: boolean;
  scrambleEffect?: boolean;
}

export const AdvancedTypewriter: React.FC<TypewriterProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000,
  startDelay = 0,
  className = "",
  cursorColor = "text-blue-600",
  showCursor = true,
  loop = true,
  onComplete,
  highlightWords = [],
  highlightColor = "text-blue-600",
  preserveLength = false,
  scrambleEffect = false
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursorBlink, setShowCursorBlink] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const getScrambledChar = () => {
    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
  };

  const typeChar = (targetText: string, currentLength: number) => {
    if (scrambleEffect && currentLength < targetText.length) {
      const scrambledText = targetText.slice(0, currentLength) + 
        Array(Math.min(3, targetText.length - currentLength))
          .fill('')
          .map(() => getScrambledChar())
          .join('');
      
      setCurrentText(scrambledText);
      
      setTimeout(() => {
        setCurrentText(targetText.slice(0, currentLength + 1));
      }, typingSpeed / 3);
    } else {
      setCurrentText(targetText.slice(0, currentLength + 1));
    }
  };

  useEffect(() => {
    if (!hasStarted) {
      const startTimer = setTimeout(() => setHasStarted(true), startDelay);
      return () => clearTimeout(startTimer);
    }

    if (isComplete) return;

    const currentTargetText = texts[currentTextIndex];
    
    const animate = () => {
      if (!isDeleting) {
        if (currentText.length < currentTargetText.length) {
          typeChar(currentTargetText, currentText.length);
          timeoutRef.current = setTimeout(animate, typingSpeed);
        } else {
          timeoutRef.current = setTimeout(() => {
            if (currentTextIndex === texts.length - 1 && !loop) {
              setIsComplete(true);
              if (onComplete) onComplete();
              return;
            }
            setIsDeleting(true);
            animate();
          }, pauseTime);
        }
      } else {
        if (currentText.length > (preserveLength ? currentTargetText.length : 0)) {
          setCurrentText(currentTargetText.slice(0, currentText.length - 1));
          timeoutRef.current = setTimeout(animate, deletingSpeed);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          timeoutRef.current = setTimeout(animate, 200);
        }
      }
    };

    if (hasStarted && texts.length > 0) {
      timeoutRef.current = setTimeout(animate, 100);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentText, isDeleting, currentTextIndex, hasStarted, isComplete, texts, typingSpeed, deletingSpeed, pauseTime, loop, onComplete, preserveLength, scrambleEffect]);

  useEffect(() => {
    if (!showCursor) return;

    intervalRef.current = setInterval(() => {
      setShowCursorBlink(prev => !prev);
    }, 530);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [showCursor]);

  const renderText = () => {
    if (highlightWords.length === 0) {
      return currentText;
    }

    let highlightedText = currentText;
    highlightWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        `<span class="${highlightColor} font-semibold">  const handleClick =</span>`
      );
    });

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <span className={className}>
      {renderText()}
      {showCursor && (
        <span 
          className={`${cursorColor} transition-opacity duration-100 ${
            showCursorBlink ? 'opacity-100' : 'opacity-0'
          }`}
        >
          |
        </span>
      )}
    </span>
  );
};

export const RoleTypewriter: React.FC<{
  roles: string[];
  className?: string;
}> = ({ roles, className = "" }) => (
  <AdvancedTypewriter
    texts={roles}
    typingSpeed={120}
    deletingSpeed={40}
    pauseTime={1500}
    className={`text-2xl md:text-3xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent ${className}`}
    cursorColor="text-purple-600"
    highlightWords={['Senior', 'Machine Learning', 'AI', 'Data']}
    highlightColor="text-pink-600"
  />
);

export const SkillTypewriter: React.FC<{
  skills: string[];
  className?: string;
}> = ({ skills, className = "" }) => (
  <AdvancedTypewriter
    texts={skills}
    typingSpeed={80}
    deletingSpeed={30}
    pauseTime={1000}
    className={`text-lg font-medium ${className}`}
    cursorColor="text-blue-600"
    scrambleEffect={true}
  />
);

export const CodeTypewriter: React.FC<{
  codeSnippets: string[];
  className?: string;
}> = ({ codeSnippets, className = "" }) => (
  <AdvancedTypewriter
    texts={codeSnippets}
    typingSpeed={60}
    deletingSpeed={20}
    pauseTime={2500}
    className={`font-mono text-green-400 ${className}`}
    cursorColor="text-green-400"
    preserveLength={true}
  />
);

export const TerminalTypewriter: React.FC<{
  commands: string[];
  prompt?: string;
  className?: string;
}> = ({ commands, prompt = "$ ", className = "" }) => {
  return (
    <div className={`bg-gray-900 text-green-400 p-4 rounded-lg font-mono ${className}`}>
      <div className="flex items-center">
        <span className="text-blue-400">{prompt}</span>
        <AdvancedTypewriter
          texts={commands}
          typingSpeed={80}
          deletingSpeed={40}
          pauseTime={2000}
          cursorColor="text-green-400"
          className="ml-1"
        />
      </div>
    </div>
  );
};

export const StatsTypewriter: React.FC<{
  stats: Array<{ label: string; value: string }>;
  className?: string;
  onStatComplete?: (index: number) => void;
}> = ({ stats, className = "", onStatComplete }) => {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = () => {
    if (onStatComplete) onStatComplete(currentStatIndex);
    
    if (currentStatIndex < stats.length - 1) {
      setCurrentStatIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  if (isComplete) {
    return (
      <div className={`space-y-2 ${className}`}>
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between">
            <span>{stat.label}:</span>
            <span className="font-bold text-blue-600">{stat.value}</span>
          </div>
        ))}
      </div>
    );
  }

  const currentStat = stats[currentStatIndex];
  
  return (
    <div className={`space-y-2 ${className}`}>
      {stats.slice(0, currentStatIndex).map((stat, index) => (
        <div key={index} className="flex justify-between">
          <span>{stat.label}:</span>
          <span className="font-bold text-blue-600">{stat.value}</span>
        </div>
      ))}
      
      {currentStat && (
        <div className="flex justify-between">
          <span>{currentStat.label}:</span>
          <span className="font-bold text-blue-600">
            <AdvancedTypewriter
              texts={[currentStat.value]}
              typingSpeed={100}
              loop={false}
              onComplete={handleComplete}
              showCursor={false}
            />
          </span>
        </div>
      )}
    </div>
  );
}; () => {
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
      <span className={`relative z-10 ${isGlitching ? 'animate-pulse' : ''}`}>
        {glitchText}
      </span>

      {showLayers && (
        <>
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

      {isGlitching && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scan-lines" />
        </div>
      )}
    </span>
  );
};

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