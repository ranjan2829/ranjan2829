"use client";

import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

interface NavLink {
  title: string;
  path: string;
}

const navLinks: NavLink[] = [
  { title: "Finance Blogs", path: "https://ranjan3129.notion.site/Trade-World-f497684f8eb24fa9882e22768e177376" },
  { title: "LinkedIn", path: "https://www.linkedin.com/in/ranjan-shitole-8b8484123/" },
  { title: "GitHub", path: "https://github.com/ranjan2829" }
];

export const Navbar = () => {
  const [nav, setNav] = useState(false);

  const toggleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
  };

  return (
    <div className="z-20 fixed w-full flex justify-center text-green-400 font-mono">
      {/* Desktop Navigation */}
      <div className="border border-green-400/30 mt-2 backdrop-blur-md rounded-2xl hidden md:flex items-center justify-center p-2 max-w-[500px] mx-auto">
        <ul className="flex flex-row p-2 space-x-6">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a 
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-200 transition-colors duration-300 ease-in-out text-sm glow-text"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Toggle */}
      <div onClick={toggleNav} className="md:hidden absolute top-4 right-4 border rounded-full z-50 text-green-400/70 border-green-400/30 p-2 glow-text">
        {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </div>

      {/* Mobile Navigation Menu */}
      {nav && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-black/90 flex items-center justify-center z-40">
          <ul className="flex flex-col items-center space-y-4">
            {navLinks.map((link, index) => (
              <li key={index} onClick={closeNav}>
                <a 
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 text-lg hover:text-cyan-200 transition-colors duration-300 glow-text"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;