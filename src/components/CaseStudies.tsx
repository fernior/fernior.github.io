import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { SpotlightCard } from './SpotlightCard';
import { 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Landmark, 
  AlertCircle, 
  Compass, 
  CheckCircle2, 
  BarChart3, 
  Tag, 
  Calendar, 
  Briefcase,
  Sparkles
} from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<number>(0);

  const cases = t.cases.items;
  const currentCase = cases[activeTab];

  const getTabIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Building2 className="w-4 h-4" />;
      case 1:
        return <Landmark className="w-4 h-4" />;
      case 2:
        return <TrendingUp className="w-4 h-4" />;
      case 3:
      default:
        return <ShieldCheck className="w-4 h-4" />;
    }
  };

  return (
    <section id="cases" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-3 border border-sky-400/30 bg-sky-500/10 text-sky-400">
            <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
            {t.cases.sectionBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className={isDark ? 'text-white' : 'text-slate-900'}>
              {t.cases.sectionTitle}
            </span>
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl font-normal ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t.cases.sectionSubtitle}
          </p>
        </div>

        {/* Interactive Sector Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {cases.map((c, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={c.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl font-medium text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500/20 to-cyan-500/20 border-sky-400/60 text-sky-400 shadow-lg shadow-sky-950/40 font-semibold'
                    : isDark
                    ? 'bg-white/5 border-white/8 text-slate-300 hover:text-white hover:bg-white/10'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className={isActive ? 'text-sky-400' : 'text-slate-400'}>
                  {getTabIcon(index)}
                </span>
                <span>{c.organization}</span>
                <span className="text-[10px] font-mono opacity-60 hidden sm:inline">
                  ({c.period})
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Case Study Spotlight Bento Card */}
        <SpotlightCard className="p-6 sm:p-10 border border-sky-500/30">
          
          {/* Case Header Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30">
                {currentCase.sector}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-semibold text-white">{currentCase.role}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                <span>{currentCase.period}</span>
              </div>
            </div>

            <div className="text-xs font-mono font-bold text-sky-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Caso Directivo #{activeTab + 1}</span>
            </div>
          </div>

          {/* Main Case Headline */}
          <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-8 leading-snug ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {currentCase.headline}
          </h3>

          {/* 3 Pillars of the Case: Challenge -> Strategy -> Results */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            
            {/* 1. El Reto */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
              isDark ? 'bg-white/5 border-rose-500/20' : 'bg-rose-50/50 border-rose-200'
            }`}>
              <div>
                <div className="flex items-center gap-2 mb-3 text-rose-400">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    {t.cases.labels.challenge}
                  </span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {currentCase.challenge}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-500/20 text-[11px] font-mono text-rose-400/90 font-medium">
                Punto de Partida Crítico
              </div>
            </div>

            {/* 2. La Estrategia */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
              isDark ? 'bg-white/5 border-sky-500/20' : 'bg-sky-50/50 border-sky-200'
            }`}>
              <div>
                <div className="flex items-center gap-2 mb-3 text-sky-400">
                  <Compass className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    {t.cases.labels.strategy}
                  </span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {currentCase.strategy}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-sky-500/20 text-[11px] font-mono text-sky-400/90 font-medium">
                Arquitectura & Liderazgo de TI
              </div>
            </div>

            {/* 3. Resultados Cuantificables */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
              isDark ? 'bg-white/5 border-emerald-500/20' : 'bg-emerald-50/50 border-emerald-200'
            }`}>
              <div>
                <div className="flex items-center gap-2 mb-3 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    {t.cases.labels.results}
                  </span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {currentCase.results.map((res, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1 shrink-0 font-bold">•</span>
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                        {res}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-500/20 text-[11px] font-mono text-emerald-400/90 font-medium">
                Retorno de Inversión y Eficiencia
              </div>
            </div>

          </div>

          {/* Hard KPIs Bento ribbon */}
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-3">
              {t.cases.labels.kpiBox}:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {currentCase.kpis.map((kpi, kIdx) => (
                <div
                  key={kIdx}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xl sm:text-2xl font-black font-mono text-sky-400 mb-0.5">
                    {kpi.value}
                  </div>
                  <div className="text-[11px] font-mono font-medium text-slate-400">
                    {kpi.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Tags */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mr-2">
              <Tag className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.cases.labels.architecture}:</span>
            </div>
            {currentCase.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold border ${
                  isDark
                    ? 'bg-sky-500/10 border-sky-400/20 text-sky-300'
                    : 'bg-sky-50 border-sky-200 text-sky-800'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

        </SpotlightCard>

      </div>
    </section>
  );
};
