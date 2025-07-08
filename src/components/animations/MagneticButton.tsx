import React, { useRef, useState, useCallback } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  magnetStrength?: number;
  returnSpeed?: number;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onMouseMove?: (e: React.MouseEvent) => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = "", 
  onClick,
  magnetStrength = 0.3,
  returnSpeed = 200,
  disabled = false,
  variant = 'primary',
  size = 'md',
  onMouseMove: externalOnMouseMove
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * magnetStrength;
    const deltaY = (e.clientY - centerY) * magnetStrength;
    
    setPosition({ x: deltaX, y: deltaY });
    
    if (externalOnMouseMove) {
      externalOnMouseMove(e);
    }
  }, [magnetStrength, disabled, externalOnMouseMove]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      setPosition({ x: 0, y: 0 });
      onClick();
    }
  };

  const getVariantClasses = () => {
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl',
      secondary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
      ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
    };
    return variants[variant];
  };

  const getSizeClasses = () => {
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };
    return sizes[size];
  };

  return (
    <button
      ref={buttonRef}
      className={`
        relative font-medium rounded-lg transition-all ease-out transform
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isHovered ? 'scale-105' : 'scale-100'}
        ${className}
      `}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${isHovered ? 1.05 : 1})`,
        transitionDuration: isHovered ? '0ms' : `${returnSpeed}ms`
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
    >
      <div 
        className={`
          absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300
          ${variant === 'primary' ? 'bg-blue-400' : ''}
          ${variant === 'secondary' ? 'bg-purple-400' : ''}
          ${variant === 'outline' ? 'bg-blue-400' : ''}
          ${isHovered ? 'opacity-20 blur-md' : 'opacity-0'}
        `}
      />
      
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
      
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-0 transform scale-0 transition-all duration-300 rounded-lg"></div>
      </div>
    </button>
  );
};

export const ParticleMagneticButton: React.FC<MagneticButtonProps & {
  particleColor?: string;
  particleCount?: number;
}> = ({ 
  children, 
  className = "",
  particleColor = '#3B82F6',
  particleCount = 3,
  ...props 
}) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    opacity: number;
  }>>([]);

  const handleParticleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newParticle = {
      id: Date.now(),
      x: x - 4,
      y: y - 4,
      opacity: 1
    };
    
    setParticles(prev => [...prev.slice(-particleCount + 1), newParticle]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  };

  return (
    <div className="relative">
      <MagneticButton 
        {...props}
        className={className}
        onMouseMove={handleParticleMouseMove}
      >
        {children}
      </MagneticButton>
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full transition-all duration-1000 ease-out"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: particleColor,
              opacity: particle.opacity,
              transform: 'scale(1)',
              animation: 'fadeOut 1s ease-out forwards'
            }}
          />
        ))}
      </div>
    </div>
  );
};