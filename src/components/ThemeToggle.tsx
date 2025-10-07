import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={`${sizeClasses[size]} relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          opacity: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : 180,
          scale: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Sun 
          size={iconSizes[size]} 
          className="text-yellow-500 drop-shadow-sm" 
        />
      </motion.div>
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          opacity: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : -180,
          scale: theme === 'light' ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Moon 
          size={iconSizes[size]} 
          className="text-blue-400 drop-shadow-sm" 
        />
      </motion.div>
    </Button>
  );
};
