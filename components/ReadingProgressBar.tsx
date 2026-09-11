"use client";

import { useEffect, useRef } from "react";

export default function ReadingProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Browsers with scroll-driven animations animate the bar in CSS (see .reading-progress).
    if (CSS.supports("animation-timeline: scroll()")) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="fixed top-0 left-0 w-full h-1 z-[55] pointer-events-none">
      <div ref={barRef} className="reading-progress h-full bg-neu-accent origin-left" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
