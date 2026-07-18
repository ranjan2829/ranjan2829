"use client";

import React from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import { Navbar } from "@/components/NavBar";
import { Projects } from "@/components/Projects";
import { SocialStats } from "@/components/SocialStats";
import Timeline from "@/components/Timeline";
import { site } from "@/lib/site";

const RESUME_DOC =
  "https://docs.google.com/document/d/e/2PACX-1vSvvvECzbOOj3GLUDWjrtAnnVRVJUSwVm1roddgRI3gvOqZUSSMUuyNmpD6nhEPOeVkXfRE7NmD2hUu/pub";

const techStack = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C++", "Go", "Rust"],
  },
  {
    category: "Web & Backend",
    items: ["Next.js", "React", "Node.js", "FastAPI", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "Cloud & DevOps",
    items: ["Docker", "Kubernetes", "AWS", "GCP", "Prometheus", "Grafana"],
  },
  {
    category: "AI/ML & Data",
    items: ["PyTorch", "LLMs", "LangChain", "RAG", "Transformers", "Kafka", "Spark"],
  },
];

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

        {/* Tech Stack */}
        <motion.section {...fadeInUp} id="stack" aria-labelledby="stack-heading">
          <SectionHeading id="stack-heading">Tech Stack</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((group) => (
              <div key={group.category} className="card p-4">
                <h3 className="text-[11px] uppercase font-semibold text-muted tracking-[0.12em] mb-3 font-display">
                  {group.category}
                </h3>
                <ul className="flex flex-wrap gap-1.5 list-none p-0">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs px-2 py-1 rounded-md bg-foreground/[0.04] border border-card-border text-muted font-mono"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.div {...fadeInUp}>
          <Projects />
        </motion.div>

        {/* Resume */}
        <motion.section {...fadeInUp} id="resume" aria-labelledby="resume-heading">
          <SectionHeading id="resume-heading">Resume</SectionHeading>
          <div className="card overflow-hidden p-0">
            <iframe
              src={`${RESUME_DOC}?embedded=true`}
              // Lazy so a heavy Docs embed below the fold doesn't compete
              // with the hero for bandwidth on first load.
              loading="lazy"
              className="w-full h-[70vh] min-h-[560px] lg:min-h-[900px]"
              title="Resume of Ranjan Shitole"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
          <p className="mt-3 text-xs text-muted">
            Trouble viewing it?{" "}
            <a
              href={RESUME_DOC}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline underline-offset-4"
            >
              Open the resume in a new tab
            </a>
            .
          </p>
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
