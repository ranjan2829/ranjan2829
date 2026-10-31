/** Every project the site has shown. Order is the order they render. */
export interface Project {
  title: string;
  description: string;
  tech: string[];
  repo?: string;
  demo?: string;
  image: string;
  /** Shown above the title when the work was done for an employer. */
  role?: string;
}

export const projects: Project[] = [
  {
    title: "GigaBrain — Autonomous Trading Agents",
    description:
      "Multi-agent crypto trading system where LLM agents hold wallet keys and execute live perpetuals trades across Hyperliquid, Lighter (zkSync L2) and Polymarket. Built the 30-tool execution interface, the wallet layer, and the safety guardrails gating every order.",
    tech: ["Python", "agno", "AWS ECS", "EIP-712", "Privy", "x402"],
    // Source is private, so this points at the live product.
    demo: "https://gigabrain.gg",
    image: "/projects/gigabrain.png",
    role: "Professional work at Brain Labs",
  },
  {
    title: "HFT Exchange Engine",
    description:
      "High-frequency trading exchange engine in C++ with ultra-low-latency order matching, lock-free queues, memory pooling, and socket-based networking for real-time order flow.",
    tech: ["C++", "CMake", "Lock-free", "Sockets"],
    repo: "https://github.com/ranjan2829/High-Frequency-Trading-Exchange-Engine",
    image: "/projects/hft.png",
  },
  {
    title: "AI Calling Agent",
    description:
      "Production-grade AI calling agent built with FastAPI, React, Twilio, and AWS. Processes 320+ automated interviews at 98% accuracy with an async backend handling 70 concurrent calls.",
    tech: ["FastAPI", "React", "TypeScript", "Twilio", "AWS"],
    repo: "https://github.com/ranjan2829/AI-Calling-Agent",
    image: "/projects/calling-agent.png",
  },
  {
    title: "Hyperliquid RAG Agent",
    description:
      "AI-powered market intelligence agent for HyperLiquid using semantic search and real-time sentiment analysis across multi-source data. Built with FastAPI, Next.js, and GPT-4.",
    tech: ["FastAPI", "Next.js", "Turbopuffer", "GPT-4"],
    repo: "https://github.com/ranjan2829/HyperLiquid-Agent",
    demo: "https://hyper-liquid-agent.vercel.app/",
    image: "/projects/hyperliquid.png",
  },
  {
    title: "Perception-AI",
    description:
      "Transforms handwritten input on a dynamic drawing canvas into instant solutions using React, FastAPI, and Google Gemini, with LaTeX rendering via MathJax.",
    tech: ["React", "TypeScript", "FastAPI", "Gemini"],
    repo: "https://github.com/ranjan2829/Perception-AI-App",
    demo: "https://ai-illustration-sigma.vercel.app/",
    image: "/projects/perception.png",
  },
];
