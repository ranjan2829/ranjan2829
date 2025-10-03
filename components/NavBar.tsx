"use client";

import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Moon, Sun } from 'lucide-react';

interface NavLink {
  title: string;
  path: string;
  isExternal?: boolean;
}

const navLinks: NavLink[] = [
  { title: "Home", path: "#home", isExternal: false },
  { title: "Experience", path: "#experience", isExternal: false },
  { title: "Projects", path: "#projects", isExternal: false },
  { title: "Resume", path: "#resume", isExternal: false },
  { title: "GitHub", path: "https://github.com/ranjan2829", isExternal: true },
  { title: "LinkedIn", path: "https://www.linkedin.com/in/ranjan-shitole-8b8484123/", isExternal: true }
];

export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [isDarkMode]);

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`z-50 fixed top-0 w-full flex justify-center font-mono ${
      isDarkMode ? 'text-white' : 'text-black'
    }`}>
      {/* Desktop Navigation */}
      <div className={`mt-2 backdrop-blur-md rounded-2xl hidden md:flex items-center justify-center p-2 max-w-[750px] mx-auto shadow-lg ${
        isDarkMode 
          ? 'border border-gray-700 bg-black/80' 
          : 'border border-gray-300 bg-white/90'
      }`}>
        <ul className="flex flex-row p-2 space-x-4 items-center">
          {navLinks.map((link, index) => (
            <li key={index}>
              {link.isExternal ? (
                <a 
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors duration-300 ease-in-out ${
                    isDarkMode 
                      ? 'text-white hover:text-gray-300' 
                      : 'text-black hover:text-gray-700'
                  }`}
                >
                  {link.title}
                </a>
              ) : (
                <a 
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.path, link.isExternal);
                  }}
                  className={`text-sm transition-colors duration-300 ease-in-out ${
                    activeSection === link.path.replace('#', '')
                      ? isDarkMode
                        ? 'text-white font-bold border-b-2 border-white'
                        : 'text-black font-bold border-b-2 border-black'
                      : isDarkMode
                        ? 'text-white hover:text-gray-300'
                        : 'text-black hover:text-gray-700'
                  }`}
                >
                  {link.title}
                </a>
              )}
            </li>
          ))}
          
          {/* Theme Toggle Button */}
          <li>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Toggle */}
      <div onClick={toggleNav} className={`md:hidden absolute top-4 right-4 border rounded-full z-50 p-2 ${
        isDarkMode
          ? 'text-white border-gray-700 bg-black/80'
          : 'text-black border-gray-300 bg-white/90'
      }`}>
        {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </div>

      {/* Theme Toggle - Mobile */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all duration-300 border ${
            isDarkMode
              ? 'bg-black/80 border-green-400/30 text-yellow-400'
              : 'bg-white/90 border-gray-300 text-gray-800'
          }`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {nav && (
        <div className={`md:hidden fixed top-0 left-0 w-full h-full flex items-center justify-center z-40 ${
          isDarkMode ? 'bg-black/90' : 'bg-white/95'
        }`}>
          <ul className="flex flex-col items-center space-y-4">
            {navLinks.map((link, index) => (
              <li key={index}>
                {link.isExternal ? (
                  <a 
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-lg transition-colors duration-300 ${
                      isDarkMode
                        ? 'text-white hover:text-gray-300'
                        : 'text-black hover:text-gray-700'
                    }`}
                    onClick={closeNav}
                  >
                    {link.title}
                  </a>
                ) : (
                  <a 
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.path, link.isExternal);
                    }}
                    className={`text-lg transition-colors duration-300 ${
                      activeSection === link.path.replace('#', '')
                        ? isDarkMode
                          ? 'text-white font-bold'
                          : 'text-black font-bold'
                        : isDarkMode
                          ? 'text-white hover:text-gray-300'
                          : 'text-black hover:text-gray-700'
                    }`}
                  >
                    {link.title}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
