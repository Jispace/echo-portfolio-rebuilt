import React from 'react';
import { motion } from 'motion/react';
import { DURATION, EASE_OUT } from '../../lib/motion-presets';
import { Calendar, ArrowDown, CheckCircle2, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { portfolioProfile } from '../../data/portfolioData';

interface HeroProps {
  onOpenBooking?: (plan?: string) => void;
  onOpenSchedule?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenSchedule }) => {
  return (
    <section id="accueil" className="relative overflow-hidden bg-gradient-to-b from-[#F7F3EB] via-[#FDFBF7] to-[#FDFBF7] pb-14 pt-28 scroll-mt-24 sm:pb-20 sm:pt-32 md:pt-40 md:pb-28">
      {/* Decorative ambient background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-r from-[#EBDBC8]/40 via-[#DFCBB5]/30 to-transparent rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-[#E8DCB8]/30 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Status Eyebrow Badge avec Bouton Vert Actif avant Assistante virtuelle indépendante */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.base, ease: EASE_OUT }}
            className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-xl border border-[#E2DAD0] bg-[#FAF7F2] px-3 py-2 text-[11px] font-medium text-[#5C4D3E] shadow-[0_2px_8px_rgba(62,50,40,0.03)] sm:mb-6 sm:gap-2.5 sm:rounded-full sm:px-4 sm:py-1.5 sm:text-xs"
          >
            <div className="w-5 h-5 rounded-full bg-[#2D241E] text-[#FDFBF7] text-[10px] font-bold flex items-center justify-center shrink-0">
              CR
            </div>
            <span className="text-[#2D241E] font-bold shrink-0">{portfolioProfile.shortName}</span>
            <span className="text-[#C5B7A8] shrink-0">•</span>
            <span className="text-[#5C4D3E] font-medium text-center sm:text-left">
              {portfolioProfile.title}
            </span>
            <span className="hidden sm:inline text-[#C5B7A8]">•</span>
            <span className="hidden sm:inline text-[#6E5D4F]">{portfolioProfile.targetAudience}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: DURATION.slow, ease: EASE_OUT }}
            className="mt-5 text-[2rem] sm:mt-0 sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#2D241E] leading-[1.14] break-words"
          >
            Vous créez, vendez, coachez.{' '}
            <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#7A583E] via-[#9B7352] to-[#B58A63]">
              Je fais tourner le reste.
            </span>
          </motion.h1>

          {/* Subtitle & Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: DURATION.slow, ease: EASE_OUT }}
            className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-[#635345] font-normal leading-relaxed max-w-2xl mx-auto px-1"
          >
            Organisation administrative rigoureuse & Support client écrit d'exception.
            J'apporte de l'ordre, de la sérénité et une attention humaine pour que vous puissiez vous recentrer sur ce qui compte vraiment.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: DURATION.slow, ease: EASE_OUT }}
            className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2 sm:px-0"
          >
            <button
              id="hero-primary-cta"
              type="button"
              onClick={() => onOpenBooking?.()}
              className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-7 py-3 sm:py-3.5 rounded-2xl sm:rounded-full text-xs sm:text-sm font-semibold text-[#FDFBF7] bg-[#2D241E] hover:bg-[#3E3228] shadow-lg shadow-[#2D241E]/20 hover:shadow-xl hover:shadow-[#2D241E]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-center"
            >
              <Calendar className="w-4 h-4 text-[#E0A97E] shrink-0" />
              <span>Réserver mon échange 30 min • Diagnostic gratuit</span>
              <ArrowRight className="w-4 h-4 opacity-80 shrink-0" />
            </button>

            <a
              id="hero-secondary-cta"
              href="#projets"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-[#3D3228] bg-[#FAF7F2] hover:bg-[#F0EAE0] border border-[#DCD3C6] shadow-2xs hover:-translate-y-0.5 transition-all"
            >
              <span>Voir mes cas concrets</span>
              <ArrowDown className="w-4 h-4 text-[#8C7765]" />
            </a>
          </motion.div>

          {/* Key Trust & Performance Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: DURATION.slow, ease: EASE_OUT }}
            className="mt-9 grid grid-cols-1 gap-3 border-t border-[#E8E1D5] pt-6 text-left sm:mt-12 sm:grid-cols-3 sm:gap-4 sm:pt-8"
          >
            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#E7E0D5] shadow-[0_2px_8px_rgba(62,50,40,0.02)]">
              <div className="w-8 h-8 rounded-lg bg-[#EFE8DC] text-[#7A583E] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#2D241E] uppercase tracking-wider">Réactivité garantie</h4>
                <p className="text-xs text-[#635345] mt-0.5">Réponse aux élèves & prospects sous 24h ouvrées</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#E7E0D5] shadow-[0_2px_8px_rgba(62,50,40,0.02)]">
              <div className="w-8 h-8 rounded-lg bg-[#E6ECE3] text-[#3D6B42] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#2D241E] uppercase tracking-wider">Zéro oubli de facturation</h4>
                <p className="text-xs text-[#635345] mt-0.5">Relance sous 48h dès détection d'un retard</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#E7E0D5] shadow-[0_2px_8px_rgba(62,50,40,0.02)]">
              <div className="w-8 h-8 rounded-lg bg-[#EAE8F0] text-[#554C75] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#2D241E] uppercase tracking-wider">Accompagnement humain</h4>
                <p className="text-xs text-[#635345] mt-0.5">Je m'adapte à vos outils et à votre fonctionnement</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
