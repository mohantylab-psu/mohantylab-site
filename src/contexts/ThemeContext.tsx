import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if there's a saved theme in localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        return savedTheme;
      }
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Check if View Transitions API is supported
    const supportsViewTransitions = 'startViewTransition' in document;
    
    const updateTheme = () => {
      // Remove existing theme classes
      root.classList.remove('light', 'dark');
      
      // Add current theme class
      root.classList.add(theme);
      
      // Save to localStorage
      localStorage.setItem('theme', theme);
    };
    
    // Use View Transitions API for smoother theme change if supported
    if (supportsViewTransitions && typeof (document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition === 'function') {
      (document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(() => {
        updateTheme();
      });
    } else {
      // Fallback to regular transition
      updateTheme();
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
