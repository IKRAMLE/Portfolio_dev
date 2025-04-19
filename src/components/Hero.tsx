
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowDown, Code, ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, Variants } from 'framer-motion';

const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple animation for background particles
    const createParticles = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      container.innerHTML = '';
      
      const particleCount = 15;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        // Random position
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 2 + 1;
        
        // Random animation duration
        const duration = Math.random() * 10 + 10;
        
        // Set styles
        particle.style.cssText = `
          position: absolute;
          top: ${yPos}%;
          left: ${xPos}%;
          width: ${size}px;
          height: ${size}px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          animation: float ${duration}s ease-in-out infinite alternate, 
                     pulse-soft 3s ease-in-out infinite;
        `;
        
        container.appendChild(particle);
      }
    };
    
    createParticles();
    
    // Recreate on window resize
    window.addEventListener('resize', createParticles);
    
    return () => {
      window.removeEventListener('resize', createParticles);
    };
  }, []);

  // Animation variants for framer-motion
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const floatingIconsVariants: Variants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 0, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="home" className={cn(
      "min-h-screen w-full flex items-center justify-center relative overflow-hidden py-20",
      language === 'ar' ? 'font-sans rtl' : ''
    )}>
      {/* Background gradient */}
      <div className="animated-gradient"></div>
      
      {/* Background particles */}
      <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden"></div>
      
      {/* Background dots */}
      <div className="absolute inset-0 z-0 bg-dots opacity-20"></div>
      
      {/* Decorative circle elements */}
      <div className="absolute top-[5%] left-[10%] w-56 h-56 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 blur-xl"></div>
      <div className="absolute bottom-[15%] right-[10%] w-64 h-64 rounded-full bg-gradient-to-tr from-primary/10 to-primary/5 blur-xl"></div>
      
      {/* Floating decorative icons */}
      <motion.div
        className="absolute top-[20%] left-[15%] p-3 rounded-full bg-secondary/30 backdrop-blur-sm border border-white/10 text-accent shadow-lg hidden md:flex"
        variants={floatingIconsVariants}
        initial="initial"
        animate="animate"
      >
        <Code className="w-6 h-6" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-[25%] right-[20%] p-3 rounded-full bg-secondary/30 backdrop-blur-sm border border-white/10 text-primary shadow-lg hidden md:flex"
        variants={floatingIconsVariants}
        initial="initial"
        animate="animate"
      >
        <Star className="w-6 h-6" />
      </motion.div>
      
      <motion.div
        className="absolute top-[60%] right-[15%] p-3 rounded-full bg-secondary/30 backdrop-blur-sm border border-white/10 text-accent shadow-lg hidden md:flex"
        variants={floatingIconsVariants}
        initial="initial"
        animate="animate"
      >
        <ExternalLink className="w-6 h-6" />
      </motion.div>
      
      {/* Content */}
      <div className="container px-4 md:px-6 z-10 text-center">
        <motion.div 
          className="max-w-3xl mx-auto space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block font-medium text-foreground/80 tracking-wider text-sm md:text-base px-4 py-2 rounded-full bg-secondary/30 backdrop-blur-sm border border-border">
              {t('hero.greeting')}
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gradient leading-tight"
          >
            {t('hero.title')}
          </motion.h1>
          
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <h2 className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </h2>
            
            {/* Underline decoration */}
            <div className="w-24 h-1 bg-gradient-to-r from-accent via-primary to-accent/50 rounded-full mx-auto mt-4"></div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex justify-center gap-4 mt-10 pt-6"
          >
            <Button 
              className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-6 text-base transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.5)]"
              size="lg"
            >
              {t('hero.cta')}
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.a 
          href="#about" 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-foreground/60 hover:text-foreground transition-colors duration-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex flex-col items-center space-y-2 animate-pulse-soft">
            <ArrowDown className="h-6 w-6" />
          </div>
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
