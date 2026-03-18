import { useState, useEffect, useLayoutEffect } from 'react';

type Theme = 'light' | 'dark';

// Use stored preference or default to dark
const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') return saved;
  }
  return 'dark';
};

const applyTheme = (t: Theme) => {
  if (t === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Apply theme synchronously before first paint to avoid flash
  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Also apply on mount to handle SSR-like scenarios
  useEffect(() => {
    applyTheme(theme);
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return { theme, toggleTheme };
};
