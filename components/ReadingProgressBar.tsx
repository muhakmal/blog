"use client";

import { useEffect, useRef } from "react";

// Tracks how much of the article body has been read: 0 when its top reaches the top of the
// viewport, 1 when its bottom reaches the bottom — related posts and the footer don't count.
export default function ReadingProgressBar({ targetSelector = "[data-article-body]" }: { targetSelector?: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = document.querySelector<HTMLElement>(targetSelector);
    if (!target) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const progress = distance > 0 ? -rect.top / distance : rect.bottom <= window.innerHeight ? 1 : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    // Images loading in change the article height, so watch its size as well as scrolling.
    const observer = new ResizeObserver(schedule);
    observer.observe(target);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [targetSelector]);

  return (
    <div aria-hidden className="fixed top-0 left-0 w-full h-1 z-[55] pointer-events-none">
      <div ref={barRef} className="h-full bg-neu-accent origin-left" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
