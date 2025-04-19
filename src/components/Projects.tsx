
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Globe, Code, ExternalLink, Github, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  id: string;
  title: string;
  tech: string;
  descriptions: string[];
  image: string;
  links: {
    demo?: string;
    code?: string;
  };
}

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [animated, setAnimated] = useState<boolean[]>([]);

  // Projects data - Added 3 more projects
  const projects: Project[] = [
    {
      id: 'travel',
      title: t('projects.travel.title'),
      tech: t('projects.travel.tech'),
      descriptions: [
        t('projects.travel.description1'),
        t('projects.travel.description2'),
        t('projects.travel.description3'),
      ],
      image: 'travel',
      links: {
        demo: '#',
        code: '#',
      },
    },
    {
      id: 'bakery',
      title: t('projects.bakery.title'),
      tech: t('projects.bakery.tech'),
      descriptions: [
        t('projects.bakery.description1'),
        t('projects.bakery.description2'),
      ],
      image: 'bakery',
      links: {
        demo: '#',
        code: '#',
      },
    },
    {
      id: 'movie',
      title: t('projects.movie.title'),
      tech: t('projects.movie.tech'),
      descriptions: [
        t('projects.movie.description1'),
        t('projects.movie.description2'),
        t('projects.movie.description3'),
        t('projects.movie.description4'),
      ],
      image: 'movie',
      links: {
        demo: '#',
        code: '#',
      },
    },
    {
      id: 'portfolio',
      title: 'Personal Portfolio',
      tech: 'React, TypeScript, Tailwind CSS, Framer Motion',
      descriptions: [
        'Modern portfolio website with dark mode and animations',
        'Multi-language support with i18n integration',
        'Responsive design for all devices',
      ],
      image: 'portfolio',
      links: {
        demo: '#',
        code: '#',
      },
    },
    {
      id: 'dashboard',
      title: 'Admin Dashboard',
      tech: 'React, Redux, Material UI, Chart.js',
      descriptions: [
        'Full-featured admin dashboard with user management',
        'Data visualization with interactive charts',
        'Role-based access control system',
      ],
      image: 'dashboard',
      links: {
        demo: '#',
        code: '#',
      },
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Platform',
      tech: 'React, Node.js, Express, MongoDB, Stripe',
      descriptions: [
        'Full-stack e-commerce solution with product management',
        'Integrated payment processing with Stripe',
        'User authentication and order tracking',
      ],
      image: 'ecommerce',
      links: {
        demo: '#',
        code: '#',
      },
    },
  ];

  // Staggered animation effect on scroll
  useEffect(() => {
    // Initialize animation states
    setAnimated(new Array(projects.length).fill(false));
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setAnimated(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }
      });
    }, { threshold: 0.2 });
    
    const projectElements = document.querySelectorAll('.project-card');
    projectElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, [projects.length]);

  return (
    <section id="projects" className={cn(
      "py-20 w-full relative overflow-hidden",
      language === 'ar' ? 'font-sans rtl' : ''
    )}>
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212] to-[#0D0D0D] z-0"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-5"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-12 animate-slide-up" style={{animationDelay: '0.1s'}}>
          <span className="text-accent uppercase text-sm font-medium tracking-wider">
            {t('projects.title')}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4 text-gradient">
            {t('projects.title')}
          </h2>
          <div className="h-1 w-20 bg-accent/60 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              data-index={index}
              className={cn(
                "project-card glass-card rounded-xl overflow-hidden transition-all duration-500 border border-white/5 hover:border-accent/30 hover:shadow-[0_10px_40px_-15px_rgba(124,58,237,0.3)]",
                animated[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              )}
              style={{ transitionDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Project Image with Gradient Overlay */}
              <div className="h-48 bg-gradient-to-br from-[#1A1A1A] to-[#121212] relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#1A1A1A] flex items-center justify-center text-accent/20 group-hover:scale-110 transition-transform duration-700">
                  <Image className="w-16 h-16" />
                </div>
                
                {/* Project label ribbon */}
                <div className="absolute top-4 left-0 bg-accent/80 text-white text-xs font-medium py-1 px-3 rounded-r-full shadow-lg">
                  #{index + 1}
                </div>
                
                {/* Project overlay on hover */}
                <div 
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-accent/90 to-accent/70 backdrop-blur-sm flex items-center justify-center opacity-0 transition-opacity duration-300",
                    activeProject === project.id && "opacity-100"
                  )}
                >
                  <div className="flex gap-4">
                    <Button size="sm" variant="secondary" className="shadow-lg hover:scale-105 transition-transform" asChild>
                      <a href={project.links.demo} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        <span>Demo</span>
                      </a>
                    </Button>
                    <Button size="sm" variant="secondary" className="shadow-lg hover:scale-105 transition-transform" asChild>
                      <a href={project.links.code} target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4 mr-1" />
                        <span>Code</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="p-6 relative">
                {/* Shiny accent line */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
                
                <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">{project.title}</h3>
                <div className="flex items-center mb-4">
                  <span className="text-accent text-sm py-1 px-2 rounded-full bg-accent/10 border border-accent/20">
                    {project.tech}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {project.descriptions.map((desc, i) => (
                    <p key={i} className="text-white/70 text-sm flex items-start">
                      <span className="text-accent mr-2 text-lg leading-none">•</span>
                      <span>{desc}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
