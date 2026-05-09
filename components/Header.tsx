"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
];

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    if (isAnimating || !toggleRef.current) return;
    
    const targetTheme = isDark ? "light" : "dark";
    const rect = toggleRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    setIsAnimating(true);

    // Create the pattern overlay
    const overlay = document.createElement("div");
    overlay.className = "theme-pattern-overlay";
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
      overflow: hidden;
    `;

    // Create the expanding container with squares pattern
    const container = document.createElement("div");
    container.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      transform: translate(-50%, -50%);
    `;

    // Create multiple layers of inverted squares with inward curved sides
    const layers = 12;
    for (let i = 0; i < layers; i++) {
      const square = document.createElement("div");
      const size = 300 + i * 50;
      const delay = i * 0.03;
      const blur = Math.min(i * 0.8, 6);
      
      square.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        width: ${size}vmax;
        height: ${size}vmax;
        transform: translate(-50%, -50%) scale(0) rotate(${i * 5}deg);
        background: ${targetTheme === "dark" 
          ? "oklch(0.2730 0.0093 53.0916)" 
          : "oklch(0.9480 0.0094 99.9875)"};
        border-radius: 30% 30% 30% 30% / 30% 30% 30% 30%;
        filter: blur(${blur}px);
        opacity: ${1 - i * 0.06};
        animation: squareExpand 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s forwards;
      `;
      container.appendChild(square);
    }

    overlay.appendChild(container);
    document.body.appendChild(overlay);

    // Add the animation keyframes if not already present
    if (!document.getElementById("theme-square-animation")) {
      const style = document.createElement("style");
      style.id = "theme-square-animation";
      style.textContent = `
        @keyframes squareExpand {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(45deg);
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Change theme slightly before animation completes for seamless transition
    setTimeout(() => {
      setTheme(targetTheme);
    }, 150);

    // Clean up
    setTimeout(() => {
      overlay.remove();
      setIsAnimating(false);
    }, 700);
  };

  if (!mounted) {
    return (
      <div className="w-14 h-8 rounded-full bg-foreground/5 backdrop-blur-xl border border-foreground/10 animate-pulse" />
    );
  }

  return (
    <button
      ref={toggleRef}
      onClick={toggleTheme}
      disabled={isAnimating}
      className="relative w-14 h-8 rounded-full bg-muted/50 backdrop-blur-xl border border-foreground/10 transition-all duration-300 group overflow-hidden"
      aria-label="Toggle theme"
    >
      {/* Track background gradient */}
      <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
        isDark 
          ? "bg-gradient-to-r from-muted/30 via-primary/10 to-muted/30" 
          : "bg-gradient-to-r from-primary/10 via-accent/20 to-primary/10"
      }`} />

      {/* Toggle knob */}
      <div
        className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-500 ease-out flex items-center justify-center ${
          isDark 
            ? "left-7 bg-gradient-to-br from-card to-muted shadow-[0_2px_8px_rgba(0,0,0,0.3),0_0_12px_rgba(114,70,25,0.3)]" 
            : "left-1 bg-gradient-to-br from-primary to-secondary shadow-[0_2px_8px_rgba(0,0,0,0.15),0_0_12px_rgba(96,118,54,0.4)]"
        }`}
      >
        {/* Sun icon */}
        <svg
          className={`absolute w-3.5 h-3.5 transition-all duration-500 ${
            isDark
              ? "opacity-0 rotate-90 scale-50"
              : "opacity-100 rotate-0 scale-100 text-primary-foreground"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="4" />
          <path 
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round" 
          />
        </svg>

        {/* Moon icon */}
        <svg
          className={`absolute w-3 h-3 transition-all duration-500 ${
            isDark
              ? "opacity-100 rotate-0 scale-100 text-primary"
              : "opacity-0 -rotate-90 scale-50"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute -inset-1 rounded-full bg-primary/0 group-hover:bg-primary/10 blur-lg transition-all duration-300 -z-10" />
    </button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="flex justify-center px-6 py-4">
        <nav
          className={`flex items-center gap-1 p-2 rounded-full pointer-events-auto
            bg-background/60 backdrop-blur-2xl
            border border-foreground/10
            shadow-[0_4px_24px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.1)]
            transition-all duration-300 ${scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.12)]" : ""}`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-foreground/5 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AG</span>
            </div>
            <span className="font-bold text-foreground hidden sm:block">AGENCY</span>
          </Link>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-1 ml-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground rounded-full hover:bg-foreground/5 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <Link
            href="/contact"
            className="ml-2 px-5 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-full transition-all duration-200 shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
          >
            Contact
          </Link>

          {/* Theme Toggle */}
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
