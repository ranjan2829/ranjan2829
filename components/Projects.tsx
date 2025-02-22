"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "AI-Powered Analytics Dashboard",
    description: "Real-time data visualization platform with machine learning predictions",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    github: "https://github.com/ranjan2829/analytics-dashboard",
    demo: "https://analytics-dashboard.demo.com",
    tech: ["React", "Python", "TensorFlow", "D3.js"]
  },
  {
    title: "Blockchain Trading Platform",
    description: "Decentralized cryptocurrency trading platform with real-time market data",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    github: "https://github.com/ranjan2829/crypto-trading",
    demo: "https://crypto-trading.demo.com",
    tech: ["Solidity", "Web3.js", "Node.js", "MongoDB"]
  },
  {
    title: "Smart Home Automation System",
    description: "IoT-based home automation system with machine learning capabilities",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    github: "https://github.com/ranjan2829/smart-home",
    demo: "https://smart-home.demo.com",
    tech: ["Python", "Raspberry Pi", "TensorFlow", "MQTT"]
  }
];

export const Projects = () => {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-white mb-16"
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm"
            >
              <div className="relative h-48 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-sm bg-white/10 rounded-full text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  >
                    <Github size={20} />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  >
                    <ExternalLink size={20} />
                    Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};