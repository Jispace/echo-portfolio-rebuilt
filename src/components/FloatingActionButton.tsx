import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';

interface FloatingActionButtonProps {
  onOpenBooking: (plan?: string) => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onOpenBooking }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Apparaît dès que l'utilisateur a scrollé au-delà de 280px (au-delà du CTA du Hero)
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="floating-cta-container"
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.92 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 z-40 sm:bottom-6 sm:right-6"
        >
          <button
            id="floating-action-button"
            type="button"
            onClick={() => onOpenBooking()}
            className="group relative flex min-h-12 items-center gap-2 px-3.5 py-2.5 sm:gap-3 sm:px-5 sm:py-3 rounded-full bg-[#2D241E] hover:bg-[#3E3228] text-[#FDFBF7] shadow-[0_8px_24px_rgba(45,36,30,0.22)] border border-[#E0A97E]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Réserver un appel découverte de 30 minutes offert"
          >
            {/* Status dot pulse */}
            <span className="flex h-2.5 w-2.5 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E0A97E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E0A97E]"></span>
            </span>

            {/* Label text */}
            <div className="flex flex-col text-left leading-none">
              <span className="text-xs font-bold tracking-tight text-[#FDFBF7] flex items-center gap-1.5">
                <span>Échange 30 min</span>
                <span className="text-[10px] font-semibold text-[#E0A97E] uppercase tracking-wider bg-[#3E3228] px-1.5 py-0.5 rounded-sm">
                  Offert
                </span>
              </span>
              <span className="hidden text-[10px] text-[#CBBCA9] font-medium mt-1 sm:block">
                Diagnostic organisation & support
              </span>
            </div>

            {/* Calendar icon */}
            <div className="hidden w-7 h-7 rounded-full bg-white/10 sm:flex items-center justify-center text-[#E0A97E] group-hover:translate-x-0.5 transition-transform shrink-0">
              <Calendar className="w-3.5 h-3.5" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
