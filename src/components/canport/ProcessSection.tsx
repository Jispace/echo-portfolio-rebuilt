import React from 'react';
import { motion } from 'motion/react';
import { processSteps } from '../../data/portfolioData';
import { Calendar, Sparkles, ArrowRight } from 'lucide-react';

interface ProcessSectionProps {
  onOpenBooking?: (plan?: string) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="process" className="py-14 sm:py-20 md:py-28 bg-[#F7F3EB]/60 border-t border-[#EAE3D8] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-9 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E7E0D5] text-xs font-semibold uppercase tracking-wider text-[#7A583E] mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A87C51]" />
            <span>Méthodologie en 4 Étapes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D241E] tracking-tight">
            Comment nous démarrons ensemble
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#635345] leading-relaxed">
            Un cadre fluide, transparent et bienveillant dès le premier contact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-sm border border-[#E7E0D5] hover:border-[#D5C7B7] flex flex-col justify-between shadow-2xs hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-[#CBBCA9]/80 font-mono">
                    0{step.step}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#E8E1D5] text-[10px] font-bold text-[#7A583E]">
                    {step.badge}
                  </span>
                </div>

                <h4 className="text-base font-extrabold text-[#2D241E] mb-2 tracking-tight">
                  {step.title}
                </h4>

                <p className="text-xs text-[#635345] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#F0EAE0] flex items-center justify-between text-[11px] text-[#A87C51] font-semibold">
                <span>Étape {step.step}/4</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-9 sm:mt-12 text-center"
        >
          <button
            type="button"
            onClick={() => onOpenBooking?.()}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-5 sm:px-8 py-3.5 rounded-2xl sm:rounded-full text-sm font-bold text-[#FDFBF7] bg-[#2D241E] hover:bg-[#3E3228] active:scale-95 shadow-md hover:shadow-xl transition-all cursor-pointer group"
          >
            <Calendar className="w-4 h-4 text-[#E0A97E] group-hover:rotate-12 transition-transform duration-300" />
            <span>Réserver l'appel découverte de 30 min</span>
            <ArrowRight className="w-4 h-4 opacity-80 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
