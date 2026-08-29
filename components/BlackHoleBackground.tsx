"use client";

import React, { useEffect, useRef, useState } from "react";
import { createRenderer } from "@/lib/optimized-black-hole/renderer";

/** Official vgpu optimized black hole. Hidden on small screens and reduced motion. */
export function BlackHoleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");
    const sync = () => setShow(!motion.matches && wide.matches);
    sync();
    motion.addEventListener("change", sync);
    wide.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      wide.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!show) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = createRenderer({ canvas });
    return () => {
      renderer.dispose();
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="blackhole-bg" aria-hidden>
      <canvas ref={canvasRef} className="blackhole-canvas" />
    </div>
  );
}
