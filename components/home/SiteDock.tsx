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
import GlassSurface from "@/components/reactbits/GlassSurface";
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

/** Floating macOS-style dock on liquid glass: the site's only navigation. */
export function SiteDock() {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = !mounted || theme === "dark";

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-3 pointer-events-none"
    >
      <div className="pointer-events-auto relative rounded-2xl">
        {/* The glass sits behind the dock and tracks its size as icons magnify.
            Chromium bends the page through it; Safari and Firefox get frosted glass. */}
        <GlassSurface
          width="100%"
          height="100%"
          borderRadius={16}
          backgroundOpacity={isDark ? 0.4 : 0.5}
          displace={1.2}
          saturation={1.5}
          style={{ position: "absolute", inset: 0 }}
        />
      <Dock
        iconSize={40}
        iconMagnification={58}
        className="relative mt-0 h-[58px] border-transparent bg-transparent backdrop-blur-none"
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
      </div>
    </nav>
  );
}
