import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioProfile, servicePlans, getCalendlyUrl } from '../../data/portfolioData';
import { Mail, Calendar, Linkedin, Send, CheckCircle2, ChevronDown, ExternalLink } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface ContactSectionProps {
  onOpenBooking?: (plan?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [planMenuOpen, setPlanMenuOpen] = useState(false);
  const [activePlanIndex, setActivePlanIndex] = useState(0);
  const planMenuRef = useRef<HTMLDivElement>(null);
  const planTriggerRef = useRef<HTMLButtonElement>(null);
  const activeOptionRef = useRef<HTMLLIElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    needs: '',
  });
  const [botcheck, setBotcheck] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationAttempted(true);
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    const hasEmptyField = !selectedPlan || !formData.name.trim() || !formData.email.trim() || !formData.role.trim() || !formData.needs.trim();
    if (hasEmptyField || !emailIsValid) {
      setErrorMessage(hasEmptyField
        ? 'Veuillez remplir tous les champs avant d’envoyer.'
        : 'Veuillez saisir une adresse email valide.');
      return;
    }
    if (sending) return;
    setErrorMessage('');
    setSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '71970cbe-cfc9-4f26-b667-b6f6f2803dcc',
          subject: `Nouveau message de ${formData.name.trim()} (${selectedPlan})`,
          from_name: 'Portfolio Candya R.',
          name: formData.name.trim(),
          email: formData.email.trim(),
          formule: selectedPlan,
          activite: formData.role.trim(),
          message: formData.needs,
          botcheck,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.status === 200 && data?.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', role: '', needs: '' });
        setNeedsHtml('');
        setSelectedPlan('');
        setValidationAttempted(false);
      } else {
        setErrorMessage(data?.message || "L’envoi a échoué. Veuillez réessayer ou utiliser l’email direct.");
      }
    } catch {
      setErrorMessage("Connexion impossible. Veuillez réessayer ou utiliser l’email direct.");
    } finally {
      setSending(false);
    }
  };

  const calendlyUrlWithPlan = getCalendlyUrl(selectedPlan, {
    name: formData.name,
    email: formData.email,
  });
  const planInvalid = validationAttempted && !selectedPlan;

  const selectedPlanIndex = servicePlans.findIndex((plan) => plan.name === selectedPlan);

  const openPlanMenu = () => {
    setActivePlanIndex(selectedPlanIndex >= 0 ? selectedPlanIndex : 0);
    setPlanMenuOpen(true);
  };

  const choosePlan = (planName: string) => {
    setSelectedPlan(planName);
    setPlanMenuOpen(false);
    planTriggerRef.current?.focus();
    if (planName && errorMessage) setErrorMessage('');
  };

  const handlePlanTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!planMenuOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPlanMenu();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActivePlanIndex((i) => Math.min(i + 1, servicePlans.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActivePlanIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        setActivePlanIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActivePlanIndex(servicePlans.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (servicePlans[activePlanIndex]) choosePlan(servicePlans[activePlanIndex].name);
        break;
      case 'Escape':
        e.preventDefault();
        setPlanMenuOpen(false);
        planTriggerRef.current?.focus();
        break;
      case 'Tab':
        setPlanMenuOpen(false);
        break;
    }
  };

  useEffect(() => {
    if (!planMenuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (planMenuRef.current && !planMenuRef.current.contains(e.target as Node)) {
        setPlanMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [planMenuOpen]);

  useEffect(() => {
    if (planMenuOpen) activeOptionRef.current?.scrollIntoView({ block: 'nearest' });
  }, [planMenuOpen, activePlanIndex]);

  const nameInvalid = validationAttempted && !formData.name.trim();
  const emailInvalid = validationAttempted && (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()));
  const roleInvalid = validationAttempted && !formData.role.trim();
  const needsInvalid = validationAttempted && !formData.needs.trim();

  return (
    <section id="contact" className="py-14 sm:py-20 md:py-28 bg-[#FDFBF7] border-t border-[#EAE3D8] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 sm:gap-12">
          {/* Left direct contact card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A583E] block">
              Prise de contact
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D241E] tracking-tight">
              Prêt·e à vous libérer de l'administratif ?
            </h2>
            <p className="text-sm sm:text-base text-[#635345] leading-relaxed">
              Discutons de vos besoins actuels lors d'un appel découverte gratuit de 30 minutes, ou écrivez-moi directement par message.
            </p>

            <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-1 shadow-2xs hover:shadow-lg transition-all duration-300">
              <div className="flex min-h-14 items-center gap-3.5 px-2 py-1.5 rounded-2xl hover:bg-white/70 transition-colors">
                <div className="w-10 h-10 rounded-2xl bg-white border border-[#E8E1D5] flex items-center justify-center text-[#7A583E] shadow-2xs shrink-0">
                  <Calendar className="w-4 h-4 text-[#8F6544]" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-[#8A7969] block">Appel découverte offert (30 min)</span>
                  <button
                    type="button"
                    onClick={() => onOpenBooking?.(selectedPlan || undefined)}
                    className="break-words text-xs sm:text-sm font-bold text-[#2D241E] hover:text-[#7A583E] underline decoration-[#E0A97E] underline-offset-4 active:scale-95 transition-all cursor-pointer text-left"
                  >
                    Choisir un créneau sur mon agenda{selectedPlan ? ` (${selectedPlan})` : ''}
                  </button>
                </div>
              </div>

              <a href={`mailto:${portfolioProfile.links.email}`} className="flex min-h-14 items-center gap-3.5 px-2 py-1.5 rounded-2xl hover:bg-white/70 transition-colors group">
                <div className="w-10 h-10 rounded-2xl bg-white border border-[#E8E1D5] flex items-center justify-center text-[#7A583E] shadow-2xs shrink-0">
                  <Mail className="w-4 h-4 text-[#8F6544]" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-[#8A7969] block">Email direct</span>
                  <span className="mt-0.5 block break-all text-xs sm:text-sm font-bold leading-snug text-[#2D241E] group-hover:text-[#7A583E] transition-colors">
                    {portfolioProfile.links.email}
                  </span>
                </div>
              </a>

              <div className="flex min-h-14 items-center gap-3.5 px-2 py-1.5 rounded-2xl hover:bg-white/70 transition-colors">
                <div className="w-10 h-10 rounded-2xl bg-white border border-[#E8E1D5] flex items-center justify-center text-[#7A583E] shadow-2xs shrink-0">
                  <Linkedin className="w-4 h-4 text-[#8F6544]" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-[#8A7969] block">Réseau professionnel</span>
                  <a
                    href={portfolioProfile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block text-xs sm:text-sm font-bold leading-snug text-[#2D241E] hover:text-[#7A583E] transition-colors"
                  >
                    Profil LinkedIn de Candya
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <div className="p-4 sm:p-9 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E1D5] shadow-xs hover:shadow-xl transition-all duration-300">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 sm:gap-3 mb-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-[#2D241E] tracking-tight">
                  Envoyer un message à Candya
                </h3>
                <span className="max-w-28 text-center text-[10px] sm:text-[11px] font-semibold text-[#8F6544] bg-[#F7F2E8] px-2 py-1 rounded-xl sm:rounded-full border border-[#E8DFC8]">
                  Réponse sous 24h
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#635345] mb-6">
                Je vous réponds personnellement avec soin et pragmatisme sous 24h ouvrées.
              </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Plan / Subject selector */}
                  <div>
                    <label htmlFor="contact-plan" className="text-xs font-bold text-[#3E3228] block mb-2">
                      Votre besoin principal <span className="text-red-600">*</span>
                    </label>
                    <div className="relative" ref={planMenuRef}>
                      <button
                        id="contact-plan"
                        type="button"
                        role="combobox"
                        aria-haspopup="listbox"
                        aria-expanded={planMenuOpen}
                        aria-controls="contact-plan-listbox"
                        aria-activedescendant={planMenuOpen ? `contact-plan-option-${activePlanIndex}` : undefined}
                        aria-invalid={planInvalid}
                        ref={planTriggerRef}
                        onClick={() => (planMenuOpen ? setPlanMenuOpen(false) : openPlanMenu())}
                        onKeyDown={handlePlanTriggerKeyDown}
                        className={`min-h-11 flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 text-left text-xs font-semibold backdrop-blur-md transition-all focus-visible:ring-2 sm:text-sm ${planInvalid ? 'border-red-500 focus:border-red-600 focus-visible:ring-red-200' : 'border-[#E6DDD0] focus:border-[#7A583E] focus-visible:ring-[#A87C51]/30'} ${selectedPlan ? 'text-[#2D241E]' : 'text-[#9A8A7B]'} ${planMenuOpen ? 'bg-white' : 'bg-[#FAF7F2]/90 hover:bg-[#F2ECE2]/90'}`}
                      >
                        <span className="min-w-0 flex-1 truncate">
                          {selectedPlan || 'Cliquez ici pour choisir une formule'}
                        </span>
                        <ChevronDown
                          className={`pointer-events-none h-4 w-4 shrink-0 text-[#7A583E] transition-transform duration-200 ${planMenuOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence>
                        {planMenuOpen && (
                          <motion.ul
                            id="contact-plan-listbox"
                            role="listbox"
                            aria-labelledby="contact-plan"
                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                            transition={{ duration: 0.16, ease: 'easeOut' }}
                            className="absolute inset-x-0 top-[calc(100%+0.375rem)] z-50 max-h-64 overflow-auto rounded-2xl border border-[#E6DDD0] bg-[#FAF7F2]/95 p-1.5 shadow-xl backdrop-blur-md"
                          >
                            {servicePlans.map((plan, index) => {
                              const isActive = index === activePlanIndex;
                              const isSelected = plan.name === selectedPlan;
                              return (
                                <li
                                  key={plan.id}
                                  id={`contact-plan-option-${index}`}
                                  role="option"
                                  aria-selected={isSelected}
                                  ref={isActive ? activeOptionRef : undefined}
                                  onMouseEnter={() => setActivePlanIndex(index)}
                                  onClick={() => choosePlan(plan.name)}
                                  className={`flex cursor-pointer items-start justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors ${isActive ? 'bg-[#F2ECE2] text-[#2D241E]' : 'text-[#5C4D3E]'} ${isSelected ? 'font-bold' : 'font-semibold'}`}
                                >
                                  <span className="min-w-0 flex-1">
                                    <span className="block truncate text-xs sm:text-sm">
                                      {plan.name} — {plan.badge}
                                    </span>
                                    <span className="mt-0.5 block truncate text-[11px] font-normal text-[#8A7969]">
                                      {plan.recommendedFor}
                                    </span>
                                  </span>
                                  <CheckCircle2
                                    className={`mt-0.5 h-4 w-4 shrink-0 text-[#A87C51] ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                                    aria-hidden="true"
                                  />
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="text-xs font-bold text-[#3E3228] block mb-1">Votre Nom & Prénom *</label>
                      <input
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        type="text"
                        required
                        maxLength={100}
                        aria-invalid={nameInvalid}
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (e.target.value.trim() && errorMessage) setErrorMessage('');
                        }}
                        placeholder="Ex: Sophie Martin"
                        className={`w-full px-4 py-2.5 rounded-2xl bg-[#FAF7F2] border text-xs sm:text-sm text-[#2D241E] focus:outline-hidden focus:bg-white transition-all ${nameInvalid ? 'border-red-500 focus:border-red-600 ring-2 ring-red-100' : 'border-[#E6DDD0] focus:border-[#7A583E]'}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="text-xs font-bold text-[#3E3228] block mb-1">Votre Email professionnel *</label>
                      <input
                        id="contact-email"
                        name="email"
                        autoComplete="email"
                        type="email"
                        required
                        maxLength={255}
                        aria-invalid={emailInvalid}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value.trim()) && errorMessage) setErrorMessage('');
                        }}
                        placeholder="sophie@monbusiness.com"
                        className={`w-full px-4 py-2.5 rounded-2xl bg-[#FAF7F2] border text-xs sm:text-sm text-[#2D241E] focus:outline-hidden focus:bg-white transition-all ${emailInvalid ? 'border-red-500 focus:border-red-600 ring-2 ring-red-100' : 'border-[#E6DDD0] focus:border-[#7A583E]'}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-role" className="text-xs font-bold text-[#3E3228] block mb-1">Votre activité / Thématique <span className="text-red-600">*</span></label>
                    <input
                      id="contact-role"
                      name="role"
                      type="text"
                      required
                      maxLength={200}
                      aria-invalid={roleInvalid}
                      value={formData.role}
                      onChange={(e) => {
                        setFormData({ ...formData, role: e.target.value });
                        if (e.target.value.trim() && errorMessage) setErrorMessage('');
                      }}
                      placeholder="Ex : Coach business, formateur..."
                      className={`w-full px-4 py-2.5 rounded-2xl bg-[#FAF7F2] border text-xs sm:text-sm text-[#2D241E] focus:outline-hidden focus:bg-white transition-all ${roleInvalid ? 'border-red-500 focus:border-red-600 ring-2 ring-red-100' : 'border-[#E6DDD0] focus:border-[#7A583E]'}`}
                    />
                  </div>

                  <div>
                    <div className="mb-1">
                      <label htmlFor="contact-needs" className="text-xs font-bold text-[#3E3228] block">
                        Parlez-moi de votre situation actuelle <span className="text-red-500">*</span>
                      </label>
                    </div>

                    <RichTextEditor
                      id="contact-needs"
                      value={needsHtml}
                      invalid={needsInvalid}
                      placeholder="Gestion des emails, retard de facturation, suivi des clients..."
                      onChange={(html, text) => {
                        setNeedsHtml(html);
                        setFormData((prev) => ({ ...prev, needs: text }));
                        if (text && errorMessage) setErrorMessage('');
                      }}
                    />
                    <input
                      type="checkbox"
                      name="botcheck"
                      className="hidden"
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                      checked={botcheck}
                      onChange={(e) => setBotcheck(e.target.checked)}
                    />

                    {errorMessage && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium">
                        {errorMessage}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <Button
                      type="submit"
                      disabled={sending}
                      aria-busy={sending}
                      className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-[#2D241E] hover:bg-[#3E3228] active:scale-95 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-lg transition-all cursor-pointer disabled:cursor-wait disabled:opacity-70"
                    >
                       
                      <span>{sending ? 'Envoi en cours…' : 'Envoyer mon message'}</span>
                      <Send className="w-3.5 h-3.5 text-[#E0A97E]" />
                    </Button>
                    <a
                      href={calendlyUrlWithPlan}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto py-3.5 px-5 rounded-full bg-[#FAF7F2] border border-[#E6DDD0] hover:bg-[#F2ECE2] text-[#473B30] text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                      title="Ouvrir directement sur Calendly"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#7A583E]" />
                      <span>Calendly direct</span>
                      <ExternalLink className="w-3 h-3 text-[#8F6544]" />
                    </a>
                  </div>
                </form>
            </div>
          </motion.div>
        </div>
      </div>
      <Dialog open={submitted} onOpenChange={setSubmitted}>
        <DialogContent className="max-w-md rounded-lg border-[#E8E1D5] bg-[#FDFBF7] text-[#2D241E]">
          <DialogHeader>
            <DialogTitle>Message envoyé avec succès !</DialogTitle>
            <DialogDescription>Votre message a bien été transmis. Je vous réponds sous 24h ouvrées.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <Button type="button" variant="outline" onClick={() => setSubmitted(false)}>Fermer</Button>
            <Button asChild><a href={calendlyUrlWithPlan} target="_blank" rel="noopener noreferrer">Prendre un rendez-vous sur Calendly<ExternalLink aria-hidden="true" /></a></Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
