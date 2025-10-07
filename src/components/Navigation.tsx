import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'research', label: 'Research', path: '/research' },
    { id: 'team', label: 'Team', path: '/team' },
    { id: 'publications', label: 'Publications & Outreach', path: '/publications' },
    { id: 'join', label: 'Join Us', path: '/join' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-lg shadow-glow border-b border-border/20' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src="/Mohanty_Logo_NEW.png" 
              alt="Mohanty Lab Logo" 
              className="w-8 h-8 md:w-10 md:h-10 object-contain logo-img"
            />
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-lg md:text-xl text-gradient-hero">
                Mohanty Lab
              </h1>
              <p className="text-xs text-muted-foreground font-medium">Penn State University</p>
            </div>
            <div className="sm:hidden">
              <h1 className="font-display font-bold text-lg text-gradient-hero">
                ML
              </h1>
            </div>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.div key={item.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={item.path}
                  className={`px-3 xl:px-4 py-2 rounded-lg font-medium text-sm xl:text-base transition-all duration-300 block ${
                    isCurrentPath(item.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Contact CTA, Theme Toggle & Mobile Menu Toggle */}
          <div className="flex items-center space-x-3">
            <Link to="/contact">
              <Button className="hidden sm:flex gradient-accent hover:shadow-glow transition-all duration-300 font-semibold px-4 md:px-6 text-sm md:text-base">
                Contact
              </Button>
            </Link>
            
            {/* Theme Toggle */}
            <ThemeToggle size="md" />
            
            {/* Mobile Menu Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Slide-Down Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="lg:hidden fixed inset-0 z-30 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Slide-down Menu */}
            <motion.div
              className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-card border-b border-border shadow-2xl"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ 
                type: "tween",
                ease: "easeInOut",
                duration: 0.3
              }}
            >
              {/* Menu Header - matches main nav */}
              <div className="container mx-auto px-6 py-4 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <motion.div 
                    className="flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 gradient-hero rounded-xl flex items-center justify-center shadow-molecular">
                      <span className="text-background font-bold text-sm">M</span>
                    </div>
                    <div>
                      <h1 className="font-display font-bold text-lg text-gradient-hero">
                        Mohanty Lab
                      </h1>
                      <p className="text-xs text-muted-foreground font-medium">Penn State University</p>
                    </div>
                  </motion.div>
                  
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="container mx-auto px-6 py-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.path}
                      onClick={handleMobileMenuClose}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 block ${
                        isCurrentPath(item.path)
                          ? 'text-primary bg-primary/10 border border-primary/20'
                          : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Contact Button & Theme Toggle */}
                <motion.div
                  className="pt-4 border-t border-border/50 space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Theme</span>
                    <ThemeToggle size="sm" />
                  </div>
                  <Link to="/contact" onClick={handleMobileMenuClose}>
                    <Button className="w-full gradient-accent hover:shadow-glow transition-all duration-300 font-semibold py-3">
                      Contact
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
