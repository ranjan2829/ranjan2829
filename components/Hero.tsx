"use client"

import { useEffect, useState } from "react";
import Image from 'next/image';
import { animate, motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
const ROLES = ["Full Stack Developer", "ML Engineer"];

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const color = useMotionValue(COLORS_TOP[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror"
    });

    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);

    return () => clearInterval(roleInterval);
  }, []);

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com/ranjan2829" },
    { icon: FiLinkedin, href: "https://www.linkedin.com/in/ranjan-shitole-8b8484123/" },
    { icon: FiMail, href: "mailto:ranjan.shitole3129@gmail.com" }
  ];

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-gray-200"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center"
      >
        <h1 className="text-white/40 text-4xl md:text-7xl font-black mb-2 md:mb-4 bg-clip-text">
          Hi, I am
        </h1>
        
        <motion.h1
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text font-black leading-tight text-transparent text-5xl md:text-7xl mb-6 md:mb-8"
        >
          Ranjan Shitole
        </motion.h1>

        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative w-64 h-64 md:w-72 md:h-72 mb-6 md:mb-8"
        >
          <Image
            src="/profilepic.png"
            alt="profile"
            fill
            className="rounded-full object-cover shadow-2xl"
            priority
          />
        </motion.div>

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex bg-white/15 backdrop-blur-sm shadow-xl p-4 rounded-2xl justify-center items-center space-x-2 mb-6 md:mb-10"
        >
          <motion.p
            key={roleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="font-bold text-xl md:text-2xl"
          >
            {ROLES[roleIndex]}
          </motion.p>
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex bg-white/20 backdrop-blur-sm shadow-xl p-3 rounded-2xl justify-center items-center space-x-2 mb-8 md:mb-12"
        >
          <p className="font-bold text-base md:text-lg text-emerald-400">Open to Work!</p>
        </motion.div>

        <div className="flex gap-4 mb-8">
          {socialLinks.map(({ icon: Icon, href }) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
            >
              <Icon className="w-6 h-6" />
            </motion.a>
          ))}
        </div>

        <motion.a
          href="https://drive.google.com/file/d/1oktoQp8cD0MLua3V-abN0Pi_3LjzjD1k/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            style={{ border, boxShadow }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full px-6 py-3 text-base md:text-lg backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            View Resume <FiArrowRight className="ml-1" />
          </motion.button>
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
