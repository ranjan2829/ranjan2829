"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  tech: string[];
  repo: string;
  demo?: string;
  /**
   * Self-hosted in /public/projects. Live demos are real screenshots of the
   * running app; code-only projects use GitHub's repo card, which carries
   * actual star/fork counts. Nothing is hotlinked from a third-party host.
   */
  image: string;
}

const projects: Project[] = [
  {
    title: "HFT Exchange Engine",
    description:
      "High-frequency trading exchange engine in C++ with ultra-low-latency order matching, lock-free queues, memory pooling, and socket-based networking for real-time order flow.",
    tech: ["C++", "CMake", "Lock-free", "Sockets"],
    repo: "https://github.com/ranjan2829/High-Frequency-Trading-Exchange-Engine",
    image: "/projects/hft.png",
  },
  {
    title: "AI Calling Agent",
    description:
      "Production-grade AI calling agent built with FastAPI, React, Twilio, and AWS. Processes 320+ automated interviews at 98% accuracy with an async backend handling 70 concurrent calls.",
    tech: ["FastAPI", "React", "TypeScript", "Twilio", "AWS"],
    repo: "https://github.com/ranjan2829/AI-Calling-Agent",
    image: "/projects/calling-agent.png",
  },
  {
    title: "Hyperliquid RAG Agent",
    description:
      "AI-powered market intelligence agent for HyperLiquid using semantic search and real-time sentiment analysis across multi-source data. Built with FastAPI, Next.js, and GPT-4.",
    tech: ["FastAPI", "Next.js", "Turbopuffer", "GPT-4"],
    repo: "https://github.com/ranjan2829/HyperLiquid-Agent",
    demo: "https://hyper-liquid-agent.vercel.app/",
    image: "/projects/hyperliquid.png",
  },
  {
    title: "Perception-AI",
    description:
      "Transforms handwritten input on a dynamic drawing canvas into instant solutions using React, FastAPI, and Google Gemini, with LaTeX rendering via MathJax.",
    tech: ["React", "TypeScript", "FastAPI", "Gemini"],
    repo: "https://github.com/ranjan2829/Perception-AI-App",
    demo: "https://ai-illustration-sigma.vercel.app/",
    image: "/projects/perception.png",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const Cover = ({ src, title }: { src: string; title: string }) => (
  <div className="relative h-44 overflow-hidden rounded-t-[13px] bg-foreground/[0.04]">
    <Image
      src={src}
      alt={`${title} screenshot`}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
    />
  </div>
);

export const Projects = () => {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px w-8 bg-accent rounded-full" aria-hidden />
        <h2 id="projects-heading" className="eyebrow font-display">
          Projects
        </h2>
      </div>

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 list-none p-0"
      >
        {projects.map((project) => (
          <motion.li key={project.title} variants={itemVariants}>
            <article className="card card-interactive group h-full flex flex-col overflow-hidden">
              <Cover src={project.image} title={project.title} />

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-semibold text-foreground font-display mb-2">
                  {project.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                <ul className="flex flex-wrap gap-1.5 mb-4 list-none p-0">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-foreground/[0.04] border border-card-border text-muted font-mono"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4 mt-auto pt-1">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted hover:text-foreground transition-colors"
                  >
                    <Github className="w-4 h-4" aria-hidden />
                    Code
                    <span className="sr-only"> for {project.title}</span>
                  </a>

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[13px] font-medium text-accent hover:underline underline-offset-4"
                    >
                      Live demo
                      <span className="sr-only"> of {project.title}</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden />
                    </a>
                  )}
                </div>
              </div>
            </article>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};

export default Projects;
