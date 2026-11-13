import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  FileText, 
  Printer, 
  Download, 
  Copy, 
  Check
} from 'lucide-react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'visual' | 'ats'>('visual');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const atsContent = `FERNANDO JUNIOR HERNÁNDEZ
Director de Tecnologías de la Información (CIO / CTO) | Infraestructura, Ciberseguridad, Transformación Digital y ERP
Ciudad de México, CDMX (Disponibilidad para viajar) | Tel: +52 55 2297 3001 | Email: fernior@gmail.com
LinkedIn: linkedin.com/in/fernior | Credly: credly.com/users/fernando-junior-hernandez | Idiomas: Español (Nativo), Inglés (B2+ Avanzado)

PERFIL EJECUTIVO
Director de Tecnologías de la Información (CIO / CTO) con más de 15 años de trayectoria en posiciones de Dirección y Gerencia Senior de TI, liderando la estrategia tecnológica nacional, infraestructura corporativa de misión crítica, redes, ciberseguridad y transformación digital en el sector farmacéutico, servicios financieros regulados (CNBV) y empresas multinacionales. Sólida experiencia en arquitectura de software, gobierno de datos y gestión de sistemas ERP corporativos (implementación de ERP Intelisis y gestión de arquitecturas homologables a SAP y Oracle), así como adopción de Cloud Computing, Business Intelligence (BI) e Inteligencia Artificial. Experto en Gobierno de TI (ITIL, COBIT, Scrum, SAFe, PMI), administración financiera de CAPEX y OPEX, negociación de contratos tecnológicos, licenciamiento, niveles de servicio (SLAs) y continuidad operativa (BCP y DRP). Liderazgo transformacional y toma de decisiones estratégicas al frente de equipos multidisciplinarios de más de 100 colaboradores.

COMPETENCIAS CLAVE
* Gestión Integral de TI y Gobierno: Infraestructura Corporativa, Redes y Telecomunicaciones, Ciberseguridad, Soporte Técnico (Service Desk / ITSM GLPI), Gobierno de TI (ITIL, COBIT), Metodologías Ágiles (Scrum, SAFe, PMI), KPIs y SLAs.
* Finanzas de TI y Proveedores: Control presupuestal de CAPEX y OPEX, licitaciones (RFP), negociación de contratos, optimización de licenciamiento y maximización de ROI.
* Sistemas Corporativos (ERP), Datos e IA: Arquitectura de software, ERP Intelisis (homologable a SAP/Oracle), CRM, Cloud Computing (Azure, AWS, Red Hat OpenShift), Inteligencia Artificial Generativa y Agéntica.
* Ciberseguridad y Cumplimiento Normativo: Planes BCP/DRP, seguridad perimetral (FortiGate / FortiAnalyzer), operación de SOC y NOC 24/7, protección de datos personales (LGPDP) y auditorías CNBV y sector salud.
* Liderazgo Ejecutivo: Orientación a resultados, gestión de equipos técnicos multidisciplinarios (+100 personas) y alineación con Dirección General y Consejo.

EXPERIENCIA PROFESIONAL

Gerente de Sistemas y Director de Tecnología (CTO) | OFINSA, Operadora de Fondos Nafinsa, S.A. de C.V. (Junio 2026 : Actual)
Sector Financiero Regulado por CNBV, Ciudad de México
* Cumplimiento Normativo (CNBV) y Continuidad (BCP/DRP): Dirijo la estrategia global de TI, prevención de fuga de datos y riesgos informáticos bajo CNBV, liderando auditorías, BCP/DRP y seguridad perimetral FortiGate.
* Infraestructura Core y Cloud: Lidero migración a Microsoft 365, actualización de Active Directory a Windows Server 2025 y monitoreo proactivo con PRTG.
* Control Financiero (CAPEX/OPEX) y Gobierno: Reestructuración mediante ITIL e ITSM GLPI, administrando presupuestos y optimizando contratos tecnológicos.
* Gobernanza de IA y Automatización: Diseñé la Política Corporativa de IA POL-019 con capacitación en 2 niveles; plataformas de identidad multibiométrica y flujos con n8n, PostgreSQL y Qdrant.

Director de Infraestructura y Tecnología Aplicada | Instituto Nacional Electoral (INE) (Marzo 2025 : Mayo 2026)
Organismo Constitucional Autónomo, Ciudad de México
* Dirección de Equipos e Infraestructura Nacional: Lideré estructura de más de 100 ingenieros en 6 subdirecciones técnicas, asegurando disponibilidad para más de 100 millones de registros.
* Ciberseguridad y Auditorías: Supervisión continua 24/7 de SOC y NOC, protocolos DRP y resguardo de datos (LGPDP) ante auditorías de control interno.
* Gestión Presupuestal y SLAs: Control financiero de CAPEX/OPEX y cumplimiento riguroso de SLAs con proveedores de tecnología.
* Modernización Cloud Híbrido: Migración hacia microservicios en Red Hat OpenShift con Ansible, observabilidad Datadog y pilotos AWS Bedrock.

IT Senior Regional Manager | MetLife México (Junio 2022 : Febrero 2025)
Sector Asegurador Multinacional, Ciudad de México
* Transformación Digital: Lideré el programa regional Aura Next en Azure, pipelines CI/CD e IA, reduciendo tiempos de suscripción de 4 días a 30 minutos (-95%).
* Licitaciones y Contratos: Conduje procesos de RFP corporativos de extremo a extremo, evaluando proveedores y negociando alcances, costos y SLAs.
* Gobierno de TI e Infraestructura como Código: Implementé ITIL y estandaricé aprovisionamiento en Azure con Terraform.
* Arquitectura y Sistemas Core: Gobernanza en el ciclo SDLC e integración entre sistemas legados (AS400) y nubes modernas.

Gerente de Tecnología / CTO | Grupo Lefarma (Octubre 2021 : Junio 2022)
Sector Farmacéutico y Salud, Ciudad de México
* ERP Intelisis y Transformación Digital: Implementación de ERP Intelisis en 3 empresas y CRM en 2 unidades de negocio; estandarización de inventarios y finanzas.
* Infraestructura Multi-Sitio: Continuidad operativa para 4 clínicas, 1 laboratorio, 1 corporativo y 1 división de licitaciones; metodología BRD.
* Optimización de Telecomunicaciones: Renegociación con proveedores cuadruplicando el ancho de banda (25 a 100 Mbps) a $0 OPEX adicional.

Gerente Senior de Tecnología | Alsea (Domino's Pizza & Starbucks México) (Julio 2014 : Octubre 2021)
Retail y Alimentos Multinacional, Ciudad de México
* Misión Crítica Cloud: Arquitectura en Microsoft Azure soportando transacciones con ventas de más de $40 MDP semanales con alta disponibilidad.
* Comercio Digital: Crecimiento de ventas digitales en Domino's Pizza del 12% al 30% a nivel nacional.
* Innovación Multinacional: Concebí y dirigí la plataforma 'Enlace' (México, España, Argentina y Chile), galardonada con 2 premios por Innovation Week Magazine (2015 y 2017).

EDUCACIÓN ACADÉMICA
* Maestría en Gestión de Innovación en TIC: INFOTEC (CONACYT) | 2016 : 2018 | Titulado con Cédula Profesional 12756886.
* Licenciatura en Ciencias de la Informática: IPN (UPIICSA) | 2004 : 2008 | Titulado con Cédula Profesional 8842389.

CERTIFICACIONES Y FORMACIÓN EJECUTIVA
* Certified SAFe 5 Practitioner & Certified SAFe 5 Scrum Master (Scaled Agile)
* Google Project Management Professional Certificate (PMI Aligned)
* Microsoft Certified: Azure Fundamentals (AZ-900)
* SCRUM Product Owner Professional & Microservices Certified Developer
* Artificial Intelligence & Data Science for Leaders (The University of Chicago)
* Diplomado en Ciberseguridad Estratégica con IA (CISO Club, 2025)
* Diplomado IA: Productos Digitales, Agentes y Análisis de Datos (CENTRO, 2026)
* Diplomado en Administración de Proyectos (PMP / PMI en ITESM)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(atsContent);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadATS = () => {
    const blob = new Blob([atsContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Fernando_Junior_Hernandez_CV_ATS.txt';
    link.click();
    URL.revokeObjectURL(url);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      {/* Modal Container */}
      <div className={`relative w-full max-w-4xl max-h-[92vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden my-auto ${
        isDark ? 'bg-[#0A101D] border-white/12 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
      }`}>
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base sm:text-lg font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t.cvModal.title}
              </h2>
              <p className="text-xs font-mono text-sky-400">
                {t.cvModal.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab & Action Toolbar */}
        <div className={`flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b shrink-0 ${
          isDark ? 'bg-white/5 border-white/8' : 'bg-slate-50 border-slate-200'
        }`}>
          {/* Tab buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                activeTab === 'visual'
                  ? 'bg-sky-500 text-slate-950 border-sky-400 font-bold shadow-sm'
                  : 'bg-white/5 text-slate-400 border-transparent hover:text-white'
              }`}
            >
              {t.cvModal.tabVisual}
            </button>
            <button
              onClick={() => setActiveTab('ats')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                activeTab === 'ats'
                  ? 'bg-sky-500 text-slate-950 border-sky-400 font-bold shadow-sm'
                  : 'bg-white/5 text-slate-400 border-transparent hover:text-white'
              }`}
            >
              {t.cvModal.tabATS}
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {activeTab === 'ats' ? (
              <>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-sky-400" />}
                  <span>{copied ? '¡Copiado!' : 'Copiar Texto'}</span>
                </button>
                <button
                  onClick={handleDownloadATS}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar .txt</span>
                </button>
              </>
            ) : (
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all cursor-pointer shadow-md shadow-sky-500/20"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t.cvModal.btnPrint}</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 font-sans text-xs sm:text-sm">
          {activeTab === 'ats' ? (
            <div className={`p-4 rounded-xl border font-mono text-xs whitespace-pre-wrap leading-relaxed ${
              isDark ? 'bg-black/50 border-white/8 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              {atsContent}
            </div>
          ) : (
            /* Visual Executive Styled CV Layout */
            <div className="space-y-8 max-w-3xl mx-auto py-2">
              
              {/* Executive Header */}
              <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-sky-400 tracking-tight">
                    FERNANDO JUNIOR HERNÁNDEZ
                  </h1>
                  <p className="text-sm font-bold font-mono uppercase tracking-wide text-white mt-1">
                    Director de Tecnologías e Información (CIO / CTO)
                  </p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Infraestructura, Ciberseguridad, Transformación Digital y ERP
                  </p>
                </div>
                <div className="text-left sm:text-right text-xs font-mono text-slate-400 space-y-1">
                  <div>CDMX, México · Tel: +52 55 2297 3001</div>
                  <div>Email: fernior@gmail.com</div>
                  <div>LinkedIn: linkedin.com/in/fernior</div>
                  <div>Idiomas: Español (Nativo), Inglés (B2+ Avanzado)</div>
                </div>
              </div>

              {/* Perfil */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 border-b border-sky-400/30 pb-1 mb-2">
                  Perfil Ejecutivo
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                  Director de Tecnologías de la Información (CIO / CTO) con más de 15 años de trayectoria en posiciones de Dirección y Gerencia Senior de TI, liderando la estrategia tecnológica nacional, infraestructura corporativa de misión crítica, redes, ciberseguridad y transformación digital en el sector farmacéutico, servicios financieros regulados (CNBV) y empresas multinacionales. Sólida experiencia en arquitectura de software, gobierno de datos y gestión de sistemas ERP corporativos (implementación de ERP Intelisis y entornos equivalentes a SAP y Oracle), Cloud Computing, BI e IA. Experto en Gobierno de TI (ITIL, COBIT, Scrum, SAFe, PMI), administración presupuestal de CAPEX y OPEX, negociación de contratos tecnológicos y continuidad operativa (BCP y DRP). Liderazgo transformacional de equipos técnicos de más de 100 colaboradores.
                </p>
              </div>

              {/* Trayectoria */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 border-b border-sky-400/30 pb-1 mb-4">
                  Experiencia Profesional Destacada
                </h3>
                
                <div className="space-y-6">
                  {/* Job 1 */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-between font-bold text-sm text-white">
                      <span>Gerente de Sistemas y Director de Tecnología (CTO)</span>
                      <span className="text-xs font-mono text-sky-400">Junio 2026 : Actual</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-400">
                      OFINSA, Operadora de Fondos Nafinsa, S.A. de C.V. (Sector Financiero Regulado por CNBV)
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1">
                      <li>Cumplimiento Normativo (CNBV), Ciberseguridad y Continuidad (BCP/DRP): estrategia global de TI, auditorías y seguridad perimetral FortiGate.</li>
                      <li>Disponibilidad de Infraestructura Core: migración a Microsoft 365, actualización de Active Directory a Windows Server 2025 y monitoreo con PRTG.</li>
                      <li>Control Financiero y Gobierno: reestructuración del área mediante ITIL e ITSM con GLPI; administración presupuestal de CAPEX y OPEX.</li>
                      <li>Gobernanza de IA (POL-019): diseño de la Política Corporativa y capacitación en dos niveles; plataformas de identidad multibiométrica y flujos con n8n, PostgreSQL y Qdrant.</li>
                    </ul>
                  </div>

                  {/* Job 2 */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-between font-bold text-sm text-white">
                      <span>Director de Infraestructura y Tecnología Aplicada</span>
                      <span className="text-xs font-mono text-sky-400">Marzo 2025 : Mayo 2026</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-400">
                      Instituto Nacional Electoral (INE) · Misión Crítica Nacional
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1">
                      <li>Dirección de Equipos e Infraestructura Nacional: lideré estructura de más de 100 ingenieros en 6 subdirecciones técnicas para proteger +100M de registros.</li>
                      <li>Ciberseguridad y DRP: supervisión 24/7 de SOC y NOC con cumplimiento riguroso de protección de datos personales (LGPDP).</li>
                      <li>Modernización Tecnológica: migración hacia microservicios en Red Hat OpenShift con Ansible, observabilidad con Datadog y pilotos AWS Bedrock.</li>
                    </ul>
                  </div>

                  {/* Job 3 */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-between font-bold text-sm text-white">
                      <span>IT Senior Regional Manager</span>
                      <span className="text-xs font-mono text-sky-400">Junio 2022 : Febrero 2025</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-400">
                      MetLife México · Sector Asegurador Multinacional
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1">
                      <li>Estrategia de Transformación Digital: programa regional Aura Next en Azure, reduciendo tiempos de suscripción de 4 días a 30 minutos (-95%).</li>
                      <li>Negociación de RFPs Corporativos: liderazgo en evaluación y selección de proveedores de plataformas y servicios de implementación.</li>
                      <li>Gobierno de TI e IaC: marco ITIL y estandarización de aprovisionamiento en Azure mediante Terraform.</li>
                    </ul>
                  </div>

                  {/* Job 4 */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-between font-bold text-sm text-white">
                      <span>Gerente de Tecnología / CTO</span>
                      <span className="text-xs font-mono text-sky-400">Octubre 2021 : Junio 2022</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-400">
                      Grupo Lefarma · Sector Farmacéutico y Salud
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1">
                      <li>Implementación de ERP Intelisis para 3 empresas y CRM para 2 unidades comerciales del grupo farmacéutico.</li>
                      <li>Operación de infraestructura multi-sitio (4 clínicas, 1 laboratorio, 1 corporativo y 1 división de licitaciones públicas).</li>
                      <li>Renegociación estratégica de telecomunicaciones cuadruplicando el ancho de banda (25 a 100 Mbps) a $0 OPEX.</li>
                    </ul>
                  </div>

                  {/* Job 5 */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-between font-bold text-sm text-white">
                      <span>Gerente Senior de Tecnología</span>
                      <span className="text-xs font-mono text-sky-400">Julio 2014 : Octubre 2021</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-400">
                      Alsea (Domino's Pizza & Starbucks México)
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1">
                      <li>Infraestructura Cloud de Misión Crítica: arquitectura en Azure soportando ventas de más de $40 MDP semanales con alta disponibilidad.</li>
                      <li>Estrategia Digital: incremento en participación de ventas digitales en Domino's del 12% al 30% a nivel nacional.</li>
                      <li>Plataforma 'Enlace': supervisión y BI multinacional galardonada con 2 premios de innovación por Innovation Week Magazine.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Educación y Certificaciones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 border-b border-sky-400/30 pb-1 mb-2">
                    Educación Académica (SEP)
                  </h3>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div>
                      <div className="font-bold text-white">Maestría en Gestión de Innovación en TIC</div>
                      <div className="text-slate-400">INFOTEC (CONACYT) · Cédula: 12756886</div>
                    </div>
                    <div>
                      <div className="font-bold text-white">Licenciatura en Ciencias de la Informática</div>
                      <div className="text-slate-400">IPN (UPIICSA) · Cédula: 8842389</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 border-b border-sky-400/30 pb-1 mb-2">
                    Certificaciones Clave
                  </h3>
                  <div className="space-y-1 text-xs text-slate-300">
                    <div>• Certified SAFe® 5 Practitioner & Scrum Master</div>
                    <div>• Google Project Management Specialization (PMI)</div>
                    <div>• Microsoft Certified: Azure Fundamentals (AZ-900)</div>
                    <div>• Gobernanza de IA y Gestión de Agentes (2026)</div>
                    <div>• Univ. of Chicago: AI & Data Science for Leaders</div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
