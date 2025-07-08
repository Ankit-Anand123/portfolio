import React, { useState, useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle' | 'star';
}

interface ParticleExplosionProps {
  trigger: boolean;
  onComplete?: () => void;
  colors?: string[];
  particleCount?: number;
  duration?: number;
  intensity?: 'low' | 'medium' | 'high';
  gravity?: number;
  spread?: number;
  className?: string;
  shapes?: Array<'circle' | 'square' | 'triangle' | 'star'>;
}

export const ParticleExplosion: React.FC<ParticleExplosionProps> = ({
  trigger,
  onComplete,
  colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'],
  particleCount = 25,
  duration = 2000,
  intensity = 'medium',
  gravity = 0.5,
  spread = 8,
  className = "",
  shapes = ['circle', 'square', 'triangle', 'star']
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  const getIntensityMultiplier = () => {
    switch (intensity) {
      case 'low': return 0.5;
      case 'medium': return 1;
      case 'high': return 1.8;
      default: return 1;
    }
  };

  const createParticles = () => {
    const newParticles: Particle[] = [];
    const intensityMultiplier = getIntensityMultiplier();
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = (2 + Math.random() * spread) * intensityMultiplier;
      
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
        maxLife: 1,
        size: 2 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }
    
    setParticles(newParticles);
  };

  const updateParticles = () => {
    setParticles(prevParticles => {
      const updatedParticles = prevParticles
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + gravity, // Apply gravity
          vx: particle.vx * 0.99, // Air resistance
          life: particle.life - 0.02
        }))
        .filter(particle => particle.life > 0);

      if (updatedParticles.length === 0 && onComplete) {
        onComplete();
      }

      return updatedParticles;
    });
  };

  useEffect(() => {
    if (trigger) {
      createParticles();
      
      const animate = () => {
        updateParticles();
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
      
      // Auto cleanup after duration
      const cleanup = setTimeout(() => {
        setParticles([]);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      }, duration);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        clearTimeout(cleanup);
      };
    }
  }, [trigger, duration, gravity, particleCount, colors, shapes, intensity, spread]);

  const renderParticle = (particle: Particle) => {
    const opacity = particle.life;
    const scale = particle.life * 0.8 + 0.2;

    const baseStyle = {
      position: 'absolute' as const,
      left: `calc(50% + ${particle.x}px)`,
      top: `calc(50% + ${particle.y}px)`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      backgroundColor: particle.color,
      opacity,
      transform: `translate(-50%, -50%) scale(${scale})`,
      pointerEvents: 'none' as const
    };

    switch (particle.shape) {
      case 'circle':
        return (
          <div
            key={particle.id}
            style={{
              ...baseStyle,
              borderRadius: '50%',
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}40`
            }}
          />
        );
      
      case 'square':
        return (
          <div
            key={particle.id}
            style={{
              ...baseStyle,
              borderRadius: '2px',
              transform: `${baseStyle.transform} rotate(${particle.x * 2}deg)`
            }}
          />
        );
      
      case 'triangle':
        return (
          <div
            key={particle.id}
            style={{
              ...baseStyle,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderLeft: `${particle.size / 2}px solid transparent`,
              borderRight: `${particle.size / 2}px solid transparent`,
              borderBottom: `${particle.size}px solid ${particle.color}`,
              transform: `${baseStyle.transform} rotate(${particle.x * 3}deg)`
            }}
          />
        );
      
      case 'star':
        return (
          <div
            key={particle.id}
            style={{
              ...baseStyle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: `${particle.size * 0.8}px`,
              color: particle.color
            }}
            className="star-shape"
          >
            ★
          </div>
        );
      
      default:
        return (
          <div
            key={particle.id}
            style={{
              ...baseStyle,
              borderRadius: '50%'
            }}
          />
        );
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {particles.map(renderParticle)}
    </div>
  );
};

// Confetti explosion variant
export const ConfettiExplosion: React.FC<Omit<ParticleExplosionProps, 'colors' | 'shapes'>> = (props) => (
  <ParticleExplosion
    {...props}
    colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF']}
    shapes={['square', 'circle', 'triangle']}
    particleCount={40}
    gravity={0.3}
    spread={10}
  />
);

// Tech/cyber explosion variant
export const CyberExplosion: React.FC<Omit<ParticleExplosionProps, 'colors' | 'shapes'>> = (props) => (
  <ParticleExplosion
    {...props}
    colors={['#00D4FF', '#0099CC', '#007ACC', '#0066CC', '#0052CC']}
    shapes={['square', 'circle']}
    particleCount={30}
    gravity={0.2}
    spread={12}
  />
);

// Success explosion variant
export const SuccessExplosion: React.FC<Omit<ParticleExplosionProps, 'colors' | 'shapes'>> = (props) => (
  <ParticleExplosion
    {...props}
    colors={['#10B981', '#34D399', '#6EE7B7', '#A7F3D0']}
    shapes={['star', 'circle']}
    particleCount={20}
    gravity={0.4}
    spread={6}
  />
);

// Fire explosion variant
export const FireExplosion: React.FC<Omit<ParticleExplosionProps, 'colors' | 'shapes'>> = (props) => (
  <ParticleExplosion
    {...props}
    colors={['#FF4500', '#FF6347', '#FFD700', '#FFA500', '#FF1493']}
    shapes={['circle', 'triangle']}
    particleCount={35}
    gravity={0.1}
    spread={15}
    intensity="high"
  />
);

// Sparkle explosion variant
export const SparkleExplosion: React.FC<Omit<ParticleExplosionProps, 'colors' | 'shapes'>> = (props) => (
  <ParticleExplosion
    {...props}
    colors={['#FFD700', '#FFF700', '#FFFF00', '#F0E68C', '#BDB76B']}
    shapes={['star', 'circle']}
    particleCount={15}
    gravity={0.1}
    spread={8}
    duration={1500}
  />
);

// Click burst button wrapper
export const ParticleButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  explosionType?: 'default' | 'confetti' | 'cyber' | 'success' | 'fire' | 'sparkle';
  disabled?: boolean;
  customExplosion?: React.ComponentType<any>;
}> = ({ 
  children, 
  onClick, 
  className = "",
  explosionType = 'default',
  disabled = false,
  customExplosion: CustomExplosion
}) => {
  const [triggerExplosion, setTriggerExplosion] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    
    setTriggerExplosion(true);
    setTimeout(() => setTriggerExplosion(false), 100);
    
    if (onClick) {
      onClick();
    }
  };

  const renderExplosion = () => {
    if (CustomExplosion) {
      return <CustomExplosion trigger={triggerExplosion} />;
    }

    switch (explosionType) {
      case 'confetti':
        return <ConfettiExplosion trigger={triggerExplosion} />;
      case 'cyber':
        return <CyberExplosion trigger={triggerExplosion} />;
      case 'success':
        return <SuccessExplosion trigger={triggerExplosion} />;
      case 'fire':
        return <FireExplosion trigger={triggerExplosion} />;
      case 'sparkle':
        return <SparkleExplosion trigger={triggerExplosion} />;
      default:
        return <ParticleExplosion trigger={triggerExplosion} />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`relative overflow-hidden ${className} ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        {children}
        {renderExplosion()}
      </button>
    </div>
  );
};

// Multi-explosion component for special celebrations
export const MultiExplosion: React.FC<{
  trigger: boolean;
  explosionCount?: number;
  explosionTypes?: Array<'confetti' | 'cyber' | 'success' | 'fire' | 'sparkle'>;
  delay?: number;
  className?: string;
}> = ({
  trigger,
  explosionCount = 3,
  explosionTypes = ['confetti', 'cyber', 'success'],
  delay = 200,
  className = ""
}) => {
  const [explosions, setExplosions] = useState<boolean[]>(new Array(explosionCount).fill(false));

  useEffect(() => {
    if (trigger) {
      explosionTypes.forEach((_, index) => {
        setTimeout(() => {
          setExplosions(prev => {
            const newExplosions = [...prev];
            newExplosions[index] = true;
            return newExplosions;
          });
          
          // Reset after explosion
          setTimeout(() => {
            setExplosions(prev => {
              const newExplosions = [...prev];
              newExplosions[index] = false;
              return newExplosions;
            });
          }, 100);
        }, index * delay);
      });
    }
  }, [trigger, explosionCount, delay, explosionTypes]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {explosions.map((isActive, index) => {
        const ExplosionComponent = {
          confetti: ConfettiExplosion,
          cyber: CyberExplosion,
          success: SuccessExplosion,
          fire: FireExplosion,
          sparkle: SparkleExplosion
        }[explosionTypes[index % explosionTypes.length]];

        return (
          <ExplosionComponent
            key={index}
            trigger={isActive}
            particleCount={20}
            className="absolute inset-0"
          />
        );
      })}
    </div>
  );
};

export default ParticleExplosion;