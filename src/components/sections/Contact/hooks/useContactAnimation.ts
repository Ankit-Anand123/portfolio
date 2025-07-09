import { useState, useCallback } from 'react';

interface AnimationStates {
  hero: string;
  contactInfo: string;
  form: string;
  contactMethods: string;
  success: string;
}

export const useContactAnimation = () => {
  const [animationStates, setAnimationStates] = useState<AnimationStates>({
    hero: 'idle',
    contactInfo: 'idle',
    form: 'idle',
    contactMethods: 'idle',
    success: 'idle'
  });

  const triggerAnimation = useCallback((component: keyof AnimationStates, animation = 'active') => {
    setAnimationStates(prev => ({
      ...prev,
      [component]: animation
    }));
  }, []);

  const resetAnimations = useCallback(() => {
    setAnimationStates({
      hero: 'idle',
      contactInfo: 'idle',
      form: 'idle',
      contactMethods: 'idle',
      success: 'idle'
    });
  }, []);

  return {
    animationStates,
    triggerAnimation,
    resetAnimations
  };
};