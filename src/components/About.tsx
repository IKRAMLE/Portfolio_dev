
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const About: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="about" className={cn(
      "py-20 w-full relative bg-[#0D0D0D]",
      language === 'ar' ? 'font-sans rtl' : ''
    )}>
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-3xl animate-slide-up">
            <span className="text-accent uppercase text-sm font-medium tracking-wider">
              {t('about.title')}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6 text-gradient">
              {t('about.title')}
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-white/80 leading-relaxed">
                {t('about.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
