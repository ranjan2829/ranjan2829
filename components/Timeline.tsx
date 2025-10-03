"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Brain, LineChart, Award, GraduationCap, Pause, Play } from 'lucide-react';

const timelineData = [
  {
    title: "Software Engineer - 1",
    company: "Brain Labs",
    date: "September 2025 - Present",
    description: "Backend Engineering in Finance Quant trading platform",
    icon: Brain,
    skills: ["Python","Finance","Mathematics","AI"],
    color: "#7B61FF"
  },
  {
    title: "Associate SDE 1 AI/ML",
    company: "OneLab Ventures",
    date: "June 2025 - August 2025",
    description: "Backend Engineering & AI/ML initiatives, Working on Deep Learning Models",
    icon: Brain,
    skills: ["Python","Finance","Mathematics","AI","Deep Learning"],
    color: "#7B61FF"
  },
  {
    title: "Quantitative Engineer Intern",
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
    title: "Backend Engineer Intern",
    company: "Ventory Company",
    date: "June 2024 - August 2024",
    description: "Developed backend features and enhanced API functionality using Python for Ventory's platform.",
    icon: LineChart,
    skills: ["Python","AI","Node.js","Next.js","AWS"],
    color: "#FF5E5E"
  },
  {
    title: "Technical Head",
    company: "Computer Society of India",
    date: "2022 - 2023",
    description: "Led and managed various technical initiatives, workshops, and events within the Computer Society.",
    icon: Award,
    skills: ["Public Speaking","Team Management","Technical Skills"],
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
    skills: ["Public Speaking","Team Management","Technical Skills","Google Cloud", "Workshop Facilitation", "Cloud Computing"],
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1);

  useEffect(() => {
    if (!scrollRef.current || !isAutoScrolling || isHovering) return;

    const scrollContainer = scrollRef.current;
    let scrollInterval: ReturnType<typeof setInterval>;

    // Auto-scroll function
    const autoScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer) {
          const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
          const currentScroll = scrollContainer.scrollTop;
          
          // Update scroll progress
          const progress = (currentScroll / maxScroll) * 100;
          setScrollProgress(progress);
          
          // Calculate which timeline node is active based on scroll
          const nodeCount = timelineData.length;
          const activeIndex = Math.floor((progress / 100) * nodeCount);
          setActiveNodeIndex(activeIndex);

          // Scroll down slowly
          if (currentScroll < maxScroll) {
            scrollContainer.scrollTop += 1; // Slow scroll speed
          } else {
            // Reset to top smoothly when reaching bottom
            setTimeout(() => {
              scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
              setScrollProgress(0);
              setActiveNodeIndex(-1);
            }, 2000); // Pause at bottom for 2 seconds
          }
        }
      }, 50); // 50ms interval for smooth scrolling
    };

    autoScroll();

    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [isAutoScrolling, isHovering]);

  return (
    <section 
      id="experience" 
      className="w-full relative"
    >
      {/* Fixed Terminal Header */}
      <motion.div 
        className="sticky top-0 z-20 bg-gray-900 rounded-t-lg p-5 border border-gray-700 mb-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-gray-400 font-mono text-sm">ranjan@portfolio:~/experience $</span>
            </div>
            
            {/* Auto-scroll Toggle Button */}
            <motion.button
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition-all group ${
                isAutoScrolling 
                  ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/20' 
                  : 'bg-gray-800/50 border-gray-600 hover:border-cyan-500'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAutoScrolling ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Pause className="w-3 h-3 text-cyan-400" />
                  </motion.div>
                </>
              ) : (
                <Play className="w-3 h-3 text-cyan-400 group-hover:text-cyan-300" />
              )}
              <span className={`text-xs font-mono ${
                isAutoScrolling ? 'text-cyan-300' : 'text-gray-400 group-hover:text-cyan-400'
              }`}>
                {isAutoScrolling ? 'Auto' : 'Manual'}
              </span>
            </motion.button>
          </div>
        </motion.div>

      {/* Scrollable Container with Auto-scroll */}
      <div 
        className={`relative z-10 w-full max-h-[75vh] overflow-y-auto transition-all duration-300 border-x border-b border-gray-700 rounded-b-lg bg-black/50 ${
          isHovering && isAutoScrolling ? 'ring-2 ring-cyan-500/30' : ''
        }`}
        ref={scrollRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="p-4"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-3 mb-4"
            >
              <span className="text-cyan-400 font-mono text-sm">cat experience.log</span>
            </motion.div>
          </div>

          {/* Clean Container */}
          <div className="relative" ref={timelineRef}>

          <VerticalTimeline lineColor="rgba(0, 231, 255, 0.2)">
            {timelineData.map((item, index) => {
              const isActive = index === activeNodeIndex;
              return (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: isActive 
                    ? `1px solid ${item.color}60`
                    : '1px solid rgba(0, 231, 255, 0.1)',
                  boxShadow: '0 4px 20px rgba(0, 231, 255, 0.1)',
                  fontFamily: 'monospace',
                  transition: 'all 0.3s ease',
                }}
                contentArrowStyle={{
                  borderRight: '7px solid rgba(0, 231, 255, 0.1)',
                }}
                date={item.date}
                iconStyle={{
                  background: 'rgb(0, 0, 0)',
                  border: `2px solid ${item.color}`,
                  boxShadow: isActive 
                    ? `0 0 15px ${item.color}80`
                    : `0 0 8px ${item.color}40`,
                  transition: 'all 0.3s ease',
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
            );
            })}
          </VerticalTimeline>
          </div>
        </motion.div>
      </div>

      {/* Scroll Progress Indicator - Outside scrollable area */}
      {isAutoScrolling && (
        <motion.div 
          className="mt-4 bg-gray-900/50 rounded-full h-1.5 overflow-hidden backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-full shadow-lg shadow-cyan-500/50"
            style={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>
      )}

      {/* Hover Pause Hint */}
      {isAutoScrolling && !isHovering && (
        <motion.div
          className="mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-xs text-gray-500 font-mono">
            💡 Hover to pause • Click button to toggle
          </p>
        </motion.div>
      )}
    </section>
  );
};
export default Timeline;
