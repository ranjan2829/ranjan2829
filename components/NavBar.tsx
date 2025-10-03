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
  { title: "Stats", path: "#stats", isExternal: false },
  { title: "Projects", path: "#projects", isExternal: false },
  { title: "Blogs", path: "https://ranjan3129.notion.site/Trade-World-f497684f8eb24fa9882e22768e177376", isExternal: true },
  { title: "LinkedIn", path: "https://www.linkedin.com/in/ranjan-shitole-8b8484123/", isExternal: true }
];

export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "experience", "stats", "projects"];
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
      isDarkMode ? 'text-green-400' : 'text-gray-900'
    }`}>
      {/* Desktop Navigation */}
      <div className={`mt-2 backdrop-blur-md rounded-2xl hidden md:flex items-center justify-center p-2 max-w-[750px] mx-auto shadow-lg ${
        isDarkMode 
          ? 'border border-green-400/30 bg-black/80' 
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
                      ? 'text-cyan-400 hover:text-cyan-200' 
                      : 'text-blue-600 hover:text-blue-800'
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
                        ? 'text-cyan-200 font-bold border-b-2 border-cyan-400'
                        : 'text-blue-700 font-bold border-b-2 border-blue-600'
                      : isDarkMode
                        ? 'text-cyan-400 hover:text-cyan-200'
                        : 'text-blue-600 hover:text-blue-800'
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
          ? 'text-green-400/70 border-green-400/30 bg-black/80'
          : 'text-gray-700 border-gray-300 bg-white/90'
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
                        ? 'text-cyan-400 hover:text-cyan-200'
                        : 'text-blue-600 hover:text-blue-800'
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
                          ? 'text-cyan-200 font-bold'
                          : 'text-blue-700 font-bold'
                        : isDarkMode
                          ? 'text-cyan-400 hover:text-cyan-200'
                          : 'text-blue-600 hover:text-blue-800'
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
