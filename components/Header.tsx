"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef, useCallback } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
}

function ParticleStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();
  
  const streamWidth = 80;
  const streamHeight = 80;

  const createParticle = useCallback((): Particle => {
    return {
      x: 0,
      y: streamHeight / 2 + (Math.random() - 0.5) * 15,
      vx: 1.2 + Math.random() * 1.5,
      vy: (Math.random() - 0.5) * 0.5,
      life: 0,
      maxLife: 50 + Math.random() * 30,
      size: 1.5 + Math.random() * 2,
      opacity: 0.7 + Math.random() * 0.3,
    };
  }, [streamHeight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize particles spread across the stream
    for (let i = 0; i < 20; i++) {
      const p = createParticle();
      p.x = Math.random() * streamWidth;
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, streamWidth, streamHeight);

      const isDark = resolvedTheme === "dark";
      const baseColor = isDark ? [255, 180, 100] : [200, 150, 80];
      const glowColor = isDark ? [255, 210, 140] : [230, 180, 110];

      // Add new particles from left edge (nav bubble side)
      if (particlesRef.current.length < 25 && Math.random() > 0.6) {
        particlesRef.current.push(createParticle());
      }

      // Draw main energy stream line with glow
      const lineGradient = ctx.createLinearGradient(0, streamHeight / 2, streamWidth, streamHeight / 2);
      lineGradient.addColorStop(0, `rgba(${glowColor.join(",")}, 0.5)`);
      lineGradient.addColorStop(0.3, `rgba(${glowColor.join(",")}, 0.25)`);
      lineGradient.addColorStop(0.7, `rgba(${glowColor.join(",")}, 0.25)`);
      lineGradient.addColorStop(1, `rgba(${glowColor.join(",")}, 0.5)`);
      
      // Outer glow
      ctx.beginPath();
      ctx.moveTo(0, streamHeight / 2);
      ctx.lineTo(streamWidth, streamHeight / 2);
      ctx.strokeStyle = `rgba(${glowColor.join(",")}, 0.15)`;
      ctx.lineWidth = 12;
      ctx.stroke();
      
      // Middle glow
      ctx.beginPath();
      ctx.moveTo(0, streamHeight / 2);
      ctx.lineTo(streamWidth, streamHeight / 2);
      ctx.strokeStyle = `rgba(${glowColor.join(",")}, 0.25)`;
      ctx.lineWidth = 6;
      ctx.stroke();
      
      // Core line
      ctx.beginPath();
      ctx.moveTo(0, streamHeight / 2);
      ctx.lineTo(streamWidth, streamHeight / 2);
      ctx.strokeStyle = lineGradient;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw glowing endpoints where light touches bubbles
      // Left endpoint (touching nav bubble)
      const leftGlow = ctx.createRadialGradient(0, streamHeight / 2, 0, 0, streamHeight / 2, 15);
      leftGlow.addColorStop(0, `rgba(${glowColor.join(",")}, 0.9)`);
      leftGlow.addColorStop(0.3, `rgba(${glowColor.join(",")}, 0.5)`);
      leftGlow.addColorStop(1, `rgba(${glowColor.join(",")}, 0)`);
      ctx.beginPath();
      ctx.arc(0, streamHeight / 2, 15, 0, Math.PI * 2);
      ctx.fillStyle = leftGlow;
      ctx.fill();

      // Right endpoint (touching toggle bubble)
      const rightGlow = ctx.createRadialGradient(streamWidth, streamHeight / 2, 0, streamWidth, streamHeight / 2, 15);
      rightGlow.addColorStop(0, `rgba(${glowColor.join(",")}, 0.9)`);
      rightGlow.addColorStop(0.3, `rgba(${glowColor.join(",")}, 0.5)`);
      rightGlow.addColorStop(1, `rgba(${glowColor.join(",")}, 0)`);
      ctx.beginPath();
      ctx.arc(streamWidth, streamHeight / 2, 15, 0, Math.PI * 2);
      ctx.fillStyle = rightGlow;
      ctx.fill();

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += (Math.random() - 0.5) * 0.08;
        // Keep particles near center line
        p.vy += (streamHeight / 2 - p.y) * 0.02;
        p.life++;

        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(lifeRatio * 4, 1);
        const fadeOut = lifeRatio > 0.7 ? 1 - (lifeRatio - 0.7) / 0.3 : 1;
        const alpha = p.opacity * fadeIn * fadeOut;

        if (p.x > streamWidth || p.life > p.maxLife) return false;

        // Draw particle outer glow
        const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
        glowGradient.addColorStop(0, `rgba(${glowColor.join(",")}, ${alpha * 0.9})`);
        glowGradient.addColorStop(0.4, `rgba(${baseColor.join(",")}, ${alpha * 0.4})`);
        glowGradient.addColorStop(1, `rgba(${baseColor.join(",")}, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Draw bright particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      particlesRef.current = [];
    };
  }, [streamWidth, streamHeight, createParticle, resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      width={streamWidth}
      height={streamHeight}
      className="pointer-events-none"
      style={{ width: `${streamWidth}px`, height: `${streamHeight}px` }}
    />
  );
}

function NavBubble({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative px-4 py-2 rounded-full
        bg-foreground/5 backdrop-blur-xl
        border border-foreground/10
        shadow-[inset_1px_1px_2px_rgba(255,255,255,0.1),inset_-1px_-1px_2px_rgba(0,0,0,0.1)]
        hover:bg-foreground/10 hover:border-amber-500/30
        hover:shadow-[0_0_20px_rgba(251,191,36,0.3),inset_1px_1px_2px_rgba(255,255,255,0.15)]
        transition-all duration-300 ease-out
        hover:scale-105"
    >
      <span className="relative z-10 text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
        {label}
      </span>
    </Link>
  );
}

function ThemeToggleBubble() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  if (!mounted) {
    return (
      <div className="w-16 h-16 rounded-full bg-foreground/5 backdrop-blur-xl border border-foreground/10 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-16 rounded-full overflow-visible group"
      style={{ filter: "url(#bubble-wobble-toggle)" }}
      aria-label="Toggle theme"
    >
      {/* Iridescent bubble background */}
      <div className="absolute inset-0 rounded-full bg-foreground/5 backdrop-blur-xl border border-foreground/10 overflow-hidden">
        {/* Rainbow shimmer effect */}
        <div className="absolute inset-0 bg-gradient-conic from-pink-500/20 via-cyan-500/20 via-yellow-500/20 via-green-500/20 to-pink-500/20 animate-spin-slow opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      </div>

      {/* Inner glow */}
      <div
        className={`absolute inset-2 rounded-full transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-br from-amber-400/30 to-orange-500/40 shadow-[0_0_20px_rgba(251,191,36,0.6)]"
            : "bg-gradient-to-br from-amber-300/30 to-yellow-500/40 shadow-[0_0_20px_rgba(251,191,36,0.5)]"
        }`}
      />

      {/* Sun icon */}
      <svg
        className={`absolute inset-0 m-auto w-7 h-7 transition-all duration-500 ${
          isDark
            ? "opacity-0 rotate-90 scale-50"
            : "opacity-100 rotate-0 scale-100 text-amber-500 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
        }`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" 
          stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>

      {/* Moon icon */}
      <svg
        className={`absolute inset-0 m-auto w-6 h-6 transition-all duration-500 ${
          isDark
            ? "opacity-100 rotate-0 scale-100 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
            : "opacity-0 -rotate-90 scale-50"
        }`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>

      {/* Hover glow effect */}
      <div className="absolute -inset-2 rounded-full bg-amber-500/0 group-hover:bg-amber-500/20 blur-xl transition-all duration-300 -z-10" />
    </button>
  );
}

export default function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* SVG Filters for bubble wobble effect */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          {/* Filter for main navigation bubble */}
          <filter id="bubble-wobble-nav" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="3"
              result="noise"
              seed="1"
            >
              <animate
                attributeName="baseFrequency"
                values="0.015;0.025;0.015"
                dur="4s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                values="6;10;6"
                dur="3s"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>

          {/* Filter for toggle button bubble */}
          <filter id="bubble-wobble-toggle" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="2"
              result="noise"
              seed="5"
            >
              <animate
                attributeName="baseFrequency"
                values="0.02;0.035;0.02"
                dur="3s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                values="4;7;4"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      <div className="flex justify-end px-6 py-6">
        <nav className="flex items-center gap-0 pointer-events-auto">
          {/* Navigation bubble container with wobble effect */}
          <div
            className="relative flex items-center gap-2 p-3 rounded-full
              bg-background/30 backdrop-blur-2xl
              border border-foreground/10
              shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.05)]"
            style={{ filter: mounted ? "url(#bubble-wobble-nav)" : "none" }}
          >
            {/* Iridescent shimmer overlay */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-cyan-500/10 via-amber-500/10 to-pink-500/10 animate-shimmer" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
            </div>

            {navItems.map((item) => (
              <NavBubble key={item.href} href={item.href} label={item.label} />
            ))}
          </div>

          {/* Particle stream connecting bubbles - positioned between them */}
          <div className="relative flex items-center justify-center" style={{ marginLeft: '-10px', marginRight: '-10px', zIndex: 10 }}>
            <ParticleStream />
          </div>

          {/* Theme toggle bubble */}
          <div className="relative">
            <ThemeToggleBubble />
          </div>
        </nav>
      </div>
    </header>
  );
}
