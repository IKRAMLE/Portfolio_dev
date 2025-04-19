import React, { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  useEffect(() => {
    // Improved scroll reveal effect for sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          entry.target.classList.remove('opacity-0');
          // Keep observing to handle scroll up/down behavior
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -100px 0px" });

    document.querySelectorAll('section').forEach((section) => {
      if (section.id !== 'home') {
        // Only add opacity-0 if it doesn't already have animation classes
        if (!section.classList.contains('animate-slide-up')) {
          section.classList.add('opacity-0');
        }
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Update title
  useEffect(() => {
    document.title = "IKRAM LECHQER | Portfolio";
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen text-foreground overflow-hidden">
          <Navbar />
          <main className="relative overflow-hidden">
            <Hero />
            <About />
            <Education />
            <Skills />
            <Projects />
            <Certificates />
            <Contact />
            <Footer />
          </main>
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default Index;
