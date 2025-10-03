"use client";
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue} from 'framer-motion';
import { Github, Linkedin, Mail, Brain, Code, Twitter, Cloud, Database, Bot, Download, MapPin, Phone, ArrowDown } from 'lucide-react';
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
  const [isMinimized, setIsMinimized] = useState(false);

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
    { icon: Code, label: "Full Stack Dev" },
    { icon: Cloud, label: "Cloud & DevOps" },
    { icon: Database, label: "Databases" },
    { icon: Bot, label: "AI Agents" },
  ];

  const techStack = {
    languages: ["Python", "TypeScript", "JavaScript", "C++", "Go"],
    backend: ["FastAPI", "Node.js", "Next.js"],
    databases: ["PostgreSQL", "MongoDB", "Redis", "SQL"],
    aiml: ["PyTorch", "LangChain", "LLMs", "RAG", "Transformers"],
    cloud: ["Docker", "Kubernetes", "AWS EC2", "AWS S3", "Lambda", "SageMaker"],
    tools: ["Git", "Kafka", "Spark", "Prometheus", "Grafana"]
  };

  const githubTheme = {
    dark: ['#1a1a1a', '#0e4429', '#006d32', '#26a641', '#39d353']
  };

  return (
    <div className="w-full font-mono relative">
      <div className="relative z-25 w-full">
        {/* Terminal Header */}
        <motion.div 
          className="bg-gray-900 rounded-t-lg p-3 border border-gray-700"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2">
            <motion.div 
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:brightness-125"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                const heroSection = document.getElementById('home');
                if (heroSection) heroSection.style.opacity = '0.5';
                setTimeout(() => { if (heroSection) heroSection.style.opacity = '1'; }, 200);
              }}
            />
            <motion.div 
              className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:brightness-125"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setIsMinimized(!isMinimized)}
            />
            <motion.div 
              className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:brightness-125"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
            <span className="ml-4 text-gray-400">ranjan@portfolio:~</span>
          </div>
        </motion.div>

        {/* Terminal Content with CRT Effect */}
        <motion.div 
          className="terminal-crt bg-black/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 border-x border-b border-gray-700 rounded-b-lg shadow-2xl shadow-cyan-500/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, height: isMinimized ? 0 : 'auto' }}
          transition={{ delay: 0.1 }}
          style={{ overflow: isMinimized ? 'hidden' : 'visible' }}
        >
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-white">
                <TypewriterText text="Initializing Ranjan's Portfolio..." />
              </p>
              <p className="text-gray-400">
                <span className="text-yellow-400">$</span> cat profile.txt
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Ranjan Shitole
                </h1>
                <p className="text-lg text-white mt-1">
                  <span className="text-gray-400">{'>>'}</span> {ROLES[roleIndex]}
                </p>
                
                {/* Contact Info */}
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>Pune, India</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>ranjan.shitole3129@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <span>+91 7387792437</span>
                  </div>
                </div>

                {/* View Resume Button */}
                <motion.button
                  onClick={() => {
                    const resumeSection = document.getElementById('resume');
                    if (resumeSection) {
                      resumeSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowDown className="w-4 h-4" />
                  View Resume
                </motion.button>
              </motion.div>
            </div>

            {/* Currently Working Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-1 border-l-2 border-white pl-3"
            >
              <p className="text-gray-400">
                <span className="text-yellow-400">$</span> status --current
              </p>
              <div className="text-white space-y-1">
                <p className="font-bold">Currently:</p>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>→ Software Engineer @ Brain Labs (Finance Quant Trading Platform)</li>
                </ul>
              </div>
            </motion.div>

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
                <div className="pl-4 text-white">
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

            {/* Tech Stack Section */}
            <div className="space-y-2">
              <p className="text-gray-400">
                <span className="text-yellow-400">$</span> tech-stack --all
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-900/50 p-2 rounded border border-gray-700">
                  <p className="text-white font-bold mb-1">Languages</p>
                  <p className="text-gray-300">{techStack.languages.join(" · ")}</p>
                </div>
                <div className="bg-gray-900/50 p-2 rounded border border-gray-700">
                  <p className="text-white font-bold mb-1">Backend</p>
                  <p className="text-gray-300">{techStack.backend.join(" · ")}</p>
                </div>
                <div className="bg-gray-900/50 p-2 rounded border border-gray-700">
                  <p className="text-white font-bold mb-1">AI/ML</p>
                  <p className="text-gray-300">{techStack.aiml.join(" · ")}</p>
                </div>
                <div className="bg-gray-900/50 p-2 rounded border border-gray-700">
                  <p className="text-white font-bold mb-1">Cloud & DevOps</p>
                  <p className="text-gray-300">{techStack.cloud.join(" · ")}</p>
                </div>
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