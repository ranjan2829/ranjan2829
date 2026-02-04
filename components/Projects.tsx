"use client";
import React from 'react';
import { Terminal } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: "AI Calling Agent",
    description: "Built a production-grade AI Calling Agent at Onelab Ventures using FastAPI, React (TypeScript), Twilio, and AWS (Transcribe + S3). Designed end-to-end architecture for automated interviews: scalable async backend, bulk candidate processing, real-time transcription. Deployed on AWS EC2 with secure APIs and modular frontend dashboards.",
    github: "https://github.com/ranjan2829",
    demo: "http://13.204.76.229:3000/",
    tech: ["FastAPI", "React", "TypeScript", "Twilio", "AWS"],
    image: "https://cdn.prod.website-files.com/67af3db5bb3b892e61258bd4/688cfdaa7b5a472a34eceb53_151-call-center-ai-agents.png",
    gradient: "from-indigo-900/50 to-blue-900/50",
    accent: "accent-cyan",
  },
  {
    title: "Hyperliquid RAG Agent",
    description: "Built an AI-powered market intelligence agent for the HyperLiquid ecosystem using FastAPI, Next.js, Turbopuffer, and GPT-4; designed semantic search and real-time sentiment analysis across multi-source data. Deployed on AWS EC2 + Vercel with ngrok for secure API access.",
    github: "https://github.com/ranjan2829",
    demo: "https://hyper-liquid-agent.vercel.app/",
    tech: ["FastAPI", "Next.js", "Turbopuffer", "GPT-4"],
    image: "https://blockchainaddict.fr/wp-content/uploads/2024/10/HyperLiquid-blockchainaddict.fr_.jpg",
    gradient: "from-green-900/50 to-emerald-900/50",
    accent: "accent-green",
  },
  {
    title: "Perception-AI",
    description: "Engineered Perception AI, a cutting-edge app that transforms handwritten inputs on a dynamic drawing canvas into instant solutions, powered by React, TypeScript, FastAPI, and Google Gemini AI, with sleek LaTeX rendering via MathJax and seamless deployment on Vercel.",
    github: "https://github.com/ranjan2829/Perception-AI-App",
    demo: "https://ai-illustration-sigma.vercel.app/",
    tech: ["React", "TypeScript", "FastAPI", "Gemini AI", "MathJax"],
    image: "https://www.elegantthemes.com/blog/wp-content/uploads/2023/07/history-of-AI-art.jpg",
    gradient: "from-purple-900/50 to-pink-900/50",
    accent: "accent-cyan",
  },
  {
    title: "Live HFT Exchange Engine",
    description: "Developed a high-frequency trading exchange engine in C++ with ultra-low latency order matching, lock-free queues, and memory pooling; implemented multi-threaded trade execution and socket-based networking for real-time order flow. Built with CMake and optimized for hedge fund/prop trading scale performance and extensibility.",
    github: "https://github.com/ranjan2829/Live-High-Frequency-Trading-Exchange-Engine",
    demo: "https://github.com/ranjan2829/Live-High-Frequency-Trading-Exchange-Engine",
    tech: ["C++", "CMake", "Multi-threading", "Socket Programming"],
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
    gradient: "from-red-900/50 to-orange-900/50",
    accent: "accent-red",
  },
];

export const Projects = () => {
  return (
    <section id="projects">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="cmd-prompt"></span>
          <span className="text-accent-cyan">ls</span>
          <span className="text-muted">-la ./projects</span>
        </div>
        <span className="text-xs text-muted font-mono hidden sm:inline-block">Found {projects.length} directories</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel rounded-xl overflow-hidden hover:border-accent-cyan/50 transition-all duration-300 group"
          >
            <div className={`h-40 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-grid opacity-30"></div>
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Terminal className="text-6xl text-white/20 group-hover:text-accent-cyan/80 transition-colors duration-500 group-hover:scale-110" />
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-terminal-text dark:text-white group-hover:text-accent-cyan transition-colors">
                  {project.title}
                </h3>
                <Terminal className="text-muted text-sm group-hover:text-white transition-colors" />
              </div>
              <p className="text-sm text-terminal-text/70 dark:text-gray-400 mb-4 line-clamp-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
