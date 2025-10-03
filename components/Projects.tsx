"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {Github, Brain, LineChart, Code, Terminal, Phone, TrendingUp, Zap } from 'lucide-react';

const projects = [
  {
    title: "AI Calling Agent",
    description: "Built a production-grade AI Calling Agent at Onelab Ventures using FastAPI, React (TypeScript), Twilio, and AWS (Transcribe + S3). Designed end-to-end architecture for automated interviews: scalable async backend, bulk candidate processing, real-time transcription. Deployed on AWS EC2 with secure APIs and modular frontend dashboards.",
    image: "https://cdn.prod.website-files.com/67af3db5bb3b892e61258bd4/688cfdaa7b5a472a34eceb53_151-call-center-ai-agents.png",
    github: "https://github.com/ranjan2829",
    demo: "http://13.204.76.229:3000/",
    tech: ["FastAPI", "React", "TypeScript", "Twilio", "AWS Transcribe", "AWS S3", "AWS EC2", "Python", "Async Processing"],
    icon: Phone,
    color: "#7B61FF"
  },
  {
    title: "Hyperliquid RAG Agent",
    description: "Built an AI-powered market intelligence agent for the HyperLiquid ecosystem using FastAPI, Next.js, Turbopuffer, and GPT-4. Designed semantic search and real-time sentiment analysis across multi-source data. Deployed on AWS EC2 + Vercel with ngrok for secure API access.",
    image: "https://blockchainaddict.fr/wp-content/uploads/2024/10/HyperLiquid-blockchainaddict.fr_.jpg",
    github: "https://github.com/ranjan2829",
    demo: "https://hyper-liquid-agent.vercel.app/",
    tech: ["FastAPI", "Next.js", "Turbopuffer", "GPT-4", "AWS EC2", "Vercel", "Semantic Search", "Sentiment Analysis"],
    icon: TrendingUp,
    color: "#00E7FF"
  },
  {
    title: "Live HFT Exchange Engine",
    description: "Developed a high-frequency trading exchange engine in C++ with ultra-low latency order matching, lock-free queues, and memory pooling. Implemented multi-threaded trade execution and socket-based networking for real-time order flow. Built with CMake and optimized for hedge fund/prop trading scale performance and extensibility.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
    github: "https://github.com/ranjan2829/Live-High-Frequency-Trading-Exchange-Engine",
    demo: "https://github.com/ranjan2829/Live-High-Frequency-Trading-Exchange-Engine",
    tech: ["C++", "CMake", "Multi-threading", "Lock-free Queues", "Memory Pooling", "Socket Programming", "HFT", "Ultra-low Latency"],
    icon: Zap,
    color: "#FF5E5E"
  },
  {
    title: "Perception-AI",
    description: "Perception AI is an interactive web application that uses AI to process handwritten mathematical expressions. ✍️ Users can draw on a canvas, and the backend analyzes the image, solves the expression, and displays the result in real-time.",
    image: "https://www.elegantthemes.com/blog/wp-content/uploads/2023/07/history-of-AI-art.jpg",
    github: "https://github.com/ranjan2829/Perception-AI-App",
    demo: "https://ai-illustration-sigma.vercel.app/",
    tech: ["Python","FastAPI","React", "TypeScript", "Vite","Gemini AI", "gemini-1.5-flash", "Google AI Studio","Git", "GitHub"
      ],
    icon: Brain,
    color: "#00E7FF"
  },
  {
    title: "AI Search Engine",
    description: "Frontend built with Next.js (TypeScript) featuring server-side rendering and responsive UI components. Integrates with a FastAPI backend via REST APIs for AI-powered search results ranking and Google Trends data visualization, ensuring a seamless and interactive user experience.",
    image: "https://cdn.builtin.com/cdn-cgi/image/f=auto,fit=cover,w=1200,h=635,q=80/https://builtin.com/sites/www.builtin.com/files/2024-06/AI%20search%20engine.jpg",
    github: "https://github.com/ranjan2829/quant-analytics",
    demo: "https://quant-analytics-demo.com",
    tech: ["React", "D3.js", "Python", "PostgreSQL"],
    icon: LineChart,
    color: "#FF5E5E"
  },
  {
    title: "Kubernetes AI Automation Agent",
    description: "Kubernetes AI Agent is an intelligent system designed to analyze Kubernetes logs for anomalies, failures, and performance issues. It uses AI-driven insights to help DevOps teams monitor and optimize Kubernetes-based deployments.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    github: "https://github.com/ranjan2829/Kubernetes-AI-Agent",
    demo: "https://github.com/ranjan2829/Kubernetes-AI-Agent",
    tech: ["Docker", "Kubernetes", "MLflow", "Python","FastAPI","Groq DeepSeek-R1","HPA","Git", "GitHub","Fluentd","Logging"
      ],
    icon: Code,
    color: "#4EFFB8"
  }
];

export const Projects = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className={`py-12 sm:py-16 md:py-20 relative transition-colors duration-300 ${
      isDarkMode ? 'bg-black' : 'bg-gray-50'
    }`}>
      {/* Terminal Grid Background */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${
        isDarkMode 
          ? 'bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]'
          : 'bg-[linear-gradient(to_right,#e0e0e0_1px,transparent_1px),linear-gradient(to_bottom,#e0e0e0_1px,transparent_1px)] bg-[size:4rem_4rem]'
      }`} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Terminal Header */}
        <motion.div 
          className={`rounded-t-lg p-4 border mb-8 transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-700' 
              : 'bg-white border-gray-300'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2">
            <motion.div 
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:brightness-125"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8, rotate: 360 }}
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
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <span className={`ml-4 font-mono transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-700'
            }`}>ranjan@portfolio:~/projects $</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          animate={{ height: isMinimized ? 0 : 'auto' }}
          transition={{ duration: 1 }}
          style={{ overflow: isMinimized ? 'hidden' : 'visible' }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={`inline-block backdrop-blur-sm border rounded-lg p-4 mb-6 transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-black/50 border-cyan-500/20' 
                  : 'bg-white/50 border-blue-500/20'
              }`}
            >
              <span className={`font-mono transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>ls -la ./projects</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`rounded-xl overflow-hidden backdrop-blur-sm transition-all group ${
                  isDarkMode 
                    ? 'bg-black/30 border border-gray-700 hover:border-cyan-500/40' 
                    : 'bg-white/80 border border-gray-300 hover:border-blue-500/40'
                }`}
                style={{ boxShadow: `0 4px 20px ${project.color}20` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute top-4 right-4">
                    <project.icon className="w-6 h-6" style={{ color: project.color }} />
                  </div>
                </div>

                <div className="p-6 font-mono">
                  <h3 className="text-xl font-bold mb-2" style={{ color: project.color }}>
                    {`> ${project.title}`}
                  </h3>
                  <p className={`mb-4 text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 text-sm rounded-md ${
                          isDarkMode 
                            ? 'bg-gray-800 border border-gray-700 text-white' 
                            : 'bg-gray-100 border border-gray-300 text-black'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 transition-colors ${
                        isDarkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-5 h-5" />
                      <span>git clone</span>
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 transition-colors ${
                        isDarkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Terminal className="w-5 h-5" />
                      <span>./demo</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Projects;