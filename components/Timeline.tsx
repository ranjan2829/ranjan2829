"use client";

import React from 'react';
import { motion } from 'framer-motion';

const timelineData = [
  {
    title: "AI Engineer",
    company: "Allocations",
    location: "Dubai, UAE",
    date: "Mar 2026 — Present",
    description: "Working onsite as AI Engineer building production AI systems and intelligent automation for the platform.",
    isActive: true,
  },
  {
    title: "Software Development Engineer",
    company: "Brain Labs",
    location: "Kharadi, Pune",
    date: "Sep 2025 — Feb 2026",
    description: "Working on Finance Quant trading platform. Building scalable systems for high-frequency trading.",
  },
  {
    title: "Associate Software Developer Intern",
    company: "OneLab Ventures",
    location: "Hinjewadi",
    date: "Jun — Aug 2025",
    description: "Built and deployed AI calling agent (Twilio + FastAPI + AWS) processing 320+ interviews with 98%+ accuracy. Architected async backend handling 70 concurrent calls.",
  },
  {
    title: "Quantitative Engineer Intern",
    company: "MaticAlgos",
    location: "Pune",
    date: "Mar — May 2025",
    description: "Optimized real-time data pipelines (3.2× faster). Built 45+ technical indicators and Black-Scholes options engine. Integrated 4 broker APIs.",
  },
  {
    title: "Backend Engineer Intern",
    company: "Ventory",
    location: "Pune",
    date: "Jun — Aug 2024",
    description: "Developed backend features and enhanced API functionality using Python.",
  },
  {
    title: "B.E. Artificial Intelligence",
    company: "Pune University",
    location: "Pune",
    date: "2021 — 2025",
    description: "CGPA: 8.9",
  },
];

export const Timeline = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="card p-5 md:p-6 h-full flex flex-col"
    >
      <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted mb-5 font-display">
        Experience
      </h2>

      <div className="relative flex-1 overflow-y-auto pr-2 -mr-2">
        <div className="absolute left-[3px] top-2 bottom-2 w-px bg-card-border" />

        <div className="space-y-5 pl-7 relative">
          {timelineData.map((item, index) => (
            <div key={index} className="relative group">
              <div
                className={`absolute -left-7 top-[6px] w-[7px] h-[7px] rounded-full border-2 transition-colors duration-200 ${
                  item.isActive
                    ? 'border-accent-green bg-accent-green shadow-[0_0_6px_rgba(34,197,94,0.4)]'
                    : 'border-card-border bg-background group-hover:border-muted'
                }`}
              />

              <div className="text-[11px] text-muted font-mono tracking-wide">
                {item.date}
              </div>

              <h3 className="text-[13px] font-semibold text-foreground mt-1 leading-snug font-display">
                {item.title}
              </h3>

              <div className="text-xs text-muted mt-0.5">
                {item.company}
                {item.location ? ` · ${item.location}` : ''}
              </div>

              <p className="text-xs text-muted mt-1.5 leading-relaxed line-clamp-3">
                {item.description}
              </p>

              {item.isActive && (
                <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] text-accent-green font-medium tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                  Current
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;
