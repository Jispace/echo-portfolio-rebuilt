import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Sparkles, Menu, X, ArrowRight, Clock } from 'lucide-react';
import { portfolioProfile, candyaSchedule } from '../../data/portfolioData';
import { useScrollLock } from '../../hooks/use-scroll-lock';

interface NavbarProps {
  onOpenBooking?: (plan?: string) => void;
  onOpenSchedule?: () => void;
}

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'À propos', href: '#a-propos' },
  { label: 'Services', href: '#services' },
  { label: 'Projets', href: '#projets' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenSchedule }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useScrollLock(mobileMenuOpen);

  // Monitor scroll for compact header & active link highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);

      // Section spy
      const sectionIds = ['accueil', 'a-propos', 'services', 'projets', 'contact'];
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i];
        if (!sectionId) continue;
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="fixed top-2 sm:top-5 left-0 right-0 z-50 px-2.5 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="max-w-5xl mx-auto">
        <nav
          className={`pointer-events-auto grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 lg:flex lg:justify-between transition-all duration-300 ${
            isScrolled
              ? 'bg-[#FAF7F2]/90 backdrop-blur-2xl border border-[#D5C7B7] shadow-[0_12px_36px_rgba(45,36,30,0.12)] rounded-2xl sm:rounded-full px-3 sm:px-5 py-2'
              : 'bg-[#FDFBF7]/80 backdrop-blur-xl border border-[#E7DFD3]/80 shadow-[0_8px_30px_rgba(45,36,30,0.06)] rounded-2xl sm:rounded-full px-3 sm:px-6 py-2 sm:py-3'
          }`}
          aria-label="Navigation principale"
        >
          {/* Logo / Initiales à gauche */}
          <a
            href="#accueil"
            onClick={(e) => handleNavClick(e, '#accueil')}
            className="flex min-w-0 items-center gap-2.5 sm:gap-3 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-ink)] lg:order-1"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#2D241E] text-[#FDFBF7] flex items-center justify-center font-bold text-xs sm:text-sm tracking-wider shadow-sm ring-1 ring-[#D8CDBC]/60 group-hover:scale-105 group-hover:bg-[#3D3129] transition-all">
              CR
            </div>
            <div className="flex flex-col items-start text-left min-w-0">
              <span className="font-extrabold text-[#2D241E] text-xs sm:text-sm leading-tight tracking-tight group-hover:text-[#7A583E] transition-colors whitespace-nowrap">
                {portfolioProfile.shortName}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                {/* Bouton vert actif juste avant : Assistante virtuelle indépendante */}
                <button
                  id="navbar-active-status-btn"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onOpenSchedule?.();
                  }}
                  className="relative flex items-center justify-center p-0.5 rounded-full before:absolute before:-inset-[18px] hover:bg-emerald-100/80 active:scale-90 transition-all cursor-pointer shrink-0"
                  title="Active & disponible • Mar, Mer, Jeu (East Africa Time) — Cliquez pour voir les horaires"
                  aria-label="Statut actif de Candya"
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]"></span>
                  </span>
                </button>

                {/* Assistante virtuelle indépendante - TOUJOURS visible même sur la version mobile */}
                <span className="whitespace-nowrap text-[9px] sm:text-[10px] text-[#7A695B] font-medium leading-none">
                  {portfolioProfile.title}
                </span>
              </div>
            </div>
          </a>

          {/* Liens de navigation au centre (Desktop) */}
          <div className="hidden lg:flex lg:order-2 items-center gap-1 p-1 rounded-full bg-[#F4EDE2]/50 border border-[#E8DFC8]/60 backdrop-blur-xs">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-[#2D241E] bg-white shadow-2xs'
                      : 'text-[#6B5A4B] hover:text-[#2D241E] hover:bg-white/60'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-white shadow-2xs -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Bouton d'action CTA à droite */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:order-3">
            <button
              type="button"
              onClick={() => onOpenBooking?.('Diagnostic Découverte (30 min offertes)')}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4.5 py-2 sm:py-2.5 rounded-full text-xs font-bold text-[#FDFBF7] bg-[#2D241E] hover:bg-[#3E3228] active:scale-95 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <Calendar className="w-3.5 h-3.5 text-[#E0A97E] group-hover:rotate-12 transition-transform duration-300" />
              <span className="hidden sm:inline">Prendre un RDV</span>
              <span className="inline sm:hidden">RDV</span>
              <span className="hidden lg:inline text-[10px] font-normal text-[#E0A97E] bg-white/10 px-1.5 py-0.5 rounded-full">
                Offert
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden grid h-11 w-11 shrink-0 place-items-center rounded-full text-[#2D241E] hover:bg-black/5 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-ink)] cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Ouvrir le menu de navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#2D241E]" />
              ) : (
                <Menu className="w-5 h-5 text-[#2D241E]" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu with Glassmorphism */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="pointer-events-auto lg:hidden mt-2 max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain p-3 rounded-2xl bg-[#FAF7F2]/95 backdrop-blur-2xl border border-[#D5C7B7] shadow-xl space-y-2"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex min-h-11 items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-white text-[#2D241E] shadow-2xs font-bold'
                          : 'text-[#6B5A4B] hover:bg-white/60 hover:text-[#2D241E]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A87C51]" />
                      )}
                    </a>
                  );
                })}
              </div>

              {/* Active schedule badge in mobile menu */}
              <div className="pt-2 border-t border-[#E8DFC8]/70">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSchedule?.();
                  }}
                  className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 p-3 rounded-xl bg-emerald-50/90 border border-emerald-200 text-left hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]"></span>
                    </span>
                    <div className="min-w-0">
                      <span className="block text-xs font-bold text-emerald-950">
                        Disponibilités & Horaires
                      </span>
                      <span className="block text-[10px] leading-relaxed text-emerald-800">
                        Mar (08h-11h30) • Mer (09h-14h30) • Jeu (09h-11h30)
                      </span>
                    </div>
                  </div>
                  <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                </button>
              </div>

              {/* Mobile CTA inside menu */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking?.('Diagnostic Découverte (30 min offertes)');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-[#FDFBF7] bg-[#2D241E] hover:bg-[#3E3228] active:scale-95 shadow-sm transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#E0A97E]" />
                  <span>Prendre RDV • Appel gratuit 30 min</span>
                  <ArrowRight className="w-4 h-4 opacity-80" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
