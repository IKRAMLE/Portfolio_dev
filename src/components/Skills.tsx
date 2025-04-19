
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Globe, 
  Database, 
  Server, 
  Terminal
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Skills: React.FC = () => {
  const { t, language } = useLanguage();
  const [carouselApi, setCarouselApi] = React.useState<{ [key: string]: CarouselApi | null }>({
    frontend: null,
    backend: null,
    tools: null,
  });

  // Programming skills with categories
  const programmingSkills = {
    frontend: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Bootstrap', 'Tailwind CSS', 'TypeScript', 'Next.js'],
    backend: ['Node.js', 'Express.js', 'MongoDB', 'MySQL', 'RESTful API', 'GraphQL', 'PHP'],
    tools: ['Git', 'GitHub', 'Postman', 'VS Code', 'Figma', 'Docker', 'AWS', 'Firebase']
  };

  // Language skills
  const languageSkills = [
    { name: t('skills.languages.amazigh'), level: 100 },
    { name: t('skills.languages.arabic'), level: 100 },
    { name: t('skills.languages.french'), level: 70 },
    { name: t('skills.languages.english'), level: 85 },
    { name: t('skills.languages.turkish'), level: 85 },
  ];

  // Set up autoplay for each carousel
  useEffect(() => {
    const autoplayIntervals: NodeJS.Timeout[] = [];
    
    Object.entries(carouselApi).forEach(([category, api]) => {
      if (api) {
        const interval = setInterval(() => {
          api.scrollNext();
        }, 3000);
        
        autoplayIntervals.push(interval);
      }
    });
    
    // Clean up intervals on unmount
    return () => {
      autoplayIntervals.forEach(interval => clearInterval(interval));
    };
  }, [carouselApi]);

  // Animate skills on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          setTimeout(() => {
            entry.target.classList.add('opacity-100');
          }, 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-item').forEach((skill) => {
      skill.classList.add('opacity-0');
      observer.observe(skill);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className={cn(
      "py-20 w-full relative bg-[#0D0D0D] overflow-hidden",
      language === 'ar' ? 'font-sans rtl' : ''
    )}>
      {/* Animated background */}
      <div className="absolute inset-0 bg-[url('/particles-bg.svg')] bg-repeat opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent"></div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-10">
          <span className="text-accent uppercase text-sm font-medium tracking-wider">
            {t('skills.title')}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4 text-gradient">
            {t('skills.title')}
          </h2>
          <div className="h-1 w-20 bg-accent/60 mx-auto rounded-full"></div>
        </div>
        
        <div className="flex flex-col items-center gap-16 max-w-6xl mx-auto">
          {/* Language Skills - Modern design */}
          <div className="w-full glass-card rounded-xl p-8 skill-item border border-accent/20 shadow-[0_0_25px_rgba(124,58,237,0.1)] relative overflow-hidden">
            <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="flex items-center mb-6 relative z-10">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-4">
                <Globe className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-white">{t('skills.languages.title')}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {languageSkills.map((language, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 flex items-center">
                      <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                      {language.name}
                    </span>
                    <span className="text-white/60 text-sm">{language.level}%</span>
                  </div>
                  
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-accent/80 to-accent relative"
                      style={{ 
                        width: `${language.level}%`,
                        transition: 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      }}
                    >
                      <div className="absolute inset-0 bg-[url('/noise.png')] bg-repeat opacity-10"></div>
                      <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/20 blur-sm"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Programming Skills - Tabs + Carousel */}
          <div className="w-full glass-card rounded-xl p-8 skill-item border border-accent/20 shadow-[0_0_25px_rgba(124,58,237,0.1)] relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="flex items-center mb-6 relative z-10">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-4">
                <Code className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-white">{t('skills.programming.title')}</h3>
            </div>
            
            <div className="relative z-10">
              <Tabs defaultValue="frontend" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary/30">
                  <TabsTrigger value="frontend" className="flex gap-2 items-center">
                    <Terminal className="h-4 w-4" />
                    Frontend
                  </TabsTrigger>
                  <TabsTrigger value="backend" className="flex gap-2 items-center">
                    <Server className="h-4 w-4" />
                    Backend
                  </TabsTrigger>
                  <TabsTrigger value="tools" className="flex gap-2 items-center">
                    <Database className="h-4 w-4" />
                    Tools
                  </TabsTrigger>
                </TabsList>
                
                {Object.entries(programmingSkills).map(([category, skills]) => (
                  <TabsContent key={category} value={category} className="mt-0 focus-visible:outline-none">
                    <Carousel
                      opts={{
                        align: "start",
                        loop: true,
                      }}
                      className="w-full"
                      setApi={(api) => setCarouselApi(prev => ({ ...prev, [category]: api }))}
                    >
                      <CarouselContent>
                        {skills.map((skill, index) => (
                          <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/4 pl-4">
                            <Card className="rounded-xl bg-secondary/20 border-accent/10 hover:border-accent/40 transition-all duration-300 overflow-hidden group">
                              <CardContent className="p-0">
                                <div className="skill-badge flex flex-col items-center justify-center py-6 px-4 h-32 text-white/80 rounded-xl relative overflow-hidden transition-all duration-300 hover:text-white">
                                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                  <div className="relative z-10">
                                    <div className="text-lg font-medium mb-2 text-center">{skill}</div>
                                    <Badge variant="outline" className="bg-accent/20 text-white/90 border-accent/40">
                                      {category}
                                    </Badge>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="flex items-center justify-center gap-2 mt-4">
                        <CarouselPrevious className="relative static left-0 translate-y-0 rounded-full bg-accent/20 hover:bg-accent/30 border-0" />
                        <CarouselNext className="relative static right-0 translate-y-0 rounded-full bg-accent/20 hover:bg-accent/30 border-0" />
                      </div>
                    </Carousel>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
