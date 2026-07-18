"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { site } from "@/lib/site";

const navLinks = [
  { title: "Home", id: "home" },
  { title: "Stats", id: "stats" },
  { title: "Projects", id: "projects" },
  { title: "Resume", id: "resume" },
];

export const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme, mounted } = useTheme();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Scroll direction + elevation. rAF-throttled: the original ran on every
  // scroll event and read offsetTop/offsetHeight per section, forcing a
  // layout recalc each frame.
  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastScrollY.current && y > 80);
      lastScrollY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy via IntersectionObserver rather than per-frame offset math.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Escape closes the mobile menu, and the page behind it shouldn't scroll.
  useEffect(() => {
    if (!navOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [navOpen]);

  const handleNavClick = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  }, []);

  // Rendered only after hydration — the server can't know the stored theme,
  // so committing to an icon during SSR guarantees a mismatch.
  const themeIcon = !mounted ? null : theme === "dark" ? <Sun /> : <Moon />;

  return (
    <nav aria-label="Main" className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Desktop — centered pill */}
      <div className="hidden md:flex justify-center pt-5">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto flex items-center gap-1 px-1.5 py-1.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-background/80 backdrop-blur-xl border-card-border shadow-lg shadow-black/5 dark:shadow-black/30"
              : "bg-background/50 backdrop-blur-md border-transparent"
          }`}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                aria-current={isActive ? "true" : undefined}
                className={`relative px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-200 ${
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 bg-foreground/[0.07] rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.title}</span>
              </button>
            );
          })}

          <div className="w-px h-4 bg-card-border mx-1" aria-hidden />

          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full text-muted hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" aria-hidden />
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full text-muted hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" aria-hidden />
          </a>

          <div className="w-px h-4 bg-card-border mx-1" aria-hidden />

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full text-muted hover:text-foreground transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            <span className="block w-4 h-4 [&>svg]:w-4 [&>svg]:h-4">{themeIcon}</span>
          </button>
        </motion.div>
      </div>

      {/* Mobile toggle — auto-hides on scroll down */}
      <motion.button
        onClick={() => setNavOpen((open) => !open)}
        initial={false}
        animate={{ y: hidden && !navOpen ? -80 : 0, opacity: hidden && !navOpen ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="md:hidden pointer-events-auto fixed top-4 right-4 p-2.5 rounded-full bg-background/90 backdrop-blur-xl border border-card-border shadow-md z-50"
        aria-label={navOpen ? "Close menu" : "Open menu"}
        aria-expanded={navOpen}
        aria-controls="mobile-menu"
      >
        {navOpen ? (
          <X className="w-5 h-5 text-foreground" aria-hidden />
        ) : (
          <Menu className="w-5 h-5 text-foreground" aria-hidden />
        )}
      </motion.button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pointer-events-auto fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex items-center justify-center"
          >
            <ul className="space-y-8 text-center list-none p-0">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => handleNavClick(link.id)}
                    aria-current={activeSection === link.id ? "true" : undefined}
                    className={`text-2xl font-display font-medium transition-colors ${
                      activeSection === link.id
                        ? "text-foreground"
                        : "text-muted hover:text-foreground"
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
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-card border border-card-border text-muted hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" aria-hidden />
                </a>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-card border border-card-border text-muted hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" aria-hidden />
                </a>
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-full bg-card border border-card-border text-muted hover:text-foreground transition-colors"
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                >
                  <span className="block w-5 h-5 [&>svg]:w-5 [&>svg]:h-5">{themeIcon}</span>
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
