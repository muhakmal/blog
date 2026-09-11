"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export default function ThemeToggle() {
  // `theme` can be "system"; `resolvedTheme` is what is actually on screen.
  const { resolvedTheme, setTheme } = useTheme();
  // The theme is only known on the client, so render a placeholder during SSR.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) {
    return <div aria-hidden className="w-10 h-10 rounded-neu-inner shadow-neu-extruded bg-neu-bg" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
      title={isDark ? "Mode terang" : "Mode gelap"}
      className="group flex items-center justify-center w-10 h-10 rounded-neu-inner bg-neu-bg shadow-neu-extruded cursor-pointer hover:shadow-neu-extruded-hover active:shadow-neu-inset-sm transition-all duration-300 text-neu-fg hover:text-neu-accent"
    >
      <span key={isDark ? "sun" : "moon"} className="animate-fade-in motion-safe:group-hover:rotate-12 transition-transform">
        {isDark ? <Sun className="w-5 h-5" aria-hidden /> : <Moon className="w-5 h-5" aria-hidden />}
      </span>
    </button>
  );
}
