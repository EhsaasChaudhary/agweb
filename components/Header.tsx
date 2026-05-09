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

function NavBubble({
  href,
  label,
  index,
}: {
  href: string;
  label: string;
  index: number;
}) {
  return (
    <Link
      href={href}
      className="group relative px-4 py-2 rounded-full
        bg-foreground/5 backdrop-blur-xl
        border border-foreground/10
        shadow-[inset_1px_1px_2px_rgba(255,255,255,0.1),inset_-1px_-1px_2px_rgba(0,0,0,0.1)]
        hover:bg-foreground/10 hover:border-glow/30
        hover:shadow-[0_0_20px_rgba(var(--glow),0.3),inset_1px_1px_2px_rgba(255,255,255,0.15)]
        transition-all duration-300 ease-out
        hover:scale-105"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <span className="relative z-10 text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
        {label}
      </span>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-glow/0 to-glow-secondary/0 group-hover:from-glow/10 group-hover:to-glow-secondary/10 transition-all duration-300" />
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
      <div className="w-14 h-14 rounded-full bg-foreground/5 backdrop-blur-xl border border-foreground/10 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-14 rounded-full
        bg-foreground/5 backdrop-blur-xl
        border border-foreground/10
        shadow-[inset_1px_1px_2px_rgba(255,255,255,0.1),inset_-1px_-1px_2px_rgba(0,0,0,0.1)]
        hover:bg-foreground/10 hover:border-glow/30
        hover:shadow-[0_0_25px_rgba(var(--glow),0.4)]
        transition-all duration-300 ease-out
        hover:scale-110
        group overflow-hidden"
      aria-label="Toggle theme"
    >
      {/* Glow effect behind icon */}
      <div
        className={`absolute inset-2 rounded-full transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-br from-glow/20 to-glow-secondary/30 shadow-[0_0_15px_rgba(var(--glow),0.5)]"
            : "bg-gradient-to-br from-amber-400/20 to-orange-500/30 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
        }`}
      />

      {/* Sun icon */}
      <svg
        className={`absolute inset-0 m-auto w-6 h-6 transition-all duration-500 ${
          isDark
            ? "opacity-0 rotate-90 scale-50"
            : "opacity-100 rotate-0 scale-100 text-amber-500"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>

      {/* Moon icon */}
      <svg
        className={`absolute inset-0 m-auto w-6 h-6 transition-all duration-500 ${
          isDark
            ? "opacity-100 rotate-0 scale-100 text-glow"
            : "opacity-0 -rotate-90 scale-50"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}

function LightStrand() {
  return (
    <div className="relative flex items-center">
      {/* Main strand line */}
      <div className="relative h-[2px] w-8 md:w-12 overflow-hidden">
        {/* Base strand with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-glow/60 via-glow-secondary/80 to-glow/60" />

        {/* Pulsing glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-glow via-glow-secondary to-glow animate-pulse-glow" />

        {/* Traveling light particle */}
        <div className="absolute top-0 h-full w-4 bg-gradient-to-r from-transparent via-white/90 to-transparent animate-light-travel" />
      </div>

      {/* Connection dots */}
      <div className="absolute -left-1 w-2 h-2 rounded-full bg-glow/80 shadow-[0_0_8px_rgba(var(--glow),0.8)] animate-pulse-dot" />
      <div className="absolute -right-1 w-2 h-2 rounded-full bg-glow-secondary/80 shadow-[0_0_8px_rgba(var(--glow-secondary),0.8)] animate-pulse-dot-delayed" />
    </div>
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
      <div className="container mx-auto px-4 py-6">
        <nav
          className={`flex items-center justify-center gap-4 md:gap-6 transition-all duration-500 ${
            scrolled ? "translate-y-1" : "translate-y-0"
          }`}
        >
          {/* Navigation bubbles container */}
          <div
            className={`flex items-center gap-2 md:gap-3 p-2 rounded-full pointer-events-auto
            bg-background/40 backdrop-blur-2xl
            border border-foreground/10
            shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]
            transition-all duration-500
            ${scrolled ? "shadow-[0_12px_40px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.15)]" : ""}`}
          >
            {navItems.map((item, index) => (
              <NavBubble
                key={item.href}
                href={item.href}
                label={item.label}
                index={index}
              />
            ))}
          </div>

          {/* Light strand connector */}
          <LightStrand />

          {/* Theme toggle bubble */}
          <div className="pointer-events-auto">
            <ThemeToggleBubble />
          </div>
        </nav>
      </div>

      {/* Ambient glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-gradient-to-b from-glow/5 to-transparent blur-3xl pointer-events-none" />
    </header>
  );
}
