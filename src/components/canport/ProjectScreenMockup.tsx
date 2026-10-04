import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  User,
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Mail,
  Phone,
  FileText,
  DollarSign,
  ChevronRight,
  ExternalLink,
  Sparkles,
  CheckSquare,
  ShieldAlert,
  Inbox,
  Send,
  Plus,
  Table,
  Columns3
} from 'lucide-react';

interface ProjectScreenMockupProps {
  screenshotId: string;
  isZoomed?: boolean;
}

export const ProjectScreenMockup: React.FC<ProjectScreenMockupProps> = ({
  screenshotId,
  isZoomed = false
}) => {
  // 1. Suivi Client Vue 1 : HubSpot CRM Pipeline de vente
  if (screenshotId === 'sc-1') {
    return (
      <div className="w-full h-full bg-[#F5F8FA] text-[#2D3E50] rounded-xl overflow-hidden flex flex-col font-sans select-none text-xs">
        {/* HubSpot App Top Bar */}
        <div className="bg-[#2D3E50] text-white px-3 py-2 flex items-center justify-between border-b border-[#1D2B36] shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-sm tracking-tight text-[#FF7A59] flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF7A59]" />
              HubSpot
            </span>
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1D2B36] text-[11px] text-[#CBD6E2]">
              <Search className="w-3 h-3 text-[#7C98B6]" />
              <span>Recherche ( / )</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="bg-[#00A4BD] px-2 py-0.5 rounded text-white font-medium">Breeze AI</span>
            <span className="font-medium text-[#CBD6E2] hidden sm:inline">Candya RANDRIAMANARINA</span>
            <div className="w-5 h-5 rounded-full bg-[#FF7A59] text-white font-bold flex items-center justify-center text-[10px]">
              C
            </div>
          </div>
        </div>

        {/* View Header */}
        <div className="bg-white border-b border-[#CBD6E2] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-3">
            <h4 className="text-sm font-bold text-[#33475B]">Transactions</h4>
            <div className="flex items-center gap-1 text-[11px]">
              <span className="px-2 py-1 rounded bg-[#EAF0F6] font-semibold text-[#00A4BD] border-b-2 border-[#00A4BD]">
                Toutes les transactions
              </span>
              <span className="px-2 py-1 text-[#516F90] hover:bg-[#F5F8FA] rounded cursor-pointer">
                Mes transactions
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded border border-[#CBD6E2] bg-white font-medium text-[#516F90] flex items-center gap-1">
              <Filter className="w-3 h-3" /> Pipeline De Vente
            </span>
            <button className="px-2.5 py-1 rounded bg-[#FF7A59] text-white font-semibold hover:bg-[#E56340] transition-colors flex items-center gap-1">
              <Plus className="w-3 h-3" /> Transaction
            </button>
          </div>
        </div>

        {/* Pipeline Columns Container (Kanban Stages) */}
        <div className="flex-1 overflow-x-auto p-3 sm:p-4 bg-[#F5F8FA]">
          <div className="flex gap-3 min-w-[760px] h-full items-start">
            {/* Colonne 1 : Prospection (2) */}
            <div className="w-60 bg-[#EAF0F6]/80 rounded-lg p-2.5 flex flex-col shrink-0 border border-[#DFE3EB]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#CBD6E2]">
                <div className="flex items-center gap-1.5 font-bold text-[#33475B] text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A4BD]" />
                  <span>Prospection</span>
                </div>
                <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-white text-[#516F90]">2</span>
              </div>
              <div className="space-y-2">
                <div className="bg-white p-2.5 rounded-md shadow-xs border border-[#CBD6E2] hover:border-[#00A4BD] transition-colors">
                  <span className="font-bold text-[#33475B] block mb-1 text-[11px]">
                    Assistante admin et support client
                  </span>
                  <div className="text-[10px] text-[#7C98B6] flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3" /> 08/09/2026 - 30/09/2026
                  </div>
                  <div className="text-[10px] text-[#516F90] flex items-center justify-between pt-1 border-t border-[#F5F8FA]">
                    <span className="font-medium flex items-center gap-1">
                      <User className="w-3 h-3 text-[#FF7A59]" /> Thomas Laurent
                    </span>
                    <span className="text-amber-700 bg-amber-50 px-1 rounded text-[9px] font-bold">dans 3j</span>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-md shadow-xs border border-[#CBD6E2] hover:border-[#00A4BD] transition-colors">
                  <span className="font-bold text-[#33475B] block mb-1 text-[11px]">
                    Assistante virtuelle admin et support
                  </span>
                  <div className="text-[10px] text-[#7C98B6] flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3" /> 08/09/2026 - 30/09/2026
                  </div>
                  <div className="text-[10px] text-[#516F90] flex items-center justify-between pt-1 border-t border-[#F5F8FA]">
                    <span className="font-medium flex items-center gap-1">
                      <User className="w-3 h-3 text-[#FF7A59]" /> Julien Delorme
                    </span>
                    <span className="text-slate-500 text-[9px]">il y a 34 min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne 2 : Premier Contact (1) */}
            <div className="w-60 bg-[#EAF0F6]/80 rounded-lg p-2.5 flex flex-col shrink-0 border border-[#DFE3EB]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#CBD6E2]">
                <div className="flex items-center gap-1.5 font-bold text-[#33475B] text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5C26B]" />
                  <span>Premier Contact</span>
                </div>
                <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-white text-[#516F90]">1</span>
              </div>
              <div className="bg-white p-2.5 rounded-md shadow-xs border border-[#CBD6E2] hover:border-[#F5C26B] transition-colors">
                <span className="font-bold text-[#33475B] block mb-1 text-[11px]">
                  Assistante virtuelle SAV
                </span>
                <div className="text-[10px] text-[#7C98B6] flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3" /> 08/09/2026 - 30/09/2026
                </div>
                <div className="text-[10px] text-[#516F90] flex items-center justify-between pt-1 border-t border-[#F5F8FA]">
                  <span className="font-medium flex items-center gap-1">
                    <User className="w-3 h-3 text-[#FF7A59]" /> Lucie Dupont
                  </span>
                  <span className="text-amber-700 bg-amber-50 px-1 rounded text-[9px] font-bold">dans 2j</span>
                </div>
              </div>
            </div>

            {/* Colonne 3 : Qualification (1) */}
            <div className="w-60 bg-[#EAF0F6]/80 rounded-lg p-2.5 flex flex-col shrink-0 border border-[#DFE3EB]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#CBD6E2]">
                <div className="flex items-center gap-1.5 font-bold text-[#33475B] text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E56340]" />
                  <span>Qualification</span>
                </div>
                <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-white text-[#516F90]">1</span>
              </div>
              <div className="bg-white p-2.5 rounded-md shadow-xs border border-[#CBD6E2]">
                <span className="font-bold text-[#33475B] block mb-1 text-[11px]">
                  Assistante virtuelle Admin et support
                </span>
                <div className="text-[10px] text-[#7C98B6] flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3" /> 08/09/2026 - 30/09/2026
                </div>
                <div className="text-[10px] text-[#516F90] flex items-center justify-between pt-1 border-t border-[#F5F8FA]">
                  <span className="font-medium flex items-center gap-1">
                    <User className="w-3 h-3 text-[#FF7A59]" /> Élodie Moreau
                  </span>
                  <span className="text-slate-500 text-[9px]">il y a 35 min</span>
                </div>
              </div>
            </div>

            {/* Colonne 4 : Proposition de l'offre (1) */}
            <div className="w-60 bg-[#EAF0F6]/80 rounded-lg p-2.5 flex flex-col shrink-0 border border-[#DFE3EB]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#CBD6E2]">
                <div className="flex items-center gap-1.5 font-bold text-[#33475B] text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7C5295]" />
                  <span>Proposition envoyée</span>
                </div>
                <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-white text-[#516F90]">1</span>
              </div>
              <div className="bg-white p-2.5 rounded-md shadow-xs border border-[#CBD6E2]">
                <span className="font-bold text-[#33475B] block mb-1 text-[11px]">
                  Assistante virtuelle admin et support
                </span>
                <div className="text-[10px] text-[#7C98B6] flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3" /> 08/09/2026 - 30/09/2026
                </div>
                <div className="text-[10px] text-[#516F90] flex items-center justify-between pt-1 border-t border-[#F5F8FA]">
                  <span className="font-medium flex items-center gap-1">
                    <User className="w-3 h-3 text-[#FF7A59]" /> Marc Chevalier
                  </span>
                  <span className="text-slate-500 text-[9px]">il y a 36 min</span>
                </div>
              </div>
            </div>

            {/* Colonne 5 : Gagné (1) */}
            <div className="w-60 bg-[#EAF0F6]/80 rounded-lg p-2.5 flex flex-col shrink-0 border border-[#DFE3EB]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#CBD6E2]">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Gagné (Actif)</span>
                </div>
                <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">1</span>
              </div>
              <div className="bg-white p-2.5 rounded-md shadow-xs border-l-3 border-l-emerald-500 border border-[#CBD6E2]">
                <span className="font-bold text-[#33475B] block mb-1 text-[11px]">
                  Assistante virtuelle admin et support
                </span>
                <div className="text-[10px] text-[#7C98B6] flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3" /> 08/09/2026
                </div>
                <div className="text-[10px] text-emerald-700 flex items-center justify-between pt-1 border-t border-[#F5F8FA] font-medium">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-emerald-600" /> Nina B
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 px-1 rounded text-[9px]">Signé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Suivi Client Vue 2 : HubSpot Fiche Contact Lucie Dupont
  if (screenshotId === 'sc-2') {
    return (
      <div className="w-full h-full bg-white text-[#33475B] rounded-xl overflow-hidden flex flex-col font-sans select-none text-xs">
        {/* Contact Top Bar */}
        <div className="bg-[#FAF8F5] border-b border-[#CBD6E2] px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#DFE3EB] text-[#516F90] font-bold flex items-center justify-center text-sm">
              LD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-[#2D3E50]">Lucie Dupont</h4>
                <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-bold">
                  Opportunité
                </span>
              </div>
              <span className="text-[11px] text-[#7C98B6]">lucie30@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-1 rounded bg-white border border-[#CBD6E2] text-[11px] font-medium text-[#516F90]">
              Note
            </span>
            <span className="px-2 py-1 rounded bg-white border border-[#CBD6E2] text-[11px] font-medium text-[#516F90]">
              E-mail
            </span>
            <span className="px-2 py-1 rounded bg-[#FF7A59] text-white text-[11px] font-medium">
              Tâche
            </span>
          </div>
        </div>

        {/* 3 Columns Layout (HubSpot Record Page) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-y-auto divide-y md:divide-y-0 md:divide-x divide-[#CBD6E2]">
          {/* Left Column: Informations Clés (3 cols) */}
          <div className="md:col-span-4 p-4 bg-[#F5F8FA]/60 space-y-3">
            <h5 className="font-bold text-[#2D3E50] text-xs uppercase tracking-wider mb-2">Informations clés</h5>
            <div className="space-y-2 text-[11px]">
              <div>
                <span className="text-[#7C98B6] block">Propriétaire du contact</span>
                <span className="font-semibold text-[#33475B]">Candya RANDRIAMANARINA</span>
              </div>
              <div>
                <span className="text-[#7C98B6] block">Phase du cycle de vie</span>
                <span className="inline-block px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 font-semibold text-[10px]">
                  Opportunité (Pipeline actif)
                </span>
              </div>
              <div>
                <span className="text-[#7C98B6] block">Statut du lead</span>
                <span className="font-semibold text-[#33475B]">Nouveau</span>
              </div>
              <div>
                <span className="text-[#7C98B6] block">Mode de facturation</span>
                <span className="font-semibold text-[#33475B]">Mensuel</span>
              </div>
              <div>
                <span className="text-[#7C98B6] block">Date du dernier contact</span>
                <span className="font-semibold text-[#33475B]">08/09/2026 à 08:00 (GMT+3)</span>
              </div>
            </div>
          </div>

          {/* Center Column: Synthèse Cadrage & Interactions (5 cols) */}
          <div className="md:col-span-5 p-4 space-y-4">
            {/* AI Summary Box */}
            <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[#7A583E] flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#A87C51]" />
                  Synthèse de cadrage commerciale
                </span>
                <span className="text-[10px] text-[#9A8775]">8 septembre 2026</span>
              </div>
              <p className="text-[11px] text-[#5C4D3E] leading-relaxed mb-2">
                <strong>Besoin identifié :</strong> Lors de l'appel de cadrage du 8 septembre 2026, Lucie souhaite structurer son offre de conseil et automatiser son suivi.
              </p>
              <p className="text-[11px] text-[#5C4D3E] leading-relaxed">
                <strong>Documents transmis :</strong> La proposition commerciale et la convention d'accompagnement ont été envoyées par e-mail le 8 septembre 2026.
              </p>
            </div>

            {/* Interactions Récentes */}
            <div className="p-3 rounded-lg border border-[#DFE3EB] bg-white">
              <span className="font-bold text-[#33475B] text-xs block mb-1">Interactions & Tâches sortantes</span>
              <p className="text-[11px] text-[#516F90] leading-relaxed">
                Le 8 septembre, les besoins étaient clairs et une proposition a été envoyée. Un suivi est prévu pour confirmer la signature et le rendez-vous.
              </p>
              <div className="mt-2.5 pt-2 border-t border-[#F5F8FA] flex items-center justify-between text-[10px]">
                <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-semibold">
                  Tâche attribuée à Candya (Échéance 10 sept.)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Transactions associées (3 cols) */}
          <div className="md:col-span-3 p-4 bg-[#F5F8FA]/30 space-y-3">
            <h5 className="font-bold text-[#2D3E50] text-xs uppercase tracking-wider mb-2">Transactions (1)</h5>
            <div className="p-2.5 rounded-lg bg-white border border-[#CBD6E2] shadow-2xs">
              <span className="font-bold text-[#00A4BD] text-[11px] block">Assistante virtuelle SAV</span>
              <span className="text-[10px] text-[#7C98B6] block mt-0.5">Phase : Premier Contact</span>
              <span className="text-[10px] text-[#516F90] block mt-1">Clôture prévue : 30 sept. 2026</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Suivi Client Vue 3 : HubSpot Tâches
  if (screenshotId === 'sc-3') {
    return (
      <div className="w-full h-full bg-white text-[#33475B] rounded-xl overflow-hidden flex flex-col font-sans select-none text-xs">
        {/* Header */}
        <div className="bg-[#FAF8F5] border-b border-[#CBD6E2] px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h4 className="font-bold text-sm text-[#2D3E50]">Tâches HubSpot</h4>
            <span className="px-2 py-0.5 rounded bg-[#EAF0F6] text-[#00A4BD] font-bold text-[10px]">
              Attribué à : Candya RANDRIAMANARINA (5)
            </span>
          </div>
          <span className="text-[11px] text-[#7C98B6]">Filtre : À faire prioritaire</span>
        </div>

        {/* Task Table */}
        <div className="flex-1 overflow-x-auto p-4">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b border-[#CBD6E2] text-[10px] font-bold uppercase tracking-wider text-[#7C98B6]">
                <th className="pb-2 w-8"></th>
                <th className="pb-2">Titre de la tâche</th>
                <th className="pb-2">Contact</th>
                <th className="pb-2">Statut</th>
                <th className="pb-2">Échéance</th>
                <th className="pb-2">Prochaine étape</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F4F8] text-[11px]">
              <tr className="hover:bg-[#F9FBFC]">
                <td className="py-2.5"><CheckSquare className="w-3.5 h-3.5 text-[#CBD6E2]" /></td>
                <td className="py-2.5 font-bold text-[#33475B]">Relance signature contrat</td>
                <td className="py-2.5 text-[#00A4BD] font-medium">Marc Chevalier</td>
                <td className="py-2.5"><span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">Non commencé</span></td>
                <td className="py-2.5 text-amber-700 font-medium">Demain à 08:00</td>
                <td className="py-2.5 text-[#516F90]">Validation contrat & acompte</td>
              </tr>
              <tr className="hover:bg-[#F9FBFC]">
                <td className="py-2.5"><CheckSquare className="w-3.5 h-3.5 text-[#CBD6E2]" /></td>
                <td className="py-2.5 font-bold text-[#33475B]">Rédiger la proposition</td>
                <td className="py-2.5 text-[#00A4BD] font-medium">Élodie Moreau</td>
                <td className="py-2.5"><span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">Non commencé</span></td>
                <td className="py-2.5 text-amber-700 font-medium">Demain à 08:00</td>
                <td className="py-2.5 text-[#516F90]">Rédaction & envoi de l'offre</td>
              </tr>
              <tr className="hover:bg-[#F9FBFC]">
                <td className="py-2.5"><CheckSquare className="w-3.5 h-3.5 text-[#CBD6E2]" /></td>
                <td className="py-2.5 font-bold text-[#33475B]">Relance premier contact</td>
                <td className="py-2.5 text-[#00A4BD] font-medium">Julien Delorme</td>
                <td className="py-2.5"><span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">Non commencé</span></td>
                <td className="py-2.5 text-[#516F90]">11 sept. 2026</td>
                <td className="py-2.5 text-[#516F90]">Envoi d'informations & qualification</td>
              </tr>
              <tr className="hover:bg-[#F9FBFC]">
                <td className="py-2.5"><CheckSquare className="w-3.5 h-3.5 text-[#CBD6E2]" /></td>
                <td className="py-2.5 font-bold text-[#33475B]">Suivi de dossier</td>
                <td className="py-2.5 text-[#00A4BD] font-medium">Thomas Laurent</td>
                <td className="py-2.5"><span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">Non commencé</span></td>
                <td className="py-2.5 text-[#516F90]">11 sept. 2026</td>
                <td className="py-2.5 text-[#516F90]">Envoi d'informations & qualification</td>
              </tr>
              <tr className="hover:bg-[#F9FBFC]">
                <td className="py-2.5"><CheckSquare className="w-3.5 h-3.5 text-[#CBD6E2]" /></td>
                <td className="py-2.5 font-bold text-[#33475B]">Vérifier la prise de rdv</td>
                <td className="py-2.5 text-[#00A4BD] font-medium">Lucie Dupont</td>
                <td className="py-2.5"><span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">Non commencé</span></td>
                <td className="py-2.5 text-amber-700 font-medium">10 sept. 2026</td>
                <td className="py-2.5 text-[#516F90]">Fixation de l'appel découverte</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 4. Suivi Tâches Vue 1 : Notion Table
  if (screenshotId === 'st-1') {
    return (
      <div className="w-full h-full bg-white text-[#37352F] rounded-xl overflow-hidden flex flex-col font-sans select-none text-xs">
        {/* Notion Header */}
        <div className="px-4 py-3 border-b border-[#EDECE9] bg-[#FBFAF9] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#37352F] flex items-center gap-1.5">
              <span>📋</span> Suivi des tâches
            </span>
            <span className="px-2 py-0.5 rounded bg-[#EFEFEF] text-[11px] font-semibold text-[#787774] flex items-center gap-1">
              <Table className="w-3 h-3" /> Table
            </span>
          </div>
          <span className="text-[11px] text-[#787774]">Notion Workspace • Candya</span>
        </div>

        {/* Notion Table Content */}
        <div className="flex-1 overflow-x-auto p-4">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#EDECE9] text-[10px] font-bold uppercase tracking-wider text-[#9B9A97]">
                <th className="pb-2">Tâches</th>
                <th className="pb-2">Notes</th>
                <th className="pb-2">Priorité</th>
                <th className="pb-2">Deadline</th>
                <th className="pb-2">Statut</th>
                <th className="pb-2">Responsable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7F6F5] text-[11px]">
              <tr className="hover:bg-[#FBFBFA]">
                <td className="py-2.5 font-semibold text-[#37352F]">Valider la maquette avant envoi au client</td>
                <td className="py-2.5 text-[#787774]">Vérifier la cohérence avec le brief...</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">High</span></td>
                <td className="py-2.5 text-[#37352F]">September 8, 2026</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold text-[10px]">En cours</span></td>
                <td className="py-2.5 font-medium text-[#2D241E]">Candya RANDRIAMANARINA</td>
              </tr>
              <tr className="hover:bg-[#FBFBFA]">
                <td className="py-2.5 font-semibold text-[#37352F]">Répondre à une demande de devis reçue hier</td>
                <td className="py-2.5 text-[#787774]">Prospect intéressé par une refonte...</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-bold text-[10px]">Medium</span></td>
                <td className="py-2.5 text-[#37352F]">September 8, 2026</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">Terminé</span></td>
                <td className="py-2.5 font-medium text-[#2D241E]">Candya RANDRIAMANARINA</td>
              </tr>
              <tr className="hover:bg-[#FBFBFA]">
                <td className="py-2.5 font-semibold text-[#37352F]">Livrer les visuels pour le rendu client vendredi</td>
                <td className="py-2.5 text-[#787774]">Submitted via client portal. Validation en cours...</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-bold text-[10px]">Medium</span></td>
                <td className="py-2.5 text-[#37352F]">September 15, 2026</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-[#EFEFEF] text-[#787774] font-semibold text-[10px]">À faire</span></td>
                <td className="py-2.5 text-[#9B9A97]">—</td>
              </tr>
              <tr className="hover:bg-[#FBFBFA]">
                <td className="py-2.5 font-semibold text-[#37352F]">Relancer un client pour une facture impayée</td>
                <td className="py-2.5 text-[#787774]">Client Maison Verdier relancé avec tact...</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">High</span></td>
                <td className="py-2.5 text-[#37352F]">July 15, 2026</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">Terminé</span></td>
                <td className="py-2.5 font-medium text-[#2D241E]">Candya RANDRIAMANARINA</td>
              </tr>
              <tr className="hover:bg-[#FBFBFA]">
                <td className="py-2.5 font-semibold text-[#37352F]">Envoyer les factures mensuelles aux clients actifs</td>
                <td className="py-2.5 text-[#787774]">4 factures à préparer et envoyer sous 24h...</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">High</span></td>
                <td className="py-2.5 text-[#37352F]">September 15, 2026</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-[#EFEFEF] text-[#787774] font-semibold text-[10px]">À faire</span></td>
                <td className="py-2.5 font-medium text-[#2D241E]">Candya RANDRIAMANARINA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 5. Suivi Tâches Vue 2 : Notion Kanban (Board View)
  if (screenshotId === 'st-2') {
    return (
      <div className="w-full h-full bg-white text-[#37352F] rounded-xl overflow-hidden flex flex-col font-sans select-none text-xs">
        {/* Notion Header */}
        <div className="px-4 py-3 border-b border-[#EDECE9] bg-[#FBFAF9] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#37352F] flex items-center gap-1.5">
              <span>📋</span> Suivi des tâches
            </span>
            <span className="px-2 py-0.5 rounded bg-[#EFEFEF] text-[11px] font-semibold text-[#787774] flex items-center gap-1">
              <Columns3 className="w-3 h-3" /> Board View
            </span>
          </div>
          <span className="text-[11px] text-[#787774]">Coordination fluide • 0 oubli</span>
        </div>

        {/* Kanban Columns */}
        <div className="flex-1 overflow-x-auto p-4 bg-[#FBFAF9]">
          <div className="flex gap-4 min-w-[700px] h-full items-start">
            {/* Colonne 1 : À faire (4) */}
            <div className="w-60 flex flex-col shrink-0">
              <div className="flex items-center justify-between pb-2 mb-2 font-bold text-[#787774] text-xs">
                <span>À faire</span>
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#EFEFEF]">4</span>
              </div>
              <div className="space-y-2">
                <div className="bg-white p-3 rounded-lg shadow-xs border border-[#EDECE9]">
                  <p className="font-semibold text-[#37352F] text-[11px] mb-1.5">
                    Organiser le point d'équipe hebdomadaire
                  </p>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">Low</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-xs border border-[#EDECE9]">
                  <p className="font-semibold text-[#37352F] text-[11px] mb-1.5">
                    Livrer les visuels pour le rendu client
                  </p>
                  <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 text-[9px] font-bold">Medium</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-xs border border-[#EDECE9]">
                  <p className="font-semibold text-[#37352F] text-[11px] mb-1.5">
                    Rédiger le contenu du site pour le client Atelier Ros
                  </p>
                  <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 text-[9px] font-bold">Medium</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-xs border border-[#EDECE9]">
                  <p className="font-semibold text-[#37352F] text-[11px] mb-1.5">
                    Envoyer les factures mensuelles aux clients actifs
                  </p>
                  <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 text-[9px] font-bold">High</span>
                </div>
              </div>
            </div>

            {/* Colonne 2 : En cours (1) */}
            <div className="w-60 flex flex-col shrink-0">
              <div className="flex items-center justify-between pb-2 mb-2 font-bold text-amber-800 text-xs">
                <span>En cours</span>
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-amber-100">1</span>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-xs border-l-3 border-l-amber-500 border border-[#EDECE9]">
                <p className="font-semibold text-[#37352F] text-[11px] mb-1.5">
                  Valider la maquette avant envoi au client
                </p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[9px]">High</span>
                  <span className="text-[#787774] font-medium">Candya</span>
                </div>
              </div>
            </div>

            {/* Colonne 3 : Terminé (2) */}
            <div className="w-60 flex flex-col shrink-0">
              <div className="flex items-center justify-between pb-2 mb-2 font-bold text-emerald-800 text-xs">
                <span>Terminé</span>
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-emerald-100">2</span>
              </div>
              <div className="space-y-2">
                <div className="bg-white p-3 rounded-lg shadow-xs border-l-3 border-l-emerald-500 border border-[#EDECE9]">
                  <p className="font-semibold text-[#37352F] text-[11px] mb-1 line-through text-[#787774]">
                    Répondre à une demande de devis reçue hier
                  </p>
                  <span className="text-emerald-700 text-[10px] font-medium">Traité sous 24h</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-xs border-l-3 border-l-emerald-500 border border-[#EDECE9]">
                  <p className="font-semibold text-[#37352F] text-[11px] mb-1 line-through text-[#787774]">
                    Relancer un client pour une facture impayée
                  </p>
                  <span className="text-emerald-700 text-[10px] font-medium">Régularisé</span>
                </div>
              </div>
            </div>

            {/* Colonne 4 : Bloqué (0) */}
            <div className="w-60 flex flex-col shrink-0 opacity-60">
              <div className="flex items-center justify-between pb-2 mb-2 font-bold text-[#787774] text-xs">
                <span>Bloqué</span>
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#EFEFEF]">0</span>
              </div>
              <div className="border-2 border-dashed border-[#EDECE9] rounded-lg p-6 text-center text-[#9B9A97] text-[11px]">
                Aucun blocage
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 6. Email Support SAV Vue 1 : Organisation Boîte Mail Gmail
  if (screenshotId === 'es-1') {
    return (
      <div className="w-full h-full bg-[#F6F8FC] text-[#202124] rounded-xl overflow-hidden flex flex-col font-sans select-none text-xs">
        {/* Gmail Bar */}
        <div className="px-4 py-2.5 bg-white border-b border-[#E0E2E7] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-sm text-[#D93025] flex items-center gap-1.5">
              <Mail className="w-4 h-4" /> Gmail Pro
            </span>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F3F4] text-[11px] text-[#5F6368] w-64">
              <Search className="w-3.5 h-3.5" /> Rechercher dans les messages...
            </div>
          </div>
          <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Inbox Zero • Suivi rigoureux
          </span>
        </div>

        {/* Gmail Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Libellés Sidebar */}
          <div className="w-48 bg-white border-r border-[#E0E2E7] p-3 space-y-1 shrink-0 hidden sm:block">
            <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-r-full bg-[#FCE8E6] text-[#D93025] font-bold text-[11px]">
              <span className="flex items-center gap-2"><Inbox className="w-3.5 h-3.5" /> Boîte de réception</span>
              <span>4</span>
            </button>
            <div className="pt-3 pb-1 px-2 text-[10px] font-bold text-[#5F6368] uppercase">Libellés créés :</div>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded text-[#5F6368] hover:bg-[#F1F3F4] cursor-pointer">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> [SAV & Litiges]
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded text-[#5F6368] hover:bg-[#F1F3F4] cursor-pointer">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> [Pré-Ventes & Devis]
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded text-[#5F6368] hover:bg-[#F1F3F4] cursor-pointer">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> [Accès Formations]
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded text-[#5F6368] hover:bg-[#F1F3F4] cursor-pointer">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> [Facturation]
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 bg-white p-2 overflow-y-auto divide-y divide-[#F1F3F4]">
            <div className="p-3 hover:bg-[#F8F9FA] flex items-center justify-between gap-3 cursor-pointer">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-bold text-[#202124] shrink-0">Lucia M.</span>
                <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold shrink-0">
                  SAV Remboursement
                </span>
                <span className="text-[#5F6368] truncate">Re: Demande de remboursement suite à désagrément — Traité avec tact & viré sous 48h</span>
              </div>
              <span className="text-[10px] text-[#5F6368] shrink-0 font-medium">Répondu &lt; 24h</span>
            </div>

            <div className="p-3 hover:bg-[#F8F9FA] flex items-center justify-between gap-3 cursor-pointer">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-bold text-[#202124] shrink-0">Kamel B.</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">
                  Accès formation
                </span>
                <span className="text-[#5F6368] truncate">Accès à la plateforme confirmé & disponible en illimité</span>
              </div>
              <span className="text-[10px] text-[#5F6368] shrink-0 font-medium">Répondu &lt; 1h</span>
            </div>

            <div className="p-3 hover:bg-[#F8F9FA] flex items-center justify-between gap-3 cursor-pointer">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-bold text-[#202124] shrink-0">Atelier Ros</span>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold shrink-0">
                  Devis & Offre
                </span>
                <span className="text-[#5F6368] truncate">Validation du devis et planification du call de lancement</span>
              </div>
              <span className="text-[10px] text-[#5F6368] shrink-0 font-medium">Hier</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 7. Email Support SAV Vue 2 : Email Remboursement Lucia
  if (screenshotId === 'es-2') {
    return (
      <div className="w-full h-full bg-[#FAF8F5] text-[#2D241E] rounded-xl overflow-hidden flex flex-col font-sans select-none text-xs">
        {/* Email Header */}
        <div className="px-5 py-3.5 bg-white border-b border-[#EAE3D8] shrink-0 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#7A583E] uppercase tracking-wider">Email type rédigé</span>
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                Désescalade & Remboursement
              </span>
            </div>
            <h4 className="font-bold text-sm text-[#2D241E] mt-0.5">
              Re: Demande de remboursement suite à désagrément
            </h4>
          </div>
          <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Délai de traitement : &lt; 24h
          </span>
        </div>

        {/* Email Metadata */}
        <div className="px-5 py-2.5 bg-[#FAF7F2] border-b border-[#EAE3D8] text-[11px] text-[#6E5D4F] flex flex-wrap gap-4 shrink-0">
          <div><strong>De :</strong> Candya RANDRIAMANARINA &lt;support@major-formation.com&gt;</div>
          <div><strong>À :</strong> Lucia &lt;lucia.client@gmail.com&gt;</div>
          <div><strong>Date :</strong> 8 septembre 2026</div>
        </div>

        {/* Email Body */}
        <div className="flex-1 p-5 sm:p-6 bg-white overflow-y-auto leading-relaxed text-xs sm:text-sm text-[#3E342B] space-y-4 font-sans">
          <p className="font-medium text-[#2D241E]">Bonjour Lucia,</p>
          <p>
            Je comprends tout à fait votre colère et votre frustration face à cette situation, et je suis sincèrement désolée pour le désagrément occasionné.
          </p>
          <p>
            Sachez que votre demande a bien été prise en compte et transmise en priorité à notre service comptabilité pour procéder au <strong>remboursement intégral de la somme de 297 €</strong>.
          </p>
          <p>
            Je m'occupe de faire le suivi personnellement afin que le virement soit exécuté sur votre compte sous délai, <strong>48h à 72h</strong>. Je vous enverrai un message de confirmation dès que la transaction aura été validée de notre côté.
          </p>
          <p>
            Votre satisfaction reste notre priorité, et nous regrettons sincèrement que votre expérience n'ait pas été à la hauteur de vos attentes.
          </p>
          <p>
            Je reste à votre entière disposition si vous avez la moindre question entre-temps.
          </p>
          <div className="pt-2 text-xs text-[#5C4D3E]">
            <p className="font-semibold text-[#2D241E]">Belle journée à vous,</p>
            <p className="font-bold text-[#7A583E] mt-1">L'équipe Major</p>
          </div>
        </div>
      </div>
    );
  }

  // 8. Email Support SAV Vue 3 : Email Reprise Kamel
  if (screenshotId === 'es-3') {
    return (
      <div className="w-full h-full bg-[#FAF8F5] text-[#2D241E] rounded-xl overflow-hidden flex flex-col font-sans select-none text-xs">
        {/* Email Header */}
        <div className="px-5 py-3.5 bg-white border-b border-[#EAE3D8] shrink-0 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#7A583E] uppercase tracking-wider">Email type rédigé</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Reprise de formation & Accès
              </span>
            </div>
            <h4 className="font-bold text-sm text-[#2D241E] mt-0.5">
              Accès à la formation toujours disponible
            </h4>
          </div>
          <span className="text-[11px] text-[#7A583E] bg-[#F2ECE4] px-2.5 py-1 rounded-full">
            Ton bienveillant & déculpabilisant
          </span>
        </div>

        {/* Email Metadata */}
        <div className="px-5 py-2.5 bg-[#FAF7F2] border-b border-[#EAE3D8] text-[11px] text-[#6E5D4F] flex flex-wrap gap-4 shrink-0">
          <div><strong>De :</strong> Candya RANDRIAMANARINA &lt;support@formation.com&gt;</div>
          <div><strong>À :</strong> Kamel &lt;kamel.eleve@gmail.com&gt;</div>
        </div>

        {/* Email Body */}
        <div className="flex-1 p-5 sm:p-6 bg-white overflow-y-auto leading-relaxed text-xs sm:text-sm text-[#3E342B] space-y-4 font-sans">
          <p className="font-medium text-[#2D241E]">Bonjour Kamel,</p>
          <p>Merci pour votre message.</p>
          <p>
            Oui, rassurez-vous, votre accès à la formation est <strong>toujours valide</strong>. Vous pouvez donc reprendre le programme quand vous le souhaitez et avancer à votre propre rythme.
          </p>
          <p>
            Nous vous souhaitons une très belle reprise et surtout, prenez le temps dont vous avez besoin pour en profiter pleinement.
          </p>
          <div className="pt-2 text-xs text-[#5C4D3E]">
            <p className="font-semibold text-[#2D241E]">Bien à vous,</p>
            <p className="font-bold text-[#7A583E] mt-1">L'équipe</p>
          </div>
        </div>
      </div>
    );
  }

  // 9. Suivi Paiements Vue 1 : Google Sheets Suivi des paiements
  if (screenshotId === 'sp-1') {
    return (
      <div className="w-full h-full bg-white text-[#202124] rounded-xl overflow-hidden flex flex-col font-sans select-none text-xs">
        {/* Google Sheets Top Bar */}
        <div className="px-3 py-2 bg-[#F9FBFD] border-b border-[#E0E2E7] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-emerald-600 text-white font-bold flex items-center justify-center text-[9px]">
              田
            </span>
            <span className="font-bold text-sm text-[#202124]">suivi des paiements</span>
            <span className="text-[10px] text-[#5F6368] hidden sm:inline">• Fichier Google Sheets</span>
          </div>
          <span className="text-[10px] font-mono text-[#5F6368] bg-[#E8EAED] px-2 py-0.5 rounded">
            fx = SUIVI DES PAIEMENTS
          </span>
        </div>

        {/* Google Sheets Table Content */}
        <div className="flex-1 overflow-x-auto p-2 bg-[#F8F9FA]">
          <table className="w-full text-left border-collapse min-w-[780px] bg-white border border-[#D0D5DD]">
            <thead>
              {/* Group Headers */}
              <tr className="text-[10px] font-bold uppercase text-white">
                <th colSpan={4} className="bg-[#1A365D] py-1.5 px-2 border-r border-white/20">
                  CLIENT & PRODUIT
                </th>
                <th colSpan={5} className="bg-[#0F766E] py-1.5 px-2 border-r border-white/20">
                  PAIEMENT
                </th>
                <th colSpan={4} className="bg-[#854D0E] py-1.5 px-2">
                  ÉCHÉANCES & RESTE
                </th>
              </tr>
              {/* Column Headers */}
              <tr className="bg-[#F1F5F9] text-[10px] font-bold text-[#475467] border-b border-[#D0D5DD]">
                <th className="py-2 px-2 border-r border-[#E4E7EC]">Nom Client</th>
                <th className="py-2 px-2 border-r border-[#E4E7EC]">Date Achat</th>
                <th className="py-2 px-2 border-r border-[#E4E7EC]">Total (€)</th>
                <th className="py-2 px-2 border-r border-[#D0D5DD]">Versements</th>
                <th className="py-2 px-2 border-r border-[#E4E7EC]">Montant/vers.</th>
                <th className="py-2 px-2 border-r border-[#E4E7EC]">Plateforme</th>
                <th className="py-2 px-2 border-r border-[#D0D5DD]">Statut</th>
                <th className="py-2 px-2 border-r border-[#E4E7EC]">Date V1</th>
                <th className="py-2 px-2 border-r border-[#E4E7EC]">Date V2</th>
                <th className="py-2 px-2 border-r border-[#E4E7EC]">Date V3</th>
                <th className="py-2 px-2 font-bold text-[#1A365D]">Reste dû (€)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] text-[11px]">
              <tr className="hover:bg-[#F8F9FA]">
                <td className="py-2 px-2 font-bold text-[#101828] border-r border-[#EAECF0]">Marie Dupont</td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#EAECF0]">01/06/2026</td>
                <td className="py-2 px-2 font-semibold border-r border-[#EAECF0]">297,00 €</td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#D0D5DD]">3</td>
                <td className="py-2 px-2 border-r border-[#EAECF0]">99,00 €</td>
                <td className="py-2 px-2 border-r border-[#EAECF0]">Stripe</td>
                <td className="py-2 px-2 border-r border-[#D0D5DD]">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    Payé
                  </span>
                </td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#EAECF0]">01/06</td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#EAECF0]">01/07</td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#EAECF0]">01/08</td>
                <td className="py-2 px-2 font-bold text-emerald-700">0,00 €</td>
              </tr>

              <tr className="hover:bg-[#F8F9FA]">
                <td className="py-2 px-2 font-bold text-[#101828] border-r border-[#EAECF0]">Thomas Martin</td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#EAECF0]">05/06/2026</td>
                <td className="py-2 px-2 font-semibold border-r border-[#EAECF0]">497,00 €</td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#D0D5DD]">1</td>
                <td className="py-2 px-2 border-r border-[#EAECF0]">497,00 €</td>
                <td className="py-2 px-2 border-r border-[#EAECF0]">PayPal</td>
                <td className="py-2 px-2 border-r border-[#D0D5DD]">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    Payé
                  </span>
                </td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#EAECF0]">05/06</td>
                <td className="py-2 px-2 text-[#98A2B3] border-r border-[#EAECF0]">—</td>
                <td className="py-2 px-2 text-[#98A2B3] border-r border-[#EAECF0]">—</td>
                <td className="py-2 px-2 font-bold text-emerald-700">0,00 €</td>
              </tr>

              <tr className="bg-rose-50/40 hover:bg-rose-50/70">
                <td className="py-2 px-2 font-bold text-[#101828] border-r border-[#EAECF0]">Sophie Laurent</td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#EAECF0]">08/06/2026</td>
                <td className="py-2 px-2 font-semibold border-r border-[#EAECF0]">297,00 €</td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#D0D5DD]">2</td>
                <td className="py-2 px-2 border-r border-[#EAECF0]">148,50 €</td>
                <td className="py-2 px-2 border-r border-[#EAECF0]">Stripe</td>
                <td className="py-2 px-2 border-r border-[#D0D5DD]">
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
                    Échoué (Relancé)
                  </span>
                </td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#EAECF0]">08/06</td>
                <td className="py-2 px-2 text-rose-700 font-semibold border-r border-[#EAECF0]">Rejeté</td>
                <td className="py-2 px-2 text-[#98A2B3] border-r border-[#EAECF0]">—</td>
                <td className="py-2 px-2 font-bold text-rose-700">148,50 €</td>
              </tr>

              <tr className="hover:bg-[#F8F9FA]">
                <td className="py-2 px-2 font-bold text-[#101828] border-r border-[#EAECF0]">Lucas Bernard</td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#EAECF0]">10/06/2026</td>
                <td className="py-2 px-2 font-semibold border-r border-[#EAECF0]">497,00 €</td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#D0D5DD]">3</td>
                <td className="py-2 px-2 border-r border-[#EAECF0]">165,67 €</td>
                <td className="py-2 px-2 border-r border-[#EAECF0]">Klarna</td>
                <td className="py-2 px-2 border-r border-[#D0D5DD]">
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
                    Remboursé
                  </span>
                </td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#EAECF0]">10/06</td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#EAECF0]">10/07</td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#EAECF0]">10/08</td>
                <td className="py-2 px-2 font-bold text-[#475467]">0,00 €</td>
              </tr>

              <tr className="bg-amber-50/40 hover:bg-amber-50/70">
                <td className="py-2 px-2 font-bold text-[#101828] border-r border-[#EAECF0]">André</td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#EAECF0]">16/06/2026</td>
                <td className="py-2 px-2 font-semibold border-r border-[#EAECF0]">497,00 €</td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#D0D5DD]">2</td>
                <td className="py-2 px-2 border-r border-[#EAECF0]">248,50 €</td>
                <td className="py-2 px-2 border-r border-[#EAECF0]">Stripe</td>
                <td className="py-2 px-2 border-r border-[#D0D5DD]">
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                    En attente
                  </span>
                </td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#EAECF0]">16/06</td>
                <td className="py-2 px-2 text-amber-700 font-semibold border-r border-[#EAECF0]">16/07</td>
                <td className="py-2 px-2 text-[#98A2B3] border-r border-[#EAECF0]">—</td>
                <td className="py-2 px-2 font-bold text-amber-800">248,50 €</td>
              </tr>

              <tr className="hover:bg-[#F8F9FA]">
                <td className="py-2 px-2 font-bold text-[#101828] border-r border-[#EAECF0]">Lucie Martine</td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#EAECF0]">20/06/2026</td>
                <td className="py-2 px-2 font-semibold border-r border-[#EAECF0]">297,00 €</td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#D0D5DD]">1</td>
                <td className="py-2 px-2 border-r border-[#EAECF0]">297,00 €</td>
                <td className="py-2 px-2 border-r border-[#EAECF0]">Virement</td>
                <td className="py-2 px-2 border-r border-[#D0D5DD]">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    Payé
                  </span>
                </td>
                <td className="py-2 px-2 text-[#475467] border-r border-[#EAECF0]">20/06</td>
                <td className="py-2 px-2 text-[#98A2B3] border-r border-[#EAECF0]">—</td>
                <td className="py-2 px-2 text-[#98A2B3] border-r border-[#EAECF0]">—</td>
                <td className="py-2 px-2 font-bold text-emerald-700">0,00 €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 10. Suivi Paiements Vue 2 : Notion Suivi mensuel des paiements
  if (screenshotId === 'sp-2') {
    return (
      <div className="w-full h-full bg-white text-[#37352F] rounded-xl overflow-hidden flex flex-col font-sans select-none text-xs">
        {/* Notion Header */}
        <div className="px-4 py-3 border-b border-[#EDECE9] bg-[#FBFAF9] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#37352F] flex items-center gap-1.5">
              <span>💳</span> Suivi des paiements
            </span>
            <span className="px-2 py-0.5 rounded bg-[#EFEFEF] text-[11px] font-semibold text-[#787774]">
              Base Notion • Vue Tous les clients
            </span>
          </div>
          <span className="text-[11px] text-[#787774]">Zéro impayé • Relances sous 48h</span>
        </div>

        {/* Notion Table Content */}
        <div className="flex-1 overflow-x-auto p-4">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-[#EDECE9] text-[10px] font-bold uppercase tracking-wider text-[#9B9A97]">
                <th className="pb-2">Client</th>
                <th className="pb-2">Moyen</th>
                <th className="pb-2">Total</th>
                <th className="pb-2">Fois</th>
                <th className="pb-2">Mois échus</th>
                <th className="pb-2">Encaissé</th>
                <th className="pb-2">Statut</th>
                <th className="pb-2">Notes & Relances</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7F6F5] text-[11px]">
              <tr className="hover:bg-[#FBFBFA]">
                <td className="py-2 font-semibold text-[#37352F]">Gabriel Alexandre</td>
                <td className="py-2 text-[#787774]">Stripe</td>
                <td className="py-2 font-medium">€698.00</td>
                <td className="py-2 text-[#787774]">2</td>
                <td className="py-2 text-[#787774]">349 (Jan) + 349 (Fév)</td>
                <td className="py-2 font-bold text-emerald-700">€698.00</td>
                <td className="py-2"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Payé</span></td>
                <td className="py-2 text-[#9B9A97]">Régularisé sans relance</td>
              </tr>

              <tr className="hover:bg-[#FBFBFA]">
                <td className="py-2 font-semibold text-[#37352F]">Mathéo</td>
                <td className="py-2 text-[#787774]">Virement</td>
                <td className="py-2 font-medium">€298.00</td>
                <td className="py-2 text-[#787774]">1</td>
                <td className="py-2 text-[#787774]">298 (Fév)</td>
                <td className="py-2 font-bold text-emerald-700">€298.00</td>
                <td className="py-2"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Payé</span></td>
                <td className="py-2 text-[#9B9A97]">Reçu bancaire vérifié</td>
              </tr>

              <tr className="bg-rose-50/30 hover:bg-rose-50/60">
                <td className="py-2 font-semibold text-[#37352F]">Elodie Fontes</td>
                <td className="py-2 text-[#787774]">Stripe</td>
                <td className="py-2 font-medium">€1,000.00</td>
                <td className="py-2 text-[#787774]">5</td>
                <td className="py-2 text-[#787774]">200 + 200 + 200</td>
                <td className="py-2 font-bold text-rose-700">€600.00</td>
                <td className="py-2"><span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">Échoué</span></td>
                <td className="py-2 text-rose-700 font-medium">Accès suspendu • Relancée</td>
              </tr>

              <tr className="hover:bg-[#FBFBFA]">
                <td className="py-2 font-semibold text-[#37352F]">Lucie</td>
                <td className="py-2 text-[#787774]">Stripe</td>
                <td className="py-2 font-medium">€298.00</td>
                <td className="py-2 text-[#787774]">2</td>
                <td className="py-2 text-[#787774]">149 (Mar) + 149 (Avr)</td>
                <td className="py-2 font-bold text-emerald-700">€298.00</td>
                <td className="py-2"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Payé</span></td>
                <td className="py-2 text-[#9B9A97]">À jour</td>
              </tr>

              <tr className="hover:bg-[#FBFBFA]">
                <td className="py-2 font-semibold text-[#37352F]">Alain</td>
                <td className="py-2 text-[#787774]">Stripe</td>
                <td className="py-2 font-medium">€1,000.00</td>
                <td className="py-2 text-[#787774]">2</td>
                <td className="py-2 text-[#787774]">500 (Avr) + 500 (Mai)</td>
                <td className="py-2 font-bold text-emerald-700">€1,000.00</td>
                <td className="py-2"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Payé</span></td>
                <td className="py-2 text-[#9B9A97]">Solde intégral réglé</td>
              </tr>

              <tr className="bg-amber-50/30 hover:bg-amber-50/60">
                <td className="py-2 font-semibold text-[#37352F]">Juliot</td>
                <td className="py-2 text-[#787774]">Stripe</td>
                <td className="py-2 font-medium">€1,000.00</td>
                <td className="py-2 text-[#787774]">2</td>
                <td className="py-2 text-[#787774]">500 (Mai)</td>
                <td className="py-2 font-bold text-amber-700">€500.00</td>
                <td className="py-2"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">En attente</span></td>
                <td className="py-2 text-amber-800 font-medium">1ère relance envoyée le 10</td>
              </tr>

              <tr className="bg-amber-50/30 hover:bg-amber-50/60">
                <td className="py-2 font-semibold text-[#37352F]">Thomas</td>
                <td className="py-2 text-[#787774]">Virement</td>
                <td className="py-2 font-medium">€698.00</td>
                <td className="py-2 text-[#787774]">1</td>
                <td className="py-2 text-[#787774]">—</td>
                <td className="py-2 font-bold text-amber-700">€0.00</td>
                <td className="py-2"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">En attente</span></td>
                <td className="py-2 text-amber-800 font-medium">Relancé par email avec RIB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#FAF7F2] text-[#5C4D3E]">
      <FileText className="w-8 h-8 text-[#A87C51] mb-2" />
      <span className="font-bold text-sm">Visualisation du cas</span>
    </div>
  );
};
