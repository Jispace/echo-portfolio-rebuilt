import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { competencies, getCalendlyUrl } from '../../data/portfolioData';
import {
  Mail,
  Calendar,
  CheckSquare,
  Users,
  CreditCard,
  MessageSquare,
  ShieldAlert,
  KeyRound,
  Receipt,
  Sparkles,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
}

const ParallaxCard: React.FC<ParallaxCardProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Parallax tilt angles
  const rotateX = useTransform(springY, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-6deg', '6deg']);

  // Parallax sheen position
  const glareX = useTransform(springX, [-0.5, 0.5], ['10%', '90%']);
  const glareY = useTransform(springY, [-0.5, 0.5], ['10%', '90%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative rounded-3xl bg-white/95 backdrop-blur-xl border border-[#E7DFD3] hover:border-[#CDBFA7] shadow-[0_4px_24px_rgba(45,36,30,0.05)] hover:shadow-[0_16px_36px_rgba(45,36,30,0.12)] transition-shadow duration-300 group overflow-hidden ${className}`}
    >
      {/* Dynamic Cursor Sheen / Glare */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(450px circle at ${glareX} ${glareY}, rgba(224, 169, 126, 0.16), transparent 75%)`,
        }}
      />
      <div className="relative z-10 [transform:translateZ(18px)] [transform-style:preserve-3d]">
        {children}
      </div>
    </motion.div>
  );
};

interface BentoGridProps {
  onOpenBooking?: (plan?: string) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="services"
      className="py-14 sm:py-20 md:py-28 bg-[#F7F3EB]/60 border-t border-[#EAE3D8] relative scroll-mt-20 overflow-hidden"
    >
      {/* Decorative background parallax ambient lights */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-[#E8DCB8]/25 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 rounded-full bg-[#EBDBC8]/35 blur-[120px] pointer-events-none" />

      {/* Support dual anchor for navigation */}
      <span id="competences" className="absolute -top-24 left-0" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-9 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E7E0D5] text-xs font-semibold uppercase tracking-wider text-[#7A583E] mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A87C51]" />
            <span>Double Compétence Clé & Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D241E] tracking-tight">
            Organisation administrative & Support client écrit
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#635345] leading-relaxed">
            Un périmètre précis et maîtrisé pour délester les coachs et formateurs de leur charge mentale.
          </p>
        </motion.div>

        {/* Bento Grid 2 Columns + Interactive Parallax */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Bloc 1: Organisation Administrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <ParallaxCard className="p-4 sm:p-9 h-full flex flex-col justify-between">
              <div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2.5 mb-5 sm:mb-6 [transform:translateZ(26px)]">
                  <div className="flex min-w-0 items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl sm:rounded-2xl bg-[#F4EDE2] text-[#7A583E] flex items-center justify-center shadow-2xs ring-1 ring-[#E8DFC8]"
                    >
                      <CheckSquare className="w-5 h-5 text-[#8F6544]" />
                    </motion.div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-xl font-extrabold text-[#2D241E] tracking-tight leading-tight">
                        Organisation Administrative
                      </h3>
                      <p className="text-xs text-[#8A7969] font-medium mt-0.5">
                        Structure, suivi rigoureux & zéro retard
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#111111] text-white border border-[#111111] shrink-0">
                    Essentiel
                  </span>
                </div>

                <div className="space-y-2.5 [transform:translateZ(14px)]">
                  {competencies.administrative.map((item, idx) => {
                    const icons = [Mail, Calendar, CheckSquare, Users, CreditCard];
                    const ItemIcon = icons[idx % icons.length] ?? Mail;
                    return (
                      <motion.div
                        key={item.label}
                        whileHover={{ scale: 1.02, x: 5 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF7F2]/90 border border-[#EBE4D8] hover:border-[#CDBFA7] hover:bg-white flex items-start gap-3 transition-colors shadow-2xs cursor-pointer group/item"
                        onClick={() => onOpenBooking?.('Organisation Administrative')}
                      >
                        <div className="w-7 h-7 rounded-xl bg-white text-[#7A583E] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs border border-[#EAE3D8] group-hover/item:border-[#CDBFA7] group-hover/item:scale-105 transition-all">
                          <ItemIcon className="w-3.5 h-3.5 text-[#8F6544]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-bold text-[#2D241E] block">
                              {item.label}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#A87C51] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                          </div>
                          <span className="text-xs text-[#635345] block mt-0.5 leading-relaxed">
                            {item.detail}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom CTA with Plan Pre-selection */}
              <div className="mt-6 pt-5 border-t border-[#EAE3D8] [transform:translateZ(20px)] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-[#7A695B] w-full sm:w-auto">
                  <span className="font-semibold text-[#2D241E]">Fiabilité & discrétion</span>
                  <span className="text-[#8F6544] font-medium"> • Procédures documentées</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => onOpenBooking?.('Organisation Administrative')}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#2D241E] hover:bg-[#3E3228] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <span>Choisir ce plan</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E0A97E]" />
                  </button>
                  <a
                    href={getCalendlyUrl('Organisation Administrative')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Ouvrir sur Calendly avec le plan Organisation Administrative"
                    className="p-2.5 rounded-full bg-[#FAF7F2] border border-[#E8DFC8] hover:bg-[#F2ECE2] text-[#7A583E] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </ParallaxCard>
          </motion.div>

          {/* Bloc 2: Support Client Écrit */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            <ParallaxCard className="p-4 sm:p-9 h-full flex flex-col justify-between">
              <div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2.5 mb-5 sm:mb-6 [transform:translateZ(26px)]">
                  <div className="flex min-w-0 items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl sm:rounded-2xl bg-[#F4EDE2] text-[#7A583E] flex items-center justify-center shadow-2xs ring-1 ring-[#E8DFC8]"
                    >
                      <MessageSquare className="w-5 h-5 text-[#8F6544]" />
                    </motion.div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-xl font-extrabold text-[#2D241E] tracking-tight leading-tight">
                        Support Client Écrit
                      </h3>
                      <p className="text-xs text-[#8A7969] font-medium mt-0.5">
                        Bienveillance, réactivité & désescalade
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#111111] text-white border border-[#111111] shrink-0">
                    Premium
                  </span>
                </div>

                <div className="space-y-2.5 [transform:translateZ(14px)]">
                  {competencies.clientSupport.map((item, idx) => {
                    const icons = [MessageSquare, ShieldAlert, KeyRound, Receipt];
                    const ItemIcon = icons[idx % icons.length] ?? MessageSquare;
                    return (
                      <motion.div
                        key={item.label}
                        whileHover={{ scale: 1.02, x: 5 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF7F2]/90 border border-[#EBE4D8] hover:border-[#CDBFA7] hover:bg-white flex items-start gap-3 transition-colors shadow-2xs cursor-pointer group/item"
                        onClick={() => onOpenBooking?.('Support Client Écrit')}
                      >
                        <div className="w-7 h-7 rounded-xl bg-white text-[#7A583E] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs border border-[#EAE3D8] group-hover/item:border-[#CDBFA7] group-hover/item:scale-105 transition-all">
                          <ItemIcon className="w-3.5 h-3.5 text-[#8F6544]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-bold text-[#2D241E] block">
                              {item.label}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#A87C51] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                          </div>
                          <span className="text-xs text-[#635345] block mt-0.5 leading-relaxed">
                            {item.detail}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Engagement highlight */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-4 rounded-2xl bg-[#F7F2E8] border border-[#DDD1C0] mt-4 shadow-2xs [transform:translateZ(18px)]"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#A87C51]" />
                    <span className="text-xs font-extrabold text-[#2D241E]">
                      Règle d'or : Réponse garantie sous 24h ouvrées
                    </span>
                  </div>
                  <p className="text-xs text-[#635345] leading-relaxed">
                    Vos élèves et prospects ne sont jamais laissés sans réponse : ils se sentent pris en charge immédiatement avec empathie et clarté.
                  </p>
                </motion.div>
              </div>

              {/* Bottom CTA with Plan Pre-selection */}
              <div className="mt-6 pt-5 border-t border-[#EAE3D8] [transform:translateZ(20px)] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-[#7A695B] w-full sm:w-auto">
                  <span className="font-semibold text-[#2D241E]">Satisfaction élève</span>
                  <span className="text-[#8F6544] font-medium"> • Zéro conflit escaladé</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => onOpenBooking?.('Support Client Écrit')}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#2D241E] hover:bg-[#3E3228] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <span>Choisir ce plan</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E0A97E]" />
                  </button>
                  <a
                    href={getCalendlyUrl('Support Client Écrit')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Ouvrir sur Calendly avec le plan Support Client Écrit"
                    className="p-2.5 rounded-full bg-[#FAF7F2] border border-[#E8DFC8] hover:bg-[#F2ECE2] text-[#7A583E] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </ParallaxCard>
          </motion.div>
        </div>

        {/* Bento Footer Banner: 3 Micro-engagements */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4"
        >
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="p-4 rounded-2xl bg-white/90 border border-[#E7DFD3] shadow-2xs flex items-center gap-3 hover:border-[#CDBFA7] transition-all cursor-default"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#7A583E] flex items-center justify-center shrink-0 border border-[#EAE3D8]">
              <Clock className="w-4 h-4 text-[#8F6544]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#2D241E] block">SLA &lt; 24h ouvrées</span>
              <span className="text-[11px] text-[#7A695B]">Prise en charge quotidienne</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="p-4 rounded-2xl bg-white/90 border border-[#E7DFD3] shadow-2xs flex items-center gap-3 hover:border-[#CDBFA7] transition-all cursor-default"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#7A583E] flex items-center justify-center shrink-0 border border-[#EAE3D8]">
              <CheckCircle2 className="w-4 h-4 text-[#8F6544]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#2D241E] block">100% Écrit & Traçable</span>
              <span className="text-[11px] text-[#7A695B]">Zéro interruption téléphonique</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="p-4 rounded-2xl bg-white/90 border border-[#E7DFD3] shadow-2xs flex items-center gap-3 hover:border-[#CDBFA7] transition-all cursor-default"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#7A583E] flex items-center justify-center shrink-0 border border-[#EAE3D8]">
              <ShieldCheck className="w-4 h-4 text-[#8F6544]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#2D241E] block">Sécurité & Confidentialité</span>
              <span className="text-[11px] text-[#7A695B]">Accès protégés & discrétion absolue</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
