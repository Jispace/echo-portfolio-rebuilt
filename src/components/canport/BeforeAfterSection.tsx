import React from 'react';
import { motion } from 'motion/react';
import { beforeAfterData } from '../../data/portfolioData';
import { Sparkles, ArrowRight, Check, X } from 'lucide-react';

export const BeforeAfterSection: React.FC = () => {
  return (
    <section id="avant-apres" className="py-16 sm:py-20 md:py-28 bg-[#FDFBF7] border-t border-[#EAE3D8] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-11 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E7E0D5] text-xs font-semibold uppercase tracking-wider text-[#7A583E] mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A87C51]" />
            <span>Transformation Concrète</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D241E] tracking-tight">
            Avant / Après mon intervention
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#635345] leading-relaxed">
            Ce qui change concrètement au quotidien quand vous déléguez votre administratif et votre support.
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-4 max-w-4xl mx-auto">
          {beforeAfterData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="grid grid-cols-1 md:grid-cols-11 gap-3 sm:gap-2.5 p-0 sm:p-5 rounded-2xl sm:rounded-3xl bg-transparent sm:bg-[#FAF7F2] border border-transparent sm:border-[#E8E1D5] sm:hover:border-[#D5C7B7] sm:hover:bg-white items-center shadow-none sm:shadow-2xs sm:hover:shadow-xl transition-all duration-300 motion-reduce:transition-none"
            >
              {/* Before */}
              <div className="md:col-span-5 flex items-start gap-3.5 p-4 rounded-2xl bg-white/80 border border-amber-200/70 shadow-[0_10px_30px_rgba(68,52,38,0.06)] backdrop-blur-sm sm:gap-3 sm:p-3.5 sm:shadow-2xs">
                <div className="w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E5D4F] sm:text-[#8A7969] block mb-1.5 sm:mb-0.5">Avant</span>
                  <span className="text-[13px] sm:text-sm text-[#635345] font-medium leading-relaxed">{item.before}</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="md:col-span-1 flex items-center justify-center text-[#A87C51]">
                <span className="grid h-7 w-7 place-items-center rounded-full border border-[#E5D9CC] bg-white shadow-2xs sm:border-transparent sm:bg-transparent sm:shadow-none">
                  <ArrowRight className="w-3.5 h-3.5 rotate-90 md:rotate-0" />
                </span>
              </div>

              {/* After */}
              <div className="md:col-span-5 flex items-start gap-3.5 p-4 rounded-2xl bg-white/90 border border-emerald-300/80 shadow-[0_12px_34px_rgba(28,104,76,0.08)] backdrop-blur-sm sm:gap-3 sm:p-3.5 sm:shadow-2xs">
                <div className="w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1.5 sm:mb-0.5">Après</span>
                  <span className="text-[13px] sm:text-sm text-[#2D241E] font-bold leading-relaxed">{item.after}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
