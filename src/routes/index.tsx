import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MotionConfig } from "motion/react";

import { Preloader } from "@/components/canport/Preloader";
import { Navbar } from "@/components/canport/Navbar";
import { Hero } from "@/components/canport/Hero";
import { AboutSection } from "@/components/canport/AboutSection";
import { BentoGrid } from "@/components/canport/BentoGrid";
import { ToolsMinimalGrid } from "@/components/canport/ToolsMinimalGrid";
import { ProjectsSection } from "@/components/canport/ProjectsSection";
import { BeforeAfterSection } from "@/components/canport/BeforeAfterSection";
import { ProcessSection } from "@/components/canport/ProcessSection";
import { ContactSection } from "@/components/canport/ContactSection";
import { Footer } from "@/components/canport/Footer";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { BookingModal } from "@/components/BookingModal";
import { ScheduleModal } from "@/components/canport/ScheduleModal";
import { DURATION, EASE_OUT } from "@/lib/motion-presets";

const TITLE = "Candya R. — Assistante Virtuelle & Support Client Écrit";
const DESCRIPTION =
  "Assistante virtuelle pour coachs et formateurs en ligne : organisation administrative, support client écrit, suivi des paiements et des tâches. Cas concrets, process et outils.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("Organisation Administrative");

  const handleReplayLoader = () => {
    setShowPreloader(true);
    setReplayKey((prev) => prev + 1);
  };

  const handleOpenBooking = (plan?: string) => {
    if (plan) setSelectedPlan(plan);
    setIsBookingOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: DURATION.base, ease: EASE_OUT }}>
      <div className="min-h-screen bg-[#FDFBF7] text-[#2D241E] font-sans selection:bg-[#E0A97E]/30 selection:text-[#2D241E] flex flex-col">
        {showPreloader && (
          <Preloader key={replayKey} onComplete={() => setShowPreloader(false)} />
        )}

        <Navbar
          onOpenBooking={handleOpenBooking}
          onOpenSchedule={() => setIsScheduleOpen(true)}
        />

        <main className="flex-1">
          <Hero
            onOpenBooking={handleOpenBooking}
            onOpenSchedule={() => setIsScheduleOpen(true)}
          />
          <AboutSection />
          <BentoGrid onOpenBooking={handleOpenBooking} />
          <ToolsMinimalGrid />
          <ProjectsSection onOpenBooking={handleOpenBooking} />
          <BeforeAfterSection />
          <ProcessSection onOpenBooking={handleOpenBooking} />
          <ContactSection onOpenBooking={handleOpenBooking} />
        </main>

        <Footer onReplayLoader={handleReplayLoader} />

        <FloatingActionButton onOpenBooking={handleOpenBooking} />

        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialPlan={selectedPlan}
        />

        <ScheduleModal
          isOpen={isScheduleOpen}
          onClose={() => setIsScheduleOpen(false)}
          onOpenBooking={handleOpenBooking}
        />
      </div>
    </MotionConfig>
  );
}
