import React from 'react';
import { portfolioProfile } from '../../data/portfolioData';
import { CalendarDays, Linkedin, Mail, RotateCcw, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FooterProps {
  onReplayLoader?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayLoader }) => {
  return (
    <footer className="py-10 bg-[#FAF7F2] border-t border-[#EAE3D8] text-xs text-[#7A6C5E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 border-b border-[#EAE3D8] pb-6">
          {[
            { label: 'Calendly', href: portfolioProfile.links.calendly, icon: CalendarDays },
            { label: 'LinkedIn', href: portfolioProfile.links.linkedin, icon: Linkedin },
            { label: 'Gmail', href: `mailto:${portfolioProfile.links.email}`, icon: Mail },
          ].map(({ label, href, icon: Icon }) => (
            <Button key={label} asChild variant="outline" size="icon" className="h-11 w-11 rounded-full border-[#E8E1D5] bg-white text-[#7A583E] hover:bg-[#F2ECE2]" title={label}>
              <a href={href} aria-label={label} {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}><Icon aria-hidden="true" /></a>
            </Button>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-3 pt-5 sm:flex-row">
          <span className="text-center sm:text-left">© {new Date().getFullYear()} {portfolioProfile.name}. Tous droits réservés.</span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {onReplayLoader && <Button type="button" variant="ghost" onClick={onReplayLoader} className="text-[#7A583E] hover:bg-[#F2ECE2]"><RotateCcw aria-hidden="true" />Rejouer l'animation</Button>}
            <Button type="button" variant="ghost" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[#7A583E] hover:bg-[#F2ECE2]"><ArrowUp aria-hidden="true" />Haut de page</Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
