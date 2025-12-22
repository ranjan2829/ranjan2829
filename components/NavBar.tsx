"use client";

import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Github, Linkedin } from 'lucide-react';

interface NavLink {
  title: string;
  path: string;
  isExternal?: boolean;
}

const navLinks: NavLink[] = [
  { title: "Home", path: "#home", isExternal: false },
  { title: "Projects", path: "#projects", isExternal: false },
  { title: "Resume", path: "#resume", isExternal: false },
];

export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "experience", "projects", "resume"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
  };

  const handleNavClick = (path: string, isExternal?: boolean) => {
    if (!isExternal) {
      const element = document.getElementById(path.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    closeNav();
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      {/* Desktop Navigation */}
      <div className="glass-panel px-1 p-1.5 rounded-full flex items-center gap-1 shadow-2xl shadow-black/50 hidden md:flex">
        {navLinks.map((link, index) => (
          <a
            key={index}
            href={link.path}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(link.path, link.isExternal);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors touch-manipulation ${
              activeSection === link.path.replace('#', '')
                ? 'text-white bg-white/10 font-bold'
                : 'text-muted hover:text-white hover:bg-white/5'
            }`}
          >
            {link.title}
          </a>
        ))}
        <div className="w-px h-4 bg-white/10 mx-1"></div>
        <a 
          href="https://github.com/ranjan2829"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-full text-muted hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
          aria-label="GitHub"
        >
          <Github className="w-[18px] h-[18px]" />
        </a>
        <a 
          href="https://www.linkedin.com/in/ranjan-shitole-8b8484123/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-full text-muted hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-[18px] h-[18px]" />
        </a>
      </div>

      {/* Mobile Menu Toggle */}
      <div onClick={toggleNav} className="md:hidden fixed top-3 right-3 glass-panel rounded-full z-50 p-3 touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center">
        {nav ? <AiOutlineClose size={24} className="text-terminal-text" /> : <AiOutlineMenu size={24} className="text-terminal-text" />}
      </div>

      {/* Mobile Navigation Menu */}
      {nav && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full flex items-center justify-center z-40 backdrop-blur-md bg-black/95">
          <button
            onClick={closeNav}
            className="absolute top-3 right-3 p-2 text-muted hover:text-white"
            aria-label="Close menu"
          >
            <AiOutlineClose size={24} />
          </button>
          <ul className="flex flex-col items-center space-y-6 px-4">
            {navLinks.map((link, index) => (
              <li key={index} className="w-full text-center">
                <a 
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.path, link.isExternal);
                  }}
                  className={`block text-xl sm:text-2xl py-3 transition-colors duration-300 touch-manipulation ${
                    activeSection === link.path.replace('#', '')
                      ? 'text-white font-bold'
                      : 'text-terminal-text hover:text-white'
                  }`}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
