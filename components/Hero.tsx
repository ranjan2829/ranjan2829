"use client"
import { useEffect } from "react";
import Image from 'next/image';
import { animate, motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { FiArrowRight } from "react-icons/fi";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "DD335C"];

export const Hero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror"
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-gray-200"
    >
      <div className="z-10 flex flex-col items-center">
        {/* Made text responsive with different sizes for mobile/desktop */}
        <h1 className="text-white/40 text-4xl md:text-7xl font-black mb-2 md:mb-4">
          Hi, I am 
        </h1>
        {/* Increased mobile text size and adjusted spacing */}
        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text font-black leading-tight text-transparent text-5xl md:text-7xl mb-6 md:mb-8">
          Ranjan Shitole
        </h1>
        <Image 
          src="/profilepic.png"
          alt="profile"
          width={250}
          height={250}
          className="mb-6 md:mb-8"
        />
        {/* Made job title responsive */}
        <div className="flex bg-white/15 shadow-xl p-3 rounded-2xl justify-center items-center space-x-2 mb-6 md:mb-10">
          <p className="font-bold text-xl md:text-2xl">Full Stack + ML Developer</p>
        </div>
        {/* Adjusted "Open to Work" text size */}
        <div className="flex bg-white/20 shadow-xl p-2 rounded-2xl justify-center items-center space-x-2 mb-6 md:mb-10">
          <p className="font-bold text-base md:text-lg">Open to Work!</p>
        </div>
        
        <a
          href="https://drive.google.com/file/d/1oktoQp8cD0MLua3V-abN0Pi_3LjzjD1k/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            style={{
              border,
              boxShadow
            }}
            whileHover={{
              scale: 1.015
            }}
            whileTap={{
              scale: 0.985
            }}
            className="flex w-fit items-center gap-2 rounded-full px-4 py-2 text-base md:text-lg"
          >
            View Resume <FiArrowRight className=""/>
          </motion.button>
        </a>
      </div>
    </motion.section>
  );
}
