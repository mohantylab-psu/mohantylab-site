import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Research', path: '/research' },
    { label: 'Team', path: '/team' },
    { label: 'Publications', path: '/publications' },
    { label: 'Join Us', path: '/join' },
    { label: 'Contact', path: '/contact' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <footer className="relative bg-card border-t border-border/50 mt-auto">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] via-transparent to-accent/[0.02]" />
      
      <div className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Lab Identity */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <div className="flex items-center space-x-3">
              <img 
                src="/Mohanty_Logo_NEW.png" 
                alt="Mohanty Lab Logo" 
                className="h-8 w-auto"
              />
              <h3 className="text-xl font-display font-semibold text-foreground">
                Mohanty Lab
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Decoding microbial messages to unlock biomedical insights at Penn State University.
            </p>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>Penn State University Park</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Quick Links
            </h4>
            <nav className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 text-primary" />
                <div>
                  <p>Ready to collaborate?</p>
                  <Link
                    to="/contact"
                    className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
                  >
                    Contact us
                  </Link>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-secondary" />
                <div>
                  <p>Pennsylvania State University</p>
                  <p>University Park, PA</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="mt-12 pt-8"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Separator className="mb-6" />
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-muted-foreground">
              <p>&copy; {currentYear} Mohanty Lab. All rights reserved.</p>
              <div className="hidden sm:block">•</div>
              <p>Penn State University</p>
            </div>
            
            {/* Scientific elements */}
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <div className="flex space-x-1">
                <div className="w-1 h-1 rounded-full bg-primary/60 animate-pulse" />
                <div className="w-1 h-1 rounded-full bg-secondary/60 animate-pulse delay-75" />
                <div className="w-1 h-1 rounded-full bg-accent/60 animate-pulse delay-150" />
              </div>
              <span className="text-[10px] tracking-wider">MOLECULAR INSIGHTS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
