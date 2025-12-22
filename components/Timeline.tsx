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
      <div className="relative pl-2 space-y-8 z-10 max-h-[600px] overflow-y-auto pr-2">
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10"></div>
        {timelineData.map((item, index) => (
          <div key={index} className="relative pl-6 group">
            <div className={`absolute left-1 top-1.5 w-4 h-4 bg-bg-card border rounded-full flex items-center justify-center z-10 transition-colors ${
              item.isActive 
                ? 'border-accent-cyan shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                : 'border-white/20 group-hover:border-accent-cyan'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
                item.isActive 
                  ? 'bg-accent-cyan' 
                  : 'bg-gray-500 group-hover:bg-accent-cyan'
              }`}></div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <span className={`text-[11px] font-mono tracking-wider uppercase mb-1 ${
                item.isActive ? 'text-accent-cyan font-semibold' : 'text-muted'
              }`}>
                {item.date}
              </span>
              <h3 className={`text-base font-display font-semibold mb-1 tracking-tight ${
                item.isActive ? 'text-white' : 'text-gray-100'
              }`}>
                {item.title}
              </h3>
              <div className="text-sm text-muted font-medium mb-2 font-display">
                @ {item.company}{item.location ? `, ${item.location}` : ''}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
