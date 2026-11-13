import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { SpotlightCard } from './SpotlightCard';
import { 
  Award, 
  GraduationCap, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle 
} from 'lucide-react';

export const Credentials: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeFilter, setActiveFilter] = useState<'all' | 'degree' | 'certification' | 'executive'>('all');

  const allItems = t.credentials.items;
  const filteredItems = allItems.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const getCredentialIcon = (type: string) => {
    switch (type) {
      case 'degree':
        return <GraduationCap className="w-5 h-5 text-sky-400" />;
      case 'certification':
        return <Award className="w-5 h-5 text-amber-400" />;
      case 'executive':
      default:
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="credentials" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-3 border border-sky-400/30 bg-sky-500/10 text-sky-400">
            <Award className="w-3.5 h-3.5 text-sky-400" />
            {t.credentials.sectionBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className={isDark ? 'text-white' : 'text-slate-900'}>
              {t.credentials.sectionTitle}
            </span>
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl font-normal mb-6 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t.credentials.sectionSubtitle}
          </p>

          {/* Credly Verified Profile Button */}
          <a
            href="https://credly.com/users/fernando-junior-hernandez"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500/20 via-sky-500/20 to-cyan-500/20 border border-amber-400/40 text-amber-300 hover:border-amber-400 hover:text-white transition-all shadow-md shadow-amber-950/20 group"
          >
            <Award className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>{t.credentials.credlyBadge}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </a>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: t.credentials.filterAll },
            { id: 'degree', label: t.credentials.filterDegrees },
            { id: 'certification', label: t.credentials.filterCerts },
            { id: 'executive', label: t.credentials.filterExecutive },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/25'
                    : isDark
                    ? 'bg-white/5 border-white/8 text-slate-300 hover:text-white hover:bg-white/10'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <SpotlightCard
              key={item.id}
              className="p-6 flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Card Top: Type & Year */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-sky-400/40 transition-colors">
                      {getCredentialIcon(item.type)}
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-400">
                      {item.category}
                    </span>
                  </div>
                  {item.year && (
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                      {item.year}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className={`text-base sm:text-lg font-bold tracking-tight mb-2 leading-snug ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {item.title}
                </h3>

                {/* Institution */}
                <p className={`text-xs sm:text-sm font-medium mb-3 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {item.institution}
                </p>
              </div>

              {/* Bottom Details / License */}
              <div className="pt-4 border-t border-white/8 flex items-center justify-between">
                {item.licenseId ? (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{item.licenseId}</span>
                  </div>
                ) : (
                  <span className="text-[11px] font-mono text-slate-400">
                    Acreditación Verificada
                  </span>
                )}

                <a
                  href="https://credly.com/users/fernando-junior-hernandez"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver credencial"
                  className="p-1 rounded text-slate-400 hover:text-sky-400 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
};
