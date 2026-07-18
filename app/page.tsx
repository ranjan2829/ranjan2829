"use client";

import React from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import { Navbar } from "@/components/NavBar";
import { Projects } from "@/components/Projects";
import { SocialStats } from "@/components/SocialStats";
import Timeline from "@/components/Timeline";
import { Skills } from "@/components/Skills";
import { Resume } from "@/components/Resume";
import { site } from "@/lib/site";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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
    <div className="relative min-h-screen">
      <Navbar />

      <main
        id="main"
        className="relative z-10 max-w-5xl mx-auto pt-20 md:pt-28 pb-16 md:pb-20 px-4 sm:px-5 md:px-8 space-y-12 md:space-y-20"
      >
        {/* Hero + Timeline */}
        <section
          id="home"
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-stretch"
        >
          <div className="lg:col-span-7 flex flex-col">
            <Hero />
          </div>
          <div className="lg:col-span-5 flex flex-col">
            <Timeline />
          </div>
        </section>

        {/* Stats */}
        <motion.section {...fadeInUp} id="stats" aria-labelledby="stats-heading">
          <SectionHeading id="stats-heading">Stats</SectionHeading>
          <SocialStats />
        </motion.section>

        {/* Skills */}
        <motion.section {...fadeInUp} id="skills" aria-labelledby="skills-heading">
          <SectionHeading id="skills-heading">Skills</SectionHeading>
          <Skills />
        </motion.section>

        {/* Projects */}
        <motion.div {...fadeInUp}>
          <Projects />
        </motion.div>

        {/* Resume */}
        <motion.section {...fadeInUp} id="resume" aria-labelledby="resume-heading">
          <SectionHeading id="resume-heading">Resume</SectionHeading>
          <Resume />
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-card-border pt-8 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted">
            <p>
              &copy; {new Date().getFullYear()} {site.name}
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green" aria-hidden />
              Built with Next.js
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
