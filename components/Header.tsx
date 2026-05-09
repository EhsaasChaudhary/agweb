"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function LightConnector() {
  return (
    <div className="relative w-20 h-12 flex items-center">
      {/* Main light strand */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center">
        {/* Outer glow */}
        <div className="absolute h-3 w-full bg-gradient-to-r from-amber-400/40 via-amber-300/20 to-amber-400/40 blur-md animate-pulse-glow" />
        
        {/* Middle glow */}
        <div className="absolute h-1.5 w-full bg-gradient-to-r from-amber-400/60 via-amber-300/30 to-amber-400/60 blur-sm" />
        
        {/* Core line */}
        <div className="absolute h-0.5 w-full bg-gradient-to-r from-amber-300/80 via-amber-200/50 to-amber-300/80" />
        
        {/* Traveling light pulse */}
        <div className="absolute h-2 w-8 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-sm animate-light-travel" />
      </div>
      
      {/* Left endpoint glow (touching nav bubble) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className="w-4 h-4 rounded-full bg-amber-400/60 blur-md animate-pulse-dot" />
        <div className="absolute inset-0 w-2 h-2 m-auto rounded-full bg-amber-300/90" />
      </div>
      
      {/* Right endpoint glow (touching toggle bubble) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
        <div className="w-4 h-4 rounded-full bg-amber-400/60 blur-md animate-pulse-dot-delayed" />
        <div className="absolute inset-0 w-2 h-2 m-auto rounded-full bg-amber-300/90" />
      </div>
    </div>
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
<div className="flex justify-end px-6 py-6">
        <nav className="flex items-center gap-0 pointer-events-auto">
          {/* Navigation bubble container with wobble effect */}
          <div
            className="relative flex items-center gap-2 p-3 rounded-full
              bg-background/30 backdrop-blur-2xl
              border border-foreground/10
              shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.05)]"

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

          {/* Light strand connecting bubbles */}
          <div className="relative flex items-center justify-center -mx-2 z-10">
            <LightConnector />
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
