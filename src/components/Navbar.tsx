
import React, { useState, useEffect } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Menu, X, Globe, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const { t, language, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Language options
  const languages: { label: string; value: Language }[] = [
    { label: 'English', value: 'en' },
    { label: 'العربية', value: 'ar' },
    { label: 'Français', value: 'fr' },
    { label: 'Español', value: 'es' },
    { label: 'Türkçe', value: 'tr' },
  ];

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Nav items
  const navItems = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.education'), href: '#education' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.certificates'), href: '#certificates' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md',
        isScrolled 
          ? theme === 'dark' 
            ? 'bg-black/70 shadow-md' 
            : 'bg-white/70 shadow-md' 
          : 'bg-transparent',
        language === 'ar' ? 'font-sans rtl' : ''
      )}
    >
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className={cn(
          "text-xl md:text-2xl font-display font-bold",
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          <span className="text-accent">IL</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "nav-item text-sm font-medium transition-colors duration-300",
                theme === 'dark' 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Language & Theme Controls */}
        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "hover:bg-opacity-10 rounded-full",
                  theme === 'dark' 
                    ? 'text-white/80 hover:text-white hover:bg-white/10' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={cn(
              "backdrop-blur-xl border-white/10",
              theme === 'dark' ? 'bg-secondary/80' : 'bg-white/80'
            )}>
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.value}
                  onClick={() => changeLanguage(lang.value)}
                  className={cn(
                    "cursor-pointer",
                    theme === 'dark'
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
                    language === lang.value && (theme === 'dark' ? "bg-accent/20 text-white" : "bg-primary/20 text-gray-900")
                  )}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className={cn(
              "rounded-full",
              theme === 'dark' 
                ? 'text-white/80 hover:text-white hover:bg-white/10' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            )}
          >
            {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "rounded-full",
                  theme === 'dark' 
                    ? 'text-white/80 hover:text-white hover:bg-white/10' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={cn(
              "backdrop-blur-xl border-white/10",
              theme === 'dark' ? 'bg-secondary/80' : 'bg-white/80'
            )}>
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.value}
                  onClick={() => changeLanguage(lang.value)}
                  className={cn(
                    "cursor-pointer",
                    theme === 'dark'
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
                    language === lang.value && (theme === 'dark' ? "bg-accent/20 text-white" : "bg-primary/20 text-gray-900")
                  )}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            className={cn(
              "rounded-full",
              theme === 'dark' 
                ? 'text-white/80 hover:text-white hover:bg-white/10' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            )}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={cn(
          "md:hidden py-4 px-6 border-t animate-fade-in",
          theme === 'dark' 
            ? 'bg-black/90 backdrop-blur-xl border-white/10' 
            : 'bg-white/90 backdrop-blur-xl border-gray-200'
        )}>
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={toggleMenu}
                className={cn(
                  "transition-colors py-2 px-2 rounded",
                  theme === 'dark' 
                    ? 'text-white/80 hover:text-white hover:bg-white/5' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                {item.label}
              </a>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleTheme} 
              className={cn(
                "justify-start rounded",
                theme === 'dark' 
                  ? 'text-white/80 hover:text-white hover:bg-white/10' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              )}
            >
              {theme === 'dark' ? (
                <div className="flex items-center">
                  <Moon className="h-4 w-4 mr-2" />
                  <span>Dark Mode</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Sun className="h-4 w-4 mr-2" />
                  <span>Light Mode</span>
                </div>
              )}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
