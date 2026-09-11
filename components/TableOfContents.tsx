"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ListTree } from "lucide-react";
import type { Heading } from "../lib/posts";

type Props = {
  headings: Heading[];
  variant?: "sidebar" | "inline";
};

// Highlights the last heading that has scrolled past the sticky header.
function useActiveHeading(headings: Heading[]) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (headings.length === 0) return;
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    let frame = 0;
    const update = () => {
      frame = 0;
      let current = "";
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= 120) current = el.id;
        else break;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [headings]);

  return activeId;
}

function HeadingLinks({ headings, activeId }: { headings: Heading[]; activeId: string }) {
  return (
    <ol className="flex flex-col gap-2">
      {headings.map((heading) => {
        const active = activeId === heading.id;
        return (
          <li key={heading.id} className={heading.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${heading.id}`}
              aria-current={active ? "location" : undefined}
              className={`block text-sm leading-snug transition-colors duration-200 border-l-2 pl-3 ${
                active ? "text-neu-accent font-bold border-neu-accent" : "text-neu-muted border-transparent hover:text-neu-fg"
              }`}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}

export default function TableOfContents({ headings, variant = "sidebar" }: Props) {
  const activeId = useActiveHeading(headings);
  if (headings.length === 0) return null;

  if (variant === "inline") {
    return (
      <details className="group lg:hidden mb-8 rounded-neu-sm bg-neu-bg border border-neu-edge shadow-neu-inset-sm">
        <summary className="flex items-center justify-between gap-2 cursor-pointer list-none p-5 font-display font-bold text-neu-fg [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2">
            <ListTree className="w-4 h-4 text-neu-accent" aria-hidden /> Daftar Isi
          </span>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" aria-hidden />
        </summary>
        <nav aria-label="Daftar isi" className="px-5 pb-5">
          <HeadingLinks headings={headings} activeId={activeId} />
        </nav>
      </details>
    );
  }

  return (
    <nav
      aria-label="Daftar isi"
      className="sticky top-24 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto p-6 rounded-neu bg-neu-bg border border-neu-edge shadow-neu-inset-sm"
    >
      <h2 className="font-display font-bold text-lg text-neu-fg mb-4">Daftar Isi</h2>
      <HeadingLinks headings={headings} activeId={activeId} />
    </nav>
  );
}
