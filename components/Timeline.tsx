"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Briefcase, GraduationCap } from 'lucide-react';

const timelineData = [
  {
    title: "Software Engineer",
    company: "Tech Corp",
    date: "2023 - Present",
    description: "Led development of microservices architecture, improving system performance by 40%",
    type: "work"
  },
  {
    title: "ML Engineer Intern",
    company: "AI Solutions",
    date: "2022 - 2023",
    description: "Developed and deployed machine learning models for real-time data analysis",
    type: "work"
  },
  {
    title: "Bachelor's in Computer Science",
    company: "University of Technology",
    date: "2018 - 2022",
    description: "Graduated with honors, specialized in AI and Machine Learning",
    type: "education"
  }
];

export const Timeline = () => {
  return (
    <section className="py-20 px-4 bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto"
      >
        <h2 className="text-4xl font-bold text-center text-white mb-16">My Journey</h2>
        
        <VerticalTimeline>
          {timelineData.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid rgba(255, 255, 255, 0.1)' }}
              date={item.date}
              iconStyle={{ background: item.type === 'work' ? '#1E67C6' : '#13FFAA', color: '#fff' }}
              icon={item.type === 'work' ? <Briefcase /> : <GraduationCap />}
            >
              <h3 className="vertical-timeline-element-title font-bold text-xl">{item.title}</h3>
              <h4 className="vertical-timeline-element-subtitle text-gray-300 mt-2">{item.company}</h4>
              <p className="text-gray-400 mt-4">{item.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </motion.div>
    </section>
  );
};