import React from 'react';

interface FloatingProfilePhotoProps {
  src?: string;
  alt?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const FloatingProfilePhoto: React.FC<FloatingProfilePhotoProps> = ({
  src = '/images/profile.jpg',
  alt = 'Profile',
  className = '',
  size = 'lg'
}) => {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-72 h-72 md:w-80 md:h-80',
  };

  return (
    <div className={`relative ${className}`} data-testid="profile-photo">
      {/* Outer gold ring — subtle glow */}
      <div
        className={`${sizeClasses[size]} rounded-full p-[2px]`}
        style={{
          background: 'linear-gradient(135deg, rgba(212,175,55,0.8) 0%, rgba(212,175,55,0.1) 50%, rgba(212,175,55,0.6) 100%)',
          boxShadow: '0 0 40px rgba(212, 175, 55, 0.12)',
        }}
      >
        <div className={`w-full h-full rounded-full overflow-hidden bg-[var(--color-surface2)]`}>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F]">
                    <span class="font-playfair text-4xl font-bold text-[#D4AF37] select-none">AA</span>
                  </div>
                `;
              }
            }}
          />
        </div>
      </div>

      {/* Subtle floating glow behind photo */}
      <div
        className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Online indicator */}
      <div
        className="absolute bottom-3 right-3 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#050505]"
        title="Available for opportunities"
      />
    </div>
  );
};
