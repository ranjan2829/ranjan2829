import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/ThemeProvider";

// One family for text and display, its mono for figures and labels.
const display = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const SITE = "https://ranjan2829.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Ranjan — AI Infrastructure & Full-Stack Engineer",
    template: "%s · Ranjan",
  },
  description:
    "Ranjan — AI Infrastructure Engineer building the systems that let AI agents act autonomously: Model Context Protocol, agent execution safety, and on-chain execution across fintech and crypto.",
  keywords: [
    "Ranjan",
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
  authors: [{ name: "Ranjan", url: SITE }],
  creator: "Ranjan",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE,
    siteName: "Ranjan",
    title: "Ranjan — AI Infrastructure & Full-Stack Engineer",
    description:
      "Building the infrastructure that lets AI agents act autonomously — tool protocols, execution safety, and the systems underneath.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ranjan — AI Infrastructure & Full-Stack Engineer",
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
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

// Default is dark, so the black hole reads as space. Light only if the visitor chose it.
const themeScript = `try{var t=localStorage.getItem('theme')==='light'?'light':'dark';var e=document.documentElement;e.classList.toggle('dark',t==='dark');e.style.colorScheme=t}catch(e){}`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ranjan",
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
    <html
      lang="en"
      className={`${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
