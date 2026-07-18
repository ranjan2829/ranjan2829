"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, Code2, FileText } from "lucide-react";
import { site } from "@/lib/site";

const ROLES = [
  "AI Infrastructure Engineer",
  "Full-Stack Engineer",
  "Web3 & Agent Systems",
];

const socialLinks = [
  { icon: Github, href: site.socials.github, label: "GitHub" },
  { icon: Linkedin, href: site.socials.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${site.email}`, label: "Email" },
  { icon: Code2, href: site.socials.leetcode, label: "LeetCode" },
];

/** Stagger offset for the `.rise` CSS entrance, which falls back to visible. */
const rise = (delay: number) => ({ style: { animationDelay: `${delay}s` } });

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // A looping animation with no pause control fails WCAG 2.2.2 — hold on
    // the first role when the OS asks for reduced motion.
    if (reduceMotion) return;
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 3000);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    // justify-start, not center: the hero shares a stretched grid row with the
    // timeline, so centering pushed the name down as that column grew.
    <div className="h-full flex flex-col justify-start py-4">
      <div
        {...rise(0.05)}
        className="rise inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-green/10 border border-accent-green/25 text-accent-green text-xs font-medium mb-6 w-fit"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent-green motion-safe:animate-pulse" />
        Open to AI infrastructure roles · Dubai, Remote
      </div>

      <h1
        {...rise(0.12)}
        className="rise text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold tracking-tight text-foreground leading-[1.1] mb-3 md:mb-4"
      >
        {site.name}
      </h1>

      {/* Fixed height reserves the line box so the rotating role can't shift
          the paragraph below it. Sized to the line-height, not below it. */}
      <div {...rise(0.19)} className="rise h-7 sm:h-8 mb-4 md:mb-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={roleIndex}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted font-display leading-7 sm:leading-8"
          >
            {ROLES[roleIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <p
        {...rise(0.26)}
        className="rise text-[13px] sm:text-sm md:text-[15px] text-muted leading-relaxed max-w-lg mb-6 md:mb-8"
      >
        Building the infrastructure that lets AI agents act autonomously — tool
        protocols, execution safety, and the systems underneath. Model Context
        Protocol, LLM agent architecture, and on-chain execution across fintech
        and crypto.
      </p>

      <ul
        {...rise(0.33)}
        className="rise flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] sm:text-sm text-muted mb-6 md:mb-8 list-none p-0"
      >
        {site.locations.map((location) => (
          <li key={location} className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden />
            {location}
          </li>
        ))}
        <li className="flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden />
          <a
            href={`mailto:${site.email}`}
            className="hover:text-foreground transition-colors break-all"
          >
            {site.email}
          </a>
        </li>
        <li className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden />
          <a href={`tel:${site.phone}`} className="hover:text-foreground transition-colors">
            {site.phoneDisplay}
          </a>
        </li>
      </ul>

      <div {...rise(0.4)} className="rise flex flex-wrap items-center gap-2">
        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-foreground text-background text-[13px] font-medium hover:opacity-90 transition-opacity"
        >
          <FileText className="w-4 h-4" aria-hidden />
          View resume
        </a>

        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-card border border-card-border hover:border-card-hover text-muted hover:text-foreground transition-colors duration-200"
            aria-label={label}
          >
            <Icon className="w-[18px] h-[18px]" aria-hidden />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Hero;
