import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { SpotlightCard } from './SpotlightCard';
import { 
  Zap, 
  Users, 
  Wifi, 
  DollarSign, 
  ShieldCheck 
} from 'lucide-react';

export const MetricsRibbon: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Counters state
  const [counts, setCounts] = useState({
    metric1: 0, // 95%
    metric2: 0, // 100 engineers
    metric3: 0, // 4x
    metric4: 0, // 40 MDP
    metric5: 0, // 100%
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800; // ms
          const startTime = performance.now();

          const updateCounter = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts({
              metric1: Math.floor(easeOut * 95),
              metric2: Math.floor(easeOut * 100),
              metric3: Math.floor(easeOut * 4),
              metric4: Math.floor(easeOut * 40),
              metric5: Math.floor(easeOut * 100),
            });

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const items = t.metrics.items;

  const getIcon = (id: string) => {
    switch (id) {
      case 'metric-1':
        return <Zap className="w-5 h-5 text-sky-400" />;
      case 'metric-2':
        return <Users className="w-5 h-5 text-amber-400" />;
      case 'metric-3':
        return <Wifi className="w-5 h-5 text-cyan-400" />;
      case 'metric-4':
        return <DollarSign className="w-5 h-5 text-rose-400" />;
      case 'metric-5':
      default:
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getDisplayValue = (id: string) => {
    switch (id) {
      case 'metric-1':
        return `-${counts.metric1}%`;
      case 'metric-2':
        return `+${counts.metric2}`;
      case 'metric-3':
        return `${counts.metric3}x`;
      case 'metric-4':
        return `$${counts.metric4} MDP`;
      case 'metric-5':
      default:
        return `${counts.metric5}%`;
    }
  };

  return (
    <section id="impact" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-3 border border-sky-400/30 bg-sky-500/10 text-sky-400">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            {t.metrics.sectionBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className={isDark ? 'text-white' : 'text-slate-900'}>
              {t.metrics.sectionTitle}
            </span>
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl font-normal ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t.metrics.sectionSubtitle}
          </p>
        </div>

        {/* Bento Grid: 5 Hard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: 4 días a 30 min (-95%) MetLife */}
          <SpotlightCard className="p-7 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-sky-500/15 text-sky-400 border border-sky-500/20">
                  {items[0].badge}
                </span>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-sky-400/40 transition-colors">
                  {getIcon('metric-1')}
                </div>
              </div>

              <div className="mb-2">
                <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-sky-400 mb-1">
                  {getDisplayValue('metric-1')}
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  {items[0].highlight}
                </div>
              </div>

              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {items[0].title}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {items[0].description}
              </p>
            </div>

            <div className={`pt-4 border-t flex items-center justify-between text-xs font-mono ${
              isDark ? 'border-white/8 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              <span className="font-semibold text-sky-400">{items[0].org}</span>
              <span>Cloud & IA</span>
            </div>
          </SpotlightCard>

          {/* Card 2: +100 Ingenieros / 6 Subdirecciones INE */}
          <SpotlightCard className="p-7 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/20">
                  {items[1].badge}
                </span>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-amber-400/40 transition-colors">
                  {getIcon('metric-2')}
                </div>
              </div>

              <div className="mb-2">
                <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-amber-400 mb-1">
                  {getDisplayValue('metric-2')}
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  {items[1].highlight}
                </div>
              </div>

              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {items[1].title}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {items[1].description}
              </p>
            </div>

            <div className={`pt-4 border-t flex items-center justify-between text-xs font-mono ${
              isDark ? 'border-white/8 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              <span className="font-semibold text-amber-400">{items[1].org}</span>
              <span>+100M Registros</span>
            </div>
          </SpotlightCard>

          {/* Card 3: 4x Ancho de Banda ($0 OPEX) Grupo Lefarma */}
          <SpotlightCard className="p-7 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                  {items[2].badge}
                </span>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyan-400/40 transition-colors">
                  {getIcon('metric-3')}
                </div>
              </div>

              <div className="mb-2">
                <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-cyan-400 mb-1">
                  {getDisplayValue('metric-3')}
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  {items[2].highlight}
                </div>
              </div>

              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {items[2].title}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {items[2].description}
              </p>
            </div>

            <div className={`pt-4 border-t flex items-center justify-between text-xs font-mono ${
              isDark ? 'border-white/8 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              <span className="font-semibold text-cyan-400">{items[2].org}</span>
              <span>ERP Intelisis 3 Cías</span>
            </div>
          </SpotlightCard>

          {/* Card 4: $40 MDP / Semana Alsea */}
          <SpotlightCard className="p-7 flex flex-col justify-between group lg:col-span-1 md:col-span-1">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/20">
                  {items[3].badge}
                </span>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-rose-400/40 transition-colors">
                  {getIcon('metric-4')}
                </div>
              </div>

              <div className="mb-2">
                <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-rose-400 mb-1">
                  {getDisplayValue('metric-4')}
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  {items[3].highlight}
                </div>
              </div>

              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {items[3].title}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {items[3].description}
              </p>
            </div>

            <div className={`pt-4 border-t flex items-center justify-between text-xs font-mono ${
              isDark ? 'border-white/8 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              <span className="font-semibold text-rose-400">{items[3].org}</span>
              <span>Starbucks & Domino's</span>
            </div>
          </SpotlightCard>

          {/* Card 5: 100% Cumplimiento Regulado CNBV + POL-019 OFINSA */}
          <SpotlightCard className="p-7 flex flex-col justify-between group md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  {items[4].badge}
                </span>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-emerald-400/40 transition-colors">
                  {getIcon('metric-5')}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-5">
                  <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-emerald-400 mb-1">
                    {getDisplayValue('metric-5')}
                  </div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    {items[4].highlight}
                  </div>
                </div>

                <div className="sm:col-span-7">
                  <h3 className={`text-lg font-bold mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {items[4].title}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {items[4].description}
                  </p>
                </div>
              </div>
            </div>

            <div className={`pt-4 border-t flex items-center justify-between text-xs font-mono mt-4 ${
              isDark ? 'border-white/8 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              <span className="font-semibold text-emerald-400">{items[4].org}</span>
              <span>FortiGate & Windows Server 2025</span>
            </div>
          </SpotlightCard>

        </div>

      </div>
    </section>
  );
};
