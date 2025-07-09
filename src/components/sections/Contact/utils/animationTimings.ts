export const ANIMATION_DELAYS = {
  hero: '0.1s',
  contactInfo: '0.2s',
  form: '0.3s',
  contactMethods: '0.4s',
  success: '0.5s'
} as const;

export const ANIMATION_DURATIONS = {
  fadeIn: '0.6s',
  slideIn: '0.8s',
  bounce: '1.0s',
  scale: '0.3s'
} as const;

export const STAGGER_DELAYS = {
  items: 0.1, // seconds between each item
  cards: 0.15,
  fields: 0.1
} as const;

export const getStaggerDelay = (index: number, baseDelay = 0): string => {
  return `${baseDelay + (index * STAGGER_DELAYS.items)}s`;
};

export const getCardStaggerDelay = (index: number, baseDelay = 0): string => {
  return `${baseDelay + (index * STAGGER_DELAYS.cards)}s`;
};

export const getFieldStaggerDelay = (index: number, baseDelay = 0): string => {
  return `${baseDelay + (index * STAGGER_DELAYS.fields)}s`;
};

export {};