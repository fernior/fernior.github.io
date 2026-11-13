import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { HeroCanvas } from './HeroCanvas';
import { LinkedinIcon } from './Icons';
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  CheckCircle2
} from 'lucide-react';

interface HeroProps {
  onExploreCases: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCases, onContactClick }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % t.hero.rotatingTitles.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [t.hero.rotatingTitles.length]);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:py-32 overflow-hidden">
      {/* 3D/Canvas background */}
      <HeroCanvas />

      {/* Radial ambient glow gradients */}
      <div 
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[500px] rounded-full opacity-25 blur-[120px]"
        style={{
          background: isDark 
            ? 'radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(2, 132, 199, 0.2) 50%, transparent 80%)'
            : 'radial-gradient(circle, rgba(2, 132, 199, 0.25) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 80%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Executive Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-medium mb-6 backdrop-blur-md transition-all shadow-sm group cursor-default">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className={`font-mono text-xs sm:text-sm font-semibold tracking-tight ${
                isDark ? 'text-emerald-300' : 'text-emerald-700'
              }`}>
                {t.hero.statusBadge}
              </span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-3">
              <span className={isDark ? 'text-white' : 'text-slate-900'}>
                Fernando Junior
              </span>{' '}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent">
                Hernández
              </span>
            </h1>

            {/* Dynamic Rotating Headline */}
            <div className="h-10 sm:h-12 flex items-center mb-4 overflow-hidden">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold font-mono tracking-tight text-sky-400 transition-all duration-500 transform">
                {t.hero.rotatingTitles[titleIndex]}
              </span>
            </div>

            {/* Sub-headline */}
            <div className={`text-sm sm:text-base font-semibold tracking-wide uppercase font-mono mb-5 flex flex-wrap items-center gap-1.5 ${
              isDark ? 'text-sky-300/90' : 'text-sky-800'
            }`}>
              {t.hero.subheadline}
            </div>

            {/* Pitch Ejecutivo */}
            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-normal ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {t.hero.pitch}
            </p>

            {/* Quick Authority Badges */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-xl mb-8">
              <div className={`p-2.5 rounded-xl border flex flex-col items-start ${
                isDark ? 'bg-white/5 border-white/8 text-slate-300' : 'bg-slate-100/90 border-slate-200 text-slate-800'
              }`}>
                <span className="text-[11px] font-mono uppercase text-sky-400 font-semibold">Gobernanza TI</span>
                <span className="text-xs sm:text-sm font-bold mt-0.5">{t.hero.quickStats.budget}</span>
              </div>
              <div className={`p-2.5 rounded-xl border flex flex-col items-start ${
                isDark ? 'bg-white/5 border-white/8 text-slate-300' : 'bg-slate-100/90 border-slate-200 text-slate-800'
              }`}>
                <span className="text-[11px] font-mono uppercase text-sky-400 font-semibold">Liderazgo Directivo</span>
                <span className="text-xs sm:text-sm font-bold mt-0.5">{t.hero.quickStats.engineers}</span>
              </div>
              <div className={`p-2.5 rounded-xl border flex flex-col items-start ${
                isDark ? 'bg-white/5 border-white/8 text-slate-300' : 'bg-slate-100/90 border-slate-200 text-slate-800'
              }`}>
                <span className="text-[11px] font-mono uppercase text-sky-400 font-semibold">Misión Crítica</span>
                <span className="text-xs sm:text-sm font-bold mt-0.5">{t.hero.quickStats.availability}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={onContactClick}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-slate-950 bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-300 hover:from-sky-300 hover:to-cyan-200 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCases}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide border transition-all duration-200 cursor-pointer ${
                  isDark
                    ? 'border-white/12 bg-white/5 text-white hover:bg-white/10 hover:border-sky-400/40'
                    : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-sky-500/50 shadow-sm'
                }`}
              >
                <span>{t.hero.ctaSecondary}</span>
              </button>

              {/* Direct Quick Links */}
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-2 sm:pt-0 sm:ml-2">
                <a
                  href="https://linkedin.com/in/fernior"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className={`p-3 rounded-xl border transition-all ${
                    isDark
                      ? 'border-white/10 bg-white/5 text-slate-300 hover:text-sky-400 hover:border-sky-400/40'
                      : 'border-slate-200 bg-white text-slate-700 hover:text-sky-600 hover:border-sky-500/50 shadow-sm'
                  }`}
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://credly.com/users/fernando-junior-hernandez"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Credly Badges"
                  className={`p-3 rounded-xl border transition-all ${
                    isDark
                      ? 'border-white/10 bg-white/5 text-slate-300 hover:text-amber-400 hover:border-amber-400/40'
                      : 'border-slate-200 bg-white text-slate-700 hover:text-amber-600 hover:border-amber-500/50 shadow-sm'
                  }`}
                >
                  <Award className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Executive Photo & Floating Glass Badges */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Glowing Backdrop Frame */}
            <div className="relative w-full max-w-[370px] sm:max-w-[420px] aspect-[4/5] rounded-3xl p-1 bg-gradient-to-b from-sky-400/35 via-cyan-500/10 to-transparent shadow-2xl shadow-sky-950/60 group">
              
              {/* Inner container */}
              <div className={`w-full h-full rounded-[23px] overflow-hidden relative border ${
                isDark ? 'border-white/10 bg-[#0A101D]' : 'border-slate-200 bg-slate-100'
              }`}>
                
                {/* Executive Headshot */}
                <img
                  src="./fernando-junior-hernandez.jpg"
                  alt="Fernando Junior Hernández · CIO / CTO"
                  className="w-full h-full object-cover object-top filter brightness-105 contrast-[1.03] transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="eager"
                />

                {/* Subtle dark gradient overlay at bottom for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B14]/85 via-transparent to-transparent pointer-events-none" />

                {/* Subtitle in photo frame */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl backdrop-blur-md bg-[#070B14]/75 border border-white/10 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-bold text-xs sm:text-sm">Fernando Junior Hernández</div>
                      <div className="text-sky-400 font-mono text-[11px] font-medium">Director de TI (CIO / CTO)</div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-[10px] text-emerald-300 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                      Active
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Badge 1: Top Right */}
              <div className="absolute -top-4 -right-4 sm:-right-6 p-3 rounded-2xl backdrop-blur-xl border border-sky-400/30 bg-[#0D1527]/90 shadow-xl shadow-sky-950/40 flex items-center gap-2.5 animate-bounce-subtle z-20">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-white text-xs font-bold leading-tight">{t.hero.photoBadges.experience}</div>
                  <div className="text-[10px] font-mono text-sky-400">Dirección y Gestión</div>
                </div>
              </div>

              {/* Floating Badge 2: Middle Left */}
              <div className="absolute top-1/2 -left-4 sm:-left-8 -translate-y-1/2 p-3 rounded-2xl backdrop-blur-xl border border-emerald-400/30 bg-[#0D1527]/90 shadow-xl shadow-sky-950/40 flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-white text-xs font-bold leading-tight">{t.hero.photoBadges.uptime}</div>
                  <div className="text-[10px] font-mono text-emerald-400">Continuidad BCP/DRP</div>
                </div>
              </div>

              {/* Floating Badge 3: Bottom Right */}
              <div className="absolute -bottom-5 -right-2 sm:-right-5 p-3 rounded-2xl backdrop-blur-xl border border-amber-400/30 bg-[#0D1527]/90 shadow-xl shadow-sky-950/40 flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-white text-xs font-bold leading-tight">{t.hero.photoBadges.compliance}</div>
                  <div className="text-[10px] font-mono text-amber-400">Auditorías Exitosas</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
