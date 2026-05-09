"use client";

import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center overflow-hidden rounded-full bg-white/5 p-1 backdrop-blur-xl border border-white/10 shadow-[inset_1px_1px_4px_rgba(255,255,255,0.1),inset_-1px_-1px_6px_rgba(0,0,0,0.2)] cursor-pointer hover:scale-105 transition-transform w-20 h-10"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute top-1 bottom-1 left-1 w-[calc(50%-6px)] rounded-full transition-all duration-500 cubic-bezier[0.37,1.95,0.66,0.56] z-10 bg-gradient-to-br ${
          isDark
            ? "from-indigo-500/40 to-purple-600/50 shadow-[0_0_12px_rgba(99,102,241,0.4)]"
            : "from-amber-400/40 to-yellow-500/50 shadow-[0_0_12px_rgba(251,191,36,0.4)]"
        } ${isDark ? "translate-x-9" : "translate-x-0"}`}
      />

      <span
        className={`absolute left-2 z-20 text-lg transition-all duration-500 cubic-bezier[0.37,1.95,0.66,0.56] ${
          isDark ? "opacity-0 translate-x-2" : "opacity-100 translate-x-0"
        }`}
      >
        ☀️
      </span>
      <span
        className={`absolute right-2 z-20 text-lg transition-all duration-500 cubic-bezier[0.37,1.95,0.66,0.56] ${
          isDark ? "opacity-100 -translate-x-1" : "opacity-0 -translate-x-2"
        }`}
      >
        🌙
      </span>
    </button>
  );
};

export default ThemeToggle;