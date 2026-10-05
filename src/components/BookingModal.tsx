import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, CheckCircle2, Clock, ShieldCheck, ArrowRight, User, Mail, ExternalLink, Loader2, AlertTriangle } from 'lucide-react';
import { servicePlans } from '../data/portfolioData';
import { useScrollLock } from '../hooks/use-scroll-lock';
import { sendBookingEmail } from '../lib/contact.functions';
import { RichTextEditor } from './canport/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

const pad = (n: number) => String(n).padStart(2, '0');
const SLOT_MINUTES = 30;

/** Consecutive 30-minute slots between the start and end time (EAT). */
function makeSlots(startH: number, endH: number, endM = 0) {
  const out: string[] = [];
  const end = endH * 60 + endM;
  for (let m = startH * 60; m + SLOT_MINUTES <= end; m += SLOT_MINUTES) {
    const e = m + SLOT_MINUTES;
    out.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)} - ${pad(Math.floor(e / 60))}:${pad(e % 60)}`);
  }
  return out;
}

// Candya's weekly availability (East Africa Time, UTC+3). Key = weekday (2=Tue, 3=Wed, 4=Thu).
const WEEKLY_SLOTS: Record<number, { label: string; hours: string; slots: string[] }> = {
  2: { label: 'Mardi', hours: '08:00 - 11:30', slots: makeSlots(8, 11, 30) },
  3: { label: 'Mercredi', hours: '09:00 - 14:30', slots: makeSlots(9, 14, 30) },
  4: { label: 'Jeudi', hours: '09:00 - 11:30', slots: makeSlots(9, 11, 30) },
};
const EAT_OFFSET_MS = 3 * 3600 * 1000;
const MONTHS = ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];

interface DayOption { key: string; label: string; date: string; hours: string; slots: string[] }

/** Absolute timestamp (ms) for a slot start on an EAT calendar day. */
function slotStartMs(dayKey: string, slot: string) {
  const [h = 0, m = 0] = slot.slice(0, 5).split(":").map(Number);
  return Date.parse(`${dayKey}T${pad(h)}:${pad(m)}:00+03:00`);
}

/** Next working days (Tue/Wed/Thu) that still have at least one future slot. */
function buildUpcomingDays(nowMs: number, count = 3): DayOption[] {
  const days: DayOption[] = [];
  const eatNow = new Date(nowMs + EAT_OFFSET_MS);
  for (let i = 0; i < 28 && days.length < count; i++) {
    const d = new Date(Date.UTC(eatNow.getUTCFullYear(), eatNow.getUTCMonth(), eatNow.getUTCDate() + i));
    const cfg = WEEKLY_SLOTS[d.getUTCDay()];
    if (!cfg) continue;
    const key = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
    const slots = cfg.slots.filter((s) => slotStartMs(key, s) > nowMs);
    if (!slots.length) continue;
    days.push({
      key,
      label: i === 0 ? "Aujourd'hui" : cfg.label,
      date: `${cfg.label} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`,
      hours: cfg.hours,
      slots,
    });
  }
  return days;
}

const CALENDLY_EVENT_URL = 'https://calendly.com/rancandya/appel-decouverte-candya';



const DEFAULT_PLAN = 'Organisation Administrative';
const resolvePlan = (p?: string) => (p && servicePlans.some((s) => s.name === p) ? p : DEFAULT_PLAN);
type Step = 1 | 2 | 3;

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialPlan }) => {
  useScrollLock(isOpen);
  const [selectedPlan, setSelectedPlan] = useState<string>(resolvePlan(initialPlan));
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [selectedDayKey, setSelectedDayKey] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [noteHtml, setNoteHtml] = useState('');
  const [noteText, setNoteText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmLabel, setConfirmLabel] = useState('');

  useEffect(() => {
    setSelectedPlan(resolvePlan(initialPlan));
  }, [initialPlan]);

  useEffect(() => {
    if (!isOpen) return;
    setNowMs(Date.now());
    const id = window.setInterval(() => setNowMs(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, [isOpen]);

  const upcomingDays = React.useMemo(() => buildUpcomingDays(nowMs), [nowMs]);
  const currentDayConfig: DayOption | undefined =
    upcomingDays.find((d) => d.key === selectedDayKey) ?? upcomingDays[0];

  // Keep the day valid; never auto-pick a slot, just drop one that expired.
  useEffect(() => {
    if (!currentDayConfig) return;
    if (currentDayConfig.key !== selectedDayKey) setSelectedDayKey(currentDayConfig.key);
    if (selectedSlot && !currentDayConfig.slots.includes(selectedSlot)) setSelectedSlot('');
  }, [currentDayConfig, selectedDayKey, selectedSlot]);

  const resetForm = () => {
    setStep(1);
    setName('');
    setEmail('');
    setNoteHtml('');
    setNoteText('');
    setSelectedDayKey('');
    setSelectedSlot('');
    setSelectedPlan(resolvePlan(initialPlan));
    setIsSending(false);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending || !currentDayConfig || !selectedSlot) return;
    if (slotStartMs(currentDayConfig.key, selectedSlot) <= Date.now()) {
      setNowMs(Date.now());
      setStep(2);
      return;
    }
    setIsSending(true);
    setErrorMessage('');
    const label = `${currentDayConfig.date} à ${selectedSlot.slice(0, 5)}`;
    try {
      await sendBookingEmail({
        data: {
          plan: selectedPlan,
          name: name.trim(),
          email: email.trim(),
          date: currentDayConfig.date,
          slot: selectedSlot,
          messageHtml: noteHtml || undefined,
          messageText: noteText || undefined,
        },
      });
      resetForm();
      onClose();
      setConfirmLabel(label);
    } catch {
      setIsSending(false);
      setErrorMessage("L'envoi a échoué. Réessayez, ou réservez directement sur Calendly avec le lien ci-dessus.");
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const stepLabels = ['Formule & jour', 'Créneau', 'Coordonnées'];
  const cardBase = 'rounded-xl text-left border-2 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-ink)]';
  const cardOn = 'bg-[#2D241E] text-white border-[#A87C51] shadow-md ring-2 ring-[#E0A97E]/60';
  const cardOff = 'bg-white text-[#4A3F35] border-[#E8DFD3] hover:border-[#C4B3A1]';
  const secondaryLink = (
    <a
      href={CALENDLY_EVENT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-[#7A583E] underline-offset-4 hover:underline"
    >
      Ou réserver directement sur Calendly
      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
    </a>
  );

  return (
    <>
      <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            role="dialog"
            aria-modal="true"
            aria-label="Réserver un appel"
            className="relative z-10 max-h-[100dvh] w-full overflow-y-auto overscroll-contain rounded-t-2xl border border-[#E7DFD5] bg-[#FAF8F5] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-[#2D241E] shadow-2xl sm:my-auto sm:max-h-[92vh] sm:max-w-xl sm:rounded-3xl sm:p-8"
          >
            <button
              id="close-booking-modal-btn"
              onClick={onClose}
              className="sticky top-0 z-20 float-right grid h-11 w-11 place-items-center rounded-full bg-[#FAF8F5]/95 text-[#7A6C5E] shadow-sm backdrop-blur-sm hover:text-[#2C2723] hover:bg-[#EFE9E0] transition-colors cursor-pointer sm:absolute sm:top-5 sm:right-5"
              aria-label="Fermer la fenêtre"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="clear-both sm:clear-none">
              <div className="flex items-start gap-2 pr-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#7A583E] mb-2">
                <span className="mt-1 w-2 h-2 rounded-full bg-[#A87C51]" />
                <span>Échange découverte • 30 minutes offertes</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#2D241E] tracking-tight pr-10">
                Planifiez votre appel avec Candya
              </h3>

              {/* Stepper */}
              <ol className="mt-4 grid grid-cols-3 gap-2" aria-label="Étapes de réservation">
                {stepLabels.map((lbl, i) => {
                  const n = (i + 1) as Step;
                  const state = n < step ? 'done' : n === step ? 'current' : 'todo';
                  return (
                    <li key={lbl} aria-current={state === 'current' ? 'step' : undefined} className="min-w-0">
                      <div className={`h-1.5 rounded-full ${state === 'todo' ? 'bg-[#E8DFD3]' : 'bg-[#A87C51]'}`} />
                      <span className={`mt-1.5 block text-[10px] sm:text-[11px] font-bold ${state === 'current' ? 'text-[#2D241E]' : 'text-[#7A695B]'}`}>
                        {n}. {lbl}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            {step === 1 && (
              <div className="mt-5">
                <fieldset>
                  <legend className="text-xs font-bold text-[#473B30] uppercase tracking-wider mb-2">Formule ou sujet de l'appel</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup">
                    {servicePlans.map((plan) => {
                      const isSelected = selectedPlan === plan.name;
                      return (
                        <button
                          key={plan.id}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => setSelectedPlan(plan.name)}
                          className={`${cardBase} min-h-11 p-3 flex items-center justify-between gap-2 ${isSelected ? cardOn : cardOff}`}
                        >
                          <div className="min-w-0">
                            <span className="block text-xs font-bold">{plan.name}</span>
                            <span className={`block text-[10px] mt-0.5 ${isSelected ? 'text-[#D5C2B1]' : 'text-[#7A695B]'}`}>{plan.badge}</span>
                          </div>
                          <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${isSelected ? 'border-[#E0A97E] bg-[#E0A97E]' : 'border-[#C4B3A1] bg-white'}`}>
                            {isSelected && <Check className="h-3 w-3 text-[#2D241E]" strokeWidth={3} />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset className="mt-5">
                  <div className="grid grid-cols-1 gap-1 sm:flex sm:items-center sm:justify-between mb-2">
                    <legend className="text-xs font-bold text-[#473B30] uppercase tracking-wider">Choisissez le jour</legend>
                    <span className="w-fit text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">East Africa Time</span>
                  </div>
                  {upcomingDays.length === 0 && <p className="text-xs text-[#635345]">Aucun créneau disponible pour le moment.</p>}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {upcomingDays.map((day) => {
                      const on = currentDayConfig?.key === day.key;
                      return (
                        <button
                          key={day.key}
                          type="button"
                          aria-pressed={on}
                          onClick={() => { setSelectedDayKey(day.key); setSelectedSlot(''); }}
                          className={`${cardBase} min-h-11 p-3 ${on ? cardOn : cardOff}`}
                        >
                          <span className="block text-xs font-bold">{day.label}</span>
                          <span className="block text-[11px] opacity-80 mt-0.5">{day.date}</span>
                          <span className={`block text-[10px] mt-0.5 ${on ? 'text-[#D5C2B1]' : 'text-[#8A7969]'}`}>
                            {day.slots.length} créneau{day.slots.length > 1 ? 'x' : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-5 p-3 rounded-xl bg-[#F0EAE0]/70 border border-[#E4D9CC] grid grid-cols-1 gap-2 sm:flex sm:items-center sm:justify-between text-[11px] text-[#635345]">
                  <div className="flex items-center gap-1.5 font-medium"><Clock className="w-3.5 h-3.5 text-[#7A583E]" /><span>30 min chrono</span></div>
                  <div className="flex items-center gap-1.5 font-medium"><ShieldCheck className="w-3.5 h-3.5 text-[#7A583E]" /><span>100% offert & sans engagement</span></div>
                </div>

                <div className="mt-5 flex flex-col-reverse items-center gap-2 pt-4 border-t border-[#EAE2D7] sm:flex-row sm:justify-between">
                  {secondaryLink}
                  <button
                    id="booking-next-step-btn"
                    type="button"
                    disabled={!currentDayConfig}
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto min-h-11 px-6 py-3 rounded-full bg-[#2D241E] hover:bg-[#3E3228] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  >
                    <span>Choisir un créneau</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="mt-5">
                <fieldset>
                  <legend className="text-xs font-bold text-[#473B30] uppercase tracking-wider mb-2">
                    Créneaux disponibles {currentDayConfig ? `— ${currentDayConfig.date}` : ''}
                  </legend>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="radiogroup">
                    {(currentDayConfig?.slots ?? []).map((slot) => {
                      const on = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => setSelectedSlot(slot)}
                          className={`${cardBase} min-h-11 p-2.5 text-center text-xs font-semibold ${on ? 'bg-[#A87C51] text-white border-[#8F6544] shadow-md ring-2 ring-[#E0A97E]/60' : cardOff}`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                  {!selectedSlot && <p className="mt-3 text-xs text-[#635345]">Sélectionnez l'heure qui vous convient.</p>}
                </fieldset>

                <div className="mt-5 flex flex-col-reverse items-center gap-2 pt-4 border-t border-[#EAE2D7] sm:flex-row sm:justify-between">
                  <button type="button" onClick={() => setStep(1)} className="inline-flex min-h-11 items-center px-4 text-xs font-semibold text-[#635345] hover:text-[#2D241E]">
                    ← Retour
                  </button>
                  <button
                    type="button"
                    disabled={!selectedSlot}
                    onClick={() => setStep(3)}
                    className="w-full sm:w-auto min-h-11 px-6 py-3 rounded-full bg-[#2D241E] hover:bg-[#3E3228] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Continuer</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} className="mt-5">
                <div className="p-3 rounded-xl bg-white border border-[#E8DFD3] text-xs font-medium text-[#4A3F35] mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-[#2D241E]">{selectedPlan}</span>
                    <span className="text-[#C2B29F]">•</span>
                    <span>{currentDayConfig?.date}</span>
                    <span className="text-[#C2B29F]">•</span>
                    <span>{selectedSlot}</span>
                  </div>
                  <button type="button" onClick={() => setStep(2)} className="inline-flex min-h-11 items-center text-[#7A583E] hover:underline text-[11px] font-semibold">
                    Modifier
                  </button>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label htmlFor="booking-input-name" className="text-xs font-bold text-[#473B30] block mb-1">Votre nom & prénom *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8C7A68] absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                      <input id="booking-input-name" type="text" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Sophie Martin"
                        className="w-full min-h-11 pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#DCD1C4] text-sm text-[#2D241E] focus:outline-hidden focus:border-[#7A583E] focus-visible:ring-2 focus-visible:ring-[#A87C51]/40" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="booking-input-email" className="text-xs font-bold text-[#473B30] block mb-1">Votre adresse email *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#8C7A68] absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                      <input id="booking-input-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sophie@monbusiness.com"
                        className="w-full min-h-11 pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#DCD1C4] text-sm text-[#2D241E] focus:outline-hidden focus:border-[#7A583E] focus-visible:ring-2 focus-visible:ring-[#A87C51]/40" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#473B30] block mb-1">Votre activité & ce qui vous pèse (optionnel)</label>
                    <RichTextEditor
                      id="booking-input-note"
                      value={noteHtml}
                      placeholder="Ex: Coach business, 150 emails/jour à trier, retards de paiement..."
                      onChange={(html, text) => {
                        setNoteHtml(html);
                        setNoteText(text);
                      }}
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div role="alert" className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-bold">L'envoi a échoué.</p>
                      <p className="mt-0.5">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex flex-col-reverse items-center gap-2 pt-4 border-t border-[#EAE2D7] sm:flex-row sm:justify-between">
                  <button type="button" onClick={() => setStep(2)} className="inline-flex min-h-11 items-center px-4 text-xs font-semibold text-[#635345] hover:text-[#2D241E]">
                    ← Retour
                  </button>
                  <button
                    id="booking-submit-btn"
                    type="submit"
                    disabled={isSending}
                    aria-busy={isSending}
                    className="w-full sm:w-auto min-h-11 px-8 py-3 rounded-full bg-[#A87C51] hover:bg-[#8F6544] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:cursor-wait disabled:opacity-80"
                  >
                    {isSending ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <CheckCircle2 className="w-4 h-4" aria-hidden="true" />}
                    <span>{isSending ? 'Envoi en cours…' : 'Envoyer'}</span>
                  </button>
                </div>
                <div className="mt-2 flex justify-center">
                  <button type="button" onClick={handleClose} className="inline-flex min-h-11 items-center px-4 text-xs font-semibold text-[#635345] hover:underline">
                    ← Retour au portfolio
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
      </AnimatePresence>

      <Dialog
        open={confirmLabel !== ''}
        onOpenChange={(open) => {
          if (!open) setConfirmLabel('');
        }}
      >
        <DialogContent className="max-w-md rounded-lg border-[#E8E1D5] bg-[#FDFBF7] text-[#2D241E]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" aria-hidden="true" />
              Demande de rendez-vous envoyée !
            </DialogTitle>
            <DialogDescription>
              {confirmLabel ? `Demande envoyée pour le ${confirmLabel}. Candya vous confirme le créneau par email très vite.` : ''}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <Button type="button" variant="outline" onClick={() => setConfirmLabel('')}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
