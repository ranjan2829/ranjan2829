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
        {/* Background Grid */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${
          isDarkMode 
            ? 'bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]'
            : 'bg-[linear-gradient(to_right,#e0e0e0_1px,transparent_1px),linear-gradient(to_bottom,#e0e0e0_1px,transparent_1px)] bg-[size:4rem_4rem]'
        }`} />
        
        {/* Gradient Overlay for Sexy Effect */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5'
            : 'bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5'
        }`} />
        
        {/* Split Container - Equal Heights */}
        <div className="relative z-10 flex flex-col xl:flex-row" style={{ minHeight: 'calc(100vh - 7rem)' }}>
          {/* Left Side - Hero Terminal */}
          <div className="w-full xl:w-1/2 flex items-start justify-center p-4 xl:p-6 relative xl:max-h-screen xl:overflow-y-auto">
            <div className="w-full max-w-3xl">
              <Hero />
            </div>
            
            {/* Vertical Glowing Divider - Desktop Only */}
            <div className={`hidden xl:block absolute right-0 top-0 bottom-0 w-px transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent'
                : 'bg-gradient-to-b from-transparent via-blue-500/30 to-transparent'
            }`}>
              <div className={`absolute inset-0 blur-sm transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent'
                  : 'bg-gradient-to-b from-transparent via-blue-500/20 to-transparent'
              }`}></div>
            </div>
          </div>
          
          {/* Horizontal Glowing Divider - Mobile Only */}
          <div className={`xl:hidden w-full h-px relative transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent'
              : 'bg-gradient-to-r from-transparent via-blue-500/30 to-transparent'
          }`}>
            <div className={`absolute inset-0 blur-sm transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent'
                : 'bg-gradient-to-r from-transparent via-blue-500/20 to-transparent'
            }`}></div>
          </div>
          
          {/* Right Side - Timeline */}
          <div className="w-full xl:w-1/2 flex items-start justify-center p-4 xl:p-6 xl:max-h-screen xl:overflow-y-auto">
            <div className="w-full max-w-3xl">
              <Timeline />
            </div>
          </div>
        </div>
      </div>
      
      <SocialStats />
      
      <Projects />
      
    </>
  );
}
