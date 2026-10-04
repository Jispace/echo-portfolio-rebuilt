import React, { useEffect, useRef, useState } from 'react';
import { projectsData } from '../../data/portfolioData';
import { Project, Screenshot } from '../../portfolio-types';
import {
  Maximize2,
  X,
  Sparkles,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectScreenMockup } from './ProjectScreenMockup';
import { useScrollLock } from '../../hooks/use-scroll-lock';
import { Button } from '../ui/button';

interface ProjectsSectionProps {
  onOpenBooking?: (plan?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenBooking }) => {
  const [activeProjectId, setActiveProjectId] = useState<string>(projectsData[0]?.id ?? '');
  const [activeViewByProject, setActiveViewByProject] = useState<Record<string, string>>({
    'suivi-clients': 'sc-1',
    'suivi-taches': 'st-1',
    'email-support-sav': 'es-1',
    'suivi-paiements': 'sp-1',
  });
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  const [selectorOverflows, setSelectorOverflows] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [zoomedScreenshot, setZoomedScreenshot] = useState<{
    project: Project;
    screenshot: Screenshot;
  } | null>(null);
  useScrollLock(Boolean(zoomedScreenshot));
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!zoomedScreenshot) return;
    const prev = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setZoomedScreenshot(null); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); prev?.focus?.(); };
  }, [Boolean(zoomedScreenshot)]);

  useEffect(() => {
    const selector = selectorRef.current;
    if (!selector) return;

    const updateOverflow = () => {
      setSelectorOverflows(selector.scrollWidth > selector.clientWidth + 1);
    };

    updateOverflow();
    const observer = new ResizeObserver(updateOverflow);
    observer.observe(selector);
    window.addEventListener('resize', updateOverflow);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateOverflow);
    };
  }, []);

  // Boucle infinie : la liste est triplée, on démarre au centre et on
  // recentre silencieusement quand on approche d'une extrémité.
  useEffect(() => {
    const selector = selectorRef.current;
    if (!selector) return;

    const copyWidth = () => selector.scrollWidth / 3;

    const recenter = () => {
      const w = copyWidth();
      if (w <= 0) return;
      if (selector.scrollLeft < w * 0.5) {
        selector.scrollLeft += w;
      } else if (selector.scrollLeft > w * 1.5) {
        selector.scrollLeft -= w;
      }
    };

    // Position initiale au milieu de la copie centrale
    selector.scrollLeft = copyWidth();

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(recenter);
    };
    selector.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      selector.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const selector = selectorRef.current;
    if (!selector || !window.matchMedia('(max-width: 639px)').matches) return;
    const selectedProject = selector.querySelector<HTMLElement>(`[data-project-id="${activeProjectId}"][data-copy="1"]`);
    if (!selectedProject) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const selectedBounds = selectedProject.getBoundingClientRect();
    const selectorBounds = selector.getBoundingClientRect();
    const centerDelta = selectedBounds.left + selectedBounds.width / 2 - (selectorBounds.left + selectorBounds.width / 2);
    selector.scrollBy({
      left: centerDelta,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [activeProjectId]);

  const currentProject = projectsData.find((p) => p.id === activeProjectId) || projectsData[0];
  if (!currentProject) return null;
  const activeViewId = activeViewByProject[currentProject.id] ?? currentProject.screenshots[0]?.id ?? '';
  const currentScreenshot = currentProject.screenshots.find((s) => s.id === activeViewId) || currentProject.screenshots[0];
  if (!currentScreenshot) return null;

  const handleSelectView = (projectId: string, viewId: string) => {
    setActiveViewByProject((prev) => ({
      ...prev,
      [projectId]: viewId,
    }));
  };

  const selectAdjacentProject = (direction: -1 | 1) => {
    const currentIndex = projectsData.findIndex((project) => project.id === currentProject.id);
    const nextIndex = (currentIndex + direction + projectsData.length) % projectsData.length;
    const nextProject = projectsData[nextIndex];
    if (nextProject) setActiveProjectId(nextProject.id);
  };

  const selectAdjacentView = (direction: -1 | 1, inModal = false) => {
    const project = inModal && zoomedScreenshot ? zoomedScreenshot.project : currentProject;
    const activeId = inModal && zoomedScreenshot ? zoomedScreenshot.screenshot.id : currentScreenshot.id;
    const currentIndex = project.screenshots.findIndex((screenshot) => screenshot.id === activeId);
    const nextIndex = (currentIndex + direction + project.screenshots.length) % project.screenshots.length;
    const nextScreenshot = project.screenshots[nextIndex];
    if (!nextScreenshot) return;
    if (inModal) {
      setZoomedScreenshot({ project, screenshot: nextScreenshot });
    } else {
      handleSelectView(project.id, nextScreenshot.id);
    }
  };

  return (
    <section id="projets" className="py-14 sm:py-20 md:py-28 bg-[#F7F3EB]/70 border-t border-[#EAE3D8] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-9 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E7E0D5] text-xs font-semibold uppercase tracking-wider text-[#7A583E] mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A87C51]" />
            <span>Exemples de mon travail & Réalisations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D241E] tracking-tight">
            Cas concrets : ce que ça change quand vous déléguez
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#635345] leading-relaxed">
            Des processus éprouvés au quotidien pour zéro oubli et une totale clarté.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="relative flex items-center gap-2">
          <Button type="button" variant="outline" size="icon" onClick={() => selectAdjacentProject(-1)} aria-label="Projet précédent" className="hidden sm:inline-flex shrink-0 rounded-full border-[#DED3C5] bg-white text-[#4A3F35] shadow-sm hover:bg-[#F3EDE4]">
            <ChevronLeft />
          </Button>
          <div ref={selectorRef} className="-mx-4 flex flex-1 items-center justify-start overflow-x-auto px-4 pb-4 gap-2.5 sm:mx-0 sm:snap-x snap-mandatory sm:justify-center sm:px-0 sm:gap-3 scrollbar-none">
          {[0, 1, 2].flatMap((copy) =>
          projectsData.map((project) => {
            const isSelected = project.id === activeProjectId;
            return (
              <button
                key={`${project.id}-${copy}`}
                data-project-id={project.id}
                data-copy={copy}
                aria-hidden={copy !== 1}
                tabIndex={copy === 1 ? 0 : -1}
                type="button"
                onClick={() => setActiveProjectId(project.id)}
                className={`flex items-center gap-2 px-4 sm:snap-center sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                  isSelected
                    ? 'bg-[#2D241E] text-[#FDFBF7] border-[#2D241E] shadow-md scale-[1.02]'
                    : 'bg-white/90 text-[#5C4D3E] border-[#E8E1D5] hover:bg-white hover:border-[#D5C7B7]'
                }`}
              >
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-[#43362C] text-[#E0A97E]' : 'bg-[#F2ECE4] text-[#7A695B]'
                }`}>
                  {project.number}
                </span>
                <span>{project.title}</span>
              </button>
            );
          })
          )}
          </div>
          <Button type="button" variant="outline" size="icon" onClick={() => selectAdjacentProject(1)} aria-label="Projet suivant" className="hidden sm:inline-flex shrink-0 rounded-full border-[#DED3C5] bg-white text-[#4A3F35] shadow-sm hover:bg-[#F3EDE4]">
            <ChevronRight />
          </Button>
        </div>
        <div
          className="-mt-1 mb-7 flex items-center justify-center sm:mb-10 sm:hidden cursor-grab active:cursor-grabbing select-none touch-pan-y"
          onPointerDown={(e) => {
            const selector = selectorRef.current;
            if (!selector) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            const startX = e.clientX;
            const startScroll = selector.scrollLeft;
            const onMove = (ev: PointerEvent) => {
              selector.scrollLeft = startScroll - (ev.clientX - startX);
            };
            const onEnd = () => {
              window.removeEventListener('pointermove', onMove);
              window.removeEventListener('pointerup', onEnd);
              window.removeEventListener('pointercancel', onEnd);
            };
            window.addEventListener('pointermove', onMove);
            window.addEventListener('pointerup', onEnd);
            window.addEventListener('pointercancel', onEnd);
          }}
          role="presentation"
          aria-label="Glisser pour faire défiler les projets"
        >
          <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-[#7A695B]">
            <span className="inline-block animate-[drag-arrow-left_1.6s_ease-in-out_infinite]">←</span>
            <span>Glisser pour voir plus</span>
            <span className="inline-block animate-[drag-arrow-right_1.6s_ease-in-out_infinite]">→</span>
          </p>
        </div>
        <div className="hidden sm:block sm:mb-10" />

        {/* Featured Project Showcase Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E7E0D5] shadow-lg shadow-[#2D241E]/5 overflow-hidden transition-all">
          {/* Top Bar of Project Card */}
          <div className="p-4 sm:p-8 border-b border-[#EAE3D8] bg-[#FAF8F5]/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A583E] sm:text-[#A87C51]">
                  Cas n°{currentProject.number} • {currentProject.tools[0]}
                </span>
                <span className="text-[#C5B7A8]">•</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                  {currentProject.highlightBadge}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2D241E] tracking-tight">
                {currentProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#635345] mt-1 max-w-2xl">
                {currentProject.shortDescription}
              </p>
            </div>

            {/* Action buttons: Voir le détail ⌵ & Plein écran ↗ */}
            <div className="flex items-center shrink-0">
              <button
                type="button"
                onClick={() => setIsDetailsOpen((prev) => !prev)}
                className={`inline-flex min-w-0 items-center justify-center gap-1.5 min-h-11 px-3 sm:px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${
                  isDetailsOpen
                    ? 'bg-[#2D241E] text-white border-[#2D241E] shadow-sm'
                    : 'bg-white text-[#4A3F35] border-[#E2DAD0] hover:bg-[#FAF7F2] hover:border-[#D5C8B8]'
                }`}
                title="Déplier / replier les 3 volets fondamentaux"
              >
                <span>Voir le détail</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isDetailsOpen ? 'rotate-180 text-[#E0A97E]' : 'text-[#7A695B]'
                  }`}
                />
              </button>


            </div>
          </div>

          {/* Interactive Screen Viewer (Window style) */}
          <div className="p-2.5 sm:p-6 lg:p-8 bg-[#F9F7F3]/50">
            <div className="group/card overflow-hidden rounded-2xl border border-[#DED4C8] bg-white shadow-[0_18px_50px_rgba(68,52,38,0.09)] transition-[transform,box-shadow] duration-300 ease-out motion-reduce:transition-none lg:hover:-translate-y-1 lg:hover:shadow-[0_28px_70px_rgba(68,52,38,0.14)]">
              {/* Window Title Bar */}
              <div className="flex items-center justify-center border-b border-[#EAE3D8] bg-[#F4EFE8] px-3 py-3 sm:justify-end sm:px-4">
                {/* Switcher for Views */}
                <div className="flex max-w-full items-center gap-1.5 overflow-x-auto pb-0.5">
                  {currentProject.screenshots.map((sc, index) => {
                    const isViewActive = activeViewId === sc.id;
                    return (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => handleSelectView(currentProject.id, sc.id)}
                        aria-pressed={isViewActive}
                        className="group/view grid min-h-11 min-w-11 cursor-pointer place-items-center rounded-lg px-0.5 text-[11px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#7A583E] sm:px-3 sm:text-xs"
                      >
                        <span className={`inline-flex h-7 items-center rounded-lg border px-1.5 transition-all sm:h-9 sm:px-3 ${
                          isViewActive
                            ? 'border-[#2D241E] bg-[#2D241E] text-white shadow-xs'
                            : 'border-[#E8E1D5] bg-white text-[#635345] group-hover/view:bg-[#F2ECE4]'
                        }`}>
                          Vue {index + 1}
                        </span>
                      </button>
                    );
                  })}

                  
                </div>
              </div>

              {/* Window Body: Images de l'aperçu */}
              <div className="group relative flex min-h-[200px] items-center justify-center overflow-hidden bg-[#EDE7DE] p-2 sm:min-h-[460px] sm:p-5">
                {!loadedImages[currentScreenshot.id] && !imgErrors[currentScreenshot.id] && (
                  <div className="absolute inset-0 z-10 grid place-items-center bg-[#F2EDE6]" role="status" aria-label="Chargement de l’image">
                    <div className="relative h-12 w-12">
                      <span className="absolute inset-0 rounded-full border border-[#D8CABA]" />
                      <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#7A583E]" />
                      <span className="absolute inset-[18px] rounded-full bg-[#A87C51]" />
                    </div>
                  </div>
                )}
                {!imgErrors[currentScreenshot.id] ? (
                  <img
                    key={currentScreenshot.id}
                    src={currentScreenshot.imageUrl}
                    alt={currentScreenshot.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className={`block h-auto w-full max-w-full max-h-[55vh] sm:max-h-[520px] object-contain rounded-lg shadow-[0_20px_45px_rgba(63,49,37,0.16)] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none cursor-zoom-in lg:group-hover:scale-[1.03] ${loadedImages[currentScreenshot.id] ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setZoomedScreenshot({ project: currentProject, screenshot: currentScreenshot })}
                    onLoad={() => setLoadedImages((prev) => ({ ...prev, [currentScreenshot.id]: true }))}
                    onError={() => {
                      setImgErrors((prev) => ({ ...prev, [currentScreenshot.id]: true }));
                    }}
                  />
                ) : (
                  <div className="w-full h-full min-h-[240px] sm:min-h-[460px] flex items-center justify-center">
                    <ProjectScreenMockup screenshotId={currentScreenshot.id} />
                  </div>
                )}
                {/* Overlay léger (desktop hover) */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#2D241E]/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 motion-reduce:transition-none lg:group-hover:opacity-100" />
                {/* Actions : toujours visibles au toucher, révélées au survol sur desktop */}
                <div className="absolute bottom-3 right-3 z-20 hidden items-center gap-2 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none sm:bottom-5 sm:right-5 sm:flex lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:focus-within:translate-y-0 lg:focus-within:opacity-100">
                  <button
                    type="button"
                    onClick={() => setZoomedScreenshot({ project: currentProject, screenshot: currentScreenshot })}
                    aria-label="Afficher en plein écran"
                    title="Afficher en plein écran"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/60 bg-white/80 text-[#2D241E] shadow-lg backdrop-blur-md transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D241E]"
                  >
                    <Maximize2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <Button type="button" variant="outline" size="icon" onClick={() => selectAdjacentView(-1)} aria-label="Photo précédente" className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border-[#D5C7B7] bg-white text-[#2D241E] shadow-lg hover:bg-[#F3EDE4] focus-visible:ring-2 focus-visible:ring-[#7A583E] sm:left-5 sm:inline-flex sm:h-11 sm:w-11">
                  <ChevronLeft />
                </Button>
                <Button type="button" variant="outline" size="icon" onClick={() => selectAdjacentView(1)} aria-label="Photo suivante" className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border-[#D5C7B7] bg-white text-[#2D241E] shadow-lg hover:bg-[#F3EDE4] focus-visible:ring-2 focus-visible:ring-[#7A583E] sm:right-5 sm:inline-flex sm:h-11 sm:w-11">
                  <ChevronRight />
                </Button>
                
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-[#DED4C8] bg-[#FAF8F5] px-3 py-2.5 sm:hidden" aria-label="Actions de l’image">
                <div className="flex min-w-0 items-center gap-2">
                  <Button type="button" variant="outline" size="icon" onClick={() => selectAdjacentView(-1)} aria-label="Photo précédente" className="h-11 w-11 shrink-0 rounded-xl border-[#BFAF9E] bg-white text-[#2D241E] shadow-sm hover:bg-[#F3EDE4] active:bg-[#E8DED2] focus-visible:ring-2 focus-visible:ring-[#7A583E]">
                    <ChevronLeft className="h-5 w-5 stroke-[2.25]" />
                  </Button>
                  <Button type="button" variant="outline" size="icon" onClick={() => selectAdjacentView(1)} aria-label="Photo suivante" className="h-11 w-11 shrink-0 rounded-xl border-[#BFAF9E] bg-white text-[#2D241E] shadow-sm hover:bg-[#F3EDE4] active:bg-[#E8DED2] focus-visible:ring-2 focus-visible:ring-[#7A583E]">
                    <ChevronRight className="h-5 w-5 stroke-[2.25]" />
                  </Button>
                  <span className="truncate text-[11px] font-semibold text-[#5C4D3E]" aria-live="polite">
                    {currentProject.screenshots.findIndex((screenshot) => screenshot.id === currentScreenshot.id) + 1} / {currentProject.screenshots.length}
                  </span>
                </div>
                <Button type="button" variant="outline" onClick={() => setZoomedScreenshot({ project: currentProject, screenshot: currentScreenshot })} aria-label="Afficher en plein écran" className="h-11 shrink-0 gap-2 rounded-xl border-[#2D241E] bg-white px-3 text-xs font-bold text-[#2D241E] shadow-sm hover:bg-[#F3EDE4] active:bg-[#E8DED2] focus-visible:ring-2 focus-visible:ring-[#7A583E]">
                  <Maximize2 className="h-4 w-4" aria-hidden="true" />
                  Plein écran
                </Button>
              </div>

              {/* View Caption / Explanation */}
              <div className="px-4 sm:px-5 py-3.5 bg-white border-t border-[#EAE3D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-[#2D241E] mr-2">{currentScreenshot.title}</span>
                  <span className="text-[#6E5D4F]">{currentScreenshot.subtitle}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsDetailsOpen((prev) => !prev)}
                    className="inline-flex min-h-11 items-center gap-1 font-semibold text-[#65462F] hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A583E]"
                  >
                    <span>{isDetailsOpen ? 'Masquer le détail ⌃' : 'Voir le détail ⌵'}</span>
                  </button>
                  <span className="hidden md:inline text-[#D5C7B7] opacity-0 transition-opacity group-hover/card:opacity-100">•</span>
                  <button
                    type="button"
                    onClick={() => setZoomedScreenshot({ project: currentProject, screenshot: currentScreenshot })}
                    className="hidden md:inline-flex opacity-0 transition-opacity group-hover/card:opacity-100 focus-visible:opacity-100 min-h-11 items-center gap-1 font-semibold text-[#2D241E] hover:underline cursor-pointer"
                  >
                    <span>Plein écran ↗</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Accordion « Voir le détail » : déplie directement sous la carte les 3 volets fondamentaux */}
          <AnimatePresence initial={false}>
            {isDetailsOpen && (
              <motion.div id="project-details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden border-t border-[#EAE3D8] bg-white"
              >
                <div className="p-4 sm:p-8">
                  {/* Accordion Header */}
                  <div className="grid grid-cols-1 gap-2 sm:flex sm:items-center sm:justify-between mb-6 pb-3 border-b border-[#F0EBE3]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#7A583E]">
                        Décomposition du cas • {currentProject.title}
                      </span>
                    </div>
                    <span className="w-fit text-[11px] font-semibold text-[#635345] bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#EAE3D8]">
                      3 volets fondamentaux
                    </span>
                  </div>

                  {/* 3 fundamental pillars */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* 1. Le Besoin */}
                    <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="w-6 h-6 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center text-xs font-bold shrink-0">
                            1
                          </span>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
                            1. Le Besoin Initial
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-[#635345] leading-relaxed">
                          {currentProject.need}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-rose-100 text-[11px] text-rose-700 font-medium">
                        Point de douleur initial identifié
                      </div>
                    </div>

                    {/* 2. La Solution */}
                    <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="w-6 h-6 rounded-lg bg-[#EFE8DC] text-[#7A583E] flex items-center justify-center text-xs font-bold shrink-0">
                            2
                          </span>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A583E]">
                            2. La Solution Mise en Place
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-[#635345] leading-relaxed">
                          {currentProject.solution}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#E8E1D5] text-[11px] text-[#7A583E] font-medium">
                        Dispositif & Système configurés
                      </div>
                    </div>

                    {/* 3. Le Résultat */}
                    <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0">
                            3
                          </span>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                            3. Le Résultat Concret
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-[#635345] leading-relaxed">
                          {currentProject.result}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-emerald-100 text-[11px] text-emerald-800 font-medium">
                        Gains mesurés & Sérénité retrouvée
                      </div>
                    </div>
                  </div>

                  {/* Bottom row: Tools used & Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#F0EBE3]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-[#8A7969] mr-1">Outils configurés :</span>
                      {currentProject.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-3 py-1 rounded-lg bg-[#FAF7F2] text-[#4A3F35] text-xs font-semibold border border-[#E8E1D5]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      {currentProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] text-[#7A695B] bg-[#F5EFE6] px-2.5 py-0.5 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* All Projects Mini-Grid for Fast Reference */}
        <div className="mt-12 pt-10 border-t border-[#EAE3D8]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A7969] mb-4 text-center sm:text-left">
            Tous les cas concrets disponibles :
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projectsData.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => {
                  setActiveProjectId(project.id);
                  // Scroll smoothly to the showcase
                  document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  project.id === activeProjectId
                    ? 'bg-white border-[#2D241E] shadow-sm'
                    : 'bg-[#FAF8F5] border-[#E8E1D5] hover:bg-white hover:border-[#D5C7B7]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#766454] sm:text-[#CBBCA9]">{project.number}</span>
                  <span className="text-[10px] text-[#7A583E] font-medium">{project.screenshots.length} vues</span>
                </div>
                <h5 className="text-sm font-bold text-[#2D241E] mb-1">{project.title}</h5>
                <p className="text-[11px] text-[#6E5D4F] line-clamp-2">{project.shortDescription}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox / Zoom Modal */}
      {zoomedScreenshot && (
        <div onClick={() => setZoomedScreenshot(null)} className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in motion-reduce:animate-none sm:items-center sm:p-6">
          <div onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Aperçu du projet" className="relative max-h-[100dvh] w-full overflow-y-auto overscroll-contain rounded-t-2xl border border-[#E7DFD5] bg-[#FAF8F5] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl sm:max-h-[92vh] sm:max-w-5xl sm:rounded-3xl sm:p-8">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setZoomedScreenshot(null)}
              ref={closeBtnRef}
              aria-label="Fermer le plein écran"
              className="sticky top-0 z-20 float-right grid h-11 w-11 place-items-center rounded-full bg-white text-[#7A6C5E] shadow-sm hover:text-[#2C2723] hover:bg-[#EFE9E0] border border-[#E8E1D5] transition-colors cursor-pointer sm:absolute sm:top-5 sm:right-5"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="clear-both mb-5 sm:mb-6 sm:pr-12 sm:clear-none">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A583E]">
                Cas n°{zoomedScreenshot.project.number} • {zoomedScreenshot.project.title}
              </span>
              <h3 className="text-2xl font-extrabold text-[#2D241E] mt-1">
                {zoomedScreenshot.screenshot.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#635345] mt-1">
                {zoomedScreenshot.screenshot.subtitle}
              </p>
            </div>

            {/* View Switcher inside modal */}
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 mb-2 sm:flex-wrap sm:overflow-visible sm:pb-0 sm:mb-4">
              {zoomedScreenshot.project.screenshots.map((sc, idx) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setZoomedScreenshot({
                    project: zoomedScreenshot.project,
                    screenshot: sc
                  })}
                  className={`shrink-0 min-h-11 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    zoomedScreenshot.screenshot.id === sc.id
                      ? 'bg-[#2D241E] text-white border-[#2D241E]'
                      : 'bg-white text-[#4A3F35] border-[#E8DFD3] hover:bg-[#FAF7F2]'
                  }`}
                >
                  Vue {idx + 1}
                </button>
              ))}
            </div>

            {/* Fullscreen Direct Visual Canvas */}
            <div className="relative mb-5 flex min-h-[240px] items-center justify-center overflow-auto rounded-xl border border-[#DED4C8] bg-[#EDE7DE] p-2 sm:mb-6 sm:min-h-[500px] sm:rounded-2xl sm:p-5">
              {!loadedImages[zoomedScreenshot.screenshot.id] && !imgErrors[zoomedScreenshot.screenshot.id] && (
                <div className="absolute inset-0 z-10 grid place-items-center bg-[#F2EDE6]" role="status" aria-label="Chargement de l’image">
                  <div className="relative h-12 w-12"><span className="absolute inset-0 rounded-full border border-[#D8CABA]" /><span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#7A583E]" /><span className="absolute inset-[18px] rounded-full bg-[#A87C51]" /></div>
                </div>
              )}
              {!imgErrors[zoomedScreenshot.screenshot.id] ? (
                <img
                  key={zoomedScreenshot.screenshot.id}
                  src={zoomedScreenshot.screenshot.imageUrl}
                  alt={zoomedScreenshot.screenshot.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className={`w-full max-h-[72vh] object-contain rounded-xl shadow-[0_20px_45px_rgba(63,49,37,0.16)] transition-opacity duration-500 ${loadedImages[zoomedScreenshot.screenshot.id] ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setLoadedImages((prev) => ({ ...prev, [zoomedScreenshot.screenshot.id]: true }))}
                  onError={() => {
                    setImgErrors((prev) => ({ ...prev, [zoomedScreenshot.screenshot.id]: true }));
                  }}
                />
              ) : (
                <div className="w-full h-full min-h-[240px] sm:min-h-[460px] flex items-center justify-center">
                  <ProjectScreenMockup screenshotId={zoomedScreenshot.screenshot.id} isZoomed={true} />
                </div>
              )}
              <Button type="button" variant="outline" size="icon" onClick={() => selectAdjacentView(-1, true)} aria-label="Photo précédente" className="absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 rounded-full border-[#BFAF9E] bg-white text-[#2D241E] shadow-lg hover:bg-[#F3EDE4] focus-visible:ring-2 focus-visible:ring-[#7A583E] sm:left-5 sm:inline-flex"><ChevronLeft /></Button>
              <Button type="button" variant="outline" size="icon" onClick={() => selectAdjacentView(1, true)} aria-label="Photo suivante" className="absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 rounded-full border-[#BFAF9E] bg-white text-[#2D241E] shadow-lg hover:bg-[#F3EDE4] focus-visible:ring-2 focus-visible:ring-[#7A583E] sm:right-5 sm:inline-flex"><ChevronRight /></Button>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-2 sm:hidden" aria-label="Navigation de l’image agrandie">
              <Button type="button" variant="outline" onClick={() => selectAdjacentView(-1, true)} className="h-11 gap-2 rounded-xl border-[#BFAF9E] bg-white text-xs font-bold text-[#2D241E] hover:bg-[#F3EDE4] active:bg-[#E8DED2] focus-visible:ring-2 focus-visible:ring-[#7A583E]"><ChevronLeft className="h-4 w-4" /> Précédente</Button>
              <Button type="button" variant="outline" onClick={() => selectAdjacentView(1, true)} className="h-11 gap-2 rounded-xl border-[#BFAF9E] bg-white text-xs font-bold text-[#2D241E] hover:bg-[#F3EDE4] active:bg-[#E8DED2] focus-visible:ring-2 focus-visible:ring-[#7A583E]">Suivante <ChevronRight className="h-4 w-4" /></Button>
            </div>

            {/* Email template specific display if view is email template */}
            {zoomedScreenshot.project.emailTemplate && zoomedScreenshot.screenshot.id === 'es-2' && (
              <div className="p-4 rounded-xl bg-white border border-[#E8E1D5] mb-6">
                <h5 className="text-xs font-bold text-[#7A583E] uppercase mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Précisions méthodologiques sur la rédaction SAV :
                </h5>
                <p className="text-xs text-[#5C4D3E] leading-relaxed">
                  « Chaque message de mécontentement est désamorcé dès le premier paragraphe en validant l'émotion du client sans se justifier excessivement. Les démarches concrètes sont annoncées clairement avec un délai précis (48h max). Résultat : le client repart apaisé et l'image de marque du formateur est intacte. »
                </p>
              </div>
            )}

            {/* Bottom modal actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 pt-4 border-t border-[#EAE3D8]">
              <div className="grid w-full grid-cols-1 gap-2 sm:flex sm:w-auto sm:items-center sm:gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const planName = zoomedScreenshot.project.title;
                    setZoomedScreenshot(null);
                    onOpenBooking?.(planName);
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#2D241E] text-white text-xs font-semibold hover:bg-[#3E3228] transition-colors cursor-pointer"
                >
                  Mettre en place ce suivi chez moi
                </button>
                <button
                  type="button"
                  onClick={() => setZoomedScreenshot(null)}
                  className="px-4 py-2.5 rounded-full bg-white border border-[#E8E1D5] text-xs font-semibold text-[#5C4D3E] hover:bg-[#F5EFE6] transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
