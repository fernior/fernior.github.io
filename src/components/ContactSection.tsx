import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { SpotlightCard } from './SpotlightCard';
import { LinkedinIcon } from './Icons';
import { 
  MessageSquare, 
  Mail, 
  Award, 
  MapPin, 
  ArrowUpRight, 
  Sparkles,
  Copy,
  ExternalLink
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedTopic, setSelectedTopic] = useState<string>(t.contact.interactiveCard.topics[0]);
  const [senderName, setSenderName] = useState<string>('');
  const [senderCompany, setSenderCompany] = useState<string>('');
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const phone = '+52 55 2297 3001';
  const email = 'fernior@gmail.com';

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const generateMessageText = () => {
    if (language === 'en') {
      return `Hello Fernando. My name is ${senderName || '[Name]'} from ${senderCompany || '[Organization]'}. I am reaching out regarding: "${selectedTopic}". I would like to schedule an executive conversation with you.`;
    }
    return `Hola Fernando. Mi nombre es ${senderName || '[Nombre]'} de ${senderCompany || '[Organización]'}. Me comunico respecto a: "${selectedTopic}". Me gustaría coordinar una conversación ejecutiva contigo.`;
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(generateMessageText());
    window.open(`https://wa.me/525522973001?text=${text}`, '_blank');
  };

  const openEmail = () => {
    const subject = encodeURIComponent(`Contacto Ejecutivo: ${selectedTopic}`);
    const body = encodeURIComponent(generateMessageText());
    window.location.href = `mailto:fernior@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 relative">
      {/* Background radial glow */}
      <div 
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full opacity-20 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-3 border border-sky-400/30 bg-sky-500/10 text-sky-400">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            {t.contact.sectionBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className={isDark ? 'text-white' : 'text-slate-900'}>
              {t.contact.sectionTitle}
            </span>
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl font-normal ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t.contact.sectionSubtitle}
          </p>
        </div>

        {/* Main Grid: Contact Channels + Interactive Message Composer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Executive Channels */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Quick Pitch Card */}
            <SpotlightCard className="p-6">
              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Canales Directos de Comunicación
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Respuesta ágil a directores generales, miembros de consejo, directores de talento y reclutadores C-Level.
              </p>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{t.contact.location}</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                
                {/* WhatsApp */}
                <a
                  href="https://wa.me/525522973001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-400 transition-all font-semibold text-xs sm:text-sm group"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>{t.contact.ctaWhatsApp}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Email */}
                <a
                  href="mailto:fernior@gmail.com"
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-300 hover:bg-sky-500/25 hover:border-sky-400 transition-all font-semibold text-xs sm:text-sm group"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-sky-400" />
                    <span>{t.contact.ctaEmail}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/fernior"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 hover:bg-blue-500/25 hover:border-blue-400 transition-all font-semibold text-xs sm:text-sm group"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon className="w-4 h-4 text-blue-400" />
                    <span>{t.contact.ctaLinkedIn}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Credly */}
                <a
                  href="https://credly.com/users/fernando-junior-hernandez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 hover:border-amber-400 transition-all font-semibold text-xs sm:text-sm group"
                >
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>{t.contact.ctaCredly}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

              </div>
            </SpotlightCard>

            {/* Direct Copy Snippets */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopyPhone}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isDark ? 'bg-white/5 border-white/8 hover:border-sky-400/30' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-sky-400">Teléfono / WhatsApp</span>
                  <Copy className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs font-mono font-bold truncate">
                  {copiedPhone ? '¡Copiado!' : phone}
                </div>
              </button>

              <button
                onClick={handleCopyEmail}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isDark ? 'bg-white/5 border-white/8 hover:border-sky-400/30' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-sky-400">Correo Directo</span>
                  <Copy className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs font-mono font-bold truncate">
                  {copiedEmail ? '¡Copiado!' : email}
                </div>
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Executive Message Composer */}
          <div className="lg:col-span-7">
            <SpotlightCard className="p-6 sm:p-8 border border-sky-400/30">
              
              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {t.contact.interactiveCard.title}
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {t.contact.interactiveCard.subtitle}
                  </p>
                </div>
              </div>

              {/* Topic Selector */}
              <div className="my-6">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-sky-400 mb-2">
                  {t.contact.interactiveCard.placeholder}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {t.contact.interactiveCard.topics.map((topic) => {
                    const isSelected = selectedTopic === topic;
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setSelectedTopic(topic)}
                        className={`p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-semibold shadow-sm'
                            : isDark
                            ? 'bg-white/5 border-white/8 text-slate-300 hover:bg-white/10'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {topic}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Inputs: Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold mb-1">
                    Tu Nombre / Posición
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Ej. Lic. Carlos Méndez (CEO)"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold mb-1">
                    Empresa u Organización
                  </label>
                  <input
                    type="text"
                    value={senderCompany}
                    onChange={(e) => setSenderCompany(e.target.value)}
                    placeholder="Ej. Grupo Financiero / Corporativo"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>

              {/* Message Live Preview */}
              <div className="mb-6">
                <span className="block text-[11px] font-mono uppercase text-slate-400 font-semibold mb-1.5">
                  Vista Previa del Mensaje Estructurado:
                </span>
                <div className={`p-4 rounded-xl border text-xs sm:text-sm font-mono leading-relaxed ${
                  isDark ? 'bg-black/40 border-white/8 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}>
                  "{generateMessageText()}"
                </div>
              </div>

              {/* Send CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.contact.interactiveCard.btnSendWhatsApp}</span>
                </button>

                <button
                  type="button"
                  onClick={openEmail}
                  className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide text-white bg-sky-600 hover:bg-sky-500 transition-colors shadow-lg shadow-sky-500/20 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>{t.contact.interactiveCard.btnSendEmail}</span>
                </button>
              </div>

            </SpotlightCard>
          </div>

        </div>

      </div>
    </section>
  );
};
