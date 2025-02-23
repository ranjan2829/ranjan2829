import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Bot, Brain, Cpu, LineChart } from 'lucide-react';

const projects = [
  {
    title: 'AI Trading Bot',
    description: 'Automated trading system using deep learning for market prediction and risk management.',
    tech: ['Python', 'TensorFlow', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/yourusername/ai-trading-bot',
    live: 'https://ai-trading-demo.com',
    icon: Bot
  },
  {
    title: 'Neural Network Visualizer',
    description: 'Interactive visualization tool for understanding neural network architectures and decision processes.',
    tech: ['React', 'D3.js', 'TypeScript', 'WebGL'],
    github: 'https://github.com/yourusername/nn-viz',
    live: 'https://nn-visualizer.demo',
    icon: Brain
  },
  {
    title: 'Quantum Computing Simulator',
    description: 'Web-based quantum circuit simulator with interactive gates and state visualization.',
    tech: ['TypeScript', 'WebAssembly', 'Three.js', 'Rust'],
    github: 'https://github.com/yourusername/quantum-sim',
    live: 'https://quantum-simulator.demo',
    icon: Cpu
  },
  {
    title: 'Market Analysis Dashboard',
    description: 'Real-time financial data visualization and analysis platform with ML-powered insights.',
    tech: ['Next.js', 'Python', 'FastAPI', 'TailwindCSS'],
    github: 'https://github.com/yourusername/market-dashboard',
    live: 'https://market-analysis.demo',
    icon: LineChart
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 bg-[#011627] relative overflow-hidden">
      {/* Enhanced grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d2634_1px,transparent_1px),linear-gradient(to_bottom,#1d2634_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d263420_1px,transparent_1px),linear-gradient(to_bottom,#1d263420_1px,transparent_1px)] bg-[size:1rem_1rem]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="mb-16">
          <div className="text-[#4FF2F8] font-mono mb-2 flex items-center gap-2">
            <span className="text-[#4FF2F8]/50">$</span> ./list-projects.sh
          </div>
          <h2 className="text-4xl font-bold text-white glow-text">Featured Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1d2634]/50 rounded-lg p-6 border border-[#2d3644] backdrop-blur-sm group hover:bg-[#1d2634] transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <project.icon className="w-8 h-8 text-[#4FF2F8]" />
                <div className="flex gap-3">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4FF2F8] hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4FF2F8] hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-[#011627] rounded text-sm font-mono text-[#4FF2F8] border border-[#2d3644]/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;