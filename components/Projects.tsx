"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Brain, LineChart, Code, Terminal } from 'lucide-react';

const projects = [
  {
    title: "Perception-AI ",
    description: "Perception AI is an interactive web application that uses AI to process handwritten mathematical expressions. ✍️ Users can draw on a canvas, and the backend analyzes the image, solves the expression, and displays the result in real-time.",
    image: "https://images.unsplash.com/photo-1642790551116-18e150f248e3?auto=format&fit=crop&q=80&w=2940",
    github: "https://github.com/ranjan2829/Perception-AI-App",
    demo: "https://ai-illustration-sigma.vercel.app/",
    tech: ["Python","FastAPI","React", "TypeScript", "Vite"," Gemini AI", "gemini-1.5-flash", "Google AI Studio 🧠","Git", "GitHub"
      ],
    icon: Brain,
    color: "#00E7FF"
  },
  {
    title: "AI Search Engine",
    description: "Frontend built with Next.js (TypeScript) featuring server-side rendering and responsive UI components. Integrates with a FastAPI backend via REST APIs for AI-powered search results ranking and Google Trends data visualization, ensuring a seamless and interactive user experience.",
    image: "https://images.unsplash.com/photo-1642790595397-6850723e0642?auto=format&fit=crop&q=80&w=2940",
    github: "https://github.com/ranjan2829/quant-analytics",
    demo: "https://quant-analytics-demo.com",
    tech: ["React", "D3.js", "Python", "PostgreSQL"],
    icon: LineChart,
    color: "#FF5E5E"
  },
  {
    title: "ML Model Deployment Pipeline",
    description: "Automated pipeline for training and deploying machine learning models",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=2940",
    github: "https://github.com/ranjan2829/ml-pipeline",
    demo: "https://ml-pipeline-demo.com",
    tech: ["Docker", "Kubernetes", "MLflow", "Python"],
    icon: Code,
    color: "#4EFFB8"
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-black relative">
      {/* Terminal Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Terminal Header */}
        <motion.div 
          className="bg-gray-900 rounded-t-lg p-4 border border-gray-700 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-gray-400 font-mono">ranjan@portfolio:~/projects $</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 mb-6"
            >
              <span className="text-cyan-400 font-mono">ls -la ./projects</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-black/30 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm hover:border-cyan-500/40 transition-all group"
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
                  <p className="text-gray-400 mb-4 text-sm">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 rounded-md"
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
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
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
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
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