"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: "AI Calling Agent",
    description: "Production-grade AI calling agent built with FastAPI, React, Twilio, and AWS. Processes 320+ automated interviews with real-time transcription and scalable async backend.",
    demo: "http://13.204.76.229:3000/",
    tech: ["FastAPI", "React", "TypeScript", "Twilio", "AWS"],
    image: "https://cdn.prod.website-files.com/67af3db5bb3b892e61258bd4/688cfdaa7b5a472a34eceb53_151-call-center-ai-agents.png",
  },
  {
    title: "Hyperliquid RAG Agent",
    description: "AI-powered market intelligence agent for HyperLiquid using semantic search and real-time sentiment analysis across multi-source data. Built with FastAPI, Next.js, and GPT-4.",
    demo: "https://hyper-liquid-agent.vercel.app/",
    tech: ["FastAPI", "Next.js", "Turbopuffer", "GPT-4"],
    image: "https://blockchainaddict.fr/wp-content/uploads/2024/10/HyperLiquid-blockchainaddict.fr_.jpg",
  },
  {
    title: "Perception-AI",
    description: "Transforms handwritten inputs on a dynamic drawing canvas into instant solutions using React, FastAPI, and Google Gemini AI with LaTeX rendering via MathJax.",
    demo: "https://ai-illustration-sigma.vercel.app/",
    tech: ["React", "TypeScript", "FastAPI", "Gemini AI"],
    image: "https://www.elegantthemes.com/blog/wp-content/uploads/2023/07/history-of-AI-art.jpg",
  },
  {
    title: "Live HFT Exchange Engine",
    description: "High-frequency trading exchange engine in C++ with ultra-low latency order matching, lock-free queues, memory pooling, and socket-based networking for real-time order flow.",
    demo: "https://github.com/ranjan2829/Live-High-Frequency-Trading-Exchange-Engine",
    tech: ["C++", "CMake", "Multi-threading", "Sockets"],
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const Projects = () => {
  return (
    <section id="projects">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px w-8 bg-accent rounded-full" />
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted font-display">
          Projects
        </h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={itemVariants}>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="card group block overflow-hidden hover:border-muted transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80" />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors font-display">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted group-hover:text-foreground transition-colors flex-shrink-0 mt-0.5" />
                </div>

                <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-foreground/[0.04] border border-card-border text-muted font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
