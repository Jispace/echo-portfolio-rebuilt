import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, CheckCircle2, Globe2, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { portfolioProfile, candyaSchedule, getCalendlyUrl } from '../../data/portfolioData';
import { useScrollLock } from '../../hooks/use-scroll-lock';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking?: (plan?: string) => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, onOpenBooking }) => {
  useScrollLock(isOpen);
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden sm:items-center sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 340 }}
            role="dialog"
            aria-modal="true"
            aria-label="Disponibilités et horaires"
            className="relative z-10 max-h-[100dvh] w-full overflow-y-auto overscroll-contain rounded-t-2xl border border-[#E7DFD5] bg-[#FAF8F5] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-[#2D241E] shadow-2xl sm:my-auto sm:max-h-[92vh] sm:max-w-lg sm:rounded-3xl sm:p-8"
          >
            {/* Ambient subtle glow */}
            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-emerald-200/30 blur-2xl pointer-events-none" />

            {/* Close button */}
            <button
              id="close-schedule-modal-btn"
              type="button"
              onClick={onClose}
              className="sticky top-0 z-20 float-right grid h-10 w-10 place-items-center rounded-full bg-[#FAF8F5]/95 text-[#7A6C5E] shadow-sm backdrop-blur-sm hover:text-[#2C2723] hover:bg-[#EFE9E0] transition-colors cursor-pointer sm:absolute sm:top-5 sm:right-5"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with active green pulse */}
            <div className="clear-both flex items-start gap-2 pr-1 mb-3 sm:clear-none sm:pr-10">
              <span className="inline-flex max-w-full items-start gap-1.5 px-3 py-1 rounded-xl sm:rounded-full bg-emerald-100/80 border border-emerald-300/80 text-emerald-800 text-[11px] sm:text-xs font-bold shadow-2xs">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]"></span>
                </span>
                <span>Active & Disponible pour de nouvelles missions</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2D241E] tracking-tight">
              Créneaux d'activité & Disponibilités
            </h3>
            <p className="text-xs sm:text-sm text-[#635345] mt-1 leading-relaxed">
              Consultez les plages horaires hebdomadaires réservées aux échanges, diagnostics et appels découverte.
            </p>

            {/* Timezone badge */}
            <div className="mt-4 p-3 rounded-2xl bg-white border border-[#E8DFC8] grid grid-cols-1 gap-2 sm:flex sm:items-center sm:justify-between text-xs text-[#5C4D3E]">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#8F6544]" />
                <span className="font-semibold">Fuseau horaire :</span>
              </div>
              <span className="w-fit font-bold text-[#2D241E] bg-[#FAF4EB] px-2.5 py-0.5 rounded-full border border-[#E8DFC8]">
                {candyaSchedule.timezone} ({candyaSchedule.timezoneOffset})
              </span>
            </div>

            {/* Schedule Cards */}
            <div className="mt-4 space-y-2.5">
              {candyaSchedule.activeDays.map((item) => (
                <div
                  key={item.day}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 p-3 rounded-2xl bg-white border border-[#E8DFC8] hover:border-[#C4B3A1] shadow-2xs transition-colors sm:p-3.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold text-xs shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm font-bold text-[#2D241E] block">
                        {item.day}
                      </span>
                      <span className="text-[11px] text-[#7A695B]">
                        Appels & consultations en direct
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      {item.hours}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Off-days clarification */}
            <div className="mt-4 p-3.5 rounded-2xl bg-[#F7F2E8] border border-[#DDD1C0] text-xs text-[#635345] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#2D241E]">
                <Sparkles className="w-3.5 h-3.5 text-[#A87C51]" />
                <span>Lundis, Vendredis & Samedis :</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#5C4D3E]">
                Ces journées sont préservées pour le travail opérationnel en continu (boîtes mail, facturation, suivi client) afin de garantir zéro retard pour chaque client.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-[#EAE3D8] flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenBooking?.('Diagnostic Découverte');
                }}
                className="w-full sm:flex-1 py-3 px-5 rounded-full bg-[#2D241E] hover:bg-[#3E3228] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#E0A97E]" />
                <span>Réserver un créneau (30 min offertes)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E0A97E]" />
              </button>
              <a
                href={portfolioProfile.links.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto p-3 rounded-full bg-white border border-[#E6DDD0] hover:bg-[#F2ECE2] text-[#473B30] text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
                title="Consulter directement le calendrier Calendly"
              >
                <span>Calendly</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8F6544]" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
