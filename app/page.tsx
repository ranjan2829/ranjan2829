"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Bot, Brain, Cpu, LineChart } from "lucide-react";
import Hero from '@/components/Hero';
import { Navbar } from "@/components/NavBar";
import { Projects } from "@/components/Projects";
import dynamic from 'next/dynamic';


const Timeline = dynamic(() => import('../components/Timeline'), { ssr: false })
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Timeline />      
      <Projects />
    </>
  );
}