"use client";
// Aceternity UI Timeline (ui.aceternity.com/components/timeline).
// Adapted for this site: no demo heading, theme tokens instead of fixed
// white/neutral backgrounds, ReactNode titles, an `active` dot for the current
// entry, and a ResizeObserver so the beam follows content that expands.
import { motion, useScroll, useTransform } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface TimelineEntry {
  /** Pinned beside the entry while it scrolls past. */
  title: React.ReactNode;
  content: React.ReactNode;
  active?: boolean;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div ref={ref} className="relative mx-auto max-w-6xl pb-10">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10 md:pt-28 first:md:pt-4">
            <div className="sticky top-32 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex size-10 items-center justify-center rounded-full bg-background">
                <div
                  className={cn(
                    "size-4 rounded-full border p-2",
                    item.active
                      ? "border-accent-green bg-accent-green shadow-[0_0_0_6px_color-mix(in_srgb,var(--accent-green)_20%,transparent)]"
                      : "border-card-hover bg-card"
                  )}
                />
              </div>
              <div className="hidden md:block md:pl-20">{item.title}</div>
            </div>

            <div className="relative w-full pl-20 pr-0 md:pl-4">
              <div className="mb-4 block md:hidden">{item.title}</div>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{ height: height + "px" }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-card-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-accent via-accent-cyan via-[10%] to-transparent from-[0%]"
          />
        </div>
      </div>
    </div>
  );
};
