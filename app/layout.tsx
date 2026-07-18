import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/ThemeProvider";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE = "https://ranjan2829.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Ranjan Shitole — AI Infrastructure & Full-Stack Engineer",
    template: "%s · Ranjan Shitole",
  },
  description:
    "Ranjan Shitole — AI Infrastructure Engineer building the systems that let AI agents act autonomously: Model Context Protocol, agent execution safety, and on-chain execution across fintech and crypto.",
  keywords: [
    "Ranjan Shitole",
    "AI Infrastructure Engineer",
    "Model Context Protocol",
    "MCP",
    "AI agents",
    "LLM orchestration",
    "Agent execution safety",
    "Web3",
    "Full-Stack Engineer",
    "Next.js",
    "FastAPI",
    "NestJS",
  ],
  authors: [{ name: "Ranjan Shitole", url: SITE }],
  creator: "Ranjan Shitole",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE,
    siteName: "Ranjan Shitole",
    title: "Ranjan Shitole — AI Infrastructure & Full-Stack Engineer",
    description:
      "Building the infrastructure that lets AI agents act autonomously — tool protocols, execution safety, and the systems underneath.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ranjan Shitole — AI Infrastructure & Full-Stack Engineer",
    description:
      "Building the infrastructure that lets AI agents act autonomously — tool protocols, execution safety, and the systems underneath.",
    creator: "@manofsteel3129",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

// Runs before first paint so the correct theme class is on <html> already —
// without this, dark-mode visitors get a white flash on every load.
const themeScript = `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var e=document.documentElement;e.classList.toggle('dark',t==='dark');e.style.colorScheme=t}catch(e){}`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ranjan Shitole",
  url: SITE,
  jobTitle: "AI Infrastructure Engineer",
  email: "mailto:ranjan.shitole3129@gmail.com",
  sameAs: [
    "https://github.com/ranjan2829",
    "https://www.linkedin.com/in/ranjan2829/",
    "https://leetcode.com/u/ranjanshitole/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className={`${display.variable} ${mono.variable} antialiased`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
