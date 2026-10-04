import React from 'react';
import { motion } from 'motion/react';
import { portfolioProfile, coreValues } from '../../data/portfolioData';
import { Heart, CheckCircle2, Zap, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="a-propos" className="py-14 sm:py-20 md:py-28 bg-[#FDFBF7] border-t border-[#EAE3D8] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 sm:gap-12 items-start">
          {/* Left bio column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-5 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E7E0D5] text-xs font-semibold uppercase tracking-wider text-[#7A583E] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#A87C51]" />
              <span>À propos de moi</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D241E] tracking-tight leading-snug">
              {portfolioProfile.name}
            </h2>

            <p className="text-base sm:text-lg text-[#635345] leading-relaxed font-normal">
              {portfolioProfile.about.bioParagraph1}
            </p>

            <p className="text-sm sm:text-base text-[#635345] leading-relaxed">
              {portfolioProfile.about.bioParagraph2}
            </p>

            <p className="text-sm sm:text-base text-[#635345] leading-relaxed">
              {portfolioProfile.about.bioParagraph3}
            </p>

            {/* Mantra block */}
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#F7F3EB]/90 border border-[#E8DFC8] border-l-4 border-l-[#A87C51] shadow-2xs hover:shadow-md transition-shadow">
              <p className="italic text-sm sm:text-base text-[#473A2F] font-medium leading-relaxed">
                {portfolioProfile.about.mantra}
              </p>
            </div>

            {/* Personal Note */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E1D5] flex items-start gap-3 shadow-2xs hover:border-[#D5C7B7] hover:scale-[1.01] transition-all">
              <span className="text-2xl select-none">✈️</span>
              <p className="text-xs sm:text-sm text-[#635345] leading-relaxed pt-0.5">
                <strong className="text-[#2D241E] font-semibold">Côté perso : </strong>
                {portfolioProfile.about.personalNote}
              </p>
            </div>
          </motion.div>

          {/* Right column: Values cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-4"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A7969] mb-4">
              Ce qui guide mon accompagnement
            </h3>

            {coreValues.map((val, idx) => {
              const Icon = idx === 0 ? Heart : idx === 1 ? CheckCircle2 : Zap;
              return (
                <motion.div
                  key={val.title}
                  whileHover={{ scale: 1.015, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FAF7F2] border border-[#E8E1D5] hover:border-[#D5C7B7] hover:bg-white transition-all shadow-2xs hover:shadow-xl cursor-default"
                >
                  <div className="flex items-center gap-3.5 mb-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-white border border-[#E6DDD0] flex items-center justify-center text-[#7A583E] shadow-2xs">
                      <Icon className="w-4 h-4 text-[#8F6544]" />
                    </div>
                    <h4 className="text-base font-extrabold text-[#2D241E] tracking-tight">{val.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#635345] leading-relaxed sm:pl-12">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}

            <motion.div
              whileHover={{ scale: 1.015, y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E1D5] hover:border-[#D5C7B7] shadow-2xs hover:shadow-xl transition-all mt-6 cursor-default"
            >
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#7A583E] block mb-1">
                La finalité ultime
              </span>
              <p className="text-xs sm:text-sm text-[#635345] leading-relaxed">
                {portfolioProfile.about.ultimateOutcome}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
