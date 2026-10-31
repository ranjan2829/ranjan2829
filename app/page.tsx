"use client";

import React from "react";
import { BlackHoleBackground } from "@/components/BlackHoleBackground";
import { Contact } from "@/components/home/Contact";
import { Experience } from "@/components/home/Experience";
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
import { Writing } from "@/components/home/Writing";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

export default function Home() {
  return (
    <div className="blackhole-page relative min-h-screen">
      {/* The live WebGPU black hole, unchanged. The hero is transparent over it;
          every later section has a solid background and covers it. */}
      <BlackHoleBackground />
      <ScrollProgress className="h-[2px] from-accent via-accent-cyan to-accent" />

      <main id="main" className="relative z-10">
        {/* Order follows how a reader decides: who and where now, the career
            at a glance, the flagship work, then the depth. */}
        <Hero />
        <Experience />
        <AllocationsScene />
        <LaptopScene />
        <GigaBrainScene />
        <ProjectsScene />
        <EngineeringScene />
        <Stats />
        <Stack />
        <Writing />
        <Resume />
        <Contact />
      </main>

      <SiteDock />
    </div>
  );
}
