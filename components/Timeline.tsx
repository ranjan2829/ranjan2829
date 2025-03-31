"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Brain, LineChart, Award, GraduationCap } from 'lucide-react';

const timelineData = [
  {
    title: "Backend & AI Engineer Intern",
    company: "Matic Algos",
    date: "March 2025 - Present",
    description: "Backend Engineering & AI/ML initiatives in algorithmic trading.Built India's Automated AlgoTrading Platform , Working with High speed Financial Datasets from the stock exchange, Built Financial Trading Machine learning based Models",
    icon: Brain,
    skills: ["Python", "AlgoTrading", "Quantitative Analysis","Finance","Mathematics"],
    color: "#FF5E5E"
  },
  {
    title: "Machine Learning Intern",
    company: "Photo Blitz Capital",
    date: "August - September 2024",
    description: "AI/ML initiatives in algorithmic trading. Built Financial Trading Machine learning based Models",
    icon: Brain,
    skills: ["TensorFlow", "PyTorch", "Quantitative Analysis","Finance","Mathematics"],
    color: "#00E7FF"
  },
  {
    title: " Backend Engineer Intern",
    company: "Ventory Company",
    date: "June 2024- August 2024",
    description: "Developed backend features and enhanced API functionality using Python for Ventory's platform.",
    icon: LineChart,
    skills: ["Python","AI","Node.js","Next.js","AWS"],
    color: "#FF5E5E"
  },
  {
    title: "Technical Head ",
    company: "Computer Society of India",
    date: "2022 - 2023",
    description: "Led and managed various technical initiatives, workshops, and events within the Computer Society.",
    icon: Award,
    skills: ["Pulic Speaking","Team management","Technical Skills"],
    color: "#4EFFB8"
  },
  {
    title: "ML Research Fellow",
    company: "AI Fellowship.ai",
    date: "November 2024 - December 2024",
    description: "Contributing to research projects in Artificial Intelligence and Open Source.",
    icon: Award,
    skills: ["Deep Learning", "Research", "Open Source", "AI Ethics"],
    color: "#4EFFB8"
  },
  {
    title: "Google Cloud Facilitator",
    company: "Google Developer Student Club",
    date: "October - November 2023",
    description: "Facilitated workshops and training sessions on Google Cloud technologies for university students",
    icon: GraduationCap,
    skills: ["Pulic Speaking","Team management","Technical Skills","Google Cloud", "Workshop Facilitation", "Cloud Computing"],
    color: "#7B61FF"
  },
  
  {
    title: "Engineering in Artificial Intelligence",
    company: "Pune University",
    date: "2021 - 2025",
    description: "Specialized in AI and financial computing. Current CGPA 8.5.",
    icon: GraduationCap,
    skills: ["Machine Learning", "Financial Computing", "Data Engineering","Full Stack Development"],
    color: "#7B61FF"
  }
];

export const Timeline = () => {
  return (
    <section className="py-10 bg-black relative">
      {/* Terminal Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Terminal Header */}
        <motion.div 
          className="bg-gray-900 rounded-t-lg p-5 border border-gray-700 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-gray-400 font-mono">ranjan@portfolio:~/experience $</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 mb-6"
            >
              <span className="text-cyan-400 font-mono">cat experience.log</span>
            </motion.div>
          </div>

          <VerticalTimeline lineColor="rgba(0, 231, 255, 0.2)">
            {timelineData.map((item, index) => (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 231, 255, 0.1)',
                  boxShadow: '0 4px 20px rgba(0, 231, 255, 0.1)',
                  fontFamily: 'monospace',
                }}
                contentArrowStyle={{
                  borderRight: '7px solid rgba(0, 231, 255, 0.1)',
                }}
                date={item.date}
                iconStyle={{
                  background: 'rgb(0, 0, 0)',
                  border: `2px solid ${item.color}`,
                  boxShadow: `0 0 20px ${item.color}40`,
                }}
                icon={<item.icon className="w-5 h-5" style={{ color: item.color }} />}
              >
                <div className="font-mono">
                  <h3 className="text-xl font-bold" style={{ color: item.color }}>
                    {`> ${item.title}`}
                  </h3>
                  <h4 className="text-gray-300 mt-2">
                    {`@ ${item.company}`}
                  </h4>
                  <p className="text-gray-400 mt-4 text-sm">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 text-sm bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </motion.div>
      </div>
    </section>
  );
};
export default Timeline;