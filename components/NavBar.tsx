"use client";
import Link from 'next/link';
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
        <div className="z-20 fixed flex justify-center w-full text-white font-bold">
            
            <div className="border border-white/50 mt-1 backdrop-blur-2xl rounded-3xl hidden md:flex items-center justify-center p-2 max-w-[500px] mx-auto">
                <ul className="flex flex-row p-3 space-x-10">
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <a 
                                href={link.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transform hover:text-white/50 transition-all duration-300 ease-in-out"
                            >
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            
            <div onClick={toggleNav} className="md:hidden absolute top-5 right-5 border rounded z-50 text-white/70 border-white/70 p-2">
                {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
            </div>

            {/* Mobile Navigation Menu */}
            {nav && (
                <div className="md:hidden fixed top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center z-40">
                    <ul className="flex flex-col items-center space-y-6">
                        {navLinks.map((link, index) => (
                            <li key={index} onClick={closeNav}>
                                <a 
                                    href={link.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white text-2xl hover:text-white/70 transition duration-300"
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