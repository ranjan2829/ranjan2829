"use client";

import React, { useEffect, useState } from "react";
import { BlackHoleBackground } from "@/components/BlackHoleBackground";
import { Contact } from "@/components/home/Contact";
import { Experience } from "@/components/home/Experience";
import { Fintech } from "@/components/home/Fintech";
import { Hero } from "@/components/home/Hero";
import { Resume } from "@/components/home/Resume";
import {
  AllocationsScene,
  EngineeringScene,
  GigaBrainScene,
  LaptopScene,
  ProjectsScene,
} from "@/components/home/Scenes";
import { SiteDock } from "@/components/home/SiteDock";
import { Stack } from "@/components/home/Stack";
import { Stats } from "@/components/home/Stats";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

/** True once the hero has fully left the viewport (with a margin, so it resumes before it shows). */
function useHeroOffscreen() {
  const [offscreen, setOffscreen] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting), {
      rootMargin: "200px 0px",
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return offscreen;
}

export default function Home() {
  const heroOffscreen = useHeroOffscreen();

  return (
    <div className="blackhole-page relative min-h-screen" data-hero-offscreen={heroOffscreen || undefined}>
      {/* The live WebGPU black hole, unchanged. The hero is transparent over it;
          every later section has a solid background and covers it. The poster
          is a frame of the same render that shows until the canvas paints. */}
      <div aria-hidden className="blackhole-poster" />
      <BlackHoleBackground />
      <ScrollProgress className="h-[2px] from-accent via-accent-cyan to-accent" />

      <main id="main" className="relative z-10">
        {/* Order follows how a reader decides: who, the career at a glance,
            what they'd get, the flagship work, then the depth. */}
        <Hero />
        <Experience />
        <Fintech />
        <AllocationsScene />
        <LaptopScene />
        <GigaBrainScene />
        <ProjectsScene />
        <EngineeringScene />
        <Stats />
        <Stack />
        <Resume />
        <Contact />
      </main>

      <SiteDock />
    </div>
  );
}
