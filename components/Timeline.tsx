import React from 'react';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Briefcase, GraduationCap, Terminal, Code2, Binary } from 'lucide-react';

const timelineData = [
  {
    title: "Software Engineer",
    company: "Tech Corp",
    date: "2023 - Present",
    description: "Led development of microservices architecture, improving system performance by 40%",
    type: "work",
    tech: ["Python", "TensorFlow", "Docker"],
    icon: Code2
  },
  {
    title: "ML Engineer Intern",
    company: "AI Solutions",
    date: "2022 - 2023",
    description: "Developed and deployed machine learning models for real-time data analysis",
    type: "work",
    tech: ["PyTorch", "AWS", "Kubernetes"],
    icon: Binary
  },
  {
    title: "Bachelor's in Computer Science",
    company: "University of Technology",
    date: "2018 - 2022",
    description: "Graduated with honors, specialized in AI and Machine Learning",
    type: "education",
    tech: ["Machine Learning", "Data Structures", "Algorithms"],
    icon: Terminal
  }
];

export const Timeline = () => {
  return (
    <section className="py-20 px-4 bg-[#011627] relative overflow-hidden">
      {/* Enhanced grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d2634_1px,transparent_1px),linear-gradient(to_bottom,#1d2634_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d263420_1px,transparent_1px),linear-gradient(to_bottom,#1d263420_1px,transparent_1px)] bg-[size:1rem_1rem]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto relative z-10"
      >
        <div className="mb-16">
          <div className="text-[#4FF2F8] font-mono mb-2 flex items-center gap-2">
            <span className="text-[#4FF2F8]/50">$</span> ./view-timeline.sh
          </div>
          <h2 className="text-4xl font-bold text-white glow-text">My Journey</h2>
        </div>
        
        <VerticalTimeline lineColor="#1d2634">
          {timelineData.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: '#1d2634',
                color: '#fff',
                boxShadow: 'none',
                border: '1px solid #2d3644',
                borderRadius: '0.5rem',
                padding: '2rem',
                backdropFilter: 'blur(10px)'
              }}
              contentArrowStyle={{ borderRight: '7px solid #1d2634' }}
              date={item.date}
              iconStyle={{
                background: '#011627',
                color: '#4FF2F8',
                boxShadow: '0 0 0 4px #2d3644, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)',
              }}
              icon={<item.icon className="w-5 h-5" />}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="font-mono text-[#4FF2F8] mb-1 flex items-center gap-2">
                  <span className="text-[#4FF2F8]/50">{'>'}</span>
                  {item.type === 'work' ? 'work.exe' : 'education.exe'}
                </div>
                <h3 className="vertical-timeline-element-title text-xl font-bold mb-1 text-white">
                  {item.title}
                </h3>
                <h4 className="vertical-timeline-element-subtitle text-[#4FF2F8]">
                  {item.company}
                </h4>
                <p className="text-gray-300 mt-4">{item.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {item.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-[#011627] rounded text-sm font-mono text-[#4FF2F8] border border-[#2d3644]/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </motion.div>
    </section>
  );
};
export default Timeline;