import { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

interface FAQSectionProps {
  onOpenBooking: () => void;
}

const FAQS = [
  {
    q: "Que se passe-t-il exactement durant l'échange de 30 minutes ?",
    a: "Nous nous connectons en visioconférence (Google Meet). Vous nous partagez votre écran ou nous fournissez l'URL de votre produit. En direct, nous décortiquons vos écrans clés (landing, onboarding, tunnel d'achat), relevons les blocages perceptuels et vous livrons 3 actions concrètes pour débloquer votre fluidité."
  },
  {
    q: "L'audit de 30 minutes est-il véritablement 100% gratuit et sans engagement ?",
    a: "Oui, totalement. Aucun moyen de paiement n'est demandé. C'est notre meilleure manière de vous prouver la pertinence de notre méthodologie Fluid UI. À l'issue de l'appel, vous êtes libre d'appliquer nos conseils seul ou de nous confier un sprint d'optimisation."
  },
  {
    q: "Quels types de produits pouvez-vous auditer ?",
    a: "Nous intervenons sur les plateformes SaaS B2B/B2C, les applications web complexes, les e-commerces à fort volume, ainsi que les applications mobiles (React Native, iOS, Android). Même au stade de maquette Figma avancée, l'audit est très efficace."
  },
  {
    q: "Combien de temps faut-il pour implémenter les recommandations ?",
    a: "Les recommandations de l'audit sont calibrées pour être rapides à intégrer : nos 'quick-wins' prennent généralement entre 1 et 3 jours de développement pour vos équipes. Si vous choisissez de faire appel à notre studio, un sprint complet dure 1 à 2 semaines."
  }
];

export function FAQSection({ onOpenBooking }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8A7969] block mb-2">
            Transparence totale
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-[#241F1A] font-medium tracking-tight">
            Questions fréquentes sur l'audit 30 min
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6E6153]">
            Tout ce que vous devez savoir avant de réserver votre créneau.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#E7DFD5] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5]/50 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-[#2C2723] font-medium">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#EAE3D8] flex items-center justify-center shrink-0 text-[#7D6E5F] transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#5C4D3E] text-white' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-[#6E6357] leading-relaxed border-t border-[#F4EFEA] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final CTA inside FAQ */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#8A7969] mb-4">
            Une question spécifique ou un projet confidentiel sous NDA ?
          </p>
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5C4D3E] hover:bg-[#473B2F] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Réserver un échange de 30 min</span>
          </button>
        </div>
      </div>
    </section>
  );
}
