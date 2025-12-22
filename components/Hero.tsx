"use client";
import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

const ROLES = ["AI Engineer", "Software Development Engineer", "Quantitative Engineer"];

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com/ranjan2829", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ranjan2829/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:ranjan.shitole3129@gmail.com", label: "Email" },
    { 
      icon: () => (
        <Image 
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" 
          alt="LeetCode" 
          width={20}
          height={20}
          className="w-5 h-5"
        />
      ), 
      href: "https://leetcode.com/u/ranjanshitole/", 
      label: "LeetCode" 
    },
  ];

  return (
    <div className="glass-panel rounded-xl overflow-hidden shadow-2xl h-full">
      {/* Terminal Header */}
      <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-red/80"></div>
          <div className="w-3 h-3 rounded-full bg-accent-yellow/80"></div>
          <div className="w-3 h-3 rounded-full bg-accent-green/80"></div>
        </div>
        <div className="ml-4 text-[10px] text-muted font-mono tracking-wide">ranjan@portfolio:~</div>
        <div className="ml-auto flex items-center gap-2 px-2 py-0.5 rounded bg-accent-green/10 text-accent-green text-[10px] font-bold tracking-wider border border-accent-green/20">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse"></span>
          ONLINE
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Whoami Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="cmd-prompt text-accent-yellow"></span>
            <span className="text-accent-cyan">whoami</span>
          </div>
          <div className="pl-5 border-l-2 border-white/10 py-1">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-terminal-text mb-2 tracking-tight dark:text-white">
              Ranjan Shitole
            </h1>
            <p className="text-muted text-sm md:text-base font-medium">
              <span className="text-accent-cyan">➜</span> {ROLES[roleIndex]}
              <span className="mx-2 text-black/20 dark:text-white/20">{'//'}</span> AI/ML
              <span className="mx-2 text-black/20 dark:text-white/20">{'//'}</span> Backend Focused
            </p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="cmd-prompt"></span>
            <span className="text-accent-cyan">cat</span>
            <span className="text-muted">bio.txt</span>
          </div>
          <div className="pl-5 text-sm md:text-base leading-relaxed text-terminal-text/90 max-w-2xl dark:text-gray-300">
            "AI Engineer specializing in building production-grade AI systems, quantitative trading platforms, and scalable backend infrastructure. Expert in PyTorch, LLMs, RAG, and high-performance systems."
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="cmd-prompt"></span>
            <span className="text-accent-cyan">cat</span>
            <span className="text-muted">contact.txt</span>
          </div>
          <div className="pl-5 space-y-2 text-sm md:text-base">
            <div className="flex items-center gap-2 text-terminal-text dark:text-gray-300">
              <MapPin className="w-4 h-4 text-muted" />
              <span>Pune, India</span>
            </div>
            <a href="mailto:ranjan.shitole3129@gmail.com" className="flex items-center gap-2 text-terminal-text dark:text-gray-300 hover:text-accent-cyan transition-colors">
              <Mail className="w-4 h-4 text-muted" />
              <span>ranjan.shitole3129@gmail.com</span>
            </a>
            <a href="tel:+917387792437" className="flex items-center gap-2 text-terminal-text dark:text-gray-300 hover:text-accent-cyan transition-colors">
              <Phone className="w-4 h-4 text-muted" />
              <span>+91 7387792437</span>
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="cmd-prompt"></span>
            <span className="text-accent-cyan">ls</span>
            <span className="text-muted">social-links/</span>
          </div>
          <div className="pl-5 flex gap-3 pt-1">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-white/5 border border-white/10 hover:border-accent-cyan hover:bg-accent-cyan/10 hover:text-accent-cyan transition-all duration-300 group touch-manipulation"
                aria-label={label}
              >
                <Icon className="w-[20px] h-[20px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
