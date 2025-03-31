"use client";
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue} from 'framer-motion';
import { Github, Linkedin, Mail, Code, Brain,  ArrowRight, Twitter, Briefcase, Cloud, Database, Bot } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

const COLORS = ["#00E7FF", "#FF5E5E", "#4EFFB8", "#7B61FF"];
const ROLES = ["Artificial Intelligence Engineer", "Full Stack Developer", "Machine Learning Researcher"];
const TYPING_SPEED = 150;
import Image from 'next/image'; 

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayText("");
    const timer = setInterval(() => {
      setDisplayText(() => text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, TYPING_SPEED);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="font-mono">
      {displayText}
      <motion.span
        className="inline-block w-4 h-5 bg-cyan-400 ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  );
};

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const color = useMotionValue(COLORS[0]);
  const [showBio, setShowBio] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % COLORS.length;
      color.set(COLORS[index]);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);

    setTimeout(() => setShowBio(true), 2000);

    return () => clearInterval(interval);
  }, [color]);

  const socialLinks = [
    { icon: Github, href: "https://github.com/ranjan2829", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ranjan-shitole-8b8484123/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:ranjan.shitole3129@gmail.com", label: "Email" },
    { 
      icon: () => (
        <Image 
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" 
          alt="LeetCode" 
          width={24} // Specify width (adjust as needed)
          height={24} // Specify height (adjust as needed)
          className="w-6 h-6" // Tailwind classes for responsive sizing
          priority={false} // Optional: Set to true if this image is critical for LCP
        />
      ), 
      href: "https://leetcode.com/u/ranjanshitole/", 
      label: "LeetCode" 
    },
    { icon: Twitter, href: "https://x.com/Ranjancosmos", label: "X" }
  ];
  
  const skills = [
    { icon: Brain, label: "Machine Learning" },
    { icon: Code, label: "Web Dev" },
    { icon: Cloud, label: "Cloud Computing" },
    { icon: Database, label: "Databases" },
    { icon: Bot, label: "AI Agents" },
  ];

  const githubTheme = {
    dark: ['#1a1a1a', '#0e4429', '#006d32', '#26a641', '#39d353']
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-20 font-mono relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="relative z-25 max-w-6xl mx-auto">
        {/* Terminal Header */}
        <motion.div 
          className="bg-gray-900 rounded-t-lg p-3 border border-gray-700"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-gray-400">ranjan@portfolio:~</span>
          </div>
        </motion.div>

        {/* Terminal Content - Scrollable */}
        <motion.div 
          className="bg-black/80 backdrop-blur-sm p-5 border-x border-b border-gray-700 rounded-b-lg overflow-y-auto max-h-[80vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="text-cyan-400">
                <TypewriterText text="Initializing Ranjan's Portfolio..." />
              </p>
              <p className="text-gray-400">
                <span className="text-yellow-400">$</span> whoami
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                  Ranjan Shitole
                </h1>
                <p className="text-lg text-cyan-400 mt-1">
                  <span className="text-gray-400">{'>>'}</span> {ROLES[roleIndex]}
                </p>
              </motion.div>
            </div>

            {/* Bio Section */}
            {showBio && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-1"
              >
                <p className="text-gray-400">
                  <span className="text-yellow-400">$</span> cat bio.txt
                </p>
                <div className="pl-4 text-cyan-300">
                  <p>Artificial Intelligence Engineer and Full Stack Developer with expertise in Cloud Computing</p>
                  <ul className="list-disc pl-6 mt-1 space-y-1">
                    <li>Building AI Agents</li>
                    <li>Machine Learning & Deep Learning</li>
                    <li>Full Stack Development</li>
                    <li>Quantitative Analysis</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Skills Section */}
            <div className="space-y-1">
              <p className="text-gray-400">
                <span className="text-yellow-400">$</span> skills --list
              </p>
              <div className="flex gap-3 flex-wrap">
                {skills.map(({ icon: Icon, label }) => (
                  <motion.div
                    key={label}
                    className="flex items-center gap-2 p-2 bg-gray-900/50 rounded-lg border border-gray-700"
                    whileHover={{ scale: 1.05, borderColor: "#00E7FF" }}
                  >
                    <Icon className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-300 text-sm">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Currently Learning */}
            <div className="space-y-1">
              <p className="text-gray-400">
                <span className="text-yellow-400">$</span> learning --now
              </p>
              <p className="text-cyan-300 pl-4">
                <TypewriterText text="Exploring AI Agents and LLMs" />
              </p>
            </div>

            {/* GitHub Contributions */}
            <div className="space-y-1">
              <p className="text-gray-400">
                <span className="text-yellow-400">$</span> github-stats
              </p>
              <div className="bg-gray-900/50 p-3 rounded-lg overflow-x-auto">
                <GitHubCalendar 
                  username="ranjan2829"
                  theme={githubTheme}
                  hideColorLegend
                  hideMonthLabels={false}
                  labels={{
                    totalCount: '{{count}} contributions in the last year'
                  }}
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-1">
              <p className="text-gray-400">
                <span className="text-yellow-400">$</span> ls social-links/
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    className="p-2 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-cyan-500 hover:text-cyan-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="space-y-1">
              <p className="text-gray-400">
                <span className="text-yellow-400">$</span> dir navigation/
              </p>
              <div className="flex gap-2">
                <motion.button
                  className="group flex items-center gap-2 px-5 py-2 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-cyan-500 hover:text-cyan-400 transition-all text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('projects')}
                >
                  <Code className="w-4 h-4" />
                  <span>Projects</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                </motion.button>

                <motion.button
                  className="group flex items-center gap-2 px-5 py-2 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-cyan-500 hover:text-cyan-400 transition-all text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('projects')}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Experience</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                </motion.button>


              </div>
            </div>


          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
