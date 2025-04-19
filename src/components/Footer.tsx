
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowUp, Heart } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      "w-full py-10 relative overflow-hidden",
      theme === 'dark' ? 'bg-black' : 'bg-white text-gray-800',
      language === 'ar' ? 'font-sans rtl' : ''
    )}>
      {/* Background dots */}
      <div className={cn(
        "absolute inset-0 bg-dots opacity-10",
        theme === 'dark' ? 'opacity-10' : 'opacity-30'
      )}></div>
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className={cn(
              "text-sm",
              theme === 'dark' ? 'text-white/60' : 'text-gray-600'
            )}>
              &copy; {currentYear} IKRAM LECHQER. {t('footer.rights')}.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <p className={cn(
              "text-sm",
              theme === 'dark' ? 'text-white/60' : 'text-gray-600'
            )}>
              {t('footer.madeby')}
            </p>
            <Heart className={cn(
              "h-4 w-4",
              theme === 'dark' ? 'text-accent' : 'text-pink-500'
            )} />
          </div>
          
          {/* Back to top button */}
          <a 
            href="#home" 
            className={cn(
              "fixed bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 z-50",
              theme === 'dark' 
                ? 'bg-accent text-white shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:bg-accent/90' 
                : 'bg-primary text-white shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:bg-primary/90'
            )}
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
