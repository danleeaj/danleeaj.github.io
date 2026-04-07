import { Route, Routes, useLocation } from "react-router-dom";

import { DeveloperPage } from "@/pages/developer-page";
import { LandingPage } from "@/pages/landing-page";
import { MusicPage } from "@/pages/music-page";
import { NeurosciencePage } from "@/pages/neuroscience-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { usePageTransition } from "@/lib/page-transition";
import { cn } from "@/lib/utils";

export function App() {
  const location = useLocation();
  const { direction, phase } = usePageTransition();

  return (
    <div
      className={cn(
        "route-shell",
        phase === "entering" && direction === "forward" && "frame-animate-in-forward",
        phase === "entering" && direction === "back" && "frame-animate-in-back",
        phase === "exiting" && direction === "forward" && "frame-animate-out-forward",
        phase === "exiting" && direction === "back" && "frame-animate-out-back",
      )}
    >
      <Routes location={location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/developer" element={<DeveloperPage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/neuroscience" element={<NeurosciencePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
