"use client";
import React from "react";

import Hero from '@/components/Hero';
import { Navbar } from "@/components/NavBar";
import { Projects } from "@/components/Projects";
import { SocialStats } from "@/components/SocialStats";
import dynamic from 'next/dynamic';


const Timeline = dynamic(() => import('../components/Timeline'), { ssr: false })
export default function Home() {
  return (
    <div className="relative min-h-screen text-terminal-text font-mono selection:bg-accent-cyan selection:text-black overflow-x-hidden">
      <div className="fixed inset-0 bg-grid pointer-events-none z-0"></div>
    <Navbar />
      
      <main className="relative z-10 max-w-5xl mx-auto pt-32 pb-20 px-4 md:px-8 space-y-12">
        {/* Hero Section with Timeline */}
        <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 flex flex-col gap-4">
              <Hero />
            </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Timeline />
          </div>
        </section>

        {/* Social Stats - Full Width */}
        <section className="w-full">
          <SocialStats />
        </section>

        {/* Tech Stack Section */}
        <section>
          <div className="mb-6 flex items-center gap-2">
            <span className="cmd-prompt"></span>
            <span className="text-accent-cyan">tech-stack</span>
            <span className="text-muted">--visual</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel rounded-lg p-4 border-l-2 border-l-accent-cyan">
              <h3 className="text-xs uppercase font-bold text-muted mb-3 tracking-widest">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">Python</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">TypeScript</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">JavaScript</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">Go</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">Rust</span>
              </div>
            </div>
            <div className="glass-panel rounded-lg p-4 border-l-2 border-l-accent-green">
              <h3 className="text-xs uppercase font-bold text-muted mb-3 tracking-widest">Web & Backend</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">Next.js</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">Node.js</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">React.js</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">FastAPI</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">PostgreSQL</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">MongoDB</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">Redis</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">SQL</span>
              </div>
            </div>
            <div className="glass-panel rounded-lg p-4 border-l-2 border-l-accent-yellow">
              <h3 className="text-xs uppercase font-bold text-muted mb-3 tracking-widest">Cloud & DevOps</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">Docker</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">Kubernetes</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">AWS EC2</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">AWS S3</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">AWS Lambda</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">AWS RDS</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">AWS SageMaker</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">GCP</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">Prometheus</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">Grafana</span>
              </div>
            </div>
            <div className="glass-panel rounded-lg p-4 border-l-2 border-l-accent-red">
              <h3 className="text-xs uppercase font-bold text-muted mb-3 tracking-widest">AI/ML & Tools</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">PyTorch</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">Deep Learning</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">LLMs</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">LangChain</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">RAG</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">Transformers</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">Apache Kafka</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">Apache Spark</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">Git</span>
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-white border border-white/10">GitHub</span>
              </div>
            </div>
          </div>
        </section>
      
      <Projects />
      
      {/* Resume Section */}
        <section id="resume">
          <div className="mb-6 flex items-center gap-2">
            <span className="cmd-prompt"></span>
            <span className="text-accent-cyan">cat</span>
            <span className="text-muted">resume.pdf</span>
          </div>
          <div className="glass-panel rounded-xl overflow-hidden">
            <div className="w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
            <iframe 
              src="https://docs.google.com/document/d/e/2PACX-1vSvvvECzbOOj3GLUDWjrtAnnVRVJUSwVm1roddgRI3gvOqZUSSMUuyNmpD6nhEPOeVkXfRE7NmD2hUu/pub?embedded=true"
              className="w-full h-full"
              title="Resume"
            />
          </div>
        </div>
      </section>
      
        <footer className="border-t border-white/5 pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-muted uppercase tracking-widest">
            <p>© 2026 RANJAN_SHITOLE // ALL SYSTEMS OPERATIONAL</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green"></span>
                <span>v.2.1.0</span>
              </div>
            </div>
          </div>
          <div className="mt-8 p-3 rounded bg-black border border-white/10 font-mono text-xs flex items-center gap-2 shadow-inner">
            <span className="text-accent-green">➜</span>
            <span className="text-accent-cyan">~/portfolio</span>
            <span className="text-muted">echo "Thanks for visiting."</span>
            <span className="cursor-blink"></span>
          </div>
        </footer>
      </main>
    </div>
  );
}
