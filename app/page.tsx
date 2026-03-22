"use client";

import React from "react";
import { motion } from "framer-motion";
import Hero from '@/components/Hero';
import { Navbar } from "@/components/NavBar";
import { Projects } from "@/components/Projects";
import { SocialStats } from "@/components/SocialStats";
import dynamic from 'next/dynamic';

const Timeline = dynamic(() => import('../components/Timeline'), { ssr: false });

const techStack = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Go", "Rust"],
  },
  {
    category: "Web & Backend",
    items: ["Next.js", "Node.js", "React", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "SQL"],
  },
  {
    category: "Cloud & DevOps",
    items: ["Docker", "Kubernetes", "AWS EC2", "AWS S3", "AWS Lambda", "AWS SageMaker", "GCP", "Prometheus", "Grafana"],
  },
  {
    category: "AI/ML & Tools",
    items: ["PyTorch", "Deep Learning", "LLMs", "LangChain", "RAG", "Transformers", "Kafka", "Spark"],
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function Home() {
  return (
    <div className="relative min-h-screen selection:bg-accent selection:text-white">
      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto pt-20 md:pt-28 pb-16 md:pb-20 px-4 sm:px-5 md:px-8 space-y-12 md:space-y-20">
        {/* Hero + Timeline */}
        <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-stretch lg:min-h-[520px]">
          <div className="lg:col-span-7 flex flex-col">
            <Hero />
          </div>
          <div className="lg:col-span-5 flex flex-col">
            <Timeline />
          </div>
        </section>

        {/* Stats */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-accent rounded-full" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted font-display">
              Stats
            </h2>
          </div>
          <SocialStats />
        </motion.section>

        {/* Tech Stack */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-accent rounded-full" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted font-display">
              Tech Stack
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((group) => (
              <div key={group.category} className="card p-4">
                <h3 className="text-[11px] uppercase font-semibold text-muted tracking-[0.12em] mb-3 font-display">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2 py-1 rounded-md bg-foreground/[0.04] border border-card-border text-muted font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.div {...fadeInUp}>
          <Projects />
        </motion.div>

        {/* Resume */}
        <motion.section {...fadeInUp} id="resume">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-accent rounded-full" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted font-display">
              Resume
            </h2>
          </div>
          <div className="card overflow-hidden p-0">
            <iframe
              src="https://docs.google.com/document/d/e/2PACX-1vSvvvECzbOOj3GLUDWjrtAnnVRVJUSwVm1roddgRI3gvOqZUSSMUuyNmpD6nhEPOeVkXfRE7NmD2hUu/pub?embedded=true"
              className="w-full h-[80vh] min-h-[700px] lg:min-h-[1000px]"
              title="Resume"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-card-border pt-8 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted">
            <p>&copy; 2026 Ranjan Shitole</p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
              Built with Next.js
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
