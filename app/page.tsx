"use client";
import React, { useState, useEffect } from "react";

import Hero from '@/components/Hero';
import { Navbar } from "@/components/NavBar";
import { Projects } from "@/components/Projects";
import { SocialStats } from "@/components/SocialStats";
import dynamic from 'next/dynamic';


const Timeline = dynamic(() => import('../components/Timeline'), { ssr: false })
export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Listen for theme changes
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
    <>
    <Navbar />
      
      {/* Split Screen Layout - Hero & Timeline Side by Side */}
      <div id="home" className={`min-h-screen relative overflow-hidden pt-16 transition-colors duration-300 ${
        isDarkMode ? 'bg-black' : 'bg-gray-50'
      }`}>
        
        {/* Split Container - Equal Heights */}
        <div className="relative z-10 flex flex-col xl:flex-row xl:min-h-[calc(100vh-4rem)]">
          {/* Left Side - Hero Terminal */}
          <div className="w-full xl:w-1/2 flex items-start justify-center p-4 xl:p-6 relative xl:h-[calc(100vh-4rem)] xl:overflow-y-auto">
            <div className="w-full max-w-3xl">
              <Hero />
            </div>
            
            {/* Vertical Divider - Desktop Only */}
            <div className={`hidden xl:block absolute right-0 top-0 bottom-0 w-px transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-300'
            }`}></div>
          </div>
          
          {/* Horizontal Divider - Mobile Only */}
          <div className={`xl:hidden w-full h-px transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-300'
          }`}></div>
          
          {/* Right Side - Timeline */}
          <div className="w-full xl:w-1/2 flex items-start justify-center p-4 xl:p-6 xl:h-[calc(100vh-4rem)] xl:overflow-y-auto">
            <div className="w-full max-w-3xl h-full">
              <Timeline />
            </div>
          </div>
        </div>
      </div>
      
      <SocialStats />
      
      <Projects />
      
      {/* Resume Section */}
      <section id="resume" className={`py-4 relative transition-colors duration-300 ${
        isDarkMode ? 'bg-black' : 'bg-gray-50'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          {/* Terminal Header */}
          <div className={`rounded-t-lg p-3 border mb-2 transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-700' 
              : 'bg-white border-gray-300'
          }`}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className={`ml-4 font-mono text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-700'
              }`}>ranjan@portfolio:~/resume $</span>
            </div>
          </div>

          <div className={`font-mono text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            <span className="text-yellow-400">$</span> cat resume.pdf
          </div>

          <div className="w-full h-[800px] border rounded-lg overflow-hidden bg-white shadow-2xl">
            <iframe 
              src="https://docs.google.com/document/d/e/2PACX-1vSvvvECzbOOj3GLUDWjrtAnnVRVJUSwVm1roddgRI3gvOqZUSSMUuyNmpD6nhEPOeVkXfRE7NmD2hUu/pub?embedded=true"
              className="w-full h-full"
              title="Resume"
            />
          </div>
        </div>
      </section>
      
    </>
  );
}
