"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useMotionTemplate, MotionValue } from "framer-motion";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiCode } from "react-icons/fi";

// Enhanced color palette for better lighting
const COLORS_TOP: string[] = ["#00E7FF", "#FF5E5E", "#4EFFB8", "#7B61FF"];
const ROLES: string[] = ["AI Engineer", "Machine Learning Specialist", "Software Developer"];

interface SocialLink {
  icon: React.ElementType;
  href: string;
}

export const Hero = (): JSX.Element => {
  const [roleIndex, setRoleIndex] = useState<number>(0);
  const color: MotionValue<string> = useMotionValue(COLORS_TOP[0]);
  const glow: MotionValue<number> = useMotionValue(0.4);

  // Enhanced background with dynamic lighting and tech overlay
  const backgroundImage = useMotionTemplate`
    radial-gradient(
      circle 800px at 50% 10%,
      rgba(0, 231, 255, ${glow}),
      rgba(0, 0, 0, 0.95) 60%
    ),
    linear-gradient(
      135deg,
      rgba(${color}, 0.15),
      rgba(0, 0, 0, 0.9) 50%,
      rgba(${color}, 0.1)
    )
  `;
  const border = useMotionTemplate`2px solid ${color}`;
  const boxShadow = useMotionTemplate`0 8px 32px rgba(${color}, 0.3)`;

  useEffect(() => {
    const colorAnimation = animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 6,
      repeat: Infinity,
      repeatType: "mirror" as const,
    });

    const glowAnimation = animate(glow, [0.4, 0.8, 0.4], {
      ease: "easeInOut",
      duration: 4,
      repeat: Infinity,
      repeatType: "mirror" as const,
    });

    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2500);

    return () => {
      colorAnimation.stop();
      glowAnimation.stop();
      clearInterval(roleInterval);
    };
  }, [color, glow]);

  const socialLinks: SocialLink[] = [
    { icon: FiGithub, href: "https://github.com/ranjan2829" },
    { icon: FiLinkedin, href: "https://www.linkedin.com/in/ranjan-shitole-8b8484123/" },
    { icon: FiMail, href: "mailto:ranjan.shitole3129@gmail.com" },
    { icon: FiCode, href: "https://your-portfolio.com" },
  ];

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-gray-200 bg-black"
    >
      {/* Enhanced tech overlay with subtle grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTYwIDBIMHY2MGg2MFYwem0tMiAxSDB2NTdoNTdWMXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwRTdGRiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-10" />

      {/* Dynamic light particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full blur-sm"
          initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
          animate={{
            y: [0, -Math.random() * 1000],
            opacity: [0, 0.6, 0],
            scale: [1, 1.5, 0.5],
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeOut",
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 flex flex-col items-center relative"
      >
        {/* Glowing header */}
        <motion.h1
          className="text-3xl md:text-5xl font-mono mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
          animate={{ textShadow: [`0 0 10px ${color}`, `0 0 20px ${color}`, `0 0 10px ${color}`] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          [AI Systems Architect]
        </motion.h1>

        {/* Name with subtle glow */}
        <motion.h1
          className="max-w-4xl text-5xl md:text-8xl font-extrabold mb-8 text-white relative"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
          style={{ textShadow: `0 0 15px rgba(${color}, 0.3)` }}
        >
          Ranjan Shitole
        </motion.h1>

        {/* Profile image with enhanced lighting */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-64 h-64 md:w-80 md:h-80 mb-10"
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ boxShadow }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <Image
            src="/profilepic.png"
            alt="Ranjan Shitole - AI Engineer"
            fill
            className="rounded-full object-cover shadow-2xl"
            priority
          />
        </motion.div>

        {/* Role display with tech glow */}
        <motion.div
          className="bg-black/40 backdrop-blur-lg px-6 py-3 rounded-xl mb-8 border"
          style={{ border, boxShadow }}
        >
          <motion.p
            key={roleIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="font-mono text-xl md:text-2xl text-white"
          >
            {"> " + ROLES[roleIndex]}
          </motion.p>
        </motion.div>

        {/* Social links with hover glow */}
        <div className="flex gap-6 mb-10">
          {socialLinks.map(({ icon: Icon, href }) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, boxShadow: `0 0 15px ${color}` }}
              whileTap={{ scale: 0.95 }}
              className="bg-black/30 p-3 rounded-full transition-colors border border-transparent"
              style={{ border }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.a>
          ))}
        </div>

        {/* Resume button with enhanced glow */}
        <motion.a
          href="https://drive.google.com/file/d/1oktoQp8cD0MLua3V-abN0Pi_3LjzjD1k/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            style={{ border, boxShadow }}
            whileHover={{ scale: 1.05, boxShadow: `0 12px 48px rgba(${color}, 0.5)` }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-black/40 rounded-full font-mono text-lg text-white backdrop-blur-lg transition-colors"
          >
            <span>Access Resume</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

export default Hero;