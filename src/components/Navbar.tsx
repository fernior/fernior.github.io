import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { 
  FileText, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Globe, 
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  onOpenCVModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCVModal }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.impact, href: '#impact' },
    { label: t.nav.pillars, href: '#pillars' },
    { label: t.nav.cases, href: '#cases' },
    { label: t.nav.trajectory, href: '#trajectory' },
    { label: t.nav.credentials, href: '#credentials' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDark = theme === 'dark';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#070B14]/85 backdrop-blur-xl border-b border-white/8 shadow-2xl shadow-sky-950/20 py-3.5'
            : 'bg-white/85 backdrop-blur-xl border-b border-slate-200/90 shadow-md py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Tipográfico */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#root')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400 p-[1.5px] shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-shadow">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center font-bold tracking-tight text-xs font-mono transition-colors ${
                isDark ? 'bg-[#070B14] text-sky-400' : 'bg-white text-sky-600'
              }`}>
                FJH
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold tracking-tight text-sm sm:text-base flex items-center gap-1.5 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Fernando Junior <span className="text-sky-400">·</span> <span className="text-xs uppercase tracking-wider font-mono text-sky-400 font-semibold">{t.nav.role}</span>
              </span>
              <span className={`text-[10px] tracking-wider uppercase font-medium hidden sm:block ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Executive Technology Leader
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 ${
                  isDark
                    ? 'text-slate-300 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Tools: Lang Switch + Theme Toggle + Download CV */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border ${
                isDark
                  ? 'border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-sky-400/40 hover:bg-white/10'
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-900 hover:border-sky-500/50'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>{language.toUpperCase()}</span>
              <span className="text-[10px] opacity-40">|</span>
              <span className="text-[10px] opacity-60">{language === 'es' ? 'EN' : 'ES'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`p-2 rounded-lg text-xs transition-all border ${
                isDark
                  ? 'border-white/10 bg-white/5 text-slate-300 hover:text-amber-400 hover:border-amber-400/40 hover:bg-white/10'
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-sky-600 hover:border-sky-500/50'
              }`}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Download Executive CV Button */}
            <button
              onClick={onOpenCVModal}
              className="relative group overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-md shadow-sky-500/10 hover:shadow-sky-500/25 transition-all"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 rounded-xl transition-all duration-300 group-hover:opacity-90" />
              <span className="relative flex items-center gap-2 px-3.5 py-2 rounded-[11px] bg-[#070B14] text-white text-xs font-semibold tracking-wide transition-all duration-200 group-hover:bg-[#070B14]/85">
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                <span>{t.nav.downloadCV}</span>
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className={`p-1.5 rounded-lg text-xs font-mono font-semibold border ${
                isDark ? 'border-white/10 bg-white/5 text-sky-400' : 'border-slate-200 bg-slate-100 text-sky-600'
              }`}
            >
              {language.toUpperCase()}
            </button>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`p-1.5 rounded-lg text-xs border ${
                isDark ? 'border-white/10 bg-white/5 text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-700'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className={`p-2 rounded-lg border ${
                isDark ? 'border-white/10 bg-white/5 text-white' : 'border-slate-200 bg-slate-100 text-slate-900'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 py-5 shadow-2xl transition-all ${
          isDark ? 'bg-[#070B14]/98 border-white/10 text-white' : 'bg-white/98 border-slate-200 text-slate-900'
        }`}>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isDark
                    ? 'hover:bg-white/5 text-slate-200'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-sky-400 opacity-60" />
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 mt-1 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCVModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-semibold text-sm shadow-lg shadow-sky-500/20"
              >
                <FileText className="w-4 h-4" />
                <span>{t.nav.downloadCV}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
