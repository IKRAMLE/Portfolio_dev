
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { FileText, Link, Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  credential?: string;
  icon: string;
  color: string;
  link?: string;
}

const Certificates: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCert, setActiveCert] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);

  // Certificates data with colors
  const certificates: Certificate[] = [
    {
      id: 'jsalgo',
      title: t('certificates.jsalgo.title'),
      issuer: t('certificates.jsalgo.issuer'),
      date: t('certificates.jsalgo.date'),
      credential: t('certificates.jsalgo.credential'),
      icon: 'FCC',
      color: '#0a0a23',
      link: '#',
    },
    {
      id: 'postman',
      title: t('certificates.postman.title'),
      issuer: t('certificates.postman.issuer'),
      date: t('certificates.postman.date'),
      icon: 'PM',
      color: '#ff6c37',
      link: '#',
    },
    {
      id: 'webdesign',
      title: t('certificates.webdesign.title'),
      issuer: t('certificates.webdesign.issuer'),
      date: t('certificates.webdesign.date'),
      credential: t('certificates.webdesign.credential'),
      icon: 'FCC',
      color: '#0a0a23',
      link: '#',
    },
    {
      id: 'oracle',
      title: t('certificates.oracle.title'),
      issuer: t('certificates.oracle.issuer'),
      icon: 'OA',
      color: '#f80000',
      link: '#',
    },
  ];

  // Set up animation on scroll
  useEffect(() => {
    setVisibleItems(new Array(certificates.length).fill(false));
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setVisibleItems(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }
      });
    }, { threshold: 0.2 });
    
    const certElements = document.querySelectorAll('.cert-card');
    certElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, [certificates.length]);

  return (
    <section id="certificates" className={cn(
      "py-20 w-full relative bg-[#0D0D0D] overflow-hidden",
      language === 'ar' ? 'font-sans rtl' : ''
    )}>
      {/* Enhanced dynamic background */}
      <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#0D0D0D] to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0D0D0D] to-transparent"></div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-12 animate-slide-up" style={{animationDelay: '0.1s'}}>
          <div className="inline-flex items-center justify-center mb-4">
            <Award className="text-accent h-6 w-6 mr-2" />
            <span className="text-accent uppercase text-sm font-medium tracking-wider">
              {t('certificates.title')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4 text-gradient">
            {t('certificates.title')}
          </h2>
          <div className="h-1 w-20 bg-accent/60 mx-auto rounded-full"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Decorative elements */}
          <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                data-index={index}
                className={cn(
                  "cert-card relative z-10 transition-all duration-700",
                  visibleItems[index] ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveCert(cert.id)}
                onMouseLeave={() => setActiveCert(null)}
              >
                <div className="glass-card rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_10px_30px_-15px_rgba(124,58,237,0.3)] h-full flex flex-col">
                  {/* Certificate badge with dynamic color */}
                  <div className="relative mb-5">
                    <div className="w-14 h-14 rounded-full border-4 border-white/10 flex items-center justify-center mb-2" 
                      style={{ background: `radial-gradient(circle at 70% 30%, ${cert.color}, #121212)` }}>
                      <span className="text-white font-bold">{cert.icon}</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                      <ExternalLink className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  {/* Certificate info */}
                  <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-accent transition-colors flex-none">
                    {cert.title}
                  </h3>
                  
                  <div className="flex-grow flex flex-col">
                    <p className="text-white/70 text-sm mb-3 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-accent/60 mr-2"></span>
                      {cert.issuer}
                    </p>
                    
                    {cert.date && (
                      <p className="text-white/50 text-xs mb-2 flex items-center">
                        <span className="w-1 h-1 rounded-full bg-white/30 mr-2"></span>
                        {cert.date}
                      </p>
                    )}
                    
                    {cert.credential && (
                      <p className="text-white/50 text-xs mb-1 flex items-center">
                        <span className="w-1 h-1 rounded-full bg-white/30 mr-2"></span>
                        {cert.credential}
                      </p>
                    )}
                  </div>
                  
                  {/* View credential button */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full text-white border-white/20 hover:bg-accent/20 hover:text-white hover:border-accent/30"
                      asChild
                    >
                      <a href={cert.link} target="_blank" rel="noreferrer" className="flex items-center justify-center">
                        <span>View Credential</span>
                        <Link className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                  
                  {/* Animated corner accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-accent/20 rounded-tr-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
