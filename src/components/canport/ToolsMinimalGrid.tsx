import React from 'react';
import { Wrench } from 'lucide-react';
import gmailLogo from '../../assets/tools/gmail.svg';
import outlookLogo from '../../assets/tools/outlook.svg';
import googleCalendarLogo from '../../assets/tools/google-calendar.svg';
import googleSheetsLogo from '../../assets/tools/google-sheets.svg';
import excelLogo from '../../assets/tools/excel.svg';
import notionLogo from '../../assets/tools/notion.svg';
import canvaLogo from '../../assets/tools/canva.svg';
import hubspotLogo from '../../assets/tools/hubspot.svg';
import chatgptLogo from '../../assets/tools/chatgpt.svg';
import claudeLogo from '../../assets/tools/claude-ai.svg';

interface ToolItem {
  id: string;
  name: string;
  renderLogo: () => React.ReactNode;
}

/* Logos officiels uploadés — rendus en <img> pour préserver leur ratio exact.
   Trello et Stripe gardent leur logo provisoire en attendant les 2 fichiers manquants. */

const squareLogoClass = 'h-9 w-9 sm:h-11 sm:w-11 object-contain';
const wordmarkLogoClass = 'h-auto w-14 sm:w-20 max-w-full object-contain';

const mainTools: ToolItem[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    renderLogo: () => (
      <img src={gmailLogo} alt="Gmail" loading="lazy" decoding="async" className={squareLogoClass} />
    ),
  },
  {
    id: 'outlook',
    name: 'Outlook',
    renderLogo: () => (
      <img src={outlookLogo} alt="Outlook" loading="lazy" decoding="async" className={squareLogoClass} />
    ),
  },
  {
    id: 'calendar',
    name: 'Google Calendar',
    renderLogo: () => (
      <img src={googleCalendarLogo} alt="Google Calendar" loading="lazy" decoding="async" className={squareLogoClass} />
    ),
  },
  {
    id: 'sheets',
    name: 'Google Sheets',
    renderLogo: () => (
      <img src={googleSheetsLogo} alt="Google Sheets" loading="lazy" decoding="async" className={squareLogoClass} />
    ),
  },
  {
    id: 'excel',
    name: 'Microsoft Excel',
    renderLogo: () => (
      <img src={excelLogo} alt="Microsoft Excel" loading="lazy" decoding="async" className={squareLogoClass} />
    ),
  },
  {
    id: 'notion',
    name: 'Notion',
    renderLogo: () => (
      <img src={notionLogo} alt="Notion" loading="lazy" decoding="async" className={squareLogoClass} />
    ),
  },
  {
    id: 'canva',
    name: 'Canva',
    renderLogo: () => (
      <img src={canvaLogo} alt="Canva" loading="lazy" decoding="async" className={wordmarkLogoClass} />
    ),
  },
  {
    id: 'trello',
    name: 'Trello',
    renderLogo: () => (
      <div className="flex items-center gap-1 sm:gap-1.5">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#0079BF" />
          <rect x="4" y="4" width="6" height="12" rx="1.5" fill="white" />
          <rect x="14" y="4" width="6" height="8" rx="1.5" fill="white" />
        </svg>
        <span className="font-bold text-xs sm:text-sm text-[#0079BF] tracking-tight">Trello</span>
      </div>
    ),
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    renderLogo: () => (
      <img src={hubspotLogo} alt="HubSpot" loading="lazy" decoding="async" className={wordmarkLogoClass} />
    ),
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    renderLogo: () => (
      <img src={chatgptLogo} alt="ChatGPT" loading="lazy" decoding="async" className={squareLogoClass} />
    ),
  },
  {
    id: 'claude',
    name: 'Claude',
    renderLogo: () => (
      <img src={claudeLogo} alt="Claude" loading="lazy" decoding="async" className={wordmarkLogoClass} />
    ),
  },
  {
    id: 'stripe',
    name: 'Stripe',
    renderLogo: () => (
      <span className="font-extrabold text-base sm:text-lg text-[#635BFF] tracking-tight select-none">
        stripe
      </span>
    ),
  },
];

const secondaryTools = [
  'MS Word',
  'Google Docs',
  'Google Meet',
  'Google Drive',
  'Zoom',
  'Opus',
  'Systeme.io',
];

export const ToolsMinimalGrid: React.FC = () => {
  return (
    <section id="outils" className="py-14 sm:py-16 md:py-24 bg-[#FDFBF7] border-t border-[#EAE3D8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E7E0D5] text-xs font-semibold uppercase tracking-wider text-[#7A583E] mb-3 shadow-2xs">
            <Wrench className="w-3.5 h-3.5 text-[#A87C51]" />
            <span>Environnement & Outils</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D241E] tracking-tight">
            Une maîtrise fluide des plateformes incontournables
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#635345] leading-relaxed">
            Des outils essentiels pour une intégration immédiate dans vos opérations.
          </p>
        </div>

        {/* 12 Tools Grid (3 columns on mobile, 4/6 on larger screens) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-4 max-w-2xl md:max-w-3xl mx-auto">
          {mainTools.map((tool) => (
            <div
              key={tool.id}
              className="aspect-square min-w-0 rounded-xl sm:rounded-3xl bg-white border border-[#ECE5DB] shadow-2xs hover:shadow-md hover:border-[#D5C7B7] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center p-2 sm:p-4 group cursor-default overflow-hidden"
              title={tool.name}
            >
              <div className="transition-transform duration-200 group-hover:scale-105 flex items-center justify-center w-full">
                {tool.renderLogo()}
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Tools Pills */}
        <div className="mt-10 sm:mt-14 text-center">
          <h3 className="text-xs sm:text-sm font-bold text-[#2D241E] mb-4">
            Également opérationnelle sur
          </h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-lg mx-auto">
            {secondaryTools.map((tool) => (
              <span
                key={tool}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white border border-[#E2D8CC] text-xs sm:text-sm font-medium text-[#2D241E] shadow-2xs hover:bg-[#FAF7F2] hover:border-[#D5C7B7] transition-all"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
