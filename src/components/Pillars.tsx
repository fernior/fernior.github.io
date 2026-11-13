import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { SpotlightCard } from './SpotlightCard';
import { 
  Briefcase, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Sparkles, 
  Layers
} from 'lucide-react';

export const Pillars: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const items = t.pillars.items;

  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Briefcase className="w-6 h-6 text-sky-400" />;
      case 1:
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 2:
        return <Database className="w-6 h-6 text-amber-400" />;
      case 3:
      default:
        return <Cpu className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="pillars" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-3 border border-sky-400/30 bg-sky-500/10 text-sky-400">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            {t.pillars.sectionBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className={isDark ? 'text-white' : 'text-slate-900'}>
              {t.pillars.sectionTitle}
            </span>
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl font-normal mb-2 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t.pillars.sectionSubtitle}
          </p>
          <span className="text-xs font-mono text-sky-400/80 font-medium">
            {t.pillars.hoverHint}
          </span>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((pillar, idx) => (
            <SpotlightCard
              key={pillar.id}
              className="p-8 flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                {/* Card Top: Number + Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-sky-400/40 transition-all duration-300">
                      {getPillarIcon(idx)}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                        {pillar.subtitle}
                      </span>
                      <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {pillar.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-2xl font-black font-mono text-white/10 group-hover:text-sky-400/25 transition-colors">
                    {pillar.number}
                  </span>
                </div>

                {/* Description */}
                <p className={`text-sm sm:text-base leading-relaxed mb-6 font-normal ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {pillar.description}
                </p>

                {/* Executive Focus Callout */}
                <div className={`p-4 rounded-xl border mb-6 text-xs sm:text-sm font-medium flex items-start gap-2.5 transition-colors ${
                  isDark 
                    ? 'bg-sky-500/5 border-sky-500/20 text-sky-200 group-hover:bg-sky-500/10' 
                    : 'bg-sky-50 border-sky-200 text-sky-900'
                }`}>
                  <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold font-mono text-[11px] uppercase tracking-wider block text-sky-400 mb-0.5">
                      Enfoque de Dirección Ejecutiva:
                    </span>
                    {pillar.executiveFocus}
                  </div>
                </div>
              </div>

              {/* Tools and Frameworks Badges */}
              <div className="pt-6 border-t border-white/8">
                <span className={`text-[11px] font-mono uppercase tracking-wider block mb-3 font-semibold ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Herramientas, Estándares & Marcos de Trabajo:
                </span>
                <div className="flex flex-wrap gap-2">
                  {pillar.tools.map((tool) => (
                    <span
                      key={tool}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-colors ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-slate-300 group-hover:border-sky-400/30 group-hover:text-white'
                          : 'bg-slate-100 border-slate-200 text-slate-700 group-hover:border-sky-400 group-hover:text-sky-900'
                      }`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
};
