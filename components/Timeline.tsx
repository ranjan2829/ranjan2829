"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { roles, education } from "@/lib/resume";

// Education is appended so the panel still ends on the degree.
const timelineData = [
  ...roles,
  ...education.slice(0, 1).map((e) => ({
    title: e.title,
    company: e.company,
    location: e.location,
    date: e.date,
    description: e.detail,
    highlights: [`${e.title}, ${e.company}. ${e.detail}.`],
    isActive: false,
  })),
];

export const Timeline = () => {
  // All collapsed by default. Auto-expanding the current role made the panel
  // ~1500px tall and pushed the hero below the fold — the one-line summary
  // per role is enough to scan, and detail is one click away.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="card p-5 md:p-6 h-full flex flex-col"
    >
      <h2 className="eyebrow mb-5 font-display">Experience</h2>

      <div className="relative flex-1">
        <div className="absolute left-[3px] top-2 bottom-2 w-px bg-card-border" aria-hidden />

        <ol className="space-y-1 pl-7 relative list-none p-0">
          {timelineData.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `role-panel-${index}`;

            return (
              <li key={`${item.company}-${item.date}`} className="relative group pb-4">
                <div
                  className={`absolute -left-7 top-[10px] w-[9px] h-[9px] rounded-full border-2 transition-colors duration-200 ${
                    item.isActive
                      ? "border-accent-green bg-accent-green shadow-[0_0_8px_rgba(34,197,94,0.45)]"
                      : "border-card-border bg-background group-hover:border-accent"
                  }`}
                  aria-hidden
                />

                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full text-left rounded-lg -mx-2 px-2 py-1.5 hover:bg-foreground/[0.03] transition-colors"
                >
                  <div className="text-xs text-muted font-mono tracking-wide">{item.date}</div>

                  <div className="flex items-start justify-between gap-3 mt-1">
                    <h3 className="text-[15px] font-semibold text-foreground leading-snug font-display group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <ChevronDown
                      className={`w-4 h-4 text-muted shrink-0 mt-0.5 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </div>

                  <div className="text-[13px] text-muted mt-1">
                    <span className="text-foreground/80 font-medium">{item.company}</span>
                    {item.location ? ` · ${item.location}` : ""}
                  </div>

                  {!isOpen && (
                    <p className="text-[13px] text-muted mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  {item.isActive && (
                    <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-accent-green font-medium tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-green motion-safe:animate-pulse" />
                      Current
                    </span>
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-2 space-y-2 list-none p-0">
                        {item.highlights.map((point) => (
                          <li
                            key={point}
                            className="flex gap-2.5 text-[13px] text-muted leading-relaxed"
                          >
                            <span
                              className="mt-[7px] w-1 h-1 rounded-full bg-accent shrink-0"
                              aria-hidden
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </div>
    </motion.div>
  );
};

export default Timeline;
