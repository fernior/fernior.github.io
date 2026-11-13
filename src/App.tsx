import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MetricsRibbon } from './components/MetricsRibbon';
import { Pillars } from './components/Pillars';
import { CaseStudies } from './components/CaseStudies';
import { Timeline } from './components/Timeline';
import { Credentials } from './components/Credentials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';

export const AppContent: React.FC = () => {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  const handleScrollToCases = () => {
    const el = document.getElementById('cases');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Top Floating Glassmorphism Navbar */}
      <Navbar onOpenCVModal={() => setCvModalOpen(true)} />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero 
          onExploreCases={handleScrollToCases} 
          onContactClick={handleScrollToContact} 
        />
        <MetricsRibbon />
        <Pillars />
        <CaseStudies />
        <Timeline />
        <Credentials />
        <ContactSection />
      </main>

      {/* Executive Footer */}
      <Footer />

      {/* Executive CV Modal */}
      <CVModal 
        isOpen={cvModalOpen} 
        onClose={() => setCvModalOpen(false)} 
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
