"use client";
import React from 'react';

const timelineData = [
  {
    title: "Software Development Engineer",
    company: "Brain Labs",
    location: "Kharadi",
    date: "September 2025 - Present",
    description: "Working on Finance Quant trading platform. Building scalable systems for high-frequency trading.",
    isActive: true,
  },
  {
    title: "Associate Software Developer Intern",
    company: "OneLab-Ventures",
    location: "Hinjewadi",
    date: "June 2025 - August 2025",
    description: "Building and Deploying AI Models on AWS and Using DevOps tools to manage the Apps. Built and deployed an AI-based calling agent (Twilio + FastAPI + AWS) processing 320+ interviews with 98%+ transcription accuracy. Architected async backend (15+ REST APIs, WebSockets) handling 70 concurrent calls with horizontal scaling (−65% latency). Implemented Transformer-based text generator (<1s inference, 4-layer model) using PyTorch and Kafka pipeline.",
  },
  {
    title: "Quantitative Engineer Intern",
    company: "MaticAlgos",
    location: "Pune",
    date: "March 2025 - May 2025",
    description: "Working with Tick by Tick Live Data from the Exchange & Building Quantitative Models and AI algorithms for & Building Robust Backend System for high speed calculations for the Algo-trading platform. Optimized real-time data pipelines (3.2× faster, −69% latency) and built a Redis-backed concurrent task system. Developed 45+ technical indicators (>95% accuracy) and a Black-Scholes options engine with full Greeks. Integrated 4 broker APIs (5Paisa, Kotak, Upstox, DHAN) using REST/WebSocket + OAuth2/JWT authentication. Loki–Prometheus–Grafana observability stack for live monitoring.",
  },
  {
    title: "Backend Engineer Intern",
    company: "Ventory Company",
    location: "Pune",
    date: "June 2024 - August 2024",
    description: "Developed backend features and enhanced API functionality using Python for Ventory's platform.",
  },
  {
    title: "Bachelors in Artificial Intelligence Engineering",
    company: "Pune University",
    location: "Pune, India",
    date: "2021 - 2025",
    description: "CGPA: 8.9",
  },
  {
    title: "10th Computer Science",
    company: "Podar International School (ICSE)",
    location: "",
    date: "2019",
    description: "GPA: 8.1",
  },
];

export const Timeline = () => {
  return (
    <div className="glass-panel rounded-xl p-6 relative flex-grow">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none rounded-xl"></div>
      <div className="mb-5 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2">
          <span className="cmd-prompt"></span>
          <span className="text-accent-cyan">experience</span>
          <span className="text-muted">--log</span>
        </div>
        <span className="text-[10px] text-muted font-mono">Updated: Today</span>
      </div>
      <div className="relative pl-6 space-y-6 z-10 max-h-[600px] overflow-y-auto pr-2">
        {/* Vertical timeline line */}
        <div className="absolute left-[11px] top-1 bottom-1 w-[2px] bg-gradient-to-b from-accent-cyan/40 via-white/10 to-white/5"></div>

        {timelineData.map((item, index) => {
          const isPresent = item.isActive;

          return (
            <div key={index} className="relative pl-8 group">
              {/* Timeline dot - consistently positioned */}
              <div className={`absolute left-0 top-1 flex items-center justify-center z-10 transition-all duration-300 ${
                isPresent
                  ? 'w-[22px] h-[22px] -left-[0px]'
                  : 'w-[22px] h-[22px] -left-[0px]'
              }`}>
                <div className={`rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isPresent
                    ? 'w-[18px] h-[18px] border-accent-cyan bg-bg-card shadow-[0_0_20px_rgba(6,182,212,0.6)] ring-2 ring-accent-cyan/30'
                    : 'w-[14px] h-[14px] border-white/30 bg-bg-card group-hover:border-accent-cyan'
                }`}>
                  <div className={`rounded-full transition-all duration-300 ${
                    isPresent
                      ? 'w-2 h-2 bg-accent-cyan shadow-[0_0_10px_rgba(6,182,212,1)] animate-pulse'
                      : 'w-1.5 h-1.5 bg-gray-500 group-hover:bg-accent-cyan'
                  }`}></div>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <span className={`text-[10px] font-mono tracking-[0.15em] uppercase font-medium ${
                  isPresent ? 'text-accent-cyan font-bold' : 'text-muted/80'
                }`}>
                  {item.date}
                </span>
                <h3 className={`font-display font-semibold tracking-tight leading-tight ${
                  isPresent ? 'text-terminal-text dark:text-white text-[16px] font-bold' : 'text-[15px] text-terminal-text/90 dark:text-gray-100'
                }`}>
                  {item.title}
                </h3>
                <div className={`text-[12px] font-medium font-display tracking-wide ${
                  isPresent ? 'text-accent-cyan font-semibold' : 'text-muted'
                }`}>
                  @ {item.company}{item.location ? `, ${item.location}` : ''}
                </div>
                <p className={`text-[12px] leading-relaxed font-sans mt-1 ${
                  isPresent ? 'text-terminal-text/80 dark:text-gray-200 font-medium' : 'text-terminal-text/70 dark:text-gray-300'
                }`}>
                  {item.description}
                </p>
                {isPresent && (
                  <div className="mt-2.5 px-2.5 py-1 rounded-md bg-accent-cyan/10 border border-accent-cyan/30 inline-flex items-center gap-2 w-fit">
                    <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
                    <span className="text-[10px] font-mono text-accent-cyan font-bold tracking-wider">CURRENT POSITION</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
