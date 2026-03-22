"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { title: "Home", path: "#home" },
  { title: "Projects", path: "#projects" },
  { title: "Resume", path: "#resume" },
];

export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;

      const sections = ["home", "projects", "resume"];
      const scrollPosition = currentY + 200;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    const el = document.getElementById(path.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setNav(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Desktop nav — centered pill */}
      <div className="hidden md:flex justify-center pt-5">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto flex items-center gap-1 px-1.5 py-1.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? 'bg-background/80 backdrop-blur-xl border-card-border shadow-lg shadow-black/5 dark:shadow-black/20'
              : 'bg-background/50 backdrop-blur-md border-transparent'
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavClick(link.path)}
              className={`relative px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-200 ${
                activeSection === link.path.replace('#', '')
                  ? 'text-foreground'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {activeSection === link.path.replace('#', '') && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-foreground/[0.07] rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{link.title}</span>
            </button>
          ))}

          <div className="w-px h-4 bg-card-border mx-1" />

          <a
            href="https://github.com/ranjan2829"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full text-muted hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/ranjan-shitole-8b8484123/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full text-muted hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <div className="w-px h-4 bg-card-border mx-1" />

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full text-muted hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile toggle — auto-hides on scroll down */}
      <motion.button
        onClick={() => setNav(!nav)}
        initial={false}
        animate={{ y: hidden && !nav ? -80 : 0, opacity: hidden && !nav ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="md:hidden pointer-events-auto fixed top-4 right-4 p-2.5 rounded-full bg-background/90 backdrop-blur-xl border border-card-border shadow-md z-50"
        aria-label="Toggle menu"
      >
        {nav ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
      </motion.button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {nav && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pointer-events-auto fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex items-center justify-center"
          >
            <ul className="space-y-8 text-center">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className={`text-2xl font-display font-medium transition-colors ${
                      activeSection === link.path.replace('#', '')
                        ? 'text-foreground'
                        : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {link.title}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="pt-4 flex justify-center gap-4"
              >
                <a
                  href="https://github.com/ranjan2829"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-card border border-card-border text-muted hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-full bg-card border border-card-border text-muted hover:text-foreground transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
