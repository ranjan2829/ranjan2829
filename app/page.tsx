"use client";

import React from "react";
import { motion } from "framer-motion";
import { BlackHoleBackground } from "@/components/BlackHoleBackground";
import Hero from "@/components/Hero";
import { Navbar } from "@/components/NavBar";
import { Projects } from "@/components/Projects";
import { SocialStats } from "@/components/SocialStats";
import Timeline from "@/components/Timeline";
import { Resume } from "@/components/Resume";
import { site } from "@/lib/site";

const fadeInUp = {
  initial: { opacity: 1, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" } as const,
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const SectionHeading = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="h-px w-8 bg-accent rounded-full" aria-hidden />
    <h2 id={id} className="eyebrow font-display">
      {children}
    </h2>
  </div>
);

export default function Home() {
  return (
    <div className="blackhole-page relative min-h-screen">
      <BlackHoleBackground />
      <Navbar />

      <main
        id="main"
        className="relative z-10 pt-20 md:pt-28 pb-16 md:pb-24 px-4 sm:px-5 md:px-8 lg:pl-8 xl:pl-12"
      >
        {/* First screen: readable intro, hole stays the right-side signature. */}
        <section id="home" className="max-w-2xl lg:max-w-[42rem]">
          <Hero />
        </section>

        {/* Below the fold: wider measure so cards, calendar, and resume can be read. */}
        <div className="mt-16 md:mt-24 space-y-16 md:space-y-24 max-w-3xl xl:max-w-4xl">
          <motion.section {...fadeInUp} id="experience" aria-labelledby="experience-heading">
            <SectionHeading id="experience-heading">Experience</SectionHeading>
            <Timeline />
          </motion.section>

          <motion.section {...fadeInUp} id="stats" aria-labelledby="stats-heading">
            <SectionHeading id="stats-heading">Stats</SectionHeading>
            <SocialStats />
          </motion.section>

          <motion.div {...fadeInUp}>
            <Projects />
          </motion.div>

          <motion.section {...fadeInUp} id="resume" aria-labelledby="resume-heading">
            <SectionHeading id="resume-heading">Resume</SectionHeading>
            <Resume />
          </motion.section>

          <footer className="border-t border-card-border pt-8 pb-4">
            <p className="text-xs text-muted">
              &copy; {new Date().getFullYear()} {site.name}
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
