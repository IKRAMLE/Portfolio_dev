
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Calendar, Briefcase } from 'lucide-react';

const Education: React.FC = () => {
  const { t, language } = useLanguage();

  // Education timeline data
  const educationItems = [
    {
      title: t('education.karabuk.title'),
      institution: t('education.karabuk.institution'),
      date: t('education.karabuk.date'),
      logo: 'KBU', // placeholder for logo
    },
    {
      title: t('education.gomycode.title'),
      institution: t('education.gomycode.institution'),
      date: t('education.gomycode.date'),
      logo: 'GMC', // placeholder for logo
    },
    {
      title: t('education.turkish.title'),
      institution: t('education.turkish.institution'),
      date: t('education.turkish.date'),
      grade: t('education.turkish.grade'),
      logo: 'KBU', // placeholder for logo
    },
    {
      title: t('education.highschool.title'),
      institution: t('education.highschool.institution'),
      date: t('education.highschool.date'),
      logo: 'HS', // placeholder for logo
    },
  ];

  return (
    <section id="education" className={cn(
      "py-20 w-full relative",
      language === 'ar' ? 'font-sans rtl' : ''
    )}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] to-[#121212] z-0"></div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <span className="text-accent uppercase text-sm font-medium tracking-wider">
            {t('education.title')}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6 text-gradient">
            {t('education.title')}
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-accent/50 to-white/10 transform md:translate-x-px"></div>
            
            {/* Timeline items */}
            <div className="space-y-16">
              {educationItems.map((item, index) => (
                <div key={index} className={cn(
                  "relative flex flex-col md:flex-row animate-fade-in",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                  { "opacity-0": index > 0 } // For staggered animation
                )} style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}>
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-6 w-6 h-6 rounded-full bg-accent shadow-[0_0_10px_rgba(124,58,237,0.5)] transform -translate-x-1/2 z-10"></div>
                  
                  {/* Timeline content */}
                  <div className={cn(
                    "w-full md:w-1/2 pl-10 md:pl-0 md:pr-16",
                    index % 2 === 0 ? "md:text-right md:pr-16" : "md:text-left md:pl-16"
                  )}>
                    <div className="glass-card p-6 rounded-xl transition-transform duration-300 hover:translate-y-[-5px] h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center glass-card">
                          <span className="text-white font-semibold">{item.logo}</span>
                        </div>
                        <div className="flex items-center text-white/60 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-white/80 mb-3">{item.institution}</p>
                      
                      {item.grade && (
                        <p className="text-accent text-sm font-medium mt-2">{item.grade}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Empty space for alignment on mobile */}
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
