"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Phone, Code2 } from 'lucide-react';

const ROLES = ["AI Engineer", "Software Development Engineer", "Quantitative Engineer"];

const socialLinks = [
  { icon: Github, href: "https://github.com/ranjan2829", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ranjan2829/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:ranjan.shitole3129@gmail.com", label: "Email" },
  { icon: Code2, href: "https://leetcode.com/u/ranjanshitole/", label: "LeetCode" },
];

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="h-full flex flex-col justify-center py-4"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green text-xs font-medium mb-6 w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
        Open to opportunities
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold tracking-tight text-foreground leading-[1.1] mb-4">
        Ranjan Shitole
      </h1>

      <div className="h-7 mb-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={roleIndex}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted font-display"
          >
            {ROLES[roleIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="text-sm md:text-[15px] text-muted leading-relaxed max-w-lg mb-8">
        Building production-grade AI systems, quantitative trading platforms, and
        scalable backend infrastructure. Focused on Frontend, Backend, LLMs,
        AWS, and Cloud-native distributed systems.
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted mb-8">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          Dubai, UAE
        </span>
        <span className="hidden sm:inline w-1 h-1 rounded-full bg-card-border" />
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          Pune, India
        </span>
        <span className="hidden sm:inline w-1 h-1 rounded-full bg-card-border" />
        <a
          href="mailto:ranjan.shitole3129@gmail.com"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Mail className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">ranjan.shitole3129@gmail.com</span>
          <span className="sm:hidden">Email</span>
        </a>
        <span className="hidden sm:inline w-1 h-1 rounded-full bg-card-border" />
        <a
          href="tel:+917387792437"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">+91 7387792437</span>
          <span className="sm:hidden">Phone</span>
        </a>
      </div>

      <div className="flex items-center gap-2">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-card border border-card-border hover:border-muted text-muted hover:text-foreground transition-all duration-200"
            aria-label={label}
          >
            <Icon className="w-[18px] h-[18px]" />
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export default Hero;
