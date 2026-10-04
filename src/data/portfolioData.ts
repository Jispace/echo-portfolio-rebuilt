import { Project, BeforeAfter, ProcessStep } from '../portfolio-types';
import suiviClientVue1 from '../assets/projects/suivi-client-vue-1.png';
import suiviClientVue2 from '../assets/projects/suivi-client-vue-2.png';
import suiviClientVue3 from '../assets/projects/suivi-client-vue-3.png';
import suiviTachesVue1 from '../assets/projects/suivi-taches-vue-1.png';
import suiviTachesVue2 from '../assets/projects/suivi-taches-vue-2.png';
import suiviTachesVue3 from '../assets/projects/suivi-taches-vue-3.jpg';
import boiteMailVue1 from '../assets/projects/boite-mail-vue-1.jpg';
import exempleEmailVue2 from '../assets/projects/exemple-email-vue-2.png';
import exempleEmailVue3 from '../assets/projects/exemple-email-vue-3.png';
import suiviPaiementVue1 from '../assets/projects/suivi-paiement-vue-1.png';
import suiviPaiementVue2 from '../assets/projects/suivi-paiement-vue-2.png';

export const portfolioProfile = {
  name: "Candya Randriamanarina",
  shortName: "Candya R.",
  title: "Assistante virtuelle indépendante",
  subtitle: "Organisation administrative & Support client écrit",
  targetAudience: "Pour les coachs & formateurs en ligne",
  tagline: "Vous créez, vendez, coachez. Je fais tourner le reste.",
  heroDescription:
    "J'apporte de l'ordre, de la rigueur et une touche humaine là où tout semble déborder. Libérez-vous de l'administratif pour vous consacrer pleinement à ce qui vous fait vibrer.",
  about: {
    bioParagraph1:
      "Je m'appelle Candya Randriamanarina, assistante virtuelle indépendante. Si tu es coach ou formateur·rice en ligne, je suis là pour t'aider à retrouver de l'air dans ton quotidien : apporter de l'ordre là où tout déborde, et te redonner la liberté de te recentrer sur l'essentiel. Aujourd'hui, je gère déjà l'ensemble de l'administratif d'une agence de 5 coachs — un vrai gage de fiabilité, même à plus grande échelle.",
    bioParagraph2:
      "Concrètement, je prends en charge ta boîte mail, ton agenda, le suivi de tes élèves, ta facturation et tes échanges clients — avec rigueur et réactivité, pour que tu te consacres pleinement à ce qui te fait vibrer : créer, vendre, coacher.",
    bioParagraph3:
      "Ce qui me distingue, ce n'est pas seulement ma rigueur, c'est la façon dont je m'implique. Je prends le temps de comprendre ta façon de fonctionner, et je m'adapte à toi, jamais l'inverse. Chaque message, chaque client, chaque détail est traité avec la même attention que s'il s'agissait du mien. Douceur, rigueur et réactivité ne sont pas que des mots pour moi : c'est sincèrement ce que je mets dans chaque mission.",
    personalNote:
      "En dehors de l'administratif, j'aime voyager et cuisiner. C'est ce qui me permet de recharger mes batteries, et de revenir chaque jour avec la même énergie et la même envie de bien faire.",
    mantra:
      "« Je ne me contente pas d'exécuter des tâches : j'observe, j'anticipe, je m'adapte à la façon de travailler de la personne que j'accompagne. »",
    ultimateOutcome:
      "Le vrai résultat, c'est de retrouver du temps mais surtout de se sentir enfin léger·e. De savoir que tes élèves sont bien accompagnés même quand tu n'es pas derrière l'écran."
  },
  links: {
    linkedin: "https://www.linkedin.com/in/candya-randriamanarina-5439a2285",
    calendly: "https://calendly.com/rancandya/appel-decouverte-candya",
    email: "rancandya@gmail.com",
  },
  schedule: {
    timezone: "East Africa Time (EAT)",
    timezoneOffset: "UTC+3",
    summary: "Mardi (08:00 - 11:30) • Mercredi (09:00 - 14:30) • Jeudi (09:00 - 11:30)",
    activeDays: [
      { day: "Mardi", hours: "08:00 - 11:30", active: true },
      { day: "Mercredi", hours: "09:00 - 14:30", active: true },
      { day: "Jeudi", hours: "09:00 - 11:30", active: true },
    ],
  },
};

export const candyaSchedule = portfolioProfile.schedule;

export interface ServicePlan {
  id: string;
  name: string;
  badge: string;
  shortDescription: string;
  recommendedFor: string;
}

export const servicePlans: ServicePlan[] = [
  {
    id: "admin",
    name: "Organisation Administrative",
    badge: "Essentiel",
    shortDescription: "Boîte mail inbox zero, gestion d'agenda sans conflit, suivi des tâches & facturation.",
    recommendedFor: "Coachs dont la boîte mail et l'administratif débordent"
  },
  {
    id: "support",
    name: "Support Client Écrit",
    badge: "Relation Apprenants",
    shortDescription: "Réponses aux questions, désescalade, gestion des accès et litiges sous 24h ouvrées.",
    recommendedFor: "Formateurs avec des dizaines d'élèves à chouchouter"
  },
  {
    id: "duo",
    name: "Formule Complète : Duo Admin & Support",
    badge: "100% Sérénité",
    shortDescription: "Prise en charge intégrale de votre back-office administratif et de toute la relation élève.",
    recommendedFor: "Entrepreneurs qui veulent se concentrer uniquement sur créer et vendre"
  },
];

export const CALENDLY_BASE_URL = "https://calendly.com/rancandya/appel-decouverte-candya";

export function getCalendlyUrl(
  plan?: string,
  extraParams?: { name?: string; email?: string; note?: string }
): string {
  const base = "https://calendly.com/rancandya/appel-decouverte-candya";
  const params = new URLSearchParams();
  if (plan) {
    params.set('utm_campaign', 'portfolio_booking');
    params.set('utm_content', plan);
    params.set('a1', plan);
  }
  if (extraParams?.name) {
    params.set('name', extraParams.name);
  }
  if (extraParams?.email) {
    params.set('email', extraParams.email);
  }
  if (extraParams?.note) {
    params.set('a2', extraParams.note);
  }
  return `${base}?${params.toString()}`;
}

export const coreValues = [
  {
    title: "Douceur",
    description: "Un ton chaleureux, bienveillant et profondément humain, même dans les échanges les plus délicats.",
    icon: "Heart",
    accent: "#8C5E47",
  },
  {
    title: "Rigueur",
    description: "Rien ne se perd : chaque tâche, chaque email, chaque facture et chaque paiement est méticuleusement suivi.",
    icon: "CheckCircle2",
    accent: "#4A3C31",
  },
  {
    title: "Réactivité",
    description: "Les demandes sont traitées vite et sans délai : aucun élève ni prospect n'attend dans le flou.",
    icon: "Zap",
    accent: "#A87C51",
  },
];

export const competencies = {
  administrative: [
    { label: "Gestion de boîte mail", detail: "Tri intelligent, réponses soignées, priorisation et inbox zero" },
    { label: "Gestion d'agenda", detail: "Planification des calls, sessions de coaching et rendez-vous sans conflits" },
    { label: "Suivi des tâches", detail: "Rien n'est oublié, chaque action est tracée avec échéance et responsable" },
    { label: "Suivi client & élèves", detail: "Qui a payé, où en est chaque apprenant, qui doit être relancé" },
    { label: "Facturation & paiements", detail: "Émission des factures, rapprochement bancaire et relances sous 48h" },
  ],
  clientSupport: [
    { label: "Réponses aux demandes d'informations", detail: "Accueil chaleureux des prospects et orientation claire" },
    { label: "Gestion des demandes de remboursement", detail: "Traitement bienveillant avec tact et désescalade immédiate" },
    { label: "Gestion des accès aux formations", detail: "Déblocage rapide des espaces membres, plateformes et cours" },
    { label: "Traitement des demandes de facture", detail: "Émission rapide et personnalisée pour chaque apprenant" },
  ]
};

export const beforeAfterData: BeforeAfter[] = [
  {
    before: "Une boîte mail qui déborde et génère du stress",
    after: "Une boîte mail sous contrôle, toujours à jour",
    iconName: "Mail",
  },
  {
    before: "Des élèves qui attendent une réponse pendant des jours",
    after: "Des élèves pris en charge rapidement avec bienveillance",
    iconName: "Users",
  },
  {
    before: "Un agenda en chaos avec des chevauchements de rendez-vous",
    after: "Un agenda net, fluide, sans conflit d'horaire",
    iconName: "Calendar",
  },
  {
    before: "Des factures en retard et des impayés non identifiés",
    after: "Des paiements suivis sans faille et relancés sous 48h",
    iconName: "CreditCard",
  },
  {
    before: "Toi, débordé·e et épuisé·e par l'administratif",
    after: "Toi, serein·e et concentré·e sur ce qui compte : créer & coacher",
    iconName: "Sparkles",
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "On se parle",
    description: "Un appel découverte gratuit et sans engagement de 30 minutes. On prend le temps de comprendre ce qui te pèse vraiment aujourd'hui et on voit ensemble comment je peux t'aider.",
    badge: "30 min offert",
  },
  {
    step: 2,
    title: "Je t'envoie une proposition claire",
    description: "Après notre échange, je formalise ce qu'on a vu ensemble : la formule parfaitement adaptée à tes besoins réels, avec un périmètre défini et transparent.",
    badge: "Sous 48h",
  },
  {
    step: 3,
    title: "On pose les bases ensemble",
    description: "Un questionnaire d'onboarding simple et rapide : tes outils préférés, tes habitudes de travail, tes préférences de communication. Tout est cadré par écrit avant de commencer.",
    badge: "Cadrage précis",
  },
  {
    step: 4,
    title: "Je prends le relais",
    description: "Ton administratif et ta relation client sont pris en charge avec un suivi régulier pour que tu gardes toujours une vision claire, sans jamais avoir à t'en soucier.",
    badge: "100% Sérénité",
  },
];

export const projectsData: Project[] = [
  {
    id: "suivi-clients",
    number: "01",
    title: "Suivi des clients",
    shortDescription: "Pipeline de vente complet et historique centralisé du premier contact au post-vente.",
    tools: ["HubSpot CRM", "Pipeline", "Fiches contacts", "Tâches CRM"],
    tags: ["CRM", "Pipeline de vente", "Relation prospects", "Post-vente"],
    need: "À mesure que le nombre de prospects et de clients augmentait, garder une vision claire de qui en était où — premier contact, appel réalisé, proposition envoyée, client actif — devenait de plus en plus difficile à faire de tête.",
    solution: "Configuration d'un pipeline complet sur HubSpot pour suivre chaque prospect de la prise de contact jusqu'à la signature, puis pour assurer le suivi une fois le client actif (paiements, avancement, historique des échanges), le tout centralisé dans un seul et même outil.",
    result: "Un système de suivi complet, du premier contact au suivi post-vente, avec un taux de relance largement amélioré et plus aucune opportunité perdue faute de suivi.",
    highlightBadge: "Pipeline 100% tracé · Taux de relance optimisé",
    accentColor: "#F97316",
    screenshots: [
      {
        id: "sc-1",
        title: "Vue 1 — Pipeline HubSpot & Cycle d'accompagnement",
        subtitle: "Colonnes : Prospection, Premier Contact, Qualification, Proposition, Gagné",
        type: "hubspot",
        imageUrl: suiviClientVue1
      },
      {
        id: "sc-2",
        title: "Vue 2 — Fiche contact détaillée & Synthèse client",
        subtitle: "Historique complet, propositions envoyées et prochaines étapes identifiées",
        type: "hubspot",
        imageUrl: suiviClientVue2
      },
      {
        id: "sc-3",
        title: "Vue 3 — Planification des tâches & Relances prospects",
        subtitle: "Filtres d'échéances et préparation des signatures d'accompagnement",
        type: "hubspot",
        imageUrl: suiviClientVue3
      }
    ]
  },
  {
    id: "suivi-taches",
    number: "02",
    title: "Suivi des tâches & Coordination",
    shortDescription: "Centralisation des actions d'équipe, priorités et plannings de livrables.",
    tools: ["Notion", "Trello", "ClickUp", "Gestion de projet"],
    tags: ["Coordination d'équipe", "Tableaux Kanban", "Priorisation"],
    need: "Une activité où les tâches administratives et celles de l'équipe (création de contenu, montage vidéo, validation) étaient éparpillées entre les emails, les messages et la mémoire de chacun avec le risque réel d'en oublier une.",
    solution: "Mise en place d'un tableau de suivi partagé sur Notion et Trello, organisé par statut (à faire, en cours, en révision, terminé), avec une personne assignée, un niveau de priorité (High / Medium / Low) et une échéance claire pour chaque tâche.",
    result: "Plus aucune tâche perdue dans les échanges, une équipe qui sait exactement qui fait quoi et pour quand, et un gain de temps notable sur les points de coordination hebdomadaires.",
    highlightBadge: "Zéro tâche oubliée · Alignement total",
    accentColor: "#3B82F6",
    screenshots: [
      {
        id: "st-1",
        title: "Vue 1 — Notion Table & Gestion des priorités",
        subtitle: "Suivi exhaustif avec indicateurs visuels, responsables et deadlines précises",
        type: "notion",
        imageUrl: suiviTachesVue1
      },
      {
        id: "st-2",
        title: "Vue 2 — Notion Kanban dynamique par statut",
        subtitle: "Colonnes 'À faire', 'En cours', 'Terminé' avec déplacement fluide",
        type: "notion",
        imageUrl: suiviTachesVue2
      },
      {
        id: "st-3",
        title: "Vue 3 — Liste des espaces & livrables",
        subtitle: "Vue structurée des espaces de travail et des livrables à coordonner",
        type: "notion",
        imageUrl: suiviTachesVue3
      }
    ]
  },
  {
    id: "email-support-sav",
    number: "03",
    title: "Email type & Gestion SAV",
    shortDescription: "Traitement chaleureux des litiges, gestion des accès et boîte mail zéro stress.",
    tools: ["Gmail", "Système de libellés", "Support écrit"],
    tags: ["Relation client", "Diplomatie", "Désescalade", "Moins de 24h"],
    need: "Répondre vite et avec tact à une demande de remboursement, un moment souvent délicat où le client peut être déçu ou frustré, sans faire attendre ni improviser à chaque fois une réponse différente.",
    solution: "Création d'un modèle de réponse chaleureux, empathique et clair, adapté à chaque situation, qui rassure sur le traitement de la demande tout en gardant un ton humain et respectueux de la marque. Structuration de la boîte Gmail avec libellés dédiés (SAV, Pré-Ventes, Questions urgentes).",
    result: "Une réponse envoyée en moins de 24h à chaque demande, un client qui se sent entendu et rassuré même dans un moment de frustration, et aucune dégradation de la relation malgré une expérience négative au départ.",
    highlightBadge: "Réponse < 24h · 100% satisfaction",
    accentColor: "#A87C51",
    emailTemplate: {
      recipient: "Bonjour Lucia,",
      subject: "Re: Demande de remboursement suite à désagrément",
      body: "Je comprends tout à fait votre colère et votre frustration face à cette situation, et je suis sincèrement désolée pour le désagrément occasionné.\nSachez que votre demande a bien été prise en compte et transmise en priorité à notre service comptabilité pour procéder au remboursement intégral de la somme de 297 €.\n\nJe m'occupe de faire le suivi personnellement afin que le virement soit exécuté sur votre compte sous délai, 48h à 72h. Je vous enverrai un message de confirmation dès que la transaction aura été validée de notre côté.\n\nVotre satisfaction reste notre priorité, et nous regrettons sincèrement que votre expérience n'ait pas été à la hauteur de vos attentes.\n\nJe reste à votre entière disposition si vous avez la moindre question entre-temps."
    },
    screenshots: [
      {
        id: "es-1",
        title: "Vue 1 — Organisation Gmail & Tri rigoureux par libellés",
        subtitle: "Boîte de réception structurée sans aucun message en souffrance (SAV, Pré-Ventes)",
        type: "email",
        imageUrl: boiteMailVue1
      },
      {
        id: "es-2",
        title: "Vue 2 — Exemple d'email type rédigé (remboursement)",
        subtitle: "Réponse empathique, claire et rassurante envoyée en moins de 24h",
        type: "email",
        imageUrl: exempleEmailVue2
      },
      {
        id: "es-3",
        title: "Vue 3 — Exemple d'email de reprise d'accès",
        subtitle: "Réponse claire, rassurante et personnalisée pour accompagner un apprenant",
        type: "email",
        imageUrl: exempleEmailVue3
      }
    ]
  },
  {
    id: "suivi-paiements",
    number: "04",
    title: "Suivi des paiements",
    shortDescription: "Centralisation des abonnements, échéances et relances d'impayés.",
    tools: ["Google Sheets", "Notion", "Stripe", "PayPal"],
    tags: ["Organisation financière", "Zéro impayé", "Reporting"],
    need: "Un client avec plusieurs formules d'abonnement et des échéances de paiement différentes selon les élèves, qui perdait du temps à recouper manuellement qui avait payé, qui était en retard, et qui devait être relancé.",
    solution: "Mise en place d'un tableau de suivi centralisé sur Notion avec le statut de paiement de chaque client visible en un coup d'œil, complété par un tableau Google Sheets pour la vue mensuelle globale et les exports comptables. Les deux outils restent synchronisés grâce à une mise à jour hebdomadaire fixe.",
    result: "Zéro paiement oublié depuis la mise en place, des relances envoyées sous 48h dès qu'un retard est détecté, et une vision claire du chiffre d'affaires encaissé chaque mois sans avoir à tout reconstituer à la main.",
    highlightBadge: "0 paiement oublié · Relances < 48h",
    accentColor: "#10B981",
    screenshots: [
      {
        id: "sp-1",
        title: "Vue 1 — Suivi des paiements Google Sheets & Échéancier",
        subtitle: "Rapprochement par produit, montants, statut (Payé, Échoué, En attente) et échéances",
        type: "sheets",
        imageUrl: suiviPaiementVue1
      },
      {
        id: "sp-2",
        title: "Vue 2 — Base Notion Suivi mensuel & Statuts des relances",
        subtitle: "Fiches clients, ventilation des mensualités, identification des échecs et historique des relances",
        type: "notion",
        imageUrl: suiviPaiementVue2
      }
    ]
  }
];

export const allToolsList = [
  { name: "Notion", category: "Organisation & Espaces de travail" },
  { name: "HubSpot CRM", category: "Pipeline commercial & Fiches clients" },
  { name: "Trello", category: "Gestion Kanban des tâches" },
  { name: "Gmail", category: "Boîte mail & Libellés organisés" },
  { name: "Google Sheets", category: "Suivi de trésorerie & Tableaux" },
  { name: "Stripe", category: "Paiements récurrents & Abonnements" },
  { name: "Claude / ChatGPT", category: "Assistance IA & Rédaction de process" },
  { name: "Google Calendar", category: "Gestion des créneaux & Rendez-vous" },
  { name: "Google Docs", category: "Documents collaboratifs" },
  { name: "Zoom / Google Meet", category: "Visioconférence & Réunions" },
  { name: "Systeme.io", category: "Formations & Tunnels de vente" },
];
