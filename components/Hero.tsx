"use client";
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue} from 'framer-motion';
import { Github, Linkedin, Mail, Brain, Code, Twitter, Cloud, Database, Bot } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

const COLORS = ["#00E7FF", "#FF5E5E", "#4EFFB8", "#7B61FF"];
const ROLES = ["Artificial Intelligence Engineer", "Full Stack Developer", "Quantitative Researcher"];
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
    { icon: Linkedin, href: "https://www.linkedin.com/in/ranjan2829/", label: "LinkedIn" },
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

  return (
    <div className="w-full text-green-400 font-mono relative">
      <div className="relative z-25 w-full">
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

        {/* Terminal Content */}
        <motion.div 
          className="bg-black/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 border-x border-b border-gray-700 rounded-b-lg shadow-2xl shadow-cyan-500/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="space-y-3">
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

            {/* GitHub Contributions - Compact */}
            <div className="space-y-1">
              <p className="text-gray-400 text-sm">
                <span className="text-yellow-400">$</span> github-stats
              </p>
              <div className="bg-gray-900/50 p-2 rounded-lg overflow-x-auto max-w-full">
                <div className="scale-90 origin-left">
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

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;