import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { SpotlightCard } from './SpotlightCard';
import { 
  MapPin, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  GitCommit, 
  Building 
} from 'lucide-react';

export const Timeline: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const items = t.timeline.items;
  const [expandedId, setExpandedId] = useState<string | null>(items[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="trajectory" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-3 border border-sky-400/30 bg-sky-500/10 text-sky-400">
            <GitCommit className="w-3.5 h-3.5 text-sky-400" />
            {t.timeline.sectionBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className={isDark ? 'text-white' : 'text-slate-900'}>
              {t.timeline.sectionTitle}
            </span>
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl font-normal ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t.timeline.sectionSubtitle}
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Glowing Vertical Line */}
          <div 
            className="absolute left-4 sm:left-8 top-4 bottom-4 w-[2px] bg-gradient-to-b from-sky-400 via-cyan-500 to-sky-900/30"
          />

          <div className="space-y-8 sm:space-y-12">
            {items.map((item) => {
              const isExpanded = expandedId === item.id;
              const isCurrent = item.current;

              return (
                <div key={item.id} className="relative pl-12 sm:pl-20">
                  
                  {/* Timeline Glowing Node */}
                  <div className="absolute left-4 sm:left-8 top-6 -translate-x-1/2 flex items-center justify-center">
                    {isCurrent ? (
                      <span className="relative flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500 border-2 border-[#070B14]" />
                      </span>
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-slate-700 border-2 border-sky-400/80 shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
                    )}
                  </div>

                  {/* Career Item Card */}
                  <SpotlightCard className={`p-6 sm:p-8 transition-all duration-300 ${
                    isCurrent ? 'border-sky-400/50 shadow-lg shadow-sky-950/30' : ''
                  }`}>
                    {/* Top Row: Period Badge & Sector */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide border flex items-center gap-1.5 ${
                          isCurrent
                            ? 'bg-sky-500/20 text-sky-300 border-sky-400/40'
                            : 'bg-white/5 text-slate-300 border-white/10'
                        }`}>
                          <Calendar className="w-3 h-3 text-sky-400" />
                          <span>{item.period}</span>
                        </span>

                        {isCurrent && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {t.timeline.currentBadge}
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <Building className="w-3 h-3 text-sky-400" />
                        <span>{item.sector}</span>
                      </span>
                    </div>

                    {/* Role Title */}
                    <h3 className={`text-xl sm:text-2xl font-black tracking-tight mb-1 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {item.role}
                    </h3>

                    {/* Company & Location */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-sky-400 mb-4">
                      <span>{item.company}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400 font-normal flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {item.location}
                      </span>
                    </div>

                    {/* Executive Highlight Pitch */}
                    <p className={`text-xs sm:text-sm leading-relaxed mb-4 font-medium ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      {item.highlight}
                    </p>

                    {/* Expandable Responsibility Bullets */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-white/10 space-y-2.5">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 block mb-2">
                          Logros Clave y Responsabilidades:
                        </span>
                        {item.description.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Core Competencies Badges */}
                    <div className="mt-6 pt-4 border-t border-white/8 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {item.coreCompetencies.map((comp) => (
                          <span
                            key={comp}
                            className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                              isDark
                                ? 'bg-white/5 border-white/10 text-slate-300'
                                : 'bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            {comp}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="inline-flex items-center gap-1 text-xs font-mono text-sky-400 hover:text-sky-300 font-semibold cursor-pointer ml-auto"
                      >
                        <span>{isExpanded ? 'Ver menos' : 'Ver detalle'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                  </SpotlightCard>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
