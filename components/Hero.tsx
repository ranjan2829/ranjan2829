"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Terminal, Github, Linkedin, Mail, Code, Cpu, ChevronDown, Boxes, History } from "lucide-react";
import Typewriter from "typewriter-effect";
import Link from "next/link";

const ROLES = ["ML Architect", "AI Engineer", "Software Developer"];

// Matrix rain effect component
const MatrixRain = () => {
  const characters = "01";
  const [raindrops, setRaindrops] = useState<{ id: number; left: number; delay: number }[]>([]);

  useEffect(() => {
    const drops = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setRaindrops(drops);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="matrix-rain"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
          }}
        >
          {characters[Math.floor(Math.random() * characters.length)]}
        </div>
      ))}
    </div>
  );
};

const Hero = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0.3, 1, 0.3],
      transition: { duration: 2, repeat: Infinity },
    });
  }, [controls]);

  const scrollToSection = (id: string) => {
    if (typeof window !== "undefined") {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen bg-[#011627] text-[#4FF2F8] relative overflow-hidden px-4">
      {/* Matrix rain effect */}
      <MatrixRain />

      {/* Enhanced grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d2634_1px,transparent_1px),linear-gradient(to_bottom,#1d2634_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d263420_1px,transparent_1px),linear_gradient(to_bottom,#1d263420_1px,transparent_1px)] bg-[size:1rem_1rem]" />
      </div>

      {/* Glowing orb effect */}
      <motion.div
        animate={controls}
        className="absolute top-1/4 -right-32 w-96 h-96 bg-[#4FF2F8] rounded-full blur-[128px] opacity-20"
      />

      <div className="container mx-auto pt-20 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          {/* Terminal Header */}
          <div className="bg-[#1d2634] rounded-t-lg p-3 flex items-center gap-2 border border-[#2d3644]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center text-sm text-[#4FF2F8]/70 font-mono">~/portfolio</div>
            <Cpu className="w-4 h-4 text-[#4FF2F8]/50" />
          </div>

          {/* Terminal Content */}
          <div className="bg-[#011627]/90 border border-[#1d2634] rounded-b-lg p-8 backdrop-blur-sm">
            <div className="mb-8">
              <div className="text-[#4FF2F8] font-mono mb-2 flex items-center gap-2">
                <span className="text-[#4FF2F8]/50">$</span> ./init.sh
              </div>
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white mb-4 glow-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Ranjan Shitole
              </motion.h1>
              <div className="text-xl md:text-2xl font-mono text-[#4FF2F8] flex items-center gap-2">
                <span className="text-[#4FF2F8]/50">{">"}</span>
                <Typewriter options={{ strings: ROLES, autoStart: true, loop: true, deleteSpeed: 50, delay: 75 }} />
              </div>
              {/* New Portfolio Description Text */}
              <motion.div
                className="mt-9 text-[#4FF2F8]/90 font-mono text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-[#4FF2F8]/90">{">> "}</span> 
                
               AI Engineer with High profile Trading Skills
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { Icon: Github, href: "https://github.com/ranjan2829", label: "GitHub" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/ranjan-shitole-8b8484123/", label: "LinkedIn" },
                { Icon: Mail, href: "mailto:ranjan.shitole3129@gmail.com", label: "Email" },
                { Icon: Code, href: "#projects", label: "Projects" },
              ].map(({ Icon, href, label }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#1d2634]/50 rounded-lg text-[#4FF2F8] hover:bg-[#2d3644] transition-colors border border-[#2d3644]/50 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Icon size={20} />
                  <span className="font-mono">{label}</span>
                </motion.a>
              ))}
            </div>

            {/* Resume Button */}
            <Link
              href="/Resume.pdf"
              className="inline-flex items-center gap-2 px-9 py-3 bg-[#4FF2F8] text-[#011627] rounded-lg font-mono hover:bg-[#3CE1E7] transition-colors"
            >
              <Terminal size={20} />
              <span>Touch Resume.pdf</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;