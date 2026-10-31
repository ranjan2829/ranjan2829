"use client";

import React from "react";
import {
  BarChart3,
  Briefcase,
  Code2,
  FileText,
  Github,
  Layers,
  LayoutGrid,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Twitter,
} from "lucide-react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { useTheme } from "@/components/ThemeProvider";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#work", label: "Work", icon: LayoutGrid },
  { href: "#stats", label: "Stats", icon: BarChart3 },
  { href: "#stack", label: "Stack", icon: Layers },
  { href: "#resume", label: "Resume", icon: FileText },
  { href: site.socials.github, label: "GitHub", icon: Github, external: true },
  { href: site.socials.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
  { href: site.socials.leetcode, label: "LeetCode", icon: Code2, external: true },
  { href: site.socials.twitter, label: "X", icon: Twitter, external: true },
  { href: `mailto:${site.email}`, label: "Email", icon: Mail },
];

const iconButton =
  "flex size-full items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/10 hover:text-foreground";

/** Floating macOS-style dock: the site's only navigation. */
export function SiteDock() {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = !mounted || theme === "dark";

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-3 pointer-events-none"
    >
      <Dock
        iconSize={40}
        iconMagnification={58}
        className="pointer-events-auto mt-0 h-[58px] border-card-border bg-background/70 backdrop-blur-xl"
      >
        {links.map(({ href, label, icon: Icon, external }) => (
          <DockIcon key={label} className={cn(external && "hidden sm:flex")}>
            <a
              href={href}
              aria-label={label}
              title={label}
              className={iconButton}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
            </a>
          </DockIcon>
        ))}
        <span aria-hidden className="h-8 w-px self-center bg-card-border" />
        <DockIcon>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title="Theme"
            className={iconButton}
          >
            {isDark ? (
              <Sun className="size-[18px]" strokeWidth={1.75} aria-hidden />
            ) : (
              <Moon className="size-[18px]" strokeWidth={1.75} aria-hidden />
            )}
          </button>
        </DockIcon>
      </Dock>
    </nav>
  );
}
