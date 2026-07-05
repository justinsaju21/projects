"use client";

import { useEffect, useRef } from "react";

export function DataGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    };

    // Initialize to center
    container.style.setProperty("--mouse-x", `${window.innerWidth / 2}px`);
    container.style.setProperty("--mouse-y", `${window.innerHeight / 2}px`);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), black 0%, rgba(0,0,0,0.15) 500px, rgba(0,0,0,0.15) 100%)',
          WebkitMaskImage: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), black 0%, rgba(0,0,0,0.15) 500px, rgba(0,0,0,0.15) 100%)',
        }}
      />
    </div>
  );
}
