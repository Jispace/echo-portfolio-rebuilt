import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check, AlertCircle, TrendingUp, Gauge, MousePointer2 } from 'lucide-react';

interface AuditInspectorProps {
  onOpenBooking: () => void;
}

export function AuditInspector({ onOpenBooking }: AuditInspectorProps) {
  const [mode, setMode] = useState<'after' | 'before'>('after');
  const [interactionCount, setInteractionCount] = useState(0);

  return (
    <section 
      id="audit-demo" 
      className="py-16 sm:py-24 bg-[#F5EFEB]/60 border-y border-[#EAE2D7]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE2D5] text-[#5C4D3E] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Démonstrateur d'impact
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif text-[#241F1A] font-medium tracking-tight">
            L'impact immédiat d'une interface fluide sur vos utilisateurs
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6E6153]">
            Basculez entre l'état initial souvent rigide et l'état optimisé par notre audit pour ressentir la différence d'ergonomie et de vitesse perçue.
          </p>

          {/* Interactive Switcher */}
          <div className="inline-flex p-1.5 rounded-full bg-[#EAE2D5] border border-[#DDD3C5] mt-6 shadow-inner">
            <button
              id="toggle-mode-before"
              type="button"
              onClick={() => setMode('before')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                mode === 'before'
                  ? 'bg-white text-[#554536] shadow-sm'
                  : 'text-[#7D6F61] hover:text-[#2C2723]'
              }`}
            >
              1. Avant l'audit (Rigide & friction)
            </button>
            <button
              id="toggle-mode-after"
              type="button"
              onClick={() => setMode('after')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                mode === 'after'
                  ? 'bg-[#5C4D3E] text-white shadow-sm'
                  : 'text-[#7D6F61] hover:text-[#2C2723]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              2. Après Fluid UI Boost (Fluide & convertissant)
            </button>
          </div>
        </div>

        {/* Comparison Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left panel: Diagnostic overview */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white/90 border border-[#E7DFD5] shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8A7969]">
                  Diagnostic en direct
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  mode === 'after' 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  {mode === 'after' ? 'Score Fluidité : 96/100' : 'Score Fluidité : 52/100'}
                </span>
              </div>

              <h3 className="text-xl font-serif text-[#2C2723] mb-3">
                {mode === 'after' 
                  ? 'Expérience allégée, feedback haptique et engagement continu' 
                  : 'Points de rupture fréquents constatés lors de nos audits'}
              </h3>

              <div className="space-y-3 mt-4 text-xs sm:text-sm">
                {mode === 'after' ? (
                  <>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE9E0]">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#2C2723] block">Amorti physique naturel (Spring curves)</span>
                        <span className="text-[#6E6357]">Transitions sans saccade : le cerveau de l'utilisateur anticipe le mouvement avec confort.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE9E0]">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#2C2723] block">Hiérarchie optique & contrastes feutrés</span>
                        <span className="text-[#6E6357]">Palette sable & taupe satinée, guidant l'œil sans agressivité visuelle.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE9E0]">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#2C2723] block">Conversion +38% en moyenne</span>
                        <span className="text-[#6E6357]">Moins d'abandons lors du checkout et de la création de compte.</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-200/60">
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#2C2723] block">Micro-latences et transitions hachées</span>
                        <span className="text-[#7A6A58]">L'utilisateur perçoit l'application comme lente même avec un serveur rapide.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-200/60">
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#2C2723] block">Surcharge cognitive & boutons impersonnels</span>
                        <span className="text-[#7A6A58]">Absence d'états d'hover raffinés et hiérarchie monochrome plate.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-200/60">
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#2C2723] block">Perte de 25% à 40% des leads</span>
                        <span className="text-[#7A6A58]">Les prospects hésitent lors de la dernière étape par manque de réassurance.</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-[#EAE3D8] mt-6">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full py-3 px-5 rounded-full bg-[#5C4D3E] hover:bg-[#473B2F] text-white text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Demander un diagnostic de votre interface</span>
                <TrendingUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right panel: Live Interactive Component Preview */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#E7DFD5] shadow-sm relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D8] mb-6">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-[#8C7A68]" />
                  <span className="text-xs font-semibold text-[#4A3F35] uppercase tracking-wider">
                    Composant interactif testable
                  </span>
                </div>
                <span className="text-[11px] text-[#7A6C5E]">
                  Cliquez pour tester le ressenti
                </span>
              </div>

              {/* Sandbox Card */}
              <div className={`p-6 rounded-2xl transition-all duration-300 ${
                mode === 'after'
                  ? 'bg-white/90 backdrop-blur-md border border-[#E7DFD5] shadow-[0_12px_32px_rgba(95,81,68,0.08)]'
                  : 'bg-stone-200/70 border border-stone-300 shadow-none'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-[#7A6C5E]">Flux d'inscription & commande</span>
                  <span className="text-xs font-semibold text-[#5C4D3E]">Étape 2 sur 3</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="h-3 w-3/4 rounded-full bg-[#EAE3D8]" />
                  <div className="h-3 w-1/2 rounded-full bg-[#F2EDE5]" />
                </div>

                {/* Interactive Action Button inside the sandbox */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {mode === 'after' ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setInteractionCount(prev => prev + 1)}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#5C4D3E] hover:bg-[#473B2F] text-white text-sm font-medium shadow-[0_4px_16px_rgba(92,77,62,0.22)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#E6DACB]" />
                      <span>Valider avec transition fluide</span>
                      {interactionCount > 0 && (
                        <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-[11px]">
                          +{interactionCount}
                        </span>
                      )}
                    </motion.button>
                  ) : (
                    <button
                      onClick={() => setInteractionCount(prev => prev + 1)}
                      className="w-full sm:w-auto px-6 py-3 rounded-none bg-stone-700 hover:bg-stone-800 text-white text-sm font-normal cursor-pointer"
                    >
                      Valider (Sans feedback dynamique)
                    </button>
                  )}

                  <div className="flex items-center gap-1.5 text-xs text-[#7A6C5E]">
                    <MousePointer2 className="w-3.5 h-3.5 text-[#8C7A68]" />
                    <span>{interactionCount === 0 ? 'Faites l’expérience du clic' : `${interactionCount} clic(s) enregistré(s)`}</span>
                  </div>
                </div>
              </div>

              {/* Explanation of audit findings */}
              <div className="mt-6 p-4 rounded-xl bg-white/60 border border-[#EFE9E0] text-xs text-[#6E6357]">
                <strong className="text-[#3A3229] block mb-1">Ce que révèle l'échange de 30 minutes :</strong>
                En seulement 30 minutes de visio partagée, nous passons au crible la gestuelle, les temps de réponse visuelle et les zones de doute de vos visiteurs pour vous remettre 3 correctifs directement applicables par vos développeurs ou designers.
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-[#8C7E70] pt-4 border-t border-[#EAE3D8]">
              <span>Rapport d'audit synthétique remis en fin d'appel</span>
              <button 
                type="button" 
                onClick={onOpenBooking} 
                className="font-medium text-[#5C4D3E] hover:underline cursor-pointer"
              >
                Bloquer un créneau 30 min →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
