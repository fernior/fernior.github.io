import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { LinkedinIcon } from './Icons';
import { 
  ArrowUp, 
  Award, 
  Mail, 
  MessageSquare
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t transition-colors ${
      isDark ? 'bg-[#05080F] border-white/8 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      {/* Top CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`p-8 sm:p-12 rounded-3xl border relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 ${
          isDark 
            ? 'bg-gradient-to-r from-[#0D1527] via-[#09101E] to-[#0A162B] border-white/10 shadow-2xl'
            : 'bg-white border-slate-200 shadow-lg'
        }`}>
          {/* Subtle glow accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl text-center md:text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 block mb-2">
              Liderazgo & Dirección de Tecnología
            </span>
            <h3 className={`text-2xl sm:text-3xl font-black tracking-tight mb-3 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              ¿Listo para escalar la infraestructura, ciberseguridad e innovación de tu organización?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {t.footer.tagline}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="https://wa.me/525522973001"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 text-slate-950 font-bold text-xs sm:text-sm text-center shadow-lg shadow-sky-500/20 hover:from-sky-300 hover:to-cyan-200 transition-all"
            >
              Iniciar Conversación
            </a>
            <a
              href="mailto:fernior@gmail.com"
              className={`w-full sm:w-auto px-6 py-3.5 rounded-xl border font-semibold text-xs sm:text-sm text-center transition-all ${
                isDark ? 'border-white/10 bg-white/5 text-white hover:bg-white/10' : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              fernior@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/8">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center font-mono font-bold text-sky-400 text-xs">
              FJH
            </div>
            <div className="text-left">
              <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Fernando Junior Hernández
              </div>
              <div className="text-[11px] font-mono text-sky-400">
                CIO / CTO · Misión Crítica, ERP e IA
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/525522973001"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Direct"
              className={`p-2.5 rounded-xl border transition-colors ${
                isDark ? 'border-white/10 bg-white/5 text-slate-400 hover:text-emerald-400 hover:border-emerald-400/40' : 'border-slate-200 bg-white text-slate-600 hover:text-emerald-600'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a
              href="mailto:fernior@gmail.com"
              aria-label="Direct Email"
              className={`p-2.5 rounded-xl border transition-colors ${
                isDark ? 'border-white/10 bg-white/5 text-slate-400 hover:text-sky-400 hover:border-sky-400/40' : 'border-slate-200 bg-white text-slate-600 hover:text-sky-600'
              }`}
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/fernior"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`p-2.5 rounded-xl border transition-colors ${
                isDark ? 'border-white/10 bg-white/5 text-slate-400 hover:text-sky-400 hover:border-sky-400/40' : 'border-slate-200 bg-white text-slate-600 hover:text-sky-600'
              }`}
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://credly.com/users/fernando-junior-hernandez"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Credly"
              className={`p-2.5 rounded-xl border transition-colors ${
                isDark ? 'border-white/10 bg-white/5 text-slate-400 hover:text-amber-400 hover:border-amber-400/40' : 'border-slate-200 bg-white text-slate-600 hover:text-amber-600'
              }`}
            >
              <Award className="w-4 h-4" />
            </a>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className={`p-2.5 rounded-xl border ml-2 transition-colors cursor-pointer ${
                isDark ? 'border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/20' : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
          <span>{t.footer.rights}</span>
          <span>{t.footer.strictRule}</span>
        </div>
      </div>
    </footer>
  );
};
