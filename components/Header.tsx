"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
];

function LightConnector() {
  return (
    <div className="relative w-16 h-8 flex items-center">
      <div className="absolute inset-y-0 left-0 right-0 flex items-center">
        <div className="absolute h-2 w-full bg-gradient-to-r from-orange-400/40 via-orange-300/20 to-orange-400/40 blur-md animate-pulse-glow" />
        <div className="absolute h-1 w-full bg-gradient-to-r from-orange-400/60 via-orange-300/30 to-orange-400/60 blur-sm" />
        <div className="absolute h-0.5 w-full bg-gradient-to-r from-orange-300/80 via-orange-200/50 to-orange-300/80" />
        <div className="absolute h-1.5 w-6 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-sm animate-light-travel" />
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className="w-3 h-3 rounded-full bg-orange-400/60 blur-md animate-pulse-dot" />
        <div className="absolute inset-0 w-1.5 h-1.5 m-auto rounded-full bg-orange-300/90" />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
        <div className="w-3 h-3 rounded-full bg-orange-400/60 blur-md animate-pulse-dot-delayed" />
        <div className="absolute inset-0 w-1.5 h-1.5 m-auto rounded-full bg-orange-300/90" />
      </div>
    </div>
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
      <div className="w-10 h-10 rounded-full bg-foreground/5 backdrop-blur-xl border border-foreground/10 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full overflow-visible group"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 rounded-full bg-foreground/5 backdrop-blur-xl border border-foreground/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-amber-500/20 to-orange-500/20 animate-spin-slow opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      </div>

      <div
        className={`absolute inset-1.5 rounded-full transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-br from-orange-400/30 to-amber-500/40 shadow-[0_0_15px_rgba(251,146,60,0.6)]"
            : "bg-gradient-to-br from-orange-300/30 to-amber-400/40 shadow-[0_0_15px_rgba(251,146,60,0.5)]"
        }`}
      />

      <svg
        className={`absolute inset-0 m-auto w-5 h-5 transition-all duration-500 ${
          isDark
            ? "opacity-0 rotate-90 scale-50"
            : "opacity-100 rotate-0 scale-100 text-orange-500 drop-shadow-[0_0_6px_rgba(251,146,60,0.8)]"
        }`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" 
          stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>

      <svg
        className={`absolute inset-0 m-auto w-4 h-4 transition-all duration-500 ${
          isDark
            ? "opacity-100 rotate-0 scale-100 text-orange-300 drop-shadow-[0_0_6px_rgba(251,146,60,0.8)]"
            : "opacity-0 -rotate-90 scale-50"
        }`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>

      <div className="absolute -inset-1 rounded-full bg-orange-500/0 group-hover:bg-orange-500/20 blur-lg transition-all duration-300 -z-10" />
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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AG</span>
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

          {/* Light Connector */}
          <div className="hidden lg:flex items-center -mx-1">
            <LightConnector />
          </div>

          {/* Contact Button */}
          <Link
            href="/contact"
            className="px-5 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-full transition-all duration-200 shadow-[0_2px_10px_rgba(251,146,60,0.3)] hover:shadow-[0_4px_20px_rgba(251,146,60,0.4)]"
          >
            Contact
          </Link>

          {/* Theme Toggle */}
          <div className="ml-1">
            <ThemeToggleBubble />
          </div>
        </nav>
      </div>
    </header>
  );
}
